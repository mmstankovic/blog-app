import classes from './Modal.module.css'
import { IoMdClose } from 'react-icons/io'
import Button from './Button'

const Modal = (props) => {
    const modalBodyClasses = `${classes['modal-body']} ${props.title === 'Success!' ? classes.success : classes.danger}`
    const buttonClasses = `${props.name === 'Ok' ? classes.success : ''}`
    
    return (
        <>
            {props.action && <div className={classes.backdrop} />}
            <div className={classes.modal}>
                <div className={classes['modal-header']}>
                    <div>{props.title}</div>
                    <IoMdClose className={classes['close-modal']} onClick={props.onClose}/>
                </div>
                <div className={modalBodyClasses}>{props.message}</div>
                <div className={classes['modal-footer']}>
                    <Button className={buttonClasses} onClick={props.onClose}>{props.name}</Button>
                    {props.action && <Button className={classes.danger} onClick={() => props.onDelete(props.id)}>{props.action}</Button>}
                </div>
            </div>
        </>
    )
}
export default Modal