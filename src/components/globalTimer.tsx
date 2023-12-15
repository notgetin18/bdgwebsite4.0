import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { decrementTimer, resetTimer } from "@/redux/actionTypes";
import { metalPrice } from "@/api/DashboardServices";
import { setGoldData, setSilverData } from "@/redux/metalSlice";
import { setMetalPrice } from "@/redux/shopSlice";

const Timer: React.FC = () => {
  const time = useSelector((state: RootState) => state.time.time);
  const dispatch = useDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDataOfMetals = useCallback(async () => {
    try {
      const response: any = await metalPrice(); // Assuming this returns a JSON string
      const metalPriceOfGoldSilver = JSON.parse(response);
      dispatch(setGoldData(metalPriceOfGoldSilver.data.gold[0]));
      dispatch(setSilverData(metalPriceOfGoldSilver.data.silver[0]));
      dispatch(setMetalPrice(metalPriceOfGoldSilver.data.gold[0].totalPrice));
    } catch (error) {
      console.error("Error fetching metal data:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    // Explicitly tell TypeScript that setInterval returns a number in the browser environment
    intervalRef.current = setInterval(() => {
      if (time === 0) {
        // Clear the interval when the time reaches 0
        clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
        fetchDataOfMetals();
        dispatch(resetTimer());
        // updateMetalPrice()
      } else {
        dispatch(decrementTimer());
      }
    }, 1000) as unknown as NodeJS.Timeout; // Type assertion here

    // Clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
      }
    };
  }, [time, fetchDataOfMetals, dispatch]);

  useEffect(() => {
    fetchDataOfMetals();
  }, []);

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="flex items-center justify-end gap-2 pr-4 sm:pr-12 mt-32">
        <img src="/alarm-filled.png" className="h-2 sm:h-4" />
        <p className="text-sm text-red-600">
          <span className="hidden sm:inline">Rate will</span> expire in :{" "}
          {formatTime(time)}
        </p>
      </div>
      {/* Button is commented out, but here if you need it */}
      {/* <button onClick={handleReset}>Reset Timer</button> */}
    </div>
  );
};

export default Timer;
