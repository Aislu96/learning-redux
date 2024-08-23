import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import store, {AppState, CounterId, DecrementAction, IncrementAction} from "./store.ts";
import {useEffect, useReducer, useRef} from "react";

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

const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];

// Компонент Counter принимает пропс counterId
export function Counter({ counterId }: { counterId: CounterId }) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const lastStateRef = useRef<ReturnType<typeof selectCounter>>();


    useEffect(() => {
        return store.subscribe(() => {
            const currentState = selectCounter(store.getState(), counterId);
            const lastState = lastStateRef.current;
            if (currentState !== lastState) {
                forceUpdate();
            }
            lastStateRef.current = currentState;
        });
    }, []);

    const counterState = selectCounter(store.getState(), counterId);

    return (
        <div>
            <p>counter {counterState?.counter}</p>
            <button onClick={() => store.dispatch({
                type: 'increment',
                payload: { counterId }
            } as IncrementAction)}>increment</button>
            <button onClick={() => store.dispatch({
                type: 'decrement',
                payload: { counterId }
            } as DecrementAction)}>decrement</button>
        </div>
    );
}

export default App;
