import React, { useRef, useEffect, useState } from 'react';
import { useMovies } from '../context/MovieContext';

const VideoPlayer = () => {
  const { isPlayerOpen, setIsPlayerOpen, currentVideo } = useMovies();
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isPlayerOpen && videoRef.current) {
      videoRef.current.play().catch(()=>{});
    }
  }, [isPlayerOpen, currentVideo]);

  if (!isPlayerOpen || !currentVideo) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <button onClick={() => setIsPlayerOpen(false)} className="flex items-center gap-3 text-white hover:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="font-semibold">Back to Browse</span>
        </button>
        <h2 className="text-white font-bold hidden md:block">{currentVideo.title}</h2>
        <div className="flex gap-4">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </button>
          <button onClick={() => setIsPlayerOpen(false)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Video */}
      <div className="flex-1 flex items-center justify-center bg-black relative">
        <video
          ref={videoRef}
          src={currentVideo.videoUrl}
          controls
          autoPlay
          className="w-full h-full max-h-screen object-contain"
          poster={currentVideo.banner}
          onEnded={() => setIsPlayerOpen(false)}
        />
        
        {/* Custom overlay info bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <h3 className="text-white font-bold text-lg">{currentVideo.title}</h3>
          <p className="text-gray-300 text-sm">{currentVideo.year} • {currentVideo.ageRating} • {currentVideo.duration} • {currentVideo.category.join(', ')}</p>
        </div>
      </div>

      {/* Bottom Controls Extra */}
      <div className="p-4 bg-[#181818] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-semibold">{currentVideo.title}</span>
          <span className="text-gray-400 text-xs">{currentVideo.views?.toLocaleString()} views • {currentVideo.rating} ⭐</span>
        </div>
        <button onClick={toggleFullscreen} className="text-white px-3 py-1 border border-gray-600 rounded text-sm hover:border-white">
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
