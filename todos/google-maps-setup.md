# Google Maps Setup Instructions

## Overview

The Explore page uses Google Maps with mock data for Clemson, SC. Since Google Maps requires native modules, it won't work in Expo Go - you need to create a development build.

## Mock Locations (Clemson University)

- Cooper Library
- Hendrix Student Center
- Memorial Stadium (Death Valley)
- Bowman Field
- Fike Recreation Center
- Tillman Hall
- Schilletter Dining Hall
- Lightsey Bridge Apartments

## Setup Steps

### 1. Get a Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the following APIs:
   - **Maps SDK for iOS**
   - **Maps SDK for Android**
4. Go to "Credentials" and create an API key
5. (Optional) Restrict the API key to your app's bundle ID for security

### 2. Add API Key to app.json

Open `app.json` and replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key in both places:

```json
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_ACTUAL_API_KEY_HERE"
  }
},
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_ACTUAL_API_KEY_HERE"
    }
  }
}
```

### 3. Create a Development Build

Google Maps requires native code, so you need to create a development build:

```bash
# Generate native projects
npx expo prebuild

# Run on iOS simulator
npx expo run:ios

# OR run on Android emulator/device
npx expo run:android
```

### 4. For Physical Devices

**iOS:**
- You need an Apple Developer account
- Configure signing in Xcode

**Android:**
- Enable USB debugging on your device
- Connect via USB and run `npx expo run:android`

## Troubleshooting

### Map shows blank/gray
- Verify your API key is correct
- Check that Maps SDK is enabled in Google Cloud Console
- Ensure API key restrictions allow your app's bundle ID

### Build errors
- Run `npx expo prebuild --clean` to regenerate native projects
- Delete `node_modules` and run `npm install`

### Location not showing
- Grant location permissions when prompted
- For iOS simulator: Features > Location > Custom Location
- For Android emulator: Extended controls > Location
