"use client";

import { useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import NavBare from "../navigation/navBare";
import SideBare from "../navigation/sideBare";
import logo from '../assets/logo2.png';
import { useRouter } from 'next/navigation';

interface Team {
    id: string;
    name: string;
    projectid: string;
    members: [];
}

interface Member {
    id: string;
    username: string;
    email: string;
    avatar: number;
    colour: string;
    roles: string[];
}

const page = "Teams";

export default function Marketplace() {

    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [SelectedTeamId, setSelectedTeamId] = useState<string | null>(null);
    const [members, setMembers] = useState<Member[]>([]);

    const router = useRouter();

    const [avatarPaths] = useState([
        "M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082",
        "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
        "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
        "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
        "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0"
    ]);

    const handleEditClick = () => {
        // Logic to handle edit action
        // For demonstration, let's navigate to `/teams_edit?teamId=<teamId>`
        const teamId = SelectedTeamId;
        router.push('/teams_edit?teamId=' + teamId);
    };

    const handleCreateClick = () => {
        // Logic to handle edit action
        // For demonstration, let's navigate to `/teams_edit?teamId=<teamId>`
        router.push('/teams_create');
    };

    const hexToRgb = (hex: string): string => {
        // Remove the # symbol if present
        const cleanedHex = hex.replace("#", "");

        // Split the hex value into three parts (red, green, and blue)
        const red = parseInt(cleanedHex.substring(0, 2), 16);
        const green = parseInt(cleanedHex.substring(2, 4), 16);
        const blue = parseInt(cleanedHex.substring(4, 6), 16);

        // Return the RGB value as a string
        return `rgba(${red}, ${green}, ${blue},1)`;
    };
    
    

    const getMembers = async () => {
        // setLoadingEmail('Loading...');
        // setErrorEmail('');
        const teamId = SelectedTeamId;

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

    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();
            setTeams(data.teams);
            if (data.teams.length > 0) {
                setSelectedTeamId(data.teams[0].id);
            }
        } catch (error) {
            console.error('Error fetching teams :', error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchProjects = async () => {
        try {
          const response = await fetch('/api/projects');
          const data = await response.json();
          //setProjects(data.projects);
          if (data.projects.length > 0) {
            setSelectedTeamId(data.projects[0].id);
            getMembers();
          }
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        getMembers();
    }, [SelectedTeamId]);
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeamId(event.target.value);
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
            <SideBare page={page} />
            <div className="p-4 xl:ml-80">
                <NavBare title={page} icon={PageIcon} />
                <div className="mt-6">
                    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
                            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                                <div>

                                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                                    <select id="underline_select" className="block font-semibold uppercase text-center ml-[17px] py-2.5 px-0 w-full text-m text-gray-700 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={SelectedTeamId || ''} onChange={handleSelectChange} disabled={loading}>
                                        <option selected disabled>Choose a team</option>
                                        {loading ? (
                                        <option>Loading...</option>
                                        ) : (
                                        teams.map((team) => (
                                            <option key={team.id} value={team.id}>{team.name}</option>
                                        ))
                                        )}
                                    </select>
                                </div>
                                <div className="pt-2 relative mx-auto text-gray-600">
                                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                        type="search" name="search" placeholder="Search" />
                                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                        <svg className="text-gray-600 h-4 w-4 fill-current enable-Editorground:new 0 0 56.966 56.966;" xmlns="http://www.w3.org/2000/svg"
                                            version="1.1" id="Capa_1" x="0px" y="0px"
                                            viewBox="0 0 56.966 56.966"
                                            width="512px" height="512px">
                                            <path
                                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center mt-4 gap-x-3 mr-[17px]">
                                    <button onClick={() => handleEditClick()} className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto hover:bg-gray-100">
                                        Edit Team
                                    </button>
                                    <button onClick={() => handleCreateClick()} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-lg sm:w-auto gap-x-2 hover:bg-gradient-to-l from-blue-600 to-indigo-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>
                                        <span>New Team</span>
                                    </button>
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
                                        <tr key={member.id} className={index % 2 === 0 ? 'bg-blue-100/20' : 'bg-white'}>
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
                                                <div className="p-4 flex justify-center">
                                                    {member.roles.map((role) => (
                                                        <span key={role} className={`inline-flex items-center rounded-md bg-${role === 'admin' ? 'pink' : 'indigo'}-50 px-4 py-2 text-sm font-medium text-${role === 'admin' ? 'pink' : 'indigo'}-600 ring-1 ring-inset ring-${role === 'admin' ? 'pink' : 'indigo'}-500/10 mr-[10px]`}>
                                                            {role}
                                                        </span>
                                                    ))}
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
const PageIcon: React.ReactElement = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
        <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
    </svg>
);

{/*
    vain
 naughty
 yet
 tail
 tale
 jail
 jet
 length
 hung
 hunt
 hint
 huge
 yeti
 jug
 gaunt
 evil
*/}