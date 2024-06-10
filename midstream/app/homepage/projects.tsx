import { formatDate } from "../format/format";
export default function Projects() {

    const projects: Project[] = [
        {
            id: 1,
            name: "Material XD Version",
            beginning_date: new Date('12-12-2022'),
            description: "Material XD Version",
            progress: 25,
        },
        {
            id: 2,
            name: "Add Progress Track",
            beginning_date: new Date('12-11-2023'),
            description: "Add Progress Track",
            progress: 10,
        },
        {
            id: 3,
            name: "Fix Platform Errors",
            beginning_date: new Date('12-25-2023'),
            description: "Fix Platform Errors",
            progress: 100,
        },
    ];
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-1">
            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                <div>
                    <h6 className="block antialiased tracking-normal flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-pink-500 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                    </svg>Projects</h6>
                    <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">

                        <strong>3 others</strong> underway
                    </p>
                </div>
                <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
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
                                <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Date</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                    <div className="gap-4 w-10/12">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{project.name}</p>
                                        <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1 mt-1">
                                            <div className={`flex justify-center items-center h-full bg-gradient-to-tr ${project.progress < 100 ?' from-pink-600 to-pink-200' : 'from-green-600 to-green-200'} text-white`} style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-5 border-b border-blue-gray-50">
                                    <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{formatDate(project.beginning_date)}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export interface Project {
    id: number;
    name: string;
    beginning_date: Date;
    description: string;
    progress: number;
}


