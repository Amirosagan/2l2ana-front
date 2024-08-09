'use client';

import React from 'react';

const MenuItem = ({ onClick, label, icon }) => {
  return (
    <div 
      onClick={onClick}
      className="px-4 py-4 hover:bg-neutral-100 transition font-semibold tajawal-bold flex items-center gap-2"
    >
      {icon && <span className="text-primary">{icon}</span>}
      {label}
    </div>
  );
}

export default MenuItem;
