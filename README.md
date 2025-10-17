# Expense Tracker App

A full-stack Expense Tracker built with **React.js, Supabase, Tailwind CSS and Recharts**.
Tracks expenses, groups by category/date, supports Supabase Auth (email + Google), and includes charts and pagination.

## 🚀 Features

### MVP

- Sign in / Sign out (email + Google) via Supabase
- Add / edit / delete expenses (mutations via hooks)
- Expenses list with per-item display, category badges and pagination (10 items per page)
- Dashboard overview with totals and category grouping
- Charts with toggle-able trend: daily (Mon–Sun), weekly (weeks in selected month), monthly (Jan–Dec)
- Theme toggle (light / dark) implemented with CSS variables and Tailwind `dark` class

### Advanced (Stretch Goals)

- ⏳ Filters (by date, category)
- ⏳ Export data (CSV/PDF)
- ⏳ Budget goals (alerts if exceeded)

## Tech Stack

* **Frontend**: React.js + Tailwind CSS
* **Auth**: Supabase Auth (email + Google OAuth) [https://supabase.com/docs/guides/auth/social-login/auth-google]
* **Database**: Supabase (Postgres)
* **Data Fetching & Caching**: TanStack Query
* **Charts**: Recharts (Chart.js alternative)
* **State Management**: Minimal (TanStack + useState)
* **Testing**:
  * Unit → Vitest / Jest
  * Integration → React Testing Library
  * E2E → Cypress / Playwright


## Project Structure

```
expense-tracker/
  ├── src/
  │   ├── components/     # UI components (Navbar, ExpenseList, Charts, shared UI)
  │   ├── context/        # AuthContext + auth helpers (`src/context/AuthContext.tsx`)
  │   ├── hooks/          # data hooks (useExpenses, useCategories, useBudgets)
  │   ├── lib/            # types, supabase client, utils (mock data in `src/lib/utils.ts`)
  │   ├── pages/          # app pages (dashboard, expenses, auth pages)
  │   ├── index.css       # global styles + CSS variables for theming
  │   └── tests/          # All test files
  └── package.json
```



## Authentication (Supabase Auth)

Supabase manages users, sessions, and OAuth (Google).

**Flow**:

1. User signs up with email or Google → Supabase stores user row
2. Session is persisted automatically (JWT in local storage or cookies)
3. Routes (`/` && `/expenses`) require a valid session to display actual content



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

**categories**
* `id (uuid)`
* `name`
* `color`
* `created_at`

**budgets** (stretch goal)
* `id (uuid)`
* `user_id (fk)`
* `category_id (fk)`
* `amount`
* `period` (monthly/weekly)
* `created_at`

---
## Tips / Troubleshooting

- If mock data isn't used when server data is empty: ensure you check `array.length > 0` (empty arrays are truthy). Example:
```ts
const expensesData = (expenses && expenses.length > 0) ? expenses : mockExpenses;
```
- Tailwind + dynamic theme: define color tokens in `:root` and `.dark` in `src/index.css`. In `tailwind.config.ts` reference them using `hsl(var(--background))`.
- When updating mock categories, update `mockExpenses` category_id values to match.

## Important implementation notes

- Mock data lives in `src/lib/utils.ts`. If you import real categories from Supabase, update `mockExpenses` to reference the correct category UUIDs (this repo already has UUIDs in the mock).
- Charts aggregate data per category per period (daily/weekly/monthly) so each category is a separate area in the chart. Weekly periods are computed from the weeks present in the current month.
- Auth state is tracked in `src/context/AuthContext.tsx`; ensure Supabase client initialization matches your env vars.

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

## Contributing

- Open an issue for bugs or feature requests.
- Use branches for features and PRs for review.
