import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "./layouts/AppLayout"
import { IndexView } from "./views/IndexView"

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout />}>
                <Route path={"/"} element={<IndexView />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
