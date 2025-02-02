"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Question } from "@/types/data-types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

interface ResultsProps {
  questions: Question[];
  userAnswers: (string | null)[];
}

const decodeHtmlEntities = (str: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

export default function Results({ questions, userAnswers }: ResultsProps) {
  const totalQuestions = questions.length;

  // Calculate the score: +4 for correct answer, -1 for wrong answer.
  const score = userAnswers.reduce((total, answer, index) => {
    const correctAnswerIndex = questions[index].options.findIndex(
      (opt) => opt.is_correct
    );
    const userAnswerIndex = answer ? parseInt(answer as string) : null;

    if (userAnswerIndex !== null) {
      if (userAnswerIndex === correctAnswerIndex) {
        return total + 4;
      } else {
        return total - 1;
      }
    }
    return total;
  }, 0);

  const percentage = Math.round((score / (totalQuestions * 4)) * 100);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen w-screen bg-yellow-400 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Floating Celebration Bubbles */}
      <div className="absolute top-10 left-10 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-xl text-3xl font-bold text-black animate-bubble-float">
        🎉
      </div>
      <div className="absolute bottom-20 right-10 bg-white w-20 h-20 flex items-center justify-center rounded-full shadow-xl text-4xl font-bold text-black animate-bubble-rotate">
        🏆
      </div>
      <div className="absolute top-20 right-20 bg-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl text-2xl font-bold text-black animate-bubble-scale">
        🎊
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-lg border border-gray-200 rounded-lg bg-white ">
        {/* Header Section */}
        <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-5 rounded-t-lg text-white">
          <CardTitle className="text-2xl font-semibold">Quiz Results</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400 transition">
                Restart Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-md shadow-xl">
              <DialogTitle className="font-semibold text-lg">Restart Quiz</DialogTitle>
              <DialogDescription>
                Are you sure you want to restart the quiz? Your current progress will be lost.
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)} className="mr-2">
                  Cancel
                </Button>
                <Button onClick={() => window.location.reload()} className="bg-red-500 text-white">
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        {/* Score Section */}
        <CardContent className="text-center py-8 bg-gray-50">
          <div
            className={`text-4xl font-bold ${percentage >= 80 ? "text-green-600" : "text-red-600"
              }`}
          >
            {percentage >= 80 ? "🏆 Congratulations! You Won!" : "Better Luck Next Time!"}
          </div>
          <p className="text-3xl font-semibold mt-3 text-gray-700">
            {score} / {totalQuestions * 4}
          </p>
          <p className="text-xl mt-2 text-gray-500">You scored {percentage}%</p>
        </CardContent>

        {/* Detailed Results Section */}
        <CardContent className="space-y-6 py-8">
          {questions.map((question, qIndex) => {
            const userAnswerIndex = userAnswers[qIndex]
              ? parseInt(userAnswers[qIndex] as string)
              : null;
            const correctAnswerIndex = question.options.findIndex(
              (opt) => opt.is_correct
            );

            return (
              <div
                key={qIndex}
                className="border p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-lg text-gray-800">
                  {qIndex + 1}. {question.description}
                </p>

                {/* Answer Options */}
                <ul className="mt-3 space-y-3">
                  {question.options.map((option, oIndex) => {
                    const isUserSelected = userAnswerIndex === oIndex;
                    const isCorrect = option.is_correct;
                    let answerClass = "bg-white text-gray-800"; // Default

                    if (isUserSelected) {
                      answerClass = isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800";
                    }

                    return (
                      <li
                        key={oIndex}
                        className={`p-3 rounded-md ${answerClass} transition`}
                      >
                        <span className="mr-2">⭕</span> {option.description}
                        {isUserSelected && (
                          <span className="ml-2">
                            {isCorrect ? "✅" : "❌"}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Explanation Section */}
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value={`explanation-${qIndex}`}>
                    <AccordionTrigger className="flex justify-between items-center bg-blue-200 p-3 rounded-md hover:bg-blue-300 transition duration-300">
                      <span className="font-semibold">Explanation</span>
                      <span className="text-sm text-gray-500">
                        {question.detailed_solution ? "Click to view" : "No explanation available"}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gray-100 rounded-md shadow-md transition-all duration-300 ease-in-out">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">
                        {question.detailed_solution || "No explanation available."}
                      </pre>
                      {question.detailed_solution && (
                        <div className="mt-3 text-gray-500 text-sm">
                          <span className="italic">
                            Did this help? Check out more learning material below!
                          </span>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Practice Material Section */}
                {question.reading_material?.practice_material?.content?.length > 0 && (
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value={`practice-${qIndex}`}>
                      <AccordionTrigger className="flex justify-between items-center bg-yellow-200 p-3 rounded-md hover:bg-yellow-300 transition duration-300">
                        <span className="font-semibold">Practice Material</span>
                        <span className="text-sm text-gray-500">
                          {question.reading_material.practice_material.content.length > 0
                            ? "Click to view"
                            : "No practice material available"}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-gray-100 rounded-md shadow-md transition-all duration-300 ease-in-out">
                        {question.reading_material.practice_material.content.map(
                          (section, index) => (
                            <div key={index} className="mb-3">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: decodeHtmlEntities(section),
                                }}
                                className="text-sm text-gray-700"
                              />
                            </div>
                          )
                        )}
                        <div className="mt-3 text-gray-500 text-sm">
                          <span className="italic">
                            Keep practicing and improve your skills!
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                {/* Reading Material Section */}
                {question.reading_material?.content_sections?.length > 0 && (
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value={`reading-${qIndex}`}>
                      <AccordionTrigger className="flex justify-between items-center bg-green-200 p-3 rounded-md hover:bg-green-300 transition duration-300">
                        <span className="font-semibold">Reading Material</span>
                        <span className="text-sm text-gray-500">
                          {question.reading_material.content_sections.length > 0
                            ? "Click to view"
                            : "No reading material available"}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-gray-100 rounded-md shadow-md transition-all duration-300 ease-in-out">
                        {question.reading_material.content_sections.map((section, index) => (
                          <div key={index} className="mb-3">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: decodeHtmlEntities(section),
                              }}
                              className="text-sm text-gray-700"
                            />
                          </div>
                        ))}
                        <div className="mt-3 text-gray-500 text-sm">
                          <span className="italic">
                            Found this helpful? Check out the practice materials below!
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="p-4 bg-gray-100 rounded-b-lg text-center">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>

      {/* Tailwind CSS Animations */}
      <style jsx global>{`
        @keyframes bubble-float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes bubble-rotate {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes bubble-scale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bubble-float {
          animation: bubble-float 4s ease-in-out infinite;
        }
        .animate-bubble-rotate {
          animation: bubble-rotate 5s ease-in-out infinite;
        }
        .animate-bubble-scale {
          animation: bubble-scale 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
