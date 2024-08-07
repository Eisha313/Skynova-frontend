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
import { GetStaticPaths, GetStaticProps } from 'next';
import AddAviatorForm from '../components/addaviatoronsave';

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch or define paths for static generation
  const paths = [{ params: { id: 'example-id' } }];

  return {
    paths,
    fallback: 'blocking', // or 'false' for no fallback
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;

  return {
    props: {
      id,
    },
  };
};

interface Props {
  id: string;
}

const EditUser: React.FC<Props> = ({ id }) => {
  return <AddAviatorForm id={id} />;
};

export default EditUser;
