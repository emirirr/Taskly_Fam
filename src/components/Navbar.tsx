import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => (
  <nav className={styles.container}>
    <NavLink to="/dashboard" className={styles.link}>Dashboard</NavLink>
    <NavLink to="/tasks" className={styles.link}>Görevler</NavLink>
    <NavLink to="/shopping" className={styles.link}>Alışveriş</NavLink>
    <NavLink to="/members" className={styles.link}>Aile</NavLink>
    <NavLink to="/profile" className={styles.link}>Profil</NavLink>
  </nav>
);

export default Navbar;
