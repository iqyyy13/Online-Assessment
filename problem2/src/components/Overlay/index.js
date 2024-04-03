import { Fragment } from "react";
import "./Overlay.css";
import uniswapQR from "./uniswap-qr.png";

export function Overlay({ isOpen, onClose, children }) {
    const handleBackgroundCheck = (e) => {
        if(e.target.classList.contains("overlay")){
            onClose();
        }
    }
    
    const handleDownload = () => {
        console.log("clicked");
        window.open("https://wallet.uniswap.org/?shortlink=qfwlncf9&c=evergreen&pid=web_connectwallet&af_xp=custom&source_caller=ui", "_blank");
    }
    
    return (
        <Fragment>
            {isOpen && (
                <div className="overlay" onClick={handleBackgroundCheck}>
                    <div className="overlay__background" onClick={handleBackgroundCheck} />
                    <div className="overlay__container">
                        <div className="overlay__header">
                            <span className="overlay__text">Scan with Uniswap Wallet</span>   
                            <div className="overlay__controls">     
                                <button
                                    className="overlay__close"
                                    type="button"
                                    onClick={onClose}
                                />
                            </div>
                        </div>
                        {children}
                        <div className="overlay__content">
                            <img src ={uniswapQR} alt="QR Code" />
                        </div>
                        <span className="overlay__text">Don't have a Uniswap wallet?</span>
                        <div className="overlay__download">
                            <span>Safely store and swap tokens with the Uniswap app. Available on IOS and Android.</span>
                            <button  className="download-button1" onClick={handleDownload}>Download</button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
  );
}

export default Overlay;