
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  CheckCircle,
  Timer,
  FileText,
  User
} from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Excel in School Assessments with WonderLearn
            </h1>
            <p className="text-xl mb-8">
              Comprehensive practice exams and resources for NAPLAN, ICAS, 
              and school tests for Years 2-9.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-wonder-600 hover:bg-gray-100"
              >
                <Link to="/exams">Try Free Sample Exams</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose WonderLearn?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed by education experts to help students build confidence and achieve their best results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-wonder-50 p-8 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-wonder-100 flex items-center justify-center text-wonder-600 mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Exams</h3>
              <p className="text-gray-700">
                Access current, curriculum-aligned practice exams for NAPLAN, ICAS, and more.
              </p>
            </div>
            
            <div className="bg-wonder-50 p-8 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-wonder-100 flex items-center justify-center text-wonder-600 mb-4">
                <Timer size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-700">
                Monitor improvement with detailed performance analytics and subject breakdowns.
              </p>
            </div>
            
            <div className="bg-wonder-50 p-8 rounded-xl">
              <div className="h-12 w-12 rounded-full bg-wonder-100 flex items-center justify-center text-wonder-600 mb-4">
                <User size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
              <p className="text-gray-700">
                Focus on areas that need improvement with targeted practice sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start improving your test scores in just three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-learn-100 flex items-center justify-center text-learn-600 mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Exam</h3>
              <p className="text-gray-700">
                Select from NAPLAN or ICAS exams for your year level and subject.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-learn-100 flex items-center justify-center text-learn-600 mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Practice & Learn</h3>
              <p className="text-gray-700">
                Complete exams under timed conditions to simulate the real experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-learn-100 flex items-center justify-center text-learn-600 mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Review Results</h3>
              <p className="text-gray-700">
                Get immediate feedback, explanations, and track your progress over time.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="button-gradient">
              <Link to="/signup">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials or Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Student Success</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who have improved their exam scores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-lg mb-4 text-gray-700">
                "WonderLearn helped me gain confidence for my NAPLAN test. The practice exams were so similar to the real thing!"
              </p>
              <p className="font-medium">Sarah, Year 5 Student</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-lg mb-4 text-gray-700">
                "The detailed explanations after each question helped my son understand where he went wrong and how to improve."
              </p>
              <p className="font-medium">John, Parent of Year 7 Student</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl">
              <p className="text-lg mb-4 text-gray-700">
                "I improved my Digital Technologies ICAS score from a Credit to a Distinction after using WonderLearn."
              </p>
              <p className="font-medium">Michael, Year 9 Student</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Excelling?</h2>
            <p className="text-xl mb-8">
              Join WonderLearn today and get access to comprehensive exam preparation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-wonder-600 hover:bg-gray-100"
              >
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/exams">Try Free Sample</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
