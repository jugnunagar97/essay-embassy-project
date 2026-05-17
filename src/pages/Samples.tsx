import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  FileText,
  Star,
  ArrowRight,
  X,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Sample {
  id: string;
  title: string;
  category: string;
  subject: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  tags: string[];
  createdAt: string;
  pages: number;
  level: string;
}

// Mock data for samples with actual downloadable content
const mockSamples: Sample[] = [
  {
    id: '1',
    title: 'Impact of Social Media on Youth Mental Health',
    category: 'Research Paper',
    subject: 'Psychology',
    description: 'A comprehensive analysis of how social media platforms affect the psychological well-being of teenagers and young adults.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKEltcGFjdCBvZiBTb2NpYWwgTWVkaWEgb24gWW91dGggTWVudGFsIEhlYWx0aCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyNDUgMDAwMDAgbiAKMDAwMDAwMDMxNCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQwOAolJUVPRg==',
    fileName: 'social-media-mental-health.pdf',
    fileSize: 1024000,
    tags: ['APA Format', '15 Pages', 'Undergraduate', 'Research'],
    createdAt: '2024-01-15',
    pages: 15,
    level: 'Undergraduate'
  },
  {
    id: '2',
    title: 'Strategic Marketing Analysis for Tesla Inc.',
    category: 'Case Study',
    subject: 'Business Studies',
    description: 'In-depth case study examining Tesla\'s marketing strategies and their impact on brand positioning in the electric vehicle market.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDAKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKFN0cmF0ZWdpYyBNYXJrZXRpbmcgQW5hbHlzaXMgZm9yIFRlc2xhIEluYy4pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMTQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MDQKJSVFT0Y=',
    fileName: 'tesla-marketing-analysis.pdf',
    fileSize: 1536000,
    tags: ['Harvard Format', '12 Pages', 'Masters', 'Analysis'],
    createdAt: '2024-01-12',
    pages: 12,
    level: 'Masters'
  },
  {
    id: '3',
    title: 'Machine Learning Applications in Healthcare',
    category: 'Dissertation Chapter',
    subject: 'Computer Science',
    description: 'Literature review chapter exploring current and emerging applications of machine learning technologies in medical diagnosis and treatment.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDcKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKE1hY2hpbmUgTGVhcm5pbmcgQXBwbGljYXRpb25zIGluIEhlYWx0aGNhcmUpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMTQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MTEKJSVFT0Y=',
    fileName: 'ml-healthcare-applications.pdf',
    fileSize: 2048000,
    tags: ['IEEE Format', '25 Pages', 'PhD', 'Literature Review'],
    createdAt: '2024-01-10',
    pages: 25,
    level: 'PhD'
  },
  {
    id: '4',
    title: 'Nursing Care Plans for Diabetic Patients',
    category: 'Assignment',
    subject: 'Nursing',
    description: 'Comprehensive nursing care plans with evidence-based interventions for managing Type 2 diabetes in adult patients.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDMKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKE51cnNpbmcgQ2FyZSBQbGFucyBmb3IgRGlhYmV0aWMgUGF0aWVudHMpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwNTggMDAwMDAgbiAKMDAwMDAwMDExNSAwMDAwMCBuIAowMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAzMTQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA2Ci9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0MDYKJSVFT0Y=',
    fileName: 'nursing-care-plans-diabetes.pdf',
    fileSize: 768000,
    tags: ['APA Format', '8 Pages', 'College', 'Care Plans'],
    createdAt: '2024-01-08',
    pages: 8,
    level: 'College'
  },
  {
    id: '5',
    title: 'Constitutional Law: First Amendment Analysis',
    category: 'Essay',
    subject: 'Law',
    description: 'Critical analysis of First Amendment protections and their application in contemporary free speech cases.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDkKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKENvbnN0aXR1dGlvbmFsIExhdzogRmlyc3QgQW1lbmRtZW50IEFuYWx5c2lzKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDI0NSAwMDAwMCBuIAowMDAwMDAwMzE0IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDEzCiUlRU9G',
    fileName: 'constitutional-law-first-amendment.pdf',
    fileSize: 1280000,
    tags: ['Bluebook Format', '10 Pages', 'Masters', 'Legal Analysis'],
    createdAt: '2024-01-05',
    pages: 10,
    level: 'Masters'
  },
  {
    id: '6',
    title: 'Climate Change and Environmental Policy',
    category: 'Term Paper',
    subject: 'Environmental Science',
    description: 'Examination of current environmental policies and their effectiveness in addressing climate change challenges.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDcKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKENsaW1hdGUgQ2hhbmdlIGFuZCBFbnZpcm9ubWVudGFsIFBvbGljeSkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAwMzE0IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDExCiUlRU9G',
    fileName: 'climate-change-environmental-policy.pdf',
    fileSize: 1792000,
    tags: ['MLA Format', '18 Pages', 'Undergraduate', 'Policy Analysis'],
    createdAt: '2024-01-03',
    pages: 18,
    level: 'Undergraduate'
  },
  {
    id: '7',
    title: 'Financial Risk Management in Banking',
    category: 'Report',
    subject: 'Finance',
    description: 'Comprehensive report on risk management strategies employed by commercial banks in volatile market conditions.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKEZpbmFuY2lhbCBSaXNrIE1hbmFnZW1lbnQgaW4gQmFua2luZykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAwMzE0IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDA4CiUlRU9G',
    fileName: 'financial-risk-management-banking.pdf',
    fileSize: 2304000,
    tags: ['Chicago Format', '20 Pages', 'Masters', 'Financial Analysis'],
    createdAt: '2024-01-01',
    pages: 20,
    level: 'Masters'
  },
  {
    id: '8',
    title: 'Shakespearean Tragedy: Hamlet Character Analysis',
    category: 'Essay',
    subject: 'Literature',
    description: 'In-depth character analysis exploring the psychological complexity of Hamlet and his role in the tragic narrative.',
    fileUrl: 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNTMKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgo3MiA3MjAgVGQKKFNoYWtlc3BlYXJlYW4gVHJhZ2VkeTogSGFtbGV0IENoYXJhY3RlciBBbmFseXNpcykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAwMjQ1IDAwMDAwIG4gCjAwMDAwMDAwMzE0IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDE3CiUlRU9G',
    fileName: 'hamlet-character-analysis.pdf',
    fileSize: 512000,
    tags: ['MLA Format', '6 Pages', 'College', 'Character Analysis'],
    createdAt: '2023-12-28',
    pages: 6,
    level: 'College'
  }
];

