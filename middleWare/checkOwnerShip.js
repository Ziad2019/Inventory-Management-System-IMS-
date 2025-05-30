import asyncHandler from 'express-async-handler';
// Middleware to check profile data

export const checkOwnership = asyncHandler(async (req, res, next) => {
  
  const requestedUserId = req.params.id;

  // req.user._id that token
  const tokenUserId = req.user._id.toString();

  
  if (requestedUserId !== tokenUserId) {
    return res.status(403).json({
      message: "Access denied. You can only access your own data.",
    });
  }
console.log(req.user)
  next();
});