import BlogManager from '../../components/Admin/BlogManager';

export default function EditorBlogModule() {
  return (
    <div className="space-y-4 md:space-y-6">
      <header>
        <p className="text-xs md:text-sm font-semibold text-primary-600 uppercase tracking-wide">Blog</p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">Blog Publishing</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mt-1">
          Create, edit, and publish the blog posts assigned to you—including setting custom author names and
          switching between draft or published status. Category management still lives in the admin panel.
        </p>
      </header>
      <BlogManager mode="editor" />
    </div>
  );
}

