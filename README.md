# 📄 Freelancer Project Inquiry – Multi-Step Form

A real-world, responsive, and schema-validated multi-step form built with **React**, **Tailwind CSS**, **Zod**, and **Supabase**, designed to streamline project inquiries for freelancers or agencies. Includes step-by-step validation, file upload support, database persistence, and a secure admin dashboard.

![React](https://img.shields.io/badge/React-18.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-teal)
![Zod](https://img.shields.io/badge/Zod-Validation-red)
![Supabase](https://img.shields.io/badge/Supabase-Fullstack-brightgreen)
![Deployment](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-green)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📘 Table of Contents

| Section              | Description                                      |
| -------------------- | ------------------------------------------------ |
| Project Overview     | High-level summary of project purpose and goals  |
| Features             | Key features and functionalities                 |
| Tech Stack           | Technologies used in the project                 |
| Form Structure       | Breakdown of each step and validation logic      |
| Admin Panel          | Access and usage details for admin functionality |
| Supabase Integration | Schema for DB and file upload                    |
| Getting Started      | Instructions to run locally and deploy           |
| Live Demo            | Hosted version of the form                       |
| License              | Licensing and usage terms                        |

---

## 🚀 Project Overview

The **Freelancer Project Inquiry Form** is a practical, modern implementation of a multi-step form commonly used by freelancers or creative agencies to gather project details from clients. It features robust form validation, responsive layout, real-time data storage, and a protected admin dashboard.

This project replicates real-world scenarios including file uploads, step-wise validation, and secure backend integration with **Supabase**, offering an ideal learning and portfolio-building opportunity.

---

## 🧩 Features

* ✅ Multi-step architecture with clear progression
* 🧠 Step-wise schema validation using **Zod**
* 📝 Managed form state via **React Hook Form**
* 📁 File upload (PDF, PNG, JPG) with Supabase Storage
* 💾 Inquiry data stored in Supabase Database
* 🔐 Admin panel protected via static credentials
* 📱 Fully responsive and accessible design
* ✨ Animated transitions with **Framer Motion**

---

## 🛠️ Tech Stack

| Technology      | Usage                                     |
| --------------- | ----------------------------------------- |
| React           | Component-based UI rendering              |
| Vite            | Lightning-fast frontend tooling           |
| Tailwind CSS    | Utility-first CSS framework               |
| Zod             | Step-wise form validation                 |
| React Hook Form | Form handling with integration support    |
| Supabase        | Backend services: Database, Auth, Storage |
| Framer Motion   | Seamless animations between form steps    |

---

## 🗂️ Form Structure

### 🔹 Step 1 – Personal Info

| Field        | Type  | Validation             |
| ------------ | ----- | ---------------------- |
| Full Name    | Text  | Required, min 2 chars  |
| Email        | Email | Required, valid format |
| Phone Number | Text  | Optional               |

### 🔹 Step 2 – Project Details

| Field        | Type     | Validation |
| ------------ | -------- | ---------- |
| Project Type | Dropdown | Required   |
| Budget       | Select   | Optional   |
| Timeline     | Text     | Required   |

### 🔹 Step 3 – Description & Upload

| Field       | Type     | Validation                        |
| ----------- | -------- | --------------------------------- |
| Description | Textarea | Required, min 20 characters       |
| File Upload | File     | Optional, (.pdf, .jpg, .png only) |

### 🔹 Step 4 – Review & Submit

* Summarized review of all inputs
* Checkbox to confirm data before submission

---

## 🔐 Admin Panel

* Accessible at `/admin` route
* Protected via `.env`-based static email/password
* Displays all submitted inquiries with uploaded files and timestamps

---

## 💾 Supabase Integration

### 📊 Database Table – `inquiries`

| Column        | Type      |
| ------------- | --------- |
| id            | UUID (PK) |
| full\_name    | Text      |
| email         | Text      |
| phone         | Text      |
| project\_type | Text      |
| budget        | Text      |
| timeline      | Text      |
| description   | Text      |
| file\_url     | Text      |
| created\_at   | Timestamp |

### 📁 Storage Bucket – `inquiry-uploads`

* Accepted types: `application/pdf`, `image/*`
* Max size: 10MB (configurable)
* Public access controlled with RLS policies

---

## 📬 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gursharancodes/freelancer-inquiry-form.git
   cd freelancer-inquiry-form
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup Supabase:**

   * Create a project on [Supabase](https://supabase.com/)
   * Configure your database schema and storage bucket
   * Add your Supabase credentials in a `.env` file

4. **Set up environment variables:**

   ```env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   VITE_ADMIN_EMAIL=admin@example.com
   VITE_ADMIN_PASSWORD=yourpassword
   ```

5. **Run development server:**

   ```bash
   npm run dev
   ```

6. **Build for production:**

   ```bash
   npm run build
   ```

---

## 📌 Live Demo

> [🌐 View Freelancer Inquiry Form](https://freelancer-inquiry-form.pages.dev/)

---

## 📄 License

This project is released under the **MIT License** for **educational and portfolio** use.
**Commercial use is prohibited** without prior written permission.
