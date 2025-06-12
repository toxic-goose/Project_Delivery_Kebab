import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./app/Root";
import MainPage from "./pages/Main/MainPage";
import { useEffect, useState } from 'react';
import AuthPage from "./pages/Auth/AuthPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrdersPages from "./pages/OrderPage/OrdersPages";
import { setAccessToken } from "./shared/lib/axiosInstance";
import UserApi from "./entities/UserApi";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserApi.refresh()
        console.log("refresh data:", data)
        if (data.statusCode === 200 && data.data.accessToken) {
          // ! ! ! ! ! !
          setUser((pre) => ({...pre, ...data.data.user}))
          setAccessToken(data.data.accessToken)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root user={user} setUser={setUser} />}>
          <Route index element={<MainPage user={user} />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          <Route path="/page" element={<OrdersPages  />} />
          <Route path="/orderPage" element={<OrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
