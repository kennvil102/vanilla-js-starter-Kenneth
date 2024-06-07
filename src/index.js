// llamar a las los elementos id guardarlos
let btnTarea = document.getElementById("btnAggTarea");
let tareaTextoNueva = document.getElementById("tareas");
let listit = document.getElementById("Lista");
let contador = document.querySelector(".Contador"); //  

// funcion para obtener y mostrar las tareas desde el servidor
async function traerDatos() {
    try {
        // Hacer una solicitud GET al servidor para obtener las tareas
        const respuesta = await fetch("http://localhost:3000/api/task");
        const datos = await respuesta.json();
        
        //limpiar la lista antes de agregar las tareas
        listit.innerHTML = "";
        
        // iniciarlizar el contador
        let tareasCompletadas = 0;
        
        // recorrer los datos y crear los elementos del dom para cada tarea
        datos.forEach(elemento => {
            let divv = document.createElement("div");
            let p = document.createElement("p");
            p.textContent = elemento.nombre;

            // Crear y configurar el checkbox para marcar la tarea como completada
            let checkssito = document.createElement("input");
            checkssito.type = "checkbox";
            checkssito.checked = elemento.estado;

            // incrementar el contador si la tarea esta completada
            if (elemento.estado) {
                tareasCompletadas++;
            }

            //  evento para actualizar el estado de la tarea y el contador
            checkssito.addEventListener("change", () => {
                actualizar(elemento.id, checkssito.checked);
            });

            p.appendChild(checkssito);

            // Crear y configurar el botón para eliminar la tarea
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                deleteTarea(elemento.id);
            });

            divv.appendChild(p);
            divv.appendChild(botonEliminar);
            listit.appendChild(divv);
        });

        // actualizar el valor del contador  
        contador.value = tareasCompletadas;

        console.log(datos);
    } catch (error) {
        console.error(error);
    }
}

//  agrega una nueva tarea al servidor
async function daDatos() {
    if (tareaTextoNueva.value != ''){
        
        try {
            let tarea = {
                id: Date.now(),
            nombre: tareaTextoNueva.value,
        estado: false
    };

const respuesta = await fetch("http://localhost:3000/api/task", {
    method: "POST",
headers: {
    "Content-type": "application/json; charset=UTF-8"
},
body: JSON.stringify(tarea)
});

const datos = await respuesta.json();
console.log(datos);

// actualizar la lista de tareas luego de agregar una nueva
traerDatos();
} catch (error) {
    console.error(error);
}
}else {
        alert ("Error")
    }
}

// funcion para actualizar el estado de una tarea en el servidor
async function actualizar(id, estado) {
    try {
        let tarea = {
            estado: estado
        };

        const respuesta = await fetch(`http://localhost:3000/api/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(tarea)
        });

        const datos = await respuesta.json();
        console.log(datos);

        //  traer los datos para actualizar la lista y el contador
        traerDatos();
    } catch (error) {
        console.error(error);
    }
}

// funcion delete para eliminar una tarea del servidor
async function deleteTarea(id) {
    try {
        const respuesta = await fetch(`http://localhost:3000/api/task/${id}`, {
            method: "DELETE"
        });

        const dataBorrada = await respuesta.json();
        console.log(dataBorrada);

        // Atualiza la lista de tareas después de eliminar una
        traerDatos();
    } catch (error) {
        console.error(error);
    }
}

//  evento  de click al boton para que al hacer clic y se agregue una nueva tarea
btnTarea.addEventListener("click", agregarTarea);

//  al presionar enter, se agrega una nueva tarea
tareaTextoNueva.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        agregarTarea();
    }
});

// funcion que se ejecuta cuando se hace clic en el boton de agregar tarea
async function agregarTarea() {
    await daDatos(); // Llamamos a la funcion para enviar la nueva tarea al servidor
    tareaTextoNueva.value = ""; // limpiamos el campo de texto después de agregar la tarea
}

// Añadimos un evento para que cuando la pagina cargue completamente, se traigan las tareas del servidor
window.addEventListener("load", (event) => {
    traerDatos(); // Traemos y mostramos las tareas cuando la pagina carga
    console.log("La página se ha cargado completamente");
});
