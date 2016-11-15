import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {
  return (
    <div className="static-sidebar">
      <h1 className="sidebar-title">{props.title}</h1>
      <ul>
      </ul>
    </div>
  );
};

export default Sidebar;
