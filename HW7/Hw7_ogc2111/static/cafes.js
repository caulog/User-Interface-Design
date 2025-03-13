document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
  
    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", function (event) {
        const query = searchInput.value.trim(); // Get the search query and trim whitespace
  
        // If the query is empty or just whitespace, prevent the form from submitting
        if (!query) {
          // Set focus back to the search input
          searchInput.focus();
          event.preventDefault(); // Stop the form submission
          searchInput.value = "";
          return; // Exit the function, so nothing happens
        }
  
        // If the query is valid, the form will submit as usual
      });
    }
  });



// Save the new cafe to the server
function save_cafe(new_cafe) {
    $.ajax({
      type: "POST",
      url: "/add",  // Adjust to your Flask route for adding a cafe
      dataType: "json",  // Assuming the server returns JSON
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(new_cafe),
      success: function(result) {
          // Assuming the server returns the updated data dictionary
          let all_data = result["cafes"];  // Server should return updated cafes as a dictionary
          data = all_data;
          
          // Clear input fields if needed
          $("#name").val("");
          $("#image").val("");
          $("#address").val("");
          // Clear other fields as necessary
          
          // Update the view with the new list of cafes
          display_cafes_list(data);
      },
      error: function(request, status, error) {
          console.log("Error");
          console.log(request);
          console.log(status);
          console.log(error);
      }
    });
  }
  
  // Example of how to call save_cafe with data from the form
  $("#addCafeForm").submit(function(event) {
    event.preventDefault();  // Prevent form from reloading the page
  
    // Gather form data into a new cafe object
    let new_cafe = {
      "name": $("#name").val(),
      "image": $("#image").val(),
      "image_text": $("#image-text").val(),
      "address": $("#address").val(),
      "description": $("#description").val(),
      "rating": $("#rating").val(),
      "outlets": $("#outlets").val(),
      "wifi": $("#wifi").val(),
      "meeting_friendly": $("#meeting_friendly").val(),
      "food": $("#food").val(),
      "drink": $("#drink").val(),
      "pastry": $("#pastry").val(),
      "seating_type": $("#seating_type").val(),
      "noise_level": $("#noise_level").val(),
      "lighting": $("#lighting").val(),
      "similar_cafes": $("#similar_cafes").val()  // Handle similar cafes if needed
    };
  
    // Call the function to save the new cafe
    save_cafe(new_cafe);
  });
  