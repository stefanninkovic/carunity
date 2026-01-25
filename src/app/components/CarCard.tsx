import { Car } from '../types';
import { MapPin, Fuel, Gauge, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CarCardProps {
  car: Car;
  onClick?: () => void;
}

export function CarCard({ car, onClick }: CarCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  // Use images array if available, otherwise fall back to single imageUrl
  const carImages = car.images && car.images.length > 0 ? car.images : [car.imageUrl];

  useEffect(() => {
    if (!isHovering || carImages.length <= 1) {
      setCurrentImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering, carImages.length]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-600 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {carImages.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`${car.make} ${car.model} - Image ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        {car.featured && (
          <div className="absolute top-2 right-2 bg-[#2E7C6D] text-white px-3 py-1 rounded-full text-sm z-10">
            {t('carCard.featured')}
          </div>
        )}
        <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-sm capitalize z-10">
          {t(`offers.${car.condition}`)}
        </div>
        {/* Image indicator dots */}
        {carImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
            {carImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
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

        <div className="grid grid-cols-2 gap-2 my-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Gauge className="h-4 w-4" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="h-4 w-4" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{car.location.split(',')[0]}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{car.description}</p>

        <div className="mt-3 pt-3 border-t flex justify-between items-center">
          <span className="text-sm text-gray-500">{car.sellerName}</span>
          <button className="text-[#2E7C6D] hover:text-[#256B5E] text-sm font-medium">
            {t('carCard.viewDetails')}
          </button>
        </div>
      </div>
    </div>
  );
}