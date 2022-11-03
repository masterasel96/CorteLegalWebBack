export enum HttpMessages {
    UNAUTHORIZE_USER_MESSAGE = "Unauthorized user",
    UNAUTHORIZE_APIKEY_MESSAGE = "Unauthorized apikey",

    INVALID_REQUEST_MESSAGE = "Invalid request",
    INVALID_REQUEST_DATA_MESSAGE = "Data can't be null",
    INVALID_REQUEST_STRUCTURE_MESSAGE = "There are errors in your request",

    SUCCESS_FETCH_MESSAGE = "Data fetched succesfully",
    SUCCESS_UPDATE_MESSAGE = "Data updated succesfully",
    SUCCESS_DELETE_MESSAGE = "Data deleted succesfully",
    SUCCESS_CREATE_MESSAGE = "Data created succesfully",

    FAIL_FETCH_MESSAGE = "Data could´t be fetched",
    FAIL_UPDATE_MESSAGE = "Data could´t be updated",
    FAIL_DELETE_MESSAGE = "Data could´t be deleted",
    FAIL_CREATE_MESSAGE = "Data could´t be created",

    SUCCESS_OPERATION_MESSAGE = "Operation success",
    FAIL_OPERATION_MESSAGE = "Operation failed"
}

export enum HttpCodes {
    HTTP_SUCCESS = 200,
    HTTP_MODIFIED = 201,
    HTTP_UNAUTHORIZED = 401,
    HTTP_NOT_FOUND = 404,
    HTTP_BAD_REQUEST = 400,
    HTTP_INTERNAL_ERROR = 500
}

export const TooManyRequest = "Too many requests from this ip, are you trying to hack my app?"