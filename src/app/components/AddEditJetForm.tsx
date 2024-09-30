
// import React, { useState, useEffect } from 'react';

// interface Jet {
//     name: string;
//     description: string;
//     jetImage?: File | string; // Can be a URL or File
// }

// interface AddEditJetFormProps {
//     initialJetData?: Jet;
//     onSave: (jetData: FormData) => void;
// }

// const AddEditJetForm: React.FC<AddEditJetFormProps> = ({ initialJetData, onSave }) => {
//     const [jetData, setJetData] = useState<Jet>({
//         name: '',
//         description: '',
//         jetImage: undefined,
//     });

//     useEffect(() => {
//         if (initialJetData) {
//             setJetData(initialJetData);
//         }
//     }, [initialJetData]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setJetData(prevData => ({ ...prevData, [name]: value }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setJetData(prevData => ({ ...prevData, jetImage: file }));
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         console.log('Jet Data Before FormData:', jetData);

//         const formData = new FormData();
//         formData.append('name', jetData.name);
//         formData.append('description', jetData.description);
//         if (jetData.jetImage && typeof jetData.jetImage !== 'string') {
//             formData.append('jetImage', jetData.jetImage);
//         }
//         formData.forEach((value, key) => {
//             console.log(`${key}:`, value);
//         });
    
//         onSave(formData);
//         // console.log('formdata is',formData)
//     };
    
//     return (
//         <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-lg">
//             <h2 className="text-2xl font-semibold mb-4">{initialJetData ? 'Edit Jet' : 'Add New Jet'}</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={jetData.name}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={jetData.description}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     />
//                 </div>
//                 <div>
//                     {initialJetData && typeof initialJetData.jetImage === 'string' ? (
//                         <div>
//                             <label htmlFor="jetImage" className="block text-sm font-medium text-gray-700">Jet Image</label>
//                             <div className="mb-2">
//                                 <img
//                                     src={initialJetData.jetImage}
//                                     alt="Jet"
//                                     className="w-full h-auto object-cover"
//                                 />
//                             </div>
//                             <input
//                                 type="file"
//                                 id="jetImage"
//                                 name="jetImage"
//                                 onChange={handleFileChange}
//                                 className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                     ) : (
//                         <div>
//                             <label htmlFor="jetImage" className="block text-sm font-medium text-gray-700">Jet Image</label>
//                             <input
//                                 type="file"
//                                 id="jetImage"
//                                 name="jetImage"
//                                 onChange={handleFileChange}
//                                 className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </div>
//                     )}
//                 </div>
//                 <div>
//                     <button
//                         type="submit"
//                         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         {initialJetData ? 'Update Jet' : 'Add Jet'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddEditJetForm;
import React, { useState, useEffect } from 'react';

interface Jet {
    name: string;
    description: string;
    jetImage?: File | string; // Can be a URL or File
    jetLink?: string; // New field for Sketchfab link
}

interface AddEditJetFormProps {
    initialJetData?: Jet;
    onSave: (jetData: FormData) => void;
}

const AddEditJetForm: React.FC<AddEditJetFormProps> = ({ initialJetData, onSave }) => {
    const [jetData, setJetData] = useState<Jet>({
        name: '',
        description: '',
        jetImage: undefined,
        jetLink: '', // Initialize jetLink
    });

    useEffect(() => {
        if (initialJetData) {
            setJetData(initialJetData);
        }
    }, [initialJetData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJetData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setJetData(prevData => ({ ...prevData, jetImage: file }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Jet Data Before FormData:', jetData);

        const formData = new FormData();
        formData.append('name', jetData.name);
        formData.append('description', jetData.description);
        formData.append('jetLink', jetData.jetLink || ''); // Append the jetLink field
        if (jetData.jetImage && typeof jetData.jetImage !== 'string') {
            formData.append('jetImage', jetData.jetImage);
        }
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });
    
        onSave(formData);
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">{initialJetData ? 'Edit Jet' : 'Add New Jet'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={jetData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={jetData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="jetLink" className="block text-sm font-medium text-gray-700">Sketchfab Jet Link</label>
                    <input
                        type="url"
                        id="jetLink"
                        name="jetLink"
                        value={jetData.jetLink}
                        onChange={handleChange}
                        placeholder="Enter Sketchfab link"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    {initialJetData && typeof initialJetData.jetImage === 'string' ? (
                        <div>
                            <label htmlFor="jetImage" className="block text-sm font-medium text-gray-700">Jet Image</label>
                            <div className="mb-2">
                                <img
                                    src={initialJetData.jetImage}
                                    alt="Jet"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <input
                                type="file"
                                id="jetImage"
                                name="jetImage"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="jetImage" className="block text-sm font-medium text-gray-700">Jet Image</label>
                            <input
                                type="file"
                                id="jetImage"
                                name="jetImage"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {initialJetData ? 'Update Jet' : 'Add Jet'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditJetForm;
