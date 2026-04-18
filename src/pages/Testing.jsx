import React, { useMemo, useState } from "react";
import { MapPin, Store, ChevronRight } from "lucide-react";

const outlets = [
  {
    id: 1,
    name: "Outlet 1",
    address: "221B Baker Street, London, UK",
    lat: 51.523767,
    lng: -0.1585557,
  },
  {
    id: 2,
    name: "Outlet 2",
    address: "Covent Garden, London, UK",
    lat: 51.5117,
    lng: -0.124,
  },
  {
    id: 3,
    name: "Outlet 3",
    address: "Somerset House, London, UK",
    lat: 51.5094,
    lng: -0.1165,
  },
];

export default function OutletLocation() {
  const [selectedOutlet, setSelectedOutlet] = useState(outlets[0]);
  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  const mapSrc = useMemo(() => {
    if (!GOOGLE_MAP_API_KEY) return "";

    return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${selectedOutlet.lat},${selectedOutlet.lng}&zoom=15`;
  }, [selectedOutlet, GOOGLE_MAP_API_KEY]);

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white">
      <div className="space-y-8">
        {/* Address Section */}
        <div className="pt-40">
          <h2 className="text-3xl font-semibold text-primary mb-5">
            Address:
          </h2>
          <div className="space-y-5">
            {outlets.map((outlet) => {
              const isActive = selectedOutlet.id === outlet.id;
              return (
                <button
                  key={outlet.id}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={`w-full flex items-center justify-between rounded-2xl px-5 py-5 text-left transition-all duration-200 border
                    ${isActive
                      ? "bg-cyan-50 border-cyan-400 shadow-sm"
                      : "bg-slate-100 border-transparent hover:bg-slate-200"
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Store className="w-6 h-6 text-primary shrink-0" />
                    <p className="text-xl text-gray-500 truncate">
                      <span className="text-primary font-medium">
                        {outlet.name}:
                      </span>{" "}
                      {outlet.address}
                    </p>
                  </div>

                  <ChevronRight className="w-6 h-6 text-gray-500 shrink-0 ml-3" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h2 className="text-3xl font-semibold text-primary mb-5">
            Location:
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-md border border-gray-200">
            {GOOGLE_MAP_API_KEY ? (
              <iframe
                title={selectedOutlet.name}
                src={mapSrc}
                width="100%"
                height="320"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80"
              />
            ) : (
              <div className="h-80 flex items-center justify-center text-red-500">
                Google Map API key missing
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-base">
              <span className="font-semibold text-primary">
                {selectedOutlet.name}
              </span>{" "}
              — {selectedOutlet.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}