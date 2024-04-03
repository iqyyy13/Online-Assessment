import './App.css';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleDown} from 'react-icons/fa';
import Select from 'react-select'
import Etherium from './components/Etherium';
import Luna from './components/Luna';
import OKB from './components/OKB';

//importing overlays
import Overlay from './components/Overlay/index';
import COINBASE from './components/Overlay/coinbase';
import WalletConnect from './components/Overlay/walletconnect';

//impoting slidingpanes
import SlidingPane from "react-sliding-pane"
import "react-sliding-pane/dist/react-sliding-pane.css";

//importing cryptowallet images
import uniswap from "./components/uniswap.png";
import metamask from "./components/metamask.png";
import walletconnect from "./components/walletconnect.png";
import coinbasewallet from "./components/coinbasewallet.png";

const options = [
  {value: 'LUNA', label: 'Luna', icon: <Luna/>},
  {value: 'ETH', label: 'Etherium', icon: <Etherium/>},
  {value: 'OKB', label: 'OKB', icon: <OKB/>},
]

const cryptoPrices = {
  ETH: 1645.93,
  LUNA: 0.41,
  OKB: 42.98,
};

const CustomOption = ({data, innerRef, innerProps, isFocused}) => (
  <div
    ref = {innerRef}
    {...innerProps}
    style = {{
      backgroundColor: isFocused ? 'lightblue' : 'white',
      padding: "5px"
    }}
  >
    {data.icon} {data.label}
  </div>
);

const CustomSingleValue = ({data}) => (
  data ? (
    <div style = {{display: 'flex', alignItems: 'center', marginTop: '-30px'}}>
      {data.icon}
      <span style={{marginLeft:'5px'}}>{data.label}</span>
    </div>
  ) : null
);

