import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

function Drawer({ showSidebar, children }) {

  const getLinkClasses = ({ isActive }) =>
    isActive
      ? 'bg-primary text-white font-semibold rounded-md'
      : 'hover:bg-base-200 rounded-md';

  return (
    <div className={`drawer ${showSidebar ? 'lg:drawer-open' : ''} overflow-hidden h-screen w-screen`}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-auto flex flex-col">
        <Navbar hasSidebar={showSidebar}/>
        {/*  Content */}
        {children}
      </div>
      {showSidebar && (
        <div className="drawer-side lg:hidden h-full z-40 lg:z-30">
            <Link to="/" className="bg-base-300 navbar sticky top-0 z-20 hidden items-center gap-2 px-4 py-0 backdrop-blur flex-1 text-xl font-bold lg:flex "><h1>Telvy</h1></Link>
          <label htmlFor="my-drawer" className="drawer-overlay" />
          {/* Sidebar Content */}
          <ul className="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
             <li><NavLink to="/home" className={getLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/quizzes" className={getLinkClasses}>Quizzes</NavLink></li>
            <li><NavLink to="/groups" className={getLinkClasses}>Groups</NavLink></li>
            <li><NavLink to="/notifications" className={getLinkClasses}>Notifications</NavLink></li>
            <li><NavLink to="/settings" className={getLinkClasses}>Settings</NavLink></li>
            <li><NavLink to="/help" className={getLinkClasses}>Help & Feedback</NavLink></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Drawer