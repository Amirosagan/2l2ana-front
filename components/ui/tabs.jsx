"use client";

import React, { useState } from "react";

// Tabs Container Component
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs-list flex space-x-4 w-full mt-5 shadow-sm bg-neutral-200">
        {React.Children.map(children, (child) => {
          const { label } = child.props;
          return (
            <Tab label={label} activeTab={activeTab} onClickTab={onClickTab} />
          );
        })}
      </div>
      <div className="tabs-content mt-4">
        {React.Children.map(children, (child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, activeTab, onClickTab }) => {
  const isActive = activeTab === label;

  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-all  duration-100 focus:outline-none ${
        isActive
          ? "bg-neutral-50 text-black shadow"
          : "bg-neutral-200 text-gray-700 hover:bg-white hover:text-black"
      }`}
      onClick={() => onClickTab(label)}
    >
      {label}
    </button>
  );
};

const TabPanel = ({ children }) => {
  return <div>{children}</div>;
};

export { Tabs, TabPanel };
