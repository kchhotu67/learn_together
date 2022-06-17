import Header from "./components/Header";
import Home from "./pages/Home";
import TopicPage from "./components/TopicPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import ProfilePage from "./pages/ProfilePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import CreateRoom from "./pages/CreateRoom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EditProfile from "./pages/EditProfile";
import { AuthProvider } from "./utils/auth";
import RequireAuth from "./utils/RequireAuth";
import EditRoom from "./pages/EditRoom";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
        <Route path="/edit-profile" element={<RequireAuth><EditProfile /></RequireAuth>} />
        <Route path="/rooms/:roomId" element={<RequireAuth><RoomPage/></RequireAuth>} />
        <Route path="/topics" element={<RequireAuth><TopicPage /></RequireAuth>} />
        <Route path="/profile/:id" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/activities" element={<RequireAuth><ActivitiesPage /></RequireAuth>} />
        <Route path="/create-room" element={<RequireAuth><CreateRoom /></RequireAuth>} />
        <Route path="/edit-room/:id" element={<RequireAuth><EditRoom /></RequireAuth>} />
        <Route path="*" element={<RequireAuth><Home/></RequireAuth>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
