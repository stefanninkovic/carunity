import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { CarCard } from '../components/CarCard';
import { Car } from '../types';
import { useTranslation } from 'react-i18next';

export function OffersPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cars } = useCars();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [condition, setCondition] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [mileageMax, setMileageMax] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [color, setColor] = useState('');
  const [driveType, setDriveType] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('');
  const [doors, setDoors] = useState('');
  const [seats, setSeats] = useState('');
  const [engineSizeMin, setEngineSizeMin] = useState('');
  const [engineSizeMax, setEngineSizeMax] = useState('');
  const [horsepowerMin, setHorsepowerMin] = useState('');
  const [horsepowerMax, setHorsepowerMax] = useState('');
  const [ownersMax, setOwnersMax] = useState('');

  useEffect(() => {
    let result = cars;

    // Filter out unlisted cars (only show listed cars publicly)
    result = result.filter((car) => car.isListed !== false);

    // Global search filter - checks all fields including description
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((car) => {
        // Check basic fields
        const matchesBasic = 
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.location.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query) ||
          car.sellerName.toLowerCase().includes(query) ||
          car.year.toString().includes(query) ||
          car.price.toString().includes(query) ||
          car.mileage.toString().includes(query);

        // Check optional fields
        const matchesOptional = 
          (car.bodyType && car.bodyType.toLowerCase().includes(query)) ||
          (car.color && car.color.toLowerCase().includes(query)) ||
          (car.vin && car.vin.toLowerCase().includes(query)) ||
          (car.engineSize && car.engineSize.toString().includes(query)) ||
          (car.horsepower && car.horsepower.toString().includes(query)) ||
          (car.doors && car.doors.toString().includes(query)) ||
          (car.seats && car.seats.toString().includes(query)) ||
          (car.owners && car.owners.toString().includes(query));

        // Check features array
        const matchesFeatures = car.features && car.features.some(feature => 
          feature.toLowerCase().includes(query)
        );

        // Check enums
        const matchesEnums = 
          car.fuelType.toLowerCase().includes(query) ||
          car.transmission.toLowerCase().includes(query) ||
          car.condition.toLowerCase().includes(query) ||
          (car.driveType && car.driveType.toLowerCase().includes(query));

        return matchesBasic || matchesOptional || matchesFeatures || matchesEnums;
      });
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

    // Year filter
    if (yearMin) {
      result = result.filter((car) => car.year >= Number(yearMin));
    }
    if (yearMax) {
      result = result.filter((car) => car.year <= Number(yearMax));
    }

    // Mileage filter
    if (mileageMax) {
      result = result.filter((car) => car.mileage <= Number(mileageMax));
    }

    // Body type filter
    if (bodyType) {
      result = result.filter((car) => car.bodyType === bodyType);
    }

    // Color filter
    if (color) {
      result = result.filter((car) => car.color === color);
    }

    // Drive type filter
    if (driveType) {
      result = result.filter((car) => car.driveType === driveType);
    }

    // Make filter
    if (make) {
      result = result.filter((car) => car.make === make);
    }

    // Model filter
    if (model) {
      result = result.filter((car) => car.model === model);
    }

    // Location filter
    if (location) {
      result = result.filter((car) => car.location === location);
    }

    // Doors filter
    if (doors) {
      result = result.filter((car) => car.doors === Number(doors));
    }

    // Seats filter
    if (seats) {
      result = result.filter((car) => car.seats === Number(seats));
    }

    // Engine size filter
    if (engineSizeMin) {
      result = result.filter((car) => car.engineSize >= Number(engineSizeMin));
    }
    if (engineSizeMax) {
      result = result.filter((car) => car.engineSize <= Number(engineSizeMax));
    }

    // Horsepower filter
    if (horsepowerMin) {
      result = result.filter((car) => car.horsepower >= Number(horsepowerMin));
    }
    if (horsepowerMax) {
      result = result.filter((car) => car.horsepower <= Number(horsepowerMax));
    }

    // Owners filter
    if (ownersMax) {
      result = result.filter((car) => car.owners <= Number(ownersMax));
    }

    setFilteredCars(result);
  }, [cars, searchQuery, priceMin, priceMax, fuelType, transmission, condition, yearMin, yearMax, mileageMax, bodyType, color, driveType, make, model, location, doors, seats, engineSizeMin, engineSizeMax, horsepowerMin, horsepowerMax, ownersMax]);

  const resetFilters = () => {
    setPriceMin('');
    setPriceMax('');
    setFuelType('');
    setTransmission('');
    setCondition('');
    setYearMin('');
    setYearMax('');
    setMileageMax('');
    setBodyType('');
    setColor('');
    setDriveType('');
    setSearchQuery('');
    setMake('');
    setModel('');
    setLocation('');
    setDoors('');
    setSeats('');
    setEngineSizeMin('');
    setEngineSizeMax('');
    setHorsepowerMin('');
    setHorsepowerMax('');
    setOwnersMax('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('offers.title')}</h1>
          <p className="text-gray-600">
            {t('offers.showing')} {filteredCars.length} {t('offers.of')} {cars.length} {t('offers.results')}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('offers.searchPlaceholder')}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2E7C6D] text-white p-1.5 rounded-md hover:bg-[#256B5E] transition-colors pointer-events-none">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-6 py-2 bg-[#2E7C6D] text-white rounded-lg hover:bg-[#256B5E] transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>{t('offers.filters')}</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t space-y-6">
              {/* Vehicle Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('offersPage.vehicleInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.make')}
                    </label>
                    <input
                      type="text"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      placeholder="Toyota"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.model')}
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Corolla"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.minYear')}
                    </label>
                    <input
                      type="number"
                      value={yearMin}
                      onChange={(e) => setYearMin(e.target.value)}
                      placeholder="1900"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.maxYear')}
                    </label>
                    <input
                      type="number"
                      value={yearMax}
                      onChange={(e) => setYearMax(e.target.value)}
                      placeholder="2026"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.bodyType')}
                    </label>
                    <select
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    >
                      <option value="">{t('offers.all')}</option>
                      <option value="sedan">{t('offersPage.sedan')}</option>
                      <option value="suv">{t('offersPage.suv')}</option>
                      <option value="hatchback">{t('offersPage.hatchback')}</option>
                      <option value="convertible">{t('offersPage.convertible')}</option>
                      <option value="coupe">{t('offersPage.coupe')}</option>
                      <option value="wagon">{t('offersPage.wagon')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.color')}
                    </label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    >
                      <option value="">{t('offers.all')}</option>
                      <option value="black">{t('offersPage.black')}</option>
                      <option value="white">{t('offersPage.white')}</option>
                      <option value="red">{t('offersPage.red')}</option>
                      <option value="blue">{t('offersPage.blue')}</option>
                      <option value="silver">{t('offersPage.silver')}</option>
                      <option value="gray">{t('offersPage.gray')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offers.condition')}
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    >
                      <option value="">{t('offers.all')}</option>
                      <option value="new">{t('offers.new')}</option>
                      <option value="used">{t('offers.used')}</option>
                      <option value="certified">{t('offers.certified')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.maxMileage')}
                    </label>
                    <input
                      type="number"
                      value={mileageMax}
                      onChange={(e) => setMileageMax(e.target.value)}
                      placeholder="100,000 km"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.doors')}
                    </label>
                    <input
                      type="number"
                      value={doors}
                      onChange={(e) => setDoors(e.target.value)}
                      placeholder="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.seats')}
                    </label>
                    <input
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      placeholder="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('offersPage.technicalSpecs')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offers.fuelType')}
                    </label>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    >
                      <option value="">{t('offers.all')}</option>
                      <option value="petrol">{t('offers.petrol')}</option>
                      <option value="diesel">{t('offers.diesel')}</option>
                      <option value="electric">{t('offers.electric')}</option>
                      <option value="hybrid">{t('offers.hybrid')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offers.transmission')}
                    </label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    >
                      <option value="">{t('offers.all')}</option>
                      <option value="automatic">{t('offers.automatic')}</option>
                      <option value="manual">{t('offers.manual')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.driveType')}
                    </label>
                    <select
                      value={driveType}
                      onChange={(e) => setDriveType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    >
                      <option value="">{t('offers.all')}</option>
                      <option value="fwd">{t('offersPage.fwd')}</option>
                      <option value="rwd">{t('offersPage.rwd')}</option>
                      <option value="awd">{t('offersPage.awd')}</option>
                      <option value="4wd">{t('offersPage.fourWd')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.minEngineSize')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={engineSizeMin}
                      onChange={(e) => setEngineSizeMin(e.target.value)}
                      placeholder="1.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.maxEngineSize')}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={engineSizeMax}
                      onChange={(e) => setEngineSizeMax(e.target.value)}
                      placeholder="6.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.minHorsepower')}
                    </label>
                    <input
                      type="number"
                      value={horsepowerMin}
                      onChange={(e) => setHorsepowerMin(e.target.value)}
                      placeholder="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.maxHorsepower')}
                    </label>
                    <input
                      type="number"
                      value={horsepowerMax}
                      onChange={(e) => setHorsepowerMax(e.target.value)}
                      placeholder="500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>
                </div>
              </div>

              {/* Sale Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('offersPage.saleDetails')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offers.minPrice')}
                    </label>
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offers.maxPrice')}
                    </label>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      placeholder="1,000,000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.location')}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Zurich"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('offersPage.maxOwners')}
                    </label>
                    <input
                      type="number"
                      value={ownersMax}
                      onChange={(e) => setOwnersMax(e.target.value)}
                      placeholder="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 text-[#2E7C6D] hover:text-white hover:bg-[#2E7C6D] border-2 border-[#2E7C6D] rounded-lg font-medium transition-colors"
                >
                  {t('offersPage.resetFilters')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => navigate(`/offers/${car.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">{t('offersPage.noVehicles')}</p>
            <button
              onClick={resetFilters}
              className="mt-4 text-[#2E7C6D] hover:text-[#256B5E] font-medium"
            >
              {t('offersPage.clearAllFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}