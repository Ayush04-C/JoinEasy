# Assingment Hub

A unified platform for professors and students — where students can seamlessly view and submit their assignments, and professors can efficiently track student progress. Designed to simplify and enhance the academic workflow for both students and educators.

# Component Descriptions
- Login Component (Login.tsx): Handles user authentication with predefined demo credentials for students and professors.
- App Context (AppContext.tsx): Manages global application state including user authentication, assignment data, and submission tracking using localStorage for persistence.
- Student Dashboard (StudentDashboard.tsx): Provides students with an overview of their assignments, submission status, and overall progress tracking.
- Admin Dashboard (AdminDashboard.tsx): Enables professors to create, monitor, and delete assignments along with tracking student submissions.
- Animation Components: Custom animation utilities that enhance the user interface with interactive visual effects.

<br>

<img width="1722" height="800" alt="image" src="https://github.com/user-attachments/assets/07656216-b42d-481d-9812-2e7ec3cfda33" />

<br>


# Detailed User Flows
- Initial Login Process:
  - Users access the application and are presented with the Login screen
  - Users enter credentials (demo credentials provided):
    - Student: alice@student.edu / student123
    - Professor: emily@prof.edu / admin123
    - Based on the user role, they are directed to the appropriate dashboard
&nbsp;
- Student User Flow:
  - View all assigned assignments in card format
  - Track overall progress with visual indicators
  - See submission status for each assignment
  - Access assignment details and external links
&nbsp;
- Professor/Instructor User Flow:
  - Create new assignments through a modal form
  - Monitor student progress across all assignments
  - View submission statistics and individual student status
  - Delete assignments with confirmation dialog

<br>

# Technical Stack Documentation

- Core Technologies
  - React 19.1.1: Frontend library for building user interfaces
  - TypeScript ~5.9.3: Typed superset of JavaScript for enhanced development experience
  - Vite 7.1.7: Fast build tool and development server
- UI Libraries and Styling
  - Tailwind CSS 4.1.16: Utility-first CSS framework for rapid UI development
  - Lucide React 0.548.0: Icon library with consistent, scalable vector icons
  - GSAP 3.13.0: Animation library for creating high-performance animations
- State Management
  - React Context API: Built-in state management solution for sharing data across components
  - LocalStorage: Client-side data persistence for mock assignment system
- Development Tools
  - ESLint 9.36.0: Code quality and consistency enforcement
  - PostCSS 8.5.6: CSS processing and transformation tool
  - Autoprefixer 10.4.21: Vendor prefixing for cross-browser compatibility
- Build and Deployment
  - Vite: Fast build tool with Hot Module Replacement (HMR)
  - TypeScript Compiler: Type checking and transpilation to JavaScript
- Key Features
  - Responsive Design: Mobile-friendly interface using Tailwind's responsive utilities
  - Interactive Animations: Custom GSAP-based animations for enhanced UX
  - Role-Based Access Control: Different views and permissions for students vs. professors
  - Persistent Data Storage: Mock data system using localStorage
  - Visual Progress Tracking: Progress bars and statistics visualization


# Preview

- Login Page
&nbsp;&nbsp;&nbsp;&nbsp;<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/9ab91f84-dcbb-4607-b242-0ee16842e1a6" />
<br>

- Student Dashboard
&nbsp;<img width="1919" height="873" alt="image" src="https://github.com/user-attachments/assets/4ba981f0-a4db-4099-800b-e8c35e651d0d" />
<br>

- Professors DashBoard
&nbsp;<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/c9bea411-6fe3-4126-8e5e-18ad0a60c41d" />

