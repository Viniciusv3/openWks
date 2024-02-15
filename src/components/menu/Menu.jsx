import React from 'react';
import "./Menu.css"
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Dashboard
      </a>
    </Menu>
  );
};