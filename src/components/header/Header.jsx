import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../../utils/Container';
import './Header.scss';
import HeaderTop from './HeaderTop';
import Navbar from './Navbar';

const Header = () => {
    const location = useLocation();

    return (!location.pathname.includes("register") && !location.pathname.includes("sign") &&
        <header className='header'>
            <Container>
                <HeaderTop />
                <Navbar />
            </Container>
        </header>
    )
}

export default Header