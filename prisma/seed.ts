import { PrismaClient, Role, Level, JobType, ResourceCategory, ResourceType, EventStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Default Admin User
  const adminPasswordHash = await bcrypt.hash('AdminPass123!', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@taxmancapital.com' },
    update: {},
    create: {
      email: 'admin@taxmancapital.com',
      username: 'taxman_admin',
      fullName: 'Saboor Ahmad CA',
      passwordHash: adminPasswordHash,
      role: Role.admin,
      level: Level.Qualified,
      city: 'Lahore',
      institution: 'ICAP / PwC Alumni',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    },
  });
  console.log(`✅ Admin user ready: ${adminUser.email}`);

  // 2. Create Sample Student User
  const studentPasswordHash = await bcrypt.hash('Student123!', 12);
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      username: 'ali_ca_student',
      fullName: 'Ali Hassan',
      passwordHash: studentPasswordHash,
      role: Role.user,
      level: Level.CAF,
      city: 'Karachi',
      institution: 'PAC Lahore',
      papersCleared: 6,
    },
  });

  // 3. Seed Jobs & Articleship Inductions
  const jobsData = [
    {
      title: "Audit & Assurance Articleship Trainee (Summer 2026)",
      company: "A.F. Ferguson & Co. (PwC Pakistan)",
      location: "Lahore / Karachi / Islamabad",
      level: "CAF Qualified (All 8 Papers)",
      jobType: JobType.Articleship,
      isOverseas: false,
      deadline: new Date("2026-08-15"),
      description: "Premier 3.5-year ICAP CA training contract under PwC global methodology. Candidates must have cleared CAF with attempt history intact. Direct exposure to FTSE-100 & KSE-100 listed clients, financial audit, and risk advisory.",
      requirements: [
        "CAF Passed in minimum required attempts",
        "Strong analytical & Excel modeling skills",
        "Proficiency in written & spoken English"
      ],
      postedById: adminUser.id,
    },
    {
      title: "Tax & Legal Advisory Trainee",
      company: "KPMG Taseer Hadi & Co.",
      location: "Lahore",
      level: "CAF 7+ Papers / ACCA Skill Level",
      jobType: JobType.Articleship,
      isOverseas: false,
      deadline: new Date("2026-08-20"),
      description: "Articleship induction specializing in Corporate Tax, Transfer Pricing, Income Tax Appeals, and Sales Tax Compliance. Ideal for ambitious CA CAF trainees seeking specialized tax advisory experience.",
      requirements: [
        "CAF 7+ papers cleared",
        "Good understanding of Income Tax Ordinance 2001",
        "Pass in Firm written entrance test"
      ],
      postedById: adminUser.id,
    },
    {
      title: "Junior Audit Associate (Overseas Transfer)",
      company: "Deloitte Middle East",
      location: "Dubai, UAE",
      level: "CA Finalist / ACCA Member",
      jobType: JobType.Full_time,
      isOverseas: true,
      deadline: new Date("2026-09-01"),
      description: "Direct entry audit associate position in Dubai office. Tax-free salary pkg (AED 9,000 - 12,000/mo), visa sponsorship, and health insurance provided. Work on Gulf retail and oil & gas clients.",
      requirements: [
        "1.5+ years of Big 4 articleship completed in Pakistan",
        "Fluency in English (IELTS 7.0+ preferred)",
        "Experience in IFRS 15, IFRS 16 & IFRS 9"
      ],
      postedById: adminUser.id,
    },
    {
      title: "Financial Analyst - Corporate Finance",
      company: "Engro Corporation",
      location: "Karachi",
      level: "CA Qualified / ACCA Member",
      jobType: JobType.Full_time,
      isOverseas: false,
      deadline: new Date("2026-08-30"),
      description: "Corporate finance desk handling financial modeling, investment evaluation, feasibility analysis, and treasury management. Market competitive compensation + health & provident fund.",
      requirements: [
        "Newly Qualified CA / ACCA Member",
        "Advanced Financial Modeling certification",
        "Minimum 3.5 years Big 4 training"
      ],
      postedById: adminUser.id,
    }
  ];

  for (const job of jobsData) {
    await prisma.job.create({ data: job });
  }
  console.log(`✅ Seeded ${jobsData.length} jobs.`);

  // 4. Seed Resources
  const resourcesData = [
    {
      title: "CAF-1 FAR-1 Comprehensive Revision Formula Sheet 2026",
      description: "Condensed 18-page summary covering IAS 16, IAS 20, IAS 23, IAS 36, and IAS 40 with ICAP past paper adjustments.",
      category: ResourceCategory.CAF,
      type: ResourceType.PDF,
      downloadUrl: "https://raw.githubusercontent.com/Sagheer1122/The-TaxMan-s-Capital/main/public/resources/far1-summary.pdf",
      downloads: 412,
      tag: "MUST READ",
      tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      btnColor: "bg-emerald-500 hover:bg-emerald-600 text-slate-950",
      isFeatured: true,
    },
    {
      title: "ATS-Optimized CA Articleship CV & Cover Letter Template",
      description: "Proven Word (.docx) template tailored specifically for Big 4 partner interviews & HR screening filters.",
      category: ResourceCategory.Training_Induction,
      type: ResourceType.DOCX,
      downloadUrl: "https://raw.githubusercontent.com/Sagheer1122/The-TaxMan-s-Capital/main/public/resources/ca-cv-template.docx",
      downloads: 850,
      tag: "TOP RATED",
      tagColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      btnColor: "bg-amber-400 hover:bg-amber-500 text-slate-950",
      isFeatured: true,
    },
    {
      title: "Big 4 Firm Written Test Sample MCQs & Aptitude Preparation",
      description: "150+ solved numerical aptitude, verbal reasoning, and basic accounting MCQs used by EY, PwC, KPMG & Deloitte tests.",
      category: ResourceCategory.Training_Induction,
      type: ResourceType.PDF,
      downloadUrl: "https://raw.githubusercontent.com/Sagheer1122/The-TaxMan-s-Capital/main/public/resources/big4-test-prep.pdf",
      downloads: 620,
      tag: "HOT RESOURCE",
      tagColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      btnColor: "bg-purple-500 hover:bg-purple-600 text-white",
      isFeatured: false,
    }
  ];

  for (const res of resourcesData) {
    await prisma.resource.create({ data: res });
  }
  console.log(`✅ Seeded ${resourcesData.length} study resources.`);

  // 5. Seed Announcements
  await prisma.announcement.create({
    data: {
      title: "ICAP Autumn 2026 CAF & CFAP Exam Attempt Timetable Released",
      summary: "Official date sheet announced by the Institute of Chartered Accountants of Pakistan.",
      content: "The Institute of Chartered Accountants of Pakistan (ICAP) has published the official examination schedule for Autumn 2026. CAF exams begin September 7, 2026. Admit cards will be available on ICAP student portal from August 25.",
      category: "Official Notices",
      eventDate: "Sept 07, 2026",
      isPinned: true,
    }
  });

  // 6. Seed Community Groups
  const communityData = [
    {
      title: "CAF Students Peer Group",
      categoryKey: "caf",
      badge: "ICAP CAF",
      badgeBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      description: "Daily study schedules, ICAP past paper discussion, recommended teacher reviews & group study sessions.",
      membersCountText: "2,400+ Active CA Students",
      bullets: ["ICAP Past Paper Solutions", "Weekly Subject Quizzes", "Direct Senior Mentorship"],
      whatsappLink: "https://chat.whatsapp.com/sample-caf-group",
      discordLink: "https://discord.gg/taxmancapital-caf",
    },
    {
      title: "ACCA Global Trainees Network",
      categoryKey: "acca",
      badge: "ACCA Global",
      badgeBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      description: "Applied Skills & Strategic Professional exam preparation, CBE mock advice, and PER requirement guides.",
      membersCountText: "1,850+ ACCA Trainees",
      bullets: ["CBE Exam Tips & Shortcuts", "PER Sign-off Assistance", "Remote Job Postings"],
      whatsappLink: "https://chat.whatsapp.com/sample-acca-group",
      discordLink: "https://discord.gg/taxmancapital-acca",
    }
  ];

  for (const group of communityData) {
    await prisma.communityGroup.create({ data: group });
  }

  // 7. Seed Podcasts
  await prisma.podcast.create({
    data: {
      title: "How to Crack PwC & KPMG Partner Interviews in 1st Attempt",
      guest: "Hassan Raza CA (Ex-Big 4 Senior Manager)",
      duration: "42 Mins",
      views: "14.2K Views",
      youtubeId: "dQw4w9WgXcQ",
      youtubeUrl: "https://www.youtube.com/watch?dQw4w9WgXcQ",
      qualTag: "CAF & ACCA",
      typeTag: "Interview Prep",
      likesCount: 389,
    }
  });

  console.log('🎉 Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
