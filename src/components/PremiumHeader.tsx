import React from 'react';
import { FabricAllocationLogo } from './FabricAllocationLogo';
import { Settings, User } from 'lucide-react';

export const PremiumHeader: React.FC = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Brand */}
          <div className="flex-1">
            <FabricAllocationLogo />
          </div>

          {/* Stats/Info */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Settings className="w-4 h-4 text-success-600" />
              <span className="text-industrial-700 font-medium">Real-World Logic</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4 text-warning-600" />
              <span className="text-industrial-700 font-medium">25+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
