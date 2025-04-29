
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface ExamProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  showTimeWarning: boolean;
}

const ExamProgress = ({
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  showTimeWarning
}: ExamProgressProps) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center ${timeLeft < 300 ? 'text-red-500' : ''}`}>
          <Clock size={18} className="mr-1" />
          <span className={`font-mono ${showTimeWarning ? 'animate-pulse' : ''}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-gray-500">Progress: {Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </>
  );
};

export default ExamProgress;
