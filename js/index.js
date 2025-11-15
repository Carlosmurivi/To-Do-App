const toDoList = document.getElementById("toDoList");
const doingList = document.getElementById("doingList");
const doneList = document.getElementById("doneList");
const colorSelect = document.getElementById("color");

const toDoAdd = document.getElementById("add-toDo");
const doingAdd = document.getElementById("add-doing");
const doneAdd = document.getElementById("add-done");
const createButton = document.getElementById("create-button");


let columna = null;



toDoAdd.addEventListener("click", () => {
    columna = "toDoList";
});

doingAdd.addEventListener("click", () => {
    columna = "doingList";
});

doneAdd.addEventListener("click", () => {
    columna = "doneList";
});



createButton.addEventListener("click", () => {
    let title = document.getElementById("title");
    let description = document.getElementById("description");

    let elemento = document.createElement("div");

    elemento.innerHTML = `
        <div class="px-3 mb-2">
            <div class="task d-flex flex-wrap ` + colorSelect.value + `" description="` + description.value + `">
                <h4 class="col-10">` + title.value + `</h4>
                <button class="btn btn-danger" id="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3 delete-button" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    document.getElementById(columna).appendChild(elemento);

    description.value = "";
    title.value = "";

    const modalElement = document.getElementById("add-modal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});



colorSelect.addEventListener("input", () => {
    let circulo = document.getElementById("color-circle");

    circulo.style.backgroundColor = colorSelect.value;
});


document.addEventListener("click", (e) => {
  if (e.target.id === "delete-button" || e.target.classList.contains("delete-button")) {

    e.target.parentNode.parentNode.remove();
  }
});