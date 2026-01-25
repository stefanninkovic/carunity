import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Video } from 'lucide-react';
import { useWheels } from '../context/WheelsContext';
import { useCars } from '../context/CarsContext';
import { mockUser } from '../data/mockData';

export function EditWheelPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { wheels, updateWheel } = useWheels();
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

  useEffect(() => {
    if (id) {
      const wheel = wheels.find((w) => w.id === id);
      if (wheel) {
        setFormData({
          title: wheel.title,
          description: wheel.description,
          carId: wheel.carId,
          videoFile: null,
          thumbnailUrl: wheel.thumbnailUrl,
        });
      }
    }
  }, [id, wheels]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, videoFile: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;

    // Find the selected car to get its image as thumbnail
    let thumbnailUrl = formData.thumbnailUrl;
    
    if (formData.carId) {
      const selectedCar = cars.find((car) => car.id === formData.carId);
      if (selectedCar) {
        thumbnailUrl = selectedCar.imageUrl;
      }
    }

    // Update the wheel
    updateWheel(id, {
      title: formData.title,
      description: formData.description,
      carId: formData.carId || '',
      thumbnailUrl: thumbnailUrl,
    });

    alert('Wheel updated successfully!');
    navigate('/profile/manage-wheels');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/profile/manage-wheels')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Manage Wheels</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Video className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-2xl font-bold text-gray-900">Edit Wheel</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Thumbnail Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Thumbnail
              </label>
              <img
                src={formData.thumbnailUrl}
                alt="Current thumbnail"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Change Video (Optional)
              </label>
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2E7C6D] transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {formData.videoFile ? (
                    <p className="text-[#2E7C6D] font-semibold mb-2">{formData.videoFile.name}</p>
                  ) : (
                    <p className="text-gray-600 mb-2">Click to upload a new video</p>
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
                  <option key={car.id} value={car.id}>
                    {car.make} {car.model} ({car.year})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-[#2E7C6D] text-white px-6 py-3 rounded-lg hover:bg-[#256B5E] transition-colors"
              >
                Update Wheel
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile/manage-wheels')}
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
