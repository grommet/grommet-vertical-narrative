import React from 'react';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';

const CLASS_ROOT = "infographic-source";

export default function Source ({text}) {
  return (
    <Box className={CLASS_ROOT}>
      <Paragraph>Source: {text}</Paragraph>
    </Box>
  );
}
