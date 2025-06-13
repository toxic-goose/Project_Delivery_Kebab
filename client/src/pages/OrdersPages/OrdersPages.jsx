import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OrdersApi } from '../../entities/OrdersApi';
import { NavLink } from 'react-router';

// Фикс для отображения стандартных иконок маркеров
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Стили для компонента
const styles = {
  container: {
    width: '100%',
    minHeight: 'calc(100vh - 100px)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f0faf7',
    padding: '20px',
    boxSizing: 'border-box'
  },
  header: {
    textAlign: 'center',
    margin: '0 0 20px',
    color: '#1a6b54',
    fontSize: '28px',
    fontWeight: '600'
  },
  contentWrapper: {
    display: 'flex',
    flex: '1 1 auto',
    gap: '20px',
    height: '100%',
    minHeight: '600px',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  mapContainer: {
    flex: 1,
    height: '100%',
    minWidth: '50%',
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  map: {
    height: '100%',
    width: '100%',
    minHeight: '750px'
  },
  mapControls: {
    padding: '12px 15px',
    backgroundColor: '#e0f5ee',
    marginTop: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    right: '15px',
    zIndex: 1000
  },
  ordersContainer: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    minWidth: '50%',
    height: '100%'
  },
  orderCard: {
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f5fbf9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    border: '1px solid #e0f5ee',
    transition: 'all 0.3s',
    marginBottom: '15px',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  },
  primaryButton: {
    backgroundColor: '#4dccbd',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
    flex: 1,
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#3aa897'
    }
  },
  dangerButton: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
    flex: 1,
    '&:hover': {
      backgroundColor: '#ff4444'
    }
  }
};

