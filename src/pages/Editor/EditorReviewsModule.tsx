import ReviewManager from '../../components/Admin/ReviewManager';

export default function EditorReviewsModule() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Reviews</p>
        <h2 className="text-2xl font-bold text-gray-900">Reviewer Workspace</h2>
        <p className="text-gray-600 max-w-2xl">
          Add or edit only the reviews that have been assigned to you. Publishing controls and destructive actions
          remain hidden in this workspace.
        </p>
      </header>
      <ReviewManager mode="editor" />
    </div>
  );
}

