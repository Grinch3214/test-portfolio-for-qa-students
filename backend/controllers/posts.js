import { mockData, getNextId } from '../mockdata.js';
import { pool } from '../db.js';

async function getAllPosts(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error loading posts:', err);
    res.status(500).json({ message: 'Error load posts', error: err.message });
  }
}

async function getSinglePost(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error searching post:', err);
    res.status(500).json({ message: 'Error search post', error: err.message });
  }
}

async function createPost(req, res) {
  try {
    const {
      title,
      body,
      tags = [],
      reactions = { likes: 0, dislikes: 0 },
      views = 0,
      user_id,
    } = req.body;

    if (!title || !body || user_id === undefined) {
      return res.status(400).json({
        message: 'Missing required fields: title, body or user_id',
      });
    }

    const result = await pool.query(
      `
        INSERT INTO posts (title, body, tags, reactions, views, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      [title, body, tags, JSON.stringify(reactions), views, user_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating post:', err);
    res
      .status(500)
      .json({ message: 'Error creating post', error: err.message });
  }
}

// function updateWorkout(req, res) {
//   const id = Number(req.params.id);
//   const { title, sets } = req.body;

//   for (const day of mockData) {
//     const workout = day.workouts.find((w) => w.id === id);
//     if (workout) {
//       if (title !== undefined) workout.title = title;
//       if (Array.isArray(sets))
//         workout.sets = sets.map((s) => ({
//           weight: Number(s.weight),
//           reps: Number(s.reps),
//         }));

//       return res.json(workout);
//     }
//   }

//   res.status(404).json({ message: 'Workout not found' });
// }

// function deleteWorkouts(req, res) {
//   const id = Number(req.params.id);

//   for (const day of mockData) {
//     const index = day.workouts.findIndex((w) => w.id === id);
//     if (index !== -1) {
//       day.workouts.splice(index, 1);
//       return res.status(200).json({ message: 'Workout deleted', id });
//     }
//   }

//   res.status(404).json({ message: 'Workout not found' });
// }

export { getAllPosts, getSinglePost, createPost };
