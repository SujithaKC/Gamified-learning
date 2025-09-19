// // import { useState, useEffect } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Progress } from '@/components/ui/progress';
// // import { Badge } from '@/components/ui/badge';
// // import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// // import { Label } from '@/components/ui/label';
// // import { ArrowLeft, CheckCircle, Trophy, BookOpen, Brain, Play } from 'lucide-react';
// // import { useToast } from '@/hooks/use-toast';
// // import { dbService } from '@/lib/db';
// // import { User } from '@/lib/auth';

// // interface MathsModuleProps {
// //   course: any;
// //   user: User;
// //   onBack: () => void;
// //   onProgressUpdate: () => void;
// // }

// // interface Question {
// //   id: string;
// //   question: string;
// //   options: string[];
// //   correctAnswer: number;
// //   points: number;
// // }

// // const InteractiveModule = ({ gameType, onComplete }: { gameType: string; onComplete: () => void }) => {
// //   let src = '';
// //   switch (gameType) {
// //     case 'maths-basic-algebra':
// //       src = 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_en.html';
// //       break;
// //     case 'maths-geometry':
// //       src = 'https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_en.html';
// //       break;
// //     case 'maths-fractions':
// //       src = 'https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_en.html';
// //       break;
// //     default:
// //       return (
// //         <div className="p-8 text-center">
// //           <p>Interactive module for {gameType} is coming soon!</p>
// //           <Button onClick={onComplete} className="mt-4">
// //             Complete Module
// //           </Button>
// //         </div>
// //       );
// //   }

// //   return (
// //     <div>
// //       <iframe
// //         src={src}
// //         style={{ width: '100%', height: '600px', border: 'none' }}
// //         allowFullScreen
// //         title={`${gameType} Interactive Module`}
// //       />
// //       <Button onClick={onComplete} className="mt-4">
// //         Finish Module
// //       </Button>
// //     </div>
// //   );
// // };

// // const MathsModule = ({ course, user, onBack, onProgressUpdate }: MathsModuleProps) => {
// //   const [currentChapter, setCurrentChapter] = useState<number | null>(null);
// //   const [showQuiz, setShowQuiz] = useState(false);
// //   const [progress, setProgress] = useState<any[]>([]);
// //   const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
// //   const [quizSubmitted, setQuizSubmitted] = useState(false);
// //   const [quizScore, setQuizScore] = useState(0);
// //   const { toast } = useToast();

// //   const quizQuestions: Record<string, Question[]> = {
// //     'basic-algebra': [
// //       {
// //         id: '1',
// //         question: 'What is the value of x in the equation 2x + 3 = 7?',
// //         options: ['1', '2', '3', '4'],
// //         correctAnswer: 1,
// //         points: 10
// //       },
// //       {
// //         id: '2',
// //         question: 'What does the slope of a line represent?',
// //         options: [
// //           'The y-intercept',
// //           'The rate of change',
// //           'The x-intercept',
// //           'The line length'
// //         ],
// //         correctAnswer: 1,
// //         points: 10
// //       }
// //     ],
// //     'geometry': [
// //       {
// //         id: '1',
// //         question: 'What is the sum of angles in a triangle?',
// //         options: ['90°', '180°', '270°', '360°'],
// //         correctAnswer: 1,
// //         points: 10
// //       },
// //       {
// //         id: '2',
// //         question: 'What is a polygon with four equal sides called?',
// //         options: ['Triangle', 'Rectangle', 'Square', 'Pentagon'],
// //         correctAnswer: 2,
// //         points: 10
// //       }
// //     ],
// //     'fractions': [
// //       {
// //         id: '1',
// //         question: 'What is 1/2 + 1/4?',
// //         options: ['1/4', '3/4', '1/2', '1'],
// //         correctAnswer: 1,
// //         points: 10
// //       },
// //       {
// //         id: '2',
// //         question: 'What is the denominator in 3/5?',
// //         options: ['3', '5', '15', '8'],
// //         correctAnswer: 1,
// //         points: 10
// //       }
// //     ]
// //   };

// //   useEffect(() => {
// //     loadProgress();
// //   }, [course.id, user.id]);

// //   const loadProgress = async () => {
// //     try {
// //       const studentProgress = await dbService.getStudentProgress(user.id);
// //       const courseProgress = studentProgress.filter(p => p.courseId === course.id);
// //       setProgress(courseProgress);
// //     } catch (error) {
// //       console.error('Failed to load progress:', error);
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to load progress.',
// //         variant: 'destructive',
// //       });
// //     }
// //   };

// //   const isChapterCompleted = (chapterIndex: number) => {
// //     const chapter = course.chapters[chapterIndex];
// //     return progress.some(p => p.chapterId === chapter.id && p.completed);
// //   };

// //   const getChapterScore = (chapterIndex: number) => {
// //     const chapter = course.chapters[chapterIndex];
// //     const chapterProgress = progress.find(p => p.chapterId === chapter.id && p.completed);
// //     return chapterProgress?.score || 0;
// //   };

// //   const handleCompleteChapter = async () => {
// //     if (currentChapter === null) return;
// //     const chapter = course.chapters[currentChapter];
    
// //     try {
// //       await dbService.updateProgress({
// //         studentId: user.id,
// //         courseId: course.id,
// //         chapterId: chapter.id,
// //         completed: true,
// //         completedAt: new Date(),
// //       });

// //       toast({
// //         title: 'Topic Completed! 🎉',
// //         description: 'Great job! Ready for the quiz?',
// //       });

// //       setShowQuiz(true);
// //       onProgressUpdate();
// //     } catch (error) {
// //       console.error('Failed to update progress:', error);
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to save progress.',
// //         variant: 'destructive',
// //       });
// //     }
// //   };

// //   const handleQuizSubmit = async () => {
// //     if (currentChapter === null) return;
// //     const questions = quizQuestions[course.chapters[currentChapter].id] || [];
// //     let earned = 0;
// //     let totalPoints = 0;

// //     questions.forEach((question) => {
// //       totalPoints += question.points;
// //       const selectedAnswer = parseInt(quizAnswers[question.id] || '0');
// //       if (selectedAnswer === question.correctAnswer) {
// //         earned += question.points;
// //       }
// //     });

// //     const percentage = totalPoints > 0 ? (earned / totalPoints) * 100 : 0;
// //     setQuizScore(percentage);
// //     setQuizSubmitted(true);

// //     const chapter = course.chapters[currentChapter];
// //     try {
// //       await dbService.updateProgress({
// //         studentId: user.id,
// //         courseId: course.id,
// //         chapterId: chapter.id,
// //         completed: true,
// //         score: percentage,
// //         completedAt: new Date(),
// //       });

// //       await loadProgress();

// //       toast({
// //         title: 'Quiz Completed!',
// //         description: `You scored ${Math.round(percentage)}%`,
// //       });
// //     } catch (error) {
// //       console.error('Failed to save quiz progress:', error);
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to save quiz score.',
// //         variant: 'destructive',
// //       });
// //     }
// //   };

// //   const handleNextChapter = () => {
// //     if (currentChapter === null || currentChapter >= course.chapters.length - 1) return;
// //     setCurrentChapter(currentChapter + 1);
// //     setShowQuiz(false);
// //     setQuizSubmitted(false);
// //     setQuizAnswers({});
// //     setQuizScore(0);
// //   };

// //   const getOverallProgress = () => {
// //     const completedChapters = course.chapters.filter((_: any, index: number) => isChapterCompleted(index));
// //     return (completedChapters.length / course.chapters.length) * 100;
// //   };

