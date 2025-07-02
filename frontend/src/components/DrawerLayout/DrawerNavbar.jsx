const DrawerNavbar = ({ showSidebar, toggle }) => {
  return (
    <div className="sticky top-0 z-10 bg-base-100/90 text-base-content backdrop-blur shadow-sm">
      <div className="navbar w-full py-4 px-4">
        <div className="flex flex-1 items-center gap-2">
          {showSidebar && (
            <label htmlFor="drawer-toggle" className="btn btn-ghost lg:hidden" onClick={toggle}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          )}
          <span className="font-bold text-lg">My App</span>
        </div>
      </div>
    </div>
  );
};

export default DrawerNavbar;
