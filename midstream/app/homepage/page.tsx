"use client";
import Tasks from "./tasks";
import Files from "./files";
import Projects from "./projects";
import NavBare from "../navigation/navBare";
import SideBare from "../navigation/sideBare";
import SelectProject, { Project } from "../navigation/selectProject";
import { use, useEffect, useState } from "react";

const page = 'Dashboard';
export default function HomePage() {

  const [selectedProject, setSelectedProject] = useState<Project>({id:'',name:''});
  const icon: React.ReactNode = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 text-inherit">
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
    </svg>
  );
    
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
      <SideBare page={page} />
      <div className="p-4 xl:ml-80">
        <NavBare title="Dashboard" icon={icon} searchBar={<SelectProject selectedProject={selectedProject} setSelectedProject={setSelectedProject} />} />
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <Tasks/>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Files selectedProject={selectedProject} />
            <Projects/>
          </div>
        </div>
      </div>
    </div>
  );
}