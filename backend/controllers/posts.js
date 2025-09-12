import { mockData, getNextId } from '../mockdata.js';

function getAllPosts(req, res) {
  res.json(mockData);
}

function getSinglePost(req, res) {
  const { id } = req.params;

  const post = mockData.find((item) => item.id === id);

  if (post) {
    res.json(day);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
}

function postWorkouts(req, res) {
  const { date, title, sets } = req.body;

  console.log(date, title, sets);

  if (!date || !title || !Array.isArray(sets)) {
    return res
      .status(400)
      .json({ message: 'Missing required fields: date, title, sets' });
  }

  const day = mockData.find((d) => d.date === date);

  const newWorkout = {
    id: getNextId(),
    title,
    sets: sets.map((s) => ({
      weight: Number(s.weight),
      reps: Number(s.reps),
    })),
  };

  if (day) {
    day.workouts.push(newWorkout);
  } else {
    mockData.push({
      date,
      workouts: [newWorkout],
    });
  }

  res.status(201).json(newWorkout);
}

function updateWorkout(req, res) {
  const id = Number(req.params.id);
  const { title, sets } = req.body;

  for (const day of mockData) {
    const workout = day.workouts.find((w) => w.id === id);
    if (workout) {
      if (title !== undefined) workout.title = title;
      if (Array.isArray(sets))
        workout.sets = sets.map((s) => ({
          weight: Number(s.weight),
          reps: Number(s.reps),
        }));

      return res.json(workout);
    }
  }

  res.status(404).json({ message: 'Workout not found' });
}

function deleteWorkouts(req, res) {
  const id = Number(req.params.id);

  for (const day of mockData) {
    const index = day.workouts.findIndex((w) => w.id === id);
    if (index !== -1) {
      day.workouts.splice(index, 1);
      return res.status(200).json({ message: 'Workout deleted', id });
    }
  }

  res.status(404).json({ message: 'Workout not found' });
}

export { getAllPosts, getSinglePost };
