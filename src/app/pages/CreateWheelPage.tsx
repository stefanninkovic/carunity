import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Video } from 'lucide-react';
import { useWheels } from '../context/WheelsContext';
import { useCars } from '../context/CarsContext';
import { mockUser } from '../data/mockData';

export function CreateWheelPage() {
  const navigate = useNavigate();
  const { addWheel } = useWheels();
  const { cars } = useCars();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    carId: '',
    videoFile: null as File | null,
    thumbnailUrl: '',
  });

  // Get only the user's cars
  const userCars = cars.filter((car) => car.sellerId === mockUser.id);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, videoFile: file });
      // In a real app, you would upload the file to a server
      // For now, we'll just use a placeholder URL
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the selected car to get its image as thumbnail
    let thumbnailUrl = 'https://images.unsplash.com/photo-1742056024244-02a093dae0b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzY4MDkyOTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080';
    
    if (formData.carId) {
      const selectedCar = cars.find((car) => car.id === formData.carId);
      if (selectedCar) {
        thumbnailUrl = selectedCar.imageUrl;
      }
    }

    // Create the wheel
    addWheel({
      title: formData.title,
      description: formData.description,
      carId: formData.carId || '',
      videoUrl: '', // In a real app, this would be the uploaded video URL
      thumbnailUrl: thumbnailUrl,
      userId: mockUser.id,
      userName: mockUser.name,
    });

    alert('Wheel created successfully!');
    navigate('/profile/manage-wheels');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Video className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-2xl font-bold text-gray-900">Create New Wheel</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Video *
              </label>
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2E7C6D] transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {formData.videoFile ? (
                    <p className="text-[#2E7C6D] font-semibold mb-2">{formData.videoFile.name}</p>
                  ) : (
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  )}
                  <p className="text-sm text-gray-500">MP4, MOV up to 100MB</p>
                  <p className="text-xs text-gray-400 mt-2">Recommended: Vertical video (9:16)</p>
                </div>
              </label>
              <input 
                id="video-upload"
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleVideoUpload} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your wheel a catchy title"
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
                placeholder="Describe your video..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Related Car (Optional)
              </label>
              <select
                value={formData.carId}
                onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a car from your listings</option>
                {userCars.map((car) => (
                  <option key={car.id} value={car.id}>{car.make} {car.model}</option>
                ))}
              </select>
            </div>

            <div className="bg-[#A5D6A7] border border-[#2E7C6D] rounded-lg p-4">
              <h3 className="font-semibold text-[#2E7C6D] mb-2">Tips for great Wheels:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Keep it short and engaging (15-60 seconds)</li>
                <li>• Show the car from multiple angles</li>
                <li>• Highlight unique features</li>
                <li>• Use good lighting and stable camera work</li>
                <li>• Add energetic background music</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-[#2E7C6D] text-white px-6 py-3 rounded-lg hover:bg-[#256B5E] transition-colors"
              >
                Create Wheel
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}