function App() {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [price1, setPrice1] = useState(1);
  const [price2, setPrice2] = useState(1);
  const [userInput1, setUserInput1] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [amount1, setamount1] = useState('');
  const [amount2, setamount2] = useState('');

  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlay3, setShowOverlay3] = useState(false);
  const [showOverlay4, setShowOverlay4] = useState(false);


  const [state, setState] = useState({
    isScreenOpen: false,
  });

  const handleSelector1Change = (selectedOption) => {
    setSelectedOption1(selectedOption);
    if(selectedOption && selectedOption.value === selectedOption2?.value) {
      setSelectedOption2(null);
    }
    setPrice1(selectedOption ? cryptoPrices[selectedOption.value] : 1);
  };

  const handleSelector2Change = (selectedOption) => {
    setSelectedOption2(selectedOption);
    if(selectedOption && selectedOption.value === selectedOption1?.value) {
      setSelectedOption1(null);
    }
    setPrice2(selectedOption ? cryptoPrices[selectedOption.value] : 1);
  };

  const handleSwap = () => {
    const tempOption = selectedOption1;
    setSelectedOption1(selectedOption2);
    setSelectedOption2(tempOption);

    const tempInput = userInput2;
    setUserInput2(userInput1);
    setUserInput1(tempInput);

    setPrice1(selectedOption2 ? cryptoPrices[selectedOption2.value] : 1);
    setPrice2(selectedOption1 ? cryptoPrices[selectedOption1.value] : 1);
  }

  const handleInputChange1 = (event) => {
    const newValue = parseFloat(event.target.value);
    setUserInput1(event.target.value);
    setUserInput2((newValue * price1 / price2).toFixed(4));
    setamount1(newValue * price1);
  }

  useEffect(() => {
    setamount2(amount1);
  },[amount1]);

  const handleInputChange2 = (event) => {
    const newValue = parseFloat(event.target.value);
    setUserInput2(event.target.value);
    setUserInput1((newValue * price2 / price1).toFixed(4));
    setamount2(newValue * price2);
  }

  useEffect(() => {
    setamount1(amount2);
  },[amount2]);

  const handleIconClick = () => {
    console.log("clicked");
    toggleOverlay();
  }

  const handleIconClick3 = () => {
    console.log("clicked");
    toggleOverlay3();
  }

  const handleIconClick4 = () => {
    console.log("clicked");
    toggleOverlay4();
  }

  const toggleOverlay = () => {
    console.log("toggling")
    setShowOverlay(!showOverlay);
  }

  const toggleOverlay3 = () => {
    console.log("toggling")
    setShowOverlay3(!showOverlay3);
  }

  const toggleOverlay4 = () => {
    console.log("toggling")
    setShowOverlay4(!showOverlay4);
  }

  const handleIconClick2 = () => {
    console.log("clicked");
    window.open("https://metamask.io", "_blank");
  }

  return (
    <div className='container'>
      <button className='swap-button'>Swap</button>
      <div className='rectangle'>
        <span className='label'>You pay</span>
        <input 
          type = "text" 
          placeholder='0'
          value={userInput1}
          onChange={handleInputChange1}
        />
        <div style ={{ opacity: '0.7', marginTop: '10px', color: 'white'}} > {amount1} </div>
        <div style = {{width:'175px', marginLeft: '235px', marginTop: '-65px' }}>
          <Select 
            options={options}
            value={selectedOption1}
            onChange={handleSelector1Change}
            components={{Option: CustomOption, SingleValue: CustomSingleValue}}
            placeholder="Select token"
          />
        </div>
      </div>
      <button className='arrow-button' onClick={handleSwap}>
        <FaArrowAltCircleDown className='arrow-icon'/>
      </button>
      <div className='rectangle'>
        <span className='label'>You receive</span>
        <input 
          type = "text" 
          placeholder='0'
          value={userInput2}
          onChange={handleInputChange2}
        />
        <div style ={{ opacity: '0.7', marginTop: '10px', color: 'white'}} > {amount2} </div>
        <div style = {{width:'175px', marginLeft: '235px', marginTop: '-65px'}}>
          <Select
            options = {options}
            value={selectedOption2}
            onChange={handleSelector2Change}
            components={{Option: CustomOption, SingleValue:CustomSingleValue}}
            placeholder="Select token"
          />
        </div>
      </div>

      <Overlay isOpen={showOverlay} onClose={toggleOverlay}></Overlay>
      <WalletConnect isOpen={showOverlay3} onClose={toggleOverlay3}></WalletConnect>
      <COINBASE isOpen={showOverlay4} onClose={toggleOverlay4}></COINBASE>

      <div className='connect-wallet-button'>
        <button className='connect-wallet-button' onClick={() => setState({isScreenOpen:true})}>
          Connect Wallet
        </button>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={state.isScreenOpen}
          title="Connect a wallet"
          width = '25%'
          onRequestClose={() => {
            setState({isScreenOpen:false});
          }}
        >
        <div className='container-pane'>
          <div className='pane-rectangle' onClick={handleIconClick}>
              <img src = {uniswap} alt = "Icon" className='icon' />
              <span className='title'>Uniswap Wallet</span>
          </div>

          <div className='pane-rectangle' onClick={handleIconClick2}>
            <img src = {metamask} alt = "Icon" className='icon'/>
            <span className='title'>Install Metamask</span>
          </div>

          <div className='pane-rectangle' onClick={handleIconClick3}>
            <img src = {walletconnect} alt = "Icon" className='icon'/>
            <span className='title'>WalletConnect</span>
          </div>

          <div className='pane-rectangle' onClick={handleIconClick4}>
            <img src = {coinbasewallet} alt = "Icon" className='icon'/>
            <span className='title'>Coinbase Wallet</span>
          </div>
          <div className='agreement-text'>
            By connecting a wallet, you agree to Uniswap Labs' Terms of Service and consent to its Privacy Policy.
          </div>
        </div>
        </SlidingPane>
      </div>
    </div>
  );
}

export default App;

