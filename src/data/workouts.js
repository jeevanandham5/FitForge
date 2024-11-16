export const workouts = [
  {
    level: "Beginner",
    gender: "Men",
    sections: [
      {
        title: "Warm-Up",
        exercises: [
          { name: "Jumping jacks", duration: "2 minutes" },
          { name: "Arm circles", duration: "1 minute" },
          { name: "Leg swings", duration: "1 minute each leg" },
        ],
      },
      {
        title: "Main Workout",
        exercises: [
          { name: "Bodyweight squats", sets: 3, reps: 12 },
          {
            name: "Push-ups",
            sets: 3,
            reps: 8,
            description: "knee push-ups if needed",
          },
          { name: "Plank hold", sets: 3, duration: "20 seconds" },
          {
            name: "Step-ups on a bench",
            sets: 3,
            reps: 10,
            description: "per leg",
          },
          { name: "Walking or jogging in place", duration: "10 minutes" },
        ],
      },
      {
        title: "Cool-Down",
        exercises: [
          { name: "Hamstring stretch", duration: "30 seconds per leg" },
          { name: "Child's pose", duration: "30 seconds" },
          { name: "Shoulder stretch", duration: "30 seconds per side" },
        ],
      },
    ],
  },
  {
    level: "Beginner",
    gender: "Women",
    sections: [
      {
        title: "Warm-Up",
        exercises: [
          { name: "Marching in place", duration: "2 minutes" },
          { name: "Arm swings", duration: "1 minute" },
          { name: "Hip circles", duration: "1 minute" },
        ],
      },
      {
        title: "Main Workout",
        exercises: [
          { name: "Glute bridges", sets: 3, reps: 12 },
          { name: "Wall push-ups", sets: 3, reps: 10 },
          {
            name: "Side-lying leg raises",
            sets: 3,
            reps: 12,
            description: "per side",
          },
          {
            name: "Standing knee-to-elbow",
            sets: 3,
            reps: 10,
            description: "per side",
          },
          { name: "Walking or light dancing", duration: "10 minutes" },
        ],
      },
      {
        title: "Cool-Down",
        exercises: [
          { name: "Cat-cow stretches", duration: "30 seconds" },
          { name: "Forward fold", duration: "30 seconds" },
          { name: "Neck stretches", duration: "30 seconds per side" },
        ],
      },
    ],
  },
  {
    level: "Intermediate",
    gender: "Men",
    sections: [
      {
        title: "Warm-Up",
        exercises: [
          { name: "High knees", duration: "2 minutes" },
          { name: "Arm swings with light dumbbells", duration: "1 minute" },
          { name: "Dynamic lunges", duration: "1 minute per leg" },
        ],
      },
      {
        title: "Main Workout",
        exercises: [
          { name: "Deadlifts with weights", sets: 3, reps: 10 },
          { name: "Push-ups", sets: 3, reps: 15 },
          {
            name: "Plank to shoulder taps",
            sets: 3,
            reps: 12,
            description: "per side",
          },
          { name: "Jump squats", sets: 3, reps: 12 },
          { name: "Burpees", sets: 3, reps: 10 },
        ],
      },
      {
        title: "Cool-Down",
        exercises: [
          { name: "Butterfly stretch", duration: "30 seconds" },
          { name: "Seated spinal twist", duration: "30 seconds per side" },
          { name: "Shoulder stretch", duration: "30 seconds per side" },
        ],
      },
    ],
  },
  {
    level: "Intermediate",
    gender: "Women",
    sections: [
      {
        title: "Warm-Up",
        exercises: [
          { name: "Side steps with arm swings", duration: "2 minutes" },
          { name: "Light jogging in place", duration: "1 minute" },
          { name: "Bodyweight lunges", duration: "1 minute per leg" },
        ],
      },
      {
        title: "Main Workout",
        exercises: [
          { name: "Dumbbell squats", sets: 3, reps: 10 },
          { name: "Modified push-ups", sets: 3, reps: 12 },
          {
            name: "Russian twists with weights",
            sets: 3,
            reps: 10,
            description: "per side",
          },
          {
            name: "Side planks",
            sets: 3,
            duration: "20 seconds",
            description: "per side",
          },
          { name: "Skaters", sets: 3, reps: 12, description: "per side" },
        ],
      },
      {
        title: "Cool-Down",
        exercises: [
          { name: "Seated forward fold", duration: "30 seconds" },
          { name: "Child's pose", duration: "30 seconds" },
          { name: "Quad stretch", duration: "30 seconds per leg" },
        ],
      },
    ],
  },
  {
    level: "Pro",
    gender: "Men",
    sections: [
      {
        title: "Warm-Up",
        exercises: [
          { name: "Jump rope", duration: "3 minutes" },
          {
            name: "Dynamic lunges with a twist",
            duration: "1 minute per side",
          },
          { name: "Side shuffles", duration: "1 minute" },
        ],
      },
      {
        title: "Main Workout",
        exercises: [
          { name: "Weighted squats", sets: 4, reps: 12 },
          { name: "Pull-ups or assisted pull-ups", sets: 4, reps: 8 },
          { name: "Weighted deadlifts", sets: 4, reps: 10 },
          { name: "Mountain climbers", sets: 4, duration: "20 seconds" },
          {
            name: "Sprint intervals",
            duration: "30 seconds sprint, 1-minute rest x 5 rounds",
          },
        ],
      },
      {
        title: "Cool-Down",
        exercises: [
          { name: "Pigeon pose", duration: "30 seconds per side" },
          { name: "Hamstring stretch", duration: "30 seconds per side" },
          { name: "Chest opener", duration: "30 seconds" },
        ],
      },
    ],
  },
  {
    level: "Pro",
    gender: "Women",
    sections: [
      {
        title: "Warm-Up",
        exercises: [
          { name: "High knees with arm swings", duration: "3 minutes" },
          {
            name: "Side lunges with torso twists",
            duration: "1 minute per side",
          },
          { name: "Jumping jacks", duration: "2 minutes" },
        ],
      },
      {
        title: "Main Workout",
        exercises: [
          { name: "Dumbbell deadlifts", sets: 4, reps: 12 },
          { name: "Push-ups", sets: 4, reps: 15 },
          {
            name: "Bulgarian split squats",
            sets: 4,
            reps: 10,
            description: "per side",
          },
          { name: "Burpees with a jump", sets: 4, reps: 12 },
          {
            name: "Interval running",
            duration: "30 seconds sprint, 1-minute rest x 5 rounds",
          },
        ],
      },
      {
        title: "Cool-Down",
        exercises: [
          { name: "Butterfly stretch", duration: "30 seconds" },
          { name: "Seated forward fold", duration: "30 seconds" },
          { name: "Lizard pose", duration: "30 seconds per side" },
        ],
      },
    ],
  },
];
