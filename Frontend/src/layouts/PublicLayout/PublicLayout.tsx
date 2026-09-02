import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from '../../components/layout/TopBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { StickyCTA } from '../../components/layout/StickyCTA';

export const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFB] pb-14 sm:pb-0">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};
