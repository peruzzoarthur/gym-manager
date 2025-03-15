import { PrismaClient, Role, Group, Tempo } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Utility functions
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(
  min: number,
  max: number,
  decimals: number = 1,
): number {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

function getRandomArrayElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomArrayElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Generate Users
async function generateUsers() {
  const users = [];
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Maria',
    'Robert',
    'Emma',
    'Thomas',
    'Olivia',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Wilson',
    'Taylor',
  ];

  // Create one admin user
  const adminId = uuidv4();
  users.push({
    id: adminId,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    dob: generateRandomDate(new Date(1980, 0, 1), new Date(2000, 0, 1)),
    role: Role.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
    profileImage: null,
  });

  // Create regular users
  for (let i = 0; i < 10; i++) {
    const firstName = getRandomArrayElement(firstNames);
    const lastName = getRandomArrayElement(lastNames);
    const domain = getRandomArrayElement(domains);

    users.push({
      id: uuidv4(),
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomInt(1, 999)}@${domain}`,
      password: await bcrypt.hash('password123', 10),
      dob: generateRandomDate(new Date(1980, 0, 1), new Date(2005, 0, 1)),
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImage: null,
    });
  }

  return users;
}

// Generate Exercise References
async function generateExerciseReferences(creatorIds: string[]) {
  const exercisesByGroup = {
    [Group.CHEST]: [
      'Bench Press',
      'Incline Bench Press',
      'Decline Bench Press',
      'Dumbbell Fly',
      'Cable Crossover',
      'Push-Up',
      'Dumbbell Press',
    ],
    [Group.BACK]: [
      'Pull-Up',
      'Lat Pulldown',
      'Bent Over Row',
      'T-Bar Row',
      'Face Pull',
      'Deadlift',
      'Seated Cable Row',
    ],
    [Group.SHOULDERS]: [
      'Overhead Press',
      'Lateral Raise',
      'Front Raise',
      'Reverse Fly',
      'Shrug',
      'Arnold Press',
    ],
    [Group.BICEPS]: [
      'Barbell Curl',
      'Dumbbell Curl',
      'Hammer Curl',
      'Preacher Curl',
      'Cable Curl',
      'Concentration Curl',
    ],
    [Group.TRICEPS]: [
      'Tricep Pushdown',
      'Tricep Extension',
      'Skull Crusher',
      'Close-Grip Bench Press',
      'Dips',
      'Overhead Tricep Extension',
    ],
    [Group.LEGS]: [
      'Squat',
      'Leg Press',
      'Leg Extension',
      'Leg Curl',
      'Lunge',
      'Romanian Deadlift',
      'Hip Thrust',
    ],
    [Group.CALVES]: [
      'Standing Calf Raise',
      'Seated Calf Raise',
      'Calf Press',
      'Donkey Calf Raise',
    ],
    [Group.COMPLEX]: [
      'Clean and Jerk',
      'Snatch',
      'Power Clean',
      'Thruster',
      'Burpee',
      'Turkish Get-Up',
      'Kettlebell Swing',
    ],
  };

  const exerciseReferences = [];

  // Create exercise references for each group
  for (const [group, exercises] of Object.entries(exercisesByGroup)) {
    for (const exercise of exercises) {
      exerciseReferences.push({
        id: uuidv4(),
        name: exercise,
        groups: [group as Group],
        createdByUserId: getRandomArrayElement(creatorIds),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return exerciseReferences;
}

// Generate Trainings with Training Groups and Exercises
async function generateTrainings(users: any[], exerciseReferences: any[]) {
  const trainings = [];
  const trainingGroups = [];
  const exercises = [];
  const combinedExercises = [];

  // Training names and objectives
  const trainingNames = [
    'Strength Training',
    'Hypertrophy',
    'Endurance',
    'Full Body',
    'Push/Pull/Legs',
    'Upper/Lower Split',
  ];
  const objectives = [
    'Build muscle',
    'Increase strength',
    'Improve endurance',
    'Weight loss',
    'Athletic performance',
    'General fitness',
  ];

  // Generate trainings for each user
  for (const user of users) {
    const trainingCount = getRandomInt(1, 3);

    for (let i = 0; i < trainingCount; i++) {
      const daysInWeek = getRandomInt(3, 6);
      const trainingName = getRandomArrayElement(trainingNames);
      const objective = getRandomArrayElement(objectives);
      const trainingId = uuidv4();

      trainings.push({
        id: trainingId,
        name: `${user.firstName}'s ${trainingName} ${i + 1}`,
        userId: user.id,
        daysInWeek,
        done: Math.random() > 0.7,
        createdAt: new Date(),
        updatedAt: new Date(),
        objective,
        createdByUserId: user.id,
      });

      // Generate training groups for each training
      for (let j = 0; j < daysInWeek; j++) {
        const groupKey = `day${j + 1}`;
        const trainingGroupId = uuidv4();

        // Select random muscle groups for this training day
        const muscleGroups = getRandomArrayElements(
          Object.values(Group),
          getRandomInt(2, 4),
        );

        trainingGroups.push({
          id: trainingGroupId,
          key: groupKey,
          done: Math.random() > 0.7,
          doneAt: Math.random() > 0.7 ? new Date() : null,
          groups: muscleGroups,
          trainingId,
          number: j + 1,
          active: j === 0, // First group is active
          activeAt: j === 0 ? new Date() : null,
        });

        // Get exercise references for selected muscle groups
        const relevantExerciseRefs = exerciseReferences.filter((ref) =>
          ref.groups.some((g: Group) => muscleGroups.includes(g)),
        );

        // Determine if we'll use combined exercises
        const useCombined = Math.random() > 0.7;

        if (useCombined) {
          // Create 1-2 combined exercises
          const combinedCount = getRandomInt(1, 2);

          for (let k = 0; k < combinedCount; k++) {
            const combinedExerciseId = uuidv4();
            const exerciseCount = getRandomInt(2, 3);
            const selectedExerciseRefs = getRandomArrayElements(
              relevantExerciseRefs,
              exerciseCount,
            );
            const combinedExerciseIds = [];

            // Create individual exercises that will be part of the combined exercise
            for (let l = 0; l < exerciseCount; l++) {
              const exerciseId = uuidv4();
              const selectedRef = selectedExerciseRefs[l];

              exercises.push({
                id: exerciseId,
                refId: selectedRef.id,
                load: getRandomFloat(5, 100),
                reps: getRandomInt(8, 15),
                sets: getRandomInt(3, 5),
                index: l,
                tempo: getRandomArrayElement(Object.values(Tempo)),
              });

              combinedExerciseIds.push(exerciseId);
            }

            // Create the combined exercise
            combinedExercises.push({
              id: combinedExerciseId,
              exerciseIds: combinedExerciseIds,
              index: k,
              trainingGroupIds: [trainingGroupId],
            });
          }
        }

        // Create regular exercises
        const regularExerciseCount = getRandomInt(3, 6);
        const selectedRegularExerciseRefs = getRandomArrayElements(
          relevantExerciseRefs,
          regularExerciseCount,
        );

        for (let k = 0; k < regularExerciseCount; k++) {
          const exerciseId = uuidv4();
          const selectedRef = selectedRegularExerciseRefs[k];

          exercises.push({
            id: exerciseId,
            refId: selectedRef.id,
            load: getRandomFloat(5, 100),
            reps: getRandomInt(8, 15),
            sets: getRandomInt(3, 5),
            index: useCombined ? k + 2 : k, // Adjust index if we have combined exercises
            tempo:
              Math.random() > 0.5
                ? getRandomArrayElement(Object.values(Tempo))
                : null,
            trainingGroupIds: [trainingGroupId],
          });
        }
      }
    }

    // Set activeTrainingId for some users
    if (Math.random() > 0.3 && trainings.length > 0) {
      const userTrainings = trainings.filter((t) => t.userId === user.id);
      if (userTrainings.length > 0) {
        user.activeTrainingId = getRandomArrayElement(userTrainings).id;
      }
    }
  }

  return { trainings, trainingGroups, exercises, combinedExercises };
}

