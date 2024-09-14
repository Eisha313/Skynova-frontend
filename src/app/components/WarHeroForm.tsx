
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// type WarHero = {
//   _id?: string;
//   name: string;
//   description: string;
//   documentary?: string;
//   famousQuote: string;
// };

// type WarHeroFormProps = {
//   id?: string;
// };

// const WarHeroForm: React.FC<WarHeroFormProps> = ({ id }) => {
//   const [warHero, setWarHero] = useState<WarHero>({ name: '', description: '', famousQuote: '' });
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       axios.get(`http://localhost:4000/viewWarHero/${id}`)
//         .then((response) => {
//           const data = response.data;
//           if (data.length > 0) {
//             setWarHero(data[0]);
//           }
//         })
//         .catch((error) => console.error('Error fetching war hero:', error));
//     }
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setWarHero({ ...warHero, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     if (file) formData.append('file', file);
//     formData.append('name', warHero.name);
//     formData.append('description', warHero.description);
//     formData.append('famousQuote', warHero.famousQuote);

//     try {
//       const method = id ? 'PATCH' : 'POST';
//       const url = id ? `http://localhost:4000/updateWarHero/${id}` : 'http://localhost:4000/createwarHero';
//       const response = await axios({
//         method,
//         url,
//         data: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       router.push('/warheroes');
//     } catch (error) {
//       console.error('Error saving war hero:', error);
//       if (axios.isAxiosError(error) && error.response) {
//         setError(`Error: ${error.response.status} - ${error.response.statusText}`);
//       } else {
//         setError('Error saving war hero.');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">{id ? 'Edit War Hero' : 'Create War Hero'}</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={warHero.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-gray-700">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={warHero.description}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="documentary" className="block text-gray-700">Documentary</label>
//           <input
//             type="file"
//             id="documentary"
//             name="documentary"
//             onChange={handleFileChange}
//             className="w-full px-3 py-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="famousQuote" className="block text-gray-700">Famous Quote</label>
//           <textarea
//             id="famousQuote"
//             name="famousQuote"
//             value={warHero.famousQuote}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {id ? 'Update War Hero' : 'Create War Hero'}
//         </button>
//       </form>

//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default WarHeroForm;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type WarHero = {
  _id?: string;
  name: string;
  description: string;
  documentary?: string;
  famousQuote: string;
};

type WarHeroFormProps = {
  id?: string;
};

const WarHeroForm: React.FC<WarHeroFormProps> = ({ id }) => {
  const [warHero, setWarHero] = useState<WarHero>({ name: '', description: '', famousQuote: '' });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      axios.get(`http://sky-nova-8ccaddc754ce.herokuapp.com/viewWarHero/${id}`,{withCredentials:true})
        .then((response) => {
          const data = response.data;
          if (data.length > 0) {
            setWarHero(data[0]);
          }
        })
        .catch((error) => console.error('Error fetching war hero:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWarHero({ ...warHero, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('name', warHero.name);
    formData.append('description', warHero.description);
    formData.append('famousQuote', warHero.famousQuote);

    try {
      const method = id ? 'PATCH' : 'POST';
      const url = id ? `hhttp://sky-nova-8ccaddc754ce.herokuapp.com/updateWarHero/${id}` : 'sky-nova-8ccaddc754ce.herokuapp.com/createwarHero';
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      router.push('/warheroes');
    } catch (error) {
      console.error('Error saving war hero:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        setError('Error saving war hero.');
      }
    }
  };

  return (
  <div className="container mx-auto p-4 flex justify-center  min-h-screen ">
  <div className="w-full max-w-lg">
    <h2 className="text-2xl font-bold mb-7 text-center">{id ? 'Edit War Hero' : 'Create War Hero'}</h2>
    <div className=''>
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div >
        <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={warHero.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={warHero.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="documentary" className="block text-gray-700 mb-1">Documentary</label>
        <input
          type="file"
          id="documentary"
          name="documentary"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="famousQuote" className="block text-gray-700 mb-1">Famous Quote</label>
        <textarea
          id="famousQuote"
          name="famousQuote"
          value={warHero.famousQuote}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto">
        {id ? 'Update War Hero' : 'Create War Hero'}
      </button>
    </form>

    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
  </div>
</div>
</div>
  )
};

export default WarHeroForm;
