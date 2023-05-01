import React from 'react';
import './Header.scss';
import { SlArrowDown } from 'react-icons/sl';
import { TfiSearch } from 'react-icons/tfi';
import { ReactComponent as Logo } from '../../assets/images/header/ebay-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { instance } from '../../api/instance';
import { useDispatch } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';

const Navbar = () => {

    const [searchDataResults, setSearchDataResults] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data] = useFetchData('/categories');

    const getProductSuggestions = (e) => {
        setSearchInputValue(e.target.value);
        if (e.target.value.trim().length > 1) {
            instance.get(`/products/?title=${e.target.value}&offset=0&limit=10`)
                .then(response => setSearchDataResults(response.data))
                .catch(err => console.log(err));
        }
    }

    const getSearchResults = (e) => {
        e.preventDefault();
        instance.get(`products/?title=${searchInputValue}`)
            .then(response => dispatch({ data: response.data, type: 'SEARCHED_PRODUCTS' }))
            .catch(err => console.log(err));
        navigate('/searched');
        e.target.reset()
        setSearchInputValue('')
    }

    const removeSuggestions = () => {
        setSearchInputValue('')
    }

    const searchSelected = (e) => {
        instance.get(`/products/?categoryId=${e.target.value}`)
            .then(response => dispatch({ data: response.data, type: 'SEARCHED_PRODUCTS' }))
            .catch(err => console.log(err));

        navigate('/searched');
    }

    return (
        <div className='navbar'>
            <Link to="/">
                <Logo />
            </Link>
            <p>Shop by category</p>
            <SlArrowDown className='arrow-down' />
            <form onSubmit={getSearchResults}>
                <div className='search-wrapper'>
                    <TfiSearch className='search-icon' />
                    <input className='search' type="text" placeholder='Search for anything' onChange={getProductSuggestions} />
                    <select name="category" className='category-select' onChange={searchSelected} >
                        {
                            data.map(d => {
                                return <option className='category-option' value={d.id} key={d.id}>{d.name}</option>
                            })
                        }
                    </select>
                </div>
                <button className='search-btn'>Search</button>
                <button className='advanced-btn'>Advanced</button>
            </form>
            {
                searchDataResults.length > 0 && searchInputValue.length >= 1 ?
                    <ul className='searched-suggestions'>
                        {
                            searchDataResults.map(searchProduct => {
                                return <li key={searchProduct.id}>
                                    <Link onClick={removeSuggestions} className='suggested-product' to={`/product/${searchProduct.id}`}>
                                        <h4>
                                            {searchProduct.title}
                                        </h4>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                    : <></>
            }
        </div>
    )
}

export default Navbar