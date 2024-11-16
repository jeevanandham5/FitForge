import React from "react";
import { Card, Typography, Button, Progress } from "antd";
import { useWorkoutStore } from "../store/workoutStore";
import { WorkoutTimer } from "./WorkoutTimer";
import { ChevronRight } from "lucide-react";

const { Title, Text } = Typography;

export const ActiveWorkout = () => {
  const {
    currentWorkout,
    currentSectionIndex,
    currentExerciseIndex,
    nextExercise,
  } = useWorkoutStore();

  if (!currentWorkout) return null;

  const currentSection = currentWorkout.sections[currentSectionIndex];
  const currentExercise = currentSection.exercises[currentExerciseIndex];

  // Calculate overall progress
  const totalExercises = currentWorkout.sections.reduce(
    (total, section) => total + section.exercises.length,
    0
  );
  const completedExercises =
    currentWorkout.sections
      .slice(0, currentSectionIndex)
      .reduce((total, section) => total + section.exercises.length, 0) +
    currentExerciseIndex;
  const progress = Math.round((completedExercises / totalExercises) * 100);

  return (
    <Card className="max-w-2xl w-full shadow-lg">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Text className="text-blue-500 font-medium">
            {currentSection.title}
          </Text>
          <Text type="secondary">Progress: {progress}%</Text>
        </div>

        <Progress percent={progress} showInfo={false} />

        <div>
          <Title level={4} className="!mt-1">
            {currentExercise.name}
          </Title>
          {currentExercise.description && (
            <Text type="secondary">{currentExercise.description}</Text>
          )}
        </div>

        {currentExercise.duration ? (
          <WorkoutTimer
            duration={currentExercise.duration}
            onComplete={nextExercise}
          />
        ) : (
          <div className="space-y-4">
            <Text className="block text-lg">
              {currentExercise.sets} sets × {currentExercise.reps} reps
            </Text>
            <Button
              type="primary"
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={nextExercise}
            >
              Next Exercise
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
