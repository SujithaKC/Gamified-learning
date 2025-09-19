// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';
// import { ArrowLeft, CheckCircle, Trophy, BookOpen, Brain } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { dbService, Chapter, Question } from '@/lib/db';
// import { User } from '@/lib/auth';
// import PhysicsGame from './physics/PhysicsGame';

// interface LearningModuleProps {
//   course: any;
//   user: User;
//   onBack: () => void;
//   onProgressUpdate: () => void;
// }

// const LearningModule = ({ course, user, onBack, onProgressUpdate }: LearningModuleProps) => {
//   const [currentChapter, setCurrentChapter] = useState(0);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [progress, setProgress] = useState<any[]>([]);
//   const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [quizScore, setQuizScore] = useState(0);
//   const { toast } = useToast();

//   // Sample quiz questions (in real app, these would come from the assignments)
//   const sampleQuestions: Question[] = [
//     {
//       id: '1',
//       question: 'What did you learn from this chapter?',
//       options: [
//         'Basic concepts and fundamentals',
//         'Advanced applications',
//         'Practical examples',
//         'All of the above'
//       ],
//       correctAnswer: 3,
//       points: 10
//     },
//     {
//       id: '2',
//       question: 'How well do you understand the material?',
//       options: [
//         'Very well - I can teach others',
//         'Well - I understand most concepts',
//         'Partially - I need more practice',
//         'Poorly - I need to review'
//       ],
//       correctAnswer: 0,
//       points: 10
//     }
//   ];

//   useEffect(() => {
//     loadProgress();
//   }, [course.id, user.id]);

//   const loadProgress = async () => {
//     const studentProgress = await dbService.getStudentProgress(user.id);
//     const courseProgress = studentProgress.filter(p => p.courseId === course.id);
//     setProgress(courseProgress);
//   };

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
//     const chapter = course.chapters[currentChapter];
    
//     await dbService.updateProgress({
//       studentId: user.id,
//       courseId: course.id,
//       chapterId: chapter.id,
//       completed: true,
//       completedAt: new Date(),
//     });

//     toast({
//       title: 'Chapter Completed! 🎉',
//       description: 'Great job! Ready for the quiz?',
//     });

//     setShowQuiz(true);
//     onProgressUpdate();
//   };

//   const handleQuizSubmit = async () => {
//     let score = 0;
//     const totalQuestions = sampleQuestions.length;

//     sampleQuestions.forEach((question) => {
//       const selectedAnswer = parseInt(quizAnswers[question.id] || '0');
//       if (selectedAnswer === question.correctAnswer) {
//         score += question.points;
//       }
//     });

//     const percentage = (score / (totalQuestions * 10)) * 100;
//     setQuizScore(percentage);
//     setQuizSubmitted(true);

//     const chapter = course.chapters[currentChapter];
//     await dbService.updateProgress({
//       studentId: user.id,
//       courseId: course.id,
//       chapterId: chapter.id,
//       completed: true,
//       score: percentage,
//       completedAt: new Date(),
//     });

//     await loadProgress();

//     toast({
//       title: 'Quiz Completed!',
//       description: `You scored ${Math.round(percentage)}%`,
//     });
//   };

//   const handleNextChapter = () => {
//     if (currentChapter < course.chapters.length - 1) {
//       setCurrentChapter(currentChapter + 1);
//       setShowQuiz(false);
//       setQuizSubmitted(false);
//       setQuizAnswers({});
//       setQuizScore(0);
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
//               <p className="text-muted-foreground">This course doesn't have any chapters yet.</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <Button variant="ghost" onClick={onBack}>
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Button>
//           <Badge variant="secondary">{course.subject} - Grade {course.grade}</Badge>
//         </div>

