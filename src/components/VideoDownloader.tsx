import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SiX } from "react-icons/si";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface VideoDownloaderProps {
  onVideoExtracted?: (data: any) => void;
}

interface VideoExtractionResponse {
  status: string;
  tweetId: string;
  tweetUrl: string;
  videoUrls: string[];
  highestQuality: string;
  thumbnail: string;
  totalVariants: number;
}

export default function VideoDownloader({ onVideoExtracted }: VideoDownloaderProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const extractVideoMutation = useMutation({
    mutationFn: async (videoUrl: string) => {
      const response = await apiRequest("POST", "/api/extract-video", { url: videoUrl });
      return await response.json() as VideoExtractionResponse;
    },
    onSuccess: (data) => {
      if (onVideoExtracted) {
        onVideoExtracted(data);
      }
      
      toast({
        title: "Success!",
        description: "Video found and ready to download",
      });

      // Track with Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'video_extracted', {
          event_category: 'engagement',
          event_label: 'video_found',
          tweet_id: data.tweetId,
        });
      }
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Failed to extract video";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      // Track error with Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'video_extraction_error', {
          event_category: 'error',
          event_label: errorMessage,
        });
      }
    },
  });

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please paste a valid X/Twitter video URL",
        variant: "destructive",
      });
      return;
    }

    const twitterUrlPattern = /(?:twitter\.com|x\.com)\/.*\/status\/\d+/i;
    if (!twitterUrlPattern.test(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid X/Twitter video URL",
        variant: "destructive",
      });
      return;
    }

    extractVideoMutation.mutate(url);
  };

  const handleClear = () => {
    setUrl("");
  };

  return (
    <Card className="p-6 md:p-8 w-full max-w-3xl mx-auto" data-testid="card-downloader">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SiX className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Paste X/Twitter video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            className="pl-12 pr-10 h-14 text-base font-mono"
            data-testid="input-url"
            disabled={extractVideoMutation.isPending}
          />
          {url && !extractVideoMutation.isPending && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Button
          onClick={handleDownload}
          disabled={extractVideoMutation.isPending || !url}
          className="w-full h-12 text-base font-medium"
          data-testid="button-download"
        >
          {extractVideoMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Fetching Video...
            </>
          ) : (
            "Get Video"
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Support for X.com and Twitter.com URLs
        </p>
      </div>
    </Card>
  );
}
