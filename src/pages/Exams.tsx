
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileText, Lock, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { examData } from '../data/exams';

// Types for our exam data structure
interface Exam {
  id: string;
  title: string;
  description: string;
  type: 'free' | 'premium';
  category: 'NAPLAN' | 'ICAS';
  subject: 'Maths' | 'Science' | 'Digital Technologies';
  yearLevel: number;
  questionsCount: number;
  timeMinutes: number;
}

const Exams = () => {
  const [category, setCategory] = useState<'NAPLAN' | 'ICAS'>('NAPLAN');
  const [yearLevel, setYearLevel] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth context
  const [isSubscribed, setIsSubscribed] = useState(false); // This would come from your subscription state
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // For demo purposes, we'll use localStorage to check login status
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsLoggedIn(loggedIn);
    setIsSubscribed(subscribed);
  }, []);

  useEffect(() => {
    // Filter exams based on selected criteria
    let filtered = examData;
    
    if (category) {
      filtered = filtered.filter(exam => exam.category === category);
    }
    
    if (yearLevel) {
      filtered = filtered.filter(exam => exam.yearLevel === parseInt(yearLevel));
    }
    
    if (subject) {
      filtered = filtered.filter(exam => exam.subject === subject);
    }
    
    setFilteredExams(filtered);
  }, [category, yearLevel, subject]);

  const handleStartExam = (exam: Exam) => {
    // If premium exam but user is not logged in
    if (exam.type === 'premium' && !isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to access premium exams.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    // If premium exam but user is not subscribed
    if (exam.type === 'premium' && !isSubscribed) {
      toast({
        title: "Subscription Required",
        description: "Please subscribe to access premium exams.",
        variant: "destructive",
      });
      navigate('/pricing');
      return;
    }
    
    // Start the exam
    navigate(`/exam/${exam.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Practice Exams</h1>
      <p className="text-gray-600 mb-8">Select a category, year level, and subject to find the perfect practice exam.</p>
      
      <Tabs defaultValue="NAPLAN" onValueChange={(value) => setCategory(value as 'NAPLAN' | 'ICAS')} className="mb-8">
        <TabsList className="grid grid-cols-2 max-w-md">
          <TabsTrigger value="NAPLAN">NAPLAN</TabsTrigger>
          <TabsTrigger value="ICAS">ICAS</TabsTrigger>
        </TabsList>
        <TabsContent value="NAPLAN">
          <div className="p-4 bg-wonder-50 rounded-lg">
            <p className="text-sm">
              National Assessment Program – Literacy and Numeracy (NAPLAN) is a nationwide assessment for students in Years 3, 5, 7, and 9.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="ICAS">
          <div className="p-4 bg-learn-50 rounded-lg">
            <p className="text-sm">
              International Competitions and Assessments for Schools (ICAS) are independent skills-based assessments for primary and secondary school students.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <Label htmlFor="year-level">Year Level</Label>
          <Select onValueChange={setYearLevel}>
            <SelectTrigger id="year-level">
              <SelectValue placeholder="Select year level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Year 2</SelectItem>
              <SelectItem value="3">Year 3</SelectItem>
              <SelectItem value="4">Year 4</SelectItem>
              <SelectItem value="5">Year 5</SelectItem>
              <SelectItem value="6">Year 6</SelectItem>
              <SelectItem value="7">Year 7</SelectItem>
              <SelectItem value="8">Year 8</SelectItem>
              <SelectItem value="9">Year 9</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select onValueChange={setSubject}>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Maths">Mathematics</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Digital Technologies">Digital Technologies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${exam.type === 'premium' ? 'border-learn-200' : ''}`}>
              <div className={`p-1 ${exam.type === 'premium' ? 'bg-gradient-to-r from-wonder-500 to-learn-500' : ''}`}></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exam.title}</CardTitle>
                    <CardDescription>{exam.description}</CardDescription>
                  </div>
                  {exam.type === 'premium' && (
                    <div className="bg-learn-100 text-learn-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      PREMIUM
                    </div>
                  )}
                  {exam.type === 'free' && (
                    <div className="bg-wonder-100 text-wonder-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      FREE
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <FileText size={16} className="mr-1" />
                    <span>{exam.questionsCount} Questions</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{exam.timeMinutes} Minutes</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Category:</span>
                    <div className="font-medium">{exam.category}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Subject:</span>
                    <div className="font-medium">{exam.subject}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Year Level:</span>
                    <div className="font-medium">Year {exam.yearLevel}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${exam.type === 'premium' ? 'button-gradient' : 'bg-wonder-500 hover:bg-wonder-600'}`}
                  onClick={() => handleStartExam(exam)}
                >
                  {exam.type === 'premium' && !isLoggedIn && <Lock size={16} className="mr-2" />}
                  {exam.type === 'premium' && isLoggedIn && !isSubscribed && <Lock size={16} className="mr-2" />}
                  Start Exam
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-lg font-medium text-gray-600">
            {category && yearLevel && subject 
              ? 'No exams found for the selected filters.' 
              : 'Please select year level and subject to view available exams.'}
          </p>
        </div>
      )}
      
      {filteredExams.length > 0 && filteredExams.some(e => e.type === 'premium') && !isSubscribed && (
        <div className="mt-8 p-6 border border-learn-200 rounded-lg bg-learn-50">
          <h3 className="text-xl font-bold mb-2">Access All Premium Exams</h3>
          <p className="mb-4">Subscribe to unlock all premium exams and track your progress over time.</p>
          <Button onClick={() => navigate('/pricing')} className="button-gradient">
            View Subscription Plans
          </Button>
        </div>
      )}
    </div>
  );
};

export default Exams;
