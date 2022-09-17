import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Match from "./pages/Match";
import Tenant from "./pages/Tenant";
import Landlord from "./pages/Landlord";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/">
                        <Route index element={<Profile />} />
                        <Route path="edit" element={<EditProfile />} />
                    </Route>
                    <Route path="/match" element={<Match />} />
                    <Route path="/tenant" element={<Tenant />} />
                    <Route path="/landlord" element={<Landlord />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
