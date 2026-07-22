# 📋 Complete Project Summary & Backend Stack Analysis
## Project: The TaxMan's Capital (CA, ACCA & Finance Career Platform)

---

# PART 1: Non-Technical Summary & Mission Statement

### 🎯 Core Project Mission
**The TaxMan's Capital** is Pakistan's premier digital platform dedicated exclusively to **Chartered Accountancy (CA - ICAP)**, **ACCA**, and **Finance Professionals & Students**. 

The platform’s mission is to bridge the gap between academic education and professional induction by providing:
1. **100% Free Career Counseling & Mentorship**: Connecting aspiring finance trainees directly with experienced mentors (Saboor Ahmad CA, Usman Saleem CA/CFA, Hassan Raza CA/ACCA, Ali Iqbal ACCA).
2. **Verified Job & Articleship Inductions Hub**: A transparent, real-time portal for CA articleship vacancies, audit internships, corporate roles, and overseas opportunities (Dubai/UAE, Saudi Arabia, London/UK).
3. **Structured Exam & Study Resources**: Curated past papers, revision notes, interview preparation handbooks, and ATS-optimized CV templates.
4. **Peer-to-Peer Community Channels**: Active, moderated WhatsApp and Discord learning groups categorized by qualification tier (PRC, CAF, CFAP, ACCA, Qualified Alumni).
5. **Interactive AI Career Tools**: AI-driven mock interview simulators, automated CA resume builders, and 24/7 AI academic study assistance.

### 👥 Target Audience & Stakeholders
- **PRC & Foundation Students**: Beginners entering the CA/ACCA stream needing orientation and firm selection advice.
- **CAF (Intermediate) & ACCA Knowledge/Skill Students**: Trainees preparing for articleship induction tests and firm interviews.
- **CFAP / MSA & ACCA Strategic Professional Finalists**: Senior trainees balancing 3.5 years of firm work experience with final exams.
- **Qualified CA / ACCA Members & Overseas Aspirants**: Experienced professionals seeking corporate placement or middle-east/UK relocation.
- **Mentors & Industry Leaders**: Senior partners and managers providing guidance through webinars and podcasts.
- **Recruiters & Firm Admins**: Talent acquisition teams posting induction notices for Big 4 (PwC, Deloitte, EY, KPMG) and Category-A firms (BDO, Grant Thornton).

---

# PART 2: Comprehensive Technical Breakdown (Page by Page & Section by Section)

## 🌐 Global Layout & Universal Components

### 1. Sticky Navigation Bar (`Navbar`)
- **Left Branding**: 
  - Dual-tone Logo badge (`TM`) with gradient glow (`#00C853` to `#34d399`).
  - Text: "The TaxMan's Capital" with tagline "Guidance. Opportunities. Success."
- **Center Navigation Menus**:
  - **Home**: Direct hash link to landing page (`#`).
  - **Career Dropdown**:
    - *CA/ACCA Inductions* (`#inductions`)
    - *Pakistan Jobs* (`#jobs`)
    - *Overseas Jobs* (`#overseas`)
    - *Career Support* (`#guidance`)
  - **Resources Dropdown**:
    - *All Resources* (`#resources`)
    - *PRC (Entry Level)* (`#resources-prc`)
    - *CAF (Intermediate)* (`#resources-caf`)
    - *Training / Induction* (`#resources-induction`)
    - *CFAP & SCS (Finals)* (`#resources-cfap`)
    - *CA Qualified* (`#resources-qualified`)
    - *ACCA* (`#resources-acca`)
  - **Community Dropdown**:
    - *Communities* (`#communities`)
    - *Announcements* (`#announcements`)
    - *Events* (`#events`)
    - *Videos & Podcasts* (`#podcasts`)
  - **About Dropdown**:
    - *Our Mission* (`#mission`)
    - *Our Vision* (`#vision`)
    - *Contact Us* (`#contact`)
- **Right Action Items**:
  - **Notification Bell**: Icon with red/green unread badge count (`3`).
  - **Guest State**: `Login` button (border pill) & `Sign Up` button (brand green glow pill).
  - **Logged-in State**: `My Dashboard` or `Admin Dashboard` button + User Avatar badge (custom avatar image or capitalized initial letter).
- **Mobile Drawer**: Slide-down menu toggleable via Hamburger Icon (`Menu` / `X`).

