// import { openDB, DBSchema, IDBPDatabase } from 'idb';

// interface LearningPlatformDB extends DBSchema {
//   users: {
//     key: string;
//     value: {
//       id: string;
//       email: string;
//       password: string;
//       role: 'teacher' | 'student';
//       name: string;
//       grade?: number;
//       createdAt: Date;
//     };
//     indexes: {
//       'by_email': string;
//       'by_role': string;
//     };
//   };
//   courses: {
//     key: string;
//     value: {
//       id: string;
//       grade: number;
//       subject: string;
//       chapters: Chapter[];
//       createdBy: string;
//       createdAt: Date;
//     };
//     indexes: {
//       'by_grade': number;
//       'by_subject': string;
//     };
//   };
//   progress: {
//     key: string;
//     value: {
//       id: string;
//       studentId: string;
//       courseId: string;
//       chapterId: string;
//       completed: boolean;
//       score?: number;
//       completedAt?: Date;
//     };
//     indexes: {
//       'by_studentId': string;
//       'by_courseId': string;
//     };
//   };
//   assignments: {
//     key: string;
//     value: {
//       id: string;
//       title: string;
//       courseId: string;
//       chapterId: string;
//       questions: Question[];
//       createdBy: string;
//       createdAt: Date;
//     };
//     indexes: {
//       'by_courseId': string;
//     };
//   };
// }

// interface Chapter {
//   id: string;
//   title: string;
//   content: string;
//   order: number;
//   type?: 'text' | 'interactive';
//   componentPath?: string;
// }

// interface Question {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   points: number;
// }

// class DatabaseService {
//   uploadFile(file: File) {
//     throw new Error('Method not implemented.');
//   }
//   private db: IDBPDatabase<LearningPlatformDB> | null = null;

//   async init() {
//     this.db = await openDB<LearningPlatformDB>('learning-platform', 1, {
//       upgrade(db) {
//         // Users store
//         if (!db.objectStoreNames.contains('users')) {
//           const userStore = db.createObjectStore('users', { keyPath: 'id' });
//           userStore.createIndex('by_email', 'email', { unique: true });
//           userStore.createIndex('by_role', 'role');
//         }

//         // Courses store
//         if (!db.objectStoreNames.contains('courses')) {
//           const courseStore = db.createObjectStore('courses', { keyPath: 'id' });
//           courseStore.createIndex('by_grade', 'grade');
//           courseStore.createIndex('by_subject', 'subject');
//         }

//         // Progress store
//         if (!db.objectStoreNames.contains('progress')) {
//           const progressStore = db.createObjectStore('progress', { keyPath: 'id' });
//           progressStore.createIndex('by_studentId', 'studentId');
//           progressStore.createIndex('by_courseId', 'courseId');
//         }

//         // Assignments store
//         if (!db.objectStoreNames.contains('assignments')) {
//           const assignmentStore = db.createObjectStore('assignments', { keyPath: 'id' });
//           assignmentStore.createIndex('by_courseId', 'courseId');
//         }
//       },
//     });
//   }

//   // User management
//   async createUser(user: Omit<LearningPlatformDB['users']['value'], 'id' | 'createdAt'>) {
//     if (!this.db) await this.init();
//     const id = crypto.randomUUID();
//     const newUser = { ...user, id, createdAt: new Date() };
//     await this.db!.add('users', newUser);
//     return newUser;
//   }

//   async getUserByEmail(email: string) {
//     if (!this.db) await this.init();
//     return await this.db!.getFromIndex('users', 'by_email', email);
//   }

//   async getStudentsByGrade(grade: number) {
//     if (!this.db) await this.init();
//     const allUsers = await this.db!.getAll('users');
//     return allUsers.filter(user => user.role === 'student' && user.grade === grade);
//   }

//   // Course management
//   async createCourse(course: Omit<LearningPlatformDB['courses']['value'], 'id' | 'createdAt'>) {
//     if (!this.db) await this.init();
//     const id = crypto.randomUUID();
//     const newCourse = { ...course, id, createdAt: new Date() };
//     await this.db!.add('courses', newCourse);
//     return newCourse;
//   }

//   async getCoursesByGrade(grade: number) {
//     if (!this.db) await this.init();
//     return await this.db!.getAllFromIndex('courses', 'by_grade', grade);
//   }

//   async getCourse(id: string) {
//     if (!this.db) await this.init();
//     return await this.db!.get('courses', id);
//   }

//   // Progress tracking
//   async updateProgress(progress: Omit<LearningPlatformDB['progress']['value'], 'id'>) {
//     if (!this.db) await this.init();
//     const id = `${progress.studentId}-${progress.courseId}-${progress.chapterId}`;
//     const existing = await this.db!.get('progress', id);
    
//     if (existing) {
//       await this.db!.put('progress', { ...existing, ...progress, id });
//     } else {
//       await this.db!.add('progress', { ...progress, id });
//     }
//   }

//   async getStudentProgress(studentId: string) {
//     if (!this.db) await this.init();
//     return await this.db!.getAllFromIndex('progress', 'by_studentId', studentId);
//   }

//   async getCourseProgress(courseId: string) {
//     if (!this.db) await this.init();
//     return await this.db!.getAllFromIndex('progress', 'by_courseId', courseId);
//   }

