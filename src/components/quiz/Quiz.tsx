"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Question from "./Question";
import Timer from "./Timer";
import Results from "./Result";
import type { Quiz as QuizType } from "@/types/data-types";
import QuestionNavigation from "./QuestionNavigation";

interface QuizProps {
  quiz: QuizType;
}

export default function Quiz({ quiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(quiz.questions.length).fill(null));

  const [selectedOption, setSelectedOption] = useState<string | null>(
    userAnswers[currentQuestionIndex] || null
  );
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.duration * 60);

  useEffect(() => {
    setSelectedOption(userAnswers[currentQuestionIndex] || null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResults(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (showResults) {
    return <Results questions={quiz.questions} userAnswers={userAnswers} />;
  }
  const handleFinishQuiz = () => {
    const unanswered = userAnswers.includes(null);
    if (unanswered) {
      const confirmFinish = window.confirm("You have unanswered questions. Are you sure you want to finish?");
      if (confirmFinish) {
        setShowResults(true);
      }
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-yellow-400 p-6 relative overflow-hidden">
      {/* Floating Question Mark Bubbles */}
      <div className="absolute bottom-10 right-10 bg-white w-44 h-44 flex items-center justify-center rounded-full shadow-xl text-7xl font-bold text-black animate-bubble-float">
        ?
      </div>
      <div className="absolute top-16 right-40 bg-white w-24 h-24 flex items-center justify-center rounded-full shadow-xl text-5xl font-bold text-black animate-bubble-rotate">
        ?
      </div>
      <div className="absolute top-8 right-8 bg-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl text-3xl font-bold text-black animate-bubble-scale">
        ?
      </div>
      <div className="absolute top-10 left-10 bg-white w-52 h-52 flex items-center justify-center rounded-full shadow-xl text-8xl font-bold text-black animate-bubble-float-reverse">
        ?
      </div>
      <div className="absolute bottom-20 left-24 bg-white w-20 h-20 flex items-center justify-center rounded-full shadow-xl text-4xl font-bold text-black animate-bubble-scale">
        ?
      </div>
      <div className="absolute bottom-28 right-1/4 bg-white w-28 h-28 flex items-center justify-center rounded-full shadow-xl text-6xl font-bold text-black animate-bubble-float">
        ?
      </div>
      <div className="absolute top-32 left-1/3 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-xl text-4xl font-bold text-black animate-bubble-rotate">
        ?
      </div>

      {/* Quiz Card (Styled as Speech Bubble) */}
      <Card className="relative w-full max-w-lg bg-white p-6 rounded-3xl shadow-2xl text-black">
        {/* Speech Bubble Tail */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rotate-45"></div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quiz Time!</h2>
          <div className="mt-2 text-lg">
            Time Remaining: <Timer timeRemaining={timeRemaining} />
          </div>
        </div>
        <CardContent>
          <QuestionNavigation
            totalQuestions={quiz.questions.length}
            currentQuestion={currentQuestionIndex}
            onQuestionChange={setCurrentQuestionIndex}
            userAnswers={userAnswers}
          />
          <Question
            question={quiz.questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </CardContent>

        {/* Buttons with Better Styling */}
        <div className="flex justify-between items-center mt-6">
          <Button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition-transform transform hover:scale-105"
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
              onClick={() => {
                const updatedAnswers = [...userAnswers];
                updatedAnswers[currentQuestionIndex] = selectedOption;
                setUserAnswers(updatedAnswers);
              }}
              disabled={!selectedOption}
            >
              Save
            </Button>
            <Button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-transform transform hover:scale-105"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
            >
              Next
            </Button>
          </div>
          <Button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
            onClick={handleFinishQuiz}
          >
            Finish Quiz
          </Button>
        </div>
      </Card>

      {/* Tailwind Animations */}
      <style jsx global>{`
        @keyframes bubble-float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        @keyframes bubble-float-reverse {
          0% { transform: translateY(0); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(0); }
        }
        @keyframes bubble-rotate {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes bubble-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-bubble-float { animation: bubble-float 4s ease-in-out infinite; }
        .animate-bubble-float-reverse { animation: bubble-float-reverse 4s ease-in-out infinite; }
        .animate-bubble-rotate { animation: bubble-rotate 5s ease-in-out infinite; }
        .animate-bubble-scale { animation: bubble-scale 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
