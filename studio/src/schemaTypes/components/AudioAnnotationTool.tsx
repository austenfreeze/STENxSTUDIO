// studio/src/components/AudioAnnotationTool.tsx
import React from 'react';
import {Box, Card, Text} from '@sanity/ui';

// This is a placeholder component.
// It receives props from Sanity's form builder, but doesn't do anything with them yet.
// The actual implementation would involve a library like wavesurfer.js.
const AudioAnnotationTool = (props: any) => {
  console.log('AudioAnnotationTool props:', props); // Log props to see what Sanity provides

  return (
    <Card padding={3} radius={2} shadow={1} tone="primary">
      <Box>
        <Text weight="semibold">Custom Audio Annotation Tool</Text>
      </Box>
      <Box marginTop={3}>
        <Text size={1}>
          The real component with an audio waveform and annotation features will be built here.
          This is just a placeholder to allow the studio to load.
        </Text>
      </Box>
    </Card>
  );
};

export default AudioAnnotationTool;