
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'truefalse' | 'shortanswer';
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

interface QuestionDisplayProps {
  currentQuestion: Question;
  currentAnswer: string | null;
  isFlagged: boolean;
  onAnswerChange: (selectedOption: string) => void;
  onToggleFlag: () => void;
}

const QuestionDisplay = ({
  currentQuestion,
  currentAnswer,
  isFlagged,
  onAnswerChange,
  onToggleFlag
}: QuestionDisplayProps) => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Question</h2>
          <Button
            variant={isFlagged ? "default" : "outline"}
            size="sm"
            className={`flex items-center ${
              isFlagged ? 'bg-amber-500 hover:bg-amber-600' : 'text-amber-500 border-amber-300'
            }`}
            onClick={onToggleFlag}
          >
            <Flag size={16} className="mr-1" />
            {isFlagged ? 'Flagged' : 'Flag for Review'}
          </Button>
        </div>
        
        <p className="text-lg mb-6">{currentQuestion.text}</p>
        
        {currentQuestion.type === 'mcq' && currentQuestion.options && (
          <RadioGroup
            value={currentAnswer || ''}
            onValueChange={onAnswerChange}
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
            value={currentAnswer || ''}
            onValueChange={onAnswerChange}
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
    </Card>
  );
};

export default QuestionDisplay;
