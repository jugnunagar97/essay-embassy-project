import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PublicQaDetail from "../components/qa/PublicQaDetail";

const QuestionDetail: React.FC = () => {
  const { questionNumber, slug } =
    useParams<{ questionNumber: string; slug: string }>();

  if (!questionNumber || !slug) {
    return <div>Error: Question number or slug missing.</div>;
  }

  // Match server: only numeric Q&A ids are valid (blocks junk like /question/ee21385/inbound/essay-essay)
  if (!/^\d+$/.test(questionNumber)) {
    return (
      <>
        <Helmet>
          <title>Not Found | Essay Embassy</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="container mx-auto px-6 py-16 text-center text-gray-600">
          Page not found.
        </div>
      </>
    );
  }

  return <PublicQaDetail questionNumber={questionNumber} slug={slug} />;
};

export default QuestionDetail;
