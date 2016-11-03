import React from 'react';
import { Link, hashHistory } from 'react-router';
import Modal from 'react-modal';
import AuthFormContainer from '../auth_form/auth_form_container';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, formType: "login" };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(formType) {
    this.setState({modalIsOpen: true, formType: formType });
  }

  componentWillMount() {
    Modal.setAppElement('body');
 }

 closeModal() {
    this.setState({modalIsOpen: false});
    this.props.clearErrors();
  }

  loggedInNav() {
    return (
      <nav className="nav">
        <Link to="/bookings" id="trips">Trips</Link>
        <li id="user-name">{this.props.currentUser.name}</li>
        <ul className="header-list">
          <li id="user-icon">
            <img src={this.props.currentUser.image_url}/>
          </li>
            <ul id="user-dropdown">
              <li>
               <Link to={`/users/${this.props.currentUser.id}`}>My Profile</Link>
              </li>
              <li>
                <Link id="logout" onClick={this.props.logout}>Log Out</Link>
              </li>
            </ul>
          </ul>
      </nav>
    );
  }

  componentWillReceiveProps() {
    this.setState({modalIsOpen: false});
  }

  loggedOutNav() {

    return (
      <nav className="nav">
        <button className="logged-out-button"
          onClick={() => this.openModal("signup")}>Sign Up</button>
        <button className="logged-out-button"
          onClick={() => this.openModal("login")}>Log In</button>
        <button className="logged-out-button"
          onClick={() => this.props.login({username:"LordCommander", password:"jonsno"})}>Demo</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}>
          <div>
            <AuthFormContainer formType={this.state.formType} closeModal={this.closeModal}/>
          </div>
        </Modal>
      </nav>
    );
  }

  render() {
    let nav;
    if (this.props.loggedIn) {
      nav = this.loggedInNav();
    } else {
      nav = this.loggedOutNav();
    }

    return (
      <div className="header-box">
          <ul className="group">
            <a href="#">
            <img src="http://res.cloudinary.com/dbsxgncvx/image/upload/v1478035701/logo3_up1bhc.png"/></a>
            <li id="header-logo">
              <a href="#">
              <span id="title">A<span id="first-little">ir</span>G<span id="second-little">o</span>T</span> <br/>
              <span id="caption">A Game of Thrones AirBnB</span></a>
            </li>
            <input className="search" type="text" placeholder="Search"></input>
          </ul>
          {nav}
      </div>

    );
  }
}

export default Header;