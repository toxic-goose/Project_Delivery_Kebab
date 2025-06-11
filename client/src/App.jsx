import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./app/Root";
import MainPage from "./pages/Main/MainPage";
import { useEffect, useState } from 'react';
import AuthPage from "./pages/Auth/AuthPage";

import { setAccessToken } from "./shared/lib/axiosInstance";
import UserApi from "./entities/UserApi";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserApi.refresh()
      .then(({ error, data, statusCode }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setUser(data.user);
          setAccessToken(data.accessToken);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root user={user} setUser={setUser} />}>
          <Route index element={<MainPage user={user} />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
