import './Bar.css'
import windowsIcon from '../assets/windows_icon.png'
import linkedin from '../assets/linkedin.png'
import github from '../assets/github.gif'
import { useState, useEffect, useRef } from 'react'

function Bar() {
    const [startPressed, setStartPressed] = useState(false);

    // We absolutely need this to ensure that the first click was on
    // the start button and not just anywhere on the screen
    const [mouseDownStart, setMouseDownStart] = useState(false);
    if (false) { // This is used to supress the 'unused variable' warning for now
        console.log(mouseDownStart);
    }
    const startButtonRef = useRef(null);

    const handleMouseUp = (event: any) => {
        if (startButtonRef.current && !((startButtonRef.current as HTMLElement).contains(event.target))) {
            setMouseDownStart((prev) => {
                if (prev) {
                    setStartPressed((previousState) => (!previousState))
                } else {
                    setStartPressed(false);
                }
                return false;
            })
        } 
        setMouseDownStart(false);
    }

    const handleMouseDownStart = () => {
        setMouseDownStart(() => {
            return true;
        });
        setStartPressed((prev) => (!prev));
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        // document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            // document.removeEventListener('touchend', handleMouseUp);
        }
    }, []);

    return (
        <div id='bar-container'>
            <hr id='bar-line'></hr>
            <div id='task-menu'>
                <div id='left-side-task-menu'>
                    <div style={{
                        borderTop: startPressed ? '2px solid rgba(14, 13, 13, 0.781)' : '1px solid rgba(255, 255, 255, 0.959)',
                        borderLeft: startPressed ? '2px solid rgba(14, 13, 13, 0.781)' : '1px solid rgba(255, 255, 255, 0.959)',
                        borderRight: startPressed ? '1px solid rgba(255, 255, 255, 0.959)' : '2px solid rgba(14, 13, 13, 0.781)',
                        borderBottom: startPressed ? '1px solid rgba(255, 255, 255, 0.959)' : '2px solid rgba(14, 13, 13, 0.781)',
                        marginRight: startPressed ? '1px' : '0px',
                        marginTop: startPressed ? '1px' : '0px',
                        }} ref={startButtonRef} draggable='false' id="start-container" onMouseDown={handleMouseDownStart} >
                        <div style={{
                            borderTop: startPressed ? '1px solid rgba(0, 0, 0, 0.226)' : '1px solid rgba(222,222,222,1.0)',
                            borderLeft: startPressed ? '1px solid rgba(0, 0, 0, 0.226)' : '1px solid rgba(222,222,222,1.0)',
                            borderRight: startPressed ? '1px solid rgba(222,222,222,1.0)' : '2px solid rgba(0, 0, 0, 0.226)',
                            borderBottom: startPressed ? '1px solid rgba(222,222,222,1.0)' : '2px solid rgba(0, 0, 0, 0.226)',
                            }} id='start' >
                            <img draggable='false' id="windows-icon" src={windowsIcon}></img>
                            <p id='start-text'>Start</p>
                        </div>
                    </div>
                    <div id='before-skinny' className='vertical-line-skinny' />
                    <div id='before-fat' className='vertical-line-fat' />
                    <a href="https://www.linkedin.com/in/rami-souguir-9732761aa/" target="_blank">
                        <img id="linkedin" src={linkedin}/>
                    </a>
                    <a href="https://github.com/RamiSouguir" target="_blank">
                        <img id="github" src={github}/>
                    </a>
                    <div id='after-skinny' className='vertical-line-skinny' />
                    <div id='after-fat' className='vertical-line-fat' />
                </div>
            </div>
        </div>
    )
}

export default Bar