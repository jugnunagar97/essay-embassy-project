// src/data/blogData.ts

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
}

// We can add more posts here later
export const blogPosts: Post[] = [
  {
    slug: 'how-to-write-an-effective-essay-introduction',
    title: 'How to Write an Effective Essay Introduction',
    excerpt: 'Learn the key elements of a strong essay introduction that captures attention and sets the tone for your entire paper.',
    content: `An essay's introduction is its most important paragraph. It sets the stage for your entire argument and is your one chance to make a strong first impression on your reader. A great introduction does three things: it hooks the reader, provides necessary background information, and presents a clear, debatable thesis statement.\n\nThe "hook" is the opening sentence, designed to grab your reader's attention. This could be a surprising statistic, a provocative question, or a compelling anecdote. Following the hook, you should provide a few sentences of context to orient your reader to the topic. Finally, the thesis statement is the core of your introduction. It is a single sentence that clearly states the main argument you will prove in your essay. Mastering these three elements is the key to writing an effective and powerful introduction.`,
    image: 'https://images.pexels.com/photos/159844/pencil-office-design-creative-159844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Dr. Emily Carter',
    authorAvatar: 'https://placehold.co/100x100/EBF4FF/134e4a?text=EC',
    date: 'July 04, 2025',
    readTime: '5 min read',
    category: 'Essay Help',
  },
  {
    slug: 'research-methods-for-academic-papers',
    title: 'Research Methods for Academic Papers',
    excerpt: 'Discover proven research methods to strengthen your academic writing and create compelling, well-supported arguments.',
    content: `Strong academic papers are built on a foundation of solid research. The methods you choose to gather and analyze information will directly impact the credibility and strength of your arguments. There are two primary categories of research methods: qualitative and quantitative. Quantitative research involves numerical data and statistical analysis, often used in the sciences and social sciences to test hypotheses. Qualitative research, on the other hand, involves non-numerical data, such as interviews, observations, and textual analysis, and is common in the humanities.\n\nChoosing the right method depends on your research question. It's also crucial to use credible, peer-reviewed sources like academic journals and scholarly books. Properly citing these sources using styles like APA, MLA, or Chicago is not just a requirement but a way of engaging in the academic conversation. By mastering these research methods, you can ensure your papers are well-supported, credible, and contribute meaningfully to your field.`,
    image: 'https://images.pexels.com/photos/159832/books-book-pages-read-literature-159832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Noah V.',
    authorAvatar: 'https://placehold.co/100x100/EBF4FF/134e4a?text=NV',
    date: 'July 01, 2025',
    readTime: '7 min read',
    category: 'How-To Guides',
  },
  {
    slug: 'citation-styles-guide-apa-mla-chicago',
    title: 'Citation Styles Guide: APA vs MLA vs Chicago',
    excerpt: 'A comprehensive guide to the most common citation styles used in academic writing, with examples and best practices.',
    content: `Proper citation is a cornerstone of academic integrity. It acknowledges the work of other researchers and allows your reader to trace your sources. The three most common citation styles are APA (American Psychological Association), MLA (Modern Language Association), and Chicago (or Turabian). APA style is typically used in the social sciences and emphasizes the date of publication. MLA is common in the humanities and focuses on the author. Chicago style offers two systems: a notes-bibliography system popular in history and the arts, and an author-date system used in the sciences.\n\nWhile they share the goal of crediting sources, their formatting for in-text citations and reference lists differs significantly. The key to success is consistency. Always check your assignment guidelines to see which style your professor requires and follow it meticulously. Using citation management tools like Zotero or EndNote can also help you keep your sources organized and formatted correctly.`,
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Isabel T.',
    authorAvatar: 'https://placehold.co/100x100/EBF4FF/134e4a?text=IT',
    date: 'June 28, 2025',
    readTime: '6 min read',
    category: 'Citations',
  },
  {
    slug: 'understanding-your-assignment-prompt',
    title: 'How to Deconstruct and Understand Any Assignment Prompt',
    excerpt: 'Breaking down your professor\'s instructions is the first step to writing an A-grade paper. Learn how to analyze any prompt effectively.',
    content: `Before you can write a great paper, you must first understand the question. Assignment prompts can often be dense and complex, filled with keywords and specific instructions. The first step is to read the prompt multiple times. On the first pass, get a general sense of the topic. On the second pass, start highlighting keywords and action verbs like "analyze," "compare," "contrast," or "evaluate." These verbs tell you exactly what you need to do.\n\nNext, break down the prompt into smaller questions. If the prompt asks you to "analyze the economic and social impacts of a historical event," you have two main tasks: discuss the economic impacts, and discuss the social impacts. Creating a simple outline based on these smaller questions will provide a roadmap for your entire paper, ensuring you address every part of the prompt and stay on track.`,
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Dr. Emily Carter',
    authorAvatar: 'https://placehold.co/100x100/EBF4FF/134e4a?text=EC',
    date: 'June 25, 2025',
    readTime: '4 min read',
    category: 'How-To Guides',
  },
];