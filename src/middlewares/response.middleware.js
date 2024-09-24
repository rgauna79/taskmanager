export const handleResponse = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data: data,
  })
};