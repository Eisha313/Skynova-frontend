// // src/app/addaviator/page.tsx
// import AddAviatorForm from "../components/addaviatoronsave";

// export default function ForgotPasswordPage() {
//   return (
//     <AddAviatorForm />
//   );
// }
'use client';

import React from 'react';
import AddAviatorForm from '../components/addaviatoronsave';
import { useSearchParams } from 'next/navigation';

const EditUser: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Replace 'id' with the actual query parameter name

  return <AddAviatorForm id={id || ''} />;
};

export default EditUser;
