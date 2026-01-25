import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Eye, EyeOff, Heart } from 'lucide-react';
import { useWheels } from '../context/WheelsContext';
import { mockUser } from '../data/mockData';

export function ManageWheelsPage() {
  const navigate = useNavigate();
  const { wheels, deleteWheel, updateWheel } = useWheels();
  const userWheels = wheels.filter((wheel) => wheel.userId === mockUser.id);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this wheel?')) {
      deleteWheel(id);
    }
  };

  const handleToggleListing = (id: string, currentStatus: boolean | undefined) => {
    const newStatus = currentStatus === false;
    updateWheel(id, { isListed: newStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Wheels</h1>

          {userWheels.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userWheels.map((wheel) => (
                <div key={wheel.id} className="relative group">
                  {/* Video Card - TikTok Style */}
                  <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-900">
                    {wheel.isListed === false && (
                      <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-90 text-white px-2 py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
                        <EyeOff className="h-3 w-3" />
                        <span>Not Listed</span>
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
                        <p className="text-xs text-gray-300 line-clamp-2 mb-2">
                          {wheel.description}
                        </p>
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

                    {/* Action Buttons - Always Visible */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-2 z-20">
                      <button
                        onClick={() => navigate(`/profile/edit-wheel/${wheel.id}`)}
                        className="p-2 bg-[#2E7C6D] text-white rounded-full hover:bg-[#256B5E] transition-colors shadow-lg"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleListing(wheel.id, wheel.isListed)}
                        className={`p-2 rounded-full transition-colors shadow-lg ${
                          wheel.isListed === false
                            ? 'bg-white text-gray-900 hover:bg-gray-100'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                        title={wheel.isListed === false ? 'List Publicly' : 'Unlist'}
                      >
                        {wheel.isListed === false ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(wheel.id)}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You don't have any wheels yet</p>
              <button
                onClick={() => navigate('/profile/create-wheel')}
                className="bg-[#2E7C6D] text-white px-6 py-2 rounded-lg hover:bg-[#256B5E] transition-colors"
              >
                Create Your First Wheel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}