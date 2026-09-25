import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';

const IntroContent = () => {
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
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="work-experience">
                        <AccordionTrigger className="text-2x1 font-semibold uppercase tracking-wide">
                            Work Experience
                        </AccordionTrigger>

                        <AccordionContent className="text-white/90 leading-relaxed">
                            {/* Nested accordion */}
                            <Accordion type="single" collapsible className="space-y-3">

                            {/* RELEX */}
                            <AccordionItem value="relex" className="border border-white/10 rounded-lg bg-white/5">
                                <AccordionTrigger
                                className="
                                    px-4 py-3 rounded-md
                                    hover:bg-white/10 hover:no-underline
                                    transition-colors
                                    text-left
                                "
                                >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">RELEX Solutions</span>
                                    <span className="text-sm text-white/70">Fullstack Engineer</span>
                                    <span className="text-xs text-white/50">Jun 2026 – Aug 2026</span>
                                </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-4 pb-4">
                                {/* TODO: add real RELEX metrics (KBs, tables, memories, users, latency, etc.) once confirmed */}
                                <ul className="list-disc list-outside ml-5 space-y-1">
                                    <li>Designed and built the enterprise <strong>Knowledge Base</strong> platform for a conversational <strong>AI data analyst</strong>, the <strong>semantic layer</strong> that teaches AI agents what a company's data actually means, using <strong>Flask</strong>, <strong>React</strong>, <strong>PostgreSQL</strong>, <strong>DynamoDB</strong>, <strong>Socket.io</strong>, and <strong>AWS</strong>, with the cloud infrastructure defined as code in <strong>Terraform</strong>.</li>
                                    <li>Modeled the KB as <strong>configurable, database-backed context</strong>: connection details, <strong>table and field schemas</strong>, descriptions and aliases, <strong>table relationships</strong>, <strong>metric definitions</strong>, and <strong>business rules</strong>, so plain-language questions resolve to consistent business meaning rather than raw column names.</li>
                                    <li>Fed KB context into the <strong>multi-agent</strong> analytics workflow, where the most relevant schemas, rules, and memories are retrieved at question time to ground <strong>intent interpretation</strong>, <strong>query generation</strong>, and <strong>result validation</strong>.</li>
                                    <li>Built <strong>RBAC</strong> for the KB with <strong>admin</strong>, <strong>contributor</strong>, and <strong>viewer</strong> access levels, so teams control who can browse, edit, and approve changes to each knowledge base.</li>
                                    <li>Implemented <strong>real-time collaboration</strong> with <strong>Socket.io</strong>, letting multiple contributors work in the same knowledge base at once and see each other's changes live without overwriting one another.</li>
                                    <li>Added <strong>data validation</strong> that checks KB definitions against the live source database, including connection health and schema and field metadata, so broken or stale definitions are caught before they reach the AI.</li>
                                    <li>Developed <strong>KB Memories</strong>, an <strong>example-retrieval layer</strong> that turns <strong>successful chat outcomes</strong> and user feedback into reusable <strong>memory artifacts</strong> that steer <strong>SQL generation</strong> for similar questions in the future.</li>
                                    <li>Built <strong>similarity detection</strong> across memories to surface near-duplicate and competing examples, with a <strong>propose, review, and commit</strong> flow so contributors decide which examples actually influence the AI.</li>
                                    <li>Implemented <strong>automatic revalidation</strong>: each memory tracks the tables, relationships, and business context it <strong>depends on</strong>, and is re-checked or invalidated when the KB changes, so outdated examples never mislead the model as the KB evolves.</li>
                                    <li>Implemented <strong>KB lifecycle</strong> and <strong>version-control</strong> workflows so teams can safely evolve a knowledge base over time, including saving changes, archiving, and restoring.</li>
                                    <li>Built <strong>AI-assisted authoring pipelines</strong> that use <strong>LLMs</strong> to help admins draft and refine table and field descriptions, business context, and rules, giving new knowledge bases a working starting point.</li>
                                </ul>
                                </AccordionContent>
                            </AccordionItem>
                            
                            {/* Lynkr */}
                            <AccordionItem value="lynkr" className="border border-white/10 rounded-lg bg-white/5">
                                <AccordionTrigger
                                className="
                                    px-4 py-3 rounded-md
                                    hover:bg-white/10 hover:no-underline
                                    transition-colors
                                    text-left
                                "
                                >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">Lynkr Inc.</span>
                                    <span className="text-sm text-white/70">Backend Software Developer</span>
                                    <span className="text-xs text-white/50">Sept 2025 – Dec 2025</span>
                                </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-4 pb-4">
                                <ul className="list-disc list-outside ml-5 space-y-1">
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
                                </AccordionContent>
                            </AccordionItem>

                            {/* Sioux */}
                            <AccordionItem value="sioux" className="border border-white/10 rounded-lg bg-white/5">
                                <AccordionTrigger className="px-4 py-3 rounded-md hover:bg-white/10 hover:no-underline transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">Sioux Technologies</span>
                                    <span className="text-sm text-white/70">Control Software Developer</span>
                                    <span className="text-xs text-white/50">Jan 2025 – Apr 2025</span>
                                </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-4 pb-4">
                                <ul className="list-disc list-outside ml-5 space-y-1">
                                    <li>Cut <strong>on-site deployment time</strong> from <strong>98 hours to 20 hours</strong> by designing and developing <strong>concurrent, streamlined installation and upgrade processes</strong>, reducing manual overhead through <strong>GitLab CI/CD</strong> pipelines and scripting.</li>
                                    <li>Refactored existing services into <strong>organized packages</strong> and developed <strong>Blazor-based API controllers</strong> to automate installations, enabling <strong>direct customer access</strong>.</li>
                                    <li>Automated <strong>server-side Windows configuration</strong> using <strong>PowerShell</strong> and <strong>Python</strong> scripts.</li>
                                    <li>Fully automated <strong>client software installation</strong> via <strong>PowerShell</strong>, significantly reducing setup time and simplifying operations.</li>
                                    <li>Automated <strong>dependency and prerequisite validation</strong> with <strong>PowerShell</strong>, including <strong>hot-fix logic</strong> to detect, debug, and install missing components during setup.</li>
                                    <li>Deployed <strong>CI/CD pipelines</strong> to pre-package release builds, generate installers, and automatically upload artifacts to the company <strong>QMS system</strong>.</li>
                                    <li>Implemented <strong>repository and commit linting</strong> via <strong>CI/CD</strong> pipelines triggered on every commit.</li>
                                    <li>Organized and led <strong>company-wide Git training sessions</strong>.</li>
                                    <li>Designed and built a <strong>commit message enforcement system</strong> that automatically rolls back commits violating defined conventions.</li>
                                </ul>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Capital Air */}
                            <AccordionItem value="capital-air" className="border border-white/10 rounded-lg bg-white/5">
                                <AccordionTrigger className="px-4 py-3 rounded-md hover:bg-white/10 hover:no-underline transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">Capital Air Inc.</span>
                                    <span className="text-sm text-white/70">Software Engineering Intern</span>
                                    <span className="text-xs text-white/50">Jun 2023 – Aug 2023</span>
                                </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-4 pb-4">
                                <ul className="list-disc list-outside ml-5 space-y-1">
                                    <li>Individually built a <strong>data analysis system</strong> that ingests <strong>real-time pollution data</strong> from <strong>1,000+</strong> nationwide sites using <strong>SQL</strong> and visualizes it as a <strong>heat map</strong> via the <strong>Kriging method</strong></li>
                                    <li>Later ported to a <strong>Flask</strong> backend API and adopted in Capital Air Inc.’s production software, serving <strong>thousands of clients</strong>.</li>
                                </ul>
                                </AccordionContent>
                            </AccordionItem>

                            </Accordion>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="education">
                        <AccordionTrigger className="text-lg font-semibold uppercase tracking-wide">Education</AccordionTrigger>
                        <AccordionContent className="text-white/90 leading-relaxed">
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
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="awards">
                        <AccordionTrigger className="text-lg font-semibold uppercase tracking-wide">Awards</AccordionTrigger>
                        <AccordionContent className="text-white/90 leading-relaxed">
                            <p><strong>Academic</strong></p>
                            <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
                                <li>Term Distinction (Top 10% of class)</li>
                                <li>President's Scholarship with Distinction</li>
                                <li>2nd Place - Waterloo Engineering Competition 2025</li>
                                <li>Honour Roll (Top 5%) - Canadian Computing Competition 2023</li>
                                <li>Distinction (Top 20%) - Canadian Computing Competition 2021, 2022, 2024</li>
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
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="skills">
                        <AccordionTrigger className="text-lg font-semibold uppercase tracking-wide">Skills & Languages</AccordionTrigger>
                        <AccordionContent className="text-white/90 leading-relaxed space-y-3">
                            <div>
                                <p className="font-semibold text-white mb-2">Programming Languages:</p>
                                <p>Python, JavaScript/TypeScript, C++/C, C#, Java, SQL, Go, Scripting (Powershell/YAML/Bash/CMD)</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-2">Frameworks:</p>
                                <p>NumPy, Pandas, Tensorflow, PyTorch, skLearn, spaCy, LangChain/LangGraph, Postgres/MySQL, Flask, FastAPI, Matplot, Kriging, MCP, Pydantic, React, Next.js, Socket.io, Celery, Blazor</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-2">Cloud & Infrastructure:</p>
                                <p>AWS, Azure, Google Cloud, Terraform, DynamoDB, PostgreSQL, Redis</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-2">Developer Tools:</p>
                                <p>Git, GitHub Actions, GitLab CI/CD, Node, Yarn, Docker, VS/VS Code/PyCharm, Jupyter/Anaconda, NSIS, NuGet, Vim, Jira, Confluence, IntelliJ</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-2">Spoken Languages:</p>
                                <ul className="list-disc list-outside ml-5 pl-2 space-y-1">
                                    <li>English and Mandarin - Native level</li>
                                    <li>French - Fluent level</li>
                                    <li>Japanese, Cantonese - Basic level</li>
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default IntroContent;