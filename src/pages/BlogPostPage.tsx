// src/pages/BlogPostPage.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { BlogPost } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Calendar, User, ArrowRight, FileText, Clock, FileCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase';

const formatDate = (timestamp: any) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return 'Date not available';
};

const MidContentCTA = () => (
    <div className="my-10 p-6 rounded-xl bg-gradient-to-r from-primary-50 via-white to-blue-50 dark:from-primary-900/10 dark:via-gray-800 dark:to-blue-900/10 shadow-inner-soft border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg">
                    <FileText size={32} />
                </div>
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need an Expert Writer?</h3>
                <p className="text-gray-600 dark:text-gray-300 my-2">Let our PhD-level experts craft a perfect paper for you. 100% original, confidential, and on time.</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                <Link to="/order-now" className="btn-primary text-base font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-shadow inline-flex items-center">
                    Get Started <ArrowRight size={18} className="ml-2" />
                </Link>
            </div>
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

                if (querySnapshot.empty) {
                    setError("Blog post not found.");
                } else {
                    const postData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as BlogPost;
                    setPost(postData);

                    const similarQuery = query(
                        postsRef,
                        where("category", "==", postData.category),
                        where("slug", "!=", postData.slug),
                        orderBy("slug"),
                        limit(4)
                    );
                    const similarSnapshot = await getDocs(similarQuery);
                    setSimilarPosts(similarSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
                }
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("Failed to load blog post.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPostData();
    }, [slug]);

    if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
    if (error) return <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4"><h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1><p>{error}</p><Link to="/blog" className="mt-6 btn-primary">Go back to Blog</Link></div>;
    if (!post) return null;

    return (
        <>
            <Helmet>
                <title>{post.title} - Essay Embassy</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>
            <div className="bg-white dark:bg-gray-900 py-12">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <article className="lg:col-span-2">
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
                            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}/>
                            <MidContentCTA />
                        </article>
                        
                        <aside className="lg:col-span-1">
                            <div className="sticky top-28 space-y-8">
                                <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-center">
                                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 text-primary-500 rounded-full flex items-center justify-center mx-auto shadow-inner-soft"><FileCheck size={32} /></div>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white mt-4">Getting your paper done is easy when you know the right people.</p>
                                    <div className="mt-6"><Link to="/order-now" className="inline-block p-1 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 hover:shadow-lg transition-shadow"><span className="block bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold px-8 py-3 rounded-full">Order Now</span></Link></div>
                                </div>
                                
                                {/* FIXED: The "Similar Posts" section is now correctly included in the JSX */}
                                {similarPosts.length > 0 && (
                                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                                        <h3 className="text-xl font-bold mb-4">Similar Posts</h3>
                                        <div className="space-y-4">
                                            {similarPosts.map(p => (
                                                <Link key={p.id} to={`/blog/${p.slug}`} className="block group">
                                                    <p className="font-semibold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors">{p.title}</p>
                                                    <p className="text-sm text-gray-500">{p.category}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}