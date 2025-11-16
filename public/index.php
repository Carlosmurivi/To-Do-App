<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To Do App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body class="bg-color">
    <header class="d-flex flex-wrap">
        <h1 class="col-12 my-1">KANBAN</h1>
    </header>

    <section class="d-flex flex-wrap mx-5 mt-4 border border-dark border-4 rounded-5 mb-4">
        <!-- TO DO -->
        <column class="col-4 p-1">
            <div class="d-inline-block col-12 border border-dark border-3 rounded-5 toDo h-100">
                <h1 class="col-12 mt-2 mb-1 toDo-text">to do</h1>
                <hr class="col-11 mx-auto border-2 opacity-75 toDo-border">
                <div class="px-3">
                    <button id="add-toDo" class="col-12 button button-add-toDo" data-bs-toggle="modal"
                        data-bs-target="#add-modal">Agregar</button>
                </div>
                <list id="toDoList" class="col-12 p-2"></list>
            </div>
        </column>





        <!-- DOING -->
        <column class="col-4 p-1">
            <div class="d-inline-block col-12 border border-dark border-3 rounded-5 doing h-100">
                <h1 class="col-12 mt-2 mb-1 doing-text">doing</h1>
                <hr class="col-11 mx-auto border-2 opacity-75 doing-border">
                <div class="px-3">
                    <button id="add-doing" class="col-12 button button-add-doing" data-bs-toggle="modal"
                        data-bs-target="#add-modal">Agregar</button>
                </div>
                <list id="doingList" class="col-12 p-2"></list>
            </div>
        </column>





        <!-- DONE -->
        <column class="col-4 p-1">
            <div class="d-inline-block col-12 border border-dark border-3 rounded-5 done h-100">
                <h1 class="col-12 mt-2 mb-1 done-text">done</h1>
                <hr class="col-11 mx-auto border-2 opacity-75 done-border">
                <div class="px-3">
                    <button id="add-done" class="col-12 button button-add-done" data-bs-toggle="modal"
                        data-bs-target="#add-modal">Agregar</button>
                </div>
                <list id="doneList" class="col-12 p-2"></list>
            </div>
        </column>
    </section>





    <!-- MODALES -->

    <?php
    // Modal crear task
    include_once "../components/modalCreateTask.html";
    
    // Notificacion Campos incompletos
    include_once "../components/notificationIncompleteInput.html";
    
    // Notificacion Tarea Creada
    include_once "../components/notificationCreateTask.html";
    
    // Notificacion Tarea Eliminada
    include_once "../components/notificationDeleteTask.html";
    ?>
</body>

<script src="../js/index.js"></script>

</html