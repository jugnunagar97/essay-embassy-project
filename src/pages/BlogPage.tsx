import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, Post } from '../data/blogData';
import { Calendar, Clock } from 'lucide-react'; // 'Tag' import removed

// ==================================================================================
// === REUSABLE SUB-COMPONENTS ===
// ==================================================================================

const BlogCard: React.FC<{ post: Post }> = ({ post }) => (
  <article className="bg-white dark:bg-secondary-800 rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 dark:border-secondary-700 hover:transform hover:-translate-y-1 animate-slide-up hover:scale-105">
    <Link to={`/blog/${post.slug}`}>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
      />
    </Link>
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span className="text-primary-500 font-semibold">{post.category}</span>
      </div>
      <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 hover:text-primary-500 transition-colors flex-grow">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="text-muted mb-4">{post.excerpt}</p>
      <div className="flex items-center text-sm text-muted mt-auto border-t border-secondary-200 dark:border-secondary-700 pt-4">
        <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-secondary-700 dark:text-secondary-300">{post.author}</p>
          <div className="flex items-center space-x-3">
            <span className="flex items-center"><Calendar size={14} className="mr-1" />{post.date}</span>
            <span className="flex items-center"><Clock size={14} className="mr-1" />{post.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
);


// ==================================================================================
// === MAIN BLOG PAGE COMPONENT ===
// ==================================================================================

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const allCategories = blogPosts.map(post => post.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogPosts;
    }
    return blogPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      <section className="bg-secondary-50 dark:bg-secondary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white my-4">The Essay Embassy Blog</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">Tips, insights, and advice to help you on your academic journey.</p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-8 border-b border-secondary-200 dark:border-secondary-700 sticky top-16 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm z-30">
        <div className="container">
            <div className="flex items-center justify-center flex-wrap gap-3">
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                            selectedCategory === category 
                            ? 'bg-primary-500 text-white shadow-md' 
                            : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
      </section>

      <section className="section container">
        {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-secondary-800 dark:text-secondary-200">No posts found</h3>
                <p className="text-muted mt-2">There are no blog posts in the "{selectedCategory}" category yet.</p>
            </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;