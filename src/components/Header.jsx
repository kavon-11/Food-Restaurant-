import Logo from "../assets/logo.jpg";
import Contact from "./Contact";
import Cart from "./Cart";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const items= useSelector((state) => state.items);
  const [showContact, setShowContact] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleContactClick = () => {
    setShowContact(!showContact);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
    setShowContact(false);
  };

  return (
    <>
      <header id="main-header">
        <div id="title">
          <h1>KEVIN</h1>
          <img src={Logo} alt="logo" />
        </div>
        <button id="menu-btn" onClick={handleCartClick}>
          Cart {`(${items.length})`}
        </button>
        <button id="menu-btn" onClick={handleContactClick}>
          Contact
        </button>
      </header>

      {showContact && <Contact onClose={handleContactClick} />}
      {showCart && <Cart/> }
    </>
  );
}
