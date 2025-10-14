import { pgTable as table, uuid, text, numeric, timestamp, date } from "drizzle-orm/pg-core";

// --- Profiles ---
export const profiles = table("profiles", {
    id: uuid("id").primaryKey(),
    full_name: text("full_name"),
    avatar_nrl: text("avatar_url"),
    created_at: timestamp("created_at").defaultNow(),
});

// --- Categories ---
export const categories = table("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    color: text("color"),
    created_at: timestamp("created_at").defaultNow(),
});

// --- Expenses ---
export const expenses = table("expenses", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => profiles.id),
    amount: numeric("amount").notNull(),
    category_id: uuid("category_id").references(() => categories.id),
    description: text("description"),
    date: date("date").defaultNow(),
    created_at: timestamp("created_at").defaultNow(),
});

// --- Budgets ---
export const budgets = table("budgets", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => profiles.id),
    month: text("month").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).$type<number>().notNull(),
    created_at: timestamp("created_at").defaultNow(),
});
