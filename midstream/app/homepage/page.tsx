import Tasks from "./tasks";
import Files from "./files";
import Projects from "./projects";
import { Project } from "./projects";
import SideBar from "../navigation/side_bare";
import NavBar from "../navigation/nav_bare";

export default function HomePage() {
  const page = 'dashboard';
  const user = {
    name: "Loulou",
  }
  const project: Project = {
    id: 1,
    name: "Project A",
    description: "This is the project A",
    beginning_date: new Date('12-12-2022'),
    progress: 20,
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
      {SideBar(page)}
      <div className="p-4 xl:ml-80">
        {NavBar(project.name)}
        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {Tasks()}
          </div>
          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {Files()}
            {Projects()}
          </div>
        </div>
      </div>
    </div>
  );
}
