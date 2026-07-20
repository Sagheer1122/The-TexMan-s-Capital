import React, { useState } from 'react';
import {
  Building2,
  Bot,
  FileText,
  BookOpen,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Send,
  Star,
  Award,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  BookMarked,
  Heart,
  RefreshCw,
  Zap,
  MapPin,
  Clock,
  DollarSign,
  Globe
} from 'lucide-react';

export default function CareerTools() {
  const [activeSubTab, setActiveSubTab] = useState('directory');

  // Firm Directory State
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [directorySearch, setDirectorySearch] = useState('');

  // AI Mock Interview State
  const [interviewRole, setInterviewRole] = useState('Audit Trainee');
  const [interviewRound, setInterviewRound] = useState('Technical Round');
  const [userAnswer, setUserAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: "Welcome to the CA/ACCA AI Mock Interview Simulator! I'm your virtual Senior Audit Manager. Let's start with a technical question:\n\n*Can you explain the main difference between Substantive Procedures and Tests of Controls under ISA 330?*"
    }
  ]);
  const [evaluation, setEvaluation] = useState(null);

  // CV Maker State
  const [cvData, setCvData] = useState({
    name: 'Muhammad Ahmed',
    crn: 'CRN-104928',
    email: 'ahmed.ca@example.com',
    phone: '+92 300 9876543',
    qualification: 'CA Finalist (CAF Qualified)',
    attempts: 'First Attempt Passed',
    city: 'Lahore',
    skills: 'Financial Modeling, IFRS 15/16, MS Excel (VLOOKUP, Pivot Tables)',
    objective: 'Seeking a challenging Articleship position in a reputable CA firm to apply accounting principles and gain practical audit experience.'
  });

  // AI Tutor State
  const [selectedSubject, setSelectedSubject] = useState('FAR-1 (Financial Accounting)');
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorMessages, setTutorMessages] = useState([
    {
      sender: 'tutor',
      text: "Assalamu Alaikum! I am your 24/7 AI Study Assistant for CAF & ACCA. Ask me any numerical question, accounting standard concept, or audit scenario!"
    }
  ]);

  // Quranic Guidance State
  const [quranSearch, setQuranSearch] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(0);

  // Sample Firms Data
  const firmsData = [
    {
      id: 1,
      name: 'A.F. Ferguson & Co. (PwC Pakistan)',
      category: 'Big 4',
      city: 'Karachi, Lahore, Islamabad',
      stipend: 'Rs. 29,700 / month',
      feedbacksCount: 142,
      rating: 4.9,
      tags: ['Audit', 'Tax', 'Advisory'],
      recentQuestion: 'What are the criteria for capitalizing development expenditure under IAS 38?'
    },
    {
      id: 2,
      name: 'KPMG Taseer Hadi & Co.',
      category: 'Big 4',
      city: 'Lahore, Karachi, Islamabad',
      stipend: 'Rs. 29,700 / month',
      feedbacksCount: 128,
      rating: 4.8,
      tags: ['Statutory Audit', 'Risk Consulting'],
      recentQuestion: 'How do you test inventory valuation when slow-moving items are present?'
    },
    {
      id: 3,
      name: 'EY Ford Rhodes',
      category: 'Big 4',
      city: 'Karachi, Lahore, Islamabad, Rawalpindi',
      stipend: 'Rs. 29,700 / month',
      feedbacksCount: 115,
      rating: 4.8,
      tags: ['Assurance', 'Tax Compliance'],
      recentQuestion: 'Explain the 5-step revenue recognition model under IFRS 15.'
    },
    {
      id: 4,
      name: 'Yousuf Adil (Deloitte Affiliate)',
      category: 'Big 4',
      city: 'Lahore, Karachi, Islamabad, Multan',
      stipend: 'Rs. 29,700 / month',
      feedbacksCount: 98,
      rating: 4.7,
      tags: ['Audit', 'Financial Advisory'],
      recentQuestion: 'Difference between Provision and Contingent Liability under IAS 37.'
    },
    {
      id: 5,
      name: 'BDO Ebrahim & Co.',
      category: 'Category A',
      city: 'Lahore, Karachi, Islamabad, Faisalabad',
      stipend: 'Rs. 25,000 / month',
      feedbacksCount: 84,
      rating: 4.6,
      tags: ['Audit', 'Taxation'],
      recentQuestion: 'What are the main disclosure requirements for Related Party Transactions?'
    },
    {
      id: 6,
      name: 'Grant Thornton Anjum Rahman',
      category: 'Category A',
      city: 'Lahore, Karachi, Islamabad',
      stipend: 'Rs. 25,000 / month',
      feedbacksCount: 76,
      rating: 4.5,
      tags: ['Taxation', 'Corporate Advisory'],
      recentQuestion: 'Explain Sales Tax input tax credit restrictions in Pakistan Income Tax Law.'
    }
  ];

  // Sample Quran Lessons
  const quranLessons = [
    {
      id: 1,
      day: 1,
      title: 'Honesty in Financial Audit & Record Keeping',
      surah: 'Surah Al-Baqarah (2:282)',
      arText: 'وَأَشْهِدُوا إِذَا تَبَايَعْتُمْ ۚ وَلَا يُضَارَّ كَاتِبٌ وَلَا شَهِيدٌ',
      translation: 'And bring witnesses when you conclude a contract, and let neither scribe nor witness suffer harm.',
      corporateWisdom: 'In professional audit & accounting, documenting financial records with complete integrity without falsification or bias is a fundamental Quranic command.'
    },
    {
      id: 2,
      day: 2,
      title: 'Managing Work & Exam Stress with Sabr',
      surah: 'Surah Al-Baqarah (2:153)',
      arText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ',
      translation: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
      corporateWisdom: 'During intense exam preparation or busy audit season deadlines, maintain mental resilience and turn to prayer to alleviate anxiety.'
    },
    {
      id: 3,
      day: 3,
      title: 'Fulfilling Contracts & Professional Pledges',
      surah: 'Surah Al-Ma’idah (5:1)',
      arText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ',
      translation: 'O you who have believed, fulfill all your contracts and obligations.',
      corporateWisdom: 'Whether it is your Articleship deed, employment agreement, or client confidentiality non-disclosure, honoring professional commitments is a cornerstone of faith.'
    }
  ];

  // Filtered firms
  const filteredFirms = firmsData.filter(firm => {
    const matchesCity = selectedCity === 'All' || firm.city.includes(selectedCity);
    const matchesCat = selectedCategory === 'All' || firm.category === selectedCategory;
    const matchesSearch = firm.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
                          firm.tags.some(t => t.toLowerCase().includes(directorySearch.toLowerCase()));
    return matchesCity && matchesCat && matchesSearch;
  });

  const handleSendInterviewAnswer = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const newMessages = [...chatHistory, { sender: 'user', text: userAnswer }];
    setChatHistory(newMessages);

    // Simulate AI response & evaluation
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Excellent answer! You correctly highlighted that Substantive Procedures test dollar amounts for material misstatements, whereas Tests of Controls evaluate operational effectiveness.\n\nNext Question: *How would you handle a situation where management refuses to allow you to send a direct bank confirmation?*"
        }
      ]);

      setEvaluation({
        score: '8.5 / 10',
        technicalAccuracy: 'High (90%)',
        confidence: 'Strong',
        feedback: 'Great use of ISA terminology. Ensure you also mention analytical procedures as part of substantive testing.'
      });
    }, 1000);

    setUserAnswer('');
  };

  const handleSendTutorQuery = (e) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    setTutorMessages(prev => [...prev, { sender: 'user', text: tutorQuery }]);

    setTimeout(() => {
      setTutorMessages(prev => [
        ...prev,
        {
          sender: 'tutor',
          text: `Great question regarding ${selectedSubject}! Under IAS 16, property, plant, and equipment is initially measured at cost. Depreciation begins when the asset is available for use (i.e. in the location and condition necessary for operation). Let me know if you would like a practice numerical problem!`
        }
      ]);
    }, 1000);

    setTutorQuery('');
  };

  return (
    <div className="min-h-screen bg-navy text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-navy-dark via-emerald-950/40 to-navy-dark border border-brandGreen/20 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-brandGreen/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brandGreen/15 border border-brandGreen/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Student Success Suite</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Career Tools & Student AI Hub
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Explore CA/ACCA Firm Directories, AI Mock Interview Simulators, Trainee CV Makers, 24/7 AI Tutors, and Daily Quranic Wisdom — built for CA & ACCA aspirants.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {[
            { id: 'directory', label: 'Firm Directory', icon: Building2 },
            { id: 'mock', label: 'AI Mock Interview', icon: Bot },
            { id: 'cv', label: 'CV Builder', icon: FileText },
            { id: 'tutor', label: 'AI Study Tutor', icon: BookOpen },
            { id: 'quran', label: 'Quranic Guidance', icon: BookMarked }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-brandGreen text-white shadow-lg shadow-brandGreen/20 border border-brandGreen/50'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUB-TAB 1: FIRM DIRECTORY & INTERVIEW INSIGHTS */}
        {activeSubTab === 'directory' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-navy-dark p-4 rounded-2xl border border-white/10">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search firm name or tag..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brandGreen"
                />
              </div>

              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-brandGreen"
                >
                  <option value="All">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Faisalabad">Faisalabad</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-brandGreen"
                >
                  <option value="All">All Categories</option>
                  <option value="Big 4">Big 4 Firms</option>
                  <option value="Category A">Category A Firms</option>
                </select>
              </div>
            </div>

            {/* Firm Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFirms.map(firm => (
                <div
                  key={firm.id}
                  className="bg-navy-dark border border-white/10 hover:border-brandGreen/40 p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:shadow-xl transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                        {firm.category}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{firm.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                      {firm.name}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-brandGreen flex-shrink-0" />
                        <span>{firm.city}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-emerald-400 font-semibold">{firm.stipend}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-300 space-y-1">
                      <span className="font-semibold text-brandGreen block">Recent Interview Question:</span>
                      <p className="italic text-gray-400">"{firm.recentQuestion}"</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-400 text-[11px]">{firm.feedbacksCount} Verified Feedbacks</span>
                    <button
                      onClick={() => alert(`Opening feedbacks for ${firm.name}...`)}
                      className="text-brandGreen hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      <span>View Feedbacks</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 2: AI MOCK INTERVIEW */}
        {activeSubTab === 'mock' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* Control Column */}
            <div className="lg:col-span-4 bg-navy-dark p-6 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Bot className="w-5 h-5 text-brandGreen" />
                <span>Interview Setup</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Target Role</label>
                  <select
                    value={interviewRole}
                    onChange={(e) => setInterviewRole(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="Audit Trainee">Audit Trainee (Articleship)</option>
                    <option value="Tax Assistant">Tax Advisory Assistant</option>
                    <option value="Advisory Consultant">Financial Advisory Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Interview Round</label>
                  <select
                    value={interviewRound}
                    onChange={(e) => setInterviewRound(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                  >
                    <option value="HR Screening">Initial HR Screening</option>
                    <option value="Technical Round">Manager Technical Round</option>
                    <option value="Partner Round">Partner Final Round</option>
                  </select>
                </div>
              </div>

              {/* Evaluation Card */}
              {evaluation && (
                <div className="p-4 rounded-2xl bg-brandGreen/10 border border-brandGreen/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">AI Performance Score</span>
                  <div className="text-xl font-extrabold text-white">{evaluation.score}</div>
                  <div className="text-[11px] text-gray-300 leading-relaxed space-y-1">
                    <p><strong>Accuracy:</strong> {evaluation.technicalAccuracy}</p>
                    <p><strong>Confidence:</strong> {evaluation.confidence}</p>
                    <p className="text-gray-400">{evaluation.feedback}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Simulator */}
            <div className="lg:col-span-8 bg-navy-dark p-6 rounded-3xl border border-white/10 flex flex-col h-[520px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brandGreen text-white rounded-br-none'
                          : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendInterviewAnswer} className="mt-4 flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your interview response..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brandGreen"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-brandGreen hover:bg-brandGreen-dark text-white rounded-xl font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SUB-TAB 3: CV BUILDER */}
        {activeSubTab === 'cv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            {/* Form Input Column */}
            <div className="lg:col-span-6 bg-navy-dark p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-brandGreen" />
                <span>Articleship CV Form</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={cvData.name}
                    onChange={(e) => setCvData({ ...cvData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-400 mb-1">CRN / ACCA ID</label>
                  <input
                    type="text"
                    value={cvData.crn}
                    onChange={(e) => setCvData({ ...cvData, crn: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-400 mb-1">Phone</label>
                  <input
                    type="text"
                    value={cvData.phone}
                    onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Career Objective</label>
                <textarea
                  rows="3"
                  value={cvData.objective}
                  onChange={(e) => setCvData({ ...cvData, objective: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Technical Skills & Tools</label>
                <input
                  type="text"
                  value={cvData.skills}
                  onChange={(e) => setCvData({ ...cvData, skills: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* Live CV Preview */}
            <div className="lg:col-span-6 bg-white text-navy p-8 rounded-3xl shadow-2xl space-y-6 font-sans">
              <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold uppercase text-navy tracking-tight">{cvData.name}</h2>
                  <p className="text-xs text-brandGreen font-bold">{cvData.qualification} | {cvData.crn}</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-xl bg-navy text-white text-xs font-bold flex items-center space-x-1 hover:bg-navy-dark transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print CV</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold uppercase text-brandGreen tracking-wider mb-1">Career Objective</h4>
                  <p className="text-gray-600 leading-relaxed">{cvData.objective}</p>
                </div>

                <div>
                  <h4 className="font-bold uppercase text-brandGreen tracking-wider mb-1">Educational Stage & Attempts</h4>
                  <p className="text-gray-700"><strong>Status:</strong> {cvData.qualification}</p>
                  <p className="text-gray-700"><strong>Attempt Status:</strong> {cvData.attempts}</p>
                </div>

                <div>
                  <h4 className="font-bold uppercase text-brandGreen tracking-wider mb-1">Skills & Certifications</h4>
                  <p className="text-gray-700">{cvData.skills}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 4: AI TUTOR */}
        {activeSubTab === 'tutor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            <div className="lg:col-span-4 bg-navy-dark p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-brandGreen" />
                <span>Subject Selection</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Select ICAP / ACCA Paper</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white"
                >
                  <option value="FAR-1 (Financial Accounting)">CAF-1 Financial Accounting & Reporting I</option>
                  <option value="FAR-2 (Financial Accounting)">CAF-5 Financial Accounting & Reporting II</option>
                  <option value="Audit & Assurance">CAF-6 Audit and Assurance</option>
                  <option value="Taxation">CAF-2 Tax Practices</option>
                  <option value="ACCA PM">ACCA Performance Management</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-2">
                <span className="font-bold text-emerald-400">Quick Tutor Prompts:</span>
                <div className="space-y-1.5 text-gray-300">
                  <button
                    onClick={() => setTutorQuery("Explain IAS 16 Cost vs Revaluation Model")}
                    className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 transition-colors"
                  >
                    • IAS 16 Revaluation Model
                  </button>
                  <button
                    onClick={() => setTutorQuery("What are the key assertions in Audit of Sales?")}
                    className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-300 transition-colors"
                  >
                    • Audit Assertions for Revenue
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-navy-dark p-6 rounded-3xl border border-white/10 flex flex-col h-[520px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                {tutorMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brandGreen text-white rounded-br-none'
                          : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendTutorQuery} className="mt-4 flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask any CAF / ACCA question..."
                  value={tutorQuery}
                  onChange={(e) => setTutorQuery(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brandGreen"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-brandGreen hover:bg-brandGreen-dark text-white rounded-xl font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>Ask Tutor</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SUB-TAB 5: QURANIC GUIDANCE */}
        {activeSubTab === 'quran' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quranLessons.map(lesson => (
                <div
                  key={lesson.id}
                  className="bg-navy-dark border border-white/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                      Day {lesson.day} • {lesson.surah}
                    </span>
                    <h3 className="font-extrabold text-base text-white">{lesson.title}</h3>
                    
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-right font-serif text-emerald-300 text-sm leading-loose">
                      {lesson.arText}
                    </div>

                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      "{lesson.translation}"
                    </p>

                    <div className="p-3 rounded-xl bg-brandGreen/10 border border-brandGreen/20 text-[11px] text-gray-200">
                      <strong className="text-brandGreen block mb-1">Corporate & Exam Wisdom:</strong>
                      {lesson.corporateWisdom}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
