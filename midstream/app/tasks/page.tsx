
"use client";

import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { format, parse } from 'date-fns';

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { List } from 'postcss/lib/list';
import NavBare from "../navigation/navBare";
import SideBare from "../navigation/sideBare";
import { XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo2.png';
import { useRouter } from 'next/navigation';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]
const filters = [
  {
    id: 'category',
    name: 'Tags',
    options: [
      { value: 'me', label: 'My Tasks', checked: false },
      { value: 'admin', label: 'Admin', checked: false },
      { value: 'front', label: 'Front', checked: true },
    ],
  },
  {
    id: 'color',
    name: 'Urgency',
    options: [
      { value: 'crucial', label: 'Crucial', checked: false },
      { value: 'urgent', label: 'Urgent', checked: false },
      { value: 'can wait', label: 'Can wait', checked: false },
    ],
  },
  {
    id: 'sizes',
    name: 'Due Date',
    options: [
      { value: 'today', label: 'Today', checked: false },
      { value: 'week', label: 'This week', checked: false },
      { value: 'month', label: 'This month', checked: false },
    ],
  },
]

const activeFilters = [{ value: 'objects', label: 'Objects' }]

interface Option{
  value:string;
  label:string;
  checked: boolean;
}

interface Filter {
  id: string;
  name: string;
  options: Option[];
}

interface Project {
  id: string;
  name: string;
}

interface Task {
  id: string;
  beginningDate: string;
  endDate: string;
  priority: string;
  status: string;
  typeOfTask: string;
  title: string;
  description: string;
  belong: string;
  author: string;
  assignedTo: string;
  relatedTo: string[];
  avatar: string;
  colour: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const page ='Tasks';


const App: React.FC = () => {
  const [dragTemp, setDragTemp] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false)
  const dp1Ref = useRef<HTMLDivElement>(null);
  const dp2Ref = useRef<HTMLDivElement>(null);
  const dp3Ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState("User");

