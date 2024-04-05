import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import menu_image from '../Assets/menu.png'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const [maxHeight, setMaxHeight] = useState("0px");

    const{getTotalCartItems}=useContext(ShopContext);
    const toggleMenu = () => {
        setMaxHeight(maxHeight === "0px" ? "220px" : "0px");
    };

    return (
        <div className='navbar'>
            <div className="menu-image">
                <img src={menu_image} alt="" onClick={toggleMenu}/>
            </div>
            <div className='nav-logo'>
                <img src={logo} alt="logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu" id="MenuItems" style={{ maxHeight: maxHeight }}>
                <li onClick={() => { setMenu("shop") }}><Link style={{textDecoration:'none'}}to='/'>Shop </Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{textDecoration:'none'}} to='/mens '>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{textDecoration:'none'}} to='/womens '>Women</Link>  {menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{textDecoration:'none'}} to='/kids '>Kids</Link>  {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>

                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;
