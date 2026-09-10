import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import Login from './Pages/Login';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage /> } />
        <Route path="/login" element={<Login />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
