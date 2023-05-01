import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Cart from './routes/cart/Cart';
import Category from './routes/category/Category';
import Home from './routes/home';
import LikedProducts from './routes/liked-products/LikedProducts';
import Register from './routes/register/Register';
import SearchedProducts from './routes/search/SearchedProducts';
import Sign from './routes/sign/Sign';
import SingleProduct from './routes/single-product/SingleProduct';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/searched' element={<SearchedProducts />} />
          <Route path='/favourites' element={<LikedProducts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign' element={<Sign />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
