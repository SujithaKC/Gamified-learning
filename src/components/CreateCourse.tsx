// // import { useState } from 'react';
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// // import { Plus, BookOpen } from 'lucide-react';
// // import { useToast } from '@/hooks/use-toast';
// // import { dbService, Chapter } from '@/lib/db';
// // import { authService } from '@/lib/auth';

// // interface CreateCourseProps {
// //   onCourseCreated: () => void;
// // }

// // const subjects = ['Mathematics', 'Science', 'Computer Science', 'Social Science', 'English', 'Physics', 'Chemistry', 'Biology'];

// // const CreateCourse = ({ onCourseCreated }: CreateCourseProps) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [formData, setFormData] = useState({
// //     grade: '',
// //     subject: '',
// //     chapters: [] as Chapter[],
// //   });
// //   const [newChapter, setNewChapter] = useState({ title: '', content: '' });
  
// //   const { toast } = useToast();

// //   const handleAddChapter = () => {
// //     if (!newChapter.title.trim() || !newChapter.content.trim()) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Chapter title and content are required',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     const chapter: Chapter = {
// //       id: crypto.randomUUID(),
// //       title: newChapter.title,
// //       content: newChapter.content,
// //       order: formData.chapters.length + 1,
// //     };

// //     setFormData(prev => ({
// //       ...prev,
// //       chapters: [...prev.chapters, chapter],
// //     }));

// //     setNewChapter({ title: '', content: '' });
// //   };

