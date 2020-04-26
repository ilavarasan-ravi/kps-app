import React from 'react';
import { Link } from 'react-router-dom'
import './header.styles.scss'
// import { ReactComponent as Logo1 } from '../../assets/kps.svg'
import KPSLogo from '../../assets/images/KPSLogo.png'

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to="/">
            {/* <KPSLogo className='logo' /> */}
            <img src={KPSLogo} className='logo' />
            {/* <img className="logo" src="../../assets/images/KPSLogo.png" alt="logo" /> */}
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/contact">
                CONTACT
            </Link>
        </div>
    </div>
)
export default Header;