import React, { useState } from 'react';
import Styles from "./styles/app.module.css";
import P5Wrapper from "react-p5-wrapper"
import { Sketch } from "./scripts/sketch";
import { Switch } from "./scripts/switch";

function App() {
    const [mode, setMode] = useState("light");
    const changeMode = (value) => {
        setMode(value);
        console.log(mode);
    }
    return (
        <>
        <P5Wrapper sketch={ Sketch } mode={ mode }/>
        <div className={ Styles.switch }>
            <Switch 
                handler={ changeMode }
            />
        </div>
        </>

    );
}

export default App;
