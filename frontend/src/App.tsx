import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChannelPage from "./pages/ChannelPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import RegisterSuccessfulPage from "./pages/RegisterSuccessfulPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/registersuccessful"
          element={<RegisterSuccessfulPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/channel" element={<ChannelPage />} />
        <Route path="/channel/:channelID" element={<ChannelPage />} />
        <Route path="/profile/:userID" element={<ProfilePage />} />
        <Route path="/editprofile/" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
