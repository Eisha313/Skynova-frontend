"use client";
import Header from "@/app/components/LandingPage/header";
import Sidebar from "@/app/components/sidebarDashboard";
import QuizList from "@/app/userComponents/Quiz/quizList";
import { useRouter } from "next/navigation";
import { Quiz } from "@/app/userComponents/Quiz/quizList";

const ResourceRender = () => {
  const router = useRouter();

  const handleSelectQuiz = (quiz: Quiz) => {
    router.push(`/userRender/quiz/${quiz._id}/attempt`);
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1  justify-center h-screen overflow-auto">
          <QuizList />
        </main>
      </div>
    </div>
  );
};

export default ResourceRender;
