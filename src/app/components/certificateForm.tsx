
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Certificate from './Certificate';
import Link from 'next/link';
type Certificate = {
  _id?: string;
  type: string;
  description: string;
};

type CertificateFormProps = {
  id?: string;
};

const CertificateForm: React.FC<CertificateFormProps> = ({ id }) => {
  const [certificate, setCertificate] = useState<Certificate>({ type: '', description: '' });
  const [showCertificate, setShowCertificate] = useState(false);
  const [generatedCertificate, setGeneratedCertificate] = useState<Certificate | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`http://sky-nova-8ccaddc754ce.herokuapp.com/certificates/viewCertificate/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCertificate(data);
          }
        })
        .catch((error) => console.error('Error fetching certificate:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleGenerateAndSave = (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://sky-nova-8ccaddc754ce.herokuapp.com/certificates/updateCertificate/${id}` : 'http://sky-nova-8ccaddc754ce.herokuapp.com/certificates/createCertificates';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(certificate),
    })
      .then((res) => res.json())
      .then((data) => {
        setGeneratedCertificate(certificate);
        setShowCertificate(true);
        router.push('/certificate-page'); 
      })
      .catch((error) => console.error('Error saving certificate:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Certificate' : 'Create Certificate'}</h2>
      <form onSubmit={handleGenerateAndSave}>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={certificate.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={certificate.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {id ? 'Update and Generate Certificate' : 'Generate Certificate'}
        </button>
        <div  >
        <Link href={'/certificate-page'}>

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Back</button></Link>
        </div>

      </form>

      {showCertificate && generatedCertificate && (
        <div className="mt-8">
          <Certificate title={generatedCertificate.type} description={generatedCertificate.description} date={new Date().toLocaleDateString()}  />
        </div>
      )}
    </div>
  );
};

export default CertificateForm;
