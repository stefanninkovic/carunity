import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Fuel, Gauge, Calendar, Phone, Mail, User, Car as CarIcon, Palette, Users, DoorOpen, Zap, Settings, ChevronLeft, ChevronRight, X, Play, Flag } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { useWheels } from '../context/WheelsContext';
import Slider from 'react-slick';
import { useState, useRef } from 'react';
import { ReportModal } from '../components/ReportModal';
import { useTranslation } from 'react-i18next';

export function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars } = useCars();
  const { wheels } = useWheels();
  const car = cars.find((c) => c.id === id);
  const [showReportModal, setShowReportModal] = useState(false);
  const { t } = useTranslation();

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('carDetailPage.notFound')}</h1>
          <button
            onClick={() => navigate('/offers')}
            className="text-[#2E7C6D] hover:text-[#256B5E] font-medium"
          >
            {t('carDetail.backToOffers')}
          </button>
        </div>
      </div>
    );
  }

  // Use images array if available, otherwise fall back to single imageUrl
  const carImages = car.images && car.images.length > 0 ? car.images : [car.imageUrl];
  
  // Find all wheels associated with this car that are listed
  const associatedWheels = wheels.filter(
    (wheel) => wheel.carId === car.id && wheel.isListed !== false
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/offers')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('carDetail.backToOffers')}</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Carousel Section */}
          <div className="relative">
            <div className="h-96 bg-gray-900">
              <Slider {...sliderSettings} ref={sliderRef} afterChange={(index) => setCurrentSlide(index)}>
                {carImages.map((imageUrl, index) => (
                  <div key={index} className="h-96">
                    <img
                      src={imageUrl}
                      alt={`${car.make} ${car.model} - Image ${index + 1}`}
                      className="w-full h-96 object-cover"
                      onClick={() => openLightbox(index)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {car.featured && (
              <div className="absolute top-4 right-4 bg-[#2E7C6D] text-white px-4 py-2 rounded-full z-10">
                {t('carCard.featured')}
              </div>
            )}
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full capitalize font-medium z-10">
              {t(`offers.${car.condition}`)}
            </div>
            {/* Navigation Buttons */}
            {carImages.length > 1 && (
              <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 transition-colors pointer-events-auto"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 transition-colors pointer-events-auto"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-5xl font-bold text-[#2E7C6D]">
                    CHF {car.price.toLocaleString()}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm">{t('carDetail.year')}</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">{car.year}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Gauge className="h-5 w-5" />
                      <span className="text-sm">{t('carDetail.mileage')}</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {car.mileage.toLocaleString()} km
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <Fuel className="h-5 w-5" />
                      <span className="text-sm">{t('carDetail.fuelType')}</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900 capitalize">
                      {t(`offers.${car.fuelType}`)}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-gray-600 mb-1">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span className="text-sm">{t('carDetail.transmission')}</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900 capitalize">
                      {t(`offers.${car.transmission}`)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('carDetail.description')}</h2>
                  <p className="text-gray-700 leading-relaxed">{car.description}</p>
                </div>

                {/* Vehicle Details */}
                {(car.bodyType || car.color || car.doors || car.seats || car.engineSize || car.horsepower || car.driveType || car.owners || car.vin) && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('carDetailPage.vehicleDetails')}</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {car.bodyType && (
                          <div className="flex items-center space-x-3">
                            <CarIcon className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('offersPage.bodyType')}</p>
                              <p className="font-semibold text-gray-900">{car.bodyType}</p>
                            </div>
                          </div>
                        )}

                        {car.color && (
                          <div className="flex items-center space-x-3">
                            <Palette className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('offersPage.color')}</p>
                              <p className="font-semibold text-gray-900">{car.color}</p>
                            </div>
                          </div>
                        )}

                        {car.doors && (
                          <div className="flex items-center space-x-3">
                            <DoorOpen className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('offersPage.doors')}</p>
                              <p className="font-semibold text-gray-900">{car.doors}</p>
                            </div>
                          </div>
                        )}

                        {car.seats && (
                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('offersPage.seats')}</p>
                              <p className="font-semibold text-gray-900">{car.seats}</p>
                            </div>
                          </div>
                        )}

                        {car.engineSize && (
                          <div className="flex items-center space-x-3">
                            <Settings className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('carDetailPage.engineSize')}</p>
                              <p className="font-semibold text-gray-900">{car.engineSize}L</p>
                            </div>
                          </div>
                        )}

                        {car.horsepower && (
                          <div className="flex items-center space-x-3">
                            <Zap className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('carDetailPage.horsepower')}</p>
                              <p className="font-semibold text-gray-900">{car.horsepower} HP</p>
                            </div>
                          </div>
                        )}

                        {car.driveType && (
                          <div className="flex items-center space-x-3">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <div>
                              <p className="text-sm text-gray-600">{t('offersPage.driveType')}</p>
                              <p className="font-semibold text-gray-900 uppercase">{car.driveType}</p>
                            </div>
                          </div>
                        )}

                        {car.owners && (
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{t('carDetailPage.previousOwners')}</p>
                              <p className="font-semibold text-gray-900">{car.owners}</p>
                            </div>
                          </div>
                        )}

                        {car.vin && (
                          <div className="flex items-center space-x-3 md:col-span-2">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                            <div>
                              <p className="text-sm text-gray-600">{t('carDetailPage.vin')}</p>
                              <p className="font-semibold text-gray-900 font-mono text-sm">{car.vin}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                {car.features && car.features.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('carDetailPage.featuresEquipment')}</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <svg className="h-5 w-5 text-[#2E7C6D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Associated Wheels Section */}
                {associatedWheels.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {t('carDetailPage.videoContent')} ({associatedWheels.length})
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {associatedWheels.map((wheel) => (
                        <button
                          key={wheel.id}
                          onClick={() => navigate(`/wheels?carId=${car.id}&wheelId=${wheel.id}`)}
                          className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-900 hover:ring-2 hover:ring-[#2E7C6D] transition-all"
                        >
                          <img
                            src={wheel.thumbnailUrl}
                            alt={wheel.title}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70">
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                                <Play className="h-8 w-8 text-white fill-white" />
                              </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                                {wheel.title}
                              </h3>
                              <div className="flex items-center space-x-3 text-xs text-gray-200">
                                <span className="flex items-center space-x-1">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  <span>{wheel.views.toLocaleString()}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                  </svg>
                                  <span>{wheel.likes.toLocaleString()}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      {t('carDetailPage.clickToView')}
                    </p>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{car.location}</span>
                </div>
              </div>

              {/* Seller Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t('carDetailPage.sellerInfo')}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => navigate(`/user/${car.sellerId}`)}
                      className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 bg-[#A5D6A7] rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-[#2E7C6D]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{car.sellerName}</p>
                        <p className="text-sm text-gray-600">{t('carDetailPage.verifiedSeller')}</p>
                      </div>
                    </button>

                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span>+1 234 567 8900</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span>seller@example.com</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#2E7C6D] text-white px-6 py-3 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold mb-3">
                    {t('carDetail.contactSeller')}
                  </button>
                  
                  <button className="w-full bg-white text-[#2E7C6D] border-2 border-[#2E7C6D] px-6 py-3 rounded-lg hover:bg-[#A5D6A7] transition-colors font-semibold">
                    {t('carDetailPage.scheduleTestDrive')}
                  </button>

                  <button
                    onClick={() => setShowReportModal(true)}
                    className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold mt-3"
                  >
                    {t('carDetailPage.reportListing')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <div className="relative w-full h-full flex flex-col max-w-7xl" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Main Image Container - constrained height */}
              <div className="flex-1 flex items-center justify-center relative px-4 py-4" style={{ maxHeight: carImages.length > 1 ? 'calc(100vh - 140px)' : 'calc(100vh - 60px)' }}>
                <img
                  src={carImages[lightboxIndex]}
                  alt={`${car.make} ${car.model} - Image ${lightboxIndex + 1}`}
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={closeLightbox}
                />

                {/* Navigation Arrows */}
                {carImages.length > 1 && (
                  <>
                    <button
                      onClick={prevLightboxImage}
                      className="absolute left-4 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextLightboxImage}
                      className="absolute right-4 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm text-white text-sm">
                  {lightboxIndex + 1} / {carImages.length}
                </div>
              </div>

              {/* Thumbnail Strip - fixed height */}
              {carImages.length > 1 && (
                <div className="flex justify-center gap-2 p-4 overflow-x-auto flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  {carImages.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setLightboxIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === lightboxIndex
                          ? 'border-[#2E7C6D] scale-110'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Report Modal */}
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          type="offer"
          targetId={car.id}
          targetName={`${car.make} ${car.model}`}
        />
      </div>
    </div>
  );
}