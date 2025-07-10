// src/pages/BlogPostPage.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { BlogPost } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Calendar, User, ArrowRight, FileText, Clock, FileCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const formatDate = (timestamp: any) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return 'Date not available';
};

const MidContentCTA = () => (
    <div className="my-10 p-6 rounded-xl bg-gradient-to-r from-primary-50 via-white to-blue-50 dark:from-primary-900/10 dark:via-gray-800 dark:to-blue-900/10 shadow-inner-soft border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6"><div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg"><FileText size={32} /></div></div>
            <div className="flex-grow text-center md:text-left"><h3 className="text-xl font-bold text-gray-900 dark:text-white">Need an Expert Writer?</h3><p className="text-gray-600 dark:text-gray-300 my-2">Let our PhD-level experts craft a perfect paper for you. 100% original, confidential, and on time.</p></div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0"><Link to="/order-now" className="btn-primary text-base font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-shadow inline-flex items-center">Get Started <ArrowRight size={18} className="ml-2" /></Link></div>
        </div>
    </div>
);

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [similarPosts, setSimilarPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostData = async () => {
            if (!slug) { setError("Blog post not specified."); setIsLoading(false); return; }
            setIsLoading(true);
            try {
                const postsRef = collection(db, 'blogPosts');
                const q = query(postsRef, where("slug", "==", slug), limit(1));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) { setError("Blog post not found."); } 
                else {
                    const postData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as BlogPost;
                    setPost(postData);
                    const similarQuery = query(postsRef, where("category", "==", postData.category), where("slug", "!=", postData.slug), orderBy("slug"), limit(4));
                    const similarSnapshot = await getDocs(similarQuery);
                    setSimilarPosts(similarSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
                }
            } catch (err) { console.error("Error fetching data: ", err); setError("Failed to load blog post."); } 
            finally { setIsLoading(false); }
        };
        fetchPostData();
    }, [slug]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
    if (error) return <div className="min-h-screen flex flex-col items-center justify-center text-center p-4"><h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1><p>{error}</p><Link to="/blog" className="mt-6 btn-primary">Go back to Blog</Link></div>;
    if (!post) return null;

    return (
        <>
            <Helmet><title>{post.title} - Essay Embassy</title><meta name="description" content={post.excerpt} /><link rel="canonical" href={`https://www.essayembassy.com/blog/${post.slug}`} /></Helmet>
            <div className="bg-white dark:bg-gray-900 py-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <header className="mb-8 text-center">
                        <Link to={`/blog?category=${post.category}`} className="text-primary-500 font-semibold uppercase tracking-wider">{post.category}</Link>
                        <h1 className="text-4xl md:text-5xl font-bold my-4 text-gray-900 dark:text-white leading-tight">{post.title}</h1>
                        <div className="flex items-center justify-center mt-6">
                            {post.authorAvatar ? (
                                <img src={post.authorAvatar} alt={post.author} className="w-14 h-14 rounded-full mr-4 shadow-md"/>
                            ) : (
                                <div className="w-14 h-14 rounded-full mr-4 shadow-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <User className="w-8 h-8 text-gray-500" />
                                </div>
                            )}
                            <div>
                                <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{post.author}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-2"><Calendar size={14} /><span>{formatDate(post.publishedAt)}</span></div>
                                    {post.readTime && (<div className="flex items-center space-x-2"><Clock size={14} /><span>{post.readTime}</span></div>)}
                                </div>
                            </div>
                        </div>
                    </header>
                    <figure className="my-8"><img src={post.featuredImage} alt={post.title} className="w-full h-auto rounded-lg shadow-lg" /></figure>
                    
                    {/* FIXED: Removed 'lg:prose-xl' to use the standard, smaller font size. */}
                    <div 
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <MidContentCTA />
                </div>
            </div>
        </>
    );
}