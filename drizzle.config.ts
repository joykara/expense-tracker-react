import type { Config } from "drizzle-kit";

export default {
    schema: "./src/lib/db/schema.ts",
    out: './drizzle', // Output directory for migrations
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.VITE_SUPABASE_URL!,
    },
} satisfies Config;
