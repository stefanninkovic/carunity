import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWheels } from '../context/WheelsContext';
import { useCars } from '../context/CarsContext';
import { useFollow } from '../context/FollowContext';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, Car, X, UserPlus, UserCheck, Flag } from 'lucide-react';
import { ReportModal } from '../components/ReportModal';
import { useTranslation } from 'react-i18next';

export function WheelsPage() {
  const { wheels } = useWheels();
  const { cars } = useCars();
  const { isFollowing, followUser, unfollowUser } = useFollow();
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedWheels, setLikedWheels] = useState<Set<string>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showReportModal, setShowReportModal] = useState(false);
  const { t } = useTranslation();

  // Get filter parameters from URL
  const carIdFilter = searchParams.get('carId');
  const wheelIdParam = searchParams.get('wheelId');

  // Filter wheels based on carId if provided, otherwise show all listed wheels
  const filteredWheels = useMemo(() => {
    return carIdFilter
      ? wheels.filter((wheel) => wheel.carId === carIdFilter && wheel.isListed !== false)
      : wheels.filter((wheel) => wheel.isListed !== false);
  }, [wheels, carIdFilter]);
  
  // Get the associated car if filtering by carId
  const filteredCar = carIdFilter ? cars.find((car) => car.id === carIdFilter) : null;

  // Set initial index based on wheelId parameter
  useEffect(() => {
    if (wheelIdParam) {
      const wheelIndex = filteredWheels.findIndex((wheel) => wheel.id === wheelIdParam);
      if (wheelIndex !== -1) {
        setCurrentIndex(wheelIndex);
      }
    }
  }, [wheelIdParam]);

  // Disable body scrolling when component mounts
  useEffect(() => {
    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
    };
  }, []);

  if (filteredWheels.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">{t('wheelsPage.noWheels')}</p>
          <p className="text-gray-400">{t('wheelsPage.checkBackLater')}</p>
          {carIdFilter && (
            <button
              onClick={() => navigate(`/offers/${carIdFilter}`)}
              className="mt-4 px-6 py-2 bg-[#2E7C6D] hover:bg-[#256B5E] rounded-lg transition-colors"
            >
              {t('wheelsPage.backToOffer')}
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentWheel = filteredWheels[currentIndex];
  
  // Find the associated car if there's a carId
  const associatedCar = currentWheel.carId
    ? cars.find((car) => car.id === currentWheel.carId)
    : null;

  const handleLike = () => {
    setLikedWheels((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(currentWheel.id)) {
        newLikes.delete(currentWheel.id);
      } else {
        newLikes.add(currentWheel.id);
      }
      return newLikes;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredWheels.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredWheels.length) % filteredWheels.length);
  };

  useEffect(() => {
    const indexParam = searchParams.get('index');
    if (indexParam) {
      const index = parseInt(indexParam, 10);
      if (index >= 0 && index < filteredWheels.length && index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  }, [filteredWheels]);

  // Handle wheel/scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();
      
      // Detect scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - go to next wheel
        if (currentIndex < filteredWheels.length - 1) {
          setIsScrolling(true);
          setCurrentIndex((prev) => prev + 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      } else if (e.deltaY < 0) {
        // Scrolling up - go to previous wheel
        if (currentIndex > 0) {
          setIsScrolling(true);
          setCurrentIndex((prev) => prev - 1);
          setTimeout(() => setIsScrolling(false), 800);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, filteredWheels.length, isScrolling]);

  // Handle touch events for mobile
  useEffect(() => {
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
          if (currentIndex < filteredWheels.length - 1) {
            setIsScrolling(true);
            setCurrentIndex((prev) => prev + 1);
            setTimeout(() => setIsScrolling(false), 800);
          }
        } else {
          // Swiped down - go to previous wheel
          if (currentIndex > 0) {
            setIsScrolling(true);
            setCurrentIndex((prev) => prev - 1);
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
  }, [currentIndex, filteredWheels.length, isScrolling]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="relative w-full max-w-lg h-full mx-auto bg-black md:rounded-lg overflow-hidden" id="wheels-container">
        {/* Filter Indicator - Shows when filtering by car */}
        {carIdFilter && filteredCar && (
          <div className="absolute top-20 left-4 right-4 z-20 flex items-center justify-between bg-[#2E7C6D]/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white">
            <div className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span className="text-sm font-semibold">
                {t('wheelsPage.viewingVideos')} {filteredCar.make} {filteredCar.model}
              </span>
            </div>
            <button
              onClick={() => navigate('/wheels')}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              title={t('wheelsPage.viewAllWheels')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Wheels Container - Vertical Stack */}
        <div 
          className="relative transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateY(-${currentIndex * 82}vh)`,
            height: `${filteredWheels.length * 82}vh`
          }}
        >
          {filteredWheels.map((wheel, index) => {
            const associatedCar = wheel.carId
              ? cars.find((car) => car.id === wheel.carId)
              : null;

            return (
              <div 
                key={wheel.id} 
                className="absolute w-full h-screen flex items-center justify-center"
                style={{
                  top: `${index * 82}vh`,
                  pointerEvents: index === currentIndex ? 'auto' : 'none',
                }}
              >
                {/* Video/Image Container */}
                <div className="relative h-[80vh] overflow-hidden" style={{ marginTop: '64px', aspectRatio: '9/16' }}>
                  <img
                    src={wheel.thumbnailUrl}
                    alt={wheel.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-end justify-between">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2">{wheel.title}</h2>
                          <p className="text-sm text-gray-200 mb-2">
                            {wheel.description}
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
                                <span className="text-sm font-semibold">{t('wheels.viewOffer')}</span>
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
                            onClick={() => {
                              setLikedWheels((prev) => {
                                const newLikes = new Set(prev);
                                if (newLikes.has(wheel.id)) {
                                  newLikes.delete(wheel.id);
                                } else {
                                  newLikes.add(wheel.id);
                                }
                                return newLikes;
                              });
                            }}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`p-3 rounded-full ${
                                likedWheels.has(wheel.id)
                                  ? 'bg-red-500'
                                  : 'bg-gray-800/50'
                              } backdrop-blur-sm`}
                            >
                              <Heart
                                className={`h-6 w-6 ${
                                  likedWheels.has(wheel.id) ? 'fill-white' : ''
                                }`}
                              />
                            </div>
                            <span className="text-sm mt-1">
                              {likedWheels.has(wheel.id)
                                ? wheel.likes + 1
                                : wheel.likes}
                            </span>
                          </button>

                          {/* Follow/Unfollow Button */}
                          <button
                            onClick={() => {
                              if (!isAuthenticated) {
                                navigate('/login');
                                return;
                              }
                              if (isFollowing(wheel.userId)) {
                                unfollowUser(wheel.userId);
                              } else {
                                followUser(wheel.userId);
                              }
                            }}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`p-3 rounded-full ${
                                isFollowing(wheel.userId)
                                  ? 'bg-green-500'
                                  : 'bg-gray-800/50'
                              } backdrop-blur-sm`}
                            >
                              {isFollowing(wheel.userId) ? (
                                <UserCheck className="h-6 w-6 fill-white" />
                              ) : (
                                <UserPlus className="h-6 w-6" />
                              )}
                            </div>
                            <span className="text-sm mt-1">
                              {isFollowing(wheel.userId) ? t('userProfile.following') : t('userProfile.follow')}
                            </span>
                          </button>

                          {/* Report Button */}
                          <button
                            onClick={() => setShowReportModal(true)}
                            className="flex flex-col items-center"
                          >
                            <div
                              className={`p-3 rounded-full bg-gray-800/50 backdrop-blur-sm`}
                            >
                              <Flag className="h-6 w-6" />
                            </div>
                            <span className="text-sm mt-1">
                              {t('wheelsPage.report')}
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

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        type="wheel"
        targetId={currentWheel.id}
        targetName={currentWheel.title}
      />
    </div>
  );
}