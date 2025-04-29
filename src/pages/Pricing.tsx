
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';

type PricingPlan = 'monthly' | 'quarterly' | 'annual';
type SubscriptionTier = 'basic' | 'premium';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<PricingPlan>('monthly');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('basic');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Pricing data
  const pricing = {
    basic: {
      monthly: 9.99,
      quarterly: 26.99,
      annual: 99.99
    },
    premium: {
      monthly: 14.99,
      quarterly: 39.99,
      annual: 149.99
    }
  };
  
  // Calculate savings compared to monthly
  const calculateSavings = (tier: SubscriptionTier, plan: PricingPlan) => {
    if (plan === 'monthly') return 0;
    
    const monthlyPrice = pricing[tier].monthly;
    const planPrice = pricing[tier][plan];
    let months = plan === 'quarterly' ? 3 : 12;
    
    return Math.round(((monthlyPrice * months) - planPrice) / (monthlyPrice * months) * 100);
  };
  
  const handleSubscribe = () => {
    // In a real app, this would initiate the payment process
    // For this demo, we'll simulate a subscription
    localStorage.setItem('isSubscribed', 'true');
    
    toast({
      title: "Subscription successful!",
      description: `You have subscribed to the ${selectedTier} plan.`,
      duration: 3000,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Choose Your WonderLearn Plan</h1>
          <p className="text-gray-600 mb-6">
            Access comprehensive practice exams and premium features to accelerate learning
          </p>
          
          <div className="inline-block">
            <Tabs 
              defaultValue="monthly" 
              value={billingPeriod}
              onValueChange={(value) => setBillingPeriod(value as PricingPlan)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-[400px]">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">3 Months</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Basic Plan */}
          <div>
            <Card className={`h-full transition-all duration-300 hover:shadow-md ${selectedTier === 'basic' ? 'border-wonder-400 shadow-md' : ''}`}>
              <div className="absolute right-4 top-4">
                <RadioGroup value={selectedTier} onValueChange={v => setSelectedTier(v as SubscriptionTier)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic">Select</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="h-2 bg-wonder-500 rounded-t-lg"></div>
              <CardHeader>
                <CardTitle>Basic Plan</CardTitle>
                <CardDescription>Perfect for occasional test preparation</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${pricing.basic[billingPeriod]}</span>
                  <span className="text-gray-500 ml-1">
                    /{billingPeriod === 'monthly' ? 'month' : billingPeriod === 'quarterly' ? 'quarter' : 'year'}
                  </span>
                  
                  {billingPeriod !== 'monthly' && (
                    <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Save {calculateSavings('basic', billingPeriod)}%
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pricing-tier-gradient">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-wonder-600 mr-2 mt-0.5" />
                    <span>Access to all NAPLAN & ICAS practice exams</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-wonder-600 mr-2 mt-0.5" />
                    <span>3 practice exams per subject</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-wonder-600 mr-2 mt-0.5" />
                    <span>Basic performance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-wonder-600 mr-2 mt-0.5" />
                    <span>Detailed answer explanations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSubscribe}
                  className={`w-full ${selectedTier === 'basic' ? 'bg-wonder-600 hover:bg-wonder-700' : 'bg-wonder-600/80 hover:bg-wonder-600'}`}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Premium Plan */}
          <div>
            <Card className={`h-full transition-all duration-300 hover:shadow-md relative overflow-hidden ${selectedTier === 'premium' ? 'border-learn-400 shadow-md' : ''}`}>
              <div className="absolute -right-12 top-7 rotate-45 bg-learn-600 text-white py-1 px-12 text-xs font-semibold">
                POPULAR
              </div>
              <div className="absolute right-4 top-4 z-10">
                <RadioGroup value={selectedTier} onValueChange={v => setSelectedTier(v as SubscriptionTier)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium">Select</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="h-2 bg-learn-500 rounded-t-lg"></div>
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <CardDescription>Complete exam preparation solution</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${pricing.premium[billingPeriod]}</span>
                  <span className="text-gray-500 ml-1">
                    /{billingPeriod === 'monthly' ? 'month' : billingPeriod === 'quarterly' ? 'quarter' : 'year'}
                  </span>
                  
                  {billingPeriod !== 'monthly' && (
                    <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Save {calculateSavings('premium', billingPeriod)}%
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pricing-tier-premium-gradient">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-learn-600 mr-2 mt-0.5" />
                    <span>Access to all NAPLAN & ICAS practice exams</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-learn-600 mr-2 mt-0.5" />
                    <span><strong>All 5 practice exams per subject</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-learn-600 mr-2 mt-0.5" />
                    <span><strong>Advanced analytics and performance tracking</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-learn-600 mr-2 mt-0.5" />
                    <span>Detailed answer explanations</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-learn-600 mr-2 mt-0.5" />
                    <span><strong>Personalized study recommendations</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-learn-600 mr-2 mt-0.5" />
                    <span><strong>Priority support</strong></span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSubscribe}
                  className={`w-full ${selectedTier === 'premium' ? 'button-gradient' : 'bg-gradient-to-r from-wonder-500 to-learn-500 opacity-80 hover:opacity-100'}`}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time. If you cancel, you'll still have access until the end of your current billing period.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and direct debit from your bank account.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Can I switch between plans?</h3>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the premium features.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Do you offer a family plan for multiple students?</h3>
              <p className="text-gray-600 text-sm">Yes, we offer family plans for up to 3 students at a discounted rate. Please contact our support team for more information.</p>
            </div>
          </div>
        </div>
        
        {/* Guarantee */}
        <div className="bg-wonder-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">100% Satisfaction Guarantee</h3>
          <p className="text-sm text-gray-600">
            If you're not completely satisfied with WonderLearn within the first 30 days, contact us for a full refund.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
