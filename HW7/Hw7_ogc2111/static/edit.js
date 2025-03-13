document.getElementById("save-btn").addEventListener("click", function() {
    let updatedCafe = {
        name: document.getElementById("name").value,
        image: document.getElementById("image").value,
        image_text: document.getElementById("image-text").value,
        address: document.getElementById("address").value,
        description: document.getElementById("description").value,
        rating: parseFloat(document.getElementById("rating").value),
        outlets: document.getElementById("outlets").value,
    };

    fetch("/update_cafe/{{ cafe.id }}", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCafe)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        window.location.href = "/view/{{ cafe.id }}"; // Redirect to view page
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("discard-btn").addEventListener("click", function() {
    window.location.href = "/view/{{ cafe.id }}"; // Redirect back to view page without saving
});