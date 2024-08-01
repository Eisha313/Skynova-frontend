// 'use client';

// import React from 'react';
// import CertificateForm from '../../../components/certificateForm';
// import { useSearchParams } from 'next/navigation';

// const EditCertificatePage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id');

//   return <CertificateForm key={id} id={id as string} />;
// };

// export default EditCertificatePage;
'use client';

import React from 'react';
import CertificateForm from '../../../components/certificateForm';
import { useParams } from 'next/navigation';

const EditCertificatePage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const certificateId = Array.isArray(id) ? id[0] : id;

  return <CertificateForm key={certificateId} id={certificateId} />;
};

export default EditCertificatePage;

