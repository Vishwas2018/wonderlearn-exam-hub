
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

interface MobileQuestionNavigatorProps {
  questions: Question[];
  answers: Answer[];
  flaggedQuestions: number[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
}

const MobileQuestionNavigator = ({
  questions,
  answers,
  flaggedQuestions,
  currentQuestionIndex,
  onQuestionSelect
}: MobileQuestionNavigatorProps) => {
  return (
    <div className="lg:hidden mt-6">
      <details className="bg-white rounded-lg border p-3">
        <summary className="font-medium cursor-pointer">Question Navigator</summary>
        <div className="grid grid-cols-5 gap-2 mt-3 mb-3">
          {questions.map((q, index) => {
            const isAnswered = answers.some(a => a.questionId === q.id);
            const isFlagged = flaggedQuestions.includes(q.id);
            
            return (
              <Button
                key={q.id}
                variant="outline"
                size="sm"
                className={`h-8 w-8 p-0 ${
                  currentQuestionIndex === index ? 'border-2 border-primary' : ''
                } ${
                  isAnswered ? 'bg-green-50' : ''
                } ${
                  isFlagged ? 'border-amber-500' : ''
                }`}
                onClick={() => onQuestionSelect(index)}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      </details>
    </div>
  );
};

export default MobileQuestionNavigator;
