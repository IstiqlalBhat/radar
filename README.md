# Radar

**Radar** is a hyper-local, anonymous social network built for campuses and communities. It allows users to discover and interact with "Bubbles"—geofenced communities where content is only accessible when you are physically nearby.

![Design System](https://img.shields.io/badge/Design-Minimalist_Neobrutalism-000000?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_Native_|_Expo-blue?style=for-the-badge&logo=react)

## 🎨 Design System: Minimalist Neobrutalism

Radar features a distinct **Minimalist Neobrutalism** aesthetic, characterized by:

-   **High Contrast:** Stark "True Black" backgrounds with sharp white text.
-   **Solid Surfaces:** No glassmorphism. UI elements are solid, opaque blocks.
-   **Hard Shadows:** Sharp, unblurred shadows (`shadowRadius: 0`) for a raw, tactile feel.
-   **Vibrant Accents:** Strategic use of *Royal Blue*, *Hot Pink*, and *Violet* to drive engagement against the monochrome backing.
-   **Typography:** Bold, legible, and unpretentious font scaling.

## 🚀 Key Features

-   **Midnight Minimal Map:** A custom dark-mode map style emphasizing local hotspots.
-   **Bubbles:** Geofenced content zones (e.g., "Cooper Library", "Fike Rec Center").
-   **Trending Feed:** A collapsible bottom sheet revealing what's hot nearby.
-   **Anonymous Identity:** Users engage with generated handles and earn "Trust Scores".

## 🛠 Tech Stack

-   **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Managed Workflow)
-   **Language:** TypeScript
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
-   **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
-   **Navigation:** React Navigation v7
-   **Maps:** `react-native-maps` with Google Maps (iOS/Android)
-   **Validation:** Zod & React Hook Form

## 🏁 Getting Started

### Prerequisites

-   Node.js (>18.x)
-   Expo Go app on your physical device OR Android Emulator/iOS Simulator.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/IstiqlalBhat/radar.git
    cd radar
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npx expo start
    ```

4.  Scan the QR code with your phone (using Expo Go) or press `a` for Android Emulator / `i` for iOS Simulator.

## 📱 Google Maps Setup

To use the map features, ensure you have a valid Google Maps API Key in your `app.json`:

```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_API_KEY"
    }
  }
},
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_API_KEY"
  }
}
```

---

*Built with passion by the Radar Team.*