// //   const handleRemoveChapter = (id: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       chapters: prev.chapters.filter(ch => ch.id !== id),
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!formData.grade || !formData.subject || formData.chapters.length === 0) {
// //       toast({
// //         title: 'Validation Error',
// //         description: 'Please fill all fields and add at least one chapter',
// //         variant: 'destructive',
// //       });
// //       return;
// //     }

// //     setLoading(true);
    
// //     try {
// //       const user = authService.getCurrentUser();
// //       if (!user) throw new Error('Not authenticated');

// //       await dbService.createCourse({
// //         grade: parseInt(formData.grade),
// //         subject: formData.subject,
// //         chapters: formData.chapters,
// //         createdBy: user.id,
// //       });

// //       toast({
// //         title: 'Success',
// //         description: 'Course created successfully!',
// //       });

// //       setFormData({ grade: '', subject: '', chapters: [] });
// //       setIsOpen(false);
// //       onCourseCreated();
// //     } catch (error) {
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to create course',
// //         variant: 'destructive',
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Dialog open={isOpen} onOpenChange={setIsOpen}>
// //       <DialogTrigger asChild>
// //         <Button>
// //           <Plus className="mr-2 h-4 w-4" />
// //           Create Course
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
// //         <DialogHeader>
// //           <DialogTitle>Create New Course</DialogTitle>
// //         </DialogHeader>
        
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div className="grid grid-cols-2 gap-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="grade">Grade</Label>
// //               <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select grade" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
// //                     <SelectItem key={grade} value={grade.toString()}>
// //                       Grade {grade}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="subject">Subject</Label>
// //               <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
// //                 <SelectTrigger>
// //                   <SelectValue placeholder="Select subject" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {subjects.map((subject) => (
// //                     <SelectItem key={subject} value={subject}>
// //                       {subject}
// //                     </SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>

// //           <div className="space-y-4">
// //             <Label>Chapters</Label>
            
// //             {/* Add New Chapter */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="text-sm">Add Chapter</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="chapter-title">Chapter Title</Label>
// //                   <Input
// //                     id="chapter-title"
// //                     placeholder="Enter chapter title"
// //                     value={newChapter.title}
// //                     onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
// //                   />
// //                 </div>
// //                 <div className="space-y-2">
// //                   <Label htmlFor="chapter-content">Chapter Content</Label>
// //                   <Textarea
// //                     id="chapter-content"
// //                     placeholder="Enter chapter content and learning material"
// //                     className="min-h-[100px]"
// //                     value={newChapter.content}
// //                     onChange={(e) => setNewChapter(prev => ({ ...prev, content: e.target.value }))}
// //                   />
// //                 </div>
// //                 <Button type="button" onClick={handleAddChapter} size="sm">
// //                   Add Chapter
// //                 </Button>
// //               </CardContent>
// //             </Card>

// //             {/* Existing Chapters */}
// //             {formData.chapters.length > 0 && (
// //               <div className="space-y-2">
// //                 <h4 className="font-medium">Added Chapters ({formData.chapters.length})</h4>
// //                 <div className="space-y-2 max-h-40 overflow-y-auto">
// //                   {formData.chapters.map((chapter) => (
// //                     <div key={chapter.id} className="flex items-center justify-between rounded-lg border p-3">
// //                       <div className="flex items-center space-x-2">
// //                         <BookOpen className="h-4 w-4" />
// //                         <span className="font-medium">{chapter.title}</span>
// //                       </div>
// //                       <Button
// //                         type="button"
// //                         variant="destructive"
// //                         size="sm"
// //                         onClick={() => handleRemoveChapter(chapter.id)}
// //                       >
// //                         Remove
// //                       </Button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex justify-end space-x-2">
// //             <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button type="submit" disabled={loading}>
// //               {loading ? 'Creating...' : 'Create Course'}
// //             </Button>
// //           </div>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default CreateCourse;


// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Plus, BookOpen } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { dbService, Chapter } from '@/lib/db';
// import { authService } from '@/lib/auth';

// interface CreateCourseProps {
//   onCourseCreated: () => void;
// }

// const subjects = ['Mathematics', 'Science', 'Computer Science', 'Social Science', 'English', 'Physics', 'Chemistry', 'Biology'];

// const CreateCourse = ({ onCourseCreated }: CreateCourseProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     grade: '',
//     subject: '',
//     chapters: [] as Chapter[],
//   });
//   const [newChapter, setNewChapter] = useState({ title: '', content: '' });
  
//   const { toast } = useToast();

//   const handleAddChapter = () => {
//     if (!newChapter.title.trim() || !newChapter.content.trim()) {
//       toast({
//         title: 'Validation Error',
//         description: 'Chapter title and content are required',
//         variant: 'destructive',
//       });
//       return;
//     }

//     const chapter: Chapter = {
//       id: crypto.randomUUID(),
//       title: newChapter.title,
//       content: newChapter.content,
//       order: formData.chapters.length + 1,
//     };

//     setFormData(prev => ({
//       ...prev,
//       chapters: [...prev.chapters, chapter],
//     }));

//     setNewChapter({ title: '', content: '' });
//   };

//   const handleRemoveChapter = (id: string) => {
//     setFormData(prev => ({
//       ...prev,
//       chapters: prev.chapters.filter(ch => ch.id !== id),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.grade || !formData.subject || formData.chapters.length === 0) {
//       toast({
//         title: 'Validation Error',
//         description: 'Please fill all fields and add at least one chapter',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const user = authService.getCurrentUser();
//       if (!user) throw new Error('Not authenticated');

//       await dbService.createCourse({
//         grade: parseInt(formData.grade),
//         subject: formData.subject,
//         chapters: formData.chapters,
//         createdBy: user.id,
//       });

//       toast({
//         title: 'Success',
//         description: 'Course created successfully!',
//       });

//       setFormData({ grade: '', subject: '', chapters: [] });
//       setIsOpen(false);
//       onCourseCreated();
//     } catch (error) {
//       console.error('Error creating course:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to create course',
//         variant: 'destructive',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Create Course
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Create New Course</DialogTitle>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="grade">Grade</Label>
//               <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select grade" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
//                     <SelectItem key={grade} value={grade.toString()}>
//                       Grade {grade}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="subject">Subject</Label>
//               <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select subject" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {subjects.map((subject) => (
//                     <SelectItem key={subject} value={subject}>
//                       {subject}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <Label>Chapters</Label>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-sm">Add Chapter</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="chapter-title">Chapter Title</Label>
//                   <Input
//                     id="chapter-title"
//                     placeholder="Enter chapter title"
//                     value={newChapter.title}
//                     onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="chapter-content">Chapter Content</Label>
//                   <Textarea
//                     id="chapter-content"
//                     placeholder="Enter chapter content and learning material"
//                     className="min-h-[100px]"
//                     value={newChapter.content}
//                     onChange={(e) => setNewChapter(prev => ({ ...prev, content: e.target.value }))}
//                   />
//                 </div>
//                 <Button type="button" onClick={handleAddChapter} size="sm">
//                   Add Chapter
//                 </Button>
//               </CardContent>
//             </Card>

//             {formData.chapters.length > 0 && (
//               <div className="space-y-2">
//                 <h4 className="font-medium">Added Chapters ({formData.chapters.length})</h4>
//                 <div className="space-y-2 max-h-40 overflow-y-auto">
//                   {formData.chapters.map((chapter) => (
//                     <div key={chapter.id} className="flex items-center justify-between rounded-lg border p-3">
//                       <div className="flex items-center space-x-2">
//                         <BookOpen className="h-4 w-4" />
//                         <span className="font-medium">{chapter.title}</span>
//                       </div>
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleRemoveChapter(chapter.id)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Creating...' : 'Create Course'}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateCourse;

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dbService, Chapter } from '@/lib/db';
import { authService } from '@/lib/auth';

