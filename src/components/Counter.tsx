import { useState } from "react"

export function Counter() {

    const [counter, setCounter] = useState(0)

    return (
        <>
            <p>Contagem atual: {counter}</p>
            <button onClick={() => setCounter(prev => prev + 1)}>Incrementar</button>
            <button onClick={() => setCounter(prev => prev - 1)}>Decrementar</button>
        </>
    )
}