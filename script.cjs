const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'pages', 'Services');

const files = [
    'ReflectiveEssay.tsx',
    'CompareContrastEssay.tsx',
    'CauseEffectEssay.tsx',
    'ProblemSolutionEssay.tsx',
    'CriticalAnalysisEssay.tsx',
    'AdmissionEssay.tsx',
    'NarrativeEssayWriting.tsx',
    'ArgumentativeEssayWriting.tsx',
    'PersuasiveEssayWriting.tsx',
    'DescriptiveEssayWriting.tsx',
    'ExpositoryEssayWriting.tsx',
    'AnalyticalEssayWriting.tsx',
    'ScholarshipEssay.tsx',
    'PersonalStatement.tsx',
    'EssayEditing.tsx',
    'EssayProofreading.tsx',
    'EssayRewriting.tsx'
];

const newGrid = `// ─── Essay Services Grid ──────────────────────────────────────────────────────
const EssayServicesGrid = () => {
    const services = [
        {
            emoji: '📝',
            icon: Pen,
            title: 'Personal Statement Writing',
            description: 'A polished personal statement built entirely from scratch that tells your story compellingly. Perfect for graduate programs, medical schools, law schools, and undergraduate applications worldwide.',
            features: ['Compelling story arc', 'Program-specific tailoring', 'Authentic voice preserved', 'Free Turnitin & AI detection reports'],
            cta: 'Write My Personal Statement',
            slug: '/essay-writing/personal-statement',
            popular: true,
        },
        {
            emoji: '🎯',
            icon: Target,
            title: 'Argumentative Essay Writing',
            description: 'Build powerful arguments with evidence-based reasoning. Perfect for debate-focused assignments requiring strong logical structure.',
            features: ['Strong thesis development', 'Evidence-based claims', 'Counterargument handling', 'Logical progression'],
            cta: 'Order Argumentative Essay',
            slug: '/essay-writing/argumentative',
            popular: false,
        },
        {
            emoji: '💬',
            icon: MessageCircle,
            title: 'Persuasive Essay Writing',
            description: 'Craft persuasive essays that move readers to action. Ideal for any assignment requiring compelling rhetoric and powerful appeals.',
            features: ['Ethos, pathos, logos balance', 'Audience-targeted tone', 'Strong call to action', 'Polished argumentation'],
            cta: 'Write My Persuasive Essay',
            slug: '/essay-writing/persuasive',
            popular: false,
        },
        {
            emoji: '📖',
            icon: BookOpen,
            title: 'Narrative Essay Writing',
            description: 'Engaging personal stories with vivid descriptions. Ideal for creative assignments that connect real experiences with deeper themes.',
            features: ['Compelling storytelling', 'Vivid imagery', 'Clear story arc', 'Thematic depth'],
            cta: 'Write My Narrative Essay',
            slug: '/essay-writing/narrative',
            popular: false,
        },
        {
            emoji: '✨',
            icon: Sparkles,
            title: 'Descriptive Essay Writing',
            description: 'Rich sensory details that immerse readers. Perfect for assignments requiring detailed observations and vivid imagery.',
            features: ['Sensory language mastery', 'Vivid descriptions', 'Literary devices', 'Engaging prose'],
            cta: 'Get Descriptive Help',
            slug: '/essay-writing/descriptive',
            popular: false,
        },
        {
            emoji: '📋',
            icon: AlignLeft,
            title: 'Expository Essay Writing',
            description: 'Clear, informative essays that explain topics with precision. Perfect for assignments requiring balanced facts and structured explanation.',
            features: ['Fact-based explanations', 'Logical organization', 'Clear topic sentences', 'Neutral, academic tone'],
            cta: 'Order Expository Essay',
            slug: '/essay-writing/expository',
            popular: false,
        },
        {
            emoji: '🔍',
            icon: Search,
            title: 'Analytical Essay Writing',
            description: 'Deep critical analysis that breaks down complex ideas, texts, or events into clear, structured arguments with academic rigor.',
            features: ['Critical idea breakdown', 'Strong analytical thesis', 'Evidence-based paragraphs', 'Correct academic format'],
            cta: 'Get Analytical Help',
            slug: '/essay-writing/analytical',
            popular: false,
        },
        {
            emoji: '⚖️',
            icon: Scale,
            title: 'Compare & Contrast Essay',
            description: 'Balanced comparison highlighting similarities and differences. Ideal for comparative analysis assignments across any subject.',
            features: ['Point-by-point & block method', 'Balanced analysis', 'Clear comparisons', 'Insightful synthesis'],
            cta: 'Order Comparison Essay',
            slug: '/essay-writing/compare-contrast',
            popular: false,
        },
        {
            emoji: '🔗',
            icon: TrendingUp,
            title: 'Cause & Effect Essay',
            description: 'Explore relationships between events and their outcomes. Perfect for analyzing consequences and meaningful academic connections.',
            features: ['Chain & block structure', 'Logical causal reasoning', 'Supporting evidence', 'Strong conclusions'],
            cta: 'Write Cause & Effect',
            slug: '/essay-writing/cause-effect',
            popular: false,
        },
        {
            emoji: '💡',
            icon: Lightbulb,
            title: 'Problem Solution Essay',
            description: 'Identify problems and propose practical, well-reasoned solutions. Great for assignments that require structured critical thinking.',
            features: ['Actionable thesis statements', 'Viable real-world solutions', 'Right transition words', 'Peer-reviewed sources'],
            cta: 'Get Solution Help',
            slug: '/essay-writing/problem-solution',
            popular: false,
        },
        {
            emoji: '🔬',
            icon: Microscope,
            title: 'Critical Analysis Essay',
            description: 'In-depth evaluation of texts, theories, or works. Perfect for literature, film, philosophy, and any course requiring analytical depth.',
            features: ['Evaluative framework', 'Textual evidence', 'Author intent analysis', 'Scholarly citations'],
            cta: 'Order Critical Analysis',
            slug: '/essay-writing/critical-analysis',
            popular: false,
        },
        {
            emoji: '🎓',
            icon: Award,
            title: 'Admission Essay Writing',
            description: 'Expert admission essays built to match your authentic voice. Our writers understand admissions committee expectations and craft narratives that get you accepted.',
            features: ['Authentic personal narrative', 'Admissions committee insight', 'Leadership & extracurriculars highlighted', 'Free Turnitin & AI detection reports'],
            cta: 'Write My Admission Essay',
            slug: '/essay-writing/admission',
            popular: false,
        },
        {
            emoji: '🏆',
            icon: Trophy,
            title: 'Scholarship Essay Writing',
            description: 'Compelling scholarship essays that help you win funding. We highlight your achievements and demonstrate why you deserve support — all in your authentic voice.',
            features: ['Achievement-focused narrative', 'Winning scholarship format', 'Selection committee insight', 'Free Turnitin & AI detection reports'],
            cta: 'Win My Scholarship',
            slug: '/essay-writing/scholarship',
            popular: false,
        },
        {
            emoji: '✏️',
            icon: Edit3,
            title: 'Essay Editing',
            description: 'Polish your existing work to perfection. Professional editing for grammar, structure, flow, and citation accuracy.',
            features: ['Grammar correction', 'Style improvement', 'Structure refinement', 'Citation checking'],
            cta: 'Edit My Essay',
            slug: '/essay-writing/editing',
            popular: false,
        },
        {
            emoji: '🔎',
            icon: FileCheck,
            title: 'Essay Proofreading',
            description: 'Final review to catch every error before submission. Spelling, punctuation, formatting, and citation accuracy covered.',
            features: ['Spelling & punctuation', 'Citation checking', 'Formatting compliance', 'Final accuracy check'],
            cta: 'Proofread My Essay',
            slug: '/essay-writing/proofreading',
            popular: false,
        },
        {
            emoji: '🔄',
            icon: RefreshCw,
            title: 'Essay Rewriting',
            description: 'Transform existing essays into stronger, clearer versions. Improve clarity, flow, originality, and overall academic quality.',
            features: ['Content improvement', 'Better flow', 'Enhanced clarity', 'Originality boost'],
            cta: 'Rewrite My Essay',
            slug: '/essay-writing/rewriting',
            popular: false,
        },
        {
            emoji: '🤔',
            icon: Users,
            title: 'Reflective Essay Writing',
            description: 'Connect experiences to learning. We help you articulate personal growth with academic depth, linking self-reflection to broader concepts.',
            features: ['Meaningful self-reflection', 'Personal-academic integration', 'Growth demonstration', 'Scholarly connections'],
            cta: 'Write Reflective Essay',
            slug: '/essay-writing/reflective',
            popular: false,
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
                <div
                    key={index}
                    className={\`bg-white rounded-2xl p-6 border-2 \${service.popular ? 'border-[#1652A0] shadow-xl' : 'border-gray-200 shadow-lg'} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden\`}
                >
                    {service.popular && (
                        <div className="absolute top-0 right-0 bg-[#0B1F42] text-[#D4A853] px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> POPULAR
                        </div>
                    )}
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-all text-3xl">
                        {service.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1652A0] transition-colors leading-snug">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-[1.7] text-[15px]">{service.description}</p>
                    <ul className="space-y-2.5 mb-6">
                        {service.features.map((f, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{f}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        to={service.slug}
                        className={\`w-full px-4 py-3 \${service.popular ? 'bg-[#1652A0] text-white hover:bg-[#0B1F42]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-lg\`}
                    >
                        {service.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ))}
        </div>
    );
};`

