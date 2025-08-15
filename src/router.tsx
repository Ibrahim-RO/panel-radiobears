import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "./layouts/AppLayout"
import { IndexView } from "./views/IndexView"
import { EventsView } from "./views/EventsView"
import { HostsView } from "./views/HostsView"
import { YoutubeVideosView } from "./views/YoutubeVideosView"
import { UsersView } from "./views/UsersView"
import { SocialMediasView } from "./views/SocialMediasView"

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}>
                <Route path={"/"} element={<IndexView />} />
                <Route path={"/hosts"} element={<HostsView />} />
                <Route path={"/events"} element={<EventsView />} />
                <Route path={"/social-medias"} element={<SocialMediasView />} />
                <Route path={"/youtube"} element={<YoutubeVideosView />} />
                <Route path={"/users"} element={<UsersView />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
