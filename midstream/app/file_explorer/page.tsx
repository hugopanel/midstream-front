"use client";
import { useState, useEffect, use } from 'react';
import { formatSize, formatDate } from "../format/format";
import NavBare from "../navigation/navBare";
import SideBare from "../navigation/sideBare";
import SearchBare from '../navigation/searchBare';
import SelectProject from '../navigation/selectProject';
import { Project } from '../navigation/selectProject';
import UploadForm from './uploadForm';
import NavTable from '../navigation/navTable';


const downloadFile = async (fileId: string,fileName: string ) => {
  try {
    const response = await fetch('/api/downloadFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to download file.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    console.error('Error downloading file:', error.message);
  }
};
const maxFilesOnPage = 7;
const page = 'Files';
export default function FileExplorer() {
	const [selectedPage, setSelectedPage] = useState<number>(1);
	const [filesShown, setFilesShown] = useState<File[]>([]);
	const [search, setSearch] = useState<string>('');
	const [files, setFiles] = useState<File[]>([]);
	const [submitSearch, setSubmitSearch] = useState<string>('');
	const [selectedProject, setSelectedProject] = useState<Project>({ id: '', name: '' });
	const [filteredFiles,setFilteredFiles] = useState<File[]>([]);

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
				setFiles(files);
			} else {
				console.error('Expected an array but received:', data);
			}
		} catch (error) {
			console.error('Error during fetching files:', error);
		}
	}

	useEffect(() => {
		fetchFiles();
	}, [ selectedProject]);

	useEffect(() => {
		setFilteredFiles( Array.isArray(files) ? files.filter((file) => file.name.toLowerCase().includes(submitSearch.toLowerCase())) : []);
	}, [files, submitSearch]);
	const handlerDownload = (id: string,name: string) => async () => downloadFile(id,name);
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
	const handleSearchSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitSearch(search); };
	return (
		<div  className="min-h-screen bg-gradient-to-r from-indigo-500 from-5% via-blue-300 via-30% to-cyan-50 to-95%">
			<SideBare page={page} />
			<div className="p-4 xl:ml-80">
				<NavBare title="Your Files" icon={icon} searchBar={<SelectProject selectedProject={selectedProject} setSelectedProject={setSelectedProject} />} />
				<div className="mt-6">
					<div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
						<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-3">
							<div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
								<div>
									<h6 className="block antialiased tracking-normal  flex items-center font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500 mr-2">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
									</svg>Your Files</h6>
									<p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
										<strong>30 added</strong> this month
									</p>
								</div>
								<SearchBare searchValue={search} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} />
								<div className="flex items-center mt-4 gap-x-3">
									<button className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto hover:bg-gray-100">
										Download all
									</button>

									<UploadForm project={selectedProject} />
								</div>
							</div>
							<NavTable list ={filteredFiles} setListShown={setFilesShown} maxLinesOnTable= {maxFilesOnPage}table={
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
												<p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Creation</p>
											</th>
											<th className="border-b border-blue-gray-50 py-3 px-6 text-left">
												<p className="block antialiased font-sans text-[12px] font-bold uppercase text-blue-50">Description</p>
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
										{filesShown.map((file) => (
											<tr key={file.id}>
												<td className="py-3 px-5 border-b border-blue-gray-50">
													<div className="gap-4 w-10/12">
														<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{file.name}</p>
														<p className="text-xs font-normal text-gray-600">{formatSize(file.size)}</p>
													</div>
												</td>

												<td className="py-3 px-5 border-b border-blue-gray-50">
													<p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">{file.extension}</p>
												</td>
												<td className="py-3 px-5 border-b border-blue-gray-50">
													<div className="w-10/12">
														<p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.created_date)}</p>
													</div>
												</td>
												<td className="py-3 px-5 border-b border-blue-gray-50">
													<div className="w-10/12">
														<p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{file.description}</p>
													</div>
												</td>
												<td className="py-3 px-5 border-b border-blue-gray-50">
													<div className="w-10/12">
														<p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{formatDate(file.modified_date)}</p>
													</div>
												</td>
												<td className="py-3 px-5 border-b border-blue-gray-50">

													<button aria-expanded="false" aria-haspopup="menu" id=":r2:" onClick={handlerDownload(file.id,file.name)} className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-700 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
															<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
														</svg>
													</button>

												</td>
											</tr>
										))}
									</tbody>
								</table>
							}
								/>
						</div>
					</div>
				</div>
			</div>
		</div>);
}
const icon: React.ReactElement = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-inherit">
		<path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
		<path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
	</svg>
);

export interface File {
	id: string;
	name: string;
	size: number;
	extension: string;
	created_date: Date;
	description: string;
	modified_date: Date;
	path: string;
}
