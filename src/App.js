import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './pages/login/Login';
import Index from "./pages/index/Index";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Index />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
