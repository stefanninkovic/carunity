import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, X, MapPin, Gauge, Calendar, Fuel, Settings, Users, Eye, Phone, Mail, User, Car as CarIcon, Palette, DoorOpen, Zap } from 'lucide-react';
import { useCars } from '../context/CarsContext';
import { mockUser } from '../data/mockData';

export function CreateOfferPage() {
  const navigate = useNavigate();
  const { id: editCarId } = useParams();
  const { cars, addCar, updateCar } = useCars();
  const isEditMode = !!editCarId;

  const [inputMethod, setInputMethod] = useState<'vehicle-lookup' | 'type-approval' | 'stammnummer'>('vehicle-lookup');
  const [isVehicleLookedUp, setIsVehicleLookedUp] = useState(false);
  const [isTuned, setIsTuned] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [lookupData, setLookupData] = useState({
    make: '',
    model: '',
    bodyType: '',
    year: new Date().getFullYear(),
    typeApproval: '',
    stammnummer: '',
  });
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    transmission: 'automatic' as 'automatic' | 'manual',
    fuelType: 'petrol' as 'petrol' | 'diesel' | 'electric' | 'hybrid',
    condition: 'used' as 'new' | 'used' | 'certified',
    description: '',
    location: '',
    bodyType: '',
    color: '',
    doors: '',
    seats: '',
    engineSize: '',
    horsepower: '',
    driveType: 'fwd' as 'fwd' | 'rwd' | 'awd' | '4wd',
    owners: '',
    vin: '',
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState('');

  // Validate if all required fields are filled
  const isFormValid = () => {
    return (
      isVehicleLookedUp &&
      formData.price &&
      formData.mileage &&
      formData.condition &&
      formData.owners &&
      formData.vin &&
      formData.location &&
      formData.transmission &&
      formData.fuelType &&
      formData.color &&
      formData.doors &&
      formData.seats &&
      formData.engineSize &&
      formData.horsepower &&
      formData.driveType
    );
  };

  // Mock vehicle database lookup
  const mockVehicleLookup = (make: string, model: string, bodyType: string, year: number) => {
    // Simulate API call to vehicle database
    const vehicleData: Record<string, any> = {
      'porsche-911-coupe-2024': {
        doors: 2,
        seats: 4,
        engineSize: 3.8,
        horsepower: 640,
        transmission: 'automatic',
        fuelType: 'petrol',
        driveType: 'awd',
        features: ['Sport Chrono Package', 'Adaptive Cruise Control', 'Premium Sound System', 'Carbon Ceramic Brakes'],
      },
      'bmw-5 series-sedan-2023': {
        doors: 4,
        seats: 5,
        engineSize: 3.0,
        horsepower: 265,
        transmission: 'automatic',
        fuelType: 'diesel',
        driveType: 'rwd',
        features: ['Leather Seats', 'Parking Sensors', 'Lane Departure Warning', 'Apple CarPlay'],
      },
      'tesla-model s-sedan-2024': {
        doors: 4,
        seats: 5,
        engineSize: 0,
        horsepower: 670,
        transmission: 'automatic',
        fuelType: 'electric',
        driveType: 'awd',
        features: ['Autopilot', 'Premium Interior', 'Glass Roof', 'Premium Audio'],
      },
    };

    const key = `${make.toLowerCase()}-${model.toLowerCase()}-${bodyType.toLowerCase()}-${year}`;
    return vehicleData[key] || null;
  };

  const mockTypeApprovalLookup = (typeApproval: string) => {
    // Simulate lookup by Typengenehmigung
    const approvalData: Record<string, any> = {
      'CH-TA-2024-911': {
        make: 'Porsche',
        model: '911 Turbo',
        bodyType: 'Coupe',
        year: 2024,
        doors: 2,
        seats: 4,
        engineSize: 3.8,
        horsepower: 640,
        transmission: 'automatic',
        fuelType: 'petrol',
        driveType: 'awd',
      },
      'CH-TA-2023-BMW5': {
        make: 'BMW',
        model: '5 Series',
        bodyType: 'Sedan',
        year: 2023,
        doors: 4,
        seats: 5,
        engineSize: 3.0,
        horsepower: 265,
        transmission: 'automatic',
        fuelType: 'diesel',
        driveType: 'rwd',
      },
    };

    return approvalData[typeApproval] || null;
  };

  const mockStammnummerLookup = (stammnummer: string) => {
    // Simulate lookup by Stammnummer
    const stammnummerData: Record<string, any> = {
      '1234-ABC': {
        make: 'Porsche',
        model: '911 Turbo',
        bodyType: 'Coupe',
        year: 2024,
        doors: 2,
        seats: 4,
        engineSize: 3.8,
        horsepower: 640,
        transmission: 'automatic',
        fuelType: 'petrol',
        driveType: 'awd',
      },
      '5678-XYZ': {
        make: 'BMW',
        model: '5 Series',
        bodyType: 'Sedan',
        year: 2023,
        doors: 4,
        seats: 5,
        engineSize: 3.0,
        horsepower: 265,
        transmission: 'automatic',
        fuelType: 'diesel',
        driveType: 'rwd',
      },
    };

    return stammnummerData[stammnummer] || null;
  };

  const handleVehicleLookup = () => {
    // Validate that required fields are filled in the lookup section
    if (!lookupData.make || !lookupData.model || !lookupData.bodyType || !lookupData.year) {
      alert('Please fill in Make, Model, Body Type, and Year in the lookup section.');
      return;
    }

    const data = mockVehicleLookup(lookupData.make, lookupData.model, lookupData.bodyType, lookupData.year);
    if (data) {
      setFormData({
        ...formData,
        make: lookupData.make,
        model: lookupData.model,
        year: lookupData.year,
        bodyType: lookupData.bodyType,
        doors: data.doors?.toString() || '',
        seats: data.seats?.toString() || '',
        engineSize: data.engineSize?.toString() || '',
        horsepower: data.horsepower?.toString() || '',
        transmission: data.transmission || formData.transmission,
        fuelType: data.fuelType || formData.fuelType,
        driveType: data.driveType || formData.driveType,
      });
      if (data.features) {
        setFeatures(data.features);
      }
      alert('Vehicle data loaded successfully! Technical specifications have been auto-filled.');
      setIsVehicleLookedUp(true);
    } else {
      alert('Vehicle not found in database. Please enter information manually.');
    }
  };

  const handleTypeApprovalLookup = () => {
    const data = mockTypeApprovalLookup(lookupData.typeApproval);
    if (data) {
      setFormData({
        ...formData,
        make: data.make || '',
        model: data.model || '',
        year: data.year || new Date().getFullYear(),
        bodyType: data.bodyType || '',
        doors: data.doors?.toString() || '',
        seats: data.seats?.toString() || '',
        engineSize: data.engineSize?.toString() || '',
        horsepower: data.horsepower?.toString() || '',
        transmission: data.transmission || formData.transmission,
        fuelType: data.fuelType || formData.fuelType,
        driveType: data.driveType || formData.driveType,
      });
      alert('Vehicle data loaded from Typengenehmigung! You can now add additional information.');
      setIsVehicleLookedUp(true);
    } else {
      alert('Type approval number not found. Please try again or enter information manually.');
    }
  };

  const handleStammnummerLookup = () => {
    const data = mockStammnummerLookup(lookupData.stammnummer);
    if (data) {
      setFormData({
        ...formData,
        make: data.make || '',
        model: data.model || '',
        year: data.year || new Date().getFullYear(),
        bodyType: data.bodyType || '',
        doors: data.doors?.toString() || '',
        seats: data.seats?.toString() || '',
        engineSize: data.engineSize?.toString() || '',
        horsepower: data.horsepower?.toString() || '',
        transmission: data.transmission || formData.transmission,
        fuelType: data.fuelType || formData.fuelType,
        driveType: data.driveType || formData.driveType,
      });
      alert('Vehicle data loaded from Stammnummer! You can now add additional information.');
      setIsVehicleLookedUp(true);
    } else {
      alert('Stammnummer not found. Please try again or enter information manually.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublish = () => {
    // Add the new car
    if (isEditMode) {
      updateCar({
        id: editCarId!,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        condition: formData.condition,
        description: formData.description,
        location: formData.location,
        imageUrl: uploadedImages[0] || 'https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzY4MDkyOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        sellerId: mockUser.id,
        sellerName: mockUser.name,
        featured: false,
        bodyType: formData.bodyType || undefined,
        color: formData.color || undefined,
        doors: formData.doors ? Number(formData.doors) : undefined,
        seats: formData.seats ? Number(formData.seats) : undefined,
        engineSize: formData.engineSize ? Number(formData.engineSize) : undefined,
        horsepower: formData.horsepower ? Number(formData.horsepower) : undefined,
        driveType: formData.driveType || undefined,
        owners: formData.owners ? Number(formData.owners) : undefined,
        vin: formData.vin || undefined,
        features: features.length > 0 ? features : undefined,
      });
    } else {
      addCar({
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        condition: formData.condition,
        description: formData.description,
        location: formData.location,
        imageUrl: uploadedImages[0] || 'https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzY4MDkyOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        sellerId: mockUser.id,
        sellerName: mockUser.name,
        featured: false,
        bodyType: formData.bodyType || undefined,
        color: formData.color || undefined,
        doors: formData.doors ? Number(formData.doors) : undefined,
        seats: formData.seats ? Number(formData.seats) : undefined,
        engineSize: formData.engineSize ? Number(formData.engineSize) : undefined,
        horsepower: formData.horsepower ? Number(formData.horsepower) : undefined,
        driveType: formData.driveType || undefined,
        owners: formData.owners ? Number(formData.owners) : undefined,
        vin: formData.vin || undefined,
        features: features.length > 0 ? features : undefined,
      });
    }
    
    alert(isEditMode ? 'Offer updated successfully!' : 'Offer published successfully!');
    navigate('/profile');
  };

  // Load existing car data when in edit mode
  useEffect(() => {
    if (isEditMode && editCarId) {
      const existingCar = cars.find(car => car.id === editCarId);
      if (existingCar) {
        setFormData({
          make: existingCar.make,
          model: existingCar.model,
          year: existingCar.year,
          price: existingCar.price.toString(),
          mileage: existingCar.mileage.toString(),
          transmission: existingCar.transmission,
          fuelType: existingCar.fuelType,
          condition: existingCar.condition,
          description: existingCar.description,
          location: existingCar.location,
          bodyType: existingCar.bodyType || '',
          color: existingCar.color || '',
          doors: existingCar.doors?.toString() || '',
          seats: existingCar.seats?.toString() || '',
          engineSize: existingCar.engineSize?.toString() || '',
          horsepower: existingCar.horsepower?.toString() || '',
          driveType: existingCar.driveType || 'fwd',
          owners: existingCar.owners?.toString() || '',
          vin: existingCar.vin || '',
        });
        setIsVehicleLookedUp(true); // Mark as looked up since we're editing
        if (existingCar.features) {
          setFeatures(existingCar.features);
        }
        if (existingCar.imageUrl) {
          setUploadedImages([existingCar.imageUrl]);
        }
      }
    }
  }, [isEditMode, editCarId, cars]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className={`${isPreviewMode ? 'max-w-7xl' : 'max-w-3xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Profile</span>
        </button>

        {isPreviewMode ? (
          /* Preview Mode - Matching CarDetailPage Layout */
          <>
            {/* Preview Banner */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 flex items-center mb-6">
              <Eye className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="font-semibold text-blue-900">Preview Mode</p>
                <p className="text-sm text-blue-700">Review how your offer will appear to potential buyers</p>
              </div>
            </div>

            {/* Car Detail Layout */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image Section */}
                <div className="relative h-96">
                  <img
                    src={uploadedImages[0] || 'https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzY4MDkyOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080'}
                    alt={`${formData.make} ${formData.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full capitalize font-medium">
                    {formData.condition}
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                      <div className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                          {formData.make} {formData.model}
                        </h1>
                        <p className="text-5xl font-bold text-[#2E7C6D]">
                          CHF {Number(formData.price).toLocaleString()}
                        </p>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 text-gray-600 mb-1">
                            <Calendar className="h-5 w-5" />
                            <span className="text-sm">Year</span>
                          </div>
                          <p className="text-xl font-semibold text-gray-900">{formData.year}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 text-gray-600 mb-1">
                            <Gauge className="h-5 w-5" />
                            <span className="text-sm">Mileage</span>
                          </div>
                          <p className="text-xl font-semibold text-gray-900">
                            {Number(formData.mileage).toLocaleString()} km
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 text-gray-600 mb-1">
                            <Fuel className="h-5 w-5" />
                            <span className="text-sm">Fuel Type</span>
                          </div>
                          <p className="text-xl font-semibold text-gray-900 capitalize">
                            {formData.fuelType}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 text-gray-600 mb-1">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span className="text-sm">Transmission</span>
                          </div>
                          <p className="text-xl font-semibold text-gray-900 capitalize">
                            {formData.transmission}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{formData.description}</p>
                      </div>

                      {/* Vehicle Details */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.bodyType && (
                              <div className="flex items-center space-x-3">
                                <CarIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Body Type</p>
                                  <p className="font-semibold text-gray-900">{formData.bodyType}</p>
                                </div>
                              </div>
                            )}

                            {formData.color && (
                              <div className="flex items-center space-x-3">
                                <Palette className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Color</p>
                                  <p className="font-semibold text-gray-900">{formData.color}</p>
                                </div>
                              </div>
                            )}

                            {formData.doors && (
                              <div className="flex items-center space-x-3">
                                <DoorOpen className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Doors</p>
                                  <p className="font-semibold text-gray-900">{formData.doors}</p>
                                </div>
                              </div>
                            )}

                            {formData.seats && (
                              <div className="flex items-center space-x-3">
                                <Users className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Seats</p>
                                  <p className="font-semibold text-gray-900">{formData.seats}</p>
                                </div>
                              </div>
                            )}

                            {formData.engineSize && (
                              <div className="flex items-center space-x-3">
                                <Settings className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Engine Size</p>
                                  <p className="font-semibold text-gray-900">{formData.engineSize}L</p>
                                </div>
                              </div>
                            )}

                            {formData.horsepower && (
                              <div className="flex items-center space-x-3">
                                <Zap className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Horsepower</p>
                                  <p className="font-semibold text-gray-900">{formData.horsepower} HP</p>
                                </div>
                              </div>
                            )}

                            {formData.driveType && (
                              <div className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <div>
                                  <p className="text-sm text-gray-600">Drive Type</p>
                                  <p className="font-semibold text-gray-900 uppercase">{formData.driveType}</p>
                                </div>
                              </div>
                            )}

                            {formData.owners && (
                              <div className="flex items-center space-x-3">
                                <User className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-600">Previous Owners</p>
                                  <p className="font-semibold text-gray-900">{formData.owners}</p>
                                </div>
                              </div>
                            )}

                            {formData.vin && (
                              <div className="flex items-center space-x-3 md:col-span-2">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                                <div>
                                  <p className="text-sm text-gray-600">VIN</p>
                                  <p className="font-semibold text-gray-900 font-mono text-sm">{formData.vin}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      {features.length > 0 && (
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Equipment</h2>
                          <div className="bg-gray-50 rounded-lg p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {features.map((feature, index) => (
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

                      {/* Location */}
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{formData.location}</span>
                      </div>
                    </div>

                    {/* Seller Info Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Seller Information</h3>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center space-x-3 p-2">
                            <div className="w-12 h-12 bg-[#A5D6A7] rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-[#2E7C6D]" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{mockUser.name}</p>
                              <p className="text-sm text-gray-600">Verified Seller</p>
                            </div>
                          </div>

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
                          Contact Seller
                        </button>
                        
                        <button className="w-full bg-white text-[#2E7C6D] border-2 border-[#2E7C6D] px-6 py-3 rounded-lg hover:bg-[#A5D6A7] transition-colors font-semibold">
                          Schedule Test Drive
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setIsPreviewMode(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Edit</span>
              </button>
              <button
                onClick={handlePublish}
                className="flex-1 bg-[#2E7C6D] text-white px-6 py-3 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold"
              >
                Publish Offer
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {isEditMode ? 'Edit Offer' : 'Create New Offer'}
            </h1>
            
            {/* Form Mode */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>

              {/* Input Method Selection */}
              <div className="border-2 border-[#2E7C6D] rounded-lg p-6 bg-[#A5D6A7]/10">
                <h2 className="text-lg font-bold text-gray-900 mb-4">How would you like to add vehicle information?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setInputMethod('vehicle-lookup')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      inputMethod === 'vehicle-lookup'
                        ? 'border-[#2E7C6D] bg-[#2E7C6D] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#2E7C6D]'
                    }`}
                  >
                    <div className="font-semibold">Vehicle Lookup</div>
                    <div className="text-sm opacity-90">By Make, Model, Year & Body Type</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputMethod('type-approval')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      inputMethod === 'type-approval'
                        ? 'border-[#2E7C6D] bg-[#2E7C6D] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#2E7C6D]'
                    }`}
                  >
                    <div className="font-semibold">Typengenehmigung</div>
                    <div className="text-sm opacity-90">Type approval number</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputMethod('stammnummer')}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      inputMethod === 'stammnummer'
                        ? 'border-[#2E7C6D] bg-[#2E7C6D] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#2E7C6D]'
                    }`}
                  >
                    <div className="font-semibold">Stammnummer</div>
                    <div className="text-sm opacity-90">Vehicle type number (CH)</div>
                  </button>
                </div>

                {/* Vehicle Lookup Form */}
                {inputMethod === 'vehicle-lookup' && (
                  <div className="bg-white rounded-lg p-4 space-y-4">
                    <p className="text-sm text-gray-600">Enter vehicle basic information to look up technical specifications:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={lookupData.make}
                        onChange={(e) => setLookupData({ ...lookupData, make: e.target.value })}
                        placeholder="Make (e.g., Porsche)"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                      />
                      <input
                        type="text"
                        value={lookupData.model}
                        onChange={(e) => setLookupData({ ...lookupData, model: e.target.value })}
                        placeholder="Model (e.g., 911)"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                      />
                      <input
                        type="text"
                        value={lookupData.bodyType}
                        onChange={(e) => setLookupData({ ...lookupData, bodyType: e.target.value })}
                        placeholder="Body Type (e.g., Coupe)"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                      />
                      <input
                        type="number"
                        value={lookupData.year}
                        onChange={(e) => setLookupData({ ...lookupData, year: Number(e.target.value) })}
                        placeholder="Year (e.g., 2024)"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleVehicleLookup}
                      className="w-full bg-[#2E7C6D] text-white px-6 py-2 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold"
                    >
                      Look Up Vehicle Specifications
                    </button>
                    <p className="text-xs text-gray-500">Example: Porsche, 911, Coupe, 2024 or BMW, 5 Series, Sedan, 2023</p>
                  </div>
                )}

                {/* Type Approval Form */}
                {inputMethod === 'type-approval' && (
                  <div className="bg-white rounded-lg p-4 space-y-4">
                    <p className="text-sm text-gray-600">Enter your Typengenehmigung number:</p>
                    <input
                      type="text"
                      value={lookupData.typeApproval}
                      onChange={(e) => setLookupData({ ...lookupData, typeApproval: e.target.value })}
                      placeholder="e.g., CH-TA-2024-911"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                    <button
                      type="button"
                      onClick={handleTypeApprovalLookup}
                      className="w-full bg-[#2E7C6D] text-white px-6 py-2 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold"
                    >
                      Look Up by Type Approval
                    </button>
                    <p className="text-xs text-gray-500">Example: CH-TA-2024-911 or CH-TA-2023-BMW5</p>
                  </div>
                )}

                {/* Stammnummer Form */}
                {inputMethod === 'stammnummer' && (
                  <div className="bg-white rounded-lg p-4 space-y-4">
                    <p className="text-sm text-gray-600">Enter your Stammnummer (Vehicle Type Number):</p>
                    <input
                      type="text"
                      value={lookupData.stammnummer}
                      onChange={(e) => setLookupData({ ...lookupData, stammnummer: e.target.value })}
                      placeholder="e.g., 1234-ABC"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D]"
                    />
                    <button
                      type="button"
                      onClick={handleStammnummerLookup}
                      className="w-full bg-[#2E7C6D] text-white px-6 py-2 rounded-lg hover:bg-[#256B5E] transition-colors font-semibold"
                    >
                      Look Up by Stammnummer
                    </button>
                    <p className="text-xs text-gray-500">Example: 1234-ABC or 5678-XYZ</p>
                  </div>
                )}
              </div>

              {/* Technical Specifications Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
                  {isVehicleLookedUp && (
                    <label className="flex items-center space-x-3 bg-orange-50 border-2 border-orange-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-orange-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={isTuned}
                        onChange={(e) => setIsTuned(e.target.checked)}
                        className="w-5 h-5 text-orange-600 border-orange-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <div>
                        <span className="font-semibold text-orange-900">Vehicle Modified/Tuned</span>
                        <p className="text-xs text-orange-700">Check if technical specifications have been modified</p>
                      </div>
                    </label>
                  )}
                </div>
                
                {!isVehicleLookedUp && (
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
                    <div className="text-yellow-800 font-semibold text-lg mb-2">
                      🔒 Technical Specifications Locked
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Please use one of the input methods above to look up your vehicle first.
                    </p>
                  </div>
                )}
                
                {isVehicleLookedUp && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transmission * {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <select
                        value={formData.transmission}
                        onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuel Type * {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <select
                        value={formData.fuelType}
                        onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="e.g., Black, White, Silver"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Doors {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <input
                        type="number"
                        value={formData.doors}
                        onChange={(e) => setFormData({ ...formData, doors: e.target.value })}
                        min="2"
                        max="5"
                        placeholder="e.g., 4"
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seats {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <input
                        type="number"
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                        min="2"
                        max="9"
                        placeholder="e.g., 5"
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Engine Size (L) {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.engineSize}
                        onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
                        placeholder="e.g., 2.0"
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horsepower (HP) {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <input
                        type="number"
                        value={formData.horsepower}
                        onChange={(e) => setFormData({ ...formData, horsepower: e.target.value })}
                        placeholder="e.g., 250"
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Drive Type {!isTuned && <span className="text-xs text-gray-500">(Auto-filled)</span>}
                      </label>
                      <select
                        value={formData.driveType}
                        onChange={(e) => setFormData({ ...formData, driveType: e.target.value as 'fwd' | 'rwd' | 'awd' | '4wd' })}
                        disabled={!isTuned}
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isTuned ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="fwd">FWD (Front Wheel Drive)</option>
                        <option value="rwd">RWD (Rear Wheel Drive)</option>
                        <option value="awd">AWD (All Wheel Drive)</option>
                        <option value="4wd">4WD (Four Wheel Drive)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Sale Details Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sale Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (CHF) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mileage (km) *
                    </label>
                    <input
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition *
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="certified">Certified Pre-Owned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Owners
                    </label>
                    <input
                      type="number"
                      value={formData.owners}
                      onChange={(e) => setFormData({ ...formData, owners: e.target.value })}
                      min="0"
                      placeholder="e.g., 1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VIN (Vehicle Identification Number)
                    </label>
                    <input
                      type="text"
                      value={formData.vin}
                      onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                      placeholder="e.g., 1HGBH41JXMN109186"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Equipment</h2>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (currentFeature.trim()) {
                            setFeatures([...features, currentFeature.trim()]);
                            setCurrentFeature('');
                          }
                        }
                      }}
                      placeholder="Add a feature (e.g., Leather Seats, Navigation System)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (currentFeature.trim()) {
                          setFeatures([...features, currentFeature.trim()]);
                          setCurrentFeature('');
                        }
                      }}
                      className="bg-[#2E7C6D] text-white px-4 py-2 rounded-lg hover:bg-[#256B5E] transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add</span>
                    </button>
                  </div>
                  
                  {features.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap gap-2">
                        {features.map((feature, index) => (
                          <div
                            key={index}
                            className="bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2"
                          >
                            <span className="text-sm text-gray-700">{feature}</span>
                            <button
                              type="button"
                              onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors font-semibold ${
                    isFormValid()
                      ? 'bg-[#2E7C6D] text-white hover:bg-[#256B5E] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isEditMode ? 'Update Offer' : 'Create Offer'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {!isFormValid() && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="text-red-800 font-semibold text-sm mb-2">⚠️ Please complete all required fields before publishing:</p>
                  <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
                    {!isVehicleLookedUp && <li>Perform a vehicle lookup using one of the input methods above</li>}
                    {!formData.price && <li>Enter the price (CHF)</li>}
                    {!formData.mileage && <li>Enter the mileage (km)</li>}
                    {!formData.owners && <li>Enter the number of previous owners</li>}
                    {!formData.vin && <li>Enter the VIN (Vehicle Identification Number)</li>}
                    {!formData.location && <li>Enter the location</li>}
                    {!formData.color && <li>Enter the vehicle color</li>}
                  </ul>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}