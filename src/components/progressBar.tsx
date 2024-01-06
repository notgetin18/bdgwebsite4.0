import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { decrementTimer, resetTimer } from "@/redux/actionTypes";
import { metalPrice } from "@/api/DashboardServices";

const ProgressBar: React.FC = () => {
    const time = useSelector((state: RootState) => state.time.time);
    const metalPricePerGram = useSelector((state: RootState) => state.shop.metalPrice);

    const dispatch = useDispatch();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (time === 0) {
                clearInterval(intervalRef.current as unknown as number);
                intervalRef.current = null;
                dispatch(resetTimer());
            } else {
                dispatch(decrementTimer());
            }
        }, 1000) as unknown as NodeJS.Timeout;

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current as unknown as number);
                intervalRef.current = null;
            }
        };
    }, [time, dispatch]);

    const calculateProgressBarWidth = () => {
        const totalSeconds = 300; // Total time in seconds (adjust according to your needs)
        const remainingPercentage = (time / totalSeconds) * 100;
        return `${remainingPercentage}%`;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                style={{ width: calculateProgressBarWidth() }}
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="/lottie/Animation - 1700632554663.gif"
                            className="h-8 inline-block mr-2"
                        />
                        <div className="text-black">₹{metalPricePerGram}</div>
                    </div>
                    <div className="text-black">Expire in {formatTime(time)}</div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