const OrdersPages = () => {
  const [orders, setOrders] = useState([]);
  const [center] = useState([55.751244, 37.618423]);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Функция геокодирования адреса
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error("Ошибка геокодирования:", error);
      return null;
    }
  };

  // Загрузка заказов и создание маркеров
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await OrdersApi.getAll();
        setOrders(data);
        
        const tempMarkers = await Promise.all(data.map(async (order, index) => {
          let position = center;
          
          if (order.location) {
            const coords = order.location.split(',').map(Number);
            if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
              position = coords;
            } else {
              const geoCoords = await geocodeAddress(order.location);
              if (geoCoords) position = geoCoords;
            }
          }
          
          return {
            id: order.id || Date.now() + index,
            position,
            title: order.order_name,
            description: order.description || 'Описание отсутствует',
            address: order.location || 'Адрес не указан',
            orderData: order
          };
        }));
        
        setMarkers(tempMarkers);
      } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [center]);

  // Инициализация карты после монтирования компонента
  useEffect(() => {
    setMapReady(true);
  }, []);

  // Кастомная иконка
  const customIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }), []);

  // Добавление нового маркера при клике
  const AddMarkerControl = () => {
    useMapEvents({
      async click(e) {
        const newAddress = `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`;
        const newOrder = {
          id: Date.now(),
          order_name: `Новый заказ ${markers.length + 1}`,
          description: `Добавлен: ${new Date().toLocaleString()}`,
          location: newAddress,
          price: '0 руб.',
          sale: '0%'
        };
        
        setOrders(prev => [...prev, newOrder]);
        
        const newMarker = {
          id: newOrder.id,
          position: [e.latlng.lat, e.latlng.lng],
          title: newOrder.order_name,
          description: newOrder.description,
          address: newAddress,
          orderData: newOrder
        };
        
        setMarkers(prev => [...prev, newMarker]);
      }
    });
    return null;
  };

  const removeMarker = (id) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 100px)',
        backgroundColor: '#f0faf7'
      }}>
        <div style={{
          padding: '30px',
          backgroundColor: '#e0f5ee',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1a6b54', marginBottom: '15px' }}>Загрузка данных...</h3>
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#c8e6de',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '70%',
              height: '100%',
              backgroundColor: '#4dccbd',
              animation: 'loading 1.5s infinite ease-in-out'
            }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Карта заказов</h1>
      
      <div style={styles.contentWrapper}>
        {/* Карта */}
        <div style={styles.mapContainer}>
          {mapReady && (
            <MapContainer 
              center={center} 
              zoom={12} 
              style={styles.map}
              whenCreated={() => setMapReady(true)}
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
                >
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <h3 style={{ 
                        color: '#1a6b54',
                        margin: '0 0 10px',
                        fontSize: '16px'
                      }}>{marker.title}</h3>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>{marker.description}</p>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Адрес:</strong> {marker.address}
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Координаты:</strong> {marker.position[0].toFixed(6)}, {marker.position[1].toFixed(6)}
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Цена:</strong> {marker.orderData?.price || 'Не указана'}
                      </p>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>
                        <strong>Скидка:</strong> {marker.orderData?.sale || 'Нет'}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMarker(marker.id);
                        }}
                        style={{ 
                          marginTop: '10px',
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.3s',
                          width: '100%'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ff4444'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
                      >
                        Удалить заказ
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              <AddMarkerControl />
            </MapContainer>
          )}
          
          <div style={styles.mapControls}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ 
                  margin: '0 0 5px', 
                  fontSize: '14px',
                  color: '#1a6b54',
                  fontWeight: '600'
                }}>Управление заказами</h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px',
                  color: '#4d937f'
                }}>Всего заказов: {markers.length}</p>
              </div>
              <button 
                onClick={() => {
                  setMarkers([]);
                  setOrders([]);
                }}
                style={{ 
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ff4444'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
              >
                Удалить все
              </button>
            </div>
          </div>
        </div>
        
        {/* Список заказов */}
        <div style={styles.ordersContainer}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '1px solid #e0f5ee'
          }}>
            <h2 style={{ 
              color: '#1a6b54',
              margin: 0,
              fontSize: '20px',
              fontWeight: '600'
            }}>Список заказов</h2>

            <NavLink to={'/orderPage/new'}>
              <button>Создать заказ</button>
            </NavLink>
            <span style={{
              backgroundColor: '#4dccbd',
              color: 'white',
              borderRadius: '12px',
              padding: '4px 10px',
              fontSize: '14px',
              fontWeight: '500'
            }}>{orders.length} заказов</span>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '15px',
            height: 'calc(100% - 60px)',
            overflowY: 'auto',
            paddingRight: '5px'
          }}>
            {orders.length > 0 ? orders.map((order) => (
              <div 
                key={order.id} 
                style={{
                  ...styles.orderCard,
                  ':hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)'}
              >
                <h3 style={{
                  color: '#1a6b54',
                  margin: '0 0 10px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>{order.order_name}</h3>

                <div>
                  <img src={`${order.img_path}`} alt="Тут должна быть картинка" />
                </div>
                
                <div style={{ margin: '10px 0' }}>
                  <p style={{ 
                    margin: '6px 0', 
                    fontSize: '14px',
                    display: 'flex'
                  }}>
                    <span style={{
                      minWidth: '90px',
                      color: '#4d937f',
                      fontWeight: '500'
                    }}>Адрес:</span> 
                    <span>{order.location || 'Не указан'}</span>
                  </p>
                  <p style={{ 
                    margin: '6px 0', 
                    fontSize: '14px',
                    display: 'flex'
                  }}>
                    <span style={{
                      minWidth: '90px',
                      color: '#4d937f',
                      fontWeight: '500'
                    }}>Описание:</span> 
                    <span>{order.description || 'Нет описания'}</span>
                  </p>
                  <p style={{ 
                    margin: '6px 0', 
                    fontSize: '14px',
                    display: 'flex'
                  }}>
                    <span style={{
                      minWidth: '90px',
                      color: '#4d937f',
                      fontWeight: '500'
                    }}>Цена:</span> 
                    <span>{order.price || 'Не указана'}</span>
                  </p>
                  <p style={{ 
                    margin: '6px 0', 
                    fontSize: '14px',
                    display: 'flex'
                  }}>
                    <span style={{
                      minWidth: '90px',
                      color: '#4d937f',
                      fontWeight: '500'
                    }}>Скидка:</span> 
                    <span>{order.sale || 'Нет'}</span>
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '15px'
                }}>
                  <NavLink to={`/orderPage/${order.id}`}>
                  <button style={styles.primaryButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#3aa897'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#4dccbd'}
                  >
                    Подробнее
                  </button>
                  </NavLink>        
                              
                          
                  
                  <button style={styles.dangerButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#ff4444'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b6b'}
                  onClick={() => removeMarker(order.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            )) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#4d937f',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#e0f5ee',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4dccbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12" stroke="#4dccbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16H12.01" stroke="#4dccbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>Нет заказов</h3>
                <p style={{
                  fontSize: '14px',
                  maxWidth: '300px',
                  lineHeight: '1.5'
                }}>Нажмите на карту, чтобы добавить новый заказ или проверьте подключение к серверу</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .leaflet-container {
          height: 100%;
          width: 100%;
          min-height: 400px;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c8e6de;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #4dccbd;
        }
      `}</style>
    </div>
  );
};

export default OrdersPages;