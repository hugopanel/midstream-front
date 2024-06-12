"use client";
import { useState, useEffect } from 'react';
import { formatSize, formatDate } from "../format/format";
import NavBar from "../navigation/navBare";
import SideBar from "../navigation/sideBare";

const maxFilesOnPage = 7;
const page = 'files';

export default function FileExplorer() {
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [navPages, setNavPages] = useState<number[]>([1]);
    const [filesShown, setFilesShown] = useState<File[]>([]);
    const [search, setSearch] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);


    const icon: React.ReactNode = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
        </svg>
    );
    
    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSelectedPage(1);
      };

    async function fetchFiles() {
        try {
            const response = await fetch('api/files');
            const data = await response.json();
            if (Array.isArray(data.files)) {
                let files = data.files.sort((a: File, b: File) => {
                    return new Date(b.modified_date).getTime() - new Date(a.modified_date).getTime();
                });
                setFiles(files);
            } else {
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Error during fetching files:', error);
        }
    }

    useEffect(() => {
        fetchFiles();
    }, [selectedPage]);

    useEffect(() => {

        const filteredFiles = Array.isArray(files) ? files.filter((file) => file.name.toLowerCase().includes(search.toLowerCase())) : [];

        let nbPages = Math.ceil(filteredFiles.length / maxFilesOnPage);
        if (nbPages < 1) {
            nbPages = 1;
        }
        // vérifier que selectedPage ne sorte des bornes
        if (selectedPage < 1) setSelectedPage(1);
        if (selectedPage > nbPages) setSelectedPage(nbPages)

        // gère l'affichage des bouttons de navigation
        let nav = [1];
        if (selectedPage > 3) {
            nav.push(-1);
        }
        for (let i = selectedPage - 1; i <= selectedPage + 1; i++) {
            if (i > 1 && i < nbPages) {
                nav.push(i);
            }
        }
        if (selectedPage < nbPages - 2) {
            nav.push(-1);
        }
        if (nbPages > 1) nav.push(nbPages);
        setNavPages(nav);

        // gère l'affichage des fichiers
        setFilesShown(filteredFiles.slice((selectedPage - 1) * maxFilesOnPage, selectedPage * maxFilesOnPage));
    }, [selectedPage,search,files]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
            {SideBar(page)}
            <div className="p-4 xl:ml-80">
                {NavBar("Your Files",icon)}
                <div className="mt-6">
                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
                            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                                <div>
                                    <h6 className="block antialiased tracking-normal  flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>Your Files</h6>
                                    <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                        <strong>30 added</strong> this month
                                    </p>
                                </div>
                                <div className="pt-2 relative mx-auto text-gray-600">
                                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search" onChange={updateSearch} />
                                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                        <svg className="text-gray-600 h-4 w-4 fill-current enable-background:new 0 0 56.966 56.966;" xmlns="http://www.w3.org/2000/svg"
                                            version="1.1" id="Capa_1" x="0px" y="0px"
                                            viewBox="0 0 56.966 56.966"
                                            width="512px" height="512px">
                                            <path
                                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center mt-4 gap-x-3">
                                    <button className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto hover:bg-gray-100">
                                        Download all
                                    </button>

                                    <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-lg sm:w-auto gap-x-2 hover:bg-gradient-to-l from-blue-600 to-indigo-400">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="">
                                                <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span>Upload</span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 pt-0 pb-2 mt-5">
                                <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
                                    <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
                                        <tr>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">File</p>
                                            </th>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Type</p>
                                            </th>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Creation</p>
                                            </th>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Uploaded By</p>
                                            </th>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Last Update</p>
                                            </th>
                                            <th className="border-b border-blue-gray-50 py-3 px-4 text-left rounded-tr-xl">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Download</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filesShown.map((file) => (
                                            <tr key={file.id}>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <div className="gap-4 w-10/12">
                                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{file.name}</p>
                                                        <p className="text-xs font-normal text-gray-600">{formatSize(file.size)}</p>
                                                    </div>
                                                </td>

                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{file.type}</p>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <div className="w-10/12">
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.created_date)}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <div className="w-10/12">
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{file.uploaded_by}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <div className="w-10/12">
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.modified_date)}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">

                                                    <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                        </svg>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between mt-10 mb-6">

                                <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={()=>{
                                        setSelectedPage(selectedPage - 1);
                                    }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                        </svg>
                                        <span>
                                            previous
                                        </span>
                                    </button>

                                    <div className="items-center hidden md:flex gap-x-3">
                                        {navPages.map((nav, index) => (
                                            nav === -1 ? (
                                                <button key={index} className="px-2 py-1 text-sm text-gray-500 rounded-md" disabled>...</button>
                                            ) : (
                                                <button
                                                    key={index}
                                                    className={`px-2 py-1 text-sm text-gray-500 rounded-md ${selectedPage === nav ? 'bg-blue-100/60' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSelectedPage(nav)}
                                                >
                                                    {nav}
                                                </button>
                                            )
                                        ))}
                                    </div>

                                    <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={()=>{
                                        setSelectedPage(selectedPage + 1);
                                    }} >
                                        <span>
                                            Next
                                        </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
export interface File {
    id: number;
    name: string;
    size: number;
    type: string;
    created_date: Date;
    uploaded_by: string;
    modified_date: Date;
    path: string;
}
