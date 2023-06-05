import { useReducer } from "react"

const initialState = {value: '', isTouched: false}

const inputReducer = (state, action) => {
    if(action.type === 'USER_INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if(action.type === 'BLUR_INPUT') {
        return {value: state.value, isTouched: true}
    }
    return initialState
}

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialState)
    
    const valueIsValid = validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const valueChangeHandler = e => {
        dispatch({type: 'USER_INPUT', value: e.target.value})
    }
    const inputBlurHandler = () => {
        dispatch({type: 'BLUR_INPUT'})
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError: hasError,
        isTouched: inputState.isTouched,
        valueChangeHandler: valueChangeHandler,
        inputBlurHandler: inputBlurHandler
    }
}
export default useInput
