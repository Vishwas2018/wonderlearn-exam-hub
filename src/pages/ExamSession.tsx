
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { examData, examQuestions } from '../data/exams';
import QuestionDisplay from '@/components/exam/QuestionDisplay';
import QuestionNavigation from '@/components/exam/QuestionNavigation';
import ExamProgress from '@/components/exam/ExamProgress';
import QuestionNavigator from '@/components/exam/QuestionNavigator';
import MobileQuestionNavigator from '@/components/exam/MobileQuestionNavigator';
import SubmitDialog from '@/components/exam/SubmitDialog';
import { useExamState } from '@/hooks/useExamState';

interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'truefalse' | 'shortanswer';
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const ExamSession = () => {
  const { examId } = useParams<{ examId: string }>();
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundExam = examData.find(e => e.id === examId);
    
    if (foundExam) {
      setExam(foundExam);
      
      // Get questions for this exam and ensure they match the Question interface
      const examQuestionSet = examId ? examQuestions[examId as keyof typeof examQuestions] || [] : [];
      // Type assertion to ensure compatibility with the Question interface
      const typedQuestions = examQuestionSet.map(q => ({
        ...q,
        type: q.type as 'mcq' | 'truefalse' | 'shortanswer'
      }));
      setQuestions(typedQuestions);
    } else {
      toast({
        title: "Exam not found",
        description: "The requested exam could not be found.",
        variant: "destructive",
      });
    }
  }, [examId, toast]);

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    flaggedQuestions,
    timeLeft,
    showTimeWarning,
    showSubmitDialog,
    setShowSubmitDialog,
    handleAnswerChange,
    getCurrentAnswer,
    toggleFlag,
    goToNextQuestion,
    goToPreviousQuestion,
    handleSubmitExam,
    confirmSubmit
  } = useExamState(exam, questions);

  if (!exam || questions.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const unansweredCount = questions.length - answers.length;
  const flaggedCount = flaggedQuestions.length;

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">{exam.title}</div>
      </div>
      
      <ExamProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
        showTimeWarning={showTimeWarning}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigator - Desktop only */}
        <div className="hidden lg:block">
          <QuestionNavigator
            questions={questions}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={setCurrentQuestionIndex}
          />
        </div>
        
        {/* Question and Answer Area */}
        <div className="lg:col-span-3">
          <QuestionDisplay
            currentQuestion={currentQuestion}
            currentAnswer={getCurrentAnswer()}
            isFlagged={isFlagged}
            onAnswerChange={handleAnswerChange}
            onToggleFlag={toggleFlag}
          />
          
          <div className="mt-6">
            <QuestionNavigation
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onPrevious={goToPreviousQuestion}
              onNext={goToNextQuestion}
              onSubmit={confirmSubmit}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Question Navigator */}
      <MobileQuestionNavigator
        questions={questions}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionSelect={setCurrentQuestionIndex}
      />
      
      {/* Submit Confirmation Dialog */}
      <SubmitDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        onSubmit={handleSubmitExam}
        unansweredCount={unansweredCount}
        flaggedCount={flaggedCount}
      />
    </div>
  );
};

export default ExamSession;
