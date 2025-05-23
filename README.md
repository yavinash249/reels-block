# Instagram Reels Blocker Extension

![Extension Icon](icons/icon-96.png)

📌 **A cross-browser extension to block Instagram Reels and boost productivity**  
🚀 Compatible with Chrome, Firefox, and Edge  

## Table of Contents
- [Features](#features)
- [Installation](#installation)
  - [Chrome](#chrome)
  - [Firefox](#firefox)
  - [Edge](#edge)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)


![Real Screenshot](/reels%20blocker.jpg)

## Features
✔ Blocks all Instagram Reels (/reel/ and /reels/ URLs)  
✔ Display message in Englis and Hindi क्युकी काम के टाइम पे अप्सरा मत देखना मैनेजर देख लेगा  
✔ Clean 3D-styled blocking page with back button  
✔ Lightweight (no background processes)  
✔ Works on Chrome, Firefox, and Microsoft Edge  

## Installation

### Chrome
1. Download the extension files
2. Go to `chrome://extensions`
3. Enable "Developer mode" (toggle top-right)
4. Click "Load unpacked" and select the extension folder

### Firefox
1. Download the extension files
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select `manifest.json` from the firefox folder

### Edge
1. Download the extension files
2. Go to `edge://extensions`
3. Enable "Developer mode" (toggle bottom-left)
4. Click "Load unpacked" and select the extension folder

## How It Works
The extension uses multiple techniques to block reels:

1. **URL Detection**  
   - Monitors for /reel/ or /reels/ in the URL path

2. **Instant Blocking**  
   ```javascript
   window.stop(); // Stops page loading immediately