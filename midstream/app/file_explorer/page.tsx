"use client";
import { useState, useEffect } from 'react';
import { formatSize, formatDate } from "../format/format";
import NavBar from "../navigation/navBare";
import SideBar from "../navigation/sideBare";

export default function FileExplorer() {
    const [selectedPage, setSelectedPage] = useState(1);
    const [navPages, setNavPages] = useState([1,-1,4,5,6,-1,14]);
    const [filesShown, setFilesShown] = useState<File[]>([]);

    const page = 'files';

    const maxFilesOnPage = 7;

    function selectPage(page: number) {
        setSelectedPage(page);
    }


    var files: File[] = [
        {
            id: 1,
            name: "Material XD Version",
            size: 720000,
            type: "Excel",
            date: new Date('05/12/2024'),
            uploaded_by: "Loulou",
            last_updated: new Date('05/12/2024'),
            url: "https://www.google.com",
        },
        {
            id: 2,
            name: "Add Progress Track",
            size: 1200000,
            type: "Excel",
            date: new Date('05/12/2024'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/23/24'),
            url: "https://www.google.com",
        },
        {
            id: 3,
            name: "Fix Platform Errors",
            size: 3100000,
            type: "Word",
            date: new Date('07/01/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('05/12/24'),
            url: "https://www.google.com",
        },
        {
            id: 4,
            name: "Update UI Design",
            size: 1500000,
            type: "PowerPoint",
            date: new Date('08/15/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('08/15/24'),
            url: "https://www.google.com",
        },
        {
            id: 5,
            name: "Bug Fixes",
            size: 500000,
            type: "Word",
            date: new Date('08/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('08/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 6,
            name: "Add User Authentication",
            size: 2000000,
            type: "Excel",
            date: new Date('08/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('08/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 7,
            name: "Implement Search Functionality",
            size: 800000,
            type: "Word",
            date: new Date('09/01/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/01/24'),
            url: "https://www.google.com",
        },
        {
            id: 8,
            name: "Add File Sorting",
            size: 400000,
            type: "Excel",
            date: new Date('09/05/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/05/24'),
            url: "https://www.google.com",
        },
        {
            id: 9,
            name: "Fix Performance Issues",
            size: 2500000,
            type: "PowerPoint",
            date: new Date('09/10/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/10/24'),
            url: "https://www.google.com",
        },
        {
            id: 10,
            name: "Add Dark Mode",
            size: 600000,
            type: "Word",
            date: new Date('09/15/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/15/24'),
            url: "https://www.google.com",
        },
        {
            id: 11,
            name: "Update Documentation",
            size: 1000000,
            type: "Excel",
            date: new Date('09/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 12,
            name: "Add File Sharing",
            size: 1800000,
            type: "PowerPoint",
            date: new Date('09/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 13,
            name: "Fix Cross-Browser Compatibility",
            size: 900000,
            type: "Word",
            date: new Date('10/01/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/01/24'),
            url: "https://www.google.com",
        },
        {
            id: 14,
            name: "Add File Versioning",
            size: 700000,
            type: "Excel",
            date: new Date('10/05/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/05/24'),
            url: "https://www.google.com",
        },
        {
            id: 15,
            name: "Implement Drag and Drop",
            size: 1200000,
            type: "PowerPoint",
            date: new Date('10/10/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/10/24'),
            url: "https://www.google.com",
        },
        {
            id: 16,
            name: "Add File Permissions",
            size: 300000,
            type: "Word",
            date: new Date('10/15/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/15/24'),
            url: "https://www.google.com",
        },
        {
            id: 17,
            name: "Fix Mobile Responsiveness",
            size: 1600000,
            type: "Excel",
            date: new Date('10/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 18,
            name: "Add File Preview",
            size: 1000000,
            type: "PowerPoint",
            date: new Date('10/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 19,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 20,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 21,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 22,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 23,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 24,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 25,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 26,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 27,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 28,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },        {
            id: 29,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },        
        {
            id: 30,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 31,
            name: "Update Documentation",
            size: 1000000,
            type: "Excel",
            date: new Date('09/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 32,
            name: "Add File Sharing",
            size: 1800000,
            type: "PowerPoint",
            date: new Date('09/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 33,
            name: "Fix Cross-Browser Compatibility",
            size: 900000,
            type: "Word",
            date: new Date('10/01/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/01/24'),
            url: "https://www.google.com",
        },
        {
            id: 34,
            name: "Add File Versioning",
            size: 700000,
            type: "Excel",
            date: new Date('10/05/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/05/24'),
            url: "https://www.google.com",
        },
        {
            id: 35,
            name: "Implement Drag and Drop",
            size: 1200000,
            type: "PowerPoint",
            date: new Date('10/10/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/10/24'),
            url: "https://www.google.com",
        },
        {
            id: 36,
            name: "Add File Permissions",
            size: 300000,
            type: "Word",
            date: new Date('10/15/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/15/24'),
            url: "https://www.google.com",
        },
        {
            id: 37,
            name: "Fix Mobile Responsiveness",
            size: 1600000,
            type: "Excel",
            date: new Date('10/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 38,
            name: "Add File Preview",
            size: 1000000,
            type: "PowerPoint",
            date: new Date('10/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 39,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 40,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },
        {
            id: 41,
            name: "Update Documentation",
            size: 1000000,
            type: "Excel",
            date: new Date('09/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 42,
            name: "Add File Sharing",
            size: 1800000,
            type: "PowerPoint",
            date: new Date('09/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('09/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 43,
            name: "Fix Cross-Browser Compatibility",
            size: 900000,
            type: "Word",
            date: new Date('10/01/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/01/24'),
            url: "https://www.google.com",
        },
        {
            id: 44,
            name: "Add File Versioning",
            size: 700000,
            type: "Excel",
            date: new Date('10/05/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/05/24'),
            url: "https://www.google.com",
        },
        {
            id: 45,
            name: "Implement Drag and Drop",
            size: 1200000,
            type: "PowerPoint",
            date: new Date('10/10/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/10/24'),
            url: "https://www.google.com",
        },
        {
            id: 46,
            name: "Add File Permissions",
            size: 300000,
            type: "Word",
            date: new Date('10/15/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/15/24'),
            url: "https://www.google.com",
        },
        {
            id: 47,
            name: "Fix Mobile Responsiveness",
            size: 1600000,
            type: "Excel",
            date: new Date('10/20/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/20/24'),
            url: "https://www.google.com",
        },
        {
            id: 48,
            name: "Add File Preview",
            size: 1000000,
            type: "PowerPoint",
            date: new Date('10/25/24'),
            uploaded_by: "Loulou",
            last_updated: new Date('10/25/24'),
            url: "https://www.google.com",
        },
        {
            id: 49,
            name: "New File",
            size: 100,
            type: "Text",
            date: new Date(),
            uploaded_by: "Loulou",
            last_updated: new Date(),
            url: "https://www.google.com",
        },

    ];
    
    const nbFiles = files.length;

    const nbPages = Math.ceil(nbFiles / maxFilesOnPage);

    useEffect(() => {
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
        nav.push(nbPages);
        setNavPages(nav);

        // gère l'affichage des fichiers
        setFilesShown(files.slice((selectedPage - 1) * maxFilesOnPage, selectedPage * maxFilesOnPage));

    }, [selectedPage]);


    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
            {SideBar(page)}
            <div className="p-4 xl:ml-80">
                {NavBar("Your Files")}
                <div className="mt-6">
                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
                            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                                <div>

                                    <h6 className="block antialiased tracking-normal  flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500 mr-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>Your Files</h6>
                                    <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                        <strong>30 added</strong> this month
                                    </p>
                                </div>
                                <div className="pt-2 relative mx-auto text-gray-600">
                                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search" />
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
                                                <path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
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
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Date</p>
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
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.date)}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <div className="w-10/12">
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{file.uploaded_by}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                                    <div className="w-10/12">
                                                        <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.last_updated)}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-5 border-b border-blue-gray-50">

                                                    <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                        </svg>
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between mt-10 mb-6">

                                <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={()=>{
                                        selectPage(selectedPage - 1);
                                    }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
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
                                                    onClick={() => selectPage(nav)}
                                                >
                                                    {nav}
                                                </button>
                                            )
                                        ))}
                                    </div>

                                    <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={()=>{
                                        selectPage(selectedPage + 1);
                                    }} >
                                        <span>
                                            Next
                                        </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
    date: Date;
    uploaded_by: string;
    last_updated: Date;
    url: string;
}
