import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, User as UserIcon, Heart, Eye, UserPlus, UserCheck, Flag } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { useFollow } from '../context/FollowContext';
import { useAuth } from '../context/AuthContext';
import { mockWheels } from '../data/mockData';
import { ReportModal } from '../components/ReportModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { cars } = useCars();
  const { isFollowing, followUser, unfollowUser } = useFollow();
  const { isAuthenticated } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);
  const { t } = useTranslation();

  // Mock user data - in a real app, this would come from an API
  const getUserById = (id: string) => {
    const userProfiles: Record<string, { id: string; name: string; email: string; phone: string; location: string }> = {
      'seller1': { id: 'seller1', name: 'Premium Auto Dealer', email: 'contact@premiumauto.com', phone: '+1 234 567 8901', location: 'Los Angeles, CA' },
      'seller2': { id: 'seller2', name: 'Luxury Motors', email: 'info@luxurymotors.com', phone: '+1 234 567 8902', location: 'Miami, FL' },
      'seller3': { id: 'seller3', name: 'Elite Cars', email: 'sales@elitecars.com', phone: '+1 234 567 8903', location: 'Houston, TX' },
      'seller4': { id: 'seller4', name: 'Auto Excellence', email: 'hello@autoexcellence.com', phone: '+1 234 567 8904', location: 'Seattle, WA' },
      'seller5': { id: 'seller5', name: 'Classic Auto Gallery', email: 'contact@classicauto.com', phone: '+1 234 567 8905', location: 'Boston, MA' },
      'user2': { id: 'user2', name: 'CarEnthusiast', email: 'carenthusiast@example.com', phone: '+1 234 567 8906', location: 'San Francisco, CA' },
      'user3': { id: 'user3', name: 'TechCarReview', email: 'techcar@example.com', phone: '+1 234 567 8907', location: 'Austin, TX' },
      'user4': { id: 'user4', name: 'OffRoadKing', email: 'offroad@example.com', phone: '+1 234 567 8908', location: 'Denver, CO' },
    };
    return userProfiles[id];
  };

  const user = userId ? getUserById(userId) : null;
  const userCars = cars.filter((car) => car.sellerId === userId);
  const userWheels = mockWheels.filter((wheel) => wheel.userId === userId);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('userProfilePage.userNotFound')}</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-[#2E7C6D] hover:text-[#256B5E] font-medium"
          >
            {t('userProfilePage.goBack')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('userProfilePage.back')}</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-[#A5D6A7] rounded-full flex items-center justify-center flex-shrink-0">
              <UserIcon className="h-12 w-12 text-[#2E7C6D]" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            <button className="bg-[#2E7C6D] text-white px-6 py-3 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold">
              {t('carDetail.contactSeller')}
            </button>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                  return;
                }
                isFollowing(userId) ? unfollowUser(userId) : followUser(userId);
              }}
              className={`bg-[#2E7C6D] text-white px-6 py-3 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold ${
                isFollowing(userId) ? 'bg-[#256B5E]' : 'bg-[#2E7C6D]'
              }`}
            >
              {isFollowing(userId) ? (
                <UserCheck className="h-5 w-5" />
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('userProfilePage.activeListings')} ({userCars.length})
          </h2>

          {userCars.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
              <p className="text-gray-600">{t('userProfilePage.noActiveListings')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {userCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigate(`/offers/${car.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                    {car.featured && (
                      <div className="absolute top-2 right-2 bg-[#2E7C6D] text-white px-3 py-1 rounded-full text-sm">
                        {t('carCard.featured')}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-[#2E7C6D] font-bold text-lg mb-2">
                      CHF {car.price.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{car.year}</span>
                      <span>•</span>
                      <span>{car.mileage.toLocaleString()} km</span>
                      <span>•</span>
                      <span className="capitalize">{t(`offers.${car.fuelType}`)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('userProfilePage.wheels')} ({userWheels.length})
          </h2>

          {userWheels.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">{t('userProfilePage.noWheelsUser')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userWheels.map((wheel) => (
                <div
                  key={wheel.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigate('/wheels')}
                >
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <img
                      src={wheel.thumbnailUrl}
                      alt={wheel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold mb-1 line-clamp-2">
                          {wheel.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-white text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{wheel.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{wheel.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        type="account"
        targetId={userId || ''}
        targetName={user.name}
      />
    </div>
  );
}