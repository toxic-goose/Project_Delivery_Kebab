import React from 'react'

export default function ProfilePage({ user }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        .profile-container {
          max-width: 480px;
          margin: 40px auto;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 32px;
          font-family: 'Inter', sans-serif;
          color: #333;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        h1 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 24px;
          text-align: center;
        }
        .profile-item {
          display: flex;
        align-items: center;
          margin-bottom: 16px;
        }
        .profile-item span {
          margin-left: 10px;
        }
        .role {
          font-weight: bold;
          color: #007BFF;
        }
      `}</style>
      <div className="profile-container">
        <h1>Профиль пользователя</h1>
        <div className="profile-item">
          <span>Имя: {user.user_name}</span>
        </div>
        <div className="profile-item">
          <span>Email: {user.email}</span>
        </div>
        <div className="profile-item">
          <span>Телефон: {user.phone}</span>
        </div>
        <div className="profile-item">
          <span className="role"></span>
                {user.is_buyer ? 'Покупатель' : 'Курьер'}
        </div>
      </div>
    </>
  );
}