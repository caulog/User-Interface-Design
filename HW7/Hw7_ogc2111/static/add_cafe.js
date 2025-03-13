$(document).ready(function()  {
    showError("", "#name-error")
    showError("", "#image-error")
    showError("", "#image-text-error")
    showError("", "#address-error")
    showError("", "#description-error")
    showError("", "#rating-error")
    showError("", "#seating-error")
    showError("", "#lighting-error")
    showError("", "#similar-cafes-error")

    $("#name").focus();

    $("#add-btn").click(function() { addCafe(); });
  });
  

// Function to handle adding a new cafe
function addCafe() {

    // Initialize vars for error handling
    let name = $("#name").val().trim();
    let image = $("#image").val().trim();
    let imageText = $("#image_text").val().trim();
    let address = $("#address").val().trim();
    let description = $("#description").val().trim();
    let rating = $("#rating").val().trim();
    let outlets = $("#outlets").val().trim();
    let wifi = $("#wifi").val().trim();
    let meetingFriendly = $("#meeting_friendly").val().trim();
    let food = $("#food").val().trim();
    let drink = $("#drink").val().trim();
    let pastry = $("#pastry").val().trim();
    let seatingType = $("#seating_type").val().trim();
    let noiseLevel = $("#noise_level").val().trim();
    let lighting = $("#lighting").val().trim();
    let similarCafes = $("#similar_cafes").val().trim();
  
    // Stop execution if there are validation errors
    console.log("checking errors");
    if (getCafeErrors(name, image, imageText, address, description, rating, seatingType, lighting, similarCafes)) return;
    console.log("new cafe");
  
    // If no errors, create new_cafe structure to pass to save_cafe on server
    let new_cafe = {
      "name": name,
      "image": image,
      "image_text": imageText,
      "address": address,
      "description": description,
      "rating": parseFloat(rating),
      "outlets": outlets,
      "wifi": wifi,
      "meeting_friendly": meetingFriendly,
      "food": food,
      "drink": drink,
      "pastry": pastry,
      "seating_type": seatingType,
      "noise_level": noiseLevel,
      "lighting": lighting,
      "similar_cafes": similarCafes
    };

    console.log(new_cafe);
  
    // Call the function to save the new cafe
    save_cafe(new_cafe);
  }


// Validate cafe inputs
function getCafeErrors(name, image, imageText, address, description, rating, seatingType, lighting, similarCafes) {
    let hasError = false;
  
    // Validate name
    if (name === "") {
      showError("Enter a cafe name.", "#name-error");
      hasError = true;
    } else {
      showError("", "#name-error");
    }

    // Validate image
    if (image === "") {
      showError("Enter an image URL.", "#image-error");
      hasError = true;
    } else {
      showError("", "#image-error");
    }

    // Validate image text
    if (imageText === "") {
      showError("Enter an image description.", "#image-text-error");
      hasError = true;
    } else {
      showError("", "#image-text-error");
    }

    // Validate address
    if (address === "") {
        showError("Enter an address.", "#address-error");
        hasError = true;
    } else {
        showError("", "#address-error");
    }

    // Validate description
    if (description === "") {
        showError("Enter a description.", "#description-error");
        hasError = true;
    } else {
        showError("", "#description-error");
    }

    // Validate rating
    if (rating === ""){
        showError("Enter a rating.", "#rating-error");
        hasError = true;
    } else if (parseFloat(rating) < 0 || parseFloat(rating) > 5 ) {
        showError("Enter a valid rating 0-5.", "#rating-error");
        hasError = true;
    } else {
        showError("", "#rating-error");
    }
  
    // Validate seating
    if (seatingType === "") {
        showError("Enter a seating type.", "#seating-error");
        hasError = true;
    } else {
        showError("", "#seating-error");
    }

    // Validate lighting
    if (lighting === "") {
        showError("Enter a lighting description.", "#lighting-error");
        hasError = true;
    } else {
        showError("", "#lighting-error");
    }

    // Validate similar cafes
    if (similarCafes === "") {
        showError("Enter similar cafe IDs.", "#similar-cafes-error");
        hasError = true;
    } else {
        showError("", "#similar-cafes-error");
    }

    let regex = /^(\d+\s*,\s*)*\d+$/;

    // Check if the input matches the pattern
    if (!regex.test(similarCafes)) {
        showError("Enter a list of integers seperated by commas (e.g., 1, 2, 3).", "#similar-cafes-error");
        hasError = true;
    } else {
        showError("", "#similar-cafes-error");
    }

    return hasError;
  }
  
  // Show error message for input fields
  function showError(message, errorClass) {
    $(errorClass).find("#error-text").text(message);
    $(errorClass).show();
  }


// Save the new cafe to the server
function save_cafe(new_cafe) {
    $.ajax({
      type: "POST",
      url: "add",  // Adjust to your Flask route for adding a cafe
      dataType: "json",  // Assuming the server returns JSON
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(new_cafe),
      success: function(result) {
        // Assuming the server returns the updated data dictionary
        let all_data = result["cafes"];  // Server should return updated cafes as a dictionary
        let new_cafe_id = result["new_cafe_id"];
        data = all_data;

        $("#new-cafe-text").html(`New cafe successfully added. <a class="clickable" href="/view/${new_cafe_id}">See it here</a>.`);
        $("#new-cafe").show();
          
        $("#name").focus();

        // Clear input fields
        $("#name").val("");
        $("#image").val("");
        $("#image_text").val("");
        $("#address").val("");
        $("#description").val("");
        $("#rating").val("");
        $("#outlets").val("good");
        $("#wifi").val("yes");
        $("#meeting_friendly").val("yes");
        $("#food").val("yes");
        $("#drink").val("yes");
        $("#pastry").val("yes");
        $("#seating_type").val("");
        $("#noise_level").val("quiet");
        $("#lighting").val("");
        $("#similar_cafes").val("");
          
      },
      error: function(request, status, error) {
          console.log("Error");
          console.log(request);
          console.log(status);
          console.log(error);
      }
    });
  }