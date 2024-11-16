import { create } from "zustand";
import { persist } from "zustand/middleware";
import { workouts } from "../data/workouts";

export const useWorkoutStore = create(
  persist(
    (set, get) => ({
      level: "Beginner",
      gender: "",
      startDate: null,
      currentWorkout: null,
      currentExerciseIndex: 0,
      currentSectionIndex: 0,
      isWorkoutStarted: false,
      completedWorkouts: [],

      setLevel: (level) => set({ level }),
      setGender: (gender) => set({ gender }),
      setStartDate: (date) => set({ startDate: date }),

      startWorkout: () => {
        const { level, gender } = get();
        const workout = workouts.find(
          (w) => w.level === level && w.gender === gender
        );
        set({
          currentWorkout: workout || null,
          isWorkoutStarted: true,
          currentExerciseIndex: 0,
          currentSectionIndex: 0,
        });
      },

      nextExercise: () => {
        const state = get();
        const currentSection =
          state.currentWorkout?.sections[state.currentSectionIndex];

        if (!currentSection) return;

        if (state.currentExerciseIndex < currentSection.exercises.length - 1) {
          set({ currentExerciseIndex: state.currentExerciseIndex + 1 });
        } else if (
          state.currentSectionIndex <
          (state.currentWorkout?.sections.length || 0) - 1
        ) {
          set({
            currentSectionIndex: state.currentSectionIndex + 1,
            currentExerciseIndex: 0,
          });
        } else {
          get().completeWorkout();
        }
      },

      resetWorkout: () =>
        set({
          currentWorkout: null,
          isWorkoutStarted: false,
          currentExerciseIndex: 0,
          currentSectionIndex: 0,
        }),

      completeWorkout: () => {
        const { level, gender } = get();
        const today = new Date().toISOString().split("T")[0];

        set((state) => ({
          completedWorkouts: [
            ...state.completedWorkouts,
            { date: today, level, gender },
          ],
          isWorkoutStarted: false,
          currentWorkout: null,
          currentExerciseIndex: 0,
          currentSectionIndex: 0,
        }));
      },

      getCompletedDates: () => {
        return get().completedWorkouts.map((workout) => workout.date);
      },
    }),
    {
      name: "workout-storage",
      partialize: (state) => ({
        completedWorkouts: state.completedWorkouts,
        startDate: state.startDate,
        level: state.level,
        gender: state.gender,
      }),
    }
  )
);
