import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {CounterId, DecrementAction, IncrementAction, selectCounter, useAppSelector} from "./store.ts";
import {useDispatch} from "react-redux";

function App() {
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                {/* Передаем пропс counterId в компонент Counter */}
                <Counter counterId="first"/>
                <Counter counterId="second"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

// Компонент Counter принимает пропс counterId
export function Counter({counterId}: { counterId: CounterId }) {
    const dispatch = useDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId));
    return (
        <div>
            <p>counter {counterState?.counter}</p>
            <button onClick={() => dispatch({
                type: 'increment',
                payload: {counterId}
            } as IncrementAction)}>increment
            </button>
            <button onClick={() => dispatch({
                type: 'decrement',
                payload: {counterId}
            } as DecrementAction)}>decrement
            </button>
        </div>
    );
}

export default App;
