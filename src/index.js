let btnTarea = document.getElementById("btnAggTarea")
let tareaTextoNueva = document.getElementById("tareas")
let checkbox = 
function agregarTarea() {
    // obtenemos el valor digitado
    
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
        const respuesta = await fetch("http://localhost:3000/api/task")
        const datos = await respuesta.json()
        datos.forEach(elemento=>{
            let lista=document.createElement("li");
            nuevaTarea.textContent = elemento.nombre
            let checkssito=document.createElement("input")
            checkssito.type= "checkbox";
            nuevaTarea.appendChild(checkssito)
              

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
       const respuesta = await fetch("http://localhost:3000/api/task",{
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

btnTarea.addEventListener("click",daDatos)

//PUT actualiza los datos


//DELETE elimina
