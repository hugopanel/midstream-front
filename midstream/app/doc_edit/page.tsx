"use client";

import { useEffect, useRef } from 'react';

import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
    useEffect(() => {
        const textareas = document.querySelectorAll<HTMLTextAreaElement>('textarea');

        const autoResize = (textarea: HTMLTextAreaElement) => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };

        textareas.forEach(textarea => {
            // Initial resize to fit the content
            autoResize(textarea);

            // Attach the autoResize function to the input event
            textarea.addEventListener('input', () => autoResize(textarea));
        });

        // Cleanup function to remove the event listener
        return () => {
            textareas.forEach(textarea => {
                textarea.removeEventListener('input', () => autoResize(textarea));
            });
        };
    }, []);

    return (
        <div className="flex flex-col bg-white justify-center">
            <div className=" bg-white p-4 text-black flex items-center mb-5 border-b-2">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h2 className="text-xl ml-3">mid<b>stream</b></h2>
                <div className="relative mx-auto text-gray-600">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search" />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        <svg className="text-gray-600 h-4 w-4 fill-current enable-Editorground:new 0 0 56.966 56.966;" xmlns="http://www.w3.org/2000/svg"
                            version="1.1" id="1" x="0px" y="0px"
                            viewBox="0 0 56.966 56.966"
                            width="512px" height="512px">
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
                <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg grid h-10 w-10 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-inherit">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col bg-white p-4 text-black p-4 text-black">
                <div className="inset-0 p-8 pt-0 pb-0 grid grid-cols-12 ">
                    <div className="col-span-2"></div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full h-5 font-bold text-3xl p-4 bg-white pb-0 rounded resize-none focus:outline-none focus:ring-0"
                            placeholder="Your next brilliant idea..."
                        >Document Title</textarea>
                    </div>
                    <div className="col-span-2"></div>
                </div>

                <div className='text-gray-500 inset-0 p-8 pt-0 pb-10 -mt-5 grid grid-cols-12'>
                    <div className="col-span-2"></div>
                    <div className="col-span-8 flex items-center pl-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                        </svg>
                        {/* <p className='pr-6 pl-3 text-sm'>Project 1</p> */}
                        <select id="underline_select" className="pr-6 pl-3 text-sm appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option selected>Project 1</option>
                            <option value="1">Project 2</option>
                            <option value="2">Project 3</option>
                            <option value="3">Project 5</option>
                            <option value="4">Project 6</option>
                        </select>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <p className='pr-6 pl-3 text-sm'> 06/06/2024</p>
                    </div>
                    <div className="col-span-2"></div>
                </div>

                <div className="inset-0 p-8 pb-0 grid grid-cols-12 ">
                    <div className="col-span-2"></div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full font-semibold text-lg p-4 bg-white pb-0 rounded ring-white focus:outline-none focus:ring-0"
                            placeholder="Your next brilliant idea..."
                        >Section 1 Title</textarea>
                    </div>
                    <div className="col-span-2"></div>
                </div>
                <div className="inset-0 p-8 pb-2 pt-0 grid grid-cols-12 ">
                    <div className="col-span-2 flex">
                        <p className='pl-6 pr-4'>References <Link href="doc_edit"><u className="underline text-blue-300">Doc 1</u> </Link></p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full border-l-8 border-l-blue-400 p-4 rounded focus:outline-none focus:ring-0"
                            placeholder="Your next brilliant idea..."
                        >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
                        </textarea>
                    </div>
                    <div className="col-span-2 p-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="inset-0 p-8 pb-0 grid grid-cols-12 ">
                    <div className="col-span-2"></div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full font-semibold text-lg p-4 bg-white pb-0 rounded focus:outline-none focus:ring-0"
                            placeholder="Your next brilliant idea..."
                        >Section 2 Title</textarea>
                    </div>
                    <div className="col-span-2"></div>
                </div>
                <div className="inset-0 p-8 pb-2 pt-0 grid grid-cols-12 ">
                    <div className="col-span-2 flex">
                        <p className='pr-4'>Referenced in <Link href="doc_edit" data-popover-target="popover-image"><u className="underline text-blue-300">Doc 2</u> </Link></p>
                        <div data-popover id="popover-image" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-96 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
                            <div className="grid grid-cols-5">
                                <div className="col-span-3 p-3">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">About Italy</h3>
                                        <p>Italy is located in the middle of the Mediterranean Sea, in Southern Europe it is also considered part of Western Europe. A unitary parliamentary republic with Rome as its capital and largest city.</p>
                                        <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg></a>
                                    </div>
                                </div>                        </div>
                            <div data-popper-arrow></div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full border-l-8 border-l-yellow-300 p-4 rounded focus:outline-none focus:ring-0"
                            placeholder="Your next brilliant idea..."
                        >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
                        </textarea>
                    </div>
                    <div className="col-span-2 p-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="inset-0 p-8 pb-2 pt-0 grid grid-cols-12 ">
                    <div className="col-span-2 flex">

                    </div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full p-4 rounded focus:outline-none focus:ring-0"
                            placeholder="Your next brilliant idea..."
                        >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
                        </textarea>
                    </div>
                    <div className="col-span-2 p-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='text-gray-600 inset-0 p-8 pt-10 pb-10 -mt-5 grid grid-cols-12'>
                    <div className="col-span-2"></div>
                    <div className="col-span-8 pl-4">
                        <div className='grid grid-cols-12'>
                            <div className='grid grid-rows-2 col-span-2'>
                                <div className='border-b-2 border-b-gray-300'></div>
                                <div></div>
                            </div>
                            <div className='flex col-span-8 items-center justify-center'>
                                <button className='flex items-center justify-center bg-gray-100 rounded-2xl p-2 mr-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 pl-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    <p className='pr-3 pl-3 text-sm'>New Section</p>
                                </button>
                                <button className='flex items-center justify-center bg-gray-100 rounded-2xl p-2 mr-1 ml-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 pl-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                    </svg>
                                    <p className='pr-3 pl-3 text-sm'>New Paragraph</p>
                                </button>
                                <button className='flex items-center justify-center bg-gray-100 rounded-2xl p-2 ml-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8 pl-3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg>
                                    <p className='pr-3 pl-3 text-sm'>New Reference</p>
                                </button>
                            </div>
                            <div className='grid grid-rows-2 col-span-2'>
                                <div className='border-b-2 border-b-gray-300'></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2"></div>
                </div>
            </div>
        </div>
    )
}



