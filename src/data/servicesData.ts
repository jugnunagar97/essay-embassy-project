// src/data/servicesData.ts

export interface SubService {
  name: string;
  link: string;
}

export interface ServiceCategory {
  name: string;
  link: string; // <-- ADDED: Each main category now has its own link
  subServices: SubService[];
}

export const servicesMenu: ServiceCategory[] = [
  {
    name: 'Essay Writing', // <-- CORRECTED
    link: '/services/essay-writing', // <-- CORRECTED
    subServices: [
      { name: 'Admission Essay', link: '/services/admission-essay' },
      { name: 'Scholarship Essay', link: '/services/scholarship-essay' },
      { name: 'Argumentative Essay', link: '/services/argumentative-essay' },
      { name: 'Narrative Essay', link: '/services/narrative-essay' },
    ],
  },
  {
    name: 'Assignment Help', // <-- CORRECTED
    link: '/services/assignment-help', // <-- CORRECTED
    subServices: [
      { name: 'English Assignment', link: '/services/english-assignment-help' },
      { name: 'Physics Assignment', link: '/services/physics-assignment-help' },
      { name: 'Programming Help', link: '/services/programming-help' },
      { name: 'Case Study Help', link: '/services/case-study-help' },
    ],
  },
  {
    name: 'Homework Help', // <-- CORRECTED
    link: '/services/homework-help', // <-- CORRECTED
    subServices: [
        // This category might not have sub-services, which is fine.
    ],
  },
  {
    name: 'Research & Reports',
    link: '/services/research-paper-writing', // Main link for this category
    subServices: [
      { name: 'Research Paper', link: '/services/research-paper-writing' },
      { name: 'Term Paper', link: '/services/term-paper' },
      { name: 'Lab Report', link: '/services/lab-report' },
      { name: 'Book Review', link: '/services/book-review' },
    ],
  },
    {
    name: 'Dissertation Services', // <-- RENAMED from "Graduate Level"
    link: '/services/dissertation-writing', // Main link for this category
    subServices: [
      { name: 'Dissertation Writing', link: '/services/dissertation-writing' },
      { name: 'Thesis Writing', link: '/services/thesis-writing' },
      { name: 'Research Proposal', link: '/services/research-proposal' },
    ],
  },
];