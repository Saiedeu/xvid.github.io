import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Download analytics tracking
export const downloads = pgTable("downloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tweetId: text("tweet_id").notNull(),
  tweetUrl: text("tweet_url").notNull(),
  quality: text("quality"),
  downloadedAt: timestamp("downloaded_at").notNull().defaultNow(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export const insertDownloadSchema = createInsertSchema(downloads).omit({
  id: true,
  downloadedAt: true,
});

export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Download = typeof downloads.$inferSelect;

// Video extraction request schema
export const videoExtractionSchema = z.object({
  url: z.string().url().refine(
    (url) => /(?:twitter\.com|x\.com)\/.*\/status\/\d+/i.test(url),
    { message: "Must be a valid X/Twitter status URL" }
  ),
});

export type VideoExtractionRequest = z.infer<typeof videoExtractionSchema>;
