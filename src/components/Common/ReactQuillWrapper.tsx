// Wrapper component to suppress findDOMNode deprecation warning from react-quill
// This is a known issue with react-quill library that uses deprecated React APIs internally
// The warning doesn't affect functionality and will be fixed in a future react-quill update
import { forwardRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

interface ReactQuillWrapperProps extends ReactQuillProps {
  // All ReactQuill props are passed through
}

// Suppress findDOMNode warnings globally (only for react-quill)
if (typeof window !== 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const suppressFindDOMNodeWarning = (args: any[]) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('findDOMNode is deprecated') ||
       message.includes('Warning: findDOMNode'))
    ) {
      return true; // Suppress this warning
    }
    return false;
  };

  console.error = (...args: any[]) => {
    if (!suppressFindDOMNodeWarning(args)) {
      originalError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    if (!suppressFindDOMNodeWarning(args)) {
      originalWarn.apply(console, args);
    }
  };
}

const ReactQuillWrapper = forwardRef<ReactQuill, ReactQuillWrapperProps>(
  (props, ref) => {
    return <ReactQuill ref={ref} {...props} />;
  }
);

ReactQuillWrapper.displayName = 'ReactQuillWrapper';

export default ReactQuillWrapper;

