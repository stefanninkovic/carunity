import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { useWheels } from '../context/WheelsContext';
import { CarCard } from '../components/CarCard';
import { useTranslation } from 'react-i18next';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cars } = useCars();
  const { wheels } = useWheels();
  const { t } = useTranslation();

  const featuredCars = cars.filter(car => car.isListed !== false).slice(0, 6);
  const featuredWheels = wheels.filter(wheel => wheel.isListed !== false).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/offers?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2E7C6D] to-[#256B5E] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              {t('home.title')}
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              {t('home.subtitle')}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('home.searchPlaceholder')}
                  className="w-full px-6 py-4 rounded-full bg-white text-gray-900 text-lg border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#A5D6A7]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2E7C6D] text-white p-2 rounded-full hover:bg-[#256B5E] transition-colors"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="bg-[#A5D6A7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-[#2E7C6D]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('homePage.easySearch')}</h3>
            <p className="text-gray-600">
              {t('homePage.easySearchDesc')}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-[#A5D6A7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-[#2E7C6D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('homePage.verifiedSellers')}</h3>
            <p className="text-gray-600">
              {t('homePage.verifiedSellersDesc')}
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-[#A5D6A7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-[#2E7C6D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('homePage.bestPrices')}</h3>
            <p className="text-gray-600">
              {t('homePage.bestPricesDesc')}
            </p>
          </div>
        </div>

        {/* Popular Offers */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.popularOffers')}</h2>
            <button
              onClick={() => navigate('/offers')}
              className="text-[#2E7C6D] hover:text-[#256B5E] font-medium"
            >
              {t('home.viewAll')} →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => navigate(`/offers/${car.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Popular Wheels */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.popularWheels')}</h2>
            <button
              onClick={() => navigate('/wheels')}
              className="text-[#2E7C6D] hover:text-[#256B5E] font-medium"
            >
              {t('home.viewAllWheels')} →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredWheels.map((wheel) => (
              <div
                key={wheel.id}
                onClick={() => navigate(`/wheels?wheelId=${wheel.id}`)}
                className="relative cursor-pointer group overflow-hidden rounded-lg"
                style={{ aspectRatio: '9/16' }}
              >
                <img
                  src={wheel.thumbnailUrl}
                  alt={wheel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-all" />
                
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-sm font-semibold line-clamp-2">{wheel.title}</h3>
                  <p className="text-xs text-gray-300 mt-1">@{wheel.userName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2E7C6D] text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('homePage.readyToSell')}
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            {t('homePage.readyToSellDesc')}
          </p>
          <button
            onClick={() => navigate('/profile/create-offer')}
            className="bg-white text-[#2E7C6D] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('homePage.createListing')}
          </button>
        </div>
      </div>
    </div>
  );
}