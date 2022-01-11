const apiStatus = (res, result = 'OK', code = 200, meta = null) => {
  
    const apiResult = { code, result };
    if (meta !== null) {
        apiResult.meta = meta;
    }
    res.status(code).json(apiResult);
    return result;
};
module.exports = {apiStatus}