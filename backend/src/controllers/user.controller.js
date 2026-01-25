export function me(req, res) {
  return res.json({
    id: req.userId
  });
}
