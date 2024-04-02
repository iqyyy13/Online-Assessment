import * as React from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

type Props = {
    visible: boolean
    closeScreen: () => void;
}

export default function walletPane({visible, closeScreen} : Props){
    return (
        <SlidingPane 
            className='sliding-pane'
            isOpen = {visible}
            width = {window.innerWidth < 600 ? "100%" : "500px"}
            onRequestClose = {closeScreen}
        >
            <div>
                <h2>Welcome to the Sliding Screen!</h2>
                <p>This is some placeholder content.</p>
            </div>
        </SlidingPane>   
    );
}