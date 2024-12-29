"use client";
import { motion } from "framer-motion";
import { Palette, Wand, Layout, Share } from "lucide-react";
import Link from "next/link";
import SnowParticles from "@/components/SnowParticles";
import { SparklesIcon } from "./icons/sparkles";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] relative">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <SnowParticles />
      </div>
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              linear-gradient(45deg, 
                var(--primary) 0%, 
                var(--secondary) 50%, 
                var(--accent) 100%
              )
            `,
            filter: "blur(100px)",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create Beautiful
            <span className="text-[var(--primary)]"> Color Themes </span>
            With Ease
          </motion.h1>

          <motion.p
            className="text-xl mb-8 text-[var(--foreground)] opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Generate, customize, and export stunning color palettes for your next project
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/app"
              className="px-8 py-3 bg-[var(--primary)] text-white rounded-lg bg-gradient-to-t from-[var(--primary-dark)] to-[var(--primary)] hover:bg-[var(--primary-dark)] hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="px-8 py-3 border border-[var(--card-border)] rounded-lg hover:border-[var(--primary)] transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2
              className="text-6xl font-bold mb-6 bg-gradient 
    bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] 
    bg-clip-text text-transparent"
            >
              Features
            </h2>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Everything you need to create the perfect color theme
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Palette className="w-12 h-12" />,
                title: "Color Picker",
                description: "Intuitive color selection with advanced controls",
                gradient: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                color: "var(--primary)",
              },
              {
                icon: <Wand className="w-12 h-12" />,
                title: "Auto Generate",
                description: "Create harmonious color schemes automatically",
                gradient: "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)",
                color: "var(--secondary)",
              },
              {
                icon: <Layout className="w-12 h-12" />,
                title: "Live Preview",
                description: "See your colors in real-world components",
                gradient: "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                color: "var(--accent)",
              },
              {
                icon: <Share className="w-12 h-12" />,
                title: "Export & Share",
                description: "Export your themes in multiple formats",
                gradient: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                color: "var(--primary)",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-10 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute inset-0 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: feature.gradient,
                    maskImage: "linear-gradient(to bottom, transparent, black 85%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 85%)",
                  }}
                />
                <div className="relative z-10">
                  <div className="mb-6 transition-colors duration-300" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-xl text-[var(--foreground)] opacity-70">{feature.description}</p>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-1.5 w-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ background: feature.gradient }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-[var(--card)] mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Users Say</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This tool transformed how I approach color selection. The live preview feature is a game-changer.",
                author: "Sarah Chen",
                role: "UI Designer",
              },
              {
                quote:
                  "Finally, a color tool that understands what developers need. Export formats are perfect for my workflow.",
                author: "Michael Rodriguez",
                role: "Frontend Developer",
              },
              {
                quote:
                  "The auto-generate feature saved me hours of work. Highly recommend for any design project.",
                author: "Emma Thompson",
                role: "Art Director",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-xl bg-[var(--background)] border border-[var(--card-border)] relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)"
                        : index === 1
                          ? "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)"
                          : "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
                    maskImage: "linear-gradient(to bottom, transparent, black 85%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 85%)",
                  }}
                />
                <div className="relative z-10">
                  <p className="text-lg mb-6 text-[var(--foreground)] opacity-80">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-[var(--foreground)] opacity-70">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-32 bg-[var(--background)] relative overflow-hidden">
        {/* Enhanced Background Effect */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `
                    radial-gradient(circle at 50% 50%,
                      var(--primary) 0%,
                      var(--secondary) 50%,
                      var(--accent) 100%
                    )
                  `,
            filter: "blur(120px)",
          }}
        />

        <div className="max-w-screen-2xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Create stunning color themes in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
            {[
              {
                step: "1",
                title: "Choose Your First Color",
                description:
                  "Start by selecting your primary color using our intuitive color picker or input a specific hex code.",
                icon: <Palette className="w-12 h-12" />,
                color: "var(--primary)",
                gradient: "from-[var(--primary)] to-[var(--secondary)]",
              },
              {
                step: "2",
                title: "Add More Colors",
                description:
                  "Optionally add up to two more colors to create a complete theme palette for your project.",
                icon: <Wand className="w-12 h-12" />,
                color: "var(--secondary)",
                gradient: "from-[var(--secondary)] to-[var(--accent)]",
              },
              {
                step: "3",
                title: "Export & Use",
                description:
                  "Get your color scales and gradients in Tailwind config format or CSS variables, ready to use.",
                icon: <Share className="w-12 h-12" />,
                color: "var(--accent)",
                gradient: "from-[var(--accent)] to-[var(--primary)]",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className={`bg-gradient-to-r ${step.gradient} p-[1px] rounded-full`}>
                      <div className="bg-[var(--background)] rounded-full px-4 py-1">
                        <span className="text-sm font-mono font-bold">STEP {step.step}</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-8">
                    <div
                      className={`relative w-20 h-20 mx-auto rounded-2xl p-[1px] group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="absolute inset-[1px] bg-[var(--card)] rounded-2xl flex items-center justify-center">
                        <div style={{ color: step.color }}>{step.icon}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--foreground)] to-[var(--muted-foreground)] bg-clip-text text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">{step.description}</p>

                  {/* Connecting Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-8 w-16 h-[2px] opacity-20">
                      <div className={`w-full h-full bg-gradient-to-r ${step.gradient}`} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-52 ">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 animate-gradient-slow"
            style={{
              background: `linear-gradient(45deg, 
                var(--primary) 0%, 
                var(--secondary) 25%, 
                var(--accent) 50%,
                var(--secondary) 75%,
                var(--primary) 100%
              )`,
              backgroundSize: "400% 400%",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, transparent 0%, var(--background) 100%)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="relative p-[1px] rounded-3xl overflow-hidden backdrop-blur-xl">
            {/* Gradient Border */}
            <div
              className="absolute inset-0 animate-gradient-slow"
              style={{
                background: `linear-gradient(45deg, 
                  var(--primary) 0%, 
                  var(--secondary) 25%, 
                  var(--accent) 50%,
                  var(--secondary) 75%,
                  var(--primary) 100%
                )`,
                backgroundSize: "400% 400%",
              }}
            />

            {/* Content Container */}
            <div className="relative bg-[var(--background)] rounded-3xl p-16 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 text-center"
              >
                {/* Decorative Icon */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <Palette className="w-16 h-16 mx-auto text-[var(--primary)] opacity-80" />
                </motion.div>

                {/* Heading */}
                <h2 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] text-transparent bg-clip-text animate-gradient-slow">
                  Ready to Create?
                </h2>

                {/* Subheading */}
                <p className="text-2xl mb-12 text-[var(--muted-foreground)] max-w-2xl mx-auto">
                  Transform your design workflow with our powerful color theme generator.
                </p>

                {/* Buttons Group */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  {/* Primary Button */}
                  <Link
                    href="/app"
                    className="group relative inline-flex items-center px-8 py-4 text-white font-semibold text-xl rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(225deg, 
                        var(--primary) 0%,
                        var(--accent) 100%
                      )`,
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      boxShadow: `
                        0 4px 0 0 rgba(0,0,0,0.2),
                        0 8px 16px -8px rgba(0,0,0,0.3),
                        inset 0 -2px 0 0 rgba(0,0,0,0.2),
                        inset 0 2px 0 0 rgba(255,255,255,0.1)
                      `,
                    }}
                  >
                    <SparklesIcon />
                    <span>Start Generating</span>
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.5), transparent)",
                      }}
                    />
                  </Link>

                  {/* Secondary Button */}
                  <Link
                    href="#features"
                    className="group px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all duration-300 font-semibold text-xl"
                  >
                    Explore Features
                  </Link>
                </div>

                {/* Supporting Text */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--muted-foreground)]">
                    No account needed. Start customizing now!
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted-foreground)]">
                    <span className="flex items-center">
                      <Wand className="w-4 h-4 mr-1" /> Auto Generate
                    </span>
                    <span className="flex items-center">
                      <Layout className="w-4 h-4 mr-1" /> Live Preview
                    </span>
                    <span className="flex items-center">
                      <Share className="w-4 h-4 mr-1" /> Export & Share
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Curve Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[100px]"
            style={{
              transform: "rotate(180deg)",
            }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-[var(--background)] opacity-20"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
}
