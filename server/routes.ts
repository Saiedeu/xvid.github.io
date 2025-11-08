import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { videoExtractionSchema, insertDownloadSchema } from "@shared/schema";
import { z } from "zod";
import axios from "axios";

const TWITTER_API_URL = process.env.TWITTER_API_URL || "http://minang-demo.rf.gd/api/xapi.php";
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;

if (!TWITTER_API_KEY) {
  console.error("WARNING: TWITTER_API_KEY environment variable is not set");
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Extract video from Twitter/X URL
  app.post("/api/extract-video", async (req, res) => {
    try {
      const { url } = videoExtractionSchema.parse(req.body);

      // Call external Twitter video API
      const apiUrl = `${TWITTER_API_URL}?url=${encodeURIComponent(url)}&api_key=${TWITTER_API_KEY}`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 30000,
      });

      if (response.data.status === 'error') {
        return res.status(400).json({
          error: response.data.message || 'Failed to extract video',
        });
      }

      // Return the video data
      res.json({
        status: 'success',
        tweetId: response.data.tweet_id,
        tweetUrl: response.data.tweet_url,
        videoUrls: response.data.video_urls || [],
        highestQuality: response.data.highest_quality,
        thumbnail: response.data.thumbnail,
        totalVariants: response.data.total_variants || 0,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Invalid URL format',
          details: error.errors,
        });
      }

      if (axios.isAxiosError(error)) {
        console.error('Twitter API error:', error.message);
        return res.status(502).json({
          error: 'Failed to fetch video from Twitter API',
          message: error.response?.data?.message || error.message,
        });
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Video extraction error:', errorMessage);
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  });

  // Track download analytics
  app.post("/api/track-download", async (req, res) => {
    try {
      const downloadData = insertDownloadSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'] || 'Unknown',
        ipAddress: req.ip || req.headers['x-forwarded-for'] || 'Unknown',
      });

      const download = await storage.createDownload(downloadData);

      res.json({
        status: 'success',
        downloadId: download.id,
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Invalid download data',
          details: error.errors,
        });
      }

      console.error('Download tracking error:', error);
      res.status(500).json({
        error: 'Failed to track download',
      });
    }
  });

  // Get download statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getDownloadStats();
      res.json(stats);
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({
        error: 'Failed to fetch statistics',
      });
    }
  });

  // Get recent downloads
  app.get("/api/recent-downloads", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const downloads = await storage.getRecentDownloads(limit);
      
      res.json({
        downloads: downloads.map(d => ({
          id: d.id,
          tweetId: d.tweetId,
          quality: d.quality,
          downloadedAt: d.downloadedAt,
        })),
      });
    } catch (error) {
      console.error('Recent downloads error:', error);
      res.status(500).json({
        error: 'Failed to fetch recent downloads',
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
