'use client';

import React from 'react';
import AddAviatorForm from '../../../components/addaviatoronsave';
import { useParams } from 'next/navigation';

const EditUser: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const certificateId = Array.isArray(id) ? id[0] : id;

  return <AddAviatorForm key={certificateId} id={certificateId} />;
};

export default EditUser;


