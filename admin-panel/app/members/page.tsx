'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { members } from '@/data/members';
import MemberDetailsModal from '@/components/MemberDetailsModal';
import { Member } from '@/data/members';

type SortField = 'id' | 'fullName' | 'email' | 'membershipType' | 'points' | 'subscriptionStartDate' | 'subscriptionEndDate' | 'packageType';

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    let result = members.filter((member) =>
      member.userInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.userInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the results
    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'fullName':
          aValue = a.userInfo.fullName;
          bValue = b.userInfo.fullName;
          break;
        case 'email':
          aValue = a.userInfo.email;
          bValue = b.userInfo.email;
          break;
        case 'membershipType':
          aValue = a.membershipType;
          bValue = b.membershipType;
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'subscriptionStartDate':
          aValue = a.userInfo.subscriptionStartDate;
          bValue = b.userInfo.subscriptionStartDate;
          break;
        case 'subscriptionEndDate':
          aValue = a.userInfo.subscriptionEndDate;
          bValue = b.userInfo.subscriptionEndDate;
          break;
        case 'packageType':
          aValue = a.packageInfo.packageType;
          bValue = b.packageInfo.packageType;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return result;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search members..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('fullName')}
                    >
                      Name {sortField === 'fullName' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('membershipType')}
                    >
                      Membership {sortField === 'membershipType' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('points')}
                    >
                      Points {sortField === 'points' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('subscriptionStartDate')}
                    >
                      Start Date {sortField === 'subscriptionStartDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('subscriptionEndDate')}
                    >
                      End Date {sortField === 'subscriptionEndDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('packageType')}
                    >
                      Package {sortField === 'packageType' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => setSelectedMember(member)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {member.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.userInfo.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.userInfo.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.membershipType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.points}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.userInfo.subscriptionStartDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.userInfo.subscriptionEndDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.packageInfo.packageType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <MemberDetailsModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};

export default Members; 