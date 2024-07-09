import { use, useEffect, useState } from "react";

import { se } from "date-fns/locale";
import { set } from "date-fns";

type TasksProps = {
  projectId: string;
}

const nbMaxTasks = 4;

const Tasks: React.FC<TasksProps> = ({projectId}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Liste des tags et leurs couleurs associées 


  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem('userId');;
      const response = await fetch('/api/tasks_assigned', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, userId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get tasks');
      }
      console.log(data);

      setTasks(data.tasks.slice(0, nbMaxTasks));
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get tasks');
      }
    } catch (error) {
      console.error('Error during fetching tasks:', error);
    }
  }

  useEffect(() => {
    fetchTasks();
  
  },[projectId]);
  return (
    tasks.map((task) => (
      <div key={task.id} className="relative capitalize flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        {taskIcon[task.priority]}
        <div className="p-4 text-right">
          <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.status}</p>
          <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{task.title}</h4>
        </div>
        <div className="border-t border-blue-gray-50 p-4">
            <span key={task.typeOfTask} className={`inline-flex capitalize items-center rounded-md px-4 py-2 text-sm font-medium ring-1 ring-inset mr-[10px] bg-${task.typeOfTask === 'Bug' ? 'pink' : task.typeOfTask === 'Feature' ? 'indigo' : 'green'}-50 text-${task.typeOfTask === 'Bug' ? 'pink' : task.typeOfTask === 'Feature' ? 'indigo' : 'green'}-600 ring-${task.typeOfTask === 'Bug' ? 'pink' : task.typeOfTask === 'Feature' ? 'indigo' : 'green'}-500/10`}> {task.typeOfTask} </span>
        </div>
      </div>
    ))
  );
}
export default Tasks;
interface Task {
  id: string;
  title: string;
  description: string;
  priority: priority;
  beginningDate: Date;
  endDate: Date;
  typeOfTask:string;
  status: taskStatus;
}
interface Tag {
  id: number;
  name: string;
  color: tagColor;
}
enum tagColor {
  pink = "pink",
  indigo = "indigo",
  green = "green",
}
enum priority {
  VeryUrgent = "very urgent",
  Urgent = "urgent",
  OnTime = "on time",
  CanWait = "can wait",

}
enum taskStatus {
  ToDo = "To do",
  InProgress = "In progress",
  Done = "Done",
}

// Liste les logos prédéfinies pour les types de tâches
const taskIcon: Record<priority, JSX.Element> = {
  "very urgent": ( // Logo bleu avec appareil photo
    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd"></path>
        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
      </svg>
    </div>
  ),

  "urgent": ( // Logo violet en forme d'escalier
    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-indigo-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
      </svg>
    </div>
  ),
  "on time": (  // Logo vert avec un bonhomme et un +
    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
      </svg>
    </div>
  ),
  "can wait": (  // Logo rose avec un bonhomme
    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"></path>
      </svg>
    </div>
  ),
};