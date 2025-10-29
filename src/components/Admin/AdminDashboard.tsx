import { useState } from 'react';
import { BookOpen, ExternalLink, Plus, Users, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Navigation from '../Navigation';
import CreateAssignmentModal from './AssingmentModal';
import InteractiveBg from '../../animations/Interactivebg';
<link href="/src/style.css" rel="stylesheet"></link>


// Admin Dashboard
const AdminDashboard = () => {
  const { data, currentUser } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myAssignments = data.assignments.filter(a => a.createdBy === currentUser.id);
  const students = data.users.filter(u => u.role === 'student');

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <InteractiveBg />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {myAssignments.map(assignment => {
            const assignmentSubmissions = data.submissions.filter(s => s.assignmentId === assignment.id);
            const submittedCount = assignmentSubmissions.filter(s => s.submitted).length;
            const totalStudents = students.length;
            const progressPercentage = totalStudents > 0 ? (submittedCount / totalStudents) * 100 : 0;

            return (
              <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-gray-500">
                        Due: <span className="font-medium text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span>
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
                    <span className="text-sm font-medium text-gray-700">Overall Submission Rate</span>
                    <span className="text-sm font-semibold text-indigo-600">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Student Progress</h4>
                  {students.map(student => {
                    const submission = assignmentSubmissions.find(s => s.studentId === student.id);
                    const isSubmitted = submission?.submitted || false;

                    return (
                      <div key={student.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
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

      {showCreateModal && <CreateAssignmentModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default AdminDashboard;