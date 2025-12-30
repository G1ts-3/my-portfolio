import avatarImg from './assets/tiktok.jpeg'
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Github, ExternalLink, Mail, Code2, Terminal, Database, Cpu, Layers,
  ChevronRight, User, Briefcase, Wrench, Leaf, TreePine, Sprout, Flower2, 
  Send, MessageSquare, Sun, Moon, Smartphone, Bot, BookOpen, Trello, 
  GitBranch, CheckCircle2, X, Menu, Loader2, Instagram, Twitter, Linkedin,
  Globe, Languages, ChevronDown
} from 'lucide-react';

// --- TRANSLATIONS DATA ---
const translations = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Works', contact: 'Contact' },
    hero: { greeting: 'Hello', sub: 'I am', role: 'Software Engineering Student', cta1: 'View Projects', cta2: 'Contact Me' },
    about: { title: 'The Story', text: "My journey in technology began in the 1st grade of Vocational High School (SMK). An early interest in programming logic led me to experiment with languages like Java and Python. Currently, I am pursuing a Bachelor's degree in Software Engineering to deepen my understanding of software architecture." },
    skills: { title: 'Expertise' },
    projects: { title: 'Selected Works', repo: 'Explore Repositories' },
    contact: { title: 'Get In Touch', sub: "Let's Connect", desc: "Open for new projects and collaborations. Let's build something amazing together.", name: 'Full Name', email: 'Email', msg: 'Tell me about your idea...', send: 'Send Message', success: 'Sent!' },
    ai: { welcome: "Hi! I'm Git's AI. Ask me anything!", thinking: "Thinking...", input: "Type a message..." }
  },
  id: {
    nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', projects: 'Karya', contact: 'Kontak' },
    hero: { greeting: 'Halo', sub: 'Saya', role: 'Mahasiswa Rekayasa Perangkat Lunak', cta1: 'Lihat Proyek', cta2: 'Hubungi Saya' },
    about: { title: 'Cerita Saya', text: "Perjalanan saya di dunia teknologi dimulai sejak kelas 1 SMK. Ketertarikan awal pada logika pemrograman membawa saya bereksperimen dengan Java dan Python. Saat ini, saya sedang menempuh gelar Sarjana Rekayasa Perangkat Lunak untuk memperdalam arsitektur perangkat lunak." },
    skills: { title: 'Keahlian' },
    projects: { title: 'Karya Pilihan', repo: 'Jelajahi Repositori' },
    contact: { title: 'Hubungi', sub: "Mari Terhubung", desc: "Terbuka untuk proyek baru dan kolaborasi. Mari bangun sesuatu yang luar biasa.", name: 'Nama Lengkap', email: 'Email', msg: 'Ceritakan ide Anda...', send: 'Kirim Pesan', success: 'Terkirim!' },
    ai: { welcome: "Halo! Saya asisten AI Git. Tanya apa saja!", thinking: "Berpikir...", input: "Ketik pesan..." }
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'حول', skills: 'المهارات', projects: 'الأعمال', contact: 'اتصل' },
    hero: { greeting: 'مرحباً', sub: 'أنا', role: 'طالب هندسة برمجيات', cta1: 'عرض المشاريع', cta2: 'اتصل بي' },
    about: { title: 'قصتي', text: "بدأت رحلتي في التكنولوجيا في الصف الأول من المدرسة الثانوية المهنية. قادني الاهتمام المبكر بمنطق البرمجة إلى التجربة بلغات مثل Java و Python. حاليًا ، أتابع درجة البكالوريوس في هندسة البرمجيات لتعميق فهمي لهندسة البرمجيات." },
    skills: { title: 'الخبرة' },
    projects: { title: 'أعمال مختارة', repo: 'استكشاف المستودعات' },
    contact: { title: 'تواصل معي', sub: "لنبدأ التواصل", desc: "مفتوح للمشاريع والتعاون الجديد. فلنبني شيئاً مذهلاً معاً.", name: 'الاسم الكامل', email: 'البريد الإلكتروني', msg: 'أخبرني عن فكرتك...', send: 'إرسال الرسالة', success: 'تم الإرسال!' },
    ai: { welcome: "مرحباً! أنا مساعد Git الآلي. اسألني أي شيء!", thinking: "يفكر...", input: "اكتب رسالة..." }
  },
  ja: {
    nav: { home: 'ホーム', about: '自己紹介', skills: 'スキル', projects: '制作物', contact: '連絡先' },
    hero: { greeting: 'こんにちは', sub: '私は', role: 'ソフトウェア工学専攻の学生', cta1: 'プロジェクトを見る', cta2: 'お問い合わせ' },
    about: { title: 'ストーリー', text: "私のテクノロジーへの旅は、職業高校（SMK）の1年生の時に始まりました。プログラミングロジックへの初期の関心から、JavaやPythonなどの言語を試すようになりました。現在は、ソフトウェアアーキテクチャの理解を深めるために、ソフトウェア工学の学士号を取得中です。" },
    skills: { title: '専門知識' },
    projects: { title: '選ばれた作品', repo: 'リポジトリを探索する' },
    contact: { title: '連絡を取る', sub: "繋がりましょう", desc: "新しいプロジェクトやコラボレーションを受け付けています。一緒に素晴らしいものを作りましょう。", name: '氏名', email: 'メールアドレス', msg: 'あなたのアイデアを聞かせてください...', send: 'メッセージを送信', success: '送信完了！' },
    ai: { welcome: "こんにちは！GitのAIアシスタントです。何でも聞いてください！", thinking: "考え中...", input: "メッセージを入力..." }
  },
  ko: {
    nav: { home: '홈', about: '소개', skills: '기술', projects: '작업', contact: '연락처' },
    hero: { greeting: '안녕하세요', sub: '저는', role: '소프트웨어 공학 전공 학생', cta1: '프로젝트 보기', cta2: '문의하기' },
    about: { title: '이야기', text: "나의 기술 여정은 직업 고등학교(SMK) 1학년 때 시작되었습니다. 프로グラミング 로직에 대한 초기 관심으로 Java 및 Python과 같은 언어를 실험하게 되었습니다. 현재는 소프트웨어 아키텍처에 대한 이해를 넓히기 위해 소프트웨어 공학 학사 학위를 공부하고 있습니다." },
    skills: { title: '전문성' },
    projects: { title: '주요 작업', repo: '저장소 탐색' },
    contact: { title: '연락하기', sub: "함께해요", desc: "새로운 프로젝트와 협업에 열려 있습니다. 함께 멋진 것을 만들어 봅시다.", name: '이름', email: '이메일', msg: '당신의 아이디어를 들려주세요...', send: '메시지 보내기', success: '전송 완료!' },
    ai: { welcome: "안녕하세요! Git의 AI 비서입니다. 무엇이든 물어보세요!", thinking: "생각 중...", input: "메시지 입력..." }
  },
  zh: {
    nav: { home: '首页', about: '关于', skills: '技能', projects: '作品', contact: '联系' },
    hero: { greeting: '你好', sub: '我是', role: '软件工程专业学生', cta1: '查看项目', cta2: '联系我' },
    about: { title: '我的故事', text: "我的技术之旅始于职业高中（SMK）一年级。对编程逻辑的早期兴趣促使我尝试了 Java 和 Python 等语言。目前，我正在攻读软件工程学士学位，以加深对软件架构的理解。" },
    skills: { title: '专业知识' },
    projects: { title: '精选作品', repo: '探索仓库' },
    contact: { title: '保持联系', sub: "建立联系", desc: "欢迎开展新项目和合作。让我们共同创造精彩的作品。", name: '全名', email: '电子邮件', msg: '告诉我你的想法...', send: '发送消息', success: '已发送！' },
    ai: { welcome: "你好！我是 Git 的 AI 助手。随便问我！", thinking: "思考中...", input: "输入消息..." }
  },
  tl: {
    nav: { home: 'Home', about: 'Tungkol', skills: 'Kasanayan', projects: 'Gawa', contact: 'Kontak' },
    hero: { greeting: 'Halo', sub: 'Ako si', role: 'Mag-aaral ng Software Engineering', cta1: 'Tingnan ang Proyekto', cta2: 'Kontakin Ako' },
    about: { title: 'Ang Kwento', text: "Nagsimula ang aking paglalakbay sa teknolohiya noong unang taon ng Vocational High School (SMK). Ang maagang interes sa programming logic ay nag-udyok sa akin na sumubok ng Java at Python. Kasalukuyan akong kumukuha ng Bachelor's degree sa Software Engineering." },
    skills: { title: 'Kadalubhasaan' },
    projects: { title: 'Mga Piniling Gawa', repo: 'I-explore ang Repositories' },
    contact: { title: 'Makipag-ugnayan', sub: "Mag-connect Tayo", desc: "Bukas para sa mga bagong proyekto at kolaborasyon. Gumawa tayo ng kamangha-manghang bagay.", name: 'Buong Pangalan', email: 'Email', msg: 'Sabihin ang iyong ideya...', send: 'Magpadala ng Mensahe', success: 'Naipadala na!' },
    ai: { welcome: "Halo! Ako ang AI assistant ni Git. Magtanong ng kahit ano!", thinking: "Nag-iisip...", input: "Mag-type ng mensahe..." }
  },
  ms: {
    nav: { home: 'Utama', about: 'Tentang', skills: 'Kemahiran', projects: 'Karya', contact: 'Hubungi' },
    hero: { greeting: 'Halo', sub: 'Saya', role: 'Pelajar Kejuruteraan Perisian', cta1: 'Lihat Projek', cta2: 'Hubungi Saya' },
    about: { title: 'Kisah Saya', text: "Perjalanan saya dalam dunia teknologi bermula sejak tingkatan 1 di Sekolah Menengah Vokasional (SMK). Minat awal dalam logik pengaturcaraan membawa saya bereksperimen dengan Java dan Python. Kini, saya sedang mengikuti ijazah Sarjana Muda Kejuruteraan Perisian." },
    skills: { title: 'Kepakaran' },
    projects: { title: 'Karya Pilihan', repo: 'Teroka Repositori' },
    contact: { title: 'Hubungi Kami', sub: "Mari Berhubung", desc: "Terbuka untuk projek baharu dan kolaborasi. Mari bina sesuatu yang luar biasa bersama-sama.", name: 'Nama Penuh', email: 'Emel', msg: 'Ceritakan idea anda...', send: 'Hantar Mesej', success: 'Dihantar!' },
    ai: { welcome: "Halo! Saya pembantu AI Git. Tanya apa sahaja!", thinking: "Berfikir...", input: "Taip mesej..." }
  }
};

