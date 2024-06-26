"use client";
import { useEffect, useState } from 'react';
import { File } from '../file_explorer/page';
import {formatDate } from "../format/format";
import { Project } from '../navigation/selectProject';


const maxFiles = 8;
type Files = {
	selectedProject: Project;
}
const Files: React.FC<Files> = ({ selectedProject}) =>{
	const [files, setFiles] = useState<File[]>([]);
	async function fetchFiles() {
		try {
			if (!selectedProject.id) {
				return;
			}
			const response = await fetch(`/api/GetFiles/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ projectId: selectedProject.id }),
			});
			const data = await response.json();
			if (Array.isArray(data.files)) {
				let files = data.files.sort((a: File, b: File) => {
					return new Date(b.modified_date).getTime() - new Date(a.modified_date).getTime();
				});
				setFiles(files.slice(0, maxFiles) );
			} else {
				console.error('Expected an array but received:', data);
			}
		} catch (error) {
			console.error('Error during fetching files:', error);
		}
	}

	useEffect(() => {
		fetchFiles();
	}, [selectedProject]);

	return (
		<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
			<div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
				<div>
					<h6 className="block antialiased tracking-normal  flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500 mr-2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
					</svg>Your Files</h6>
					<p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
						<strong>30 added</strong> this month
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
				<table className="w-full min-w-[640px] table-auto">
					<thead>
						<tr>
							<th className="border-b border-blue-gray-50 py-3 px-6 text-left">
								<p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">File</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-6 text-left">
								<p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Type</p>
							</th>
							<th className="border-b border-blue-gray-50 py-3 px-6 text-left">
								<p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">Last update</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{files.map((file) => (
							<tr key={file.id}>
								<td className="py-3 px-5 border-b border-blue-gray-50">
									<div className="flex items-center gap-4">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{file.name}</p>
									</div>
								</td>
								<td className="py-3 px-5 border-b border-blue-gray-50">
									<p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{file.extension}</p>
								</td>
								<td className="py-3 px-5 border-b border-blue-gray-50">
									<div className="w-10/12">
										<p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.modified_date)}</p>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
export default Files;