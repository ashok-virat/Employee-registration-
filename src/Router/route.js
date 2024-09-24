import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spinner } from 'reactstrap'

const Signup = lazy(() => import('../Components/AdminSignup/SignupComponent'))
const Signin = lazy(() => import('../Components/AdminSignup/SigninComponent'))
const EmployerHome = lazy(() => import('../Components/Employer/EmployerHome'))
const AdminHomePage = lazy(() => import('../Components/AdminHome/AdminHome'))
const RegisteredUserPage = lazy(() => import('../Components/AdminHome/ViewRegisterUsers'))


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return children;
};


const RouteComponent = () => {

    const spinner = {
        position: 'absolute',
        top: ' 50%',
        left: '50%'
    }
    return (
        <Router>
            <Suspense fallback={<div style={spinner}><Spinner></Spinner></div>}>
                <Routes>
                    <Route exact path="/" element={<Signup />} />
                    <Route exact path="/signin" element={<Signin />} />
                    <Route
                        exact
                        path="/employe"
                        element={
                            <ProtectedRoute>
                                <EmployerHome />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminHomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <RegisteredUserPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default RouteComponent