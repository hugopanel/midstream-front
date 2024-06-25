
"use client";

import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { List } from 'postcss/lib/list';
import { XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo2.png';

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
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const App: React.FC = () => {
  const [dragTemp, setDragTemp] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false)
  const dp1Ref = useRef<HTMLDivElement>(null);
  const dp2Ref = useRef<HTMLDivElement>(null);
  const dp3Ref = useRef<HTMLDivElement>(null);

  const [FiltersDb, setFiltersDb] = useState<Filter[]>([]);
    
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);  
  const [projects, setProjects] = useState<Project[]>([]); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksToDo, setTasksToDo] = useState<Task[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<Task[]>([]);
  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);

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
      console.log(task);

      const updatedTasks = tasks.map((task) =>
        task.id === dragTemp.id ? { ...task, status: dropRef.current.id } : task
      );

      setTasks(updatedTasks);
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
        filterstoadd.push({id:'category', name:'Tags', options : optiontagsfilter});
        setPriorities(data.priorities);
        var optionprioritiesfilter = [];
        for(let priority in data.priorities){
          var option = { value : data.priorities[priority], label : data.priorities[priority], checked : false};
          optionprioritiesfilter.push(option);
        }
        filterstoadd.push({id:'color', name:'Urgency', options: optionprioritiesfilter})
        filterstoadd.push({
          id: 'sizes',
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
      const response = await fetch('/api/projects');
      const data = await response.json();
      //setProjects(data.projects);
      setProjects(data.projects);
      setSelectedProjectId(data.projects[0].id);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      //setIsLoading(false);
    }
  };
  
  const saveTasks = async () => {
    var tasksToSave = tasks;
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
      

  useEffect(() => {    
    fetchProjects();
    window.addEventListener('beforeunload', saveTasks);
  }, []);

  useEffect(() => {
    if(tasks.length > 0) {
      saveTasks();
    }
    getTasks();
}, [selectedProjectId]);



  const handleSelectedProjectChange = (e: ChangeEvent<HTMLInputElement>) => setSelectedProjectId(e.target.value);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
      <aside className="bg-gradient-to-r from-blue-100 to-blue-50 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <div className=" flex flex-col items-center">
              <Image
                src={logo}
                alt="logo"
              />
            </div>
            {/* <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">MIDSTREAM</h6> */}
          </a>
          <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                  </svg>
                  <Link href="./homepage">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">dashboard</p></Link>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-inherit">
                    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                    <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                  </svg>

                  <Link href="./file_explorer">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">files</p></Link>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-inherit">
                    <path fillRule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
                    <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />
                  </svg>


                  <Link href="./tasks">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">tasks</p></Link>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                    <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd"></path>
                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                  </svg>
                  <Link href="./whiteboard">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">whiteboard</p></Link>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-inherit">
                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  </svg>

                  <Link href="./teams">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">management</p></Link>
                </button>
              </a>
            </li>
            <li>
              <a aria-current="page" className="active" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-inherit">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z" />
                                    </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-inherit">
                    <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                  </svg>
                  <Link href="./marketplace">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Marketplace</p></Link>
                </button>
              </a>
            </li>
          </ul>

          <ul className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mt-4 mb-2">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-700 font-black uppercase opacity-50">switch accounts</p>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                  </svg>
                  <Link href="./login">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign in</p></Link>
                </button>
              </a>
            </li>
            <li>
              <a className="" href="#">
                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                  <Link href="./register">
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign up</p>
                  </Link>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </aside>

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
              <a href="#">
                <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-90 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-700">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                  </svg>Loulou </button>
                <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-900">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </button>
              </a>
              <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </button>
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
        <div className="mt-7 flex relative ">
          <div
            id="dp1"
            className="drop flex-1 bg-white/10 rounded-lg shadow-lg p-5 space-y-2 mr-2"
          >
            <h2 className="text-xl font-bold mb-2 ml-3">To Do</h2>
            <div
              id="To do"
              className="drop flex-1 space-y-2 min-h-[460px]"
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
                    <div className={`bg-clip-border mx-4 rounded-3xl overflow-hidden ${task.priority === 'high' ? 'bg-gradient-to-tr from-green-600 to-green-400' : 'bg-gradient-to-tr from-pink-600 to-pink-400'} text-white shadow-lg absolute mt-2 grid h-13 w-13 place-items-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 m-2 text-white">
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.endDate}</p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold capitalize leading-snug text-blue-gray-900">{task.title}</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4 flex justify-end">
                      <span className="inline-flex items-center capitalize rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">{task.typeOfTask}</span>
                      <Link href="/tasks_edit" className='flex'>
                        <button>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 ml-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
            <button className="text-lg font-semibold mb-2 pt-2 mt-2 flex items-center bottom-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-white font-semibold">
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
                    <div className={`bg-clip-border mx-4 rounded-3xl overflow-hidden ${task.priority === 'high' ? 'bg-gradient-to-tr from-green-600 to-green-400' : 'bg-gradient-to-tr from-pink-600 to-pink-400'} text-white shadow-lg absolute mt-2 grid h-13 w-13 place-items-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 m-2 text-white">
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.endDate}</p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold capitalize leading-snug text-blue-gray-900">{task.title}</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4 flex justify-end">
                      <span className="inline-flex items-center capitalize rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">{task.typeOfTask}</span>
                      <Link href="/tasks_edit" className='flex'>
                        <button>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 ml-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-lg font-semibold mb-2 pt-2 mt-2 flex items-center bottom-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-white font-semibold">
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
                    <div className={`bg-clip-border mx-4 rounded-3xl overflow-hidden ${task.priority === 'high' ? 'bg-gradient-to-tr from-green-600 to-green-400' : 'bg-gradient-to-tr from-pink-600 to-pink-400'} text-white shadow-lg absolute mt-2 grid h-13 w-13 place-items-center`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 m-2 text-white">
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                      </svg>
                    </div>
                    <div className="p-4 text-right">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{task.endDate}</p>
                      <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold capitalize leading-snug text-blue-gray-900">{task.title}</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4 flex justify-end">
                      <span className="inline-flex items-center capitalize rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">{task.typeOfTask}</span>
                      <Link href="/tasks_edit" className='flex'>
                        <button>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 ml-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
                
            </div>
            <button className="text-lg font-semibold mb-2 pt-2 mt-2 flex items-center bottom-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-white font-semibold">
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