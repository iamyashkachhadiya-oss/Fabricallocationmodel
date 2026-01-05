import React from 'react';
import { Brain, Settings, Users } from 'lucide-react';

interface PremiumNavigationProps {
  activeTab: 'fabric' | 'machines' | 'workers';
  onTabChange: (tab: 'fabric' | 'machines' | 'workers') => void;
}

export const PremiumNavigation: React.FC<PremiumNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { 
      id: 'fabric' as const, 
      label: 'Fabric Analysis', 
      icon: Brain, 
      description: 'Input fabric specifications',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'machines' as const, 
      label: 'Machine Fleet', 
      icon: Settings, 
      description: 'Manage weaving machines',
      color: 'from-success-500 to-success-600'
    },
    { 
      id: 'workers' as const, 
      label: 'Expert Team', 
      icon: Users, 
      description: 'Worker specializations',
      color: 'from-warning-500 to-warning-600'
    }
  ];

  return (
    <nav className="glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-8 py-4 font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-medium' 
                    : 'text-industrial-600 hover:text-purple-600 hover:bg-purple-50/50'
                  }
                  rounded-t-xl group
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20' 
                      : 'bg-industrial-100 group-hover:bg-purple-100'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{tab.label}</div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-industrial-500'}`}>
                      {tab.description}
                    </div>
                  </div>
                </div>
                
                {/* Active indicator - Fixed positioning */}
                {isActive && (
                  <div className="absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-purple-700"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
