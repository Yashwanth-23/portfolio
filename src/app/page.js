import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import ArchiveTable from '../components/ArchiveTable';
import { getFeaturedProjects, getArchiveProjects } from '../content/projects.registry.js';
import { fetchEligibleRepos } from '../lib/github.js';

export const revalidate = 21600; // 6-hour cache

export default async function Home() {
  const featuredProjects = getFeaturedProjects();
  const archiveProjects = getArchiveProjects();
  const latestProjects = await fetchEligibleRepos();

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-12 lg:p-20 font-sans selection:bg-gray-400 selection:text-black">
      {/* 1. THE HERO SECTION */}
      <Hero />

      {/* 2. THE FEATURED PROJECT GRID */}
      <div className="max-w-6xl mx-auto mb-10">
        <SectionHeader title="Selected Works." delay={0.2} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* 3. LATEST WORK SECTION (Gated by 'portfolio' topic; renders nothing if zero repos qualify) */}
      {latestProjects && latestProjects.length > 0 ? (
        <div className="max-w-6xl mx-auto mb-10 mt-20">
          <SectionHeader title="Latest work." delay={0.2} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      ) : null}

      {/* 4. THE GITHUB ARCHIVE */}
      <ArchiveTable projects={archiveProjects} />

      {/* 5. THE FOOTER */}
      <footer className="max-w-6xl mx-auto mt-32 pt-8 pb-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Yashwanth Reddy Vasireddy. All rights reserved.</p>

        <div className="flex gap-6 mt-6 md:mt-0 font-medium tracking-wide">
          <a href="https://github.com/Yashwanth-23" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yashwanthreddyv" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            LinkedIn
          </a>
          <a href="mailto:vryashwanthreddy@gmail.com" className="hover:text-white transition-colors duration-300">
            Email
          </a>
        </div>
      </footer>
    </main>
  );
}