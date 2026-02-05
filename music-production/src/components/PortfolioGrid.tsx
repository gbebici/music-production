import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
interface Track {
  title: string;
  url: string;
}
const tracks: Track[] = [{
  title: "Chorou Bebel - Ciumêra",
  url: "https://youtu.be/GK29oGc8ZvI?t=88"
}, {
  title: "Way To Say (By Chance) - Conchá",
  url: "https://youtu.be/PTRySsdSkGk?t=98"
}, {
  title: "Cornélios - Gastação Infinita",
  url: "https://youtu.be/-HipWqqIzb0?t=137"
}, {
  title: "O Segredo - VT (feat Bebici)",
  url: "https://youtu.be/6KXZnYL0tMY?t=42"
}, {
  title: "Tardes de Verão - Alice Coelho",
  url: "https://youtu.be/e4X9osVREG4?t=198"
}];

// Extract video ID from YouTube URL
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};
const getYouTubeEmbedUrl = (url: string) => {
  const videoId = getYouTubeVideoId(url);

  // Extract start time if present
  const timeMatch = url.match(/[?&]t=(\d+)/);
  const startTime = timeMatch ? timeMatch[1] : null;
  if (videoId) {
    let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&autoplay=1&enablejsapi=1`;
    if (startTime) {
      embedUrl += `&start=${startTime}`;
    }
    return embedUrl;
  }
  return url;
};
const getYouTubeThumbnail = (url: string) => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
};
const PortfolioCard = ({
  track,
  index
}: {
  track: Track;
  index: number;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(track.url);
  const thumbnailUrl = getYouTubeThumbnail(track.url);
  return <motion.div initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.6,
    delay: index * 0.08
  }} className="portfolio-card">
      <div className="video-container aspect-video relative group">
        {!isPlaying ? <div className="w-full h-full cursor-pointer relative overflow-hidden" onClick={() => setIsPlaying(true)}>
            {thumbnailUrl && <img src={thumbnailUrl} alt={track.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={e => {
          const target = e.target as HTMLImageElement;
          if (target.src.includes('maxresdefault')) {
            target.src = target.src.replace('maxresdefault', 'hqdefault');
          }
        }} />}
            <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
          </div> : <iframe src={embedUrl} title={track.title} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full border-0" />}
      </div>
      <div className="py-3 md:py-4">
        <h3 className="font-display text-base md:text-xl text-foreground font-extralight">
          {track.title}
        </h3>
      </div>
    </motion.div>;
};
const PortfolioGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 2;
  const visibleTracks = showAll ? tracks : tracks.slice(0, initialDisplayCount);

  return (
    <section id="work" className="py-16 md:py-32 px-4 sm:px-6 relative">
      {/* Background decorative text */}
      <div className="absolute top-20 left-0 overflow-hidden pointer-events-none select-none">
        <span className="font-display text-[30vw] font-extrabold text-foreground/[0.015] leading-none">
          WORK
        </span>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-10 md:mb-16"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary mb-3">
            Portfolio
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold">
            SELECTED<br />
            <span className="text-muted-foreground">WORKS</span>
          </h2>
        </motion.div>

        {/* Video Listing */}
        <div className="space-y-8 md:space-y-12">
          {visibleTracks.map((track, index) => (
            <PortfolioCard key={track.title} track={track} index={index} />
          ))}
        </div>

        {/* Expand button for more tracks */}
        {tracks.length > initialDisplayCount && (
  <div className="mt-16 flex justify-center">
    <button
      onClick={() => setShowAll(!showAll)}
      className="px-8 py-4 bg-transparent border border-white/20 hover:border-primary hover:text-primary transition-all duration-300 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 group"
    >
      <span>{showAll ? "Show Less" : "View Full Portfolio"}</span>
      <motion.span
        animate={{ rotate: showAll ? 180 : 0 }}
        className="text-lg"
      >
        ↓
      </motion.span>
    </button>
  </div>
)}
      </div>
    </section>
  );
};
export default PortfolioGrid;

