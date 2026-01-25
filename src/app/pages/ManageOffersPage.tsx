import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Search, SlidersHorizontal, Eye, EyeOff } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { mockUser } from '../data/mockData';
import { Car } from '../types';
import { useTranslation } from 'react-i18next';

export function ManageOffersPage() {
  const navigate = useNavigate();
  const { cars, deleteCar, updateCar } = useCars();
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOffers, setFilteredOffers] = useState<Car[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [condition, setCondition] = useState('');

  useEffect(() => {
    // First filter by user's offers
    let result = cars.filter((car) => car.sellerId === mockUser.id);

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (car) =>
          car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceMin) {
      result = result.filter((car) => car.price >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter((car) => car.price <= Number(priceMax));
    }

    // Fuel type filter
    if (fuelType) {
      result = result.filter((car) => car.fuelType === fuelType);
    }

    // Transmission filter
    if (transmission) {
      result = result.filter((car) => car.transmission === transmission);
    }

    // Condition filter
    if (condition) {
      result = result.filter((car) => car.condition === condition);
    }

    setFilteredOffers(result);
  }, [cars, searchQuery, priceMin, priceMax, fuelType, transmission, condition]);

  const handleDelete = (id: string) => {
    if (window.confirm(t('manageOffers.deleteConfirm'))) {
      deleteCar(id);
      alert(t('manageOffers.deleteSuccess'));
    }
  };

  const handleToggleListing = (id: string, currentStatus: boolean | undefined) => {
    const newStatus = currentStatus === false; // Toggle: if false, set to true; otherwise set to false
    updateCar(id, { isListed: newStatus });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceMin('');
    setPriceMax('');
    setFuelType('');
    setTransmission('');
    setCondition('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('manageOffers.backToProfile')}</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('manageOffers.title')}</h1>

          {/* Search and Filter Section */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by make, model, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="certified">Certified</option>
                  </select>
                </div>

                <div className="lg:col-span-5 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-[#2E7C6D] hover:bg-[#A5D6A7] rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredOffers.length} of {cars.filter((car) => car.sellerId === mockUser.id).length} offers
          </div>

          {filteredOffers.length > 0 ? (
            <div className="space-y-4">
              {filteredOffers.map((car) => (
                <div
                  key={car.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow relative"
                >
                  {car.isListed === false && (
                    <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
                      <EyeOff className="h-3 w-3" />
                      <span>Not Listed</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <img
                      src={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {car.make} {car.model} ({car.year})
                      </h3>
                      <p className="text-[#2E7C6D] font-bold">
                        CHF {car.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{car.location}</p>
                      <div className="flex gap-2 mt-1 text-xs text-gray-500">
                        <span className="capitalize">{car.fuelType}</span>
                        <span>•</span>
                        <span className="capitalize">{car.transmission}</span>
                        <span>•</span>
                        <span>{car.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/profile/edit-offer/${car.id}`)}
                        className="p-2 text-[#2E7C6D] hover:bg-[#A5D6A7] rounded-lg transition-colors"
                        title="Edit offer"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete offer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleToggleListing(car.id, car.isListed)}
                        className={`p-2 ${car.isListed === false ? 'text-[#2E7C6D] bg-[#A5D6A7]' : 'text-gray-600'} hover:bg-[#A5D6A7] rounded-lg transition-colors`}
                        title={car.isListed === false ? 'List publicly' : 'Unlist'}
                      >
                        {car.isListed === false ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {cars.filter((car) => car.sellerId === mockUser.id).length === 0 
                  ? "You don't have any offers yet" 
                  : "No offers match your search criteria"}
              </p>
              {cars.filter((car) => car.sellerId === mockUser.id).length === 0 ? (
                <button
                  onClick={() => navigate('/profile/create-offer')}
                  className="bg-[#2E7C6D] text-white px-6 py-2 rounded-lg hover:bg-[#256B5E] transition-colors"
                >
                  Create Your First Offer
                </button>
              ) : (
                <button
                  onClick={clearFilters}
                  className="bg-[#2E7C6D] text-white px-6 py-2 rounded-lg hover:bg-[#256B5E] transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}