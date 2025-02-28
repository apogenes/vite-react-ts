import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { formatTime } from "@/shared/util/time";

export const TIMEOUT_TIME = 180;
export const RE_SEND_THRESHOLD = 10;

export interface TimeoutNumberRef {
  resetTime: (newTime?: number) => void;
  getTime: () => number;
}

interface TimeoutNumberProps {
  initialTime?: number;
}

export const TimeoutNumber = forwardRef<TimeoutNumberRef, TimeoutNumberProps>(
  ({ initialTime = TIMEOUT_TIME }, ref) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
      const timer = setInterval(() => {
        setTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    useImperativeHandle(ref, () => ({
      resetTime: (newTime = TIMEOUT_TIME) => {
        setTime(newTime);
      },
      getTime: () => time,
    }));

    return (
      <div className="text-right text-sm leading-[18px] font-medium text-red-400">
        {formatTime(time)}
      </div>
    );
  }
);