export const validateSchema = (schema) => (req, res, next) => {

  try {
     // Convert dueDate string to a JavaScript Date object
     if (req.body && req.body.dueDate) {
      req.body.dueDate = new Date(req.body.dueDate);
    }
    
    schema.parse(req.body);
    next();
  } catch (error) {
   
    return res
      .status(400)
      .json(error.errors.map((error) => error.message) );
  }
};
