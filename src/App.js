
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Customer from './Pages/Customer';
import Paket from './Pages/Paket';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

function App() {
  return (
    <Provider store={Store}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
            <Route path='/paket' element={<Paket />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
