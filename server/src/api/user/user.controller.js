
async function me(req, res, next) {
  try {
    return res.json({ ...req.user });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  me,
};
