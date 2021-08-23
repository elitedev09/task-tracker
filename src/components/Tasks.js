import Task from './Task'
import {FaTimes} from 'react-icons'
const Tasks = ({tasks, onDelete, onToggle}) => {
    return (       
        <>
        {tasks.map((task, index)=>(
            <Task key={index} task = {task}
            onDelete={onDelete}
            onToggle={onToggle}
            />
        ))}            
        </>
    )
}

export default Tasks

 
