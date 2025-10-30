import { useState} from 'react';
import { useApp } from '../../context/AppContext';
import type { FormEvent } from 'react';

const CreateAssignmentModal = ({ onClose }: { onClose: (success: boolean) => void }) => {
  const { addAssignment, currentUser } = useApp();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    driveLink: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) {
      alert('Title and Due Date are required.');
      return;
    }
    
    addAssignment({
      ...formData,
      createdBy: currentUser.id
    });
    
    onClose(true); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Assignment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Drive Link</label>
            <input
              type="url"
              value={formData.driveLink}
              onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit" 
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
            >
              Create Assignment
            </button>
            <button
              type="button"
              onClick={() => onClose(false)} 
              className="flex-1 bg-gray-300 text-white py-2 rounded-lg font-medium hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;