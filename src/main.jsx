import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './index.jsx'
import "react-lazy-load-image-component/src/effects/blur.css";

createRoot(document.getElementById("root")).render(
  <>

    <Navbar />
  </>
);
