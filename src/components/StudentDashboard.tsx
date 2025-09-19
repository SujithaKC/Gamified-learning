// // import { useState, useEffect } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Progress } from '@/components/ui/progress';
// // import { Badge } from '@/components/ui/badge';
// // import { BookOpen, Trophy, Target, LogOut, Play } from 'lucide-react';
// // import { authService, User } from '@/lib/auth';
// // import { dbService } from '@/lib/db';
// // import LearningModule from './LearningModule';

// // interface StudentDashboardProps {
// //   user: User;
// //   onLogout: () => void;
// // }

// // const StudentDashboard = ({ user, onLogout }: StudentDashboardProps) => {
// //   const [courses, setCourses] = useState<any[]>([]);
// //   const [progress, setProgress] = useState<any[]>([]);
// //   const [selectedCourse, setSelectedCourse] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadData();
// //   }, [user.grade]);

// //   const loadData = async () => {
// //     setLoading(true);
// //     try {
// //       if (user.grade) {
// //         let gradeCourses = await dbService.getCoursesByGrade(user.grade);

// //         // Define common subjects
// //         const subjects = [
// //           {
// //             id: `physics-${user.grade}`,
// //             subject: 'Physics',
// //             chapter: {
// //               id: 'kinetic-energy',
// //               title: 'Kinetic Energy',
// //               content: 'Interactive learning module for understanding kinetic energy concepts.',
// //               order: 1,
// //               type: 'interactive' as const,
// //               componentPath: 'physics'
// //             }
// //           },
// //           {
// //             id: `chemistry-${user.grade}`,
// //             subject: 'Chemistry',
// //             chapter: {
// //               id: 'basic-chemistry',
// //               title: 'Introduction to Chemistry',
// //               content: 'Interactive module for exploring basic chemistry concepts.',
// //               order: 1,
// //               type: 'interactive' as const,
// //               componentPath: 'chemistry'
// //             }
// //           },
// //           {
// //             id: `maths-${user.grade}`,
// //             subject: 'Maths',
// //             chapter: {
// //               id: 'basic-algebra',
// //               title: 'Basic Algebra',
// //               content: 'Interactive module for learning algebra fundamentals.',
// //               order: 1,
// //               type: 'interactive' as const,
// //               componentPath: 'maths'
// //             }
// //           },
// //           {
// //             id: `geography-${user.grade}`,
// //             subject: 'Geography',
// //             chapter: {
// //               id: 'world-geography',
// //               title: 'World Geography',
// //               content: 'Interactive module for exploring world geography.',
// //               order: 1,
// //               type: 'interactive' as const,
// //               componentPath: 'geography'
// //             }
// //           },
// //           {
// //             id: `biology-${user.grade}`,
// //             subject: 'Biology',
// //             chapter: {
// //               id: 'basic-biology',
// //               title: 'Introduction to Biology',
// //               content: 'Interactive module for understanding basic biology concepts.',
// //               order: 1,
// //               type: 'interactive' as const,
// //               componentPath: 'biology'
// //             }
// //           }
// //         ];

// //         // Add subjects if they don't exist for the user's grade
// //         for (const subject of subjects) {
// //           if (!gradeCourses.some(course => course.subject === subject.subject)) {
// //             const newCourse = {
// //               id: subject.id,
// //               grade: user.grade,
// //               subject: subject.subject,
// //               createdBy: 'system',
// //               chapters: [subject.chapter]
// //             };
// //             await dbService.createCourse(newCourse);
// //           }
// //         }

// //         // Reload courses after adding new ones
// //         gradeCourses = await dbService.getCoursesByGrade(user.grade);
// //         setCourses(gradeCourses);

// //         const studentProgress = await dbService.getStudentProgress(user.id);
// //         setProgress(studentProgress);
// //       }
// //     } catch (error) {
// //       console.error('Failed to load data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getCourseProgress = (courseId: string) => {
// //     const courseProgress = progress.filter(p => p.courseId === courseId);
// //     if (courseProgress.length === 0) return 0;
    
