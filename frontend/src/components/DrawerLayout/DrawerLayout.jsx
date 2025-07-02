import { useState } from 'react';
import DrawerToggleInput from './DrawerToggleInput';
import DrawerNavbar from './DrawerNavbar';
import DrawerSidebar from './DrawerSidebar';

const DrawerLayout = ({ children, showSidebar = true }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className={`drawer bg-base-100 mx-auto max-w-[100rem] ${showSidebar ? 'lg:drawer-open' : ''} min-h-screen`}>
      <DrawerToggleInput isOpen={isDrawerOpen} toggle={toggleDrawer} />

      <div className="drawer-content flex flex-col">
        <DrawerNavbar showSidebar={showSidebar} toggle={toggleDrawer} />
        <main className="p-6">{children}</main>
      </div>

      {showSidebar && <DrawerSidebar close={closeDrawer} />}
    </div>
  );
};

export default DrawerLayout;
