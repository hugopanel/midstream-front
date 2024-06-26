import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo.png';

export default function NewTask() {
    return (
        // (<main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>First Post</h1>;</main>)

        <div className="min-h-screen bg-teal-900 text-gray-900 flex justify-center items-baseline">
            <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 text-inherit">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
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
                                    type="text" placeholder="Task 1" id="title" name="title" />

                                <label htmlFor="start-date" className="text-gray-700">
                                    Start Date
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="01/01/25" id="start-date" name="start-date" />
                                <label htmlFor="end-date" className="text-gray-700">
                                    End Date
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="31/12/25" id="end-date" name="end-date" />
                                <label htmlFor="description" className="text-gray-700">
                                    Description
                                </label>
                                <textarea name="description" id="description" placeholder="Describe the task..." className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                ></textarea>

                            </div>
                            <div className="mx-auto max-w-xs mb-10">
                                <label htmlFor="author" className="text-gray-700">
                                    Author
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Author" id="author" name="author" disabled />
                                <label htmlFor="assignee" className="text-gray-700">
                                    Assignee
                                </label>
                                <input
                                    className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Jean Moulin" id="assignee" name="assignee" />
                                <label htmlFor="priority" className="text-gray-700">
                                    Priority
                                </label>
                                <select id="priority" className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-500 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 peer"
                                >
                                    <option className="text-gray-500" selected>Choose a priority</option>
                                    <option className="text-gray-500" value="1">Crucial</option>
                                    <option className="text-gray-500" value="2">Urgent</option>
                                    <option className="text-gray-500" value="3">Whenever</option>
                                    <option className="text-gray-500" value="4">Sok</option>
                                </select>
                                <label htmlFor="tags" className="text-gray-700">
                                    Tags
                                </label>
                                <select id="tags" className="w-full mb-8 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-gray-500 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 peer"
                                >
                                    <option className="text-gray-500" selected>Add a tag</option>
                                    <option className="text-gray-500" value="1">Admin</option>
                                    <option className="text-gray-500" value="2">Front</option>
                                    <option className="text-gray-500" value="3">Back</option>
                                    <option className="text-gray-500" value="4">Hihi</option>
                                </select>
                                <div className="flex flex-wrap justify-evenly">
                                    <span className="inline-flex items-center rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10 mr-[10px] mb-[10px]"> Admin
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 -mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px] mb-[10px]"> Back
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 -mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>

                                </div>


                            </div>
                        </div>
                        <div className="w-full grid grid-cols-2 xl:gap-36 sm:gap-4">
                            <button
                                className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-teal-500 to-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                                <span className="ml-3">
                                    Save
                                </span>
                            </button>
                            <button
                                className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-orange-500 to-red-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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