class ResponseUtil {
    constructor(result, error) {
        return {
            result: result,
            error: error
        }
    }
}
module.exports = ResponseUtil;