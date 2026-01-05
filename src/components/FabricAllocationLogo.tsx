import React from 'react';

export const FabricAllocationLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        {/* Unique Font Logo */}
        <h1 className="text-3xl md:text-4xl font-bold text-gradient" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
          Fabric Allocation Model
        </h1>
        
        {/* Decorative underline */}
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-full opacity-80"></div>
      </div>
    </div>
  );
};
