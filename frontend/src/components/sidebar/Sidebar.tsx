import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Side.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activateOutsideClick, setActivateOutsideClick] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Delay outside click activation to prevent instant close
  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = setTimeout(() => {
        setActivateOutsideClick(true);
      }, 100); // Delay outside click for 100ms
    } else {
      setActivateOutsideClick(false);
    }
  
    return () => clearTimeout(timer);
  }, [isOpen]);
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activateOutsideClick &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains('hamburger-bar')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activateOutsideClick]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="hamburger-bar" />
        <div className="hamburger-bar" />
        <div className="hamburger-bar" />
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>📚 Book App</h2>
        <ul>
          <li onClick={() => handleNavigation('/')}>🏠 Home</li>
          <li onClick={() => handleNavigation('/my-books')}>📖 My Books</li>
          <li onClick={() => handleNavigation('/add-book')}>➕ Add Book</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
