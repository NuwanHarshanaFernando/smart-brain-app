import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
  apiKey: '2682ebf37e594c6cb330fd708e8ca695'
 });

const particlesOptions = {
  
    particles: {
      number: {
        value: 30, 
        density: {
          enable: true,
          value_area: 800
        }
      }
     
    }
  
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    //console.log('click');

    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
     // "a403429f2ddf4b49b307e318f00e528b", 
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );

  }

  render(){
    return (
      <div className="App">
          <Particles className='particles'
              params={particlesOptions}
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange = {this.onInputChange} 
          onButtonSubmit = {this.onButtonSubmit}
       />
          <FaceRecognition imageUrl={this.state.imageUrl}/> 
      </div>
    );
  }
 
}

export default App;
