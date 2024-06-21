"use client";

import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo2.png';

const people = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Tom Cook',
        avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 5,
        name: 'Tanya Fox',
        avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 6,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 7,
        name: 'Caroline Schultz',
        avatar:
            'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 8,
        name: 'Mason Heaney',
        avatar:
            'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 9,
        name: 'Claudie Smitham',
        avatar:
            'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 10,
        name: 'Emil Schaefer',
        avatar:
            'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface Team {
    id: string;
    name: string;
    projectid: string;
    members: [];
}

interface Member {
    memberId: string;
    username: string;
    email: string;
    avatar: string;
    colour: string;
    roles: string[];
    rolestoadd: string[];
}

interface User {
    id: string;
    username: string;
}

interface Role{
    id: string;
    name: string;
    permissions : string[];
}

export default function MyComponent() {
    const [selected, setSelected] = useState(people[3]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [SelectedProjectId, setSelectedProjectId] = useState<string | null>(null);    
    const [loading, setLoading] = useState(true);
    const [teamId, setTeamId] = useState<string | null >('');
    const [teamName, setTeamName] = useState<string>('');
    const [members, setMembers] = useState<Member[]>([]);
    const [membersToAdd, setMembersToAdd] = useState<User[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [avatarPaths] = useState([
        "M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082",
        "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
        "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
        "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
        "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0"
    ]);

    const hexToRgb = (hex: string): string => {
        // Remove the # symbol if present
        const cleanedHex = hex.replace("#", "");

        // Split the hex value into three parts (red, green, and blue)
        const red = parseInt(cleanedHex.substring(0, 2), 16);
        const green = parseInt(cleanedHex.substring(2, 4), 16);
        const blue = parseInt(cleanedHex.substring(4, 6), 16);

        console.log(`rgba(${red}, ${green}, ${blue},1)`);
        // Return the RGB value as a string
        return `rgba(${red}, ${green}, ${blue},1)`;
    };

    const fetchProjects = async () => {
        try {
          const response = await fetch('/api/projects');
          const data = await response.json();
          //setProjects(data.projects);
          if (data.projects.length > 0) {
            setSelectedProjectId(data.projects[0].id);
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          //setIsLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
          const response = await fetch('/api/roles');
          const data = await response.json();
          console.log(data);
          //setProjects(data.projects);
          setRoles(data.roles);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          //setIsLoading(false);
        }
    };


    const getMembers = async (teamId) => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');
        
        try {
            const response = await fetch('/api/get_members_by_team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teamId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get the members of the team');
            }

            const data = await response.json();
            console.log(data);
            setMembers(data.members);
            // localStorage.setItem('token', data.token);
            // setSuccessEmail('Email updated.');
        } catch (error: any) {
            // setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            // setLoadingEmail('');
        }
    };

    const getMemberstoAdd = async (teamId) => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');
        
        try {
            const response = await fetch('/api/get_members_not_in_team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teamId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get the members of the team');
            }

            const data = await response.json();
            console.log(data);
            setMembersToAdd(data.users);
            // localStorage.setItem('token', data.token);
            // setSuccessEmail('Email updated.');
        } catch (error: any) {
            // setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTeamName = async (teamId) => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');

        console.log(teamId);
        
        try {
            console.log(teamId);
            const response = await fetch('/api/get_team_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teamId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get the members of the team');
            }

            const data = await response.json();
            console.log(data);
            setTeamName(data.teamName);
            // localStorage.setItem('token', data.token);
            // setSuccessEmail('Email updated.');
        } catch (error: any) {
            // setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            // setLoadingEmail('');
        }
    };

    useEffect(() => {
        const teamIdQuery = searchParams.get('teamId');
        fetchRoles();
        console.log(teamIdQuery);
        if(teamIdQuery == "null") {
            console.log('create');
        }else{
            setTeamId(teamIdQuery);
            console.log('edit');
            console.log(teamId);
            getMembers(teamIdQuery);
            getMemberstoAdd(teamIdQuery);
            getTeamName(teamIdQuery);
        }
      }, [searchParams]);

    const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value);

    const handleRoleChange = (memberId, roleId) => {
        console.log(memberId);
        const selectedRole = roles.find((role) => role.id === roleId);
        const roleName = selectedRole ? selectedRole.name : '';
    
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.memberId === memberId
              ? {
                  ...member,
                  rolestoadd: member.rolestoadd
                    ? [...member.rolestoadd, roleName]
                    : [roleName],
                }
              : member
          )
        );
      };

      const handleRoleDelete = (memberId, roleName, listType) => {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.memberId === memberId
              ? {
                  ...member,
                  [listType]: member[listType].filter((role) => role !== roleName),
                }
              : member
          )
        );
      };
      
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
            <div className="p-4">
                <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                    <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                        <div className="capitalize">
                            <nav aria-label="breadcrumb" className="w-max">
                                <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                                </ol>
                            </nav>

                            {/* <div className="flex items-center border-b-4 border-s-4 rounded-bl-lg border-white/70"> */}
                            <div className="flex items-center ml-8  xl:-mr-36">
                                <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-10 h-10 text-inherit">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
                                    <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                </svg>
                                <h6 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white ml-3">Edit Team</h6></div>
                        </div>
                        <div className="flex items-center">
                            <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="3" className="h-6 w-6 text-blue-gray-500">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </button>
                            <a href="#">
                                <button className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-90 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-700">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                                    </svg>Loulou </button>
                                <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-900">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </button>
                            </a>
                            <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </button>
                            <button aria-expanded="false" aria-haspopup="menu" id=":r2:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-blue-gray-500">
                                        <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="mt-6">
                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
                            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex flex-wrap items-center justify-between p-6">
                                <div>

                                    <input type="text" name="teamName" id="teamName" value={ teamName } onChange={handleTeamNameChange} className="block font-semibold uppercase text-center ml-[17px] py-2.5 px-0 w-full text-m text-gray-700 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer" />
                                </div>
                                <div className="pt-2 relative mx-auto text-gray-600">
                                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search Member" />
                                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                        <svg className="text-gray-600 h-4 w-4 fill-current enable-Editorground:new 0 0 56.966 56.966;" xmlns="http://www.w3.org/2000/svg"
                                            version="1.1" id="12" x="0px" y="0px"
                                            viewBox="0 0 56.966 56.966"
                                            width="512px" height="512px">
                                            <path
                                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="pt-2 relative mx-auto text-gray-600">
                                    <select id="countries" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none">
                                        <option selected disabled>Add member</option>
                                        {loading ? (
                                        <option>Loading...</option>
                                        ) : (
                                        membersToAdd.map((memberToAdd) => (
                                            <option key={memberToAdd.id} value={memberToAdd.id}>{memberToAdd.username}</option>
                                        ))
                                        )}
                                    </select>
                                </div>
                                {/* <div className="relative">
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                
                                                <div className="mt-2 relative">
                                                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                        <span className="flex items-center">
                                                            <span className="ml-3 block truncate">{selected.name}</span>
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </ListboxButton>

                                                    <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                        <ListboxOptions className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {people.map((person) => (
                                                                <ListboxOption
                                                                    key={person.id}
                                                                    className={({ focus }) =>
                                                                        classNames(
                                                                            focus ? 'bg-indigo-600 text-white' : '',
                                                                            !focus ? 'text-gray-900' : '',
                                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                                        )
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, focus }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span
                                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                                >
                                                                                    {person.name}
                                                                                </span>
                                                                            </div>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        focus ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </ListboxOption>
                                                            ))}
                                                        </ListboxOptions>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div> */}
                                <div className="flex items-center mt-4 gap-x-3 mr-[17px]">
                                    <Link href="/teams_edit">
                                        <button className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto hover:bg-gray-100">
                                            Save Changes
                                        </button>
                                    </Link>
                                    <Link href="/teams_create">
                                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gradient-to-tr from-red-600 to-orange-400 rounded-lg sm:w-auto gap-x-2 hover:bg-gradient-to-l from-red-600 to-orange-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                            <span>Delete Team</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 pt-0 pb-2 mt-5">
                                <table className="w-full min-w-[640px] table-auto max-h-[1050px]">
                                    <thead className="bg-gradient-to-l from-sky-300 to-indigo-400">
                                        <tr>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-left rounded-tl-xl">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Collaborator</p>
                                            </th>
                                            <th className="border-b border-blue-gray-50 py-3 px-6 text-center rounded-tr-xl">
                                                <p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Roles</p>
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    {members.map((member, index) => (
                                        <tr key={member.memberId} className={index % 2 === 0 ? 'bg-blue-100/20' : 'bg-white'}>
                                            <td>
                                            <div className="flex min-w-0 gap-x-4">
                                                <div className={`bg-clip-border ml-8 mx-4 my-4 rounded-xl overflow-hidden text-white shadow-[${hexToRgb(member.colour)}] shadow-lg grid h-16 w-16 place-items-center`} style={{ backgroundColor: hexToRgb(member.colour), boxShadow: `0px 10px 15px -3px ${hexToRgb(member.colour)}`}}>
      
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-inherit">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={avatarPaths[member.avatar - 1]} />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0 flex flex-col justify-center">
                                                <p className="text-[15px] font-semibold leading-6 text-gray-900 tracking-wide">{member.username}</p>
                                                <p className="mt-1 truncate text-[14px] leading-5 text-gray-500 tracking-wide">{member.email}</p>
                                                </div>
                                            </div>
                                            </td>
                                            <td>
                                            <div className="p-4 grid grid-flow-row-dense grid-cols-5 grid-rows-1 justify-items-stretch">
                                                <div className="justify-items-center start-col-2 col-span-4">
                                                {member.roles.map((role) => (
                                                    <span key={role} className={`inline-flex items-center rounded-md bg-${role === 'admin' ? 'pink' : 'indigo'}-50 px-4 py-2 text-sm font-medium text-${role === 'admin' ? 'pink' : 'indigo'}-600 ring-1 ring-inset ring-${role === 'admin' ? 'pink' : 'indigo'}-500/10 mr-[10px]`}>
                                                    {role}
                                                    <button onClick={() => handleRoleDelete(member.id, role, 'roles')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 -mr-1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    </span>
                                                ))}
                                                {(member.rolestoadd || []).map((role) => (
                                                    <span key={role} className={`inline-flex items-center rounded-md bg-${role === 'admin' ? 'pink' : 'indigo'}-50 px-4 py-2 text-sm font-medium text-${role === 'admin' ? 'pink' : 'indigo'}-600 ring-1 ring-inset ring-${role === 'admin' ? 'pink' : 'indigo'}-500/10 mr-[10px]`}>
                                                        {role}
                                                        <button onClick={() => handleRoleDelete(member.memberId, role, 'rolestoadd')}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 -mr-1">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                        </button>
                                                    </span>
                                                ))}

                                                </div>
                                                <div className="col-span-1 start-col-5 justify-items-end">
                                                <select id="roles" onChange={(e) => handleRoleChange(member.memberId, e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                    <option selected disabled>Add role</option>
                                                    {loading ? (
                                                    <option>Loading...</option>
                                                    ) : (
                                                    roles.map((role) => (
                                                        <option key={role.id} value={role.id}>{role.name}</option>
                                                    ))
                                                    )}
                                                </select>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    ))}
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
                    </div>
                </div>
            </div>
        </div>
    );
}