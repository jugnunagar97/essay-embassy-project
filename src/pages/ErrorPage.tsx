import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import ErrorReporter from '../components/ErrorReporter';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const handleReset = () => {
    // Navigate back to home page
    navigate('/');
  };

  return <ErrorReporter error={error} reset={handleReset} />;
};

export default ErrorPage;
