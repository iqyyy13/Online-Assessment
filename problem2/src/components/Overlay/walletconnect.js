import { Fragment } from "react";
import "./walletconnect.css";
import walletconnect from "./walletconnect-qr.png";

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
                            <span className="overlay__text">Connect your wallet</span>   
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
                            <img src ={walletconnect} alt="QR Code" />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
  );
}

export default Overlay;