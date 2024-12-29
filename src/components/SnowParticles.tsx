"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const SnowParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="snow-particles"
      init={particlesInit}
      options={{
        particles: {
          color: {
            value: "#ffffff",
          },
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            straight: false,
          },
          size: {
            value: 3,
          },
          opacity: {
            value: 0.8,
          },
        },
        background: {
          opacity: 0,
        },
      }}
    />
  );
};

export default SnowParticles;
