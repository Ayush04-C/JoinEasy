import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Mock data initialization
const initializeMockData = () => {
  if (typeof window === 'undefined') {
    return null; // Return null or default data during SSR
  }

  const existingData = localStorage.getItem('assignmentSystemData');
  if (!existingData) {
    const mockData = {
      users: [
        { id: 'student1', name: 'Alice Johnson', email: 'alice@student.edu', role: 'student', password: 'student123' },
        { id: 'student2', name: 'Bob Smith', email: 'bob@student.edu', role: 'student', password: 'student123' },
        { id: 'student3', name: 'Carol White', email: 'carol@student.edu', role: 'student', password: 'student123' },
        { id: 'admin1', name: 'Dr. Emily Brown', email: 'emily@prof.edu', role: 'admin', password: 'admin123' }
      ],
      assignments: [
        {
          id: 'assign1',
          title: 'Data Structures Final Project',
          description: 'Implement a balanced binary search tree with full documentation',
          dueDate: '2025-11-15',
          driveLink: 'https://drive.google.com/example1',
          createdBy: 'admin1',
          createdAt: '2025-10-01'
        },
        {
          id: 'assign2',
          title: 'Machine Learning Assignment 3',
          description: 'Build and train a neural network for image classification',
          dueDate: '2025-11-20',
          driveLink: 'https://drive.google.com/example2',
          createdBy: 'admin1',
          createdAt: '2025-10-05'
        }
      ],
      submissions: [
        { id: 'sub1', assignmentId: 'assign1', studentId: 'student1', submitted: true, submittedAt: '2025-10-28' },
        { id: 'sub2', assignmentId: 'assign1', studentId: 'student2', submitted: false, submittedAt: null },
        { id: 'sub3', assignmentId: 'assign2', studentId: 'student1', submitted: false, submittedAt: null }
      ]
    };
    localStorage.setItem('assignmentSystemData', JSON.stringify(mockData));
    return mockData;
  }
  return JSON.parse(existingData);
};

// App Provider Component
const AppProvider = ({ children }) => {
  const [data, setData] = useState(initializeMockData());
  const [currentUser, setCurrentUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem('assignmentSystemData', JSON.stringify(data));
  }, [data]);

  const login = (email, password) => {
    const user = data.users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setShowMobileMenu(false);
  };

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: `assign${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      assignments: [...prev.assignments, newAssignment]
    }));
  };

  const updateSubmission = (assignmentId, studentId, submitted) => {
    setData(prev => {
      const existingSubmission = prev.submissions.find(
        s => s.assignmentId === assignmentId && s.studentId === studentId
      );

      if (existingSubmission) {
        return {
          ...prev,
          submissions: prev.submissions.map(s =>
            s.assignmentId === assignmentId && s.studentId === studentId
              ? { ...s, submitted, submittedAt: submitted ? new Date().toISOString().split('T')[0] : null }
              : s
          )
        };
      } else {
        return {
          ...prev,
          submissions: [
            ...prev.submissions,
            {
              id: `sub${Date.now()}`,
              assignmentId,
              studentId,
              submitted,
              submittedAt: submitted ? new Date().toISOString().split('T')[0] : null
            }
          ]
        };
      }
    });
  };

  return (
    <AppContext.Provider value={{
      data,
      currentUser,
      login,
      logout,
      addAssignment,
      updateSubmission,
      showMobileMenu,
      setShowMobileMenu
    }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppProvider, useApp };