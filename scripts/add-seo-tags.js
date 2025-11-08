import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Service page SEO configuration
const serviceSeoTags = {
  'AcademicWriting': {
    title: 'Academic Writing Service | Professional Help',
    description: 'Expert academic writing service for essays, papers, and assignments. Professional writers, original content, on-time delivery.',
    url: 'academic-writing'
  },
  'AdmissionEssayWriting': {
    title: 'Admission Essay Writing Service | Expert Help',
    description: 'Professional admission essay writing service. Get compelling college admission essays that stand out. Expert writers available.',
    url: 'admission-essay-writing'
  },
  'ArgumentativeEssay': {
    title: 'Argumentative Essay Writing Service | Expert Help',
    description: 'Professional argumentative essay writing service. Get well-researched, persuasive essays with strong arguments and evidence.',
    url: 'argumentative-essay'
  },
  'AssignmentHelp': {
    title: 'Assignment Help Service | Expert Tutors',
    description: 'Get professional assignment help from expert tutors. All subjects covered, 24/7 support, original work guaranteed.',
    url: 'assignment-help'
  },
  'BiotechnologyAssignmentHelp': {
    title: 'Biotechnology Assignment Help | Expert Tutors',
    description: 'Professional biotechnology assignment help. Expert tutors in biotechnology, genetics, and molecular biology. Get help now.',
    url: 'assignment-help/biotechnology'
  },
  'BookReview': {
    title: 'Book Review Writing Service | Expert Help',
    description: 'Professional book review writing service. Get comprehensive, well-written book reviews with critical analysis and insights.',
    url: 'academic-writing/book-review'
  },
  'BusinessAssignmentHelp': {
    title: 'Business Assignment Help | Expert Tutors',
    description: 'Professional business assignment help. Expert tutors in business, management, and finance. Get help with your assignments.',
    url: 'assignment-help/business'
  },
  'CaseStudyHelp': {
    title: 'Case Study Help Service | Expert Writers',
    description: 'Professional case study help service. Get comprehensive case study analysis and writing from expert writers.',
    url: 'academic-writing/case-study-help'
  },
  'CommunicationAssignmentHelp': {
    title: 'Communication Assignment Help | Expert Tutors',
    description: 'Professional communication assignment help. Expert tutors in communication, media studies, and public relations.',
    url: 'assignment-help/communication'
  },
  'CompareContrastEssay': {
    title: 'Compare and Contrast Essay Service | Expert Help',
    description: 'Professional compare and contrast essay writing service. Get well-structured essays with clear comparisons and contrasts.',
    url: 'compare-contrast-essay'
  },
  'ComputerAssignmentHelp': {
    title: 'Computer Assignment Help | Expert Tutors',
    description: 'Professional computer assignment help. Expert tutors in computer science, programming, and IT. Get help now.',
    url: 'assignment-help/computer'
  },
  'CPPProgrammingHelp': {
    title: 'C++ Programming Help | Expert Tutors',
    description: 'Professional C++ programming help. Expert tutors in C++ programming, data structures, and algorithms. Get help now.',
    url: 'assignment-help/cpp-programming'
  },
  'CProgrammingHelp': {
    title: 'C Programming Help | Expert Tutors',
    description: 'Professional C programming help. Expert tutors in C programming, systems programming, and embedded systems.',
    url: 'assignment-help/c-programming'
  },
  'CSharpProgrammingHelp': {
    title: 'C# Programming Help | Expert Tutors',
    description: 'Professional C# programming help. Expert tutors in C# programming, .NET framework, and application development.',
    url: 'assignment-help/csharp-programming'
  },
  'DissertationWriting': {
    title: 'Dissertation Writing Service | Expert Help',
    description: 'Professional dissertation writing service. Get comprehensive dissertation help from PhD-level writers. Original research guaranteed.',
    url: 'dissertation-writing'
  },
  'EngineeringAssignmentHelp': {
    title: 'Engineering Assignment Help | Expert Tutors',
    description: 'Professional engineering assignment help. Expert tutors in all engineering disciplines. Get help with your assignments.',
    url: 'assignment-help/engineering'
  },
  'EnglishAssignmentHelp': {
    title: 'English Assignment Help | Expert Tutors',
    description: 'Professional English assignment help. Expert tutors in English literature, writing, and language. Get help now.',
    url: 'assignment-help/english'
  },
  'EssayWriting': {
    title: 'Essay Writing Service | Professional Essay Help',
    description: 'Expert essay writing service with professional writers. Get custom essays, research papers, and academic writing help. Original content, on-time delivery.',
    url: 'essay-writing'
  },
  'FinanceAssignmentHelp': {
    title: 'Finance Assignment Help | Expert Tutors',
    description: 'Professional finance assignment help. Expert tutors in finance, accounting, and economics. Get help with your assignments.',
    url: 'assignment-help/finance'
  },
  'HomeworkHelp': {
    title: 'Homework Help Service | Expert Tutors',
    description: 'Professional homework help service. Get personalized homework help from qualified tutors across all subjects. 24/7 support available.',
    url: 'homework-help'
  },
  'HumanitiesAssignmentHelp': {
    title: 'Humanities Assignment Help | Expert Tutors',
    description: 'Professional humanities assignment help. Expert tutors in history, philosophy, literature, and arts. Get help now.',
    url: 'assignment-help/humanities'
  },
  'JavaProgrammingHelp': {
    title: 'Java Programming Help | Expert Tutors',
    description: 'Professional Java programming help. Expert tutors in Java programming, OOP, and software development. Get help now.',
    url: 'assignment-help/java-programming'
  },
  'JSProgrammingHelp': {
    title: 'JavaScript Programming Help | Expert Tutors',
    description: 'Professional JavaScript programming help. Expert tutors in JavaScript, web development, and frontend frameworks.',
    url: 'assignment-help/javascript-programming'
  },
  'LabReport': {
    title: 'Lab Report Writing Service | Expert Help',
    description: 'Professional lab report writing service. Get comprehensive lab reports with proper methodology, results, and analysis.',
    url: 'academic-writing/lab-report'
  },
  'LawAssignmentHelp': {
    title: 'Law Assignment Help | Expert Tutors',
    description: 'Professional law assignment help. Expert tutors in law, legal studies, and jurisprudence. Get help with your assignments.',
    url: 'assignment-help/law'
  },
  'ManagementAssignmentHelp': {
    title: 'Management Assignment Help | Expert Tutors',
    description: 'Professional management assignment help. Expert tutors in business management, leadership, and organizational behavior.',
    url: 'assignment-help/management'
  },
  'MathAssignmentHelp': {
    title: 'Math Assignment Help | Expert Tutors',
    description: 'Professional math assignment help. Expert tutors in mathematics, calculus, algebra, and statistics. Get help now.',
    url: 'assignment-help/math'
  },
  'MatlabProgrammingHelp': {
    title: 'MATLAB Programming Help | Expert Tutors',
    description: 'Professional MATLAB programming help. Expert tutors in MATLAB, numerical analysis, and scientific computing. Get help now.',
    url: 'assignment-help/matlab-programming'
  },
  'NarrativeEssay': {
    title: 'Narrative Essay Writing Service | Expert Help',
    description: 'Professional narrative essay writing service. Get engaging, well-written narrative essays with compelling storytelling.',
    url: 'narrative-essay'
  },
  'PhysicsAssignmentHelp': {
    title: 'Physics Assignment Help | Expert Tutors',
    description: 'Professional physics assignment help. Expert tutors in physics, mechanics, thermodynamics, and quantum mechanics.',
    url: 'assignment-help/physics'
  },
  'ProgrammingHelp': {
    title: 'Programming Help Service | Expert Tutors',
    description: 'Professional programming help service. Expert tutors in all programming languages and software development. Get help now.',
    url: 'assignment-help/programming'
  },
  'PythonProgrammingHelp': {
    title: 'Python Programming Help | Expert Tutors',
    description: 'Professional Python programming help. Expert tutors in Python, data science, and machine learning. Get help now.',
    url: 'assignment-help/python-programming'
  },
  'ReflectiveEssay': {
    title: 'Reflective Essay Writing Service | Expert Help',
    description: 'Professional reflective essay writing service. Get thoughtful, well-written reflective essays with personal insights and analysis.',
    url: 'reflective-essay'
  },
  'ResearchPaperWriting': {
    title: 'Research Paper Writing Service | Expert Help',
    description: 'Professional research paper writing service. Get custom research papers written by expert writers. Original content, proper citations, on-time delivery.',
    url: 'research-paper-writing'
  },
  'RubyProgrammingHelp': {
    title: 'Ruby Programming Help | Expert Tutors',
    description: 'Professional Ruby programming help. Expert tutors in Ruby, Rails, and web development. Get help now.',
    url: 'assignment-help/ruby-programming'
  },
  'ScholarshipEssay': {
    title: 'Scholarship Essay Writing Service | Expert Help',
    description: 'Professional scholarship essay writing service. Get compelling scholarship essays that help you win awards and grants.',
    url: 'scholarship-essay'
  },
  'ScienceAssignmentHelp': {
    title: 'Science Assignment Help | Expert Tutors',
    description: 'Professional science assignment help. Expert tutors in biology, chemistry, physics, and all sciences. Get help now.',
    url: 'assignment-help/science'
  },
  'TermPaper': {
    title: 'Term Paper Writing Service | Expert Help',
    description: 'Professional term paper writing service. Get comprehensive term papers with proper research, citations, and formatting.',
    url: 'academic-writing/term-paper'
  },
  'ThesisWriting': {
    title: 'Thesis Writing Service | Expert Help',
    description: 'Professional thesis writing service. Get comprehensive thesis help from PhD-level writers. Original research and analysis.',
    url: 'thesis-writing'
  }
};

