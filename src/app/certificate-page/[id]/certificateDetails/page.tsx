'use client';

import React from 'react';
import CertificateDetails from '../../../components/certificateDetails'
import { useParams } from 'next/navigation';

const ViewCertificatePage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const certificateId = Array.isArray(id) ? id[0] : id;

  return <CertificateDetails id={certificateId as string} />;
};

export default ViewCertificatePage;
