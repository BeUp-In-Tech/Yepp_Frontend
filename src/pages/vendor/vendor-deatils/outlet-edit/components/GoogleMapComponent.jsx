import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 23.8103,
    lng: 90.4125,
};

const GoogleMapComponent = ({ selectedLocation, onMarkerSelect }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        libraries: ["maps"],
    });

    const center = selectedLocation || defaultCenter;

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        onMarkerSelect({ lat, lng });
    };

    if (!isLoaded) {
        return <div className="w-full h-full flex items-center justify-center">Loading Map...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={selectedLocation ? 15 : 12}
            onClick={handleMapClick}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                draggable: true,
                gestureHandling: "greedy",
            }}
        >
            {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
    );
};

export default GoogleMapComponent;