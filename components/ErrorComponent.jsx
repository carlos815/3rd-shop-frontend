import { useRef } from 'react'
import { Transition } from 'react-transition-group';
const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

export default function ErrorComponent({ error }) {
    return <Fade in={true}>
        <div className='font-headline text-center p-8 text-turquoise opacity-100 animate-fadein' >
            <h1 className='text-[186px]'>:(</h1>
            <p className='text-xl text-pink'>Something went wrong!</p>
            <p className='font-body text-body  text-yellow'>{error?.message}</p>
            <p className='font-body text-xs text-yellow'>check the console for more details</p>
        </ div>
    </Fade>
}


function Fade({ in: inProp, children }) {
    const nodeRef = useRef(null);
    return (
        <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
            {state => (
                <div ref={nodeRef} style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {children}
                </div>
            )}
        </Transition>
    );
}