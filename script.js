// adds todays date in subheading
const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
});
document.querySelector("h2").textContent = date;

getFromLocalStorage();

// eventlistener for form
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.getElementById("input");
    createLi(input.value);
    input.value = "";
    saveToLocalStorage();
});

// eventlistener for 'Clear All' button
document.querySelector(".clear-all").addEventListener("click", (e) => {
    document.getElementById("todo-list").textContent = "";
    saveToLocalStorage();
});

// eventlistener for todo list items - for strikethrough feature
document.getElementById("todo-list").addEventListener("change", (e) => {
    const labelElement = e.target.labels[0];
    const labelText = labelElement.innerText;

    if (e.target.checked == true) {
        labelElement.innerHTML = `<strike>${labelText}</strike>`;
    } else {
        labelElement.innerHTML = labelText;
    }
    saveToLocalStorage();
});

// creates 'li' HTML element
function createLi(text) {
    const existingLiCollection = document.getElementsByClassName("list-group-item");

    const li = document.createElement("li");
    li.classList.add("list-group-item", "p-3");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("form-check-input", "me-1");
    input.id = `todo-${existingLiCollection.length + 1}`;

    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.classList.add("form-check-label");
    label.textContent = text;

    li.append(input, label);
    document.getElementById("todo-list").appendChild(li);

    saveToLocalStorage();
}

// stores todos to local storage
function saveToLocalStorage() {
    const listItems = document.getElementById("todo-list").innerHTML;
    localStorage.setItem("li-elements", listItems);
}

// gets todos from local storage
function getFromLocalStorage() {
    document.getElementById("todo-list").innerHTML = localStorage.getItem("li-elements");

    const temp = document.querySelectorAll("strike");
    temp.forEach(val => {
        val.parentNode.previousSibling.checked = true;
    })
}