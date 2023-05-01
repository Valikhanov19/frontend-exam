import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { SlBasket } from 'react-icons/sl';
import { SlBell } from 'react-icons/sl';
import { SlHeart } from 'react-icons/sl';
import { SlArrowDown } from 'react-icons/sl';
import { useSelector } from 'react-redux';

const HeaderTop = () => {
  const dataInStore = useSelector(data => data)

  return (
    <div className='header-top'>
      <p>Hi! <Link to='/sign'>Sign in</Link> or <Link to="/register">register</Link></p>
      <ul className='header-top__info'>
        <li><Link href="/">Daily Deals</Link></li>
        <li><Link href="/">Brand Outlet</Link></li>
        <li><Link href="/">Help &#38; Contact</Link></li>
      </ul>
      <ul className='header-top__details'>
        <li className='welcoming-part'>Hello <span>{dataInStore.login.email ? dataInStore.login.email : 'User'}</span></li>
        <li><Link href="/">Sell</Link></li>
        <li><Link href="/">Watchlist <SlArrowDown className='arrow-down' /></Link></li>
        <li><Link href="/">My eBay <SlArrowDown className='arrow-down' /></Link></li>
        <li><Link href="/"><SlBell className='bell' /></Link></li>
        <li><Link to="/favourites"><SlHeart className='heart' /><span className='like-counter'>{dataInStore.like.likedProducts.length}</span></Link></li>
        <li><Link to='/cart'><SlBasket className='basket' /><span className='basket-counter'>{dataInStore.basketed.baskets.length}</span></Link></li>
      </ul>
    </div>
  )
}

export default HeaderTop