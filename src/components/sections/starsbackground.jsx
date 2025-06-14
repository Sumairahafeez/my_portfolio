// src/components/StarsBackground.jsx
import React from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

const StarsBackground = () => {
  const particlesInit = async (engine) => {
    await loadStarsPreset(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'stars',
        background: {
          color: {
            value: '#0a192f', // Matches your dark theme
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1, // ensures it's behind your content
        },
      }}
    />
  );
};

export default StarsBackground;
