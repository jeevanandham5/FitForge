import React, { useState, useEffect } from "react";
import { Button, Progress } from "antd";
import { Play, Pause, SkipForward } from "lucide-react";

export const WorkoutTimer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const parseDuration = (dur) => {
      const minutes = dur.includes("minute") ? parseInt(dur) : 0;
      const seconds = dur.includes("second") ? parseInt(dur) : 0;
      return (minutes * 60 + seconds) * 1000;
    };

    const time = parseDuration(duration);
    setTimeLeft(time);
    setTotalTime(time);
  }, [duration]);

  useEffect(() => {
    let interval;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1000) {
            clearInterval(interval);
            setIsActive(false);
            onComplete();
            return 0;
          }
          return time - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const skipTimer = () => {
    setTimeLeft(0);
    setIsActive(false);
    onComplete();
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <Progress
        type="circle"
        percent={progress}
        format={() => `${Math.ceil(timeLeft / 1000)}s`}
      />
      <div className="flex gap-2">
        <Button
          type="primary"
          icon={
            isActive ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )
          }
          onClick={toggleTimer}
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button icon={<SkipForward className="w-4 h-4" />} onClick={skipTimer}>
          Skip
        </Button>
      </div>
    </div>
  );
};
