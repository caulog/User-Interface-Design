// Initialize Variables

// Salesperson
const salesperson = "Dwight Schrute"
  
// Existing clients
let clients = [
  "Shake Shack",
  "Toast",
  "Computer Science Department",
  "Teacher's College",
  "Starbucks",
  "Subsconsious",
  "Flat Top",
  "Joe's Coffee",
  "Max Caffe",
  "Nussbaum & Wu",
  "Taco Bell",
];

// Sales data (Model)
let sales = [
  {
    "salesperson": "James D. Halpert",
    "client": "Shake Shack",
    "reams": 100
  },
  {
    "salesperson": "Stanley Hudson",
    "client": "Toast",
    "reams": 400
  },
  {
    "salesperson": "Michael G. Scott",
    "client": "Computer Science Department",
    "reams": 1000
  },
];

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
function renderSales(){
  $(".container .sales-row").remove();
  sales.forEach(function(sale, index) {
    const rowHTML = `
      <div class="sales-row draggable" data-index="${index}">
          <div class="draggable"></div>
          <div class="col-3">${sale.salesperson}</div>
          <div class="col-4">${sale.client}</div>
          <div class="col-3">${sale.reams}</div>
          <div class="col-2"> 
            <button class="btn delete-button">X</button> 
          </div>
      </div>
    `;
    $(".container").append(rowHTML);
  });
  initializeDraggable();
}

// Error handling function
function getErrors() {
  const client = $("#clientName").val().trim();
  const reamsInput = $("#reamsSold").val().trim();
  const reams = parseInt(reamsInput, 10);

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
  if (getErrors()) return; // Stop execution if there are errors

  const client = $("#clientName").val().trim();
  const reams = parseInt($("#reamsSold").val().trim(), 10);

  // Add the new client to the clients list if it doesn't exist already
  if (!clients.includes(client)) {
    clients.push(client);
    $("#clientName").autocomplete("option", "source", clients);
  }

  // Add new sale to the sales array (Model)
  sales.unshift({ salesperson, client, reams });

  // Clear input fields
  $("#clientName").val("");
  $("#reamsSold").val("");
  initializeClientInput();

  // Update the view
  renderSales();
}

$(document).ready(function() {
  // Apply jQuery UI autocomplete
  $("#clientName").autocomplete({ source: clients });

  // Initialize page
  showError("", "#client-error");
  showError("", "#ream-error");
  renderSales();
  initializeClientInput();

  // Drag and Drop delete
  $(".trash").droppable({
    accept: ".draggable", // Only accept elements with the 'draggable' class
    over: function(event, ui) { $(this).addClass("can-drop"); },
    out: function(event, ui) { $(this).removeClass("can-drop"); },
    drop: function(event, ui) { $(this).removeClass("can-drop");
      const index = ui.helper.closest(".sales-row").data("index");  // Index of sales to delete
      sales.splice(index, 1);                                       // Delete sale from the Model
      renderSales();                                                // Re-render the view
    }
  });

  // Delete button (Controller) delete
  $(document).on("click", ".delete-button", function() {
    const index = $(this).closest(".sales-row").data("index");      // Index of sales to delete
    sales.splice(index, 1);                                         // Delete sale from the Model
    renderSales();                                                  // Re-render the view
  });

  // Add new sales
  $("#submit-button").click(function() { addSale(); });
  $("#reamsSold").keydown(function(event){ if (event.key === "Enter"){ addSale(); }});

});