// //     const completed = courseProgress.filter(p => p.completed).length;
// //     return (completed / courseProgress.length) * 100;
// //   };

// //   const getTotalProgress = () => {
// //     if (progress.length === 0) return 0;
// //     const completed = progress.filter(p => p.completed).length;
// //     return (completed / progress.length) * 100;
// //   };

// //   const getAverageScore = () => {
// //     const scoredProgress = progress.filter(p => p.completed && p.score !== undefined);
// //     if (scoredProgress.length === 0) return 0;
    
// //     const totalScore = scoredProgress.reduce((acc, p) => acc + (p.score || 0), 0);
// //     return Math.round(totalScore / scoredProgress.length);
// //   };

// //   const handleLogout = () => {
// //     authService.logout();
// //     onLogout();
// //   };

// //   if (selectedCourse) {
// //     return (
// //       <LearningModule
// //         course={selectedCourse}
// //         user={user}
// //         onBack={() => setSelectedCourse(null)}
// //         onProgressUpdate={loadData}
// //       />
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background p-4">
// //       <div className="mx-auto max-w-6xl">
// //         {/* Header */}
// //         <div className="mb-6 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold">Student Dashboard</h1>
// //             <p className="text-muted-foreground">Welcome back, {user.name}!</p>
// //           </div>
// //           <Button variant="outline" onClick={handleLogout}>
// //             <LogOut className="mr-2 h-4 w-4" />
// //             Logout
// //           </Button>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="mb-6 grid gap-4 md:grid-cols-3">
// //           <Card>
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-muted-foreground">Total Progress</p>
// //                   <p className="text-3xl font-bold">{Math.round(getTotalProgress())}%</p>
// //                 </div>
// //                 <Target className="h-8 w-8 text-primary" />
// //               </div>
// //               <div className="mt-2">
// //                 <Progress value={getTotalProgress()} className="h-2" />
// //               </div>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-muted-foreground">Available Courses</p>
// //                   <p className="text-3xl font-bold">{courses.length}</p>
// //                 </div>
// //                 <BookOpen className="h-8 w-8 text-primary" />
// //               </div>
// //             </CardContent>
// //           </Card>
// //           <Card>
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm font-medium text-muted-foreground">Average Score</p>
// //                   <p className="text-3xl font-bold">{getAverageScore()}%</p>
// //                 </div>
// //                 <Trophy className="h-8 w-8 text-primary" />
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Courses Grid */}
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Your Courses - Grade {user.grade}</CardTitle>
// //             <CardDescription>Continue your learning journey</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             {loading ? (
// //               <div className="flex items-center justify-center py-8">
// //                 <div className="text-center">
// //                   <div className="animate-pulse">Loading courses...</div>
// //                 </div>
// //               </div>
// //             ) : courses.length > 0 ? (
// //               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //                 {courses.map((course) => (
// //                   <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer">
// //                     <CardContent className="p-6">
// //                       <div className="space-y-4">
// //                         <div className="flex items-start justify-between">
// //                           <div>
// //                             <h3 className="font-semibold text-lg">{course.subject}</h3>
// //                             <p className="text-sm text-muted-foreground">
// //                               {course.chapters.length} chapter{course.chapters.length > 1 ? 's' : ''}
// //                             </p>
// //                           </div>
// //                           <Badge variant="secondary">Grade {course.grade}</Badge>
// //                         </div>
                        
// //                         <div className="space-y-2">
// //                           <div className="flex items-center justify-between text-sm">
// //                             <span>Progress</span>
// //                             <span>{Math.round(getCourseProgress(course.id))}%</span>
// //                           </div>
// //                           <Progress value={getCourseProgress(course.id)} className="h-2" />
// //                         </div>

