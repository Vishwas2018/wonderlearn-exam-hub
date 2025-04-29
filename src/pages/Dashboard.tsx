
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  FileText, 
  Award, 
  Clock, 
  Calendar, 
  BarChart as BarChartIcon,
  ArrowRight
} from 'lucide-react';

// Mock data for the dashboard - in a real app this would come from a backend API
const recentExamData = [
  { id: 1, title: "NAPLAN Year 5 Mathematics", date: "2025-04-28", score: 85, timeSpent: "45:22", questions: 30, correct: 26 },
  { id: 2, title: "ICAS Year 5 Science", date: "2025-04-25", score: 72, timeSpent: "38:15", questions: 25, correct: 18 },
  { id: 3, title: "NAPLAN Year 5 Digital Technologies", date: "2025-04-20", score: 90, timeSpent: "40:05", questions: 20, correct: 18 },
];

const performanceTrendData = [
  { date: "Jan", naplan: 65, icas: 60 },
  { date: "Feb", naplan: 68, icas: 65 },
  { date: "Mar", naplan: 75, icas: 70 },
  { date: "Apr", naplan: 85, icas: 72 },
  { date: "May", naplan: null, icas: null },
];

const subjectPerformanceData = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 72 },
  { subject: "DT", score: 90 },
];

const Dashboard = () => {
  const [streakCount, setStreakCount] = useState(3);
  const [totalExams, setTotalExams] = useState(12);
  const [avgScore, setAvgScore] = useState(78);

  // Calculate streak days (this would normally come from user activity data)
  useEffect(() => {
    // This would be replaced by real data from your backend
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
      <p className="text-gray-600 mb-8">Track your progress and prepare for success</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streakCount} Days</div>
            <p className="text-xs text-muted-foreground">
              Keep practicing daily to maintain your streak!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
            <p className="text-xs text-muted-foreground">
              Across all subjects and categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgScore}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance across all exams
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Exams</CardTitle>
                <CardDescription>Your most recently completed exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExamData.map((exam) => (
                    <div key={exam.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{exam.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(exam.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          exam.score >= 80 ? 'bg-green-100 text-green-800' :
                          exam.score >= 70 ? 'bg-blue-100 text-blue-800' :
                          exam.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {exam.score}%
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={exam.score} className="h-2" />
                      </div>
                      <div className="flex justify-between mt-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {exam.timeSpent}
                        </div>
                        <div>
                          {exam.correct} / {exam.questions} correct
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  <Link to="/exams">Practice More</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance by Subject</CardTitle>
                <CardDescription>Your average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectPerformanceData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Score']}
                        labelFormatter={(label) => {
                          const subjectMap: {[key: string]: string} = {
                            "Math": "Mathematics",
                            "Science": "Science",
                            "DT": "Digital Technologies"
                          };
                          return subjectMap[label] || label;
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="url(#colorGradient)" 
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#9d2edb" />
                          <stop offset="100%" stopColor="#0c8de8" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Your score trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceTrendData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="naplan" 
                        name="NAPLAN"
                        stroke="#0c8de8" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="icas" 
                        name="ICAS"
                        stroke="#9d2edb" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                      Geometry and Measurement
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      Data Analysis
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      Physical Sciences
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Algebra
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Biological Sciences
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Coding Concepts
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recommended Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Geometry Practice Tests
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Data Analysis Exercises
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Physics Review Questions
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link to="/exams">View Recommended Exams</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Exam History</CardTitle>
              <CardDescription>Complete record of your exam attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">April 2025</h3>
                  <div className="space-y-3">
                    {recentExamData.map((exam) => (
                      <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h4 className="font-medium">{exam.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(exam.date).toLocaleDateString()} • {exam.timeSpent}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            exam.score >= 80 ? 'bg-green-100 text-green-800' :
                            exam.score >= 70 ? 'bg-blue-100 text-blue-800' :
                            exam.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {exam.score}%
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowRight size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">March 2025</h3>
                  <div className="space-y-3">
                    {[
                      { id: 4, title: "ICAS Year 5 Digital Technologies", date: "2025-03-15", score: 68, timeSpent: "42:10" },
                      { id: 5, title: "NAPLAN Year 5 Mathematics", date: "2025-03-10", score: 75, timeSpent: "39:45" },
                    ].map((exam) => (
                      <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div>
                          <h4 className="font-medium">{exam.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(exam.date).toLocaleDateString()} • {exam.timeSpent}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            exam.score >= 80 ? 'bg-green-100 text-green-800' :
                            exam.score >= 70 ? 'bg-blue-100 text-blue-800' :
                            exam.score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {exam.score}%
                          </div>
                          <Button variant="ghost" size="icon">
                            <ArrowRight size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Suggested Exams */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Suggested Practice</h2>
          <Button variant="ghost" className="text-sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Geometry & Measurement</CardTitle>
              <CardDescription>NAPLAN Year 5 - Practice Set</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Focus on areas for improvement based on your recent results.</p>
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  <span>15 Questions</span>
                </div>
                <div>~25 min</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-wonder-500 hover:bg-wonder-600">
                Start Practice
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Physical Sciences</CardTitle>
              <CardDescription>ICAS Year 5 - Forces & Energy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Targeted practice to improve your understanding of physical science concepts.</p>
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  <span>10 Questions</span>
                </div>
                <div>~15 min</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full button-gradient">
                Start Practice
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Analysis</CardTitle>
              <CardDescription>NAPLAN Year 5 - Data & Probability</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Practice interpreting data, charts, and calculating probability.</p>
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  <span>12 Questions</span>
                </div>
                <div>~20 min</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-wonder-500 hover:bg-wonder-600">
                Start Practice
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
