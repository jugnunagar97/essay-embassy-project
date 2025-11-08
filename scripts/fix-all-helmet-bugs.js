import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceSeoTags = {
  'AcademicWriting': { title: 'Academic Writing Service | Professional Help', description: 'Expert academic writing service for essays, papers, and assignments. Professional writers, original content, on-time delivery.', url: 'academic-writing' },
  'AdmissionEssayWriting': { title: 'Admission Essay Writing Service | Expert Help', description: 'Professional admission essay writing service. Get compelling college admission essays that stand out. Expert writers available.', url: 'admission-essay-writing' },
  'ArgumentativeEssay': { title: 'Argumentative Essay Writing Service | Expert Help', description: 'Professional argumentative essay writing service. Get well-researched, persuasive essays with strong arguments and evidence.', url: 'argumentative-essay' },
  'AssignmentHelp': { title: 'Assignment Help Service | Expert Tutors', description: 'Get professional assignment help from expert tutors. All subjects covered, 24/7 support, original work guaranteed.', url: 'assignment-help' },
  'BiotechnologyAssignmentHelp': { title: 'Biotechnology Assignment Help | Expert Tutors', description: 'Professional biotechnology assignment help. Expert tutors in biotechnology, genetics, and molecular biology. Get help now.', url: 'assignment-help/biotechnology' },
  'BookReview': { title: 'Book Review Writing Service | Expert Help', description: 'Professional book review writing service. Get comprehensive, well-written book reviews with critical analysis and insights.', url: 'academic-writing/book-review' },
  'BusinessAssignmentHelp': { title: 'Business Assignment Help | Expert Tutors', description: 'Professional business assignment help. Expert tutors in business, management, and finance. Get help with your assignments.', url: 'assignment-help/business' },
  'CaseStudyHelp': { title: 'Case Study Help Service | Expert Writers', description: 'Professional case study help service. Get comprehensive case study analysis and writing from expert writers.', url: 'academic-writing/case-study-help' },
  'CommunicationAssignmentHelp': { title: 'Communication Assignment Help | Expert Tutors', description: 'Professional communication assignment help. Expert tutors in communication, media studies, and public relations.', url: 'assignment-help/communication' },
  'CompareContrastEssay': { title: 'Compare and Contrast Essay Service | Expert Help', description: 'Professional compare and contrast essay writing service. Get well-structured essays with clear comparisons and contrasts.', url: 'compare-contrast-essay' },
  'ComputerAssignmentHelp': { title: 'Computer Assignment Help | Expert Tutors', description: 'Professional computer assignment help. Expert tutors in computer science, programming, and IT. Get help now.', url: 'assignment-help/computer' },
  'CPPProgrammingHelp': { title: 'C++ Programming Help | Expert Tutors', description: 'Professional C++ programming help. Expert tutors in C++ programming, data structures, and algorithms. Get help now.', url: 'assignment-help/cpp-programming' },
  'CProgrammingHelp': { title: 'C Programming Help | Expert Tutors', description: 'Professional C programming help. Expert tutors in C programming, systems programming, and embedded systems.', url: 'assignment-help/c-programming' },
  'CSharpProgrammingHelp': { title: 'C# Programming Help | Expert Tutors', description: 'Professional C# programming help. Expert tutors in C# programming, .NET framework, and application development.', url: 'assignment-help/csharp-programming' },
  'DissertationWriting': { title: 'Dissertation Writing Service | Expert Help', description: 'Professional dissertation writing service. Get comprehensive dissertation help from PhD-level writers. Original research guaranteed.', url: 'dissertation-writing' },
  'EngineeringAssignmentHelp': { title: 'Engineering Assignment Help | Expert Tutors', description: 'Professional engineering assignment help. Expert tutors in all engineering disciplines. Get help with your assignments.', url: 'assignment-help/engineering' },
  'EnglishAssignmentHelp': { title: 'English Assignment Help | Expert Tutors', description: 'Professional English assignment help. Expert tutors in English literature, writing, and language. Get help now.', url: 'assignment-help/english' },
  'EssayWriting': { title: 'Essay Writing Service | Professional Essay Help', description: 'Expert essay writing service with professional writers. Get custom essays, research papers, and academic writing help. Original content, on-time delivery.', url: 'essay-writing' },
  'FinanceAssignmentHelp': { title: 'Finance Assignment Help | Expert Tutors', description: 'Professional finance assignment help. Expert tutors in finance, accounting, and economics. Get help with your assignments.', url: 'assignment-help/finance' },
  'HomeworkHelp': { title: 'Homework Help Service | Expert Tutors', description: 'Professional homework help service. Get personalized homework help from qualified tutors across all subjects. 24/7 support available.', url: 'homework-help' },
  'HumanitiesAssignmentHelp': { title: 'Humanities Assignment Help | Expert Tutors', description: 'Professional humanities assignment help. Expert tutors in history, philosophy, literature, and arts. Get help now.', url: 'assignment-help/humanities' },
  'JavaProgrammingHelp': { title: 'Java Programming Help | Expert Tutors', description: 'Professional Java programming help. Expert tutors in Java programming, OOP, and software development. Get help now.', url: 'assignment-help/java-programming' },
  'JSProgrammingHelp': { title: 'JavaScript Programming Help | Expert Tutors', description: 'Professional JavaScript programming help. Expert tutors in JavaScript, web development, and frontend frameworks.', url: 'assignment-help/javascript-programming' },
  'LabReport': { title: 'Lab Report Writing Service | Expert Help', description: 'Professional lab report writing service. Get comprehensive lab reports with proper methodology, results, and analysis.', url: 'academic-writing/lab-report' },
  'LawAssignmentHelp': { title: 'Law Assignment Help | Expert Tutors', description: 'Professional law assignment help. Expert tutors in law, legal studies, and jurisprudence. Get help with your assignments.', url: 'assignment-help/law' },
  'ManagementAssignmentHelp': { title: 'Management Assignment Help | Expert Tutors', description: 'Professional management assignment help. Expert tutors in business management, leadership, and organizational behavior.', url: 'assignment-help/management' },
  'MathAssignmentHelp': { title: 'Math Assignment Help | Expert Tutors', description: 'Professional math assignment help. Expert tutors in mathematics, calculus, algebra, and statistics. Get help now.', url: 'assignment-help/math' },
  'MatlabProgrammingHelp': { title: 'MATLAB Programming Help | Expert Tutors', description: 'Professional MATLAB programming help. Expert tutors in MATLAB, numerical analysis, and scientific computing. Get help now.', url: 'assignment-help/matlab-programming' },
  'NarrativeEssay': { title: 'Narrative Essay Writing Service | Expert Help', description: 'Professional narrative essay writing service. Get engaging, well-written narrative essays with compelling storytelling.', url: 'narrative-essay' },
  'PhysicsAssignmentHelp': { title: 'Physics Assignment Help | Expert Tutors', description: 'Professional physics assignment help. Expert tutors in physics, mechanics, thermodynamics, and quantum mechanics.', url: 'assignment-help/physics' },
  'ProgrammingHelp': { title: 'Programming Help Service | Expert Tutors', description: 'Professional programming help service. Expert tutors in all programming languages and software development. Get help now.', url: 'assignment-help/programming' },
  'PythonProgrammingHelp': { title: 'Python Programming Help | Expert Tutors', description: 'Professional Python programming help. Expert tutors in Python, data science, and machine learning. Get help now.', url: 'assignment-help/python-programming' },
  'ReflectiveEssay': { title: 'Reflective Essay Writing Service | Expert Help', description: 'Professional reflective essay writing service. Get thoughtful, well-written reflective essays with personal insights and analysis.', url: 'reflective-essay' },
  'ResearchPaperWriting': { title: 'Research Paper Writing Service | Expert Help', description: 'Professional research paper writing service. Get custom research papers written by expert writers. Original content, proper citations, on-time delivery.', url: 'research-paper-writing' },
  'RubyProgrammingHelp': { title: 'Ruby Programming Help | Expert Tutors', description: 'Professional Ruby programming help. Expert tutors in Ruby, Rails, and web development. Get help now.', url: 'assignment-help/ruby-programming' },
  'ScholarshipEssay': { title: 'Scholarship Essay Writing Service | Expert Help', description: 'Professional scholarship essay writing service. Get compelling scholarship essays that help you win awards and grants.', url: 'scholarship-essay' },
  'ScienceAssignmentHelp': { title: 'Science Assignment Help | Expert Tutors', description: 'Professional science assignment help. Expert tutors in biology, chemistry, physics, and all sciences. Get help now.', url: 'assignment-help/science' },
  'TermPaper': { title: 'Term Paper Writing Service | Expert Help', description: 'Professional term paper writing service. Get comprehensive term papers with proper research, citations, and formatting.', url: 'academic-writing/term-paper' },
  'ThesisWriting': { title: 'Thesis Writing Service | Expert Help', description: 'Professional thesis writing service. Get comprehensive thesis help from PhD-level writers. Original research and analysis.', url: 'thesis-writing' }
};