// //                         <Button 
// //                           className="w-full" 
// //                           onClick={() => setSelectedCourse(course)}
// //                         >
// //                           <Play className="mr-2 h-4 w-4" />
// //                           {getCourseProgress(course.id) > 0 ? 'Continue Learning' : 'Start Course'}
// //                         </Button>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
// //                 <h3 className="text-lg font-medium mb-2">No Courses Available</h3>
// //                 <p className="text-muted-foreground">
// //                   No courses have been added for Grade {user.grade} yet.
// //                 </p>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentDashboard;

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Badge } from '@/components/ui/badge';
// import { BookOpen, Trophy, Target, LogOut, Play } from 'lucide-react';
// import { authService, User } from '@/lib/auth';
// import { dbService } from '@/lib/db';
// import PhysicsModule from './subjects/physics/PhysicsModule';
// import ChemistryModule from './subjects/ChemistryModule';
// import MathsModule from './subjects/MathsModule';
// import GeographyModule from './subjects/GeographyModule';
// import BiologyModule from './subjects/BiologyModule';

// interface StudentDashboardProps {
//   user: User;
//   onLogout: () => void;
// }

// const StudentDashboard = ({ user, onLogout }: StudentDashboardProps) => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [progress, setProgress] = useState<any[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, [user.grade]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       if (user.grade) {
//         let gradeCourses = await dbService.getCoursesByGrade(user.grade);

//         // Define common subjects with multiple subtopics
//         const subjects = [
//           {
//             id: `physics-${user.grade}`,
//             subject: 'Physics',
//             chapters: [
//               {
//                 id: 'kinetic-energy',
//                 title: 'Kinetic Energy',
//                 content: 'Interactive module for understanding kinetic energy concepts.',
//                 order: 1,
//                 type: 'interactive' as const,
//                 componentPath: 'physics-kinetic-energy'
//               },
//               {
//                 id: 'atom-science',
//                 title: 'Atom Science',
//                 content: 'Interactive module for exploring atomic structure.',
//                 order: 2,
//                 type: 'interactive' as const,
//                 componentPath: 'physics-atom-science'
//               },
//               {
//                 id: 'circuit',
//                 title: 'Circuit',
//                 content: 'Interactive module for learning about electrical circuits.',
//                 order: 3,
//                 type: 'interactive' as const,
//                 componentPath: 'physics-circuit'
//               }
//             ]
//           },
//           {
//             id: `chemistry-${user.grade}`,
//             subject: 'Chemistry',
//             chapters: [
//               {
//                 id: 'basic-chemistry',
//                 title: 'Introduction to Chemistry',
//                 content: 'Interactive module for exploring basic chemistry concepts.',
//                 order: 1,
//                 type: 'interactive' as const,
//                 componentPath: 'chemistry-basic-chemistry'
//               },
//               {
//                 id: 'chemical-reactions',
//                 title: 'Chemical Reactions',
//                 content: 'Interactive module for understanding chemical reactions.',
//                 order: 2,
//                 type: 'interactive' as const,
//                 componentPath: 'chemistry-chemical-reactions'
//               },
//               {
//                 id: 'periodic-table',
//                 title: 'Periodic Table',
//                 content: 'Interactive module for exploring the periodic table.',
//                 order: 3,
//                 type: 'interactive' as const,
//                 componentPath: 'chemistry-periodic-table'
//               }
//             ]
//           },
//           {
//             id: `maths-${user.grade}`,
//             subject: 'Maths',
//             chapters: [
//               {
//                 id: 'basic-algebra',
//                 title: 'Basic Algebra',
//                 content: 'Interactive module for learning algebra fundamentals.',
//                 order: 1,
//                 type: 'interactive' as const,
//                 componentPath: 'maths-basic-algebra'
//               },
//               {
//                 id: 'geometry',
//                 title: 'Geometry',
//                 content: 'Interactive module for exploring geometric concepts.',
//                 order: 2,
//                 type: 'interactive' as const,
//                 componentPath: 'maths-geometry'
//               },
//               {
//                 id: 'fractions',
//                 title: 'Fractions',
//                 content: 'Interactive module for understanding fractions.',
//                 order: 3,
//                 type: 'interactive' as const,
//                 componentPath: 'maths-fractions'
//               }
//             ]
//           },
//           {
//             id: `geography-${user.grade}`,
//             subject: 'Geography',
//             chapters: [
//               {
//                 id: 'world-geography',
//                 title: 'World Geography',
//                 content: 'Interactive module for exploring world geography.',
//                 order: 1,
//                 type: 'interactive' as const,
//                 componentPath: 'geography-world-geography'
//               },
//               {
//                 id: 'climate',
//                 title: 'Climate',
//                 content: 'Interactive module for learning about climate zones.',
//                 order: 2,
//                 type: 'interactive' as const,
//                 componentPath: 'geography-climate'
//               },
//               {
//                 id: 'maps',
//                 title: 'Maps',
//                 content: 'Interactive module for understanding maps and cartography.',
//                 order: 3,
//                 type: 'interactive' as const,
//                 componentPath: 'geography-maps'
//               }
//             ]
//           },
//           {
//             id: `biology-${user.grade}`,
//             subject: 'Biology',
//             chapters: [
//               {
//                 id: 'basic-biology',
//                 title: 'Introduction to Biology',
//                 content: 'Interactive module for understanding basic biology concepts.',
//                 order: 1,
//                 type: 'interactive' as const,
//                 componentPath: 'biology-basic-biology'
//               },
//               {
//                 id: 'cells',
//                 title: 'Cells',
//                 content: 'Interactive module for exploring cell structure.',
//                 order: 2,
//                 type: 'interactive' as const,
//                 componentPath: 'biology-cells'
//               },
//               {
//                 id: 'ecosystems',
//                 title: 'Ecosystems',
//                 content: 'Interactive module for learning about ecosystems.',
//                 order: 3,
//                 type: 'interactive' as const,
//                 componentPath: 'biology-ecosystems'
//               }
//             ]
//           }
//         ];

