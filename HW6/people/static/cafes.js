document.addEventListener("DOMContentLoaded", function () {
    fetch("/get_cafes")
        .then(response => response.json())
        .then(data => {
            const cafeList = document.getElementById("cafe-list");
            Object.values(data).forEach(cafe => {
                let listItem = document.createElement("li");
                listItem.textContent = cafe.name;
                cafeList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching cafes:", error));
});
