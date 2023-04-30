// Arreglo de tareas
const tasks = [];

// Arreglo condicionado con el local storage
let lStorage = JSON.parse(localStorage.getItem("data")); // Trayendo datos del local storage
if (localStorage.getItem("data") != null) {
  // Agregando datos al arreglo de tareas
  for (let i = 0; i < lStorage.length; i++) {
    tasks.push(lStorage[i]);
  }
} else {
  
}

// Funcion de guardar datos en el local storage
function saveLocalStorage() {
  let data = JSON.stringify(tasks);
  localStorage.setItem("data", data);
}

// --------------------------- //

document.querySelector("#btn_nt").addEventListener("click", (e) => {
  e.preventDefault();
  let inpValue = document.querySelector("#text").value;
  document.querySelector(".container-task").innerHTML = "";
  if (inpValue == null || inpValue == "") {
    document.querySelector('.warning').classList.remove('none');
    viewTask();
  } else {
    // Crear tarea
    createTask(inpValue);
    // Mostar tarea
    viewTask();
    document.querySelector("#text").value = "";
  }
});

const createTask = (text) => {
  // Obteniedo en indice le elemento
  let indice = tasks.length;

  // Agregando la tarea al arreglo
  let myTask = {
    task: text,
  };

  tasks.push(myTask);
  saveLocalStorage();
};

const viewTask = () => {
  let nT = 0;

  tasks.forEach((element) => {
    // Creando el HTML de la tarea
    let div = document.createElement("div");
    let p = document.createElement("p");
    let btn = document.createElement("button");

    // Agregando valores a los elementos HTML
    p.innerText = element.task;
    btn.innerText = "X";
    btn.setAttribute("onclick", "deleteTask('" + element.task + "')");

    div.classList.add("task");
    btn.classList.add("btn_x");

    div.appendChild(p);
    div.appendChild(btn);

    // Usando el DOM para traer al contenedor padre
    let contTask = document.querySelector(".container-task");
    contTask.appendChild(div);

    nT++;
  });

  let nTask = (document.querySelector("#number_task").innerHTML = nT);
};

const deleteTask = (identify) => {
  // Eliminando tarea
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].task == identify) {
      tasks.splice(i, 1);
      saveLocalStorage();
    }
  }
  document.querySelector(".container-task").innerHTML = "";
  viewTask();
};

const removeNone = () => {
  document.querySelector('.warning').classList.add('none');
}

window.onload = viewTask();
