import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Container from '../../utils/Container';
import { v4 as uuidv4 } from 'uuid';

const Footer = () => {
  const links = [
    'About eBay', 'Announcements', 'Community', 'Security Center', 'Seller Center', 'Policies', 'Affiliates', 'Help & Contact', 'Site Map'
  ]
  return (
    <footer>
      <Container>
        <ul className='footer-links'>
          {
            links.map(link => <li key={uuidv4()}><Link className='link' to={'/'}>{link}</Link></li>)
          }
        </ul>
        <p>Copyright © 1995-2023 eBay Inc. All Rights Reserved. <span>Accessibility</span>,<span>User Agreement</span>, <span>Privacy</span>, <span>Payments Terms of Use</span>,<span>Cookies</span>, <span>Your Privacy Choices</span> and <span>AdChoice</span></p>
      </Container>
    </footer>
  )
}

export default Footer