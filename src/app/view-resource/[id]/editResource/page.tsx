
'use client';

import React from 'react';
import CertificateForm from '../../../components/certificateForm';
import { useParams } from 'next/navigation';
import ResourceForm from '@/app/components/addResources';

const EditCertificatePage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const editId = Array.isArray(id) ? id[0] : id;

  return <ResourceForm key={editId} id={editId} />;
};

export default EditCertificatePage;

