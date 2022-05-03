console.log('conected');

document.getElementById('form').addEventListener('submit', saveTask);

function saveTask(event) {

   let elementsForm = document.getElementById('form').elements;
   let error = false;

   for (let i = 0; i < elementsForm.length; i++) {
       if (!elementsForm[i].value) {
        event.preventDefault()
        document.getElementById('error-empty').innerHTML = 'Los campos no pueden estar vacios';
        error = true

       }else{
           document.getElementById('form').submit()
       }
       
   }
    
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  

  let task = {
    title,
    description
  };



    if (localStorage.getItem('tasks') === null) { /* si no existen tareas */
        let tasks = []  
        tasks.push(task);  /* creamos, es decir, se agrega una nueva tarea */
        localStorage.setItem('tasks',JSON.stringify(tasks))  /* y almaceno las tareas de la variable 18 */
         
    }  else {
     let tasks = JSON.parse(localStorage.getItem('tasks'))  /* las leo */ // el parse convierte todo en un objeto
      tasks.push(task)                                        /* actualiza las tareas */
      localStorage.setItem('tasks',JSON.stringify(tasks))   /* y almaceno de nuevo */
    }
    
    
    form.reset()
}

function getTasks() {
   let tasks = JSON.parse(localStorage.getItem('tasks'))
   
  let tasksView = document.getElementById('tasks')

  tasksView.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
   let title = tasks[i].title
   let description = tasks[i].description


      tasksView.innerHTML += `
      <div class="card"> 
      <div class="card-body">
        <p>${title} - ${description} </p>
        <a class="btn btn-danger" onclick="deleteTasks('${title}')">Delete</a>
        </div>
      </div>
        

      `
      
  }
}

function deleteTasks(title, description) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    for (let i = 0; i < tasks.length; i++) {
       if ((tasks[i].title == title)) {
           tasks.splice(i,1)
           
       }
        
    }

    localStorage.setItem('tasks',JSON.stringify(tasks))
    getTasks()
}

getTasks()




