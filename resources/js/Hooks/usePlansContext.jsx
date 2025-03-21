import { createContext, useContext, useCallback, useState, useMemo, useEffect } from 'react';


const STATES_LIMIT = 35;

const PlansContext = createContext();

function PlansProvider({ children, initialPlans }) {
	const [plans, _setPlans] = useState(initialPlans);
	const [plansHistory, _setPlansHistory] = useState(initialPlans ? [{ state: initialPlans, action: null }] : []);
	const [historyPointer, _setHistoryPointer] = useState(initialPlans ? 0 : -1);

    const plansSet = useMemo(() => new Set(plans.flatMap(semester => semester.subjects.map(subject => subject.code))), [plans]);

	/**
	 * Updates the plans state locally without modifying history.
	 * Accepts a function to modify the state based on the previous value.
	 *
	 * @param {Function | any} updater - New state value or function to update based on previous state.
	 */
	const updatePlans = useCallback((updater) => {
		_setPlans((prevState) => (typeof updater === 'function' ? updater(prevState) : updater));
	}, []);


	/**
   * Adds a new state to history and updates the external state.
   * Ensures the history does not exceed the defined STATES_LIMIT.
   *
   * @param {any} newValue - The new state value.
   * @param {any} [newAction=null] - Action metadata related to the state change.
   */
	const commitPlans = useCallback((newValue, newAction = null) => {
		_setPlans((prevState) => {
			const evaluatedState = typeof newValue === 'function' ? newValue(prevState) : newValue;

			_setPlansHistory(prev => {
				const newHistory = [...prev.slice(0, historyPointer + 1), { state: evaluatedState, action: newAction }];
				return newHistory.length > STATES_LIMIT ? newHistory.slice(1) : newHistory;
			});

			_setHistoryPointer(prev => Math.min(prev + 1, STATES_LIMIT - 1));
			return evaluatedState;
		});
	}, [historyPointer]);

	/**
	 * Reverts to the current state in history. 
	 */
	function restoreCurrentPlans() {
		return updatePlans(history[historyPointer].state);
	}

	/**
	 * Reverts to the previous state in history.
	 *
	 * @returns {any | null} - The action associated with the undone state, or null if no undo is possible.
	 */
	function undo() {
		if (historyPointer > 0) {
			const prevState = history[historyPointer - 1];
			_setHistoryPointer(historyPointer - 1);
			_setPlans(prevState.state);
			return history[historyPointer].action;
		}
		return null;
	}

	/**
	 * Advances to the next state in history.
	 *
	 * @returns {any | null} - The action associated with the redone state, or null if no redo is possible.
	 */
	function redo() {
		if (historyPointer + 1 < history.length) {
			const nextState = history[historyPointer + 1];
			_setHistoryPointer(historyPointer + 1);
			_setPlans(nextState.state);
			return nextState.action;
		}
		return null;
	}


	return (
		<PlansContext.Provider value={{ plans, plansSet, updatePlans, commitPlans, restoreCurrentPlans, undo, redo }}>
			{children}
		</PlansContext.Provider>
	);
};

function usePlansContext() { return useContext(PlansContext) }

export { usePlansContext, PlansProvider }