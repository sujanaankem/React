import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import Login from './Pages/Login';
import Restaurant from './Pages/Restaurant';
import Students from './Pages/students';
import JoinPage from './Pages/JoinPage';
import Details from './Pages/Details';

// ...existing code...


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Restaurant" element={<Restaurant />} />
        <Route path="/students" element={<Students />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
