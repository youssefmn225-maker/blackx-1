import React, { useState } from 'react';
import { ProjectShard } from '../types';
import { TiltedProjectCard } from './TiltedProjectCard';

interface ProjectGridProps {
  projects: ProjectShard[];
  onSelectProject: (project: ProjectShard, rect?: DOMRect, clickPoint?: { x: number; y: number }) => void;
  onOpenContact: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onSelectProject,
  onOpenContact,
}) => {
  const handleCardClick = (project: ProjectShard, _index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget?.getBoundingClientRect?.();
    const clickPoint = { x: e.clientX, y: e.clientY };
    onSelectProject(project, rect, clickPoint);
  };

  return (
    <section
      className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center justify-center select-none"
      id="obsidian-project-grid-section"
    >
      <div className="relative w-full">
        {/* 
          Central 2x4 Grid containing eight interactive 3D TiltedCards
        */}
        <div
          id="obsidian-2x4-grid"
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full"
        >
          {projects.slice(0, 8).map((project, index) => (
            <TiltedProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={(e) => handleCardClick(project, index, e)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
