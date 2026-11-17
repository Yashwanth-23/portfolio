import Header from '../components/Header';
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
    <main className="min-h-screen bg-[#090a0c] text-zinc-100 px-4 py-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 font-sans selection:bg-zinc-800 selection:text-zinc-100">
      {/* 0. ACCESSIBLE HEADER */}
      <Header />

      {/* 1. THE AUTHORED HERO SECTION */}
      <Hero />

      {/* 2. THE FEATURED PROJECT GRID (TARGET FOR 'VIEW SELECTED WORKS' AND SKIP LINK) */}
      <section id="work" aria-label="Selected Works" className="max-w-6xl mx-auto mb-10 scroll-mt-20 sm:scroll-mt-24">
        <SectionHeader title="Selected Works." delay={0.2} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* 3. LATEST WORK SECTION (Gated by 'portfolio' topic; renders nothing if zero repos qualify) */}
      {latestProjects && latestProjects.length > 0 ? (
        <section aria-label="Latest work" className="max-w-6xl mx-auto mb-10 mt-20">
          <SectionHeader title="Latest work." delay={0.2} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      {/* 4. THE GITHUB ARCHIVE */}
      <div id="archive" className="scroll-mt-20 sm:scroll-mt-24">
        <ArchiveTable projects={archiveProjects} />
      </div>

      {/* 5. THE FOOTER (UNTOUCHED PRESERVED DESTINATIONS) */}
      <footer className="max-w-6xl mx-auto mt-32 pt-8 pb-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Yashwanth Reddy Vasireddy. All rights reserved.</p>
      </footer>
    </main>
  );
}