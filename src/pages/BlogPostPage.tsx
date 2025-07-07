import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    // If no post is found for the slug, redirect to the main blog page
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="animate-fade-in bg-white dark:bg-secondary-900">
      <div className="container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold">
              <ArrowLeft size={16} className="mr-2" />
              Back to all articles
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <p className="text-primary-500 font-semibold mb-2">{post.category}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-muted">
              <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-secondary-700 dark:text-secondary-300">{post.author}</p>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center"><Calendar size={14} className="mr-1" />{post.date}</span>
                  <span className="flex items-center"><Clock size={14} className="mr-1" />{post.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Post Image */}
          <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-medium mb-12" />

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-secondary-600 dark:text-secondary-300 whitespace-pre-wrap">
            {post.content}
          </div>

          {/* CTA at the end */}
          <div className="mt-16 p-8 bg-secondary-50 dark:bg-secondary-800 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">Need Help with Your Essay?</h3>
            <p className="text-muted my-4">Our expert writers are here to help you succeed. Get a high-quality, custom paper written just for you.</p>
            <Link to="/order-now" className="btn-primary text-lg px-8 py-3 shadow-soft hover:shadow-medium transition-shadow">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;