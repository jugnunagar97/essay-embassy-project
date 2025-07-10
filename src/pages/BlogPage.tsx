// src/pages/BlogPage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // ADDED: Firestore connection
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'; // ADDED: Firestore functions
import { BlogPost } from '../types'; // ADDED: Using the correct BlogPost type
import LoadingSpinner from '../components/Common/LoadingSpinner';

// Helper function to format Firestore Timestamps
const formatDate = (timestamp: any) => {
    if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    return 'Date not available';
};

export default function BlogPage() {
    // State to hold live posts from Firestore
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ADDED: useEffect hook to fetch live blog posts from the database
    useEffect(() => {
        const postsCollectionRef = collection(db, 'blogPosts');
        const q = query(postsCollectionRef, orderBy('publishedAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedPosts = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as BlogPost))
                .filter(post => post.published); // Only show published posts

            setPosts(fetchedPosts);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching blog posts: ", error);
            setIsLoading(false);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-800 py-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link key={post.slug} to={`/blog/${post.slug}`} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                                <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover"/>
                                <div className="p-6">
                                    <p className="text-primary-500 font-semibold text-sm">{post.category}</p>
                                    <h2 className="text-xl font-bold my-2 text-gray-900 dark:text-white">{post.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{post.excerpt}</p>
                                    <div className="text-xs text-gray-500">
                                        <span>By {post.author}</span> &bull; <span>{formatDate(post.publishedAt)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No blog posts have been published yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}