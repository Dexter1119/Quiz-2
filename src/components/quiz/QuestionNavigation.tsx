import { Button } from "@/components/ui/button";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  onQuestionChange: (index: number) => void;
  userAnswers: (string | null)[];
}

export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  onQuestionChange,
  userAnswers,
}: QuestionNavigationProps) {
  return (
    <div className="flex justify-center gap-3 my-4">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <Button
          key={i}
          onClick={() => onQuestionChange(i)}
          className={`w-12 h-12 rounded-full font-bold transition-all ${i === currentQuestion
            ? "bg-blue-500 text-white"
            : userAnswers[i] !== null
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}
