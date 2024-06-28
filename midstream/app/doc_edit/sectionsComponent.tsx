"use client";
import Link from 'next/link';
import { useState, useEffect, ChangeEventHandler, use } from 'react';

import { ChangeEvent } from 'react';

type SectionsComponentProps = {
  initialSections: Section[];
  isParentDisabeled?: boolean;
};

export interface Section {
  title?: string;
  content: Section[] | string;
  type: SectionType;
}
export enum SectionType {
  Section = 'section',
  Paragraph = 'paragraph',
  Reference = 'reference',
  Referenced = 'referenced',
}

const SectionsComponent: React.FC<SectionsComponentProps> = ({ initialSections, isParentDisabeled = false }) => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showIndexTitle, setShowIndexTitle] = useState<number | null>(null);

  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  

  const handleAddSection = (index: number, type: SectionType) => {
    var content: Section[] | string = '';
    if (type === SectionType.Paragraph) {
      setSections([...sections.slice(0, index), { title: '', content: content, type: type }, ...sections.slice(index)]);
      return;
    }

    // content = [{ content: '', type: SectionType.Paragraph }];
    content = [];
    if (type === SectionType.Section) {

    }
    if (type === SectionType.Reference) {

    }
    setSections([...sections.slice(0, index), { title: '', content: content, type: type }, ...sections.slice(index)]);
    ;
  };

  const handleDeletSection = (section: Section): void => {
    setSections(sections.filter((s) => s !== section));
  }

  const handleSectionTitleChange = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
    const newSections = [...sections];
    newSections[index].title = e.target.value;
    setSections(newSections);
  }

  const handleSectionContentChange = (index: number, e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newSections = [...sections];
    newSections[index].content = e.target.value;
    setSections(newSections);
  }

  return (
    <div  >
      {sections.length == 0 && <SectionButtons index={0} handleAddSection={handleAddSection} isDisabeled={isParentDisabeled} />}
      {
        sections.map((section, index) => {
          const titlesHidden = (section.type === SectionType.Paragraph) && (!section.title) && (showIndexTitle !== index);
          const isDisabeled = isParentDisabeled || (section.type == SectionType.Reference);
          const handleReload = (e: HTMLTextAreaElement) => {
            const autoResize = (textarea: HTMLTextAreaElement) => {
              textarea.style.height = 'auto';
              textarea.style.height = `${textarea.scrollHeight}px`;
            };
            autoResize(e);
            e.addEventListener('input', () => autoResize(e));
            return () => {
              e.removeEventListener('input', () => autoResize(e));
            };
          }
          return (
            <div key={index} className='block'>
              {index == 0 && <SectionButtons index={0} handleAddSection={handleAddSection}  isDisabeled={isParentDisabeled}/>}
              {section.type === SectionType.Reference ?
                <div className="col-span-2 flex">
                  <p className='pl-6 pr-4'>References <Link href="/doc_explorer"><u className="underline text-blue-300">Doc 1</u> </Link></p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"} />
                  </svg>
                </div>
                :
                section.type === SectionType.Referenced &&
                <div className="col-span-2 flex">
                  <p className='pl-6 pr-4'>Referenced in <Link href="/doc_explorer"><u className="underline text-blue-300">Doc 2</u> </Link></p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </div>
              }
              <div
                id='section'
                className={`block relative border-r-0  ${section.type == SectionType.Reference ? 'border-l-blue-400' : (section.type == SectionType.Referenced ? 'border-l-yellow-300' : 'border-l-gray-300')} rounded focus:outline-none focus:ring-0  transition border ${hoveredIndex === index ? 'border-gray-300 border-l-8' : 'border-transparent border-l-0'}`}
                style={{ transition: 'border 0.3s ease-in-out' }}
                onMouseEnter={() => !isParentDisabeled && setHoveredIndex(index)}
                onMouseLeave={() => !isParentDisabeled && setHoveredIndex(null)}
              >

                <div className={`inset-0 pb-0 transition-opacity max-w-500`}
                  style={{
                    opacity: titlesHidden ? 0 : 1,
                    maxHeight: titlesHidden ? '0' : '100vh',
                    transition: 'opacity 1s ease-in-out, max-height 1s ease-in-out'
                  }}
                  onMouseEnter={() => !isDisabeled && setShowIndexTitle(index)}
                  onMouseLeave={() => !isDisabeled && setShowIndexTitle(null)}
                >

                  <div className="col-span-8">
                    <input
                      className={`w-full font-semibold text-lg pl-4 bg-white pb-0 rounded ring-white cursor-text focus:outline-none focus:ring-0`}
                      placeholder="Your next brilliant idea..."
                      value={section.title || ''}
                      onChange={(e) =>!isDisabeled && handleSectionTitleChange(index, e)}
                      disabled={isDisabeled}
                    />
                  </div>
                </div>

                <div className="inset-0 pl-4 pb-0 mb-0 ">
                  {(typeof section.content === 'string') ? (
                    <textarea
                      ref={handleReload}
                      className={`w-full mb-0 pb-0  mb-0 bg-inherit cursor-text resize-none border-none focus:outline-none`}
                      placeholder="Your next brilliant idea..."
                      value={section.content}
                      disabled={isDisabeled}
                      onChange={(e) => !isDisabeled && handleSectionContentChange(index, e)}

                    />
                  ) : (
                    <SectionsComponent
                      initialSections={section.content as Section[]}
                      isParentDisabeled={isDisabeled}
                    />
                  )
                  }
                  <div className="absolute top-0 right-0"
                    style={{ transition: 'opacity 0.3s ease-in-out', opacity: hoveredIndex === index ? 1 : 0 }}
                  >
                    <button onClick={() => handleDeletSection(section)} disabled={isParentDisabeled} >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-6 w-6 border p-1 rounded">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <SectionButtons index={index + 1} handleAddSection={handleAddSection} isDisabeled={isParentDisabeled} />
            </div>
          )
        })
      }
    </div>
  );
}

