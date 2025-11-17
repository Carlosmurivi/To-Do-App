const toDoList = document.getElementById("toDoList");
const doingList = document.getElementById("doingList");
const doneList = document.getElementById("doneList");
const colorSelect = document.getElementById("color");
const colorSelectUpdate = document.getElementById("color-update");

const toDoAdd = document.getElementById("add-toDo");
const doingAdd = document.getElementById("add-doing");
const doneAdd = document.getElementById("add-done");
const createButton = document.getElementById("create-button");
const updateButton = document.getElementById("update-button");

const createModal = new bootstrap.Modal(document.getElementById("add-modal"));
const updateModal = new bootstrap.Modal(document.getElementById("update-modal"));
const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
const notificationIncompleteInputToast = new bootstrap.Toast(document.getElementById("notificationIncompleteInput"));
const notificationCreateTaskToast = new bootstrap.Toast(document.getElementById("notificationCreateTask"));
const notificationDeleteTaskToast = new bootstrap.Toast(document.getElementById("notificationDeleteTask"));
const notificationUpdateTaskToast = new bootstrap.Toast(document.getElementById("notificationUpdateTask"));

console.log(JSON.parse(localStorage.getItem("tasks")));
let tasks = (localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
console.log(tasks);
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





tasks.forEach(task => paintingTask(task));

// Crear tarea
createButton.addEventListener("click", () => {
    let task = new Task(document.getElementById("title").value, document.getElementById("description").value, colorSelect.value, columna);

    if (task.title.trim() == "" || task.title == null || task.description.trim() == "" || task.description == null) {
        notificationIncompleteInputToast.show();
        return;
    }

    paintingTask(task);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    saveTask(task);

    createModal.hide();
    notificationCreateTaskToast.show();
});


updateButton.addEventListener("click", () => {
    task = new Task(
        document.getElementById("title-update").value,
        document.getElementById("description-update").value,
        document.getElementById("color-update").value,
        getTaskById(document.getElementById("id-update").value).columna,
        document.getElementById("id-update").value
    );

    updateModal.hide();

    updateTask(task);

    document.getElementById(task.columna).innerHTML = "";

    tasks.forEach(t => {(t.columna == task.columna) ? paintingTask(t) : ""});

    notificationUpdateTaskToast.show();
});


// Pintar tarea
function paintingTask(task) {
    const wrapper = document.createElement("div");
    wrapper.className = "px-3 mb-2";
    wrapper.setAttribute("id-task", task.id);

    const taskDiv = document.createElement("div");
    taskDiv.className = `task d-flex flex-wrap ${task.color}`;
    taskDiv.setAttribute("description", task.description);

    const h4 = document.createElement("h4");
    h4.className = `col-10 ps-2 ${(["blue", "blueviolet", "brown"].includes(task.color) ? "text-light" : "")}`;
    h4.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger delete-button";
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3 delete-button" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
    `;

    // Eliminar tarea
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // 🔑 evita que se dispare el click del task
        deleteTask(task, wrapper);
    });

    // Mostrar modal al clicar sobre la tarea
    taskDiv.addEventListener("click", () => {
        updateModal.show();
        document.getElementById("id-update").value = task.id;
        document.getElementById("title-update").value = task.title;
        document.getElementById("description-update").value = task.description;
        document.getElementById("color-update").value = task.color;
        document.getElementById("color-circle-update").style.backgroundColor = task.color;
    });

    taskDiv.appendChild(h4);
    taskDiv.appendChild(deleteButton);
    wrapper.appendChild(taskDiv);

    document.getElementById(task.columna).appendChild(wrapper);
}


// Color seleccionado
colorSelect.addEventListener("input", () => {
    let circulo = document.getElementById("color-circle");

    circulo.style.backgroundColor = colorSelect.value;
});
colorSelectUpdate.addEventListener("input", () => {
    let circulo = document.getElementById("color-circle-update");

    circulo.style.backgroundColor = colorSelectUpdate.value;
});


// Añadir a localStorage una tarea
function saveTask(task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Actualizar tarea en el localStorage
function updateTask(task) {
    for (let t of tasks) {
        if (t.id === task.id) {
            t.title = task.title;
            t.description = task.description;
            t.color = task.color;
            t.columna = task.columna;
            break; // ya lo encontramos, salimos
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Obtener tarea por id del localStorage
function getTaskById(id) {
    for (let t of tasks) {
        if (t.id == id) {
            return t;
        }
    }
}


// Eliminar tarea
function deleteTask(task, wrapper) {
    confirmDeleteModal.show();

    const confirmBtn = document.getElementById("confirm-delete-btn");

    confirmBtn.onclick = () => {
        tasks = tasks.filter(t => t.id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        wrapper.remove();
        confirmDeleteModal.hide();
        notificationDeleteTaskToast.show();
    };
}