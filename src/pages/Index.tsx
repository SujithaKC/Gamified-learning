import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { dbService } from '@/lib/db';
import { authService, User } from '@/lib/auth';
import Login from '@/components/Login';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentDashboard from '@/components/StudentDashboard';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize IndexedDB
        await dbService.init();
        
        // Initialize service worker for offline functionality
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch((err) => console.log('Service Worker registration failed:', err));
        }

        // Check if user is already logged in
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Gamma Grades...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      {user.role === 'teacher' ? (
        <TeacherDashboard user={user} onLogout={handleLogout} />
      ) : (
        <StudentDashboard user={user} onLogout={handleLogout} />
      )}
      <Toaster />
    </>
  );
};

export default Index;
