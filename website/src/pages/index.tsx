import type {ReactNode} from 'react';
import {useState} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {Blocks, Check, Copy, FileCode2, Hexagon, Package, Zap} from 'lucide-react';

const NPM_COMMAND = 'npm install @open-kerno/commons';

function Github({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Twitter({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 .5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function CopyCommand() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(NPM_COMMAND).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mb-10 group">
      <div
        className={`relative bg-okc-black border border-okc-cobalt rounded-xl p-1 shadow-glow transition-shadow duration-300 group-hover:shadow-glow-intense flex items-center overflow-hidden`}>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-ribbon"></div>

        <div className="flex-grow pl-4 pr-2 py-3 font-mono text-sm md:text-base text-okc-white overflow-x-auto whitespace-nowrap text-left flex items-center">
          <span className="text-okc-cyan mr-2">$</span>
          <span>{NPM_COMMAND}</span>
        </div>

        <button
          onClick={copyCommand}
          className={`bg-okc-cobalt/20 hover:bg-okc-cobalt text-okc-white p-2 rounded-lg transition-all duration-200 flex-shrink-0 group-hover:bg-okc-cobalt/50 active:scale-95 flex items-center justify-center gap-2 min-w-[44px] ${
            copied ? 'border border-okc-cyan bg-okc-cobalt/40' : ''
          }`}>
          {copied ? <Check className="w-4 h-4 text-okc-cyan" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <>
      <Head>
        <title>Open Kerno Commons | Backend Essentials for MVPs</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>{`
          tailwind.config = {
            corePlugins: { preflight: false },
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
                },
                colors: {
                  okc: {
                    black: '#000000',
                    white: '#FFFFFF',
                    electric: '#0F62FE',
                    cyan: '#00D8F6',
                    cobalt: '#003A8C',
                  }
                },
                backgroundImage: {
                  'gradient-ribbon': 'linear-gradient(135deg, #0F62FE 0%, #00D8F6 100%)',
                  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                },
                boxShadow: {
                  'ribbon': '0 4px 15px -3px rgba(15, 98, 254, 0.4), 0 4px 6px -4px rgba(0, 216, 246, 0.4)',
                  'ribbon-hover': '0 10px 25px -3px rgba(15, 98, 254, 0.6), 0 8px 10px -4px rgba(0, 216, 246, 0.5)',
                  'glow': '0 0 20px rgba(0, 58, 140, 0.6)',
                  'glow-intense': '0 0 30px rgba(15, 98, 254, 0.4)',
                }
              }
            }
          }
        `}</script>
        <style>{`
          .okc-page {
            background-color: #000000;
            color: #FFFFFF;
            font-family: Inter, sans-serif;
            -webkit-font-smoothing: antialiased;
          }

          .okc-page .bg-grid {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(0, 58, 140, 0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 58, 140, 0.15) 1px, transparent 1px);
            mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          }

          .okc-page .text-ribbon {
            background: linear-gradient(135deg, #0F62FE, #00D8F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0px 4px 15px rgba(0, 58, 140, 0.5);
          }

          .okc-page::-webkit-scrollbar { width: 8px; }
          .okc-page::-webkit-scrollbar-track { background: #000000; }
          .okc-page::-webkit-scrollbar-thumb { background: #003A8C; border-radius: 4px; }
          .okc-page::-webkit-scrollbar-thumb:hover { background: #0F62FE; }
        `}</style>
      </Head>

      <div className="okc-page min-h-screen flex flex-col relative overflow-x-hidden selection:bg-okc-electric selection:text-okc-white">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-okc-cobalt opacity-20 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-okc-electric opacity-10 blur-[100px] pointer-events-none"></div>

        <nav className="w-full border-b border-okc-cobalt/40 bg-okc-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hexagon className="text-okc-cyan w-6 h-6" />
              <span className="font-bold text-xl tracking-tight text-okc-white">
                Open<span className="text-ribbon">Kerno</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.npmjs.com/package/@open-kerno/commons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-okc-white/70 hover:text-okc-white transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium">
                <Package className="w-4 h-4" /> NPM
              </a>
              <a
                href="https://github.com/open-kerno/commons-ts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-okc-white/70 hover:text-okc-white transition-colors duration-200 flex items-center gap-1.5 text-sm font-medium">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-grow flex flex-col relative z-10">
          <div className="absolute inset-0 bg-grid pointer-events-none -z-10"></div>

          <section className="w-full pt-24 pb-20 md:pt-32 md:pb-28 px-4 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-okc-cobalt bg-okc-cobalt/10 text-okc-cyan text-xs font-semibold uppercase tracking-wider mb-8 shadow-glow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-okc-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-okc-cyan"></span>
              </span>
              v1.2.0 is now live
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6">
              Ship your MVP <br className="hidden md:block" />
              <span className="text-ribbon leading-tight">Fast & Reliably.</span>
            </h1>

            <p className="text-lg md:text-xl text-okc-white/70 max-w-2xl mb-10 leading-relaxed">
              <strong className="text-okc-white font-semibold">@open-kerno/commons</strong> provides the essential,
              robust TypeScript backend components so you can focus on building your product, not boilerplate.
            </p>

            <CopyCommand />

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              <Link
                to="/docs/"
                className="px-8 py-3.5 rounded-lg bg-gradient-ribbon text-okc-white font-bold tracking-wide shadow-ribbon hover:shadow-ribbon-hover transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center border border-okc-white/10">
                Read the Documentation
              </Link>
              <a
                href="https://github.com/open-kerno/commons-ts"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-lg bg-transparent border border-okc-cobalt hover:bg-okc-cobalt/10 text-okc-white font-semibold tracking-wide transition-all duration-300 w-full sm:w-auto text-center shadow-glow">
                View Source
              </a>
            </div>
          </section>

          <section className="w-full py-20 px-4 border-t border-okc-cobalt/30 bg-gradient-to-b from-okc-black to-okc-cobalt/5 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Open Kerno?</h2>
                <p className="text-okc-white/60">Built for modern TypeScript backend ecosystems.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-okc-black border border-okc-cobalt rounded-2xl p-8 hover:border-okc-electric/50 transition-colors duration-300 group hover:-translate-y-1 transform">
                  <div className="w-12 h-12 rounded-xl bg-gradient-ribbon p-0.5 mb-6 shadow-glow">
                    <div className="w-full h-full bg-okc-black rounded-[10px] flex items-center justify-center">
                      <FileCode2 className="w-6 h-6 text-okc-cyan group-hover:text-okc-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-okc-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-ribbon transition-all duration-300">
                    TypeScript Native
                  </h3>
                  <p className="text-okc-white/60 text-sm leading-relaxed">
                    Written entirely in TypeScript with strict mode enabled. Enjoy flawless autocompletion, type
                    safety, and robust internal interfaces out of the box.
                  </p>
                </div>

                <div className="bg-okc-black border border-okc-cobalt rounded-2xl p-8 hover:border-okc-electric/50 transition-colors duration-300 group hover:-translate-y-1 transform relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-ribbon opacity-10 blur-xl group-hover:opacity-30 transition-opacity"></div>

                  <div className="w-12 h-12 rounded-xl bg-gradient-ribbon p-0.5 mb-6 shadow-glow">
                    <div className="w-full h-full bg-okc-black rounded-[10px] flex items-center justify-center">
                      <Blocks className="w-6 h-6 text-okc-cyan group-hover:text-okc-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-okc-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-ribbon transition-all duration-300">
                    Modular Design
                  </h3>
                  <p className="text-okc-white/60 text-sm leading-relaxed">
                    Import only what you need. From error handlers to data mappers and utility wrappers, keep your
                    backend bundles lean and performant.
                  </p>
                </div>

                <div className="bg-okc-black border border-okc-cobalt rounded-2xl p-8 hover:border-okc-electric/50 transition-colors duration-300 group hover:-translate-y-1 transform">
                  <div className="w-12 h-12 rounded-xl bg-gradient-ribbon p-0.5 mb-6 shadow-glow">
                    <div className="w-full h-full bg-okc-black rounded-[10px] flex items-center justify-center">
                      <Zap className="w-6 h-6 text-okc-cyan group-hover:text-okc-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-okc-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-ribbon transition-all duration-300">
                    MVP Ready
                  </h3>
                  <p className="text-okc-white/60 text-sm leading-relaxed">
                    Skip the repetitive setup phase. Our battle-tested components are specifically designed to help
                    startups and makers launch their APIs faster.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full border-t border-okc-cobalt/40 bg-okc-black py-8 px-4 z-10 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Hexagon className="text-okc-cobalt w-5 h-5" />
              <span className="text-okc-white/50 text-sm">© 2026 Open Kerno. MIT Licensed.</span>
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/open-kerno/commons-ts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-okc-white/50 hover:text-okc-cyan transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.npmjs.com/package/@open-kerno/commons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-okc-white/50 hover:text-okc-electric transition-colors duration-200">
                <span className="sr-only">NPM</span>
                <Package className="w-5 h-5" />
              </a>
              <a href="#" className="text-okc-white/50 hover:text-okc-cyan transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
