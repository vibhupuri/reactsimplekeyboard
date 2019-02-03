import React, { Component } from 'react';

import Keyboard from '../lib';

import './css/App.css';
 

class App extends Component {
  state = {
    input: '',
    layoutName: 'default',
    inputField:Element,
  
  firstNameLabel :"First Name",

  lastNameLabel :"Last Name",

  language : "Hindi",
 
  KeyboardStyle : {display:"none"}

  }
 
  


  keyboard = React.createRef()

  SwitchLang=()=>{
    if(this.state.language=="Hindi")
  this.setState({
   firstNameLabel : "प्रथम नाम",
  lastNameLabel : "कुलनाम",
 language : "English",
  KeyboardStyle : {display:"none"}
  }) 
  else
  this.setState({
    firstNameLabel : "First Name",
   lastNameLabel : "Last Name",
  language : "Hindi",
   KeyboardStyle : {display:"none"}
   }) 
}
  
  onChange = (input) => {this.setState({ input }, () => console.log('Input changed', input));}

  onKeyPress = button => {
    console.log('Button pressed', button);

    /**
     * Shift functionality
     */
    if(['{capslock}', '{shiftleft}', '{shiftright}', '{shift}'].includes(button))
      this.handleShiftButton();
  }

  handleShiftButton = () => {
    const { state: { layoutName } } = this;
    const shiftToggle = layoutName === 'default' ? 'shift' : 'default';

    this.setState({ layoutName: shiftToggle });
  }

