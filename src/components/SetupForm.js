import React from "react";
import { Card, DatePicker, Button, Typography, Calendar, Badge } from "antd";
import { Calendar as CalendarIcon } from "lucide-react";
import Both from "../asset/both.png";
import Men from "../asset/men.png";
import Women from "../asset/women.png";
import { useWorkoutStore } from "../store/workoutStore";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export const SetupForm = ({ setUserIsModalOpen }) => {
  const {
    level,
    gender,
    startDate,
    setStartDate,
    startWorkout,
    getCompletedDates,
  } = useWorkoutStore();

  const completedDates = getCompletedDates();

  const handleStart = () => {
    if (startDate) {
      startWorkout();
    }
  };
  const isCompleteddate =
    localStorage.getItem("workout-storage") &&
    localStorage.getItem("workout-storage").split(":")[3].split(",")[0];
  console.log(isCompleteddate);
  console.log("");

  const dateCellRender = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    const isCompleted = completedDates.includes(dateStr);

    if (isCompleted) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="bg-green-500 w-4 h-4 mt-1 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const Username = localStorage.getItem("username");

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <Title level={1} className="!mb-6 text-center">
        {!Username === null ? "hello " + Username : "Wellcome to FitForge"}
      </Title>
      <Badge.Ribbon
        text={level}
        color={
          level === "Beginner"
            ? "green"
            : level === "Intermediate"
            ? "orange"
            : "red"
        }
      >
        <Card className="shadow-lg p-0">
          <img
            alt="gender"
            src={gender === "Men" ? Men : gender === "Women" ? Women : Both}
            className="w-full"
          />
        </Card>
      </Badge.Ribbon>
      <Card className="shadow-lg">
        {gender === "" ? (
          <div className="w-full">
            <Button
              type="primary"
              size="large"
              className="w-full"
              onClick={() => setUserIsModalOpen(true)}
            >
              Get started
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Title level={4} className="!mb-6">
              Select the current date to start your Workout
            </Title>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                <DatePicker
                  className="w-full"
                  placeholder="Select date"
                  defaultValue={dayjs()}
                  onChange={(date) =>
                    setStartDate(date ? date.format("YYYY-MM-DD") : null)
                  }
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleStart}
              disabled={!startDate}
            >
              Start Workout Plan
            </Button>
          </div>
        )}
      </Card>

      <Card className="shadow-lg">
        <Title level={4} className="!mb-4">
          Workout Progress
        </Title>
        <div className="h-full w-full flex items-center  gap-4 justify-center">
          <div className="bg-green-500 w-4 h-4 mt-1 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <div>
            <Text className="block  ">indicate completed workout days</Text>
          </div>
        </div>

        <Calendar fullscreen={false} cellRender={dateCellRender} />
      </Card>
    </div>
  );
};
