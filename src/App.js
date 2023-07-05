import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateAPodcast from "./pages/CreateAPodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";
import MainLoader from "./components/common/Loader/MainLoader";
import EditPodcast from "./pages/EditPodcast";

function App() {
  const [isLoading, setIsLoading] = useState(true);
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

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <>
          <MainLoader />
        </>
      ) : (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<SignUpPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-a-podcast" element={<CreateAPodcast />} />
                <Route
                  path="/podcast/:id/edit-podcast"
                  element={<EditPodcast />}
                />
                <Route
                  path="/podcast/:id/create-episode"
                  element={<CreateAnEpisode />}
                />
              </Route>
              <Route path="/podcast/:id" element={<PodcastDetails />} />
              <Route path="/podcasts" element={<Podcasts />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
