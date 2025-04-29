
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Clock, ArrowRight, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from '@/components/ui/use-toast';

const ExamResults = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showExplanations, setShowExplanations] = useState(false);

  useEffect(() => {
    // Retrieve results from localStorage
    const storedResults = localStorage.getItem('examResults');
    
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
      } catch (error) {
        toast({
          title: "Error loading results",
          description: "There was a problem loading your exam results.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No results found",
        description: "No exam results were found.",
        variant: "destructive",
      });
      navigate('/exams');
    }
    
    setLoading(false);
  }, [navigate, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  if (loading || !results) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  const calculateScore = () => {
    let correctCount = 0;
    
    results.answers.forEach((answer: any) => {
      const question = results.questions.find((q: any) => q.id === answer.questionId);
      if (question && answer.selectedOption === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return {
      correct: correctCount,
      total: results.questions.length,
      percentage: Math.round((correctCount / results.questions.length) * 100),
    };
  };

  const score = calculateScore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Exam Results</h1>
      <p className="text-gray-600 mb-6">{results.examTitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Score</CardTitle>
            <CardDescription>
              Exam completed on {new Date(results.dateCompleted).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className="text-5xl font-bold mb-4">
                {score.percentage}%
              </div>
              <Progress value={score.percentage} className="h-4 w-full max-w-xs" />
              <div className="mt-4 text-sm text-gray-500">
                {score.correct} correct out of {score.total} questions
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Clock size={16} className="mr-1" />
                  Time Taken
                </div>
                <div className="font-medium">{formatTime(results.timeUsed)}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <FileText size={16} className="mr-1" />
                  Questions Answered
                </div>
                <div className="font-medium">{results.totalAnswered} of {results.totalQuestions}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/exams')}>
              Return to Exams
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
        
        {/* Grade Card */}
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4">
              <div className={`text-4xl font-bold mb-2 ${
                score.percentage >= 80 ? 'text-green-500' :
                score.percentage >= 70 ? 'text-blue-500' :
                score.percentage >= 50 ? 'text-amber-500' : 'text-red-500'
              }`}>
                {score.percentage >= 80 ? 'Excellent' :
                 score.percentage >= 70 ? 'Great' :
                 score.percentage >= 50 ? 'Good' : 'Needs Improvement'}
              </div>
              <p className="text-center text-sm text-gray-500">
                {score.percentage >= 80 ? 'Outstanding work! You have a strong understanding of the material.' :
                 score.percentage >= 70 ? 'Well done! You have a good grasp of most concepts.' :
                 score.percentage >= 50 ? 'Good effort! Focus on the areas you missed to improve.' : 
                 'Keep practicing! Review the questions you missed to strengthen your understanding.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Review */}
      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
          <CardDescription>
            Review your answers and see explanations for each question
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowExplanations(!showExplanations)}
              className="flex items-center"
            >
              {showExplanations ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Hide All Explanations
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Show All Explanations
                </>
              )}
            </Button>
          </div>
          
          <Accordion type="multiple" defaultValue={showExplanations ? results.questions.map((q: any, i: number) => `question-${i}`) : []}>
            {results.questions.map((question: any, index: number) => {
              const answer = results.answers.find((a: any) => a.questionId === question.id);
              const isCorrect = answer && answer.selectedOption === question.correctAnswer;
              const isUnanswered = !answer;
              
              return (
                <AccordionItem key={question.id} value={`question-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-start text-left">
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        isUnanswered ? 'bg-gray-100' : isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {isUnanswered ? (
                          <span className="text-gray-500">–</span>
                        ) : isCorrect ? (
                          <Check size={14} className="text-green-600" />
                        ) : (
                          <X size={14} className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <span className="text-gray-500 mr-2">Q{index + 1}:</span>
                        <span>{question.text}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-9 space-y-4">
                      {question.type === 'mcq' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option: any) => {
                            const isSelectedOption = answer && answer.selectedOption === option.id;
                            const isCorrectOption = option.id === question.correctAnswer;
                            
                            return (
                              <div 
                                key={option.id}
                                className={`p-3 rounded-lg border ${
                                  isSelectedOption && isCorrectOption ? 'bg-green-50 border-green-200' :
                                  isSelectedOption ? 'bg-red-50 border-red-200' :
                                  isCorrectOption ? 'bg-green-50 border-green-200' : ''
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className="mr-2">
                                    {isSelectedOption && isCorrectOption && <Check size={18} className="text-green-600" />}
                                    {isSelectedOption && !isCorrectOption && <X size={18} className="text-red-600" />}
                                    {!isSelectedOption && isCorrectOption && <Check size={18} className="text-green-600" />}
                                  </div>
                                  <div>{option.text}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {question.type === 'truefalse' && (
                        <div className="space-y-2">
                          {['true', 'false'].map((option) => {
                            const isSelectedOption = answer && answer.selectedOption === option;
                            const isCorrectOption = option === question.correctAnswer;
                            
                            return (
                              <div 
                                key={option}
                                className={`p-3 rounded-lg border ${
                                  isSelectedOption && isCorrectOption ? 'bg-green-50 border-green-200' :
                                  isSelectedOption ? 'bg-red-50 border-red-200' :
                                  isCorrectOption ? 'bg-green-50 border-green-200' : ''
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className="mr-2">
                                    {isSelectedOption && isCorrectOption && <Check size={18} className="text-green-600" />}
                                    {isSelectedOption && !isCorrectOption && <X size={18} className="text-red-600" />}
                                    {!isSelectedOption && isCorrectOption && <Check size={18} className="text-green-600" />}
                                  </div>
                                  <div>{option === 'true' ? 'True' : 'False'}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 mb-1">Explanation</div>
                        <div className="text-blue-700">{question.explanation}</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-8">
        <Button onClick={() => navigate('/dashboard')} className="button-gradient">
          View All Results in Dashboard
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ExamResults;
