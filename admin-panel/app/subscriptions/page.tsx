'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { members } from '@/data/members';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Subscriptions = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Calculate subscription statistics
  const subscriptionStats = {
    totalMembers: members.length,
    activeSubscriptions: members.filter(
      (member) => new Date(member.userInfo.subscriptionEndDate) > new Date()
    ).length,
    expiringSoon: members.filter(
      (member) => {
        const endDate = new Date(member.userInfo.subscriptionEndDate);
        const today = new Date();
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
      }
    ).length,
  };

  // Chart data for subscription types
  const subscriptionTypeData = {
    labels: ['Standard', 'Premium', 'Lifetime'],
    datasets: [
      {
        label: 'Number of Members',
        data: [
          members.filter((m) => m.membershipType === 'Standard').length,
          members.filter((m) => m.membershipType === 'Premium').length,
          members.filter((m) => m.membershipType === 'Lifetime').length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Members</h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {subscriptionStats.totalMembers}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Subscriptions</h3>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {subscriptionStats.activeSubscriptions}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Expiring Soon</h3>
              <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {subscriptionStats.expiringSoon}
              </p>
            </div>
          </div>

          {/* Subscription Type Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Membership Distribution
            </h3>
            <Bar data={subscriptionTypeData} />
          </div>

          {/* Member Discounts */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Member Discounts
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Package Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Discounts
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className={`${
                        selectedMember === member.id
                          ? 'bg-gray-50 dark:bg-gray-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedMember(member.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {member.userInfo.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.packageInfo.packageType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                        <ul className="list-disc list-inside">
                          {member.packageInfo.discounts.map((discount, index) => (
                            <li key={index}>
                              {discount.discountType}: {discount.discountAmount}%
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions; 