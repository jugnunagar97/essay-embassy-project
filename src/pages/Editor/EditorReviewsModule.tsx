import ReviewManager from '../../components/Admin/ReviewManager';

export default function EditorReviewsModule() {
  return (
    <div className="space-y-4 md:space-y-6">
      <header>
        <p className="text-xs md:text-sm font-semibold text-primary-600 uppercase tracking-wide">Reviews</p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">Reviewer Workspace</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mt-1">
          Add or edit only the reviews that have been assigned to you. Publishing controls and destructive actions
          remain hidden in this workspace.
        </p>
      </header>
      <ReviewManager mode="editor" />
    </div>
  );
}

