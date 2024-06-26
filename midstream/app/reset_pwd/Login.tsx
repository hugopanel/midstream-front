"use client";
import { Suspense } from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Image from "next/image";
import Link from 'next/link';
import logo from '../assets/logo.png';

export default function Login() {

    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmpassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<string>('');

    const router = useRouter();

    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading('Loading...');
        setError('');

        console.log(token);

        if (password == confirmpassword) {
            try {
                const response = await fetch('/api/reset_pwd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to reset password');
                }

                const data = await response.json();
                console.log('Reset of the password successful:', data);
                setSuccess(data.message);
                setError("");
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } catch (error: any) {
                setError(error.message);
                console.error('Error during reset fo the password:', error);
            } finally {
                setLoading('');
            }
        }
        else {
            setError("You must enter the same password twice.");
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmpasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmpassword(e.target.value);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-lg flex justify-center flex-1 shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div className=" flex flex-col items-center">
                            <Image
                                src={logo}
                                alt="logo"
                            />
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Reset your password
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Enter your new password :
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password" placeholder="New password" value={password} onChange={handlePasswordChange} />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password" placeholder="Confirm password" value={confirmpassword} onChange={handleConfirmpasswordChange} />
                                    {/* <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password" /> */}
                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-red-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">
                                            Change your password
                                        </span>
                                    </button>
                                </form>
                                {loading && <p className="text-grey-500 mt-4">{loading}</p>}
                                {error && <p className="text-red-500 mt-4">{error}</p>}
                                {success && <p className="text-green-500 mt-4">{success}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative flex justify-center align-center items-center overflow-hidden bg-indigo-100  hidden lg:flex sm:rounded-tr-lg sm:rounded-br-lg">
                        <div className="relative z-10 w-full h-full">
                            <video className="w-full h-full object-cover" autoPlay muted loop>
                                <source src='/videos/mountain.mp4' type="video/mp4" />
                                <track
                                    src="/path/to/captions.vtt"
                                    kind="subtitles"
                                    srcLang="en"
                                    label="English"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>);
}