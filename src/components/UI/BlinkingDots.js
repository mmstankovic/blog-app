import classes from './BlinkingDots.module.css'

const BlinkingDots = () => {
    return (
        <span className={classes['dots']}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </span>
    )
}
export default BlinkingDots