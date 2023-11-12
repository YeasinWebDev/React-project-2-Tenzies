// import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';


const show = createRoot(document.getElementById("root"))
show.render(<App />)