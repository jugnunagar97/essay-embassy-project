import { useState } from 'react';
import { ServiceCategory, SubService } from '../types';

// Mock data for demonstration
const mockServiceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Essay Writing Services',
    description: 'Professional essay writing for all academic levels',
    icon: 'PenTool',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Assignment Help',
    description: 'Comprehensive assignment assistance',
    icon: 'FileText',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Programming Help',
    description: 'Expert programming and coding assistance',
    icon: 'Code',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Dissertation Services',
    description: 'Professional dissertation and thesis writing',
    icon: 'BookOpen',
    order: 4,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Proofreading & Editing',
    description: 'Professional editing and proofreading services',
    icon: 'Edit',
    order: 5,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const mockSubServices: SubService[] = [
  // Essay Writing Services
  {
    id: '1',
    categoryId: '1',
    name: 'Admission Essay Writing',
    description: 'Professional admission essays for college applications',
    link: '/services/admission-essay-writing',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Scholarship Essay Writing',
    description: 'Compelling scholarship essays to secure funding',
    link: '/services/scholarship-essay-writing',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    categoryId: '1',
    name: 'Personal Statement Writing',
    description: 'Professional personal statements for applications',
    link: '/services/personal-statement-writing',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  // Assignment Help
  {
    id: '4',
    categoryId: '2',
    name: 'Law Assignment Help',
    description: 'Expert assistance with law assignments and cases',
    link: '/services/law-assignment-help',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    categoryId: '2',
    name: 'Nursing Assignment Help',
    description: 'Professional nursing assignment assistance',
    link: '/services/nursing-assignment-help',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    categoryId: '2',
    name: 'Business Assignment Help',
    description: 'Comprehensive business assignment support',
    link: '/services/business-assignment-help',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  // Programming Help
  {
    id: '7',
    categoryId: '3',
    name: 'Java Assignment Help',
    description: 'Expert Java programming assistance',
    link: '/services/java-assignment-help',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    categoryId: '3',
    name: 'Python Help',
    description: 'Professional Python programming support',
    link: '/services/python-help',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    categoryId: '3',
    name: 'C++ Programming Help',
    description: 'Expert C++ programming assistance',
    link: '/services/cpp-programming-help',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  // Dissertation Services
  {
    id: '10',
    categoryId: '4',
    name: 'Dissertation Chapter Help',
    description: 'Individual chapter writing and assistance',
    link: '/services/dissertation-chapter-help',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '11',
    categoryId: '4',
    name: 'Research Proposal Writing',
    description: 'Professional research proposal development',
    link: '/services/research-proposal-writing',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    categoryId: '4',
    name: 'Thesis Writing',
    description: 'Complete thesis writing services',
    link: '/services/thesis-writing',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  // Proofreading & Editing
  {
    id: '13',
    categoryId: '5',
    name: 'Dissertation Editing',
    description: 'Professional dissertation editing and proofreading',
    link: '/services/dissertation-editing',
    order: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '14',
    categoryId: '5',
    name: 'Essay Proofreading',
    description: 'Expert essay proofreading and editing',
    link: '/services/essay-proofreading',
    order: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '15',
    categoryId: '5',
    name: 'Academic Paper Editing',
    description: 'Professional academic paper editing services',
    link: '/services/academic-paper-editing',
    order: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export function useServices() {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(mockServiceCategories);
  const [subServices, setSubServices] = useState<SubService[]>(mockSubServices);
  const [isLoading, setIsLoading] = useState(false);

  const getActiveCategories = () => {
    return serviceCategories
      .filter(category => category.isActive)
      .sort((a, b) => a.order - b.order);
  };

  const getSubServicesByCategory = (categoryId: string) => {
    return subServices
      .filter(subService => subService.categoryId === categoryId && subService.isActive)
      .sort((a, b) => a.order - b.order);
  };

  const addServiceCategory = (categoryData: Omit<ServiceCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCategory: ServiceCategory = {
      ...categoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setServiceCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateServiceCategory = (id: string, updates: Partial<ServiceCategory>) => {
    setServiceCategories(prev => prev.map(category => 
      category.id === id 
        ? { ...category, ...updates, updatedAt: new Date().toISOString() }
        : category
    ));
  };

  const deleteServiceCategory = (id: string) => {
    setServiceCategories(prev => prev.filter(category => category.id !== id));
    // Also delete related sub-services
    setSubServices(prev => prev.filter(subService => subService.categoryId !== id));
  };

  const addSubService = (subServiceData: Omit<SubService, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSubService: SubService = {
      ...subServiceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSubServices(prev => [...prev, newSubService]);
    return newSubService;
  };

  const updateSubService = (id: string, updates: Partial<SubService>) => {
    setSubServices(prev => prev.map(subService => 
      subService.id === id 
        ? { ...subService, ...updates, updatedAt: new Date().toISOString() }
        : subService
    ));
  };

  const deleteSubService = (id: string) => {
    setSubServices(prev => prev.filter(subService => subService.id !== id));
  };

  return {
    serviceCategories,
    subServices,
    isLoading,
    getActiveCategories,
    getSubServicesByCategory,
    addServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    addSubService,
    updateSubService,
    deleteSubService
  };
}