// Main seed function
async function main() {
  try {
    // Clear existing data
    await prisma.combinedExercise.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.trainingGroup.deleteMany();
    await prisma.training.deleteMany();
    await prisma.exerciseReference.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database cleared');

    // Create admin
    await prisma.user.create({
      data: {
        firstName: 'Arthur',
        lastName: 'Peruzzo',
        id: uuidv4(),
        email: 'peruzzoarthur@gmail.com',
        password:
          '$argon2id$v=19$m=65536,t=3,p=4$pE2HY5J0F7FxZSNNofOS0A$IArtlLtiHinZd03j+pUnWz1Fkm6MXaQg5aLCsd1rPWI',
        dob: new Date(1991, 12, 21),
        role: 'ADMIN',
      },
    });
    // Generate users
    const users = await generateUsers();
    await prisma.user.createMany({ data: users });
    console.log(`Created ${users.length} users`);

    // Generate exercise references
    const userIds = users.map((user) => user.id);
    const exerciseReferences = await generateExerciseReferences(userIds);

    for (const reference of exerciseReferences) {
      await prisma.exerciseReference.create({
        data: {
          id: reference.id,
          name: reference.name,
          groups: reference.groups,
          createdByUserId: reference.createdByUserId,
          createdAt: reference.createdAt,
          updatedAt: reference.updatedAt,
        },
      });
    }
    console.log(`Created ${exerciseReferences.length} exercise references`);

    // Generate trainings and related data
    const { trainings, trainingGroups, exercises, combinedExercises } =
      await generateTrainings(users, exerciseReferences);

    // Create trainings
    await prisma.training.createMany({ data: trainings });
    console.log(`Created ${trainings.length} trainings`);

    // Update users with activeTrainingId
    for (const user of users) {
      if (user.activeTrainingId) {
        await prisma.user.update({
          where: { id: user.id },
          data: { activeTrainingId: user.activeTrainingId },
        });
      }
    }

    // Create training groups
    for (const group of trainingGroups) {
      await prisma.trainingGroup.create({
        data: {
          id: group.id,
          key: group.key,
          done: group.done,
          doneAt: group.doneAt,
          groups: group.groups,
          trainingId: group.trainingId,
          number: group.number,
          active: group.active,
          activeAt: group.activeAt,
        },
      });
    }
    console.log(`Created ${trainingGroups.length} training groups`);

    // Create exercises
    for (const exercise of exercises) {
      await prisma.exercise.create({
        data: {
          id: exercise.id,
          refId: exercise.refId,
          load: exercise.load,
          reps: exercise.reps,
          sets: exercise.sets,
          index: exercise.index,
          tempo: exercise.tempo,
          trainingGroups: exercise.trainingGroupIds
            ? { connect: exercise.trainingGroupIds.map((id) => ({ id })) }
            : undefined,
        },
      });
    }
    console.log(`Created ${exercises.length} exercises`);

    // Create combined exercises
    for (const combined of combinedExercises) {
      await prisma.combinedExercise.create({
        data: {
          id: combined.id,
          index: combined.index,
          exercises: {
            connect: combined.exerciseIds.map((id) => ({ id })),
          },
          trainingGroups: {
            connect: combined.trainingGroupIds.map((id) => ({ id })),
          },
        },
      });
    }
    console.log(`Created ${combinedExercises.length} combined exercises`);

    // Print statistics
    console.log('\nSeed Statistics:');
    console.log('---------------');
    console.log(`Users: ${users.length}`);
    console.log(`Exercise References: ${exerciseReferences.length}`);
    console.log(`Trainings: ${trainings.length}`);
    console.log(`Training Groups: ${trainingGroups.length}`);
    console.log(`Exercises: ${exercises.length}`);
    console.log(`Combined Exercises: ${combinedExercises.length}`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
