import React, { useState } from "react";
import Styles from "../styles/switch.module.css";

/**
 * ライトモード・ダークモードの切り替え
 * @param {*} props 
 */
const Switch = (props) => {
    const [state, setState] = useState("light");
    // 
    const changeState = () => {
        if (state === "light") {
            props.handler("dark");
            setState("dark");
        } else {
            props.handler("light");
            setState("light");
        }
    }
    if (state === "light") {
        return (
            <div 
                className={ Styles.container }
                onClick={ changeState }
            >
                <div 
                    className={ `${Styles.backBar}` + " " + `${Styles.backBarLight}` }
                >
                    light
                </div>
                <div
                    className={ Styles.btnLight }
                ></div>
            </div>
        );
    }
    return (
        <div 
            onClick={ changeState }
            className={ Styles.container }
        >
            <div 
                className={ `${Styles.backBar}` + " " + `${Styles.backBarDark}` }
            >
                dark
            </div>
            <div
                className={ Styles.btnDark }
            ></div>
        </div>
    );
}

export { Switch }