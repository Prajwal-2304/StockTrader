"use client"
import React, { useState } from 'react';
import { Layout, LayoutDashboard, Wallet, Rocket, BanknoteIcon } from 'lucide-react';
import Navigation from './navigation';
import WatchlistSection from './watchlistsection';
import PortfolioSection from './portfolio';
import TokenLaunchSection from './token';
import ManageFundsSection from './managefunds';
import { signOut, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
export type Section = 'watchlist' | 'portfolio' | 'token-launch' | 'manage-funds';

const navigationItems = [
  { id: 'watchlist', label: 'Watchlist', icon: Layout },
  { id: 'portfolio', label: 'Portfolio', icon: LayoutDashboard },
  { id: 'token-launch', label: 'Token Launch', icon: Rocket },
  { id: 'manage-funds', label: 'Manage Funds', icon: BanknoteIcon },
] as const;

function App() {
  const [activeSection, setActiveSection] = useState<Section>('watchlist');
  
const router =useRouter()
  const handleLogout = async () =>{
      await signOut({redirect:false})
      router.replace("/")
  }
  const renderSection = () => {
    switch (activeSection) {
      case 'watchlist':
        return <WatchlistSection />;
      case 'portfolio':
        return <PortfolioSection />;
      case 'token-launch':
        return <TokenLaunchSection />;
      case 'manage-funds':
        return <ManageFundsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Navigation 
          items={navigationItems}
          activeSection={activeSection}
          onNavigate={setActiveSection}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;