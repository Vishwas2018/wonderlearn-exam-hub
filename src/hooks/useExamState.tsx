
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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

interface ExamData {
  id: string;
  title: string;
  timeMinutes: number;
  [key: string]: any;
}

export const useExamState = (exam: ExamData | null, questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (exam) {
      // Set time limit in seconds
      setTimeLeft(exam.timeMinutes * 60);
    }
  }, [exam]);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Show warning when 5 minutes left
        if (timeLeft === 300) {
          toast({
            title: "5 Minutes Remaining",
            description: "You have 5 minutes left to complete the exam.",
            variant: "destructive",
            duration: 5000,
          });
          setShowTimeWarning(true);
        }
        
        // Show warning when 1 minute left
        if (timeLeft === 60) {
          toast({
            title: "1 Minute Remaining",
            description: "You have 1 minute left to complete the exam.",
            variant: "destructive",
            duration: 5000,
          });
          setShowTimeWarning(true);
        }
        
        // Auto-submit when time runs out
        if (timeLeft === 1) {
          handleSubmitExam();
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, toast]);

  const handleAnswerChange = (selectedOption: string) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.questionId === questions[currentQuestionIndex].id
    );
    
    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex].selectedOption = selectedOption;
    } else {
      updatedAnswers.push({
        questionId: questions[currentQuestionIndex].id,
        selectedOption,
      });
    }
    
    setAnswers(updatedAnswers);
  };

  const getCurrentAnswer = (): string | null => {
    const answer = answers.find(
      (a) => a.questionId === questions[currentQuestionIndex]?.id
    );
    return answer ? answer.selectedOption : null;
  };

  const toggleFlag = () => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    
    if (flaggedQuestions.includes(currentQuestionId)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== currentQuestionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestionId]);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitting(true);
    
    // Calculate results - tracking correct answers, time spent
    const totalAnswered = answers.length;
    const timeUsed = exam?.timeMinutes * 60 - timeLeft;
    
    // Store results for the results page
    const results = {
      examId: exam?.id,
      examTitle: exam?.title,
      totalQuestions: questions.length,
      totalAnswered,
      timeUsed,
      answers,
      questions,
      dateCompleted: new Date().toISOString(),
    };
    
    // In a real app, you'd send this to an API
    localStorage.setItem('examResults', JSON.stringify(results));
    
    // Navigate to results page
    navigate('/exam/results');
  };

  const confirmSubmit = () => {
    const unansweredCount = questions.length - answers.length;
    const flaggedCount = flaggedQuestions.length;
    
    if (unansweredCount > 0 || flaggedCount > 0) {
      setShowSubmitDialog(true);
    } else {
      handleSubmitExam();
    }
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    flaggedQuestions,
    timeLeft,
    showTimeWarning,
    showSubmitDialog,
    setShowSubmitDialog,
    isSubmitting,
    handleAnswerChange,
    getCurrentAnswer,
    toggleFlag,
    goToNextQuestion,
    goToPreviousQuestion,
    handleSubmitExam,
    confirmSubmit
  };
};

export default useExamState;
