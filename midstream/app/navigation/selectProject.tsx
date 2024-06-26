import { ChangeEvent, ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, use } from "react";
import { useEffect, useState } from "react";

type SelectProjectProps = {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project>>;
};
export interface Project {
  id: string;
  name: string;
}

const SelectProject: React.FC<SelectProjectProps> = ({ selectedProject,setSelectedProject}) => {
  const [projects, setProjects] = useState([{id:'',name:'My Project'}] as Project[]);
  
  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects|| projects);
      setSelectedProject(data.projects[0]);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();    
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    if (selectedProject.id === '') {
      return
    }
    if ( projects !=null && localStorage.getItem('selectedProject') != null){
      var selectedProjectId = localStorage.getItem('selectedProject');
      setSelectedProject(projects.find((project) => project.id === selectedProjectId) || projects[0]);
    }

  }, [projects]);
  const handleSelectedProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {setSelectedProject(
    projects.find((project) => project.id === e.target.value) as Project),
    localStorage.setItem('selectedProject',e.target.value);
  };
  return (
    <div className="pt-2 relative">
      <label htmlFor="underline_select" className="sr-only">Underline select</label>
      <select id="underline_select" className="block font-semibold uppercase text-center py-2.5 px-0 w-full text-m bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={selectedProject.id} onChange={handleSelectedProjectChange}>
        <option selected disabled>Choose a project</option>
        {projects.map((project) => (
          <option className="text-gray-500" key={project.id} value={project.id}>{project.name}</option>
        )
        )}
      </select>
    </div>
  );
}
export default SelectProject;