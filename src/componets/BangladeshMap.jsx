import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BangladeshMap = ({ servicedata }) => {
  console.log(servicedata);

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [14, 54],
    iconAnchor: [45, 12],
  });
  const position = [ 23.9999,90.4125];


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(servicedata);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setFilteredDistricts(districtsData);
    } else {
      const filtered =servicedata.filter(district =>
        district.city.toLowerCase().includes(value)
      );
      setFilteredDistricts(filtered);
    }
  };
  return (
    <div className="p-6 space-y-2 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center ">Delivery Coverage</h1>

      {/* Search Box */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search your delivery area..."
          className="input input-bordered w-full max-w-md"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      {/* Map */}
      <div className="w-full h-[400px] rounded-2xl shadow-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={position}
          zoom={7}
          className="h-full w-full"
         
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
         {
            filteredDistricts.map((district,index)=>
                  <Marker key={index} position={[district.latitude, district.longitude]}>
              <Popup>{district.name} Delivery Available</Popup>
            </Marker>
            )
         }
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
