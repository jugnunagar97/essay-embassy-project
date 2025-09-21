import React from 'react';
import PublicQaList from '../components/qa/PublicQaList';

const QACatalog: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <PublicQaList />
    </div>
  );
};

export default QACatalog;