//         // Add subjects if they don't exist for the user's grade
//         for (const subject of subjects) {
//           if (!gradeCourses.some(course => course.subject === subject.subject)) {
//             const newCourse = {
//               id: subject.id,
//               grade: user.grade,
//               subject: subject.subject,
//               createdBy: 'system',
//               chapters: subject.chapters
//             };
//             await dbService.createCourse(newCourse);
//           }
//         }

//         // Reload courses after adding new ones
//         gradeCourses = await dbService.getCoursesByGrade(user.grade);
//         setCourses(gradeCourses);

//         const studentProgress = await dbService.getStudentProgress(user.id);
//         setProgress(studentProgress);
//       }
//     } catch (error) {
//       console.error('Failed to load data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getCourseProgress = (courseId: string) => {
//     const courseProgress = progress.filter(p => p.courseId === courseId);
//     if (courseProgress.length === 0) return 0;
    
//     const completed = courseProgress.filter(p => p.completed).length;
//     return (completed / courseProgress.length) * 100;
//   };

//   const getTotalProgress = () => {
//     if (progress.length === 0) return 0;
//     const completed = progress.filter(p => p.completed).length;
//     return (completed / progress.length) * 100;
//   };

//   const getAverageScore = () => {
//     const scoredProgress = progress.filter(p => p.completed && p.score !== undefined);
//     if (scoredProgress.length === 0) return 0;
    
//     const totalScore = scoredProgress.reduce((acc, p) => acc + (p.score || 0), 0);
//     return Math.round(totalScore / scoredProgress.length);
//   };

//   const handleLogout = () => {
//     authService.logout();
//     onLogout();
//   };

