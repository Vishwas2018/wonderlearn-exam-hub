
import React from 'react';
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

interface SubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  unansweredCount: number;
  flaggedCount: number;
}

const SubmitDialog = ({
  open,
  onOpenChange,
  onSubmit,
  unansweredCount,
  flaggedCount
}: SubmitDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
          <AlertDialogDescription>
            You have {unansweredCount} unanswered questions
            {flaggedCount > 0 && ` and ${flaggedCount} flagged for review`}.
            Are you sure you want to submit?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} className="button-gradient">
            Submit Exam
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmitDialog;
