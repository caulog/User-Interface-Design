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
  
          // Clear the search input of any whitespace
          searchInput.value = "";
  
          return; // Exit the function, so nothing happens
        }
  
        // If the query is valid, the form will submit as usual
      });
    }
  });