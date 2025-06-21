# 🎥 react-video-manager

A customizable video player and list component for React JS applications. Built with flexibility and modern design in mind, this library allows you to manage a main video player and a list of related or upcoming videos with full control over layout and style.

---

## ✨ Features

- Main video player with:
  - Play, pause, mute, unmute
  - Loop toggle, playback rate control
  - Fullscreen and mini-player mode
  - Progress bar with seek
- Video list with preview thumbnails
- Dynamic selection and playback
- Fully customizable styles using props
- Tags, title, description support

---

## 📦 Installation

```bash
npm install react-video-manager
```

---
## 🚀 Usage

```
import React from 'react';
import { VideoList } from 'react-video-manager';

// Sample list of videos
const videos = [
  {
    id: '...',
    src: '...',
    title: '...',
    description: '...',
    tags: [...],
  },
  ...
];

const App = () => {
  return (
    <div >
      <VideoList
        // Required: Array of video objects (id, src, title, description, tags)
        videos={videos}

        // Optional: Text heading displayed above the video list
        otherVideosHeading="Related Videos"

        // Optional: Position of the video list ('left' | 'right' | 'bottom')
        listPosition="left"

        // Optional: Custom styles for video player UI
        playerStyleProps={{
          // Style for the video player container
          containerStyle: {},

          // Style for the video element itself
          videoStyle: {},

          // Style for playback control buttons (play, pause, etc.)
          buttonStyle: {},

          // Style for the container holding video controls
          controlsContainerStyle: { },

          // Style for the video title text
          titleStyle: {},

          // Style for video description text
          descriptionStyle: {},

          // Style for the tag text (e.g., #animation)
          tagsStyle: {},

          // Style for the progress bar track
          progressBarStyle: { },

          // Style for current time / duration text
          timeDisplayStyle: { },
        }}

        // Optional: Style for the entire video list container box
        listContainerStyle={{}}

        // Optional: Style for individual list items
        listItemStyle={{}}

        // Optional: Style for the video preview (thumbnail) in each list item
        videoPreviewStyle={{}}

        // Optional: Custom text styles used in the list (title, description, tags)
        textStyle={{}}

        // Optional: Layout styling for the wrapper (e.g., flex positioning)
        layoutStyle={{}}

        // Optional: Style for the top-level container around the video player
        playerContainerStyle={{}}

        // Optional: Style for the scrollable video list area (max height, scroll behavior)
        videoListWrapperStyle={{}}
      />
    </div>
  );
};

export default App;

```


## Components

<VideoList />

Displays a video player and a scrollable list of videos.

## 📋 Props for <VideoList />

| Prop                   | Type                            | Description                                 |
|------------------------|---------------------------------|---------------------------------------------|
| `videos`               | `VideoItem[]`                   | List of videos to display                   |
| `otherVideosHeading`   | `string`                        | Heading above the video list                |
| `listPosition`         | ` 'left' 'right'  'bottom' `   | Position of the video list                  |
| `playerStyleProps`     | `object`                        | Custom styles for the video player          |
| `listContainerStyle`   | `object`                        | Custom style for the video list container   |
| `listItemStyle`        | `object`                        | Style for each list item                    |
| `videoPreviewStyle`    | `object`                        | Style for the video preview in the list     |
| `textStyle`            | `object`                        | Text style overrides (title, tags, etc.)    |
| `layoutStyle`          | `object`                        | Layout style for player & list container    |
| `playerContainerStyle` | `object`                        | Style for the video player container        |
| `videoListWrapperStyle`| `object`                        | Style for the scrollable list area          |


## Styling Example
```
playerStyleProps={{
  containerStyle: { backgroundColor: '#f0f0f0' },
  titleStyle: { color: 'navy', fontWeight: 'bold' },
  controlsContainerStyle: { backgroundColor: '#fff' },
  videoStyle: { border: '2px solid navy' },
}}

```

## VideoItem Type
```
interface VideoItem {
  id: string;
  src: string;
  title: string;
  description?: string;
  tags?: string[];
}
```

## Notes

- This package is for React JS (Web) only.
- Supports fully dynamic
- Make sure video URLs are valid MP4 sources or HLS streams.

