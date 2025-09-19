import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trophy, Brain } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface AtomScienceGameProps {
  onComplete: (score: number) => void;
  questions: Question[];
}

const AtomScienceGame = ({ onComplete, questions }: AtomScienceGameProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizSubmit = () => {
    let earned = 0;
    let totalPoints = 0;

    questions.forEach((question) => {
      totalPoints += question.points;
      const selectedAnswer = parseInt(quizAnswers[question.id] || '0');
      if (selectedAnswer === question.correctAnswer) {
        earned += question.points;
      }
    });

    const percentage = totalPoints > 0 ? (earned / totalPoints) * 100 : 0;
    setQuizScore(percentage);
    setQuizSubmitted(true);
    onComplete(percentage);
  };

  return (
    <div>
      {!showQuiz ? (
        <div className="relative">
          <iframe
            src="https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html"
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="Atom Science Game"
            allowFullScreen
          />
          <Button onClick={() => setShowQuiz(true)} className="mt-4">
            Take Quiz
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Atom Science Quiz
            </CardTitle>
            <CardDescription>Test your understanding of atomic structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!quizSubmitted ? (
              <>
                {questions.length === 0 ? (
                  <p className="text-center text-muted-foreground">No quiz questions available.</p>
                ) : (
                  questions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <h3 className="font-medium">
                        {index + 1}. {question.question}
                      </h3>
                      <RadioGroup
                        value={quizAnswers[question.id] || ''}
                        onValueChange={(value) => setQuizAnswers(prev => ({ ...prev, [question.id]: value }))}
                      >
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
                            <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))
                )}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={questions.length === 0 || Object.keys(quizAnswers).length < questions.length}
                  >
                    Submit Quiz
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-8">
                  <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                  <p className="text-xl">Your Score: {Math.round(quizScore)}%</p>
                  <p className="text-muted-foreground mt-2">
                    {quizScore >= 80 ? 'Excellent work!' : quizScore >= 60 ? 'Good job!' : 'Keep practicing!'}
                  </p>
                </div>
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowQuiz(false);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                      setQuizScore(0);
                    }}
                  >
                    Retake Quiz
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AtomScienceGame;