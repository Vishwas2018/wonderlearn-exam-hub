
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
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center"
      >
        <ArrowLeft size={16} className="mr-1" />
        Previous
      </Button>
      
      {isLastQuestion ? (
        <Button 
          onClick={onSubmit}
          className="button-gradient"
        >
          Submit Exam
        </Button>
      ) : (
        <Button
          onClick={onNext}
          className="flex items-center"
        >
          Next
          <ArrowRight size={16} className="ml-1" />
        </Button>
      )}
    </div>
  );
};

export default QuestionNavigation;
