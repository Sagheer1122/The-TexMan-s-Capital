import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  level: z.enum(['PRC', 'CAF', 'CFAP', 'MSA', 'ACCA', 'Qualified']).optional().default('CAF'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  institution: z.string().optional(),
  level: z.enum(['PRC', 'CAF', 'CFAP', 'MSA', 'ACCA', 'Qualified']).optional(),
  papersCleared: z.number().int().min(0).optional(),
  avatarUrl: z.string().url().or(z.literal('')).optional(),
  cvUrl: z.string().url().or(z.literal('')).optional(),
});

export const createJobSchema = z.object({
  title: z.string().min(3, 'Job title is required'),
  company: z.string().min(2, 'Company name is required'),
  location: z.string().min(2, 'Location is required'),
  level: z.string().min(1, 'Qualification level is required'),
  jobType: z.enum(['Articleship', 'Internship', 'Full_time', 'Contract']),
  isOverseas: z.boolean().default(false),
  deadline: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.array(z.string()).default([]),
});

export const counselingQuerySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  category: z.string().default('General Inquiry'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const replyCounselingQuerySchema = z.object({
  replyText: z.string().min(2, 'Reply text is required'),
});

export const resourceSchema = z.object({
  title: z.string().min(2, 'Resource title is required'),
  description: z.string().min(5, 'Description is required'),
  category: z.enum(['PRC', 'CAF', 'Training_Induction', 'CFAP_SCS_Finals', 'CA_Qualified', 'ACCA']),
  type: z.enum(['PDF', 'DOCX', 'ZIP', 'XLSX', 'LINK']),
  downloadUrl: z.string().min(1, 'Download URL is required'),
  tag: z.string().optional(),
  tagColor: z.string().optional(),
  btnColor: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const announcementSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  summary: z.string().min(5, 'Summary is required'),
  content: z.string().min(10, 'Content is required'),
  category: z.string().default('General'),
  eventDate: z.string().optional(),
  isPinned: z.boolean().default(false),
});

export const eventSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  desc: z.string().min(10, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  speakerName: z.string().optional(),
  speakerTitle: z.string().optional(),
  speakerOrg: z.string().optional(),
  speakerRole: z.string().optional(),
  status: z.enum(['Upcoming', 'Live', 'Recorded']).default('Upcoming'),
  qualTarget: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  meetingLink: z.string().optional(),
  recordingUrl: z.string().optional(),
});

export const podcastSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  guest: z.string().optional(),
  duration: z.string().optional(),
  youtubeId: z.string().min(3, 'YouTube Video ID is required'),
  youtubeUrl: z.string().optional(),
  qualTag: z.string().optional(),
  typeTag: z.string().optional(),
});

export const communityGroupSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  categoryKey: z.string().min(1, 'Category key is required'),
  badge: z.string().default('Group'),
  badgeBg: z.string().default('bg-emerald-500/20'),
  description: z.string().min(5, 'Description is required'),
  membersCountText: z.string().default('1,000+ Members'),
  bullets: z.array(z.string()).default([]),
  whatsappLink: z.string().url('Invalid WhatsApp link'),
  discordLink: z.string().url('Invalid Discord link'),
});