### 2. Universal Global Footer (`Footer`)
- **Column 1: Brand Overview**: Logo, mission description, social media links.
- **Column 2: Quick Navigation Links**: Links to Inductions, Pakistan Jobs, Overseas Placements, Career Counseling.
- **Column 3: Resources Links**: CV Templates, Interview Questions, CA Firms List, CAF Revision Notes, ACCA Guides.
- **Column 4: Contact Information**:
  - Phone: `+92 300 1234567`
  - Email: `info@cacareerhub.pk`
  - Location: `Lahore, Pakistan`
- **Column 5: Newsletter Subscription Form**:
  - `Input Field`: Email Address (`type="email"`, required).
  - `Action Button`: Send icon button.
  - `Response State`: Toast / inline green confirmation (`✓ Subscribed successfully!`).
- **Bottom Bar**: Copyright text, Privacy Policy link (`#privacy`), Terms & Conditions link (`#terms`).

### 3. Global Interactive Overlays
- **Dual Neon-Green Custom Cursor**: Inner solid dot with outer smooth-lagging ring tracker (`useBodyScrollLock`).
- **Global Toast Notification Overlay**: Fixed top-right alerts intercepting `window.alert` calls (Types: Success, Error, Warning, Info).
- **Floating Sticky Social Media Sidebar**: Quick action links to WhatsApp, LinkedIn, YouTube, Facebook, Instagram, Phone dialer.
- **Floating Profile Prompt Banner**: Slide-up prompt for logged-in users to complete incomplete profiles.

---

## 📄 Page 1: Home Page (`Home.jsx`)

### Section 1: Hero Banner
- **Text Content**: Headline ("Pakistan's Premier Hub for CA & ACCA Careers"), Subtitle ("Bridging the gap between education and top firm placements").
- **CTA Buttons**: 
  - Primary: `Explore Placements` (navigates to `#inductions`).
  - Secondary: `Book Counseling` (navigates to `#guidance`).
- **Mentor Spotlight Card**: Visual portrait of Saboor Ahmad CA with experience highlights.

### Section 2: Impact Counters Grid (Live Statistics)
- **15,000+** Students Guided
- **8,500+** Opportunities Shared
- **25+** WhatsApp Communities
- **100+** Top Firms Connected

### Section 3: Career Guidance & Support Highlights
- 4 Cards: *Career Roadmap*, *CV Review*, *Interview Tips*, *Articleship Guidance*.
- Each card includes icon, summary, and action button opening detailed modal popups.

### Section 4: Latest Placement & Induction Cards
- Horizontal grid showing 5 latest job postings.
- `Job Card Components`: Company logo SVG/avatar, job title, firm name, location badge, deadline timer, save/bookmark button, "View Details" trigger.

### Section 5: Why Choose Us
- 5 Highlight Cards: *Job Opportunities*, *Career Counseling*, *CV & Interview Help*, *Strong Community*, *Trusted Guidance*.

### Section 6: Media & Podcasts Showcase
- Preview of latest video podcasts featuring Saboor Ahmad CA with playable YouTube embed modals.

### Section 7: Success Stories & Testimonials
- Testimonial cards featuring placed students at PwC, EY, KPMG.

### Section 8: Custom Resource Request CTA
- Banner prompting students to request study notes if not currently available on the portal.

---

## 💼 Page 2: Jobs & Inductions Portal (`Jobs.jsx`)

### 1. View Modes Header Tabs
- `Pakistan Jobs` (`mode="jobs"`: Full-Time / Contract roles in Pakistan).
- `CA/ACCA Inductions` (`mode="inductions"`: Articleship & Internship vacancies in Big 4 & SMPs).
- `Overseas Opportunities` (`mode="overseas"`: Gulf, Middle-East & UK placements).

### 2. Multi-Filter Top Bar
- `Search Input`: Text query for title or company name.
- `City Dropdown`: Filter by city (Lahore, Karachi, Islamabad, Multan, Peshawar, Dubai, Riyadh, London).
- `Level Dropdown`: Filter by qualification stage (PRC, CAF, CFAP, ACCA, Qualified).
- `Firm Dropdown`: Filter by top firms (PwC, Deloitte, EY, KPMG, BDO, Grant Thornton, A.F. Ferguson).
- `Deadline Dropdown`: Filter by closing date proximity.
- `Clear Filters Button`: Resets all active dropdowns.

