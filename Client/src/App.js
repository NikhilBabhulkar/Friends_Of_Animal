import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import UserProfile from "scenes/profilePage/UserProfile"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import EventHome from "scenes/events/EventHome";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            // element={<HomePage/>}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            //  element={<ProfilePage/>}
            />
            <Route
              path="/userprofile/:userId"
              element={isAuth ? <UserProfile /> : <Navigate to="/" />}
            //  element={<ProfilePage/>}
            />
            <Route path="/events" element={<EventHome/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
