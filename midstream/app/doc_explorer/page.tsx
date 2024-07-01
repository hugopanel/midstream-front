"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import SideBare from "../navigation/sideBare";
import logo from '../assets/logo2.png';
import NavBare from '../navigation/navBare';
import SelectProject, { Project } from '../navigation/selectProject';
import SearchBare from '../navigation/searchBare';
import { formatDate } from '../format/format';
import NavTable from '../navigation/navTable';

const page = "Documents";

export interface Document {
    name: string;
    date: Date;
    uploadedBy: string;
    id: string;

}

const maxDocumentsOnTable = 6;
export default function DocExplorer() {
    const [project, setProject] = useState<Project>({ id: '', name: '' });
    const [documents, setDocuments] = useState<Document[]>([]);
    const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
    const [documentsShown, setDocumentsShown] = useState<Document[]>([]);
    const [submitSearch, setSubmitSearch] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    function fetchDocuments() {
        const docs: Document[] =
            Array.from({ length: 100 }, (_, i) => ({
                name: `Document ${i + 1}`,
                date: new Date(),
                uploadedBy: `User ${i + 1}`,
                id: `${i + 1}`,
            }));
        setDocuments(docs);
    }

    useEffect(() => {
        fetchDocuments();
    }, [project]);

    useEffect(() => {
        setFilteredDocuments(Array.isArray(documents) ? documents.filter((doc) => doc.name.toLowerCase().includes(submitSearch.toLowerCase())) : []);
    }, [documents, submitSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
    const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitSearch(search); };
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
            <SideBare page={page} />
            <div className="p-4 xl:ml-80">
                <NavBare title='Your Doccuments' icon={icon} searchBar={<SelectProject selectedProject={project} setSelectedProject={setProject} />} />
                <div className="mt-6">
                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
                            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                                <div>
                                    <h6 className="block antialiased tracking-normal  flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>Your Documents</h6>
                                    <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                        <strong>30 added</strong> this month
                                    </p>
                                </div>
                                <SearchBare searchValue={search} handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
                                <div className="flex items-center mt-4 gap-x-3">
                                    <Link href="/doc_edit">
                                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-lg sm:w-auto gap-x-2 hover:bg-gradient-to-l from-blue-600 to-indigo-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                            <span>New Document</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 pt-0 pb-2 mt-5">
                                <NavTable
                                    list={filteredDocuments} setListShown={setDocumentsShown} maxLinesOnTable={maxDocumentsOnTable}

                                    table={<table className="w-full min-w-[640px] table-auto max-h-[1050px]">
                                        <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">

                                            <tr>
                                                <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                                                    <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Document</p>
                                                </th>
                                                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                                    <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Date</p>
                                                </th>
                                                <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                                    <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Uploaded By</p>
                                                </th>
                                                <th className="border-b border-blue-gray-50 py-3 px-4 text-left rounded-tr-xl">
                                                    <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Delete</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {documentsShown.map((doc, index) => (
                                                <tr key={index}>
                                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                                        <Link href={`/doc_edit?id=${doc.id}`}>
                                                            <div className="gap-4 w-10/12">
                                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{doc.name}</p>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                                        <div className="w-10/12">
                                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(doc.date)}</p>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                                        <div className="w-10/12">
                                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{doc.uploadedBy}</p>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                                        <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

const icon: React.ReactElement = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
        <path d="M9.97.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 0 1-1.06-1.06l3-3ZM9.75 6.75v6a.75.75 0 0 0 1.5 0v-6h3a3 3 0 0 1 3 3v7.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3h3Z" />
        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
    </svg>
);