
import React from 'react';
import { Button } from '@/components/ui/button';

interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'truefalse' | 'shortanswer';
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

interface Answer {
  questionId: number;
  selectedOption: string;
}

interface QuestionNavigatorProps {
  questions: Question[];
  answers: Answer[];
  flaggedQuestions: number[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

const QuestionNavigator = ({
  questions,
  answers,
  flaggedQuestions,
  currentQuestionIndex,
  onQuestionSelect
}: QuestionNavigatorProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 h-fit">
      <h3 className="font-medium mb-3">Question Navigator</h3>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {questions.map((q, index) => {
          const isAnswered = answers.some(a => a.questionId === q.id);
          const isFlagged = flaggedQuestions.includes(q.id);
          
          return (
            <Button
              key={q.id}
              variant="outline"
              size="sm"
              className={`h-10 w-10 p-0 ${
                currentQuestionIndex === index ? 'border-2 border-primary' : ''
              } ${
                isAnswered ? 'bg-green-50' : ''
              } ${
                isFlagged ? 'border-amber-500' : ''
              }`}
              onClick={() => onQuestionSelect(index)}
            >
              {index + 1}
              {isFlagged && <div className="absolute -top-1 -right-1 text-amber-500 text-xs">⚑</div>}
            </Button>
          );
        })}
      </div>
      <div className="text-sm space-y-2">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-100 border border-green-300 mr-2"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-white border border-amber-400 mr-2"></div>
          <span>Flagged for review</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-white border mr-2"></div>
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;
