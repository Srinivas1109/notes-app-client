import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Notes from "./Components/Notes";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { AuthProvider } from "./Context/AuthContext";
import PrivateNote from "./PrivateRoutes/PrivateNote";


function App() {

  // const [searchValue, setSearchValue] = useState('')
  // const searchVariables = {
  //   searchValue,
  //   setSearchValue
  // }

  // const []
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<PrivateNote />}>
              <Route path="/all-notes" element={<Notes />} />
            </Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Signup />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
