/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Ferrofluid from './components/Ferrofluid/Ferrofluid';
import { StudioHeader } from './components/StudioHeader';
import { ProjectGrid } from './components/ProjectGrid';
import { ExpandedShardModal } from './components/ExpandedShardModal';
import { ContactModal } from './components/ContactModal';
import { AboutStudioModal } from './components/AboutStudioModal';
import {
  CinematicShatterTransition,
  TransitionOriginData,
} from './components/CinematicShatterTransition';
import { PROJECTS_DATA } from './data/projects';
import { ProjectShard } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectShard | null>(null);
  const [transitionData, setTransitionData] = useState<TransitionOriginData | null>(null);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [contactProjectTitle, setContactProjectTitle] = useState<string | undefined>(undefined);

  const handleOpenContact = (projectTitle?: string) => {
    setContactProjectTitle(projectTitle);
    setContactOpen(true);
  };

  const handleSelectProject = (
    project: ProjectShard,
    rect?: DOMRect,
    clickPoint?: { x: number; y: number }
  ) => {
    if (rect && clickPoint) {
      setTransitionData({
        project,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        clickPoint,
      });
      setSelectedProject(project);
    } else {
      setSelectedProject(project);
    }
  };

  const handleTransitionComplete = (project: ProjectShard) => {
    setTransitionData(null);
  };

  return (
    <div className="relative min-h-screen w-full text-slate-100 overflow-x-hidden flex flex-col justify-between selection:bg-purple-500/40 selection:text-white">
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundColor: '#020005' }}>
        <Ferrofluid
          colors={["#dff1ff","#ac36f4","#8fb0ff"]}
          spikeHeight={1}
          sharpness={2.5}
          tilt={48}
          magnets={2}
          mouseInteraction
          clickPulse
          variation={6}
          flowDirection="up"
        />
      </div>

      {/* Main Perspective: Clean, centered, eye-level view of a single web page within dark chrome */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-between flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* 
          2. Header & Branding Section (Top Center):
          Deep black textured plaque with iridescent crystal logo
        */}
        <div className="w-full pointer-events-auto">
          <StudioHeader onOpenAbout={() => setAboutOpen(true)} />
        </div>

        {/* 
          3. Interactive Project Grid (Center, Two Rows):
          Central 2x4 grid containing eight identical matte black obsidian project cards.
        */}
        <main className="w-full flex items-center justify-center flex-1 my-auto py-2 sm:py-4 pointer-events-auto">
          <ProjectGrid
            projects={PROJECTS_DATA}
            onSelectProject={handleSelectProject}
            onOpenContact={() => setAboutOpen(true)}
          />
        </main>

        {/* Bottom Status / Sub-Bar */}
        <footer className="w-full py-2 text-center text-[11px] font-mono tracking-wider text-purple-400/40 select-none pointer-events-none">
          <span>BLACK-X DIGITAL STUDIO // CRACKED OBSIDIAN & COSMIC ENERGY</span>
        </footer>
      </div>

      {/* Interactive Card Click Slow-Motion Transition */}
      <CinematicShatterTransition
        transitionData={transitionData}
        onComplete={handleTransitionComplete}
      />

      {/* Expanded Shard Modal with Persistent Shattered Mirror Cracks */}
      <ExpandedShardModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={(title) => handleOpenContact(title)}
        clickPoint={transitionData?.clickPoint}
      />

      {/* Studio About & Contact Channels Modal (واتساب، إنستا، فيسبوك، تليجرام) */}
      <AboutStudioModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onOpenDirectChat={() => handleOpenContact('مشروع جديد')}
      />

      {/* Direct Inquiries & Chat Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultProjectTitle={contactProjectTitle}
      />
    </div>
  );
}