interface CreateCourseProps {
  onCourseCreated: () => void;
}

const subjects = ['Mathematics', 'Science', 'Computer Science', 'Social Science', 'English', 'Physics', 'Chemistry', 'Biology'];

const CreateCourse = ({ onCourseCreated }: CreateCourseProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    grade: '',
    subject: '',
    chapters: [] as Chapter[],
  });
  const [newChapter, setNewChapter] = useState<{ title: string; content: string; type: 'interactive' | 'text' }>({ title: '', content: '', type: 'interactive' }); // Default to 'interactive'

  const { toast } = useToast();

  const handleAddChapter = () => {
    if (!newChapter.title.trim() || !newChapter.content.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Chapter title and content are required',
        variant: 'destructive',
      });
      return;
    }

    const chapter: Chapter = {
      id: crypto.randomUUID(),
      title: newChapter.title,
      content: newChapter.content,
      order: formData.chapters.length + 1,
      type: newChapter.type,
      componentPath: newChapter.type === 'interactive' ? 'kinetic-energy' : undefined
    };

    setFormData(prev => ({
      ...prev,
      chapters: [...prev.chapters, chapter],
    }));

    setNewChapter({ title: '', content: '', type: 'interactive' as const });
  };

  const handleRemoveChapter = (id: string) => {
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter(ch => ch.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.grade || !formData.subject || formData.chapters.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all fields and add at least one chapter',
        variant: 'destructive',
      });
      return;
    }

    // Validate interactive chapters
    const invalidInteractiveChapters = formData.chapters.filter(
      chapter => chapter.type === 'interactive' && !chapter.componentPath
    );

    if (invalidInteractiveChapters.length > 0) {
      toast({
        title: 'Validation Error',
        description: 'Interactive chapters must have a valid component path',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      const user = authService.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      await dbService.createCourse({
        grade: parseInt(formData.grade),
        subject: formData.subject,
        chapters: formData.chapters,
        createdBy: user.id,
      });

      toast({
        title: 'Success',
        description: 'Course created successfully!',
      });

      setFormData({ grade: '', subject: '', chapters: [] });
      setIsOpen(false);
      onCourseCreated();
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: 'Error',
        description: 'Failed to create course',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Chapters</Label>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Add Chapter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chapter-title">Chapter Title</Label>
                  <Input
                    id="chapter-title"
                    placeholder="Enter chapter title"
                    value={newChapter.title}
                    onChange={(e) => setNewChapter(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chapter-content">Chapter Content</Label>
                  <Textarea
                    id="chapter-content"
                    placeholder="Enter chapter content and learning material"
                    className="min-h-[100px]"
                    value={newChapter.content}
                    onChange={(e) => setNewChapter(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chapter-type">Chapter Type</Label>
                  <Select
                    value={newChapter.type}
                    onValueChange={(value: 'interactive' | 'text') => setNewChapter(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interactive">Interactive (Physics Simulation)</SelectItem>
                      <SelectItem value="text">Text (Regular Content)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    {newChapter.type === 'interactive' 
                      ? 'Interactive chapters include physics simulations and hands-on activities.' 
                      : 'Text chapters contain regular learning content and materials.'}
                  </p>
                </div>
                <Button type="button" onClick={handleAddChapter} size="sm">
                  Add Chapter
                </Button>
              </CardContent>
            </Card>

            {formData.chapters.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Added Chapters ({formData.chapters.length})</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.chapters.map((chapter) => (
                    <div key={chapter.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium">{chapter.title}</span>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveChapter(chapter.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourse;