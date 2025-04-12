'use client';

import { Member } from '@/data/members';

interface MemberDetailsModalProps {
  member: Member | null;
  onClose: () => void;
}

const MemberDetailsModal = ({ member, onClose }: MemberDetailsModalProps) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Member Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Member ID
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {member.id}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Full Name
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {member.userInfo.fullName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {member.userInfo.email}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Membership Type
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {member.membershipType}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Package Type
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {member.packageInfo.packageType}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Points
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {member.points}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Subscription Period
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {member.userInfo.subscriptionStartDate} to{' '}
              {member.userInfo.subscriptionEndDate} (
              {member.userInfo.subscriptionDuration} year
              {member.userInfo.subscriptionDuration > 1 ? 's' : ''})
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Discounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {member.packageInfo.discounts.map((discount, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {discount.discountType}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {discount.discountAmount}% off
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsModal; 