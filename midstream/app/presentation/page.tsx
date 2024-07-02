"use client";

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogPanel } from '@headlessui/react'

import Image from "next/image";
import Link from 'next/link';
import boardwhites from '../assets/whiteboard.png';
import dashboard from '../assets/dashboard.png';
import docuedit from '../assets/docEdit.png';
import explorer from '../assets/explorer.png'
import logo from '../assets/file.png';
import marketplace from '../assets/marketplace1.png'
import tasks from '../assets/tasks.png'
import team from '../assets/teams.png'
import { useState } from 'react'

const navigation = [
  { name: 'Product', href: '#product' },
  { name: 'Features', href: '#features' },
  { name: 'Marketplace', href: '#marketplace' },
  { name: 'Our Team', href: '#team' },
]

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
  },
  // More people...
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white min-h-[2080px] flex flex-col">
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <div className="w-20 -mt-5">
                  <Image
                    src={logo}
                    alt="logo"
                  />
                </div>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link href="./login">
                <button className="text-sm font-semibold leading-6 text-gray-900 pr-12">
                  Log in
                </button>
              </Link>
              <Link href="./register">
                <button className="text-sm font-semibold leading-6 text-gray-900">
                  Register
                </button>
              </Link>
            </div>
          </nav>
          <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <Image
                    src={logo}
                    alt="logo"
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FECDD3] to-[#A78BFA] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {/* Ready to boost your projects to the next speed? */}
                Ready to catch up with the flow ?
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Need a centralized working environment, with modular tools and complete adaptability ? Bring your projects to the next speed with <b>MidStream</b>.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="./register">
                  <button
                    className="rounded-md bg-gradient-to-tl from-blue-600 to-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-tl from-blue-600 to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Get started
                  </button></Link>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
      <div className="relative isolate overflow-hidden bg-transparent px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-transparent">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            {/* <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-pink-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg> */}
            {/* <rect width="100%" height="100%" strokeWidth={0} className='bg-pink-50 fill-pink-50' /> */}
          </svg>
        </div>
        <div id="product" className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">Your future</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">MidStream</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Ready to discover your next indispensible ally ?
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src={dashboard}
              alt="logo"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Midstream is a project management tool designed to be simple and adaptable. Our mission is to provide a flexible solution that evolves with the complexity of our users` projects. Midstream offers a simple foundation for project management with the option to add modules à la carte, thus meeting specific needs. This flexible approach allows the tool to adapt to the growth and evolution of projects. Unlike its competitors, which are often too complex or limiting, Midstream evolves according to your needs.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    {/* <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" /> */}
                    <span>
                      <strong className="font-semibold text-gray-900">Effective document managementy.</strong> Enable an efficient connection between various documents to facilitate the organization and management of project information.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    {/* <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" /> */}
                    <span>
                      <strong className="font-semibold text-gray-900">Effective collaborator management.</strong> Allow for the assignment of roles to collaborators to facilitate effective and collaborative work.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    {/* <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" /> */}
                    <span>
                      <strong className="font-semibold text-gray-900">Collaboration and communication.</strong> Facilitate communication and collaboration within teams through features like the whiteboard and team management.
                    </span>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 mt-40">

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-20">Varied Features</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full shadow-xl overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}
              <Image className="w-[148rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={explorer}
                alt="logo"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    File explorer
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Keep all your files in one place</p>
              </div>
              {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
            </div>
          </div>
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 shadow-xl w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}
              <Image className="w-[148rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={docuedit}
                alt="logo"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    Editor
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Create and edit documents</p>
              </div>
              {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
            </div>
          </div>
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 shadow-xl w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}
              <Image className="w-[148rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={boardwhites}
                alt="logo"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    Whiteboard
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Collaborate in free and creative ways</p>
              </div>
              {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
            </div>
          </div>
          <div className="group relative ">
            <div className="aspect-h-1 shadow-xl aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              {/* <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}
              <Image className="w-[148rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                src={tasks}
                alt="logo"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a>
                    <span aria-hidden="true" className="absolute inset-0" />
                    Task Manager
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">And many more...</p>
              </div>
              {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
            </div>
          </div>
        </div>


      </div>



      <div id="marketplace" className="relative isolate overflow-hidden bg-transparent px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 mt-40">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-transparent">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">Tailor your project</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Growing Marketplace</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Ready to discover your next indispensible ally ?
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src={marketplace}
              alt="logo"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  Midstream is a project management tool designed to be simple and adaptable, with a mission to provide a flexible solution that evolves alongside the complexity of our users projects. At its core, Midstream offers a straightforward foundation for managing projects, but it also integrates the capability to add and remove modules, allowing users to customize the tool according to their specific needs. This modular approach includes features such as human resources management, budget tracking, and integration with external tools like GitHub. By offering these customizable options, Midstream ensures that each user can tailor the tool to fit their unique project requirements.
                </p>
                <p className="mt-8">
                  This <strong className="font-semibold text-gray-900">flexibility </strong>allows Midstream to adapt to the growth and evolution of projects, making it a <strong className="font-semibold text-gray-900">dynamic solution</strong> that scales with your needs. Unlike competitors that are often overly complex or limiting, Midstream’s approach ensures that you have the <strong className="font-semibold text-gray-900">right tools at the right time</strong>, without unnecessary complications. As your project evolves, so does Midstream, providing you with a seamless and efficient project management experience. Whether you re starting with basic <strong className="font-semibold text-gray-900">project tracking </strong>or expanding to include comprehensive resource management and external integrations, Midstream is designed to grow with you, ensuring that you remain <strong className="font-semibold text-gray-900">agile and efficient</strong> at every stage of your project’s lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="team" className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 mb-40 mt-60">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The MidStream Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The 6 members of our team have devoted 5 months of efforts to create the beautiful tool you will soon discover !
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 ml-40">
          <li>
            <div className="flex items-center gap-x-6">
              <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-lime-400 to-lime-200 text-white shadow-lime-500/40 shadow-lg grid h-10 w-10 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-inherit">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>


              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Arthur</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Back-End Developer</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-yellow-400 to-amber-200 text-white shadow-yellow-500/40 shadow-lg grid h-10 w-10 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-inherit">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Lou</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Front-End Developer</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-400 to-blue-200 text-white shadow-blue-500/40 shadow-lg grid h-10 w-10 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-inherit">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>

              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Pauline</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Back-End Developer</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-fuchsia-400 to-fuchsia-200 text-white shadow-fuchsia-500/40 shadow-lg grid h-10 w-10 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-inherit">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Jessica</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Data Engineer</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-red-400 to-red-200 text-white shadow-red-500/40 shadow-lg grid h-10 w-10 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Hugo</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Back-End Developer</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <div className="bg-clip-border ml-8 rounded-3xl overflow-hidden bg-gradient-to-tr from-pink-400 to-pink-200 text-white shadow-pink-500/40 shadow-lg grid h-10 w-10 place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-inherit">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                </svg>

              </div>
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Xavier</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Data Engineer</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}