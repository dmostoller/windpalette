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
            value: 40,
            density: {
              enable: true,
              value_area: 900,
            },
          },
          move: {
            enable: true,
            speed: { min: 1, max: 3 },
            direction: "bottom",
            straight: false,
            random: true,
            outModes: "out",
            path: {
              enable: true,
              delay: {
                value: 0,
              },
            },
          },
          size: {
            value: { min: 2, max: 5 },
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
              enable: true,
              speed: 2,
            },
          },
          shadow: {
            enable: true,
            color: "#64748b",
            blur: 15,
            offset: {
              x: 1,
              y: 2,
            },
          },
          glow: {
            enable: true,
            color: "#ffffff",
            blur: 3,
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