// "use client";
// import Image from 'next/image'
// import { useEffect, useRef } from 'react';
// import Link from 'next/link';



// export default function Home() {

//     const textareaRef = useRef<HTMLTextAreaElement>(null);

//     useEffect(() => {
//         const textarea = textareaRef.current;
//         if (textarea) {
//             const autoResize = () => {
//                 textarea.style.height = 'auto';
//                 textarea.style.height = `${textarea.scrollHeight}px`;
//             };

//             // Initial resize to fit the content
//             autoResize();

//             // Attach the autoResize function to the input event
//             textarea.addEventListener('input', autoResize);

//             // Cleanup function to remove the event listener
//             return () => textarea.removeEventListener('input', autoResize);
//         }
//     }, []);

//     return (
//         <div className="flex flex-col bg-white justify-center">
//             <div className="w-2/3 bg-white p-4 text-black">
//                 <h2 className="text-xl mb-4">Document Title</h2>
//                 <div className="space-y-2">

//                 </div>
//             </div>
//             <div className="flex flex-col bg-white p-4 text-black h-screen p-4 text-black">
//                 <div  className="inset-0 p-8 pb-0 grid grid grid-cols-12 ">
//                     <div className="col-span-2"></div>
//                     <div className="col-span-8">
//                     <textarea
//                         // ref={textareaRef}
//                         className="w-full font-semibold text-lg p-4 bg-white pb-0 rounded"
//                         placeholder="Your nextbrilliant idea..."
//                     >Section 1 Title</textarea></div>
//                     <div className="col-span-2"></div>
//                 </div>
//                 <div className="inset-0 p-8 pb-2 pt-0 grid grid grid-cols-12 ">
//                     <div className="col-span-2 flex">
//                         <p className='pl-6 pr-4'>References <Link href="doc_edit"><u className="underline text-blue-300">Doc 1</u> </Link></p>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="h-5 w-5">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
//                         </svg>
//                     </div>
//                     <div className="col-span-8">
//                         <textarea
//                             ref={textareaRef}
//                             className="w-full border-l-8 border-l-blue-400 p-4 rounded"
//                             placeholder="Your nextbrilliant idea...">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
//                         </textarea>
//                     </div>
//                     <div className="col-span-2 p-2">
//                         <button>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>


//                 <div  className="inset-0 p-8 pb-0 grid grid grid-cols-12 ">
//                     <div className="col-span-2"></div>
//                     <div className="col-span-8">
//                     <textarea
//                         // ref={textareaRef}
//                         className="w-full font-semibold text-lg p-4 bg-white pb-0 rounded"
//                         placeholder="Your nextbrilliant idea..."
//                     >Section 2 Title</textarea></div>
//                     <div className="col-span-2"></div>
//                 </div>
//                 <div className="inset-0 p-8 pb-2 pt-0 grid grid grid-cols-12 ">
//                     <div className="col-span-2 flex">
//                         <p className='pr-4'>Referenced in <Link href="doc_edit"><u className="underline text-blue-300">Doc 2</u> </Link></p>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="h-5 w-5">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//                         </svg>
//                     </div>
//                     <div className="col-span-8">
//                         <textarea
//                             // ref={textareaRef}
//                             className="w-full border-l-8 border-l-yellow-300 p-4 rounded"
//                             placeholder="Your nextbrilliant idea...">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
//                         </textarea>
//                     </div>
//                     <div className="col-span-2 p-2">
//                         <button>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//                 <div className="inset-0 p-8 pb-2 pt-0 grid grid grid-cols-12 ">
//                     <div className="col-span-2 flex">
//                         <p className='pr-4'>Referenced in <Link href="doc_edit"><u className="underline text-blue-300">Doc 2</u> </Link></p>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="h-5 w-5">
//                             <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//                         </svg>
//                     </div>
//                     <div className="col-span-8">
//                         <textarea
//                             // ref={textareaRef}
//                             className="w-full border-l-8 border-l-yellow-300 p-4 rounded"
//                             placeholder="Your nextbrilliant idea...">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?
//                         </textarea>
//                     </div>
//                     <div className="col-span-2 p-2">
//                         <button>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }