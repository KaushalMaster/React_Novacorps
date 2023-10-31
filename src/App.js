import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import CreatePost from "./components/CreatePost/CreatePost";
import Viewposts from "./components/ViewPosts/Viewposts";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <CreatePost /> */}
      <Viewposts />
      <Footer />
    </div>
  );
}

export default App;
