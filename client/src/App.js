import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { useState } from "react"

import Header from "./components/Header/Header.jsx"
import Login from "./components/Login/Login.jsx"
import Home from "./components/Home/Home.jsx"
import DataProvider from "./context/DataProvider.js"
import CreatePost from "./components/CreatePost/CreatePost.jsx"
import ViewBlog from "./components/ViewBlog/ViewBlog.jsx"
import Update from "./components/CreatePost/Update.jsx"
import About from "./components/About/About.jsx"
import Contact from "./components/Contact/Contact.jsx"
import MyBlogs from "./components/MyBlogs/MyBlogs.jsx"

const PrivateRoute = ({isAuthenticated, ...props}) => {
  console.log(isAuthenticated)
  return isAuthenticated ? <>
    <Header />
    <Outlet/>
  </>
  :
  <Navigate replace to="/login" />
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false)

 
  return (
    <DataProvider>
      <BrowserRouter>
       
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

              <Route path="/" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/" element=<Home />/>
              </Route>

              <Route path="/create" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/create" element=<CreatePost />/>
              </Route>

              <Route path="/view/:id" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/view/:id" element=<ViewBlog />/>
              </Route>

              <Route path="/update/:id" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/update/:id" element=<Update />/>
              </Route>

              <Route path="/about" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/about" element=<About />/>
              </Route>

              <Route path="/contact" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/contact" element=<Contact />/>
              </Route>

              <Route path="/myblogs" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="/myblogs" element=<MyBlogs />/>
              </Route>

              <Route path="myblogs/view/:id" element= {<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path="myblogs/view/:id" element=<ViewBlog />/>
              </Route>

            </Routes>
          </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
