import Header from "./components/Header";
import {Routes, Route} from "react-router-dom";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
