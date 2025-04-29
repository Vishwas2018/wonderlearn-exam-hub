
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Flag, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { examData, examQuestions } from '../data/exams';

interface Answer {
  questionId: number;
  selectedOption: string;
}

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundExam = examData.find(e => e.id === examId);
    
    if (foundExam) {
      setExam(foundExam);
      // Set time limit in seconds
      setTimeLeft(foundExam.timeMinutes * 60);
      
      // Get questions for this exam
      const examQuestionSet = examQuestions[examId as keyof typeof examQuestions] || [];
      setQuestions(examQuestionSet);
    } else {
      toast({
        title: "Exam not found",
        description: "The requested exam could not be found.",
        variant: "destructive",
      });
      navigate('/exams');
    }
  }, [examId, navigate, toast]);

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
      examId,
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

  if (!exam || questions.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">{exam.title}</div>
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
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-gray-500">Progress: {Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation - Desktop only */}
        <div className="hidden lg:block bg-white rounded-lg border p-4 h-fit">
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
                  onClick={() => setCurrentQuestionIndex(index)}
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
        
        {/* Question and Answer Area */}
        <Card className="lg:col-span-3 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Question {currentQuestionIndex + 1}</h2>
              <Button
                variant={isFlagged ? "default" : "outline"}
                size="sm"
                className={`flex items-center ${
                  isFlagged ? 'bg-amber-500 hover:bg-amber-600' : 'text-amber-500 border-amber-300'
                }`}
                onClick={toggleFlag}
              >
                <Flag size={16} className="mr-1" />
                {isFlagged ? 'Flagged' : 'Flag for Review'}
              </Button>
            </div>
            
            <p className="text-lg mb-6">{currentQuestion.text}</p>
            
            {currentQuestion.type === 'mcq' && currentQuestion.options && (
              <RadioGroup
                value={getCurrentAnswer() || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQuestion.type === 'truefalse' && (
              <RadioGroup
                value={getCurrentAnswer() || ''}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="flex-grow cursor-pointer">
                    True
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="flex-grow cursor-pointer">
                    False
                  </Label>
                </div>
              </RadioGroup>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center"
            >
              <ArrowLeft size={16} className="mr-1" />
              Previous
            </Button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <Button 
                onClick={confirmSubmit}
                className="button-gradient"
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                onClick={goToNextQuestion}
                className="flex items-center"
              >
                Next
                <ArrowRight size={16} className="ml-1" />
              </Button>
            )}
          </div>
        </Card>
      </div>
      
      {/* Mobile Question Navigator */}
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
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
        </details>
      </div>
      
      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              You have {questions.length - answers.length} unanswered questions
              {flaggedQuestions.length > 0 && ` and ${flaggedQuestions.length} flagged for review`}.
              Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitExam} className="button-gradient">
              Submit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamSession;
