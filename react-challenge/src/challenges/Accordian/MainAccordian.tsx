import { useState } from "react";
import Accordian from "./Accordian.jsx";
import styles from "./Accordion.module.css";
import Data from "./Data";

export default function MainAccordian() {
    const [multiple, setchecked] = useState(true)
    const [singleid, setsingleid] = useState('')
  return (
    <><div className={styles.App}>

        <h1>Accordian</h1>

        <div>
            <label>Is multiple open accordion allowed?</label>
            <input title="multiple" type="checkbox" name="multiple" id="multiple" checked={multiple}  onChange={()=> setchecked((old)=> !old)}/>   
            {/* ishme checked to use kia h */}
        </div>

        <div>
            {
                Data.length && Data.map((unitdata) => (<Accordian key={unitdata.id} {...unitdata} singleid={singleid} multiple={multiple} setsingleid={setsingleid}/>))    // here we have passed the object in destructured form
            }
        </div>
    </div>
    </>
  )
}
