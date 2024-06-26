"use client";
import { useState, useEffect, ChangeEventHandler } from 'react';

import { ChangeEvent } from 'react';

type NavTableProps = {
  list: any[];
  setListShown: (list: any[]) => void;
  maxLinesOnTable: number;
  table: JSX.Element;
};

const NavTable: React.FC<NavTableProps> = ({ list, setListShown, maxLinesOnTable, table }) => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [navPages, setNavPages] = useState<number[]>([1]);

  useEffect(() => {

    let nbPages = Math.ceil(list.length / maxLinesOnTable);
    if (nbPages < 1) {
      nbPages = 1;
    }
    if (selectedPage < 1) setSelectedPage(1);
    if (selectedPage > nbPages) setSelectedPage(nbPages)

    let nav = [1];
    if (selectedPage > 3) {
      nav.push(-1);
    }
    for (let i = selectedPage - 1; i <= selectedPage + 1; i++) {
      if (i > 1 && i < nbPages) {
        nav.push(i);
      }
    }
    if (selectedPage < nbPages - 2) {
      nav.push(-1);
    }
    if (nbPages > 1) nav.push(nbPages);
    setNavPages(nav);
    setListShown(list.slice((selectedPage - 1) * maxLinesOnTable, selectedPage * maxLinesOnTable));
  }, [selectedPage, list]);

  return (
    <div className="p-6 pt-0 pb-2 mt-5">
      {table}
      { list.length > maxLinesOnTable &&
        <div className="flex items-center justify-between mt-10 mb-6">
          <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => {
            setSelectedPage(selectedPage - 1);
          }} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>
              previous
            </span>
          </button>

          <div className="items-center hidden md:flex gap-x-3">
            {navPages.map((nav, index) => (
              nav === -1 ? (
                <button key={index} className="px-2 py-1 text-sm text-gray-500 rounded-md" disabled>...</button>
              ) : (
                <button
                  key={index}
                  className={`px-2 py-1 text-sm text-gray-500 rounded-md ${selectedPage === nav ? 'bg-blue-100/60' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedPage(nav)}
                >
                  {nav}
                </button>
              )
            ))}
          </div>

          <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => {
            setSelectedPage(selectedPage + 1);
          }} >
            <span>
              Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      }

    </div>
  );
}
export default NavTable;
