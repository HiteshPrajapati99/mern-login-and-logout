import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/navbar/Homepage";
import Loginpage from "./components/Loginpage";
import Registerpage from "./components/Registerpage";
import Navabaroutlet from "./components/navbar/Navabaroutlet";
import PtofilePage from "./components/navbar/PtofilePage";
import Updateprofile from "./components/navbar/Updateprofile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/" element={<Navabaroutlet />}>
            <Route index element={<Homepage />} />
            <Route path="profile" element={<PtofilePage />} />
            <Route path="profile/edit/:id" element={<Updateprofile />} />
          </Route>
          <Route path="register" element={<Registerpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
