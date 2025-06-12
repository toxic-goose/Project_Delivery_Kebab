import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для отображения стандартных иконок маркеров
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OrdersPages = () => {
  // Центр карты (Москва по умолчанию)
const center = [55.751244, 37.618423];

  // Состояние для хранения меток
const [markers, setMarkers] = useState([
    {
    id: 1,
    position: [55.751244, 37.618423],
    title: "Москва",
    description: "Столица России"
    },
    {
    id: 2,
    position: [59.934280, 30.335098],
    title: "Санкт-Петербург",
    description: "Северная столица"
    }
]);

  // Кастомная иконка
const customIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
}), []);

const AddMarkerControl = () => {
    useMapEvents({
    click(e) {
        const newMarker = {
        id: Date.now(),
        position: [e.latlng.lat, e.latlng.lng],
        title: `Метка ${markers.length + 1}`,
            description: `Добавлена: ${new Date().toLocaleString()}`  
        // добавить поле с заказом
        };
        setMarkers(prev => [...prev, newMarker]);
    }
    });
    return null;
};


const removeMarker = (id) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
};

return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <h1 style={{ textAlign: 'center', margin: '10px 0' }}>Карта с метками</h1>
    
    <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer 
        center={center} 
        zoom={5} 
        style={{ height: '450px', width: '350px' }}
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {markers.map(marker => (
            <Marker 
            key={marker.id} 
            position={marker.position}
            icon={customIcon}
            eventHandlers={{
                click: () => console.log(`Метка ${marker.id} кликнута`)
            }}
            >
            <Popup>
                <div>
                <h3>{marker.title}</h3>
                <p>{marker.description}</p>
                    <p>Координаты: {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}</p> {/* заменить координаты на адрес */}
                <button 
                    onClick={(e) => {
                    e.stopPropagation();
                    removeMarker(marker.id);
                    }}
                    style={{ marginTop: '5px' }}
                >
                    Удалить1
                </button>
                </div>
            </Popup>
            </Marker>
        ))}
        
        <AddMarkerControl />
        </MapContainer>
    </div>
    
    <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Управление метками:</h3>
        <p>Всего меток: {markers.length}</p>
        <button 
        onClick={() => setMarkers([])}
        style={{ marginRight: '10px' }}
        >
        Удалить все метки
        </button>
        <button 
        onClick={() => {
            const newMarker = {
            id: Date.now(),
            position: [
                center[0] + (Math.random() - 0.5) * 10,
                center[1] + (Math.random() - 0.5) * 20
            ],
            title: `Случайная метка ${markers.length + 1}`,
            description: 'Добавлена автоматически'
            };
            setMarkers(prev => [...prev, newMarker]);
        }}
        >
        Добавить случайную метку
        </button>
    </div>
    </div>
);
};

export default OrdersPages;
