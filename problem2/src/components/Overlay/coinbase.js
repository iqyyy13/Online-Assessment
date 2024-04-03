import { Fragment } from "react";
import "./coinbase.css";
import coinbase from "./coinbase.png";

export function Overlay({ isOpen, onClose, children }) {
    const handleBackgroundCheck = (e) => {
        if(e.target.classList.contains("overlay")){
            onClose();
        }
    }

    const handleDownload = () => {
        console.log("clicked");
        window.open("https://chromewebstore.google.com/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?pli=1", "_blank");
    }
    
    return (
        <Fragment>
            {isOpen && (
                <div className="overlay" onClick={handleBackgroundCheck}>
                    <div className="overlay__background" onClick={handleBackgroundCheck} />
                    <div className="overlay__container">
                        <div className="overlay__header">
                            <span className="overlay__text">Scan to connect with Coinbase Wallet app</span>   
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
                            <img src ={coinbase} alt="QR Code" />
                        </div>
                        <div className="overlay__download">
                            <span>Or try the Coinbase Wallet browser extension</span>
                            <button className="download-button" onClick={handleDownload}>Download</button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
  );
}

export default Overlay;