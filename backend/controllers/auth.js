export function checkAuth(req, res) {
  res.json({ authenticated: true, user: req.user });
}
