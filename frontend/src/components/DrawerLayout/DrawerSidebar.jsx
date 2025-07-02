const DrawerSidebar = ({ close }) => {
  return (
    <div className="drawer-side z-40">
      <label htmlFor="drawer-toggle" className="drawer-overlay" onClick={close} />
      <aside className="min-h-screen w-80 bg-base-100">
        <div className="sticky top-0 z-20 flex items-center gap-2 p-4 backdrop-blur">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="font-bold text-lg">My App</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="p-3 rounded bg-base-200">Placeholder 1</div>
          <div className="p-3 rounded bg-base-200">Placeholder 2</div>
          <div className="p-3 rounded bg-base-200">Placeholder 3</div>
        </div>
      </aside>
    </div>
  );
};

export default DrawerSidebar;
