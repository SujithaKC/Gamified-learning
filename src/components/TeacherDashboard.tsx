// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Users, BookOpen, Trophy, LogOut } from 'lucide-react';
// import { authService, User } from '@/lib/auth';
// import { dbService } from '@/lib/db';
// import CreateCourse from './CreateCourse';
// import StudentReports from './StudentReports';

// interface TeacherDashboardProps {
//   user: User;
//   onLogout: () => void;
// }

// const TeacherDashboard = ({ user, onLogout }: TeacherDashboardProps) => {
//   const [students, setStudents] = useState<any[]>([]);
//   const [courses, setCourses] = useState<any[]>([]);
//   const [progress, setProgress] = useState<any[]>([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     // Load students from all grades
//     const allStudents = [];
//     for (let grade = 6; grade <= 12; grade++) {
//       const gradeStudents = await dbService.getStudentsByGrade(grade);
//       allStudents.push(...gradeStudents);
//     }
//     setStudents(allStudents);

//     // Load courses
//     const allCourses = [];
//     for (let grade = 6; grade <= 12; grade++) {
//       const gradeCourses = await dbService.getCoursesByGrade(grade);
//       allCourses.push(...gradeCourses);
//     }
//     setCourses(allCourses);

//     // Load progress data
//     const allProgress = [];
//     for (const course of allCourses) {
//       const courseProgress = await dbService.getCourseProgress(course.id);
//       allProgress.push(...courseProgress);
//     }
//     setProgress(allProgress);
//   };

//   const getStudentProgress = (studentId: string) => {
//     const studentProgress = progress.filter(p => p.studentId === studentId);
//     const completed = studentProgress.filter(p => p.completed).length;
//     const total = studentProgress.length;
//     return total > 0 ? (completed / total) * 100 : 0;
//   };

//   const handleLogout = () => {
//     authService.logout();
//     onLogout();
//   };

//   return (
//     <div className="min-h-screen bg-background p-4">
//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back, {user.name}</p>
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
//                   <p className="text-sm font-medium text-muted-foreground">Total Students</p>
//                   <p className="text-3xl font-bold">{students.length}</p>
//                 </div>
//                 <Users className="h-8 w-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
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
//                   <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
//                   <p className="text-3xl font-bold">
//                     {students.length > 0
//                       ? Math.round(students.reduce((acc, student) => acc + getStudentProgress(student.id), 0) / students.length)
//                       : 0}%
//                   </p>
//                 </div>
//                 <Trophy className="h-8 w-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content */}
//         <Tabs defaultValue="students" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="students">Students</TabsTrigger>
//             <TabsTrigger value="courses">Courses</TabsTrigger>
//             <TabsTrigger value="reports">Reports</TabsTrigger>
//           </TabsList>

