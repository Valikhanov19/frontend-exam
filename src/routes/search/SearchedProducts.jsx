import React from 'react';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { SlBasket } from 'react-icons/sl';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { shortenDescription } from '../../helpers/shortenDescription';
import './SearchedProducts.scss';
import Container from '../../utils/Container';

const SearchedProducts = () => {
  const dataInStore = useSelector(data => data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section>
      <Container>
        <h2 className='search-title'>Found products:</h2>
        <button className='to-home-page' onClick={() => { navigate('/') }}>Home</button>
        <ul className='searched-products'>
          {dataInStore.search.searched.length > 0 ?
            dataInStore.search.searched.map(d => {
              return <li key={d.id}>
                <Link to={`/product/${d.id}`}>
                  {
                    d.images[0].startsWith('https://') && !d.images[0].startsWith('https://www.google') ?
                      <img src={d.images[0]} alt="product" />
                      : <img src={'https://avatars.mds.yandex.net/i?id=48d631e1e1de7efce8207be0d389470557260b5d-7755895-images-thumbs&n=13'} alt="product" />
                  }
                  <h5>${d.price}</h5>
                  <h4>{d.title}</h4>
                  <p>{shortenDescription("word", 4, d.description)}</p>
                </Link>
                {dataInStore.like.likedProducts.find(p => p?.id === d?.id) ? <BsFillSuitHeartFill className='heart-icon' onClick={() => { dispatch({ id: d.id, type: "REMOVE_FROM_WISHLIST" }) }} style={{ color: "red" }} /> : <FiHeart className='heart-icon' onClick={() => { dispatch({ product: d, type: "ADD_TO_WISHLIST" }) }} />}
                {dataInStore.basketed.baskets.find(p => p?.id === d?.id) ? <button className='cart-btn remove-btn' onClick={() => { dispatch({ id: d.id, type: "REMOVE_FROM_BASKET_LIST" }) }}>Remove from cart <SlBasket className='cart' /></button> : <button className='cart-btn' onClick={() => { dispatch({ basket: d, type: "ADD_TO_BASKET_LIST" }) }}>Add to cart <SlBasket className='cart' /></button>}
              </li>
            }) :
            <li className='no-product'><h2>Nothing found ... :&#40;</h2></li>
          }
        </ul>
      </Container>
    </section>
  )
}

export default SearchedProducts