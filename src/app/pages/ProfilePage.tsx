import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { User, Car, Video, Edit, PlusCircle, Trash2, Eye, EyeOff, Heart, Users, UserCheck, LogOut, Flag } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { useWheels } from '../context/WheelsContext';
import { useFollow } from '../context/FollowContext';
import { useAuth } from '../context/AuthContext';
import { useReports } from '../context/ReportContext';
import { useTranslation } from 'react-i18next';

export function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isProfileRoot = location.pathname === '/profile';
  const { cars, deleteCar, updateCar } = useCars();
  const { wheels, deleteWheel, updateWheel } = useWheels();
  const { getFollowingCount, getFollowersCount } = useFollow();
  const { user, isAuthenticated, logout } = useAuth();
  const { getUserReports } = useReports();
  const { t } = useTranslation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Return null while redirecting
  if (!isAuthenticated || !user) {
    return null;
  }
  
  const userCars = cars.filter((car) => car.sellerId === user.id);
  const userWheels = wheels.filter((wheel) => wheel.userId === user.id);

  const handleDeleteCar = (id: string) => {
    if (window.confirm(t('profile.deleteConfirm'))) {
      deleteCar(id);
    }
  };

  const handleToggleListing = (id: string, currentStatus: boolean | undefined) => {
    const newStatus = currentStatus === false; // Toggle: if false, set to true; otherwise set to false
    updateCar(id, { isListed: newStatus });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isProfileRoot) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.location}</p>
              </div>
            </div>
            <Link
              to="/profile/edit"
              className="flex items-center space-x-2 px-4 py-2 bg-[#2E7C6D] text-white rounded-lg hover:bg-[#256B5E] transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>{t('profile.editProfile')}</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('profile.activeListings')}</p>
                <p className="text-3xl font-bold text-gray-900">{userCars.length}</p>
              </div>
              <Car className="h-10 w-10 text-[#2E7C6D]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('profile.wheelsCreated')}</p>
                <p className="text-3xl font-bold text-gray-900">{userWheels.length}</p>
              </div>
              <Video className="h-10 w-10 text-[#2E7C6D]" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('profile.totalViews')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userWheels.reduce((sum, wheel) => sum + wheel.views, 0).toLocaleString()}
                </p>
              </div>
              <svg className="h-10 w-10 text-[#2E7C6D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile/following')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('profile.following')}</p>
                <p className="text-3xl font-bold text-gray-900">{getFollowingCount()}</p>
              </div>
              <Users className="h-10 w-10 text-[#2E7C6D]" />
            </div>
          </button>

          <button
            onClick={() => navigate('/profile/followers')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t('profile.followers')}</p>
                <p className="text-3xl font-bold text-gray-900">{getFollowersCount()}</p>
              </div>
              <UserCheck className="h-10 w-10 text-[#2E7C6D]" />
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/profile/create-offer"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#A5D6A7] rounded-lg">
                <PlusCircle className="h-8 w-8 text-[#2E7C6D]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('profile.createNewOffer')}</h3>
                <p className="text-gray-600">{t('profile.listNewVehicle')}</p>
              </div>
            </div>
          </Link>

          <Link
            to="/profile/create-wheel"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#A5D6A7] rounded-lg">
                <Video className="h-8 w-8 text-[#2E7C6D]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{t('profile.createNewWheel')}</h3>
                <p className="text-gray-600">{t('profile.uploadVideoShowcase')}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* My Offers */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('profile.myOffers')}</h2>
            <Link
              to="/profile/manage-offers"
              className="text-[#2E7C6D] hover:text-[#256B5E] font-medium"
            >
              {t('profile.manageAll')} →
            </Link>
          </div>

          {userCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userCars.slice(0, 3).map((car) => (
                <div key={car.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow relative">
                  {car.isListed === false && (
                    <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
                      <EyeOff className="h-3 w-3" />
                      <span>{t('profile.notListed')}</span>
                    </div>
                  )}
                  <img
                    src={car.imageUrl}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">
                      {car.make} {car.model} ({car.year})
                    </h3>
                    <p className="text-[#2E7C6D] font-bold text-lg">
                      CHF {car.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">{car.location}</p>
                    
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/profile/edit-offer/${car.id}`)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-[#2E7C6D] border border-[#2E7C6D] rounded-lg hover:bg-[#A5D6A7] transition-colors text-sm"
                        >
                          <Edit className="h-4 w-4" />
                          <span>{t('profile.edit')}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>{t('profile.delete')}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleToggleListing(car.id, car.isListed)}
                        className={`w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                          car.isListed === false
                            ? 'bg-[#2E7C6D] text-white hover:bg-[#256B5E]'
                            : 'text-gray-600 border border-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {car.isListed === false ? (
                          <>
                            <Eye className="h-4 w-4" />
                            <span>{t('profile.listPublicly')}</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span>{t('profile.unlist')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">{t('profile.noOffers')}</p>
          )}
        </div>

        {/* My Wheels */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('profile.myWheels')}</h2>
            <Link
              to="/profile/manage-wheels"
              className="text-[#2E7C6D] hover:text-[#256B5E] font-medium"
            >
              {t('profile.manageAll')} →
            </Link>
          </div>

          {userWheels.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userWheels.slice(0, 4).map((wheel) => (
                <div key={wheel.id} className="relative group">
                  {/* Video Card - TikTok Style */}
                  <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-900">
                    {wheel.isListed === false && (
                      <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-90 text-white px-2 py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
                        <EyeOff className="h-3 w-3" />
                        <span>{t('profile.notListed')}</span>
                      </div>
                    )}
                    <img
                      src={wheel.thumbnailUrl}
                      alt={wheel.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
                      {/* Bottom Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="text-sm font-bold truncate mb-1">{wheel.title}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{wheel.likes.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{wheel.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions Overlay - Shows on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2 p-3">
                      <button
                        onClick={() => navigate(`/profile/edit-wheel/${wheel.id}`)}
                        className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-[#2E7C6D] text-white rounded-lg hover:bg-[#256B5E] transition-colors text-sm"
                      >
                        <Edit className="h-4 w-4" />
                        <span>{t('profile.edit')}</span>
                      </button>
                      <button
                        onClick={() => {
                          const newStatus = wheel.isListed === false;
                          updateWheel(wheel.id, { isListed: newStatus });
                        }}
                        className={`w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                          wheel.isListed === false
                            ? 'bg-white text-gray-900 hover:bg-gray-100'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        {wheel.isListed === false ? (
                          <>
                            <Eye className="h-4 w-4" />
                            <span>{t('profile.listPublicly')}</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span>{t('profile.unlist')}</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(t('manageWheels.deleteConfirm'))) {
                            deleteWheel(wheel.id);
                          }
                        }}
                        className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>{t('profile.delete')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">{t('profile.noWheels')}</p>
          )}
        </div>

        {/* My Reports */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Flag className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t('profile.myReports')}</h2>
            </div>
          </div>

          {(() => {
            const userReports = getUserReports(user.id);
            return userReports.length > 0 ? (
              <div className="space-y-4">
                {userReports.slice(0, 5).map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold uppercase">
                          {t(`profile.${report.type.toLowerCase()}`)}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          report.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : report.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {t(`profile.${report.status}`)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(report.reportedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{report.targetName}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{t('profile.reportReason')}:</span> {report.reason}
                    </p>
                    {report.description && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{t('profile.reportDetails')}:</span> {report.description}
                      </p>
                    )}
                  </div>
                ))}
                {userReports.length > 5 && (
                  <p className="text-center text-gray-600 text-sm pt-2">
                    Showing 5 of {userReports.length} reports
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-600 py-8">{t('profile.noReports')}</p>
            );
          })()}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors mt-8"
        >
          <LogOut className="h-5 w-5" />
          <span>{t('profile.logout')}</span>
        </button>
      </div>
    </div>
  );
}