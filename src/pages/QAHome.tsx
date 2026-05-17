import React from 'react';
import PublicQaList from '../components/qa/PublicQaList';

/** Public Q&A Knowledge Base (`/qa`). UI lives in `PublicQaList`. */
const QAHome: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <PublicQaList />
    </div>
  );
};

export default QAHome;
