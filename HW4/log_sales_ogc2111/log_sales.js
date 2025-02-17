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

function addSale(){
  const client = $("#clientName").val().trim();
  const reams = parseInt($("#reamsSold").val().trim(), 10);

  // client error
  if (client === "") {
    initializeClientInput();
    if (isNaN(reams) || reams <= 0) {
      showError("Enter a client.", "#client-error");
      showError("Enter number of reams sold.", "#ream-error");
      return;
    }
    showError("", "#ream-error");
    showError("Enter a client.", "#client-error");
    return;
  }
  // ream error
  if (isNaN(reams) || reams <= 0) {
    showError("", "#client-error"); // Clear client error message if any
    // If reams is not a number
    if (isNaN(reams) && reams !="") {
      showError("Invalid Character. Enter number of reams sold.", "#ream-error");
      initializeReamsInput();
      return;
    }
    // If reams is a number but less than or equal to 0
    showError("Enter number of reams sold.", "#ream-error");
    initializeReamsInput();
    return;
  }

  // Hide error message if the input is valid
  showError("", "#client-error");
  showError("", "#ream-error");

  // Add the new client to the clients list if it doesn't exist already
  if (!clients.includes(client)) {
    clients.push(client);
  
    // Update the autocomplete source with the new client list
    $("#clientName").autocomplete("option", "source", clients);
  }

  // Add new sale to the beginning of the sales array (Model)
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
    over: function(event, ui) {
      $(this).addClass("can-drop"); // When a row enters the trash area
    },
    out: function(event, ui) {
      $(this).removeClass("can-drop"); // When a row leaves the trash area
    },
    drop: function(event, ui) {
      $(this)
        .removeClass("can-drop") // Remove the 'can-drop' class
        .find("p")
        .html("Dropped!"); // Optional: Change the trash text after a drop

      // Get the index of the dragged item
      const droppedRow = ui.helper.closest(".row");
      const index = droppedRow.data("index");

      // Delete the sale record from the sales data (Model)
      sales.splice(index, 1);

      // Re-render the sales records view to reflect the deletion (View)
      renderSales();
    }
  });

  // Delete button (Controller) delete
  $(document).on("click", ".delete-button", function() {
    const index = $(this).closest(".sales-row").data("index");  // Index of sales to delete

    // Delete the sale record from the sales data (Model)
    sales.splice(index, 1);

    // Re-render the sales records view to reflect the deletion (View)
    renderSales();
  });

  // Add new sales
  $("#submit-button").click(function() { addSale(); });
  $("#reamsSold").keydown(function(event){ if (event.key === "Enter"){ addSale(); }});

});