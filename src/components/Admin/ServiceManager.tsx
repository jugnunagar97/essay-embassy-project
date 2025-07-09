// src/components/Admin/ServiceManager.tsx

import { useState, useMemo } from 'react';
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import { db } from '../../firebase';
import {
  collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, query, where, getDocs
} from 'firebase/firestore';
import { PlusCircle, Edit, Trash2, ArrowUp, ArrowDown, Settings, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ServiceCategory, SubService } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';

// Helper type for the modal form state
type ModalState = 
  | { type: 'category'; data: Partial<ServiceCategory> }
  | { type: 'service'; data: Partial<SubService> }
  | null;


export default function ServiceManager() {
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useServiceCategories();
  const { services, isLoading: isLoadingServices, error: servicesError } = useSubServices();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoize the services filtered by the selected category
  const servicesForSelectedCategory = useMemo(() => {
    if (!selectedCategoryId) return [];
    return services.filter(s => s.categoryId === selectedCategoryId);
  }, [services, selectedCategoryId]);
  
  const selectedCategory = useMemo(() => {
    return categories.find(c => c.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const handleModalClose = () => setModalState(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalState || !modalState.data?.name) {
        toast.error("Name is a required field.");
        return;
    }
    
    setIsSubmitting(true);
    const toastId = toast.loading('Saving...');

    try {
      if (modalState.type === 'category') {
        const categoryData = modalState.data as Partial<ServiceCategory>;
        if (categoryData.id) { // Editing
          const { id, ...dataToUpdate } = categoryData;
          await updateDoc(doc(db, 'serviceCategories', id), { ...dataToUpdate, updatedAt: new Date().toISOString() });
        } else { // Adding
          const newOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order)) + 1 : 1;
          await addDoc(collection(db, 'serviceCategories'), { ...categoryData, order: newOrder, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        }
      } else if (modalState.type === 'service' && selectedCategoryId) {
        const serviceData = modalState.data as Partial<SubService>;
        if (serviceData.id) { // Editing
          const { id, ...dataToUpdate } = serviceData;
          await updateDoc(doc(db, 'subServices', id), { ...dataToUpdate, updatedAt: new Date().toISOString() });
        } else { // Adding
          const newOrder = servicesForSelectedCategory.length > 0 ? Math.max(...servicesForSelectedCategory.map(s => s.order)) + 1 : 1;
          await addDoc(collection(db, 'subServices'), { ...serviceData, categoryId: selectedCategoryId, order: newOrder, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        }
      }
      toast.success('Saved successfully!', { id: toastId });
      handleModalClose();
    } catch (err) {
      console.error('Failed to save:', err);
      toast.error('Failed to save.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm("WARNING: Deleting a category will also delete ALL services under it. This action cannot be undone. Are you sure?")) return;
    
    const toastId = toast.loading('Deleting category and its services...');
    try {
        const batch = writeBatch(db);
        
        const servicesQuery = query(collection(db, 'subServices'), where('categoryId', '==', categoryId));
        const servicesSnapshot = await getDocs(servicesQuery);
        servicesSnapshot.forEach(serviceDoc => {
            batch.delete(serviceDoc.ref);
        });

        const categoryRef = doc(db, 'serviceCategories', categoryId);
        batch.delete(categoryRef);

        await batch.commit();
        toast.success('Category deleted successfully!', { id: toastId });
        if (selectedCategoryId === categoryId) {
          setSelectedCategoryId(null);
        }
    } catch(err) {
        console.error("Error deleting category: ", err);
        toast.error("Failed to delete category.", { id: toastId });
    }
  };
  
  const handleDeleteService = async (serviceId: string) => {
     if (!window.confirm("Are you sure you want to delete this service?")) return;
     await deleteDoc(doc(db, 'subServices', serviceId));
     toast.success('Service deleted.');
  }
  
  const handleReorder = async (items: (ServiceCategory[] | SubService[]), index: number, direction: 'up' | 'down') => {
      const item = items[index];
      const otherItemIndex = direction === 'up' ? index - 1 : index + 1;
      if (otherItemIndex < 0 || otherItemIndex >= items.length) return;
      const otherItem = items[otherItemIndex];

      const batch = writeBatch(db);
      const collectionName = 'categoryId' in item ? 'subServices' : 'serviceCategories';
      
      const itemRef = doc(db, collectionName, item.id);
      const otherItemRef = doc(db, collectionName, otherItem.id);
      
      batch.update(itemRef, { order: otherItem.order });
      batch.update(otherItemRef, { order: item.order });
      
      await batch.commit();
      toast.success("Order updated.");
  }


  const isLoading = isLoadingCategories || isLoadingServices;
  const error = categoriesError || servicesError;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage <span className="text-primary-500">Services</span></h1>
            <button onClick={() => setModalState({ type: 'category', data: { name: '', description: '', isActive: true, order: 0 } })} className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center">
                <PlusCircle size={20} className="mr-2" /> New Category
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Categories */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 h-fit">
                <h2 className="text-xl font-bold mb-4">Service Categories</h2>
                <div className="space-y-2">
                    {categories.map((category, index) => (
                        <div key={category.id} onClick={() => setSelectedCategoryId(category.id)}
                            className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${selectedCategoryId === category.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                            <div className="flex justify-between items-center">
                                <div className="font-semibold text-gray-800 dark:text-white">{category.name}</div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <button onClick={(e) => { e.stopPropagation(); handleReorder(categories, index, 'up'); }} disabled={index === 0} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white"><ArrowUp size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleReorder(categories, index, 'down'); }} disabled={index === categories.length - 1} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white"><ArrowDown size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); setModalState({ type: 'category', data: category }); }} className="hover:text-blue-500"><Edit size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }} className="hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <div className={`flex items-center text-xs mt-1 ${category.isActive ? 'text-green-500' : 'text-gray-500'}`}>
                                {category.isActive ? <CheckCircle size={14} className="mr-1"/> : <XCircle size={14} className="mr-1"/>}
                                {category.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Services */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                {selectedCategory ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedCategory.name} Services</h2>
                            <button onClick={() => setModalState({ type: 'service', data: { name: '', description: '', link: '', isActive: true, order: 0, categoryId: selectedCategoryId || '' } })} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                                <PlusCircle size={20} className="mr-2" /> New Service
                            </button>
                        </div>
                        <div className="space-y-3">
                           {servicesForSelectedCategory.map((service, index) => (
                                <div key={service.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                     <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold">{service.name}</div>
                                             <div className={`flex items-center text-xs mt-1 ${service.isActive ? 'text-green-500' : 'text-gray-500'}`}>
                                                {service.isActive ? <CheckCircle size={14} className="mr-1"/> : <XCircle size={14} className="mr-1"/>}
                                                {service.isActive ? 'Active' : 'Inactive'}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-400">
                                            <button onClick={() => handleReorder(servicesForSelectedCategory, index, 'up')} disabled={index === 0} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white"><ArrowUp size={18} /></button>
                                            <button onClick={() => handleReorder(servicesForSelectedCategory, index, 'down')} disabled={index === servicesForSelectedCategory.length - 1} className="disabled:opacity-25 hover:text-gray-900 dark:hover:text-white"><ArrowDown size={18} /></button>
                                            <button onClick={() => setModalState({ type: 'service', data: service })} className="hover:text-blue-500"><Edit size={18} /></button>
                                            <button onClick={() => handleDeleteService(service.id)} className="hover:text-red-500"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                           ))}
                           {servicesForSelectedCategory.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No services in this category. Add one to get started!</p>
                           )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <Settings size={48} className="mb-4 text-gray-400"/>
                        <h3 className="text-xl font-semibold">Select a category</h3>
                        <p>Choose a category from the left to view and manage its services.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Modal for Add/Edit */}
        {modalState && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                    <form onSubmit={handleFormSubmit}>
                        <div className="p-6 border-b dark:border-gray-700">
                            <h3 className="text-lg font-bold">
                                {modalState.data?.id ? 'Edit' : 'Add'} {modalState.type === 'category' ? 'Category' : 'Service'}
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name *</label>
                                <input type="text" required value={modalState.data?.name || ''}
                                       onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, name: e.target.value } } : null)}
                                       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea value={modalState.data?.description || ''}
                                          onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, description: e.target.value } } : null)}
                                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700" rows={3}/>
                            </div>
                             {modalState.type === 'service' && (
                               <div>
                                    <label className="block text-sm font-medium mb-1">Link (URL Slug, e.g., /services/my-service)</label>
                                    <input type="text" value={(modalState.data as Partial<SubService>)?.link || ''}
                                           onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, link: e.target.value } } : null)}
                                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700" />
                                </div>
                            )}
                            <div className="flex items-center">
                                 <input type="checkbox" id="isActiveModal" checked={modalState.data?.isActive || false}
                                        onChange={(e) => setModalState(s => s ? { ...s, data: { ...s.data, isActive: e.target.checked } } : null)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                 <label htmlFor="isActiveModal" className="ml-2">Active</label>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
                            <button type="button" onClick={handleModalClose} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg disabled:opacity-50">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50">
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
}