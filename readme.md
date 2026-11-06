<p align="center">
  <img src="assets/images/logo.png" width="96" alt="Nyawit API Logo" />
</p>

<h1 align="center">Nyawit API</h1>

<p align="center">
  <strong>Fast, Local-First API IDE and Testing Environment</strong><br>
  Built for developers who value data privacy, Git collaboration, and raw performance.
</p>

<p align="center">
  <a href="license.md"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen.svg" alt="Platforms">
  <img src="https://img.shields.io/badge/Local--First-100%25-cyan.svg" alt="Local First">
  <img src="https://img.shields.io/badge/Git--Native-Enabled-orange.svg" alt="Git Native">
</p>

---

## Overview

**Nyawit API** is a modern, developer-centric API client and IDE designed to replace bloated cloud-based tools. 

Instead of storing your sensitive API requests, credentials, and test suites in a remote vendor database, Nyawit API saves your collections directly on your local filesystem using plain-text files.

### Why Nyawit API?

- **Local-First Architecture:** Your collections, environment variables, and request data reside securely on your disk. Nyawit API functions completely offline with zero telemetry tracking.
- **Visual Git Studio:** Built-in Git client to stage, unstage, view diffs, branch, commit, push, and pull changes directly within the IDE without external terminals.
- **Integrated Command Palette:** Navigate requests, execute actions, switch collections, and open settings instantly using `Ctrl+K` (or `Cmd+K`).
- **Seamless In-App Updater:** Direct background updates with live progress dialogs, download speeds, ETA, and Windows Authenticode bypass for open-source builds.
- **Fast & Snappy:** Built with Rsbuild and modern React for instant startup and rapid response rendering even with large collections.
- **Multi-Protocol Support:** Test REST, GraphQL, gRPC, and WebSocket APIs in one unified workspace.

---

## Core Capabilities

| Feature | Description |
| :--- | :--- |
| **Request Builder** | Comprehensive support for URL parameters, custom headers, body types (JSON, XML, Form-Data, Binary, Raw). |
| **Response Inspector** | Syntax-highlighted viewer with search, formatted JSON tree, response headers, status codes, and latency metrics. |
| **Nyawit Git Studio** | Dedicated in-app Git control panel for managing collection versioning, remote sync, commit histories, and conflicts. |
| **Command Palette** | Quick switcher (`Ctrl+K` / `Cmd+K`) across collections, folders, requests, commands, and settings. |
| **Environment Management** | Multi-environment support with secret masking, inheritance, and dynamic variable interpolation. |
| **Automated Testing** | Write pre-request scripts and assertions with a built-in test runner using familiar JavaScript syntax. |
| **Collection Runner** | Run batches of requests sequentially with configurable iterations and detailed reporting. |
| **Design System** | Tailored dark and light themes featuring high-contrast Cyber-Cyan and Ocean-Teal palettes. |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1+ recommended) or [Node.js](https://nodejs.org/) (v20+ LTS)
- [Git](https://git-scm.com/)

### Installation from Source

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nyawit-dev/nyawit-api.git
   cd nyawit-api
   ```

2. **Install dependencies:**
   ```bash
   bun run setup
   ```

3. **Start the development application:**
   - **Desktop (Electron):**
     ```bash
     bun run dev
     ```
   - **Desktop with Main Process Watcher:**
     ```bash
     bun run dev:watch
     ```
   - **Web Browser Interface:**
     ```bash
     bun run dev:web
     ```

---

## Building Desktop Packages

Nyawit API can be compiled into standalone native packages for Windows, macOS, and Linux:

```bash
# Production Web Build
bun run build:web

# Windows Installer (.exe)
bun run build:electron:win

# macOS Installer (.dmg / .pkg)
bun run build:electron:mac

# Linux Package (.AppImage / .deb)
bun run build:electron:linux
```

Packaged installers and artifacts will be generated inside the `packages/bruno-electron/out` directory.

---

## Project Structure

```text
├── assets/                  # Application icons, branding, and imagery
├── packages/
│   ├── bruno-app/           # Core React frontend interface and IDE panels
│   ├── bruno-electron/      # Electron main process, window management, and native shell
│   ├── bruno-common/        # Shared utility functions and common data structures
│   ├── bruno-filestore/     # Local disk storage and collection persistence engine
│   ├── bruno-requests/      # Network dispatchers (HTTP, HTTPS, gRPC, WS)
│   ├── bruno-schema/        # Validation schemas for requests and environments
│   ├── bruno-io/            # Collection disk serialization and output
│   ├── bruno-sqlite/        # Persistent high-performance collection cache
│   └── bruno-lang/          # Language parsers and serializers
└── DESIGN.md                # Design system specification and token guidelines
```

---

## License & Attribution

**Nyawit API** is distributed under the [MIT License](license.md).

This project is built upon the open-source foundation of Bruno, created by Anoop M D and contributors under the MIT License. We gratefully acknowledge the original authors and the open-source community for pioneering local-first API tooling.
