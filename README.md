# JSONL Viewer Chrome Extension

A Chrome extension that renders JSONL (JSON Lines) files with syntax highlighting and pretty print formatting.

## Features

- Pretty prints each JSON line with proper indentation
- Syntax highlighting with colors:
  - Keys: blue
  - Strings: orange
  - Numbers: green
  - Booleans/null: blue
- Dark theme for easy reading
- Line numbers for reference
- Error highlighting for invalid JSON lines

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this directory

## Usage

Navigate to any `.jsonl` file URL and the extension will automatically format it.

For local files:
1. Go to `chrome://extensions/`
2. Find "JSONL Viewer" and click "Details"
3. Enable "Allow access to file URLs"
4. Open a local `.jsonl` file with `file:///path/to/file.jsonl`
