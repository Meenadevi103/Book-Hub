import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import UserManagement from "./components/UserManagement/UserManagement";
import CatalogManagement from "./components/CatalogManagement/CatalogManagement";

// Home Page Component
function HomePage() {
  return (
    <div style={styles.homePage}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>📚 Book Hub</h1>
          <p style={styles.heroSubtitle}>
            Your Complete Library Management Solution
          </p>
          <p style={styles.heroDescription}>
            Efficiently manage users, organize catalogs, and streamline your library operations with our comprehensive system.
          </p>
          
          <div style={styles.features}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>👥</div>
              <h3 style={styles.featureTitle}>User Management</h3>
              <p style={styles.featureText}>
                Add, update, delete, and search for librarians and patrons with ease.
              </p>
              <Link to="/users" style={styles.featureButton}>
                Manage Users →
              </Link>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📖</div>
              <h3 style={styles.featureTitle}>Catalog Management</h3>
              <p style={styles.featureText}>
                Organize your book collection with complete CRUD operations and search functionality.
              </p>
              <Link to="/catalog" style={styles.featureButton}>
                Manage Catalog →
              </Link>
            </div>
          </div>

          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>∞</div>
              <div style={styles.statLabel}>Books</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>∞</div>
              <div style={styles.statLabel}>Users</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>100%</div>
              <div style={styles.statLabel}>Organized</div>
            </div>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Book Hub. Built with React & Django.</p>
        <p style={styles.footerCredit}>
          Developed by <strong>Meenadevi Ravikumar</strong> | MCA Student
        </p>
      </footer>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          📚 <span style={styles.logoText}>Book Hub</span>
        </Link>
        
        <div style={styles.navLinks}>
          <Link 
            to="/" 
            style={{
              ...styles.navLink,
              ...(isActive('/') ? styles.navLinkActive : {})
            }}
          >
            Home
          </Link>
          <Link 
            to="/users" 
            style={{
              ...styles.navLink,
              ...(isActive('/users') ? styles.navLinkActive : {})
            }}
          >
            User Management
          </Link>
          <Link 
            to="/catalog" 
            style={{
              ...styles.navLink,
              ...(isActive('/catalog') ? styles.navLinkActive : {})
            }}
          >
            Catalog Management
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navigation />
        <div style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/catalog" element={<CatalogManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Styles
const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  
  // Navigation Styles
  navbar: {
    backgroundColor: "#2c3e50",
    padding: "1rem 0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoText: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
  },
  navLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    transition: "all 0.3s ease",
  },
  navLinkActive: {
    backgroundColor: "#34495e",
    color: "#fff",
  },
  
  // Main Content
  mainContent: {
    minHeight: "calc(100vh - 70px)",
  },
  
  // Home Page Styles
  homePage: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
  },
  hero: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "4rem 2rem",
    color: "#fff",
  },
  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "3.5rem",
    marginBottom: "1rem",
    fontWeight: "700",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
    opacity: 0.9,
  },
  heroDescription: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "3rem",
    opacity: 0.8,
    maxWidth: "800px",
    margin: "0 auto 3rem",
  },
  
  // Features Section
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.5rem",
    color: "#2c3e50",
    marginBottom: "1rem",
    fontWeight: "600",
  },
  featureText: {
    color: "#7f8c8d",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },
  featureButton: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#667eea",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  
  // Stats Section
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "4rem",
    marginTop: "3rem",
    padding: "2rem",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  statLabel: {
    fontSize: "1rem",
    opacity: 0.9,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  
  // Footer
  footer: {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    textAlign: "center",
    padding: "2rem",
    marginTop: "auto",
  },
  footerCredit: {
    marginTop: "0.5rem",
    opacity: 0.8,
  },
};

export default App;
