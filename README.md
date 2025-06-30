# 🚀 Freelancer Project Inquiry – Multi-Step Form

A responsive, accessible, and real-world multi-step inquiry form built with **React**, **Tailwind CSS**, **Zod**, and **Supabase**. Designed to simulate a freelancer or agency client inquiry form with validation, file upload, and cloud persistence.

## 📸 Live Demo

[🔗 View Live Form](https://freelacer-inquiry-form.pages.dev)

---

## 🧩 Features

- ✅ Multi-step form architecture (4 logical steps)
- ✅ Schema-based validation using `Zod`
- ✅ Form state handling with `React Hook Form`
- ✅ File upload to `Supabase Storage` (PDF, PNG, JPG)
- ✅ Data persistence to `Supabase Database`
- ✅ Animated step transitions using `Framer Motion`
- ✅ Admin panel to view inquiries (protected via static login)
- ✅ Mobile-first, responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Tool            | Purpose                            |
|-----------------|-------------------------------------|
| **React**       | Component-based UI                 |
| **Vite**        | Frontend build tool                |
| **Tailwind CSS**| Utility-first styling              |
| **Zod**         | Validation schema for each step    |
| **React Hook Form** | Form handling and integration |
| **Supabase**    | Auth, Database, Storage backend    |
| **Framer Motion** | Smooth UI transitions (optional) |

---

## 🔗 Form Structure

### Step 1 – Personal Info
| Field        | Type    | Validation             |
|--------------|---------|------------------------|
| Full Name    | Text    | Required, min 2 chars  |
| Email        | Email   | Required, valid format |
| Phone Number | Text    | Optional               |

### Step 2 – Project Details
| Field        | Type    | Validation             |
|--------------|---------|------------------------|
| Project Type | Dropdown| Required               |
| Budget       | Select  | Optional               |
| Timeline     | Text    | Required               |

### Step 3 – Description & Upload
| Field        | Type    | Validation                      |
|--------------|---------|---------------------------------|
| Description  | Textarea| Required, min 20 characters     |
| File Upload  | File    | Optional (.pdf, .jpg, .png only)|

### Step 4 – Review & Submit
- Displays all data for confirmation
- Checkbox to confirm info before submission

---

## 🔐 Admin Panel

- Protected via a static credential check (stored in `.env`)
- Requires matching email/password to access `/admin`
- Admin can view all submissions with file links and timestamps

---

## 💾 Supabase Integration

### Database Table: `inquiries`

| Column        | Type      |
|---------------|-----------|
| id            | UUID (PK) |
| full_name     | Text      |
| email         | Text      |
| phone         | Text      |
| project_type  | Text      |
| budget        | Text      |
| timeline      | Text      |
| description   | Text      |
| file_url      | Text      |
| created_at    | Timestamp |

### Storage Bucket: `inquiry-uploads`

- Accepts only: `application/pdf, image/*`
- Max file size: 10MB (configurable)
- Public read access with RLS policy for secure upload

---

## 🧪 Validation Logic

Validation is handled per step using **Zod** schemas.  
Each step validates its own inputs before proceeding.  
No need to re-validate previous steps.

---

## 🌐 Deployment (Cloudflare Pages)
[🔗 View Live Form](https://freelacer-inquiry-form.pages.dev)
