import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RouteDetails from './RouteDetails';
import Products from './Products';
import Category from './Category';
import GoogleAuth from './GoogleAuth';
import Brand from './Brand';
import Cart from './Cart';
import Comment from './Comment';
import Coupon from './Coupon';
import Email from './Email';
import News from './News';
import Order from './Order';
import Payment from './Payment';
import Users from './Users';
import MBBank from './MBBank';
import Interface from './Interface';
import Contact from './Contact';
import Vnpay from './Vnpay';
import ChatBot from './Chatbot';  

import './css/ApiDocs.css';

const ApiDocs = () => {
  const [selectedServer, setSelectedServer] = useState('https://api-zeal.onrender.com');
  const [selectedRoute, setSelectedRoute] = useState('products');
  const [openEndpoint, setOpenEndpoint] = useState(null);

  const servers = ['https://api-zeal.onrender.com'];
  const routes = [
    { name: 'products', label: 'Products', component: Products },
    { name: 'category', label: 'Category', component: Category },
    { name: 'GoogleAuth', label: 'GoogleAuth', component: GoogleAuth },
    { name: 'brand', label: 'Brand', component: Brand },
    { name: 'cart', label: 'Cart', component: Cart },
    { name: 'comment', label: 'Comment', component: Comment },
    { name: 'coupon', label: 'Coupon', component: Coupon },
    { name: 'email', label: 'Email', component: Email },
    { name: 'news', label: 'News', component: News },
    { name: 'order', label: 'Order', component: Order },
    { name: 'users', label: 'Users', component: Users },
    { name: 'interface', label: 'Interface', component: Interface },
    { name: 'contact', label: 'Contact', component: Contact },
    { name: 'chatbot', label: 'ChatBot', component: ChatBot },
    { name: 'mbBank', label: 'MB Bank', component: MBBank },
    { name: 'vnpay', label: 'VNPay', component: Vnpay },
    { name: 'payment', label: 'Payment', component: Payment },

  ];

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setOpenEndpoint(null);
  };

  return (
    <div className="api-docs">
      <Header
        selectedServer={selectedServer}
        setSelectedServer={setSelectedServer}
        servers={servers}
      />
      <div className="api-content">
        <Sidebar
          routes={routes}
          selectedRoute={selectedRoute}
          handleRouteClick={handleRouteClick}
        />
        <RouteDetails
          routes={routes}
          selectedRoute={selectedRoute}
          openEndpoint={openEndpoint}
          setOpenEndpoint={setOpenEndpoint}
        />
      </div>
    </div>
  );
};

export default ApiDocs;