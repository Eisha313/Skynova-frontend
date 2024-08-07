// // // src/app/addaviator/page.tsx
// // import AddAviatorForm from "../components/addaviatoronsave";

// // export default function ForgotPasswordPage() {
// //   return (
// //     <AddAviatorForm />
// //   );
// // }
// 'use client';

// import React from 'react';
// import AddAviatorForm from '../components/addaviatoronsave';
// import { useSearchParams } from 'next/navigation';

// const EditUser: React.FC = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get('id'); // Replace 'id' with the actual query parameter name

//   return <AddAviatorForm id={id || ''} />;
// };

// export default EditUser;
// src/app/addaviator/[id]/page.tsx
// src/app/addaviator/[id]/page.tsx
import React from 'react';
import AddAviatorForm from '../components/addaviatoronsave';

interface Props {
  params: {
    id: string;
  };
}

const EditUser: React.FC<Props> = ({ params }) => {
  const { id } = params;

  return <AddAviatorForm id={id} />;
};

// Note: No need for getStaticProps or getStaticPaths in the App Router

export default EditUser;