for (const file of files) {
    let fpath = path.join(targetDir, file);
    if (!fs.existsSync(fpath)) {
        console.log('Skipping ' + file);
        continue;
    }
    let content = fs.readFileSync(fpath, 'utf8');

    const icons = ['Pen', 'Target', 'MessageCircle', 'BookOpen', 'Sparkles', 'AlignLeft', 'Search', 'Scale', 'TrendingUp', 'Lightbulb', 'Microscope', 'Award', 'Trophy', 'Edit3', 'FileCheck', 'RefreshCw', 'Users', 'CheckCircle2', 'ArrowRight'];
    let importBlock = content.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react';/);
    if (importBlock) {
        let imported = importBlock[1].split(',').map(i => i.trim());
        let added = false;
        for (let icon of icons) {
            if (!imported.includes(icon)) {
                imported.push(icon);
                added = true;
            }
        }
        if (added) {
            content = content.replace(importBlock[1], ' ' + imported.join(', ') + ' ');
        }
    }

    if (file === 'ArgumentativeEssayWriting.tsx') {
        const regexStr = 'const ServiceTypesGrid = \\(\\) => \\{[\\s\\S]*?\\}\\);\\s*\\};';
        const regex = new RegExp(regexStr);
        if (regex.test(content)) {
            content = content.replace(regex, newGrid);
        }

        content = content.replace(/<ServiceTypesGrid \/>/g, '<EssayServicesGrid />');

        if (!content.includes('ESSAY WRITING SERVICES WE OFFER')) {
            content = content.replace('<EssayServicesGrid />', '                <div className="container mx-auto px-4 mt-20 mb-8">\\n                    <div className="max-w-6xl mx-auto text-center">\\n                        <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">\\n                            ESSAY WRITING SERVICES WE OFFER\\n                        </div>\\n                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">\\n                            Find the Perfect Essay Service\\n                        </h2>\\n                    </div>\\n                </div>\\n                <EssayServicesGrid />\\n            ');
        }
    } else {
        const regexStr1 = '// ─── Essay Services Grid ──────────────────────────────────────────────────────\\r?\\nconst EssayServicesGrid = \\(\\) => \\{[\\s\\S]*?\\}\\);\\s*\\};';
        const regex1 = new RegExp(regexStr1);
        if (regex1.test(content)) {
            content = content.replace(regex1, newGrid);
        } else {
            const regexStr2 = 'const EssayServicesGrid = \\(\\) => \\{[\\s\\S]*?\\}\\);\\s*\\};';
            const regex2 = new RegExp(regexStr2);
            if (regex2.test(content)) {
                content = content.replace(regex2, newGrid);
            } else {
                console.log('Grid not found in ' + file);
            }
        }
    }

    fs.writeFileSync(fpath, content);
}

