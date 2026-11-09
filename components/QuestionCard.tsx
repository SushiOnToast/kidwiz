import { Question } from "@/lib/types";

import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

interface QuestionCardProps {
  num: number;
  question: Question;
  showAnswer: Boolean;
}

const QuestionCard = ({ num, question, showAnswer }: QuestionCardProps) => {

  return (
    <Card>
      <CardContent className="flex">
        <span>
          {num}. {question.question} = 
        </span>
        <span>{showAnswer && question.answer}</span>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
