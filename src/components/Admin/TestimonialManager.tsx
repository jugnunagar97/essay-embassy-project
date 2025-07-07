import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { Testimonial } from '../../types';
import { useTestimonials } from '../../hooks/useTestimonials';
import toast from 'react-hot-toast';

interface TestimonialFormData {
  name: string;
  role: string;
  content: string;
  rating: number;
  platform: 'google' | 'trustpilot' | 'sitejabber';
  avatar: string;
  date: string;
}

export default function TestimonialManager() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TestimonialFormData>();

  const watchedRating = watch('rating', 5);

  const onSubmit = (data: TestimonialFormData) => {
    if (editingId) {
      updateTestimonial(editingId, data);
      toast.success('Testimonial updated successfully');
      setEditingId(null);
    } else {
      addTestimonial(data);
      toast.success('Testimonial added successfully');
      setIsAdding(false);
    }
    reset();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setValue('name', testimonial.name);
    setValue('role', testimonial.role);
    setValue('content', testimonial.content);
    setValue('rating', testimonial.rating);
    setValue('platform', testimonial.platform);
    setValue('avatar', testimonial.avatar);
    setValue('date', testimonial.date || '');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      toast.success('Testimonial deleted successfully');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    reset();
  };

  const platformColors = {
    google: 'bg-blue-100 text-blue-800',
    trustpilot: 'bg-green-100 text-green-800',
    sitejabber: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonial Manager</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Reviewer name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role *
                </label>
                <input
                  type="text"
                  {...register('role', { required: 'Role is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., University Student"
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Content *
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Review text..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform *
                </label>
                <select
                  {...register('platform', { required: 'Platform is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Platform</option>
                  <option value="google">Google Reviews</option>
                  <option value="trustpilot">TrustPilot</option>
                  <option value="sitejabber">SiteJabber</option>
                </select>
                {errors.platform && (
                  <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    {...register('rating', { required: 'Rating is required' })}
                    className="flex-1"
                  />
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < watchedRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm font-medium ml-2">{watchedRating}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Avatar URL *
              </label>
              <input
                type="url"
                {...register('avatar', { required: 'Avatar URL is required' })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/avatar.jpg"
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{editingId ? 'Update' : 'Add'} Testimonial</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Testimonials ({testimonials.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reviewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${platformColors[testimonial.platform]}`}>
                      {testimonial.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {testimonial.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {testimonial.content}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}