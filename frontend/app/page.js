import Image from 'next/image';
import Navbar from './component/navbar/Navbar';
import { Link } from '@mui/material';
import "./page.module.css";
import { Padding } from '@mui/icons-material';
import Home from './component/home/Home';


export default function page() {
  return (
    <div>
      <Navbar />
      {/* Rest of your home page content */}
      <Home/>
    </div>
  );
}
