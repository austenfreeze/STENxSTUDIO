// CustomRichTextEditor.tsx
import React, { useState, forwardRef, useCallback } from 'react';
import { PortableTextInput, PortableTextInputProps } from 'sanity';

// Use inline SVGs for icons to avoid external library issues in the canvas environment
const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
);

const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
);

const BoldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h8a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H6v11zm0 0v5a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-5H6z"/></svg>
);

const ItalicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21h7"/><path d="M7 3h7"/><path d="M17 3l-10 18"/></svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L13 7.07"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L11 16.93"/></svg>
);

// We use forwardRef to ensure the component can be used in Sanity's form system.
const CustomRichTextEditor = forwardRef((props: PortableTextInputProps, ref) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [localContent, setLocalContent] = useState('Start writing your article here...');
  const { elementProps, renderDefault, onChange, value } = props;

  // Toggle the full-screen state
  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
  }, [isFullScreen]);
  
  // Handle changes for the fallback textarea
  const handleLocalContentChange = (e) => {
    setLocalContent(e.target.value);
  };

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
        {/* Our custom toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {/* These are placeholder buttons to demonstrate the UI.
                Actual rich text functionality is handled by Sanity's editor below. */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <BoldIcon />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <ItalicIcon />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <ListIcon />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <LinkIcon />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <ImageIcon />
            </button>
          </div>
          {/* Full-screen toggle button */}
          <button
            onClick={toggleFullScreen}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
          >
            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
        </div>

        {/* The Sanity Portable Text Editor or a fallback textarea */}
        <div className={`
          p-6
          ${isFullScreen ? 'flex-grow overflow-y-auto' : ''}
          scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300
          hover:scrollbar-thumb-gray-400
        `}>
          {renderDefault ? (
            // If renderDefault is available, use the Sanity editor
            renderDefault(props)
          ) : (
            // Otherwise, provide a simple textarea fallback for standalone use
            <textarea
              value={localContent}
              onChange={handleLocalContentChange}
              className="w-full h-full resize-none outline-none text-lg leading-relaxed font-serif tracking-wide text-gray-700"
              style={{ fontFamily: 'Georgia, serif' }}
              placeholder="This is a simple text area as a fallback."
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default CustomRichTextEditor;