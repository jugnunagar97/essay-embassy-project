import React from 'react';
import { StudioProvider, StudioLayout } from 'sanity';
import config from '../../sanity.config';

export default function StudioComponent() {
  return (
    <StudioProvider config={config}>
      <StudioLayout />
    </StudioProvider>
  );
}