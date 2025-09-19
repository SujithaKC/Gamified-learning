// import { dbService } from './db';

// interface User {
//   id: string;
//   email: string;
//   role: 'teacher' | 'student';
//   name: string;
//   grade?: number;
// }

// class AuthService {
//   private currentUser: User | null = null;

//   async login(email: string, password: string): Promise<User | null> {
//     const user = await dbService.getUserByEmail(email);
    
//     if (user && user.password === password) {
//       this.currentUser = {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         name: user.name,
//         grade: user.grade,
//       };
//       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
//       return this.currentUser;
//     }
    
//     return null;
//   }

//   async register(email: string, password: string, name: string, role: 'teacher' | 'student', grade?: number) {
//     // Check if user exists
//     const existingUser = await dbService.getUserByEmail(email);
//     if (existingUser) {
//       throw new Error('User already exists');
//     }

//     const user = await dbService.createUser({
//       email,
//       password,
//       name,
//       role,
//       grade,
//     });

//     return user;
//   }

//   getCurrentUser(): User | null {
//     if (this.currentUser) {
//       return this.currentUser;
//     }

//     const stored = localStorage.getItem('currentUser');
//     if (stored) {
//       this.currentUser = JSON.parse(stored);
//       return this.currentUser;
//     }

//     return null;
//   }

//   logout() {
//     this.currentUser = null;
//     localStorage.removeItem('currentUser');
//   }

//   isTeacher(): boolean {
//     const user = this.getCurrentUser();
//     return user?.role === 'teacher';
//   }

//   isStudent(): boolean {
//     const user = this.getCurrentUser();
//     return user?.role === 'student';
//   }
// }

// export const authService = new AuthService();
// export type { User };

import { dbService } from './db';

interface User {
  id: string;
  email: string;
  role: 'teacher' | 'student';
  name: string;
  grade?: number;
}

class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User | null> {
    const user = await dbService.getUserByEmail(email);
    
    if (user && user.password === password) {
      this.currentUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        grade: user.grade,
      };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return this.currentUser;
    }
    
    return null;
  }

  async register(email: string, password: string, name: string, role: 'teacher' | 'student', grade?: number) {
    const existingUser = await dbService.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await dbService.createUser({
      email,
      password,
      name,
      role,
      grade,
    });

    return user;
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isTeacher(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'teacher';
  }

  isStudent(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'student';
  }
}

export const authService = new AuthService();
export type { User };