### 3. Sidebar Filter Checklist
- **City Checkboxes**: Multi-select city checkboxes.
- **Qualification Level Checkboxes**: Multi-select level checkboxes.
- **Firm Name Checkboxes & Search**: Firm search input + multi-select checkboxes.
- **Job Type Checkboxes**: Articleship, Internship, Full Time, Contract.
- **Clear All Filters Trigger**: Full reset button.

### 4. Job Card Grid & Pagination
- **Job Card Attributes**: Company logo SVG/fallback avatar, Job Title, Company Name, Location Badge, Qualification Level Badge, Job Type Badge, Closing Deadline, Bookmark Save Button, "View Details" Button.
- **Pagination Controls**: Previous page, Page Numbers, Next page.

### 5. Job Details Modal (`PortalModal.jsx`)
- Full description text, requirements checklist, company info, closing deadline.
- `Action Button 1`: "Apply via Email" (opens mailto link with pre-filled subject line).
- `Action Button 2`: "Save Job" (toggles saved job state in user account).

---

## 🎓 Page 3: Career Support & Counseling (`career_support.jsx`)

### 1. Hero Section
- Heading: "Transform Your Finance Career with Expert Mentorship".
- CTA Button: `Book a Session`.

### 2. 5 Core Mentorship Services
- **Services**:
  1. *Career Roadmap*
  2. *CV & Resume Review*
  3. *Interview Preparation*
  4. *Articleship Guidance*
  5. *Personal Mentorship*
- **Interaction**: Clicking any card opens a modal displaying detailed bullet points.

### 3. Mentor Profiles Showcase
- Mentors: Saboor Ahmad (CA, ACCA), Usman Saleem (CA, CFA), Hassan Raza (CA, ACCA), Ali Iqbal (ACCA).
- Profile Card details: Name, Credentials, Role, Years of Experience, Mentor Image.

### 4. Interactive Counseling Appointment Modal
- `Input Field 1`: Full Name (`type="text"`, required).
- `Input Field 2`: Email Address (`type="email"`, required).
- `Input Field 3`: Phone / WhatsApp Number (`type="tel"`).
- `Dropdown 1`: Educational Level (PRC, CAF, CFAP, MSA, ACCA, Qualified).
- `Dropdown 2`: Counseling Category (General Inquiry, Career Guidance, Articleship Guidance, Exam Strategy, Technical Issue).
- `Input Field 4`: Subject / Heading (`type="text"`).
- `Textarea`: Detailed Message / Questions (`rows="4"`).
- `Submit Button`: Sends message to database & notifies user.

### 5. Testimonials & Interactive FAQ Accordion
- Frequently asked questions cards with toggleable answer blocks.

---

## 📚 Page 4: Resources & Study Materials (`Resources.jsx`)

### 1. Category Filter Pills
- Tabs: `All`, `PRC (Entry Level)`, `CAF (Intermediate)`, `Training/Induction`, `CFAP & SCS (Finals)`, `CA Qualified`, `ACCA`.

### 2. Search & File Format Bar
- Search query input field + file format filters (`PDF`, `DOCX`, `ZIP`, `XLSX`).

### 3. Downloadable Resource Cards
- Attributes: Title, Category badge, File type badge, File size, Download count badge.
- `Download Button`: Triggers file download link and increments download counter in DB.
- `Preview Button`: Opens resource preview modal.

### 4. Custom "Request Resource" Modal
- `Input 1`: Name (`type="text"`).
- `Input 2`: Email (`type="email"`).
- `Input 3`: Requested Resource Title (`type="text"`).
- `Dropdown`: Category selector.
- `Textarea`: Additional Notes / Specifications.
- `Submit Button`: Logs request into admin inbox.

---

## 📢 Page 5: Announcements & Official Notices (`Announcements.jsx`)

### 1. Filter Tabs & Search
- Categories: `All`, `Jobs & Inductions`, `Official Notices`, `Competitions`, `Study Updates`, `Community Updates`, `Alerts`.
- Search Bar: Keywords in title or content.

### 2. Announcement List Cards
- Attributes: Tag badge, Pinned status badge, Event/Notice Date, Title, Summary text snippet.
- `Read Full Notice Button`: Opens rich-text announcement modal.

