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
    const result = await pool.query(
      `
				SELECT 
					p.id,
					p.title,
					p.body,
					p.tags,
					p.reactions,
					p.views,
					p.user_id,
					p.created_at,
					p.updated_at,
					u.fullname AS author_name
				FROM posts p
				JOIN users u ON p.user_id = u.id
				WHERE p.id = $1
				`,
      [id]
    );

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

async function incrementPostViews(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE posts
      SET views = views + 1
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      message: 'View count incremented',
    });
  } catch (err) {
    console.error('Error incrementing post views:', err);
    res.status(500).json({
      message: 'Error incrementing views',
      error: err.message,
    });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Post with ID ${id} not found`,
      });
    }

    res.json({
      message: `Post with ID ${id} deleted`,
      id,
    });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(400).json({ message: 'Wrong ID post', error: err.message });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, body, tags, reactions, views, user_id } = req.body;

    if (
      !title &&
      !body &&
      tags === undefined &&
      reactions === undefined &&
      views === undefined &&
      user_id === undefined
    ) {
      return res.status(400).json({
        message: 'No fields to update provided',
      });
    }

    if (title !== undefined && !title) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }
    if (body !== undefined && !body) {
      return res.status(400).json({ message: 'Body cannot be empty' });
    }
    if (user_id !== undefined && user_id === null) {
      return res.status(400).json({ message: 'user_id cannot be null' });
    }

    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (title !== undefined) {
      fields.push(`title = $${paramIndex}`);
      values.push(title);
      paramIndex++;
    }
    if (body !== undefined) {
      fields.push(`body = $${paramIndex}`);
      values.push(body);
      paramIndex++;
    }
    if (tags !== undefined) {
      fields.push(`tags = $${paramIndex}`);
      values.push(tags);
      paramIndex++;
    }
    if (reactions !== undefined) {
      fields.push(`reactions = $${paramIndex}`);
      values.push(JSON.stringify(reactions));
      paramIndex++;
    }
    if (views !== undefined) {
      fields.push(`views = $${paramIndex}`);
      values.push(views);
      paramIndex++;
    }
    if (user_id !== undefined) {
      fields.push(`user_id = $${paramIndex}`);
      values.push(user_id);
      paramIndex++;
    }

    fields.push(`updated_at = NOW()`);

    const query = `
      UPDATE posts
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      message: 'Post updated successfully',
      post: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({
      message: 'Error updating post',
      error: err.message,
    });
  }
}

export {
  getAllPosts,
  getSinglePost,
  createPost,
  incrementPostViews,
  updatePost,
  deletePost,
};
