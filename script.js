let form = document.querySelector("#task_form");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector("#new_task");




// define event listener

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearAll);
filter.addEventListener("keyup", filterTask);
document.addEventListener('DOMContentLoaded',getTask);



//function

function addTask(e) {

    if (taskInput.value === '') {
        alert("Please fill in the field");
    }

    else {
        let li = document.createElement('li');

        li.appendChild(document.createTextNode(taskInput.value + " "));
        let aTag = document.createElement("a");
        aTag.setAttribute("href", "#");
        aTag.appendChild(document.createTextNode("x"));
        li.appendChild(aTag);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';

    }
    e.preventDefault();
}





function removeTask(e) {

    console.log(e.target.hasAttribute("href"));

    if (confirm("Are you sure??")) {

        let ele = e.target.parentElement;
        //   console.log(ele);
        ele.remove();
          removeFromLs(ele);


    }




}


function clearAll(e) {

    taskList.innerHTML = "";


}


//filter Task

function filterTask(e) {

    let text = e.target.value.toLowerCase();
    // console.log(text);

    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent;
        // console.log(item);

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });



}



//local storage


function storeTaskInLocalStorage(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }

     else{
      
        tasks = JSON.parse(localStorage.getItem('tasks'));

     }

     tasks.push(task);

     localStorage.setItem('tasks',JSON.stringify(tasks));

}



//getting task from LS

function getTask(){
 
    
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }

     else{
      
        tasks = JSON.parse(localStorage.getItem('tasks'));

     }

      tasks.forEach(task =>{

        let li = document.createElement('li');

        li.appendChild(document.createTextNode(task + " "));
        let aTag = document.createElement("a");
        aTag.setAttribute("href", "#");
        aTag.appendChild(document.createTextNode("x"));
        li.appendChild(aTag);
        taskList.appendChild(li);
    
      });
}






function removeFromLs(taskItem){

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }

     else{
      
        tasks = JSON.parse(localStorage.getItem('tasks'));

     }



let li = taskItem;

// console.log(li.lastChild);
// console.log(li);
li.removeChild(li.lastChild);

tasks.forEach((task,index) =>{

        if(li.textContent.trim() === task) {
            tasks.splice(index,1);
        }


});


localStorage.setItem('tasks',JSON.stringify('tasks'));

}












