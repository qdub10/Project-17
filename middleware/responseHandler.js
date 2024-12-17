const responseHandler = (req, res, next) => {
    // Standardized success response
    res.success = (data) => res.status(200).json(data);
  
    // Standardized error response
    res.error = (message, status = 500) => res.status(status).json({ error: message });
  
    next();
  };
  
  module.exports = responseHandler;
  