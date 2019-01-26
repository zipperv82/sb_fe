import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';



// background settings
const particlesOptions = {
              particles: {
                number: {
                  value: 65,
                  density: {
                    enable: true,
                    value_area: 950
                  }
                },
                color: {
                  value: "#d7197d"
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000"
                  },
                  polygon: {
                    nb_sides: 5
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                  }
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 0,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: 195.61248115909999,
                  color: "#ffffff",
                  opacity: 0.28409315098761817,
                  width: 1.5782952832645454
                },
                move: {
                  enable: true,
                  speed: 6.413648243462092,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: true,
                    rotateX: 3928.359549120531,
                    rotateY: 3848.1889460772545
                  }
                }
              },
              interactivity: {
                detect_on: "window",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab"
                  },
                  onclick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 203.7962037962038,
                    line_linked: {
                      opacity: 1
                    }
                  },
                  bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.2
                  },
                  push: {
                    particles_nb: 8
                  },
                  remove: {
                    particles_nb: 2
                  }
                }
              },
              retina_detect: true
      }
const initialState = {
  input:'',
  imageUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

// primary container component
class App extends Component {
  constructor() {
    super();
    this.state={
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

loadUser =(data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    entries: data.entries,
    joined: data.joined
    }
  });
}

 //bounding box for faces data
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

//face recog display
  displayFaceBox = (box) => {
    this.setState({box: box});
  }


// event handler for pic input
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // event handler for button click
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3001/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if (response){
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

   //change route
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
// DOM render
  render() {
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className='App'>
          <Particles className='particles'
          params={particlesOptions} />
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
         <Logo />
          { route === 'home'
          ? <div>

              <Rank name={this.state.user.name} entries={this.state.user.entries}  />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin' || route === 'signout'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>

    );
  }
}

export default App;
