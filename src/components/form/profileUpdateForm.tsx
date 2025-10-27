'use client';

import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
});


type ProfileFormValues = z.infer<typeof profileSchema>;


export default function ProfileForm({ userPhone = '8218290623' }) {
  const [view, setView] = useState('profile');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

  });


  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    alert('Profile updated successfully!');
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
     reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen  p-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#E5D18E90] rounded-lg shadow-lg p-8 border border-yellow-200">
          <p className="text-center text-gray-600 mb-6">
            View and update your profile in your Acharya Lavbhushan Astro account.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setView('profile')}
              className={`px-6 py-3 rounded font-medium transition-colors ${
                view === 'profile'
                  ? 'bg-yellow-400 text-gray-800'
                  : 'bg-white text-gray-800 border-2 border-yellow-300'
              }`}
            >
              Update Profile
            </button>
            <button
              onClick={() => setView('picture')}
              className={`md:px-6 px-4  py-2 rounded font-medium transition-colors ${
                view === 'picture'
                  ? 'bg-yellow-400 text-gray-800'
                  : 'bg-white text-gray-800 border-2 border-yellow-300'
              }`}
            >
              Change Picture
            </button>
          </div>

          {view === 'profile' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    {...register('firstName')}
                    placeholder="First Name"
                    className={`w-full px-4 py-1 rounded bg-white  border-2 ${
                      errors.firstName ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <select
                    {...register('gender')}
                    className={`w-full px-4 py-1 rounded bg-white border-2 ${
                      errors.gender ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400 text-gray-600`}
                  >
                    <option value="">---------Select Gender---------</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('lastName')}
                    placeholder="Last Name"
                    className={`w-full px-4 py-1 rounded bg-white  border-2 ${
                      errors.lastName ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400`}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="date"
                    {...register('dateOfBirth')}
                    className={`w-full px-4 py-1 rounded bg-white border-2 ${
                      errors.dateOfBirth ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400 text-gray-600`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className={`w-full px-4 py-1 rounded bg-white border-2 ${
                      errors.email ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('placeOfBirth')}
                    placeholder="Place of Birth"
                    className={`w-full px-4 py-1 rounded bg-white border-2 ${
                      errors.placeOfBirth ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400`}
                  />
                  {errors.placeOfBirth && (
                    <p className="text-red-600 text-sm mt-1">{errors.placeOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('phone')}
                    placeholder="Phone Number"
                    className={`w-full px-4 py-1 rounded bg-white border-2 ${
                      errors.phone ? 'border-red-400' : 'border-transparent'
                    } focus:outline-none focus:border-yellow-400`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                  
                </div>

                <div className="">
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-yellow-400 text-white font-medium py-2 rounded transition-colors"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'picture' && (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Image preview box */}
            <div className="w-55 h-55 md:w-64 md:h-64 bg-white bg-opacity-50 border-2 border-gray-300 rounded flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <div className="bg-red-700 w-24 h-24 mx-auto mb-2 rounded flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <p className="text-red-700 font-semibold">Acharya Lavbhushan</p>
                  <p className="text-red-700 text-sm">Corporate & Celebrity Astrologer</p>
                </div>
              )}
            </div>

            {/* File input section */}
            <div className="flex-1 w-full px-4 py-1 rounded bg-white border-2">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="inline-block px-6 py-1 border-2 border-gray-400 rounded cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Choose File
              </label>
              <span className="ml-3 text-gray-600">
                {selectedImage ? 'Image selected' : 'No file chosen'}
              </span>

              
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}