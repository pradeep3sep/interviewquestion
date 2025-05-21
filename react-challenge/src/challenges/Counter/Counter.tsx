import { useState , ChangeEvent} from "react"

type countType = number

function Counter() {
    const [countval, setcountval] = useState<countType>(0)
    const [inputval, setinputval] = useState<countType>(0)

    function increaseVal() {
        setcountval((val) => val + (inputval || 1))
    }

    function decreaseVal() {
        setcountval((val) => val - (inputval || 1))
    }

    function resetVal() {
        setcountval(0)
        setinputval(0)
    }
    function updatevalue(el: ChangeEvent<HTMLInputElement>){
        setinputval(el.target.valueAsNumber)
    }

    return (
        <section>
            <h1>Counter</h1>
            <h4>{countval}</h4>

            <div>
                <button onClick={increaseVal}>+</button>
                <button onClick={decreaseVal}>-</button>
            </div>

            <div>
                <p>Increment/Decrement by</p>
                <input
                    type="number"
                    id="step"
                    onChange={(e) =>updatevalue(e)}
                    title="Step value"
                />
            </div>

            <div>
                <button type="reset" title="reset" onClick={resetVal}>Reset</button>
            </div>
        </section>
    )
}

export default Counter