//javascript
$(document).ready(function() {
  // add clients from clients.js
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

  // sales data (Model)
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

    // Apply jQuery UI autocomplete
  $("#clientName").autocomplete({
    source: clients
  });

  // Open the autocomplete list when the input is focused
  $("#clientName").focus(function() {
    $(this).autocomplete("search", "");  // This triggers the autocomplete dropdown
    $(this).autocomplete("widget").show();  // Force the autocomplete dropdown to show
  });

  // Function to render and display sales data (View)
  function renderSales() {
    $(".container .row.draggable").remove(); // Remove existing rows from the UI
    
    sales.forEach(function(sale, index) {
      const rowHTML = `
        <div class="row draggable" data-index="${index}">
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

  // Initialize draggable elements and hover effect
  function initializeDraggable() {
    $(".draggable").draggable({
      revert: "invalid", // revert to original position

      start: function(event, ui) {
        $(this).addClass("can-drag"); // Add class when drag starts
      },

      stop: function(event, ui) {
        $(this).removeClass("can-drag"); // Remove class when drag stops
      }
    });

    // Apply hover effect for draggable items
    $(".draggable").hover(
      function() { // When the mouse enters
        $(this).addClass("can-drag");
      },
      function() { // When the mouse leaves
        $(this).removeClass("can-drag");
      }
    );
  }

  // Call renderSales() initially to display the sales data
  renderSales();

  // Make the trash area droppable
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


    // Add click event listener for delete buttons (Controller)
  $(document).on("click", ".delete-button", function() {
    // Get the index of the sale to delete (from data-index attribute)
    const index = $(this).closest(".row").data("index");

    // Delete the sale record from the sales data (Model)
    sales.splice(index, 1);

    // Re-render the sales records view to reflect the deletion (View)
    renderSales();
  });

  });