//   // Render subject-specific module based on selected course
//   if (selectedCourse) {
//     switch (selectedCourse.subject) {
//       case 'Physics':
//         return (
//           <PhysicsModule
//             course={selectedCourse}
//             user={user}
//             onBack={() => setSelectedCourse(null)}
//             onProgressUpdate={loadData}
//           />
//         );
//       case 'Chemistry':
//         return (
//           <ChemistryModule
//             course={selectedCourse}
//             user={user}
//             onBack={() => setSelectedCourse(null)}
//             onProgressUpdate={loadData}
//           />
//         );
//       case 'Maths':
//         return (
//           <MathsModule
//             course={selectedCourse}
//             user={user}
//             onBack={() => setSelectedCourse(null)}
//             onProgressUpdate={loadData}
//           />
//         );
//       case 'Geography':
//         return (
//           <GeographyModule
//             course={selectedCourse}
//             user={user}
//             onBack={() => setSelectedCourse(null)}
//             onProgressUpdate={loadData}
//           />
//         );
//       case 'Biology':
//         return (
//           <BiologyModule
//             course={selectedCourse}
//             user={user}
//             onBack={() => setSelectedCourse(null)}
//             onProgressUpdate={loadData}
//           />
//         );
//       default:
//         return null;
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Student Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back, {user.name}!</p>
//           </div>
//           <Button variant="outline" onClick={handleLogout}>
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="mb-6 grid gap-4 md:grid-cols-3">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Total Progress</p>
//                   <p className="text-3xl font-bold">{Math.round(getTotalProgress())}%</p>
//                 </div>
//                 <Target className="h-8 w-8 text-primary" />
//               </div>
//               <div className="mt-2">
//                 <Progress value={getTotalProgress()} className="h-2" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Available Courses</p>
//                   <p className="text-3xl font-bold">{courses.length}</p>
//                 </div>
//                 <BookOpen className="h-8 w-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Average Score</p>
//                   <p className="text-3xl font-bold">{getAverageScore()}%</p>
//                 </div>
//                 <Trophy className="h-8 w-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Courses Grid */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Your Courses - Grade {user.grade}</CardTitle>
//             <CardDescription>Continue your learning journey</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="text-center">
//                   <div className="animate-pulse">Loading courses...</div>
//                 </div>
//               </div>
//             ) : courses.length > 0 ? (
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {courses.map((course) => (
//                   <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer">
//                     <CardContent className="p-6">
//                       <div className="space-y-4">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h3 className="font-semibold text-lg">{course.subject}</h3>
//                             <p className="text-sm text-muted-foreground">
//                               {course.chapters.length} topic{course.chapters.length > 1 ? 's' : ''}
//                             </p>
//                           </div>
//                           <Badge variant="secondary">Grade {course.grade}</Badge>
//                         </div>
                        
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between text-sm">
//                             <span>Progress</span>
//                             <span>{Math.round(getCourseProgress(course.id))}%</span>
//                           </div>
//                           <Progress value={getCourseProgress(course.id)} className="h-2" />
//                         </div>

//                         <Button 
//                           className="w-full" 
//                           onClick={() => setSelectedCourse(course)}
//                         >
//                           <Play className="mr-2 h-4 w-4" />
//                           {getCourseProgress(course.id) > 0 ? 'Continue Learning' : 'Start Course'}
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//                 <h3 className="text-lg font-medium mb-2">No Courses Available</h3>
//                 <p className="text-muted-foreground">
//                   No courses have been added for Grade {user.grade} yet.
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Trophy, Target, LogOut, Play } from 'lucide-react';
import { authService, User } from '@/lib/auth';
import { dbService } from '@/lib/db';
import PhysicsModule from './subjects/physics/PhysicsModule';
import ChemistryModule from './subjects/ChemistryModule';
import MathsModule from './subjects/MathsModule';
import GeographyModule from './subjects/GeographyModule';
import BiologyModule from './subjects/BiologyModule';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

const StudentDashboard = ({ user, onLogout }: StudentDashboardProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      if (user.grade) {
        let gradeCourses = await dbService.getCoursesByGrade(user.grade);

        const defaultSubjects = [
          {
            id: `physics-${user.grade}`,
            subject: 'Physics',
            chapters: [
              { id: 'kinetic-energy', title: 'Kinetic Energy', content: 'Interactive module for understanding kinetic energy concepts.', order: 1, type: 'interactive', componentPath: 'physics-kinetic-energy' },
              { id: 'atom-science', title: 'Atom Science', content: 'Interactive module for exploring atomic structure.', order: 2, type: 'interactive', componentPath: 'physics-atom-science' },
              { id: 'circuit', title: 'Circuit', content: 'Interactive module for learning about electrical circuits.', order: 3, type: 'interactive', componentPath: 'physics-circuit' },
            ],
          },
          {
            id: `chemistry-${user.grade}`,
            subject: 'Chemistry',
            chapters: [
              { id: 'basic-chemistry', title: 'Introduction to Chemistry', content: 'Interactive module for exploring basic chemistry concepts.', order: 1, type: 'interactive', componentPath: 'chemistry-basic-chemistry' },
              { id: 'chemical-reactions', title: 'Chemical Reactions', content: 'Interactive module for understanding chemical reactions.', order: 2, type: 'interactive', componentPath: 'chemistry-chemical-reactions' },
              { id: 'periodic-table', title: 'Periodic Table', content: 'Interactive module for exploring the periodic table.', order: 3, type: 'interactive', componentPath: 'chemistry-periodic-table' },
            ],
          },
          {
            id: `maths-${user.grade}`,
            subject: 'Maths',
            chapters: [
              { id: 'basic-algebra', title: 'Basic Algebra', content: 'Interactive module for learning algebra fundamentals.', order: 1, type: 'interactive', componentPath: 'maths-basic-algebra' },
              { id: 'geometry', title: 'Geometry', content: 'Interactive module for exploring geometric concepts.', order: 2, type: 'interactive', componentPath: 'maths-geometry' },
              { id: 'fractions', title: 'Fractions', content: 'Interactive module for understanding fractions.', order: 3, type: 'interactive', componentPath: 'maths-fractions' },
            ],
          },
          {
            id: `geography-${user.grade}`,
            subject: 'Geography',
            chapters: [
              { id: 'world-geography', title: 'World Geography', content: 'Interactive module for exploring world geography.', order: 1, type: 'interactive', componentPath: 'geography-world-geography' },
              { id: 'climate', title: 'Climate', content: 'Interactive module for learning about climate zones.', order: 2, type: 'interactive', componentPath: 'geography-climate' },
              { id: 'maps', title: 'Maps', content: 'Interactive module for understanding maps and cartography.', order: 3, type: 'interactive', componentPath: 'geography-maps' },
            ],
          },
          {
            id: `biology-${user.grade}`,
            subject: 'Biology',
            chapters: [
              { id: 'basic-biology', title: 'Introduction to Biology', content: 'Interactive module for understanding basic biology concepts.', order: 1, type: 'interactive', componentPath: 'biology-basic-biology' },
              { id: 'cells', title: 'Cells', content: 'Interactive module for exploring cell structure.', order: 2, type: 'interactive', componentPath: 'biology-cells' },
              { id: 'ecosystems', title: 'Ecosystems', content: 'Interactive module for learning about ecosystems.', order: 3, type: 'interactive', componentPath: 'biology-ecosystems' },
            ],
          },
        ];

        if (gradeCourses.length === 0) {
          for (const subject of defaultSubjects) {
            const newCourse = {
              grade: user.grade,
              subject: subject.subject,
              createdBy: 'system',
              chapters: subject.chapters.map((chapter: any) => ({
                ...chapter,
                type: chapter.type as "interactive" | "text"
              })),
            };
            await dbService.createCourse(newCourse);
          }
          gradeCourses = await dbService.getCoursesByGrade(user.grade);
        }

        setCourses(gradeCourses);
        const studentProgress = await dbService.getStudentProgress(user.id);
        setProgress(studentProgress);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user.grade, user.id]);

  const getCourseProgress = (courseId: string) => {
    const courseProgress = progress.filter(p => p.courseId === courseId);
    if (courseProgress.length === 0) return 0;
    const completed = courseProgress.filter(p => p.completed).length;
    return (completed / courseProgress.length) * 100 || 0;
  };

  const getTotalProgress = () => {
    if (progress.length === 0) return 0;
    const completed = progress.filter(p => p.completed).length;
    return (completed / progress.length) * 100 || 0;
  };

  const getAverageScore = () => {
    const scoredProgress = progress.filter(p => p.completed && p.score !== undefined);
    if (scoredProgress.length === 0) return 0;
    const totalScore = scoredProgress.reduce((acc, p) => acc + (p.score || 0), 0);
    return Math.round(totalScore / scoredProgress.length) || 0;
  };

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const handleCourseSelect = (course: any) => {
    console.log('Selected course:', course); // Debug log
    if (!course || !course.subject) {
      console.error('Invalid course data:', course);
      return;
    }
    setSelectedCourse(course);
  };

  if (selectedCourse) {
    console.log('Rendering module for:', selectedCourse.subject); // Debug log
    switch (selectedCourse.subject) {
      case 'Physics':
        return (
          <PhysicsModule
            course={selectedCourse}
            user={user}
            onBack={() => setSelectedCourse(null)}
            onProgressUpdate={loadData}
          />
        );
      case 'Chemistry':
        return (
          <ChemistryModule
            course={selectedCourse}
            user={user}
            onBack={() => setSelectedCourse(null)}
            onProgressUpdate={loadData}
          />
        );
      case 'Maths':
        return (
          <MathsModule
            course={selectedCourse}
            user={user}
            onBack={() => setSelectedCourse(null)}
            onProgressUpdate={loadData}
          />
        );
      case 'Geography':
        return (
          <GeographyModule
            course={selectedCourse}
            user={user}
            onBack={() => setSelectedCourse(null)}
            onProgressUpdate={loadData}
          />
        );
      case 'Biology':
        return (
          <BiologyModule
            course={selectedCourse}
            user={user}
            onBack={() => setSelectedCourse(null)}
            onProgressUpdate={loadData}
          />
        );
      default:
        console.error('Unsupported subject:', selectedCourse.subject);
        return (
          <div className="min-h-screen bg-background p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium">Unsupported course: {selectedCourse.subject}</p>
              <Button onClick={() => setSelectedCourse(null)} className="mt-4">
                Back to Dashboard
              </Button>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Progress</p>
                  <p className="text-3xl font-bold">{Math.round(getTotalProgress())}%</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Progress value={getTotalProgress()} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Courses</p>
                  <p className="text-3xl font-bold">{courses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold">{getAverageScore()}%</p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Courses - Grade {user.grade}</CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-pulse">Loading courses...</div>
                </div>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id} className="transition-all hover:shadow-lg cursor-pointer" onClick={() => handleCourseSelect(course)}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{course.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.chapters.length} topic{course.chapters.length > 1 ? 's' : ''}
                            </p>
                          </div>
                          <Badge variant="secondary">Grade {course.grade}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(getCourseProgress(course.id))}%</span>
                          </div>
                          <Progress value={getCourseProgress(course.id)} className="h-2" />
                        </div>

                        <Button className="w-full">
                          <Play className="mr-2 h-4 w-4" />
                          {getCourseProgress(course.id) > 0 ? 'Continue Learning' : 'Start Course'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Courses Available</h3>
                <p className="text-muted-foreground">
                  No courses have been added for Grade {user.grade} yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;