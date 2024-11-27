import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/auth_pages/Loginpage"
import TodoPage from "./pages/TodoPage"
import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"
import ProtectedRoute from "./protected_route/ProtectedRoute"
import SignUpPage from "./pages/auth_pages/SignUpPage"
import NotfoundPage from "./pages/404/NotfoundPage"

function App() {


  return (
   <BrowserRouter>
   <Routes>

    <Route  element={<AuthLayout/>}>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
    </Route>

    <Route element= {<ProtectedRoute />}>
      <Route element={<MainLayout/>}>
        <Route path="/todopage" element={<TodoPage/>}/>
        <Route path="*" element={<NotfoundPage/>}/>
      </Route>
    </Route>
   
    
    <Route path="*" element={<Navigate to="/login" replace />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