function fixFile(filePath, serviceName) {
  let content = fs.readFileSync(filePath, 'utf8');
  const seoConfig = serviceSeoTags[serviceName];
  if (!seoConfig) return false;

  // Check if Helmet is incorrectly inside testimonials.map
  if (!content.includes('testimonials.map') || !content.includes('return (\n\n                    <>\n\n                      <Helmet>')) {
    // Check if already fixed
    if (content.match(/export default function[^}]*return\s*\(\s*<>\s*<Helmet>/s)) {
      return false;
    }
    return false;
  }

  // 1. Remove Helmet from inside testimonials.map
  content = content.replace(
    /(testimonials\.map\([^)]*\)\s*{[^}]*return\s*\(\s*)\n\n\s+<>\n\n\s+<Helmet>[\s\S]*?<\/Helmet>\n\n\s+<div/g,
    '$1<div'
  );

  // 2. Remove closing fragment from map return
  content = content.replace(/(\s+<\/div>\s*\);\s*})\s*<\/>\s*\);/g, '$1);');

  // 3. Add Helmet at top level return
  const returnMatch = content.match(/(export default function[^}]*return\s*\(\s*)(<div[^>]*>)/);
  if (returnMatch) {
    const indent = returnMatch[1].match(/\s*$/)[0];
    const helmetBlock = `${indent}return (\n${indent}    <>\n${indent}      <Helmet>\n${indent}        <title>${seoConfig.title}</title>\n${indent}        <meta\n${indent}          name="description"\n${indent}          content="${seoConfig.description}"\n${indent}        />\n${indent}        <link rel="canonical" href="https://essayembassy.com/services/${seoConfig.url}" />\n${indent}      </Helmet>\n${indent}      ${returnMatch[2]}`;
    content = content.replace(returnMatch[0], helmetBlock);

    // 4. Fix closing tags
    const closingMatches = [...content.matchAll(/(\s+<\/div>\s*\);\s*})/g)];
    if (closingMatches.length > 0) {
      const lastMatch = closingMatches[closingMatches.length - 1];
      const closingIndex = lastMatch.index;
      const closingIndent = lastMatch[1].match(/^\s*/)[0];
      content = content.slice(0, closingIndex) + 
        `${closingIndent}</div>\n${closingIndent}    </>\n${closingIndent}  );\n${closingIndent}}` + 
        content.slice(closingIndex + lastMatch[0].length);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

const servicesDir = path.join(__dirname, '../src/pages/Services');
const files = fs.readdirSync(servicesDir);
let fixed = 0;

files.forEach(file => {
  if (file.endsWith('.tsx') && !file.includes('Carousel') && !file.includes('Experts')) {
    const serviceName = file.replace('.tsx', '');
    const filePath = path.join(servicesDir, file);
    try {
      if (fixFile(filePath, serviceName)) {
        console.log(`✓ Fixed ${serviceName}`);
        fixed++;
      }
    } catch (error) {
      console.error(`✗ Error in ${serviceName}:`, error.message);
    }
  }
});

console.log(`\nFixed ${fixed} files`);

