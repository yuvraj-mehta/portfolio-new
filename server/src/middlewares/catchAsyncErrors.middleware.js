/**
 * A higher-order function that wraps asynchronous Express route handlers
 * to catch any rejected promises and pass them to the global error handler.
 *
 * @param {Function} theFunction - The asynchronous Express middleware/route handler to wrap.
 * @returns {Function} An Express middleware function that catches errors and forwards them via `next()`.
 */
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
