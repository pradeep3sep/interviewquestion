import { useState } from "react"
import { FOODS } from "./data"

export default function Pagination() {
    const [currentpage, setcurrentpage] = useState(1)
    const [initialpagecount, setinitialpagecount] = useState(0)

    function nextPage(){
        if(currentpage < Math.ceil(FOODS.length/10)){
            setcurrentpage(old => old + 1)
            setinitialpagecount(old => old + 10)
        }
    }
    function prevPage(){
        if(currentpage <= Math.ceil(FOODS.length/10) && currentpage > 1){
            setcurrentpage(old => old - 1)
            setinitialpagecount(old => old - 10)
        }
    }

    return (
        <div>
            <section>
                <button onClick={prevPage} >Previous</button>
                <label>Page {currentpage} of {Math.ceil(FOODS.length/10)}</label>
                <button onClick={nextPage}>Next</button>
            </section>


            <section>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FOODS.slice(initialpagecount, currentpage*10).map(item => (    // keep in mind, yha pe {} nhi use kia ()
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>₹{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    )
}
