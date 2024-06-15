"use client";
import React, { useState, useRef } from 'react';

const App: React.FC = () => {
  const [dragTemp, setDragTemp] = useState<HTMLElement | null>(null);
  const [currentDropTarget, setCurrentDropTarget] = useState<React.RefObject<HTMLDivElement> | null>(null);
  const dp1Ref = useRef<HTMLDivElement>(null);
  const dp2Ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: HTMLElement) => {
    setDragTemp(element);
    console.log('dragStart', element);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dropRef: React.RefObject<HTMLDivElement>) => {
    e.preventDefault();
    setCurrentDropTarget(dropRef);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragTemp && currentDropTarget?.current) {
      const rect = currentDropTarget.current.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;

      const childrenArray = Array.from(currentDropTarget.current.children) as HTMLElement[];
      let inserted = false;

      for (let child of childrenArray) {
        const childRect = child.getBoundingClientRect();
        if (offsetY < childRect.top + childRect.height / 2) {
          currentDropTarget.current.insertBefore(dragTemp, child);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        currentDropTarget.current.appendChild(dragTemp);
      }

      // Logging content of dp2 after drop
      if (currentDropTarget.current === dp2Ref.current) {
        dp2Ref.current.querySelectorAll('.drag').forEach((element) => {
          console.log((element as HTMLElement).innerText);
        });
      }
    }

    setCurrentDropTarget(null);
  };

  return (
    <div className="w-full h-full bg-gray-200 p-10 space-x-10 flex">
      <div
        id="dp1"
        className="drop flex-1 bg-gray-100 rounded-lg shadow-lg p-5 space-y-2"
        ref={dp1Ref}
        onDragOver={(e) => handleDragOver(e, dp1Ref)}
        onDrop={handleDrop}
      >
        <div
          id="dg1"
          className="drag w-full bg-blue-100 p-5 rounded-md shadow-md text-white"
          draggable
          onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
        >
          Item1
        </div>
        <div
          id="dg2"
          className="drag w-full bg-blue-200 p-5 rounded-md shadow-md text-white"
          draggable
          onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
        >
          Item2
        </div>
        <div
          id="dg3"
          className="drag w-full bg-blue-300 p-5 rounded-md shadow-md text-white"
          draggable
          onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
        >
          Item3
        </div>
        <div
          id="dg4"
          className="drag w-full bg-blue-400 p-5 rounded-md shadow-md text-white"
          draggable
          onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
        >
          Item4
        </div>
        <div
          id="dg5"
          className="drag w-full bg-blue-500 p-5 rounded-md shadow-md text-white"
          draggable
          onDragStart={(e) => handleDragStart(e, e.currentTarget as HTMLElement)}
        >
          Item5
        </div>
      </div>
      <div
        id="dp2"
        className="drop flex-1 bg-gray-100 rounded-lg shadow-lg p-5 space-y-2"
        ref={dp2Ref}
        onDragOver={(e) => handleDragOver(e, dp2Ref)}
        onDrop={handleDrop}
      ></div>
    </div>
  );
};

export default App;
