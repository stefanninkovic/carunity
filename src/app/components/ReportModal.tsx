import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useReports, ReportType } from '../context/ReportContext';
import { useAuth } from '../context/AuthContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ReportType;
  targetId: string;
  targetName: string;
}

export function ReportModal({
  isOpen,
  onClose,
  type,
  targetId,
  targetName
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { submitReport, getReportReasons } = useReports();
  const { user } = useAuth();

  const reasons = getReportReasons(type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReason || !user) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    submitReport(type, targetId, targetName, selectedReason, description, user.id);

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset and close after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedReason('');
      setDescription('');
      onClose();
    }, 2000);
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'account':
        return 'Account';
      case 'offer':
        return 'Offer';
      case 'wheel':
        return 'Wheel';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Report {getTypeLabel()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {showSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Report Submitted
            </h3>
            <p className="text-gray-600">
              Thank you for helping keep our community safe.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              You're reporting: <span className="font-semibold">{targetName}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for report *
                </label>
                <div className="space-y-2">
                  {reasons.map((reason) => (
                    <label
                      key={reason}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-4 h-4 text-[#2E7C6D] focus:ring-[#2E7C6D]"
                        required
                      />
                      <span className="text-sm text-gray-700">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Additional details (optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] resize-none"
                  placeholder="Provide any additional context..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedReason || isSubmitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
