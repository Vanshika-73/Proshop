import { Container } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar'
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import SingleProductScreen from './screens/SingleProductScreen';
import ProfileScreen from './screens/ProfileScreen'
import Darkmode from './utils/Darkmode';
import CheckoutScreeen from './screens/CheckoutScreen';
import ProductPanel from './screens/admin panel/ProductPanel';
import UserPanel from './screens/admin panel/UserPanel';
import OrderPanel from './screens/admin panel/OrderPanel';
function App() {
  return (
    <div>
      <Darkmode>
      <Navbar/>
      <main id='body'>
      <Container maxWidth="xl">
        <Routes>
          <Route path={'/'} element={<HomeScreen/>}/>
          <Route path={'/Product/:_id'} element={<SingleProductScreen/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route path={'/cart'} element={<CartScreen/>}/>
          <Route path={'/profile'} element={<ProfileScreen/>}/>
          <Route path={'/checkout'} element={<CheckoutScreeen/>}/>
          <Route path='/admin'>
            <Route path='products' element={<ProductPanel/>}/>
            <Route path='users' element={<UserPanel/>}/>
            <Route path='orders' element={<OrderPanel/>}/>
          </Route>
        </Routes>
     </Container>
      </main>
      <footer>
        <span>Copyright &copy; 2022</span>
      </footer>
      </Darkmode>
    </div>
  )
}

export default App;