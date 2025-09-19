import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentReportsProps {
  students: any[];
  progress: any[];
  courses: any[];
}

const StudentReports = ({ students, progress, courses }: StudentReportsProps) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const { toast } = useToast();

  const getStudentProgress = (studentId: string) => {
    const studentProgress = progress.filter(p => p.studentId === studentId);
    if (studentProgress.length === 0) return { completed: 0, total: 0, percentage: 0, avgScore: 0 };
    
    const completed = studentProgress.filter(p => p.completed).length;
    const total = studentProgress.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    const scoredProgress = studentProgress.filter(p => p.completed && p.score !== undefined);
    const avgScore = scoredProgress.length > 0 
      ? scoredProgress.reduce((acc, p) => acc + (p.score || 0), 0) / scoredProgress.length 
      : 0;
    
    return { completed, total, percentage, avgScore };
  };

  const getCourseProgressForStudent = (studentId: string, courseId: string) => {
    const courseProgress = progress.filter(p => p.studentId === studentId && p.courseId === courseId);
    if (courseProgress.length === 0) return 0;
    
    const completed = courseProgress.filter(p => p.completed).length;
    return (completed / courseProgress.length) * 100;
  };

  const generateReport = (studentId?: string) => {
    const reportData = studentId && studentId !== 'all' 
      ? [students.find(s => s.id === studentId)].filter(Boolean)
      : students;

    const reportContent = reportData.map(student => {
      const studentStats = getStudentProgress(student.id);
      const studentCourses = courses.filter(c => c.grade === student.grade);
      
      return {
        name: student.name,
        email: student.email,
        grade: student.grade,
        ...studentStats,
        courses: studentCourses.map(course => ({
          subject: course.subject,
          progress: getCourseProgressForStudent(student.id, course.id),
        })),
      };
    });

    // Create downloadable report
    const csvContent = [
      ['Name', 'Email', 'Grade', 'Completed Chapters', 'Total Chapters', 'Overall Progress (%)', 'Average Score (%)'],
      ...reportData.map(student => {
        const stats = getStudentProgress(student.id);
        return [
          student.name,
          student.email,
          student.grade,
          stats.completed,
          stats.total,
          Math.round(stats.percentage),
          Math.round(stats.avgScore),
        ];
      }),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student-report-${studentId === 'all' ? 'all-students' : reportData[0]?.name || 'student'}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Report Downloaded',
      description: 'Student report has been downloaded as CSV file',
    });
  };

  const filteredStudents = selectedStudent === 'all' ? students : students.filter(s => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Student Reports
          </CardTitle>
          <CardDescription>
            Monitor and download detailed student progress reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => generateReport(selectedStudent)}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => {
              const stats = getStudentProgress(student.id);
              const studentCourses = courses.filter(c => c.grade === student.grade);
              
              return (
                <Card key={student.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Student Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>Grade {student.grade}</Badge>
                          <Badge variant={stats.percentage >= 80 ? 'default' : stats.percentage >= 60 ? 'secondary' : 'destructive'}>
                            {Math.round(stats.percentage)}% Complete
                          </Badge>
                        </div>
                      </div>

                      {/* Overall Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{stats.completed}/{stats.total} chapters</span>
                        </div>
                        <Progress value={stats.percentage} className="h-2" />
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-primary">{stats.completed}</p>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-primary">{stats.total - stats.completed}</p>
                          <p className="text-sm text-muted-foreground">Remaining</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-primary">{Math.round(stats.percentage)}%</p>
                          <p className="text-sm text-muted-foreground">Progress</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-2xl font-bold text-primary">{Math.round(stats.avgScore)}%</p>
                          <p className="text-sm text-muted-foreground">Avg Score</p>
                        </div>
                      </div>

                      {/* Subject-wise Progress */}
                      {studentCourses.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Subject Progress
                          </h4>
                          <div className="space-y-2">
                            {studentCourses.map((course) => {
                              const courseProgress = getCourseProgressForStudent(student.id, course.id);
                              return (
                                <div key={course.id} className="flex items-center justify-between py-2">
                                  <span className="text-sm font-medium">{course.subject}</span>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-24">
                                      <Progress value={courseProgress} className="h-2" />
                                    </div>
                                    <span className="text-sm text-muted-foreground w-12 text-right">
                                      {Math.round(courseProgress)}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No students found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentReports;