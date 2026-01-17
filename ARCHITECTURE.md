# 📡 RADAR - Architecture Documentation

> **Hyper-local anonymous bubbles that show what's ACTUALLY happening right now**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)
![Architecture](https://img.shields.io/badge/architecture-modular-green)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Project Structure](#project-structure)
4. [Core Modules](#core-modules)
5. [Security Architecture](#security-architecture)
6. [Scalability Design](#scalability-design)
7. [Technology Stack](#technology-stack)
8. [Data Flow](#data-flow)
9. [API Design](#api-design)
10. [Changelog](#changelog)

---

## Overview

### App Concept
Radar is a hyper-local anonymous social platform that divides physical spaces (campuses) into **micro-bubbles** (50-100ft radius). Users can only view and post content when physically present within a bubble. All content is anonymous and expires after 24 hours.

### Key Features
- 🎯 **Hyper-local bubbles** - 50-100ft radius zones
- 👤 **True anonymity** - No user identity exposed
- ⏰ **Ephemeral content** - 24-hour auto-expiry
- 📍 **Physical presence required** - Geofenced access
- ⚡ **Real-time updates** - Live feed via WebSocket

### Core Differentiators
| Feature | Radar | Yik Yak | Snap Map |
|---------|-------|---------|----------|
| Location Specificity | Micro (50-100ft) | Campus-wide | User locations |
| Anonymity | Full | Partial | None |
| Content Type | Text + Intel | Text | Visual |
| Physical Presence | Required | Not required | Passive |

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    React Native Application                              ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       ││
│  │  │   Auth   │ │ Location │ │   Feed   │ │   Map    │ │ Settings │       ││
│  │  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  Module  │       ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘       ││
│  │                              ▼                                           ││
│  │  ┌─────────────────────────────────────────────────────────────────────┐││
│  │  │                     CORE SERVICES LAYER                              │││
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │││
│  │  │  │ API Service │ │  Location   │ │  WebSocket  │ │   Storage   │    │││
│  │  │  │             │ │   Service   │ │   Service   │ │   Service   │    │││
│  │  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │││
│  │  └─────────────────────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API GATEWAY                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ Rate Limit  │ │    Auth     │ │  Location   │ │   Request   │           │
│  │  Middleware │ │  Middleware │ │ Validation  │ │   Logging   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            BACKEND SERVICES                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │    Auth      │ │   Bubble     │ │    Post      │ │ Notification │       │
│  │   Service    │ │   Service    │ │   Service    │ │   Service    │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                        │
│  │  Moderation  │ │  Analytics   │ │   Cleanup    │                        │
│  │   Service    │ │   Service    │ │   Service    │                        │
│  └──────────────┘ └──────────────┘ └──────────────┘                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  PostgreSQL  │ │    Redis     │ │ Elasticsearch │ │     S3      │       │
│  │  (Primary)   │ │   (Cache)    │ │   (Search)   │ │  (Media)    │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
radar/
├── 📁 src/
│   ├── 📁 app/                      # App entry & configuration
│   │   ├── App.tsx                  # Root component
│   │   ├── navigation/              # Navigation configuration
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── TabNavigator.tsx
│   │   │   └── types.ts
│   │   └── providers/               # Context providers
│   │       ├── AppProviders.tsx
│   │       └── ThemeProvider.tsx
│   │
│   ├── 📁 modules/                  # Feature modules (domain-driven)
│   │   ├── 📁 auth/                 # Authentication module
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── screens/
│   │   │   ├── services/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 bubble/               # Bubble/Location module
│   │   │   ├── components/
│   │   │   │   ├── BubbleCard.tsx
│   │   │   │   ├── BubbleMap.tsx
│   │   │   │   └── BubbleList.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useBubbleDetection.ts
│   │   │   │   ├── useCurrentBubble.ts
│   │   │   │   └── useNearbyBubbles.ts
│   │   │   ├── screens/
│   │   │   │   ├── BubbleMapScreen.tsx
│   │   │   │   └── BubbleDetailScreen.tsx
│   │   │   ├── services/
│   │   │   │   ├── bubbleService.ts
│   │   │   │   └── geofenceService.ts
│   │   │   ├── store/
│   │   │   │   └── bubbleStore.ts
│   │   │   ├── types/
│   │   │   │   └── bubble.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 feed/                 # Feed/Posts module
│   │   │   ├── components/
│   │   │   │   ├── PostCard.tsx
│   │   │   │   ├── PostList.tsx
│   │   │   │   ├── CreatePostModal.tsx
│   │   │   │   └── VoteButtons.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useFeed.ts
│   │   │   │   ├── useCreatePost.ts
│   │   │   │   └── useVote.ts
│   │   │   ├── screens/
│   │   │   │   └── FeedScreen.tsx
│   │   │   ├── services/
│   │   │   │   └── postService.ts
│   │   │   ├── store/
│   │   │   │   └── feedStore.ts
│   │   │   ├── types/
│   │   │   │   └── post.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 notifications/        # Push notifications module
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   │
│   │   └── 📁 settings/             # User settings module
│   │       ├── screens/
│   │       ├── components/
│   │       └── index.ts
│   │
│   ├── 📁 core/                     # Core/shared infrastructure
│   │   ├── 📁 api/                  # API client & interceptors
│   │   │   ├── client.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── authInterceptor.ts
│   │   │   │   ├── errorInterceptor.ts
│   │   │   │   └── locationInterceptor.ts
│   │   │   └── endpoints.ts
│   │   │
│   │   ├── 📁 location/             # Location services
│   │   │   ├── locationService.ts
│   │   │   ├── geofenceManager.ts
│   │   │   ├── locationVerifier.ts  # Anti-spoofing
│   │   │   └── types.ts
│   │   │
│   │   ├── 📁 websocket/            # Real-time connection
│   │   │   ├── wsClient.ts
│   │   │   ├── wsManager.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── 📁 storage/              # Secure storage
│   │   │   ├── secureStorage.ts
│   │   │   ├── asyncStorage.ts
│   │   │   └── mmkv.ts
│   │   │
│   │   ├── 📁 security/             # Security utilities
│   │   │   ├── encryption.ts
│   │   │   ├── deviceFingerprint.ts
│   │   │   ├── jailbreakDetection.ts
│   │   │   └── certificatePinning.ts
│   │   │
│   │   └── 📁 analytics/            # Analytics & logging
│   │       ├── analyticsService.ts
│   │       └── crashReporting.ts
│   │
│   ├── 📁 shared/                   # Shared UI & utilities
│   │   ├── 📁 components/           # Reusable UI components
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Loading/
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 hooks/                # Shared hooks
│   │   │   ├── useDebounce.ts
│   │   │   ├── useInterval.ts
│   │   │   └── useNetworkStatus.ts
│   │   │
│   │   ├── 📁 utils/                # Utility functions
│   │   │   ├── dateUtils.ts
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── geoUtils.ts
│   │   │
│   │   ├── 📁 constants/            # App constants
│   │   │   ├── config.ts
│   │   │   ├── theme.ts
│   │   │   └── bubbleConfig.ts
│   │   │
│   │   └── 📁 types/                # Global type definitions
│   │       ├── global.d.ts
│   │       ├── navigation.types.ts
│   │       └── api.types.ts
│   │
│   └── 📁 assets/                   # Static assets
│       ├── images/
│       ├── fonts/
│       └── animations/
│
├── 📁 __tests__/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── 📁 scripts/                      # Build & utility scripts
├── 📁 docs/                         # Additional documentation
├── .env.example                     # Environment template
├── app.json                         # Expo configuration
├── babel.config.js
├── tsconfig.json
├── package.json
└── ARCHITECTURE.md                  # This file
```

---

## Core Modules

### 1. Authentication Module (`/modules/auth`)

**Purpose:** Handle anonymous device-based authentication

```typescript
// Types
interface AnonymousUser {
  deviceId: string;           // Hashed device identifier
  sessionToken: string;       // JWT token
  createdAt: Date;
  lastActive: Date;
  trustScore: number;         // Anti-abuse score (0-100)
}

// Key Components
- AnonymousAuthService     // Handles device registration
- TokenManager             // JWT token lifecycle
- DeviceIdentifier         // Generate unique device hash
- SessionValidator         // Validate active sessions
```

**Flow:**
1. App launch → Check for existing device token
2. No token → Generate device fingerprint → Register anonymously
3. Token exists → Validate → Refresh if needed
4. All API calls include token in header

---

### 2. Bubble Module (`/modules/bubble`)

**Purpose:** Manage location-based bubbles and geofencing

```typescript
// Types
interface Bubble {
  id: string;
  name: string;              // "Engineering Building - Floor 2"
  location: {
    latitude: number;
    longitude: number;
  };
  radius: number;            // 15-30 meters (50-100ft)
  type: BubbleType;          // 'classroom' | 'library' | 'dorm' | 'outdoor'
  activeUsers: number;       // Anonymous count
  postCount: number;         // Last 24h
  hotScore: number;          // Activity ranking
}

enum BubbleType {
  CLASSROOM = 'classroom',
  LIBRARY = 'library',
  DORM = 'dorm',
  DINING = 'dining',
  OUTDOOR = 'outdoor',
  RECREATION = 'recreation',
  PARKING = 'parking',
  OTHER = 'other'
}
```

**Key Algorithms:**

```typescript
// Bubble Detection - Haversine Formula
function isInsideBubble(
  userLat: number, 
  userLng: number, 
  bubble: Bubble
): boolean {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = userLat * Math.PI / 180;
  const φ2 = bubble.location.latitude * Math.PI / 180;
  const Δφ = (bubble.location.latitude - userLat) * Math.PI / 180;
  const Δλ = (bubble.location.longitude - userLng) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return distance <= bubble.radius;
}
```

---

### 3. Feed Module (`/modules/feed`)

**Purpose:** Handle posts, voting, and real-time feed updates

```typescript
// Types
interface Post {
  id: string;
  bubbleId: string;
  content: string;           // Max 280 chars
  createdAt: Date;
  expiresAt: Date;           // createdAt + 24 hours
  upvotes: number;
  downvotes: number;
  commentCount: number;
  isHot: boolean;            // Trending indicator
}

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  currentBubble: Bubble | null;
}
```

**Real-time Updates:**
```typescript
// WebSocket events
type FeedEvent = 
  | { type: 'NEW_POST'; post: Post }
  | { type: 'POST_UPDATED'; postId: string; updates: Partial<Post> }
  | { type: 'POST_DELETED'; postId: string }
  | { type: 'VOTE_UPDATE'; postId: string; upvotes: number; downvotes: number };
```

---

### 4. Location Services (`/core/location`)

**Purpose:** Manage device location with high accuracy and anti-spoofing

```typescript
interface LocationConfig {
  accuracy: 'HIGH' | 'BALANCED' | 'LOW';
  interval: number;          // Update interval in ms
  fastestInterval: number;   // Minimum interval
  distanceFilter: number;    // Minimum distance for update
}

// Anti-spoofing checks
interface LocationVerification {
  isMockLocation: boolean;
  isVPNActive: boolean;
  hasReasonableSpeed: boolean;  // Max 100 km/h
  isJailbroken: boolean;
  confidenceScore: number;      // 0-100
}
```

---

## Security Architecture

### 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ LAYER 1: DEVICE SECURITY                                    ││
│  │  • Jailbreak/Root Detection                                 ││
│  │  • App Integrity Verification                               ││
│  │  • Secure Enclave for Token Storage                         ││
│  │  • Certificate Pinning                                      ││
│  └─────────────────────────────────────────────────────────────┘│
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ LAYER 2: LOCATION SECURITY                                  ││
│  │  • Mock Location Detection                                  ││
│  │  • GPS Spoofing Prevention                                  ││
│  │  • Velocity Anomaly Detection                               ││
│  │  • Multi-source Location Validation                         ││
│  └─────────────────────────────────────────────────────────────┘│
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ LAYER 3: NETWORK SECURITY                                   ││
│  │  • TLS 1.3 Encryption                                       ││
│  │  • Certificate Pinning                                      ││
│  │  • Request Signing                                          ││
│  │  • VPN Detection                                            ││
│  └─────────────────────────────────────────────────────────────┘│
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ LAYER 4: APPLICATION SECURITY                               ││
│  │  • Rate Limiting (per device)                               ││
│  │  • Content Moderation (AI + Rules)                          ││
│  │  • Abuse Detection                                          ││
│  │  • Trust Scoring System                                     ││
│  └─────────────────────────────────────────────────────────────┘│
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ LAYER 5: DATA SECURITY                                      ││
│  │  • Anonymous Device IDs (no PII)                            ││
│  │  • Encryption at Rest (AES-256)                             ││
│  │  • Automatic Data Expiry (24h)                              ││
│  │  • No Location History Stored                               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Security Implementation Details

#### 1. Location Anti-Spoofing

```typescript
// /core/security/locationVerifier.ts
class LocationVerifier {
  async verify(location: GeoLocation): Promise<VerificationResult> {
    const checks = await Promise.all([
      this.checkMockLocation(location),
      this.checkVelocityAnomaly(location),
      this.checkLocationAccuracy(location),
      this.crossValidateWithNetwork(location),
      this.checkDeviceIntegrity(),
    ]);
    
    return {
      isValid: checks.every(c => c.passed),
      confidenceScore: this.calculateConfidence(checks),
      failedChecks: checks.filter(c => !c.passed),
    };
  }
  
  private async checkVelocityAnomaly(location: GeoLocation): Promise<Check> {
    const lastLocation = await this.getLastKnownLocation();
    if (!lastLocation) return { passed: true };
    
    const distance = calculateDistance(lastLocation, location);
    const timeDelta = location.timestamp - lastLocation.timestamp;
    const velocity = distance / (timeDelta / 1000); // m/s
    
    // Max realistic velocity: ~40 m/s (144 km/h)
    return {
      passed: velocity < 40,
      message: velocity >= 40 ? 'Suspicious velocity detected' : null,
    };
  }
}
```

#### 2. Anonymous Identity System

```typescript
// Anonymous device identification - NO PII stored
interface AnonymousIdentity {
  // Generated on first launch, stored in secure enclave
  deviceHash: string;        // SHA-256(deviceId + salt + installId)
  installId: string;         // Random UUID per installation
  trustScore: number;        // Reputation score
  
  // Never stored:
  // - Real name
  // - Email
  // - Phone number
  // - Social accounts
  // - Precise location history
}
```

#### 3. Content Security

```typescript
// Content moderation pipeline
const moderationPipeline = [
  // Stage 1: Pre-publish checks
  new ProfanityFilter(),          // Block explicit content
  new SpamDetector(),             // Detect spam patterns
  new ThreatDetector(),           // Detect threats/harassment
  
  // Stage 2: Post-publish monitoring
  new CommunityReporting(),       // User reports
  new AIContentReview(),          // ML-based review
  new VelocityMonitor(),          // Unusual activity detection
];
```

---

## Scalability Design

### Horizontal Scaling Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCALING ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  GEOGRAPHICAL DISTRIBUTION                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Region 1  │  │   Region 2  │  │   Region 3  │              │
│  │  (US East)  │  │  (US West)  │  │   (Europe)  │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    GLOBAL LOAD BALANCER                     ││
│  │                 (Cloudflare / AWS Global)                   ││
│  └─────────────────────────────────────────────────────────────┘│
│                          │                                       │
│  ┌───────────────────────┼───────────────────────┐              │
│  ▼                       ▼                       ▼               │
│  ┌──────────┐      ┌──────────┐           ┌──────────┐          │
│  │ Campus A │      │ Campus B │    ...    │ Campus N │          │
│  │ Cluster  │      │ Cluster  │           │ Cluster  │          │
│  └──────────┘      └──────────┘           └──────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Database Sharding Strategy

```typescript
// Shard by campus/region for optimal locality
const shardingStrategy = {
  shardKey: 'campusId',
  shardCount: 100,          // Initial shards
  replicationFactor: 3,     // 3 replicas per shard
  
  getShardId: (campusId: string) => {
    return hashCode(campusId) % SHARD_COUNT;
  }
};
```

### Caching Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                      CACHING LAYERS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  L1: CLIENT CACHE (React Query)                                  │
│  ├── Feed data: 30 seconds                                       │
│  ├── Bubble metadata: 5 minutes                                  │
│  └── User preferences: 1 hour                                    │
│                                                                  │
│  L2: EDGE CACHE (CDN)                                            │
│  ├── Static assets: 1 year                                       │
│  ├── Bubble definitions: 1 hour                                  │
│  └── Campus maps: 1 day                                          │
│                                                                  │
│  L3: APPLICATION CACHE (Redis)                                   │
│  ├── Active sessions: 24 hours                                   │
│  ├── Hot posts: 5 minutes                                        │
│  ├── Bubble activity counts: 1 minute                            │
│  └── Rate limit counters: sliding window                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| API Latency (p95) | < 100ms | Edge caching, regional deployment |
| Feed Load Time | < 500ms | Optimistic updates, prefetching |
| Location Update | < 1s | Background service, batching |
| WebSocket Latency | < 50ms | Regional WS servers |
| Post Creation | < 200ms | Async processing |

---

## Technology Stack

### Frontend (React Native)

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | React Native + Expo | Cross-platform mobile |
| Language | TypeScript | Type safety |
| State | Zustand | Lightweight state management |
| Data Fetching | TanStack Query | Server state + caching |
| Navigation | React Navigation 6 | Native navigation |
| Maps | react-native-maps | Bubble visualization |
| Location | expo-location | Geolocation services |
| Storage | MMKV + expo-secure-store | Fast + secure storage |
| Real-time | Socket.io-client | WebSocket connections |
| Forms | React Hook Form + Zod | Form handling + validation |

### Backend (Recommended)

| Category | Technology | Purpose |
|----------|-----------|---------|
| Runtime | Node.js / Golang | API servers |
| Framework | NestJS / Fiber | Structured backend |
| Database | PostgreSQL + PostGIS | Geo-spatial queries |
| Cache | Redis | Session + hot data |
| Search | Elasticsearch | Content search |
| Queue | Bull / RabbitMQ | Background jobs |
| Real-time | Socket.io / ws | WebSocket server |
| CDN | Cloudflare | Edge caching |
| Cloud | AWS / GCP | Infrastructure |

### DevOps & Monitoring

| Category | Technology | Purpose |
|----------|-----------|---------|
| CI/CD | GitHub Actions | Automated builds |
| Monitoring | Sentry | Error tracking |
| Analytics | Mixpanel | User analytics |
| APM | Datadog | Performance monitoring |
| Logging | Winston / Pino | Structured logs |

---

## Data Flow

### Post Creation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    POST CREATION FLOW                            │
└─────────────────────────────────────────────────────────────────┘

User writes post
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Validate     │────▶│ Verify       │────▶│ Content      │
│ Content      │     │ Location     │     │ Moderation   │
│ (length,etc) │     │ (in bubble)  │     │ (AI check)   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │ FAIL              │ FAIL              │ FLAGGED
       ▼                    ▼                    ▼
   Show Error          Show Error          Queue for
                                           Review
       │ PASS              │ PASS              │ PASS
       └────────────────────┴──────────────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │ Create Post  │
                   │ (DB + Cache) │
                   └──────────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │ Broadcast    │
                   │ via WebSocket│
                   └──────────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │ All users    │
                   │ in bubble    │
                   │ see new post │
                   └──────────────┘
```

### Real-time Feed Updates

```typescript
// WebSocket connection management
class FeedSocketManager {
  private socket: Socket;
  private currentBubbleId: string | null = null;

  async joinBubble(bubbleId: string) {
    // Leave previous bubble
    if (this.currentBubbleId) {
      this.socket.emit('leave_bubble', this.currentBubbleId);
    }
    
    // Join new bubble room
    this.socket.emit('join_bubble', bubbleId);
    this.currentBubbleId = bubbleId;
  }

  onNewPost(callback: (post: Post) => void) {
    this.socket.on('new_post', callback);
  }

  onPostUpdate(callback: (update: PostUpdate) => void) {
    this.socket.on('post_update', callback);
  }
}
```

---

## API Design

### RESTful Endpoints

```yaml
# Authentication
POST   /api/v1/auth/device          # Register anonymous device
POST   /api/v1/auth/refresh         # Refresh token
DELETE /api/v1/auth/device          # Delete device (GDPR)

# Bubbles
GET    /api/v1/bubbles              # List nearby bubbles
GET    /api/v1/bubbles/:id          # Get bubble details
GET    /api/v1/bubbles/:id/feed     # Get bubble feed
POST   /api/v1/bubbles/:id/enter    # Register presence
POST   /api/v1/bubbles/:id/exit     # Leave bubble

# Posts
POST   /api/v1/posts                # Create post (requires location)
GET    /api/v1/posts/:id            # Get post details
DELETE /api/v1/posts/:id            # Delete own post
POST   /api/v1/posts/:id/vote       # Upvote/downvote
POST   /api/v1/posts/:id/report     # Report post

# Comments
GET    /api/v1/posts/:id/comments   # List comments
POST   /api/v1/posts/:id/comments   # Add comment

# Settings
GET    /api/v1/settings             # Get user settings
PATCH  /api/v1/settings             # Update settings
```

### Request/Response Examples

```typescript
// Create Post
POST /api/v1/posts
Headers:
  Authorization: Bearer <device_token>
  X-Location: <encrypted_location>
  X-Device-Fingerprint: <fingerprint>

Body:
{
  "bubbleId": "bubble_abc123",
  "content": "Free pizza in the commons, hurry!",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "accuracy": 10,
    "timestamp": 1673892345678
  }
}

Response:
{
  "success": true,
  "data": {
    "id": "post_xyz789",
    "content": "Free pizza in the commons, hurry!",
    "bubbleId": "bubble_abc123",
    "createdAt": "2024-01-16T10:30:00Z",
    "expiresAt": "2024-01-17T10:30:00Z",
    "upvotes": 0,
    "downvotes": 0
  }
}
```

---

## Changelog

### Version 1.0.0 - Initial Architecture (2026-01-17)

#### Added
- ✅ Initial architecture document created
- ✅ Defined modular project structure
- ✅ Security architecture with 5-layer protection
- ✅ Scalability design with sharding strategy
- ✅ Technology stack selection
- ✅ API design specifications
- ✅ Core module definitions (Auth, Bubble, Feed, Location)
- ✅ Data flow diagrams
- ✅ Anti-spoofing algorithms

#### Pending
- ⏳ Backend service implementation details
- ⏳ Database schema definitions
- ⏳ WebSocket protocol specification
- ⏳ Push notification architecture
- ⏳ Admin dashboard design

---

> **Note:** This document will be updated with each major change to the codebase. Check the [Changelog](#changelog) section for the latest updates.