### 3. Announcement Detail Modal
- Complete rich-text description, official ICAP/ACCA notification links, attachment download button.

---

## 📅 Page 6: Events & Webinars (`Events.jsx`)

### 1. Status Filter Tabs
- Tabs: `All`, `Upcoming`, `Live Now`, `Recorded Webinars`.
- Qualification Target Filter (CAF, ACCA, CFAP, All).

### 2. Event Cards Grid
- Attributes: Event Status Badge (Upcoming/Live/Recorded), Title, Date & Time, Speaker Details (Name, Title, Organization), Location (Zoom Live / Physical Venue).
- `Action Buttons`:
  - Upcoming: `Register Now` (opens registration modal).
  - Live: `Join Zoom Live` (direct link).
  - Recorded: `Watch Recording` (opens embedded video modal).

### 3. Event Registration Modal
- Inputs: User Name, Email, Phone, Qualification Level.
- Confirmation toast notification.

---

## 🎙️ Page 7: Podcasts & Video Library (`Podcasts.jsx`)

### 1. Video Category & Target Filters
- Categories: `All`, `Inductions & Guidance`, `Interview Prep`, `Career & Overseas`, `Podcasts & Interviews`.
- Target Qualification Pills: `CA`, `ACCA`, `Corporate / Tax`.

### 2. Video Card Grid & Embedded YouTube Player
- Attributes: Thumbnail image, YouTube video ID, Title, Guest Speaker name & role, Duration, Views count, Likes count.
- `Interactive Like Button`: Increments/decrements video like count.
- `Play Card Trigger`: Opens custom dark-mode YouTube modal player (`iframe`).

---

## 💬 Page 8: Community Rooms (`Community.jsx`)

### 1. Qualification Group Cards
- **Groups**:
  - *PRC Students Group* (Entry level)
  - *CAF Intermediate Forum*
  - *CFAP Finals Mentorship*
  - *ACCA Global Network*
  - *CA Qualified Alumni Circle*
- Card Details: Group Title, Category Key, Member Count (e.g. "4,800+ Active"), Description, Highlights.

### 2. Group Action Buttons
- `Join WhatsApp Channel` (Direct WhatsApp invite link).
- `Join Discord Community` (Direct Discord invite link).

---

## 🛠️ Page 9: Interactive AI & Career Tools (`CareerTools.jsx`)

### 1. Approved CA Firm Directory Sub-Tab
- `Search Input`: Firm name or city search.
- `Category Filters`: Big 4, Category A, SMPs.
- `Firm Cards`: Name, Stipend (`Rs. 29,700 / month`), Location, Ratings, Tags, Recent Interview Questions asked in firm.

### 2. AI Mock Interview Simulator Sub-Tab
- `Role Selector Dropdown`: Audit Trainee, Tax Assistant, Advisory Associate, Finance Officer.
- `Round Selector Dropdown`: HR Screening, Technical Round, Partner Interview.
- `Textarea Answer Box`: Candidate types response to AI manager's question.
- `Evaluate Button`: AI feedback on answer quality, technical accuracy, and improvement tips.
- `Chat History Log`: Conversational transcript between student and AI interviewer.

### 3. 1-Click CA Student CV Builder Sub-Tab
- `Input Form Fields`:
  - Full Name (`text`)
  - CRN Number (`text`)
  - Email (`email`)
  - Phone (`tel`)
  - Qualification (`text`)
  - Exam Pass Attempts (`text`)
  - City (`text`)
  - Technical Skills (`text`)
  - Career Objective (`textarea`)
- `Live Preview Sheet`: Updates formatting in real-time as user types.
- `Export Buttons`: "Download PDF" & "Print CV".

### 4. 24/7 AI Study Assistant Sub-Tab
- `Subject Selector`: FAR-1, FAR-2, Audit & Assurance, Taxation, Management Accounting, ACCA SBL/SBR.
- `Prompt Input Box`: Student types numerical question or accounting standard scenario.
- `Chat Response Thread`: Instant step-by-step resolution.

### 5. Spiritual & Deeni Motivation Sub-Tab
- `Quranic Search Bar`: Search themes like patience, exam stress, success, hard work.
- `Wisdom Cards`: Arabic Ayah, English Translation, Contextual explanation for CA students.

