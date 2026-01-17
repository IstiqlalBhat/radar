// Native implementation - uses react-native-maps
import MapViewNative, {
    Marker as MarkerNative,
    PROVIDER_GOOGLE as PROVIDER_GOOGLE_NATIVE,
} from 'react-native-maps';
import type { Region as RegionType } from 'react-native-maps';

export default MapViewNative;
export const Marker = MarkerNative;
export const PROVIDER_GOOGLE = PROVIDER_GOOGLE_NATIVE;
export type Region = RegionType;
