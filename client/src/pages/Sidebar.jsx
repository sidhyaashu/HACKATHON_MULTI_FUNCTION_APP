import { motion } from "framer-motion";
import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AddLinkIcon from '@mui/icons-material/AddLink';
import FolderIcon from '@mui/icons-material/Folder';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger icon
import { Drawer, IconButton } from '@mui/material'; // MUI components for Drawer and Button

// Custom hook to handle media queries for different breakpoints
const useMediaQuery = (width) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const updateMedia = () => setIsBreakpoint(window.innerWidth < width);
    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [width]);

  return isBreakpoint;
};

const Sidebar = () => {
  // Handle breakpoints for different screen sizes
  const isExtraSmall = useMediaQuery(600);  // Phones and below
  const isSmall = useMediaQuery(768);       // Portrait tablets, large phones
  const isMobileOrTablet = isSmall || isExtraSmall;

  // Control sidebar expansion and mobile drawer
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state

  // Sidebar content to be reused in both regular and drawer views
  const sidebarContent = (
    <motion.div
      initial={{ width: isExpanded ? 64 : 16 }}
      animate={{ width: isExpanded ? 256 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-blue-800 text-white flex flex-col h-full"
    >
      <div className="flex justify-center items-center p-4 bg-blue-700">
        <NavLink to="/" className="text-lg font-semibold">ZERO</NavLink>
      </div>

      <nav className="flex flex-col p-4 space-y-4">
        {[
          { to: "/home/url-to-ss", icon: <AddLinkIcon />, label: "URL TO SS" },
          { to: "/home/random-data-generator", icon: <FolderIcon />, label: "RANDOM DATA" },
          { to: "/home/qr-generator", icon: <QrCodeIcon />, label: "QR GENERATOR" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center hover:bg-blue-600 p-2 rounded-lg transition-colors duration-200"
            onClick={() => isMobileOrTablet && setIsDrawerOpen(false)} // Close the drawer on click
          >
            {icon}
            <span className="ml-2 text-sm">{label}</span>
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );

  return (
    <motion.div className="flex h-screen">
      {/* Sidebar: hidden if screen is smaller than 768px */}
      {!isMobileOrTablet && (
        <motion.div
          initial={{ width: isExpanded ? 64 : 16 }}
          animate={{ width: isExpanded ? 256 : 64 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-blue-800 text-white flex flex-col h-full fixed"
        >
          {sidebarContent}
        </motion.div>
      )}

      {/* Main Content */}
      <div className={`flex-grow ${!isMobileOrTablet ? 'ml-64' : 'ml-0'}`}>
        <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
          <NavLink to='/' className="text-lg font-semibold">ZERO TO ONE</NavLink>

          {/* Hamburger button for mobile/tablet */}
          {isMobileOrTablet && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)} // Open the drawer
            >
              <MenuIcon />
            </IconButton>
          )}
        </header>

        <main className="flex-grow container mx-auto p-4 overflow-y-auto">
          <div className="flex flex-col h-full rounded-lg p-4">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Drawer for mobile/tablet sidebar */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} // Close the drawer
        PaperProps={{
          style: { width: isExpanded ? 256 : 64 }, // Set drawer width dynamically
        }}
      >
        {sidebarContent}
      </Drawer>
    </motion.div>
  );
};

export default Sidebar;
