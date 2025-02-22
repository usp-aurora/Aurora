import { useCallback, useState } from "react";

const STATES_LIMIT = 15;

/**
 * Custom hook to manage state with history (undo/redo).
 * Maintains a history of up to 15 states.
 *
 * @param {any} initialValue - Initial state value.
 * @returns {[any, Function, Function, Function, Function, Function]} - [state, updateState, commitState, restoreCurrentState, undo, redo]
 */
function useHistoryState(initialValue) {
    const [state, _setState] = useState(initialValue);
    const [history, _setHistory] = useState(initialValue ? [{ state: initialValue, action: null }] : []);
    const [pointer, _setPointer] = useState(initialValue ? 0 : -1);

    /**
     * Updates the state locally without modifying history.
     * Accepts a function to modify the state based on the previous value.
     *
     * @param {Function | any} updater - New state value or function to update based on previous state.
     */
    const updateState = useCallback((updater) => {
        _setState((prevState) => (typeof updater === 'function' ? updater(prevState) : updater));
    }, []);

    /**
     * Adds a new state to history and updates the external state.
     * Ensures the history does not exceed the defined STATES_LIMIT.
     *
     * @param {any} newValue - The new state value.
     * @param {any} [newAction=null] - Action metadata related to the state change.
     */
    const commitState = useCallback((newValue, newAction = null) => {
        _setState((prevState) => {
            const evaluatedState = typeof newValue === 'function' ? newValue(prevState) : newValue;

            _setHistory(prev => {
                const newHistory = [...prev.slice(0, pointer + 1), { state: evaluatedState, action: newAction }];
                return newHistory.length > STATES_LIMIT ? newHistory.slice(1) : newHistory;
            });

            _setPointer(prev => Math.min(prev + 1, STATES_LIMIT - 1));
            return evaluatedState;
        });
    }, [pointer, updateState]);

    /**
     * Reverts to the current state in history. 
     */
    function restoreCurrentState() {
        return updateState(history[pointer].state);
    }

    /**
     * Reverts to the previous state in history.
     *
     * @returns {any | null} - The action associated with the undone state, or null if no undo is possible.
     */
    function undo() {
        if (pointer > 0) {
            const prevState = history[pointer - 1];
            _setPointer(pointer - 1);
            _setState(prevState.state);
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
            _setPointer(pointer + 1);
            _setState(nextState.state);
            return nextState.action;
        }
        return null;
    }

    return [state, updateState, commitState, restoreCurrentState, undo, redo];
}

export default useHistoryState;
