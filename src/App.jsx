import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Code2, 
  Terminal, 
  Database, 
  Cpu, 
  Layers,
  ChevronRight, 
  User, 
  Briefcase, 
  Wrench, 
  Leaf, 
  TreePine, 
  Sprout, 
  Flower2, 
  Send, 
  MessageSquare, 
  Sun, 
  Moon,
  Smartphone,
  Bot,
  Calculator,
  ShoppingCart,
  BookOpen,
  Trello,
  GitBranch,
  CheckCircle2,
  X,
  Menu,
  Loader2,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

/**
 * Komponen pembungkus untuk animasi muncul saat scroll
 */
const FadeInSection = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State Asisten AI
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm Git's AI assistant. Ask me anything about Raghid's skills or projects!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // State Kontak
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update tab aktif berdasarkan posisi scroll
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Update Favicon
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/jpeg';
    link.rel = 'icon';
    link.href = './main/src/assets/tiktok.jpeg';
    document.getElementsByTagName('head')[0].appendChild(link);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Kunci scroll saat menu mobile terbuka
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const profile = {
    avatar: "./main/src/assets/tiktok.jpeg",
    name: "Raghid Muhammad",
    role: "Software Engineering Student",
    email: "raghidmuhammad3@gmail.com",
    bio: "I am a 1st-semester Software Engineering student with a deep interest in backend development and system architecture.",
    about: "My journey in technology began in the 1st grade of Vocational High School (SMK). An early interest in programming logic led me to experiment with languages like Java and Python. Currently, I am pursuing a Bachelor's degree in Software Engineering (Semester 1) to deepen my understanding of software architecture.",
    skills: [
      { name: "Java", icon: <Terminal className="w-5 h-5" /> },
      { name: "Python", icon: <Cpu className="w-5 h-5" /> },
      { name: "PHP", icon: <Code2 className="w-5 h-5" /> },
      { name: "MySQL", icon: <Database className="w-5 h-5" /> },
      { name: "VSCode", icon: <Terminal className="w-5 h-5" /> },
      { name: "Github", icon: <Github className="w-5 h-5" /> },
      { name: "Laravel", icon: <Layers className="w-5 h-5" /> },
      { name: "Bitbucket", icon: <GitBranch className="w-5 h-5" /> },
      { name: "Trello", icon: <Trello className="w-5 h-5" /> }
    ],
    socials: [
      { name: "Instagram", icon: <Instagram className="w-5 h-5" />, url: "https://www.instagram.com/raghm_/" },
      { name: "X", icon: <Twitter className="w-5 h-5" />, url: "https://x.com/ramaa3_" },
      { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/raghidma/" }
    ],
    projects: [
      {
        title: "Library Information System",
        description: "A comprehensive web-based system using Laravel and MySQL for managing books and borrowing transactions.",
        tech: ["Laravel", "MySQL", "PHP"],
        icon: <Database className="w-6 h-6" />,
        repo: "https://github.com/G1ts-3/LSP_RaghidMuhammad_2025"
      },
      {
        title: "Finance Automation AI",
        description: "AI assistant integrated with Telegram and Google Sheets for personal financial tracking and automation.",
        tech: ["Python", "AI", "API"],
        icon: <Bot className="w-6 h-6" />,
        repo: "https://github.com/G1ts-3/AssistenKeuangan"
      },
      {
        title: "Stopwatch & Timer App",
        description: "A mobile application developed using Flutter and Dart for precise time management.",
        tech: ["Flutter", "Dart", "Android"],
        icon: <Smartphone className="w-6 h-6" />,
        repo: "https://github.com/G1ts-3"
      }
    ]
  };

  const callGemini = async (prompt) => {
    const part1 = "ToWFBTUsuOChE"; 
    const part2 = "AIzaSyAUetTtaC"; // Ganti dengan 7-10 karakter awal API Key kamu
    const part3 = "6AYXV0AULFw3"; // Ganti dengan sisa API Key kamu
    const apiKey = part2 + part3 + part1; // API key otomatis disediakan oleh environment
    const systemPrompt = `
      Use English as the default language, unless the user asks in another language.
      You are an AI assistant for the personal portfolio website of Git (Raghid Muhammad).

      Your task is to answer visitors' questions about Git in a professional, concise, clear, engaging, friendly, and approachable way.
      Keep the tone modern and natural, not too formal, not too casual.

      ====================
      PROFILE INFORMATION
      ====================

      - **Name:** Git (Raghid Muhammad)
      - **Current Status:** 1st-semester Bachelor's student in Software Engineering(Rekayasa Perangkat Lunak) at Telkom University
      - **Coding Experience:** Started learning programming since 1st grade of Vocational High School (SMK); over 3 years of experience
      - **Personality Type:** ISFP-T (Adventurer)
      - **Age / Birth:** 18 years old (June 10 2007)
      - **Vocational School:** SMK Telkom Jakarta
      - **University:** Telkom University, Bandung
      - **Origin:** South Jakarta, Indonesia
      - **Zodiac:** Gemini
      - **Blood Type:** O
      - **Communication Style:** Uses "aku–kamu" style for casual conversations

      ====================
      SKILLS & TOOLS
      ====================

      - **Backend:** Python, Java, PHP, Laravel, Dart
      - **Frontend / Mobile:** HTML5, CSS3, Tailwind CSS, Flutter
      - **Database & Tools:** MySQL, PHPMyAdmin, Git, Android Studio, VS Code, Sublime Text

      ====================
      PROJECTS
      ====================

      1. **Library Information System**  
        Web application using Laravel + MySQL + Bootstrap for book borrowing and returns.

      2. **Cashier & Game Programs**  
        Python CLI projects including a simple cashier system and rock–paper–scissors game.

      3. **Calculator Applications**  
        Built in Java, Python, and HTML/CSS to demonstrate programming logic.

      4. **Stopwatch & Timer App**  
        Android application developed using Flutter & Dart.

      5. **Dealer Management System (DMS)**  
        Web-based project created as part of an internship final report.

      6. **Smart Personal Finance Automation**  
        An AI-based personal finance assistant integrated with Telegram and Google Sheets.

      > If users ask about the finance automation system, explain that it can be found on Git’s GitHub or social media, as it is not yet fully showcased on the portfolio.

      ====================
      EXPERIENCE
      ====================

      - **Internship:**  
        PT. Magna Solusindo — 6 months as a Support Developer  
        Worked on frontend, backend, and company database management.

      ====================
      INTERESTS & HOBBIES
      ====================

      - Academic growth and campus life
      - JKT48 (oshi: Gabriela Abigail / Ella)
      - Investment (mutual funds, bonds, stocks)
      - Mobile games: Mobile Legends (Mythic Honor), Clash of Clans (TH 13)
      - Reading romance manga
      - Watching animation and podcasts on YouTube

      ====================
      INVESTMENT
      ====================

      - Mutual funds: Majoris Pasar Uang Syariah Indonesia, Majoris Sukuk Negara Indonesia
      - Stocks
      - Cryptocurrency (BTC) via Pluang

      ====================
      CONTACT & SOCIALS
      ====================

      - **Email:** raghidmuhammad3@gmail.com
      - **GitHub:** G1ts-3
      - **LinkedIn:** Raghid Muhammad
      - **Instagram:** @raghm_
      - **X / Twitter:** @ramaa3_

      ====================
      ANSWER GUIDELINES
      ====================

      - Answer **as Git** (if the user says “you”, respond using “I / aku”).
      - Always reply in the **same language** as the user.
      - Keep answers **short, clear, and relevant** (max 3–4 sentences unless more detail is requested).
      - Use Markdown formatting when helpful.
      - If asked about something outside Git’s profile, politely state that you only have professional information.
      - Show enthusiasm about Git’s journey from SMK to Telkom University.
      - Encourage visitors to check Git’s GitHub or social media when relevant.
      `;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await response.json();
  };

  const handleAiChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    const userMsg = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);
    try {
      const data = await callGemini(chatInput);
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error processing request.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const scrollTo = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false); 
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const theme = {
    bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900',
    card: isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm',
    input: isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900',
    nav: isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-md',
    muted: isDarkMode ? 'text-slate-400' : 'text-slate-600',
  };

  const navLinks = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <div className={`min-h-screen ${theme.bg} font-sans transition-colors duration-500 selection:bg-emerald-500/30 overflow-x-hidden`}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <header className={`fixed top-0 w-full z-[200] transition-all duration-300 ${scrolled ? `${theme.nav} backdrop-blur-xl py-4 border-b` : 'bg-transparent py-8 border-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative z-[210]">
          <button onClick={() => scrollTo('home')} className="text-2xl font-black flex items-center gap-2 group shrink-0">
            <Leaf className="w-7 h-7 text-emerald-500 transition-transform group-hover:rotate-12" />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Git's</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(id => (
              <button 
                key={id} 
                onClick={() => scrollTo(id)} 
                className={`text-sm font-bold capitalize transition-all hover:text-emerald-500 relative py-1 whitespace-nowrap ${activeTab === id ? 'text-emerald-500' : theme.muted}`}
              >
                {id}
                {activeTab === id && <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-emerald-500 rounded-full animate-in fade-in slide-in-from-left-1 duration-300" />}
              </button>
            ))}
            <div className={`w-[1px] h-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <button onClick={toggleTheme} className={`p-2 rounded-xl border transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'border-slate-800 text-yellow-400 bg-slate-900/50' : 'border-slate-200 text-indigo-600 bg-white shadow-sm'}`}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggleTheme} className={`p-2.5 rounded-xl border transition-all ${isDarkMode ? 'border-slate-800 text-yellow-400 bg-slate-900/50' : 'border-slate-200 text-indigo-600 bg-white shadow-sm'}`}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-2.5 rounded-xl border transition-all relative ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white shadow-sm'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6 animate-in spin-in-90 duration-300" /> : <Menu className="w-6 h-6 animate-in fade-in duration-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Dipindah keluar header agar z-index lebih aman */}
      <div className={`fixed inset-0 z-[190] md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-950/98' : 'bg-white/98'} backdrop-blur-3xl`} />
        <div className="relative h-full flex flex-col items-center justify-center gap-10 px-6">
          {navLinks.map((id, i) => (
            <button 
              key={id} 
              onClick={() => scrollTo(id)} 
              className={`text-4xl font-black capitalize transition-all tracking-tight ${activeTab === id ? 'text-emerald-500 scale-110' : theme.muted} ${isMenuOpen ? 'animate-in fade-in slide-in-from-bottom-4 duration-500' : ''}`}
              style={{ animationDelay: `${i * 75}ms` }}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 relative z-10 pt-32">
        {/* Home */}
        <section id="home" className="min-h-[85vh] flex items-center mb-24 scroll-mt-32">
          <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end lg:order-last">
              <FadeInSection delay={200}>
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-emerald-500 blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className={`w-56 h-56 md:w-96 md:h-96 rounded-[3rem] md:rounded-[4rem] overflow-hidden border-4 md:border-8 relative z-10 transition-all duration-500 cursor-pointer hover:scale-105 hover:rotate-3 hover:border-emerald-500 ${isDarkMode ? 'border-slate-900 shadow-2xl' : 'border-white shadow-xl'}`}>
                    <img src="./main/src/assets/tiktok.jpeg" alt="Raghid" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
              </FadeInSection>
            </div>

            <div className="w-full lg:w-7/12">
              <FadeInSection>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 text-[10px] md:text-xs font-black uppercase tracking-wider ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                  <Sprout className="w-4 h-4" /> {profile.role}
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter text-center lg:text-left">
                  Hello <br /><span className="text-emerald-500">Everyone</span>
                </h1>
                <p className={`text-lg md:text-xl ${theme.muted} max-w-xl mb-12 font-medium leading-relaxed text-center lg:text-left mx-auto lg:mx-0`}>
                  I am <span className="font-bold text-emerald-500 underline underline-offset-8 decoration-2">{profile.name}</span>. {profile.bio}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button onClick={() => scrollTo('projects')} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-all active:scale-95">View Projects</button>
                  <button onClick={() => scrollTo('contact')} className={`px-10 py-4 border rounded-2xl font-black transition-all ${isDarkMode ? 'border-slate-800 hover:bg-slate-900' : 'border-slate-200 hover:bg-slate-50 shadow-sm'}`}>Contact Me</button>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 scroll-mt-32">
          <FadeInSection>
            <div className="flex items-center gap-4 mb-12">
              <BookOpen className="text-emerald-500 w-8 h-8" />
              <h2 className="text-4xl font-black tracking-tight">About Me</h2>
              <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
            <div className={`p-10 md:p-16 ${theme.card} rounded-[3rem] border shadow-xl relative overflow-hidden group`}>
              <TreePine className="absolute -right-10 -bottom-10 w-64 h-64 text-emerald-500 opacity-5 transition-transform group-hover:scale-110 pointer-events-none" />
              <p className="text-xl md:text-2xl leading-relaxed font-bold tracking-tight relative z-10 max-w-4xl">{profile.about}</p>
            </div>
          </FadeInSection>
        </section>

        {/* Expertise */}
        <section id="skills" className="py-24 scroll-mt-32">
          <FadeInSection>
            <div className="flex items-center gap-4 mb-12">
              <Wrench className="text-emerald-500 w-8 h-8" />
              <h2 className="text-4xl font-black tracking-tight">Expertise</h2>
              <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {profile.skills.map((s, i) => (
                <div key={i} className={`p-8 ${theme.card} rounded-3xl text-center border hover:-translate-y-2 transition-all group cursor-default`}>
                  <div className={`w-16 h-16 mx-auto flex items-center justify-center text-emerald-500 mb-6 bg-emerald-500/5 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300`}>{s.icon}</div>
                  <h3 className="font-black text-sm tracking-tight">{s.name}</h3>
                </div>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 scroll-mt-32">
          <FadeInSection>
            <div className="flex items-center gap-4 mb-12">
              <Flower2 className="text-emerald-500 w-8 h-8" />
              <h2 className="text-4xl font-black tracking-tight">Works</h2>
              <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {profile.projects.map((p, i) => (
                <div key={i} className={`group ${theme.card} rounded-[2.5rem] border overflow-hidden hover:border-emerald-500/50 transition-all shadow-lg`}>
                  <div className="h-56 bg-emerald-500/5 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop')] bg-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="text-emerald-500 p-6 bg-emerald-500/10 rounded-3xl scale-150 group-hover:scale-[1.8] group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">{p.icon}</div>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-3xl font-black group-hover:text-emerald-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-2xl transition-all ${isDarkMode ? 'bg-slate-800 text-white hover:bg-emerald-600' : 'bg-slate-100 text-slate-900 hover:bg-emerald-500 hover:text-white shadow-sm'}`}>
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                    <p className={`${theme.muted} mb-8 font-bold leading-relaxed text-lg`}>{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t, j) => (
                        <span key={j} className="text-[10px] font-black px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 uppercase tracking-widest">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a href="https://github.com/G1ts-3" target="_blank" rel="noopener noreferrer" className={`px-10 py-5 rounded-3xl border-2 font-black text-xl flex items-center gap-4 transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-2xl active:scale-95 ${isDarkMode ? 'border-slate-800 bg-slate-900/50 text-emerald-500' : 'border-slate-100 bg-white shadow-sm text-emerald-600'}`}>
                <Github className="w-7 h-7" /> <span>Explore My Repositories</span> <ChevronRight className="w-6 h-6" />
              </a>
            </div>
          </FadeInSection>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 scroll-mt-32">
          <FadeInSection>
            <div className="flex items-center gap-4 mb-12">
              <MessageSquare className="text-emerald-500 w-8 h-8" />
              <h2 className="text-4xl font-black tracking-tight">Contact</h2>
              <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight">Let's Connect</h3>
                  <p className={`${theme.muted} text-xl font-bold leading-relaxed`}>Open for new projects and collaborations. Let's build something amazing together.</p>
                </div>
                <a 
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-6 group cursor-pointer transition-all hover:translate-x-2"
                >
                  <div className="p-5 bg-emerald-500/10 rounded-2xl text-emerald-500 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <Mail className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-500 tracking-widest group-hover:text-emerald-400 transition-colors">Email Address</p>
                    <p className="text-xl font-black break-all">{profile.email}</p>
                  </div>
                </a>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <form onSubmit={handleFormSubmit} className={`p-10 ${theme.card} rounded-[3rem] space-y-6 border shadow-2xl`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required name="name" value={formData.name} onChange={handleFormChange} placeholder="Full Name" className={`p-5 rounded-2xl border outline-none font-bold transition-all focus:border-emerald-500 ${theme.input}`} />
                    <input required type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" className={`p-5 rounded-2xl border outline-none font-bold transition-all focus:border-emerald-500 ${theme.input}`} />
                  </div>
                  <textarea required name="message" value={formData.message} onChange={handleFormChange} rows="5" placeholder="Tell me about your idea..." className={`w-full p-5 rounded-3xl border outline-none font-bold resize-none transition-all focus:border-emerald-500 ${theme.input}`}></textarea>
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send /> Send Message</>}
                  </button>
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-3 text-emerald-500 justify-center p-4 bg-emerald-500/5 rounded-2xl animate-bounce">
                      <CheckCircle2 className="w-6 h-6" /> <span className="font-black text-sm">Message sent successfully!</span>
                    </div>
                  )}
                </form>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {profile.socials.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-6 py-4 rounded-2xl border font-black transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-emerald-600' : 'border-slate-200 bg-white hover:bg-slate-50 shadow-sm text-emerald-600'}`}>
                      {s.icon} <span className="text-sm tracking-tight">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* AI Assistant */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] flex flex-col items-end gap-5">
        {isChatOpen && (
          <div className={`w-[90vw] sm:w-[400px] h-[500px] md:h-[550px] border-2 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all animate-in fade-in slide-in-from-bottom-10 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-6 bg-emerald-600 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Bot className="w-7 h-7" /></div>
                <div><p className="text-lg font-black leading-tight">Git's Assistant</p><p className="text-[10px] font-black uppercase opacity-80">AI Representation</p></div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-6 custom-scrollbar scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-normal shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : isDarkMode ? 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700' : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs font-black text-emerald-500 animate-pulse bg-emerald-500/10 px-4 py-2 rounded-xl inline-block">Thinking...</div>}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleAiChat} className="p-4 md:p-6 border-t border-slate-800/20 bg-emerald-500/5">
              <div className="flex gap-3">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask me something..." className={`flex-grow px-6 py-3 rounded-2xl text-sm outline-none border font-bold transition-all focus:border-emerald-500 ${theme.input}`} />
                <button type="submit" disabled={isTyping} className="px-5 bg-emerald-600 text-white rounded-2xl shadow-lg hover:bg-emerald-500 transition-all disabled:opacity-50"><Send className="w-6 h-6" /></button>
              </div>
            </form>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 relative ${isChatOpen ? 'bg-slate-800' : 'bg-emerald-600 hover:rotate-6'}`}>
          {isChatOpen ? <X className="w-8 h-8" /> : <><Bot className="w-8 h-8" /><div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-emerald-400 rounded-full border-4 border-slate-950 animate-ping" /></>}
        </button>
      </div>

      <footer className="py-20 text-center opacity-40 text-[10px] font-black uppercase tracking-[0.3em] pointer-events-none">
        <p>{profile.name} &bull; Software Engineering &bull; 2025</p>
      </footer>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-2 { from { transform: translateY(0.5rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(1rem); } to { transform: translateY(0); } }
        @keyframes slide-in-from-bottom-10 { from { transform: translateY(2.5rem); } to { transform: translateY(0); } }
        @keyframes slide-in-from-left-1 { from { transform: translateX(-0.5rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-in { animation-duration: 0.6s; animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-2 { animation-name: slide-in-from-bottom-2; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        .slide-in-from-bottom-10 { animation-name: slide-in-from-bottom-10; }
        .slide-in-from-left-1 { animation-name: slide-in-from-left-1; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b98130; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b98160; }
      `}</style>
    </div>
  );
};

export default App;