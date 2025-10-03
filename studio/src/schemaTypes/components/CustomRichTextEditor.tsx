// studio/src/schemaTypes/components/CustomRichTextEditor.tsx

import React, { useState, forwardRef, useCallback } from 'react';
import { PortableTextInput, PortableTextInputProps } from 'sanity';

// We use forwardRef to ensure the component can be used in Sanity's form system.
const CustomRichTextEditor = forwardRef((props: PortableTextInputProps, ref) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { elementProps, renderDefault, onChange, value } = props;

  // Toggle the full-screen state
  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);

  return (
    <div className={`
      relative font-sans text-gray-800 transition-all duration-300
      ${isFullScreen ? 'fixed inset-0 z-50 bg-gray-100 flex flex-col p-8' : 'w-full mx-auto'}
    `}>
      {/* Editor Container */}
      <div className={`
        bg-white rounded-2xl shadow-xl transition-all duration-300
        ${isFullScreen ? 'flex flex-col flex-grow' : 'w-full'}
      `}>
        {/* The Sanity Portable Text Editor is now the sole editor */}
        <div className={`
          p-6
          ${isFullScreen ? 'flex-grow overflow-y-auto' : ''}
          scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300
          hover:scrollbar-thumb-gray-400
        `}>
          {renderDefault(props)}
        </div>
      </div>
    </div>
  );
});

export default CustomRichTextEditor;