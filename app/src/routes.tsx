import { Route, Routes, Navigate } from 'react-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Home from '@/pages/Home'
import SignIn from '@/pages/Login'
import Products from '@/pages/Products'
import StockManagement from '@/pages/StockManagement'
import Cookies from 'js-cookie'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = Cookies.get('access')
    return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/login" element={<SignIn />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                <Route path="/stock" element={<ProtectedRoute><StockManagement /></ProtectedRoute>} />
            </Route>
        </Routes>
    )
}
