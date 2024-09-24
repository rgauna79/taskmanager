export const handleResponse = (req, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data: data,
  })
};