---

## 📞 Page 10: Contact Us Page (`Contact.jsx`)

### 1. Branch Office Cards
- Offices: Lahore, Karachi, Islamabad. Displays address, phone line, and email.

### 2. Contact & Counseling Query Form
- `Full Name`: (`text`, required)
- `Email Address`: (`email`, required)
- `Phone Number`: (`tel`)
- `Category Dropdown`: General Inquiry, Career Guidance, Articleship Guidance, Exam Strategy, Technical Issue.
- `Subject`: (`text`, required)
- `Message`: (`textarea`, required)
- `Submit Button`: Logs query into database.

### 3. Interactive Accordion FAQs
- Expandable question & answer cards.

---

## 🔑 Page 11: Authentication Page (`Login.jsx`)

### 1. 3D Flip Card Architecture
- Smooth 3D Y-axis flip transition switching between Sign In (front) and Sign Up (back).

### 2. Sign In Form (Front)
- `Email Input`: (`type="email"`, required)
- `Password Input`: (`type="password"`, required, with show/hide eye toggle)
- `Remember Me`: Checkbox.
- `Forgot Password`: Link.
- `Sign In Button`: Sends POST request to auth service.
- `Switch to Sign Up Button`: Flips card to Sign Up view.

### 3. Sign Up Form (Back)
- `Full Name Input`: (`type="text"`, required)
- `Username Input`: (`type="text"`, required)
- `Email Input`: (`type="email"`, required)
- `Password Input`: (`type="password"`, min length 6, required)
- `Confirm Password Input`: (`type="password"`, required)
- `Sign Up Button`: Sends registration request and logs user in.
- `Switch to Sign In Button`: Flips card to Sign In view.

---

## 👤 Page 12: User Student Dashboard (`UserDashboard.jsx`)

### 1. Sidebar Navigation Sub-Tabs
- `Overview`
- `Saved Placements`
- `My Counseling Queries`
- `My Resource Requests`
- `Profile Settings`

### 2. Overview Sub-Tab
- Stats Summary: Saved Jobs count, Submitted Queries count, Resource Requests count.
- Recommended Jobs Grid based on user's qualification level (`CAF` / `CFAP` / `ACCA`).
- Profile Completeness Widget.

### 3. Saved Placements Sub-Tab
- Saved job cards with remove bookmark option and application triggers.

### 4. My Counseling Queries Sub-Tab
- Table of student's submitted counseling queries.
- Displays Status badge (`Pending` / `Replied`).
- Clicking query opens modal showing **Admin Reply** in real-time.
- `Submit New Query` button.

### 5. My Resource Requests Sub-Tab
- Table of custom requested study notes with status (`Pending` / `Fulfilled` / `Rejected`).

### 6. Profile Settings Sub-Tab
- `Avatar Upload`: File input with image preview & 1MB file size validator.
- `Full Name`: (`text`)
- `Username`: (`text`)
- `Qualification Level Dropdown`: PRC, CAF, CFAP, MSA, ACCA, Qualified.
- `Phone Number`: (`text`)
- `City`: (`text`)
- `Institution`: (`text`)
- `Papers Cleared`: (`number`)
- `CV Google Drive / File Link`: (`text`)
- `Save Profile Button`: Updates user profile data in database.

---

## 🛠️ Page 13: Admin Management Dashboard (`AdminDashboard.jsx`)

### 1. Header Bar & Navigation
- System Notifications dropdown menu.
- Admin Profile dropdown menu.
- Quick switch back to public platform.

### 2. Admin Sub-Tabs & Management Modules
1. **System Overview (Dashboard Sub-Tab)**:
   - System Statistics Cards: Total Users, Active Jobs, Total Resources, Pending Queries, Pending Requests, Community Groups.
2. **User Management Sub-Tab**:
   - User Search & Role Filter dropdown (`All`, `user`, `admin`, `team_head`).
   - User Table: Full Name, Username, Email, Created Date, Current Role dropdown (`user` -> `admin` -> `team_head`). Changing dropdown updates role immediately.
