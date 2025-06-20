import React from 'react';
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
declare const VideoList: React.FC<VideoListProps>;
export default VideoList;
