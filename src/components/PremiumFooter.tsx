import React from 'react';
import { Brain, Github, Mail, Globe } from 'lucide-react';

export const PremiumFooter: React.FC = () => {
  return (
    <footer className="glass border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white mr-4">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-industrial-900">Fabric Allocation Model</h3>
                <p className="text-sm text-industrial-600">Weaving Knowledge Base</p>
              </div>
            </div>
            <p className="text-sm text-industrial-600 leading-relaxed">
              Advanced domain expertise system for textile production managers, 
              powered by 25+ years of real-world weaving experience.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-industrial-900">Key Features</h4>
            <ul className="space-y-2 text-sm text-industrial-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                Real-world fabric analysis
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                Machine compatibility assessment
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                Worker specialization matching
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                Factory constraint modeling
              </li>
            </ul>
          </div>

          {/* Credits Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-industrial-900">Credits</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-industrial-900">Made by Yash Kachhadiya</p>
                  <p className="text-xs text-industrial-600">Senior Textile Technologist</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-industrial-100 rounded-lg">
                  <Mail className="w-4 h-4 text-industrial-600" />
                </div>
                <a 
                  href="mailto:yash@example.com" 
                  className="text-sm text-industrial-600 hover:text-purple-600 transition-colors"
                >
                  Contact Developer
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-industrial-100 rounded-lg">
                  <Github className="w-4 h-4 text-industrial-600" />
                </div>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-industrial-600 hover:text-purple-600 transition-colors"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-industrial-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-industrial-600">
              © 2024 Fabric Allocation Model. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-industrial-600">
              <span>Powered by Advanced Textile Intelligence</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>25+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
