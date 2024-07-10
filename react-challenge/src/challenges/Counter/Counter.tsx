import { useState } from "react"

function Counter() {
    const [countval, setcountval] = useState(0)
    const [inputval, setinputval] = useState(0)

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
    function updateInput(e: number) {
        setinputval(e)
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
                    onChange={(e) => updateInput((e.target as HTMLInputElement).valueAsNumber)}
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