// //   if (!course.chapters.length) {
// //     return (
// //       <div className="min-h-screen bg-background p-4">
// //         <div className="mx-auto max-w-4xl">
// //           <Button variant="ghost" onClick={onBack} className="mb-4">
// //             <ArrowLeft className="mr-2 h-4 w-4" />
// //             Back to Dashboard
// //           </Button>
// //           <Card>
// //             <CardContent className="p-12 text-center">
// //               <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
// //               <h2 className="text-xl font-semibold mb-2">No Content Available</h2>
// //               <p className="text-muted-foreground">This course doesn't have any topics yet.</p>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (currentChapter === null) {
// //     return (
// //       <div className="min-h-screen bg-background p-4">
// //         <div className="mx-auto max-w-4xl">
// //           <Button variant="ghost" onClick={onBack} className="mb-4">
// //             <ArrowLeft className="mr-2 h-4 w-4" />
// //             Back to Dashboard
// //           </Button>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <BookOpen className="h-5 w-5" />
// //                 Maths Topics
// //               </CardTitle>
// //               <CardDescription>Select a topic to start learning</CardDescription>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="flex items-center justify-between text-sm">
// //                   <span>Overall Progress</span>
// //                   <span>{Math.round(getOverallProgress())}% Complete</span>
// //                 </div>
// //                 <Progress value={getOverallProgress()} className="h-2" />
// //                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //                   {course.chapters.map((chapter: any, index: number) => (
// //                     <Card key={chapter.id} className="transition-all hover:shadow-lg cursor-pointer">
// //                       <CardContent className="p-6">
// //                         <div className="space-y-4">
// //                           <div className="flex items-start justify-between">
// //                             <div>
// //                               <h3 className="font-semibold text-lg">{chapter.title}</h3>
// //                               <p className="text-sm text-muted-foreground">
// //                                 {isChapterCompleted(index) ? 'Completed' : 'Not Started'}
// //                               </p>
// //                             </div>
// //                             <Badge variant="secondary">Topic {chapter.order}</Badge>
// //                           </div>
// //                           <div className="space-y-2">
// //                             <div className="flex items-center justify-between text-sm">
// //                               <span>Progress</span>
// //                               <span>{isChapterCompleted(index) ? Math.round(getChapterScore(index)) : 0}%</span>
// //                             </div>
// //                             <Progress value={isChapterCompleted(index) ? getChapterScore(index) : 0} className="h-2" />
// //                           </div>
// //                           <Button
// //                             className="w-full"
// //                             onClick={() => setCurrentChapter(index)}
// //                           >
// //                             <Play className="mr-2 h-4 w-4" />
// //                             {isChapterCompleted(index) ? 'Review Topic' : 'Start Topic'}
// //                           </Button>
// //                         </div>
// //                       </CardContent>
// //                     </Card>
// //                   ))}
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background p-4">
// //       <div className="mx-auto max-w-4xl">
// //         <div className="mb-6 flex items-center justify-between">
// //           <Button variant="ghost" onClick={() => setCurrentChapter(null)}>
// //             <ArrowLeft className="mr-2 h-4 w-4" />
// //             Back to Maths Topics
// //           </Button>
// //           <Badge variant="secondary">{course.subject} - Grade {course.grade}</Badge>
// //         </div>
// //         <Card className="mb-6">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2">
// //               <Trophy className="h-5 w-5" />
// //               Course Progress
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               <div className="flex items-center justify-between text-sm">
// //                 <span>Overall Progress</span>
// //                 <span>{Math.round(getOverallProgress())}% Complete</span>
// //               </div>
// //               <Progress value={getOverallProgress()} className="h-2" />
// //               <div className="flex flex-wrap gap-2">
// //                 {course.chapters.map((chapter: any, index: number) => (
// //                   <Button
// //                     key={chapter.id}
// //                     variant={index === currentChapter ? 'default' : isChapterCompleted(index) ? 'secondary' : 'outline'}
// //                     size="sm"
// //                     onClick={() => {
// //                       setCurrentChapter(index);
// //                       setShowQuiz(false);
// //                       setQuizSubmitted(false);
// //                       setQuizAnswers({});
// //                       setQuizScore(0);
// //                     }}
// //                     className="flex items-center gap-1"
// //                   >
// //                     {isChapterCompleted(index) && <CheckCircle className="h-3 w-3" />}
// //                     {chapter.title}
// //                   </Button>
// //                 ))}
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //         {!showQuiz ? (
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <BookOpen className="h-5 w-5" />
// //                 {course.chapters[currentChapter].title}
// //               </CardTitle>
// //               <CardDescription>
// //                 Topic {currentChapter + 1} of {course.chapters.length}
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               <div className="w-full h-[600px] relative">
// //                 <InteractiveModule 
// //                   gameType={course.chapters[currentChapter].componentPath}
// //                   onComplete={handleCompleteChapter}
// //                 />
// //               </div>
// //               <div className="flex items-center justify-between pt-6 border-t">
// //                 <div className="flex items-center gap-2">
// //                   {isChapterCompleted(currentChapter) && (
// //                     <>
// //                       <CheckCircle className="h-5 w-5 text-green-500" />
// //                       <span className="text-sm text-green-600">
// //                         Completed - Score: {Math.round(getChapterScore(currentChapter))}%
// //                       </span>
// //                     </>
// //                   )}
// //                 </div>
// //                 <div className="space-x-2">
// //                   {!isChapterCompleted(currentChapter) ? (
// //                     <Button onClick={handleCompleteChapter}>
// //                       Complete Topic
// //                     </Button>
// //                   ) : (
// //                     <>
// //                       <Button variant="outline" onClick={() => setShowQuiz(true)}>
// //                         Retake Quiz
// //                       </Button>
// //                       {currentChapter < course.chapters.length - 1 && (
// //                         <Button onClick={handleNextChapter}>
// //                           Next Topic
// //                         </Button>
// //                       )}
// //                     </>
// //                   )}
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ) : (
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Brain className="h-5 w-5" />
// //                 Topic Quiz
// //               </CardTitle>
// //               <CardDescription>
// //                 Test your understanding of {course.chapters[currentChapter].title}
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               {!quizSubmitted ? (
// //                 <>
// //                   {quizQuestions[course.chapters[currentChapter].id]?.length === 0 ? (
// //                     <p className="text-center text-muted-foreground">No quiz questions available for this topic.</p>
// //                   ) : (
// //                     quizQuestions[course.chapters[currentChapter].id].map((question, index) => (
// //                       <div key={question.id} className="space-y-3">
// //                         <h3 className="font-medium">
// //                           {index + 1}. {question.question}
// //                         </h3>
// //                         <RadioGroup
// //                           value={quizAnswers[question.id] || ''}
// //                           onValueChange={(value) => setQuizAnswers(prev => ({ ...prev, [question.id]: value }))}
// //                         >
// //                           {question.options.map((option, optionIndex) => (
// //                             <div key={optionIndex} className="flex items-center space-x-2">
// //                               <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
// //                               <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
// //                             </div>
// //                           ))}
// //                         </RadioGroup>
// //                       </div>
// //                     ))
// //                   )}
// //                   <div className="flex justify-end pt-4">
// //                     <Button 
// //                       onClick={handleQuizSubmit}
// //                       disabled={quizQuestions[course.chapters[currentChapter].id]?.length === 0 || 
// //                                 Object.keys(quizAnswers).length < quizQuestions[course.chapters[currentChapter].id].length}
// //                     >
// //                       Submit Quiz
// //                     </Button>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="text-center space-y-4">
// //                   <div className="p-8">
// //                     <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
// //                     <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
// //                     <p className="text-xl">Your Score: {Math.round(quizScore)}%</p>
// //                     <p className="text-muted-foreground mt-2">
// //                       {quizScore >= 80 ? 'Excellent work!' : quizScore >= 60 ? 'Good job!' : 'Keep practicing!'}
// //                     </p>
// //                   </div>
// //                   <div className="flex justify-center space-x-2">
// //                     <Button variant="outline" onClick={() => {
// //                       setShowQuiz(false);
// //                       setQuizSubmitted(false);
// //                       setQuizAnswers({});
// //                       setQuizScore(0);
// //                     }}>
// //                       Review Topic
// //                     </Button>
// //                     {currentChapter < course.chapters.length - 1 && (
// //                       <Button onClick={handleNextChapter}>
// //                         Next Topic
// //                       </Button>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MathsModule;


// import { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { ArrowLeft, CheckCircle, Trophy, BookOpen, Brain, Play } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import Phaser from 'phaser';
// import { dbService } from '@/lib/db';

// // Phaser game scenes
// class NumberGameScene extends Phaser.Scene {
//   private numberText!: Phaser.GameObjects.Text;
//   private currentNumber!: number;
//   private digitBoxes: Phaser.GameObjects.Rectangle[] = [];
//   private digitTexts: Phaser.GameObjects.Text[] = [];
//   private placeValueLabels: Phaser.GameObjects.Text[] = [];

//   constructor() {
//     super({ key: 'NumberGameScene' });
//   }

//   init() {
//     this.currentNumber = Phaser.Math.Between(10000, 99999);
//   }

//   create() {
//     this.cameras.main.setBackgroundColor(0x87ceeb);
//     this.add.text(400, 50, 'Large Numbers Game', { fontSize: '32px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
//     this.numberText = this.add.text(400, 100, this.formatNumber(this.currentNumber), { fontSize: '48px', color: '#4e54c8', fontFamily: 'Arial' }).setOrigin(0.5);
//     this.add.text(400, 150, this.numberToWords(this.currentNumber), { fontSize: '20px', color: '#6c757d', fontFamily: 'Arial' }).setOrigin(0.5);
//     this.createDigitBreakdown();
//     const generateButton = this.add.rectangle(400, 350, 200, 50, 0x6c5ce7).setInteractive();
//     this.add.text(400, 350, 'Generate New Number', { fontSize: '16px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
//     generateButton.on('pointerdown', () => {
//       this.currentNumber = Phaser.Math.Between(10000, 99999);
//       this.numberText.setText(this.formatNumber(this.currentNumber));
//       this.updateDigitBreakdown();
//     });
//     this.add.text(400, 420, 'Explore place values of large numbers!', {
//       fontSize: '16px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: 600 }
//     }).setOrigin(0.5);
//   }

//   private formatNumber(num: number): string {
//     return num.toLocaleString('en-IN');
//   }

//   private numberToWords(num: number): string {
//     const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
//     const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
//     const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
//     if (num === 0) return 'zero';
//     let words = '';
//     if (num >= 1000) {
//       const thousands = Math.floor(num / 1000);
//       words += ones[thousands] + ' thousand ';
//       num %= 1000;
//     }
//     if (num >= 100) {
//       words += ones[Math.floor(num / 100)] + ' hundred ';
//       num %= 100;
//     }
//     if (num >= 20) {
//       words += tens[Math.floor(num / 10)] + ' ';
//       num %= 10;
//     } else if (num >= 10) {
//       words += teens[num - 10] + ' ';
//       num = 0;
//     }
//     if (num > 0) words += ones[num] + ' ';
//     return words.trim();
//   }

//   private createDigitBreakdown() {
//     const digits = this.currentNumber.toString().split('');
//     const placeValues = ['Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
//     for (let i = 0; i < 5; i++) {
//       const x = 200 + (i * 100);
//       const y = 250;
//       const box = this.add.rectangle(x, y, 60, 60, 0x4e54c8);
//       this.digitBoxes.push(box);
//       const digitText = this.add.text(x, y, i < digits.length ? digits[i] : '0', { fontSize: '24px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
//       this.digitTexts.push(digitText);
//       const label = this.add.text(x, y + 40, placeValues[i], { fontSize: '12px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
//       this.placeValueLabels.push(label);
//     }
//   }

//   private updateDigitBreakdown() {
//     const digits = this.currentNumber.toString().split('');
//     for (let i = 0; i < 5; i++) {
//       this.digitTexts[i].setText(i < digits.length ? digits[i] : '0');
//     }
//   }
// }

// class AdditionSubtractionGameScene extends Phaser.Scene {
//   private num1Text!: Phaser.GameObjects.Text;
//   private num2Text!: Phaser.GameObjects.Text;
//   private resultText!: Phaser.GameObjects.Text;
//   private operator!: string;

//   constructor() {
//     super({ key: 'AdditionSubtractionGameScene' });
//   }

//   init() {
//     this.operator = Phaser.Math.Between(0, 1) ? '+' : '-';
//   }

//   create() {
//     this.cameras.main.setBackgroundColor(0x98fb98);
//     this.add.text(400, 50, 'Addition/Subtraction Game', { fontSize: '32px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
//     const num1 = Phaser.Math.Between(1000, 9999);
//     const num2 = Phaser.Math.Between(1000, num1);
//     this.num1Text = this.add.text(350, 150, num1.toString(), { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' });
//     this.add.text(400, 150, this.operator, { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' });
//     this.num2Text = this.add.text(450, 150, num2.toString(), { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' });
//     this.resultText = this.add.text(400, 250, '=', { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' }).setOrigin(0.5);
//     const generateButton = this.add.rectangle(400, 350, 200, 50, 0x228b22).setInteractive();
//     this.add.text(400, 350, 'New Problem', { fontSize: '16px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
//     generateButton.on('pointerdown', () => {
//       const newNum1 = Phaser.Math.Between(1000, 9999);
//       const newNum2 = Phaser.Math.Between(1000, newNum1);
//       this.num1Text.setText(newNum1.toString());
//       this.num2Text.setText(newNum2.toString());
//       this.operator = Phaser.Math.Between(0, 1) ? '+' : '-';
//     });
//     this.add.text(400, 420, 'Practice addition and subtraction of large numbers!', {
//       fontSize: '16px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: 600 }
//     }).setOrigin(0.5);
//   }
// }

// class MultiplicationDivisionGameScene extends Phaser.Scene {
//   private num1Text!: Phaser.GameObjects.Text;
//   private num2Text!: Phaser.GameObjects.Text;
//   private resultText!: Phaser.GameObjects.Text;
//   private operator!: string;

//   constructor() {
//     super({ key: 'MultiplicationDivisionGameScene' });
//   }

//   init() {
//     this.operator = Phaser.Math.Between(0, 1) ? '×' : '÷';
//   }

//   create() {
//     this.cameras.main.setBackgroundColor(0xffa500);
//     this.add.text(400, 50, 'Multiplication/Division Game', { fontSize: '32px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
//     const num1 = Phaser.Math.Between(10, 99);
//     const num2 = Phaser.Math.Between(2, 9);
//     this.num1Text = this.add.text(350, 150, num1.toString(), { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' });
//     this.add.text(400, 150, this.operator, { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' });
//     this.num2Text = this.add.text(450, 150, num2.toString(), { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' });
//     this.resultText = this.add.text(400, 250, '=', { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' }).setOrigin(0.5);
//     const generateButton = this.add.rectangle(400, 350, 200, 50, 0xff4500).setInteractive();
//     this.add.text(400, 350, 'New Problem', { fontSize: '16px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
//     generateButton.on('pointerdown', () => {
//       const newNum1 = Phaser.Math.Between(10, 99);
//       const newNum2 = Phaser.Math.Between(2, 9);
//       this.num1Text.setText(newNum1.toString());
//       this.num2Text.setText(newNum2.toString());
//       this.operator = Phaser.Math.Between(0, 1) ? '×' : '÷';
//     });
//     this.add.text(400, 420, 'Practice multiplication and division!', {
//       fontSize: '16px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: 600 }
//     }).setOrigin(0.5);
//   }
// }

// // Add more scenes as needed for other chapters (simplified placeholders)
// class MultiplesFactorsGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'MultiplesFactorsGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xdda0dd); this.add.text(400, 250, 'Multiples & Factors Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class IntegersGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'IntegersGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xadd8e6); this.add.text(400, 250, 'Integers Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class GeometryBasicsGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'GeometryBasicsGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xffd700); this.add.text(400, 250, 'Geometry Basics Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class AnglesGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'AnglesGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0x98fb98); this.add.text(400, 250, 'Angles Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class TrianglesQuadrilateralsGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'TrianglesQuadrilateralsGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xff69b4); this.add.text(400, 250, 'Triangles & Quadrilaterals Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class CirclesGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'CirclesGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0x20b2aa); this.add.text(400, 250, 'Circles Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class FractionsGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'FractionsGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xffa07a); this.add.text(400, 250, 'Fractions Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class DecimalNumbersGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'DecimalNumbersGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0x9370db); this.add.text(400, 250, 'Decimal Numbers Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class DataHandlingGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'DataHandlingGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0x4682b4); this.add.text(400, 250, 'Data Handling Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class PerimeterAreaGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'PerimeterAreaGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0x9acd32); this.add.text(400, 250, 'Perimeter & Area Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class PatternsGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'PatternsGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xd3d3d3); this.add.text(400, 250, 'Patterns Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class RatioProportionGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'RatioProportionGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0x8a2be2); this.add.text(400, 250, 'Ratio & Proportion Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }
// class AlgebraGameScene extends Phaser.Scene {
//   constructor() { super({ key: 'AlgebraGameScene' }); }
//   create() { this.cameras.main.setBackgroundColor(0xdeb887); this.add.text(400, 250, 'Algebra Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
// }

// interface MathsModuleProps {
//   course: any;
//   user: any;
//   onBack: () => void;
//   onProgressUpdate: () => void;
// }

// interface Question {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   points: number;
// }

// const gameSceneMap: Record<string, typeof Phaser.Scene> = {
//   'numbers': NumberGameScene,
//   'addition-subtraction': AdditionSubtractionGameScene,
//   'multiplication-division': MultiplicationDivisionGameScene,
//   'multiples-factors': MultiplesFactorsGameScene,
//   'integers': IntegersGameScene,
//   'geometry-basics': GeometryBasicsGameScene,
//   'angles': AnglesGameScene,
//   'triangles-quadrilaterals': TrianglesQuadrilateralsGameScene,
//   'circles': CirclesGameScene,
//   'fractions': FractionsGameScene,
//   'decimal-numbers': DecimalNumbersGameScene,
//   'data-handling': DataHandlingGameScene,
//   'perimeter-area': PerimeterAreaGameScene,
//   'patterns': PatternsGameScene,
//   'ratio-proportion': RatioProportionGameScene,
//   'algebra': AlgebraGameScene,
// };

// const MathsModule = ({ course, user, onBack, onProgressUpdate }: MathsModuleProps) => {
//   const [currentChapter, setCurrentChapter] = useState<number | null>(null);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [progress, setProgress] = useState<any[]>([]);
//   const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [quizScore, setQuizScore] = useState(0);
//   const { toast } = useToast();
//   const gameRef = useRef<Phaser.Game | null>(null);

//   const quizQuestions: Record<string, Question[]> = {
//     'numbers': [
//       { id: '1', question: 'What is the place value of 5 in 45,321?', options: ['Ones', 'Tens', 'Hundreds', 'Thousands'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'How do you write "Three Lakh Fifty Thousand" in numerals?', options: ['3,50,000', '3,05,000', '35,000', '3,500'], correctAnswer: 0, points: 10 },
//       { id: '3', question: 'What is the smallest 5-digit number?', options: ['10,000', '99,999', '00,001', '10,001'], correctAnswer: 0, points: 10 },
//     ],
//     'addition-subtraction': [
//       { id: '1', question: 'What is 45,678 + 32,456?', options: ['78,134', '77,134', '78,034', '77,034'], correctAnswer: 0, points: 10 },
//       { id: '2', question: 'Which property states that a + b = b + a?', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], correctAnswer: 1, points: 10 },
//     ],
//     'multiplication-division': [
//       { id: '1', question: 'What is 345 × 100?', options: ['3,450', '34,500', '345,000', '3,045'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What is 8,475 ÷ 15?', options: ['565', '555', '565.5', '565.0'], correctAnswer: 0, points: 10 },
//     ],
//     'multiples-factors': [
//       { id: '1', question: 'Is 7 a prime number?', options: ['Yes', 'No'], correctAnswer: 0, points: 10 },
//       { id: '2', question: 'What is the LCM of 4 and 6?', options: ['12', '10', '8', '6'], correctAnswer: 0, points: 10 },
//     ],
//     'integers': [
//       { id: '1', question: 'What is -3 + 5?', options: ['2', '-2', '8', '-8'], correctAnswer: 0, points: 10 },
//       { id: '2', question: 'What is -2 - 3?', options: ['-5', '-1', '1', '5'], correctAnswer: 0, points: 10 },
//     ],
//     'geometry-basics': [
//       { id: '1', question: 'What is a line segment?', options: ['A straight path with no endpoints', 'A straight path with two endpoints', 'A closed curve', 'A curved line'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What are parallel lines?', options: ['Lines that intersect', 'Lines that never meet', 'Lines that form a right angle', 'Curved lines'], correctAnswer: 1, points: 10 },
//     ],
//     'angles': [
//       { id: '1', question: 'What is a right angle?', options: ['90°', '180°', '45°', '360°'], correctAnswer: 0, points: 10 },
//       { id: '2', question: 'What is an obtuse angle?', options: ['Less than 90°', '90°', 'More than 90° but less than 180°', '180°'], correctAnswer: 2, points: 10 },
//     ],
//     'triangles-quadrilaterals': [
//       { id: '1', question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What shape has four equal sides?', options: ['Rectangle', 'Square', 'Trapezium', 'Parallelogram'], correctAnswer: 1, points: 10 },
//     ],
//     'circles': [
//       { id: '1', question: 'What is the diameter of a circle?', options: ['Half the radius', 'Twice the radius', 'Equal to the radius', 'One-fourth the radius'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What is the center of a circle?', options: ['A chord', 'A point inside', 'An arc', 'The circumference'], correctAnswer: 1, points: 10 },
//     ],
//     'fractions': [
//       { id: '1', question: 'What is 1/2 + 1/4?', options: ['1/4', '3/4', '1/2', '1'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What is the simplest form of 4/8?', options: ['1/2', '2/4', '1/4', '4/8'], correctAnswer: 0, points: 10 },
//     ],
//     'decimal-numbers': [
//       { id: '1', question: 'What is 0.5 + 0.3?', options: ['0.2', '0.7', '0.8', '0.9'], correctAnswer: 2, points: 10 },
//       { id: '2', question: 'What is 1/4 as a decimal?', options: ['0.25', '0.5', '0.75', '1.0'], correctAnswer: 0, points: 10 },
//     ],
//     'data-handling': [
//       { id: '1', question: 'What is a pictograph?', options: ['A line graph', 'A picture representing data', 'A table of numbers', 'A pie chart'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What does a bar graph show?', options: ['Angles', 'Data comparison', 'Fractions', 'Ratios'], correctAnswer: 1, points: 10 },
//     ],
//     'perimeter-area': [
//       { id: '1', question: 'What is the perimeter of a square with side 4 cm?', options: ['8 cm', '12 cm', '16 cm', '20 cm'], correctAnswer: 2, points: 10 },
//       { id: '2', question: 'What is the area of a rectangle with length 5 cm and width 3 cm?', options: ['8 sq cm', '12 sq cm', '15 sq cm', '20 sq cm'], correctAnswer: 2, points: 10 },
//     ],
//     'patterns': [
//       { id: '1', question: 'What comes next in 2, 4, 6, 8?', options: ['9', '10', '11', '12'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What is a symmetric pattern?', options: ['A random design', 'A mirrored design', 'A circular design', 'A straight line'], correctAnswer: 1, points: 10 },
//     ],
//     'ratio-proportion': [
//       { id: '1', question: 'What is the ratio 10:20 simplified?', options: ['1:2', '1:3', '2:1', '3:1'], correctAnswer: 0, points: 10 },
//       { id: '2', question: 'If 2 kg costs $5, what is the cost of 6 kg?', options: ['10', '15', '20', '25'], correctAnswer: 1, points: 10 },
//     ],
//     'algebra': [
//       { id: '1', question: 'What is x in the equation x + 3 = 7?', options: ['3', '4', '5', '6'], correctAnswer: 1, points: 10 },
//       { id: '2', question: 'What is 2x + 1 if x = 2?', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 10 },
//     ],
//   };

//   useEffect(() => {
//     if (currentChapter !== null && !gameRef.current) {
//       const chapterId = course.chapters[currentChapter].id || course.chapters[currentChapter].componentPath;
//       const SceneClass = gameSceneMap[chapterId] || NumberGameScene; // Fallback to NumberGameScene if not found
//       gameRef.current = new Phaser.Game({
//         type: Phaser.AUTO,
//         width: 800,
//         height: 500,
//         parent: 'phaser-game-container',
//         scene: [SceneClass],
//         physics: {
//           default: 'arcade',
//           arcade: { gravity: {
//               y: 0,
//               x: 0
//           }, debug: false }
//         }
//       });
//     }

//     return () => {
//       if (gameRef.current) {
//         gameRef.current.destroy(true);
//         gameRef.current = null;
//       }
//     };
//   }, [currentChapter, course.chapters]);

//   const isChapterCompleted = (chapterIndex: number) => {
//     const chapter = course.chapters[chapterIndex];
//     return progress.some(p => p.chapterId === chapter.id && p.completed);
//   };

//   const getChapterScore = (chapterIndex: number) => {
//     const chapter = course.chapters[chapterIndex];
//     const chapterProgress = progress.find(p => p.chapterId === chapter.id && p.completed);
//     return chapterProgress?.score || 0;
//   };

//   const handleCompleteChapter = async () => {
//     if (currentChapter === null) return;
//     try {
//       const chapter = course.chapters[currentChapter];
//       await dbService.updateProgress({
//         studentId: user.id,
//         courseId: course.id,
//         chapterId: chapter.id,
//         completed: true,
//         completedAt: new Date(),
//       });
//       toast({
//         title: 'Chapter Completed! 🎉',
//         description: 'Great job! Ready for the quiz?',
//       });
//       setShowQuiz(true);
//       onProgressUpdate();
//     } catch (error) {
//       console.error('Failed to update progress:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to save progress.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleQuizSubmit = async () => {
//     if (currentChapter === null) return;
//     const questions = quizQuestions[course.chapters[currentChapter].id] || [];
//     let earned = 0;
//     let totalPoints = 0;

//     questions.forEach((question) => {
//       totalPoints += question.points;
//       const selectedAnswer = parseInt(quizAnswers[question.id] || '0');
//       if (selectedAnswer === question.correctAnswer) {
//         earned += question.points;
//       }
//     });

//     const percentage = totalPoints > 0 ? (earned / totalPoints) * 100 : 0;
//     setQuizScore(percentage);
//     setQuizSubmitted(true);

//     const chapter = course.chapters[currentChapter];
//     try {
//       await dbService.updateProgress({
//         studentId: user.id,
//         courseId: course.id,
//         chapterId: chapter.id,
//         completed: true,
//         score: percentage,
//         completedAt: new Date(),
//       });
//       await loadProgress();
//       toast({
//         title: 'Quiz Completed!',
//         description: `You scored ${Math.round(percentage)}%`,
//       });
//     } catch (error) {
//       console.error('Failed to save quiz progress:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to save quiz score.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const loadProgress = async () => {
//     try {
//       const studentProgress = await dbService.getStudentProgress(user.id);
//       const courseProgress = studentProgress.filter(p => p.courseId === course.id);
//       setProgress(courseProgress);
//     } catch (error) {
//       console.error('Failed to load progress:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to load progress.',
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleNextChapter = () => {
//     if (currentChapter === null || currentChapter >= course.chapters.length - 1) return;
//     setCurrentChapter(currentChapter + 1);
//     setShowQuiz(false);
//     setQuizSubmitted(false);
//     setQuizAnswers({});
//     setQuizScore(0);
//     if (gameRef.current) {
//       gameRef.current.destroy(true);
//       gameRef.current = null;
//     }
//   };

//   const getOverallProgress = () => {
//     const completedChapters = course.chapters.filter((_: any, index: number) => isChapterCompleted(index));
//     return (completedChapters.length / course.chapters.length) * 100;
//   };

//   if (!course.chapters.length) {
//     return (
//       <div className="min-h-screen bg-background p-4">
//         <div className="mx-auto max-w-4xl">
//           <Button variant="ghost" onClick={onBack} className="mb-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>
//           <Card>
//             <CardContent className="p-12 text-center">
//               <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//               <h2 className="text-xl font-semibold mb-2">No Content Available</h2>
//               <p className="text-muted-foreground">This course doesn't have any topics yet.</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   if (currentChapter === null) {
//     return (
//       <div className="min-h-screen bg-background p-4">
//         <div className="mx-auto max-w-4xl">
//           <Button variant="ghost" onClick={onBack} className="mb-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <BookOpen className="h-5 w-5" />
//                 {course.title} - Grade {course.grade}
//               </CardTitle>
//               <CardDescription>BSE Odisha Class 6 Mathematics Syllabus</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <span>Overall Progress</span>
//                   <span>{Math.round(getOverallProgress())}% Complete</span>
//                 </div>
//                 <Progress value={getOverallProgress()} className="h-2" />
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {course.chapters.map((chapter: any, index: number) => (
//                     <Card key={chapter.id} className="transition-all hover:shadow-lg cursor-pointer">
//                       <CardContent className="p-6">
//                         <div className="space-y-4">
//                           <div className="flex items-start justify-between">
//                             <div>
//                               <h3 className="font-semibold text-lg">{chapter.title}</h3>
//                               <p className="text-sm text-muted-foreground">
//                                 {isChapterCompleted(index) ? 'Completed' : 'Not Started'}
//                               </p>
//                             </div>
//                             <Badge variant="secondary">Chapter {index + 1}</Badge>
//                           </div>
//                           <div className="space-y-2">
//                             <div className="flex items-center justify-between text-sm">
//                               <span>Progress</span>
//                               <span>{isChapterCompleted(index) ? Math.round(getChapterScore(index)) : 0}%</span>
//                             </div>
//                             <Progress value={isChapterCompleted(index) ? getChapterScore(index) : 0} className="h-2" />
//                           </div>
//                           <Button
//                             className="w-full"
//                             onClick={() => setCurrentChapter(index)}
//                           >
//                             <Play className="mr-2 h-4 w-4" />
//                             {isChapterCompleted(index) ? 'Review Chapter' : 'Start Chapter'}
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="mx-auto max-w-4xl">
//         <div className="mb-6 flex items-center justify-between">
//           <Button variant="ghost" onClick={() => setCurrentChapter(null)}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Chapters
//           </Button>
//           <Badge variant="secondary">{course.title} - Grade {course.grade}</Badge>
//         </div>
        
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Trophy className="h-5 w-5" />
//               Course Progress
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between text-sm">
//                 <span>Overall Progress</span>
//                 <span>{Math.round(getOverallProgress())}% Complete</span>
//               </div>
//               <Progress value={getOverallProgress()} className="h-2" />
//               <div className="flex flex-wrap gap-2">
//                 {course.chapters.map((chapter: any, index: number) => (
//                   <Button
//                     key={chapter.id}
//                     variant={index === currentChapter ? 'default' : isChapterCompleted(index) ? 'secondary' : 'outline'}
//                     size="sm"
//                     onClick={() => {
//                       setCurrentChapter(index);
//                       setShowQuiz(false);
//                       setQuizSubmitted(false);
//                       setQuizAnswers({});
//                       setQuizScore(0);
//                     }}
//                     className="flex items-center gap-1"
//                   >
//                     {isChapterCompleted(index) && <CheckCircle className="h-3 w-3" />}
//                     {chapter.title}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         {!showQuiz ? (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <BookOpen className="h-5 w-5" />
//                 {course.chapters[currentChapter].title}
//               </CardTitle>
//               <CardDescription>
//                 Chapter {currentChapter + 1} of {course.chapters.length}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div id="phaser-game-container" className="w-full h-[500px] border rounded-lg"></div>
              
//               <div className="flex items-center justify-between pt-6 border-t">
//                 <div className="flex items-center gap-2">
//                   {isChapterCompleted(currentChapter) && (
//                     <>
//                       <CheckCircle className="h-5 w-5 text-green-500" />
//                       <span className="text-sm text-green-600">
//                         Completed - Score: {Math.round(getChapterScore(currentChapter))}%
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 <div className="space-x-2">
//                   {!isChapterCompleted(currentChapter) ? (
//                     <Button onClick={handleCompleteChapter}>
//                       Complete Chapter
//                     </Button>
//                   ) : (
//                     <>
//                       <Button variant="outline" onClick={() => setShowQuiz(true)}>
//                         Retake Quiz
//                       </Button>
//                       {currentChapter < course.chapters.length - 1 && (
//                         <Button onClick={handleNextChapter}>
//                           Next Chapter
//                         </Button>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ) : (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Brain className="h-5 w-5" />
//                 Chapter Quiz
//               </CardTitle>
//               <CardDescription>
//                 Test your understanding of {course.chapters[currentChapter].title}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {!quizSubmitted ? (
//                 <>
//                   {quizQuestions[course.chapters[currentChapter].id]?.length === 0 ? (
//                     <p className="text-center text-muted-foreground">No quiz questions available for this chapter.</p>
//                   ) : (
//                     quizQuestions[course.chapters[currentChapter].id].map((question, index) => (
//                       <div key={question.id} className="space-y-3">
//                         <h3 className="font-medium">
//                           {index + 1}. {question.question}
//                         </h3>
//                         <RadioGroup
//                           value={quizAnswers[question.id] || ''}
//                           onValueChange={(value) => setQuizAnswers(prev => ({ ...prev, [question.id]: value }))}
//                         >
//                           {question.options.map((option, optionIndex) => (
//                             <div key={optionIndex} className="flex items-center space-x-2">
//                               <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
//                               <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
//                             </div>
//                           ))}
//                         </RadioGroup>
//                       </div>
//                     ))
//                   )}
//                   <div className="flex justify-end pt-4">
//                     <Button 
//                       onClick={handleQuizSubmit}
//                       disabled={quizQuestions[course.chapters[currentChapter].id]?.length === 0 || 
//                                 Object.keys(quizAnswers).length < quizQuestions[course.chapters[currentChapter].id].length}
//                     >
//                       Submit Quiz
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center space-y-4">
//                   <div className="p-8">
//                     <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
//                     <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
//                     <p className="text-xl">Your Score: {Math.round(quizScore)}%</p>
//                     <p className="text-muted-foreground mt-2">
//                       {quizScore >= 80 ? 'Excellent work!' : quizScore >= 60 ? 'Good job!' : 'Keep practicing!'}
//                     </p>
//                   </div>
//                   <div className="flex justify-center space-x-2">
//                     <Button variant="outline" onClick={() => {
//                       setShowQuiz(false);
//                       setQuizSubmitted(false);
//                       setQuizAnswers({});
//                       setQuizScore(0);
//                     }}>
//                       Review Chapter
//                     </Button>
//                     {currentChapter < course.chapters.length - 1 && (
//                       <Button onClick={handleNextChapter}>
//                         Next Chapter
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MathsModule;


import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, Trophy, BookOpen, Brain, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Phaser from 'phaser';
import { dbService } from '@/lib/db';

// Phaser game scenes
class NumberGameScene extends Phaser.Scene {
  private numberText!: Phaser.GameObjects.Text;
  private currentNumber!: number;
  private digitBoxes: Phaser.GameObjects.Rectangle[] = [];
  private digitTexts: Phaser.GameObjects.Text[] = [];
  private placeValueLabels: Phaser.GameObjects.Text[] = [];

  constructor() {
    super({ key: 'NumberGameScene' });
  }

  init() {
    this.currentNumber = Phaser.Math.Between(10000, 99999);
  }

  create() {
    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.add.text(400, 50, 'Large Numbers Game', { fontSize: '32px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
    this.numberText = this.add.text(400, 100, this.formatNumber(this.currentNumber), { fontSize: '48px', color: '#4e54c8', fontFamily: 'Arial' }).setOrigin(0.5);
    this.add.text(400, 150, this.numberToWords(this.currentNumber), { fontSize: '20px', color: '#6c757d', fontFamily: 'Arial' }).setOrigin(0.5);
    this.createDigitBreakdown();
    const generateButton = this.add.rectangle(400, 350, 200, 50, 0x6c5ce7).setInteractive();
    this.add.text(400, 350, 'Generate New Number', { fontSize: '16px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
    generateButton.on('pointerdown', () => {
      this.currentNumber = Phaser.Math.Between(10000, 99999);
      this.numberText.setText(this.formatNumber(this.currentNumber));
      this.updateDigitBreakdown();
    });
    this.add.text(400, 420, 'Explore place values of large numbers!', {
      fontSize: '16px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: 600 }
    }).setOrigin(0.5);
  }

  private formatNumber(num: number): string {
    return num.toLocaleString('en-IN');
  }

  private numberToWords(num: number): string {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if (num === 0) return 'zero';
    let words = '';
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      words += ones[thousands] + ' thousand ';
      num %= 1000;
    }
    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + ' hundred ';
      num %= 100;
    }
    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    } else if (num >= 10) {
      words += teens[num - 10] + ' ';
      num = 0;
    }
    if (num > 0) words += ones[num] + ' ';
    return words.trim();
  }

  private createDigitBreakdown() {
    const digits = this.currentNumber.toString().split('');
    const placeValues = ['Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
    for (let i = 0; i < 5; i++) {
      const x = 200 + (i * 100);
      const y = 250;
      const box = this.add.rectangle(x, y, 60, 60, 0x4e54c8);
      this.digitBoxes.push(box);
      const digitText = this.add.text(x, y, i < digits.length ? digits[i] : '0', { fontSize: '24px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
      this.digitTexts.push(digitText);
      const label = this.add.text(x, y + 40, placeValues[i], { fontSize: '12px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
      this.placeValueLabels.push(label);
    }
  }

  private updateDigitBreakdown() {
    const digits = this.currentNumber.toString().split('');
    for (let i = 0; i < 5; i++) {
      this.digitTexts[i].setText(i < digits.length ? digits[i] : '0');
    }
  }
}

class AdditionSubtractionGameScene extends Phaser.Scene {
  private num1Text!: Phaser.GameObjects.Text;
  private num2Text!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;
  private operator!: string;

  constructor() {
    super({ key: 'AdditionSubtractionGameScene' });
  }

  init() {
    this.operator = Phaser.Math.Between(0, 1) ? '+' : '-';
  }

  create() {
    this.cameras.main.setBackgroundColor(0x98fb98);
    this.add.text(400, 50, 'Addition/Subtraction Game', { fontSize: '32px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
    const num1 = Phaser.Math.Between(1000, 9999);
    const num2 = Phaser.Math.Between(1000, num1);
    this.num1Text = this.add.text(350, 150, num1.toString(), { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' });
    this.add.text(400, 150, this.operator, { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' });
    this.num2Text = this.add.text(450, 150, num2.toString(), { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' });
    this.resultText = this.add.text(400, 250, '=', { fontSize: '48px', color: '#228b22', fontFamily: 'Arial' }).setOrigin(0.5);
    const generateButton = this.add.rectangle(400, 350, 200, 50, 0x228b22).setInteractive();
    this.add.text(400, 350, 'New Problem', { fontSize: '16px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
    generateButton.on('pointerdown', () => {
      const newNum1 = Phaser.Math.Between(1000, 9999);
      const newNum2 = Phaser.Math.Between(1000, newNum1);
      this.num1Text.setText(newNum1.toString());
      this.num2Text.setText(newNum2.toString());
      this.operator = Phaser.Math.Between(0, 1) ? '+' : '-';
    });
    this.add.text(400, 420, 'Practice addition and subtraction of large numbers!', {
      fontSize: '16px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: 600 }
    }).setOrigin(0.5);
  }
}

class MultiplicationDivisionGameScene extends Phaser.Scene {
  private num1Text!: Phaser.GameObjects.Text;
  private num2Text!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;
  private operator!: string;

  constructor() {
    super({ key: 'MultiplicationDivisionGameScene' });
  }

  init() {
    this.operator = Phaser.Math.Between(0, 1) ? '×' : '÷';
  }

  create() {
    this.cameras.main.setBackgroundColor(0xffa500);
    this.add.text(400, 50, 'Multiplication/Division Game', { fontSize: '32px', color: '#000', fontFamily: 'Arial' }).setOrigin(0.5);
    const num1 = Phaser.Math.Between(10, 99);
    const num2 = Phaser.Math.Between(2, 9);
    this.num1Text = this.add.text(350, 150, num1.toString(), { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' });
    this.add.text(400, 150, this.operator, { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' });
    this.num2Text = this.add.text(450, 150, num2.toString(), { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' });
    this.resultText = this.add.text(400, 250, '=', { fontSize: '48px', color: '#ff4500', fontFamily: 'Arial' }).setOrigin(0.5);
    const generateButton = this.add.rectangle(400, 350, 200, 50, 0xff4500).setInteractive();
    this.add.text(400, 350, 'New Problem', { fontSize: '16px', color: '#fff', fontFamily: 'Arial' }).setOrigin(0.5);
    generateButton.on('pointerdown', () => {
      const newNum1 = Phaser.Math.Between(10, 99);
      const newNum2 = Phaser.Math.Between(2, 9);
      this.num1Text.setText(newNum1.toString());
      this.num2Text.setText(newNum2.toString());
      this.operator = Phaser.Math.Between(0, 1) ? '×' : '÷';
    });
    this.add.text(400, 420, 'Practice multiplication and division!', {
      fontSize: '16px', color: '#000', fontFamily: 'Arial', align: 'center', wordWrap: { width: 600 }
    }).setOrigin(0.5);
  }
}

class MultiplesFactorsGameScene extends Phaser.Scene {
  constructor() { super({ key: 'MultiplesFactorsGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xdda0dd); this.add.text(400, 250, 'Multiples & Factors Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class IntegersGameScene extends Phaser.Scene {
  constructor() { super({ key: 'IntegersGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xadd8e6); this.add.text(400, 250, 'Integers Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class GeometryBasicsGameScene extends Phaser.Scene {
  constructor() { super({ key: 'GeometryBasicsGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xffd700); this.add.text(400, 250, 'Geometry Basics Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class AnglesGameScene extends Phaser.Scene {
  constructor() { super({ key: 'AnglesGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0x98fb98); this.add.text(400, 250, 'Angles Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class TrianglesQuadrilateralsGameScene extends Phaser.Scene {
  constructor() { super({ key: 'TrianglesQuadrilateralsGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xff69b4); this.add.text(400, 250, 'Triangles & Quadrilaterals Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class CirclesGameScene extends Phaser.Scene {
  constructor() { super({ key: 'CirclesGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0x20b2aa); this.add.text(400, 250, 'Circles Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class FractionsGameScene extends Phaser.Scene {
  constructor() { super({ key: 'FractionsGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xffa07a); this.add.text(400, 250, 'Fractions Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class DecimalNumbersGameScene extends Phaser.Scene {
  constructor() { super({ key: 'DecimalNumbersGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0x9370db); this.add.text(400, 250, 'Decimal Numbers Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class DataHandlingGameScene extends Phaser.Scene {
  constructor() { super({ key: 'DataHandlingGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0x4682b4); this.add.text(400, 250, 'Data Handling Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class PerimeterAreaGameScene extends Phaser.Scene {
  constructor() { super({ key: 'PerimeterAreaGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0x9acd32); this.add.text(400, 250, 'Perimeter & Area Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class PatternsGameScene extends Phaser.Scene {
  constructor() { super({ key: 'PatternsGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xd3d3d3); this.add.text(400, 250, 'Patterns Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class RatioProportionGameScene extends Phaser.Scene {
  constructor() { super({ key: 'RatioProportionGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0x8a2be2); this.add.text(400, 250, 'Ratio & Proportion Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}
class AlgebraGameScene extends Phaser.Scene {
  constructor() { super({ key: 'AlgebraGameScene' }); }
  create() { this.cameras.main.setBackgroundColor(0xdeb887); this.add.text(400, 250, 'Algebra Game', { fontSize: '32px', color: '#000' }).setOrigin(0.5); }
}

interface MathsModuleProps {
  course: any;
  user: any;
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

const gameSceneMap: Record<string, typeof Phaser.Scene> = {
  'numbers': NumberGameScene,
  'addition-subtraction': AdditionSubtractionGameScene,
  'multiplication-division': MultiplicationDivisionGameScene,
  'multiples-factors': MultiplesFactorsGameScene,
  'integers': IntegersGameScene,
  'geometry-basics': GeometryBasicsGameScene,
  'angles': AnglesGameScene,
  'triangles-quadrilaterals': TrianglesQuadrilateralsGameScene,
  'circles': CirclesGameScene,
  'fractions': FractionsGameScene,
  'decimal-numbers': DecimalNumbersGameScene,
  'data-handling': DataHandlingGameScene,
  'perimeter-area': PerimeterAreaGameScene,
  'patterns': PatternsGameScene,
  'ratio-proportion': RatioProportionGameScene,
  'algebra': AlgebraGameScene,
};

const MathsModule = ({ course, user, onBack, onProgressUpdate }: MathsModuleProps) => {
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const { toast } = useToast();
  const gameRef = useRef<Phaser.Game | null>(null);

  const quizQuestions: Record<string, Question[]> = {
    'numbers': [
      { id: '1', question: 'What is the place value of 5 in 45,321?', options: ['Ones', 'Tens', 'Hundreds', 'Thousands'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'How do you write "Three Lakh Fifty Thousand" in numerals?', options: ['3,50,000', '3,05,000', '35,000', '3,500'], correctAnswer: 0, points: 10 },
      { id: '3', question: 'What is the smallest 5-digit number?', options: ['10,000', '99,999', '00,001', '10,001'], correctAnswer: 0, points: 10 },
    ],
    'addition-subtraction': [
      { id: '1', question: 'What is 45,678 + 32,456?', options: ['78,134', '77,134', '78,034', '77,034'], correctAnswer: 0, points: 10 },
      { id: '2', question: 'Which property states that a + b = b + a?', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], correctAnswer: 1, points: 10 },
    ],
    'multiplication-division': [
      { id: '1', question: 'What is 345 × 100?', options: ['3,450', '34,500', '345,000', '3,045'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What is 8,475 ÷ 15?', options: ['565', '555', '565.5', '565.0'], correctAnswer: 0, points: 10 },
    ],
    'multiples-factors': [
      { id: '1', question: 'Is 7 a prime number?', options: ['Yes', 'No'], correctAnswer: 0, points: 10 },
      { id: '2', question: 'What is the LCM of 4 and 6?', options: ['12', '10', '8', '6'], correctAnswer: 0, points: 10 },
    ],
    'integers': [
      { id: '1', question: 'What is -3 + 5?', options: ['2', '-2', '8', '-8'], correctAnswer: 0, points: 10 },
      { id: '2', question: 'What is -2 - 3?', options: ['-5', '-1', '1', '5'], correctAnswer: 0, points: 10 },
    ],
    'geometry-basics': [
      { id: '1', question: 'What is a line segment?', options: ['A straight path with no endpoints', 'A straight path with two endpoints', 'A closed curve', 'A curved line'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What are parallel lines?', options: ['Lines that intersect', 'Lines that never meet', 'Lines that form a right angle', 'Curved lines'], correctAnswer: 1, points: 10 },
    ],
    'angles': [
      { id: '1', question: 'What is a right angle?', options: ['90°', '180°', '45°', '360°'], correctAnswer: 0, points: 10 },
      { id: '2', question: 'What is an obtuse angle?', options: ['Less than 90°', '90°', 'More than 90° but less than 180°', '180°'], correctAnswer: 2, points: 10 },
    ],
    'triangles-quadrilaterals': [
      { id: '1', question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What shape has four equal sides?', options: ['Rectangle', 'Square', 'Trapezium', 'Parallelogram'], correctAnswer: 1, points: 10 },
    ],
    'circles': [
      { id: '1', question: 'What is the diameter of a circle?', options: ['Half the radius', 'Twice the radius', 'Equal to the radius', 'One-fourth the radius'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What is the center of a circle?', options: ['A chord', 'A point inside', 'An arc', 'The circumference'], correctAnswer: 1, points: 10 },
    ],
    'fractions': [
      { id: '1', question: 'What is 1/2 + 1/4?', options: ['1/4', '3/4', '1/2', '1'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What is the simplest form of 4/8?', options: ['1/2', '2/4', '1/4', '4/8'], correctAnswer: 0, points: 10 },
    ],
    'decimal-numbers': [
      { id: '1', question: 'What is 0.5 + 0.3?', options: ['0.2', '0.7', '0.8', '0.9'], correctAnswer: 2, points: 10 },
      { id: '2', question: 'What is 1/4 as a decimal?', options: ['0.25', '0.5', '0.75', '1.0'], correctAnswer: 0, points: 10 },
    ],
    'data-handling': [
      { id: '1', question: 'What is a pictograph?', options: ['A line graph', 'A picture representing data', 'A table of numbers', 'A pie chart'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What does a bar graph show?', options: ['Angles', 'Data comparison', 'Fractions', 'Ratios'], correctAnswer: 1, points: 10 },
    ],
    'perimeter-area': [
      { id: '1', question: 'What is the perimeter of a square with side 4 cm?', options: ['8 cm', '12 cm', '16 cm', '20 cm'], correctAnswer: 2, points: 10 },
      { id: '2', question: 'What is the area of a rectangle with length 5 cm and width 3 cm?', options: ['8 sq cm', '12 sq cm', '15 sq cm', '20 sq cm'], correctAnswer: 2, points: 10 },
    ],
    'patterns': [
      { id: '1', question: 'What comes next in 2, 4, 6, 8?', options: ['9', '10', '11', '12'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What is a symmetric pattern?', options: ['A random design', 'A mirrored design', 'A circular design', 'A straight line'], correctAnswer: 1, points: 10 },
    ],
    'ratio-proportion': [
      { id: '1', question: 'What is the ratio 10:20 simplified?', options: ['1:2', '1:3', '2:1', '3:1'], correctAnswer: 0, points: 10 },
      { id: '2', question: 'If 2 kg costs $5, what is the cost of 6 kg?', options: ['10', '15', '20', '25'], correctAnswer: 1, points: 10 },
    ],
    'algebra': [
      { id: '1', question: 'What is x in the equation x + 3 = 7?', options: ['3', '4', '5', '6'], correctAnswer: 1, points: 10 },
      { id: '2', question: 'What is 2x + 1 if x = 2?', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 10 },
    ],
  };

  useEffect(() => {
    if (currentChapter !== null && !gameRef.current && !showQuiz) {
      const chapterId = course.chapters[currentChapter].id || course.chapters[currentChapter].componentPath;
      const SceneClass = gameSceneMap[chapterId] || NumberGameScene;
      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 500,
        parent: 'phaser-game-container',
        scene: [SceneClass],
        physics: {
          default: 'arcade',
          arcade: { gravity: {
              y: 0,
              x: 0
          }, debug: false }
        }
      });
    } else if (showQuiz && gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [currentChapter, course.chapters, showQuiz]);

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
    try {
      const chapter = course.chapters[currentChapter];
      await dbService.updateProgress({
        studentId: user.id,
        courseId: course.id,
        chapterId: chapter.id,
        completed: true,
        completedAt: new Date(),
      });
      console.log('Chapter completed, setting showQuiz to true');
      setShowQuiz(true); // Trigger quiz display
      onProgressUpdate();
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to save progress. Please try again.',
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

  const handleNextChapter = () => {
    if (currentChapter === null || currentChapter >= course.chapters.length - 1) return;
    setCurrentChapter(currentChapter + 1);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
    setQuizScore(0);
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
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
                {course.title} - Grade {course.grade}
              </CardTitle>
              <CardDescription>BSE Odisha Class 6 Mathematics Syllabus</CardDescription>
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
                            <Badge variant="secondary">Chapter {index + 1}</Badge>
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
                            {isChapterCompleted(index) ? 'Review Chapter' : 'Start Chapter'}
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
            Back to Chapters
          </Button>
          <Badge variant="secondary">{course.title} - Grade {course.grade}</Badge>
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
                Chapter {currentChapter + 1} of {course.chapters.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div id="phaser-game-container" className="w-full h-[500px] border rounded-lg"></div>
              
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
                      Complete Chapter
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setShowQuiz(true)}>
                        Retake Quiz
                      </Button>
                      {currentChapter < course.chapters.length - 1 && (
                        <Button onClick={handleNextChapter}>
                          Next Chapter
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
                Chapter Quiz
              </CardTitle>
              <CardDescription>
                Test your understanding of {course.chapters[currentChapter].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!quizSubmitted ? (
                <>
                  {quizQuestions[course.chapters[currentChapter].id]?.length === 0 ? (
                    <p className="text-center text-muted-foreground">No quiz questions available for this chapter.</p>
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
                      Review Chapter
                    </Button>
                    {currentChapter < course.chapters.length - 1 && (
                      <Button onClick={handleNextChapter}>
                        Next Chapter
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

export default MathsModule;