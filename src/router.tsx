import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "./layouts/AppLayout"
import { IndexView } from "./views/IndexView"
import { EventsView } from "./views/EventsView"
import { HostsView } from "./views/HostsView"
import { YoutubeVideosView } from "./views/YoutubeVideosView"
import { SocialMediasView } from "./views/SocialMediasView"
import { LoginView } from "./views/LoginView"
import { AuthLayout } from "./layouts/AuthLayout"
import { RegisterView } from "./views/RegisterView"

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Navigate to='/auth/login' />} />
              <Route path="/auth/login" element={<LoginView />} />
              <Route path="/auth/register" element={<RegisterView />} />
            </Route>
            <Route path="/dashboard" element={<AppLayout />}>
                <Route path={""} element={<IndexView />} />
                <Route path={"hosts"} element={<HostsView />} />
                <Route path={"events"} element={<EventsView />} />
                <Route path={"social-medias"} element={<SocialMediasView />} />
                <Route path={"youtube"} element={<YoutubeVideosView />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
