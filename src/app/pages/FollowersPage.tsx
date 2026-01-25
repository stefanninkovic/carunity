import { useNavigate } from 'react-router-dom';
import { User, UserCheck, ArrowLeft } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { useFollow } from '../context/FollowContext';

export function FollowersPage() {
  const navigate = useNavigate();
  const { getFollowersList, followUser, unfollowUser, isFollowing } = useFollow();
  const followersList = getFollowersList();

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
              <h1 className="text-2xl font-bold text-gray-900">Followers</h1>
              <p className="text-gray-600">{followersList.length} users</p>
            </div>
          </div>
        </div>

        {/* Followers List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {followersList.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {followersList.map((userId) => {
                const user = mockUsers[userId];
                if (!user) return null;
                const following = isFollowing(userId);
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
                      onClick={() => (following ? unfollowUser(userId) : followUser(userId))}
                      className={`ml-4 px-4 py-2 rounded-lg transition-colors font-medium flex-shrink-0 ${
                        following
                          ? 'bg-[#2E7C6D] text-white hover:bg-[#256B5E]'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {following ? (
                        <div className="flex items-center space-x-2">
                          <UserCheck className="h-4 w-4" />
                          <span>Following</span>
                        </div>
                      ) : (
                        'Follow'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No followers yet</p>
              <p className="text-gray-500 text-sm mt-2">When users follow you, they'll appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
