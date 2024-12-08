
import { Resource } from '@/types/types';
import React, { useEffect, useRef, useState } from 'react';

interface TagSelectorProps {
    tags: Resource[];
    setTags: (tags: Resource[]) => void;
    allTags: Resource[];
}

const TagSelector: React.FC<TagSelectorProps> = ({ setTags, tags, allTags ,}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleAddTag = (tag: Resource) => {
        if (!tags.some(t => t._id === tag._id)) {
            setTags([...tags, tag]);
        } else {
            alert(`${tag.name} is already added!`); 
        }
        setDropdownOpen(false);
    };

    const handleRemoveTag = (tag: Resource) => {
        setTags(tags.filter((t) => t._id !== tag._id));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center h-64 mx-auto">
            <div className="w-full">
                <div className="flex flex-col items-center relative">
                    <div className="w-full">
                        <div className="my-2 p-1 flex border border-gray-200 color-white rounded">
                            <div className="flex flex-auto flex-wrap">
                                {tags.map((tag) => (
                                    <div
                                        key={tag._id}
                                        className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-transparent rounded-full text-white border border-teal-300 outline-none"
                                    >
                                        <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                            {tag.name}
                                        </div>
                                        <div className="flex flex-auto flex-row-reverse">
                                            <div
                                                onClick={() => handleRemoveTag(tag)}
                                                className="cursor-pointer hover:text-white bg-transparent rounded-full w-4 h-4 ml-2"
                                                role="button"
                                                aria-label={`Remove tag ${tag.name}`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="100%"
                                                    height="100%"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18" />
                                                    <line x1="6" y1="6" x2="18" y2="18" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex-1">
                                    <input
                                        ref={inputRef}
                                        placeholder="Add a tag..."
                                        className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                                        onFocus={() => setDropdownOpen(true)}
                                    />
                                </div>
                            </div>
                            <div className="text-black w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="cursor-pointer w-6 h-6 text-white bg-transparent outline-none focus:outline-none"
                                    aria-label="Toggle tag dropdown"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4"
                                    >
                                        <polyline points="18 15 12 9 6 15" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute shadow top-100 bg-blue-300 z-40 w-full left-0 rounded max-h-select overflow-y-auto">
                            <div className="flex flex-col w-full">
                                {allTags.map((tag) => (
                                    <div
                                        key={tag._id}
                                        onClick={() => handleAddTag(tag)}
                                        className="cursor-pointer w-full border-gray-100 border-b hover:bg-eisha hover:text-white"
                                        role="button"
                                        aria-label={`Add tag ${tag.name}`}
                                    >
                                        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                                            <div className="w-full items-center flex">
                                                <div className="mx-2 leading-6">{tag.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagSelector;
