import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { batch2Colleges } from "./college-page-configs-batch2.mjs";
import { batch3Colleges } from "./college-page-configs-batch3.mjs";
import { batch4Colleges } from "./college-page-configs-batch4.mjs";
import { mergeCollegeWithVerified } from "./college-verified-overrides.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const templatePath = path.join(
  root,
  "src/pages/Services/Colleges/university-texas-austin.tsx"
);
const outDir = path.join(root, "src/pages/Services/Colleges");

const template = fs.readFileSync(templatePath, "utf8").replace(/\r\n/g, "\n");
const splitMarker = "// ==========================================\n// TAILORED DATA (UT AUSTIN)";
const splitIndex = template.indexOf(splitMarker);
if (splitIndex === -1) {
  throw new Error(`Split marker not found in ${templatePath}`);
}
const componentBlock = template.slice(0, splitIndex);

const colleges = [
  {
    file: "rice-university.tsx",
    slug: "rice-university",
    prefix: "rice",
    component: "RiceUniversity",
    shortCode: "RICE",
    fullName: "Rice University",
    heroTitle: "Rice University Essay & Assignment Help",
    location: "Houston, Texas",
    type: "Elite Private Research University",
    studentsLabel: "Trusted by Rice Owls",
    mascot: "Owls",
    campusPhrase: "the hedges and academic quads",
    qsRank: "=119",
    subjectStat: "Top 150",
    subjectCaption: "Strong QS performance in research citations and sustainability",
    writersCaption: "Experts familiar with Jones, Brown Engineering, and Weiss expectations",
    trustChipWriters: "Jones & Engineering Alumni Writers",
    schools: ["Jones School of Business", "George R. Brown School of Engineering", "Weiss School of Natural Sciences", "School of Humanities"],
    alertTitle: "Houston Semester Pace Alert:",
    alertBody: "Rice's intimate campus still moves fast. From Jones finance models to engineering design labs and humanities thesis drafts, deadlines cluster before fall and spring breaks. Reserve a writer before midterm week fills up.",
    calendarEyebrow: "Rice academic pulse",
    calendarSubtitle: "Plan ahead for Houston's fall and spring crunch weeks across Jones, engineering, and humanities programs.",
    curriculumTitle: "Covering the Rice Academic Core",
    curriculumSubtitle: "From the hedges to the research labs, we align with what Rice faculty expect on Canvas.",
    professorTitle: "Built for Rice's High Academic Bar",
    professorSubtitle: "With a top-120 global QS standing, Rice sets demanding standards. Our writers match that rigor school by school.",
    servicesTitle: "Custom Support Built for Owls",
    testimonialsEyebrow: "Owls succeeding",
    testimonialsTitle: "What Rice Students Tell Us",
    testimonialsSubtitle: "Real feedback from Rice students balancing Jones cases, STEM labs, and humanities seminars.",
    faqSubtitle: "Everything you need to know before placing your first order for Rice coursework.",
    faqSupportHeading: "Stuck in the Houston Crunch?",
    faqSupportRole: "Gulf Coast Academic Advisor",
    bottomBadge: "Keep up with the Rice Semester Pace",
    bottomCtaTitle: "Do not Let the Rice Semester Overwhelm You",
    bottomCtaSubtitle: "Rice Owls trust Essay Embassy when seminars, labs, and case analyses collide. Stay on track without sacrificing sleep.",
    seoTitle: "Rice University Essay Help | Rice Assignment Writing Service",
    seoDescription: "Expert academic writing for Rice students. Tailored support for Jones business cases, engineering labs, and Weiss science reports.",
    description: "Specialized academic writing support for Rice students navigating Jones School of Business, George R. Brown Engineering, and Weiss natural sciences. Whether you are modeling finance cases or drafting a chemistry lab report, our writers understand Houston's elite private-university expectations.",
    primaryCta: "Get help for Rice coursework",
    departments: [
      { icon: "chart", name: "Jones School of Business", courses: ["BUSI 310", "FINC 301", "MGMT 321", "ACCT 310"] },
      { icon: "brain", name: "George R. Brown School of Engineering", courses: ["ELEC 242", "MECH 310", "BIOE 370", "CHBE 311"] },
      { icon: "book", name: "Weiss School of Natural Sciences", courses: ["CHEM 121", "PHYS 101", "BIOS 201", "MATH 212"] },
      { icon: "quote", name: "School of Humanities", courses: ["HIST 210", "ENGL 200", "PHIL 251", "POLI 200"] },
    ],
    professorCards: [
      { icon: "chart", title: "Jones Business & Finance", subtitle: "Case rigor with clean quantitative logic", bullets: ["Concise executive summaries tied to data and strategic recommendations.", "Spreadsheet-ready financial logic without filler paragraphs.", "Professional tone aligned with Jones case-competition standards."], footnote: "Jones graders reward precision. We keep analyses tight, sourced, and decision-ready." },
      { icon: "brain", title: "Brown Engineering & STEM", subtitle: "Lab clarity and reproducible methods", bullets: ["Structured lab reports with explicit methodology and results.", "Technical vocabulary appropriate for upper-level engineering courses.", "Clear figures, units, and error analysis where rubrics require them."], footnote: "Rice engineering faculty expect reproducible methods. We document every step so TAs can follow your logic." },
      { icon: "book", title: "Weiss Sciences & Humanities", subtitle: "Evidence-led writing across disciplines", bullets: ["Literature reviews that synthesize peer-reviewed sources, not summaries.", "APA or Chicago citations matched to department preferences.", "Original arguments that connect theory to current research debates."], footnote: "Whether in BIOS or HIST, Rice values depth. We build arguments that read like seminar-ready scholarship." },
    ],
    testimonials: [
      { id: "RICE-204", name: "Priya K.", major: "Finance", year: "Junior", rating: 5, course: "FINC 301", serviceUsed: "Case Analysis", semester: "Fall 2024", quote: "Two Jones assignments landed the same week. The writer structured the DCF and risk sections cleanly and kept the executive summary under one page. Exactly what my TA wanted." },
      { id: "RICE-517", name: "Marcus T.", major: "Bioengineering", year: "Sophomore", rating: 5, course: "BIOE 370", serviceUsed: "Lab Report", semester: "Spring 2024", quote: "My lab partner handled the bench work; I needed help on the write-up. Methods and discussion came back formatted to our rubric with clear figures." },
      { id: "RICE-339", name: "Elena R.", major: "History", year: "Senior", rating: 5, course: "HIST 210", serviceUsed: "Research Paper", semester: "Fall 2024", quote: "The paper wove primary and secondary sources in Chicago notes without sounding generic. I only tweaked the intro after review." },
    ],
    faqs: [
      { q: "Are your writers familiar with Rice's program-specific rubrics?", a: "Yes. We match Jones case formats, Brown engineering lab structures, and humanities citation styles with writers who have completed graduate work in those fields." },
      { q: "Can you help international students meet Rice's writing expectations?", a: "Absolutely. Rice admits a globally diverse cohort. Our editors polish grammar and flow while preserving your ideas and analytical voice." },
      { q: "Will my work pass Canvas and Turnitin at Rice?", a: "Every order is written from scratch from your prompt. We do not recycle banks or use AI drafts. You receive an original paper ready for integrity checks." },
      { q: "Do you handle urgent deadlines during midterms?", a: "Yes. We offer turnaround from 12 hours upward. Share your syllabus deadline and rubric so we can assign the right specialist immediately." },
    ],
    testimonialIds: "RICE",
  },
  {
    file: "texas-am-university.tsx",
    slug: "texas-am-university",
    prefix: "tamu",
    component: "TexasAMUniversity",
    shortCode: "TAMU",
    fullName: "Texas A&M University",
    heroTitle: "Texas A&M Essay & Assignment Help",
    location: "College Station, Texas",
    type: "Tier-One Public Research University",
    studentsLabel: "Trusted by Texas A&M Aggies",
    mascot: "Aggies",
    campusPhrase: "the Aggieland campus",
    qsRank: "#144",
    subjectStat: "#3",
    subjectCaption: "QS strength in petroleum and energy-related engineering fields",
    writersCaption: "Experts familiar with Mays, Engineering, and Liberal Arts expectations",
    trustChipWriters: "Mays & Engineering Alumni Writers",
    schools: ["Mays Business School", "College of Engineering", "College of Liberal Arts", "College of Agriculture and Life Sciences"],
    alertTitle: "College Station Semester Alert:",
    alertBody: "Texas A&M's large, research-driven campus means assignments stack quickly. From Mays analytics projects to engineering labs and liberal arts research papers, midterms in October and March get crowded. Book your writer early.",
    calendarEyebrow: "Texas A&M academic pulse",
    calendarSubtitle: "Stay ahead of Aggieland deadlines across Mays, Engineering, and core curriculum courses.",
    curriculumTitle: "Covering Aggieland's Major Colleges",
    curriculumSubtitle: "From Kyle Field to the engineering complex, we know what A&M professors expect.",
    professorTitle: "Built for A&M Research Standards",
    professorSubtitle: "As a top-150 global institution with massive R&D output, Texas A&M demands disciplined, well-sourced academic work.",
    servicesTitle: "Custom Support Built for Aggies",
    testimonialsEyebrow: "Aggies succeeding",
    testimonialsTitle: "What A&M Students Tell Us",
    testimonialsSubtitle: "Feedback from Aggies navigating Mays cases, engineering labs, and liberal arts seminars.",
    faqSubtitle: "Everything you need to know before placing your first order for Texas A&M coursework.",
    faqSupportHeading: "Stuck in the College Station Crunch?",
    faqSupportRole: "Texas Academic Advisor",
    bottomBadge: "Keep up with the Aggieland Pace",
    bottomCtaTitle: "Do not Let the A&M Semester Overwhelm You",
    bottomCtaSubtitle: "Thousands of Aggies use Essay Embassy when labs, cases, and research papers overlap. Protect your GPA during the busiest weeks.",
    seoTitle: "Texas A&M Essay Help | Texas A&M Assignment Writing Service",
    seoDescription: "Expert academic writing for Texas A&M students. Support for Mays business cases, College of Engineering labs, and liberal arts research papers in College Station.",
    description: "Academic writing support built for Texas A&M Aggies across Mays Business School, the College of Engineering, and Liberal Arts. From petroleum engineering problem sets to Mays case memos, our specialists understand College Station's tier-one public research standards.",
    primaryCta: "Get help for A&M coursework",
    departments: [
      { icon: "chart", name: "Mays Business School", courses: ["FINC 341", "MGMT 209", "ACCT 229", "ISTM 250"] },
      { icon: "brain", name: "College of Engineering", courses: ["ENGR 216", "MEEN 225", "ECEN 214", "PETE 310"] },
      { icon: "book", name: "College of Liberal Arts", courses: ["POLS 206", "ECON 202", "PSYC 107", "HIST 105"] },
      { icon: "users", name: "Agriculture & Life Sciences", courses: ["AGEC 105", "ANSC 107", "ENTO 201", "SCSC 301"] },
    ],
    professorCards: [
      { icon: "chart", title: "Mays Business Analytics", subtitle: "Data-backed cases with executive clarity", bullets: ["Financial and operations models tied to actionable recommendations.", "Professional formatting for case competitions and capstone presentations.", "Concise memos that respect strict page limits."], footnote: "Mays faculty expect quantified reasoning. We deliver analyses that read like real consulting work." },
      { icon: "brain", title: "Engineering & Petroleum STEM", subtitle: "Technical precision for lab and design courses", bullets: ["Step-by-step methodology with units, assumptions, and results tables.", "Industry-relevant vocabulary for energy and mechanical engineering tracks.", "IEEE-style or course-specific report structures on request."], footnote: "A&M's engineering strength shows up in rubrics. We document work so TAs can verify every calculation path." },
      { icon: "book", title: "Liberal Arts & Social Science", subtitle: "Argument-driven papers with solid citations", bullets: ["Thesis-led essays using peer-reviewed evidence.", "APA or MLA formatting aligned to department guides.", "Policy and economics papers that connect theory to current data."], footnote: "POLS and ECON courses reward clear claims supported by evidence—not broad summaries." },
    ],
    testimonials: [
      { id: "TAMU-204", name: "Jordan S.", major: "Petroleum Engineering", year: "Junior", rating: 5, course: "PETE 310", serviceUsed: "Technical Report", semester: "Fall 2024", quote: "Reserves calculations and discussion sections were due back-to-back. The writer organized assumptions and results exactly how our lab manual required." },
      { id: "TAMU-517", name: "Hannah L.", major: "Finance", year: "Sophomore", rating: 5, course: "FINC 341", serviceUsed: "Case Memo", semester: "Spring 2024", quote: "Mays cases are tight on page count. Got a clean memo with tables that matched the rubric and saved my weekend." },
      { id: "TAMU-339", name: "Diego M.", major: "Political Science", year: "Senior", rating: 5, course: "POLS 206", serviceUsed: "Research Paper", semester: "Fall 2024", quote: "Needed a strong thesis on institutional behavior. The draft cited current journals and flowed well after one revision." },
    ],
    faqs: [
      { q: "Do you understand Texas A&M's college-specific grading styles?", a: "Yes. We pair Mays business work, engineering labs, and liberal arts essays with writers who know each college's rubric differences." },
      { q: "Can you help with large enrollment core courses?", a: "Absolutely. High-enrollment POLS, ECON, and ENGR sections still have consistent rubrics. Send your prompt and we align to it." },
      { q: "Is the work original for Canvas submissions?", a: "All content is custom-written from your instructions. No essay banks, no AI-generated drafts." },
      { q: "Do you support graduate programs at A&M?", a: "Yes. We cover master's-level reports, theses chapters, and professional school writing with subject-matter experts." },
    ],
    testimonialIds: "TAMU",
  },
  {
    file: "university-southern-california.tsx",
    slug: "university-southern-california",
    prefix: "usc",
    component: "UniversitySouthernCalifornia",
    shortCode: "USC",
    fullName: "University of Southern California",
    heroTitle: "USC Essay & Assignment Help",
    location: "Los Angeles, California",
    type: "Leading Private Research University",
    studentsLabel: "Trusted by USC Trojans",
    mascot: "Trojans",
    campusPhrase: "the University Park campus",
    qsRank: "#146",
    subjectStat: "Top 50",
    subjectCaption: "Strong global visibility in communication, media, and business-related fields",
    writersCaption: "Experts familiar with Marshall, Viterbi, and Dornsife expectations",
    trustChipWriters: "Marshall & Viterbi Alumni Writers",
    schools: ["Marshall School of Business", "Viterbi School of Engineering", "Dornsife College of Letters, Arts and Sciences", "Annenberg School for Communication"],
    alertTitle: "Los Angeles Semester Alert:",
    alertBody: "USC's fast quarter-and-semester mix means overlapping deadlines. Marshall case decks, Viterbi labs, and Annenberg media analyses peak before finals. Secure a writer before syllabus week gets crowded.",
    calendarEyebrow: "USC academic pulse",
    calendarSubtitle: "Navigate LA's academic rhythm across Marshall, Viterbi, Dornsife, and Annenberg deadlines.",
    curriculumTitle: "Covering USC's Core Schools",
    curriculumSubtitle: "From University Park to health sciences corridors, we match USC faculty expectations.",
    professorTitle: "Built for USC's Competitive Standards",
    professorSubtitle: "With a top-150 QS global rank, USC expects polished, industry-aware academic work.",
    servicesTitle: "Custom Support Built for Trojans",
    testimonialsEyebrow: "Trojans succeeding",
    testimonialsTitle: "What USC Students Tell Us",
    testimonialsSubtitle: "Feedback from Trojans balancing Marshall cases, Viterbi projects, and Dornsife research.",
    faqSubtitle: "Everything you need to know before placing your first order for USC coursework.",
    faqSupportHeading: "Stuck in the LA Crunch?",
    faqSupportRole: "West Coast Academic Advisor",
    bottomBadge: "Keep up with the Trojan Semester Pace",
    bottomCtaTitle: "Do not Let the USC Semester Overwhelm You",
    bottomCtaSubtitle: "USC Trojans rely on Essay Embassy when internships, labs, and case work collide. Stay competitive without burning out.",
    seoTitle: "USC Essay Help | University of Southern California Assignment Writing",
    seoDescription: "Expert academic writing for USC students. Tailored support for Marshall business cases, Viterbi engineering labs, and Annenberg communication papers.",
    description: "Academic support tailored for USC Trojans across Marshall, Viterbi, Dornsife, and Annenberg. Whether you are building a venture pitch deck or writing a communication theory paper, our writers understand Los Angeles's high-expectation private-university culture.",
    primaryCta: "Get help for USC coursework",
    departments: [
      { icon: "chart", name: "Marshall School of Business", courses: ["BUAD 280", "FBE 401", "ACCT 410", "MKT 402"] },
      { icon: "brain", name: "Viterbi School of Engineering", courses: ["CSCI 103", "EE 101", "AME 201", "ISE 370"] },
      { icon: "quote", name: "Annenberg School for Communication", courses: ["COMM 206", "JOUR 350", "PR 351", "CMGT 310"] },
      { icon: "book", name: "Dornsife College", courses: ["ECON 203", "IR 210", "PSYC 100", "WRIT 150"] },
    ],
    professorCards: [
      { icon: "chart", title: "Marshall Strategy & Finance", subtitle: "Pitch-ready cases with LA industry context", bullets: ["Slide-ready case narratives with quantified market logic.", "Executive summaries that mirror consulting deliverables.", "Brand and venture analyses grounded in recent market data."], footnote: "Marshall rewards clarity and commercial realism. We write cases that feel boardroom-ready." },
      { icon: "brain", title: "Viterbi Engineering & CS", subtitle: "Technical depth for labs and design projects", bullets: ["Clean documentation for programming and systems assignments.", "Structured lab reports with test plans and results analysis.", "Appropriate technical tone for upper-division engineering courses."], footnote: "Viterbi TAs look for reproducible logic. We explain code, data, and design choices step by step." },
      { icon: "quote", title: "Annenberg Media & Communication", subtitle: "Theory-rich writing with professional polish", bullets: ["Media analysis papers linking theory to contemporary campaigns.", "APA-heavy research writing for communication and journalism courses.", "Argumentation beyond summary—clear claims and evidence chains."], footnote: "Annenberg sits in a global media capital. We connect coursework to real industry discourse." },
    ],
    testimonials: [
      { id: "USC-204", name: "Alyssa P.", major: "Business Administration", year: "Junior", rating: 5, course: "BUAD 280", serviceUsed: "Case Deck", semester: "Fall 2024", quote: "Marshall case night overlapped with a midterm. The writer delivered tight exhibits and a one-page executive summary that matched our grading sheet." },
      { id: "USC-517", name: "Kevin N.", major: "Computer Science", year: "Sophomore", rating: 5, course: "CSCI 103", serviceUsed: "Project Report", semester: "Spring 2024", quote: "Documentation was dragging my grade down. Got clear pseudocode explanations and test-case discussion that satisfied the TA rubric." },
      { id: "USC-339", name: "Mia C.", major: "Communication", year: "Senior", rating: 5, course: "COMM 206", serviceUsed: "Research Paper", semester: "Fall 2024", quote: "The paper integrated theory with current campaigns and stayed in perfect APA. Minimal edits before submission." },
    ],
    faqs: [
      { q: "Do you cover Marshall, Viterbi, and Annenberg formatting rules?", a: "Yes. We assign writers who know business case structures, engineering report standards, and communication research styles." },
      { q: "Can you help busy students balancing internships in LA?", a: "Many Trojans intern while studying. We handle urgent turnarounds so you can protect grades during busy weeks." },
      { q: "Will USC Canvas integrity tools flag your work?", a: "We deliver 100% original drafts from your prompt. No recycled content or AI-generated text." },
      { q: "Do you support WRIT 150 and Dornsife core classes?", a: "Absolutely. We help with argument structure, citation, and revision for writing-intensive Dornsife requirements." },
    ],
    testimonialIds: "USC",
  },
  {
    file: "michigan-state-university.tsx",
    slug: "michigan-state-university",
    prefix: "msu",
    component: "MichiganStateUniversity",
    shortCode: "MSU",
    fullName: "Michigan State University",
    heroTitle: "Michigan State Essay & Assignment Help",
    location: "East Lansing, Michigan",
    type: "Major Public Research University",
    studentsLabel: "Trusted by MSU Spartans",
    mascot: "Spartans",
    campusPhrase: "the East Lansing campus",
    qsRank: "#161",
    subjectStat: "Top 200",
    subjectCaption: "Broad research strength across business, agriculture, and social sciences",
    writersCaption: "Experts familiar with Broad, Engineering, and Social Science expectations",
    trustChipWriters: "Broad & Engineering Alumni Writers",
    schools: ["Broad College of Business", "College of Engineering", "College of Social Science", "College of Arts & Letters"],
    alertTitle: "East Lansing Semester Alert:",
    alertBody: "MSU's semester calendar stacks labs, social science research papers, and Broad group projects before October and April finals. Reserve capacity before Spartan midterms spike demand.",
    calendarEyebrow: "MSU academic pulse",
    calendarSubtitle: "Plan for East Lansing crunch weeks across Broad, Engineering, and core university courses.",
    curriculumTitle: "Covering Spartan Academic Units",
    curriculumSubtitle: "From the Red Cedar to STEM complexes, we align with MSU grading culture.",
    professorTitle: "Built for MSU's Research-Forward Standards",
    professorSubtitle: "As a top-170 global public university, MSU expects evidence-based writing across disciplines.",
    servicesTitle: "Custom Support Built for Spartans",
    testimonialsEyebrow: "Spartans succeeding",
    testimonialsTitle: "What MSU Students Tell Us",
    testimonialsSubtitle: "Feedback from Spartans managing Broad cases, engineering labs, and social science essays.",
    faqSubtitle: "Everything you need to know before placing your first order for MSU coursework.",
    faqSupportHeading: "Stuck in the East Lansing Crunch?",
    faqSupportRole: "Midwest Academic Advisor",
    bottomBadge: "Keep up with the Spartan Semester Pace",
    bottomCtaTitle: "Do not Let the MSU Semester Overwhelm You",
    bottomCtaSubtitle: "Spartans trust Essay Embassy when group projects, labs, and seminars overlap. Keep your semester under control.",
    seoTitle: "Michigan State Essay Help | MSU Assignment Writing Service",
    seoDescription: "Expert academic writing for Michigan State students. Support for Broad business cases, engineering labs, and social science research in East Lansing.",
    description: "Writing support for Michigan State Spartans across Broad College of Business, the College of Engineering, and Social Science. From supply-chain case studies to psychology literature reviews, we match East Lansing's research-intensive public university standards.",
    primaryCta: "Get help for MSU coursework",
    departments: [
      { icon: "chart", name: "Broad College of Business", courses: ["FI 320", "MKT 327", "SCM 303", "ACC 201"] },
      { icon: "brain", name: "College of Engineering", courses: ["CE 221", "ECE 201", "ME 222", "CSE 231"] },
      { icon: "users", name: "College of Social Science", courses: ["EC 201", "PSY 101", "SOC 100", "PLS 100"] },
      { icon: "book", name: "College of Arts & Letters", courses: ["IAH 201", "ENG 280", "PHL 200", "HST 202"] },
    ],
    professorCards: [
      { icon: "chart", title: "Broad Business & Supply Chain", subtitle: "Operations-aware case writing", bullets: ["Supply-chain and marketing cases with quantified recommendations.", "Group-project ready sections you can integrate with team slides.", "Professional tone for capstone and internship-semester workloads."], footnote: "Broad courses often blend theory with real operations data. We keep analyses practical and sourced." },
      { icon: "brain", title: "Engineering & Computer Science", subtitle: "Structured technical submissions", bullets: ["Lab reports with explicit procedures, data tables, and discussion.", "Programming documentation that satisfies CSE rubrics.", "Safety and ethics sections included when assignments require them."], footnote: "MSU engineering TAs grade methodology strictly. We make your process auditable." },
      { icon: "users", title: "Social Science & Arts", subtitle: "Evidence-led arguments in APA", bullets: ["Psychology and sociology papers grounded in peer-reviewed studies.", "Policy essays connecting PLS concepts to current events.", "Humanities papers with thesis clarity and proper citation styles."], footnote: "Social science faculty want claims supported by literature—not opinion paragraphs." },
    ],
    testimonials: [
      { id: "MSU-204", name: "Rachel B.", major: "Supply Chain Management", year: "Junior", rating: 5, course: "SCM 303", serviceUsed: "Case Study", semester: "Fall 2024", quote: "Our group needed a clean operations analysis fast. The writer delivered tables and recommendations we dropped straight into our deck." },
      { id: "MSU-517", name: "Omar H.", major: "Computer Science", year: "Sophomore", rating: 5, course: "CSE 231", serviceUsed: "Project Write-up", semester: "Spring 2024", quote: "Project report was due with code. Documentation and test discussion matched the rubric perfectly." },
      { id: "MSU-339", name: "Grace T.", major: "Psychology", year: "Senior", rating: 5, course: "PSY 101", serviceUsed: "Literature Review", semester: "Fall 2024", quote: "Needed APA sources on cognitive bias studies. The draft was well-organized and needed only minor edits." },
    ],
    faqs: [
      { q: "Are writers familiar with MSU's Broad and engineering rubrics?", a: "Yes. We route business cases, lab reports, and social science papers to specialists who know MSU's common assignment formats." },
      { q: "Can you help with IAH and university integrative studies?", a: "We support writing-intensive IAH and ISS courses with clear thesis development and citation cleanup." },
      { q: "Is work safe for D2L and Turnitin?", a: "All papers are original and written from your prompt. We never reuse prior student work." },
      { q: "Do you handle winter-semester compressed timelines?", a: "Yes. Shorter terms mean tighter deadlines—we offer expedited delivery when you need it." },
    ],
    testimonialIds: "MSU",
  },
  {
    file: "arizona-state-university.tsx",
    slug: "arizona-state-university",
    prefix: "asu",
    component: "ArizonaStateUniversity",
    shortCode: "ASU",
    fullName: "Arizona State University",
    heroTitle: "ASU Essay & Assignment Help",
    location: "Tempe, Arizona",
    type: "Innovation-Focused Public Research University",
    studentsLabel: "Trusted by ASU Sun Devils",
    mascot: "Sun Devils",
    campusPhrase: "the Tempe and metro campuses",
    qsRank: "=173",
    subjectStat: "95.2",
    subjectCaption: "High QS score in international research network collaboration",
    writersCaption: "Experts familiar with W. P. Carey, Fulton Engineering, and Cronkite expectations",
    trustChipWriters: "Carey & Fulton Alumni Writers",
    schools: ["W. P. Carey School of Business", "Ira A. Fulton Schools of Engineering", "College of Liberal Arts and Sciences", "Walter Cronkite School of Journalism"],
    alertTitle: "Tempe Semester Pace Alert:",
    alertBody: "ASU's multi-campus system moves quickly. Carey analytics projects, Fulton design labs, and Cronkite reporting deadlines often overlap before session finals. Book early during October and April peaks.",
    calendarEyebrow: "ASU academic pulse",
    calendarSubtitle: "Stay ahead of Sun Devil deadlines across Carey, Fulton, CLAS, and Cronkite.",
    curriculumTitle: "Covering ASU's Innovation Ecosystem",
    curriculumSubtitle: "From Tempe to downtown Phoenix hubs, we match ASU's interdisciplinary expectations.",
    professorTitle: "Built for ASU's Scale and Innovation",
    professorSubtitle: "With rising global QS standing and major online-plus-campus enrollment, ASU demands flexible, high-quality academic work.",
    servicesTitle: "Custom Support Built for Sun Devils",
    testimonialsEyebrow: "Sun Devils succeeding",
    testimonialsTitle: "What ASU Students Tell Us",
    testimonialsSubtitle: "Feedback from Sun Devils balancing Carey cases, Fulton labs, and Cronkite assignments.",
    faqSubtitle: "Everything you need to know before placing your first order for ASU coursework.",
    faqSupportHeading: "Stuck in the Tempe Crunch?",
    faqSupportRole: "Southwest Academic Advisor",
    bottomBadge: "Keep up with the Sun Devil Semester Pace",
    bottomCtaTitle: "Do not Let the ASU Semester Overwhelm You",
    bottomCtaSubtitle: "Sun Devils use Essay Embassy when innovation projects, labs, and media assignments stack up. Protect your GPA through peak weeks.",
    seoTitle: "ASU Essay Help | Arizona State University Assignment Writing",
    seoDescription: "Expert academic writing for ASU students. Tailored support for W. P. Carey business cases, Fulton engineering labs, and Cronkite journalism assignments.",
    description: "Academic writing for Arizona State Sun Devils across W. P. Carey, Ira A. Fulton Engineering, Liberal Arts and Sciences, and Cronkite journalism. From sustainability case studies to software engineering documentation, we align with ASU's innovation-driven, multi-campus model.",
    primaryCta: "Get help for ASU coursework",
    departments: [
      { icon: "chart", name: "W. P. Carey School of Business", courses: ["ACC 231", "FIN 300", "MKT 400", "SCM 300"] },
      { icon: "brain", name: "Ira A. Fulton Schools of Engineering", courses: ["CSE 110", "EEE 202", "MAE 214", "BME 350"] },
      { icon: "quote", name: "Walter Cronkite School", courses: ["JMC 101", "JMC 201", "PR 371", "MED 394"] },
      { icon: "book", name: "College of Liberal Arts and Sciences", courses: ["PSY 101", "POS 110", "BIO 181", "ENG 101"] },
    ],
    professorCards: [
      { icon: "chart", title: "Carey Business & Analytics", subtitle: "Data-informed cases with clean visuals", bullets: ["Analytics memos with charts tied to clear recommendations.", "Marketing and finance assignments aligned to Carey rubrics.", "Concise writing for high-enrollment online and in-person sections."], footnote: "Carey emphasizes measurable outcomes. We connect data to decisions without filler." },
      { icon: "brain", title: "Fulton Engineering & Computing", subtitle: "Build-ready documentation", bullets: ["Software project reports with architecture and testing sections.", "Engineering labs with assumptions, calculations, and results.", "Technical tone suitable for Fulton upper-division courses."], footnote: "Fulton projects often grade process as heavily as outcomes. We document both thoroughly." },
      { icon: "quote", title: "Cronkite Journalism & Media", subtitle: "AP-aware reporting and analysis", bullets: ["News writing with tight ledes and verified sourcing.", "Media criticism essays linking industry trends to theory.", "PR plans with audience segmentation and measurable KPIs."], footnote: "Cronkite faculty expect publishable clarity. We edit for structure, accuracy, and style." },
    ],
    testimonials: [
      { id: "ASU-204", name: "Tyler J.", major: "Marketing", year: "Junior", rating: 5, course: "MKT 400", serviceUsed: "Campaign Plan", semester: "Fall 2024", quote: "Carey group project needed a credible media plan fast. The writer delivered audience insights and KPIs we used directly in our presentation." },
      { id: "ASU-517", name: "Sofia L.", major: "Computer Science", year: "Sophomore", rating: 5, course: "CSE 110", serviceUsed: "Project Documentation", semester: "Spring 2024", quote: "Coding was fine but the write-up was weak. Got clear testing and architecture sections that boosted my grade." },
      { id: "ASU-339", name: "Noah R.", major: "Journalism", year: "Senior", rating: 5, course: "JMC 201", serviceUsed: "Feature Article", semester: "Fall 2024", quote: "Cronkite standards are strict on sourcing. The draft had clean structure and quotes placeholders I filled after interviews." },
    ],
    faqs: [
      { q: "Do you support ASU Online and in-person courses?", a: "Yes. Rubrics are often shared across modalities. Send your prompt and we match the same quality standards." },
      { q: "Can you help with sustainability and innovation-themed assignments?", a: "ASU emphasizes innovation. We incorporate current sustainability and policy sources when your brief requires them." },
      { q: "Will Canvas originality checks pass?", a: "We write from scratch only. No databases, no AI text, no recycled student papers." },
      { q: "Do you handle Fulton coding plus report bundles?", a: "Absolutely. We can deliver code explanations and formal reports in one coordinated package." },
    ],
    testimonialIds: "ASU",
  },
  {
    file: "emory-university.tsx",
    slug: "emory-university",
    prefix: "emory",
    component: "EmoryUniversity",
    shortCode: "EMORY",
    fullName: "Emory University",
    heroTitle: "Emory University Essay & Assignment Help",
    location: "Atlanta, Georgia",
    type: "Leading Private Research University",
    studentsLabel: "Trusted by Emory students",
    mascot: "students",
    campusPhrase: "the Atlanta campus",
    qsRank: "#182",
    subjectStat: "Top 200",
    subjectCaption: "Strong health sciences, business, and liberal arts research profile",
    writersCaption: "Experts familiar with Goizueta, Emory College, and Rollins expectations",
    trustChipWriters: "Goizueta & Pre-Health Alumni Writers",
    schools: ["Goizueta Business School", "Emory College of Arts and Sciences", "Rollins School of Public Health", "Nell Hodgson School of Nursing"],
    alertTitle: "Atlanta Semester Alert:",
    alertBody: "Emory's pre-health and business tracks pile on writing during midterms. Goizueta case memos, public health policy briefs, and Emory College seminar papers converge in October and November. Reserve a specialist early.",
    calendarEyebrow: "Emory academic pulse",
    calendarSubtitle: "Navigate Atlanta deadline peaks across Goizueta, Emory College, and health sciences programs.",
    curriculumTitle: "Covering Emory's Academic Schools",
    curriculumSubtitle: "From the Quad to health sciences corridors, we match Emory's rigorous private-university standards.",
    professorTitle: "Built for Emory's Selective Standards",
    professorSubtitle: "With a top-200 global QS rank and elite pre-professional pathways, Emory expects precise, well-argued academic work.",
    servicesTitle: "Custom Support Built for Emory Students",
    testimonialsEyebrow: "Emory students succeeding",
    testimonialsTitle: "What Emory Students Tell Us",
    testimonialsSubtitle: "Feedback from students balancing Goizueta cases, seminar papers, and health sciences coursework.",
    faqSubtitle: "Everything you need to know before placing your first order for Emory coursework.",
    faqSupportHeading: "Stuck in the Atlanta Crunch?",
    faqSupportRole: "Southeast Academic Advisor",
    bottomBadge: "Keep up with the Emory Semester Pace",
    bottomCtaTitle: "Do not Let the Emory Semester Overwhelm You",
    bottomCtaSubtitle: "Emory students trust Essay Embassy when pre-health labs, business cases, and seminar essays overlap. Stay on track through the busiest weeks.",
    seoTitle: "Emory University Essay Help | Emory Assignment Writing Service",
    seoDescription: "Expert academic writing for Emory students. Support for Goizueta business cases, Emory College seminars, and Rollins public health assignments in Atlanta.",
    description: "Academic writing support for Emory students across Goizueta Business School, Emory College of Arts and Sciences, and Rollins public health programs. From ethics-heavy seminar essays to analytics cases and epidemiology briefs, we understand Atlanta's selective private-university expectations.",
    primaryCta: "Get help for Emory coursework",
    departments: [
      { icon: "chart", name: "Goizueta Business School", courses: ["BUS 350", "FIN 320", "MKT 340", "ISOM 350"] },
      { icon: "book", name: "Emory College of Arts and Sciences", courses: ["ANT 101", "QTM 100", "PHIL 115", "HIST 101"] },
      { icon: "stethoscope", name: "Rollins School of Public Health", courses: ["EPHD 504", "BSHE 500", "GH 500", "BIOS 500"] },
      { icon: "users", name: "Nell Hodgson School of Nursing", courses: ["NRSG 201", "NRSG 305", "NRSG 410", "NRSG 420"] },
    ],
    professorCards: [
      { icon: "chart", title: "Goizueta Cases & Analytics", subtitle: "Ethics-aware business writing", bullets: ["Case memos with defensible quantitative assumptions.", "Marketing and finance analyses formatted for Goizueta rubrics.", "Professional tone suitable for BBA and pre-MBA pathways."], footnote: "Goizueta integrates ethics into analytics. We balance numbers with responsible recommendations." },
      { icon: "book", title: "Emory College Seminars", subtitle: "Humanities and QTM rigor", bullets: ["Seminar essays with close reading and theoretical framing.", "QTM assignments with clean statistical interpretation.", "Chicago or APA citations depending on department guidance."], footnote: "Emory College seminars grade argument depth. We build thesis-driven papers, not plot summaries." },
      { icon: "stethoscope", title: "Public Health & Nursing", subtitle: "Evidence-based health writing", bullets: ["Policy briefs citing peer-reviewed epidemiology and behavior science.", "Clinical reflection papers aligned to nursing rubrics.", "Structured IMRaD-style reports when courses require them."], footnote: "Health sciences faculty expect current literature and precise terminology. We deliver both." },
    ],
    testimonials: [
      { id: "EMORY-204", name: "Lauren G.", major: "Business", year: "Junior", rating: 5, course: "BUS 350", serviceUsed: "Case Memo", semester: "Fall 2024", quote: "Goizueta case week collided with recruiting events. The memo was concise, ethical, and data-backed—exactly what the rubric asked for." },
      { id: "EMORY-517", name: "Samuel D.", major: "Public Health", year: "Graduate", rating: 5, course: "EPHD 504", serviceUsed: "Policy Brief", semester: "Spring 2024", quote: "Needed epidemiology sources for a population health brief. The writer cited recent studies and structured recommendations clearly." },
      { id: "EMORY-339", name: "Isabella F.", major: "Nursing", year: "Senior", rating: 5, course: "NRSG 410", serviceUsed: "Clinical Paper", semester: "Fall 2024", quote: "Clinical reflection required APA and patient-privacy care. The draft was thoughtful and needed only light personalization." },
    ],
    faqs: [
      { q: "Do you support Goizueta and pre-health writing simultaneously?", a: "Yes. We assign business specialists and health sciences writers based on your course code and rubric." },
      { q: "Can you help Emory College seminar and QTM courses?", a: "We cover humanities seminars and quantitative methods assignments with discipline-appropriate structure." },
      { q: "Is work original for Emory's honor code expectations?", a: "All drafts are custom-written from your instructions with no recycled or AI-generated content." },
      { q: "Do you handle Rollins graduate-level briefs?", a: "Yes. Graduate public health assignments receive writers with relevant postgraduate training." },
    ],
    testimonialIds: "EMORY",
  },
  ...batch2Colleges,
  ...batch3Colleges,
  ...batch4Colleges,
];

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function genData(c) {
  const p = c.prefix;
  const deptBlocks = c.departments
    .map(
      (d) => `  {
    icon: "${d.icon}",
    name: "${esc(d.name)}",
    courses: [${d.courses.map((x) => `"${x}"`).join(", ")}],
  }`
    )
    .join(",\n");

  const profBlocks = c.professorCards
    .map(
      (card) => `  {
    icon: "${card.icon}",
    title: "${esc(card.title)}",
    subtitle: "${esc(card.subtitle)}",
    bullets: [
      "${esc(card.bullets[0])}",
      "${esc(card.bullets[1])}",
      "${esc(card.bullets[2])}",
    ],
    footnote: "${esc(card.footnote)}",
  }`
    )
    .join(",\n");

  const testBlocks = c.testimonials
    .map(
      (t) => `  {
    id: "${t.id}",
    name: "${t.name}",
    major: "${t.major}",
    year: "${t.year}",
    rating: ${t.rating},
    course: "${t.course}",
    serviceUsed: "${t.serviceUsed}",
    semester: "${t.semester}",
    quote: "${esc(t.quote)}",
  }`
    )
    .join(",\n");

  const faqBlocks = c.faqs
    .map(
      (f) => `  {
    question: "${esc(f.q)}",
    answer: "${esc(f.a)}",
  }`
    )
    .join(",\n");

  const school1 = c.schools[0];
  const school2 = c.schools[1];
  const school3 = c.schools[2];

  return `// ==========================================
// TAILORED DATA (${c.fullName.toUpperCase()})
// ==========================================

export const ${p}CollegeData: CollegeData = {
  breadcrumb: {
    rootHref: "/",
    collegesHref: "/colleges",
    collegesLabel: "Colleges",
  },
  fullName: "${esc(c.fullName)}",
  shortCode: "${c.shortCode}",
  heroTitle: "${esc(c.heroTitle)}",
  location: "${esc(c.location)}",
  type: "${esc(c.type)}",
  studentsLabel: "${esc(c.studentsLabel)}",
  description:
    "${esc(c.description)}",
  cta: {
    primary: { href: "/order-now", label: "${esc(c.primaryCta)}" },
    secondary: { href: "/writers", label: "Browse expert writers" },
  },
  trustChips: [
    { icon: "check", label: "Strictly Original Writing" },
    { icon: "clock", label: "12-Hour Urgent Turnarounds" },
    { icon: "star", label: "${esc(c.trustChipWriters)}" },
    { icon: "lock", label: "Fully Confidential" },
  ],
};

export const ${p}Stats: StatCard[] = [
  {
    icon: "award",
    label: "QS World Ranking",
    value: "${c.qsRank}",
    caption: "Global ranking for 2026",
  },
  {
    icon: "bars",
    label: "Top Ranked Subjects",
    value: "${c.subjectStat}",
    caption: "${esc(c.subjectCaption)}",
  },
  {
    icon: "users",
    label: "Specialized writers",
    value: "150+",
    caption: "${esc(c.writersCaption)}",
  },
  {
    icon: "dollar",
    label: "Per-page pricing",
    value: "$14.50",
    caption: "Transparent rate, premium academic standards",
  },
];

export const ${p}Alert: AlertBanner = {
  title: "${esc(c.alertTitle)}",
  body: "${esc(c.alertBody)}",
};

export const ${p}CalendarPeriods: CalendarPeriod[] = [
  {
    accent: "red",
    range: "OCT WEEK 6-8",
    title: "Fall Midterms",
    body: "Core curriculum papers, ${esc(school3)} assignments, and ${esc(school2)} lab milestones converge before Halloween.",
    tag: { tone: "red", label: "Book Ahead" },
  },
  {
    accent: "amber",
    range: "DEC WEEK 13-15",
    title: "Fall Finals",
    body: "Cumulative exams, research papers, and final projects stack in early December across ${esc(c.campusPhrase)}.",
    tag: { tone: "amber", label: "High Volume" },
  },
  {
    accent: "blue",
    range: "MAR WEEK 7-8",
    title: "Spring Midterms",
    body: "Spring pressure peaks with seminar essays, STEM problem sets, and ${esc(school1)} group evaluations.",
  },
  {
    accent: "rose",
    range: "MAY WEEK 14-15",
    title: "Finals & Capstones",
    body: "${esc(school2)} capstones, ${esc(school1)} presentations, and comprehensive theses are due. Writer demand peaks.",
    tag: { tone: "rose", label: "Thesis Rush" },
  },
];

export const ${p}Departments: Department[] = [
${deptBlocks}
];

export const ${p}ProfessorCards: ProfessorIntel[] = [
${profBlocks}
];

export const ${p}ServiceCards: ServiceCard[] = [
  {
    id: "essay",
    icon: "doc",
    title: "Essay Writing Help",
    body: "Professional essay writing across all types from argumentative to analytical and reflective. APA, MLA, and Chicago formatting available.",
    cta: "Browse essay types",
    href: "/essay-writing",
    badge: "Most ordered",
  },
  {
    id: "assignment",
    icon: "clipboard",
    title: "Assignment Help",
    body: "Comprehensive assignment writing support for all subjects including management, math, humanities, and engineering. Expert writers for every discipline.",
    cta: "Get assignment help",
    href: "/assignment-help",
  },
  {
    id: "research",
    icon: "search",
    title: "Research Paper Help",
    body: "In-depth research papers spanning STEM, humanities, communication, and business. Properly sourced, cited, and formatted to your institution's standards.",
    cta: "Order research paper",
    href: "/paper-writing-services",
  },
  {
    id: "thesis",
    icon: "book",
    title: "Thesis Writing Help",
    body: "From proposal to final chapter. We offer structured thesis support for undergraduate honors, master's, and graduate-level projects across all disciplines.",
    cta: "Start your thesis",
    href: "/thesis-writing-services",
  },
  {
    id: "dissertation",
    icon: "diploma",
    title: "Dissertation Writing Help",
    body: "Comprehensive dissertation support from conceptualization through defense preparation. Expert writers with doctoral experience in your field.",
    cta: "Get dissertation help",
    href: "/dissertation-writing-services",
  },
];

export const ${p}SampleTestimonials: CollegeTestimonial[] = [
${testBlocks}
];

export const ${p}SampleFaq: FaqItem[] = [
${faqBlocks}
];

export const ${p}SampleFaqSupport: FaqSupportCard = {
  heading: "${esc(c.faqSupportHeading)}",
  name: "Marcus",
  role: "${esc(c.faqSupportRole)}",
  imageSrc: "/images/writers/Marcus-East-Coast.jpg",
  imageAlt: "Marcus, ${esc(c.faqSupportRole)}",
  contactHref: "/contact",
  contactLabel: "Chat about your assignment",
};

export const ${p}SampleBottomCta: BottomCtaData = {
  title: "${esc(c.bottomCtaTitle)}",
  subtitle: "${esc(c.bottomCtaSubtitle)}",
  primary: { href: "/order-now", label: "Get your quote now" },
  secondary: { href: "/samples", label: "View writing samples" },
  trustLine: "Pay only when the final draft meets your course requirements.",
};

// ==========================================
// PAGE COMPONENT EXPORT
// ==========================================

export default function ${c.component}() {
  return (
    <>
      <title>${esc(c.seoTitle)}</title>
      <meta
        name="description"
        content="${esc(c.seoDescription)}"
      />
      <link
        rel="canonical"
        href="https://essayembassy.com/colleges/${c.slug}/"
      />

      <motion.div className="college-page min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20 sm:pb-28">
          <Hero data={${p}CollegeData} />
          <Stats stats={${p}Stats} />
          <Alert data={${p}Alert} />
          <CalendarSection
            eyebrow="${esc(c.calendarEyebrow)}"
            title="When the Semester Pressure Builds"
            subtitle="${esc(c.calendarSubtitle)}"
            periods={${p}CalendarPeriods}
          />
          <Curriculum
            eyebrow="School-Specific Knowledge"
            title="${esc(c.curriculumTitle)}"
            subtitle="${esc(c.curriculumSubtitle)}"
            departments={${p}Departments}
          />
          <ProfessorIntelligence
            eyebrow="Faculty & TA expectations"
            title="${esc(c.professorTitle)}"
            subtitle="${esc(c.professorSubtitle)}"
            cards={${p}ProfessorCards}
          />
          <Services
            eyebrow="Expert academic solutions"
            title="${esc(c.servicesTitle)}"
            subtitle="Whatever your program demands, drop your prompt, set your deadline, and lock in your grade."
            cards={${p}ServiceCards}
          />
          <Testimonials
            eyebrow="${esc(c.testimonialsEyebrow)}"
            title="${esc(c.testimonialsTitle)}"
            subtitle="${esc(c.testimonialsSubtitle)}"
            items={${p}SampleTestimonials}
          />
          <Faq
            eyebrow="Common questions"
            title="Trust & Safety Protocols"
            subtitle="${esc(c.faqSubtitle)}"
            items={${p}SampleFaq}
            support={${p}SampleFaqSupport}
          />
          <BottomCta data={${p}SampleBottomCta} />
        </div>
      </motion.div>
    </>
  );
}
`;
}

const base = componentBlock.replace(
  "Keep up with the Forty Acres Pace",
  "{{BOTTOM_BADGE}}"
);

const targetSlugs = process.argv.slice(2);
const toGenerate = targetSlugs.length
  ? colleges.filter((c) => targetSlugs.includes(c.slug))
  : colleges;

if (targetSlugs.length && toGenerate.length !== targetSlugs.length) {
  const found = new Set(toGenerate.map((c) => c.slug));
  const missing = targetSlugs.filter((s) => !found.has(s));
  console.warn("Unknown slugs skipped:", missing.join(", "));
}

for (const college of toGenerate) {
  const merged = mergeCollegeWithVerified(college);
  const badge = merged.bottomBadge;
  const body =
    base.replace("{{BOTTOM_BADGE}}", badge) + genData(merged);
  const outPath = path.join(outDir, college.file);
  fs.writeFileSync(outPath, body, "utf8");
  console.log("Wrote", outPath);
}

console.log("Done:", toGenerate.length, "college pages");
