// Variables for sales and client data
// now in server.py

// Salesperson
const salesperson = "Dwight Schrute"

// Focus the cursor in the client input box
function initializeClientInput() { $("#clientName").focus(); }

// Focus the cursor in the reams input box
function initializeReamsInput() { $("#reamsSold").focus(); }

// Display the error message and set its text
function showError(message, errorClass) {
  $(errorClass).find("#error-text").text(message);
  $(errorClass).show();
}

// Draggable row settings
// Revert if dropped outside valid area
// Pale yellow on hover and select
function initializeDraggable() {
  $(".draggable").draggable({
    revert: "invalid",             
  }).hover(
    function() { $(this).addClass("can-drag"); },  
    function() { $(this).removeClass("can-drag"); }
  );
}

// Make sales list from sales (Model)
function display_sales_list(sales){
  $(".container .sales-row").remove();
  sales.forEach(function(sale) {
    const rowHTML = `
      <div class="sales-row draggable" id="${sale.id}">
          <div class="draggable"></div>
          <div class="col-3">${sale.salesperson}</div>
          <div class="col-4">${sale.client}</div>
          <div class="col-3">${sale.reams}</div>
          <div class="col-2"> 
            <button class="btn delete-button">X</button> 
          </div>
      </div>
    `;
    $(".sales-container").append(rowHTML);
  });
  initializeDraggable();
}

// Error handling function
function getErrors(client, reamsInput, reams) {
  let hasError = false;

  // Validate reams input
  if (reamsInput === "") {
    initializeReamsInput()
    showError("Enter number of reams sold.", "#ream-error");
    hasError = true;
  } else if (isNaN(reams) || reams <= 0) {
    initializeReamsInput()
    showError("Invalid Character. Enter a valid number of reams sold.", "#ream-error");
    hasError = true;
  } else {
    showError("", "#ream-error"); // Clear ream error if valid
  }

  // Validate client input
  if (client === "") {
    showError("Enter a client.", "#client-error");
    initializeClientInput()
    hasError = true;
  } else {
    showError("", "#client-error"); // Clear client error if valid
  }

  return hasError;
}

// Set up for saving sale to server and error handling
function addSale() {
  // Initialize vars for error handling
  let client = $("#clientName").val().trim();
  let reamsInput = $("#reamsSold").val().trim();
  let reams = parseInt(reamsInput, 10);

  // Stop execution if there are errors
  if (getErrors(client, reamsInput, reams)) return; 

  // If no errors, create new_sale structure to pass to save_sale on server
  let new_sale = {"salesperson" : salesperson, "client" : client, "reams" : reams}
  save_sale(new_sale);
}

// Saves the new sale to the server
function save_sale(new_sale){
  $.ajax({
    type: "POST",
    url: "save_sale",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(new_sale),
    success: function(result){

        // Get successful sale & client data from server.py
        let all_data = result["sales"]              
        let updated_clients = result["clients"]
        data = all_data
        clients = updated_clients
        
        // Update autocomplete if neccesary
        $("#clientName").autocomplete("option", "source", updated_clients);

        // Clear input fields
        $("#clientName").val("");
        $("#reamsSold").val("");
        initializeClientInput();

        // Update the view
        display_sales_list(data);
    },
    // Error handling
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

// Deletes data entries from the server
function delete_sale(id){
  $.ajax({
    type: "POST",
    url: "delete_sale",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ "id": id }),
    success: function(result) {
      // Get successful deletion data from server
      let all_data = result["sales"];
      data = all_data;
      
      // Update the view
      display_sales_list(data);
    },
    // Error handling
    error: function(request, status, error) {
      console.log("Error deleting sale:", request, status, error);
    }
  });
}

$(document).ready(function() {
  // Apply jQuery UI autocomplete
  $("#clientName").autocomplete({ source: clients });

  // Initialize page
  showError("", "#client-error");
  showError("", "#ream-error");
  display_sales_list(sales);
  initializeClientInput();

  // Drag and Drop delete
  $(".trash").droppable({
    accept: ".draggable", // Only accept elements with the 'draggable' class
    over: function(event, ui) { $(this).addClass("can-drop"); },
    out: function(event, ui) { $(this).removeClass("can-drop"); },
    drop: function(event, ui) { $(this).removeClass("can-drop");
      let id = ui.draggable.attr("id");                               // Get id of item to delete
      delete_sale(id);                                                // Call delete function on id
    }
  });

  // Delete button (Controller) delete
  $(document).on("click", ".delete-button", function() {
    let id = $(this).closest(".sales-row").attr("id");                // Get id of item to delete
    delete_sale(id);                                                  // Call delete function on id
  });

  // Add new sales
  $("#submit-button").click(function() { addSale(); });
  $("#reamsSold").keydown(function(event){ if (event.key === "Enter"){ addSale(); }});

});