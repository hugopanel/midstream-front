"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo.png';

interface MemberToSelect{
    userId: string;
    username: string;
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

export default function NewTask() {
    const [taskId, setTaskId] = useState<string>();
    const [tasks, setTasks] = useState<Task[]>([]);

    const [title, setTitle] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [author, setAuthor] = useState<string>();
    const [authorId, setAuthorId] = useState<string>();
    const [assignee, setAssignee] = useState<string>();
    const [priority, setPriority] = useState<string>();
    const [typeOfTask, setTypeOfTask] = useState<string>();
    const [members, setMembers] = useState<MemberToSelect[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);
    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
    const handleAssigneeChange = (e: ChangeEvent<HTMLSelectElement>) => setAssignee(e.target.value);
    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value);
    const handleTypeOfTaskChange = (e: ChangeEvent<HTMLInputElement>) => setTypeOfTask(e.target.value);

    const convertToISOFormat = (formattedDateString: string): string => {
        // Split the input date string into day, month, and year
        const [day, month, year] = formattedDateString.split('/').map(Number);
        
        // Create a Date object with the extracted values
        const date = new Date(Date.UTC(year, month - 1, day)); // Months are 0-based in JavaScript
      
        // Format the date to ISO string and return it
        return date.toISOString();
      };    
    
    const getMembers = async () => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');

        const projectId = localStorage.getItem('projectId');

        console.log(projectId);

        try {
            const response = await fetch('/api/get_members_by_project', {
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
            setMembers(data.members);
            console.log(data.members);
            // localStorage.setItem('token', data.token);
            // setSuccessEmail('Email updated.');
        } catch (error: any) {
            // setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            // setLoadingEmail('');
        }
    };

    const getTask = async (taskId: any) => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');
        try {
            const response = await fetch('/api/get_task_to_edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get the members of the team');
            }

            const data = await response.json();
            console.log(data);
            setTitle(data.title);
            setStartDate(data.beginningDate);
            setEndDate(data.endDate);
            setDescription(data.description);
            setStatus(data.status);
            setAuthorId(data.author);
            setAssignee(data.assignedTo);
            setPriority(data.priority);
            setTypeOfTask(data.typeOfTask);
            // localStorage.setItem('token', data.token);
            // setSuccessEmail('Email updated.');
        } catch (error: any) {
            // setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            // setLoadingEmail('');
        }
    };

    const saveTask = async () => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');

        const token = localStorage.getItem('token');
        const projectId = localStorage.getItem('projectId');
        const relatedTo = [projectId];

        var BeginningDate = convertToISOFormat(startDate ?? '');
        var EndDate = convertToISOFormat(endDate ?? '');

        var task: Task = { id : taskId, beginningDate : BeginningDate, endDate : EndDate, priority, status, belong : projectId,  typeOfTask, title, description, status, author : authorId, assignedTo :assignee, relatedTo};
        var tasksToSend: Task[] = [task];
        
        setTasks(tasksToSend);

        try {
            const response = await fetch('/api/save_tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks : tasksToSend }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get the members of the team');
            }

            const data = await response.json();
            router.push('/tasks');
            // localStorage.setItem('token', data.token);
            // setSuccessEmail('Email updated.');
        } catch (error: any) {
            // setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            // setLoadingEmail('');
        }
    };

    useEffect(() => {
        const id = searchParams.get('taskId');
        console.log(id);
        setTaskId(id|| '');
        if(id){
            getTask(id);
            getMembers();
            setAuthor(localStorage.getItem("userName") || "User");
        }else{
            router.push('/tasks');
        }
    }, []);

    const deleteTask = async () => {            
        try {
            const response = await fetch('/api/delete_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get the members of the team');
            }

            const data = await response.json();
            router.push('/tasks');
        } catch (error: any) {
            console.error('Error logging in:', error);
        }
    };


    
    return (
        // (<main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>First Post</h1>;</main>)

        <div className="min-h-screen bg-teal-900 text-gray-900 flex justify-center items-baseline">
            <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-10 h-10 text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className=" p-6 sm:p-12">
                    {/* <div className=" flex flex-col items-center">
                        <Image
                            src={logo}
                            alt="logo"
                        />
                    </div> */}


                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-green-500 inline-block text-transparent bg-clip-text mb-5">
                            Your Task
                        </h1>
                        <h1 className="text-2xl xl:text-3xl font-extrabold">

                        </h1>
                        <div className="w-full grid grid-cols-2 mt-8 xl:gap-36 sm:gap-4">

                            <div className="mx-auto max-w-xs mb-10">
                                <label htmlFor="title" className="text-gray-700">
                                    Title
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Task 1" id="title" name="title" value={title} onChange={handleTitleChange} />

                                <label htmlFor="start-date" className="text-gray-700">
                                    Start Date
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="01/01/25" id="start-date" name="start-date" value={startDate} onChange={handleStartDateChange}/>
                                <label htmlFor="end-date" className="text-gray-700">
                                    End Date
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="31/12/25" id="end-date" name="end-date" value={endDate} onChange={handleEndDateChange}/>
                                <label htmlFor="description" className="text-gray-700">
                                    Description
                                </label>
                                <textarea name="description" id="description" maxLength={50} value={description} onChange={handleDescriptionChange}  placeholder="Describe the task..." className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                ></textarea>

                            </div>
                            <div className="mx-auto max-w-xs mb-10">
                                <label htmlFor="author" className="text-gray-700">
                                    Author
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Author" id="author" name="author" value={author} disabled />
                                <label htmlFor="assignee" className="text-gray-700">
                                    Assignee
                                </label>
                                <select id="assignee" value={assignee} onChange={handleAssigneeChange}className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-500 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 peer"
                                >
                                    <option selected disabled>Add assignee</option>
                                    {members.map((member) => (
                                        <option key={member.userId} value={member.userId}>{member.username}</option>
                                    )
                                    )}
                                </select>
                                
                                {/* <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Jean Moulin" id="assignee" name="assignee" /> */}
                                <label htmlFor="priority" className="text-gray-700">
                                    Priority
                                </label>
                                <select id="priority" value={priority} onChange={handlePriorityChange} className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-500 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 peer"
                                >
                                    <option className="text-gray-500 capitalize" selected>Choose a priority</option>
                                    <option className="text-gray-500 capitalize" value="very urgent">very urgent</option>
                                    <option className="text-gray-500 capitalize" value="urgent">urgent</option>
                                    <option className="text-gray-500 capitalize" value="on time">on time</option>
                                    <option className="text-gray-500 capitalize" value="can wait">can wait</option>
                                </select>
                                <label htmlFor="tags" className="text-gray-700">
                                    Tag
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Tag" id="end-date" name="end-date" value={typeOfTask} onChange={handleTypeOfTaskChange}/>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 xl:gap-36 sm:gap-4">
                            <button onClick={saveTask}
                                className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-teal-500 to-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                                <span className="ml-3">
                                    Save
                                </span>
                            </button>
                            <button onClick={deleteTask}
                                className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-orange-500 to-red-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                                <span className="ml-3">
                                    Delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}