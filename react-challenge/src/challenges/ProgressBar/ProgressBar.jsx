import React, { useState, useRef } from 'react';
import './style.css'; // Assuming you have the styles in a file named style.css

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isInProgress, setIsInProgress] = useState(false);
    const reqAniFrameId = useRef(null);

    const startProgress = () => {
        setIsInProgress(true);
        const animate = () => {
            setProgress((prev) => {
                const nextProgress = prev + 0.1;
                if (nextProgress <= 100) {
                    reqAniFrameId.current = requestAnimationFrame(animate);
                    return nextProgress;
                }
                return prev;
            });
        };
        reqAniFrameId.current = requestAnimationFrame(animate);
    };

    const stopProgress = () => {
        cancelAnimationFrame(reqAniFrameId.current);
        setIsInProgress(false);
    };

    const resetProgress = () => {
        stopProgress();
        setProgress(0);
    };

    return (
        <div className="container text-center">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-controller">
                <button
                    id="start"
                    className="btn btn-primary buttonMain"
                    onClick={startProgress}
                    disabled={isInProgress}
                >
                    Start
                </button>
                <button
                    id="stop"
                    className="btn btn-primary buttonMain"
                    onClick={stopProgress}
                    disabled={!isInProgress}
                >
                    Stop
                </button>
                <button id="reset" className="btn btn-primary buttonMain" onClick={resetProgress}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ProgressBar;
