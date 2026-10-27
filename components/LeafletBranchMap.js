'use client';

import Image from "next/image";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9k=";

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
    if (!branch?.coordinates || branch.slug === initialBranch.current) return;
    map.flyTo([branch.coordinates.lat, branch.coordinates.lng], 13, { duration: 1.1 });
    initialBranch.current = branch.slug;
  }, [branch, map]);

  return null;
}

function MapBounds({ branches }) {
  const map = useMap();

  useEffect(() => {
    const points = branches
      .filter((branch) => branch.coordinates)
      .map((branch) => [branch.coordinates.lat, branch.coordinates.lng]);
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
  const availableBranches = branches.filter((branch) => branch.coordinates);
  const center = availableBranches.length
    ? [
      availableBranches.reduce((sum, branch) => sum + branch.coordinates.lat, 0) / availableBranches.length,
      availableBranches.reduce((sum, branch) => sum + branch.coordinates.lng, 0) / availableBranches.length,
    ]
    : [-6.3, 106.8];
  const selectedCoordinates = selectedBranch?.coordinates;

  return (
    <MapContainer className="se-leaflet-map" center={center} zoom={overview ? 10 : 13} scrollWheelZoom={false} zoomControl>
      <TileLayer
        attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {availableBranches.map((branch) => (
        <Marker
          key={branch.slug}
          position={[branch.coordinates.lat, branch.coordinates.lng]}
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
              <Image src={branch.photo} width={68} height={58} alt={`Foto placeholder Super Emas ${branch.name}`} placeholder="blur" blurDataURL={blurDataURL} />
              <div><strong>{branch.fullName}</strong><p>{branch.address}</p><a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">Petunjuk arah</a></div>
            </div>
          </Popup>
        </Marker>
      ))}
      {overview && <MapBounds branches={branches} />}
      <MapFocus branch={selectedCoordinates ? selectedBranch : null} />
    </MapContainer>
  );
}
