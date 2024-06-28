"use client";

import { ChangeEvent, FormEvent, SetStateAction, use, useEffect, useRef } from 'react';

import SearchBare from '../navigation/searchBare';
import Link from 'next/link';
import SelectProject, { Project } from '../navigation/selectProject';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SectionsComponent, { Section, SectionType } from './sectionsComponent';




export default function DocEdit() {
    const [project, setProject] = useState<Project>({ id: '', name: '' });
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [title, setTitle] = useState<string>('');
    const [sections, setSections] = useState<Section[]>([]);
    useEffect(() => {
        setTitle('Document Title');
        setSections([
            {
                title: 'Section 3 Title',
                content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. \n Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?',
                type: SectionType.Reference
            },
            {
                title: 'Section 2 Title',
                content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. \n Laborum ut dolor blanditiis a dicta vitae neque quis earum necessitatibus est aliquam, debitis corporis similique, quasi odio qui, quam non! Delectus?',
                type: SectionType.Referenced
            }
        ]);
    }, []);

    const handleReload = () => {
        const textareas = document.querySelectorAll<HTMLTextAreaElement>('textarea');
        const autoResize = (textarea: HTMLTextAreaElement) => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textareas.forEach(textarea => {
            autoResize(textarea);
            textarea.addEventListener('input', () => autoResize(textarea));
        });
        return () => {
            textareas.forEach(textarea => {
                textarea.removeEventListener('input', () => autoResize(textarea));
            });
        };
    }

    useEffect(() => {
        handleReload(); 
    }, []);

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setTitle(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
        return (
        <div className=" bg-white justify-center min-h-screen">
            <div className=" bg-white p-4 text-black flex items-center mb-5 border-b-2">
                <Link href="/doc_explorer">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </Link>
                <h2 className="text-xl ml-3">mid<b>stream</b></h2>
                <SearchBare searchValue={''} handleSearchSubmit={function (event: FormEvent<Element>): void { }} handleSearchChange={function (event: ChangeEvent<Element>): void { }} />
                <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg grid h-10 w-10 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-inherit">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col bg-white text-black p-4">
                <div className="inset-0 p-8 pt-0 pb-0 grid grid-cols-12 ">
                    <div className="col-span-2"></div>
                    <div className="col-span-8">
                        <textarea
                            className="w-full h-5 font-bold text-3xl p-4 bg-white pb-0 rounded resize-none focus:outline-none focus:ring-0"
                            placeholder="Document Title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="col-span-2"></div>
                </div>

                <div className='text-gray-500 inset-0 p-8 pt-0 pb-10 -mt-5 grid grid-cols-12'>
                    <div className="col-span-2"></div>
                    <div className="col-span-8 flex items-center pl-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                        </svg>
                        <SelectProject selectedProject={project} setSelectedProject={setProject} className='pr-6 pl-3 text-sm appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer' />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="pr-6 pl-3 text-sm"
                        />
                    </div>
                    <div className="col-span-2"></div>
                </div>
                <div className="pl-10 pr-10 pb-10">
                    <SectionsComponent initialSections={sections} />
                </div>
            </div>
        </div>
    )
}
