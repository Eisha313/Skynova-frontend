import React from "react";
import Header from "@/app/components/LandingPage/header";
import QuizAttempt from "@/app/userComponents/Quiz/quizAttempt";

interface PageProps {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: PageProps) => {
  const { id } = params;

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1  bg-white">
          <QuizAttempt id={id} />
        </main>
      </div>
    </div>
  );
};

export default EditPage;