function addSeoTagsToFile(filePath, serviceName) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has Helmet
  if (content.includes('react-helmet-async') && content.includes('<Helmet>')) {
    console.log(`✓ ${serviceName} already has SEO tags, skipping...`);
    return false;
  }
  
  const seoConfig = serviceSeoTags[serviceName];
  if (!seoConfig) {
    console.log(`⚠ ${serviceName} not found in SEO config, skipping...`);
    return false;
  }
  
  let newContent = content;
  
  // 1. Add Helmet import if not present
  if (!content.includes('react-helmet-async')) {
    // Find the last import statement
    const importRegex = /^import .+ from ['"].+['"];?$/gm;
    const imports = content.match(importRegex) || [];
    if (imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertIndex = lastImportIndex + lastImport.length;
      newContent = newContent.slice(0, insertIndex) + 
        '\nimport { Helmet } from \'react-helmet-async\';' + 
        newContent.slice(insertIndex);
    } else {
      // If no imports, add at the beginning
      newContent = 'import { Helmet } from \'react-helmet-async\';\n' + newContent;
    }
  }
  
  // 2. Find the main export default function's return statement
  // Look for "export default function" followed by return statement
  const functionMatch = newContent.match(/export default function \w+\([^)]*\)\s*{[\s\S]*?return\s*\(/);
  
  if (!functionMatch) {
    console.log(`⚠ Could not find export default function in ${serviceName}`);
    return false;
  }
  
  // Find the return statement pattern - more flexible
  const returnPatterns = [
    /(\s+return\s*\(\s*)(<div[^>]*className[^>]*>)/,  // return ( <div className=...>
    /(\s+return\s*\(\s*)(<div[^>]*style[^>]*>)/,      // return ( <div style=...>
    /(\s+return\s*\(\s*)(<div[^>]*>)/,                 // return ( <div>
    /(\s+return\s*\(\s*)(<)/                            // return ( <
  ];
  
  let returnMatch = null;
  for (const pattern of returnPatterns) {
    returnMatch = newContent.match(pattern);
    if (returnMatch) break;
  }
  
  if (!returnMatch) {
    console.log(`⚠ Could not find return statement pattern in ${serviceName}`);
    return false;
  }
  
  const returnIndex = returnMatch.index;
  const returnPrefix = returnMatch[1];
  const openingTag = returnMatch[2];
  
  // Insert Helmet component
  const indent = returnPrefix.match(/\s*$/)[0];
  const helmetBlock = `${indent}return (\n${indent}    <>\n${indent}      <Helmet>\n${indent}        <title>${seoConfig.title}</title>\n${indent}        <meta\n${indent}          name="description"\n${indent}          content="${seoConfig.description}"\n${indent}        />\n${indent}        <link rel="canonical" href="https://essayembassy.com/services/${seoConfig.url}" />\n${indent}      </Helmet>\n${indent}      ${openingTag}`;
  
  newContent = newContent.slice(0, returnIndex) + 
    helmetBlock + 
    newContent.slice(returnIndex + returnMatch[0].length);
  
  // 3. Find the closing pattern - look for the last </div> before ); in the main function
  // We need to find the closing of the main return statement
  const closingPatterns = [
    /(\s+<\/div>\s*\);\s*})/m,           // </div> ); }
    /(\s+<\/div>\s*\);\s*\n\s*})/m,       // </div> );\n }
    /(\s+<\/div>\s*\n\s*\);\s*\n\s*})/m  // </div>\n );\n }
  ];
  
  let closingMatch = null;
  for (const pattern of closingPatterns) {
    const matches = [...newContent.matchAll(new RegExp(pattern.source, 'g'))];
    // Get the last match (closest to end)
    if (matches.length > 0) {
      closingMatch = matches[matches.length - 1];
      break;
    }
  }
  
  if (closingMatch) {
    const closingIndex = closingMatch.index;
    const closingIndent = closingMatch[1].match(/^\s*/)[0];
    newContent = newContent.slice(0, closingIndex) + 
      `${closingIndent}</div>\n${closingIndent}    </>\n${closingIndent}  );\n${closingIndent}}` + 
      newContent.slice(closingIndex + closingMatch[0].length);
  } else {
    console.log(`⚠ Could not find closing pattern in ${serviceName}, trying alternative...`);
    // Try to find just before the last }
    const lastBraceIndex = newContent.lastIndexOf('}');
    if (lastBraceIndex > 0) {
      const beforeBrace = newContent.slice(Math.max(0, lastBraceIndex - 200), lastBraceIndex);
      const divCloseMatch = beforeBrace.match(/(\s+<\/div>\s*\);\s*)$/);
      if (divCloseMatch) {
        const insertIndex = lastBraceIndex - divCloseMatch[0].length;
        const indent = divCloseMatch[1].match(/^\s*/)[0];
        newContent = newContent.slice(0, insertIndex) + 
          `${indent}</div>\n${indent}    </>\n${indent}  );\n${indent}}` + 
          newContent.slice(insertIndex + divCloseMatch[0].length);
      } else {
        console.log(`⚠ Could not find closing pattern in ${serviceName}`);
        return false;
      }
    } else {
      console.log(`⚠ Could not find closing brace in ${serviceName}`);
      return false;
    }
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✓ Added SEO tags to ${serviceName}`);
  return true;
}

// Main execution
const servicesDir = path.join(__dirname, '../src/pages/Services');
const files = fs.readdirSync(servicesDir);

let processed = 0;
let skipped = 0;
let errors = 0;

files.forEach(file => {
  if (file.endsWith('.tsx') && !file.includes('Carousel') && !file.includes('Experts')) {
    const serviceName = file.replace('.tsx', '');
    const filePath = path.join(servicesDir, file);
    
    try {
      const result = addSeoTagsToFile(filePath, serviceName);
      if (result) {
        processed++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`✗ Error processing ${serviceName}:`, error.message);
      errors++;
    }
  }
});

console.log('\n=== Summary ===');
console.log(`Processed: ${processed}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors}`);

