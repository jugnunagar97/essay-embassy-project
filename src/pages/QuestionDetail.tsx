import React from 'react';
import { useParams } from 'react-router-dom';
import PublicQaDetail from '../components/qa/PublicQaDetail';

const QuestionDetail: React.FC = () => {
  const { questionNumber, slug } = useParams<{ questionNumber: string; slug: string }>();
  
  const qn = Number(questionNumber);

  if (!questionNumber || !slug) {
    return <div>Error: Question number or slug missing.</div>;
  }

  return <PublicQaDetail questionNumber={qn} slug={slug} />;
};

export default QuestionDetail;
