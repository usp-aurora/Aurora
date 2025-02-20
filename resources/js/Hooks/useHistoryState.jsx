import { useCallback, useState } from "react";

const STATES_LIMIT = 15;

/**
 * Custom hook to manage state with history (undo/redo).
 * Maintains a history of up to 15 states.
 *
 * @param {any} initialValue - Initial state value.
 * @param {Function} setState - External state setter function.
 * @returns {[Function, Function, Function, Function]} - [pushState, getCurrentState, undo, redo]
 */
function useHistoryState(initialValue, setState) {
    const [history, setHistory] = useState(initialValue ? [{ state: initialValue, action: null }] : []);
    const [pointer, setPointer] = useState(initialValue ? 0 : -1);

    /**
     * Adds a new state to history and updates the external state.
     * Ensures the history does not exceed the defined STATES_LIMIT.
     *
     * @param {any} newValue - The new state value.
     * @param {any} [newAction=null] - Action metadata related to the state change.
     */
    const pushState = useCallback((newValue, newAction = null) => {
        setHistory(prev => {
            const newHistory = [...prev.slice(0, pointer + 1), { state: newValue, action: newAction }];
            return newHistory.length > STATES_LIMIT ? newHistory.slice(1) : newHistory;
        });

        setPointer(prev => Math.min(prev + 1, STATES_LIMIT - 1));
        setState(newValue);
    }, [pointer, setState]);

    /**
     * Retrieves the current state from history.
     *
     * @returns {any} - The current state value.
     */
    function getCurrentState() {
        return history[pointer]?.state;
    }

    /**
     * Reverts to the previous state in history.
     *
     * @returns {any | null} - The action associated with the undone state, or null if no undo is possible.
     */
    function undo() {
        if (pointer > 0) {
            const prevState = history[pointer - 1];
            setPointer(pointer - 1);
            setState(prevState.state);
            return history[pointer].action;
        }
        return null;
    }

    /**
     * Advances to the next state in history.
     *
     * @returns {any | null} - The action associated with the redone state, or null if no redo is possible.
     */
    function redo() {
        if (pointer + 1 < history.length) {
            const nextState = history[pointer + 1];
            setPointer(pointer + 1);
            setState(nextState.state);
            return nextState.action;
        }
        return null;
    }

    return [pushState, getCurrentState, undo, redo];
}

export default useHistoryState;
