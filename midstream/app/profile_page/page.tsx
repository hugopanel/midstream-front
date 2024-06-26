"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo.png';
import { useRouter } from 'next/navigation';

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [colour, setColour] = useState("#000000");
    const [id, setId] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorAvatar, setErrorAvatar] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [loadingInfo, setLoadingInfo] = useState<string>('');
    const [loadingEmail, setLoadingEmail] = useState<string>('');
    const [loadingAvatar, setLoadingAvatar] = useState<string>('');
    const [loadingPassword, setLoadingPassword] = useState<string>('');
    const [successInfo, setSuccessInfo] = useState<string>('');
    const [successEmail, setSuccessEmail] = useState<string>('');
    const [successAvatar, setSuccessAvatar] = useState<string>('');
    const [successPassword, setSuccessPassword] = useState<string>('');

    const router = useRouter();

    const Load = async () => {
        setErrorInfo('');
        setLoadingPassword('');

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/api/profile_page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign in');
            }

            const data = await response.json();

            setEmail(data.email);
            setUsername(data.username);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setColour(data.colour);
            const radioButton = document.getElementById(data.avatar) as HTMLInputElement | null;
                    
            if (radioButton && radioButton.id == data.avatar) {
                console.log("found");
                radioButton.checked = true;
            }
            setId(data.id);
        } catch (error: any) {
            setErrorInfo(error.message);
            console.error('Error getting the info :', error);
        } finally {
            setLoadingInfo('');
        }
    };

    const updateInfo = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingInfo('Loading...');
        setErrorInfo('');

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/api/update_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, username, firstName, lastName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign in');
            }

            const data = await response.json();
            localStorage.removeItem("token");
            localStorage.setItem('token', data.token);
            setSuccessInfo('Information updated.');
        } catch (error: any) {
            setErrorInfo(error.message);
            console.error('Error during update of the info:', error);
        } finally {
            setLoadingInfo('');
        }
    };

    const updateEmail = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingEmail('Loading...');
        setErrorEmail('');

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/api/update_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign in');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            setSuccessEmail('Email updated.');
        } catch (error: any) {
            setErrorEmail(error.message);
            console.error('Error logging in:', error);
        } finally {
            setLoadingEmail('');
        }
    };

    const updatePassword = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingPassword('Loading...');
        setErrorPassword('');

        const token = localStorage.getItem('token');
        if (newPassword == confirmPassword){
            try {
                const response = await fetch('/api/update_password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, currentPassword, newPassword }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to sign in');
                }

                const data = await response.json();
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setSuccessPassword('Password updated successfully.');
            } catch (error: any) {
                setErrorPassword(error.message);
                console.error('Error logging in:', error);
            } finally {
                setLoadingPassword('');
            }
        }else{
            setErrorPassword("You must enter the same password twice.");
        }
        
    };

    const updateAvatar = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingPassword('Loading...');
        setErrorPassword('');
        
        const token = localStorage.getItem('token');
        const selectedOption = document.querySelector('input[name="option"]:checked');

        if (selectedOption) {
            console.log('Selected option:', selectedOption.id);
            const avatar = selectedOption.id;
            console.log(avatar);
            console.log(colour);
            try {
                const response = await fetch('/api/update_avatar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, avatar, colour }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to sign in');
                }
    
                const data = await response.json();
                console.log(data.token);
                localStorage.setItem('token', data.token);
                setSuccessAvatar('Avatar updated.');
            } catch (error: any) {
                setErrorAvatar(error.message);
                console.error('Error logging in:', error);
            } finally {
                setLoadingAvatar('');
            }
        } else {
            console.log('No option selected');
        }
               
    };

    


    useEffect(() => {
        Load();
        //Avatar();
    }, []);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
    const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    const handleColourChange = (e: ChangeEvent<HTMLInputElement>) => setColour(e.target.value);

    
    return (
        // (<main className="flex min-h-screen flex-col items-center justify-between p-24"><h1>First Post</h1>;</main>)

        <div className="min-h-screen bg-blue-900 text-gray-900 flex justify-center items-baseline">
            <button className="xl:mr-[12px] xl:-ml-[39px] sm:mr-0 sm:ml-0" onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-10 h-10 text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="lg:w-1/2 p-6 sm:p-12">
                    {/* <div className=" flex flex-col items-center">
                        <Image
                            src={logo}
                            alt="logo"
                        />
                    </div> */}


                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text mb-5">
                            Your Profile
                        </h1>
                        <h1 className="text-2xl xl:text-3xl font-extrabold">

                        </h1>
                        <div className="w-full flex-1 mt-8">
                            {/* <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-200 focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign In with Google
                                    </span>
                                </button>

                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-indigo-200 focus:shadow-sm focus:shadow-outline mt-5">
                                    <div className="bg-white p-1 rounded-full">
                                        <svg className="w-6" viewBox="0 0 32 32">
                                            <path fill-rule="evenodd"
                                                d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign In with GitHub
                                    </span>
                                </button>
                            </div> */}

                            <form onSubmit={updateInfo} className="mx-auto max-w-xs mb-32">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
                                <button
                                    className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-blue-500 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Edit
                                    </span>
                                </button>
                                {loadingInfo && <p className="text-grey-500 mt-4">{loadingInfo}</p>}
                                {errorInfo && <p className="text-red-500 mt-4">{errorInfo}</p>}
                                {successInfo && <p className="text-green-500 mt-4">{successInfo}</p>}
                            </form>
                            
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Update your e-mail
                                </div>
                            </div>

                            <form onSubmit={updateEmail} className="mx-auto max-w-xs mb-32">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                                <button
                                    className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-blue-500 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Update
                                    </span>
                                </button>
                                {loadingEmail && <p className="text-grey-500 mt-4">{loadingEmail}</p>}
                                {errorEmail && <p className="text-red-500 mt-4">{errorEmail}</p>}
                                {successEmail && <p className="text-green-500 mt-4">{successEmail}</p>}
                            </form>
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Customize your Avatar
                                </div>
                            </div>
                            <form onSubmit={updateAvatar} className="mx-auto max-w-xs flex flex-col align-center items-center justify-center mb-32">

                                <div className="grid w-[40rem] grid-cols-5 gap-2 rounded-xl bg-gray-50 p-2 mt-10">
                                    <div>
                                        <input type="radio" name="option" id="1" value="1" className="peer hidden" />
                                        <label htmlFor="1" className="flex justify-center items-center cursor-pointer select-none rounded-xl p-2 peer-checked:bg-gradient-to-tl from-blue-500 to-indigo-500 peer-checked:font-bold peer-checked:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-inherit">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                                            </svg>

                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" name="option" id="2" value="2" className="peer hidden" />
                                        <label htmlFor="2"className="flex justify-center items-center cursor-pointer select-none rounded-xl p-2 peer-checked:bg-gradient-to-tl from-blue-500 to-indigo-500 peer-checked:font-bold peer-checked:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-inherit">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                            </svg>


                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" name="option" id="3" value="3" className="peer hidden" />
                                        <label htmlFor="3" className="flex justify-center items-center cursor-pointer select-none rounded-xl p-2 peer-checked:bg-gradient-to-tl from-blue-500 to-indigo-500 peer-checked:font-bold peer-checked:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-inherit">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                                            </svg>


                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" name="option" id="4" value="4" className="peer hidden" />
                                        <label htmlFor="4"className="flex justify-center items-center cursor-pointer select-none rounded-xl p-2 peer-checked:bg-gradient-to-tl from-blue-500 to-indigo-500 peer-checked:font-bold peer-checked:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-inherit">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                            </svg>

                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" name="option" id="5" value="5" className="peer hidden" />
                                        <label htmlFor="5" className="flex justify-center items-center cursor-pointer select-none rounded-xl p-2 peer-checked:bg-gradient-to-tl from-blue-500 to-indigo-500 peer-checked:font-bold peer-checked:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-inherit">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                                            </svg>


                                        </label>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <input type="color" className="p-1  w-60 h-10 block bg-gray-50 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none" id="hs-color-input" value={colour}
        onChange={handleColourChange} title="Choose your color"></input>
                                </div>
                                <button
                                    className="mt-20 tracking-wide font-semibold bg-gradient-to-tl from-blue-500 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Customize
                                    </span>
                                </button>
                                {loadingAvatar && <p className="text-grey-500 mt-4">{loadingAvatar}</p>}
                                {errorAvatar && <p className="text-red-500 mt-4">{errorAvatar}</p>}
                                {successAvatar && <p className="text-green-500 mt-4">{successAvatar}</p>}
                            </form>
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-lg text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Edit your Password
                                </div>
                            </div>

                            <form onSubmit={updatePassword} className="mx-auto max-w-xs mb-32">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Current Password" value={currentPassword} onChange={handleCurrentPasswordChange} />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange}/>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                                <button
                                    className="mt-10 tracking-wide font-semibold bg-gradient-to-tl from-blue-500 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Edit
                                    </span>
                                </button>
                                {loadingPassword && <p className="text-grey-500 mt-4">{loadingPassword}</p>}
                                {errorPassword && <p className="text-red-500 mt-4">{errorPassword}</p>}
                                {successPassword && <p className="text-green-500 mt-4">{successPassword}</p>}
                                {/* <Link href="/forgot_pwd" className="font-semibold text-blue-700 hover:text-indigo-500 flex items-center justify-center mt-5">Forgot your password ?</Link> */}

                            </form>

                            <Link href="mailto:midstream42@gmail.com" className="font-semibold text-blue-700 hover:text-indigo-500 flex text-center items-center justify-center mt-5">Any questions ? Contact our team via the email midstream42@gmail.com</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}