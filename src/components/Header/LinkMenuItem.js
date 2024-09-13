'use client';

import React from 'react';
import { Link } from '@/src/i18n/routing';

const LinkMenuItem = ({ href, label, icon }) => {
  return (
    <Link href={href}>
      <div className="px-4 py-4 hover:bg-neutral-100 transition font-semibold tajawal-bold flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        {label}
      </div>
    </Link>
  );
};

export default LinkMenuItem;
