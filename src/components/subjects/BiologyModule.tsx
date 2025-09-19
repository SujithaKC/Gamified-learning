import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, Trophy, BookOpen, Brain, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dbService } from '@/lib/db';
import { User } from '@/lib/auth';

interface GeographyModuleProps {
  course: any;
  user: User;
  onBack: () => void;
  onProgressUpdate: () => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

const InteractiveModule = ({ gameType, onComplete }: { gameType: string; onComplete: () => void }) => {
  let src = '';
  switch (gameType) {
    case 'geography-world-geography':
      src = 'https://www.geoguessr.com/seterra/en/vgp/3003';
      break;
    case 'geography-climate':
      src = 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_en.html';
      break;
    case 'geography-maps':
      src = 'https://www.geoguessr.com/seterra/en/vgp/3013';
      break;
    default:
      return (
        <div className="p-8 text-center">
          <p>Interactive module for {gameType} is coming soon!</p>
          <Button onClick={onComplete} className="mt-4">
            Complete Module
          </Button>
        </div>
      );
  }

  return (
    <div>
      <iframe
        src={src}
        style={{ width: '100%', height: '600px', border: 'none' }}
        allowFullScreen
        title={`${gameType} Interactive Module`}
      />
      <Button onClick={onComplete} className="mt-4">
        Finish Module
      </Button>
    </div>
  );
};

const GeographyModule = ({ course, user, onBack, onProgressUpdate }: GeographyModuleProps) => {
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const { toast } = useToast();

  const quizQuestions: Record<string, Question[]> = {
    'world-geography': [
      {
        id: '1',
        question: 'What is the largest continent by land area?',
        options: ['Africa', 'Asia', 'Australia', 'Europe'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'Which ocean is the largest?',
        options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
        correctAnswer: 2,
        points: 10
      }
    ],
    'climate': [
      {
        id: '1',
        question: 'What is the primary cause of the greenhouse effect?',
        options: [
          'Deforestation',
          'Greenhouse gases',
          'Ocean currents',
          'Solar radiation'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'Which climate zone is characterized by cold temperatures year-round?',
        options: ['Tropical', 'Temperate', 'Polar', 'Arid'],
        correctAnswer: 2,
        points: 10
      }
    ],
    'maps': [
      {
        id: '1',
        question: 'What does a topographic map show?',
        options: [
          'Population density',
          'Elevation and landforms',
          'Climate zones',
          'Economic activity'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'What is the purpose of a map scale?',
        options: [
          'To show direction',
          'To represent distance',
          'To indicate elevation',
          'To mark boundaries'
        ],
        correctAnswer: 1,
        points: 10
      }
    ]
  };

  useEffect(() => {
    loadProgress();
  }, [course.id, user.id]);

  const loadProgress = async () => {
    try {
      const studentProgress = await dbService.getStudentProgress(user.id);
      const courseProgress = studentProgress.filter(p => p.courseId === course.id);
      setProgress(courseProgress);
    } catch (error) {
      console.error('Failed to load progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to load progress.',
        variant: 'destructive',
      });
    }
  };

  const isChapterCompleted = (chapterIndex: number) => {
    const chapter = course.chapters[chapterIndex];
    return progress.some(p => p.chapterId === chapter.id && p.completed);
  };

  const getChapterScore = (chapterIndex: number) => {
    const chapter = course.chapters[chapterIndex];
    const chapterProgress = progress.find(p => p.chapterId === chapter.id && p.completed);
    return chapterProgress?.score || 0;
  };

  const handleCompleteChapter = async () => {
    if (currentChapter === null) return;
    const chapter = course.chapters[currentChapter];
    
    try {
      await dbService.updateProgress({
        studentId: user.id,
        courseId: course.id,
        chapterId: chapter.id,
        completed: true,
        completedAt: new Date(),
      });

      toast({
        title: 'Topic Completed! 🎉',
        description: 'Great job! Ready for the quiz?',
      });

      setShowQuiz(true);
      onProgressUpdate();
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to save progress.',
        variant: 'destructive',
      });
    }
  };

  const handleQuizSubmit = async () => {
    if (currentChapter === null) return;
    const questions = quizQuestions[course.chapters[currentChapter].id] || [];
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

    const chapter = course.chapters[currentChapter];
    try {
      await dbService.updateProgress({
        studentId: user.id,
        courseId: course.id,
        chapterId: chapter.id,
        completed: true,
        score: percentage,
        completedAt: new Date(),
      });

      await loadProgress();

      toast({
        title: 'Quiz Completed!',
        description: `You scored ${Math.round(percentage)}%`,
      });
    } catch (error) {
      console.error('Failed to save quiz progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to save quiz score.',
        variant: 'destructive',
      });
    }
  };

