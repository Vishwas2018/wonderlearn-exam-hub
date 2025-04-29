
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, FileText, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { examData } from '../data/exams';

const ExamStartPrompt = () => {
  const { examId } = useParams<{ examId: string }>();
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const foundExam = examData.find(e => e.id === examId);
    
    if (foundExam) {
      setExam(foundExam);
    } else {
      toast({
        title: "Exam not found",
        description: "The requested exam could not be found.",
        variant: "destructive",
      });
      navigate('/exams');
    }
    
    setLoading(false);
  }, [examId, navigate, toast]);

  const handleStartExam = () => {
    navigate(`/exam/session/${examId}`);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (!exam) {
    return <div className="container mx-auto px-4 py-8 text-center">Exam not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{exam.title}</CardTitle>
          <CardDescription>{exam.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{exam.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-medium">{exam.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Year Level</p>
              <p className="font-medium">Year {exam.yearLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium capitalize">{exam.type}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-blue-50 text-blue-800 rounded-lg">
            <Info size={20} className="mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Exam Information</h3>
              <p className="text-sm">This exam contains {exam.questionsCount} questions and has a time limit of {exam.timeMinutes} minutes.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Before You Begin:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Ensure you have a stable internet connection.</li>
              <li>Find a quiet place where you won't be disturbed.</li>
              <li>Once started, the timer cannot be paused.</li>
              <li>You can flag questions for review and return to them later.</li>
              <li>Make sure to submit before the time expires.</li>
            </ul>
          </div>
          
          <div className="flex items-center p-4 bg-amber-50 text-amber-800 rounded-lg">
            <AlertTriangle size={20} className="mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Academic Honesty</h3>
              <p className="text-sm">By starting this exam, you agree to complete it honestly without assistance from others or unauthorized resources.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            onClick={handleStartExam} 
            className="w-full button-gradient"
          >
            Start Exam Now
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/exams')}
            className="w-full"
          >
            Return to Exams
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExamStartPrompt;
