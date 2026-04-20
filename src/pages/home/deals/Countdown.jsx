import { useEffect, useState } from "react";
import moment from "moment";

const Countdown = ({ countdown, compact = false }) => {
    const [timeLeft, setTimeLeft] = useState(moment.duration(0));
    useEffect(() => {
        const endDate = moment(countdown);
        const interval = setInterval(() => {
            const now = moment();
            const diff = moment.duration(endDate.diff(now));

            if (diff.asMilliseconds() <= 0) {
                clearInterval(interval);
                setTimeLeft(moment.duration(0));
            } else {
                setTimeLeft(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    const days = Math.floor(timeLeft.asDays());
    const hours = timeLeft.hours();
    const mins = timeLeft.minutes();
    const secs = timeLeft.seconds()

    return (
        <div className="flex justify-center items-center">
            <div className="text-sm font-bold text-[#FF8D28] bg-orange-50 px-0.5">
                {days < 10 ? `0${days}` : days}d
            </div>
            <div className="text-sm font-bold text-[#FF8D28] bg-orange-50 px-1">
                {hours < 10 ? `0${hours}` : hours}h
            </div>
            {!compact && (
                <>
                    <div className="text-sm font-bold text-[#FF8D28] bg-orange-50 px-0.5">
                        {mins < 10 ? `0${mins}` : mins}m
                    </div>
                    <div className="text-sm font-bold text-[#FF8D28] bg-orange-50 px-0.5">
                        {secs < 10 ? `0${secs}` : secs}s
                    </div>
                </>
            )}
        </div>
    );
};

export default Countdown;
