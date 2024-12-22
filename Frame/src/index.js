import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
// frames
import MainFrame from './frames/MainFrame';
import IntegrationFrame from './frames/IntegrationFrame';
import VideoFrame from './frames/VideoFrame';
import EbookFrame from './frames/EbookFrame';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainFrame />} />
      <Route path='/frame_2' element={<IntegrationFrame />} />
      <Route path='/VideoFrame' element={<VideoFrame />} />
      <Route path='/EbookFrame' element={<EbookFrame />} />
      
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
