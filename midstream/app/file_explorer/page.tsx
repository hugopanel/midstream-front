import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo2.png';

export default function FileExplorer() {
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
                    </a>
                    <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
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
                            <a aria-current="page" className="active" href="#">
                                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                        <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd"></path>
                                    </svg>
                                    <Link href="./file_explorer">
                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">files</p></Link>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a className="" href="#">
                                <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-900 hover:bg-blue-500/10 active:bg-blue-700/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                        <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd"></path>
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
                                        <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <Link href="./teams">
                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">management</p></Link>
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
                                        <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd"></path>
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
                        <div className="capitalize">
                            <nav aria-label="breadcrumb" className="w-max">
                                <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                    {/* <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <a href="#">
                  <p className="block antialiased font-sans text-sm leading-normal text-white font-normal opacity-90 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                </a>
                <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
              </li>
              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">home</p>
              </li> */}
                                </ol>
                            </nav>
                            <h6 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Your Files</h6>
                        </div>
                        <div className="flex items-center">
                            {/* <div className="mr-auto md:mr-4 md:w-56">
            <div className="relative w-full min-w-[200px] h-10">
              <input className="peer w-full h-full bg-transparent text-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder=" "/>
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:border-blue-500 after:border-blue-gray-200 peer-focus:after:border-blue-500">Type here</label>
            </div>
          </div> */}
                            <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" stroke-width="3" className="h-6 w-6 text-blue-gray-500">
                                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </button>
                            <a href="#">
                                <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-90 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-700">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                                    </svg>Loulou </button>
                                <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-900">
                                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </button>
                            </a>
                            <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                <Link href="./profile_page">
                                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                            <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                </Link>
                            </button>
                            <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                        <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="mt-6">
                    {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">In Review</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Link Login</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <span className="inline-flex items-center rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10 mr-[10px]"> Front </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10 mr-[10px]"> Back </span>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-indigo-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">In Progress</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Plan front meeting</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <span className="inline-flex items-center rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10 mr-[10px]"> Front </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10 mr-[10px]"> Back </span>
            <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">Data</span>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Ready</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Create Database</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-500/10 mr-[10px]">Data</span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/10 mr-[10px]"> Back </span>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-7 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">In Progress</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Fix Menu</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <span className="inline-flex items-center rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600 ring-1 ring-inset ring-pink-500/10 mr-[10px]"> Front </span>
          </div>
        </div>
      </div> */}

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
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="gap-4 w-10/12">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Material XD Version</p>
                                                    <p className="text-xs font-normal text-gray-600">720 KB</p>
                                                </div>
                                            </td>

                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Add Progress Track</p>
                                                    <p className="text-xs font-normal text-gray-600">1.2 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/12/23</p>

                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">23/09/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Fix Platform Errors</p>
                                                    <p className="text-xs font-normal text-gray-600">3.1 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Word</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">01/07/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Launch our Mobile App</p>
                                                    <p className="text-xs font-normal text-gray-600">153 Mo</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Powerpoint</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">18/02/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Add the New Pricing Page</p>
                                                    <p className="text-xs font-normal text-gray-600">2.9 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>

                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Everything Else</p>
                                                    <p className="text-xs font-normal text-gray-600">124 KB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>

                                        </tr>

                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="gap-4 w-10/12">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Material XD Version</p>
                                                    <p className="text-xs font-normal text-gray-600">720 KB</p>
                                                </div>
                                            </td>

                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Add Progress Track</p>
                                                    <p className="text-xs font-normal text-gray-600">1.2 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/12/23</p>

                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">23/09/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Fix Platform Errors</p>
                                                    <p className="text-xs font-normal text-gray-600">3.1 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Word</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">01/07/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Launch our Mobile App</p>
                                                    <p className="text-xs font-normal text-gray-600">153 Mo</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Powerpoint</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">18/02/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Add the New Pricing Page</p>
                                                    <p className="text-xs font-normal text-gray-600">2.9 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>

                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Everything Else</p>
                                                    <p className="text-xs font-normal text-gray-600">124 KB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="gap-4 w-10/12">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Material XD Version</p>
                                                    <p className="text-xs font-normal text-gray-600">720 KB</p>
                                                </div>
                                            </td>

                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Add Progress Track</p>
                                                    <p className="text-xs font-normal text-gray-600">1.2 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/12/23</p>

                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">23/09/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Fix Platform Errors</p>
                                                    <p className="text-xs font-normal text-gray-600">3.1 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Word</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">01/07/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Launch our Mobile App</p>
                                                    <p className="text-xs font-normal text-gray-600">153 Mo</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Powerpoint</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">18/02/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Add the New Pricing Page</p>
                                                    <p className="text-xs font-normal text-gray-600">2.9 GB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>

                                        </tr>
                                        <tr className="bg-blue-100/20">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12 gap-4">
                                                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">Everything Else</p>
                                                    <p className="text-xs font-normal text-gray-600">124 KB</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Excel</p>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">Loulou</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <div className="w-10/12">
                                                    <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">12/05/24</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                {/* <div className="w-10/12"> */}
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                    </svg>
                                                </button>
                                                {/* </div> */}
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between mt-10 mb-6">
                                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                        </svg>

                                        <span>
                                            previous
                                        </span>
                                    </a>

                                    <div className="items-center hidden md:flex gap-x-3">
                                        <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60">1</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">2</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">3</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">...</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">12</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">13</a>
                                        <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">14</a>
                                    </div>

                                    <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
                                        <span>
                                            Next
                                        </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                        </div>
                        {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-1">
          <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
            <div>
              <h6 className="block antialiased tracking-normal flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-pink-500 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>Projects</h6>
              <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                
                <strong>3 others</strong> underway
              </p>
            </div>
            <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
              <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                </svg>
              </span>
            </button>
          </div>
          <div className="p-6 px-0 pt-0 pb-2">
            <table className="w-full min-w-[0px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Name</p>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Team</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="gap-4 w-10/12">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Material XD Version</p>
                      <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1 mt-1">
                        <div className="flex justify-center items-center h-full bg-gradient-to-tr from-pink-600 to-pink-200 text-white w-[25%]"></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Marketing</p>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="gap-4 w-10/12">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Add Progress Track</p>
                      <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1 mt-1">
                        <div className="flex justify-center items-center h-full bg-gradient-to-tr from-pink-600 to-pink-200 text-white w-[10%]"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Innov</p>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="gap-4 w-10/12">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Fix Platform Errors</p>
                      <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1 mt-1">
                        <div className="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-200 text-white w-full"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Commerce</p>
                  </td>
                </tr>           
              </tbody>
            </table>
          </div>
        </div> */}

                    </div>

                </div>
            </div>
        </div>);
}
