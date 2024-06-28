import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

type SelectProjectProps = {
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project>>;
  className?: string;
};

export interface Project {
  id: string;
  name: string;
}

const SelectProject: React.FC<SelectProjectProps> = ({ selectedProject, setSelectedProject, className }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(token),
        }
      );
      const data = await response.json();
      setProjects(data.projects || []);
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
    const savedProjectId = localStorage.getItem('selectedProject');
    if (savedProjectId) {
      const savedProject = projects.find((project) => project.id === savedProjectId);
      if (savedProject) {
        setSelectedProject(savedProject);
      }
    }
  }, [projects]);

  const handleSelectedProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedProjectId = e.target.value;
    const selectedProject = projects.find((project) => project.id === selectedProjectId) as Project;
    setSelectedProject(selectedProject);
    localStorage.setItem('selectedProject', selectedProjectId);
  };

  return (
    <div className="relative">
      <select 
        id="underline_select" 
        className={ className || "block font-semibold uppercase text-center py-2.5 px-0 w-full text-m bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer" }
        value={selectedProject.id} 
        onChange={handleSelectedProjectChange}
      >
        <option disabled value="">Choose a project</option>
        {projects.map((project) => (
          <option className="text-gray-500" key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectProject;
