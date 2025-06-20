import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
const VideoList = ({ videos, otherVideosHeading, listPosition = 'bottom', listContainerStyle, listItemStyle, videoPreviewStyle, textStyle, playerStyleProps, layoutStyle, playerContainerStyle, videoListWrapperStyle }) => {
    const [current, setCurrent] = useState(null);
    const [queue, setQueue] = useState([]);
    const [loop, setLoop] = useState(false);
    useEffect(() => {
        if (videos.length > 0) {
            setCurrent(videos[0]);
            setQueue(videos.slice(1));
        }
    }, [videos]);
    const goNext = () => {
        if (!current)
            return;
        setQueue(prev => {
            if (prev.length === 0) {
                if (!loop)
                    return prev;
                const newCurrent = videos[0];
                const newQueue = videos.slice(1);
                setCurrent(newCurrent);
                return newQueue;
            }
            else {
                const [next, ...rest] = prev;
                setCurrent(next);
                return [...rest, current];
            }
        });
    };
    const goBack = () => {
        if (!current || queue.length === 0)
            return;
        setQueue(prev => {
            const last = prev[prev.length - 1];
            const rest = prev.slice(0, -1);
            setCurrent(last);
            return [current, ...rest];
        });
    };
    const onVideoClick = (video) => {
        if (!current || video.id === current.id)
            return;
        setQueue(prev => [current, ...prev.filter(v => v.id !== video.id)]);
        setCurrent(video);
    };
    const allVideos = current ? [current, ...queue] : queue;
    if (!current)
        return React.createElement("p", null, "No videos available....");
    const isHorizontal = listPosition === 'left' || listPosition === 'right';
    const defaultLayoutStyle = {
        display: 'flex',
        flexDirection: isHorizontal ? (listPosition === 'left' ? 'row-reverse' : 'row') : 'column',
        gap: '20px',
        alignItems: isHorizontal ? 'flex-start' : 'center',
    };
    const defaultPlayerStyle = {
        flex: isHorizontal ? 2 : 'none',
        width: isHorizontal ? '70%' : '60%',
    };
    const defaultListStyle = {
        flex: isHorizontal ? 1 : 'none',
        width: isHorizontal ? '30%' : '60%',
    };
    return (React.createElement("div", { style: Object.assign(Object.assign({}, defaultLayoutStyle), layoutStyle) },
        React.createElement("div", { style: Object.assign(Object.assign({}, defaultPlayerStyle), playerContainerStyle) },
            React.createElement(VideoPlayer, Object.assign({}, current, { onBack: goBack, onNext: goNext, styleProps: playerStyleProps }))),
        React.createElement("div", { style: Object.assign(Object.assign(Object.assign({}, defaultListStyle), videoListWrapperStyle), listContainerStyle) },
            React.createElement("h3", null, otherVideosHeading || "More Options"),
            allVideos.map(video => {
                var _a;
                return (React.createElement("div", { key: video.id, style: Object.assign({
                        position: 'relative',
                        cursor: 'pointer',
                        border: video.id === current.id ? '2px solid green' : '2px solid #76222277',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: "flex-start",
                        gap: "5px",
                        marginBottom: "10px",
                        padding: "5px",
                        opacity: video.id === current.id ? 0.6 : 1,
                    }, listItemStyle), onClick: () => onVideoClick(video) },
                    React.createElement("div", { style: { position: "relative" } },
                        React.createElement("video", { src: video.src, width: 150, height: 100, style: Object.assign({ borderRadius: 4 }, videoPreviewStyle) }),
                        video.id === current.id && (React.createElement("div", { style: {
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
                            } }, "Now Playing"))),
                    React.createElement("div", { style: { margin: "-13px 13px", height: "50px" } },
                        React.createElement("h4", { style: textStyle === null || textStyle === void 0 ? void 0 : textStyle.title }, video.title),
                        React.createElement("p", { style: Object.assign({ fontSize: "14px" }, textStyle === null || textStyle === void 0 ? void 0 : textStyle.description) }, video.description),
                        React.createElement("p", { style: Object.assign({ fontSize: "12px", color: "#3e3c3c77" }, textStyle === null || textStyle === void 0 ? void 0 : textStyle.tags) },
                            "#", (_a = video.tags) === null || _a === void 0 ? void 0 :
                            _a.join(' #')))));
            }))));
};
export default VideoList;
