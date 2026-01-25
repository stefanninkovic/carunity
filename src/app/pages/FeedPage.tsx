import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Eye, User, Car, Video, Users, MapPin, Fuel, Gauge, Calendar, UserPlus, UserCheck, X } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { useCars } from '../context/CarsContext';
import { useWheels } from '../context/WheelsContext';
import { useFollow } from '../context/FollowContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

type FeedItem = {
  id: string;
  type: 'car' | 'wheel';
  userId: string;
  userName: string;
  userLocation: string;
  timestamp: Date;
  data: any;
};

export function FeedPage() {
  const navigate = useNavigate();
  const { cars } = useCars();
  const { wheels } = useWheels();
  const { getFollowingList, getFollowingCount, isFollowing, followUser, unfollowUser } = useFollow();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'cars' | 'wheels'>('cars');
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [currentWheelIndex, setCurrentWheelIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Return null while redirecting
  if (!isAuthenticated) {
    return null;
  }

  const followingList = getFollowingList();

  // Create feed items from cars and wheels of followed users
  const carItems: FeedItem[] = [];
  const wheelItems: FeedItem[] = [];

  // Add cars from followed users
  cars.forEach((car) => {
    if (followingList.includes(car.sellerId) && car.isListed !== false) {
      const user = mockUsers[car.sellerId];
      if (user) {
        carItems.push({
          id: `car-${car.id}`,
          type: 'car',
          userId: car.sellerId,
          userName: user.name,
          userLocation: user.location,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random within last week
          data: car,
        });
      }
    }
  });

  // Add wheels from followed users
  wheels.forEach((wheel) => {
    if (followingList.includes(wheel.userId) && wheel.isListed !== false) {
      const user = mockUsers[wheel.userId];
      if (user) {
        wheelItems.push({
          id: `wheel-${wheel.id}`,
          type: 'wheel',
          userId: wheel.userId,
          userName: user.name,
          userLocation: user.location,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random within last week
          data: wheel,
        });
      }
    }
  });

  // Sort by timestamp (newest first)
  const sortedCars = carItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  const sortedWheels = wheelItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const handleLike = (itemId: string) => {
    setLikedItems((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(itemId)) {
        newLikes.delete(itemId);
      } else {
        newLikes.add(itemId);
      }
      return newLikes;
    });
  };

  const goToNext = () => {
    setCurrentWheelIndex((prev) => (prev + 1) % sortedWheels.length);
  };

  const goToPrevious = () => {
    setCurrentWheelIndex((prev) => (prev - 1 + sortedWheels.length) % sortedWheels.length);
  };

  const handleToggleFollow = (userId: string) => {
    if (isFollowing(userId)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  // Handle wheel/scroll events for wheels view
  useEffect(() => {
    if (filter !== 'wheels' || sortedWheels.length === 0) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();
      
      // Detect scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - go to next wheel
        if (currentWheelIndex < sortedWheels.length - 1) {
          setIsScrolling(true);
          setCurrentWheelIndex((prev) => prev + 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      } else if (e.deltaY < 0) {
        // Scrolling up - go to previous wheel
        if (currentWheelIndex > 0) {
          setIsScrolling(true);
          setCurrentWheelIndex((prev) => prev - 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [filter, currentWheelIndex, sortedWheels.length, isScrolling]);

  // Handle touch events for mobile (wheels view)
  useEffect(() => {
    if (filter !== 'wheels' || sortedWheels.length === 0) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling) return;

      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped up - go to next wheel
          if (currentWheelIndex < sortedWheels.length - 1) {
            setIsScrolling(true);
            setCurrentWheelIndex((prev) => prev + 1);
            setTimeout(() => setIsScrolling(false), 800);
          }
        } else {
          // Swiped down - go to previous wheel
          if (currentWheelIndex > 0) {
            setIsScrolling(true);
            setCurrentWheelIndex((prev) => prev - 1);
            setTimeout(() => setIsScrolling(false), 800);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [filter, currentWheelIndex, sortedWheels.length, isScrolling]);

  if (followingList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Following Yet</h2>
            <p className="text-gray-600 mb-6">
              Start following users to see their cars and wheels in your feed
            </p>
            <button
              onClick={() => navigate('/offers')}
              className="px-6 py-3 bg-[#2E7C6D] text-white rounded-lg hover:bg-[#256B5E] transition-colors font-medium"
            >
              Explore Offers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Wheels view - full screen TikTok style
  if (filter === 'wheels') {
    if (sortedWheels.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Following Feed</h1>
                  <p className="text-gray-600 mt-1">
                    See what {getFollowingCount()} {getFollowingCount() === 1 ? 'user' : 'users'} you follow {getFollowingCount() === 1 ? 'is' : 'are'} posting
                  </p>
                </div>
                <Users className="h-12 w-12 text-[#2E7C6D]" />
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-2 border-b border-gray-200">
                <button
                  onClick={() => setFilter('cars')}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                    filter === 'cars'
                      ? 'text-[#2E7C6D] border-[#2E7C6D]'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  Cars ({sortedCars.length})
                </button>
                <button
                  onClick={() => setFilter('wheels')}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                    filter === 'wheels'
                      ? 'text-[#2E7C6D] border-[#2E7C6D]'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  Wheels ({sortedWheels.length})
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Video className="h-20 w-20 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Wheel Videos Yet</h2>
              <p className="text-gray-600">
                The users you follow haven't posted any wheels yet
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Following Feed</h1>
                <p className="text-gray-600 mt-1">
                  See what {getFollowingCount()} {getFollowingCount() === 1 ? 'user' : 'users'} you follow {getFollowingCount() === 1 ? 'is' : 'are'} posting
                </p>
              </div>
              <Users className="h-12 w-12 text-[#2E7C6D]" />
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setFilter('cars')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filter === 'cars'
                    ? 'text-[#2E7C6D] border-[#2E7C6D]'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                Cars ({sortedCars.length})
              </button>
              <button
                onClick={() => setFilter('wheels')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filter === 'wheels'
                    ? 'text-[#2E7C6D] border-[#2E7C6D]'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                Wheels ({sortedWheels.length})
              </button>
            </div>
          </div>

          {/* Wheels Full Screen View */}
          <div className="fixed inset-0 bg-black overflow-hidden" style={{ top: '0', left: '0', zIndex: 40 }}>
            <div className="relative w-full max-w-lg h-full mx-auto bg-black md:rounded-lg overflow-hidden">
              {/* Wheels Container - Vertical Stack */}
              <div 
                className="relative transition-transform duration-700 ease-out"
                style={{ 
                  transform: `translateY(-${currentWheelIndex * 82}vh)`,
                  height: `${sortedWheels.length * 82}vh`
                }}
              >
                {sortedWheels.map((wheel, index) => {
                  const wheelIsLiked = likedItems.has(wheel.id);
                  const wheelFollowing = isFollowing(wheel.userId);
                  const associatedCar = wheel.data.carId
                    ? cars.find((car) => car.id === wheel.data.carId)
                    : null;

                  return (
                    <div 
                      key={wheel.id} 
                      className="absolute w-full h-screen flex items-center justify-center"
                      style={{
                        top: `${index * 82}vh`,
                        pointerEvents: index === currentWheelIndex ? 'auto' : 'none',
                      }}
                    >
                      {/* Video/Image Container */}
                      <div className="relative h-[80vh] overflow-hidden" style={{ marginTop: '64px', aspectRatio: '9/16' }}>
                        <img
                          src={wheel.data.thumbnailUrl}
                          alt={wheel.data.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
                          {/* Bottom Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-end justify-between">
                              <div className="flex-1">
                                <h2 className="text-xl font-bold mb-2">{wheel.data.title}</h2>
                                <p className="text-sm text-gray-200 mb-2">
                                  {wheel.data.description}
                                </p>
                                <button
                                  onClick={() => navigate(`/user/${wheel.userId}`)}
                                  className="text-sm text-gray-300 hover:text-white transition-colors hover:underline mb-3"
                                >
                                  @{wheel.userName}
                                </button>
                                
                                {/* View Offer Button - Shows when wheel has an associated car that is listed */}
                                {associatedCar && associatedCar.isListed !== false && (
                                  <div className="mt-3">
                                    <button
                                      onClick={() => navigate(`/offers/${associatedCar.id}`)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-[#2E7C6D] hover:bg-[#256B5E] rounded-lg transition-colors shadow-lg"
                                    >
                                      <Car className="h-4 w-4" />
                                      <span className="text-sm font-semibold">View Offer</span>
                                    </button>
                                    <p className="text-xs text-gray-300 mt-1">
                                      {associatedCar.make} {associatedCar.model} ({associatedCar.year})
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col items-center space-y-6 ml-4">
                                <button
                                  onClick={() => handleLike(wheel.id)}
                                  className="flex flex-col items-center"
                                >
                                  <div
                                    className={`p-3 rounded-full ${
                                      wheelIsLiked
                                        ? 'bg-red-500'
                                        : 'bg-gray-800/50'
                                    } backdrop-blur-sm`}
                                  >
                                    <Heart
                                      className={`h-6 w-6 ${
                                        wheelIsLiked ? 'fill-white' : ''
                                      }`}
                                    />
                                  </div>
                                  <span className="text-sm mt-1">
                                    {wheelIsLiked
                                      ? wheel.data.likes + 1
                                      : wheel.data.likes}
                                  </span>
                                </button>

                                <div className="flex flex-col items-center">
                                  <div className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm">
                                    <Eye className="h-6 w-6" />
                                  </div>
                                  <span className="text-sm mt-1">
                                    {wheel.data.views.toLocaleString()}
                                  </span>
                                </div>

                                {/* Follow/Unfollow Button */}
                                <button
                                  onClick={() => handleToggleFollow(wheel.userId)}
                                  className="flex flex-col items-center"
                                >
                                  <div
                                    className={`p-3 rounded-full ${
                                      wheelFollowing
                                        ? 'bg-green-500'
                                        : 'bg-gray-800/50'
                                    } backdrop-blur-sm`}
                                  >
                                    {wheelFollowing ? (
                                      <UserCheck className="h-6 w-6 fill-white" />
                                    ) : (
                                      <UserPlus className="h-6 w-6" />
                                    )}
                                  </div>
                                  <span className="text-sm mt-1">
                                    {wheelFollowing ? 'Following' : 'Follow'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cars view - Grid layout like offers page
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Following Feed</h1>
              <p className="text-gray-600 mt-1">
                See what {getFollowingCount()} {getFollowingCount() === 1 ? 'user' : 'users'} you follow {getFollowingCount() === 1 ? 'is' : 'are'} posting
              </p>
            </div>
            <Users className="h-12 w-12 text-[#2E7C6D]" />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => setFilter('cars')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filter === 'cars'
                  ? 'text-[#2E7C6D] border-[#2E7C6D]'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Cars ({sortedCars.length})
            </button>
            <button
              onClick={() => setFilter('wheels')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filter === 'wheels'
                  ? 'text-[#2E7C6D] border-[#2E7C6D]'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Wheels ({sortedWheels.length})
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        {sortedCars.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Car className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Car Listings Yet</h2>
            <p className="text-gray-600">
              The users you follow haven't posted any cars yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCars.map((item) => {
              const car = item.data;
              const carImages = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* User Header */}
                  <div className="p-3 border-b border-gray-200">
                    <button
                      onClick={() => navigate(`/user/${item.userId}`)}
                      className="flex items-center space-x-2 hover:opacity-80 transition-opacity w-full"
                    >
                      <div className="w-8 h-8 bg-[#A5D6A7] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-[#2E7C6D]" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-semibold text-gray-900">{item.userName}</p>
                        <p className="text-xs text-gray-500">{formatTimeAgo(item.timestamp)}</p>
                      </div>
                    </button>
                  </div>

                  {/* Car Card */}
                  <button
                    onClick={() => navigate(`/offers/${car.id}`)}
                    className="w-full text-left"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={carImages[0]}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                      {car.featured && (
                        <div className="absolute top-2 right-2 bg-[#2E7C6D] text-white px-3 py-1 rounded-full text-sm z-10">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-sm capitalize z-10">
                        {car.condition}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {car.make} {car.model}
                          </h3>
                          <p className="text-gray-600 text-sm">{car.year}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#2E7C6D]">
                            CHF {car.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Gauge className="h-4 w-4 text-gray-400" />
                          <span>{car.mileage.toLocaleString()} km</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Fuel className="h-4 w-4 text-gray-400" />
                          <span className="capitalize">{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="capitalize">{car.transmission}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{car.location}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}