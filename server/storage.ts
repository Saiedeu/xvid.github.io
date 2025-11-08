import { type User, type InsertUser, type Download, type InsertDownload } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Download analytics
  createDownload(download: InsertDownload): Promise<Download>;
  getDownloadStats(): Promise<{
    totalDownloads: number;
    downloadsToday: number;
    downloadsThisWeek: number;
    downloadsThisMonth: number;
  }>;
  getRecentDownloads(limit?: number): Promise<Download[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private downloads: Map<string, Download>;

  constructor() {
    this.users = new Map();
    this.downloads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const id = randomUUID();
    const download: Download = {
      id,
      tweetId: insertDownload.tweetId,
      tweetUrl: insertDownload.tweetUrl,
      quality: insertDownload.quality ?? null,
      userAgent: insertDownload.userAgent ?? null,
      ipAddress: insertDownload.ipAddress ?? null,
      downloadedAt: new Date(),
    };
    this.downloads.set(id, download);
    return download;
  }

  async getDownloadStats(): Promise<{
    totalDownloads: number;
    downloadsToday: number;
    downloadsThisWeek: number;
    downloadsThisMonth: number;
  }> {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const allDownloads = Array.from(this.downloads.values());

    return {
      totalDownloads: allDownloads.length,
      downloadsToday: allDownloads.filter(d => d.downloadedAt >= today).length,
      downloadsThisWeek: allDownloads.filter(d => d.downloadedAt >= weekAgo).length,
      downloadsThisMonth: allDownloads.filter(d => d.downloadedAt >= monthAgo).length,
    };
  }

  async getRecentDownloads(limit: number = 10): Promise<Download[]> {
    const allDownloads = Array.from(this.downloads.values());
    return allDownloads
      .sort((a, b) => b.downloadedAt.getTime() - a.downloadedAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
