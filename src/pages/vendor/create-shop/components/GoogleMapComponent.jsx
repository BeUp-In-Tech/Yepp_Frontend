import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

const GoogleMapComponent = ({ onMarkerSelect }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
    });
    const [marker, setMarker] = useState(null);
    const center = {
        lat: 23.8041,
        lng: 90.4152
    };
    const handleMapClick = (event) => {

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        setMarker({ lng, lat });

        if (onMarkerSelect) {
            onMarkerSelect([lng, lat]);
        }
    };

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                Loading Map...
            </div>
        );
    }
    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: "100%"
            }}
            center={center}
            zoom={10}
            onClick={handleMapClick}
            options={{
                mapTypeControl: false,
                draggable: true,
                gestureHandling: "greedy",
            }}
        >
            {marker && <Marker position={marker} />}
        </GoogleMap>
    );
};

export default GoogleMapComponent;