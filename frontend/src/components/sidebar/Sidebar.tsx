import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Side.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </div>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Book Management</h2>
        <ul>
        <li onClick={() => handleNavigation('/')}>🏠 Home</li>
          <li onClick={() => handleNavigation('/my-books')}>📖 My Books</li>
          <li onClick={() => handleNavigation('/add-book')}>📚 Add Book</li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
