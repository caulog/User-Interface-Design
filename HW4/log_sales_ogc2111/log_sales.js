//javascript
$( function() {
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