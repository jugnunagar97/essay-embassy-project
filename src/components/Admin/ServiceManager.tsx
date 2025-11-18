// src/components/Admin/ServiceManager.tsx

import { useState, useMemo, useCallback, useRef } from 'react';
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import {
  collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, query, where, getDocs, serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { PlusCircle, Edit, Trash2, ArrowUp, ArrowDown, Settings, CheckCircle, XCircle, Plus, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { ServiceCategory, SubService } from '../../types';

import ReactQuillWrapper from '../Common/ReactQuillWrapper';
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from '../Common/LoadingSpinner';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const db = getFirestore();
const storage = getStorage();


type ModalState =
  | { type: 'category'; data: Partial<ServiceCategory> }
  | {
      type: 'service';
      data: Partial<SubService> & {
        content?: string;
        seoTitle?: string;
        seoDescription?: string;
        faqs?: { question: string; answer: string; }[];
        featuredImage?: string;
        featuredImageFile?: File | null;
      };
    }
  | null;

const serviceQuillModulesConfig = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'],
    ['clean']
  ],
};

export default function ServiceManager() {
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useServiceCategories();
  const { services, isLoading: isLoadingServices, error: servicesError } = useSubServices();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceQuillRef = useRef<any>(null);

  const servicesForSelectedCategory = useMemo(() => {
    if (!selectedCategoryId) return [];
    return services.filter((s: SubService) => s.categoryId === selectedCategoryId).sort((a: SubService, b: SubService) => (a.order || 0) - (b.order || 0));
  }, [services, selectedCategoryId]);

  const selectedCategory = useMemo(() => {
    return categories.find((c: ServiceCategory) => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const handleModalClose = () => {
    setModalState(null);
  };

  const serviceImageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
  const file = input.files ? input.files[0] : null;
  if (file) {
    toast.loading('Uploading image...', { id: 'service-image-upload' });
    try {
      const storageRef = ref(storage, `service_content_images/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      const quill = serviceQuillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, 'image', imageUrl);
          quill.setSelection({ index: range.index + 1, length: 0 }); // Updated here
        } else {
          const length = quill.getLength();
          quill.insertEmbed(length, 'image', imageUrl);
          quill.setSelection({ index: length, length: 0 }); // Updated here
        }
      }
      toast.success('Image uploaded!', { id: 'service-image-upload' });
    } catch (error: any) {
      console.error("Error uploading service content image:", error);
      toast.error(`Image upload failed: ${error.message}`, { id: 'service-image-upload' });
    }
  }
};
  }, []);

  const memoizedServiceQuillModules = useMemo(() => ({
    toolbar: {
      container: serviceQuillModulesConfig.toolbar,
      handlers: {
        image: serviceImageHandler,
      },
    },
  }), [serviceImageHandler]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalState || !modalState.data || !modalState.data.name) {
      toast.error("Name is a required field.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Saving...');

    try {
      if (modalState.type === 'category') {
        const categoryData = modalState.data as ServiceCategory;
        const dataToSave = {
          name: categoryData.name,
          description: categoryData.description || '',
          isActive: categoryData.isActive || false,
        };

        if (categoryData.id) {
          await updateDoc(doc(collection(db, 'serviceCategories'), categoryData.id), { ...dataToSave, updatedAt: serverTimestamp() });
        } else {
          const newOrder = categories.length > 0 ? Math.max(...categories.map((c: ServiceCategory) => c.order || 0)) + 1 : 1;
          await addDoc(collection(db, 'serviceCategories'), { ...dataToSave, order: newOrder, createdAt: serverTimestamp() });
        }
      } else if (modalState.type === 'service' && selectedCategoryId) {
        const serviceData = modalState.data as (Partial<SubService> & { featuredImageFile?: File | null });

        let imageUrl = serviceData.featuredImage || '';
        const featuredImageFileToUpload = serviceData.featuredImageFile;
        if (featuredImageFileToUpload) {
          const imageRef = ref(storage, `service_featured_images/${Date.now()}_${featuredImageFileToUpload.name}`);
          await uploadBytes(imageRef, featuredImageFileToUpload);
          imageUrl = await getDownloadURL(imageRef);
          if (serviceData.id && serviceData.featuredImage && serviceData.featuredImage !== imageUrl) {
            try {
              const oldImageRef = ref(storage, serviceData.featuredImage);
              await deleteObject(oldImageRef);
            } catch (deleteError) {
              console.warn("Failed to delete old featured image:", deleteError);
            }
          }
        } else if (serviceData.featuredImage === '') {
          imageUrl = '';
        }

        const finalSlug = serviceData.link && typeof serviceData.link === 'string'
          ? serviceData.link
          : (serviceData.name || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const dataToSave: Partial<SubService> = {
          name: serviceData.name,
          description: serviceData.description || '',
          content: serviceData.content || '',
          link: finalSlug,
          isActive: serviceData.isActive || false,
          categoryId: selectedCategoryId,
          seoTitle: serviceData.seoTitle || '',
          seoDescription: serviceData.seoDescription || '',
          faqs: serviceData.faqs || [],
          featuredImage: imageUrl,
        };

        if (serviceData.id) {
          await updateDoc(doc(collection(db, 'subServices'), serviceData.id), { ...dataToSave, updatedAt: serverTimestamp() });
        } else {
          const newOrder = servicesForSelectedCategory.length > 0 ? Math.max(...servicesForSelectedCategory.map((s: SubService) => s.order || 0)) + 1 : 1;
          await addDoc(collection(db, 'subServices'), { ...dataToSave, order: newOrder, createdAt: serverTimestamp() });
        }
      }
      toast.success('Saved successfully!', { id: toastId });
      handleModalClose();
    } catch (err: any) {
      console.error('Failed to save:', err);
      toast.error(`Failed to save: ${err.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    const confirmed = await new Promise((resolve) => {
      const confirmModal = document.createElement('div');
      confirmModal.className = 'fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4';
      confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            WARNING: Deleting category "${categoryName}" will also delete ALL services (${services.filter((s: SubService) => s.categoryId === categoryId).length}) under it. This action cannot be undone. Are you sure?
          </p>
          <div class="flex justify-center space-x-4">
            <button id="cancelBtnCat" type="button" class="btn-secondary px-4 py-2">Cancel</button>
            <button id="confirmBtnCat" type="button" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200">Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);

      document.getElementById('cancelBtnCat')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(false);
      });
      document.getElementById('confirmBtnCat')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(true);
      });
    });

    if (!confirmed) return;

    const toastId = toast.loading(`Deleting category "${categoryName}" and its services...`);
    try {
      const batch = writeBatch(db);

      const servicesQuery = query(collection(db, 'subServices'), where('categoryId', '==', categoryId));
      const servicesSnapshot = await getDocs(servicesQuery);
      servicesSnapshot.forEach(serviceDoc => {
        batch.delete(serviceDoc.ref);
      });

      const categoryRef = doc(collection(db, 'serviceCategories'), categoryId);
      batch.delete(categoryRef);

      await batch.commit();
      toast.success('Category and services deleted successfully!', { id: toastId });
      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId(null);
      }
    } catch (err: any) {
      console.error("Error deleting category:", err);
      toast.error(`Failed to delete category: ${err.message}`, { id: toastId });
    }
  };

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    const confirmed = await new Promise((resolve) => {
      const confirmModal = document.createElement('div');
      confirmModal.className = 'fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-4';
      confirmModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
          <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete service "${serviceName}"?</p>
          <div class="flex justify-center space-x-4">
            <button id="cancelBtnSrv" type="button" class="btn-secondary px-4 py-2">Cancel</button>
            <button id="confirmBtnSrv" type="button" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200">Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);

      document.getElementById('cancelBtnSrv')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(false);
      });
      document.getElementById('confirmBtnSrv')?.addEventListener('click', () => {
        document.body.removeChild(confirmModal);
        resolve(true);
      });
    });

    if (!confirmed) return;

    const toastId = toast.loading('Deleting service...');
    try {
      await deleteDoc(doc(collection(db, 'subServices'), serviceId));
      toast.success('Service deleted successfully!', { id: toastId });
    } catch (err: any) {
      console.error("Error deleting service:", err);
      toast.error(`Failed to delete service: ${err.message}`, { id: toastId });
    }
  };

  const handleReorder = async (items: (ServiceCategory[] | SubService[]), index: number, direction: 'up' | 'down') => {
    const item = items[index] as ServiceCategory | SubService;
    const otherItemIndex = direction === 'up' ? index - 1 : index + 1;
    if (otherItemIndex < 0 || otherItemIndex >= items.length) return;
    const otherItem = items[otherItemIndex] as ServiceCategory | SubService;

    const batch = writeBatch(db);
    const collectionName = 'categoryId' in item ? 'subServices' : 'serviceCategories';

    const itemRef = doc(collection(db, collectionName), item.id);
    const otherItemRef = doc(collection(db, collectionName), otherItem.id);

    batch.update(itemRef, { order: otherItem.order });
    batch.update(otherItemRef, { order: item.order });

    await batch.commit();
    toast.success("Order updated.");
  };

  const isLoading = isLoadingCategories || isLoadingServices;
  const error = categoriesError || servicesError;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <main className="p-4 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage <span className="text-primary-500">Services</span></h1>
        <button
          onClick={() => setModalState({ type: 'category', data: { name: '', description: '', isActive: true } })}
          className="btn-primary flex items-center"
        >
          <PlusCircle size={20} className="mr-2" /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 border border-gray-100 dark:border-gray-700 h-fit">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Service Categories</h2>
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-sm">No categories found. Click 'New Category' to add one!</p>
            ) : (
              categories.map((category: ServiceCategory, index: number) => (
                <div key={category.id} onClick={() => setSelectedCategoryId(category.id)}
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-colors duration-200
                              ${selectedCategoryId === category.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}
                              shadow-sm hover:shadow-md `}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-semibold text-gray-800 dark:text-white">{category.name}</div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <button onClick={(e) => { e.stopPropagation(); handleReorder(categories, index, 'up'); }} disabled={index === 0} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white icon-hover" title="Move Up"><ArrowUp size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleReorder(categories, index, 'down'); }} disabled={index === categories.length - 1} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white icon-hover" title="Move Down"><ArrowDown size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); setModalState({ type: 'category', data: category }); }} className="hover:text-blue-500 icon-hover" title="Edit Category"><Edit size={16} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id, category.name); }} className="hover:text-red-500 icon-hover" title="Delete Category"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className={`flex items-center text-xs mt-1 ${category.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {category.isActive ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                    {category.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 border border-gray-100 dark:border-gray-700 min-h-[500px]">
          {selectedCategory ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedCategory.name} Services</h2>
                <button
                  onClick={() => setModalState({
                    type: 'service',
                    data: {
                      name: '', description: '', link: '', isActive: true, order: 0, categoryId: selectedCategoryId || '',
                      content: '', seoTitle: '', seoDescription: '', faqs: [], featuredImage: '', featuredImageFile: null
                    }
                  })}
                  className="btn-primary flex items-center"
                >
                  <PlusCircle size={20} className="mr-2" /> New Service
                </button>
              </div>
              <div className="space-y-3">
                {servicesForSelectedCategory.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No services in this category. Click 'New Service' to add one!</p>
                ) : (
                  servicesForSelectedCategory.map((service: SubService, index: number) => (
                    <div key={service.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{service.name}</div>
                          <div className={`flex items-center text-xs mt-1 ${service.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                            {service.isActive ? <CheckCircle size={14} className="mr-1" /> : <XCircle size={14} className="mr-1" />}
                            {service.isActive ? 'Active' : 'Inactive'}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400">
                          <button onClick={(e) => { e.stopPropagation(); handleReorder(servicesForSelectedCategory, index, 'up'); }} disabled={index === 0} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white icon-hover" title="Move Up"><ArrowUp size={18} /></button>
                          <button onClick={(e) => { e.stopPropagation(); handleReorder(servicesForSelectedCategory, index, 'down'); }} disabled={index === servicesForSelectedCategory.length - 1} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white icon-hover" title="Move Down"><ArrowDown size={18} /></button>
                          <button onClick={(e) => { e.stopPropagation(); setModalState({ type: 'service', data: service }); }} className="hover:text-blue-500 icon-hover" title="Edit Service"><Edit size={18} /></button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteService(service.id, service.name); }} className="hover:text-red-500 icon-hover" title="Delete Service"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <Settings size={48} className="mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold">Select a category</h3>
              <p>Choose a category from the left to view and manage its services, or click 'New Category' to create one.</p>
            </div>
          )}
        </div>
      </div>

      {modalState && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {modalState.data?.id ? 'Edit' : 'Add'} {modalState.type === 'category' ? 'Category' : 'Service'}
              </h3>
              <button
                type="button"
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Close"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {modalState.type === 'category' && (
                <>
                  <div>
                    <label htmlFor="category-name" className="form-label">Category Name <span className="text-red-500">*</span></label>
                    <input
                      id="category-name"
                      type="text"
                      required
                      value={modalState.data?.name || ''}
                      onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, name: e.target.value } } : null)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="category-description" className="form-label">Description</label>
                    <textarea
                      id="category-description"
                      value={modalState.data?.description || ''}
                      onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, description: e.target.value } } : null)}
                      className="form-input"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="category-is-active"
                      checked={modalState.data?.isActive || false}
                      onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, isActive: e.target.checked } } : null)}
                      className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <label htmlFor="category-is-active" className="ml-2 text-gray-700 dark:text-gray-300">Active Category</label>
                  </div>
                </>
              )}

              {modalState.type === 'service' && (
                ((serviceData: Partial<SubService> & { featuredImageFile?: File | null }) => (
                  <>
                    <div>
                      <label htmlFor="service-name" className="form-label">Service Name <span className="text-red-500">*</span></label>
                      <input
                        id="service-name"
                        type="text"
                        required
                        value={serviceData.name || ''}
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, name: e.target.value } } : null)}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="service-content" className="form-label">Service Content</label>
                      <ReactQuillWrapper
                        key={serviceData.id || 'new-service'}
                        ref={serviceQuillRef}
                        theme="snow"
                        value={serviceData.content || ''}
                        onChange={(content) => setModalState(s => s ? { ...s, data: { ...s.data, content: content } } : null)}
                        modules={memoizedServiceQuillModules}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="service-description" className="form-label">Short Description</label>
                      <textarea
                        id="service-description"
                        value={serviceData.description || ''}
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, description: e.target.value } } : null)}
                        className="form-input"
                        rows={2}
                      />
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">SEO Details</h4>
                    <div>
                      <label htmlFor="service-seo-title" className="form-label">SEO Title</label>
                      <input
                        id="service-seo-title"
                        type="text"
                        placeholder="Title for search engines"
                        value={serviceData.seoTitle || ''}
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, seoTitle: e.target.value } } : null)}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="service-seo-description" className="form-label">SEO Meta Description</label>
                      <textarea
                        id="service-seo-description"
                        placeholder="Short description for search results"
                        value={serviceData.seoDescription || ''}
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, seoDescription: e.target.value } } : null)}
                        className="form-input"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label htmlFor="service-link-slug" className="form-label">URL Slug (e.g., /services/my-awesome-service)</label>
                      <input
                        id="service-link-slug"
                        type="text"
                        placeholder="auto-generates from name if empty"
                        value={serviceData.link || ''}
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, link: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') } } : null)}
                        className="form-input"
                      />
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">Featured Image</h4>
                    <div>
                      <label htmlFor="service-featured-image" className="form-label">Upload Featured Image</label>
                      <input
                        id="service-featured-image"
                        type="file"
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, featuredImageFile: e.target.files ? e.target.files[0] : null } } : null)}
                        className="w-full text-sm text-gray-700 dark:text-gray-300
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-lg file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200 transition-colors cursor-pointer"
                      />
                      {(serviceData.featuredImage && !serviceData.featuredImageFile) && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Image:</p>
                          <img src={serviceData.featuredImage} alt="current featured" className="w-48 h-auto object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"/>
                          <button
                            type="button"
                            onClick={() => setModalState(s => s ? { ...s, data: { ...s.data, featuredImage: '' } } : null)}
                            className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center"
                          >
                            <XCircle size={16} className="mr-1"/> Remove Current Image
                          </button>
                        </div>
                      )}
                      {serviceData.featuredImageFile && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">New file selected: {serviceData.featuredImageFile.name}</p>
                      )}
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">FAQs</h4>
                    <div className="space-y-4">
                      {(serviceData.faqs || []).map((faq: { question: string; answer: string; }, faqIndex: number) => (
                        <div key={faqIndex} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-gray-800 dark:text-gray-200">FAQ #{faqIndex + 1}</h5>
                            <button
                              type="button"
                              onClick={() => setModalState(s => s ? { ...s, data: { ...s.data, faqs: (serviceData.faqs || []).filter((_item, i) => i !== faqIndex) } } : null)}
                              className="text-red-500 hover:text-red-700 icon-hover"
                              title="Remove FAQ"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div>
                            <label htmlFor={`faq-q-${faqIndex}`} className="form-label">Question</label>
                            <input
                              id={`faq-q-${faqIndex}`}
                              type="text"
                              value={faq.question}
                              onChange={(e) => setModalState(s => s ? {
                                ...s,
                                data: {
                                  ...s.data,
                                  faqs: (serviceData.faqs || []).map((item, i) => i === faqIndex ? { ...item, question: e.target.value } : item)
                                }
                              } : null)}
                              className="form-input mb-2"
                            />
                          </div>
                          <div>
                            <label htmlFor={`faq-a-${faqIndex}`} className="form-label">Answer</label>
                            <textarea
                              id={`faq-a-${faqIndex}`}
                              value={faq.answer}
                              onChange={(e) => setModalState(s => s ? {
                                ...s,
                                data: {
                                  ...s.data,
                                  faqs: (serviceData.faqs || []).map((item, i) => i === faqIndex ? { ...item, answer: e.target.value } : item)
                                }
                              } : null)}
                              className="form-input"
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setModalState(s => s ? { ...s, data: { ...s.data, faqs: [...(serviceData.faqs || []), { question: '', answer: '' }] } } : null)}
                        className="btn-secondary flex items-center justify-center w-full mt-4"
                      >
                        <Plus size={18} className="mr-2" /> Add FAQ
                      </button>
                    </div>

                    <div className="flex items-center mt-6">
                      <input
                        type="checkbox"
                        id="service-is-active"
                        checked={serviceData.isActive || false}
                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, isActive: e.target.checked } } : null)}
                        className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                      <label htmlFor="service-is-active" className="ml-2 text-gray-700 dark:text-gray-300">Active Service Page</label>
                    </div>
                  </>
                ))(modalState.data as Partial<SubService> & { featuredImageFile?: File | null })
              )}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button type="button" onClick={handleModalClose} disabled={isSubmitting} className="btn-secondary disabled:opacity-50">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-50 flex items-center">
                {isSubmitting ? <LoadingSpinner size="sm" className="mr-2" /> : <Save size={18} className="mr-2" />}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
      </main>
    </div>
  );
}