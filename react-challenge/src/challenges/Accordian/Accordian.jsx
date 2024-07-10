
import { useState } from "react";
import styles from "./Accordion.module.css";
import { useEffect } from "react";

export default function Accordian({ id, title, info, setsingleid, multiple, singleid }) {
    const [show, setshow] = useState(false)
    function setValue(){
        setshow((val)=> !val)
        setsingleid(id)
    }

    useEffect(() => {
        if(multiple === false && singleid === id){
            setshow((val)=> !val)
        }
      
    }, [singleid])
    
    return (
        <>
            <div key={id} className={styles.accordion}>
                <div className={styles["accordion-title"]}>
                    <h3>{title}</h3>
                    <button className={styles["accordion-icon"]} onClick={setValue }>{show ? '-' : '+'}</button>
                </div>
                {show && <p>{info}</p>}
            </div>
        </>
    )
}
