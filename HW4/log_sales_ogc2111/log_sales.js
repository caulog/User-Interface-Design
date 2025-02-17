//javascript
$( function() {
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

    // Apply jQuery UI autocomplete
  $("#clientName").autocomplete({
    source: clients
  });

  // Open the autocomplete list when the input is focused
  $("#clientName").focus(function() {
    $(this).autocomplete("search", "");  // This triggers the autocomplete dropdown
    $(this).autocomplete("widget").show();  // Force the autocomplete dropdown to show
  });



    $( ".draggable" ).draggable({
      revert: "invalid" // revert to og position
    });
    $( ".trash" ).droppable({
      over: function(event, ui) {
          $(this).addClass("can-drop");
        },
        out: function(event, ui) {
          $(this).removeClass("can-drop");
        },
      drop: function( event, ui ) {
        $( this )
          .removeClass("can-drop")
          .addClass( "ui-state-highlight" )
          .find( "p" )
          .html( "Dropped!" );
      }
    });
  } );