import { useState } from 'react';
import { BookOpen, ExternalLink, Plus, Users, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navigation from '../Navigationbar/Navigation';
import CreateAssignmentModal from './AssingmentModal';
import InteractiveBg from '../../animations/Interactivebg';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  driveLink?: string;
  createdBy: string;
}

interface Submission {
  assignmentId: string;
  studentId: string;
  submitted: boolean;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const { data, currentUser, setData } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  
  
  const handleDeleteAssignment = () => {
    if (assignmentToDelete) {
      setData((prevData: any) => ({
        ...prevData,
        assignments: prevData.assignments.filter((assignment: Assignment) => assignment.id !== assignmentToDelete),
        submissions: prevData.submissions.filter((submission: Submission) => submission.assignmentId !== assignmentToDelete),
      }));
      setSuccessMessage('Assignment deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); 
      setShowDeleteConfirmation(false);
      setAssignmentToDelete(null);
    }
  };

  const myAssignments = data.assignments.filter((a: Assignment) => a.createdBy === currentUser.id);
  const students = data.users.filter((u: any) => u.role === 'student') as Student[];
  
  return (
    <div className="fixed top-16 left-0 w-screen h-[calc(100vh-4rem)] overflow-y-auto">
      <InteractiveBg />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div
            className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50 transition-transform transform animate-slide-in"
            style={{ animationDuration: '0.5s' }}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Assignment Management</h2>
            <p className="text-white">Track student submissions across all assignments</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Assignment</span>
          </button>
        </div>

        <div className="space-y-6">
            {myAssignments.map((assignment: Assignment) => {
              const assignmentSubmissions = data.submissions.filter((s: Submission) => s.assignmentId === assignment.id);
              const submittedCount = assignmentSubmissions.filter((s: Submission) => s.submitted).length;
              const totalStudents = students.length;
              const progressPercentage = totalStudents > 0 ? (submittedCount / totalStudents) * 100 : 0;

              return (
                <div key={assignment.id} className="backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{assignment.title}</h3>
                      <p className="text-sm text-white mb-3">{assignment.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-white">
                          Due: <span className="font-medium text-white">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </span>
                        {assignment.driveLink && (
                          <a
                            href={assignment.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Drive Link</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
                      <Users className="w-6 h-6" />
                      <span>{submittedCount}/{totalStudents}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Overall Submission Rate</span>
                      <span className="text-sm font-semibold text-indigo-600">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 backdrop-blur-sm p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-white mb-3">Student Progress</h4>
                    {students.map((student: Student) => {
                      const submission = assignmentSubmissions.find((s: Submission) => s.studentId === student.id);
                      const isSubmitted = submission?.submitted || false;

                      return (
                        <div key={student.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg" style={{background:' linear-gradient(135deg, #230944ff 0%, #070215ff 100%)'}}>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{student.name}</p>
                            <p className="text-xs text-white">{student.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isSubmitted ? (
                              <>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium text-green-600">Submitted</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-medium text-red-600">Not Submitted</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                    <button
                    onClick={() => {
                      setAssignmentToDelete(assignment.id);
                      setShowDeleteConfirmation(true);
                    }}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors" style={{backgroundColor:'red'}}
                  >
                    Delete Assignment
                  </button>
                </div>
              );
            })}
        </div>

        {myAssignments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No assignments created yet</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Assignment</span>
            </button>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateAssignmentModal
          onClose={(success) => {
            setShowCreateModal(false);
            if (success) {
              setSuccessMessage('Assignment created successfully!');
              setTimeout(() => setSuccessMessage(''), 3000); 
            }
          }}
        />
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this assignment?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteAssignment}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="flex-1 bg-gray-200 text-white py-2 rounded-lg font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;