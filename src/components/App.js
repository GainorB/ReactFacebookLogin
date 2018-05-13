import React, { Component, Fragment } from 'react';
import FacebookLogin from 'react-facebook-login';

class App extends Component {
  state = {
    isLoggedIn: false,
    name: '',
    email: '',
    picture: '',
  };

  componentClicked = () => {
    console.log('clicked');
  };

  responseFacebook = response => {
    // console.log(response);
    const { name, email, picture } = response;
    this.setState({
      isLoggedIn: true,
      name,
      email,
      picture: picture.data.url,
    });
  };

  render() {
    let fbContent;
    const { isLoggedIn, picture, name, email } = this.state;
    if (isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <img src={picture} alt={name} />
          <h2>Welcome {name}</h2>
          Email: {email}
        </div>
      );
    } else {
      fbContent = (
        <Fragment>
          <h2>To get started, authenticate with Facebook</h2>
          <FacebookLogin
            appId={process.env.FACEBOOK_APPID}
            autoLoad
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </Fragment>
      );
    }

    return <Fragment>{fbContent}</Fragment>;
  }
}

export default App;
