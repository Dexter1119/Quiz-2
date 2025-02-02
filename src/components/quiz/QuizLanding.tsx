"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Quiz from "./Quiz"
import { Quiz as QuizType } from "@/types/data-types"

interface QuizLandingProps {
  quiz: QuizType
}

export default function QuizLanding({ quiz }: QuizLandingProps) {
  const [quizStarted, setQuizStarted] = useState(false)

  if (quizStarted) {
    return <Quiz quiz={quiz} />
  }

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
      <Card className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-xl text-black">
        {/* Speech Bubble Tail */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rotate-45"></div>

        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">{quiz.title}</CardTitle>
          <CardTitle className="text-xl font-semibold text-center text-gray-600">{quiz.topic}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quiz Details */}
          <div className="grid grid-cols-2 gap-4 text-lg font-medium text-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-blue-500">⏳</span>
              <span>Duration:</span>
            </div>
            <div className="text-right font-semibold">{quiz.duration} Min</div>

            <div className="flex items-center space-x-2">
              <span className="text-green-500">❓</span>
              <span>Questions:</span>
            </div>
            <div className="text-right font-semibold">{quiz.questions_count}</div>

            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span>Marks (Correct):</span>
            </div>
            <div className="text-right font-semibold">+{quiz.correct_answer_marks}</div>

            <div className="flex items-center space-x-2">
              <span className="text-red-500">❌</span>
              <span>Marks (Wrong):</span>
            </div>
            <div className="text-right font-semibold">{quiz.negative_marks}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setQuizStarted(true)}
            className="w-full bg-black text-white hover:bg-gray-800 transition-transform transform hover:scale-105"
          >
            Start Quiz
          </Button>
        </CardFooter>
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
  )
}
