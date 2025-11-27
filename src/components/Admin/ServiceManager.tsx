// src/components/Admin/ServiceManager.tsx

import React, { useState, useMemo } from 'react';
import { useServiceCategories, useSubServices } from '../../hooks/useData';
import {
  collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, query, where, getDocs, serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import {
  PlusCircle,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  Settings,
  CheckCircle,
  XCircle,
  Plus,
  Save,
  GripVertical,
  LayoutTemplate,
  Users,
  Sparkles,
  DollarSign,
  HelpCircle,
  BarChart2,
  MessageSquare,
  ListOrdered,
  Type,
  Copy,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ServiceCategory, SubService, ContentBlockType, ContentBlock } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';
import ReactQuillWrapper from '../Common/ReactQuillWrapper';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const db = getFirestore();
const storage = getStorage();

const BLOCK_CONFIG: Record<ContentBlockType, { label: string; description: string; icon: React.ComponentType<any> }> = {
  HERO: { label: 'Hero', description: 'Intro headline with CTA + order form', icon: LayoutTemplate },
  WRITERS_CAROUSEL: { label: 'Writers Carousel', description: 'Renders the expert carousel section', icon: Users },
  WRITERS: { label: 'Writers (legacy)', description: 'Legacy writers block', icon: Users },
  WHY_CHOOSE_US: { label: 'Why Choose Us', description: 'Feature grid explaining benefits', icon: Sparkles },
  FEATURES_GRID: { label: 'Features Grid', description: 'Glassmorphism benefit cards', icon: Sparkles },
  PRICING_TABLE: { label: 'Pricing Table', description: 'Pricing highlights and inclusions', icon: DollarSign },
  PRICING: { label: 'Pricing Table (legacy)', description: 'Legacy pricing block', icon: DollarSign },
  FAQ: { label: 'FAQ', description: 'Frequently asked questions accordion', icon: HelpCircle },
  STATS_ROW: { label: 'Stats Row', description: 'Milestones and trust signals', icon: BarChart2 },
  STATS: { label: 'Stats Row (legacy)', description: 'Legacy stats block', icon: BarChart2 },
  TESTIMONIALS: { label: 'Testimonials', description: 'Client stories and ratings', icon: MessageSquare },
  STEPS: { label: 'Steps', description: 'Explain the delivery process', icon: ListOrdered },
  SAMPLES: { label: 'Samples Grid', description: 'Displays sample work cards', icon: LayoutTemplate },
  TEXT: { label: 'Text', description: 'Simple rich text/body content', icon: Type },
};

const BLOCK_ORDER: ContentBlockType[] = [
  'HERO',
  'WRITERS_CAROUSEL',
  'FEATURES_GRID',
  'PRICING_TABLE',
  'FAQ',
  'STATS_ROW',
  'TESTIMONIALS',
  'STEPS',
  'SAMPLES',
  'TEXT',
];

const ICON_BUTTON_CLASS =
  'h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white transition disabled:opacity-30';

const makeWritersBlock = () => ({
  title: 'Meet Your Admissions Essay Experts',
  description: 'Work with experienced, degree-holding writers who understand top university requirements.',
  subtitle: 'Cooperate with graduates from leading universities',
  logosImage: '/images/univ-logos.svg',
});

const makeFeaturesBlock = () => ({
  title: 'Why Choose Our Service',
  items: [
    { title: 'Experienced Writers', description: 'Real admissions expertise for each essay.' },
    { title: 'Personal Approach', description: 'Tailored statements for every school.' },
    { title: 'Guaranteed Originality', description: 'Plagiarism-free and AI-safe content.' },
  ],
});

const makePricingBlock = () => ({
  title: 'Prices and services',
  subtitle: 'Prices start at $13.99/page and depend on the page count, deadline, and expert level.',
  priceLabel: '$13.99/page',
  included: ['Topic suggestion', 'Formatting', 'Unlimited revisions'],
  addOns: ['Grade A guarantee', 'VIP support'],
});

const makeStatsBlock = () => ({
  items: [
    { value: '7+', label: 'Years in business' },
    { value: '500+', label: 'Professional writers' },
    { value: '10,262+', label: 'Successful orders completed' },
    { value: '4.8', label: 'Average rating' },
  ],
});

const defaultBlockData: Record<ContentBlockType, () => any> = {
  HERO: () => ({
    badgeText: 'PLAGIARISM & AI FREE',
    title: '',
    subtitle: '',
    backgroundImage: '',
    showOrderForm: true,
  }),
  WRITERS_CAROUSEL: makeWritersBlock,
  WRITERS: makeWritersBlock,
  WHY_CHOOSE_US: makeFeaturesBlock,
  FEATURES_GRID: makeFeaturesBlock,
  PRICING_TABLE: makePricingBlock,
  PRICING: makePricingBlock,
  FAQ: () => ({
    title: 'Frequently Asked Questions',
    items: [{ question: '', answer: '' }],
  }),
  STATS_ROW: makeStatsBlock,
  STATS: makeStatsBlock,
  TESTIMONIALS: () => ({
    title: 'Hear What Our Clients Say',
    items: [
      { quote: 'They kept my voice but made the story flow.', name: 'EE-77120', meta: 'College', rating: 5 },
    ],
  }),
  STEPS: () => ({
    title: 'Your Path To A Compelling Essay',
    steps: [
      { title: 'Share your prompt and goals', description: 'Upload requirements, schools, and word counts.' },
      { title: 'Collaborate with your expert', description: 'Review drafts, request adjustments, and approve direction.' },
      { title: 'Receive your admission-ready essay', description: 'Polished, original, and on time.' },
    ],
  }),
  SAMPLES: () => ({
    title: 'See Real Admission Essay Examples',
    description: 'Browse samples that secured admissions to top programs.',
    samples: [
      { title: 'School Effectiveness', pages: 6, level: 'College', type: 'Essay', citation: 'APA' },
      { title: 'LinkedIn Analysis', pages: 6, level: 'Bachelor', type: 'Review', citation: 'MLA' },
      { title: 'Climate Change Policy', pages: 8, level: 'PhD', type: 'Research Paper', citation: 'Harvard' },
      { title: 'Modern Art Movements', pages: 5, level: 'High School', type: 'Report', citation: 'Chicago' },
    ],
  }),
  TEXT: () => ({
    title: '',
    body: '',
  }),
};

const generateBlockId = () => Math.random().toString(36).slice(2, 11);

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

const cloneBlockData = (data: any) =>
  data === null || data === undefined ? data : JSON.parse(JSON.stringify(data));

type ModalState =
  | { type: 'category'; data: Partial<ServiceCategory> }
  | {
      type: 'service';
      data: Partial<SubService> & {
        seoTitle?: string;
        seoDescription?: string;
        featuredImage?: string;
        featuredImageFile?: File | null;
        contentBlocks?: ContentBlock[];
      };
    }
  | null;

export default function ServiceManager() {
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useServiceCategories();
  const { services, isLoading: isLoadingServices, error: servicesError } = useSubServices();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<ContentBlockType>('HERO');

  const currentBlocks = modalState?.type === 'service' ? modalState.data?.contentBlocks || [] : [];

  const updateContentBlocks = (updater: (prev: ContentBlock[]) => ContentBlock[]) => {
    setModalState((state) => {
      if (!state || state.type !== 'service') return state;
      const prevBlocks = state.data?.contentBlocks || [];
      return {
        ...state,
        data: {
          ...state.data,
          contentBlocks: updater(prevBlocks),
        },
      };
    });
  };

  const handleAddBlock = (type: ContentBlockType) => {
    const generator = defaultBlockData[type];
    const newBlock: ContentBlock = {
      id: generateBlockId(),
      type,
      data: generator ? generator() : {},
    };
    updateContentBlocks((prev) => [...prev, newBlock]);
  };

  const handleBlockFieldChange = (blockId: string, updater: (prev: any) => any) => {
    updateContentBlocks((blocks) =>
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              data: updater(block.data || {}),
            }
          : block,
      ),
    );
  };

  const handleBlockReorder = (index: number, direction: 'up' | 'down') => {
    updateContentBlocks((blocks) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= blocks.length) return blocks;
      const updated = [...blocks];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    updateContentBlocks((blocks) => blocks.filter((block) => block.id !== blockId));
  };

  const handleStringListChange = (blockId: string, key: string, index: number, value: string) => {
    handleBlockFieldChange(blockId, (prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list[index] = value;
      return { ...prev, [key]: list };
    });
  };

  const handleStringListAdd = (blockId: string, key: string) => {
    handleBlockFieldChange(blockId, (prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list.push('');
      return { ...prev, [key]: list };
    });
  };

  const handleStringListRemove = (blockId: string, key: string, index: number) => {
    handleBlockFieldChange(blockId, (prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list.splice(index, 1);
      return { ...prev, [key]: list };
    });
  };

  const handleObjectListChange = (blockId: string, key: string, index: number, field: string, value: any) => {
    handleBlockFieldChange(blockId, (prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      const current = list[index] || {};
      list[index] = { ...current, [field]: value };
      return { ...prev, [key]: list };
    });
  };

  const handleObjectListAdd = (blockId: string, key: string, template: Record<string, any>) => {
    handleBlockFieldChange(blockId, (prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list.push(template);
      return { ...prev, [key]: list };
    });
  };

  const handleObjectListRemove = (blockId: string, key: string, index: number) => {
    handleBlockFieldChange(blockId, (prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list.splice(index, 1);
      return { ...prev, [key]: list };
    });
  };

  const renderStaticBlockInfo = (message: string) => (
    <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 text-sm text-gray-600 dark:text-gray-300">
      {message}
    </div>
  );

  const renderBlockFields = (block: ContentBlock) => {
    const data = block.data || {};
    const normalizedType: ContentBlockType =
      block.type === 'WRITERS' ? 'WRITERS_CAROUSEL'
        : block.type === 'WHY_CHOOSE_US' ? 'FEATURES_GRID'
        : block.type === 'PRICING' ? 'PRICING_TABLE'
        : block.type === 'STATS' ? 'STATS_ROW'
        : block.type;
    switch (normalizedType) {
      case 'HERO':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="form-label">Badge Text</label>
              <input
                type="text"
                className="form-input"
                value={data.badgeText || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, badgeText: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Headline</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Subheadline</label>
              <textarea
                className="form-input"
                rows={3}
                value={data.subtitle || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, subtitle: e.target.value }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Background Image URL</label>
              <input
                type="text"
                className="form-input"
                value={data.backgroundImage || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, backgroundImage: e.target.value }))
                }
              />
            </div>
            <label className="flex items-center space-x-3 md:col-span-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                checked={data.showOrderForm ?? true}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, showOrderForm: e.target.checked }))
                }
              />
              <span className="text-sm text-gray-700 dark:text-gray-200">Show order form in hero</span>
            </label>
          </div>
        );
      case 'WRITERS_CAROUSEL':
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                rows={3}
                value={data.description || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Subtitle / Supporting Text</label>
              <input
                type="text"
                className="form-input"
                value={data.subtitle || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, subtitle: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Logos Image URL</label>
              <input
                type="text"
                className="form-input"
                value={data.logosImage || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, logosImage: e.target.value }))
                }
              />
            </div>
          </div>
        );
      case 'FEATURES_GRID': {
        const items = Array.isArray(data.items) ? data.items : [];
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-3">
              {items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-700 dark:text-gray-200">Benefit #{itemIndex + 1}</p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 text-sm"
                      onClick={() => handleObjectListRemove(block.id, 'items', itemIndex)}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    className="form-input"
                    placeholder="Title"
                    value={item?.title || ''}
                    onChange={(e) => handleObjectListChange(block.id, 'items', itemIndex, 'title', e.target.value)}
                  />
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="Description"
                    value={item?.description || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'items', itemIndex, 'description', e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full justify-center"
                onClick={() => handleObjectListAdd(block.id, 'items', { title: '', description: '' })}
              >
                <Plus size={16} className="mr-2" /> Add Benefit
              </button>
            </div>
          </div>
        );
      }
      case 'PRICING_TABLE': {
        const included = Array.isArray(data.included) ? data.included : [];
        const addOns = Array.isArray(data.addOns) ? data.addOns : [];
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) => handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="form-label">Subtitle</label>
              <textarea
                className="form-input"
                rows={2}
                value={data.subtitle || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, subtitle: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Highlight Price Label</label>
              <input
                type="text"
                className="form-input"
                value={data.priceLabel || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, priceLabel: e.target.value }))
                }
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Included Services</p>
                <div className="space-y-2">
                  {included.map((item: string, itemIdx: number) => (
                    <div key={itemIdx} className="flex gap-2">
                      <input
                        className="form-input flex-1"
                        value={item || ''}
                        onChange={(e) => handleStringListChange(block.id, 'included', itemIdx, e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-sm text-red-500 hover:text-red-600"
                        onClick={() => handleStringListRemove(block.id, 'included', itemIdx)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-secondary w-full justify-center"
                    onClick={() => handleStringListAdd(block.id, 'included')}
                  >
                    <Plus size={16} className="mr-2" /> Add Included Item
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Add-ons</p>
                <div className="space-y-2">
                  {addOns.map((item: string, itemIdx: number) => (
                    <div key={itemIdx} className="flex gap-2">
                      <input
                        className="form-input flex-1"
                        value={item || ''}
                        onChange={(e) => handleStringListChange(block.id, 'addOns', itemIdx, e.target.value)}
                      />
                      <button
                        type="button"
                        className="text-sm text-red-500 hover:text-red-600"
                        onClick={() => handleStringListRemove(block.id, 'addOns', itemIdx)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-secondary w-full justify-center"
                    onClick={() => handleStringListAdd(block.id, 'addOns')}
                  >
                    <Plus size={16} className="mr-2" /> Add Add-on
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'FAQ': {
        const faqItems = Array.isArray(data.items) ? data.items : [];
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) => handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              {faqItems.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-700 dark:text-gray-200">FAQ #{itemIndex + 1}</p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 text-sm"
                      onClick={() => handleObjectListRemove(block.id, 'items', itemIndex)}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    className="form-input"
                    placeholder="Question"
                    value={item?.question || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'items', itemIndex, 'question', e.target.value)
                    }
                  />
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="Answer"
                    value={item?.answer || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'items', itemIndex, 'answer', e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full justify-center"
                onClick={() => handleObjectListAdd(block.id, 'items', { question: '', answer: '' })}
              >
                <Plus size={16} className="mr-2" /> Add FAQ
              </button>
            </div>
          </div>
        );
      }
      case 'STATS_ROW': {
        const statItems = Array.isArray(data.items) ? data.items : [];
        return (
          <div className="space-y-3">
            {statItems.map((item: any, itemIndex: number) => (
              <div key={itemIndex} className="grid gap-2 md:grid-cols-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div>
                  <label className="form-label text-sm">Value</label>
                  <input
                    className="form-input"
                    value={item?.value || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'items', itemIndex, 'value', e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="form-label text-sm">Label</label>
                  <input
                    className="form-input"
                    value={item?.label || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'items', itemIndex, 'label', e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600 text-sm"
                    onClick={() => handleObjectListRemove(block.id, 'items', itemIndex)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary w-full justify-center"
              onClick={() => handleObjectListAdd(block.id, 'items', { value: '', label: '' })}
            >
              <Plus size={16} className="mr-2" /> Add Stat
            </button>
          </div>
        );
      }
      case 'TESTIMONIALS': {
        const testimonialItems = Array.isArray(data.items) ? data.items : [];
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) => handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              {testimonialItems.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-700 dark:text-gray-200">Testimonial #{itemIndex + 1}</p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 text-sm"
                      onClick={() => handleObjectListRemove(block.id, 'items', itemIndex)}
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Quote"
                    value={item?.quote || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'items', itemIndex, 'quote', e.target.value)
                    }
                  />
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      className="form-input"
                      placeholder="Name"
                      value={item?.name || ''}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'items', itemIndex, 'name', e.target.value)
                      }
                    />
                    <input
                      className="form-input"
                      placeholder="Meta (e.g., College, Level)"
                      value={item?.meta || ''}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'items', itemIndex, 'meta', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="form-label">Rating (1-5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className="form-input"
                      value={item?.rating ?? 5}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'items', itemIndex, 'rating', Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full justify-center"
                onClick={() =>
                  handleObjectListAdd(block.id, 'items', { quote: '', name: '', meta: '', rating: 5 })
                }
              >
                <Plus size={16} className="mr-2" /> Add Testimonial
              </button>
            </div>
          </div>
        );
      }
      case 'STEPS': {
        const steps = Array.isArray(data.steps) ? data.steps : [];
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) => handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              {steps.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-700 dark:text-gray-200">Step #{itemIndex + 1}</p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 text-sm"
                      onClick={() => handleObjectListRemove(block.id, 'steps', itemIndex)}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    className="form-input"
                    placeholder="Step title"
                    value={item?.title || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'steps', itemIndex, 'title', e.target.value)
                    }
                  />
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="Description"
                    value={item?.description || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'steps', itemIndex, 'description', e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full justify-center"
                onClick={() => handleObjectListAdd(block.id, 'steps', { title: '', description: '' })}
              >
                <Plus size={16} className="mr-2" /> Add Step
              </button>
            </div>
          </div>
        );
      }
      case 'SAMPLES': {
        const samples = Array.isArray(data.samples) ? data.samples : [];
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                rows={2}
                value={data.description || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <div className="space-y-3">
              {samples.map((sample: any, idx: number) => (
                <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm text-gray-700 dark:text-gray-200">Sample #{idx + 1}</p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-600 text-sm"
                      onClick={() => handleObjectListRemove(block.id, 'samples', idx)}
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    className="form-input"
                    placeholder="Title"
                    value={sample?.title || ''}
                    onChange={(e) =>
                      handleObjectListChange(block.id, 'samples', idx, 'title', e.target.value)
                    }
                  />
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      className="form-input"
                      placeholder="Pages"
                      type="number"
                      min={1}
                      value={sample?.pages || ''}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'samples', idx, 'pages', Number(e.target.value))
                      }
                    />
                    <input
                      className="form-input"
                      placeholder="Academic Level"
                      value={sample?.level || ''}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'samples', idx, 'level', e.target.value)
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      className="form-input"
                      placeholder="Document Type"
                      value={sample?.type || ''}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'samples', idx, 'type', e.target.value)
                      }
                    />
                    <input
                      className="form-input"
                      placeholder="Citation Style"
                      value={sample?.citation || ''}
                      onChange={(e) =>
                        handleObjectListChange(block.id, 'samples', idx, 'citation', e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary w-full justify-center"
                onClick={() =>
                  handleObjectListAdd(block.id, 'samples', {
                    title: '',
                    pages: 1,
                    level: '',
                    type: '',
                    citation: '',
                  })
                }
              >
                <Plus size={16} className="mr-2" /> Add Sample
              </button>
            </div>
          </div>
        );
      }
      case 'TEXT':
        return (
          <div className="space-y-4">
            <div>
              <label className="form-label">Section Title</label>
              <input
                type="text"
                className="form-input"
                value={data.title || ''}
                onChange={(e) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Rich Text</label>
              <ReactQuillWrapper
                value={data.body || ''}
                onChange={(value) =>
                  handleBlockFieldChange(block.id, (prev) => ({ ...prev, body: value }))
                }
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg"
              />
            </div>
          </div>
        );
      default:
        return renderStaticBlockInfo('This block renders a predefined component.');
    }
  };

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
          link: finalSlug,
          isActive: serviceData.isActive || false,
          categoryId: selectedCategoryId,
          seoTitle: serviceData.seoTitle || '',
          seoDescription: serviceData.seoDescription || '',
          featuredImage: imageUrl,
          contentBlocks: (serviceData.contentBlocks || []).map((block) => ({ ...block })),
        };

        if (typeof serviceData.content === 'string') {
          dataToSave.content = serviceData.content;
        }

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

  const handleDuplicateService = async (service: SubService) => {
    const toastId = toast.loading('Duplicating service...');
    try {
      const baseName = service.name || 'Service';
      const baseSlug = service.link || slugify(baseName);
      const existingSlugs = new Set(services.map((s) => s.link));
      let candidate = `${baseSlug}-copy`;
      let counter = 1;
      while (existingSlugs.has(candidate)) {
        candidate = `${baseSlug}-copy-${counter++}`;
      }

      const categoryServices = services.filter((s) => s.categoryId === service.categoryId);
      const newOrder =
        categoryServices.length > 0 ? Math.max(...categoryServices.map((s) => s.order || 0)) + 1 : 1;

      const duplicatedBlocks = (service.contentBlocks || []).map((block) => ({
        ...block,
        id: generateBlockId(),
        data: cloneBlockData(block.data),
      }));

      const {
        id,
        featuredImageFile,
        createdAt,
        updatedAt,
        ...rest
      } = service as SubService & { featuredImageFile?: File | null };

      await addDoc(collection(db, 'subServices'), {
        ...rest,
        name: `${baseName} (Copy)`,
        link: candidate,
        order: newOrder,
        contentBlocks: duplicatedBlocks,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success('Service duplicated!', { id: toastId });
    } catch (error: any) {
      console.error('Duplicate service error:', error);
      toast.error(`Failed to duplicate: ${error.message}`, { id: toastId });
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
                      name: '',
                      description: '',
                      link: '',
                      isActive: true,
                      order: 0,
                      categoryId: selectedCategoryId || '',
                      content: '',
                      seoTitle: '',
                      seoDescription: '',
                      contentBlocks: [],
                      featuredImage: '',
                      featuredImageFile: null
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
                          <button onClick={(e) => { e.stopPropagation(); handleDuplicateService(service); }} className="hover:text-emerald-500 icon-hover" title="Duplicate Service"><Copy size={18} /></button>
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

                    <div className="mt-8">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-t pt-4 border-gray-200 dark:border-gray-700">Page Sections</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Build the service page using reusable blocks that mirror the live design.
                      </p>
                      <div className="mt-4 space-y-4">
                        {currentBlocks.length === 0 ? (
                          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-gray-500 dark:text-gray-400">
                            No blocks added yet. Use the selector below to add your first section.
                          </div>
                        ) : (
                          currentBlocks.map((block, blockIndex) => {
                            const BlockIcon = BLOCK_CONFIG[block.type]?.icon || LayoutTemplate;
                            return (
                              <div key={block.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <GripVertical className="text-gray-400" size={16} />
                                    <BlockIcon size={20} className="text-primary-500" />
                                    <div>
                                      <p className="font-semibold text-gray-900 dark:text-white">
                                        {BLOCK_CONFIG[block.type]?.label || block.type}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {BLOCK_CONFIG[block.type]?.description || ''}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      className={ICON_BUTTON_CLASS}
                                      disabled={blockIndex === 0}
                                      onClick={() => handleBlockReorder(blockIndex, 'up')}
                                      title="Move up"
                                    >
                                      <ArrowUp size={16} />
                                    </button>
                                    <button
                                      type="button"
                                      className={ICON_BUTTON_CLASS}
                                      disabled={blockIndex === currentBlocks.length - 1}
                                      onClick={() => handleBlockReorder(blockIndex, 'down')}
                                      title="Move down"
                                    >
                                      <ArrowDown size={16} />
                                    </button>
                                    <button
                                      type="button"
                                      className={`${ICON_BUTTON_CLASS} border-red-200 text-red-500 hover:text-red-600 dark:border-red-400/40`}
                                      onClick={() => handleRemoveBlock(block.id)}
                                      title="Remove block"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-4 space-y-4">
                                  {renderBlockFields(block)}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <select
                          value={selectedBlockType}
                          onChange={(e) => setSelectedBlockType(e.target.value as ContentBlockType)}
                          className="form-input w-full md:w-64"
                        >
                          {BLOCK_ORDER.map((type) => (
                            <option key={type} value={type}>
                              {BLOCK_CONFIG[type].label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn-secondary flex items-center"
                          onClick={() => handleAddBlock(selectedBlockType)}
                        >
                          <Plus size={16} className="mr-2" /> Add Section
                        </button>
                      </div>
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