//         {/* Progress Overview */}
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
//                 {course.chapters.map((chapter: Chapter, index: number) => (
//                   <Button
//                     key={chapter.id}
//                     variant={index === currentChapter ? 'default' : isChapterCompleted(index) ? 'secondary' : 'outline'}
//                     size="sm"
//                     onClick={() => {
//                       setCurrentChapter(index);
//                       setShowQuiz(false);
//                       setQuizSubmitted(false);
//                     }}
//                     className="flex items-center gap-1"
//                   >
//                     {isChapterCompleted(index) && <CheckCircle className="h-3 w-3" />}
//                     Chapter {index + 1}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Main Content */}
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
//               {course.chapters[currentChapter].type === 'interactive' ? (
//                 <div className="w-full h-[600px] relative">
//                   <PhysicsGame 
//                     gameType={course.chapters[currentChapter].componentPath}
//                     onComplete={() => handleCompleteChapter()}
//                   />
//                 </div>
//               ) : (
//                 <div className="prose max-w-none">
//                   <div className="whitespace-pre-wrap text-foreground leading-relaxed">
//                     {course.chapters[currentChapter].content}
//                   </div>
//                 </div>
//               )}

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
//                   {sampleQuestions.map((question, index) => (
//                     <div key={question.id} className="space-y-3">
//                       <h3 className="font-medium">
//                         {index + 1}. {question.question}
//                       </h3>
//                       <RadioGroup
//                         value={quizAnswers[question.id] || ''}
//                         onValueChange={(value) => setQuizAnswers(prev => ({ ...prev, [question.id]: value }))}
//                       >
//                         {question.options.map((option, optionIndex) => (
//                           <div key={optionIndex} className="flex items-center space-x-2">
//                             <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
//                             <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </div>
//                   ))}
                  
//                   <div className="flex justify-end pt-4">
//                     <Button 
//                       onClick={handleQuizSubmit}
//                       disabled={Object.keys(quizAnswers).length < sampleQuestions.length}
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

// export default LearningModule;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, Trophy, BookOpen, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dbService, Chapter, Question } from '@/lib/db';
import { User } from '@/lib/auth';

interface LearningModuleProps {
  course: any;
  user: User;
  onBack: () => void;
  onProgressUpdate: () => void;
}

