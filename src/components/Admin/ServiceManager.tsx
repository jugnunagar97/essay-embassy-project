import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ChevronDown, 
  ChevronUp,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { ServiceCategory, SubService } from '../../types';
import { useServices } from '../../hooks/useServices';
import toast from 'react-hot-toast';

interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

interface SubServiceFormData {
  categoryId: string;
  name: string;
  description: string;
  link: string;
  order: number;
  isActive: boolean;
}

export default function ServiceManager() {
  const {
    serviceCategories,
    subServices,
    getSubServicesByCategory,
    addServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    addSubService,
    updateSubService,
    deleteSubService
  } = useServices();

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubService, setIsAddingSubService] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingSubServiceId, setEditingSubServiceId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    reset: resetCategoryForm,
    setValue: setCategoryValue,
    formState: { errors: categoryErrors }
  } = useForm<CategoryFormData>();

  const {
    register: registerSubService,
    handleSubmit: handleSubServiceSubmit,
    reset: resetSubServiceForm,
    setValue: setSubServiceValue,
    formState: { errors: subServiceErrors }
  } = useForm<SubServiceFormData>();

  const onCategorySubmit = (data: CategoryFormData) => {
    if (editingCategoryId) {
      updateServiceCategory(editingCategoryId, data);
      toast.success('Category updated successfully');
      setEditingCategoryId(null);
    } else {
      addServiceCategory(data);
      toast.success('Category added successfully');
      setIsAddingCategory(false);
    }
    resetCategoryForm();
  };

  const onSubServiceSubmit = (data: SubServiceFormData) => {
    if (editingSubServiceId) {
      updateSubService(editingSubServiceId, data);
      toast.success('Sub-service updated successfully');
      setEditingSubServiceId(null);
    } else {
      addSubService(data);
      toast.success('Sub-service added successfully');
      setIsAddingSubService(false);
    }
    resetSubServiceForm();
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategoryId(category.id);
    setCategoryValue('name', category.name);
    setCategoryValue('description', category.description || '');
    setCategoryValue('icon', category.icon || '');
    setCategoryValue('order', category.order);
    setCategoryValue('isActive', category.isActive);
    setIsAddingCategory(false);
  };

  const handleEditSubService = (subService: SubService) => {
    setEditingSubServiceId(subService.id);
    setSubServiceValue('categoryId', subService.categoryId);
    setSubServiceValue('name', subService.name);
    setSubServiceValue('description', subService.description || '');
    setSubServiceValue('link', subService.link || '');
    setSubServiceValue('order', subService.order);
    setSubServiceValue('isActive', subService.isActive);
    setIsAddingSubService(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category? All sub-services will also be deleted.')) {
      deleteServiceCategory(id);
      toast.success('Category deleted successfully');
    }
  };

  const handleDeleteSubService = (id: string) => {
    if (confirm('Are you sure you want to delete this sub-service?')) {
      deleteSubService(id);
      toast.success('Sub-service deleted successfully');
    }
  };

  const handleCancel = () => {
    setIsAddingCategory(false);
    setIsAddingSubService(false);
    setEditingCategoryId(null);
    setEditingSubServiceId(null);
    resetCategoryForm();
    resetSubServiceForm();
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Manager</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsAddingSubService(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Sub-Service</span>
          </button>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Category Form */}
      {(isAddingCategory || editingCategoryId) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingCategoryId ? 'Edit Category' : 'Add New Category'}
          </h3>
          
          <form onSubmit={handleCategorySubmit(onCategorySubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  {...registerCategory('name', { required: 'Category name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Essay Writing Services"
                />
                {categoryErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{categoryErrors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon (Lucide React)
                </label>
                <input
                  type="text"
                  {...registerCategory('icon')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., PenTool"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                {...registerCategory('description')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of the category"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  {...registerCategory('order', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  min="1"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...registerCategory('isActive')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                </label>
              </div>
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
                <span>{editingCategoryId ? 'Update' : 'Add'} Category</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add/Edit Sub-Service Form */}
      {(isAddingSubService || editingSubServiceId) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingSubServiceId ? 'Edit Sub-Service' : 'Add New Sub-Service'}
          </h3>
          
          <form onSubmit={handleSubServiceSubmit(onSubServiceSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  {...registerSubService('categoryId', { required: 'Category is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Category</option>
                  {serviceCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {subServiceErrors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">{subServiceErrors.categoryId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sub-Service Name *
                </label>
                <input
                  type="text"
                  {...registerSubService('name', { required: 'Sub-service name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Java Assignment Help"
                />
                {subServiceErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{subServiceErrors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                {...registerSubService('description')}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of the sub-service"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link/URL
                </label>
                <input
                  type="text"
                  {...registerSubService('link')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="/services/java-assignment-help"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  {...registerSubService('order', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  min="1"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...registerSubService('isActive')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                </label>
              </div>
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
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{editingSubServiceId ? 'Update' : 'Add'} Sub-Service</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Service Categories ({serviceCategories.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {serviceCategories
            .sort((a, b) => a.order - b.order)
            .map((category) => {
              const categorySubServices = getSubServicesByCategory(category.id);
              const isExpanded = expandedCategories.has(category.id);

              return (
                <div key={category.id} className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleCategoryExpansion(category.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      
                      <div className="flex items-center space-x-3">
                        <GripVertical size={16} className="text-gray-400" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                              {category.name}
                            </h4>
                            {category.isActive ? (
                              <Eye size={16} className="text-green-500" />
                            ) : (
                              <EyeOff size={16} className="text-gray-400" />
                            )}
                          </div>
                          {category.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {category.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Order: {category.order} • {categorySubServices.length} sub-services
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Sub-Services */}
                  {isExpanded && categorySubServices.length > 0 && (
                    <div className="mt-4 ml-8 space-y-2">
                      {categorySubServices
                        .sort((a, b) => a.order - b.order)
                        .map((subService) => (
                          <div
                            key={subService.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <GripVertical size={14} className="text-gray-400" />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {subService.name}
                                  </span>
                                  {subService.isActive ? (
                                    <Eye size={14} className="text-green-500" />
                                  ) : (
                                    <EyeOff size={14} className="text-gray-400" />
                                  )}
                                </div>
                                {subService.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {subService.description}
                                  </p>
                                )}
                                <p className="text-xs text-gray-500">
                                  Order: {subService.order}
                                  {subService.link && ` • Link: ${subService.link}`}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditSubService(subService)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteSubService(subService.id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}