import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateAPodcast from "./pages/CreateAPodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          doc(db, "users", user.uid),
          (userdoc) => {
            if (userdoc.exists()) {
              const userData = userdoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: userData.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error in fetching userData", error);
          }
        );
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcast />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisode />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