const KineticEnergyGame = ({ onComplete }: { onComplete: () => void }) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kinetic Energy Learning Game</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #87ceeb;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    canvas {
      display: block;
      margin: auto;
      touch-action: none;
    }
    #controlPanel {
      position: fixed;
      bottom: 2vh;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.7);
      border-radius: 12px;
      padding: 1vh 2vw;
      display: flex;
      justify-content: center;
      gap: 1vw;
      z-index: 10;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    .control-button {
      background: linear-gradient(180deg, #4a90e2, #357abd);
      border: 2px solid #2a5c99;
      border-radius: 8px;
      padding: 1vh 2vw;
      font-size: 2.5vw;
      color: #fff;
      text-align: center;
      cursor: pointer;
      user-select: none;
      touch-action: manipulation;
      transition: background 0.2s, transform 0.1s;
    }
    .control-button:hover {
      background: linear-gradient(180deg, #5aa1f2, #4681c8);
      transform: scale(1.05);
    }
    .control-button:active {
      transform: scale(0.95);
    }
    @media (max-width: 600px) {
      .control-button {
        font-size: 4vw;
        padding: 1.5vh 3vw;
      }
      #controlPanel {
        padding: 1vh 1vw;
        gap: 0.5vw;
      }
    }
  </style>
</head>
<body>
  <div id="controlPanel" style="display: none;">
    <div id="velocityUp" class="control-button">+ Vel</div>
    <div id="velocityDown" class="control-button">- Vel</div>
    <div id="massUp" class="control-button">+ Mass</div>
    <div id="massDown" class="control-button">- Mass</div>
    <div id="launch" class="control-button">Launch</div>
    <div id="finishGame" class="control-button">Finish Game</div>
  </div>
  <script>
    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
      },
      backgroundColor: '#87ceeb',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 }, debug: false }
      },
      scene: { preload, create, update }
    };

    let ball, cursors, velocityText, massText, keText, infoPanel, conceptPanel, ground;
    let velocity = 200;
    let mass = 2;
    let tutorialShown = false;
    let explanationTimer = 0;

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
      this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
    }

    function toggleButtons(show) {
      document.getElementById('controlPanel').style.display = show ? 'flex' : 'none';
    }

    function create() {
      ground = this.physics.add.staticImage(this.scale.width / 2, this.scale.height - 20, 'ground')
        .setScale(this.scale.width / 400)
        .refreshBody();

      ball = this.physics.add.image(100, this.scale.height - 100, 'ball');
      ball.setBounce(0.8);
      ball.setCollideWorldBounds(true);
      ball.mass = mass;

      this.physics.add.collider(ball, ground);

      const fontSize = Math.min(this.scale.width * 0.03, 20) + 'px';
      velocityText = this.add.text(20, 20, 'Velocity: ' + velocity, { font: fontSize + ' Arial', fill: '#000' });
      massText = this.add.text(20, 50, 'Mass: ' + mass, { font: fontSize + ' Arial', fill: '#000' });
      keText = this.add.text(20, 80, 'K.E: 0 J', { font: fontSize + ' Arial', fill: '#000' });

      infoPanel = this.add.text(this.scale.width / 2, this.scale.height / 4,
        'Welcome to the Kinetic Energy Learning Game!\\n\\n' +
        'Kinetic Energy is the energy of motion.\\n' +
        'It depends on how HEAVY something is (mass)\\n' +
        'and how FAST it moves (velocity).\\n\\n' +
        'Controls:\\n' +
        ' ➡️ / ⬅️ or buttons: Change velocity\\n' +
        ' ⬆️ / ⬇️ or buttons: Change mass\\n' +
        ' SPACE or Launch button: Launch ball\\n' +
        ' ENTER or tap screen: Start learning!',
        { font: Math.min(this.scale.width * 0.025, 18) + 'px Arial', fill: '#000', backgroundColor: '#fff', padding: { x: 10, y: 10 }, wordWrap: { width: this.scale.width * 0.8 } }
      ).setOrigin(0.5, 0.5);

      conceptPanel = this.add.text(this.scale.width / 2, 100, '', {
        font: Math.min(this.scale.width * 0.025, 18) + 'px Arial',
        fill: '#000',
        backgroundColor: '#fff',
        padding: { x: 8, y: 8 },
        wordWrap: { width: this.scale.width * 0.8 },
        align: 'center'
      });
      conceptPanel.setOrigin(0.5, 0);
      conceptPanel.setVisible(false);

      cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown-ENTER', () => {
        if (!tutorialShown) {
          infoPanel.setVisible(false);
          conceptPanel.setVisible(true);
          tutorialShown = true;
          toggleButtons(true);
        }
      });

      this.input.on('pointerdown', () => {
        if (!tutorialShown) {
          infoPanel.setVisible(false);
          conceptPanel.setVisible(true);
          tutorialShown = true;
          toggleButtons(true);
        }
      });

      document.getElementById('velocityUp').addEventListener('click', () => {
        if (tutorialShown) {
          velocity += 5;
          velocityText.setText('Velocity: ' + velocity);
        }
      });
      document.getElementById('velocityDown').addEventListener('click', () => {
        if (tutorialShown && velocity > 0) {
          velocity = Math.max(0, velocity - 5);
          velocityText.setText('Velocity: ' + velocity);
        }
      });
      document.getElementById('massUp').addEventListener('click', () => {
        if (tutorialShown) {
          mass += 1;
          massText.setText('Mass: ' + mass);
          ball.mass = mass;
        }
      });
      document.getElementById('massDown').addEventListener('click', () => {
        if (tutorialShown && mass > 1) {
          mass -= 1;
          massText.setText('Mass: ' + mass);
          ball.mass = mass;
        }
      });
      document.getElementById('launch').addEventListener('click', () => {
        if (tutorialShown) {
          ball.setVelocityX(velocity);
          ball.setVelocityY(-200);
        }
      });
      document.getElementById('finishGame').addEventListener('click', () => {
        window.parent.postMessage('finishGame', '*');
      });

      toggleButtons(false);
    }

    function update(time) {
      if (!tutorialShown) return;

      ground.setPosition(this.scale.width / 2, this.scale.height - 20);
      ground.setScale(this.scale.width / 400).refreshBody();

      if (cursors.left.isDown) {
        velocity = Math.max(0, velocity - 5);
        velocityText.setText('Velocity: ' + velocity);
      } else if (cursors.right.isDown) {
        velocity += 5;
        velocityText.setText('Velocity: ' + velocity);
      }

      if (cursors.up.isDown) {
        mass += 1;
        massText.setText('Mass: ' + mass);
        ball.mass = mass;
      } else if (cursors.down.isDown) {
        if (mass > 1) mass -= 1;
        massText.setText('Mass: ' + mass);
        ball.mass = mass;
      }

      if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
        ball.setVelocityX(velocity);
        ball.setVelocityY(-200);
      }

      const ke = 0.5 * mass * Math.pow(ball.body.velocity.length() / 50, 2);
      keText.setText('K.E: ' + ke.toFixed(2) + ' J');

      explanationTimer += 1;
      if (explanationTimer % 30 === 0) {
        if (velocity > 300) {
          conceptPanel.setText('⚡ The ball is very fast!\\nBecause velocity is squared in the formula, KE grows a lot when speed increases.');
        } else if (mass > 5) {
          conceptPanel.setText('💪 The ball is heavy now.\\nEven at the same speed, a heavier ball has more kinetic energy.');
        } else {
          conceptPanel.setText('🔎 Try changing mass and velocity.\\nNotice how the KE number changes when you launch the ball!');
        }
      }

      velocityText.setFontSize(Math.min(this.scale.width * 0.03, 20));
      massText.setFontSize(Math.min(this.scale.width * 0.03, 20));
      keText.setFontSize(Math.min(this.scale.width * 0.03, 20));
      infoPanel.setFontSize(Math.min(this.scale.width * 0.025, 18));
      conceptPanel.setFontSize(Math.min(this.scale.width * 0.025, 18));
      infoPanel.setPosition(this.scale.width / 2, this.scale.height / 4);
      conceptPanel.setPosition(this.scale.width / 2, 100);
    }
  </script>
