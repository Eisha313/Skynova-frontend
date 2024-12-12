"use client";
import React from "react";
import Sidebar from "@/app/components/sidebarDashboard";
import Header from "@/app/components/LandingPage/header";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Result from "@/app/userComponents/Quiz/quizResult";
import NonVerbalQuizResult from "@/app/userComponents/nonverbal/quizResult";
import QuizResult from "@/app/userComponents/optionalresult";

const EditQuizPage: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const searchParams = useSearchParams();
  let type = searchParams.get("type");
  const router = useRouter();

  const aviatorId = Array.isArray(id) ? id[0] : id;

  type = type === "verbal" || type === "non-verbal" ? type : "quiz";

  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-4 bg-[#212C44]">
          {type === "quiz" ? (
            <Result id={aviatorId} type="quiz" />
          ) : type === "non-verbal" ? (
            <NonVerbalQuizResult
              id={aviatorId}
              goBackToList={() => {
                router.push("/userRender/report");
              }}
            />
          ) : (
            <QuizResult
              quizType="verbal"
              goBackToList={() => {
                router.push("/userRender/report");
              }}
              id={aviatorId}
            />
          )}
          {/* <Result id={aviatorId} type={type as "verbal" | "non-verbal" | "quiz"} /> */}
        </main>
      </div>
    </div>
  );
};

export default EditQuizPage;
