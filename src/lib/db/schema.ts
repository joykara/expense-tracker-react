import { pgTable, uuid, text, numeric, timestamp, date } from "drizzle-orm/pg-core";

// --- Profiles ---
export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at").defaultNow(),
});

// --- Categories ---
export const categories = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    color: text("color"),
    createdAt: timestamp("created_at").defaultNow(),
});

// --- Expenses ---
export const expenses = pgTable("expenses", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => profiles.id),
    amount: numeric("amount").notNull(),
    categoryId: uuid("category_id").references(() => categories.id),
    description: text("description"),
    date: date("date").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
});

// --- Budgets ---
export const budgets = pgTable("budgets", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => profiles.id),
    month: text("month").notNull(),
    total: numeric("total").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
