"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const videoReviews = [
  {
    name: "Alice Coelho",
    videoUrl: "https://www.youtube.com/shorts/0Fj0I6dI81c",
    role: "Artist"
  }
];

const getYouTubeSettings = (url: string) => {
  const videoId = url.includes("shorts/") 
    ? url.split("shorts/")[1]?.split(/[?#]/)[0] 
    : url.split("v=")[1]?.split(/[?#]/)[0];

  return {
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`,
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  };
};

export default function References() {
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  return (
    <section id="references" className="py-16 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="mb-10 md:mb-16"
        >
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary mb-3">
            References
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
            WHAT ARTISTS<br />
            <span className="text-muted-foreground text-white">SAY</span>
          </h2>
        </motion.div>

        <div className="flex justify-center md:justify-start">
          {videoReviews.map((video, i) => {
            const { embedUrl, thumbnail } = getYouTubeSettings(video.videoUrl);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[280px] aspect-[9/16] bg-black rounded-2xl overflow-hidden group border border-white/10 shadow-2xl"
              >
                {isPlaying === i ? (
                  <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full border-0 bg-black"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div 
                    className="w-full h-full cursor-pointer relative bg-black"
                    onClick={() => setIsPlaying(i)}
                  >
                    <img
                      src={thumbnail}
                      alt={video.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity scale-[1.35] origin-center"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = target.src.replace('maxresdefault', 'hqdefault');
                      }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-primary border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 pointer-events-none bg-gradient-to-t from-black to-transparent p-2 w-full">
                      <p className="text-white font-bold text-sm uppercase tracking-tighter">{video.name}</p>
                      <p className="text-zinc-400 text-[10px] uppercase tracking-widest">{video.role}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}