  const handleNextChapter = () => {
    if (currentChapter === null || currentChapter >= course.chapters.length - 1) return;
    setCurrentChapter(currentChapter + 1);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
    setQuizScore(0);
  };

  const getOverallProgress = () => {
    const completedChapters = course.chapters.filter((_: any, index: number) => isChapterCompleted(index));
    return (completedChapters.length / course.chapters.length) * 100;
  };

  if (!course.chapters.length) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Content Available</h2>
              <p className="text-muted-foreground">This course doesn't have any topics yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentChapter === null) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Geography Topics
              </CardTitle>
              <CardDescription>Select a topic to start learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(getOverallProgress())}% Complete</span>
                </div>
                <Progress value={getOverallProgress()} className="h-2" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {course.chapters.map((chapter: any, index: number) => (
                    <Card key={chapter.id} className="transition-all hover:shadow-lg cursor-pointer">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{chapter.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {isChapterCompleted(index) ? 'Completed' : 'Not Started'}
                              </p>
                            </div>
                            <Badge variant="secondary">Topic {chapter.order}</Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{isChapterCompleted(index) ? Math.round(getChapterScore(index)) : 0}%</span>
                            </div>
                            <Progress value={isChapterCompleted(index) ? getChapterScore(index) : 0} className="h-2" />
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => setCurrentChapter(index)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            {isChapterCompleted(index) ? 'Review Topic' : 'Start Topic'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentChapter(null)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Geography Topics
          </Button>
          <Badge variant="secondary">{course.subject} - Grade {course.grade}</Badge>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round(getOverallProgress())}% Complete</span>
              </div>
              <Progress value={getOverallProgress()} className="h-2" />
              <div className="flex flex-wrap gap-2">
                {course.chapters.map((chapter: any, index: number) => (
                  <Button
                    key={chapter.id}
                    variant={index === currentChapter ? 'default' : isChapterCompleted(index) ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setCurrentChapter(index);
                      setShowQuiz(false);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                      setQuizScore(0);
                    }}
                    className="flex items-center gap-1"
                  >
                    {isChapterCompleted(index) && <CheckCircle className="h-3 w-3" />}
                    {chapter.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {!showQuiz ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {course.chapters[currentChapter].title}
              </CardTitle>
              <CardDescription>
                Topic {currentChapter + 1} of {course.chapters.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-full h-[600px] relative">
                <InteractiveModule 
                  gameType={course.chapters[currentChapter].componentPath}
                  onComplete={handleCompleteChapter}
                />
              </div>
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2">
                  {isChapterCompleted(currentChapter) && (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-green-600">
                        Completed - Score: {Math.round(getChapterScore(currentChapter))}%
                      </span>
                    </>
                  )}
                </div>
                <div className="space-x-2">
                  {!isChapterCompleted(currentChapter) ? (
                    <Button onClick={handleCompleteChapter}>
                      Complete Topic
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setShowQuiz(true)}>
                        Retake Quiz
                      </Button>
                      {currentChapter < course.chapters.length - 1 && (
                        <Button onClick={handleNextChapter}>
                          Next Topic
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Topic Quiz
              </CardTitle>
              <CardDescription>
                Test your understanding of {course.chapters[currentChapter].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!quizSubmitted ? (
                <>
                  {quizQuestions[course.chapters[currentChapter].id]?.length === 0 ? (
                    <p className="text-center text-muted-foreground">No quiz questions available for this topic.</p>
                  ) : (
                    quizQuestions[course.chapters[currentChapter].id].map((question, index) => (
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
                      disabled={quizQuestions[course.chapters[currentChapter].id]?.length === 0 || 
                                Object.keys(quizAnswers).length < quizQuestions[course.chapters[currentChapter].id].length}
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
                    <Button variant="outline" onClick={() => {
                      setShowQuiz(false);
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                      setQuizScore(0);
                    }}>
                      Review Topic
                    </Button>
                    {currentChapter < course.chapters.length - 1 && (
                      <Button onClick={handleNextChapter}>
                        Next Topic
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GeographyModule;