  onChangeInput = event => {
    debugger;
    const input = event.target.value;
    const inputField = event.target;
    //if(this.state.language=="Hindi")
    this.setState({ input: event.target.value,inputField:event.target},
       
      () =>{ 
        this.keyboard.current.setInput(input,"fn")
       
  });
    
  };
  getInput = event =>{
    const input = event.target.value;
    const inputField = event.target;
    this.setState({ input: event.target.value,inputField:event.target}, 
      () =>{ 
        this.keyboard.current.getInput("fn")
  
  });
    // debugger;
    // if(this.refs.firstname==this.state.inputField)
    // this.refs.firstname.value = input;
    // else if(this.refs.lastname==this.state.inputField)
    // this.refs.lastname.value = input;
  };
  onFocus = event =>{
    if(this.state.language=="English")
   this.setState({KeyboardStyle:{display:"block"}});
  };
  onBlur = event =>{
    this.setState({KeyboardStyle:{display:"none"}});
  }
  render() {
    const { keyboard, state: { input, layoutName },getInput, onChangeInput, onChange, onKeyPress ,onFocus ,onBlur } = this

    return (
      <div className='demoPage'>
      <div id="page-wrapper" ref="pagewrapper">
  <h1>Bilingual Audio/Virtual Keyboard Demo</h1>
  
  <p id="msg" ref="msg"></p>
<label>{this.state.firstNameLabel} :</label>
  <input type="text" name="speech-msg" id="speech-msg" ref="firstname" value={input} getInput={input}   inputName="fn"  onChange={onChangeInput} onFocus={onFocus}   x-webkit-speech/>
  <div className='screenContainer' style={{display:"none"}}>
          <textarea className='inputContainer' value={input}  onChange={onChangeInput} />
        </div>
        <div style={{display:this.state.KeyboardStyle.display}}>
       <Keyboard
          ref={keyboard}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          layoutName={layoutName}
          newLineOnEnter
          physicalKeyboardHighlight
          layout={{
            'default': [
              '` १ २ ३ ४ ५ ६ ७ ८ ९ 0 - = {bksp}',
              '{tab} ब भ द ड ध ढ ग घ ह ज [ ] \\',
              '{lock} झ य क ख म न ञ ण ङ ; \' {enter}',
              '{shift} ल प फ र स ष श , . / {shift}',
              '.com @ {space}'
            ],
            'shift': [
              'ो ऐ इ उ ऋ # @ % ^ & * ( ) + {bksp}',
              '{tab} ै अ च छ त ट U ृ . ी { } |',
              '{lock} ा	 थ ठ व व . े . ु : " {enter}',
              '{shift} ि . ॉ . ौ . ू < > ? {shift}',
              '.com @ {space}'
            ]
          }}
          theme='hg-layout-default hg-theme-default'
          debug
        />
        </div>
      </div>
  <label style={{display:"none"}}>{this.state.lastNameLabel} :</label>
  <input style={{display:"none"}} type="text" name="speech-msg" id="speech-msg" ref="lastname" value ={input} getInput={input}    inputName="ln" onChange={onChangeInput}   x-webkit-speech/>
	 
	<div class="option" style={{display:"none"}}>
		<label for="volume">Volume</label>
		<input type="range" min="0" max="1" step="0.1" name="volume" id="volume" ref="volume" value="1"/>
	</div>
	<div class="option" style={{display:"none"}}>
		<label for="rate">Rate</label>
		<input type="range" min="0.1" max="10" step="0.1" name="rate" id="rate" ref="rate" value="1"/>
	</div>
	<div class="option" style={{display:"none"}}>
		<label for="pitch">Pitch</label>
		<input type="range" min="0" max="2" step="0.1" name="pitch" id="pitch" ref="pitch" value="1"/>
	</div>

	<button id="speak" ref="speak" onClick={this.SwitchLang}>Switch to {this.state.language}</button>
  
</div>
       
    );
  }
componentDidMount(){
  /*
 * Check for browser support
 */
var supportMsg = this.refs.msg;

if ('speechSynthesis' in window) {
	supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
} else {
	supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
	supportMsg.classList.add('not-supported');
}


// Get the 'speak' button
var button = this.refs.speak;

// Get the text input element.

var speechMsgInput = this.speechmsg;

// Get the voice select element.
//var voiceSelect = this.refs.voice;

// Get the attribute controls.
var volumeInput = this.refs.volume;
var rateInput = this.refs.rate;
var pitchInput = this.refs.pitch;

//कृपया अपना प्रथम नाम लिखें
//कुलनाम
// Fetch the list of voices and populate the voice options.
// function loadVoices() {
//   // Fetch the available voices.
// 	var voices = speechSynthesis.getVoices();
  
//   // Loop through each of the voices.
// 	voices.forEach(function(voice, i) {
//     // Create a new option element.
// 		//var option = document.createElement('option');
    
//     // Set the options value and text.
// 		console.log(voice.name);
// 		//option.innerHTML = voice.name;
		  
//     // Add the option to the voice selector.
// 		//voiceSelect.appendChild(option);
// 	});
// }

// Execute loadVoices.
//loadVoices();

// Chrome loads voices asynchronously.
// window.speechSynthesis.onvoiceschanged = function(e) {
//   loadVoices();
// };


// Create a new utterance for the specified text and add it to
// the queue.
function speak(node) {
   
  // Create a new instance of SpeechSynthesisUtterance.
  if(document.querySelector("#speak").textContent.includes("Hindi")){
	var msg = new SpeechSynthesisUtterance('Google US English');
  if(node=="firstname")
	msg.text = "Please Enter Your First Name";
  else
  msg.text ="Please Enter Your Last Name";
  }
  else{
    var msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices().filter(
      (voice)=>{if(voice.lang=="hi-IN") return voice})[0];
    if(node=="firstname")
    msg.text = "कृपया अपना प्रथम नाम लिखें";
    else
    msg.text ="कृपया अपना कुलनाम लिखें"; 
  }

  // Set the attributes.
	msg.volume = parseFloat(volumeInput.value);
	msg.rate = parseFloat(rateInput.value);
	msg.pitch = parseFloat(pitchInput.value);
  
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	//if (voiceSelect.value) {
	//	msg.voice ='Google US English';
	//}
  
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}


// Set up an event listener for when the 'speak' button is clicked.
this.refs.firstname.addEventListener('click', function(e) {
// 	if (speechMsgInput.value.length > 0) {
		speak("firstname");
//	}
 }); 
 this.refs.lastname.addEventListener('click', function(e) {
  // 	if (speechMsgInput.value.length > 0) {
      speak("lastname");
  //	}
   });   
}
}

export default App;
