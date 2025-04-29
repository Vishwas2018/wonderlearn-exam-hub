
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Check, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Account created successfully",
        description: "Welcome to WonderLearn! You are now signed in.",
        duration: 3000,
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white to-learn-50">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Link to="/" className="font-bold text-2xl bg-gradient-to-r from-wonder-600 to-learn-600 bg-clip-text text-transparent">
                WonderLearn
              </Link>
            </div>
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to start your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 p-3 rounded-lg mb-4 flex items-center text-red-600">
                <X className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="text-xs text-gray-500">
                    Password must be at least 8 characters long.
                  </div>
                </div>
                <div className="grid gap-2">
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
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm text-gray-500">
                    I agree to the <Link to="/terms" className="text-wonder-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-wonder-600 hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
                <Button type="submit" className="button-gradient" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-wonder-600 font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
