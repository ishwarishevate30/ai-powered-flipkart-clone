
import './App.css';
//components
import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Home from './components/home/Home';  
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DetailView from './components/details/DetailView';
import { Box } from '@mui/material';


function App() {
  return (
    <DataProvider >
      <BrowserRouter>
      <Header/>
      <Box style={{marginTop:70}}>
        <Routes>
        <Route path='/' element={  <Home/> }/>
        <Route path='/product/:id' element={ <DetailView/> }/>
        <Route path='/cart' element={ <Cart/> }/>
        </Routes>

      </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
