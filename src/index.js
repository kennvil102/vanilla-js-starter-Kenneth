function agregarTarea() {
    // obtenemos el valor digitado
    let tareaTextoNueva = document.getElementById("tareas").value;
    
    // validamos que no este vacio
    if (tareaTextoNueva === "") {
        alert("Escriba una tarea");
        return;
    }

    // creamos el elemento de la lista
    let nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = tareaTextoNueva + " ";

    // creamos el  boton eliminar
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = function() {
        nuevaTarea.remove();
    };
    
    // boton de eliminar a la tarea
    nuevaTarea.appendChild(botonEliminar);

    // añadimos la tareita a la lista 
    document.getElementById("listask").appendChild(nuevaTarea);

    // limpiamos el valor del texto
    document.getElementById("tareas").value = "";
}





