import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import Login from './Pages/Login';
import Restaurant from './Pages/Restaurant';    
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage /> } />
        <Route path="/login" element={<Login />}/>
        <Route path='/Restaurant' element={<Restaurant />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