type SectionButtonsProps = {
  index: number;
  isDisabeled?: boolean;
  handleAddSection: (index: number, type: SectionType) => void;
};

const SectionButtons: React.FC<SectionButtonsProps> = ({ handleAddSection, isDisabeled = false , index }) => {
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
  }, [isHidden]);

  return (
    <div
      className='text-gray-600 inset-0 p-1'
      onMouseEnter={() => !isDisabeled && setIsHidden(false)}
      onMouseLeave={() => !isDisabeled && setIsHidden(true)}
      style={{
        opacity: isHidden ? 0 : 1,
        maxHeight: isHidden ? '0' : '100vh',  // Example for transitioning max-height
        transition: 'opacity 1s ease-in-out, max-height 1s ease-in-out'
      }}
    >
      <div className="col-span-8 pl-4">
        <div className='grid grid-cols-12'>
          <div className='grid grid-rows-2 col-span-2'>
            <div className='border-b-2 border-b-gray-300'></div>
          </div>
          <div className='flex col-span-8 items-center justify-center'>

            <button 
            onClick={() => { handleAddSection(index, SectionType.Section) }} 
            className='flex items-center justify-center bg-gray-100 rounded-2xl p-1 mr-1'
            disabled={isDisabeled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 pl-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <p className='pr-3 pl-3 text-sm'>New Section</p>
            </button>
            <button 
            onClick={() => { handleAddSection(index, SectionType.Paragraph) }} 
            className='flex items-center justify-center bg-gray-100 rounded-2xl p-1 mr-1 ml-1'
            disabled={isDisabeled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 pl-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              <p className='pr-3 pl-3 text-sm'>New Paragraph</p>
            </button>
            <button 
            onClick={() => { handleAddSection(index, SectionType.Reference) }} 
            className='flex items-center justify-center bg-gray-100 rounded-2xl p-1 ml-1'
            disabled={isDisabeled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 pl-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
              <p className='pr-3 pl-3 text-sm'>New Reference</p>
            </button>

          </div>
          <div className='grid grid-rows-2 col-span-2'>
            <div className='border-b-2 border-b-gray-300'></div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default SectionsComponent;
