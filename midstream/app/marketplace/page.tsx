"use client"
import SideBar from "../navigation/sideBare";
import NavBar from "../navigation/navBare";
import React, { useState, useEffect, use, ReactNode } from "react";
import {ModuleTemplates} from "./moduleTemplates";
export default function Marketplace() {
    const [search, setSearch] = useState<string>('')
    const [request,setRequest] = useState<string>('')
    const [modules, setModules] = useState<Module[]>([]);
    const [filteredModules, setFilteredModules] = useState<Module[]>([]);
    const [recommended, setRecommended] = useState<boolean>(false);
    
    const ColorTag: Record<string, string> = {
        Finance: "green",
        Management: "blue",
        Risk: "orange",
        Performance: "yellow",
        Design: "pink",
        Integration: "indigo",
    };

    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    
    function handleCheck(id: number) {
        setModules(modules.map((module) => {
            if (module.id === id) {
                module.checked = !module.checked;
            }
            return module;
        }))
    }

    async function fetchModules() {
        try {
            const response = await fetch('api/modules');
            const data = await response.json();
            if (Array.isArray(data.modules)) {
                setModules(data.modules);
            } else {
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Error during fetching modules:', error);
        }
    }

    function handleRequest(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setRequest(event.target.value);
    }

    async function sendRequest() {
        try {
            const response = await fetch('api/modules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descriptionRequest: request,
                }),
            });
            const data = await response.json();
            if (Array.isArray(data.modules)) {
                setModules(data.modules);
                setRecommended(true);
            } else {
                console.error('Expected an array but received:', data);
            }
        } catch (error) {
            console.error('Error during fetching modules:', error);
        }
    }

    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        setFilteredModules(modules.filter((modules)=> modules.name.toLowerCase().includes(search.toLowerCase())))
    }, [search,modules])

    const PageIcon: React.ReactNode = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
        </svg>
    );

    const searchBar: React.ReactNode = (
        <div className="pt-2 relative mx-auto text-gray-600">
            <input className="border-2 border-white bg-sky-50/20 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none placeholder:text-white"
                type="search" name="search" placeholder="Search" onChange={updateSearch} />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                <svg className="text-white h-4 w-4 fill-current enable-background:new 0 0 56.966 56.966;" xmlns="http://www.w3.org/2000/svg"
                    version="1.1" id="hi" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966"
                    width="512px" height="512px">
                    <path
                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
            </button>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
            {SideBar('marketplace')}
            <div className="p-4 xl:ml-80">
                {NavBar('Marketplace', PageIcon, searchBar)}
                <div className="mt-14">
                    <div className="mb-14 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-gradient-to-tr from-w to-pink-400 text-gray-700 shadow-md col-2">
                            <div className="bg-clip-border mx-4 rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute mt-5 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="p-28 pt-3 pb-5 flex flex-col gap-1 w-full max-w-[1040px]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="p-6 pl-1 antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize text-gray-900">Midstream AI</span>
                                </div>
                                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gradient-to-tl from-blue-50 from-5% via-sky-50 via-30% to-transparent to-99% rounded-e-2xl rounded-es-xl shadow-blue-100/70 shadow-lg">
                                    <p className="p-5 pl-8 antialiased font-sans text-base leading-relaxed text-inherit text-gray-900"> ✨ Welcome ✨</p>
                                    <p className="p-5 pl-8 antialiased font-sans text-base leading-relaxed text-inherit text-gray-900">Want to find out which of our incredible modules are the <b className="antialiased font-sans text-base leading-relaxed text-inherit font-medium"> best fit for you</b> ? 👀  </p>
                                    <p className="p-5 pl-8 antialiased font-sans text-base leading-relaxed text-inherit text-gray-900"> 👇 Describe your project in <b className="antialiased font-sans text-base leading-relaxed text-inherit font-medium">2 sentences</b> below and let us taylor your perfect working environnement ! 🪄 </p>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse ">
                                <div className="bg-clip-border mx-4 rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-300 to-yellow-200 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                                        <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                                    </svg>
                                </div>
                                <div className="p-28 pt-3 pb-10 flex flex-col gap-1 w-full max-w-[1040px]">
                                    <form>
                                        <div className="flex justify-between leading-1.5 mt-5 p-4 border-gray-200 border-gray-200 bg-gradient-to-tr from-blue-50 from-25% via-sky-50 via-50% to-gray-50/10 to-90% rounded-tl-2xl rounded-br-2xl rounded-es-2xl shadow-blue-100/70 shadow-lg">
                                            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-transparent focus:border-transparent focus:ring-0 !outline-none resize-none hover:resize" placeholder="Describe your project in 2 sentences..." onChange={handleRequest}></textarea>
                                            <button type="button" className="flex flex-row-reverse items-center space-x-2 rtl:space-x-reverse mt-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-300" onClick={sendRequest}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                            </svg>
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-20 ml-8 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
                            <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" />
                        </svg>
                        <h6 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white ml-6">{recommended?'Recommended Modules':'Our Modules'}</h6>
                    </div>
                    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                        {filteredModules.map((module) => (
                            <div key={module.id} className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                {ModuleTemplates[module.id] ? ModuleTemplates[module.id].icon : ModuleTemplates[0].icon}
                                <div className={`p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-${ModuleTemplates[module.id] ? ModuleTemplates[module.id].colorTo : ModuleTemplates[0].colorTo} bg-clip-border rounded-xl rounded-b-none`}>
                                    <button onClick={() => handleCheck(module.id)} >
                                        {module.checked?
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500 mb-5">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        }
                                    </button>
                                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{module.name}</h4>
                                </div>
                                <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                    <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                        {module.tags.map((tag) => (
                                            <span key={tag} className={`inline-flex items-center rounded-md bg-${ColorTag[tag]}-50 px-4 py-2 text-sm font-medium text-${ColorTag[tag]}-600 ring-1 ring-inset ring-${ColorTag[tag]}-500/10 mr-[10px]`}>{tag}</span>
                                        ))}
                                    </div>
                                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                        {module.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>);
}
export interface Module{
    id:number;
    name: string;
    description: string;
    tags: string[];
    checked: boolean;
}

