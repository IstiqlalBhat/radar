# Radar

**Radar** is a hyper-local, anonymous social network built for campuses and communities. It allows users to discover and interact with "Bubbles"—geofenced communities where content is only accessible when you are physically nearby.

![Design System](https://img.shields.io/badge/Design-Neon_Noir_Cyber--Social-0AD9FF?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_Native_|_Expo-blue?style=for-the-badge&logo=react)

## 🎨 Design System: Neon Noir Cyber-Social

Radar features a distinctive **Neon Noir** aesthetic—a dark, immersive interface with electric accents and smooth animations:

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Electric Cyan | `#00D9FF` |
| Secondary | Hot Pink | `#FF3366` |
| Accent | Vivid Purple | `#A855F7` |
| Success | Neon Green | `#00FF88` |
| Background | Near Black | `#0A0A0F` |

### Visual Characteristics
- **Glow Shadows**: Soft, colored shadows that create depth and energy
- **Rounded Corners**: Fluid 12-24px border radii for a modern feel
- **Gradient Accents**: Cyan-to-purple gradients on buttons and FABs
- **Blur Backdrops**: Floating headers and sheets with glass effects
- **Smooth Animations**: Scale transforms and springy interactions

## 🚀 Key Features

- **Neon Noir Map**: Custom dark map style with subtle cyan water highlights
- **Bubbles**: Geofenced content zones with glowing circular markers
- **Live Feed**: Post cards with colored accent borders and pill-shaped interactions
- **Floating Tab Bar**: Pill-shaped navigation with glowing active indicators
- **Anonymous Identity**: Users engage with generated handles and earn "Trust Scores"

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: TypeScript
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Navigation**: React Navigation v7
- **Maps**: `react-native-maps` with Google Maps
- **Gradients**: `expo-linear-gradient`

## 🏁 Getting Started

### Prerequisites

- Node.js (>18.x)
- Expo Go app on your physical device OR Android Emulator/iOS Simulator

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/IstiqlalBhat/radar.git
    cd radar
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npx expo start
    ```

4. Scan the QR code with Expo Go or press `a` for Android / `i` for iOS Simulator.

## 📱 Google Maps Setup

To use map features, add your Google Maps API Key to `app.json`:

```json
"android": {
  "config": {
    "googleMaps": { "apiKey": "YOUR_API_KEY" }
  }
},
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_API_KEY"
  }
}
```

---

*Built with ⚡ by the Radar Team.*
