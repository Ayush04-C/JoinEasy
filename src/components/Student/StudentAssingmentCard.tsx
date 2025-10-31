import { useState } from 'react';
import { CheckCircle, Clock, ExternalLink, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import FadeContent from '../../animations/FadeContent'

const StudentAssignmentCard = ({ assignment, submission }) => {
  const { updateSubmission, currentUser } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isSubmitted = submission?.submitted || false;
  const dueDate = new Date(assignment.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today && !isSubmitted;

  const handleSubmit = () => {
    updateSubmission(assignment.id, currentUser.id, true);
    setShowConfirmation(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
  <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0}>
    <div className="rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-md transition-shadow backdrop-blur-md bg-black/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{assignment.title}</h3>
          <p className="text-sm text-white mb-3">{assignment.description}</p>
        </div>
        {isSubmitted ? (
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
        ) : isOverdue ? (
          <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 ml-2" />
        ) : (
          <Clock className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-2" />
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white">Due Date:</span>
          <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-white'}`}>
            {dueDate.toLocaleDateString()}
          </span>
        </div>

        {assignment.driveLink && (
          <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Submit via Google Drive</span>
          </a>
        )}

        <div className="pt-3 border-t border-gray-200">
          {isSubmitted ? (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Submitted on {submission.submittedAt}</span>
            </div>
          ) : (
            <button
            onClick={() => setShowConfirmation(true)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Mark as Submitted
            </button>
          )}
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Submission</h3>
            <p className="text-sm text-gray-600 mb-4">
              Have you submitted your assignment for "<strong>{assignment.title}</strong>"?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700"
              >
                Yes, I've Submitted
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-300"
                >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Submission confirmed!</span>
          </div>
        </div>
      )}
    </div>
  </FadeContent>
  );
};

export default StudentAssignmentCard;