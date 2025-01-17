import React, { useState, useRef } from 'react';
import {
  UserIcon, TrashIcon, PlusCircleIcon,
  BuildingOfficeIcon, HomeIcon, CameraIcon,
} from '@heroicons/react/24/outline';

interface Manager {
  id: number;
  name: string;
  image: string;
  designation: 'City Manager' | 'Branch Manager';
}

interface NewManager {
  name: string;
  image: string;
  designation: 'City Manager' | 'Branch Manager';
}

const UserManagement: React.FC = () => {
  const [managers, setManagers] = useState<Manager[]>([
    { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150', designation: 'City Manager' },
    { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/150', designation: 'Branch Manager' },
  ]);

  const [newManager, setNewManager] = useState<NewManager>({
    name: '',
    image: '',
    designation: 'City Manager',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addManager = (e: React.FormEvent) => {
    e.preventDefault();
    setManagers([...managers, { ...newManager, id: Date.now() }]);
    setNewManager({ name: '', image: '', designation: 'City Manager' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteManager = (id: number) => {
    setManagers(managers.filter((manager) => manager.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewManager({ ...newManager, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const cityManagerCount = managers.filter((m) => m.designation === 'City Manager').length;
  const branchManagerCount = managers.filter((m) => m.designation === 'Branch Manager').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500">
              <BuildingOfficeIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">City Managers</h3>
              <p className="text-2xl font-bold text-gray-900">{cityManagerCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500">
              <HomeIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Branch Managers</h3>
              <p className="text-2xl font-bold text-gray-900">{branchManagerCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Manager</h3>
        <form onSubmit={addManager} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={newManager.name}
              onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {newManager.image ? (
                  <img src={newManager.image} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-full w-full text-gray-300" />
                )}
              </span>
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <CameraIcon className="h-5 w-5 mr-2 inline-block" />
                Change
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
            <select
              id="designation"
              value={newManager.designation}
              onChange={(e) => setNewManager({ ...newManager, designation: e.target.value as 'City Manager' | 'Branch Manager' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="City Manager">City Manager</option>
              <option value="Branch Manager">Branch Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Manager
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Existing Managers</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {managers.map((manager) => (
            <div key={manager.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={manager.image} alt={manager.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{manager.name}</h4>
                  <p className="text-sm text-gray-500">{manager.designation}</p>
                </div>
              </div>
              <button
                onClick={() => deleteManager(manager.id)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
