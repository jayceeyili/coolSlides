import React from 'react';
import Upload from '../uploader/Upload.jsx';
import style from './style.css';
import Login from '../../containers/loginContainer.js';

class NavBar extends React.Component {
  constructor() {
    super()
  }

  render() {
    var nav = `${style.nav}`

    return (
      <div className={nav}>
        <Login />
        <Upload />
      </div>
    )
  }
}

export default NavBar;