//   // Assignment management
//   async createAssignment(assignment: Omit<LearningPlatformDB['assignments']['value'], 'id' | 'createdAt'>) {
//     if (!this.db) await this.init();
//     const id = crypto.randomUUID();
//     const newAssignment = { ...assignment, id, createdAt: new Date() };
//     await this.db!.add('assignments', newAssignment);
//     return newAssignment;
//   }

//   async getAssignmentsByCourse(courseId: string) {
//     if (!this.db) await this.init();
//     return await this.db!.getAllFromIndex('assignments', 'by_courseId', courseId);
//   }
// }

// export const dbService = new DatabaseService();
// export type { Chapter, Question };


import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface LearningPlatformDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      password: string;
      role: 'teacher' | 'student';
      name: string;
      grade?: number;
      createdAt: Date;
    };
    indexes: {
      'by_email': string;
      'by_role': string;
    };
  };
  courses: {
    key: string;
    value: {
      id: string;
      grade: number;
      subject: string;
      chapters: Chapter[];
      createdBy: string;
      createdAt: Date;
    };
    indexes: {
      'by_grade': number;
      'by_subject': string;
    };
  };
  progress: {
    key: string;
    value: {
      id: string;
      studentId: string;
      courseId: string;
      chapterId: string;
      completed: boolean;
      score?: number;
      completedAt?: Date;
    };
    indexes: {
      'by_studentId': string;
      'by_courseId': string;
    };
  };
  assignments: {
    key: string;
    value: {
      id: string;
      title: string;
      courseId: string;
      chapterId: string;
      questions: Question[];
      createdBy: string;
      createdAt: Date;
    };
    indexes: {
      'by_courseId': string;
    };
  };
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  type?: 'text' | 'interactive';
  componentPath?: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

class DatabaseService {
  uploadFile(file: File) {
    throw new Error('Method not implemented.');
  }
  private db: IDBPDatabase<LearningPlatformDB> | null = null;

  async init() {
    this.db = await openDB<LearningPlatformDB>('learning-platform', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('by_email', 'email', { unique: true });
          userStore.createIndex('by_role', 'role');
        }

        if (!db.objectStoreNames.contains('courses')) {
          const courseStore = db.createObjectStore('courses', { keyPath: 'id' });
          courseStore.createIndex('by_grade', 'grade');
          courseStore.createIndex('by_subject', 'subject');
        }

        if (!db.objectStoreNames.contains('progress')) {
          const progressStore = db.createObjectStore('progress', { keyPath: 'id' });
          progressStore.createIndex('by_studentId', 'studentId');
          progressStore.createIndex('by_courseId', 'courseId');
        }

        if (!db.objectStoreNames.contains('assignments')) {
          const assignmentStore = db.createObjectStore('assignments', { keyPath: 'id' });
          assignmentStore.createIndex('by_courseId', 'courseId');
        }
      },
    });
  }

  async createUser(user: Omit<LearningPlatformDB['users']['value'], 'id' | 'createdAt'>) {
    if (!this.db) await this.init();
    const id = crypto.randomUUID();
    const newUser = { ...user, id, createdAt: new Date() };
    await this.db!.add('users', newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    if (!this.db) await this.init();
    return await this.db!.getFromIndex('users', 'by_email', email);
  }

  async getStudentsByGrade(grade: number) {
    if (!this.db) await this.init();
    const allUsers = await this.db!.getAll('users');
    return allUsers.filter(user => user.role === 'student' && user.grade === grade);
  }

  async createCourse(course: Omit<LearningPlatformDB['courses']['value'], 'id' | 'createdAt'>) {
    if (!this.db) await this.init();
    const id = crypto.randomUUID();
    const newCourse = { ...course, id, createdAt: new Date() };
    await this.db!.add('courses', newCourse);
    return newCourse;
  }

  async getCoursesByGrade(grade: number) {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('courses', 'by_grade', grade);
  }

  async getCourse(id: string) {
    if (!this.db) await this.init();
    return await this.db!.get('courses', id);
  }

  async updateProgress(progress: Omit<LearningPlatformDB['progress']['value'], 'id'>) {
    if (!this.db) await this.init();
    const id = `${progress.studentId}-${progress.courseId}-${progress.chapterId}`;
    const existing = await this.db!.get('progress', id);
    
    if (existing) {
      await this.db!.put('progress', { ...existing, ...progress, id });
    } else {
      await this.db!.add('progress', { ...progress, id });
    }
  }

  async getStudentProgress(studentId: string) {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('progress', 'by_studentId', studentId);
  }

  async getCourseProgress(courseId: string) {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('progress', 'by_courseId', courseId);
  }

  async createAssignment(assignment: Omit<LearningPlatformDB['assignments']['value'], 'id' | 'createdAt'>) {
    if (!this.db) await this.init();
    const id = crypto.randomUUID();
    const newAssignment = { ...assignment, id, createdAt: new Date() };
    await this.db!.add('assignments', newAssignment);
    return newAssignment;
  }

  async getAssignmentsByCourse(courseId: string) {
    if (!this.db) await this.init();
    return await this.db!.getAllFromIndex('assignments', 'by_courseId', courseId);
  }
}

export const dbService = new DatabaseService();
export type { Chapter, Question };