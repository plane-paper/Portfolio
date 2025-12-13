import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const IntroContent = () => {
  const [openSection, setOpenSection] = useState(null);
  const [openWorkExperience, setOpenWorkExperience] = useState(null);

  const DropdownSection = ({ title, children }) => {
    const isOpen = openSection === title;

    const handleOpenChange = (open) => {
      setOpenSection(open ? title : null);
    };

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        className="border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm"
      >
        <CollapsibleTrigger className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-all duration-200 group">
          <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
            {title}
          </h3>
          <ChevronDown 
            className={`w-5 h-5 text-white transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-6 pb-6 pt-2 space-y-3 text-white/90 leading-relaxed data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const WorkExperienceItem = ({ company, position, dates, children }) => {
    const isOpen = openWorkExperience === company;
    
    const handleOpenChange = (open) => {
      setOpenWorkExperience(open ? company : null);
    };

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
      >
        <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all duration-200 text-left group">
          <div className="flex-1">
            <p className="font-semibold text-white">{company}</p>
            <p className="text-sm text-white/70">{position}</p>
            <p className="text-xs text-white/50">{dates}</p>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-white flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-4 pb-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="pb-7">
      <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
        Intro
      </h2>

      <div className="mb-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <p className="text-white/90 leading-relaxed">
            Hello! I'm a passionate full-stack and software developer studying Electrical & Computer Engineering at the University of Waterloo, fostering hands-on experience with the co-op program, and academic success during my study terms.
            <br />
            I love building impactful projects that leverage modern technologies to solve real-world problems! Check out my projects page for more information. I also frequently compete in hackathons and engineering competitions, winning multiple awards.
            <br />
            I have a multicultural background, having been raised in two countries during my childhood. This diverse upbringing has given me a unique perspective and adaptability in both technical and interpersonal contexts.
            <br />
            When I'm not studying or working, you may find me playing chess, gaming, writing, reading, debating, or cooking. I really wish I could cut my own hair, but reality often disappoints.
          </p>
        </div>
        
        <figure className="flex flex-col items-center md:w-64 flex-shrink-0">
          <img
            src="images/pic01.jpg"
            alt="Me going to the barber"
            className="w-full rounded-lg shadow-lg border border-white/20"
          />
          <figcaption className="text-xs text-white/50 mt-2 italic text-center">
            The only time I went to the barber
          </figcaption>
        </figure>
      </div>

      <div className="space-y-4">
        <DropdownSection title="Work Experience">
          <div className="space-y-3">
            <WorkExperienceItem 
              company="Lynkr Inc." 
              position="Backend Software Developer"
              dates="Sept 2025 - Dec 2025"
            >
              <ul className="list-disc list-outside ml-5 pl-2 space-y-1 mt-3">
                <li><strong>Co-developed</strong>, with one other developer, the company's <strong>core</strong> product, Lynkr Workbench, from <strong>scratch</strong> to <strong>beta</strong>, generating over <strong>500,000 CAD</strong> in SaaS revenue and serving <strong>2,800+</strong> individual customers.</li>
                <li>Designed the backend <strong>architecture</strong> with <strong>FastAPI</strong> and <strong>Next.js</strong>, and built the <strong>Enterprise tier</strong> featuring <strong>RBAC</strong>, member management, SAML SSO, seat control, agent migration, department assignment, etc.</li>
                <li>Used <strong>LangGraph</strong> to build <strong>dual LLM pipelines</strong> enabling users to <strong>create</strong> and <strong>run autonomous AI agents</strong> with <strong>MCP</strong> service calls. Data is stored with <strong>PostgreSQL</strong>, and user secrets managed using <strong>Google Cloud</strong>.</li>
                <li>Implemented <strong>memory</strong>, and built a <strong>decision tree</strong> to <strong>categorize memories</strong> and enable <strong>case-based RL</strong>.</li>
                <li>Further built a billing system for purchasing tiers and tokens via <strong>Stripe</strong>, and a <strong>usage tracker</strong> enforcing usage limits, which fetches token data from <strong>LangFuse</strong>.</li>
                <li>Seeded <strong>vector embedding</strong> for the service endpoints, and a <strong>similarity search</strong> to quickly fetch services &amp; endpoints based on a natural language prompt.</li>
                <li>Enforced key validation by pinging a health-checking endpoint to ensure that the user's secrets and API keys to services are all valid.</li>
                <li>Built an onboarding system that enables MFA for the user using an authenticator app or a phone number, supported by Twilio.</li>
                <li>Used <strong>MCP servers</strong> to allow agentic interaction for over <strong>100</strong> services and implemented over <strong>3000</strong> REST API endpoints.</li>
                <li>Refactored over <strong>3000</strong> lines of React code into components, greatly increasing the maintainability of the code base.</li>
                <li>Implemented various authorization methods, including OAuth tokens, API keys, and third-party authorizations such as Google OAuth.</li>
              </ul>
            </WorkExperienceItem>

            <WorkExperienceItem 
              company="Sioux Technologies" 
              position="Control Software Developer"
              dates="Jan 2025 - Apr 2025"
            >
              <ul className="list-disc list-outside ml-5 pl-2 space-y-1 mt-3">
                <li>Automated <strong>server-side Windows configuration</strong> using <strong>PowerShell</strong> and <strong>Python</strong> scripts.</li>
                <li>Fully automated <strong>client software installation</strong> via <strong>PowerShell</strong>, significantly reducing setup time and simplifying operations.</li>
                <li>Automated <strong>dependency and prerequisite validation</strong> with <strong>PowerShell</strong>, including <strong>hot-fix logic</strong> to detect, debug, and install missing components during setup.</li>
                <li>Deployed <strong>CI/CD pipelines</strong> to pre-package release builds, generate installers, and automatically upload artifacts to the company <strong>QMS system</strong>.</li>
                <li>Implemented <strong>repository and commit linting</strong> via <strong>CI/CD</strong> pipelines triggered on every commit.</li>
                <li>Organized and led <strong>company-wide Git training sessions</strong>.</li>
                <li>Designed and built a <strong>commit message enforcement system</strong> that automatically rolls back commits violating defined conventions.</li>
              </ul>
            </WorkExperienceItem>

            <WorkExperienceItem 
              company="Capital Air Inc., Beijing Capital Group Co." 
              position="Software Engineering Intern"
              dates="Jun 2023 - Aug 2023"
            >
              <ul className="list-disc list-outside ml-5 pl-2 space-y-1 mt-3">
                <li>Individually built a <strong>data analysis system</strong> that ingests <strong>real-time pollution data</strong> from <strong>1,000+</strong> nationwide sites using <strong>SQL</strong> and visualizes it as a <strong>heat map</strong> via the <strong>Kriging method</strong></li>
                <li>Later ported to a <strong>Flask</strong> backend API and adopted in Capital Air Inc.’s production software, serving <strong>thousands of clients</strong>.</li>
              </ul>
            </WorkExperienceItem>
          </div>
        </DropdownSection>

        <DropdownSection title="Education">
          <p><strong>University of Waterloo</strong> - Computer Engineering, BASc, 4.0/4.0 GPA</p>
          <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
            <li>Elected academic student representative</li>
            <li>Core member of Wat.AI student design team</li>
          </ul>
          <p className="mt-3"><strong>Rothesay Netherwood School</strong> - International Baccalaureate Diploma, 43/45</p>
          <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
            <li>Elected prefect for democracy</li>
            <li>Secretary General, Co-Founder, Organizer of Gordon Fairweather MUN</li>
            <li>Founder of student-led newspaper RNS Monthly</li>
            <li>President of Forensics Club</li>
          </ul>
        </DropdownSection>

        <DropdownSection title="Awards">
          <p><strong>Academic</strong></p>
          <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
            <li>Term Distinction (Top 10% of class)</li>
            <li>President's Scholarship with Distinction</li>
            <li>2nd Place - Waterloo Engineering Competition 2025</li>
            <li>Honour Roll (Top 5%) - Canadian Computing Competition 2023</li>
            <li>Distinction (Top 30%) - Canadian Computing Competition 2021, 2022, 2024</li>
            <li>2nd Place - FIRST Robotics Competition Nationals 2023</li>
            <li>High Commendation (Top 1.3%) - John Locke Essay Competition 2023</li>
            <li>Governor's Bronze & Silver - Rothesay Netherwood School</li>
          </ul>
          <p className="mt-3"><strong>Others</strong></p>
          <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
            <li>Reach For The Top Provincial Runner-up 2023</li>
            <li>3rd Place - Stanford Flemming Debate Tournament 2025</li>
            <li>2nd Place - Provincial Debate Tournament 2024</li>
            <li>3rd Place - Provincial Debate Tournament 2023</li>
            <li>3rd Place - Provincial Chess Tournament 2023</li>
          </ul>
        </DropdownSection>

        <DropdownSection title="Skills & Languages">
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-white mb-2">Programming Languages:</p>
              <p>Python, JavaScript/TypeScript, C++/C, C#, Java, SQL, Go, Scripting (Powershell/YAML/Bash/CMD)</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Frameworks:</p>
              <p>NumPy, Pandas, Tensorflow, PyTorch, skLearn, spaCy, LangChain/LangGraph, Postgres/MySQL, Flask, FastAPI, Matplot, Kriging, MCP, Pydantic, React, Next.js</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Developer Tools:</p>
              <p>Git, Node, Yarn, Docker, VS/VS Code/PyCharm, Jupyter/Anaconda, NSIS, NuGet, Vim, Jira, Confluence, IntelliJ</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Spoken Languages:</p>
              <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
                <li>English and Mandarin - Native level</li>
                <li>French - Fluent level</li>
              </ul>
            </div>
          </div>
        </DropdownSection>
      </div>
    </div>
  );
};

export default IntroContent;