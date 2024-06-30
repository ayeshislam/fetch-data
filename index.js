

let url=`http://localhost:3000/tasks`;
document.addEventListener("DOMContentLoaded",function(){
  const  limit=5;
  let curentpage=1;
  async function fetchTasks(){
    try {
      let response =await fetch(`http://localhost:3000/tasks`);
      let data= await response.json();
      displayTasks(paginateTask(data));
      displaypagination(data);
    } catch (error) {
      console.log("error");
    }
  }
  function displayTasks(data){
    let container=document.getElementById("container");
    container.innerHTML="";
    data.forEach(ele => {
      const priority=calculatepriority(ele.dueDate);
       container.innerHTML +=`<div class="task-card ${priority.toLowerCase()}-priority"<h3>${ele.title}</h3><p>${ele.description}</p><p>${ele.status}</p><p>${newDate(task.dueDate).toLocaleString()}</p><p>priority:${priority}</p><button onclick="editTask(${ele.id})">Edit</button><button onclick="DeletTask(${ele.id})">Delete</button></div>`;
      
    });
  }
  function calculatepriority(dueDate){
    const present =new Date();
    const due=new Date(dueDate);
    const  diff=(due-present)/(1000*60);
    if(diff<=2)return "High";
    if(diff<=3)return "Medium";
    return "Low";
    
  }
  async function addTask(event){
    event.preventDefault();
    const  title=document.getElementById("title").value;
    const  description=document.getElementById("description").value;
    const  dueDate=document.getElementById("dueDate").value;
    const  status=document.getElementById("status").value;
    const task={
      title,description,dueDate,status};
      try {
        await fetch(`http://localhost:3000/tasks`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(task)
        });
        fetchTasks();
      } catch (error) {
        console.log("error");
        
      }
    }
    async function editTask(id){
      const updatedTask ={
        title:prompt("enter new title");
        description:prompt("enter new decription");
        dueDate:prompt("enter new due date");
        title:prompt("enter new title");
        status:prompt("enter new status - open ,inprogress, closed");
      };
      try {
        await fetch(`http://localhost:3000/tasks/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(updatedTask)
        });
        fetchTasks();
      } catch (error) {
        console.log("error")
      }
    }
    async function deleteTask(id){
      try {
        await fetch(`http://localhost:3000/tasks/${id}`,{
          method:'DELETE'});
          fetchTasks();
      } catch (error) {
      cponsole.log("error");  
      }
    }
    function paginateTask(data){
      const start=(currentpage-1)*limit;
       const end =start+limit;
       return data.slice(start,end);


    }
    function displaypagination(data){
      const pagecount=Math.ceil(data.length/limit);
      const pc=document.getElementById("pc");
      pc.innerHTML="";
      for(let i=1;i<=pageCount;i++){
        pc.innerHTML+=<button onClick="changePage(${i}">${i}</button>;
      }
    }
  function changePage(page){
    currentpage=page;
    fetchTasks();
  }
function filterTasks(data,criteria){
  return data.filter(task=>{
    return(criteria.status ===''||task.status=== criteria.status)&&(criteria.priority===''||calculatepriority(task.dueDate)===criteria.priority);
  });
}
  



  document.getElementById("filterForm").addEventListener("submit",event=>{
    event.preventDefault();
    const criteria={
      status:document.getElementById("filterStatus").value;
      status:document.getElementById("filterStatus").value;
  })
})