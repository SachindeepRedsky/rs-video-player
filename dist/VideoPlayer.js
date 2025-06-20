var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useRef, useState, useEffect } from 'react';
import img1 from '../src/assets/pause.jpeg';
import img2 from '../src/assets/play.jpg';
import img3 from '../src/assets/forward.png';
import img4 from '../src/assets/backward.png';
import img5 from '../src/assets/full.png';
import img6 from '../src/assets/speaker1.png';
import img7 from '../src/assets/mute.png';
import img8 from '../src/assets/loop2.png';
import img9 from '../src/assets/loop-stop.png';
import img10 from '../src/assets/close1.png';
import img11 from '../src/assets/pip.webp';
const formatTime = (time) => {
    if (isNaN(time))
        return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const minuteStr = (minutes < 10 ? '0' : '') + minutes;
    const secondStr = (seconds < 10 ? '0' : '') + seconds;
    return `${minuteStr}:${secondStr}`;
};
const btnStyle = {
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    outline: 'none',
    width: '40px',
    height: '30px',
    position: 'relative',
};
const VideoPlayer = ({ src, autoplay = true, loop: initial = false, controls = false, width = '100%', height = '360px', title, description, tags, onBack, onNext, styleProps = {}, }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isMuted, setIsMuted] = useState(autoplay);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [showSpeedOptions, setShowSpeedOptions] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoop, setIsLoop] = useState(initial);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiP, setIsPiP] = useState(false);
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        background: none;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -4px;
        transition: transform 0.2s ease;
      }      
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);
    const togglePiP = () => __awaiter(void 0, void 0, void 0, function* () {
        const video = videoRef.current;
        if (!video)
            return;
        try {
            if (document.pictureInPictureElement) {
                yield document.exitPictureInPicture();
                setIsPiP(false);
            }
            else if (document.pictureInPictureEnabled) {
                yield video.requestPictureInPicture();
                setIsPiP(true);
                setIsPlaying(!video.paused);
            }
        }
        catch (error) {
            console.error('Picture-in-Picture error:', error);
        }
    });
    useEffect(() => {
        const onLeavePiP = () => setIsPiP(false);
        document.addEventListener('leavepictureinpicture', onLeavePiP);
        return () => document.removeEventListener('leavepictureinpicture', onLeavePiP);
    }, []);
    useEffect(() => {
        const video = videoRef.current;
        if (!video)
            return;
        let frameId;
        const updateTime = () => {
            setCurrentTime(video.currentTime);
            frameId = requestAnimationFrame(updateTime);
        };
        frameId = requestAnimationFrame(updateTime);
        return () => cancelAnimationFrame(frameId);
    }, []);
    useEffect(() => {
        const video = videoRef.current;
        if (!video)
            return;
        const onLoadedMetadata = () => setDuration(video.duration);
        const onTimeUpdate = () => setCurrentTime(video.currentTime);
        const onVideoEnded = () => {
            const video = videoRef.current;
            if (!video)
                return;
            if (isPiP) {
                video.currentTime = 0;
                video.play().catch((err) => {
                    console.warn('Auto-replay failed in PiP:', err);
                });
                onNext === null || onNext === void 0 ? void 0 : onNext();
                return;
            }
            setIsPlaying(false);
            onNext === null || onNext === void 0 ? void 0 : onNext();
            setIsLoop(isLoop);
        };
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('ended', onVideoEnded);
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        if (autoplay) {
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
        else {
            setIsPlaying(false);
        }
        if (!video)
            return;
        const playNext = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                video.pause();
                video.src = src;
                yield video.load();
                yield video.play();
                setIsPlaying(true);
            }
            catch (err) {
                console.warn('Autoplay failed on source change:', err);
                setIsPlaying(false);
            }
        });
        playNext();
        return () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('ended', onVideoEnded);
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, [src]);
    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video)
            return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        }
        else {
            video.pause();
            setIsPlaying(false);
        }
    };
    const toggleMute = () => {
        const video = videoRef.current;
        if (!video)
            return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };
    const changePlaybackRate = (rate) => {
        const video = videoRef.current;
        if (!video)
            return;
        video.playbackRate = rate;
        setPlaybackRate(rate);
        setShowSpeedOptions(false);
    };
    const toggleFullscreen = () => {
        var _a, _b;
        const container = containerRef.current;
        if (!container)
            return;
        if (!document.fullscreenElement) {
            (_a = container.requestFullscreen) === null || _a === void 0 ? void 0 : _a.call(container);
        }
        else {
            (_b = document.exitFullscreen) === null || _b === void 0 ? void 0 : _b.call(document);
        }
    };
    const handleSeek = (e) => {
        const video = videoRef.current;
        const value = parseFloat(e.target.value);
        if (video) {
            video.currentTime = value;
            setCurrentTime(value);
        }
    };
    const toggleLoop = () => {
        setIsLoop((prev) => !prev);
    };
    return (React.createElement("div", { style: Object.assign({ border: '1px solid gray', borderRadius: '20px', padding: '20px', maxWidth: '100%', height: isFullscreen ? '100vh' : 'auto' }, styleProps.containerStyle) },
        React.createElement("div", { ref: containerRef, style: {
                width: isFullscreen ? '100vw' : width,
                height: isFullscreen ? '100vh' : height,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            } },
            React.createElement("video", { ref: videoRef, src: src, autoPlay: autoplay, muted: isMuted, loop: isLoop, controls: controls, style: Object.assign({ width: '100%', height: isFullscreen ? 'calc(100% - 140px)' : height, borderRadius: '10px', backgroundColor: '#000' }, styleProps.videoStyle) }),
            React.createElement("div", { style: Object.assign({ display: 'flex', flexDirection: "column", alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', marginTop: '10px', width: '100%' }, styleProps.controlsContainerStyle) },
                React.createElement("div", { style: { display: "flex", width: "90%", flexDirection: "row", justifyContent: "space-between" } },
                    React.createElement("div", null,
                        React.createElement("button", { onClick: toggleMute, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle) }, isMuted ? (React.createElement("img", { src: img7, width: '20px', height: '20px' })) : (React.createElement("img", { src: img6, width: '20px', height: '20px' })))),
                    React.createElement("div", { style: { marginLeft: "125px" } },
                        React.createElement("button", { onClick: onBack, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle) },
                            React.createElement("img", { src: img4, width: '20px', height: '20px' })),
                        React.createElement("button", { onClick: togglePlayPause, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle) }, isPlaying ? (React.createElement("img", { src: img1, width: '20px', height: '20px' })) : (React.createElement("img", { src: img2, width: '20px', height: '20px' }))),
                        React.createElement("button", { onClick: onNext, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle) },
                            React.createElement("img", { src: img3, width: '20px', height: '20px' }))),
                    React.createElement("div", null,
                        React.createElement("div", { style: { display: 'inline-block', position: 'relative' } },
                            React.createElement("button", { onClick: () => setShowSpeedOptions(!showSpeedOptions), style: Object.assign({ marginRight: "10px", borderRadius: "5px", padding: '6px 6px 2px 6px', fontSize: '16px', verticalAlign: "center" }, styleProps.buttonStyle) },
                                playbackRate,
                                "x"),
                            showSpeedOptions && (React.createElement("div", { style: {
                                    position: 'absolute',
                                    bottom: '40px',
                                    left: 0,
                                    background: '#f0f0f0',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    zIndex: 1,
                                } }, [0.5, 1.0, 2.0].map((rate) => (React.createElement("div", { key: rate, onClick: () => changePlaybackRate(rate), style: {
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                    background: playbackRate === rate ? '#ddd' : 'transparent',
                                } },
                                rate,
                                "x")))))),
                        React.createElement("button", { onClick: toggleLoop, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle) },
                            React.createElement("img", { src: isLoop ? img8 : img9, width: '20px', height: '20px' })),
                        React.createElement("button", { onClick: toggleFullscreen, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle) }, isFullscreen ? React.createElement("img", { src: img10, width: '20px', height: '20px' }) : React.createElement("img", { src: img5, width: '20px', height: '20px' })),
                        React.createElement("button", { onClick: togglePiP, style: Object.assign(Object.assign({}, btnStyle), styleProps.buttonStyle), title: "Picture in Picture" },
                            React.createElement("img", { src: img11, width: '20px', height: '20px' })))),
                React.createElement("input", { type: 'range', min: 0, max: duration, step: '0.1', value: currentTime, onChange: handleSeek, style: Object.assign({ width: '100%', height: '6px', borderRadius: '4px', background: `linear-gradient(to right, #1405b3 ${(currentTime / duration) * 100}%, #ddd ${(currentTime / duration) * 100}%)`, outline: 'none', appearance: 'none', WebkitAppearance: 'none', cursor: "pointer" }, styleProps.progressBarStyle) }),
                React.createElement("div", { style: { fontSize: '12px', whiteSpace: 'nowrap', color: "gray" } },
                    formatTime(currentTime),
                    " / ",
                    formatTime(duration)))),
        React.createElement("div", { style: { margin: '140px 0 0 20px' } },
            React.createElement("hr", null),
            title && React.createElement("h3", { style: Object.assign({ fontSize: '22px' }, styleProps.titleStyle) }, title),
            description && React.createElement("p", { style: Object.assign({ fontSize: '16px' }, styleProps.descriptionStyle) }, description),
            tags && (React.createElement("p", { style: Object.assign({ fontSize: '14px', color: '#464141' }, styleProps.tagsStyle) },
                React.createElement("strong", null, "Tags:"),
                " #",
                tags.join(' #'))))));
};
export default VideoPlayer;
