'use client';

import Image from "next/image";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function createMarkerIcon(active) {
  return L.divIcon({
    className: `se-leaflet-marker${active ? " is-active" : ""}`,
    html: '<img src="/images/super-emas-map-pin.svg" alt="" />',
    iconSize: [34, 46],
    iconAnchor: [17, 44],
  });
}

function MapFocus({ branch }) {
  const map = useMap();
  const initialBranch = useRef(branch?.slug);

  useEffect(() => {
    if (!branch || !Number.isFinite(branch.lat) || !Number.isFinite(branch.lng) || branch.slug === initialBranch.current) return;
    map.flyTo([branch.lat, branch.lng], 13, { duration: 1.1 });
    initialBranch.current = branch.slug;
  }, [branch, map]);

  return null;
}

function MapBounds({ branches }) {
  const map = useMap();

  useEffect(() => {
    const points = branches
      .filter((branch) => Number.isFinite(branch.lat) && Number.isFinite(branch.lng))
      .map((branch) => [branch.lat, branch.lng]);
    if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: 10, animate: false });
    } else if (points.length === 1) {
      map.setView(points[0], 13, { animate: false });
    }
    map.invalidateSize();
  }, [branches, map]);

  return null;
}

export default function LeafletBranchMap({ branches, selectedBranch, hoveredBranch, onSelect, onHover, overview = false }) {
  const availableBranches = branches.filter((branch) => Number.isFinite(branch.lat) && Number.isFinite(branch.lng));
  const center = availableBranches.length
    ? [
      availableBranches.reduce((sum, branch) => sum + branch.lat, 0) / availableBranches.length,
      availableBranches.reduce((sum, branch) => sum + branch.lng, 0) / availableBranches.length,
    ]
    : [-6.3, 106.8];
  const selectedCoordinates = selectedBranch && Number.isFinite(selectedBranch.lat) && Number.isFinite(selectedBranch.lng);

  return (
    <MapContainer className="se-leaflet-map" center={center} zoom={overview ? 10 : 13} scrollWheelZoom={false} zoomControl>
      <TileLayer
        attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {availableBranches.map((branch) => (
        <Marker
          key={branch.slug}
          position={[branch.lat, branch.lng]}
          icon={createMarkerIcon(selectedBranch?.slug === branch.slug || hoveredBranch?.slug === branch.slug)}
          title={branch.fullName}
          eventHandlers={{
            click: () => onSelect?.(branch),
            mouseover: () => onHover?.(branch),
            mouseout: () => onHover?.(null),
          }}
        >
          <Popup>
            <div className="se-leaflet-popup">
              {branch.photo && <Image src={branch.photo} width={68} height={58} alt={`Super Emas ${branch.name}`} />}
              <div><strong>{branch.fullName}</strong><p>{branch.address}</p><a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer">Buka di Google Maps</a><a href={branch.whatsapp} target="_blank" rel="noopener noreferrer">Hubungi via WhatsApp</a></div>
            </div>
          </Popup>
        </Marker>
      ))}
      {overview && <MapBounds branches={branches} />}
      <MapFocus branch={selectedCoordinates ? selectedBranch : null} />
    </MapContainer>
  );
}
