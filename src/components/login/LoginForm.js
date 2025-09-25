import Card from '../UI/Card'
import { useContext } from 'react'
import BlogContext from '../../store/blog-context'
import classes from './LoginForm.module.css'
import {RiLoginCircleLine} from 'react-icons/ri'
import useInput from '../../hooks/use-input'
import { useHistory } from 'react-router-dom'

const moreThenFive = (value) => value.trim().length > 5
const isEmail = (value) => value.includes('@')

const LoginForm = () => {
    const blogCtx = useContext(BlogContext)
    const history = useHistory()

    const {
        value: enteredEmail, 
        isValid: enteredEmailIsValid, 
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailInputBlurHandler
    } = useInput(isEmail)
    const {
        value: enteredPassword, 
        isValid: enteredPasswordIsValid, 
        hasError: passwordInputHasError, 
        valueChangeHandler: passwordChangeHandler, 
        inputBlurHandler: passwordInputBlurHandler
    } = useInput(moreThenFive)

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(!enteredEmailIsValid || !enteredPasswordIsValid) {
            return
        }

        blogCtx.login()
        history.replace('/blogs')
    }
    const emainInputClasses = `${classes.control} ${emailInputHasError ? classes.invalid : ''}`
    const passwordInputClasses = `${classes.control} ${passwordInputHasError ? classes.invalid : ''}`
    return (
        <Card className={classes.form}>
            <div className={classes.title}><span>REACTBL</span><RiLoginCircleLine size={22}/><span>G</span></div>
            <form onSubmit={submitHandler}>
                <div className={emainInputClasses}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailInputBlurHandler}/>
                    {emailInputHasError && <p>Please enter a valid email adress!</p>}
                </div>
                <div className={passwordInputClasses}>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordInputBlurHandler} />
                    {passwordInputHasError && <p>Password must not be less than 5 characters!</p>}
                </div>
                <div className={classes.actions}>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <div className={classes['credentials-example']}>
                <p>Email: test@test.com</p>
                <p>Password: tester123</p>
            </div>
        </Card>
    )
}
export default LoginForm