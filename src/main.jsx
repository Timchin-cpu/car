import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BookingPage from "./components/BookingPage/BookingPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import SearchPage from "./components/SearchPage/SearchPage";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import NotificationsPage from "./components/NotificationsPage/NotificationsPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
