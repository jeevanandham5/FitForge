import React, { useEffect, useRef } from "react";
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

  const videoRef = useRef(null);

  // Safely access currentExercise and currentSection
  const currentSection =
    currentWorkout?.sections?.[currentSectionIndex] || null;
  const currentExercise =
    currentSection?.exercises?.[currentExerciseIndex] || null;

  // Calculate overall progress
  const totalExercises = currentWorkout
    ? currentWorkout.sections.reduce(
        (total, section) => total + section.exercises.length,
        0
      )
    : 0;

  const completedExercises = currentWorkout
    ? currentWorkout.sections
        .slice(0, currentSectionIndex)
        .reduce((total, section) => total + section.exercises.length, 0) +
      currentExerciseIndex
    : 0;

  const progress = totalExercises
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0;

  // Reload the video whenever the current exercise changes
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && currentExercise?.demo) {
      videoElement.load(); // Load the new video source

      // Wait for the video to be ready before playing
      const handleCanPlay = () => {
        videoElement.play();
      };

      videoElement.addEventListener("canplay", handleCanPlay);

      // Cleanup event listener on unmount
      return () => {
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentExercise?.demo]);

  // If no workout is active, return null
  if (!currentWorkout) return null;

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
          <div className="w-full bg-red-200 flex items-center justify-center">
            <video
              ref={videoRef} // Attach the ref
              width="100%"
              height="auto"
              autoPlay
              loop
              muted
            >
              <source src={currentExercise.demo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
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
