
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Check if we're on an exam session page - if so, render without header/footer
  const isExamSession = location.pathname.includes('/exam/session/');
  
  if (isExamSession) {
    return <main className="min-h-screen bg-gradient-to-br from-background to-accent/20">{children}</main>;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-accent/20">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
