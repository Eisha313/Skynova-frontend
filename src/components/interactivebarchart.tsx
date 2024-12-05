"use client";

import React, { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface QuizResult {
  date: string;
  submitted: number;
}

export function DynamicBarChart() {
  const [verbalResults, setVerbalResults] = useState<QuizResult[]>([]);
  const [nonVerbalResults, setNonVerbalResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchResults = async () => {
    try {
      const [verbalResponse, nonVerbalResponse] = await Promise.all([
        fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/verbalQuizResult/viewVerbalQuizResults"),
        fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/nonVerbalQuizResult/viewNonVerbalQuizResults"),
      ]);

      const verbalData = await verbalResponse.json();
      const nonVerbalData = await nonVerbalResponse.json();

      const processResults = (data: any[]): QuizResult[] => {
        const grouped = data.reduce((acc: Record<string, QuizResult>, item) => {
          const date = new Date(item.dateAttempted).toISOString().split("T")[0];
          if (!acc[date]) {
            acc[date] = { date, submitted: 0 };
          }
          acc[date].submitted++;
          return acc;
        }, {});
        return Object.values(grouped);
      };

      setVerbalResults(processResults(verbalData));
      setNonVerbalResults(processResults(nonVerbalData));
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const combinedResults = useMemo(() => {
    const allDates = new Set([
      ...verbalResults.map((item) => item.date),
      ...nonVerbalResults.map((item) => item.date),
    ]);

    return Array.from(allDates).map((date) => {
      const verbal = verbalResults.find((item) => item.date === date) || { date, submitted: 0 };
      const nonVerbal = nonVerbalResults.find((item) => item.date === date) || { date, submitted: 0 };

      return {
        date,
        verbalSubmitted: verbal.submitted,
        nonVerbalSubmitted: nonVerbal.submitted,
      };
    });
  }, [verbalResults, nonVerbalResults]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="text-white bg-[#]">
      <CardHeader>
        <CardTitle>Comppetency Evaluation Submission</CardTitle>
        <CardDescription>Quiz submissions by date for Verbal and Non-Verbal categories</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          width={800}
          height={400}
          data={combinedResults}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="verbalSubmitted" fill="#82ca9d" name="Verbal Submitted" />
          <Bar dataKey="nonVerbalSubmitted" fill="#22c2f7" name="Non-Verbal Submitted" />
        </BarChart>
      </CardContent>
    </Card>
  );
}