3. **Job & Placement Management Sub-Tab**:
   - Jobs CRUD Table: Company, Title, Location, Level, Job Type, Deadline, Actions.
   - `Add New Job Modal`: Company, Title, Location, Level, Job Type, Deadline, Description, Requirements (comma-separated), Is Overseas checkbox.
   - `Edit Job Modal`: Pre-fills job attributes for updating.
   - `Delete Job Trigger`: Opens deletion confirmation modal.
4. **Resource Management Sub-Tab**:
   - Resources CRUD Table: Title, Category, Type, Downloads count, Actions.
   - `Add / Edit Resource Modal`: Title, Description, Category (PRC, CAF, Training, CFAP, Qualified, ACCA), Type (PDF, DOCX, ZIP, XLSX, LINK), Tag Name, Tag Color, Download URL, Is Featured checkbox.
5. **Announcements Management Sub-Tab**:
   - Announcements CRUD Table: Title, Category, Event Date, Actions.
   - `Add / Edit Announcement Modal`: Title, Summary, Content (Rich-text / Markdown), Category (Jobs & Inductions, Official Notices, Competitions, Study Updates, Event, Alert), Event Date.
6. **Events & Webinars Management Sub-Tab**:
   - Events CRUD Table + Add/Edit Event Modal (Title, Description, Date, Time, Speaker Info, Status, Zoom Link, Recording Link).
7. **Videos & Podcasts Management Sub-Tab**:
   - Podcasts CRUD Table + Add/Edit Podcast Modal (Title, YouTube Video ID, Guest Name, Guest Role, Category Tag, Qualification Tag, Thumbnail URL, Is Featured).
8. **Student Counseling Queries Inbox Sub-Tab**:
   - Inbox Table: Student Name, Email, Phone, Category, Subject, Status (`Pending` / `Replied`).
   - `Reply Modal`: Displays student question details + Admin Reply textarea + `Send Reply` button. Updates status to `Replied` and records reply timestamp.
9. **Resource Requests Inbox Sub-Tab**:
   - Inbox Table: Student Name, Requested Resource Title, Category, Notes, Status dropdown (`Pending`, `Fulfilled`, `Rejected`). Updating dropdown changes status in database.
10. **Community Groups Management Sub-Tab**:
    - Groups CRUD Table + Add/Edit Group Modal (Title, Category Key, Badge, WhatsApp link, Discord link, Member Count Text).

---

# PART 3: Database Data Models & Schema Specifications

```json
// 1. User Schema (users)
{
  "_id": "ObjectId",
  "full_name": "String",
  "username": "String (Unique)",
  "email": "String (Unique)",
  "password_hash": "String",
  "role": "Enum ['user', 'admin', 'team_head']",
  "avatar_url": "String",
  "level": "Enum ['PRC', 'CAF', 'CFAP', 'MSA', 'ACCA', 'Qualified']",
  "phone": "String",
  "city": "String",
  "institution": "String",
  "papers_cleared": "Number",
  "cv_url": "String",
  "saved_jobs": ["ObjectId (Ref: Job)"],
  "created_at": "Date",
  "updated_at": "Date"
}

// 2. Job / Placement Schema (jobs)
{
  "_id": "ObjectId",
  "title": "String",
  "company": "String",
  "location": "String",
  "level": "String",
  "job_type": "Enum ['Articleship', 'Internship', 'Full-time', 'Contract']",
  "is_overseas": "Boolean",
  "deadline": "Date",
  "description": "String",
  "requirements": ["String"],
  "posted_by": "ObjectId (Ref: User)",
  "created_at": "Date"
}

// 3. Resource Schema (resources)
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "category": "Enum ['PRC', 'CAF', 'Training/Induction', 'CFAP & SCS (Finals)', 'CA Qualified', 'ACCA']",
  "type": "Enum ['PDF', 'DOCX', 'ZIP', 'XLSX', 'LINK']",
  "downloads": "Number",
  "tag": "String",
  "tag_color": "String",
  "download_url": "String",
  "is_featured": "Boolean",
  "created_at": "Date"
}

// 4. Announcement Schema (announcements)
{
  "_id": "ObjectId",
  "title": "String",
  "summary": "String",
  "content": "String (Markdown/Rich Text)",
  "category": "Enum ['Jobs & Inductions', 'Official Notices', 'Competitions', 'Study Updates', 'Community Updates', 'General', 'Event', 'Alert']",
  "event_date": "String",
  "is_pinned": "Boolean",
  "created_at": "Date"
}

// 5. Counseling Query Schema (messages)
{
  "_id": "ObjectId",
  "user_id": "ObjectId (Ref: User)",
  "name": "String",
  "email": "String",
  "phone": "String",
  "subject": "String",
  "category": "Enum ['General Inquiry', 'Career Guidance', 'Articleship Guidance', 'Exam Strategy', 'Technical Issue']",
  "message": "String",
  "status": "Enum ['Pending', 'Replied', 'Closed']",
  "reply": {
    "reply_text": "String",
    "replied_by": "String",
    "replied_at": "Date"
  },
  "created_at": "Date"
}

// 6. Resource Request Schema (resource_requests)
{
  "_id": "ObjectId",
  "user_id": "ObjectId (Ref: User)",
  "name": "String",
  "email": "String",
  "resource_title": "String",
  "category": "String",
  "notes": "String",
  "status": "Enum ['Pending', 'Fulfilled', 'Rejected']",
  "created_at": "Date"
}
```