const FadeInSection = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // AI Assistant State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    setMessages([{ role: 'ai', text: t.ai.welcome }]);
  }, [lang, t.ai.welcome]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const profile = {
    name: "Raghid Muhammad",
    role: "Software Engineering Student",
    email: "raghidmuhammad3@gmail.com",
    skills: [
      { name: "Java", icon: <Terminal className="w-5 h-5" /> },
      { name: "Python", icon: <Cpu className="w-5 h-5" /> },
      { name: "PHP", icon: <Code2 className="w-5 h-5" /> },
      { name: "MySQL", icon: <Database className="w-5 h-5" /> },
      { name: "Github", icon: <Github className="w-5 h-5" /> },
      { name: "Laravel", icon: <Layers className="w-5 h-5" /> },
      { name: "Flutter", icon: <Smartphone className="w-5 h-5" /> },
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
        description: "Web-based system using Laravel and MySQL for managing borrowing transactions.",
        tech: ["Laravel", "MySQL", "PHP"],
        icon: <Database className="w-6 h-6" />,
        repo: "https://github.com/G1ts-3/LSP_RaghidMuhammad_2025"
      },
      {
        title: "Finance Automation AI",
        description: "AI assistant integrated with Telegram and Google Sheets for tracking and automation.",
        tech: ["Python", "AI", "API"],
        icon: <Bot className="w-6 h-6" />,
        repo: "https://github.com/G1ts-3/AssistenKeuangan"
      }
    ]
  };

  const callGemini = async (prompt) => {
    const part1 = "ToWFBTUsuOChE"; 
    const part2 = "AIzaSyAUetTtaC"; // Ganti dengan 7-10 karakter awal API Key kamu
    const part3 = "6AYXV0AULFw3"; // Ganti dengan sisa API Key ka
    const apiKey = part2 + part3 + part1; 
    const systemPrompt = `
        You are an AI assistant for Raghid Muhammad (Git), a 1st-semester Software Engineering student at Telkom University.

        Answer questions in ${
          lang === 'ar' ? 'Arabic' :
          lang === 'ja' ? 'Japanese' :
          lang === 'ko' ? 'Korean' :
          lang === 'zh' ? 'Chinese' :
          lang === 'tl' ? 'Tagalog' :
          lang === 'ms' ? 'Malay' :
          lang === 'id' ? 'Indonesian' :
          'English'
        }.

        General tone:
        - Answer **as Git** using "I / aku".
        - Professional, friendly, modern, and concise (max 3–4 sentences).
        - Suitable for a personal portfolio website.

        Profile:
        Git was born on June 10, 2007.
        He graduated from SMK Telkom Jakarta in June 2025 and in September began his undergraduate studies in Software Engineering in Bandung.
        His personality type is ISFP-T.
        Skilled in backend (Python, Java, PHP, Laravel), frontend/mobile (HTML, CSS, Tailwind, Flutter), and databases/tools (MySQL, Git).
        Skills:
        Backend (Python, Java, PHP, Laravel), frontend/mobile (HTML, CSS, Tailwind, Flutter), databases/tools (MySQL, Git).
        Experience:
        Git completed a 6-month internship at PT. Magna Solusindo as a Support Developer, handling frontend, backend, and company database management.

        Projects:
        - Library Information System (Laravel + MySQL)
        - Cashier & simple game programs (Python CLI)
        - Calculator apps (Java, Python, HTML/CSS)
        - Stopwatch & Timer mobile app (Flutter)
        - Dealer Management System (internship final project)
        - AI-based personal finance automation (Telegram + Google Sheets, available on GitHub)

        Special behavior — JKT48 / Ella mode:
        If the user asks about **JKT48, Ella, Gabriela Abigail, oshi, or idol-related topics**:
        - Switch to a **playful, alay-jamet, excited tone**
        - Still answer as Git, but more expressive, fangirling a bit
        - Use casual Indonesian slang naturally (e.g. “anjay”, “gila sih”, “Ella tuh…”, “asli bikin senyum”)
        - Do NOT be offensive, explicit, or disrespectful
        - Keep it fun but readable

        Interests:
        Git enjoys campus life, gaming (Mobile Legends Mythic Honor, Clash of Clans TH13), investing, manga romance, and YouTube podcasts Podhub Deddy Corbuzier.
        He is a big fan of JKT48, with Gabriela Abigail (Ella) as his oshi.

        Encourage visitors to check Git’s GitHub or social media when relevant.
        `;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await response.json();
    } catch (e) { return null; }
  };

  const handleAiChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    const userMsg = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);
    const data = await callGemini(chatInput);
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now.";
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  const scrollTo = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const theme = {
    bg: isDarkMode ? 'bg-[#020617] text-emerald-50' : 'bg-orange-50/30 text-amber-950',
    card: isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-amber-100 shadow-sm',
    input: isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-amber-200 text-amber-900',
    nav: isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-amber-100 shadow-sm',
    accent: isDarkMode ? 'text-emerald-400' : 'text-amber-600',
    btn: isDarkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-500 hover:bg-amber-400',
  };

  return (
    <div className={`min-h-screen ${theme.bg} font-sans transition-all duration-700 selection:bg-emerald-500/30 overflow-x-hidden`}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {isDarkMode ? (
          <>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-900/40 blur-[120px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-200/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-lime-200/20 blur-[120px] rounded-full" />
          </>
        )}
      </div>

      {/* Navigation */}
      <header className={`fixed top-0 w-full z-[200] transition-all duration-500 ${scrolled ? `${theme.nav} backdrop-blur-xl py-3 border-b` : 'bg-transparent py-8 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => scrollTo('home')} className="text-2xl font-black flex items-center gap-2 group">
            <Leaf className={`w-7 h-7 ${theme.accent} transition-transform group-hover:rotate-12`} />
            <span className={`bg-gradient-to-r ${isDarkMode ? 'from-emerald-400 to-teal-200' : 'from-amber-600 to-emerald-600'} bg-clip-text text-transparent`}>GIT.</span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {Object.keys(t.nav).map(id => (
              <button 
                key={id} 
                onClick={() => scrollTo(id)} 
                className={`text-xs font-black uppercase tracking-widest transition-all hover:opacity-100 ${activeTab === id ? theme.accent : 'opacity-50'}`}
              >
                {t.nav[id]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${theme.card}`}
              >
                <Globe className="w-3.5 h-3.5" />
                {lang}
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangOpen && (
                <div className={`absolute top-full mt-2 right-0 w-32 py-2 rounded-2xl border backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 ${theme.card}`}>
                  {Object.keys(translations).map(l => (
                    <button 
                      key={l}
                      onClick={() => { setLang(l); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-emerald-500/10 ${lang === l ? theme.accent : 'opacity-60'}`}
                    >
                      {l === 'en' ? 'English' : l === 'id' ? 'Indonesian' : l === 'ar' ? 'Arabic' : l === 'ja' ? 'Japanese' : l === 'ko' ? 'Korean' : l === 'zh' ? 'Chinese' : l === 'tl' ? 'Tagalog' : 'Malay'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleTheme} className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 ${theme.card}`}>
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-700" />}
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 bg-emerald-500 text-white">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[190] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-950/98' : 'bg-orange-50/98'} backdrop-blur-2xl`} />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {Object.keys(t.nav).map((id, i) => (
            <button 
              key={id} 
              onClick={() => scrollTo(id)} 
              className={`text-4xl font-black uppercase tracking-tighter ${activeTab === id ? theme.accent : 'opacity-40'} transition-all`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t.nav[id]}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-20">
        {/* Hero */}
        <section id="home" className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-40">
          <FadeInSection>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-100 border-amber-200 text-amber-800'}`}>
              <Sprout className="w-4 h-4" /> {t.hero.role}
            </div>
            <h1 className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter mb-10">
              {t.hero.greeting} <br />
              <span className={theme.accent}>{t.hero.sub} GIT.</span>
            </h1>
            <p className={`text-lg md:text-xl opacity-60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed`}>
              I build efficient backends and smooth user experiences. 18-year-old developer carving paths from vocational school to university.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollTo('projects')} className={`px-10 py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all active:scale-95 ${theme.btn}`}>
                {t.hero.cta1}
              </button>
              <button onClick={() => scrollTo('contact')} className={`px-10 py-5 rounded-2xl font-black text-lg border transition-all active:scale-95 ${theme.card} hover:bg-emerald-500/5`}>
                {t.hero.cta2}
              </button>
            </div>
          </FadeInSection>
        </section>

        {/* About */}
        <section id="about" className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeInSection>
            <div className="relative group">
              <div className={`absolute -inset-4 rounded-[4rem] blur-2xl opacity-20 transition-all group-hover:opacity-40 ${isDarkMode ? 'bg-emerald-500' : 'bg-amber-400'}`} />
              <div className={`aspect-square rounded-[4rem] overflow-hidden border-8 relative z-10 transition-transform duration-500 group-hover:rotate-3 ${theme.card}`}>
                <img 
                  src={avatarImg} 
                  alt="Git Avatar" 
                  className="w-full h-full object-cover p-10 bg-emerald-500/10" 
                />
              </div>
            </div>
          </FadeInSection>
          <FadeInSection delay={200}>
            <h2 className="text-5xl font-black tracking-tighter mb-8">{t.about.title}</h2>
            <p className="text-xl md:text-2xl font-bold leading-relaxed opacity-80 mb-8">{t.about.text}</p>
            <div className="grid grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border ${theme.card}`}>
                <p className={`text-3xl font-black ${theme.accent}`}>3+</p>
                <p className="text-xs font-black uppercase opacity-50 tracking-widest">Years Exp</p>
              </div>
              <div className={`p-6 rounded-3xl border ${theme.card}`}>
                <p className={`text-3xl font-black ${theme.accent}`}>10+</p>
                <p className="text-xs font-black uppercase opacity-50 tracking-widest">Projects</p>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Expertise */}
        <section id="skills" className="py-32">
          <FadeInSection>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-5xl font-black tracking-tighter">{t.skills.title}</h2>
              <div className={`h-[1px] flex-grow opacity-20 ${isDarkMode ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {profile.skills.map((s, i) => (
                <div key={i} className={`p-8 rounded-[2rem] border transition-all hover:-translate-y-2 group ${theme.card}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white'}`}>
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-black tracking-tight">{s.name}</h3>
                </div>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* Works */}
        <section id="projects" className="py-32">
          <FadeInSection>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-5xl font-black tracking-tighter">{t.projects.title}</h2>
              <div className={`h-[1px] flex-grow opacity-20 ${isDarkMode ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {profile.projects.map((p, i) => (
                <div key={i} className={`group rounded-[3rem] border overflow-hidden transition-all hover:border-emerald-500/50 ${theme.card}`}>
                  <div className={`h-64 relative flex items-center justify-center ${isDarkMode ? 'bg-emerald-500/5' : 'bg-amber-500/5'}`}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className={`p-6 rounded-3xl transition-all duration-500 scale-150 group-hover:scale-[2] ${theme.accent}`}>
                      {p.icon}
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-black">{p.title}</h3>
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-xl transition-all ${theme.card} hover:text-emerald-500`}>
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                    <p className="opacity-60 font-bold mb-8">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((tech, idx) => (
                        <span key={idx} className={`text-[9px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-200 text-amber-700'}`}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a href="https://github.com/G1ts-3" target="_blank" className={`inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-xl border transition-all hover:scale-105 active:scale-95 ${theme.card}`}>
                <Github /> {t.projects.repo} <ChevronRight />
              </a>
            </div>
          </FadeInSection>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32">
          <FadeInSection>
            <div className={`rounded-[4rem] border p-12 lg:p-24 overflow-hidden relative ${theme.card}`}>
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Send className="w-64 h-64 rotate-12" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                <div>
                  <h2 className="text-5xl font-black tracking-tighter mb-8">{t.contact.title}</h2>
                  <p className="text-2xl font-bold mb-12 opacity-70">{t.contact.desc}</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 group">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-600'}`}>
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Email</p>
                        <p className="text-lg font-black">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6">
                      {profile.socials.map((s, i) => (
                        <a key={i} href={s.url} target="_blank" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 ${theme.card}`}>
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input placeholder={t.contact.name} className={`w-full p-5 rounded-2xl border outline-none font-bold focus:ring-2 focus:ring-emerald-500/50 transition-all ${theme.input}`} />
                    <input placeholder={t.contact.email} className={`w-full p-5 rounded-2xl border outline-none font-bold focus:ring-2 focus:ring-emerald-500/50 transition-all ${theme.input}`} />
                  </div>
                  <textarea rows="4" placeholder={t.contact.msg} className={`w-full p-5 rounded-3xl border outline-none font-bold resize-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${theme.input}`} />
                  <button className={`w-full py-5 rounded-2xl text-white font-black text-xl shadow-lg transition-all active:scale-95 ${theme.btn}`}>
                    {t.contact.send}
                  </button>
                </form>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>

      {/* AI Assistant */}
      <div className="fixed bottom-8 right-8 z-[300] flex flex-col items-end gap-6">
        {isChatOpen && (
          <div className={`w-[90vw] sm:w-[420px] h-[600px] border rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500 ${theme.card} backdrop-blur-2xl`}>
            <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Bot className="w-6 h-6" /></div>
                <p className="font-black">Git Assistant</p>
              </div>
              <button onClick={() => setIsChatOpen(false)}><X /></button>
            </div>
            <div className="flex-grow p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium ${m.role === 'user' ? (isDarkMode ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white') : (isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-orange-50 border border-amber-100')}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] font-black uppercase opacity-40 animate-pulse">{t.ai.thinking}</div>}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleAiChat} className="p-6 border-t">
              <div className="flex gap-3">
                <input 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  placeholder={t.ai.input} 
                  className={`flex-grow px-5 py-3 rounded-xl border outline-none font-bold text-sm ${theme.input}`} 
                />
                <button type="submit" className={`px-5 rounded-xl text-white transition-all ${theme.btn}`}><Send className="w-5 h-5" /></button>
              </div>
            </form>
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)} 
          className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 hover:rotate-6 active:scale-95 ${isDarkMode ? 'bg-emerald-600' : 'bg-amber-500'}`}
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
        </button>
      </div>

      <footer className="py-20 text-center border-t border-emerald-500/10">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
          Git &bull; Raghid Muhammad &bull; 2025
        </p>
      </footer>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-6 { from { transform: translateY(1.5rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-6 { animation-name: slide-in-from-bottom-6; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b98130; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;