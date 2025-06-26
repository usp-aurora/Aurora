import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { savePlans } from './utils/plansUtils';

const STATES_LIMIT = 35;
const SYNC_INTERVAL = 1000; 

const PlansContext = createContext();

function PlansProvider({ children, initialPlans, user }) {
	const [plans, _setPlans] = useState(initialPlans);

	const [plansHistory, _setPlansHistory] = useState(initialPlans ? [{ state: initialPlans, action: null }] : []);
	const [historyPointer, _setHistoryPointer] = useState(initialPlans ? 0 : -1);
	const [lastSavedPlans, setLastSavedPlans] = useState(initialPlans);
	const [isSaved, setIsSaved] = useState(true);

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

			if (isSaved) {
				setIsSaved(false);
				setLastSavedPlans(evaluatedState);
			}
			
			return evaluatedState;
		});

	}, [historyPointer, isSaved]);

	/**
	 * Reverts to the current state in history. 
	 */
	function restoreCurrentPlans() {
		return updatePlans(plansHistory[historyPointer].state);
	}

	/**
	 * Reverts to the previous state in history.
	 *
	 * @returns {any | null} - The action associated with the undone state, or null if no undo is possible.
	 */
	function undo() {
		if (historyPointer > 0) {
			const newPointer = historyPointer - 1;
			const prevState = plansHistory[newPointer];
			_setHistoryPointer(newPointer);
			_setPlans(prevState.state);
			setLastSavedPlans(plansHistory[historyPointer].state);
			setIsSaved(false);
	
			return prevState.action;
		}
		return null;
	}

	/**
	 * Advances to the next state in history.
	 *
	 * @returns {any | null} - The action associated with the redone state, or null if no redo is possible.
	 */
	function redo() {
		if (historyPointer < plansHistory.length - 1) {
			const newPointer = historyPointer + 1;
			const nextState = plansHistory[newPointer];
			_setHistoryPointer(newPointer);
			_setPlans(nextState.state);
			setLastSavedPlans(plansHistory[historyPointer].state);
			setIsSaved(false);

			return nextState.action;
		}
		return null;
	}

	const savePendingPlans = useCallback(async function() {
		if (isSaved) return;

		const success = await savePlans(user, lastSavedPlans, plans);
		if (success) {
			setLastSavedPlans(plans);
			setIsSaved(true);
		}
	}, [user, plans, isSaved, lastSavedPlans]);

	useEffect(() => {
		let intervalId;
		if (user) {
			intervalId = setInterval(savePendingPlans, SYNC_INTERVAL);
		}

		function handleKeyDown(e) {
			if (user && e.ctrlKey && e.key === 's') {
				e.preventDefault();
				savePendingPlans();
			}
		}

		function handleBeforeUnload(e) {
			if (!isSaved) {
				e.preventDefault();
				e.returnValue = ''; 
			}
		}
		
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('beforeunload', handleBeforeUnload);
		

		return () => {
			if (intervalId) clearInterval(intervalId);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [savePendingPlans, isSaved, user]);

	return (
		<PlansContext.Provider value={{ plans, plansSet, updatePlans, commitPlans, restoreCurrentPlans, undo, redo, isSaved }}>
			{children}
		</PlansContext.Provider>
	);
};

function usePlansContext() { return useContext(PlansContext) }

export { PlansProvider, usePlansContext };
