// studio/components/InlineCommentComponent.tsx
import React from 'react';

interface InlineCommentProps {
  children: React.ReactNode;
}

/**
 * A simple React component to render inline comments with a yellow background.
 * Used as a custom component for Portable Text decorators.
 */
const InlineCommentComponent: React.FC<InlineCommentProps> = ({ children }) => {
  return (
    <span style={{ backgroundColor: 'yellow' }}>
      {children}
    </span>
  );
};

export default InlineCommentComponent;
