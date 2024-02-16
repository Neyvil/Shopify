import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {FaHeart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"; 
import './Navigation.css'

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)


  return (
    <>
      <h1>Navigation</h1>
    </>
  );
};

export default Navigation;
