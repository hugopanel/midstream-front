"use client"
import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo2.png';
import SideBar from "../navigation/sideBare";
import NavBar from "../navigation/navBare";
import { useState, useEffect, use } from "react";
export default function Marketplace() {
    const [search, setSearch] = useState<string>('')
    const [modules, setModules] = useState<Module[]>([]);
    const [filteredModules, setFilteredModules] = useState<Module[]>([]);

    const icon: React.ReactNode = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
            <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
        </svg>
    );
    
    const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      };
    
    const Modules: Module[] = [
        {
            icon: "M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z",
            title:'DA Space - Artistic Direction',
            description:'A module that will help you organize the different aspects of the artistic direction and visual identity of your company. You can store your color palettes, logos, typographies, and other essential visual elements there.',
            tags:[
                {name:'Design',color:'pink'}
            ],
            colorFrom:'pink',
            colorTo:'rose',
        }
    ]
    


    useEffect(() => {
        console.log(search)
    }, [modules, search])

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
                {NavBar('Marketplace', icon, searchBar)}
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
                                            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-transparent focus:border-transparent focus:ring-0 !outline-none resize-none hover:resize" placeholder="Describe your project in 2 sentences..."></textarea>
                                            <button type="button" className="flex flex-row-reverse items-center space-x-2 rtl:space-x-reverse mt-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-300">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
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
                            <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clip-rule="evenodd" />
                        </svg>
                        <h6 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white ml-6">Our Modules</h6>
                    </div>
                    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-rose-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
                                </svg>

                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-pink-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">DA Space - Artistic Direction</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10 mr-[10px]"> Design </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    A module that will help you organize the different aspects of the artistic direction and visual identity of your company. You can store your color palettes, logos, typographies, and other essential visual elements there.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-400 to-green-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.902 7.098a3.75 3.75 0 0 1 3.903-.884.75.75 0 1 0 .498-1.415A5.25 5.25 0 0 0 8.005 9.75H7.5a.75.75 0 0 0 0 1.5h.054a5.281 5.281 0 0 0 0 1.5H7.5a.75.75 0 0 0 0 1.5h.505a5.25 5.25 0 0 0 6.494 2.701.75.75 0 1 0-.498-1.415 3.75 3.75 0 0 1-4.252-1.286h3.001a.75.75 0 0 0 0-1.5H9.075a3.77 3.77 0 0 1 0-1.5h3.675a.75.75 0 0 0 0-1.5h-3c.105-.14.221-.274.348-.402Z" clip-rule="evenodd" />
                                </svg>

                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-green-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg></button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Budget Monitoring and Accounting</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]"> Finance </span>
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10 mr-[10px]"> Management </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    A module to track expenses, allocated budgets, and actual project costs. It also allows you to generate financial reports and track invoices and payments.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr  from-yellow-400 to-orange-400  text-white shadow-orange-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
                                </svg>

                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-orange-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg></button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Risk management</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 ring-1 ring-inset ring-orange-500/10 mr-[10px]"> Risk </span>
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10 mr-[10px]"> Management </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    This module helps identify, assess and monitor potential risks associated with a project. It allows you to create mitigation plans and manage incidents when they occur.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-yellow-400 to-lime-300 text-white shadow-yellow-600/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                </svg>


                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-yellow-100/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500 mb-5">
                                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Performance Analysis and Reporting</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10 mr-[10px]"> Performance </span>
                                    <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]"> Finance </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    A module that provides analysis tools to measure project effectiveness, generate detailed performance reports, and identify areas for improvement.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-purple-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <span className="[&>svg]:h-8 [&>svg]:w-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 496 512">
                                        <path
                                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-indigo-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg></button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Github integration</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10 mr-[10px]"> Management </span>
                                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10 mr-[10px]"> Integration </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    This module allows for seamless integration between Midstream and GitHub, making it easier to manage software development projects.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-500 to-indigo-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 text-white">
                                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                                </svg>
                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-purple-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg></button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Creating Diagrams</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10 mr-[10px]"> Design </span>
                                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10 mr-[10px]"> Integration </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    This module provides powerful tools for creating, editing and managing various types of diagrams essential for project planning and documentation. Gantt charts, UML charts, BI charts, etc.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-teal-300 to-blue-500 text-white shadow-blue-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clip-rule="evenodd" />
                                </svg>

                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-teal-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg></button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Progress Tracking and Gamification</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10 mr-[10px]"> Management </span>
                                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10 mr-[10px]"> Performance </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    A module that motivates teams by integrating gamification elements such as rewards for completed tasks, leader boards, and badges for achievements.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-300 to-red-400 text-white shadow-yellow-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                                </svg>

                            </div>
                            <div className="p-4 flex flex-col items-end text-right bg-gradient-to-r from-white from-70% to-red-200/70 bg-clip-border rounded-xl rounded-b-none">
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-gray-900 mb-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg></button>
                                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Strategic planning</h4>
                            </div>
                            <div className=" flex sm:flex-col xl:flex-row border-t border-blue-gray-50 p-4">
                                <div className=" flex xl:items-start mr-3 sm:ml-5 xl:ml-0 sm:mb-5 xl:mb-0 xl:mt-0 sm:mt-3 ">
                                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10 mr-[10px]"> Performance </span>
                                    <span className="inline-flex items-center rounded-md bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 ring-1 ring-inset ring-orange-500/10 mr-[10px]"> Risk </span>
                                </div>
                                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-justify text-blue-gray-600 xl:px-0 sm:px-5">
                                    This module helps align projects with the company&apos;s strategic objectives, define KPIs, and monitor progress towards achieving these objectives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
export interface Module {
    icon: string;
    title: string;
    description: string;
    tags: Tag[];
    colorFrom: string;
    colorTo: string;
}
export interface Tag {
    name: string;
    color: string;
}