//           <TabsContent value="students" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Student Overview</CardTitle>
//                 <CardDescription>Monitor student progress across all grades</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {students.map((student) => (
//                     <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
//                       <div className="flex items-center space-x-4">
//                         <div>
//                           <p className="font-medium">{student.name}</p>
//                           <p className="text-sm text-muted-foreground">{student.email}</p>
//                         </div>
//                         <Badge variant="secondary">Grade {student.grade}</Badge>
//                       </div>
//                       <div className="flex items-center space-x-4">
//                         <div className="w-24">
//                           <Progress value={getStudentProgress(student.id)} className="h-2" />
//                         </div>
//                         <span className="text-sm font-medium">{Math.round(getStudentProgress(student.id))}%</span>
//                       </div>
//                     </div>
//                   ))}
//                   {students.length === 0 && (
//                     <p className="text-center text-muted-foreground py-8">No students enrolled yet</p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="courses" className="space-y-4">
//             <CreateCourse onCourseCreated={loadData} />
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Existing Courses</CardTitle>
//                 <CardDescription>Manage your learning materials</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {courses.map((course) => (
//                     <Card key={course.id}>
//                       <CardContent className="p-4">
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between">
//                             <h3 className="font-medium">{course.subject}</h3>
//                             <Badge>Grade {course.grade}</Badge>
//                           </div>
//                           <p className="text-sm text-muted-foreground">
//                             {course.chapters.length} chapters
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                   {courses.length === 0 && (
//                     <p className="col-span-full text-center text-muted-foreground py-8">
//                       No courses created yet. Create your first course above.
//                     </p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="reports" className="space-y-4">
//             <StudentReports students={students} progress={progress} courses={courses} />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, BookOpen, Trophy, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { authService, User } from '@/lib/auth';
import { dbService } from '@/lib/db';
import CreateCourse from './CreateCourse';
import StudentReports from './StudentReports';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

const TeacherDashboard = ({ user, onLogout }: TeacherDashboardProps) => {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Load students from all grades
    const allStudents = [];
    for (let grade = 6; grade <= 12; grade++) {
      const gradeStudents = await dbService.getStudentsByGrade(grade);
      allStudents.push(...gradeStudents);
    }
    setStudents(allStudents);

    // Load courses
    const allCourses = [];
    for (let grade = 6; grade <= 12; grade++) {
      const gradeCourses = await dbService.getCoursesByGrade(grade);
      allCourses.push(...gradeCourses);
    }
    setCourses(allCourses);

    // Load progress data
    const allProgress = [];
    for (const course of allCourses) {
      const courseProgress = await dbService.getCourseProgress(course.id);
      allProgress.push(...courseProgress);
    }
    setProgress(allProgress);
  };

  const getStudentProgress = (studentId: string) => {
    const studentProgress = progress.filter(p => p.studentId === studentId);
    const completed = studentProgress.filter(p => p.completed).length;
    const total = studentProgress.length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  const toggleCourseExpand = (courseId: string) => {
    setExpandedCourse(prev => (prev === courseId ? null : courseId));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold">{students.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                  <p className="text-3xl font-bold">
                    {students.length > 0
                      ? Math.round(students.reduce((acc, student) => acc + getStudentProgress(student.id), 0) / students.length)
                      : 0}%
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
        

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Overview</CardTitle>
                <CardDescription>Monitor student progress across all grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <Badge variant="secondary">Grade {student.grade}</Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-24">
                          <Progress value={getStudentProgress(student.id)} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{Math.round(getStudentProgress(student.id))}%</span>
                      </div>
                    </div>
                  ))}
                  {students.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No students enrolled yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            <CreateCourse onCourseCreated={loadData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Existing Courses</CardTitle>
                <CardDescription>Manage your learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <Card key={course.id}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{course.subject}</h3>
                          <Badge>Grade {course.grade}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {course.chapters.length} chapters
                        </p>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleCourseExpand(course.id)}
                          className="flex items-center"
                        >
                          {expandedCourse === course.id ? (
                            <>
                              <ChevronUp className="mr-1 h-4 w-4" /> Hide Content
                            </>
                          ) : (
                            <>
                              <ChevronDown className="mr-1 h-4 w-4" /> View Content
                            </>
                          )}
                        </Button>

                        {expandedCourse === course.id && (
  <div className="mt-3 space-y-3 border-t pt-3">
    {course.chapters?.length > 0 ? (
      course.chapters.map((chapter: any, idx: number) => (
        <div key={idx} className="rounded-md bg-muted p-3">
          <p className="font-medium">Chapter {idx + 1}: {chapter.title}</p>
          <ul className="ml-4 list-disc text-sm text-muted-foreground">
            {chapter.lessons?.length > 0 ? (
              chapter.lessons.map((lesson: any, lid: number) => (
                <li key={lid}>
                  {lesson.title}{" "}
                  {lesson.videoUrl && (
                    <a 
                      href={lesson.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      (Watch Video)
                    </a>
                  )}
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">No lessons yet</li>
            )}
          </ul>
        </div>
      ))
    ) : (
      <p className="text-muted-foreground text-sm">No content yet</p>
    )}
  </div>
)}

                      </CardContent>
                    </Card>
                  ))}
                  {courses.length === 0 && (
                    <p className="col-span-full text-center text-muted-foreground py-8">
                      No courses created yet. Create your first course above.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <StudentReports students={students} progress={progress} courses={courses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
