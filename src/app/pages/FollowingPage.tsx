import { useNavigate } from 'react-router-dom';
import { User, UserCheck, ArrowLeft } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { useFollow } from '../context/FollowContext';

export function FollowingPage() {
  const navigate = useNavigate();
  const { getFollowingList, unfollowUser } = useFollow();
  const followingList = getFollowingList();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Following</h1>
              <p className="text-gray-600">{followingList.length} users</p>
            </div>
          </div>
        </div>

        {/* Following List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {followingList.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {followingList.map((userId) => {
                const user = mockUsers[userId];
                if (!user) return null;
                return (
                  <div key={userId} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <button
                      onClick={() => navigate(`/user/${userId}`)}
                      className="flex items-center space-x-4 flex-1 text-left"
                    >
                      <div className="w-14 h-14 bg-[#A5D6A7] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-7 w-7 text-[#2E7C6D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-semibold truncate text-lg">{user.name}</p>
                        <p className="text-gray-600 text-sm truncate">{user.location}</p>
                      </div>
                    </button>
                    <button
                      onClick={() => unfollowUser(userId)}
                      className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex-shrink-0"
                    >
                      Unfollow
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Not following anyone yet</p>
              <p className="text-gray-500 text-sm mt-2">Start following users to see them here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
