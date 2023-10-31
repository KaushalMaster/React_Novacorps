import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import CreatePost from "./components/CreatePost/CreatePost";
import Viewposts from "./components/ViewPosts/Viewposts";
import CreateEmergencyContact from "./components/CreateEmergencyContact/CreateEmergencyContact";
import EmergencyContacts from "./components/EmergencyContacts/EmergencyContacts";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <CreatePost /> */}
      {/* <Viewposts /> */}
      {/* <CreateEmergencyContact /> */}
      {/* <EmergencyContacts /> */}
      {/* <Footer /> */}

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createpost" element={<CreatePost />} />

          <Route path="/viewposts" element={<Viewposts />} />
          <Route
            path="/createemergencycontact"
            element={<CreateEmergencyContact />}
          />
          <Route path="/emergencycontacts" element={<EmergencyContacts />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
