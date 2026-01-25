import { createContext, useContext, useState, ReactNode } from 'react';

interface FollowContextType {
  following: Set<string>; // Set of user IDs that the current user is following
  followers: Set<string>; // Set of user IDs that follow the current user (mock data)
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  getFollowingCount: () => number;
  getFollowersCount: () => number;
  getFollowingList: () => string[];
  getFollowersList: () => string[];
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export function FollowProvider({ children }: { children: ReactNode }) {
  const [following, setFollowing] = useState<Set<string>>(new Set());
  // Mock followers - in a real app this would come from a backend
  const [followers] = useState<Set<string>>(new Set(['seller2', 'user2', 'user3']));

  const followUser = (userId: string) => {
    setFollowing((prev) => {
      const newFollowing = new Set(prev);
      newFollowing.add(userId);
      return newFollowing;
    });
  };

  const unfollowUser = (userId: string) => {
    setFollowing((prev) => {
      const newFollowing = new Set(prev);
      newFollowing.delete(userId);
      return newFollowing;
    });
  };

  const isFollowing = (userId: string) => {
    return following.has(userId);
  };

  const getFollowingCount = () => {
    return following.size;
  };

  const getFollowersCount = () => {
    return followers.size;
  };

  const getFollowingList = () => {
    return Array.from(following);
  };

  const getFollowersList = () => {
    return Array.from(followers);
  };

  return (
    <FollowContext.Provider value={{ following, followers, followUser, unfollowUser, isFollowing, getFollowingCount, getFollowersCount, getFollowingList, getFollowersList }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
}