let ewPath = path.join(targetDir, 'EssayWriting.tsx');
if (fs.existsSync(ewPath)) {
    let ewContent = fs.readFileSync(ewPath, 'utf8');
    const ewIcons = ['Pen', 'Target', 'MessageCircle', 'BookOpen', 'Sparkles', 'AlignLeft', 'Search', 'Scale', 'TrendingUp', 'Lightbulb', 'Microscope', 'Award', 'Trophy', 'Edit3', 'FileCheck', 'RefreshCw', 'Users', 'CheckCircle2', 'ArrowRight'];
    let importBlockEw = ewContent.match(/import\s*\{([^}]+)\}\s*from\s*'lucide-react';/);
    if (importBlockEw) {
        let imported = importBlockEw[1].split(',').map(i => i.trim());
        let added = false;
        for (let icon of ewIcons) {
            if (!imported.includes(icon)) {
                imported.push(icon);
                added = true;
            }
        }
        if (added) {
            ewContent = ewContent.replace(importBlockEw[1], ' ' + imported.join(', ') + ' ');
        }
    }
    const regexStrEw = '// Essay Types Grid Component\\r?\\nconst EssayTypesGrid = \\(\\) => \\{[\\s\\S]*?\\}\\);\\s*\\};';
    const regexEw = new RegExp(regexStrEw);
    if (regexEw.test(ewContent)) {
        ewContent = ewContent.replace(regexEw, newGrid.replace("const EssayServicesGrid", "const EssayTypesGrid"));
    } else {
        const regexStrEwFallback = 'const EssayTypesGrid = \\(\\) => \\{[\\s\\S]*?\\}\\);\\s*\\};';
        const regexEwFallback = new RegExp(regexStrEwFallback);
        if (regexEwFallback.test(ewContent)) {
            ewContent = ewContent.replace(regexEwFallback, newGrid.replace("const EssayServicesGrid", "const EssayTypesGrid"));
        } else {
            console.log('Grid not found in EssayWriting.tsx');
        }
    }

    if (!ewContent.includes('ESSAY WRITING SERVICES WE OFFER')) {
        ewContent = ewContent.replace('<EssayTypesGrid />', '            <div className="container mx-auto px-4 mt-20 mb-8">\n                <div className="max-w-6xl mx-auto text-center">\n                    <div className="inline-block bg-[#0B1F42]/5 text-[#0B1F42] px-4 py-2 rounded-full text-sm font-semibold mb-6">\n                        ESSAY WRITING SERVICES WE OFFER\n                    </div>\n                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F42] mb-6">\n                        Find the Perfect Essay Service\n                    </h2>\n                </div>\n            </div>\n            <EssayTypesGrid />\n        ');
    }

    fs.writeFileSync(ewPath, ewContent);
}

console.log('Updates complete!');
