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
 
//GET
async function traerDatos() {
    try {
        //va esperarse y va traer a tareas.json
        const respuesta = await fetch("tareas.json")
        const datos = await respuesta.json()
        datos.forEach(elemento=>{
            let p = document.createElement("p")

        })
        console.log(datos)
    } catch (error) {
        console.error(error);
    };
}
 // da los datos
//POST
async function daDatos() {
    try {
        let tarea = {
            nombre:tareaTextoNueva.value,
            estado: false
        }
       const respuesta = await fetch("(http://localhost:3000/api/task)",{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify(tarea)
       })
       const datos = await respuesta.json()
       console.log(datos);
    } catch (error) {
        console.error(error);
    }
}



//PUT actualiza los datos


//DELETE elimina
