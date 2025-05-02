
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuestionNavigation = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit
}: QuestionNavigationProps) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center border-learn-300 hover:bg-learn-50 hover:text-learn-700 transition-all"
      >
        <ArrowLeft size={16} className="mr-2" />
        Previous
      </Button>
      
      {isLastQuestion ? (
        <Button 
          onClick={onSubmit}
          className="button-gradient px-6 py-2 rounded-full"
        >
          Submit Exam
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex items-center bg-wonder-600 hover:bg-wonder-700 transition-all"
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </Button>
      )}
    </div>
  );
};

export default QuestionNavigation;
