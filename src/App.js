import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import Addtask from './components/Addtask'
import Footer from './components/Footer'
import About from './components/About'

function App() {

  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks  = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json() 
  return data 
}
// Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json() 
  return data 
}

// Add Task
const addTask = async (task) => {

  console.log(task)

  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task),  

  })
  const data = await res.json()
  setTasks([...tasks, data])
 
}

//Delete Task
const deleteTask = async (id) => {

  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !==id))
  console.log('delete', id)
}

// Toggle Reminder
const toggleReminder = async (id) =>{
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle, 
  reminder : !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(updTask),
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id 
  ? {...task, reminder : data.reminder}: task )
  )
 
}
  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask
        (!showAddTask)} 
        showAdd={showAddTask}  
        />
      
      <Route path='/' exact render={(props) => (
        <>
        {showAddTask && <Addtask onAdd = {addTask} />}
              {tasks.length > 0 ? (<Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle = {toggleReminder} 
              />) : ('No Task To Show')}
        </>
      )} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;