  const [FiltersDb, setFiltersDb] = useState<Filter[]>([]);
    
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);  
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksToDo, setTasksToDo] = useState<Task[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<Task[]>([]);
  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);

  const [avatarPaths] = useState([
    "M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082",
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
    "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
    "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0"
]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: HTMLElement) => {
    setDragTemp(element);
    console.log('dragStart', element);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dropRef: React.RefObject<HTMLDivElement>) => {
    e.preventDefault();
  };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropRef: React.RefObject<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (dragTemp && dropRef.current) {
  //     const rect = dropRef.current.getBoundingClientRect();
  //     const offsetY = e.clientY - rect.top;

  //     const childrenArray = Array.from(dropRef.current.children) as HTMLElement[];
  //     let inserted = false;

  //     for (let child of childrenArray) {
  //       const childRect = child.getBoundingClientRect();
  //       if (offsetY < childRect.top + childRect.height / 2) {
  //         dropRef.current.insertBefore(dragTemp, child);
  //         inserted = true;
  //         break;
  //       }
  //     }

  //     if (!inserted) {
  //       dropRef.current.appendChild(dragTemp);
  //     }

  //     // Logging content of dp2 and dp3 after drop
  //     // if (dropRef.current === dp2Ref.current || dropRef.current === dp3Ref.current) {
  //     //   dropRef.current.querySelectorAll('.drag').forEach((element) => {
  //     //     console.log(dropRef.current.id);
  //     //     console.log((element as HTMLElement).id);
  //     //   });
  //     // }
  //   }
  //   setDragTemp(null); // Reset dragTemp after drop
  // };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropRef: React.RefObject<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (dragTemp && dropRef.current) {
      const rect = dropRef.current.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
  
      const childrenArray = Array.from(dropRef.current.children) as HTMLElement[];
      let inserted = false;
  
      // Insert the dragged element at the correct position
      for (let child of childrenArray) {
        const childRect = child.getBoundingClientRect();
        if (offsetY < childRect.top + childRect.height / 2) {
          dropRef.current.insertBefore(dragTemp, child);
          inserted = true;
          break;
        }
      }
  
      // Append the dragged element if not inserted
      if (!inserted) {
        dropRef.current.appendChild(dragTemp);
      }
  
      console.log(dragTemp.id);
      console.log("tasks:", tasks);
      console.log("tasksId:", tasks.map((task) => task.id));
  
      const task = tasks.find((task) => task.id === dragTemp.id);
      console.log(task);
      if (task) {
        task.status = dropRef.current.id;
      }

      const allTask = allTasks.find((task) => task.id === dragTemp.id);
      if (allTask) {
        allTask.status = dropRef.current.id;
      }
      
      const updatedAllTasks = allTasks.map((task) =>
        task.id === dragTemp.id ? { ...task, status: dropRef.current.id } : task
      );
      setAllTasks(updatedAllTasks);
      console.log("setTasks", tasks);
      
  
      // Additional logging to verify content after drop
      if (dropRef.current === dp2Ref.current || dropRef.current === dp3Ref.current) {
        dropRef.current.querySelectorAll('.drag').forEach((element) => {
          console.log(dropRef.current.id);
          console.log((element as HTMLElement).id);
        });
      }
    } else {
      console.warn('dragTemp or dropRef.current is null');
    }
  };

  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const convertToISOFormat = (formattedDateString: string): string => {
    // Split the input date string into day, month, and year
    const [day, month, year] = formattedDateString.split('/').map(Number);
    
    // Create a Date object with the extracted values
    const date = new Date(Date.UTC(year, month - 1, day)); // Months are 0-based in JavaScript
  
    // Format the date to ISO string and return it
    return date.toISOString();
  };

  const hexToRgb = (hex: string): string => {
    // Remove the # symbol if present
    const cleanedHex = hex.replace("#", "");

    // Split the hex value into three parts (red, green, and blue)
    const red = parseInt(cleanedHex.substring(0, 2), 16);
    const green = parseInt(cleanedHex.substring(2, 4), 16);
    const blue = parseInt(cleanedHex.substring(4, 6), 16);

    // Return the RGB value as a string
    return `rgba(${red}, ${green}, ${blue},1)`;
};


  const getTasks = async () => {
    // setLoadingEmail('Loading...');
    // setErrorEmail('');
    const projectId = selectedProjectId;

    try {
        const response = await fetch('/api/tasks_to_display', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to get the members of the team');
        }

        const data = await response.json();
        console.log(data);
        for (let task of data.tasks) {
          task.beginningDate = formatDateTime(task.beginningDate);
          task.endDate = formatDateTime(task.endDate);
        }
        var tasksToDo: Task[] = [];
        var tasksInProgress: Task[] = [];
        var tasksDone: Task[] = [];
        for (let task of data.tasks) {
          if(task.status === 'To do') {
            tasksToDo.push(task);
          }
          else if(task.status === 'In progress') {
            tasksInProgress.push(task);
          }
          else {
            tasksDone.push(task);
          }
        }
        setTasks(data.tasks);
        setAllTasks(data.tasks);
        setTasksToDo(tasksToDo);
        setTasksInProgress(tasksInProgress);
        setTasksDone(tasksDone);
        console.log("setTasks", tasks);
        setTags(data.types);
        var filterstoadd = [];
        var optiontagsfilter = [];
        for(let type in data.types){
          var option = { value : data.types[type], label : data.types[type], checked : false};
          optiontagsfilter.push(option);
        }
        optiontagsfilter.push({ value : 'Mine', label : 'My tasks', checked : false});
        filterstoadd.push({id:'tags', name:'Tags', options : optiontagsfilter});
        setPriorities(data.priorities);
        var optionprioritiesfilter = [];
        for(let priority in data.priorities){
          var option = { value : data.priorities[priority], label : data.priorities[priority], checked : false};
          optionprioritiesfilter.push(option);
        }
        filterstoadd.push({id:'priority', name:'Urgency', options: optionprioritiesfilter})
        filterstoadd.push({
          id: 'dates',
          name: 'Due Date',
          options: [
            { value: 'today', label: 'Today', checked: false },
            { value: 'week', label: 'This week', checked: false },
            { value: 'month', label: 'This month', checked: false },
          ],
        })
        setFiltersDb(filterstoadd);
        console.log(data.priorities);
        for(let priority in data.priorities){
          console.log(data.priorities[priority]);
        }
        console.log("filterstoadd", filterstoadd);
    } catch (error: any) {
        // setErrorEmail(error.message);
        console.error('Error logging in:', error);
    } finally {
        // setLoadingEmail('');
    }
  };

  // const updateTasksLists = () => {
  //   var newTasksToDo: Task[] = [];
  //   var newTasksInProgress: Task[] = [];
  //   var newTasksDone: Task[] = [];
  //   for (let task of tasks) {
  //     if(task.status === 'To do') {
  //       newTasksToDo.push(task);
  //     }
  //     else if(task.status === 'In progress') {
  //       newTasksInProgress.push(task);
  //     }
  //     else {
  //       newTasksDone.push(task);
  //     }
  //   }
  //   setTasksToDo(newTasksToDo);
  //   setTasksInProgress(newTasksInProgress);
  //   setTasksDone(newTasksDone);

  //   console.log(tasksToDo);
  //   console.log(tasksInProgress);
  //   console.log(tasksDone);
  // }

  const fetchProjects = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        const data = await response.json();
        setProjects(data.projects);
        if (data.projects.length > 0) {
            setSelectedProjectId(data.projects[0].id);
        }
    } catch (error) {
        console.error('Error fetching teams :', error);
    }
  };

  
  
  const saveTasks = async () => {
    var tasksToSave = allTasks;
    for(let task in tasksToSave){
      tasksToSave[task].beginningDate = convertToISOFormat(tasksToSave[task].beginningDate);
      tasksToSave[task].endDate = convertToISOFormat(tasksToSave[task].endDate);
    }
    console.log("saveTasks", tasksToSave);
    console.log(tasksToSave);
    try {
        const response = await fetch('/api/save_tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks: tasksToSave }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save the tasks');
        }

        const data = await response.json();
    } catch (error: any) {
        console.error('Error saving tasks:', error);
    }
  };

  const setTasksToDisplay = (tasks: Task[]) => {
    var tasksToDo: Task[] = [];
    var tasksInProgress: Task[] = [];
    var tasksDone: Task[] = [];
    for (let task of tasks) {
      if(task.status === 'To do') {
        tasksToDo.push(task);
      }
      else if(task.status === 'In progress') {
        tasksInProgress.push(task);
      }
      else {
        tasksDone.push(task);
      }
    }
    setTasksToDo(tasksToDo);
    setTasksInProgress(tasksInProgress);
    setTasksDone(tasksDone);
  };
      

  useEffect(() => { 
    fetchProjects();
    window.addEventListener('beforeunload', saveTasks);
    setUserName(localStorage.getItem("userName") || "User");
    setUserId(localStorage.getItem("userId") || "User");
  }, []);

  useEffect(() => {
    if(allTasks.length > 0) {
      saveTasks();
    }
    getTasks();
    localStorage.setItem("projectId", selectedProjectId || '');
}, [selectedProjectId]);

  useEffect( () => {
    setTasksToDisplay(tasks);
  }, [tasks]);

  const handleCheckboxChange = (sectionId, optionIdx) => {
    var checkedOrNot = false;
    let updatedFiltersDb;
    console.log(FiltersDb);
    setFiltersDb(prevFilters =>
      updatedFiltersDb = prevFilters.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map((option, idx) => {
              if (idx === optionIdx) {
                checkedOrNot = !option.checked;
                return { ...option, checked: !option.checked };
              }
              return option;
            }),
          };
        }
        return section;
      })
    );
    console.log(updatedFiltersDb);
    var section = FiltersDb.find(section => section.id === sectionId);
    var option = section.options[optionIdx];
    var value = option.value;
    var filteredTasks = tasks;
    if(checkedOrNot) {
      filteredTasks = tasks.filter(task => {
        if(sectionId === 'tags') {
          if(value === 'Mine') {
            return task.assignedTo === userId;
          }
          return task.typeOfTask === value;
        }
        if(sectionId === 'priority') {
          return task.priority === value;
        }
        if(sectionId === 'dates') {
          const now = new Date();
          const endDate = parse(task.endDate, 'dd/MM/yyyy', new Date())
          if(value === 'today') {
            return task.endDate === formatDateTime(new Date().toString());
          }
          if(value === 'week') {
            return endDate >= new Date(now.setDate(now.getDate() - now.getDay())) && endDate <= new Date(now.setDate(now.getDate() - now.getDay() + 6));
          }
          if(value === 'month') {
            return endDate >= new Date(now.getFullYear(), now.getMonth(), 1) && endDate <= new Date(now.getFullYear(), now.getMonth() + 1, 0);
          }
        }
      });       
      setTasks(filteredTasks);
      console.log(filteredTasks);
    }
    else{
      setFilteredTasks(updatedFiltersDb);
    }
  };

  const setFilteredTasks = (filtersDb) => {
    console.log(filtersDb);
    var filteredTasks = allTasks;
      for(let section in filtersDb){
        for(let option in filtersDb[section].options){
          console.log(section, option);
          var sectionObj = filtersDb[section];
          var optionObj = sectionObj.options[option];
          console.log(sectionObj, optionObj);
          if(optionObj.checked){
            var value = optionObj.value;
            if(sectionObj.id === 'tags') {
              if(value === 'Mine') {
                filteredTasks = filteredTasks.filter(task => task.assignedTo === userId);
              }
              else{
                filteredTasks = filteredTasks.filter(task => task.typeOfTask === value);
              }
            }
            if(sectionObj.id === 'priority') {
              filteredTasks = filteredTasks.filter(task => task.priority === value);
            }
            if(sectionObj.id === 'dates') {
              const now = new Date();
              if(value === 'today') {
                filteredTasks = filteredTasks.filter(task => task.endDate === formatDateTime(new Date()));
              }
              if(value === 'week') {
                filteredTasks = filteredTasks.filter(task => parse(task.endDate, 'dd/MM/yyyy', new Date()) >= new Date(now.setDate(now.getDate() - now.getDay())) && parse(task.endDate, 'dd/MM/yyyy', new Date()) <= new Date(now.setDate(now.getDate() - now.getDay() + 6)));
              }
              if(value === 'month') {
                filteredTasks = filteredTasks.filter(task => parse(task.endDate, 'dd/MM/yyyy', new Date()) >= new Date(now.getFullYear(), now.getMonth(), 1) && parse(task.endDate, 'dd/MM/yyyy', new Date()) <= new Date(now.getFullYear(), now.getMonth() + 1, 0));
              }
            }
          }
        }
      }
    setTasks(filteredTasks);
    console.log(filteredTasks);
  }


  const addTask = (status) => {
    saveTasks();
    router.push('/tasks_create?status=' + status);
  }

  const editTask = (taskId) => {
    saveTasks();
    console.log("task edit");
    console.log(taskId);
    router.push('/tasks_edit?taskId=' + taskId);
  }

  const handleSelectedProjectChange = (e: ChangeEvent<HTMLSelectElement>) => setSelectedProjectId(e.target.value);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
      <SideBare page={page} />

      <div className="p-4 xl:ml-80">
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            {/* <div className="capitalize">
              <div className="flex items-center ml-8  xl:-mr-36">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
                  <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                </svg>
                <h6 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white ml-3">Tasks</h6>
              </div>
            </div> */}
            <div className="pt-2 relative">
              <label htmlFor="underline_select" className="sr-only">Underline select</label>
              <select id="underline_select" className="block font-semibold uppercase text-center py-2.5 px-0 w-full text-m bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={selectedProjectId || ''} onChange={handleSelectedProjectChange}>
                <option selected disabled>Choose a project</option>
                {projects.map((project) => (
                  <option className="text-gray-500" key={project.id} value={project.id}>{project.name}</option>
                )
                )}
              </select>
            </div>

            {/* <div className="pt-2 relative mx-auto text-gray-600">
              <input className="border-2 border-white bg-sky-50/20 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none placeholder:text-white"
                type="search" name="search" placeholder="Search" />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                <svg className="text-white h-4 w-4 fill-current enable-background:new 0 0 56.966 56.966;" xmlns="http://www.w3.org/2000/svg"
                  version="1.1" id="hi" x="0px" y="0px"
                  viewBox="0 0 56.966 56.966"
                  width="512px" height="512px">
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div> */}

            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4">
                        {FiltersDb.map((section) => (
                          <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                      <ChevronDownIcon
                                        className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map((option, optionIdx) => (
                                      <div key={option.value} className="flex items-center">
                                        <input
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          defaultChecked={option.checked}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="ml-3 text-sm text-gray-500"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            {/* Filters */}
            <section aria-labelledby="filter-heading">
              <h2 id="filter-heading" className="sr-only">
                Filters
              </h2>

              <div className="border border-white bg-transparent rounded-lg pb-2 pt-2 text-white focus:outline-none">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 focus:outline-none">
                  <Menu as="div" className="relative inline-block text-left focus:outline-none">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left text-white rounded-md bg-white shadow-2xl focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    option.current ? 'font-medium text-white' : 'text-gray-500',
                                    active ? 'bg-gray-100 focus:outline-none text-white' : '',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="inline-block text-sm font-medium text-pink hover:text-gray-900 sm:hidden"
                    onClick={() => setOpen(true)}
                  >
                    Filters
                  </button>

                  <div className="hidden sm:block">
                    <div className="flow-root">
                      <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200 focus:outline-none">
                        {FiltersDb.map((section, sectionIdx) => (
                          <Popover key={section.name} className="relative inline-block px-4 text-left  capitalize focus:outline-none">
                            <Popover.Button className="group inline-flex justify-center text-base font-medium text-white hover:text-blue-500/50 focus:outline-none">
                              <span>{section.name}</span>
                              {/* {sectionIdx === 0 ? (
                                <span className="ml-1.5 rounded bg-white border border-white px-1.5 py-0.5 text-xs font-semibold tabular-nums text-blue-300 focus:outline-none">
                                  1
                                </span>
                              ) : null} */}
                              <ChevronDownIcon
                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-gray-500 focus:outline-none"
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl focus:outline-none">
                                <form className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        onChange={() => handleCheckboxChange(section.id, optionIdx)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </form>
                              </Popover.Panel>
                            </Transition>
                          </Popover>
                        ))}
                      </Popover.Group>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center">
              <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="3" className="h-6 w-6 text-blue-gray-500">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </button>
              <a href="./profile_page">
                <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-90 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-700">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                  </svg>{userName} </button>
                <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-900">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </button>
              </a>
              <a href="./profile_page">
                <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </button>
              </a>
              <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </nav>
        <div className="mt-7 flex relative items-start">
          <div
            id="dp1"
            className="drop flex-1 bg-white/10 rounded-lg shadow-lg p-5 space-y-2 mr-2"
          >
            <h2 className="text-xl font-bold mb-2 ml-3">To Do</h2>
            <div
              id="To do"
              className="drop flex-1 p-3 space-y-2 min-h-[460px] h-fit"
              ref={dp1Ref}
              onDragOver={(e) => handleDragOver(e, dp1Ref)}
              onDrop={(e) => handleDrop(e, dp1Ref)}>
              {tasksToDo.map((task, index) => (
                <div
                  key={task.id}
                  id={`${task.id}`}
                  className={`drag w-full ${task.priority === 'high' ? 'bg-blue-100' : 'bg-blue-200'} p-2 rounded-xl shadow-md text-white`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
                >
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white/80 text-gray-700 shadow-md">
                    <div className={`bg-clip-border mx-4 rounded-3xl overflow-hidden shadow-[${hexToRgb(task.colour)}] text-white shadow-lg absolute mt-2 grid h-13 w-13 place-items-center`} style={{ backgroundColor: hexToRgb(task.colour), boxShadow: `0px 10px 15px -3px ${hexToRgb(task.colour)}`}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5 m-2 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d={avatarPaths[task.avatar - 1]} />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.endDate}</p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold capitalize leading-snug text-blue-gray-900">{task.title}</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4 flex justify-end">
                      <span className="inline-flex items-center capitalize rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">{task.typeOfTask}</span>
                        <button onClick={(e) => editTask(task.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 ml-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
            <button onClick={(e) => addTask("To do")}className="text-lg font-semibold mb-2 pt-2 mt-2 flex items-center bottom-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-white font-semibold">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
              Add Task
            </button>

          </div>
          <div
            id="dp2"
            className="drop flex-1 bg-white/10 rounded-lg shadow-lg p-5 space-y-2 mr-2"
          >
            <h2 className="text-xl font-bold mb-2 ml-3">In Progress</h2>
            <div
              id="In progress"
              className="drop flex-1 p-3 space-y-2 min-h-[460px]"
              ref={dp2Ref}
              onDragOver={(e) => handleDragOver(e, dp2Ref)}
              onDrop={(e) => handleDrop(e, dp2Ref)}>
              {tasksInProgress.map((task, index) => (
                <div
                  key={task.id}
                  id={`${task.id}`}
                  className={`drag w-full ${task.priority === 'high' ? 'bg-blue-100' : 'bg-blue-200'} p-2 rounded-xl shadow-md text-white`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
                >
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white/80 text-gray-700 shadow-md">
                    <div className={`bg-clip-border mx-4 rounded-3xl overflow-hidden shadow-[${hexToRgb(task.colour)}] text-white shadow-lg absolute mt-2 grid h-13 w-13 place-items-center`} style={{ backgroundColor: hexToRgb(task.colour), boxShadow: `0px 10px 15px -3px ${hexToRgb(task.colour)}`}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5 m-2 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d={avatarPaths[task.avatar - 1]} />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.endDate}</p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold capitalize leading-snug text-blue-gray-900">{task.title}</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4 flex justify-end">
                      <span className="inline-flex items-center capitalize rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">{task.typeOfTask}</span>
                        <button onClick={(e) => editTask(task.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 ml-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={(e) => addTask("In progress")} className="text-lg font-semibold mb-2 pt-2 mt-2 flex items-center bottom-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-white font-semibold">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
              Add Task
            </button>
          </div>

          <div
            id="dp3"
            className="drop flex-1 bg-white/10 rounded-lg shadow-lg p-5 space-y-2"
          >
            <h2 className="text-xl font-bold mb-2 ml-3">Done</h2>
            <div
              id="Done"
              className="drop flex-1 p-3 space-y-2 min-h-[460px]"
              ref={dp3Ref}
              onDragOver={(e) => handleDragOver(e, dp3Ref)}
              onDrop={(e) => handleDrop(e, dp3Ref)}>
                {tasksDone.map((task, index) => (
                <div
                  key={task.id}
                  id={`${task.id}`}
                  className={`drag w-full ${task.priority === 'high' ? 'bg-blue-100' : 'bg-blue-200'} p-2 rounded-xl shadow-md text-white`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
                >
                  <div className="relative flex flex-col bg-clip-border rounded-xl bg-white/80 text-gray-700 shadow-md">
                    <div className={`bg-clip-border mx-4 rounded-3xl overflow-hidden shadow-[${hexToRgb(task.colour)}] text-white shadow-lg absolute mt-2 grid h-13 w-13 place-items-center`} style={{ backgroundColor: hexToRgb(task.colour), boxShadow: `0px 10px 15px -3px ${hexToRgb(task.colour)}`}}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5 m-2 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d={avatarPaths[task.avatar - 1]} />
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.endDate}</p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold capitalize leading-snug text-blue-gray-900">{task.title}</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4 flex justify-end">
                      <span className="inline-flex items-center capitalize rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">{task.typeOfTask}</span>
                        <button onClick={(e) => editTask(task.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 ml-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                    </div>
                  </div>
                </div>
              ))}
                
            </div>
            <button onClick={(e) => addTask("Done")} className="text-lg font-semibold mb-2 pt-2 mt-2 flex items-center bottom-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-white font-semibold">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
              Add Task
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;