</body>
</html>
  `;

  return (
    <div className="relative">
      <iframe
        srcDoc={htmlContent}
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="Kinetic Energy Game"
        onLoad={(e) => {
          window.addEventListener('message', (event) => {
            if (event.data === 'finishGame') {
              onComplete();
            }
          });
        }}
      />
    </div>
  );
};

const InteractiveModule = ({ gameType, onComplete }: { gameType: string; onComplete: () => void }) => {
  let src = '';
  switch (gameType) {
    case 'physics':
      return <KineticEnergyGame onComplete={onComplete} />;
    case 'chemistry':
      src = 'https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_en.html';
      break;
    case 'maths':
      src = 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_en.html';
      break;
    case 'geography':
      src = 'https://world-geography-games.com/world/continents/index.html';
      break;
    case 'biology':
      src = 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_en.html';
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

const LearningModule = ({ course, user, onBack, onProgressUpdate }: LearningModuleProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const { toast } = useToast();

  // Subject-specific quiz questions
  const quizQuestions: Record<string, Question[]> = {
    'kinetic-energy': [
      {
        id: '1',
        question: 'What is kinetic energy?',
        options: [
          'Energy stored in an object',
          'Energy of motion',
          'Energy from heat',
          'Energy from light'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'How does increasing velocity affect kinetic energy?',
        options: [
          'It decreases linearly',
          'It increases linearly',
          'It increases quadratically',
          'It has no effect'
        ],
        correctAnswer: 2,
        points: 10
      }
    ],
    'basic-chemistry': [
      {
        id: '1',
        question: 'What is an atom?',
        options: [
          'A type of molecule',
          'The smallest unit of an element',
          'A chemical reaction',
          'A type of bond'
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'What gas do plants use in photosynthesis?',
        options: [
          'Oxygen',
          'Nitrogen',
          'Carbon dioxide',
          'Hydrogen'
        ],
        correctAnswer: 2,
        points: 10
      }
    ],
    'basic-algebra': [
      {
        id: '1',
        question: 'What is the value of x in the equation 2x + 3 = 7?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'What does the slope of a line represent?',
        options: [
          'The y-intercept',
          'The rate of change',
          'The x-intercept',
          'The line length'
        ],
        correctAnswer: 1,
        points: 10
      }
    ],
    'world-geography': [
      {
        id: '1',
        question: 'Which continent is the largest by land area?',
        options: ['Africa', 'Asia', 'Australia', 'Europe'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'What is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 1,
        points: 10
      }
    ],
    'basic-biology': [
      {
        id: '1',
        question: 'What is the primary source of energy for Earth’s climate system?',
        options: ['The Moon', 'The Sun', 'The Earth’s core', 'Wind'],
        correctAnswer: 1,
        points: 10
      },
      {
        id: '2',
        question: 'What is the basic unit of life?',
        options: ['Atom', 'Molecule', 'Cell', 'Tissue'],
        correctAnswer: 2,
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
    if (currentChapter < course.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setShowQuiz(false);
      setQuizSubmitted(false);
      setQuizAnswers({});
      setQuizScore(0);
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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Badge variant="secondary">{course.subject} - Grade {course.grade}</Badge>
        </div>

        {/* Progress Overview */}
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
                {course.chapters.map((chapter: Chapter, index: number) => (
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

        {/* Main Content */}
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
              {course.chapters[currentChapter].type === 'interactive' ? (
                <div className="w-full h-[600px] relative">
                  <InteractiveModule 
                    gameType={course.chapters[currentChapter].componentPath}
                    onComplete={handleCompleteChapter}
                  />
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {course.chapters[currentChapter].content}
                  </div>
                </div>
              )}

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

export default LearningModule;