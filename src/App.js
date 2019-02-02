import React, { Component } from 'react';
import Logo from './components/logo/Logo';
import ImageLink from './components/imagelink/ImageLink';
import FaceRecognition from './components/facerec/FaceRecognition';
import NameHolder from './components/nameholder/NameHolder';
import './App.css';
import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

const apiKey = '';

const app = new Clarifai.App({
  apiKey: apiKey
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  celebrity: '',

};

class App extends Component {


  constructor(props) {
    super(props);
    this.state = initialState;

  }


  calculateFace = (data) => {
    const boxdata = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);


    return {
      leftCol: boxdata.left_col * width,
      topRow: boxdata.top_row * height,
      rightCol: width - (boxdata.right_col * width),
      bottomRow: height - (boxdata.bottom_row * height)
    }

  };

  displayFaceBox = (box) => {
    this.setState({box: box})
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  };

  onSubmit = () => {

    let model = "e466caa0619f444ab97497640cefc4dc";
    this.setState({imageUrl: this.state.input});

    app.models.predict(model, this.state.input).then((response) => {
          this.setState({celebrity: response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'][0].name.toUpperCase()});
          this.displayFaceBox(this.calculateFace(response));
          console.log(response['outputs'][0]['data']['regions'][0]['data']['face']['identity']['concepts'])
        },
        function (err) {
          this.setState({celebrity: "Face cannot recognize, please try another picture"})
        }
    ).catch(err => console.log(err));

  };







  render() {

    const { imageUrl, box, celebrity} = this.state;

    return (
        <div className="App">
          <Particles className='particles' params={particlesOptions}/>
          <Logo />
          <ImageLink onChange={this.onInputChange} onSubmit={this.onSubmit} />
          <NameHolder printName={celebrity} urlState={imageUrl} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
    );
  }
}

export default App;
