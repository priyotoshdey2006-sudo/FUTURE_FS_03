# ✨ Abhilasha Ladies Beauty Parlour

### A Luxury Beauty Parlour & Beauty Academy Website

A modern, elegant, and responsive business website developed for **Abhilasha Ladies Beauty Parlour**, designed to strengthen its online presence, showcase beauty services, and provide customers with convenient access to business information and account authentication.

This project was developed as part of **Future Interns – Full Stack Web Development Internship, Task 3**.

---

## 🌐 Live Preview

- **Live Website:** Add your deployed website URL here
- **GitHub Repository:** https://github.com/priyotoshdey2006-sudo/FUTURE_FS_03

---

## 📌 Project Overview

Abhilasha Ladies Beauty Parlour is a beauty service business that also provides beauty training courses.

The objective of this project is to create a premium digital presence with an elegant user interface, responsive layout, service presentation, contact information, and customer authentication.

The website uses a luxury-inspired visual identity with a dark espresso theme, champagne-gold accents, elegant typography, and modern layouts.

## 🎯 Objectives

- Build a professional website for a local beauty business.
- Create a premium and visually appealing user experience.
- Showcase beauty services and business information.
- Make the website responsive across desktop, tablet, and mobile devices.
- Integrate customer sign-up, sign-in, and logout functionality.
- Connect the application with Supabase for authentication and database services.
- Provide convenient WhatsApp and social media access.

## ✨ Key Features

### 1. Premium Homepage
- Luxury-inspired dark theme.
- Elegant typography and visual presentation.
- Professional hero section with banner imagery.
- Clear navigation and call-to-action buttons.

### 2. Beauty Services
- Dedicated services section.
- Organized presentation of beauty treatments.
- Attractive service cards and layouts.

### 3. About Section
- Introduction to the beauty parlour.
- Business information and brand presentation.

### 4. Gallery
- Visual presentation of beauty-related images.
- Responsive image layout.

### 5. Contact & Location
- Business contact information.
- Google Maps location link.
- WhatsApp contact integration.
- Instagram and Facebook links.

### 6. Customer Authentication
- Customer registration.
- Email and password login.
- Logout functionality.
- Forgot-password interface and Supabase password reset integration.

### 7. Responsive Design
- Desktop-friendly layout.
- Tablet compatibility.
- Mobile navigation and responsive sections.

### 8. Backend Integration
- Supabase authentication.
- PostgreSQL database tables.
- Row Level Security (RLS) policies.
- Brevo SMTP configuration for transactional email delivery.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| Vite | Development server and build tool |
| Lucide React | Icons |
| Supabase | Authentication and backend services |
| PostgreSQL | Database |
| Brevo SMTP | Transactional email configuration |
| Git | Version control |
| GitHub | Source code hosting |

---

## 📁 Project Structure

```text
FUTURE_FS_03/
│
├── public/
│   └── images/
│       ├── hero-model.jpg
│       └── abhilasha-logo.png
│
├── src/
│   ├── components/
│   │   └── AccountAccess.jsx
│   │
│   ├── lib/
│   │   └── supabaseClient.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- Git
- A Supabase project

### 1. Clone the Repository

```bash
git clone https://github.com/priyotoshdey2006-sudo/FUTURE_FS_03.git
```

### 2. Navigate to the Project Folder

```bash
cd FUTURE_FS_03
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

Add your own Supabase project credentials:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

**Important:** Never upload `.env.local`, private API keys, SMTP credentials, or passwords to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

### 6. Create a Production Build

```bash
npm run build
```

---

## 🔐 Backend & Database

Supabase is used for authentication and database services.

The project database includes tables designed for:

- `profiles` – Customer profile information.
- `admin_users` – Administrator access management.
- `appointments` – Appointment data.
- `course_registrations` – Beauty course registration data.

Row Level Security (RLS) policies are configured to restrict access to protected records.

Brevo SMTP is configured through Supabase for authentication-related transactional emails.

---

## 🎨 Design Approach

The visual design focuses on a luxury beauty brand experience.

- **Primary Theme:** Dark Espresso / Mocha
- **Accent:** Champagne Gold
- **Heading Font:** Cormorant Garamond
- **Body Font:** DM Sans
- **Design Style:** Minimal, Elegant, Premium and Responsive

---

## 📱 Business Information

**Abhilasha Ladies Beauty Parlour**

- **Location:** Near Rabindrapally Indoor Stadium, Suri, Birbhum, West Bengal – 731101
- **Phone:** +91 81169 13003
- **WhatsApp:** https://wa.me/918116913003
- **Instagram:** https://www.instagram.com/moynamondal_24680/
- **Facebook:** https://www.facebook.com/share/19Yz2kV2qP/

---

## 🚀 Future Improvements

- Complete online appointment booking workflow.
- Customer dashboard and appointment history.
- Beauty course registration workflow.
- Admin dashboard for managing appointments and registrations.
- Online payment integration.
- Email and booking status notifications.
- Improved gallery and content management.

---

## 👨‍💻 Developer

**Priyotosh Dey**

B.Tech – Computer Science & Engineering (Artificial Intelligence and Machine Learning)

Dr. B.C. Roy Engineering College

- **GitHub:** https://github.com/priyotoshdey2006-sudo

---

## 📄 Internship

**Program:** Future Interns – Full Stack Web Development Internship

**Task:** Task 3 – Local Business Website

---

## ⭐ Acknowledgement

This project was developed as part of the Future Interns internship program to apply practical frontend development, responsive design, authentication, database integration, and version control skills to a real-world business website.

If you find this project useful, consider giving this repository a ⭐ on GitHub.

---

**Built with passion by Priyotosh Dey.**