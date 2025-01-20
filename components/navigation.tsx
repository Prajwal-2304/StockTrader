import React from 'react';
import { DivideIcon as LucideIcon,Wallet,LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Section } from "./App"

type NavigationItem = {
  id: Section;
  label: string;
  icon: typeof LucideIcon;
};

type NavigationProps = {
  items: readonly NavigationItem[];
  activeSection: Section;
  onNavigate: (section: Section) => void;
  onLogout:() =>void 
};

export default function Navigation({ items, activeSection, onNavigate,onLogout }: NavigationProps) {
  return (
    <nav className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 px-4 py-6">
        <Wallet className="w-6 h-6 text-primary" />
        <span className="font-bold text-xl">CryptoTracker</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </nav>
  );
}