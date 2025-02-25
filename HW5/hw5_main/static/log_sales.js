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
  $("#clientName").autocomplete("option", "source", clients);
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

// Add a new sale & error handling
function addSale() {
  let client = $("#clientName").val().trim();
  let reamsInput = $("#reamsSold").val().trim();
  let reams = parseInt(reamsInput, 10);

  if (getErrors(client, reamsInput, reams)) return; // Stop execution if there are errors

  let new_sale = {"salesperson" : salesperson, "client" : client, "reams" : reams}

  save_sale(new_sale);
}

function save_sale(new_sale){
  $.ajax({
    type: "POST",
    url: "save_sale",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(new_sale),
    success: function(result){
        let all_data = result["sales"]
        let updated_clients = result["clients"]
        console.log("success addSale")
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
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

function delete_sale(id){
  $.ajax({
    type: "POST",
    url: "delete_sale",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ "id": id }),
    success: function(result) {
      let all_data = result["sales"];
      console.log("Deleted sale, updated sales:", all_data);
      data = all_data;
      
      // Update UI
      display_sales_list(data);
    },
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
      let id = ui.draggable.attr("id");
      delete_sale(id); // Make AJAX call to delete
    }
  });

  // Delete button (Controller) delete
  $(document).on("click", ".delete-button", function() {
    let id = $(this).closest(".sales-row").attr("id");
    delete_sale(id);
  });

  // Add new sales
  $("#submit-button").click(function() { addSale(); });
  $("#reamsSold").keydown(function(event){ if (event.key === "Enter"){ addSale(); }});

});