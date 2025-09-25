# Expense Tracker App

A full-stack **Next.js Expense Tracker** with authentication, database, and testing.
The app lets users sign up, log in (with email + Google), add expenses, categorize them, and view reports with charts.

---

## 🚀 Features

### MVP

- User authentication (Email + Google Sign in/out via Supabase Auth)
- Add, edit, delete expenses
- Categorize expenses (Food, Travel, Bills, etc.)
- Dashboard with totals & chart

### Advanced (Stretch Goals)

⏳ Filters (by date, category)
⏳ Export data (CSV/PDF)
⏳ Budget goals (alerts if exceeded)
⏳ Responsive PWA version

---

## Tech Stack

* **Frontend**: Next.js (App Router) + Tailwind CSS
* **Auth**: Supabase Auth (email + Google OAuth) [https://supabase.com/docs/guides/auth/server-side/nextjs]
* **Database**: Supabase (Postgres)
* **Data Fetching & Caching**: TanStack Query
* **Charts**: Chart.js (or Recharts)
* **State Management**: Minimal (TanStack + useState)
* **Testing**:

  * Unit → Vitest / Jest
  * Integration → React Testing Library
  * E2E → Playwright / Cypress

---

## Project Structure

```
expense-tracker/
  ├── src/
  │   ├── app/            # Next.js App Router
  │   │   ├── (auth)/     # Auth routes (login, signup)
  │   │   ├── dashboard/  # Protected routes
  │   │   └── api/        # Route handlers (Next.js API routes)
  │   ├── components/     # Reusable components
  │   ├── hooks/          # Custom hooks (e.g. useExpenses)
  │   ├── lib/            # Supabase client + helpers
  │   ├── utils/          # Helpers (currency format, date utils)
  │   └── tests/          # All test files
  └── package.json
```

---

## Authentication (Supabase Auth)

Supabase manages users, sessions, and OAuth (Google).

**Flow**:

1. User signs up with email or Google → Supabase stores user row
2. Session is persisted automatically (JWT in local storage or cookies)
3. Protected routes (`/dashboard`) require a valid session

---

## Database Schema (Supabase)

**users**

* `id (uuid)`
* `email`
* `created_at`

**expenses**

* `id (uuid)`
* `user_id (fk)`
* `amount`
* `category`
* `description`
* `date`
* `created_at`

---

## Testing Plan

### Unit Tests

* `utils/currencyFormat` → formats numbers properly
* `utils/dateUtils` → formats date correctly

### Component Tests

* `AddExpenseForm` → renders inputs, validates, submits
* `ExpenseList` → shows expenses, deletes on click

### Integration Tests

* Add new expense → dashboard updates
* Login → redirects to dashboard

### E2E Tests

* Full flow: signup → add expense → see chart update

---

## Roadmap / Progress Tracker

**Phase 1 – Setup**

* [x] Create Next.js + Tailwind project
* [x] Set up Supabase project + DB schema
* [x] Add Supabase Auth (Email + Google OAuth)
* [x] Add signup & login pages

**Phase 2 – Core Features**

* [x] Add dashboard page (protected route)
* [x] Build `AddExpenseForm` component
* [x] Display expense list
* [x] Connect TanStack Query for fetching/mutations

**Phase 3 – Enhancements**

* [ ] Add category filter + totals
* [ ] Add chart visualization (Chart.js)
* [ ] Optimize UX (loading states, error handling)

**Phase 4 – Testing**

* [ ] Write unit tests for utils
* [ ] Write component tests with React Testing Library
* [ ] Write integration tests (login + expense flow)
* [ ] Add E2E tests with Playwright

**Phase 5 – Polish**

* [ ] Deploy (Vercel + Supabase)
* [ ] Write project documentation
* [ ] Share project on portfolio

---

## Installation & Running Locally

```bash
# 1. Clone repo
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run dev server
npm run dev
```

---

## 🔑 Environment Variables

```env
VITE_SUPABASE_URL=<your_supabase_project_url>
VITE_SUPABASE_PUBLISHABLE_KEY=<sb_publishable_... or anon keyY>
VITE_GOOGLE_CLIENT_ID=<google client id>
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET="<client-secret>"
VITE_PUBLIC_BASE_URL
```

---

## 🌟 Learning Goals

* Practice **Supabase Auth (Email + Google)** in a real app
* Learn **TanStack Query** patterns for data fetching
* Write **unit, integration, and E2E tests** in a structured way
* Deploy a **production-ready full-stack app**

---

## Learn More

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
