import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface VideoPreviewProps {
  thumbnail: string;
  videoUrls: string[];
  tweetId?: string;
  tweetUrl?: string;
}

interface VideoQuality {
  url: string;
  quality: string;
  size?: string;
}

export default function VideoPreview({ thumbnail, videoUrls, tweetId, tweetUrl }: VideoPreviewProps) {
  const { toast } = useToast();

  const trackDownloadMutation = useMutation({
    mutationFn: async (data: { tweetId: string; tweetUrl: string; quality?: string }) => {
      const response = await apiRequest("POST", "/api/track-download", data);
      return await response.json();
    },
  });

  const getVideoQualities = (): VideoQuality[] => {
    return videoUrls.map((url) => {
      // Extract quality from URL if possible
      let quality = "Unknown";
      let size = undefined;

      if (url.includes("1080")) {
        quality = "1080p";
        size = "~25 MB";
      } else if (url.includes("720")) {
        quality = "720p";
        size = "~15 MB";
      } else if (url.includes("480")) {
        quality = "480p";
        size = "~8 MB";
      } else if (url.includes("360")) {
        quality = "360p";
        size = "~5 MB";
      } else {
        // Try to determine from position (higher quality first)
        const index = videoUrls.indexOf(url);
        const qualities = ["1080p", "720p", "480p", "360p", "240p"];
        quality = qualities[index] || "Standard";
      }

      return { url, quality, size };
    });
  };

  const qualities = getVideoQualities();

  const handleDownload = (url: string, quality: string) => {
    console.log(`Downloading ${quality} video:`, url);
    
    // Track download
    if (tweetId && tweetUrl) {
      trackDownloadMutation.mutate({
        tweetId,
        tweetUrl,
        quality,
      });
    }

    // Track with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'video_download', {
        event_category: 'download',
        event_label: quality,
        tweet_id: tweetId,
      });
    }

    toast({
      title: "Download Started",
      description: `Downloading ${quality} video...`,
    });
    
    window.open(url, '_blank');
  };

  const handleShare = () => {
    const shareUrl = tweetUrl || `https://x.com/i/status/${tweetId}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Link Copied!",
      description: "Video link copied to clipboard",
    });

    // Track with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        event_category: 'engagement',
        event_label: 'link_copied',
      });
    }
  };

  return (
    <Card className="overflow-hidden w-full max-w-3xl mx-auto animate-fade-in" data-testid="card-preview">
      <div className="relative aspect-video bg-muted">
        <img
          src={thumbnail}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          data-testid="img-thumbnail"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ready
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Download Options</h3>
          <p className="text-sm text-muted-foreground">
            Choose your preferred quality
          </p>
        </div>

        <div className="grid gap-2">
          {qualities.map((video, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md border hover-elevate active-elevate-2"
              data-testid={`row-quality-${index}`}
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" data-testid={`badge-quality-${index}`}>
                  {video.quality}
                </Badge>
                {video.size && (
                  <span className="text-sm text-muted-foreground">
                    {video.size}
                  </span>
                )}
              </div>
              <Button
                onClick={() => handleDownload(video.url, video.quality)}
                size="sm"
                data-testid={`button-download-${index}`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleShare}
          data-testid="button-share"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Video Link
        </Button>
      </div>
    </Card>
  );
}
