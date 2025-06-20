import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { Video } from './types';
import { VideoPlayerStyleProps } from './VideoPlayer';

type VideoListProps = {
  videos: Video[];
  otherVideosHeading?: string;
  listPosition?: 'bottom' | 'left' | 'right';
  listContainerStyle?: React.CSSProperties;
  listItemStyle?: React.CSSProperties;
  videoPreviewStyle?: React.CSSProperties;
  textStyle?: {
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    tags?: React.CSSProperties;
  };
  playerStyleProps?: VideoPlayerStyleProps;
  layoutStyle?: React.CSSProperties;
playerContainerStyle?: React.CSSProperties;
videoListWrapperStyle?: React.CSSProperties;

};


const VideoList: React.FC<VideoListProps> = ({
  videos,
  otherVideosHeading,
  listPosition = 'bottom',
  listContainerStyle,
  listItemStyle,
  videoPreviewStyle,
  textStyle,
  playerStyleProps,
  layoutStyle,
  playerContainerStyle,
  videoListWrapperStyle
}) => {
  const [current, setCurrent] = useState<Video | null>(null);
  const [queue, setQueue] = useState<Video[]>([]);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (videos.length > 0) {
      setCurrent(videos[0]);
      setQueue(videos.slice(1));
    }
  }, [videos]);

  const goNext = () => {
    if (!current) return;

    setQueue(prev => {
      if (prev.length === 0) {
        if (!loop) return prev;
        const newCurrent = videos[0];
        const newQueue = videos.slice(1);
        setCurrent(newCurrent);
        return newQueue;
      } else {
        const [next, ...rest] = prev;
        setCurrent(next);
        return [...rest, current];
      }
    });
  };

  const goBack = () => {
    if (!current || queue.length === 0) return;
    setQueue(prev => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      setCurrent(last);
      return [current, ...rest];
    });
  };

  const onVideoClick = (video: Video) => {
    if (!current || video.id === current.id) return;
    setQueue(prev => [current, ...prev.filter(v => v.id !== video.id)]);
    setCurrent(video);
  };

  const allVideos = current ? [current, ...queue] : queue;

  if (!current) return <p>No videos available....</p>;

  const isHorizontal = listPosition === 'left' || listPosition === 'right';

  const defaultLayoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? (listPosition === 'left' ? 'row-reverse' : 'row') : 'column',
    gap: '20px',
    alignItems: isHorizontal ? 'flex-start' : 'center',
  };
  
  const defaultPlayerStyle: React.CSSProperties = {
    flex: isHorizontal ? 2 : 'none',
    width: isHorizontal ? '70%' : '60%',
  };
  
  const defaultListStyle: React.CSSProperties = {
    flex: isHorizontal ? 1 : 'none',
    width: isHorizontal ? '30%' : '60%',
  };
  

  return (
    <div style={{ ...defaultLayoutStyle, ...layoutStyle }}>
      <div style={{ ...defaultPlayerStyle, ...playerContainerStyle }}>
      <VideoPlayer {...current} onBack={goBack} onNext={goNext} styleProps={playerStyleProps} />

      </div>

      <div style={{ ...defaultListStyle, ...videoListWrapperStyle, ...listContainerStyle }}>

         <h3>{otherVideosHeading || "More Options"}</h3>

        {allVideos.map(video => (
          <div
            key={video.id}
            style={{
              ...{
                position: 'relative',
                cursor: 'pointer',
                border: video.id === current.id ? '2px solid green' : '2px solid #76222277',
                borderRadius: '8px',
                display: 'flex',
                justifyContent:"flex-start",
                gap: "5px",
                marginBottom: "10px",
                padding: "5px",
                opacity: video.id === current.id ? 0.6 : 1,
              },
              ...listItemStyle,
            }}
            onClick={() => onVideoClick(video)}
          >
            <div style={{ position: "relative" }}>
              <video
                src={video.src}
                width={150}
                height={100}
                style={{ borderRadius: 4, ...videoPreviewStyle }}
              />
              {video.id === current.id && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}>
                  Now Playing
                </div>
              )}
            </div>
            <div style={{ margin: "-13px 13px", height:"50px"}}>
              <h4 style={textStyle?.title}>{video.title}</h4>
              <p style={{ fontSize: "14px", ...textStyle?.description }}>{video.description}</p>
              <p style={{ fontSize: "12px", color: "#3e3c3c77", ...textStyle?.tags }}>
                #{video.tags?.join(' #')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
