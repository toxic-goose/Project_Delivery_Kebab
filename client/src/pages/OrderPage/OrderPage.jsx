import React from 'react';
import { useParams } from 'react-router';
import OrderForm from '../../features/auth/ui/OrderForm/OrderForm';
import OrderCard from '../../features/auth/ui/OrderCard/OrderCard';

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '2rem',
    backgroundColor: '#f5f7fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  contentWrapper: {
      width: '100%',
      height: '100%',
    maxWidth: '450px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '2rem',
    margin: '0 auto'
  },
  '@media (max-width: 768px)': {
    pageContainer: {
      padding: '1rem'
    },
    contentWrapper: {
      padding: '1.5rem'
    }
  },
  '@media (max-width: 480px)': {
    contentWrapper: {
      padding: '1rem'
    }
  }
};

// Функция для применения медиа-запросов
const applyMediaQueries = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    @media (max-width: 768px) {
      .order-page-container {
        padding: 1rem !important;
      }
      .order-page-content {
        padding: 1.5rem !important;
      }
    }
    @media (max-width: 480px) {
      .order-page-content {
        padding: 1rem !important;
      }
    }
  `;
  document.head.appendChild(styleElement);
  return () => document.head.removeChild(styleElement);
};

export default function OrderPage({ user }) {
  const { orderId } = useParams();

  React.useEffect(() => {
    const cleanup = applyMediaQueries();
    return cleanup;
  }, []);

  return (
    <div className="order-page-container" style={styles.pageContainer}>
      <div className="order-page-content" style={styles.contentWrapper}>
        {user.is_buyer ? (
          <OrderCard orderId={orderId} />
        ) : (
          <OrderForm orderId={orderId} user={user}/>
        )}
      </div>
    </div>
  );
}