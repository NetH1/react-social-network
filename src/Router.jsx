import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layout";
import AuthorizationPage from "./pages/AuthorizationPage";
import FeedPage from "./pages/FeedPage";
import SinglePostPage from "./pages/SignlePostPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";

function Router() {
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {!user && (
          <>
            <Route path="/*" element={<AuthorizationPage />} />
            <Route
              path="/registration"
              element={<AuthorizationPage variant="registration" />}
            />
          </>
        )}
        {user && (
          <Route path="/*" element={<MainLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="createpost" element={<CreatePostPage />} />
            <Route path="post/:postId" element={<SinglePostPage />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