const categories = ['All Categories', 'Essay', 'Research Paper', 'Case Study', 'Dissertation Chapter', 'Assignment', 'Term Paper', 'Report'];
const subjects = ['All Subjects', 'Psychology', 'Business Studies', 'Computer Science', 'Nursing', 'Law', 'Environmental Science', 'Finance', 'Literature'];
const levels = ['All Levels', 'College', 'Undergraduate', 'Masters', 'PhD'];

export default function Samples() {
  const [samples, setSamples] = useState<Sample[]>(mockSamples);
  const [filteredSamples, setFilteredSamples] = useState<Sample[]>(mockSamples);
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [showFilters, setShowFilters] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    let filtered = samples;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(sample =>
        sample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sample.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(sample => sample.category === selectedCategory);
    }

    // Filter by subject
    if (selectedSubject !== 'All Subjects') {
      filtered = filtered.filter(sample => sample.subject === selectedSubject);
    }

    // Filter by level
    if (selectedLevel !== 'All Levels') {
      filtered = filtered.filter(sample => sample.level === selectedLevel);
    }

    setFilteredSamples(filtered);
  }, [searchTerm, selectedCategory, selectedSubject, selectedLevel, samples]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Essay': return <FileText size={20} className="text-blue-500" />;
      case 'Research Paper': return <BookOpen size={20} className="text-green-500" />;
      case 'Case Study': return <GraduationCap size={20} className="text-purple-500" />;
      case 'Dissertation Chapter': return <BookOpen size={20} className="text-red-500" />;
      case 'Assignment': return <FileText size={20} className="text-orange-500" />;
      case 'Term Paper': return <FileText size={20} className="text-indigo-500" />;
      case 'Report': return <FileText size={20} className="text-teal-500" />;
      default: return <FileText size={20} className="text-gray-500" />;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedSubject('All Subjects');
    setSelectedLevel('All Levels');
  };

  const handleDownload = async (sample: Sample) => {
    setDownloadingId(sample.id);
    
    try {
      // Simulate download progress
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create download link
      const link = document.createElement('a');
      link.href = sample.fileUrl;
      link.download = sample.fileName;
      link.style.display = 'none';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloaded ${sample.fileName} successfully!`);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.');
      
      // Fallback: open in new tab
      try {
        window.open(sample.fileUrl, '_blank');
        toast.success('File opened in new tab as fallback');
      } catch (fallbackError) {
        toast.error('Unable to download or open file. Please contact support.');
      }
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-royal-blue via-primary to-deep-navy py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.12),transparent)]" aria-hidden />
        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-tight">
              Explore Our Work Quality
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Browse a wide range of academic samples crafted by our expert writers.
              See the quality and professionalism that awaits your next assignment.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="mx-auto mt-10 max-w-4xl">
              <div className="rounded-2xl bg-white p-6 shadow-strong ring-1 ring-black/5">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search samples by title, subject, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  {/* Filter Toggle Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex shrink-0 items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-deep-navy"
                  >
                    <Filter size={20} className="mr-2" />
                    Filters
                    <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Filter Dropdowns */}
                {showFilters && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid md:grid-cols-3 gap-4">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary"
                      >
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                      
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-primary"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={clearFilters}
                        className="font-medium text-primary hover:text-deep-navy"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Samples Grid */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sample Documents ({filteredSamples.length})
            </h2>
            
            {/* Active Filters */}
            {(selectedCategory !== 'All Categories' || selectedSubject !== 'All Subjects' || selectedLevel !== 'All Levels' || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {selectedCategory !== 'All Categories' && (
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-deep-navy dark:bg-primary/20 dark:text-light-blue">
                    {selectedCategory}
                  </span>
                )}
                {selectedSubject !== 'All Subjects' && (
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-deep-navy dark:bg-primary/20 dark:text-light-blue">
                    {selectedSubject}
                  </span>
                )}
                {selectedLevel !== 'All Levels' && (
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-deep-navy dark:bg-primary/20 dark:text-light-blue">
                    {selectedLevel}
                  </span>
                )}
                {searchTerm && (
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-deep-navy dark:bg-primary/20 dark:text-light-blue">
                    "{searchTerm}"
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Samples Grid */}
          {filteredSamples.length > 0 ? (
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredSamples.map((sample) => (
                <div key={sample.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:scale-105">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(sample.category)}
                        <div>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {sample.category}
                          </span>
                          <div className="text-sm font-medium text-primary dark:text-light-blue">
                            {sample.subject}
                          </div>
                        </div>
                      </div>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                        {sample.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {sample.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {sample.description}
                    </p>

                    {/* File Info */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <FileText size={14} className="mr-1" />
                          {sample.fileName}
                        </span>
                        <span>{formatFileSize(sample.fileSize)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sample.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="rounded bg-primary/10 px-2 py-1 text-xs text-primary dark:bg-primary/20 dark:text-light-blue">
                          {tag}
                        </span>
                      ))}
                      {sample.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">+{sample.tags.length - 3} more</span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(sample.createdAt)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedSample(sample)}
                          className="flex items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          <Eye size={16} className="mr-1" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDownload(sample)}
                          disabled={downloadingId === sample.id}
                          className="flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-deep-navy disabled:opacity-50"
                        >
                          {downloadingId === sample.id ? (
                            <Loader size={16} className="mr-1 animate-spin" />
                          ) : (
                            <Download size={16} className="mr-1" />
                          )}
                          {downloadingId === sample.id ? 'Downloading...' : 'Download'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No samples found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search criteria or filters to find relevant samples.
              </p>
              <button
                onClick={clearFilters}
                className="font-medium text-primary hover:text-deep-navy"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-b from-surface-light to-white py-14 dark:from-gray-800 dark:to-gray-900 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              Like What You See?
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 md:text-xl">
              Let our expert writers help you achieve the same level of quality and excellence for your assignments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order-now"
                className="inline-flex transform items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-medium transition-all hover:scale-[1.02] hover:bg-deep-navy"
              >
                Place Your Order Now
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex transform rounded-lg border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition-all hover:scale-[1.02] hover:bg-primary hover:text-primary-foreground"
              >
                Get Free Quote
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1" size={16} />
                <span>4.9/5 Rating</span>
              </div>
              <div>24/7 Support</div>
              <div>Free Revisions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Preview Modal */}
      {selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedSample.title}
                  </h2>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      {getCategoryIcon(selectedSample.category)}
                      <span className="ml-1">{selectedSample.category}</span>
                    </span>
                    <span>{selectedSample.subject}</span>
                    <span>{selectedSample.level}</span>
                    <span>{selectedSample.pages} pages</span>
                    <span>{formatFileSize(selectedSample.fileSize)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSample(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedSample.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tags & Details
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSample.tags.map((tag, index) => (
                    <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20 dark:text-light-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* PDF Preview Placeholder */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center mb-6">
                <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Document Preview
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This is where the PDF preview would be displayed. In a real implementation, 
                  you would embed a PDF viewer here.
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => handleDownload(selectedSample)}
                    disabled={downloadingId === selectedSample.id}
                    className="flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-deep-navy disabled:opacity-50"
                  >
                    {downloadingId === selectedSample.id ? (
                      <>
                        <Loader size={20} className="mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={20} className="mr-2" />
                        Download Sample
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => window.open(selectedSample.fileUrl, '_blank')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Eye size={20} className="mr-2" />
                    View in Browser
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Impressed with this quality? Get similar work for your assignment.
                </p>
                <Link
                  to="/order-now"
                  className="inline-flex items-center rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-deep-navy"
                >
                  Order Similar Work
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}