---

# PART 4: Backend Tech Stack Decision & Architectural Recommendation

To select the ideal backend tech stack for **The TaxMan's Capital**, we evaluated the project's requirements across key dimensions:
1. **High I/O & Read-Heavy Workloads**: Thousands of students searching jobs, downloading resources, watching podcasts.
2. **Role-Based Access Control (RBAC)**: Secure separation between regular students, team heads, and admins.
3. **Structured & Unstructured Querying**: Filtering jobs by city/level/firm, searching announcements, and storing dynamic student metadata.
4. **Developer Velocity & Maintainability**: Fast implementation, clean RESTful architecture, easy integration with the existing React 19 + Vite frontend.

---

### 🏆 TOP RECOMMENDATION: Node.js (Express.js) + MongoDB (Mongoose) or PostgreSQL (Prisma)

#### Stack Option A: Node.js + Express.js + MongoDB (Mongoose) — *Recommended for Speed & Flexibility*
- **Why Node.js + Express**: Non-blocking I/O ideal for API routing, asynchronous file tracking, and handling multiple student queries simultaneously.
- **Why MongoDB + Mongoose**: Schema flexibility allows easy extension of user profiles, dynamic job requirements arrays, and rich announcement content without rigid migration friction.
- **JWT & Bcrypt Authentication**: Standard, stateless authentication that seamlessly bridges with `localStorage` or `httpOnly` cookies in React.

#### Stack Option B: Node.js + Express.js + PostgreSQL (Prisma) — *Recommended for Relational Integrity*
- **Why PostgreSQL + Prisma**: Strong relational mapping between Users, Saved Jobs, Counseling Replies, and Admin Audit Logs. Prisma ORM provides type-safe queries and auto-generated TypeScript/JS client.

---

### ❌ Technologies Not Recommended & Rationale

1. **Python (Django / FastAPI)**:
   - *Why Avoid*: Adds Python environment overhead when the current team and codebase are fully JavaScript-native (React + Vite). Django is overly heavy for a clean REST API.
2. **Firebase / Supabase (Serverless BaaS Only)**:
   - *Why Avoid*: While good for rapid prototyping, BaaS platforms lack custom server-side business logic needed for AI Mock Interview evaluation, custom email notification triggers, and custom admin analytics pipelines.
3. **Ruby on Rails**:
   - *Why Avoid*: Slower execution for concurrent API requests and lower ecosystem synergy with React/Vite tooling.

---

### 📌 Summary Table: Recommended Backend Architecture

| Tier | Recommended Technology | Purpose in The TaxMan's Capital |
| :--- | :--- | :--- |
| **Runtime** | Node.js (v20+ LTS) | Asynchronous backend execution environment |
| **Framework** | Express.js | Lightweight, fast REST API routing and middleware |
| **Database** | MongoDB (Atlas) / PostgreSQL | Persistent data store for jobs, profiles, resources |
| **ORM / ODM** | Mongoose / Prisma | Type-safe schema modeling and validation |
| **Authentication** | JWT + Bcrypt.js | Secure stateless login and password hashing |
| **File Storage** | Cloudinary / AWS S3 | Hosting CV attachments, PDFs, and user avatars |
| **Hosting / PaaS** | Render / Railway / Vercel | Seamless continuous deployment and API hosting |
