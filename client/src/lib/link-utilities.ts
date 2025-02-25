export function getYoutubePreviewImg(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    let videoId = null;

    // For shortened URLs (e.g., https://youtu.be/VIDEO_ID)
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1); // Removes the leading '/'
    }

    // For standard YouTube URLs (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    }

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  } catch (error) {
    return null;
  }
}
