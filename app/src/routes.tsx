import { Route, Routes } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Home from '@/pages/Home'
import SignIn from '@/pages/Login'

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
            </Route>
        </Routes>
    )
}
