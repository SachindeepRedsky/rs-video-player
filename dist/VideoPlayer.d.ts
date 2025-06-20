import React from 'react';
export type VideoPlayerStyleProps = {
    containerStyle?: React.CSSProperties;
    videoStyle?: React.CSSProperties;
    controlsContainerStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    progressBarStyle?: React.CSSProperties;
    timeDisplayStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    descriptionStyle?: React.CSSProperties;
    tagsStyle?: React.CSSProperties;
};
type VideoProps = {
    src: string;
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    width?: string;
    height?: string;
    title?: string;
    description?: string;
    tags?: string[];
    onBack?: () => void;
    onNext?: () => void;
    styleProps?: VideoPlayerStyleProps;
};
declare const VideoPlayer: React.FC<VideoProps>;
export default VideoPlayer;
