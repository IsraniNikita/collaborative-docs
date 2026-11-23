# Collaborative Docs — Simulated Collaborative Editing Workspace

A browser-based collaborative editing workspace that simulates real-time multi-user collaboration using browser tabs and native browser synchronization mechanisms.

Collaborative Docs demonstrates how collaborative systems work internally by combining:

* Cross-tab synchronization
* Shared document editing
* Active collaborator tracking
* Typing indicators
* Conflict-aware updates
* Presence management
* Performance optimization

This project was intentionally built without a backend to deeply understand frontend synchronization architecture and browser event-driven systems.

---

# Live Demo

👉 **[Launch Collaborative Docs](https://israninikita.github.io/collaborative-docs/)**
---

# Tech Stack

* React
* Vite
* Context API
* localStorage
* Browser Storage Events
* Modern React Hooks
* CSS

---

# Core Features

## Shared Collaborative Editor

* Shared document editing across browser tabs
* Real-time synchronization simulation
* Auto-save system
* Persistent workspace state

---

## Real-Time Synchronization

* Cross-tab synchronization using:

```js
window.addEventListener("storage")
```

* Debounced synchronization updates
* Conflict-aware document synchronization
* Timestamp-based conflict handling

---

## Presence System

* Active collaborator tracking
* Heartbeat-based user presence
* Stale session cleanup
* Join/leave detection

---

## Typing Indicators

* Real-time typing activity
* Inactivity timeout handling
* Cross-tab typing synchronization
* Ephemeral activity state management

---

## Performance Optimizations

* Debounced writes
* Render isolation
* Memoized components
* Stable synchronization listeners
* Reduced unnecessary rerenders

---

## UX Improvements

* Sync status indicators
* Responsive layout
* Accessibility improvements
* Auto-focus editor
* Professional UI structure

---

# Project Architecture

## High-Level Flow

```text
User Types
↓
Local React State Updates
↓
Debounced Sync Triggered
↓
Document Saved To localStorage
↓
Other Tabs Receive Storage Event
↓
Incoming Document Validated
↓
Latest State Applied
```

---

# Folder Structure

```bash
src/
│
├── features/
│   └── collaboration/
│       ├── components/
│       ├── constants/
│       ├── context/
│       ├── hooks/
│       ├── services/
│       ├── utils/
│       └── reducers/
│
├── App.jsx
├── main.jsx
└── global.css
```

---

# Architectural Decisions

## Why localStorage?

The project intentionally avoids a backend.

localStorage was chosen because:

* It provides persistence
* It works across browser tabs
* It supports browser-native synchronization using storage events
* It simplifies frontend-only collaboration simulation

---

## Why Storage Events?

Storage events allow browser tabs to communicate without:

* WebSockets
* Servers
* External services

This creates a lightweight real-time synchronization simulation entirely inside the browser.

---

## Why Context API?

Context API was chosen because:

* Project state complexity remains manageable
* Avoids unnecessary Redux setup
* Keeps architecture lightweight
* Good balance between simplicity and scalability

---

## Why Debounced Updates?

Without debouncing:

* Every keystroke triggers synchronization
* Excessive localStorage writes occur
* Performance degrades quickly

Debouncing reduces synchronization frequency while preserving responsiveness.

---

## Why Timestamp Conflict Resolution?

True collaborative merging requires:

* Operational Transforms (OT)
* CRDTs
* Backend coordination

Since this project is frontend-only, a simpler strategy was used:

```text
Last Write Wins
```

The newest document update replaces older updates.

This is a deliberate engineering tradeoff.

---

## Why Isolated Collaborator Keys?

Initial implementation used:

```js
collaborative_docs_collaborators = []
```

This caused race conditions because multiple tabs rewrote the same array simultaneously.

The architecture was refactored to:

```js
collaborative_docs_collaborator_<sessionId>
```

Benefits:

* Reduced synchronization conflicts
* Better ownership isolation
* Stable collaborator tracking
* Prevented flickering updates

On startup, data stored under the previous browser-storage namespace is migrated to the current keys so existing documents and session data are retained.

---

# Presence System Design

Each browser tab acts as an independent collaboration session.

Every session periodically updates:

```js
{
  id,
  username,
  lastSeen
}
```

Inactive sessions are automatically removed using:

* Heartbeat intervals
* Stale timeout cleanup

This simulates how real collaborative systems manage user presence.

---

# Typing Indicator System

Typing indicators are treated as:

```text
Ephemeral Distributed State
```

Characteristics:

* Short-lived
* High-frequency
* Non-persistent
* Activity-driven

The system uses:

* localStorage synchronization
* Inactivity timeouts
* Per-user typing ownership

---

# Sync Status System

The application provides visual synchronization feedback:

* 🟢 Synced
* 🟡 Saving...
* 🔵 Receiving Update...
* 🔴 Sync Failed

This improves:

* User trust
* Perceived responsiveness
* Collaboration clarity

---

# Performance Optimizations

## Render Isolation

UI sections were split into:

* Header
* Collaborator Sidebar
* Editor Panel
* Typing Indicator

This improves rerender control.

---

## Memoization

Used:

```js
React.memo
```

to reduce unnecessary rerenders.

---

## Stable Effect Management

Used:

```js
useRef
```

for:

* Stable listeners
* Timer persistence
* Avoiding stale closures

---

## Debounced Synchronization

Document writes are debounced to reduce:

* Excessive localStorage operations
* Synchronization overhead
* Render churn

---

# Accessibility Improvements

* Semantic labels
* Keyboard-friendly editor
* Focus visibility
* Responsive layout
* Readable typography

---

# Challenges Faced

## Race Conditions In Presence Tracking

Initial collaborator synchronization caused:

* Flickering users
* Lost updates
* Shared overwrite conflicts

Solved by:

* Isolated storage ownership
* Per-collaborator storage keys

---

## Typing State Cleanup

Typing indicators can become stale if:

* Tabs close unexpectedly
* Timers are not cleaned properly

Solved using:

* Timeout cleanup
* beforeunload handling
* Ephemeral state expiration

---

## Synchronization Stability

Storage listeners initially recreated too frequently.

Improved using:

* Stable refs
* Controlled effects
* Reduced subscription churn

---

# Future Improvements

If a backend were added, future improvements would include:

* WebSocket server
* Real multi-user collaboration
* CRDT or Operational Transform support
* Authentication
* Workspace rooms
* Version history
* Offline reconciliation
* Persistent database
* Cursor presence
* Rich text editing

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/IsraniNikita/collaborative-docs.git
cd collaborative-docs
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

# How To Test Collaboration

1. Open application in multiple browser tabs
2. Start typing in one tab
3. Observe:

* Real-time synchronization
* Collaborator tracking
* Typing indicators
* Sync status updates

---

# Key Engineering Concepts Demonstrated

* React Context Architecture
* Event-Driven Synchronization
* Cross-Tab Communication
* Distributed State Handling
* Presence Systems
* Ephemeral State Management
* Debouncing
* Memoization
* Conflict Resolution
* Render Optimization
* Synchronization Design
* Responsive Frontend Architecture

---

