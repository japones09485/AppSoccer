import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-a26bf010.js';

/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */
/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
let nextMessageID = 0;
function getNextMessageID() {
    const msgId = nextMessageID;
    nextMessageID = nextMessageID + 1;
    return msgId;
}
class BaseRequestMessage {
    constructor(action) {
        this.action = action;
        this.messageID = getNextMessageID();
    }
}
class InitMessage extends BaseRequestMessage {
    constructor(wasmLoadSettings, userId) {
        super(InitMessage.action);
        this.wasmModuleName = wasmLoadSettings.wasmModuleName;
        this.licenseKey = wasmLoadSettings.licenseKey;
        this.userId = userId;
        this.registerLoadCallback = wasmLoadSettings.loadProgressCallback !== null;
        this.allowHelloMessage = wasmLoadSettings.allowHelloMessage;
        this.engineLocation = wasmLoadSettings.engineLocation;
        this.wasmType = wasmLoadSettings.wasmType;
        this.initialMemory = wasmLoadSettings.initialMemory;
        this.blinkIDVariant = wasmLoadSettings.blinkIdVariant;
        this.numberOfWorkers = wasmLoadSettings.numberOfWorkers;
    }
}
InitMessage.action = "init";
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["Any"] = 0] = "Any";
    ParameterType[ParameterType["Recognizer"] = 1] = "Recognizer";
    ParameterType[ParameterType["RecognizerSettings"] = 2] = "RecognizerSettings";
    ParameterType[ParameterType["Callback"] = 3] = "Callback";
})(ParameterType || (ParameterType = {}));
class CreateNewRecognizer extends BaseRequestMessage {
    constructor(className, params) {
        super(CreateNewRecognizer.action);
        this.className = className;
        this.params = params;
    }
}
CreateNewRecognizer.action = "createNewNativeObject";
class CreateRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults, registeredMetadataCallbacks) {
        super(CreateRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
CreateRecognizerRunner.action = "createRecognizerRunner";
class ReconfigureRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults) {
        super(ReconfigureRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
    }
}
ReconfigureRecognizerRunner.action = "reconfigureRecognizerRunner";
class DeleteRecognizerRunner extends BaseRequestMessage {
    constructor() {
        super(DeleteRecognizerRunner.action);
    }
}
DeleteRecognizerRunner.action = "deleteRecognizerRunner";
class InvokeObjectMethod extends BaseRequestMessage {
    constructor(objectHandle, methodName, params) {
        super(InvokeObjectMethod.action);
        this.objectHandle = objectHandle;
        this.methodName = methodName;
        this.params = params;
    }
}
InvokeObjectMethod.action = "invokeObject";
class ProcessImage extends BaseRequestMessage {
    constructor(image) {
        super(ProcessImage.action);
        this.frame = image;
    }
    getTransferrables() {
        return [this.frame.imageData.data.buffer];
    }
}
ProcessImage.action = "processImage";
class ResetRecognizers extends BaseRequestMessage {
    constructor(hardReset) {
        super(ResetRecognizers.action);
        this.hardReset = hardReset;
    }
}
ResetRecognizers.action = "resetRecognizers";
class RegisteredMetadataCallbacks {
    constructor() {
        this.onDebugText = false;
        this.onDetectionFailed = false;
        this.onQuadDetection = false;
        this.onPointsDetection = false;
        this.onFirstSideResult = false;
    }
}
class RegisterMetadataCallbacks extends BaseRequestMessage {
    constructor(registeredMetadataCallbacks) {
        super(RegisterMetadataCallbacks.action);
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
RegisterMetadataCallbacks.action = "registerMetadataCallbacks";
class SetDetectionOnly extends BaseRequestMessage {
    constructor(detectionOnlyMode) {
        super(SetDetectionOnly.action);
        this.detectionOnlyMode = detectionOnlyMode;
    }
}
SetDetectionOnly.action = "setDetectionOnly";
class SetCameraPreviewMirrored extends BaseRequestMessage {
    constructor(cameraPreviewMirrored) {
        super(SetCameraPreviewMirrored.action);
        this.cameraPreviewMirrored = cameraPreviewMirrored;
    }
}
SetCameraPreviewMirrored.action = "setCameraPreviewMirrored";
class GetProductIntegrationInfo extends BaseRequestMessage {
    constructor(userId) {
        super(GetProductIntegrationInfo.action);
        this.userId = userId;
    }
}
GetProductIntegrationInfo.action = "getProductIntegrationInfo";
class SetPingProxyUrl extends BaseRequestMessage {
    constructor(pingProxyUrl) {
        super(SetPingProxyUrl.action);
        this.pingProxyUrl = pingProxyUrl;
    }
}
SetPingProxyUrl.action = "setPingProxyUrl";
// ===================================== /
// Metadata callback messages
// ===================================== /
var MetadataCallback;
(function (MetadataCallback) {
    MetadataCallback[MetadataCallback["onDebugText"] = 0] = "onDebugText";
    MetadataCallback[MetadataCallback["onDetectionFailed"] = 1] = "onDetectionFailed";
    MetadataCallback[MetadataCallback["onQuadDetection"] = 2] = "onQuadDetection";
    MetadataCallback[MetadataCallback["onPointsDetection"] = 3] = "onPointsDetection";
    MetadataCallback[MetadataCallback["onFirstSideResult"] = 4] = "onFirstSideResult";
    MetadataCallback[MetadataCallback["recognizerCallback"] = 5] = "recognizerCallback";
})(MetadataCallback || (MetadataCallback = {}));
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Defines the type of the WASM that will be loaded.
 */
var WasmType;
(function (WasmType) {
    /**
     * The WASM that will be loaded will be most compatible with all browsers that
     * support the WASM, but will lack features that could be used to improve performance.
     */
    WasmType["Basic"] = "BASIC";
    /**
     * The WASM that will be loaded will be built with advanced WASM features, such as
     * bulk memory, SIMD, non-trapping floating point and sign extension. Such WASM can only
     * be executed in browsers that support those features. Attempting to run this
     * WASM in a non-compatible browser will crash your app.
     */
    WasmType["Advanced"] = "ADVANCED";
    /**
     * The WASM that will be loaded will be build with advanced WASM features, just
     * like above. Additionally, it will be also built with support for multi-threaded
     * processing. This feature requires a browser with support for both advanced WASM
     * features and `SharedArrayBuffer`
     */
    WasmType["AdvancedWithThreads"] = "ADVANCED_WITH_THREADS";
})(WasmType || (WasmType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const defaultWasmModuleName = "BlinkIDWasmSDK";

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment */
class SDKError extends Error {
    constructor(error, details) {
        super();
        if (!error.code || !error.message) {
            throw new Error("Instance of SDKError is required to have code and message.");
        }
        this.message = error.message;
        this.code = error.code;
        if ("details" in error) {
            if ("message" in error.details) {
                const errorObj = new Error(error.details.message);
                if ("stack" in error.details) {
                    errorObj.stack = error.details.stack;
                }
                this.details = errorObj;
            }
        }
        else {
            this.details = details;
        }
    }
}
class SerializableSDKError {
    constructor(error, details) {
        if (!error.code || !error.message) {
            throw new Error("Instance of SDKError is required to have code and message.");
        }
        this.message = error.message;
        this.code = error.code;
        if (details instanceof Error) {
            this.details = new CustomError(details);
        }
        else {
            this.details = details;
        }
    }
}
class CustomError {
    constructor(error) {
        this.message = error.message;
        this.name = error.name;
        this.stack = error.stack;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Checks if provided string is valid secure URL without subpaths.
 * @param url URL to check.
 * @returns Boolean indicating if provided URL is valid.
 */
function isValidURL(url) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^https:\/\/[^\/]+(?::\d+)?\/?$/;
    return regex.test(url);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable max-len */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
var ErrorCodes$1;
(function (ErrorCodes) {
    ErrorCodes["WORKER_WASM_LOAD_FAILURE"] = "WORKER_WASM_LOAD_FAILURE";
    ErrorCodes["WORKER_WASM_INIT_MISSING"] = "WORKER_WASM_INIT_MISSING";
    ErrorCodes["WORKER_FUNCTION_INVOKE_FAILURE"] = "WORKER_FUNCTION_INVOKE_FAILURE";
    ErrorCodes["WORKER_RECOGNIZER_CREATION_FAILURE"] = "WORKER_RECOGNIZER_CREATION_FAILURE";
    ErrorCodes["WORKER_RUNNER_EXISTS"] = "WORKER_RUNNER_EXISTS";
    ErrorCodes["WORKER_RUNNER_CREATION_FAILURE"] = "WORKER_RUNNER_CREATION_FAILURE";
    ErrorCodes["WORKER_RUNNER_MISSING"] = "WORKER_RUNNER_MISSING";
    ErrorCodes["WORKER_RUNNER_RECONFIGURE_FAILURE"] = "WORKER_RUNNER_RECONFIGURE_FAILURE";
    ErrorCodes["WORKER_RUNNER_DELETED"] = "WORKER_RUNNER_DELETED";
    ErrorCodes["WORKER_RUNNER_DELETE_FAILURE"] = "WORKER_RUNNER_DELETE_FAILURE";
    ErrorCodes["WORKER_OBJECT_INVOKE_FAILURE"] = "WORKER_OBJECT_INVOKE_FAILURE";
    ErrorCodes["WORKER_IMAGE_PROCESS_FAILURE"] = "WORKER_IMAGE_PROCESS_FAILURE";
    ErrorCodes["WORKER_HANDLE_UNDEFINED"] = "WORKER_HANDLE_UNDEFINED";
    ErrorCodes["WORKER_MESSAGE_ACTION_UNKNOWN"] = "WORKER_MESSAGE_ACTION_UNKNOWN";
    ErrorCodes["WORKER_LICENSE_UNLOCK_ERROR"] = "WORKER_LICENSE_UNLOCK_ERROR";
    ErrorCodes["WORKER_INTEGRATION_INFO_FAILURE"] = "WORKER_INTEGRATION_INFO_FAILURE";
    ErrorCodes["LOCAL_SDK_RUNNER_MISSING"] = "LOCAL_SDK_RUNNER_MISSING";
    ErrorCodes["LOCAL_SDK_RUNNER_EMPTY"] = "LOCAL_SDK_RUNNER_EMPTY";
    ErrorCodes["LICENSE_UNLOCK_ERROR"] = "LICENSE_UNLOCK_ERROR";
    ErrorCodes["FRAME_CAPTURE_SVG_UNSUPPORTED"] = "FRAME_CAPTURE_SVG_UNSUPPORTED";
    ErrorCodes["FRAME_CAPTURE_CANVAS_MISSING"] = "FRAME_CAPTURE_CANVAS_MISSING";
    ErrorCodes["SDK_WASM_SETTINGS_MISSING"] = "SDK_WASM_SETTINGS_MISSING";
    ErrorCodes["SDK_LICENSE_KEY_MISSING"] = "SDK_LICENSE_KEY_MISSING";
    ErrorCodes["SDK_WASM_MODULE_NAME_MISSING"] = "SDK_WASM_MODULE_NAME_MISSING";
    ErrorCodes["SDK_ENGINE_LOCATION_INVALID"] = "SDK_ENGINE_LOCATION_INVALID";
    ErrorCodes["SDK_WORKER_LOCATION_INVALID"] = "SDK_WORKER_LOCATION_INVALID";
    ErrorCodes["SDK_MISSING"] = "SDK_MISSING";
    ErrorCodes["SDK_RECOGNIZERS_MISSING"] = "SDK_RECOGNIZERS_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_ELEMENT_MISSING"] = "VIDEO_RECOGNIZER_ELEMENT_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_MISSING"] = "VIDEO_RECOGNIZER_CAMERA_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED"] = "VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE"] = "VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_IN_USE"] = "VIDEO_RECOGNIZER_CAMERA_IN_USE";
    ErrorCodes["VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED"] = "VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_RELEASED"] = "VIDEO_RECOGNIZER_FEED_RELEASED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_NOT_PAUSED"] = "VIDEO_RECOGNIZER_FEED_NOT_PAUSED";
    ErrorCodes["VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED"] = "VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_PAUSED"] = "VIDEO_RECOGNIZER_FEED_PAUSED";
    ErrorCodes["VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE"] = "VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_MISSING"] = "VIDEO_RECOGNIZER_FEED_MISSING";
    ErrorCodes["INVALID_PING_PROXY_URL"] = "INVALID_PROXY_URL";
    ErrorCodes["PING_PROXY_PERMISSION_NOT_GRANTED"] = "PING_PROXY_PERMISSION_NOT_GRANTED";
})(ErrorCodes$1 || (ErrorCodes$1 = {}));
var ErrorMessages$1;
(function (ErrorMessages) {
    ErrorMessages["WORKER_HANDLE_UNDEFINED"] = "Cannot find object with handle: undefined";
    ErrorMessages["WORKER_WASM_LOAD_FAILURE"] = "Failed to load WASM in web worker!";
    ErrorMessages["WORKER_WASM_INIT_MISSING"] = "WASM module is not initialized!";
    ErrorMessages["WORKER_FUNCTION_INVOKE_FAILURE"] = "Failed to invoke function!";
    ErrorMessages["WORKER_RECOGNIZER_CREATION_FAILURE"] = "Failed to create new recognizer!";
    ErrorMessages["WORKER_RUNNER_EXISTS"] = "Recognizer runner is already created! Multiple instances are not allowed!";
    ErrorMessages["WORKER_RUNNER_CREATION_FAILURE"] = "Failed to create new recognizer runner!";
    ErrorMessages["WORKER_RUNNER_MISSING"] = "Recognizer runner is not created! There is nothing to reconfigure!";
    ErrorMessages["WORKER_RUNNER_RECONFIGURE_FAILURE"] = "Failed to reconfigure recognizer runner!";
    ErrorMessages["WORKER_RUNNER_DELETED"] = "Recognizer runner is already deleted!";
    ErrorMessages["WORKER_RUNNER_DELETE_FAILURE"] = "Failed to delete recognizer runner!";
    ErrorMessages["WORKER_OBJECT_INVOKE_FAILURE"] = "Failed to invoke object!";
    ErrorMessages["WORKER_IMAGE_PROCESS_FAILURE"] = "Recognizer runner is not initialized! Cannot process image!";
    ErrorMessages["WORKER_INTEGRATION_INFO_FAILURE"] = "Failed to get product integration info!";
    ErrorMessages["LOCAL_SDK_RUNNER_MISSING"] = "Property nativeRecognizerRunner is not available!";
    ErrorMessages["LOCAL_SDK_RUNNER_EMPTY"] = "Native RecognizerRunner cannot be empty!";
    ErrorMessages["LICENSE_TOKEN_STATE_INCORRECT"] = "Internal error (Incorrect token state)";
    ErrorMessages["LICENSE_PAYLOAD_VERIFICATION_FAILED"] = "Failed to verify server permission's digital signature!";
    ErrorMessages["LICENSE_PAYLOAD_CORRUPTED"] = "Server permission payload is corrupted!";
    ErrorMessages["LICENSE_PERMISSION_EXPIRED"] = "Internal error (server permission expired)";
    ErrorMessages["LICENSE_REMOTE_LOCKED"] = "Provided license key has been remotely locked. Please contact support for more information!";
    ErrorMessages["FRAME_CAPTURE_SVG_UNSUPPORTED"] = "Recognition of SVG elements not supported!";
    ErrorMessages["FRAME_CAPTURE_CANVAS_MISSING"] = "Could not get canvas 2d context!";
    ErrorMessages["SDK_WASM_SETTINGS_MISSING"] = "Missing WASM load settings!";
    ErrorMessages["SDK_LICENSE_KEY_MISSING"] = "Missing license key!";
    ErrorMessages["SDK_WASM_MODULE_NAME_MISSING"] = "Missing WASM module name!";
    ErrorMessages["SDK_ENGINE_LOCATION_INVALID"] = "Setting property 'engineLocation' must be a string!";
    ErrorMessages["SDK_WORKER_LOCATION_INVALID"] = "Setting property 'workerLocation' must be a string!";
    ErrorMessages["SDK_MISSING"] = "SDK is not provided!";
    ErrorMessages["SDK_RECOGNIZERS_MISSING"] = "To create RecognizerRunner at least 1 recognizer is required.";
    ErrorMessages["VIDEO_RECOGNIZER_ELEMENT_MISSING"] = "Video element, i.e. camera feed is not provided!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_MISSING"] = "Camera not found!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED"] = "Camera not allowed!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE"] = "Camera not available!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_IN_USE"] = "Camera in use!";
    ErrorMessages["VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED"] = "Media devices not supported by browser.";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_RELEASED"] = "The associated video feed has been released!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_NOT_PAUSED"] = "The associated video feed is not paused. Use resumeRecognition instead!";
    ErrorMessages["VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED"] = "The play() request was interrupted or prevented by browser security rules!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_PAUSED"] = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition";
    ErrorMessages["VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE"] = "Could not reset recognizers!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_MISSING"] = "Missing video feed!";
    ErrorMessages["INVALID_PING_PROXY_URL"] = "Provided ping proxy URL is not a valid secure URL in format 'https://{host}:{port?}'.";
    ErrorMessages["PING_PROXY_PERMISSION_NOT_GRANTED"] = "Allow ping proxy permission not found in license.";
})(ErrorMessages$1 || (ErrorMessages$1 = {}));
const videoRecognizerErrors = {
    feedMissing: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_MISSING,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_MISSING,
    },
    recognizersResetFailure: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE,
    },
    feedPaused: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_PAUSED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_PAUSED,
    },
    playRequestInterrupted: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED,
    },
    videoFeedNotPaused: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_NOT_PAUSED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_NOT_PAUSED,
    },
    videoFeedReleased: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_RELEASED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_RELEASED,
    },
    mediaDevicesUnsupported: {
        code: ErrorCodes$1.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED,
        message: ErrorMessages$1.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED,
    },
    cameraMissing: {
        code: ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_MISSING,
        message: ErrorMessages$1.VIDEO_RECOGNIZER_CAMERA_MISSING,
    },
    cameraNotAllowed: {
        code: ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED,
        message: ErrorMessages$1.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED,
    },
    elementMissing: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_ELEMENT_MISSING,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_ELEMENT_MISSING,
    },
};
const sdkErrors = {
    wasmSettingsMissing: {
        message: ErrorMessages$1.SDK_WASM_SETTINGS_MISSING,
        code: ErrorCodes$1.SDK_WASM_SETTINGS_MISSING,
    },
    licenseKeyMissing: {
        message: ErrorMessages$1.SDK_LICENSE_KEY_MISSING,
        code: ErrorCodes$1.SDK_LICENSE_KEY_MISSING,
    },
    wasmModuleNameMissing: {
        message: ErrorMessages$1.SDK_WASM_MODULE_NAME_MISSING,
        code: ErrorCodes$1.SDK_WASM_MODULE_NAME_MISSING,
    },
    engineLocationInvalid: {
        message: ErrorMessages$1.SDK_ENGINE_LOCATION_INVALID,
        code: ErrorCodes$1.SDK_ENGINE_LOCATION_INVALID,
    },
    workerLocationInvalid: {
        message: ErrorMessages$1.SDK_WORKER_LOCATION_INVALID,
        code: ErrorCodes$1.SDK_WORKER_LOCATION_INVALID,
    },
    missing: {
        message: ErrorMessages$1.SDK_MISSING,
        code: ErrorCodes$1.SDK_MISSING,
    },
    recognizersMissing: {
        message: ErrorMessages$1.SDK_RECOGNIZERS_MISSING,
        code: ErrorCodes$1.SDK_RECOGNIZERS_MISSING,
    },
};
const frameCaptureErrors = {
    svgUnsupported: {
        message: ErrorMessages$1.FRAME_CAPTURE_SVG_UNSUPPORTED,
        code: ErrorCodes$1.FRAME_CAPTURE_SVG_UNSUPPORTED,
    },
    canvasMissing: {
        message: ErrorMessages$1.FRAME_CAPTURE_CANVAS_MISSING,
        code: ErrorCodes$1.FRAME_CAPTURE_CANVAS_MISSING,
    },
};
const licenseErrors = {
    licenseTokenStateIncorrect: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_TOKEN_STATE_INCORRECT,
    },
    licensePayloadVerificationFailed: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_PAYLOAD_VERIFICATION_FAILED,
    },
    licensePayloadCorrupted: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_PAYLOAD_CORRUPTED,
    },
    licensePermissionExpired: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_PERMISSION_EXPIRED,
    },
    licenseRemoteLocked: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_REMOTE_LOCKED,
    },
    licenseNetworkError: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
    },
    licenseInvalid: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
    },
};
const localSdkErrors = {
    runnerMissing: {
        message: ErrorMessages$1.LOCAL_SDK_RUNNER_MISSING,
        code: ErrorCodes$1.LOCAL_SDK_RUNNER_MISSING,
    },
    runnerEmpty: {
        message: ErrorMessages$1.LOCAL_SDK_RUNNER_EMPTY,
        code: ErrorCodes$1.LOCAL_SDK_RUNNER_EMPTY,
    },
};
const workerErrors = {
    imageProcessFailure: {
        message: ErrorMessages$1.WORKER_IMAGE_PROCESS_FAILURE,
        code: ErrorCodes$1.WORKER_IMAGE_PROCESS_FAILURE,
    },
    objectInvokeFailure: {
        message: ErrorMessages$1.WORKER_OBJECT_INVOKE_FAILURE,
        code: ErrorCodes$1.WORKER_OBJECT_INVOKE_FAILURE,
    },
    runnerDeleteFailure: {
        message: ErrorMessages$1.WORKER_RUNNER_DELETE_FAILURE,
        code: ErrorCodes$1.WORKER_RUNNER_DELETE_FAILURE,
    },
    runnerDeleted: {
        message: ErrorMessages$1.WORKER_RUNNER_DELETED,
        code: ErrorCodes$1.WORKER_RUNNER_DELETED,
    },
    runnerReconfigureFailure: {
        message: ErrorMessages$1.WORKER_RUNNER_RECONFIGURE_FAILURE,
        code: ErrorCodes$1.WORKER_RUNNER_RECONFIGURE_FAILURE,
    },
    runnerMissing: {
        message: ErrorMessages$1.WORKER_RUNNER_MISSING,
        code: ErrorCodes$1.WORKER_RUNNER_MISSING,
    },
    runnerCreationFailure: {
        message: ErrorMessages$1.WORKER_RUNNER_CREATION_FAILURE,
        code: ErrorCodes$1.WORKER_RUNNER_CREATION_FAILURE,
    },
    runnerExists: {
        message: ErrorMessages$1.WORKER_RUNNER_EXISTS,
        code: ErrorCodes$1.WORKER_RUNNER_EXISTS,
    },
    recognizerCreationFailure: {
        message: ErrorMessages$1.WORKER_RECOGNIZER_CREATION_FAILURE,
        code: ErrorCodes$1.WORKER_RECOGNIZER_CREATION_FAILURE,
    },
    functionInvokeFailure: {
        message: ErrorMessages$1.WORKER_FUNCTION_INVOKE_FAILURE,
        code: ErrorCodes$1.WORKER_FUNCTION_INVOKE_FAILURE,
    },
    wasmInitMissing: {
        message: ErrorMessages$1.WORKER_WASM_INIT_MISSING,
        code: ErrorCodes$1.WORKER_WASM_INIT_MISSING,
    },
    wasmLoadFailure: {
        message: ErrorMessages$1.WORKER_WASM_LOAD_FAILURE,
        code: ErrorCodes$1.WORKER_WASM_LOAD_FAILURE,
    },
    handleUndefined: {
        message: ErrorMessages$1.WORKER_HANDLE_UNDEFINED,
        code: ErrorCodes$1.WORKER_HANDLE_UNDEFINED,
    },
    integrationInfoFailure: {
        message: ErrorMessages$1.WORKER_INTEGRATION_INFO_FAILURE,
        code: ErrorCodes$1.WORKER_INTEGRATION_INFO_FAILURE,
    },
};
const pingProxyErrors = {
    invalidProxyUrl: {
        message: ErrorMessages$1.INVALID_PING_PROXY_URL,
        code: ErrorCodes$1.INVALID_PING_PROXY_URL,
    },
    permissionNotGranted: {
        message: ErrorMessages$1.PING_PROXY_PERMISSION_NOT_GRANTED,
        code: ErrorCodes$1.PING_PROXY_PERMISSION_NOT_GRANTED,
    },
};

/* eslint-disable @typescript-eslint/no-unsafe-argument */
function defaultEventHandler(resolve, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            resolve();
        }
        else {
            if (typeof resultMsg.error === "string" || resultMsg.error === null) {
                reject(resultMsg.error);
            }
            else {
                reject(new SDKError(resultMsg.error));
            }
        }
    };
}
function defaultResultEventHandler(successResolver, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            successResolver(msg);
        }
        else {
            if (typeof resultMsg.error === "string" || resultMsg.error === null) {
                reject(resultMsg.error);
            }
            else {
                reject(new SDKError(resultMsg.error));
            }
        }
    };
}
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
function wrapParameters(params) {
    // convert params
    const wrappedPrameters = [];
    for (let param of params) {
        let paramType = ParameterType.Any;
        if (param instanceof RemoteRecognizer) {
            paramType = ParameterType.Recognizer;
            param = param.getRemoteObjectHandle();
        }
        wrappedPrameters.push({
            parameter: param,
            type: paramType
        });
    }
    return wrappedPrameters;
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
class RemoteRecognizer {
    /* eslint-enable lines-between-class-members */
    constructor(wasmWorker, recognizerName, remoteObjHandle) {
        this.wasmSDKWorker = wasmWorker;
        this.objectHandle = remoteObjHandle;
        this.recognizerName = recognizerName;
        this.callbacks = new Map();
    }
    /* eslint-enable @typescript-eslint/ban-types */
    getRemoteObjectHandle() {
        return this.objectHandle;
    }
    currentSettings() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "currentSettings", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    toSignedJSON() {
        {
            return new Promise((resolve, reject) => {
                if (this.objectHandle < 0) {
                    reject("Invalid object handle: " + this.objectHandle.toString());
                    return;
                }
                const msg = new InvokeObjectMethod(this.objectHandle, "toSignedJSON", []);
                const handler = defaultResultEventHandler((msg) => {
                    resolve(msg.result);
                }, reject);
                this.wasmSDKWorker.postMessage(msg, handler);
            });
        }
    }
    clearAllCallbacks() {
        this.callbacks.clear();
        this.wasmSDKWorker.unregisterRecognizerCallbacks(this.objectHandle);
    }
    /* eslint-disable @typescript-eslint/no-explicit-any,
                      @typescript-eslint/no-unsafe-assignment,
                      @typescript-eslint/no-unsafe-member-access,
                      @typescript-eslint/no-unsafe-return
    */
    // convert each function member into wrapped parameter, containing address where callback needs to be delivered
    removeFunctions(settings) {
        // clear any existing callbacks
        this.clearAllCallbacks();
        const keys = Object.keys(settings);
        let needsRegistering = false;
        for (const key of keys) {
            const data = settings[key];
            if (typeof data === "function") {
                this.callbacks.set(key, data);
                const wrappedFunction = {
                    parameter: {
                        recognizerHandle: this.objectHandle,
                        callbackName: key
                    }, // in order to know to which instance callback needs to be delivered
                    type: ParameterType.Callback
                };
                settings[key] = wrappedFunction;
                needsRegistering = true;
            }
        }
        if (needsRegistering) {
            this.wasmSDKWorker.registerRecognizerCallbacks(this.objectHandle, this);
        }
        return settings;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any,
                     @typescript-eslint/no-unsafe-assignment,
                     @typescript-eslint/no-unsafe-member-access,
                     @typescript-eslint/no-unsafe-return
    */
    updateSettings(newSettings) {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment */
            const msg = new InvokeObjectMethod(this.objectHandle, "updateSettings", [
                {
                    parameter: this.removeFunctions(newSettings),
                    type: ParameterType.RecognizerSettings
                }
            ]);
            /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    invokeCallback(callbackName, args) {
        const callback = this.callbacks.get(callbackName);
        if (callback !== undefined) {
            callback(...args);
        }
        else {
            console.warn("Cannot find callback", callbackName);
        }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    getResult() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "getResult", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            this.clearAllCallbacks();
            const msg = new InvokeObjectMethod(this.objectHandle, "delete", []);
            const handler = defaultEventHandler(() => {
                this.objectHandle = -1;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function createRegisteredCallbacks(metadataCallbacks) {
    const msg = new RegisteredMetadataCallbacks();
    // https://stackoverflow.com/a/20093686/213057
    msg.onDebugText = !!metadataCallbacks.onDebugText;
    msg.onDetectionFailed = !!metadataCallbacks.onDetectionFailed;
    msg.onPointsDetection = !!metadataCallbacks.onPointsDetection;
    msg.onQuadDetection = !!metadataCallbacks.onQuadDetection;
    msg.onFirstSideResult = !!metadataCallbacks.onFirstSideResult;
    return msg;
}
class RemoteRecognizerRunner {
    constructor(wasmWorker, recognizers) {
        this.deleted = false;
        this.wasmSDKWorker = wasmWorker;
        this.recognizers = recognizers;
    }
    processImage(image) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const msg = new ProcessImage(image);
            const handler = defaultResultEventHandler((response) => {
                const state = response.recognitionState;
                resolve(state);
            }, reject);
            this.wasmSDKWorker.postTransferrableMessage(msg, handler);
        });
    }
    reconfigureRecognizers(recognizers, allowMultipleResults) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new ReconfigureRecognizerRunner(recognizerHandles, allowMultipleResults);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
            this.recognizers = recognizers;
        });
    }
    setMetadataCallbacks(metadataCallbacks) {
        return new Promise((resolve, reject) => {
            const msg = new RegisterMetadataCallbacks(createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    resetRecognizers(hardReset) {
        return new Promise((resolve, reject) => {
            const msg = new ResetRecognizers(hardReset);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setDetectionOnlyMode(detectionOnly) {
        return new Promise((resolve, reject) => {
            const msg = new SetDetectionOnly(detectionOnly);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setPingProxyUrl(url) {
        if (!isValidURL(url)) {
            throw new SDKError(pingProxyErrors.invalidProxyUrl);
        }
        return new Promise((resolve, reject) => {
            const msg = new SetPingProxyUrl(url);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setCameraPreviewMirrored(mirrored) {
        return new Promise((resolve, reject) => {
            const msg = new SetCameraPreviewMirrored(mirrored);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        if (this.deleted) {
            return Promise.reject("Recognizer runner is already deleted.");
        }
        return new Promise((resolve, reject) => {
            const msg = new DeleteRecognizerRunner();
            const handler = defaultEventHandler(() => {
                this.deleted = true;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function getRecognizerHandles(remoteRecognizers) {
    const recognizerHandles = [];
    for (const remoteRecognizer of remoteRecognizers) {
        recognizerHandles.push(remoteRecognizer.getRemoteObjectHandle());
    }
    return recognizerHandles;
}
class WasmModuleWorkerProxy {
    constructor(wasmSDKWorker) {
        this.wasmSDKWorker = wasmSDKWorker;
    }
    createRecognizerRunner(recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
        return new Promise((resolve, reject) => {
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new CreateRecognizerRunner(recognizerHandles, allowMultipleResults, createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(() => {
                resolve(new RemoteRecognizerRunner(this.wasmSDKWorker, recognizers));
            }, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    newRecognizer(className, ...constructorArgs) {
        return new Promise((resolve, reject) => {
            const msg = new CreateNewRecognizer(className, wrapParameters(constructorArgs));
            const handler = defaultResultEventHandler((msg) => {
                const remoteRecognizer = new RemoteRecognizer(this.wasmSDKWorker, className, msg.objectHandle);
                resolve(remoteRecognizer);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
class WasmSDKWorker {
    /* eslint-enable lines-between-class-members */
    constructor(worker, loadProgressCallback, userId, rejectHandler) {
        this.eventHandlers = {};
        this.metadataCallbacks = {};
        this.loadedWasmType = WasmType.Basic; // will be updated after WASM gets loaded
        this.mbWasmWorker = worker;
        this.mbWasmWorker.onmessage = (event) => { this.handleWorkerEvent(event); };
        this.mbWasmWorker.onerror = () => {
            rejectHandler("Problem during initialization of worker file!");
            return;
        };
        this.mbWasmModule = new WasmModuleWorkerProxy(this);
        this.loadCallback = loadProgressCallback;
        this.recognizersWithCallbacks = new Map();
        this.userId = userId;
        this.showOverlay = false;
    }
    postMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message);
    }
    postTransferrableMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message, message.getTransferrables());
    }
    postMessageAndRegisterCallbacks(message, metadataCallbacks, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.metadataCallbacks = metadataCallbacks;
        this.mbWasmWorker.postMessage(message);
    }
    registerRecognizerCallbacks(remoteRecognizerHandle, recognizer) {
        this.recognizersWithCallbacks.set(remoteRecognizerHandle, recognizer);
    }
    unregisterRecognizerCallbacks(remoteRecognizerHandle) {
        this.recognizersWithCallbacks.delete(remoteRecognizerHandle);
    }
    /**
     * Clean up the active instance of the SDK.
     *
     * It's not possible to use the SDK after this method is called.
     */
    delete() {
        this.mbWasmWorker.terminate();
    }
    getProductIntegrationInfo() {
        return new Promise((resolve, reject) => {
            const msg = new GetProductIntegrationInfo(this.userId);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.postMessage(msg, handler);
        });
    }
    handleWorkerEvent(event) {
        if ("isCallbackMessage" in event.data) {
            const msg = event.data;
            switch (msg.callbackType) {
                case MetadataCallback.onDebugText:
                    if (typeof this.metadataCallbacks.onDebugText === "function") {
                        this.metadataCallbacks.onDebugText(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onDetectionFailed:
                    if (typeof this.metadataCallbacks.onDetectionFailed === "function") {
                        this.metadataCallbacks.onDetectionFailed();
                    }
                    break;
                case MetadataCallback.onPointsDetection:
                    if (typeof this.metadataCallbacks.onPointsDetection === "function") {
                        this.metadataCallbacks.onPointsDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onQuadDetection:
                    if (typeof this.metadataCallbacks.onQuadDetection === "function") {
                        this.metadataCallbacks.onQuadDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onFirstSideResult:
                    if (typeof this.metadataCallbacks.onFirstSideResult === "function") {
                        this.metadataCallbacks.onFirstSideResult();
                    }
                    break;
                case MetadataCallback.recognizerCallback:
                    {
                        // first parameter is address, other parameters are callback parameters
                        const address = msg.callbackParameters.shift();
                        const recognizer = this.recognizersWithCallbacks.get(address.recognizerHandle);
                        if (recognizer !== undefined) {
                            recognizer.invokeCallback(address.callbackName, msg.callbackParameters);
                        }
                        else {
                            console.warn("Cannot find recognizer to deliver callback message. Maybe it's destroyed?", address);
                        }
                        break;
                    }
                default:
                    throw new Error(`Unknown callback type: ${MetadataCallback[msg.callbackType]}`);
            }
        }
        else if ("isLoadProgressMessage" in event.data) {
            const msg = event.data;
            if (typeof this.loadCallback === "function") {
                this.loadCallback(msg.progress);
            }
        }
        else {
            const msg = event.data;
            const eventHandler = this.eventHandlers[msg.messageID];
            delete this.eventHandlers[msg.messageID];
            eventHandler(msg);
        }
    }
    static async createWasmWorker(worker, wasmLoadSettings, userId) {
        return new Promise((resolve, reject) => {
            const wasmWorker = new WasmSDKWorker(worker, wasmLoadSettings.loadProgressCallback, userId, reject);
            const initMessage = new InitMessage(wasmLoadSettings, userId);
            const initEventHandler = defaultResultEventHandler((msg) => {
                const successMsg = msg;
                wasmWorker.showOverlay = successMsg.showOverlay;
                wasmWorker.loadedWasmType = successMsg.wasmType;
                resolve(wasmWorker);
            }, 
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (error) => {
                if (wasmWorker && typeof wasmWorker.delete === "function") {
                    wasmWorker.delete();
                }
                reject(error);
            }
            /* eslint-enable @typescript-eslint/no-explicit-any */
            );
            wasmWorker.postMessage(initMessage, initEventHandler);
        });
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Preferred type of camera to be used when opening the camera feed.
 */
var PreferredCameraType;
(function (PreferredCameraType) {
    /** Prefer back facing camera */
    PreferredCameraType[PreferredCameraType["BackFacingCamera"] = 0] = "BackFacingCamera";
    /** Prefer front facing camera */
    PreferredCameraType[PreferredCameraType["FrontFacingCamera"] = 1] = "FrontFacingCamera";
})(PreferredCameraType || (PreferredCameraType = {}));
// inspired by https://unpkg.com/browse/scandit-sdk@4.6.1/src/lib/cameraAccess.ts
const backCameraKeywords = [
    "rear",
    "back",
    "rück",
    "arrière",
    "trasera",
    "trás",
    "traseira",
    "posteriore",
    "后面",
    "後面",
    "背面",
    "后置", // alternative
    "後置", // alternative
    "背置", // alternative
    "задней",
    "الخلفية",
    "후",
    "arka",
    "achterzijde",
    "หลัง",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "אחורית",
    "πίσω",
    "spate",
    "hátsó",
    "zadní",
    "darrere",
    "zadná",
    "задня",
    "stražnja",
    "belakang",
    "बैक"
];
const backDualWideCameraLocalizations = [
    "Cameră dublă cu obiectiv superangular spate",
    "מצלמה כפולה רחבה אחורית",
    "Артқы қос кең бұрышты камера",
    "Câmara grande angular dupla traseira",
    "Πίσω διπλή ευρεία κάμερα",
    "後置雙廣角鏡頭相機",
    "Задна двойна широкоъгълна камера",
    "Càmera dual posterior amb gran angular",
    "Zadná duálna širokouhlá kamera",
    "كاميرا خلفية مزدوجة عريضة",
    "Задняя двойная широкоугольная камера",
    "Задня здвоєна ширококутна камера",
    "Cámara amplia posterior doble",
    "Dwikamera Lebar Belakang",
    "Tylny dwuobiektywowy aparat szerokokątny",
    "Dubbel vidvinkelkamera på baksidan",
    "Back Dual Wide Camera",
    "Hátsó, kettős, széles látószögű kamera",
    "후면 듀얼 와이드 카메라",
    "Double caméra grand angle arrière",
    "Fotocamera doppia con grandangolo (posteriore)",
    "Double appareil photo grand angle arrière",
    "Zadní duální širokoúhlý fotoaparát",
    "Çift Geniş Kamera Arka Yüzü",
    "Laajakulmainen kaksoistakakamera",
    "Rückseitige Dual-Weitwinkelkamera",
    "बैक ड्युअल वाइड कैमरा",
    "后置双广角镜头",
    "Câmera Dupla Grande-Angular Traseira",
    "後置雙廣角相機",
    "กล้องคู่ด้านหลังมุมกว้าง",
    "Kamera Lebar Belakang Ganda",
    "Dobbelt vidvinkelkamera bak",
    "Camera kép rộng mặt sau",
    "Cámara trasera dual con gran angular",
    "背面デュアル広角カメラ",
    "Stražnja dvostruka široka kamera"
];
const backCameraLocalizations = [
    "후면 카메라",
    "後置相機",
    "Задна камера",
    "後置鏡頭",
    "Camera mặt sau",
    "Hátoldali kamera",
    "Cámara trasera",
    "Back Camera",
    "Kamera på baksidan",
    "Πίσω κάμερα",
    "Bagsidekamera",
    "Zadná kamera",
    "Fotocamera (posteriore)",
    "Câmara traseira",
    "מצלמה אחורית",
    "Takakamera",
    "Rückkamera",
    "Caméra arrière",
    "Zadní fotoaparát",
    "Артқы камера",
    "Tylny aparat",
    "बैक कैमरा",
    "Hátsó kamera",
    "Camera aan achterzijde",
    "Kamera Belakang",
    "Câmera Traseira",
    "Stražnja kamera",
    "الكاميرا الخلفية",
    "Càmera posterior",
    "Fotocamera posteriore",
    "Càmera del darrere",
    "กล้องด้านหลัง",
    "Cameră spate",
    "Kamera, bagside",
    "背面カメラ",
    "Задня камера",
    "Arka Kamera",
    "后置相机",
    "Камера на задней панели",
    "后置镜头",
    "Kamera bak",
    "Задняя камера",
    "Aparat tylny",
    "Kamera på baksiden",
    "Câmera de Trás"
];
const isAndroidDevice = () => {
    const u = navigator.userAgent;
    return !!u.match(/Android/i);
};
const isIOSDevice = () => {
    const u = navigator.userAgent;
    return !!u.match(/iPhone/i);
};
const isMobileDevice = () => {
    return isAndroidDevice() || isIOSDevice();
};
function isBackCameraLabel(label) {
    const lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some(keyword => lowercaseLabel.includes(keyword));
}
class SelectedCamera {
    constructor(mdi, facing, label) {
        this.deviceId = mdi.deviceId;
        this.facing = facing;
        this.groupId = mdi.groupId;
        // apply custom label
        if (label) {
            this.label = label;
        }
        else {
            this.label = mdi.label;
        }
    }
}
async function getCameraDevices$1() {
    const frontCameras = [];
    const backCameras = [];
    let devices = await navigator.mediaDevices.enumerateDevices();
    // if permission is not given, label of video devices will be empty string
    if (devices.filter(device => device.kind === "videoinput").every(device => device.label === "")) {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" }
            },
            audio: false
        });
        // enumerate devices again - now the label field should be non-empty, as we have a stream active
        // (even if we didn't get persistent permission for camera)
        devices = await navigator.mediaDevices.enumerateDevices();
        // close the stream, as we don't need it anymore
        stream.getTracks().forEach(track => track.stop());
    }
    const cameras = devices.filter(device => device.kind === "videoinput");
    let backCameraIterator = 0;
    let frontCameraIterator = 0;
    for (const camera of cameras) {
        // phone back camera
        if (isBackCameraLabel(camera.label)) {
            backCameraIterator++;
            let backLabel = undefined;
            // we apply a custom label on Android devices
            if (isAndroidDevice()) {
                backLabel = `Back camera ${backCameraIterator}`;
            }
            backCameras.push(new SelectedCamera(camera, PreferredCameraType.BackFacingCamera, backLabel));
        }
        else 
        // front camera or non-phone camera
        {
            frontCameraIterator++;
            let frontLabel = undefined;
            if (isAndroidDevice()) {
                // we apply a custom label on Android devices
                frontLabel = `Front camera ${frontCameraIterator}`;
            }
            frontCameras.push(new SelectedCamera(camera, PreferredCameraType.FrontFacingCamera, frontLabel));
        }
    }
    return {
        frontCameras,
        backCameras
    };
}
async function selectCamera(cameraId, preferredCameraType) {
    const { frontCameras, backCameras } = await getCameraDevices$1();
    if (!frontCameras.length && !backCameras.length) {
        return null;
    }
    // Picks camera based on the provided device id, if user provided device id up front
    if (cameraId) {
        let cameraDevice;
        cameraDevice = frontCameras.find(device => device.deviceId === cameraId);
        if (!cameraDevice) {
            cameraDevice = backCameras.find(device => device.deviceId === cameraId);
        }
        return cameraDevice || null;
    }
    let cameraDevice = null;
    if (isIOSDevice() && preferredCameraType === PreferredCameraType.BackFacingCamera) {
        // If device is an iOS and preferred camera is back facing
        // pick camera which matches the localized 'Back Camera'
        let selectedCamera = backCameras.find(camera => backDualWideCameraLocalizations.includes(camera.label));
        if (!selectedCamera) {
            selectedCamera = backCameras.find(camera => backCameraLocalizations.includes(camera.label));
        }
        if (selectedCamera) {
            cameraDevice = selectedCamera;
        }
    }
    else if (isAndroidDevice() && preferredCameraType === PreferredCameraType.BackFacingCamera) {
        let bestCameraDevice = {
            deviceId: "",
            score: -1,
        };
        const calculateScore = (hasTorch, hasSingleShot) => {
            let score = 0;
            if (hasTorch)
                score++;
            if (hasSingleShot)
                score++;
            return score;
        };
        for (const backFacingCamera of backCameras) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: backFacingCamera.deviceId,
                    width: 1920,
                    height: 1080,
                },
            });
            if ("getCapabilities" in mediaStream.getVideoTracks()[0]) {
                const capabilities = mediaStream.getVideoTracks()[0].getCapabilities();
                // @ts-expect-error Property will exist on object
                const hasTorch = Boolean(capabilities.torch);
                // @ts-expect-error Property will exist on object
                const hasSingleShot = capabilities.focusMode?.includes("single-shot");
                const cameraScore = calculateScore(hasTorch, hasSingleShot);
                if (cameraScore > bestCameraDevice.score) {
                    bestCameraDevice = {
                        deviceId: backFacingCamera.deviceId,
                        score: cameraScore,
                    };
                }
            }
            closeStreamTracks(mediaStream);
        }
        cameraDevice = backCameras.find(camera => camera.deviceId === bestCameraDevice.deviceId) || null;
    }
    if (cameraDevice === null) {
        // Case where camera device is still not found, so we revert back to "old" logic
        // Decide from which array the camera will be selected
        let cameraPool = (backCameras.length > 0 ? backCameras : frontCameras);
        // If there is at least one back facing camera and user prefers back facing camera, use that as a selection pool
        if (preferredCameraType === PreferredCameraType.BackFacingCamera && backCameras.length > 0) {
            cameraPool = backCameras;
        }
        // If there is at least one front facing camera and is preferred by user, use that as a selection pool
        if (preferredCameraType === PreferredCameraType.FrontFacingCamera && frontCameras.length > 0) {
            cameraPool = frontCameras;
        }
        // Sort camera pool by label
        cameraPool = cameraPool.sort((camera1, camera2) => camera1.label.localeCompare(camera2.label));
        // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
        // Otherwise pick the last camera (Samsung wide on most Android devices)
        let selectedCameraIndex = cameraPool.length - 1;
        // Gets camera resolutions from the device name, if exists
        const cameraResolutions = cameraPool.map(camera => {
            const regExp = RegExp(/\b([0-9]+)MP?\b/, "i");
            const match = regExp.exec(camera.label);
            if (match !== null) {
                return parseInt(match[1], 10);
            }
            else {
                return NaN;
            }
        });
        // Picks camera  based on highest resolution in the name
        if (!cameraResolutions.some(cameraResolution => isNaN(cameraResolution))) {
            selectedCameraIndex = cameraResolutions.lastIndexOf(Math.max(...cameraResolutions));
        }
        return cameraPool[selectedCameraIndex];
    }
    return cameraDevice;
}
const closeStreamTracks = (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
        track.stop();
    }
};
/**
 * Bind camera device to video feed (HTMLVideoElement).
 *
 * This function will return `true` in case that video feed of camera device has been flipped,
 * and `false` otherwise.
 *
 * @param camera                Camera device which should be binded with the video element.
 * @param videoFeed             HTMLVideoElement to which camera device should be binded.
 * @param preferredCameraType   Enum representing whether to use front facing or back facing camera.
 */
async function bindCameraToVideoFeed(camera, videoFeed, preferredCameraType = PreferredCameraType.BackFacingCamera) {
    const constraints = {
        audio: false,
        video: {
            width: {
                min: 640,
                ideal: 1920,
                max: 1920,
            },
            height: {
                min: 480,
                ideal: 1080,
                max: 1080
            }
        }
    };
    if (camera.deviceId === "") {
        const isPreferredBackFacing = preferredCameraType === PreferredCameraType.BackFacingCamera;
        constraints.video.facingMode =
            {
                ideal: isPreferredBackFacing ? "environment" : "user"
            };
    }
    else {
        constraints.video.deviceId =
            {
                exact: camera.deviceId
            };
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoFeed.controls = false;
    videoFeed.srcObject = stream;
    let cameraFlipped = false;
    if (camera.facing === PreferredCameraType.FrontFacingCamera) {
        cameraFlipped = true;
    }
    return cameraFlipped;
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// DATA STRUCTURES                              /
// ============================================ /
/**
 * Specifies the orientation of the contents of the image.
 * This is important for some recognizers, especially when
 * performing recognition on the mobile device.
 */
var ImageOrientation;
(function (ImageOrientation) {
    /**
     * Image contents are rotated 90 degrees left.
     * This usually happens on mobile devices when capturing image while
     * device is held in "portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedLeft90"] = 0] = "RotatedLeft90";
    /**
     * Image contents are not rotated in any manner.
     * This is the default for images captured using HTML canvas, as
     * used in FrameCapture class.
     * This orientation also usually happens on mobile devices when capturing
     * image while device is held in "landscape" orientation, while device
     * camera sensor is mounted horizontally (i.e. also in same orientation).
     */
    ImageOrientation[ImageOrientation["NoRotation"] = 1] = "NoRotation";
    /**
     * Image contents are rotated 90 degrees right.
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedRight90"] = 2] = "RotatedRight90";
    /**
     * Image contents are rotated 180 degrees, i.e. image contents are "upside down".
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-landscape" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["Rotated180"] = 3] = "Rotated180";
})(ImageOrientation || (ImageOrientation = {}));
/**
 * Specifies the state of the recognition result.
 */
var RecognizerResultState;
(function (RecognizerResultState) {
    /** Nothing has been recognized. */
    RecognizerResultState[RecognizerResultState["Empty"] = 0] = "Empty";
    /** Something has been recognized, but some mandatory data is still missing. */
    RecognizerResultState[RecognizerResultState["Uncertain"] = 1] = "Uncertain";
    /** All required data has been recognized. */
    RecognizerResultState[RecognizerResultState["Valid"] = 2] = "Valid";
    /** Single stage of a multi-stage recognition is finished. */
    RecognizerResultState[RecognizerResultState["StageValid"] = 3] = "StageValid";
})(RecognizerResultState || (RecognizerResultState = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Checks if browser is supported by the SDK. The minimum requirements for the browser is
 * the support for WebAssembly. If your browser does not support executing WebAssembly,
 * this function will return `false`.
 */
function isBrowserSupported() {
    // based on https://stackoverflow.com/a/47880734
    try {
        if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    }
    catch (ignored) {
        return false;
    }
    return false;
}
/**
 * Check if current browser is in-app / embedded.
 * Detects Instagram, Facebook, LinkedIn, Twitter, WeChat, Whatsapp, and Tiktok.
 * @returns Boolean whether the browser is in-app or not
 */
function isInAppBrowser() {
    const inAppRegex = /(instagram|fbav|linkedinapp|twitter|micromessenger|whatsapp|tiktok)[/\s]?([\w.]*)/i;
    const userAgent = navigator.userAgent || navigator.vendor;
    return !!inAppRegex.exec(userAgent);
}
/**
 * Check if browser supports ES6, which is prerequisite for this SDK to execute.
 *
 * IMPORTANT: it's not possible to run this function from MicroblinkSDK if browser doesn't support
 * ES6 since this file won't be able to load.
 *
 * This function is here as a placeholder so it can be copied to standalone JS file or directly into 'index.html'.
 */
// export function isES6Supported(): boolean
// {
//     if ( typeof Symbol === "undefined" )
//     {
//         return false;
//     }
//     try
//     {
//         eval( "class Foo {}" );
//         eval( "var bar = (x) => x+1" );
//     }
//     catch ( e )
//     {
//         return false;
//     }
//     return true;
// }

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * The side of the document.
 */
var DocumentSide;
(function (DocumentSide) {
    DocumentSide[DocumentSide["Front"] = 0] = "Front";
    DocumentSide[DocumentSide["Back"] = 1] = "Back";
})(DocumentSide || (DocumentSide = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// Frame capture and camera management support. /
// ============================================ /
let canvas;
let ctx;
/**
 * Represents a captured frame from HTMLVideoElement.
 */
class CapturedFrame {
    constructor(imageData, orientation, videoFrame) {
        // workaround for memory leak: https://github.com/ivancuric/memory-leak-repro
        const fakeImageData = {
            data: imageData.data,
            width: imageData.width,
            height: imageData.height,
            colorSpace: imageData.colorSpace,
        };
        this.imageData = fakeImageData;
        this.orientation = orientation;
        this.videoFrame = videoFrame;
    }
}
/**
 * Captures a frame from any CanvasImageSource, such as HTMLVideoElement or HTMLImageElement.
 * @param imageSource image source from which frame should be captured
 * @returns instance of CapturedFrame
 */
function captureFrame(imageSource) {
    let imageWidth;
    let imageHeight;
    let videoFrame = false;
    if (imageSource instanceof HTMLVideoElement) {
        imageWidth = imageSource.videoWidth;
        imageHeight = imageSource.videoHeight;
        videoFrame = true;
    }
    else if (imageSource instanceof HTMLImageElement) {
        imageWidth = imageSource.naturalWidth;
        imageHeight = imageSource.naturalHeight;
    }
    else if (imageSource instanceof SVGImageElement) {
        throw new SDKError(frameCaptureErrors.svgUnsupported);
    }
    else if (imageSource instanceof VideoFrame) {
        // eslint is being stupid here, it's a VideoFrame object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        imageWidth = imageSource.displayWidth;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        imageHeight = imageSource.displayHeight;
    }
    else {
        imageWidth = imageSource.width;
        imageHeight = imageSource.height;
    }
    canvas = canvas || document.createElement("canvas");
    if (canvas.width !== imageWidth && canvas.height !== imageHeight) {
        canvas.width = imageWidth;
        canvas.height = imageHeight;
    }
    ctx = ctx || canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
        throw new SDKError(frameCaptureErrors.canvasMissing);
    }
    ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return new CapturedFrame(pixelData, 
    // TODO: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
    // or https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
    ImageOrientation.NoRotation, videoFrame);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
var LicenseTokenState;
(function (LicenseTokenState) {
    LicenseTokenState[LicenseTokenState["Invalid"] = 0] = "Invalid";
    LicenseTokenState[LicenseTokenState["RequiresServerPermission"] = 1] = "RequiresServerPermission";
    LicenseTokenState[LicenseTokenState["Valid"] = 2] = "Valid";
})(LicenseTokenState || (LicenseTokenState = {}));
var LicenseErrorType;
(function (LicenseErrorType) {
    LicenseErrorType["LicenseTokenStateInvalid"] = "LICENSE_TOKEN_STATE_INVALID";
    LicenseErrorType["NetworkError"] = "NETWORK_ERROR";
    LicenseErrorType["RemoteLock"] = "REMOTE_LOCK";
    LicenseErrorType["PermissionExpired"] = "PERMISSION_EXPIRED";
    LicenseErrorType["PayloadCorrupted"] = "PAYLOAD_CORRUPTED";
    LicenseErrorType["PayloadSignatureVerificationFailed"] = "PAYLOAD_SIGNATURE_VERIFICATION_FAILED";
    LicenseErrorType["IncorrectTokenState"] = "INCORRECT_TOKEN_STATE";
})(LicenseErrorType || (LicenseErrorType = {}));
const baltazar = "https://baltazar.microblink.com/api/v2/status/check";
function toBaltazarRequest(unlockResult) {
    return {
        licenseId: unlockResult.licenseId,
        licensee: unlockResult.licensee,
        applicationIds: unlockResult.applicationIds,
        packageName: unlockResult.packageName,
        platform: "Browser",
        sdkName: unlockResult.sdkName,
        sdkVersion: unlockResult.sdkVersion
    };
}
function shouldShowOverlay(isTrial, allowRemoveDemoOverlay, allowRemoveProductionOverlay) {
    if (isTrial && allowRemoveDemoOverlay) {
        return false;
    }
    if (!isTrial && allowRemoveProductionOverlay) {
        return false;
    }
    return true;
}
var ServerPermissionSubmitResultStatus;
(function (ServerPermissionSubmitResultStatus) {
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["Ok"] = 0] = "Ok";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["NetworkError"] = 1] = "NetworkError";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["RemoteLock"] = 2] = "RemoteLock";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PermissionExpired"] = 3] = "PermissionExpired";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PayloadCorrupted"] = 4] = "PayloadCorrupted";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PayloadSignatureVerificationFailed"] = 5] = "PayloadSignatureVerificationFailed";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["IncorrectTokenState"] = 6] = "IncorrectTokenState";
})(ServerPermissionSubmitResultStatus || (ServerPermissionSubmitResultStatus = {}));
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/explicit-module-boundary-types,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call
*/
async function obtainNewServerPermission(unlockResult, wasmModule) {
    // request permission from Baltazar service
    try {
        const response = await fetch(baltazar, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-cache",
            body: JSON.stringify(toBaltazarRequest(unlockResult))
        });
        if (response.ok) {
            const serverPermission = (await response.text()).toString();
            const result = wasmModule.submitServerPermission(serverPermission);
            return result;
        }
        else {
            return {
                status: ServerPermissionSubmitResultStatus.NetworkError,
                lease: 0,
                networkErrorDescription: `Server responded with status ${response.status}`
            };
        }
    }
    catch (error) {
        return {
            status: ServerPermissionSubmitResultStatus.NetworkError,
            lease: 0,
            networkErrorDescription: `Unexpected error: ${JSON.stringify(error)}`
        };
    }
}
async function unlockWasmSDK(licenseKey, allowHelloMessage, userId, wasmModule) {
    const unlockResult = wasmModule.initializeWithLicenseKey(licenseKey, userId, allowHelloMessage);
    switch (unlockResult.unlockResult) {
        case LicenseTokenState.Invalid:
            return {
                error: new SDKError({
                    ...licenseErrors.licenseInvalid,
                    message: unlockResult.licenseError
                }, {
                    type: LicenseErrorType.LicenseTokenStateInvalid,
                }),
            };
        case LicenseTokenState.Valid:
            return {
                error: null,
                showOverlay: shouldShowOverlay(unlockResult.isTrial, unlockResult.allowRemoveDemoOverlay, unlockResult.allowRemoveProductionOverlay)
            };
        case LicenseTokenState.RequiresServerPermission:
            {
                const serverPermission = await obtainNewServerPermission(unlockResult, wasmModule);
                switch (serverPermission.status) {
                    case ServerPermissionSubmitResultStatus.Ok:
                        return {
                            error: null,
                            lease: serverPermission.lease
                        };
                    case ServerPermissionSubmitResultStatus.NetworkError:
                        {
                            let additionalInfo = "";
                            if (serverPermission.networkErrorDescription) {
                                additionalInfo = " " + serverPermission.networkErrorDescription;
                            }
                            return {
                                error: new SDKError({
                                    ...licenseErrors.licenseNetworkError,
                                    message: "There has been a network error while obtaining the server permission!"
                                        + additionalInfo
                                }, {
                                    type: LicenseErrorType.NetworkError,
                                })
                            };
                        }
                    case ServerPermissionSubmitResultStatus.RemoteLock:
                        return {
                            error: new SDKError(licenseErrors.licenseRemoteLocked, {
                                type: LicenseErrorType.RemoteLock,
                            }),
                            lease: serverPermission.lease
                        };
                    case ServerPermissionSubmitResultStatus.PermissionExpired:
                        return {
                            error: new SDKError(licenseErrors.licensePermissionExpired, {
                                type: LicenseErrorType.PermissionExpired
                            }),
                            lease: serverPermission.lease
                        };
                    case ServerPermissionSubmitResultStatus.PayloadCorrupted:
                        return {
                            error: new SDKError(licenseErrors.licensePayloadCorrupted, {
                                type: LicenseErrorType.PayloadCorrupted
                            }),
                            lease: serverPermission.lease
                        };
                    case ServerPermissionSubmitResultStatus.PayloadSignatureVerificationFailed:
                        return {
                            error: new SDKError(licenseErrors.licensePayloadVerificationFailed, {
                                type: LicenseErrorType.PayloadSignatureVerificationFailed
                            }),
                            lease: serverPermission.lease
                        };
                    case ServerPermissionSubmitResultStatus.IncorrectTokenState:
                        return {
                            error: new SDKError(licenseErrors.licenseTokenStateIncorrect, {
                                type: LicenseErrorType.IncorrectTokenState
                            }),
                            lease: serverPermission.lease
                        };
                }
            }
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/explicit-module-boundary-types,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call
*/

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Detection status of the specific detected object.
 */
var DetectionStatus;
(function (DetectionStatus) {
    /** Detection has failed. */
    DetectionStatus[DetectionStatus["Failed"] = 0] = "Failed";
    /** Document has been detected. */
    DetectionStatus[DetectionStatus["Success"] = 1] = "Success";
    /** Document has been detected but the camera is too far from the document. */
    DetectionStatus[DetectionStatus["CameraTooFar"] = 2] = "CameraTooFar";
    /** Document has been detected but the camera is too close to the document. */
    DetectionStatus[DetectionStatus["CameraTooClose"] = 3] = "CameraTooClose";
    /** Document has been detected but the camera’s angle is too steep. */
    DetectionStatus[DetectionStatus["CameraAngleTooSteep"] = 4] = "CameraAngleTooSteep";
    /** Document has been detected but the document is too close to the camera edge. */
    DetectionStatus[DetectionStatus["DocumentTooCloseToCameraEdge"] = 5] = "DocumentTooCloseToCameraEdge";
    /** Only part of the document is visible. */
    DetectionStatus[DetectionStatus["DocumentPartiallyVisible"] = 6] = "DocumentPartiallyVisible";
    /** Fallback detection was successful (PhotoPay specific). */
    DetectionStatus[DetectionStatus["FallbackSuccess"] = 7] = "FallbackSuccess";
})(DetectionStatus || (DetectionStatus = {}));

class AbortError extends Error {
  constructor() {
    super('Throttled function aborted');
    this.name = 'AbortError';
  }
}
function pThrottle({
  limit,
  interval,
  strict
}) {
  if (!Number.isFinite(limit)) {
    throw new TypeError('Expected `limit` to be a finite number');
  }
  if (!Number.isFinite(interval)) {
    throw new TypeError('Expected `interval` to be a finite number');
  }
  const queue = new Map();
  let currentTick = 0;
  let activeCount = 0;
  function windowedDelay() {
    const now = Date.now();
    if (now - currentTick > interval) {
      activeCount = 1;
      currentTick = now;
      return 0;
    }
    if (activeCount < limit) {
      activeCount++;
    } else {
      currentTick += interval;
      activeCount = 1;
    }
    return currentTick - now;
  }
  const strictTicks = [];
  function strictDelay() {
    const now = Date.now();
    if (strictTicks.length < limit) {
      strictTicks.push(now);
      return 0;
    }
    const earliestTime = strictTicks.shift() + interval;
    if (now >= earliestTime) {
      strictTicks.push(now);
      return 0;
    }
    strictTicks.push(earliestTime);
    return earliestTime - now;
  }
  const getDelay = strict ? strictDelay : windowedDelay;
  return function_ => {
    const throttled = function (...args) {
      if (!throttled.isEnabled) {
        return (async () => function_.apply(this, args))();
      }
      let timeout;
      return new Promise((resolve, reject) => {
        const execute = () => {
          resolve(function_.apply(this, args));
          queue.delete(timeout);
        };
        timeout = setTimeout(execute, getDelay());
        queue.set(timeout, reject);
      });
    };
    throttled.abort = () => {
      for (const timeout of queue.keys()) {
        clearTimeout(timeout);
        queue.get(timeout)(new AbortError());
      }
      queue.clear();
      strictTicks.splice(0, strictTicks.length);
    };
    throttled.isEnabled = true;
    Object.defineProperty(throttled, 'queueSize', {
      get() {
        return queue.size;
      }
    });
    return throttled;
  };
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const TARGET_FPS = 15;
const throttle = pThrottle({
    limit: 1,
    interval: Math.round((1 / TARGET_FPS) * 1000),
    strict: true,
});
/**
 * Indicates mode of recognition in `VideoRecognizer`.
 */
var VideoRecognitionMode;
(function (VideoRecognitionMode) {
    /** Normal recognition */
    VideoRecognitionMode[VideoRecognitionMode["Recognition"] = 0] = "Recognition";
    /** Indefinite scan. Useful for profiling the performance of scan (using `onDebugText` metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["RecognitionTest"] = 1] = "RecognitionTest";
    /** Only detection. Useful for profiling the performance of detection (using `onDebugText` metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["DetectionTest"] = 2] = "DetectionTest";
})(VideoRecognitionMode || (VideoRecognitionMode = {}));
/**
 * A wrapper around `RecognizerRunner` that can use it to perform recognition of
 * video feeds - either from live camera or from predefined video file.
 */
class VideoRecognizer {
    /**
     * **Use only if provided factory functions are not well-suited for your use
     * case.**
     *
     * Creates a new `VideoRecognizer` with provided `HTMLVideoElement`.
     *
     * Keep in mind that `HTMLVideoElement` **must have** a video feed which is
     * ready to use.
     *
     * - If you want to take advantage of provided camera management, use
     *   `createVideoRecognizerFromCameraStream`
     * - In case that static video file should be processed, use
     *   `createVideoRecognizerFromVideoPath`
     *
     * @param videoElement HTMLVideoElement with video feed which is going to be
     * processed
     * @param recognizerRunner RecognizerRunner that should be used for video
     * stream recognition
     * @param cameraFlipped Whether the camera is flipped, e.g. if front-facing
     * camera is used
     * @param deviceId
     */
    constructor(videoElement, recognizerRunner, cameraFlipped = false, deviceId = null) {
        this.deviceId = null;
        this.recognitionCancelRequested = false;
        this.recognitionPauseRequested = false;
        this.recognitionTimeoutMs = 20000;
        this.timeoutStartedAt = 0;
        this.currentTimeoutCount = 0;
        this.videoRecognitionMode = VideoRecognitionMode.Recognition;
        this.onScanningDone = null;
        this.onFrameProcessed = null;
        this.cameraFlipped = false;
        this.handleFlippingVideo = async () => {
            this.videoElement.style.transform = `scaleX(${this.cameraFlipped ? -1 : 1})`;
            // needs to be set on the recognizerRunner as well to provide correct quads
            await this.recognizerRunner.setCameraPreviewMirrored(this.cameraFlipped);
        };
        /**
         * Sets the callback that will be invoked when frame is processed
         * @param onFrameProcessed Callback that will be invoked when frame is processed
         */
        this.setOnFrameProcessed = (onFrameProcessed) => {
            this.onFrameProcessed = onFrameProcessed;
        };
        this.flipCamera = async () => {
            this.cameraFlipped = !this.cameraFlipped;
            await this.handleFlippingVideo();
        };
        this.isCameraFlipped = () => {
            return this.cameraFlipped;
        };
        /**
         * Sets the video recognition mode to be used.
         */
        this.setVideoRecognitionMode = async (videoRecognitionMode) => {
            this.videoRecognitionMode = videoRecognitionMode;
            const isDetectionMode = this.videoRecognitionMode === VideoRecognitionMode.DetectionTest;
            await this.recognizerRunner.setDetectionOnlyMode(isDetectionMode);
        };
        /**
         * Starts the recognition of the video stream associated with this
         * `VideoRecognizer`. The stream will be unpaused and recognition loop will
         * start. After recognition completes, an `onScanningDone` callback will be
         * invoked with state of the recognition.
         *
         * NOTE: As soon as the execution of the callback completes, the recognition
         *       loop will continue and recognition state will be retained. To clear
         *       the recognition state, use {@linkcode resetRecognizers} (within your
         *       callback). To pause the recognition loop, use
         *       {@linkcode pauseRecognition} (within your callback) - to resume it
         *       later use {@linkcode resumeRecognition}. To completely stop the
         *       recognition and video feed, while keeping the ability to use this
         *       `VideoRecognizer` later, use {@linkcode pauseVideoFeed}. To
         *       completely stop the recognition and video feed and release all the
         *       resources involved with the video stream, use
         *       {@linkcode releaseVideoFeed}.
         *
         * @param onScanningDone Callback that will be invoked when recognition
         * completes.
         * @param recognitionTimeoutMs Amount of time in ms that the recognizer will
         * stay in the `Uncertain` state before resolving.
         */
        this.startRecognition = async (onScanningDone, recognitionTimeoutMs = 20000) => {
            try {
                await this.videoElement.play();
            }
            catch (error) {
                throw new Error(ErrorMessages$1.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED);
            }
            // Following 2 lines might not be needed. Just in case left here.
            this.recognitionPauseRequested = false;
            this.recognitionCancelRequested = false;
            this.clearTimeout();
            this.recognitionTimeoutMs = recognitionTimeoutMs;
            this.onScanningDone = onScanningDone;
            await this.throttledQueueFrame();
        };
        /**
         * Resumes the recognition and video playback
         * @param resetRecognizers Indicates whether resetRecognizers should be
         * invoked while resuming the recognition
         */
        this.resumeRecognition = async (resetRecognizers) => {
            if (resetRecognizers) {
                try {
                    await this.resetRecognizers(true);
                }
                catch (error) {
                    throw new SDKError(videoRecognizerErrors.recognizersResetFailure);
                }
            }
            try {
                await this.videoElement.play();
            }
            catch (error) {
                throw new Error(ErrorMessages$1.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED);
            }
            try {
                this.recognitionPauseRequested = false;
                await this.throttledQueueFrame();
            }
            catch (error) {
                this.recognitionPauseRequested = true;
                console.error(error);
            }
        };
        /**
         * Performs the recognition of the video stream associated with this
         * `VideoRecognizer`. The stream will be unpaused, recognition will be
         * performed and promise will be resolved with recognition status. After the
         * resolution of returned promise, the video stream will be paused, but not
         * released. To release the stream, use function `releaseVideoFeed`.
         *
         * This is a simple version of {@linkcode startRecognition} that should be
         * used for most cases, like when you only need to perform one scan per video
         * session.
         *
         * @param recognitionTimeoutMs Amount of time in ms that the recognizer will
         * stay in the `Uncertain` state before resolving.
         */
        this.recognize = (recognitionTimeoutMs = 20000) => {
            return new Promise((resolve) => {
                const onScanningDone = (recognitionState) => {
                    this.pauseVideoFeed();
                    resolve(recognitionState);
                };
                void this.startRecognition(onScanningDone, recognitionTimeoutMs);
            });
        };
        /**
         * Pauses the video feed. You can resume the feed by calling recognize or
         * `startRecognition`. Note that this pauses both the camera feed and
         * recognition. If you just want to pause recognition, while keeping the
         * camera feed active, call method `pauseRecognition`.
         */
        this.pauseVideoFeed = () => {
            // fix for https://developer.chrome.com/blog/play-request-was-interrupted/
            if (this.videoElement.readyState >
                this.videoElement.HAVE_CURRENT_DATA &&
                !this.videoElement.paused) {
                this.videoElement.pause();
                this.pauseRecognition();
            }
        };
        /**
         * Pauses the recognition. This means that video frames that arrive from given
         * video source will not be recognized. To resume recognition, call
         * {@linkcode resumeRecognition}.
         */
        this.pauseRecognition = () => {
            this.recognitionPauseRequested = true;
        };
        /**
         * Cancels current ongoing recognition. Unlike {@linkcode pauseRecognition} this will reset everything
         */
        this.cancelRecognition = () => {
            this.recognitionCancelRequested = true;
        };
        /**
         * Convenience method for invoking
         * {@linkcode RecognizerRunner.resetRecognizers} on associated
         * `RecognizerRunner`.
         */
        this.resetRecognizers = async (hardReset) => {
            await this.recognizerRunner.resetRecognizers(hardReset);
        };
        /**
         * Convenience method for accessing `RecognizerRunner` associated with this
         * `VideoRecognizer`. Sometimes it's useful to reconfigure `RecognizerRunner`
         * while handling `onScanningDone` callback and this method makes that much
         * more convenient.
         */
        this.getRecognizerRunner = () => {
            return this.recognizerRunner;
        };
        /**
         * Getter for {@linkcode videoElement}
         */
        this.getVideoElement = () => {
            return this.videoElement;
        };
        /**
         * Change currently used camera device for recognition. To get list of
         * available camera devices use `getCameraDevices` method.
         *
         * Keep in mind that this method will reset recognizers.
         *
         * @param camera Desired camera device which should be used for recognition.
         */
        this.changeCameraDevice = async (camera) => {
            this.pauseRecognition();
            this.releaseVideoFeed();
            await bindCameraToVideoFeed(camera, this.videoElement, PreferredCameraType.BackFacingCamera);
            await this.resumeRecognition(true);
        };
        /**
         * Shorthand for queuing the next frame for processing. Wrapper around
         * {@linkcode recognitionLoop}. Resolves when the frame is done processing.
         */
        this.queueFrame = () => {
            // promisify `requestVideoFrameCallback` so that we know when it triggers
            return new Promise((resolve) => {
                this.frameCallback(() => {
                    void this.recognitionLoop().then(() => resolve());
                });
            });
        };
        this.throttledQueueFrame = throttle(this.queueFrame);
        /**
         * The main loop. Takes camera frames from {@linkcode videoElement} and
         * processes them on the `recognizerRunner`.
         */
        this.recognitionLoop = async () => {
            // exit without side-effects when paused
            if (this.recognitionPauseRequested) {
                return;
            }
            // if cancelled exit and reset `VideoRecognizer` state
            if (this.recognitionCancelRequested) {
                this.clearTimeout();
                await this.resetRecognizers(true);
                this.onScanningDone = null;
                this.recognitionCancelRequested = false;
                return;
            }
            /*
            Start processing.
    
            At this point we draw the canvas frames, extract the ImageData` and send it
            to the `RecognizerRunner`. The main thread and the worker thread should be
            treated as blocked.
            */
            const cameraFrame = captureFrame(this.videoElement);
            // queue everything below in a macrotask
            await new Promise((f) => setTimeout(f, 0));
            const processResult = await this.recognizerRunner.processImage(cameraFrame);
            // assumption: only one recognizer is used
            const currentFrameResult = await this.recognizerRunner.recognizers[0].getResult();
            // Trigger onFrameProcessed callback
            if (typeof this.onFrameProcessed === "function") {
                this.onFrameProcessed(currentFrameResult, cameraFrame.imageData);
            }
            // End processing
            // Test mode resets recognizers on every tick and never times out
            if (this.videoRecognitionMode === VideoRecognitionMode.DetectionTest ||
                this.videoRecognitionMode === VideoRecognitionMode.RecognitionTest) {
                await this.recognizerRunner.resetRecognizers(true);
                this.clearTimeout();
                void this.throttledQueueFrame();
                return;
            }
            // regular flow
            switch (processResult) {
                // `Valid` stops loop and calls `onScanningDone`
                case RecognizerResultState.Valid: {
                    this.clearTimeout();
                    if (typeof this.onScanningDone === "function") {
                        this.onScanningDone(processResult);
                    }
                    return;
                }
                // `Uncertain` resolves after a timeout, loops otherwise
                case RecognizerResultState.Uncertain: {
                    // increment timeout
                    const now = performance.now();
                    if (this.timeoutStartedAt === 0) {
                        this.timeoutStartedAt = now;
                    }
                    this.currentTimeoutCount = now - this.timeoutStartedAt;
                    // if under timeout continue looping
                    if (this.currentTimeoutCount < this.recognitionTimeoutMs) {
                        void this.throttledQueueFrame();
                        return;
                    }
                    // otherwise stop as `Uncertain`
                    this.clearTimeout();
                    if (typeof this.onScanningDone === "function") {
                        this.onScanningDone(processResult);
                    }
                    return;
                }
                // `StageValid` and `Empty` loop forever
                case RecognizerResultState.StageValid:
                case RecognizerResultState.Empty: {
                    this.clearTimeout();
                    void this.throttledQueueFrame();
                    return;
                }
            }
        };
        /**
         * Clear timeout on every loop which didn't result in `RecognizerResultState.Uncertain`
         */
        this.clearTimeout = () => {
            this.currentTimeoutCount = 0;
            this.timeoutStartedAt = 0;
        };
        /**
         * Stops all media stream tracks associated with {@linkcode videoElement}.
         */
        this.releaseVideoFeed = () => {
            if (this.videoElement &&
                this.videoElement.srcObject !== null &&
                this.videoElement.srcObject instanceof MediaStream) {
                this.videoElement.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
                this.videoElement.srcObject = null;
            }
        };
        this.videoElement = videoElement;
        this.recognizerRunner = recognizerRunner;
        this.cameraFlipped = cameraFlipped;
        this.deviceId = deviceId;
        if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
            this.frameCallback =
                this.videoElement.requestVideoFrameCallback.bind(this.videoElement);
        }
        else {
            this.frameCallback = window.requestAnimationFrame.bind(window);
        }
        void this.handleFlippingVideo();
        // Prepare the `video` element so that it can autoplay on iOS
        // https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
        // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#autoplay_availability
        this.videoElement.setAttribute("playsinline", "");
        this.videoElement.setAttribute("mute", "");
    }
    /**
     * Creates a new VideoRecognizer by opening a camera stream and attaching it
     * to given `HTMLVideoElement`. If camera cannot be accessed, the returned
     * promise will be rejected.
     *
     * @param cameraFeed `HTMLVideoElement` to which camera stream should be
     * attached
     * @param recognizerRunner `RecognizerRunner` that should be used for video
     * stream recognition
     * @param cameraId User can provide specific camera ID to be selected and used
     * @param preferredCameraType Whether back facing or front facing camera is
     *        preferred. Obeyed only if there is a choice (i.e. if device has only
     *        front-facing camera, the opened camera will be a front-facing
     *        camera, regardless of preference)
     */
    static async createVideoRecognizerFromCameraStream(cameraFeed, recognizerRunner, cameraId = null, preferredCameraType = PreferredCameraType.BackFacingCamera) {
        if (!cameraFeed || !(cameraFeed instanceof HTMLVideoElement)) {
            throw new SDKError(videoRecognizerErrors.elementMissing);
        }
        if (!navigator.mediaDevices.getUserMedia) {
            throw new SDKError(videoRecognizerErrors.mediaDevicesUnsupported);
        }
        const selectedCamera = await selectCamera(cameraId, preferredCameraType);
        if (!selectedCamera) {
            throw new SDKError(videoRecognizerErrors.cameraMissing);
        }
        const cameraFlipped = await bindCameraToVideoFeed(selectedCamera, cameraFeed, preferredCameraType);
        return new VideoRecognizer(cameraFeed, recognizerRunner, cameraFlipped, selectedCamera.deviceId);
    }
    /**
     * Creates a new `VideoRecognizer` by attaching the given URL to video to
     * given `HTMLVideoElement` and using it to display video frames while
     * processing them.
     *
     * @param videoPath URL of the video file that should be recognized.
     * @param videoElement `HTMLVideoElement` to which video file will be attached
     * @param recognizerRunner `RecognizerRunner` that should be used for video
     * stream recognition.
     */
    static createVideoRecognizerFromVideoPath(videoPath, videoElement, recognizerRunner) {
        const videoRecognizer = new VideoRecognizer(videoElement, recognizerRunner);
        videoElement.src = videoPath;
        videoElement.currentTime = 0;
        videoElement.onended = () => {
            videoRecognizer.cancelRecognition();
        };
        return videoRecognizer;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Settings object for function loadWasmModule.
 */
class WasmSDKLoadSettings {
    /**
     * @param licenseKey License key for unlocking the WebAssembly module.
     */
    constructor(licenseKey) {
        /**
         * Write a hello message to the browser console when license check is successfully performed.
         *
         * Hello message will contain the name and version of the SDK, which are required information for all support
         * tickets.
         *
         * The default value is true.
         */
        this.allowHelloMessage = true;
        /**
         * Absolute location of WASM and related JS/data files. Useful when resource files should be loaded over CDN, or
         * when web frameworks/libraries are used which store resources in specific locations, e.g. inside "assets" folder.
         *
         * Important: if the engine is hosted on another origin, CORS must be enabled between two hosts. That is, server
         * where engine is hosted must have 'Access-Control-Allow-Origin' header for the location of the web app.
         *
         * Important: SDK and WASM resources must be from the same version of a package.
         *
         * Default value is empty string, i.e. "". In case of empty string, value of "window.location.origin" property is
         * going to be used.
         */
        this.engineLocation = "";
        /**
         * The absolute location of the Web Worker script file that loads the WebAssembly module.
         *
         * Important: the worker script must be served via HTTPS and must be of the same origin as the initiator.
         * See https://github.com/w3c/ServiceWorker/issues/940 (same applies for Web Workers).
         *
         * Important: SDK, worker script and WebAssembly resources must be from the same version of the package.
         *
         * The default value is an empty string, i.e. "", and in that case, the worker script is loaded from the default
         * location in resources folder.
         */
        this.workerLocation = "";
        /**
         * Type of the WASM that will be loaded. By default, if not set, the SDK will automatically determine the best WASM
         * to load.
         */
        this.wasmType = null;
        /**
         * Defines the number of workers that will be used for multi-threaded processing of the images. If not set, the
         * number of worker used will match the number of detected CPU cores on a device.
         *
         * If the browser does not support multi-threaded processing or it was deliberately disabled using the `wasmType`
         * property, then this property will be ignored.
         */
        this.numberOfWorkers = null;
        /**
         * Optional callback function that will report the SDK loading progress.
         *
         * This can be useful for displaying progress bar to users with slow connections.
         *
         * The default value is null.
         */
        this.loadProgressCallback = null;
        /**
         * Name of the file containing the WebAssembly module.
         *
         * Change this only if you have renamed the original WASM and its support JS file for your purposes.
         */
        this.wasmModuleName = defaultWasmModuleName;
        if (!licenseKey) {
            throw new SDKError(sdkErrors.licenseKeyMissing);
        }
        this.licenseKey = licenseKey;
    }
}

const bulkMemory = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])),
  mutableGlobals = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1])),
  referenceTypes = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])),
  saturatedFloatToInt = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])),
  signExtensions = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])),
  simd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])),
  threads = () => (async e => {
    try {
      return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
    } catch (e) {
      return !1;
    }
  })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function isIOSUserAgent() {
    const pattern = /iOS|iPhone|iPad|iPod/i; // 'i' flag for case-insensitive matching
    return pattern.test(navigator.userAgent);
}
/* eslint-disable max-len */
/**
 * Safari 16 shipped with WASM threads support, but it didn't ship with nested
 * workers support, so an extra check is needed
 * https://github.com/GoogleChromeLabs/squoosh/pull/1325/files#diff-904900db64cd3f48b0e765dbbdc6a218a7ea74a199671bde82a8944a904db86f
 */
/* eslint-enable max-len */
async function checkThreadsSupport() {
    const supportsWasmThreads = await threads();
    if (!supportsWasmThreads)
        return false;
    if (!("importScripts" in self)) {
        throw Error("Not implemented");
    }
    // Safari has issues with shared memory
    // https://github.com/emscripten-core/emscripten/issues/19374
    if (isIOSUserAgent()) {
        return false;
    }
    return "Worker" in self;
}
async function detectWasmFeatures() {
    const basicSet = [
        mutableGlobals(),
        referenceTypes(),
        bulkMemory(),
        saturatedFloatToInt(),
        signExtensions(),
    ];
    const supportsBasic = (await Promise.all(basicSet)).every(Boolean);
    if (!supportsBasic) {
        throw new Error("Browser doesn't meet minimum requirements!");
    }
    const supportsAdvanced = await simd();
    if (!supportsAdvanced) {
        return WasmType.Basic;
    }
    const supportsAdvancedThreads = await checkThreadsSupport();
    if (!supportsAdvancedThreads) {
        return WasmType.Advanced;
    }
    return WasmType.AdvancedWithThreads;
}
async function detectWasmType() {
    // determine if all features required for advanced WASM are available
    // currently, advanced wasm requires SIMD
    const haveSIMD = await simd();
    const threadsSupported = await checkThreadsSupport();
    if (haveSIMD) {
        if (threadsSupported) {
            return WasmType.AdvancedWithThreads;
        }
        else {
            return WasmType.Advanced;
        }
    }
    else {
        return WasmType.Basic;
    }
}
function wasmFolder(blinkIDResource) {
    let typeDir = "";
    if (blinkIDResource.wasmType === WasmType.AdvancedWithThreads) {
        typeDir = "advanced-threads";
    }
    else if (blinkIDResource.wasmType === WasmType.Advanced) {
        typeDir = "advanced";
    }
    else {
        typeDir = "basic";
    }
    return `${blinkIDResource.blinkIDVariant}/${typeDir}`;
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// taken from https://stackoverflow.com/a/2117523/213057
/* eslint-disable */
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}
/* eslint-enable */
function getUserID() {
    try {
        let userId = localStorage.getItem("mb-user-id");
        if (userId === null) {
            userId = uuidv4();
            localStorage.setItem("mb-user-id", userId);
        }
        return userId;
    }
    catch (error) {
        // local storage is disabled, generate new user ID every time
        return uuidv4();
    }
}
/**
 * Asynchronously loads and compiles the WebAssembly module.
 * @param loadSettings Object defining the settings for loading the WebAssembly module.
 * @returns Promise that resolves if WebAssembly module was successfully loaded and rejects if not.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call */
async function loadWasmModule(loadSettings) {
    return new Promise((resolve, reject) => {
        if (!loadSettings || typeof loadSettings !== "object") {
            reject(new SDKError(sdkErrors.wasmSettingsMissing));
            return;
        }
        if (typeof loadSettings.licenseKey !== "string") {
            reject(new SDKError(sdkErrors.licenseKeyMissing));
            return;
        }
        if (!loadSettings.wasmModuleName) {
            reject(new SDKError(sdkErrors.wasmModuleNameMissing));
            return;
        }
        if (typeof loadSettings.engineLocation !== "string") {
            reject(new SDKError(sdkErrors.engineLocationInvalid));
            return;
        }
        if (typeof loadSettings.workerLocation !== "string") {
            reject(new SDKError(sdkErrors.workerLocationInvalid));
            return;
        }
        // obtain user ID from local storage
        const userId = getUserID();
        try {
            const workerPath = `/resources/${loadSettings.wasmModuleName}.worker.min.js`;
            const defaultWorkerLocation = window.location.origin + workerPath;
            const workerLocation = loadSettings.workerLocation || defaultWorkerLocation;
            if (loadSettings.allowHelloMessage) {
                console.log("Worker location is:", workerLocation);
            }
            const worker = new Worker(workerLocation);
            WasmSDKWorker.createWasmWorker(worker, loadSettings, userId).then((wasmSDK) => {
                resolve(wasmSDK);
            }, reject);
        }
        catch (initError) {
            reject(initError);
        }
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/no-unsafe-assignment,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call */
/**
 * Function for creating a new RecognizerRunner.
 * Note that it is currently not possible to have multiple instances of RecognizerRunner per instance of WasmSDK.
 * Attempt to create new instance of RecognizerRunner prior deleting the previous one will fail.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 * @param recognizers Array of recognizers that will be used by RecognizerRunner.
 * @param allowMultipleResults Whether or not it is allowed to return multiple results from single recognition session.
 *        See README.md for more information.
 * @param metadataCallbacks
 */
async function createRecognizerRunner(wasmSDK, recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
    if (typeof wasmSDK !== "object") {
        throw new SDKError(sdkErrors.missing);
    }
    if (typeof recognizers !== "object" || recognizers.length < 1) {
        throw new SDKError(sdkErrors.recognizersMissing);
    }
    return wasmSDK.mbWasmModule.createRecognizerRunner(recognizers, allowMultipleResults, metadataCallbacks);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Possible formats of barcodes that can be detected. This enum will be returned
 * as part of BarcodeRecognizerResult interface.
 */
var BarcodeFormat;
(function (BarcodeFormat) {
    /** Indicates that no barcode has been detected. */
    BarcodeFormat[BarcodeFormat["NONE"] = 0] = "NONE";
    /** Indicates that QR code has been detected. */
    BarcodeFormat[BarcodeFormat["QR_CODE"] = 1] = "QR_CODE";
    /** Indicates that Data Matrix 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["DATA_MATRIX"] = 2] = "DATA_MATRIX";
    /** Indicates that UPC E 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_E"] = 3] = "UPC_E";
    /** Indicates that UPC A 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_A"] = 4] = "UPC_A";
    /** Indicates that EAN 8 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_8"] = 5] = "EAN_8";
    /** Indicates that EAN 13 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_13"] = 6] = "EAN_13";
    /** Indicates that Code 128 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_128"] = 7] = "CODE_128";
    /** Indicates that Code 39 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_39"] = 8] = "CODE_39";
    /** Indicates that ITF 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["ITF"] = 9] = "ITF";
    /** Indicates that Aztec 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["AZTEC_BARCODE"] = 10] = "AZTEC_BARCODE";
    /** Indicates that PDF417 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["PDF417_BARCODE"] = 11] = "PDF417_BARCODE";
})(BarcodeFormat || (BarcodeFormat = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * AnonymizationMode is used to define level of anonymization
 * performed on recognizer result.
 */
var AnonymizationMode;
(function (AnonymizationMode) {
    /**
     * Anonymization will not be performed.
     */
    AnonymizationMode[AnonymizationMode["None"] = 0] = "None";
    /**
     * FullDocumentImage is anonymized with black boxes
     * covering sensitive data.
     */
    AnonymizationMode[AnonymizationMode["ImageOnly"] = 1] = "ImageOnly";
    /**
     * Result fields containing sensitive data are removed from result.
     */
    AnonymizationMode[AnonymizationMode["ResultFieldsOnly"] = 2] = "ResultFieldsOnly";
    /**
     * This mode is combination of ImageOnly and ResultFieldsOnly modes.
     */
    AnonymizationMode[AnonymizationMode["FullResult"] = 3] = "FullResult";
})(AnonymizationMode || (AnonymizationMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 * RecognitionModeFilter is used to enable/disable recognition of specific document groups.
 * Setting is taken into account only if the right for that document is purchased.
 */
class RecognitionModeFilter {
    constructor() {
        /** Enable scanning of MRZ IDs. Setting is taken into account only if the mrz_id right is purchased. */
        this.enableMrzId = true;
        /** Enable scanning of Passport MRZ. Setting is taken into account only if the passport right is purchased. */
        this.enableMrzPassport = true;
        /** Enable scanning of visa MRZ. Setting is taken into account only if the visa right is purchased. */
        this.enableMrzVisa = true;
        /** Enable scanning of Photo ID. Setting is taken into account only if the photo_id right is purchased. */
        this.enablePhotoId = true;
        /**
         * Enable scanning of barcode IDs. Setting is taken into account only if the barcode right to
         * scan that barcode is purchased.
         */
        this.enableBarcodeId = true;
        /**
         * Enable full document recognition. Setting is taken into account only if the document right to
         * scan that document is purchased.
         */
        this.enableFullDocumentRecognition = true;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
var StrictnessLevel;
(function (StrictnessLevel) {
    StrictnessLevel[StrictnessLevel["Strict"] = 0] = "Strict";
    StrictnessLevel[StrictnessLevel["Normal"] = 1] = "Normal";
    StrictnessLevel[StrictnessLevel["Relaxed"] = 2] = "Relaxed";
})(StrictnessLevel || (StrictnessLevel = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * {@code upFactor} and {@code downFactor} define extensions relative to image height, e.g.
 * when {@code upFactor} is 0.5, upper image boundary will be extended for half of image's full
 * height.
 *
 *                      ._______________________________________.
 *                      |                   ↑                   |
 *                      |                upFactor               |
 *   .________.         |              .________.               |
 *   |        |   -->   |  ⃖ leftFactor |        | rightFactor  ⃗ |
 *   |________|         |              |________|               |
 *                      |                   ↓                   |
 *                      |               downFactor              |
 *                      |_______________________________________|
 *
 */
class ExtensionFactors {
    /**
     * Constructor which accepts image extension factors which must be in range [-1.0f, 1.0f].
     * @param upFactor image extension factor relative to full image height in UP direction
     * @param downFactor image extension factor relative to full image height in DOWN direction
     * @param leftFactor image extension factor relative to full image width in LEFT direction
     * @param rightFactor image extension factor relative to full image width in RIGHT direction
     */
    constructor(upFactor = 0.0, downFactor = 0.0, leftFactor = 0.0, rightFactor = 0.0) {
        /**
         * Currently used image extension factor relative to full image height in UP direction.
         */
        this.upFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in DOWN direction.
         */
        this.downFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in LEFT direction.
         */
        this.leftFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in RIGHT direction.
         */
        this.rightFactor = 0.0;
        this.checkExtensionFactor(upFactor);
        this.checkExtensionFactor(downFactor);
        this.checkExtensionFactor(leftFactor);
        this.checkExtensionFactor(rightFactor);
        this.upFactor = upFactor;
        this.downFactor = downFactor;
        this.leftFactor = leftFactor;
        this.rightFactor = rightFactor;
    }
    checkExtensionFactor(factor) {
        if (factor > 1.0 || factor < -1.0) {
            throw new Error("Extension factor must be in range [-1.0, 1.0]");
        }
    }
}
function validateDpi(dpi) {
    if (dpi < 100 || dpi > 400) {
        throw new Error("DPI must be from interval [100, 400]");
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/** List of supported alphabets. */
var AlphabetType;
(function (AlphabetType) {
    AlphabetType[AlphabetType["Latin"] = 0] = "Latin";
    AlphabetType[AlphabetType["Arabic"] = 1] = "Arabic";
    AlphabetType[AlphabetType["Cyrillic"] = 2] = "Cyrillic";
    AlphabetType[AlphabetType["Count"] = 3] = "Count";
})(AlphabetType || (AlphabetType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
* Enum defining additional fields present in the barcode.
* Currently this is only used for AAMVACompliant documents.
*/
var BarcodeElementKey;
(function (BarcodeElementKey) {
    // ==============================================================/
    // ============== 1. DETERMINING BARCODE VERSION ================/
    // ==============================================================/
    /**
     Mandatory on all driver's licenses. All barcodes which are using 3-track magnetic
     stripe encoding used in the interest of smoothing a transition from legacy documents
     shall be designated as "Magnetic". All barcodes which are using compact encoding
     compliant with ISO/IEC 18013-2 shall be designated as "Compact". All barcodes (majority)
     compliant with Mandatory PDF417 Bar Code of the American Association of Motor Vehicle
     Administrators (AAMVA) Card Design Standard from AAMVA DL/ID-2000 standard to DL/ID-2013
     shall be designated as "AAMVA".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentType"] = 0] = "DocumentType";
    /**
     Mandatory on all driver's licenses.

     AAMVA Version Number: This is a decimal value between 0 and 99 that
     specifies the version level of the PDF417 bar code format. Version "0" and "00"
     is reserved for bar codes printed to the specification of the American Association
     of Motor Vehicle Administrators (AAMVA) prior to the adoption of the AAMVA DL/ID-2000
     standard.

     - All barcodes compliant with AAMVA DL/ID-2000 standard shall be designated Version "01."
     - All barcodes compliant with AAMVA Card Design Specification version 1.0, dated 09-2003
       shall be designated Version "02."
     - All barcodes compliant with AAMVA Card Design Specification version 2.0, dated 03-2005
       shall be designated Version "03."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2009
       shall be designated Version "04."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2010
       shall be designated Version "05."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2011
       shall be designated Version "06".
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 06-2012
       shall be designated Version "07".
     - All barcodes compliant with this current AAMVA standard shall be designated "08".

     Should a need arise requiring major revision to the format, this field provides the
     means to accommodate additional revision.

     If the document type is not "AAMVA", this field defines the version number of the
     given document type's standard.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVersionNumber"] = 1] = "StandardVersionNumber";
    // ==============================================================/
    // ==========          2. PERSONAL DATA KEYS          ===========/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Family name of the cardholder. (Family name is sometimes also called "last name" or "surname.")
     Collect full name for record, print as many characters as possible on portrait side of DL/ID.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFamilyName"] = 2] = "CustomerFamilyName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     First name of the cardholder.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFirstName"] = 3] = "CustomerFirstName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Full name of the individual holding the Driver's License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     Last Name (required)
     , (required)
     First Name (required)
     , (required if other name portions follow, otherwise optional)
     Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     Suffix (optional)
     , (optional)

     If the individual has more than one middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFullName"] = 4] = "CustomerFullName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Date on which the cardholder was born. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DateOfBirth"] = 5] = "DateOfBirth";
    /**
     Mandatory on all AAMVA, Magnetic barcodes.
     Optional on Compact barcodes.

     Gender of the cardholder. 1 = male, 2 = female.
     */
    BarcodeElementKey[BarcodeElementKey["Sex"] = 6] = "Sex";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, Magnetic and Compact barcodes.

     Color of cardholder's eyes. (ANSI D-20 codes)

     Code   Description
     BLK    Black
     BLU    Blue
     BRO    Brown
     GRY    Gray
     GRN    Green
     HAZ    Hazel
     MAR    Maroon
     PNK    Pink
     DIC    Dichromatic
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["EyeColor"] = 7] = "EyeColor";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     Street portion of the cardholder address.
     The place where the registered driver of a vehicle (individual or corporation)
     may be contacted such as a house number, street address, etc.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet"] = 8] = "AddressStreet";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     City portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressCity"] = 9] = "AddressCity";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     State portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressJurisdictionCode"] = 10] = "AddressJurisdictionCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use FullAddress.

     Postal code portion of the cardholder address in the U.S. and Canada. If the
     trailing portion of the postal code in the U.S. is not known, zeros can be used
     to fill the trailing set of numbers up to nine (9) digits.
     */
    BarcodeElementKey[BarcodeElementKey["AddressPostalCode"] = 11] = "AddressPostalCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.
     Optional on Compact barcodes.

     Full address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Street Address (required)
     , (required if other address portions follow, otherwise optional)
     City (optional)
     , (required if other address portions follow, otherwise optional)
     Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     ZIP - Postal Code (optional)

     */
    BarcodeElementKey[BarcodeElementKey["FullAddress"] = 12] = "FullAddress";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder, either in Inches or in Centimeters.

     Inches (in): number of inches followed by " in"
     example: 6'1'' = "73 in"

     Centimeters (cm): number of centimeters followed by " cm"
     example: 181 centimeters = "181 cm"
     */
    BarcodeElementKey[BarcodeElementKey["Height"] = 13] = "Height";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Inches.
     Example: 5'9'' = "69".
     */
    BarcodeElementKey[BarcodeElementKey["HeightIn"] = 14] = "HeightIn";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Centimeters.
     Example: 180 Centimeters = "180".
     */
    BarcodeElementKey[BarcodeElementKey["HeightCm"] = 15] = "HeightCm";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, 02, 03, Magnetic and Compcat barcodes.

     Middle name(s) of the cardholder. In the case of multiple middle names they
     shall be separated by space " ".
     */
    BarcodeElementKey[BarcodeElementKey["CustomerMiddleName"] = 16] = "CustomerMiddleName";
    /**
     Optional on all AAMVA, Magnetic and Compact barcodes.

     Bald, black, blonde, brown, gray, red/auburn, sandy, white, unknown. If the issuing
     jurisdiction wishes to abbreviate colors, the three-character codes provided in ANSI D20 must be
     used.

     Code   Description
     BAL    Bald
     BLK    Black
     BLN    Blond
     BRO    Brown
     GRY    Grey
     RED    Red/Auburn
     SDY    Sandy
     WHI    White
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["HairColor"] = 17] = "HairColor";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Name Suffix (If jurisdiction participates in systems requiring name suffix (PDPS, CDLIS, etc.),
     the suffix must be collected and displayed on the DL/ID and in the MRT).
     - JR (Junior)
     - SR (Senior)
     - 1ST or I (First)
     - 2ND or II (Second)
     - 3RD or III (Third)
     - 4TH or IV (Fourth)
     - 5TH or V (Fifth)
     - 6TH or VI (Sixth)
     - 7TH or VII (Seventh)
     - 8TH or VIII (Eighth)
     - 9TH or IX (Ninth)
     */
    BarcodeElementKey[BarcodeElementKey["NameSuffix"] = 18] = "NameSuffix";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other name by which the cardholder is known. ALTERNATIVE NAME(S) of the individual
     holding the Driver License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     AKA Last Name (required)
     , (required)
     AKA First Name (required)
     , (required if other name portions follow, otherwise optional)
     AKA Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     AKA Suffix (optional)
     , (optional)

     If the individual has more than one AKA middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFullName"] = 19] = "AKAFullName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other family name by which the cardholder is known.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFamilyName"] = 20] = "AKAFamilyName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other given name by which the cardholder is known
     */
    BarcodeElementKey[BarcodeElementKey["AKAGivenName"] = 21] = "AKAGivenName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other suffix by which the cardholder is known.

     The Suffix Code Portion, if submitted, can contain only the Suffix Codes shown in the following
     table (e.g., Andrew Johnson, III = JOHNSON@ANDREW@@3RD):

     Suffix     Meaning or Synonym
     JR         Junior
     SR         Senior or Esquire 1ST First
     2ND        Second
     3RD        Third
     4TH        Fourth
     5TH        Fifth
     6TH        Sixth
     7TH        Seventh
     8TH        Eighth
     9TH        Ninth
     */
    BarcodeElementKey[BarcodeElementKey["AKASuffixName"] = 22] = "AKASuffixName";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Indicates the approximate weight range of the cardholder:
     0 = up to 31 kg (up to 70 lbs)
     1 = 32 – 45 kg (71 – 100 lbs)
     2 = 46 - 59 kg (101 – 130 lbs)
     3 = 60 - 70 kg (131 – 160 lbs)
     4 = 71 - 86 kg (161 – 190 lbs)
     5 = 87 - 100 kg (191 – 220 lbs)
     6 = 101 - 113 kg (221 – 250 lbs)
     7 = 114 - 127 kg (251 – 280 lbs)
     8 = 128 – 145 kg (281 – 320 lbs)
     9 = 146+ kg (321+ lbs)
     */
    BarcodeElementKey[BarcodeElementKey["WeightRange"] = 23] = "WeightRange";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in pounds Example: 185 lb = "185"
     */
    BarcodeElementKey[BarcodeElementKey["WeightPounds"] = 24] = "WeightPounds";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in kilograms Example: 84 kg = "084"
     */
    BarcodeElementKey[BarcodeElementKey["WeightKilograms"] = 25] = "WeightKilograms";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     The number assigned or calculated by the issuing authority.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerIdNumber"] = 26] = "CustomerIdNumber";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FamilyNameTruncation"] = 27] = "FamilyNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FirstNameTruncation"] = 28] = "FirstNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["MiddleNameTruncation"] = 29] = "MiddleNameTruncation";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country and municipality and/or state/province.
     */
    BarcodeElementKey[BarcodeElementKey["PlaceOfBirth"] = 30] = "PlaceOfBirth";
    /**
     Optional on all AAMVA barcodes.

     On Compact barcodes, use kFullAddress.

     Second line of street portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet2"] = 31] = "AddressStreet2";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Codes for race or ethnicity of the cardholder, as defined in ANSI D20.

     Race:
     Code   Description
     AI     Alaskan or American Indian (Having Origins in Any of The Original Peoples of
            North America, and Maintaining Cultural Identification Through Tribal
            Affiliation of Community Recognition)
     AP     Asian or Pacific Islander (Having Origins in Any of the Original Peoples of
            the Far East, Southeast Asia, or Pacific Islands. This Includes China, India,
            Japan, Korea, the Philippines Islands, and Samoa)
     BK     Black (Having Origins in Any of the Black Racial Groups of Africa)
     W      White (Having Origins in Any of The Original Peoples of Europe, North Africa,
            or the Middle East)

     Ethnicity:
     Code   Description
     H      Hispanic Origin (A Person of Mexican, Puerto Rican, Cuban, Central or South
            American or Other Spanish Culture or Origin, Regardless of Race)
     O      Not of Hispanic Origin (Any Person Other Than Hispanic)
     U      Unknown

     */
    BarcodeElementKey[BarcodeElementKey["RaceEthnicity"] = 32] = "RaceEthnicity";
    /**
     Optional on AAMVA 01 barcodes.

     PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["NamePrefix"] = 33] = "NamePrefix";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country in which DL/ID is issued. U.S. = USA, Canada = CAN.
     */
    BarcodeElementKey[BarcodeElementKey["CountryIdentification"] = 34] = "CountryIdentification";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 1.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress"] = 35] = "ResidenceStreetAddress";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 2.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress2"] = 36] = "ResidenceStreetAddress2";
    /**
     Optional on AAMVA version 01.

     Driver Residence City
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceCity"] = 37] = "ResidenceCity";
    /**
     Optional on AAMVA version 01.

     Driver Residence Jurisdiction Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceJurisdictionCode"] = 38] = "ResidenceJurisdictionCode";
    /**
     Optional on AAMVA 01 barcodes.

     Driver Residence Postal Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidencePostalCode"] = 39] = "ResidencePostalCode";
    /**
     Optional on AAMVA 01 barcodes.

     Full residence address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Residence Street Address (required)
     , (required if other address portions follow, otherwise optional)
     Residence City (optional)
     , (required if other address portions follow, otherwise optional)
     Residence Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     Residence ZIP - Residence Postal Code (optional)
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceFullAddress"] = 40] = "ResidenceFullAddress";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 18 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under18"] = 41] = "Under18";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 19 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under19"] = 42] = "Under19";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 21 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under21"] = 43] = "Under21";
    /**
     Optional on AAMVA version 01.

     The number assigned to the individual by the Social Security Administration.
     */
    BarcodeElementKey[BarcodeElementKey["SocialSecurityNumber"] = 44] = "SocialSecurityNumber";
    /**
     Optional on AAMVA version 01.

     Driver "AKA" Social Security Number. FORMAT SAME AS DRIVER SOC SEC NUM. ALTERNATIVE NUMBERS(S) used as SS NUM.
     */
    BarcodeElementKey[BarcodeElementKey["AKASocialSecurityNumber"] = 45] = "AKASocialSecurityNumber";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE MIDDLE NAME(s) or INITIALS of the individual holding the Driver License or ID.
     Hyphenated names acceptable, spaces between names acceptable, but no other
     use of special symbols.
     */
    BarcodeElementKey[BarcodeElementKey["AKAMiddleName"] = 46] = "AKAMiddleName";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["AKAPrefixName"] = 47] = "AKAPrefixName";
    /**
     Optional on AAMVA 01, 06, 07, 08 barcodes.

     Field that indicates that the cardholder is an organ donor = "1".
     */
    BarcodeElementKey[BarcodeElementKey["OrganDonor"] = 48] = "OrganDonor";
    /**
     Optional on AAMVA 07, 08 barcodes.

     Field that indicates that the cardholder is a veteran = "1"
     */
    BarcodeElementKey[BarcodeElementKey["Veteran"] = 49] = "Veteran";
    /**
     Optional on AAMVA 01. (MMDDCCYY format)

     ALTERNATIVE DATES(S) given as date of birth.
     */
    BarcodeElementKey[BarcodeElementKey["AKADateOfBirth"] = 50] = "AKADateOfBirth";
    // ==============================================================/
    // ==========          3. LICENSE DATA KEYS          ============/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     This number uniquely identifies the issuing jurisdiction and can
     be obtained by contacting the ISO Issuing Authority (AAMVA)
     */
    BarcodeElementKey[BarcodeElementKey["IssuerIdentificationNumber"] = 51] = "IssuerIdentificationNumber";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     If the document is non expiring then "Non expiring" is written in this field.

     Date on which the driving and identification privileges granted by the document are
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationDate"] = 52] = "DocumentExpirationDate";
    /**
     Mandatory on all AAMVA and Compact barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction Version Number: This is a decimal value between 0 and 99 that
     specifies the jurisdiction version level of the PDF417 barcode format.
     Notwithstanding iterations of this standard, jurisdictions implement incremental
     changes to their barcodes, including new jurisdiction-specific data, compression
     algorithms for digitized images, digital signatures, or new truncation
     conventions used for names and addresses. Each change to the barcode format
     within each AAMVA version (above) must be noted, beginning with Jurisdiction
     Version 00.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVersionNumber"] = 53] = "JurisdictionVersionNumber";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     Jurisdiction-specific vehicle class / group code, designating the type
     of vehicle the cardholder has privilege to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClass"] = 54] = "JurisdictionVehicleClass";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent restrictions to driving
     privileges (such as airbrakes, automatic transmission, daylight only, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodes"] = 55] = "JurisdictionRestrictionCodes";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent additional privileges
     granted to the cardholder beyond the vehicle class (such as transportation of
     passengers, hazardous materials, operation of motorcycles, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsementCodes"] = 56] = "JurisdictionEndorsementCodes";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     Date on which the document was issued. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentIssueDate"] = 57] = "DocumentIssueDate";
    /**
     Mandatory on AAMVA versions 02 and 03.

     Federally established codes for vehicle categories, endorsements, and restrictions
     that are generally applicable to commercial motor vehicles. If the vehicle is not a
     commercial vehicle, "NONE" is to be entered.
     */
    BarcodeElementKey[BarcodeElementKey["FederalCommercialVehicleCodes"] = 58] = "FederalCommercialVehicleCodes";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Jurisdictions may define a subfile to contain jurisdiction-specific information.
     These subfiles are designated with the first character of “Z” and the second
     character is the first letter of the jurisdiction's name. For example, "ZC" would
     be the designator for a California or Colorado jurisdiction-defined subfile, "ZQ"
     would be the designator for a Quebec jurisdiction-defined subfile. In the case of
     a jurisdiction-defined subfile that has a first letter that could be more than
     one jurisdiction (e.g. California, Colorado, Connecticut) then other data, like
     the IIN or address, must be examined to determine the jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdiction"] = 59] = "IssuingJurisdiction";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Standard vehicle classification code(s) for cardholder. This data element is a
     placeholder for future efforts to standardize vehicle classifications.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVehicleClassification"] = 60] = "StandardVehicleClassification";
    /**
      Optional on all AAMVA and Magnetic barcodes.

      Name of issuing jurisdiction, for example: Alabama, Alaska ...
      */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdictionName"] = 61] = "IssuingJurisdictionName";
    /**
     Optional on all AAMVA barcodes.

     Standard endorsement code(s) for cardholder. See codes in D20. This data element is a
     placeholder for future efforts to standardize endorsement codes.

     Code   Description
     H      Hazardous Material - This endorsement is required for the operation of any vehicle
            transporting hazardous materials requiring placarding, as defined by U.S.
            Department of Transportation regulations.
     L      Motorcycles – Including Mopeds/Motorized Bicycles.
     N      Tank - This endorsement is required for the operation of any vehicle transporting,
            as its primary cargo, any liquid or gaseous material within a tank attached to the vehicle.
     O      Other Jurisdiction Specific Endorsement(s) - This code indicates one or more
            additional jurisdiction assigned endorsements.
     P      Passenger - This endorsement is required for the operation of any vehicle used for
            transportation of sixteen or more occupants, including the driver.
     S      School Bus - This endorsement is required for the operation of a school bus. School bus means a
            CMV used to transport pre-primary, primary, or secondary school students from home to school,
            from school to home, or to and from school sponsored events. School bus does not include a
            bus used as common carrier (49 CRF 383.5).
     T      Doubles/Triples - This endorsement is required for the operation of any vehicle that would be
            referred to as a double or triple.
     X      Combined Tank/HAZ-MAT - This endorsement may be issued to any driver who qualifies for
            both the N and H endorsements.
     */
    BarcodeElementKey[BarcodeElementKey["StandardEndorsementCode"] = 62] = "StandardEndorsementCode";
    /**
     Optional on all AAMVA barcodes.

     Standard restriction code(s) for cardholder. See codes in D20. This data element is a placeholder
     for future efforts to standardize restriction codes.

     Code   Description
     B      Corrective Lenses
     C      Mechanical Devices (Special Brakes, Hand Controls, or Other Adaptive Devices)
     D      Prosthetic Aid
     E      Automatic Transmission
     F      Outside Mirror
     G      Limit to Daylight Only
     H      Limit to Employment
     I      Limited Other
     J      Other
     K      CDL Intrastate Only
     L      Vehicles without air brakes
     M      Except Class A bus
     N      Except Class A and Class B bus
     O      Except Tractor-Trailer
     V      Medical Variance Documentation Required
     W      Farm Waiver
     */
    BarcodeElementKey[BarcodeElementKey["StandardRestrictionCode"] = 63] = "StandardRestrictionCode";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) for classifications
     of vehicles cardholder is authorized to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClassificationDescription"] = 64] = "JurisdictionVehicleClassificationDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) that indicates additional
     driving privileges granted to the cardholder beyond the vehicle class.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsmentCodeDescription"] = 65] = "JurisdictionEndorsmentCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text describing the jurisdiction-specific restriction code(s) that curtail driving privileges.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodeDescription"] = 66] = "JurisdictionRestrictionCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.

     A string of letters and/or numbers that is affixed to the raw materials (card stock,
     laminate, etc.) used in producing driver's licenses and ID cards. (DHS recommended field)
     */
    BarcodeElementKey[BarcodeElementKey["InventoryControlNumber"] = 67] = "InventoryControlNumber";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates date of the most recent version change or
     modification to the visible format of the DL/ID. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["CardRevisionDate"] = 68] = "CardRevisionDate";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Magnetic barcodes.
     Optional and Compact barcodes.

     Number must uniquely identify a particular document issued to that customer
     from others that may have been issued in the past. This number may serve multiple
     purposes of document discrimination, audit information number, and/or inventory control.
     */
    BarcodeElementKey[BarcodeElementKey["DocumentDiscriminator"] = 69] = "DocumentDiscriminator";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates that the cardholder has temporary lawful status = "1".
     */
    BarcodeElementKey[BarcodeElementKey["LimitedDurationDocument"] = 70] = "LimitedDurationDocument";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     A string of letters and/or numbers that identifies when, where, and by whom a driver's
     license/ID card was made. If audit information is not used on the card or the MRT, it
     must be included in the driver record.
     */
    BarcodeElementKey[BarcodeElementKey["AuditInformation"] = 71] = "AuditInformation";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates compliance: "M" = materially compliant,
     "F" = fully compliant, and, "N" = non-compliant.
     */
    BarcodeElementKey[BarcodeElementKey["ComplianceType"] = 72] = "ComplianceType";
    /**
     Optional on AAMVA version 01 barcodes.

     Issue Timestamp. A string used by some jurisdictions to validate the document against their data base.
     */
    BarcodeElementKey[BarcodeElementKey["IssueTimestamp"] = 73] = "IssueTimestamp";
    /**
     Optional on AAMVA version 01 barcodes.

     Driver Permit Expiration Date. MMDDCCYY format. Date permit expires.
     */
    BarcodeElementKey[BarcodeElementKey["PermitExpirationDate"] = 74] = "PermitExpirationDate";
    /**
     Optional on AAMVA version 01 barcodes..

     Type of permit.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIdentifier"] = 75] = "PermitIdentifier";
    /**
     Optional on AAMVA version 01 barcodes..

     Driver Permit Issue Date. MMDDCCYY format. Date permit was issued.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIssueDate"] = 76] = "PermitIssueDate";
    /**
     Optional on AAMVA version 01.

     Number of duplicate cards issued for a license or ID if any.
     */
    BarcodeElementKey[BarcodeElementKey["NumberOfDuplicates"] = 77] = "NumberOfDuplicates";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     Date on which the hazardous material endorsement granted by the document is
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["HAZMATExpirationDate"] = 78] = "HAZMATExpirationDate";
    /**
     Optional on AAMVA version 01.

     Medical Indicator/Codes.
     STATE SPECIFIC. Freeform, Standard "TBD"
     */
    BarcodeElementKey[BarcodeElementKey["MedicalIndicator"] = 79] = "MedicalIndicator";
    /**
     Optional on AAMVA version 01.

     Non-Resident Indicator. "Y". Used by some jurisdictions to indicate holder of the document is a non-resident.
     */
    BarcodeElementKey[BarcodeElementKey["NonResident"] = 80] = "NonResident";
    /**
     Optional on AAMVA version 01.

     A number or alphanumeric string used by some jurisdictions to identify a "customer" across multiple data bases.
     */
    BarcodeElementKey[BarcodeElementKey["UniqueCustomerId"] = 81] = "UniqueCustomerId";
    /**
     Optional on compact barcodes.

     Document discriminator.
     */
    BarcodeElementKey[BarcodeElementKey["DataDiscriminator"] = 82] = "DataDiscriminator";
    /**
     Optional on Magnetic barcodes.

     Month on which the driving and identification privileges granted by the document are
     no longer valid. (MMYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationMonth"] = 83] = "DocumentExpirationMonth";
    /**
     Optional on Magnetic barcodes.

     Field that indicates that the driving and identification privileges granted by the
     document are nonexpiring = "1".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentNonexpiring"] = 84] = "DocumentNonexpiring";
    /**
      Optional on Magnetic barcodes.

      Security version beeing used.
    */
    BarcodeElementKey[BarcodeElementKey["SecurityVersion"] = 85] = "SecurityVersion";
    /**
      Number of keys in enum.
    */
    BarcodeElementKey[BarcodeElementKey["Count"] = 86] = "Count";
})(BarcodeElementKey || (BarcodeElementKey = {}));

class ClassFilter {
    constructor() {
        /**
         * If set, specified fields will be anonymized on documents issued by
         * specified country only. Otherwise, issuing country will not be taken into
         * account during anonymization.
         */
        this.country = null;
        /**
         * If set, specified fields will be anonymized on documents issued by
         * specified region only. Otherwise, issuing region will not be taken into
         * account during anonymization.
         */
        this.region = null;
        /**
         * If set, specified fields will be anonymized on documents of specified
         * type only. Otherwise, document type will not be taken into account during
         * anonymization.
         */
        this.type = null;
    }
}

var Country;
(function (Country) {
    Country[Country["NONE"] = 0] = "NONE";
    Country[Country["ALBANIA"] = 1] = "ALBANIA";
    Country[Country["ALGERIA"] = 2] = "ALGERIA";
    Country[Country["ARGENTINA"] = 3] = "ARGENTINA";
    Country[Country["AUSTRALIA"] = 4] = "AUSTRALIA";
    Country[Country["AUSTRIA"] = 5] = "AUSTRIA";
    Country[Country["AZERBAIJAN"] = 6] = "AZERBAIJAN";
    Country[Country["BAHRAIN"] = 7] = "BAHRAIN";
    Country[Country["BANGLADESH"] = 8] = "BANGLADESH";
    Country[Country["BELGIUM"] = 9] = "BELGIUM";
    Country[Country["BOSNIA_AND_HERZEGOVINA"] = 10] = "BOSNIA_AND_HERZEGOVINA";
    Country[Country["BRUNEI"] = 11] = "BRUNEI";
    Country[Country["BULGARIA"] = 12] = "BULGARIA";
    Country[Country["CAMBODIA"] = 13] = "CAMBODIA";
    Country[Country["CANADA"] = 14] = "CANADA";
    Country[Country["CHILE"] = 15] = "CHILE";
    Country[Country["COLOMBIA"] = 16] = "COLOMBIA";
    Country[Country["COSTA_RICA"] = 17] = "COSTA_RICA";
    Country[Country["CROATIA"] = 18] = "CROATIA";
    Country[Country["CYPRUS"] = 19] = "CYPRUS";
    Country[Country["CZECHIA"] = 20] = "CZECHIA";
    Country[Country["DENMARK"] = 21] = "DENMARK";
    Country[Country["DOMINICAN_REPUBLIC"] = 22] = "DOMINICAN_REPUBLIC";
    Country[Country["EGYPT"] = 23] = "EGYPT";
    Country[Country["ESTONIA"] = 24] = "ESTONIA";
    Country[Country["FINLAND"] = 25] = "FINLAND";
    Country[Country["FRANCE"] = 26] = "FRANCE";
    Country[Country["GEORGIA"] = 27] = "GEORGIA";
    Country[Country["GERMANY"] = 28] = "GERMANY";
    Country[Country["GHANA"] = 29] = "GHANA";
    Country[Country["GREECE"] = 30] = "GREECE";
    Country[Country["GUATEMALA"] = 31] = "GUATEMALA";
    Country[Country["HONG_KONG"] = 32] = "HONG_KONG";
    Country[Country["HUNGARY"] = 33] = "HUNGARY";
    Country[Country["INDIA"] = 34] = "INDIA";
    Country[Country["INDONESIA"] = 35] = "INDONESIA";
    Country[Country["IRELAND"] = 36] = "IRELAND";
    Country[Country["ISRAEL"] = 37] = "ISRAEL";
    Country[Country["ITALY"] = 38] = "ITALY";
    Country[Country["JORDAN"] = 39] = "JORDAN";
    Country[Country["KAZAKHSTAN"] = 40] = "KAZAKHSTAN";
    Country[Country["KENYA"] = 41] = "KENYA";
    Country[Country["KOSOVO"] = 42] = "KOSOVO";
    Country[Country["KUWAIT"] = 43] = "KUWAIT";
    Country[Country["LATVIA"] = 44] = "LATVIA";
    Country[Country["LITHUANIA"] = 45] = "LITHUANIA";
    Country[Country["MALAYSIA"] = 46] = "MALAYSIA";
    Country[Country["MALDIVES"] = 47] = "MALDIVES";
    Country[Country["MALTA"] = 48] = "MALTA";
    Country[Country["MAURITIUS"] = 49] = "MAURITIUS";
    Country[Country["MEXICO"] = 50] = "MEXICO";
    Country[Country["MOROCCO"] = 51] = "MOROCCO";
    Country[Country["NETHERLANDS"] = 52] = "NETHERLANDS";
    Country[Country["NEW_ZEALAND"] = 53] = "NEW_ZEALAND";
    Country[Country["NIGERIA"] = 54] = "NIGERIA";
    Country[Country["PAKISTAN"] = 55] = "PAKISTAN";
    Country[Country["PANAMA"] = 56] = "PANAMA";
    Country[Country["PARAGUAY"] = 57] = "PARAGUAY";
    Country[Country["PHILIPPINES"] = 58] = "PHILIPPINES";
    Country[Country["POLAND"] = 59] = "POLAND";
    Country[Country["PORTUGAL"] = 60] = "PORTUGAL";
    Country[Country["PUERTO_RICO"] = 61] = "PUERTO_RICO";
    Country[Country["QATAR"] = 62] = "QATAR";
    Country[Country["ROMANIA"] = 63] = "ROMANIA";
    Country[Country["RUSSIA"] = 64] = "RUSSIA";
    Country[Country["SAUDI_ARABIA"] = 65] = "SAUDI_ARABIA";
    Country[Country["SERBIA"] = 66] = "SERBIA";
    Country[Country["SINGAPORE"] = 67] = "SINGAPORE";
    Country[Country["SLOVAKIA"] = 68] = "SLOVAKIA";
    Country[Country["SLOVENIA"] = 69] = "SLOVENIA";
    Country[Country["SOUTH_AFRICA"] = 70] = "SOUTH_AFRICA";
    Country[Country["SPAIN"] = 71] = "SPAIN";
    Country[Country["SWEDEN"] = 72] = "SWEDEN";
    Country[Country["SWITZERLAND"] = 73] = "SWITZERLAND";
    Country[Country["TAIWAN"] = 74] = "TAIWAN";
    Country[Country["THAILAND"] = 75] = "THAILAND";
    Country[Country["TUNISIA"] = 76] = "TUNISIA";
    Country[Country["TURKEY"] = 77] = "TURKEY";
    Country[Country["UAE"] = 78] = "UAE";
    Country[Country["UGANDA"] = 79] = "UGANDA";
    Country[Country["UK"] = 80] = "UK";
    Country[Country["UKRAINE"] = 81] = "UKRAINE";
    Country[Country["USA"] = 82] = "USA";
    Country[Country["VIETNAM"] = 83] = "VIETNAM";
    Country[Country["BRAZIL"] = 84] = "BRAZIL";
    Country[Country["NORWAY"] = 85] = "NORWAY";
    Country[Country["OMAN"] = 86] = "OMAN";
    Country[Country["ECUADOR"] = 87] = "ECUADOR";
    Country[Country["EL_SALVADOR"] = 88] = "EL_SALVADOR";
    Country[Country["SRI_LANKA"] = 89] = "SRI_LANKA";
    Country[Country["PERU"] = 90] = "PERU";
    Country[Country["URUGUAY"] = 91] = "URUGUAY";
    Country[Country["BAHAMAS"] = 92] = "BAHAMAS";
    Country[Country["BERMUDA"] = 93] = "BERMUDA";
    Country[Country["BOLIVIA"] = 94] = "BOLIVIA";
    Country[Country["CHINA"] = 95] = "CHINA";
    Country[Country["EUROPEAN_UNION"] = 96] = "EUROPEAN_UNION";
    Country[Country["HAITI"] = 97] = "HAITI";
    Country[Country["HONDURAS"] = 98] = "HONDURAS";
    Country[Country["ICELAND"] = 99] = "ICELAND";
    Country[Country["JAPAN"] = 100] = "JAPAN";
    Country[Country["LUXEMBOURG"] = 101] = "LUXEMBOURG";
    Country[Country["MONTENEGRO"] = 102] = "MONTENEGRO";
    Country[Country["NICARAGUA"] = 103] = "NICARAGUA";
    Country[Country["SOUTH_KOREA"] = 104] = "SOUTH_KOREA";
    Country[Country["VENEZUELA"] = 105] = "VENEZUELA";
    Country[Country["AFGHANISTAN"] = 106] = "AFGHANISTAN";
    Country[Country["ALAND_ISLANDS"] = 107] = "ALAND_ISLANDS";
    Country[Country["AMERICAN_SAMOA"] = 108] = "AMERICAN_SAMOA";
    Country[Country["ANDORRA"] = 109] = "ANDORRA";
    Country[Country["ANGOLA"] = 110] = "ANGOLA";
    Country[Country["ANGUILLA"] = 111] = "ANGUILLA";
    Country[Country["ANTARCTICA"] = 112] = "ANTARCTICA";
    Country[Country["ANTIGUA_AND_BARBUDA"] = 113] = "ANTIGUA_AND_BARBUDA";
    Country[Country["ARMENIA"] = 114] = "ARMENIA";
    Country[Country["ARUBA"] = 115] = "ARUBA";
    Country[Country["BAILIWICK_OF_GUERNSEY"] = 116] = "BAILIWICK_OF_GUERNSEY";
    Country[Country["BAILIWICK_OF_JERSEY"] = 117] = "BAILIWICK_OF_JERSEY";
    Country[Country["BARBADOS"] = 118] = "BARBADOS";
    Country[Country["BELARUS"] = 119] = "BELARUS";
    Country[Country["BELIZE"] = 120] = "BELIZE";
    Country[Country["BENIN"] = 121] = "BENIN";
    Country[Country["BHUTAN"] = 122] = "BHUTAN";
    Country[Country["BONAIRE_SAINT_EUSTATIUS_AND_SABA"] = 123] = "BONAIRE_SAINT_EUSTATIUS_AND_SABA";
    Country[Country["BOTSWANA"] = 124] = "BOTSWANA";
    Country[Country["BOUVET_ISLAND"] = 125] = "BOUVET_ISLAND";
    Country[Country["BRITISH_INDIAN_OCEAN_TERRITORY"] = 126] = "BRITISH_INDIAN_OCEAN_TERRITORY";
    Country[Country["BURKINA_FASO"] = 127] = "BURKINA_FASO";
    Country[Country["BURUNDI"] = 128] = "BURUNDI";
    Country[Country["CAMEROON"] = 129] = "CAMEROON";
    Country[Country["CAPE_VERDE"] = 130] = "CAPE_VERDE";
    Country[Country["CARIBBEAN_NETHERLANDS"] = 131] = "CARIBBEAN_NETHERLANDS";
    Country[Country["CAYMAN_ISLANDS"] = 132] = "CAYMAN_ISLANDS";
    Country[Country["CENTRAL_AFRICAN_REPUBLIC"] = 133] = "CENTRAL_AFRICAN_REPUBLIC";
    Country[Country["CHAD"] = 134] = "CHAD";
    Country[Country["CHRISTMAS_ISLAND"] = 135] = "CHRISTMAS_ISLAND";
    Country[Country["COCOS_ISLANDS"] = 136] = "COCOS_ISLANDS";
    Country[Country["COMOROS"] = 137] = "COMOROS";
    Country[Country["CONGO"] = 138] = "CONGO";
    Country[Country["COOK_ISLANDS"] = 139] = "COOK_ISLANDS";
    Country[Country["CUBA"] = 140] = "CUBA";
    Country[Country["CURACAO"] = 141] = "CURACAO";
    Country[Country["DEMOCRATIC_REPUBLIC_OF_THE_CONGO"] = 142] = "DEMOCRATIC_REPUBLIC_OF_THE_CONGO";
    Country[Country["DJIBOUTI"] = 143] = "DJIBOUTI";
    Country[Country["DOMINICA"] = 144] = "DOMINICA";
    Country[Country["EAST_TIMOR"] = 145] = "EAST_TIMOR";
    Country[Country["EQUATORIAL_GUINEA"] = 146] = "EQUATORIAL_GUINEA";
    Country[Country["ERITREA"] = 147] = "ERITREA";
    Country[Country["ETHIOPIA"] = 148] = "ETHIOPIA";
    Country[Country["FALKLAND_ISLANDS"] = 149] = "FALKLAND_ISLANDS";
    Country[Country["FAROE_ISLANDS"] = 150] = "FAROE_ISLANDS";
    Country[Country["FEDERATED_STATES_OF_MICRONESIA"] = 151] = "FEDERATED_STATES_OF_MICRONESIA";
    Country[Country["FIJI"] = 152] = "FIJI";
    Country[Country["FRENCH_GUIANA"] = 153] = "FRENCH_GUIANA";
    Country[Country["FRENCH_POLYNESIA"] = 154] = "FRENCH_POLYNESIA";
    Country[Country["FRENCH_SOUTHERN_TERRITORIES"] = 155] = "FRENCH_SOUTHERN_TERRITORIES";
    Country[Country["GABON"] = 156] = "GABON";
    Country[Country["GAMBIA"] = 157] = "GAMBIA";
    Country[Country["GIBRALTAR"] = 158] = "GIBRALTAR";
    Country[Country["GREENLAND"] = 159] = "GREENLAND";
    Country[Country["GRENADA"] = 160] = "GRENADA";
    Country[Country["GUADELOUPE"] = 161] = "GUADELOUPE";
    Country[Country["GUAM"] = 162] = "GUAM";
    Country[Country["GUINEA"] = 163] = "GUINEA";
    Country[Country["GUINEA_BISSAU"] = 164] = "GUINEA_BISSAU";
    Country[Country["GUYANA"] = 165] = "GUYANA";
    Country[Country["HEARD_ISLAND_AND_MCDONALD_ISLANDS"] = 166] = "HEARD_ISLAND_AND_MCDONALD_ISLANDS";
    Country[Country["IRAN"] = 167] = "IRAN";
    Country[Country["IRAQ"] = 168] = "IRAQ";
    Country[Country["ISLE_OF_MAN"] = 169] = "ISLE_OF_MAN";
    Country[Country["IVORY_COAST"] = 170] = "IVORY_COAST";
    Country[Country["JAMAICA"] = 171] = "JAMAICA";
    Country[Country["KIRIBATI"] = 172] = "KIRIBATI";
    Country[Country["KYRGYZSTAN"] = 173] = "KYRGYZSTAN";
    Country[Country["LAOS"] = 174] = "LAOS";
    Country[Country["LEBANON"] = 175] = "LEBANON";
    Country[Country["LESOTHO"] = 176] = "LESOTHO";
    Country[Country["LIBERIA"] = 177] = "LIBERIA";
    Country[Country["LIBYA"] = 178] = "LIBYA";
    Country[Country["LIECHTENSTEIN"] = 179] = "LIECHTENSTEIN";
    Country[Country["MACAU"] = 180] = "MACAU";
    Country[Country["MADAGASCAR"] = 181] = "MADAGASCAR";
    Country[Country["MALAWI"] = 182] = "MALAWI";
    Country[Country["MALI"] = 183] = "MALI";
    Country[Country["MARSHALL_ISLANDS"] = 184] = "MARSHALL_ISLANDS";
    Country[Country["MARTINIQUE"] = 185] = "MARTINIQUE";
    Country[Country["MAURITANIA"] = 186] = "MAURITANIA";
    Country[Country["MAYOTTE"] = 187] = "MAYOTTE";
    Country[Country["MOLDOVA"] = 188] = "MOLDOVA";
    Country[Country["MONACO"] = 189] = "MONACO";
    Country[Country["MONGOLIA"] = 190] = "MONGOLIA";
    Country[Country["MONTSERRAT"] = 191] = "MONTSERRAT";
    Country[Country["MOZAMBIQUE"] = 192] = "MOZAMBIQUE";
    Country[Country["MYANMAR"] = 193] = "MYANMAR";
    Country[Country["NAMIBIA"] = 194] = "NAMIBIA";
    Country[Country["NAURU"] = 195] = "NAURU";
    Country[Country["NEPAL"] = 196] = "NEPAL";
    Country[Country["NEW_CALEDONIA"] = 197] = "NEW_CALEDONIA";
    Country[Country["NIGER"] = 198] = "NIGER";
    Country[Country["NIUE"] = 199] = "NIUE";
    Country[Country["NORFOLK_ISLAND"] = 200] = "NORFOLK_ISLAND";
    Country[Country["NORTHERN_CYPRUS"] = 201] = "NORTHERN_CYPRUS";
    Country[Country["NORTHERN_MARIANA_ISLANDS"] = 202] = "NORTHERN_MARIANA_ISLANDS";
    Country[Country["NORTH_KOREA"] = 203] = "NORTH_KOREA";
    Country[Country["NORTH_MACEDONIA"] = 204] = "NORTH_MACEDONIA";
    Country[Country["PALAU"] = 205] = "PALAU";
    Country[Country["PALESTINE"] = 206] = "PALESTINE";
    Country[Country["PAPUA_NEW_GUINEA"] = 207] = "PAPUA_NEW_GUINEA";
    Country[Country["PITCAIRN"] = 208] = "PITCAIRN";
    Country[Country["REUNION"] = 209] = "REUNION";
    Country[Country["RWANDA"] = 210] = "RWANDA";
    Country[Country["SAINT_BARTHELEMY"] = 211] = "SAINT_BARTHELEMY";
    Country[Country["SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA"] = 212] = "SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA";
    Country[Country["SAINT_KITTS_AND_NEVIS"] = 213] = "SAINT_KITTS_AND_NEVIS";
    Country[Country["SAINT_LUCIA"] = 214] = "SAINT_LUCIA";
    Country[Country["SAINT_MARTIN"] = 215] = "SAINT_MARTIN";
    Country[Country["SAINT_PIERRE_AND_MIQUELON"] = 216] = "SAINT_PIERRE_AND_MIQUELON";
    Country[Country["SAINT_VINCENT_AND_THE_GRENADINES"] = 217] = "SAINT_VINCENT_AND_THE_GRENADINES";
    Country[Country["SAMOA"] = 218] = "SAMOA";
    Country[Country["SAN_MARINO"] = 219] = "SAN_MARINO";
    Country[Country["SAO_TOME_AND_PRINCIPE"] = 220] = "SAO_TOME_AND_PRINCIPE";
    Country[Country["SENEGAL"] = 221] = "SENEGAL";
    Country[Country["SEYCHELLES"] = 222] = "SEYCHELLES";
    Country[Country["SIERRA_LEONE"] = 223] = "SIERRA_LEONE";
    Country[Country["SINT_MAARTEN"] = 224] = "SINT_MAARTEN";
    Country[Country["SOLOMON_ISLANDS"] = 225] = "SOLOMON_ISLANDS";
    Country[Country["SOMALIA"] = 226] = "SOMALIA";
    Country[Country["SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS"] = 227] = "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS";
    Country[Country["SOUTH_SUDAN"] = 228] = "SOUTH_SUDAN";
    Country[Country["SUDAN"] = 229] = "SUDAN";
    Country[Country["SURINAME"] = 230] = "SURINAME";
    Country[Country["SVALBARD_AND_JAN_MAYEN"] = 231] = "SVALBARD_AND_JAN_MAYEN";
    Country[Country["ESWATINI"] = 232] = "ESWATINI";
    Country[Country["SYRIA"] = 233] = "SYRIA";
    Country[Country["TAJIKISTAN"] = 234] = "TAJIKISTAN";
    Country[Country["TANZANIA"] = 235] = "TANZANIA";
    Country[Country["TOGO"] = 236] = "TOGO";
    Country[Country["TOKELAU"] = 237] = "TOKELAU";
    Country[Country["TONGA"] = 238] = "TONGA";
    Country[Country["TRINIDAD_AND_TOBAGO"] = 239] = "TRINIDAD_AND_TOBAGO";
    Country[Country["TURKMENISTAN"] = 240] = "TURKMENISTAN";
    Country[Country["TURKS_AND_CAICOS_ISLANDS"] = 241] = "TURKS_AND_CAICOS_ISLANDS";
    Country[Country["TUVALU"] = 242] = "TUVALU";
    Country[Country["UNITED_STATES_MINOR_OUTLYING_ISLANDS"] = 243] = "UNITED_STATES_MINOR_OUTLYING_ISLANDS";
    Country[Country["UZBEKISTAN"] = 244] = "UZBEKISTAN";
    Country[Country["VANUATU"] = 245] = "VANUATU";
    Country[Country["VATICAN_CITY"] = 246] = "VATICAN_CITY";
    Country[Country["VIRGIN_ISLANDS_BRITISH"] = 247] = "VIRGIN_ISLANDS_BRITISH";
    Country[Country["VIRGIN_ISLANDS_US"] = 248] = "VIRGIN_ISLANDS_US";
    Country[Country["WALLIS_AND_FUTUNA"] = 249] = "WALLIS_AND_FUTUNA";
    Country[Country["WESTERN_SAHARA"] = 250] = "WESTERN_SAHARA";
    Country[Country["YEMEN"] = 251] = "YEMEN";
    Country[Country["YUGOSLAVIA"] = 252] = "YUGOSLAVIA";
    Country[Country["ZAMBIA"] = 253] = "ZAMBIA";
    Country[Country["ZIMBABWE"] = 254] = "ZIMBABWE";
    Country[Country["SCHENGEN_AREA"] = 255] = "SCHENGEN_AREA";
    Country[Country["COUNT"] = 256] = "COUNT";
})(Country || (Country = {}));
var Region;
(function (Region) {
    Region[Region["NONE"] = 0] = "NONE";
    Region[Region["ALABAMA"] = 1] = "ALABAMA";
    Region[Region["ALASKA"] = 2] = "ALASKA";
    Region[Region["ALBERTA"] = 3] = "ALBERTA";
    Region[Region["ARIZONA"] = 4] = "ARIZONA";
    Region[Region["ARKANSAS"] = 5] = "ARKANSAS";
    Region[Region["AUSTRALIAN_CAPITAL_TERRITORY"] = 6] = "AUSTRALIAN_CAPITAL_TERRITORY";
    Region[Region["BRITISH_COLUMBIA"] = 7] = "BRITISH_COLUMBIA";
    Region[Region["CALIFORNIA"] = 8] = "CALIFORNIA";
    Region[Region["COLORADO"] = 9] = "COLORADO";
    Region[Region["CONNECTICUT"] = 10] = "CONNECTICUT";
    Region[Region["DELAWARE"] = 11] = "DELAWARE";
    Region[Region["DISTRICT_OF_COLUMBIA"] = 12] = "DISTRICT_OF_COLUMBIA";
    Region[Region["FLORIDA"] = 13] = "FLORIDA";
    Region[Region["GEORGIA"] = 14] = "GEORGIA";
    Region[Region["HAWAII"] = 15] = "HAWAII";
    Region[Region["IDAHO"] = 16] = "IDAHO";
    Region[Region["ILLINOIS"] = 17] = "ILLINOIS";
    Region[Region["INDIANA"] = 18] = "INDIANA";
    Region[Region["IOWA"] = 19] = "IOWA";
    Region[Region["KANSAS"] = 20] = "KANSAS";
    Region[Region["KENTUCKY"] = 21] = "KENTUCKY";
    Region[Region["LOUISIANA"] = 22] = "LOUISIANA";
    Region[Region["MAINE"] = 23] = "MAINE";
    Region[Region["MANITOBA"] = 24] = "MANITOBA";
    Region[Region["MARYLAND"] = 25] = "MARYLAND";
    Region[Region["MASSACHUSETTS"] = 26] = "MASSACHUSETTS";
    Region[Region["MICHIGAN"] = 27] = "MICHIGAN";
    Region[Region["MINNESOTA"] = 28] = "MINNESOTA";
    Region[Region["MISSISSIPPI"] = 29] = "MISSISSIPPI";
    Region[Region["MISSOURI"] = 30] = "MISSOURI";
    Region[Region["MONTANA"] = 31] = "MONTANA";
    Region[Region["NEBRASKA"] = 32] = "NEBRASKA";
    Region[Region["NEVADA"] = 33] = "NEVADA";
    Region[Region["NEW_BRUNSWICK"] = 34] = "NEW_BRUNSWICK";
    Region[Region["NEW_HAMPSHIRE"] = 35] = "NEW_HAMPSHIRE";
    Region[Region["NEW_JERSEY"] = 36] = "NEW_JERSEY";
    Region[Region["NEW_MEXICO"] = 37] = "NEW_MEXICO";
    Region[Region["NEW_SOUTH_WALES"] = 38] = "NEW_SOUTH_WALES";
    Region[Region["NEW_YORK"] = 39] = "NEW_YORK";
    Region[Region["NORTHERN_TERRITORY"] = 40] = "NORTHERN_TERRITORY";
    Region[Region["NORTH_CAROLINA"] = 41] = "NORTH_CAROLINA";
    Region[Region["NORTH_DAKOTA"] = 42] = "NORTH_DAKOTA";
    Region[Region["NOVA_SCOTIA"] = 43] = "NOVA_SCOTIA";
    Region[Region["OHIO"] = 44] = "OHIO";
    Region[Region["OKLAHOMA"] = 45] = "OKLAHOMA";
    Region[Region["ONTARIO"] = 46] = "ONTARIO";
    Region[Region["OREGON"] = 47] = "OREGON";
    Region[Region["PENNSYLVANIA"] = 48] = "PENNSYLVANIA";
    Region[Region["QUEBEC"] = 49] = "QUEBEC";
    Region[Region["QUEENSLAND"] = 50] = "QUEENSLAND";
    Region[Region["RHODE_ISLAND"] = 51] = "RHODE_ISLAND";
    Region[Region["SASKATCHEWAN"] = 52] = "SASKATCHEWAN";
    Region[Region["SOUTH_AUSTRALIA"] = 53] = "SOUTH_AUSTRALIA";
    Region[Region["SOUTH_CAROLINA"] = 54] = "SOUTH_CAROLINA";
    Region[Region["SOUTH_DAKOTA"] = 55] = "SOUTH_DAKOTA";
    Region[Region["TASMANIA"] = 56] = "TASMANIA";
    Region[Region["TENNESSEE"] = 57] = "TENNESSEE";
    Region[Region["TEXAS"] = 58] = "TEXAS";
    Region[Region["UTAH"] = 59] = "UTAH";
    Region[Region["VERMONT"] = 60] = "VERMONT";
    Region[Region["VICTORIA"] = 61] = "VICTORIA";
    Region[Region["VIRGINIA"] = 62] = "VIRGINIA";
    Region[Region["WASHINGTON"] = 63] = "WASHINGTON";
    Region[Region["WESTERN_AUSTRALIA"] = 64] = "WESTERN_AUSTRALIA";
    Region[Region["WEST_VIRGINIA"] = 65] = "WEST_VIRGINIA";
    Region[Region["WISCONSIN"] = 66] = "WISCONSIN";
    Region[Region["WYOMING"] = 67] = "WYOMING";
    Region[Region["YUKON"] = 68] = "YUKON";
    Region[Region["CIUDAD_DE_MEXICO"] = 69] = "CIUDAD_DE_MEXICO";
    Region[Region["JALISCO"] = 70] = "JALISCO";
    Region[Region["NEWFOUNDLAND_AND_LABRADOR"] = 71] = "NEWFOUNDLAND_AND_LABRADOR";
    Region[Region["NUEVO_LEON"] = 72] = "NUEVO_LEON";
    Region[Region["BAJA_CALIFORNIA"] = 73] = "BAJA_CALIFORNIA";
    Region[Region["CHIHUAHUA"] = 74] = "CHIHUAHUA";
    Region[Region["GUANAJUATO"] = 75] = "GUANAJUATO";
    Region[Region["GUERRERO"] = 76] = "GUERRERO";
    Region[Region["MEXICO"] = 77] = "MEXICO";
    Region[Region["MICHOACAN"] = 78] = "MICHOACAN";
    Region[Region["NEW_YORK_CITY"] = 79] = "NEW_YORK_CITY";
    Region[Region["TAMAULIPAS"] = 80] = "TAMAULIPAS";
    Region[Region["VERACRUZ"] = 81] = "VERACRUZ";
    Region[Region["CHIAPAS"] = 82] = "CHIAPAS";
    Region[Region["COAHUILA"] = 83] = "COAHUILA";
    Region[Region["DURANGO"] = 84] = "DURANGO";
    Region[Region["GUERRERO_COCULA"] = 85] = "GUERRERO_COCULA";
    Region[Region["GUERRERO_JUCHITAN"] = 86] = "GUERRERO_JUCHITAN";
    Region[Region["GUERRERO_TEPECOACUILCO"] = 87] = "GUERRERO_TEPECOACUILCO";
    Region[Region["GUERRERO_TLACOAPA"] = 88] = "GUERRERO_TLACOAPA";
    Region[Region["GUJARAT"] = 89] = "GUJARAT";
    Region[Region["HIDALGO"] = 90] = "HIDALGO";
    Region[Region["KARNATAKA"] = 91] = "KARNATAKA";
    Region[Region["KERALA"] = 92] = "KERALA";
    Region[Region["KHYBER_PAKHTUNKHWA"] = 93] = "KHYBER_PAKHTUNKHWA";
    Region[Region["MADHYA_PRADESH"] = 94] = "MADHYA_PRADESH";
    Region[Region["MAHARASHTRA"] = 95] = "MAHARASHTRA";
    Region[Region["MORELOS"] = 96] = "MORELOS";
    Region[Region["NAYARIT"] = 97] = "NAYARIT";
    Region[Region["OAXACA"] = 98] = "OAXACA";
    Region[Region["PUEBLA"] = 99] = "PUEBLA";
    Region[Region["PUNJAB"] = 100] = "PUNJAB";
    Region[Region["QUERETARO"] = 101] = "QUERETARO";
    Region[Region["SAN_LUIS_POTOSI"] = 102] = "SAN_LUIS_POTOSI";
    Region[Region["SINALOA"] = 103] = "SINALOA";
    Region[Region["SONORA"] = 104] = "SONORA";
    Region[Region["TABASCO"] = 105] = "TABASCO";
    Region[Region["TAMIL_NADU"] = 106] = "TAMIL_NADU";
    Region[Region["YUCATAN"] = 107] = "YUCATAN";
    Region[Region["ZACATECAS"] = 108] = "ZACATECAS";
    Region[Region["AGUASCALIENTES"] = 109] = "AGUASCALIENTES";
    Region[Region["BAJA_CALIFORNIA_SUR"] = 110] = "BAJA_CALIFORNIA_SUR";
    Region[Region["CAMPECHE"] = 111] = "CAMPECHE";
    Region[Region["COLIMA"] = 112] = "COLIMA";
    Region[Region["QUINTANA_ROO_BENITO_JUAREZ"] = 113] = "QUINTANA_ROO_BENITO_JUAREZ";
    Region[Region["UINTANA_ROO"] = 114] = "UINTANA_ROO";
    Region[Region["QUINTANA_ROO_SOLIDARIDAD"] = 115] = "QUINTANA_ROO_SOLIDARIDAD";
    Region[Region["TLAXCALA"] = 116] = "TLAXCALA";
    Region[Region["QUINTANA_ROO_COZUMEL"] = 117] = "QUINTANA_ROO_COZUMEL";
    Region[Region["SAO_PAOLO"] = 118] = "SAO_PAOLO";
    Region[Region["RIO_DE_JANEIRO"] = 119] = "RIO_DE_JANEIRO";
    Region[Region["RIO_GRANDE_DO_SUL"] = 120] = "RIO_GRANDE_DO_SUL";
    Region[Region["NORTHWEST_TERRITORIES"] = 121] = "NORTHWEST_TERRITORIES";
    Region[Region["NUNAVUT"] = 122] = "NUNAVUT";
    Region[Region["PRINCE_EDWARD_ISLAND"] = 123] = "PRINCE_EDWARD_ISLAND";
    Region[Region["DISTRITO_FEDERAL"] = 124] = "DISTRITO_FEDERAL";
    Region[Region["MARANHAO"] = 125] = "MARANHAO";
    Region[Region["MATO_GROSSO"] = 126] = "MATO_GROSSO";
    Region[Region["MINAS_GERAIS"] = 127] = "MINAS_GERAIS";
    Region[Region["PARA"] = 128] = "PARA";
    Region[Region["PARANA"] = 129] = "PARANA";
    Region[Region["PERNAMBUCO"] = 130] = "PERNAMBUCO";
    Region[Region["SANTA_CATARINA"] = 131] = "SANTA_CATARINA";
    Region[Region["ANDHRA_PRADESH"] = 132] = "ANDHRA_PRADESH";
    Region[Region["CEARA"] = 133] = "CEARA";
    Region[Region["GOIAS"] = 134] = "GOIAS";
    Region[Region["GUERRERO_ACAPULCO_DE_JUAREZ"] = 135] = "GUERRERO_ACAPULCO_DE_JUAREZ";
    Region[Region["HARYANA"] = 136] = "HARYANA";
    Region[Region["SERGIPE"] = 137] = "SERGIPE";
    Region[Region["ALAGOAS"] = 138] = "ALAGOAS";
    Region[Region["COUNT"] = 139] = "COUNT";
})(Region || (Region = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType[DocumentType["NONE"] = 0] = "NONE";
    DocumentType[DocumentType["CONSULAR_ID"] = 1] = "CONSULAR_ID";
    DocumentType[DocumentType["DL"] = 2] = "DL";
    DocumentType[DocumentType["DL_PUBLIC_SERVICES_CARD"] = 3] = "DL_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["EMPLOYMENT_PASS"] = 4] = "EMPLOYMENT_PASS";
    DocumentType[DocumentType["FIN_CARD"] = 5] = "FIN_CARD";
    DocumentType[DocumentType["ID"] = 6] = "ID";
    DocumentType[DocumentType["MULTIPURPOSE_ID"] = 7] = "MULTIPURPOSE_ID";
    DocumentType[DocumentType["MYKAD"] = 8] = "MYKAD";
    DocumentType[DocumentType["MYKID"] = 9] = "MYKID";
    DocumentType[DocumentType["MYPR"] = 10] = "MYPR";
    DocumentType[DocumentType["MYTENTERA"] = 11] = "MYTENTERA";
    DocumentType[DocumentType["PAN_CARD"] = 12] = "PAN_CARD";
    DocumentType[DocumentType["PROFESSIONAL_ID"] = 13] = "PROFESSIONAL_ID";
    DocumentType[DocumentType["PUBLIC_SERVICES_CARD"] = 14] = "PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["RESIDENCE_PERMIT"] = 15] = "RESIDENCE_PERMIT";
    DocumentType[DocumentType["RESIDENT_ID"] = 16] = "RESIDENT_ID";
    DocumentType[DocumentType["TEMPORARY_RESIDENCE_PERMIT"] = 17] = "TEMPORARY_RESIDENCE_PERMIT";
    DocumentType[DocumentType["VOTER_ID"] = 18] = "VOTER_ID";
    DocumentType[DocumentType["WORK_PERMIT"] = 19] = "WORK_PERMIT";
    DocumentType[DocumentType["IKAD"] = 20] = "IKAD";
    DocumentType[DocumentType["MILITARY_ID"] = 21] = "MILITARY_ID";
    DocumentType[DocumentType["MYKAS"] = 22] = "MYKAS";
    DocumentType[DocumentType["SOCIAL_SECURITY_CARD"] = 23] = "SOCIAL_SECURITY_CARD";
    DocumentType[DocumentType["HEALTH_INSURANCE_CARD"] = 24] = "HEALTH_INSURANCE_CARD";
    DocumentType[DocumentType["PASSPORT"] = 25] = "PASSPORT";
    DocumentType[DocumentType["S_PASS"] = 26] = "S_PASS";
    DocumentType[DocumentType["ADDRESS_CARD"] = 27] = "ADDRESS_CARD";
    DocumentType[DocumentType["ALIEN_ID"] = 28] = "ALIEN_ID";
    DocumentType[DocumentType["ALIEN_PASSPORT"] = 29] = "ALIEN_PASSPORT";
    DocumentType[DocumentType["GREEN_CARD"] = 30] = "GREEN_CARD";
    DocumentType[DocumentType["MINORS_ID"] = 31] = "MINORS_ID";
    DocumentType[DocumentType["POSTAL_ID"] = 32] = "POSTAL_ID";
    DocumentType[DocumentType["PROFESSIONAL_DL"] = 33] = "PROFESSIONAL_DL";
    DocumentType[DocumentType["TAX_ID"] = 34] = "TAX_ID";
    DocumentType[DocumentType["WEAPON_PERMIT"] = 35] = "WEAPON_PERMIT";
    DocumentType[DocumentType["VISA"] = 36] = "VISA";
    DocumentType[DocumentType["BORDER_CROSSING_CARD"] = 37] = "BORDER_CROSSING_CARD";
    DocumentType[DocumentType["DRIVER_CARD"] = 38] = "DRIVER_CARD";
    DocumentType[DocumentType["GLOBAL_ENTRY_CARD"] = 39] = "GLOBAL_ENTRY_CARD";
    DocumentType[DocumentType["MYPOLIS"] = 40] = "MYPOLIS";
    DocumentType[DocumentType["NEXUS_CARD"] = 41] = "NEXUS_CARD";
    DocumentType[DocumentType["PASSPORT_CARD"] = 42] = "PASSPORT_CARD";
    DocumentType[DocumentType["PROOF_OF_AGE_CARD"] = 43] = "PROOF_OF_AGE_CARD";
    DocumentType[DocumentType["REFUGEE_ID"] = 44] = "REFUGEE_ID";
    DocumentType[DocumentType["TRIBAL_ID"] = 45] = "TRIBAL_ID";
    DocumentType[DocumentType["VETERAN_ID"] = 46] = "VETERAN_ID";
    DocumentType[DocumentType["CITIZENSHIP_CERTIFICATE"] = 47] = "CITIZENSHIP_CERTIFICATE";
    DocumentType[DocumentType["MY_NUMBER_CARD"] = 48] = "MY_NUMBER_CARD";
    DocumentType[DocumentType["CONSULAR_PASSPORT"] = 49] = "CONSULAR_PASSPORT";
    DocumentType[DocumentType["MINORS_PASSPORT"] = 50] = "MINORS_PASSPORT";
    DocumentType[DocumentType["MINORS_PUBLIC_SERVICES_CARD"] = 51] = "MINORS_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["DRIVING_PRIVILEGE_CARD"] = 52] = "DRIVING_PRIVILEGE_CARD";
    DocumentType[DocumentType["ASYLUM_REQUEST"] = 53] = "ASYLUM_REQUEST";
    DocumentType[DocumentType["DRIVER_QUALIFICATION_CARD"] = 54] = "DRIVER_QUALIFICATION_CARD";
    DocumentType[DocumentType["PROVISIONAL_DL"] = 55] = "PROVISIONAL_DL";
    DocumentType[DocumentType["REFUGEE_PASSPORT"] = 56] = "REFUGEE_PASSPORT";
    DocumentType[DocumentType["SPECIAL_ID"] = 57] = "SPECIAL_ID";
    DocumentType[DocumentType["UNIFORMED_SERVICES_ID"] = 58] = "UNIFORMED_SERVICES_ID";
    DocumentType[DocumentType["IMMIGRANT_VISA"] = 59] = "IMMIGRANT_VISA";
    DocumentType[DocumentType["CONSULAR_VOTER_ID"] = 60] = "CONSULAR_VOTER_ID";
    DocumentType[DocumentType["TWIC_CARD"] = 61] = "TWIC_CARD";
    DocumentType[DocumentType["EXIT_ENTRY_PERMIT"] = 62] = "EXIT_ENTRY_PERMIT";
    DocumentType[DocumentType["MAINLAND_TRAVEL_PERMIT_TAIWAN"] = 63] = "MAINLAND_TRAVEL_PERMIT_TAIWAN";
    DocumentType[DocumentType["NBI_CLEARANCE"] = 64] = "NBI_CLEARANCE";
    DocumentType[DocumentType["PROOF_OF_REGISTRATION"] = 65] = "PROOF_OF_REGISTRATION";
    DocumentType[DocumentType["TEMPORARY_PROTECTION_PERMIT"] = 66] = "TEMPORARY_PROTECTION_PERMIT";
    DocumentType[DocumentType["AFGHAN_CITIZEN_CARD"] = 67] = "AFGHAN_CITIZEN_CARD";
    DocumentType[DocumentType["EID"] = 68] = "EID";
    DocumentType[DocumentType["PASS"] = 69] = "PASS";
    DocumentType[DocumentType["SIS_ID"] = 70] = "SIS_ID";
    DocumentType[DocumentType["COUNT"] = 71] = "COUNT";
})(DocumentType || (DocumentType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 */
class CustomClassRules {
    constructor() {
        /**
         * Specified fields will overrule our class field rules if filter conditions are met.
         */
        this.classFilter = new ClassFilter();
        /**
         * Fields to overrule our class field rules.
         */
        this.fields = new Array();
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 */
class DetailedFieldType {
    constructor(fieldType, alphabetType) {
        this.fieldType = fieldType;
        this.alphabetType = alphabetType;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/** List of possible types of fields that are extracted from identity documents. */
var FieldType;
(function (FieldType) {
    FieldType[FieldType["AdditionalAddressInformation"] = 0] = "AdditionalAddressInformation";
    FieldType[FieldType["AdditionalNameInformation"] = 1] = "AdditionalNameInformation";
    FieldType[FieldType["AdditionalOptionalAddressInformation"] = 2] = "AdditionalOptionalAddressInformation";
    FieldType[FieldType["AdditionalPersonalIdNumber"] = 3] = "AdditionalPersonalIdNumber";
    FieldType[FieldType["Address"] = 4] = "Address";
    FieldType[FieldType["ClassEffectiveDate"] = 5] = "ClassEffectiveDate";
    FieldType[FieldType["ClassExpiryDate"] = 6] = "ClassExpiryDate";
    FieldType[FieldType["Conditions"] = 7] = "Conditions";
    FieldType[FieldType["DateOfBirth"] = 8] = "DateOfBirth";
    FieldType[FieldType["DateOfExpiry"] = 9] = "DateOfExpiry";
    FieldType[FieldType["DateOfIssue"] = 10] = "DateOfIssue";
    FieldType[FieldType["DocumentAdditionalNumber"] = 11] = "DocumentAdditionalNumber";
    FieldType[FieldType["DocumentOptionalAdditionalNumber"] = 12] = "DocumentOptionalAdditionalNumber";
    FieldType[FieldType["DocumentNumber"] = 13] = "DocumentNumber";
    FieldType[FieldType["Employer"] = 14] = "Employer";
    FieldType[FieldType["Endorsements"] = 15] = "Endorsements";
    FieldType[FieldType["FathersName"] = 16] = "FathersName";
    FieldType[FieldType["FirstName"] = 17] = "FirstName";
    FieldType[FieldType["FullName"] = 18] = "FullName";
    FieldType[FieldType["IssuingAuthority"] = 19] = "IssuingAuthority";
    FieldType[FieldType["LastName"] = 20] = "LastName";
    FieldType[FieldType["LicenceType"] = 21] = "LicenceType";
    FieldType[FieldType["LocalizedName"] = 22] = "LocalizedName";
    FieldType[FieldType["MaritalStatus"] = 23] = "MaritalStatus";
    FieldType[FieldType["MothersName"] = 24] = "MothersName";
    FieldType[FieldType["Mrz"] = 25] = "Mrz";
    FieldType[FieldType["Nationality"] = 26] = "Nationality";
    FieldType[FieldType["PersonalIdNumber"] = 27] = "PersonalIdNumber";
    FieldType[FieldType["PlaceOfBirth"] = 28] = "PlaceOfBirth";
    FieldType[FieldType["Profession"] = 29] = "Profession";
    FieldType[FieldType["Race"] = 30] = "Race";
    FieldType[FieldType["Religion"] = 31] = "Religion";
    FieldType[FieldType["ResidentialStatus"] = 32] = "ResidentialStatus";
    FieldType[FieldType["Restrictions"] = 33] = "Restrictions";
    FieldType[FieldType["Sex"] = 34] = "Sex";
    FieldType[FieldType["VehicleClass"] = 35] = "VehicleClass";
    FieldType[FieldType["BloodType"] = 36] = "BloodType";
    FieldType[FieldType["Sponsor"] = 37] = "Sponsor";
    FieldType[FieldType["VisaType"] = 38] = "VisaType";
    FieldType[FieldType["DocumentSubtype"] = 39] = "DocumentSubtype";
    FieldType[FieldType["Remarks"] = 40] = "Remarks";
    FieldType[FieldType["ResidencePermitType"] = 41] = "ResidencePermitType";
    /** Number of possible field types. */
    FieldType[FieldType["Count"] = 42] = "Count";
})(FieldType || (FieldType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * DocumentImageColorStatus enum defines possible color statuses determined from scanned image.
 */
var DocumentImageColorStatus;
(function (DocumentImageColorStatus) {
    /** Determining image color status was not performed */
    DocumentImageColorStatus[DocumentImageColorStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Black-and-white image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["BlackAndWhite"] = 1] = "BlackAndWhite";
    /** Color image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["Color"] = 2] = "Color";
})(DocumentImageColorStatus || (DocumentImageColorStatus = {}));
/**
 *  ImageAnalysisDetectionStatus enum defines possible states of specific image object detection.
 */
var ImageAnalysisDetectionStatus;
(function (ImageAnalysisDetectionStatus) {
    /** Detection was not performed */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Object not detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotDetected"] = 1] = "NotDetected";
    /** Object detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["Detected"] = 2] = "Detected";
})(ImageAnalysisDetectionStatus || (ImageAnalysisDetectionStatus = {}));
/**
 * CardOrientation enum defines possible states of card orientation.
 */
var CardOrientation;
(function (CardOrientation) {
    /** Card is horizontally placed inside the camera frame */
    CardOrientation[CardOrientation["Horizontal"] = 0] = "Horizontal";
    /** Card is vertically placed inside the camera frame */
    CardOrientation[CardOrientation["Vertical"] = 1] = "Vertical";
    /** Card orientation is not available */
    CardOrientation[CardOrientation["NotAvailable"] = 2] = "NotAvailable";
})(CardOrientation || (CardOrientation = {}));
/**
 * CardRotation enum defines possible states of card rotation.
 */
var CardRotation;
(function (CardRotation) {
    /** Card is in its original position */
    CardRotation[CardRotation["None"] = 0] = "None";
    /** Card is rotated 90 degrees to the right */
    CardRotation[CardRotation["Clockwise90"] = 1] = "Clockwise90";
    /** Card is rotated 90 degrees to the left */
    CardRotation[CardRotation["CounterClockwise90"] = 2] = "CounterClockwise90";
    /** Card is flipped upside down */
    CardRotation[CardRotation["UpsideDown"] = 3] = "UpsideDown";
})(CardRotation || (CardRotation = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/** Detailed information about the recognition process. */
var ProcessingStatus;
(function (ProcessingStatus) {
    /** The document was fully scanned and data was extracted as expected. */
    ProcessingStatus[ProcessingStatus["Success"] = 0] = "Success";
    /** The document was not found on the image. */
    ProcessingStatus[ProcessingStatus["DetectionFailed"] = 1] = "DetectionFailed";
    /** Preprocessing of the input image has failed. */
    ProcessingStatus[ProcessingStatus["ImagePreprocessingFailed"] = 2] = "ImagePreprocessingFailed";
    /**
     * Stability is achieved when the same document is provided on consecutive frames,
     * resulting in a consistent recognition between frames prior to data extraction.
     * Valid only for video feed.
     */
    ProcessingStatus[ProcessingStatus["StabilityTestFailed"] = 3] = "StabilityTestFailed";
    /**
     * The wrong side of the document is scanned. Front side scan is completed and back side is expected, but not
     * provided by the end-user.
     *
     * Possible also if front is expected at the start of the scanning process and back is presented first
     * by the end-user.
     */
    ProcessingStatus[ProcessingStatus["ScanningWrongSide"] = 4] = "ScanningWrongSide";
    /** Unexpected fields are present on the document and removed from the final result. */
    ProcessingStatus[ProcessingStatus["FieldIdentificationFailed"] = 5] = "FieldIdentificationFailed";
    /** Fields expected to appear on the scanned document have not been found. */
    ProcessingStatus[ProcessingStatus["MandatoryFieldMissing"] = 6] = "MandatoryFieldMissing";
    /**
     * One of the extracted fields contains a character which does not satisfy the rule defined for that
     * specific field.
     *
     * This processing status can only occur if validateResultCharacters setting is set to true.
     */
    ProcessingStatus[ProcessingStatus["InvalidCharactersFound"] = 7] = "InvalidCharactersFound";
    /** Failed to return a requested image. */
    ProcessingStatus[ProcessingStatus["ImageReturnFailed"] = 8] = "ImageReturnFailed";
    /** Reading or parsing of the barcode has failed. */
    ProcessingStatus[ProcessingStatus["BarcodeRecognitionFailed"] = 9] = "BarcodeRecognitionFailed";
    /** Parsing of the MRZ has failed. */
    ProcessingStatus[ProcessingStatus["MrzParsingFailed"] = 10] = "MrzParsingFailed";
    /**
     * Currently scanned document has been filtered out by its class.
     * Occurrence of this processing status is affected by classFilter setting.
     */
    ProcessingStatus[ProcessingStatus["ClassFiltered"] = 11] = "ClassFiltered";
    /** Document currently not supported by the recognizer. */
    ProcessingStatus[ProcessingStatus["UnsupportedClass"] = 12] = "UnsupportedClass";
    /** Document class is not included in the issued license. */
    ProcessingStatus[ProcessingStatus["UnsupportedByLicense"] = 13] = "UnsupportedByLicense";
    /**
     * Front side recognition has completed successfully, and recognizer is waiting for the other side to be scanned.
     */
    ProcessingStatus[ProcessingStatus["AwaitingOtherSide"] = 14] = "AwaitingOtherSide";
    /** If front side recognition has not completed successfully, the back side is not scanned. */
    ProcessingStatus[ProcessingStatus["NotScanned"] = 15] = "NotScanned";
    /** The barcode was not found on the image. This processing status can only occur if document has mandatory
        barcode.  */
    ProcessingStatus[ProcessingStatus["BarcodeDetectionFailed"] = 16] = "BarcodeDetectionFailed";
    /** Number of possible processing statuses. */
    ProcessingStatus[ProcessingStatus["Count"] = 17] = "Count";
})(ProcessingStatus || (ProcessingStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * RecognitionMode enum defines possible recognition modes for BlinkID Single-side and BlinkID Multi-side recognizers.
 */
var RecognitionMode;
(function (RecognitionMode) {
    /** No recognition performed. */
    RecognitionMode[RecognitionMode["None"] = 0] = "None";
    /** Recognition of mrz document (does not include visa and passport) */
    RecognitionMode[RecognitionMode["MrzId"] = 1] = "MrzId";
    /** Recognition of visa mrz. */
    RecognitionMode[RecognitionMode["MrzVisa"] = 2] = "MrzVisa";
    /** Recognition of passport mrz. */
    RecognitionMode[RecognitionMode["MrzPassport"] = 3] = "MrzPassport";
    /** Recognition of documents that have face photo on the front. */
    RecognitionMode[RecognitionMode["PhotoId"] = 4] = "PhotoId";
    /** Detailed document recognition. */
    RecognitionMode[RecognitionMode["FullRecognition"] = 5] = "FullRecognition";
    /** Recognition of barcode document. */
    RecognitionMode[RecognitionMode["BarcodeId"] = 6] = "BarcodeId";
    /** Number of possible values */
    RecognitionMode[RecognitionMode["Count"] = 7] = "Count";
})(RecognitionMode || (RecognitionMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdSingleSideRecognizer.
 */
class BlinkIdSingleSideRecognizerSettings {
    constructor() {
        /**
         * Skip processing of blurred frames.
         */
        this.enableBlurFilter = true;
        /**
         * Skip processing of frames which contain too much glare.
         */
        this.enableGlareFilter = true;
        /**
         * Strictness level for blur detection.
         */
        this.blurStrictnessLevel = StrictnessLevel.Normal;
        /**
         * Strictness level for glare detection.
         */
        this.glareStrictnessLevel = StrictnessLevel.Normal;
        /**
         * Allow reading of non-standard MRZ (Machine Readable Zone). Only raw MRZ result is returned.
         * Final recognizer state is not affected.
         */
        this.allowUnparsedMrzResults = false;
        /**
         * Allow reading of standard MRZ (Machine Readable Zone) which gets successfully parsed, but check digits are
         * incorrect (do not comply with the ICAO standard).
         *
         * Final recognizer state is not affected.
         */
        this.allowUnverifiedMrzResults = true;
        /**
         * Enable or disable recognition of specific document groups supported by the current license.
         * By default all modes are enabled.
         */
        this.recognitionModeFilter = new RecognitionModeFilter();
        /**
         * Save the raw camera frames at the moment of the data extraction or timeout.
         * This significantly increases memory consumption. The scanning performance is not affected.
         */
        this.saveCameraFrames = false;
        /**
         * Process only cropped document images with corrected perspective (frontal images of a document).
         * This only applies to still images - video feed will ignore this setting.
         */
        this.scanCroppedDocumentImage = false;
        /**
         * Allow only results containing expected characters for a given field.
         *
         * Each field is validated against a set of rules.
         *
         * All fields have to be successfully validated in order for a recognizer state to be ‘valid’.
         * Setting is used to improve scanning accuracy.
         */
        this.validateResultCharacters = true;
        /**
         * Redact specific fields based on requirements or laws regarding a specific document.
         *
         * Data can be redacted from the image, the result or both.
         *
         * The setting applies to certain documents only.
         */
        this.anonymizationMode = AnonymizationMode.FullResult;
        /**
         * Redact fields for specific document class.
         *
         * Fields specified by requirements or laws for a specific document will be redacted regardless of this setting.
         *
         * Based on anonymizationMode setting, data will be redacted from the image, the result or both.
         */
        this.additionalAnonymization = null;
        /**
         * Define custom rules for specific document class.
         *
         * The new class rules will be a combination of our internal and user-defined rules.
         *
         * The more detailed class filter will have priority over the other.
         */
        this.customClassRules = null;
        /**
         * Called when barcode scanning step starts.
         */
        this.barcodeScanningStartedCallback = null;
        /**
         * Called when recognizer classifies a document.
         */
        this.classifierCallback = null;
        /**
         * If set to `null`, all supported documents will be recognized.
         * Otherwise, only classes from given array will be recognized and all other
         * documents will be treated as "not supported" (observable via classifierCallback).
         */
        this.allowedDocumentClasses = null;
        /**
         * Minimum required distance between the edge of the scanning frame and the document.
         *
         * Defined as a percentage of the frame width.
         *
         * Default value is 0.0f in which case the padding edge and the image edge are the same.
         * Alternative recommended value is 0.02f.
         */
        this.paddingEdge = 0.0;
        // implementation of the FullDocumentImageOptions interface
        this.returnFullDocumentImage = false;
        this.returnEncodedFullDocumentImage = false;
        this._fullDocumentImageDpi = 250;
        this.fullDocumentImageExtensionFactors = new ExtensionFactors();
        // implementation of the FaceImageOptions interface
        this.returnFaceImage = false;
        this.returnEncodedFaceImage = false;
        this._faceImageDpi = 250;
        // implementation of the SignatureImageOptions interface
        this.returnSignatureImage = false;
        this.returnEncodedSignatureImage = false;
        this._signatureImageDpi = 250;
    }
    get fullDocumentImageDpi() {
        return this._fullDocumentImageDpi;
    }
    set fullDocumentImageDpi(value) {
        validateDpi(value);
        this._fullDocumentImageDpi = value;
    }
    get faceImageDpi() {
        return this._faceImageDpi;
    }
    set faceImageDpi(value) {
        validateDpi(value);
        this._faceImageDpi = value;
    }
    get signatureImageDpi() {
        return this._signatureImageDpi;
    }
    set signatureImageDpi(value) {
        validateDpi(value);
        this._signatureImageDpi = value;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdSingleSideRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
async function createBlinkIdSingleSideRecognizer(wasmSDK) {
    return wasmSDK.mbWasmModule.newRecognizer("BlinkIdSingleSideRecognizer");
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdMultiSideRecognizer.
 */
class BlinkIdMultiSideRecognizerSettings extends BlinkIdSingleSideRecognizerSettings {
    constructor() {
        super(...arguments);
        /**
         * Proceed to scan the back side of a document even if some of the validity checks have failed while scanning the
         * front side of a document.
         */
        this.allowUncertainFrontSideScan = false;
        /**
         * Configure the number of characters per field that are allowed to be inconsistent in data match.
         */
        this.maxAllowedMismatchesPerField = 0;
        /**
         * Back side of the document will not be scanned if only the front side is supported for a specific document.
         *
         * If set to false, a photo of the back side will be returned, as well as barcode or MRZ (Machine Readable Zone) if
         * either is present.
         */
        this.skipUnsupportedBack = false;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdMultiSideRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
async function createBlinkIdMultiSideRecognizer(wasmSDK) {
    return wasmSDK.mbWasmModule.newRecognizer("BlinkIdMultiSideRecognizer");
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the IdBarcodeRecognizer.
 */
class IdBarcodeRecognizerSettings {
}
/**
 * This function is used to create a new instance of `IdBarcodeRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
async function createIdBarcodeRecognizer(wasmSDK) {
    return wasmSDK.mbWasmModule.newRecognizer("IdBarcodeRecognizer");
}
/**
 * Represents the type of scanned document
 */
var IdBarcodeDocumentType;
(function (IdBarcodeDocumentType) {
    /**
     * No document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["None"] = 0] = "None";
    /**
     * AAMVACompliant document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["AAMVACompliant"] = 1] = "AAMVACompliant";
    /**
     * ArgentinaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaID"] = 2] = "ArgentinaID";
    /**
     * ArgentinaAlienID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaAlienID"] = 3] = "ArgentinaAlienID";
    /**
     * ArgentinaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaDL"] = 4] = "ArgentinaDL";
    /**
     * ColombiaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaID"] = 5] = "ColombiaID";
    /**
     * ColombiaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaDL"] = 6] = "ColombiaDL";
    /**
     * NigeriaVoterID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaVoterID"] = 7] = "NigeriaVoterID";
    /**
     * NigeriaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaDL"] = 8] = "NigeriaDL";
    /**
     * PanamaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["PanamaID"] = 9] = "PanamaID";
    /**
     * SouthAfricaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["SouthAfricaID"] = 10] = "SouthAfricaID";
})(IdBarcodeDocumentType || (IdBarcodeDocumentType = {}));

const BlinkIDSDK = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get AlphabetType () { return AlphabetType; },
  get AnonymizationMode () { return AnonymizationMode; },
  get BarcodeElementKey () { return BarcodeElementKey; },
  get BarcodeFormat () { return BarcodeFormat; },
  BlinkIdMultiSideRecognizerSettings: BlinkIdMultiSideRecognizerSettings,
  BlinkIdSingleSideRecognizerSettings: BlinkIdSingleSideRecognizerSettings,
  CapturedFrame: CapturedFrame,
  get CardOrientation () { return CardOrientation; },
  get CardRotation () { return CardRotation; },
  ClassFilter: ClassFilter,
  get Country () { return Country; },
  CustomClassRules: CustomClassRules,
  DetailedFieldType: DetailedFieldType,
  get DetectionStatus () { return DetectionStatus; },
  get DocumentImageColorStatus () { return DocumentImageColorStatus; },
  get DocumentSide () { return DocumentSide; },
  get DocumentType () { return DocumentType; },
  get ErrorCodes () { return ErrorCodes$1; },
  get ErrorMessages () { return ErrorMessages$1; },
  ExtensionFactors: ExtensionFactors,
  get FieldType () { return FieldType; },
  get IdBarcodeDocumentType () { return IdBarcodeDocumentType; },
  IdBarcodeRecognizerSettings: IdBarcodeRecognizerSettings,
  get ImageAnalysisDetectionStatus () { return ImageAnalysisDetectionStatus; },
  get ImageOrientation () { return ImageOrientation; },
  get LicenseErrorType () { return LicenseErrorType; },
  get LicenseTokenState () { return LicenseTokenState; },
  get PreferredCameraType () { return PreferredCameraType; },
  get ProcessingStatus () { return ProcessingStatus; },
  get RecognitionMode () { return RecognitionMode; },
  RecognitionModeFilter: RecognitionModeFilter,
  get RecognizerResultState () { return RecognizerResultState; },
  get Region () { return Region; },
  SDKError: SDKError,
  SelectedCamera: SelectedCamera,
  SerializableSDKError: SerializableSDKError,
  get ServerPermissionSubmitResultStatus () { return ServerPermissionSubmitResultStatus; },
  get StrictnessLevel () { return StrictnessLevel; },
  get VideoRecognitionMode () { return VideoRecognitionMode; },
  VideoRecognizer: VideoRecognizer,
  WasmSDKLoadSettings: WasmSDKLoadSettings,
  get WasmType () { return WasmType; },
  bindCameraToVideoFeed: bindCameraToVideoFeed,
  captureFrame: captureFrame,
  createBlinkIdMultiSideRecognizer: createBlinkIdMultiSideRecognizer,
  createBlinkIdSingleSideRecognizer: createBlinkIdSingleSideRecognizer,
  createIdBarcodeRecognizer: createIdBarcodeRecognizer,
  createRecognizerRunner: createRecognizerRunner,
  detectWasmFeatures: detectWasmFeatures,
  detectWasmType: detectWasmType,
  frameCaptureErrors: frameCaptureErrors,
  getCameraDevices: getCameraDevices$1,
  isAndroidDevice: isAndroidDevice,
  isBrowserSupported: isBrowserSupported,
  isIOSDevice: isIOSDevice,
  isIOSUserAgent: isIOSUserAgent,
  isInAppBrowser: isInAppBrowser,
  isMobileDevice: isMobileDevice,
  licenseErrors: licenseErrors,
  loadWasmModule: loadWasmModule,
  localSdkErrors: localSdkErrors,
  obtainNewServerPermission: obtainNewServerPermission,
  pingProxyErrors: pingProxyErrors,
  sdkErrors: sdkErrors,
  selectCamera: selectCamera,
  unlockWasmSDK: unlockWasmSDK,
  validateDpi: validateDpi,
  videoRecognizerErrors: videoRecognizerErrors,
  wasmFolder: wasmFolder,
  workerErrors: workerErrors
});

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Events
 */
class EventReady {
  constructor(sdk) {
    this.sdk = sdk;
  }
}
/**
 * Error codes
 */
var Code;
(function (Code) {
  Code["EmptyResult"] = "EMPTY_RESULT";
  Code["InvalidRecognizerOptions"] = "INVALID_RECOGNIZER_OPTIONS";
  Code["NoImageFileFound"] = "NO_IMAGE_FILE_FOUND";
  Code["NoFirstImageFileFound"] = "NO_FIRST_IMAGE_FILE_FOUND";
  Code["NoSecondImageFileFound"] = "NO_SECOND_IMAGE_FILE_FOUND";
  Code["GenericScanError"] = "GENERIC_SCAN_ERROR";
  Code["CameraNotAllowed"] = "CAMERA_NOT_ALLOWED";
  Code["CameraInUse"] = "CAMERA_IN_USE";
  Code["CameraGenericError"] = "CAMERA_GENERIC_ERROR";
})(Code || (Code = {}));
/**
 * Scan structures
 */
const AvailableRecognizers = {
  IdBarcodeRecognizer: "createIdBarcodeRecognizer",
  BlinkIdSingleSideRecognizer: "createBlinkIdSingleSideRecognizer",
  BlinkIdMultiSideRecognizer: "createBlinkIdMultiSideRecognizer",
};
var ImageRecognitionType;
(function (ImageRecognitionType) {
  ImageRecognitionType["SingleSide"] = "SingleSide";
  ImageRecognitionType["MultiSide"] = "MultiSide";
})(ImageRecognitionType || (ImageRecognitionType = {}));
var MultiSideImageType;
(function (MultiSideImageType) {
  MultiSideImageType["First"] = "First";
  MultiSideImageType["Second"] = "Second";
})(MultiSideImageType || (MultiSideImageType = {}));
var RecognitionStatus;
(function (RecognitionStatus) {
  RecognitionStatus["NoImageFileFound"] = "NoImageFileFound";
  RecognitionStatus["NoFirstImageFileFound"] = "NoFirstImageFileFound";
  RecognitionStatus["NoSecondImageFileFound"] = "NoSecondImageFileFound";
  RecognitionStatus["Preparing"] = "Preparing";
  RecognitionStatus["Ready"] = "Ready";
  RecognitionStatus["Processing"] = "Processing";
  RecognitionStatus["DetectionFailed"] = "DetectionFailed";
  RecognitionStatus["EmptyResultState"] = "EmptyResultState";
  RecognitionStatus["OnFirstSideResult"] = "OnFirstSideResult";
  RecognitionStatus["ScanSuccessful"] = "ScanSuccessful";
  RecognitionStatus["DocumentClassified"] = "DocumentClassified";
  // Camera states
  RecognitionStatus["DetectionStatusChange"] = "DetectionStatusChange";
  RecognitionStatus["NoSupportForMediaDevices"] = "NoSupportForMediaDevices";
  RecognitionStatus["CameraNotFound"] = "CameraNotFound";
  RecognitionStatus["CameraNotAllowed"] = "CameraNotAllowed";
  RecognitionStatus["UnableToAccessCamera"] = "UnableToAccessCamera";
  RecognitionStatus["CameraInUse"] = "CameraInUse";
  RecognitionStatus["CameraGenericError"] = "CameraGenericError";
  // Blur and glare
  RecognitionStatus["BlurDetected"] = "BlurDetected";
  RecognitionStatus["GlareDetected"] = "GlareDetected";
  // Errors
  RecognitionStatus["UnknownError"] = "UnknownError";
  RecognitionStatus["BarcodeScanningStarted"] = "BarcodeScanningStarted";
  // BlinkIDSDK.DetectionStatus
  RecognitionStatus["DetectionStatusFail"] = "Fail";
  RecognitionStatus["DetectionStatusSuccess"] = "Success";
  RecognitionStatus["DetectionStatusCameraTooHigh"] = "CameraTooHigh";
  RecognitionStatus["DetectionStatusFallbackSuccess"] = "FallbackSuccess";
  RecognitionStatus["DetectionStatusPartial"] = "Partial";
  RecognitionStatus["DetectionStatusCameraAtAngle"] = "CameraAtAngle";
  RecognitionStatus["DetectionStatusCameraTooNear"] = "CameraTooNear";
  RecognitionStatus["DetectionStatusDocumentTooCloseToEdge"] = "DocumentTooCloseToEdge";
})(RecognitionStatus || (RecognitionStatus = {}));
var CameraExperience;
(function (CameraExperience) {
  CameraExperience["Barcode"] = "BARCODE";
  CameraExperience["CardMultiSide"] = "CARD_MULTI_SIDE";
  CameraExperience["CardSingleSide"] = "CARD_SINGLE_SIDE";
  CameraExperience["PaymentCard"] = "PAYMENT_CARD";
})(CameraExperience || (CameraExperience = {}));
var CameraExperienceState;
(function (CameraExperienceState) {
  CameraExperienceState["BarcodeScanning"] = "BarcodeScanning";
  CameraExperienceState["AdjustAngle"] = "AdjustAngle";
  CameraExperienceState["Classification"] = "Classification";
  CameraExperienceState["Default"] = "Default";
  CameraExperienceState["Detection"] = "Detection";
  CameraExperienceState["Done"] = "Done";
  CameraExperienceState["DoneAll"] = "DoneAll";
  CameraExperienceState["Flip"] = "Flip";
  CameraExperienceState["MoveCloser"] = "MoveCloser";
  CameraExperienceState["MoveFarther"] = "MoveFarther";
  CameraExperienceState["BlurDetected"] = "BlurDetected";
  CameraExperienceState["GlareDetected"] = "GlareDetected";
})(CameraExperienceState || (CameraExperienceState = {}));
const CameraExperienceStateDuration = new Map([
  [CameraExperienceState.BarcodeScanning, 3500],
  [CameraExperienceState.AdjustAngle, 2500],
  [CameraExperienceState.Default, 500],
  [CameraExperienceState.Done, 300],
  [CameraExperienceState.DoneAll, 400],
  [CameraExperienceState.Flip, 3500],
  [CameraExperienceState.MoveCloser, 2500],
  [CameraExperienceState.MoveFarther, 2500],
  [CameraExperienceState.BlurDetected, 2500],
  [CameraExperienceState.GlareDetected, 2500],
]);
/**
 * User feedback structures
 */
var FeedbackCode;
(function (FeedbackCode) {
  FeedbackCode["CameraDisabled"] = "CAMERA_DISABLED";
  FeedbackCode["CameraGenericError"] = "CAMERA_GENERIC_ERROR";
  FeedbackCode["CameraInUse"] = "CAMERA_IN_USE";
  FeedbackCode["CameraNotAllowed"] = "CAMERA_NOT_ALLOWED";
  FeedbackCode["GenericScanError"] = "GENERIC_SCAN_ERROR";
  FeedbackCode["ScanStarted"] = "SCAN_STARTED";
  FeedbackCode["ScanUnsuccessful"] = "SCAN_UNSUCCESSFUL";
  FeedbackCode["ScanSuccessful"] = "SCAN_SUCCESSFUL";
})(FeedbackCode || (FeedbackCode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable max-len */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
var ErrorCodes;
(function (ErrorCodes) {
  ErrorCodes["BrowserNotSupported"] = "BROWSER_NOT_SUPPORTED";
  ErrorCodes["LicenseError"] = "LICENSE_ERROR";
  ErrorCodes["SdkLoadFailed"] = "SDK_LOAD_FAILED";
  ErrorCodes["InternetNotAvailable"] = "INTERNET_NOT_AVAILABLE";
  ErrorCodes["InvalidRecognizers"] = "INVALID_RECOGNIZERS";
  ErrorCodes["InvalidPingProxyUrl"] = "INVALID_PING_PROXY_URL";
  ErrorCodes["PingProxyPermissionNotGranted"] = "PING_PROXY_PERMISSION_NOT_GRANTED";
})(ErrorCodes || (ErrorCodes = {}));
var ErrorMessages;
(function (ErrorMessages) {
  ErrorMessages["BrowserNotSupported"] = "Browser is not supported!";
  ErrorMessages["LicenseError"] = "Something is wrong with the license.";
  ErrorMessages["SdkLoadFailed"] = "Failed to load SDK!";
  ErrorMessages["InvalidPingProxyUrl"] = "Provided ping proxy URL is not a valid secure URL in format 'https://{host}:{port?}'.";
  ErrorMessages["PingProxyPermissionNotGranted"] = "Allow ping proxy permission not found in license.";
})(ErrorMessages || (ErrorMessages = {}));
const componentErrors = {
  browserNotSupported: {
    code: ErrorCodes.BrowserNotSupported,
    message: ErrorMessages.BrowserNotSupported,
  },
  licenseError: {
    code: ErrorCodes.LicenseError,
    message: ErrorMessages.LicenseError,
  },
  sdkLoadFailed: {
    code: ErrorCodes.SdkLoadFailed,
    message: ErrorMessages.SdkLoadFailed,
  },
  pingProxyErrors: {
    invalidProxyUrl: {
      message: ErrorMessages.InvalidPingProxyUrl,
      code: ErrorCodes.InvalidPingProxyUrl,
    },
    permissionNotGranted: {
      message: ErrorMessages.PingProxyPermissionNotGranted,
      code: ErrorCodes.PingProxyPermissionNotGranted,
    },
  },
};

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
async function getCameraDevices() {
  const devices = await getCameraDevices$1();
  const allDevices = devices.frontCameras.concat(devices.backCameras);
  const finalEntries = allDevices.map((el) => {
    return {
      prettyName: el.label,
      details: el,
    };
  });
  return finalEntries;
}
class SdkService {
  constructor() {
    this.cancelInitiatedFromOutside = false;
    this.showOverlay = false;
    this.eventEmitter$ = document.createElement("a");
  }
  delete() {
    this.sdk?.delete();
  }
  initialize(licenseKey, sdkSettings) {
    const loadSettings = new WasmSDKLoadSettings(licenseKey);
    loadSettings.allowHelloMessage = sdkSettings.allowHelloMessage;
    loadSettings.engineLocation = sdkSettings.engineLocation;
    loadSettings.workerLocation = sdkSettings.workerLocation;
    loadSettings.blinkIdVariant = sdkSettings.blinkIdVariant;
    if (sdkSettings.wasmType) {
      loadSettings.wasmType = sdkSettings.wasmType;
    }
    return new Promise((resolve) => {
      loadWasmModule(loadSettings)
        .then((sdk) => {
        this.sdk = sdk;
        this.showOverlay = sdk.showOverlay;
        resolve(new EventReady(this.sdk));
      })
        .catch((error) => {
        resolve(new SDKError(componentErrors.sdkLoadFailed, error));
      });
    });
  }
  checkRecognizers(recognizers) {
    if (!recognizers || !recognizers.length) {
      return {
        status: false,
        message: "There are no provided recognizers!",
      };
    }
    for (const recognizer of recognizers) {
      if (!this.isRecognizerAvailable(recognizer)) {
        return {
          status: false,
          message: `Recognizer "${recognizer}" doesn't exist!`,
        };
      }
      if (recognizer === "BlinkIdMultiSideRecognizer" &&
        recognizers.length > 1) {
        return {
          status: false,
          message: 'Recognizer "BlinkIdMultiSideRecognizer" cannot be used in combination with other recognizers!',
        };
      }
    }
    return {
      status: true,
    };
  }
  getDesiredCameraExperience(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf("BlinkIdMultiSideRecognizer") > -1) {
      return CameraExperience.CardMultiSide;
    }
    if (_recognizers.indexOf("BlinkIdSingleSideRecognizer") > -1) {
      return CameraExperience.CardSingleSide;
    }
    return CameraExperience.Barcode;
  }
  async scanFromCamera(configuration, eventCallback) {
    eventCallback({ status: RecognitionStatus.Preparing });
    this.cancelInitiatedFromOutside = false;
    // Prepare terminate mechanism before recognizer and runner instances are created
    this.eventEmitter$.addEventListener("terminate", async () => {
      this.videoRecognizer?.cancelRecognition?.();
      window.setTimeout(() => this.videoRecognizer?.releaseVideoFeed?.(), 1);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (recognizer.recognizer?.objectHandle > -1) {
          recognizer.recognizer.delete?.();
        }
      }
    });
    // Prepare recognizers and runner
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, eventCallback);
    const recognizerRunner = await this.createRecognizerRunner(recognizers, eventCallback);
    if (configuration.pingProxyUrl) {
      await recognizerRunner.setPingProxyUrl(configuration.pingProxyUrl);
    }
    try {
      this.videoRecognizer =
        await VideoRecognizer.createVideoRecognizerFromCameraStream(configuration.cameraFeed, recognizerRunner, configuration.cameraId);
      eventCallback({ status: RecognitionStatus.Ready });
      await this.videoRecognizer.setVideoRecognitionMode(VideoRecognitionMode.Recognition);
      const activeRecognizer = recognizers[0]
        .recognizer;
      const recognizerSettings = await activeRecognizer.currentSettings();
      // add callbacks for blur and glare
      this.videoRecognizer.setOnFrameProcessed(async (result) => {
        const isMultiside = "scanningFirstSideDone" in result;
        const imageAnalysisResult = (() => {
          if (isMultiside) {
            return !result.scanningFirstSideDone
              ? result.frontImageAnalysisResult
              : result.backImageAnalysisResult;
          }
          return result.imageAnalysisResult;
        })();
        if (imageAnalysisResult.glareDetected &&
          recognizerSettings.enableGlareFilter) {
          eventCallback({
            status: RecognitionStatus.GlareDetected,
          });
        }
        if (imageAnalysisResult.blurDetected &&
          recognizerSettings.enableBlurFilter) {
          eventCallback({
            status: RecognitionStatus.BlurDetected,
          });
        }
      });
      // Start recognition
      await this.videoRecognizer
        .startRecognition(async (recognitionState) => {
        this.videoRecognizer.pauseRecognition();
        eventCallback({ status: RecognitionStatus.Processing });
        if (recognitionState !== RecognizerResultState.Empty) {
          for (const recognizer of recognizers) {
            const results = await recognizer.recognizer.getResult();
            this.recognizerName = recognizer.recognizer.recognizerName;
            if (!results ||
              results.state === RecognizerResultState.Empty) {
              eventCallback({
                status: RecognitionStatus.EmptyResultState,
                data: {
                  initiatedByUser: this.cancelInitiatedFromOutside,
                  recognizerName: this.recognizerName,
                },
              });
            }
            else {
              const recognitionResults = {
                recognizer: results,
                recognizerName: this.recognizerName,
              };
              if (configuration.recognizerOptions?.returnSignedJSON) {
                recognitionResults.resultSignedJSON =
                  await recognizer.recognizer.toSignedJSON();
              }
              const scanData = {
                result: recognitionResults,
                initiatedByUser: this.cancelInitiatedFromOutside,
              };
              eventCallback({
                status: RecognitionStatus.ScanSuccessful,
                data: scanData,
              });
              break;
            }
          }
        }
        else {
          eventCallback({
            status: RecognitionStatus.EmptyResultState,
            data: {
              initiatedByUser: this.cancelInitiatedFromOutside,
              recognizerName: "",
            },
          });
        }
        window.setTimeout(() => void this.cancelRecognition(), 400);
      }, configuration.recognitionTimeout)
        .then(() => {
        /* Scanning... */
      })
        .catch((error) => {
        throw error;
      });
    }
    catch (error) {
      if (!error.code) {
        eventCallback({ status: RecognitionStatus.UnknownError });
      }
      else {
        switch (error.code) {
          case ErrorCodes$1.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED:
            eventCallback({
              status: RecognitionStatus.NoSupportForMediaDevices,
            });
            break;
          case ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_MISSING:
            eventCallback({ status: RecognitionStatus.CameraNotFound });
            break;
          case ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED:
            eventCallback({ status: RecognitionStatus.CameraNotAllowed });
            break;
          case ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_IN_USE:
            eventCallback({ status: RecognitionStatus.CameraInUse });
            break;
          default:
            eventCallback({ status: RecognitionStatus.UnableToAccessCamera });
            break;
        }
      }
      console.warn("Error in VideoRecognizer", error.code, error.message);
      void this.cancelRecognition();
    }
  }
  async flipCamera() {
    await this.videoRecognizer.flipCamera();
  }
  isCameraFlipped() {
    if (!this.videoRecognizer) {
      return false;
    }
    return this.videoRecognizer.isCameraFlipped();
  }
  isScanFromImageAvailable(_recognizers = [], _recognizerOptions = {}) {
    return true;
  }
  getScanFromImageType(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf("BlinkIdMultiSideRecognizer") > -1) {
      return ImageRecognitionType.MultiSide;
    }
    return ImageRecognitionType.SingleSide;
  }
  async scanFromImage(configuration, eventCallback) {
    eventCallback({ status: RecognitionStatus.Preparing });
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, eventCallback);
    const recognizerRunner = await this.createRecognizerRunner(recognizers, eventCallback);
    if (configuration.pingProxyUrl) {
      await recognizerRunner.setPingProxyUrl(configuration.pingProxyUrl);
    }
    const handleTerminate = async () => {
      this.eventEmitter$.removeEventListener("terminate", handleTerminate);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (recognizer.recognizer?.objectHandle > -1) {
          recognizer.recognizer.delete?.();
        }
      }
      this.eventEmitter$.dispatchEvent(new Event("terminate:done"));
    };
    this.eventEmitter$.addEventListener("terminate", handleTerminate);
    // Get image file
    if (!configuration.file ||
      !RegExp(/^image\//).exec(configuration.file.type)) {
      eventCallback({ status: RecognitionStatus.NoImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    const file = configuration.file;
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
    await imageElement.decode();
    const imageFrame = captureFrame(imageElement);
    // Get results
    eventCallback({ status: RecognitionStatus.Processing });
    const processResult = await recognizerRunner.processImage(imageFrame);
    if (processResult !== RecognizerResultState.Empty) {
      for (const recognizer of recognizers) {
        const results = await recognizer.recognizer.getResult();
        if (!results ||
          results.state === RecognizerResultState.Empty) {
          eventCallback({
            status: RecognitionStatus.EmptyResultState,
            data: {
              initiatedByUser: this.cancelInitiatedFromOutside,
              recognizerName: recognizer.name,
            },
          });
        }
        else {
          const recognitionResults = {
            recognizer: results,
            recognizerName: recognizer.name,
          };
          if (configuration.recognizerOptions?.returnSignedJSON) {
            recognitionResults.resultSignedJSON =
              await recognizer.recognizer.toSignedJSON();
          }
          eventCallback({
            status: RecognitionStatus.ScanSuccessful,
            data: recognitionResults,
          });
          break;
        }
      }
    }
    else {
      // If necessary, scan the image once again with different settings
      if (configuration.thoroughScan &&
        configuration.recognizers.indexOf("BlinkIdSingleSideRecognizer") > -1) {
        const c = configuration;
        c.thoroughScan = false;
        c.recognizerOptions = c.recognizerOptions || {};
        for (const r of c.recognizers) {
          c.recognizerOptions[r] = c.recognizerOptions[r] || {};
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !!c.recognizerOptions[r].scanCroppedDocumentImage;
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !c.recognizerOptions[r].scanCroppedDocumentImage;
        }
        const eventHandler = (recognitionEvent) => eventCallback(recognitionEvent);
        const handleTerminateDone = () => {
          this.eventEmitter$.removeEventListener("terminate:done", handleTerminateDone);
          this.scanFromImage(configuration, eventHandler);
        };
        this.eventEmitter$.addEventListener("terminate:done", handleTerminateDone);
        window.setTimeout(() => void this.cancelRecognition(), 500);
        return;
      }
      eventCallback({
        status: RecognitionStatus.EmptyResultState,
        data: {
          initiatedByUser: this.cancelInitiatedFromOutside,
          recognizerName: "",
        },
      });
    }
    window.setTimeout(() => void this.cancelRecognition(), 500);
  }
  async scanFromImageMultiSide(configuration, eventCallback) {
    eventCallback({ status: RecognitionStatus.Preparing });
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, eventCallback);
    const recognizerRunner = await this.createRecognizerRunner(recognizers, eventCallback);
    if (configuration.pingProxyUrl) {
      await recognizerRunner.setPingProxyUrl(configuration.pingProxyUrl);
    }
    const handleTerminate = async () => {
      this.eventEmitter$.removeEventListener("terminate", handleTerminate);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (recognizer.recognizer?.objectHandle > -1) {
          recognizer.recognizer.delete?.();
        }
      }
      this.eventEmitter$.dispatchEvent(new Event("terminate:done"));
    };
    this.eventEmitter$.addEventListener("terminate", handleTerminate);
    if (!configuration.firstFile) {
      eventCallback({ status: RecognitionStatus.NoFirstImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    if (!configuration.secondFile) {
      eventCallback({ status: RecognitionStatus.NoSecondImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    // Get results
    eventCallback({ status: RecognitionStatus.Processing });
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(configuration.firstFile);
    await imageElement.decode();
    const firstFrame = captureFrame(imageElement);
    const firstProcessResult = await recognizerRunner.processImage(firstFrame);
    if (firstProcessResult !== RecognizerResultState.Empty) {
      const imageElement = new Image();
      imageElement.src = URL.createObjectURL(configuration.secondFile);
      await imageElement.decode();
      const secondFrame = captureFrame(imageElement);
      const secondProcessResult = await recognizerRunner.processImage(secondFrame);
      if (secondProcessResult !== RecognizerResultState.Empty) {
        for (const recognizer of recognizers) {
          const results = await recognizer.recognizer.getResult();
          if (!results ||
            results.state === RecognizerResultState.Empty) {
            eventCallback({
              status: RecognitionStatus.EmptyResultState,
              data: {
                initiatedByUser: this.cancelInitiatedFromOutside,
                recognizerName: recognizer.name,
              },
            });
          }
          else {
            const recognitionResults = {
              recognizer: results,
              recognizerName: recognizer.name,
            };
            if (configuration.recognizerOptions?.returnSignedJSON) {
              recognitionResults.resultSignedJSON =
                await recognizer.recognizer.toSignedJSON();
            }
            eventCallback({
              status: RecognitionStatus.ScanSuccessful,
              data: recognitionResults,
            });
            break;
          }
        }
      }
      else {
        eventCallback({
          status: RecognitionStatus.EmptyResultState,
          data: {
            initiatedByUser: this.cancelInitiatedFromOutside,
            recognizerName: "",
          },
        });
      }
    }
    else {
      // If necessary, scan the image once again with different settings
      if (configuration.thoroughScan &&
        configuration.recognizers.indexOf("BlinkIdMultiSideRecognizer") > -1) {
        const c = configuration;
        c.thoroughScan = false;
        c.recognizerOptions = c.recognizerOptions || {};
        for (const r of c.recognizers) {
          c.recognizerOptions[r] = c.recognizerOptions[r] || {};
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !!c.recognizerOptions[r].scanCroppedDocumentImage;
          c.recognizerOptions[r].scanCroppedDocumentImage =
            !c.recognizerOptions[r].scanCroppedDocumentImage;
        }
        const eventHandler = (recognitionEvent) => eventCallback(recognitionEvent);
        const handleTerminateDone = () => {
          this.eventEmitter$.removeEventListener("terminate:done", handleTerminateDone);
          this.scanFromImageMultiSide(configuration, eventHandler);
        };
        this.eventEmitter$.addEventListener("terminate:done", handleTerminateDone);
        window.setTimeout(() => void this.cancelRecognition(), 500);
        return;
      }
      eventCallback({
        status: RecognitionStatus.EmptyResultState,
        data: {
          initiatedByUser: this.cancelInitiatedFromOutside,
          recognizerName: "",
        },
      });
    }
    window.setTimeout(() => void this.cancelRecognition(), 500);
  }
  async stopRecognition() {
    void (await this.cancelRecognition(true));
  }
  async resumeRecognition() {
    this.videoRecognizer.resumeRecognition(true);
  }
  changeCameraDevice(camera) {
    return new Promise((resolve) => {
      this.videoRecognizer
        .changeCameraDevice(camera)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }
  getProductIntegrationInfo() {
    return this.sdk.getProductIntegrationInfo();
  }
  //////////////////////////////////////////////////////////////////////////////
  //
  // PRIVATE METHODS
  isRecognizerAvailable(recognizer) {
    return !!AvailableRecognizers[recognizer];
  }
  async createRecognizers(recognizers, recognizerOptions, eventCallback) {
    const pureRecognizers = [];
    for (const recognizer of recognizers) {
      const instance = await BlinkIDSDK[AvailableRecognizers[recognizer]](this.sdk);
      pureRecognizers.push(instance);
    }
    if (recognizerOptions && Object.keys(recognizerOptions).length > 0) {
      for (const recognizer of pureRecognizers) {
        const settings = await recognizer.currentSettings();
        if (!recognizerOptions[recognizer.recognizerName] ||
          Object.keys(recognizerOptions[recognizer.recognizerName]).length < 1) {
          continue;
        }
        for (const [key, value] of Object.entries(recognizerOptions[recognizer.recognizerName])) {
          if (key in settings) {
            settings[key] = value;
          }
        }
        settings.barcodeScanningStartedCallback = () => {
          eventCallback({ status: RecognitionStatus.BarcodeScanningStarted });
          console.log("Barcode scanning started");
        };
        settings.classifierCallback = (supported) => {
          eventCallback({
            status: RecognitionStatus.DocumentClassified,
            data: supported,
          });
        };
        await recognizer.updateSettings(settings);
      }
    }
    const recognizerInstances = [];
    for (let i = 0; i < pureRecognizers.length; ++i) {
      const recognizer = pureRecognizers[i];
      const instance = { name: recognizers[i], recognizer };
      recognizerInstances.push(instance);
    }
    return recognizerInstances;
  }
  async createRecognizerRunner(recognizers, eventCallback) {
    const metadataCallbacks = {
      onDetectionFailed: () => eventCallback({ status: RecognitionStatus.DetectionFailed }),
      onQuadDetection: (quad) => {
        eventCallback({
          status: RecognitionStatus.DetectionStatusChange,
          data: quad,
        });
        const detectionStatus = quad.detectionStatus;
        switch (detectionStatus) {
          case DetectionStatus.Failed:
            eventCallback({ status: RecognitionStatus.DetectionStatusSuccess });
            break;
          case DetectionStatus.Success:
            eventCallback({ status: RecognitionStatus.DetectionStatusSuccess });
            break;
          case DetectionStatus.CameraTooFar:
            eventCallback({
              status: RecognitionStatus.DetectionStatusCameraTooHigh,
            });
            break;
          case DetectionStatus.FallbackSuccess:
            eventCallback({
              status: RecognitionStatus.DetectionStatusFallbackSuccess,
            });
            break;
          case DetectionStatus.DocumentPartiallyVisible:
            eventCallback({ status: RecognitionStatus.DetectionStatusPartial });
            break;
          case DetectionStatus.CameraAngleTooSteep:
            eventCallback({
              status: RecognitionStatus.DetectionStatusCameraAtAngle,
            });
            break;
          case DetectionStatus.CameraTooClose:
            eventCallback({
              status: RecognitionStatus.DetectionStatusCameraTooNear,
            });
            break;
          case DetectionStatus.DocumentTooCloseToCameraEdge:
            eventCallback({
              status: RecognitionStatus.DetectionStatusDocumentTooCloseToEdge,
            });
            break;
          // Send nothing
        }
      },
    };
    const blinkIdMultiSide = recognizers.find((el) => el.recognizer.recognizerName === "BlinkIdMultiSideRecognizer");
    if (blinkIdMultiSide) {
      metadataCallbacks.onFirstSideResult = () => eventCallback({ status: RecognitionStatus.OnFirstSideResult });
    }
    const recognizerRunner = await createRecognizerRunner(this.sdk, recognizers.map((el) => el.recognizer), false, metadataCallbacks);
    return recognizerRunner;
  }
  async cancelRecognition(initiatedFromOutside = false) {
    this.cancelInitiatedFromOutside = initiatedFromOutside;
    this.eventEmitter$.dispatchEvent(new Event("terminate"));
  }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const defaultTranslations = {
  /* Help Screens */
  "help-button-lobby-tooltip": "Need help?",
  "help-button-back": "Back",
  "help-button-next": "Next",
  "help-button-done": "Done",
  "help-button-start-scanning": "Start Scanning",
  "help-doc-valid-title": "Keep all the details visible",
  "help-doc-valid-description": "Make sure you keep the document well lit. All document fields should be visible on the camera screen.",
  "help-doc-invalid-invisible-fields-title": "Keep all the details visible",
  "help-doc-invalid-invisible-fields-description": "Make sure you aren't covering parts of the document with a finger, including the bottom lines. Also, watch out for hologram reflections that go over the document fields.",
  "help-doc-invalid-harsh-light-title": "Watch out for harsh light",
  "help-doc-invalid-harsh-light-description": "Avoid direct harsh light because it reflects from the document and can make parts of the document unreadable. If you can't read data on the document, it won't be visible to the camera either.",
  "help-doc-invalid-to-much-motion-title": "Keep still while scanning",
  "help-doc-invalid-to-much-motion-description": "Try to keep the phone and document still while scanning. Moving either can blur the image and make data on the document unreadable.",
  "action-alt-camera": "Device camera",
  "action-alt-gallery": "From gallery",
  "action-message": "Scan or choose from gallery",
  "action-message-camera": "Device camera",
  "action-message-camera-disabled": "Camera disabled",
  "action-message-camera-not-allowed": "Camera not allowed",
  "action-message-camera-in-use": "Camera in use",
  "action-message-image": "From gallery",
  "action-message-image-not-supported": "Not supported",
  "camera-disabled": "Camera disabled",
  "camera-not-allowed": "Cannot access camera.",
  "camera-in-use": "Camera is already used by another application.",
  "camera-generic-error": "Cannot access camera.",
  "camera-feedback-scan-front": ["Scan the front side", "of a document"],
  "camera-feedback-scan-back": ["Scan the back side", "of a document"],
  "camera-feedback-flip": "Flip to the back side",
  "camera-feedback-barcode-message": "Scan the barcode",
  "camera-feedback-move-farther": "Move farther",
  "camera-feedback-move-closer": "Move closer",
  "camera-feedback-adjust-angle": "Adjust the angle",
  "camera-feedback-blur": "Keep still",
  "camera-feedback-glare": "Tilt or move document to remove reflections",
  "camera-feedback-barcode": ["Bring barcode closer", "and keep it centered"],
  "drop-info": "Drop image here",
  "drop-error": "Whoops, we don't support that image format. Please upload a JPEG or PNG file.",
  "initialization-error": "Failed to load component. Try using another device or update your browser.",
  "process-image-box-first": "Front side image",
  "process-image-box-second": "Back side image",
  "process-image-box-add": "Add image",
  "process-image-upload-cta": "Upload",
  "process-image-message": "Just a moment.",
  "process-image-message-inline": "Processing",
  "process-image-message-inline-done": "Processing done",
  "process-api-message": "Just a moment",
  "process-api-retry": "Retry",
  "feedback-scan-unsuccessful-title": "Scan unsuccessful",
  "feedback-scan-unsuccessful": "We weren't able to recognize your document. Please try again.",
  "feedback-error-generic": "Whoops, that didn't work. Please give it another go.",
  "check-internet-connection": "Check internet connection.",
  "network-error": "Network error.",
  "scanning-not-available": "Scanning not available.",
  "modal-window-close": "Close",
};
class TranslationService {
  constructor(alternativeTranslations) {
    this.translations = defaultTranslations;
    for (const key in alternativeTranslations) {
      if (key in defaultTranslations) {
        if (this.isExpectedValue(alternativeTranslations[key])) {
          this.translations[key] = alternativeTranslations[key];
        }
      }
    }
  }
  i(key) {
    if (this.translations[key]) {
      if (Array.isArray(this.translations[key])) {
        return JSON.parse(JSON.stringify(this.translations[key]));
      }
      return this.translations[key];
    }
  }
  isExpectedValue(value) {
    if (Array.isArray(value)) {
      const notValidFound = value.filter((item) => typeof item !== "string");
      return notValidFound.length == 0;
    }
    return typeof value === "string";
  }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function stringToArray(inputString) {
  if (!inputString || !inputString.length) {
    return [];
  }
  return inputString.split(",").map((el) => el.trim());
}
function stringToObject(inputString) {
  if (!inputString || !inputString.length) {
    return {};
  }
  return JSON.parse(inputString);
}
function hasSupportedImageFiles(files) {
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < files.length; ++i) {
    if (imageRegex.exec(files[i].type)) {
      return true;
    }
  }
  return false;
}
function extractFilenameFromPath(path) {
  return path.split("\\").pop();
}
function getImageFile(fileList) {
  if (fileList === null) {
    return null;
  }
  let image = null;
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < fileList.length; ++i) {
    if (imageRegex.exec(fileList[i].type)) {
      image = fileList[i];
    }
  }
  return image;
}
/**
 * Inspired by https://github.com/JedWatson/classnames.
 * @param classes Class names and their conditions.
 * @returns Joined string of class names.
 */
function classNames(classes) {
  const result = [];
  const keys = Object.keys(classes);
  keys.forEach((key) => {
    if (classes[key]) {
      result.push(key);
    }
  });
  return result.join(" ");
}
/**
 * @param root shadowroot to apply the query from
 * @returns array of part selectors
 */
function getWebComponentParts(root) {
  const nodesWithPart = root.querySelectorAll("[part]");
  const parts = new Set();
  nodesWithPart.forEach((el) => {
    const partsArray = el.getAttribute("part").split(" ");
    partsArray.forEach((partName) => parts.add(partName));
  });
  return [...parts];
}
function getWebComponentExportedParts(root) {
  const nodesWithPart = root.querySelectorAll("[exportparts]");
  const exportedParts = new Set();
  nodesWithPart.forEach((el) => {
    const exportedPartsArray = el.getAttribute("exportparts").split(" ");
    exportedPartsArray.forEach((partName) => exportedParts.add(partName));
  });
  return [...exportedParts];
}
function setWebComponentParts(hostEl) {
  const partParts = [hostEl.tagName.toLowerCase(), hostEl.getAttribute("id")];
  hostEl.setAttribute("part", partParts.join(" ").trim());
}

const blinkidInBrowserCss = ":host{--mb-font-family:inherit;--mb-font-size:max(16px, 1rem);--mb-font-size-desktop:max(20px, 1rem);--mb-font-style:normal;--mb-font-weight:400;--mb-letter-spacing:normal;--mb-line-height:1.5em;--mb-component-background:#f9fafb;--mb-component-width:100%;--mb-component-font-color:#000;--mb-component-font-color-secondary:#3c3c43b2;--mb-component-font-size:14px;--mb-component-text-transform:none;--mb-component-border-color:rgba(120, 120, 128, 0.2);--mb-component-border-radius:5px;--mb-component-border-style:solid;--mb-component-border-width:1px;--mb-component-box-shadow:none;--mb-component-button-size:36px;--mb-component-button-icon-size:20px;--mb-component-button-background:#fff;--mb-component-button-hover-background:#f9fafb;--mb-component-button-background-selected:rgba(72, 178, 232, 0.1);--mb-component-button-border-color:#d1d5db;--mb-component-button-border-color-selected:rgba(120, 120, 128, 0.2);--mb-component-button-border-color-focus:#9ca3af;--mb-component-button-border-color-hover:rgba(60, 60, 67, 0.29);--mb-component-button-border-color-disabled:rgba(116, 116, 128, 0.08);--mb-component-button-border-radius:50%;--mb-component-button-border-style:solid;--mb-component-button-border-width:1px;--mb-component-button-box-shadow:0px 1px 4px rgba(0, 0, 0, 0.1);--mb-component-button-box-shadow-disabled:none;--mb-component-button-classic-background:#0062f2;--mb-component-button-classic-hover-background:#3a89fd;--mb-component-button-classic-inverted-hover-background:#f9fafb;--mb-component-button-classic-focused-border-color:#142641;--mb-component-button-classic-inverted-text-color:#374151;--mb-component-button-classic-inverted-border-color:#9ca3af;--mb-component-button-classic-font-size:14px;--mb-component-button-classic-font-weight:700;--mb-component-button-classic-text-color:#fff;--mb-component-button-classic-line-height:20px;--mb-component-button-classic-border-radius:100px;--mb-component-image-box-border-color:rgba(120, 120, 128, 0.2);--mb-component-image-box-border-radius:2px;--mb-component-image-box-border-width:1px;--mb-component-image-box-label-height:16px;--mb-component-image-box-label-color:rgba(60, 60, 67, 0.5);--mb-component-image-box-label-font-size:14px;--mb-component-image-box-label-font-weight:400;--mb-component-image-box-cta-height:20px;--mb-component-image-box-cta-label-height:20px;--mb-component-image-box-cta-color:var(\n    --mb-component-button-classic-background\n  );--mb-component-image-box-cta-color-hover:var(\n    --mb-component-button-classic-hover-background\n  );--mb-component-image-box-cta-font-size:14px;--mb-component-image-box-cta-font-weight:500;--mb-component-image-box-file-color:#000;--mb-component-image-box-file-font-weight:400;--mb-component-action-buttons-justify-content:flex-end;--mb-component-action-buttons-gap:8px;--mb-component-action-label:block;--mb-component-action-label-font-size:14px;--mb-blur-filter:27px;--mb-blur-scanning-line:4px;--mb-toolbar-color:#fff;--mb-toolbar-border-color:#fff;--mb-toolbar-border-radius:4px;--mb-toolbar-list-border-radius:4px;--mb-toolbar-list-item-border-radius:2px;--mb-toolbar-list-item-active-text-color:#0062f2;--mb-toolbar-list-item-active-background-color:#e7f0ff;--mb-toolbar-selection-width:298px;--mb-toolbar-list-background:#fff;--mb-toolbar-list-shadow:0px 2px 8px rgba(0, 0, 0, 0.05),\n    0px 2px 24px rgba(0, 0, 0, 0.1);--mb-toolbar-camera-name-font-weight:500;--mb-reticle-size:6em;--mb-feedback-font-color-error:#f43f5e;--mb-feedback-font-color-info:#6b7280;--mb-feedback-font-size:12px;--mb-feedback-font-style:normal;--mb-feedback-font-weight:400;--mb-feedback-letter-spacing:normal;--mb-feedback-line-height:16px;--mb-feedback-text-transform:none;--mb-overlay-draganddrop-background:#dceaff;--mb-overlay-draganddrop-background-error:#ffeaee;--mb-overlay-draganddrop-border-color:#3a89fd;--mb-overlay-draganddrop-text-color:#0062f2;--mb-overlay-draganddrop-text-error-color:#e11d48;--mb-overlay-draganddrop-border-color-error:#ff2d55;--mb-overlay-draganddrop-border-style:dashed;--mb-overlay-gallery-experience-background:rgba(0, 0, 0, 0.6);--mb-overlay-gallery-experience-font-color:#fff;--mb-overlay-gallery-experience-font-size:1em;--mb-overlay-gallery-experience-font-weight:500;--mb-overlay-gallery-experience-line-height:1.5em;--mb-overlay-deviceselection-background:rgba(17, 24, 39, 0.15);--mb-modal-title-font-size:1em;--mb-modal-title-line-height:32px;--mb-modal-content-font-size:0.875em;--mb-modal-content-line-height:1.4em;--mb-modal-border-radius:8px;--mb-modal-background:#ffffff;--mb-help-color-success:#10b981;--mb-help-color-danger:#f43f5e;--mb-help-font-color-primary:#142641;--mb-help-font-color-secondary:#4b5563;--mb-help-modal-background-color:var(--mb-modal-background);--mb-help-modal-backdrop-color:rgba(17, 23, 39, 0.5);--mb-help-lobby-button-background-color:white;--mb-help-lobby-button-border-color:white;--mb-help-lobby-button-hovered-background-color:#f3f4f6;--mb-help-lobby-button-hovered-border-color:#e7f0ff;--mb-help-lobby-button-focused-background-color:#f3f4f6;--mb-help-lobby-button-focused-border-color:#e7f0ff;--mb-help-lobby-button-icon-color:#0062f2;--mb-help-progress-tracker-dot-active-color:#0062f2;--mb-help-progress-tracker-dot-inactive-color:#c6c6c8;--mb-help-lobby-button-tooltip-background-color:#0062f2;--mb-help-lobby-button-tooltip-font-color:white}:host{display:block;width:100%}";

const BlinkidInBrowser = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fatalError = createEvent(this, "fatalError", 7);
    this.ready = createEvent(this, "ready", 7);
    this.scanError = createEvent(this, "scanError", 7);
    this.scanSuccess = createEvent(this, "scanSuccess", 7);
    this.feedback = createEvent(this, "feedback", 7);
    this.cameraScanStarted = createEvent(this, "cameraScanStarted", 7);
    this.imageScanStarted = createEvent(this, "imageScanStarted", 7);
    this.scanAborted = createEvent(this, "scanAborted", 7);
    this.blocked = false;
    this.allowHelloMessage = true;
    this.engineLocation = "";
    this.workerLocation = "";
    this.licenseKey = undefined;
    this.wasmType = "";
    this.blinkIdVariant = undefined;
    this.rawRecognizers = undefined;
    this.recognizers = undefined;
    this.recognizerOptions = undefined;
    this.recognitionTimeout = undefined;
    this.recognitionPauseTimeout = 3800;
    this.cameraExperienceStateDurations = null;
    this.enableDrag = true;
    this.hideFeedback = false;
    this.hideLoadingAndErrorUi = false;
    this.scanFromCamera = true;
    this.scanFromImage = true;
    this.thoroughScanFromImage = false;
    this.galleryOverlayType = "INLINE";
    this.galleryDropType = "INLINE";
    this.showActionLabels = false;
    this.showModalWindows = false;
    this.showCameraFeedbackBarcodeMessage = false;
    this.rawTranslations = undefined;
    this.translations = undefined;
    this.iconCameraDefault = undefined;
    this.iconCameraActive = undefined;
    this.iconGalleryDefault = undefined;
    this.iconGalleryActive = undefined;
    this.iconInvalidFormat = undefined;
    this.iconSpinnerScreenLoading = undefined;
    this.iconSpinnerFromGalleryExperience = undefined;
    this.iconGalleryScanningCompleted = undefined;
    this.cameraId = null;
    this.allowHelpScreensFab = true;
    this.allowHelpScreensOnboarding = true;
    this.allowHelpScreensOnboardingPerpetuity = false;
    this.helpScreensTooltipPauseTimeout = 15000;
    this.pingProxyUrl = null;
  }
  /**
   * Control UI state of camera overlay.
   *
   * Possible values are 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS'.
   *
   * In case of state `ERROR` and if `showModalWindows` is set to `true`, modal window
   * with error message will be displayed. Otherwise, UI will close.
   */
  async setUiState(state) {
    this.mbComponentEl.setUiState(state);
  }
  /**
   * Starts camera scan using camera overlay with usage instructions.
   */
  async startCameraScan() {
    this.mbComponentEl.startCameraScan();
  }
  /**
   * Starts image scan, emits results from provided file.
   *
   * @param file File to scan
   */
  async startImageScan(file) {
    this.mbComponentEl.startImageScan(file);
  }
  /**
   * Starts multi-side image scan, emits results from provided files.
   *
   * @param firstFile File to scan as first image
   * @param secondFile File to scan as second image
   */
  async startMultiSideImageScan(firstFile, secondFile) {
    this.mbComponentEl.startMultiSideImageScan(firstFile, secondFile);
  }
  /**
   * Show message alongside UI component.
   *
   * Possible values for `state` are 'FEEDBACK_ERROR' | 'FEEDBACK_INFO' | 'FEEDBACK_OK'.
   */
  async setUiMessage(state, message) {
    this.feedbackEl.show({ state, message });
  }
  /**
   * Get information about product integration.
   */
  async getProductIntegrationInfo() {
    return this.sdkService?.getProductIntegrationInfo();
  }
  componentWillLoad() {
    this.init();
  }
  componentWillUpdate() {
    if (this.blocked) {
      return;
    }
    this.sdkService?.delete();
    this.init();
  }
  disconnectedCallback() {
    this.sdkService?.delete();
  }
  init() {
    const rawRecognizers = stringToArray(this.rawRecognizers);
    this.finalRecognizers = this.recognizers
      ? this.recognizers
      : rawRecognizers;
    const rawTranslations = stringToObject(this.rawTranslations);
    this.finalTranslations = this.translations
      ? this.translations
      : rawTranslations;
    this.translationService = new TranslationService(this.finalTranslations || {});
    this.sdkService = new SdkService();
  }
  render() {
    return (h(Host, null, h("mb-container", null, h("mb-component", { dir: this.hostEl.getAttribute("dir"), ref: (el) => (this.mbComponentEl = el), allowHelloMessage: this.allowHelloMessage, recognitionPauseTimeout: this.recognitionPauseTimeout, cameraExperienceStateDurations: this.cameraExperienceStateDurations, engineLocation: this.engineLocation, workerLocation: this.workerLocation, licenseKey: this.licenseKey, wasmType: this.wasmType, blinkIdVariant: this.blinkIdVariant, recognizers: this.finalRecognizers, recognizerOptions: this.recognizerOptions, recognitionTimeout: this.recognitionTimeout, enableDrag: this.enableDrag, hideLoadingAndErrorUi: this.hideLoadingAndErrorUi, scanFromCamera: this.scanFromCamera, scanFromImage: this.scanFromImage, thoroughScanFromImage: this.thoroughScanFromImage, galleryOverlayType: this.galleryOverlayType, galleryDropType: this.galleryDropType, showActionLabels: this.showActionLabels, showModalWindows: this.showModalWindows, showCameraFeedbackBarcodeMessage: this.showCameraFeedbackBarcodeMessage, iconCameraDefault: this.iconCameraDefault, iconCameraActive: this.iconCameraActive, iconGalleryDefault: this.iconGalleryDefault, iconGalleryActive: this.iconGalleryActive, iconInvalidFormat: this.iconInvalidFormat, iconSpinnerScreenLoading: this.iconSpinnerScreenLoading, iconSpinnerFromGalleryExperience: this.iconSpinnerFromGalleryExperience, iconGalleryScanningCompleted: this.iconGalleryScanningCompleted, sdkService: this.sdkService, translationService: this.translationService, cameraId: this.cameraId, allowHelpScreens: true, pingProxyUrl: this.pingProxyUrl, allowHelpScreensFab: this.allowHelpScreensFab, allowHelpScreensOnboarding: this.allowHelpScreensOnboarding, allowHelpScreensOnboardingPerpetuity: this.allowHelpScreensOnboardingPerpetuity, helpScreensTooltipPauseTimeout: this.helpScreensTooltipPauseTimeout, onBlock: (ev) => {
        this.blocked = ev.detail;
      }, onFeedback: (ev) => this.feedbackEl.show(ev.detail) }), h("mb-feedback", { dir: this.hostEl.getAttribute("dir"), visible: !this.hideFeedback, ref: (el) => (this.feedbackEl = el) }))));
  }
  get hostEl() { return getElement(this); }
};
BlinkidInBrowser.style = blinkidInBrowserCss;

const mbApiProcessStatusCss = "@keyframes reticle-rotation{100%{transform:rotate(360deg)}}@keyframes reticle-horizontal-shrink{0%{height:50%;top:25%}50%{height:30%;top:35%}80%{height:30%;top:35%}100%{height:50%;top:25%}}@keyframes reticle-cursor-horizontal-flip{0%{opacity:0}100%{opacity:0}}@keyframes reticle-horizontal-flip{0%{border-radius:0;background-color:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDBDMi42ODYyOSAwIDAgMi42ODYyOSAwIDZWNTRDMCA1Ny4zMTM3IDIuNjg2MjkgNjAgNiA2MEg5MEM5My4zMTM3IDYwIDk2IDU3LjMxMzcgOTYgNTRWNkM5NiAyLjY4NjI5IDkzLjMxMzcgMCA5MCAwSDZaTTQ4LjY3MTMgMTAuOEM0Ny4zMDY0IDEwLjggNDYuMiAxMS44NzQ1IDQ2LjIgMTMuMkM0Ni4yIDE0LjUyNTUgNDcuMzA2NCAxNS42IDQ4LjY3MTMgMTUuNkg4Mi4xMjg3QzgzLjQ5MzYgMTUuNiA4NC42IDE0LjUyNTUgODQuNiAxMy4yQzg0LjYgMTEuODc0NSA4My40OTM2IDEwLjggODIuMTI4NyAxMC44SDQ4LjY3MTNaTTcyIDQ5LjJDNzIgNDcuODc0NSA3My4wNTgyIDQ2LjggNzQuMzYzNiA0Ni44SDgxLjYzNjRDODIuOTQxOCA0Ni44IDg0IDQ3Ljg3NDUgODQgNDkuMkM4NCA1MC41MjU1IDgyLjk0MTggNTEuNiA4MS42MzY0IDUxLjZINzQuMzYzNkM3My4wNTgyIDUxLjYgNzIgNTAuNTI1NSA3MiA0OS4yWk00OC43MDE5IDMzLjZDNDcuMzIwMSAzMy42IDQ2LjIgMzQuNjc0NSA0Ni4yIDM2QzQ2LjIgMzcuMzI1NSA0Ny4zMjAxIDM4LjQgNDguNzAxOSAzOC40SDY0LjA5ODFDNjUuNDc5OSAzOC40IDY2LjYgMzcuMzI1NSA2Ni42IDM2QzY2LjYgMzQuNjc0NSA2NS40Nzk5IDMzLjYgNjQuMDk4MSAzMy42SDQ4LjcwMTlaTTQ2LjIgMjQuNkM0Ni4yIDIzLjI3NDUgNDcuMzA2NCAyMi4yIDQ4LjY3MTMgMjIuMkg4Mi4xMjg3QzgzLjQ5MzYgMjIuMiA4NC42IDIzLjI3NDUgODQuNiAyNC42Qzg0LjYgMjUuOTI1NSA4My40OTM2IDI3IDgyLjEyODcgMjdINDguNjcxM0M0Ny4zMDY0IDI3IDQ2LjIgMjUuOTI1NSA0Ni4yIDI0LjZaTTEzLjI2NDggMTAuOEMxMS41NzIxIDEwLjggMTAuMiAxMi4yMDc0IDEwLjIgMTMuOTQzNlYzNy45NjgzQzEwLjIgMzkuMDg1NCAxMC43NjkgNDAuMDY1NSAxMS42MjA2IDQwLjYyMTVDMTEuODg1OSA0MC43OTQ3IDEyLjIxMDMgNDAuODQ0NyAxMi41MTM1IDQwLjc1OUMxMi44MTY4IDQwLjY3MzQgMTMuMDcwNSA0MC40NjAyIDEzLjIxMiA0MC4xNzIxQzE0LjU5NyAzNy4zNTI1IDE2Ljg4OTkgMzUuMTUwOSAxOS42NDk1IDM0LjAxMDFDMjAuMDIzNSAzMy44NTU1IDIwLjI4NjcgMzMuNTA1NiAyMC4zMzc1IDMzLjA5NTRDMjAuMzg4NCAzMi42ODUyIDIwLjIxOSAzMi4yNzg4IDE5Ljg5NDggMzIuMDMzMUMxOC4xNzIzIDMwLjcyODEgMTcuMDU1OCAyOC42MjY0IDE3LjA1NTggMjYuMjUzOUMxNy4wNTU4IDIyLjI5MTUgMjAuMTcwMSAxOS4wODkyIDI0IDE5LjA4OTJDMjcuODI5OSAxOS4wODkyIDMwLjk0NDIgMjIuMjkxNSAzMC45NDQyIDI2LjI1MzlDMzAuOTQ0MiAyOC42MjY0IDI5LjgyNzcgMzAuNzI4MSAyOC4xMDUyIDMyLjAzMzFDMjcuNzgxIDMyLjI3ODggMjcuNjExNiAzMi42ODUyIDI3LjY2MjUgMzMuMDk1NEMyNy43MTMzIDMzLjUwNTYgMjcuOTc2NSAzMy44NTU1IDI4LjM1MDUgMzQuMDEwMUMzMS4xMTAxIDM1LjE1MDkgMzMuNDAzIDM3LjM1MjUgMzQuNzg4IDQwLjE3MjFDMzQuOTI5NSA0MC40NjAyIDM1LjE4MzIgNDAuNjczNCAzNS40ODY0IDQwLjc1OUMzNS43ODk3IDQwLjg0NDcgMzYuMTE0MSA0MC43OTQ3IDM2LjM3OTQgNDAuNjIxNUMzNy4yMzEgNDAuMDY1NSAzNy44IDM5LjA4NTQgMzcuOCAzNy45NjgzVjEzLjk0MzZDMzcuOCAxMi4yMDc0IDM2LjQyNzkgMTAuOCAzNC43MzUyIDEwLjhIMTMuMjY0OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgoK);opacity:0}5%{opacity:1}15%{transform:rotateY(0deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDBDMi42ODYyOSAwIDAgMi42ODYyOSAwIDZWNTRDMCA1Ny4zMTM3IDIuNjg2MjkgNjAgNiA2MEg5MEM5My4zMTM3IDYwIDk2IDU3LjMxMzcgOTYgNTRWNkM5NiAyLjY4NjI5IDkzLjMxMzcgMCA5MCAwSDZaTTQ4LjY3MTMgMTAuOEM0Ny4zMDY0IDEwLjggNDYuMiAxMS44NzQ1IDQ2LjIgMTMuMkM0Ni4yIDE0LjUyNTUgNDcuMzA2NCAxNS42IDQ4LjY3MTMgMTUuNkg4Mi4xMjg3QzgzLjQ5MzYgMTUuNiA4NC42IDE0LjUyNTUgODQuNiAxMy4yQzg0LjYgMTEuODc0NSA4My40OTM2IDEwLjggODIuMTI4NyAxMC44SDQ4LjY3MTNaTTcyIDQ5LjJDNzIgNDcuODc0NSA3My4wNTgyIDQ2LjggNzQuMzYzNiA0Ni44SDgxLjYzNjRDODIuOTQxOCA0Ni44IDg0IDQ3Ljg3NDUgODQgNDkuMkM4NCA1MC41MjU1IDgyLjk0MTggNTEuNiA4MS42MzY0IDUxLjZINzQuMzYzNkM3My4wNTgyIDUxLjYgNzIgNTAuNTI1NSA3MiA0OS4yWk00OC43MDE5IDMzLjZDNDcuMzIwMSAzMy42IDQ2LjIgMzQuNjc0NSA0Ni4yIDM2QzQ2LjIgMzcuMzI1NSA0Ny4zMjAxIDM4LjQgNDguNzAxOSAzOC40SDY0LjA5ODFDNjUuNDc5OSAzOC40IDY2LjYgMzcuMzI1NSA2Ni42IDM2QzY2LjYgMzQuNjc0NSA2NS40Nzk5IDMzLjYgNjQuMDk4MSAzMy42SDQ4LjcwMTlaTTQ2LjIgMjQuNkM0Ni4yIDIzLjI3NDUgNDcuMzA2NCAyMi4yIDQ4LjY3MTMgMjIuMkg4Mi4xMjg3QzgzLjQ5MzYgMjIuMiA4NC42IDIzLjI3NDUgODQuNiAyNC42Qzg0LjYgMjUuOTI1NSA4My40OTM2IDI3IDgyLjEyODcgMjdINDguNjcxM0M0Ny4zMDY0IDI3IDQ2LjIgMjUuOTI1NSA0Ni4yIDI0LjZaTTEzLjI2NDggMTAuOEMxMS41NzIxIDEwLjggMTAuMiAxMi4yMDc0IDEwLjIgMTMuOTQzNlYzNy45NjgzQzEwLjIgMzkuMDg1NCAxMC43NjkgNDAuMDY1NSAxMS42MjA2IDQwLjYyMTVDMTEuODg1OSA0MC43OTQ3IDEyLjIxMDMgNDAuODQ0NyAxMi41MTM1IDQwLjc1OUMxMi44MTY4IDQwLjY3MzQgMTMuMDcwNSA0MC40NjAyIDEzLjIxMiA0MC4xNzIxQzE0LjU5NyAzNy4zNTI1IDE2Ljg4OTkgMzUuMTUwOSAxOS42NDk1IDM0LjAxMDFDMjAuMDIzNSAzMy44NTU1IDIwLjI4NjcgMzMuNTA1NiAyMC4zMzc1IDMzLjA5NTRDMjAuMzg4NCAzMi42ODUyIDIwLjIxOSAzMi4yNzg4IDE5Ljg5NDggMzIuMDMzMUMxOC4xNzIzIDMwLjcyODEgMTcuMDU1OCAyOC42MjY0IDE3LjA1NTggMjYuMjUzOUMxNy4wNTU4IDIyLjI5MTUgMjAuMTcwMSAxOS4wODkyIDI0IDE5LjA4OTJDMjcuODI5OSAxOS4wODkyIDMwLjk0NDIgMjIuMjkxNSAzMC45NDQyIDI2LjI1MzlDMzAuOTQ0MiAyOC42MjY0IDI5LjgyNzcgMzAuNzI4MSAyOC4xMDUyIDMyLjAzMzFDMjcuNzgxIDMyLjI3ODggMjcuNjExNiAzMi42ODUyIDI3LjY2MjUgMzMuMDk1NEMyNy43MTMzIDMzLjUwNTYgMjcuOTc2NSAzMy44NTU1IDI4LjM1MDUgMzQuMDEwMUMzMS4xMTAxIDM1LjE1MDkgMzMuNDAzIDM3LjM1MjUgMzQuNzg4IDQwLjE3MjFDMzQuOTI5NSA0MC40NjAyIDM1LjE4MzIgNDAuNjczNCAzNS40ODY0IDQwLjc1OUMzNS43ODk3IDQwLjg0NDcgMzYuMTE0MSA0MC43OTQ3IDM2LjM3OTQgNDAuNjIxNUMzNy4yMzEgNDAuMDY1NSAzNy44IDM5LjA4NTQgMzcuOCAzNy45NjgzVjEzLjk0MzZDMzcuOCAxMi4yMDc0IDM2LjQyNzkgMTAuOCAzNC43MzUyIDEwLjhIMTMuMjY0OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgoK)}20%{transform:rotateY(90deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBIOTBDOTMuMzEzNyAwIDk2IDIuNjg2MjkgOTYgNlY1NEM5NiA1Ny4zMTM3IDkzLjMxMzcgNjAgOTAgNjBINkMyLjY4NjI5IDYwIDAgNTcuMzEzNyAwIDU0VjZaTTEwLjIgMTMuOEMxMC4yIDEyLjQ3NDUgMTEuMzEwMyAxMS40IDEyLjY4IDExLjRIODIuMTJDODMuNDg5NyAxMS40IDg0LjYgMTIuNDc0NSA4NC42IDEzLjhDODQuNiAxNS4xMjU1IDgzLjQ4OTcgMTYuMiA4Mi4xMiAxNi4ySDEyLjY4QzExLjMxMDMgMTYuMiAxMC4yIDE1LjEyNTUgMTAuMiAxMy44Wk04MC43IDQ5LjJDODIuODUzOSA0OS4yIDg0LjYgNDcuNDUzOSA4NC42IDQ1LjNDODQuNiA0My4xNDYxIDgyLjg1MzkgNDEuNCA4MC43IDQxLjRDNzguNTQ2MSA0MS40IDc2LjggNDMuMTQ2MSA3Ni44IDQ1LjNDNzYuOCA0Ny40NTM5IDc4LjU0NjEgNDkuMiA4MC43IDQ5LjJaTTEwLjIgNDYuMkMxMC4yIDQ0Ljg3NDUgMTEuMjk3NSA0My44IDEyLjY1MTQgNDMuOEgzNC4xNDg2QzM1LjUwMjUgNDMuOCAzNi42IDQ0Ljg3NDUgMzYuNiA0Ni4yQzM2LjYgNDcuNTI1NSAzNS41MDI1IDQ4LjYgMzQuMTQ4NiA0OC42SDEyLjY1MTRDMTEuMjk3NSA0OC42IDEwLjIgNDcuNTI1NSAxMC4yIDQ2LjJaTTEyLjY3NDIgMzIuNEMxMS4zMDc3IDMyLjQgMTAuMiAzMy40NzQ1IDEwLjIgMzQuOEMxMC4yIDM2LjEyNTUgMTEuMzA3NyAzNy4yIDEyLjY3NDIgMzcuMkg0My4xMjU4QzQ0LjQ5MjMgMzcuMiA0NS42IDM2LjEyNTUgNDUuNiAzNC44QzQ1LjYgMzMuNDc0NSA0NC40OTIzIDMyLjQgNDMuMTI1OCAzMi40SDEyLjY3NDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)}25%{transform:rotateY(-15deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBIOTBDOTMuMzEzNyAwIDk2IDIuNjg2MjkgOTYgNlY1NEM5NiA1Ny4zMTM3IDkzLjMxMzcgNjAgOTAgNjBINkMyLjY4NjI5IDYwIDAgNTcuMzEzNyAwIDU0VjZaTTEwLjIgMTMuOEMxMC4yIDEyLjQ3NDUgMTEuMzEwMyAxMS40IDEyLjY4IDExLjRIODIuMTJDODMuNDg5NyAxMS40IDg0LjYgMTIuNDc0NSA4NC42IDEzLjhDODQuNiAxNS4xMjU1IDgzLjQ4OTcgMTYuMiA4Mi4xMiAxNi4ySDEyLjY4QzExLjMxMDMgMTYuMiAxMC4yIDE1LjEyNTUgMTAuMiAxMy44Wk04MC43IDQ5LjJDODIuODUzOSA0OS4yIDg0LjYgNDcuNDUzOSA4NC42IDQ1LjNDODQuNiA0My4xNDYxIDgyLjg1MzkgNDEuNCA4MC43IDQxLjRDNzguNTQ2MSA0MS40IDc2LjggNDMuMTQ2MSA3Ni44IDQ1LjNDNzYuOCA0Ny40NTM5IDc4LjU0NjEgNDkuMiA4MC43IDQ5LjJaTTEwLjIgNDYuMkMxMC4yIDQ0Ljg3NDUgMTEuMjk3NSA0My44IDEyLjY1MTQgNDMuOEgzNC4xNDg2QzM1LjUwMjUgNDMuOCAzNi42IDQ0Ljg3NDUgMzYuNiA0Ni4yQzM2LjYgNDcuNTI1NSAzNS41MDI1IDQ4LjYgMzQuMTQ4NiA0OC42SDEyLjY1MTRDMTEuMjk3NSA0OC42IDEwLjIgNDcuNTI1NSAxMC4yIDQ2LjJaTTEyLjY3NDIgMzIuNEMxMS4zMDc3IDMyLjQgMTAuMiAzMy40NzQ1IDEwLjIgMzQuOEMxMC4yIDM2LjEyNTUgMTEuMzA3NyAzNy4yIDEyLjY3NDIgMzcuMkg0My4xMjU4QzQ0LjQ5MjMgMzcuMiA0NS42IDM2LjEyNTUgNDUuNiAzNC44QzQ1LjYgMzMuNDc0NSA0NC40OTIzIDMyLjQgNDMuMTI1OCAzMi40SDEyLjY3NDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)}30%{transform:rotateY(0deg)}95%{opacity:1}100%{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBIOTBDOTMuMzEzNyAwIDk2IDIuNjg2MjkgOTYgNlY1NEM5NiA1Ny4zMTM3IDkzLjMxMzcgNjAgOTAgNjBINkMyLjY4NjI5IDYwIDAgNTcuMzEzNyAwIDU0VjZaTTEwLjIgMTMuOEMxMC4yIDEyLjQ3NDUgMTEuMzEwMyAxMS40IDEyLjY4IDExLjRIODIuMTJDODMuNDg5NyAxMS40IDg0LjYgMTIuNDc0NSA4NC42IDEzLjhDODQuNiAxNS4xMjU1IDgzLjQ4OTcgMTYuMiA4Mi4xMiAxNi4ySDEyLjY4QzExLjMxMDMgMTYuMiAxMC4yIDE1LjEyNTUgMTAuMiAxMy44Wk04MC43IDQ5LjJDODIuODUzOSA0OS4yIDg0LjYgNDcuNDUzOSA4NC42IDQ1LjNDODQuNiA0My4xNDYxIDgyLjg1MzkgNDEuNCA4MC43IDQxLjRDNzguNTQ2MSA0MS40IDc2LjggNDMuMTQ2MSA3Ni44IDQ1LjNDNzYuOCA0Ny40NTM5IDc4LjU0NjEgNDkuMiA4MC43IDQ5LjJaTTEwLjIgNDYuMkMxMC4yIDQ0Ljg3NDUgMTEuMjk3NSA0My44IDEyLjY1MTQgNDMuOEgzNC4xNDg2QzM1LjUwMjUgNDMuOCAzNi42IDQ0Ljg3NDUgMzYuNiA0Ni4yQzM2LjYgNDcuNTI1NSAzNS41MDI1IDQ4LjYgMzQuMTQ4NiA0OC42SDEyLjY1MTRDMTEuMjk3NSA0OC42IDEwLjIgNDcuNTI1NSAxMC4yIDQ2LjJaTTEyLjY3NDIgMzIuNEMxMS4zMDc3IDMyLjQgMTAuMiAzMy40NzQ1IDEwLjIgMzQuOEMxMC4yIDM2LjEyNTUgMTEuMzA3NyAzNy4yIDEyLjY3NDIgMzcuMkg0My4xMjU4QzQ0LjQ5MjMgMzcuMiA0NS42IDM2LjEyNTUgNDUuNiAzNC44QzQ1LjYgMzMuNDc0NSA0NC40OTIzIDMyLjQgNDMuMTI1OCAzMi40SDEyLjY3NDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);border-radius:0;-webkit-backdrop-filter:none;backdrop-filter:none;background-color:transparent;opacity:0}}:host .reticle{box-sizing:border-box;position:relative;width:100%;height:100%;border-radius:50%;background-color:rgba(107, 114, 128, 0.3);background-position:center;background-size:contain;background-repeat:no-repeat;-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));transition:all 0.4s ease}:host .reticle__cursor{box-sizing:border-box;display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;border-radius:50%;border-color:transparent;border-style:solid;border-width:4px;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);background-position:center;background-size:contain;background-repeat:no-repeat}:host .reticle__cursor::before{content:\"\";position:absolute;width:4px;height:4px;top:50%;left:50%;transition:all 0.2s ease;transform-origin:center;transform:translate(-50%, -50%);background-color:#ffffff;border-radius:50%}:host .reticle__cursor::after{content:\"\";position:absolute;top:-4px;left:-4px;width:calc(50% + 4px);height:calc(50% + 4px);display:block;border-left-width:4px;border-left-style:solid;border-left-color:#ffffff;border-top-width:4px;border-top-style:solid;border-top-color:#ffffff;border-top-left-radius:100%;transition:all 0.2s ease;opacity:0;filter:drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))}:host .reticle__el{box-sizing:border-box}:host .reticle__done{display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);transform-origin:center;transform:rotate(15deg) translateY(-5%);opacity:0}:host .reticle.is-default~.label[data-message=is-default],:host .reticle.is-detection~.label[data-message=is-detection],:host .reticle.is-classification~.label[data-message=is-classification],:host .reticle.is-done~.label[data-message=is-done],:host .reticle.is-done-all~.label[data-message=is-done-all],:host .reticle.is-flip~.label[data-message=is-flip],:host .reticle.is-error-move-farther~.label[data-message=is-error-move-farther],:host .reticle.is-error-move-closer~.label[data-message=is-error-move-closer],:host .reticle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host .reticle.is-default .reticle__cursor{animation:reticle-rotation 1000ms ease-in-out infinite;border-style:none}:host .reticle.is-default .reticle__el{position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host .reticle.is-default .reticle__el::after,:host .reticle.is-default .reticle__el::before{content:\"\";position:absolute;display:block;width:100%;height:100%}:host .reticle.is-default .reticle__el:nth-child(1){top:0;left:0}:host .reticle.is-default .reticle__el:nth-child(1)::after,:host .reticle.is-default .reticle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-top-left-radius:100%;transform-origin:bottom right}:host .reticle.is-default .reticle__el:nth-child(1)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(1)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2){top:0;right:0}:host .reticle.is-default .reticle__el:nth-child(2)::after,:host .reticle.is-default .reticle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-top-right-radius:100%;transform-origin:bottom left}:host .reticle.is-default .reticle__el:nth-child(2)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3){bottom:0;right:0}:host .reticle.is-default .reticle__el:nth-child(3)::after,:host .reticle.is-default .reticle__el:nth-child(3)::before{bottom:0;right:0;transform-origin:top left;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-bottom-right-radius:100%}:host .reticle.is-default .reticle__el:nth-child(3)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4){bottom:0;left:0}:host .reticle.is-default .reticle__el:nth-child(4)::after,:host .reticle.is-default .reticle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-bottom-left-radius:100%;transform-origin:top right}:host .reticle.is-default .reticle__el:nth-child(4)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4)::before{transform:rotate(-67.5deg)}:host .reticle.is-detection .reticle__cursor{border-color:rgba(255, 255, 255, 0.75)}:host .reticle.is-classification .reticle__cursor{animation:reticle-rotation 250ms cubic-bezier(0.4, 0.02, 1, 1) infinite;border-style:solid;border-color:rgba(255, 255, 255, 0.25)}:host .reticle.is-classification .reticle__cursor::after{opacity:1}:host .reticle.is-flip{animation:reticle-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-flip .reticle__cursor{transform-style:preserve-3d;animation:reticle-cursor-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-done{display:none}:host .reticle.is-done-all{background-color:#ffffff;box-shadow:0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05);transition:all 125ms cubic-bezier(0.4, 0.02, 1, 1)}:host .reticle.is-done-all .reticle__done{transform:rotate(0) translateY(0);opacity:1}:host .reticle.is-done-all .reticle__cursor::before{width:150vw;height:150vh;opacity:0;transition:all 200ms ease}:host .reticle.is-error-move-farther{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-farther .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:40%;height:40%;left:30%;top:30%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-move-closer{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-closer .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:60%;height:60%;left:20%;top:20%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-adjust-angle{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-adjust-angle .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);animation:reticle-horizontal-shrink 600ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}*::after,*::before{box-sizing:border-box}:host .message{display:block;position:absolute;top:100%;left:50%;transform-origin:center;transform:translate(-50%, 0);margin:8px 0 0 0;margin-top:20px;padding:8px 12px;font-weight:500;text-align:center;text-shadow:0px 1px 4px rgba(0, 0, 0, 0.1);white-space:nowrap;color:#fff;background-color:rgba(107, 114, 128, 0.3);-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));border-radius:8px}:host .reticle-container{position:absolute;top:50%;left:50%;width:96px;height:96px;transform-origin:center;transform:translate(-50%, -50%);perspective:600px}:host button.modal-action-button{width:126px;height:32px;border-radius:0;border:0;background:#48b2e8;color:#ffffff;cursor:pointer}";

const MbApiProcessStatus = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closeTryAgain = createEvent(this, "closeTryAgain", 7);
    this.closeFromStart = createEvent(this, "closeFromStart", 7);
    this.visible = false;
    this.state = undefined;
    this.translationService = undefined;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible }) }, this.state === "LOADING" && (h("div", { class: "reticle-container" }, h("div", { class: "reticle is-classification" }, h("div", { class: "reticle__cursor" }, h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }))), h("p", { class: "message" }, this.translationService.i("process-api-message").toString()))), this.state === "SUCCESS" && (h("div", { class: "reticle-container" }, h("div", { class: "reticle is-done-all" }, h("div", { class: "reticle__cursor" }, h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" })), h("img", { class: "reticle__done", src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk3MiAzMy40NkMyMC43MDk1IDMzLjQ2MDUgMjAuNDQ5NCAzMy40MDkyIDIwLjIwNjggMzMuMzA5QzE5Ljk2NDEgMzMuMjA4OCAxOS43NDM2IDMzLjA2MTYgMTkuNTU4IDMyLjg3NkwxMS4wNzQgMjQuMzlDMTAuODgyOSAyNC4yMDU2IDEwLjczMDMgMjMuOTg1MSAxMC42MjU0IDIzLjc0MTFDMTAuNTIwNCAyMy40OTcyIDEwLjQ2NSAyMy4yMzQ4IDEwLjQ2MjUgMjIuOTY5MkMxMC40NiAyMi43MDM3IDEwLjUxMDQgMjIuNDQwMyAxMC42MTA4IDIyLjE5NDRDMTAuNzExMiAyMS45NDg2IDEwLjg1OTYgMjEuNzI1MiAxMS4wNDcyIDIxLjUzNzNDMTEuMjM0OSAyMS4zNDkzIDExLjQ1ODEgMjEuMjAwNyAxMS43MDM4IDIxLjA5OTlDMTEuOTQ5NSAyMC45OTkyIDEyLjIxMjggMjAuOTQ4NCAxMi40Nzg0IDIwLjk1MDVDMTIuNzQzOSAyMC45NTI2IDEzLjAwNjQgMjEuMDA3NiAxMy4yNTA1IDIxLjExMjNDMTMuNDk0NiAyMS4yMTY5IDEzLjcxNTQgMjEuMzY5MSAxMy45IDIxLjU2TDIwLjk3IDI4LjYzTDMzLjcgMTUuOTA0QzM0LjA3NSAxNS41Mjg3IDM0LjU4MzggMTUuMzE3OCAzNS4xMTQzIDE1LjMxNzZDMzUuNjQ0OCAxNS4zMTc0IDM2LjE1MzcgMTUuNTI4IDM2LjUyOSAxNS45MDNDMzYuOTA0MyAxNi4yNzggMzcuMTE1MiAxNi43ODY4IDM3LjExNTQgMTcuMzE3M0MzNy4xMTU2IDE3Ljg0NzggMzYuOTA1IDE4LjM1NjcgMzYuNTMgMTguNzMyTDIyLjM4NiAzMi44NzZDMjIuMjAwNCAzMy4wNjE2IDIxLjk3OTkgMzMuMjA4OCAyMS43MzcyIDMzLjMwOUMyMS40OTQ2IDMzLjQwOTIgMjEuMjM0NSAzMy40NjA1IDIwLjk3MiAzMy40NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" })))), this.state === "ERROR" && (h("mb-modal", { visible: true, modalTitle: this.translationService
        .i("feedback-scan-unsuccessful-title")
        .toString(), content: this.translationService
        .i("feedback-scan-unsuccessful")
        .toString(), onClose: () => this.closeFromStart.emit() }, h("div", { slot: "actionButtons" }, h("button", { class: "primary modal-action-button", onClick: () => this.closeTryAgain.emit() }, this.translationService.i("process-api-retry").toString()))))));
  }
  get hostEl() { return getElement(this); }
};
MbApiProcessStatus.style = mbApiProcessStatusCss;

const mbButtonCss = ":host{box-sizing:border-box;display:none}button{display:grid;place-items:center;position:relative;width:calc(var(--mb-component-button-size) - 2 * var(--mb-component-button-border-width));height:calc(var(--mb-component-button-size) - 2 * var(--mb-component-button-border-width));padding:0;background-color:var(--mb-component-button-background);border-color:var(--mb-component-button-border-color);border-radius:var(--mb-component-button-border-radius);border-style:var(--mb-component-button-border-style);border-width:var(--mb-component-button-border-width);box-shadow:var(--mb-component-button-box-shadow);text-decoration:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer}button>*{-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}button .icon-active{display:none}button:focus-visible{border-color:var(--mb-component-button-border-color--visible)}button:hover,button:active{border-color:var(--mb-component-button-border-color-hover)}button:hover .icon-active,button:active .icon-active{display:block}button:hover .icon-default,button:active .icon-default{display:none}button:active{box-shadow:0px 1px 6px rgba(0, 0, 0, 0.3)}button[disabled]{border-color:var(--mb-component-button-border-color-disabled);box-shadow:var(--mb-component-button-box-shadow-disabled);pointer-events:none;cursor:default}button[disabled]::before{opacity:0.5}:host(.visible){display:flex;flex-direction:column;align-items:center}:host(.selected) button{background-color:var(--mb-component-button-background-selected);border-color:var(--mb-component-button-border-color-selected)}label{cursor:inherit}span{display:block;padding-top:8px;font-size:var(--mb-component-font-size);font-weight:var(--mb-font-weight);line-height:var(--mb-line-height);color:var(--mb-feedback-font-color-info)}";

const MbButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.clickHandler = undefined;
    this.disabled = false;
    this.visible = false;
    this.selected = false;
    this.imageSrcDefault = undefined;
    this.imageSrcActive = undefined;
    this.imageAlt = "";
    this.label = "";
    this.buttonTitle = undefined;
  }
  connectedCallback() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({
        visible: this.visible,
        selected: this.selected,
      }) }, h("button", { onClick: this.clickHandler, title: this.buttonTitle, disabled: this.disabled }, h("img", { class: "icon-default", src: this.imageSrcDefault, alt: "" }), h("img", { class: "icon-active", src: this.imageSrcActive, alt: "" })), this.label !== "" && h("span", null, this.label)));
  }
  get hostEl() { return getElement(this); }
};
MbButton.style = mbButtonCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function hasVideoDevices() {
  return new Promise((resolve) => {
    if (!window.navigator ||
      !window.navigator.mediaDevices ||
      typeof window.navigator.mediaDevices.enumerateDevices !== "function") {
      resolve(false);
      return;
    }
    window.navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices = devices || [];
      for (const device of devices) {
        if (device && device.kind === "videoinput") {
          resolve(true);
          return;
        }
      }
      resolve(false);
    });
  });
}
function isWasmSupported() {
  return new Promise((resolve) => {
    const wasmSupport = isBrowserSupported();
    resolve(wasmSupport);
  });
}
async function checkMandatoryCapabilites() {
  const wasmSupport = await isWasmSupported();
  return wasmSupport;
}
/**
 * Determine whether this is a desktop device based on the screen resolution.
 */
function isDesktop() {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const mbButtonClassicCss = ":host{box-sizing:border-box;display:block}:host button{display:block;border:none;margin:0;padding:7px 16px;color:var(--mb-component-button-classic-text-color);background:var(--mb-component-button-classic-background);border:1px solid var(--mb-component-button-classic-background);border-radius:var(--mb-component-button-classic-border-radius);font-family:var(--mb-font-family);font-size:var(--mb-component-button-classic-font-size);font-weight:var(--mb-component-button-classic-font-weight)}:host button:not([disabled]){cursor:pointer}:host button[disabled]{opacity:0.5;pointer-events:none}:host(.mobile){width:50%;display:flex;flex-direction:column}:host(.mobile) button{display:block;border:none;margin:0;padding:7px 16px;color:var(--mb-component-button-classic-text-color);background:var(--mb-component-button-classic-background);border:1px solid var(--mb-component-button-classic-background);border-radius:var(--mb-component-button-classic-border-radius);font-family:var(--mb-font-family);font-size:var(--mb-component-button-classic-font-size);font-weight:var(--mb-component-button-classic-font-weight)}:host(.mobile) button:not([disabled]){cursor:pointer}:host(.mobile) button[disabled]{opacity:0.5;pointer-events:none}:host(.quit-mobile){width:170%;display:flex;flex-direction:column}:host(.quit-mobile) button{display:block;border:none;margin:0;padding:7px 16px;color:var(--mb-component-button-classic-text-color);background:var(--mb-component-button-classic-background);border:1px solid var(--mb-component-button-classic-background);border-radius:var(--mb-component-button-classic-border-radius);font-family:var(--mb-font-family);font-size:var(--mb-component-button-classic-font-size);font-weight:var(--mb-component-button-classic-font-weight)}:host(.quit-mobile) button:not([disabled]){cursor:pointer}:host(.quit-mobile) button[disabled]{opacity:0.5;pointer-events:none}:host(.inverted) a,:host(.inverted) button{background-color:white;color:var(--mb-component-button-classic-inverted-text-color);border:1px solid var(--mb-component-button-classic-inverted-border-color)}:host(.inverted) button:hover,:host(.inverted) button:active,:host(.inverted) button:focus{cursor:pointer;background-color:var(--mb-component-button-classic-inverted-hover-background)}:host(.inverted) button:focus{border-color:var(--mb-component-button-classic-focused-border-color)}";

const MbButtonClassic = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inverted = false;
    this.quit = undefined;
    this.disabled = false;
    this.preventDefault = false;
    this.clickHandler = undefined;
  }
  connectedCallback() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({
        inverted: this.inverted,
        mobile: !isDesktop(),
        "quit-mobile": this.quit && !isDesktop(),
      }) }, h("button", { part: "button", disabled: this.disabled, onClick: this.clickHandler }, h("slot", null))));
  }
  get hostEl() { return getElement(this); }
};
MbButtonClassic.style = mbButtonClassicCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// TODO: do we need anything except CardSingleSide, CardMultiSide and Barcode?
function getStateClass(state) {
  let stateClass = "is-default";
  switch (state) {
    case CameraExperienceState.BarcodeScanning:
    case CameraExperienceState.Classification:
      stateClass = "is-classification";
      break;
    case CameraExperienceState.Default:
      stateClass = "is-default";
      break;
    case CameraExperienceState.Detection:
      stateClass = "is-detection";
      break;
    case CameraExperienceState.MoveFarther:
      stateClass = "is-error-move-farther";
      break;
    case CameraExperienceState.MoveCloser:
      stateClass = "is-error-move-closer";
      break;
    case CameraExperienceState.AdjustAngle:
      stateClass = "is-error-adjust-angle";
      break;
    case CameraExperienceState.Flip:
      stateClass = "is-flip";
      break;
    case CameraExperienceState.Done:
      stateClass = "is-done";
      break;
    case CameraExperienceState.DoneAll:
      stateClass = "is-done-all";
      break;
    // We use the same class for blur and glare
    case CameraExperienceState.BlurDetected:
    case CameraExperienceState.GlareDetected:
      stateClass = "is-error-move-closer";
      break;
    // Reset class
  }
  return stateClass;
}

const mbCameraExperienceCss = "@charset \"UTF-8\";@keyframes reticle-rotation{100%{transform:rotate(360deg)}}@keyframes reticle-horizontal-shrink{0%{height:50%;top:25%}50%{height:30%;top:35%}80%{height:30%;top:35%}100%{height:50%;top:25%}}@keyframes reticle-cursor-horizontal-flip{0%{opacity:0}100%{opacity:0}}@keyframes reticle-horizontal-flip{0%{border-radius:0;background-color:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDBDMi42ODYyOSAwIDAgMi42ODYyOSAwIDZWNTRDMCA1Ny4zMTM3IDIuNjg2MjkgNjAgNiA2MEg5MEM5My4zMTM3IDYwIDk2IDU3LjMxMzcgOTYgNTRWNkM5NiAyLjY4NjI5IDkzLjMxMzcgMCA5MCAwSDZaTTQ4LjY3MTMgMTAuOEM0Ny4zMDY0IDEwLjggNDYuMiAxMS44NzQ1IDQ2LjIgMTMuMkM0Ni4yIDE0LjUyNTUgNDcuMzA2NCAxNS42IDQ4LjY3MTMgMTUuNkg4Mi4xMjg3QzgzLjQ5MzYgMTUuNiA4NC42IDE0LjUyNTUgODQuNiAxMy4yQzg0LjYgMTEuODc0NSA4My40OTM2IDEwLjggODIuMTI4NyAxMC44SDQ4LjY3MTNaTTcyIDQ5LjJDNzIgNDcuODc0NSA3My4wNTgyIDQ2LjggNzQuMzYzNiA0Ni44SDgxLjYzNjRDODIuOTQxOCA0Ni44IDg0IDQ3Ljg3NDUgODQgNDkuMkM4NCA1MC41MjU1IDgyLjk0MTggNTEuNiA4MS42MzY0IDUxLjZINzQuMzYzNkM3My4wNTgyIDUxLjYgNzIgNTAuNTI1NSA3MiA0OS4yWk00OC43MDE5IDMzLjZDNDcuMzIwMSAzMy42IDQ2LjIgMzQuNjc0NSA0Ni4yIDM2QzQ2LjIgMzcuMzI1NSA0Ny4zMjAxIDM4LjQgNDguNzAxOSAzOC40SDY0LjA5ODFDNjUuNDc5OSAzOC40IDY2LjYgMzcuMzI1NSA2Ni42IDM2QzY2LjYgMzQuNjc0NSA2NS40Nzk5IDMzLjYgNjQuMDk4MSAzMy42SDQ4LjcwMTlaTTQ2LjIgMjQuNkM0Ni4yIDIzLjI3NDUgNDcuMzA2NCAyMi4yIDQ4LjY3MTMgMjIuMkg4Mi4xMjg3QzgzLjQ5MzYgMjIuMiA4NC42IDIzLjI3NDUgODQuNiAyNC42Qzg0LjYgMjUuOTI1NSA4My40OTM2IDI3IDgyLjEyODcgMjdINDguNjcxM0M0Ny4zMDY0IDI3IDQ2LjIgMjUuOTI1NSA0Ni4yIDI0LjZaTTEzLjI2NDggMTAuOEMxMS41NzIxIDEwLjggMTAuMiAxMi4yMDc0IDEwLjIgMTMuOTQzNlYzNy45NjgzQzEwLjIgMzkuMDg1NCAxMC43NjkgNDAuMDY1NSAxMS42MjA2IDQwLjYyMTVDMTEuODg1OSA0MC43OTQ3IDEyLjIxMDMgNDAuODQ0NyAxMi41MTM1IDQwLjc1OUMxMi44MTY4IDQwLjY3MzQgMTMuMDcwNSA0MC40NjAyIDEzLjIxMiA0MC4xNzIxQzE0LjU5NyAzNy4zNTI1IDE2Ljg4OTkgMzUuMTUwOSAxOS42NDk1IDM0LjAxMDFDMjAuMDIzNSAzMy44NTU1IDIwLjI4NjcgMzMuNTA1NiAyMC4zMzc1IDMzLjA5NTRDMjAuMzg4NCAzMi42ODUyIDIwLjIxOSAzMi4yNzg4IDE5Ljg5NDggMzIuMDMzMUMxOC4xNzIzIDMwLjcyODEgMTcuMDU1OCAyOC42MjY0IDE3LjA1NTggMjYuMjUzOUMxNy4wNTU4IDIyLjI5MTUgMjAuMTcwMSAxOS4wODkyIDI0IDE5LjA4OTJDMjcuODI5OSAxOS4wODkyIDMwLjk0NDIgMjIuMjkxNSAzMC45NDQyIDI2LjI1MzlDMzAuOTQ0MiAyOC42MjY0IDI5LjgyNzcgMzAuNzI4MSAyOC4xMDUyIDMyLjAzMzFDMjcuNzgxIDMyLjI3ODggMjcuNjExNiAzMi42ODUyIDI3LjY2MjUgMzMuMDk1NEMyNy43MTMzIDMzLjUwNTYgMjcuOTc2NSAzMy44NTU1IDI4LjM1MDUgMzQuMDEwMUMzMS4xMTAxIDM1LjE1MDkgMzMuNDAzIDM3LjM1MjUgMzQuNzg4IDQwLjE3MjFDMzQuOTI5NSA0MC40NjAyIDM1LjE4MzIgNDAuNjczNCAzNS40ODY0IDQwLjc1OUMzNS43ODk3IDQwLjg0NDcgMzYuMTE0MSA0MC43OTQ3IDM2LjM3OTQgNDAuNjIxNUMzNy4yMzEgNDAuMDY1NSAzNy44IDM5LjA4NTQgMzcuOCAzNy45NjgzVjEzLjk0MzZDMzcuOCAxMi4yMDc0IDM2LjQyNzkgMTAuOCAzNC43MzUyIDEwLjhIMTMuMjY0OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgoK);opacity:0}5%{opacity:1}15%{transform:rotateY(0deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02IDBDMi42ODYyOSAwIDAgMi42ODYyOSAwIDZWNTRDMCA1Ny4zMTM3IDIuNjg2MjkgNjAgNiA2MEg5MEM5My4zMTM3IDYwIDk2IDU3LjMxMzcgOTYgNTRWNkM5NiAyLjY4NjI5IDkzLjMxMzcgMCA5MCAwSDZaTTQ4LjY3MTMgMTAuOEM0Ny4zMDY0IDEwLjggNDYuMiAxMS44NzQ1IDQ2LjIgMTMuMkM0Ni4yIDE0LjUyNTUgNDcuMzA2NCAxNS42IDQ4LjY3MTMgMTUuNkg4Mi4xMjg3QzgzLjQ5MzYgMTUuNiA4NC42IDE0LjUyNTUgODQuNiAxMy4yQzg0LjYgMTEuODc0NSA4My40OTM2IDEwLjggODIuMTI4NyAxMC44SDQ4LjY3MTNaTTcyIDQ5LjJDNzIgNDcuODc0NSA3My4wNTgyIDQ2LjggNzQuMzYzNiA0Ni44SDgxLjYzNjRDODIuOTQxOCA0Ni44IDg0IDQ3Ljg3NDUgODQgNDkuMkM4NCA1MC41MjU1IDgyLjk0MTggNTEuNiA4MS42MzY0IDUxLjZINzQuMzYzNkM3My4wNTgyIDUxLjYgNzIgNTAuNTI1NSA3MiA0OS4yWk00OC43MDE5IDMzLjZDNDcuMzIwMSAzMy42IDQ2LjIgMzQuNjc0NSA0Ni4yIDM2QzQ2LjIgMzcuMzI1NSA0Ny4zMjAxIDM4LjQgNDguNzAxOSAzOC40SDY0LjA5ODFDNjUuNDc5OSAzOC40IDY2LjYgMzcuMzI1NSA2Ni42IDM2QzY2LjYgMzQuNjc0NSA2NS40Nzk5IDMzLjYgNjQuMDk4MSAzMy42SDQ4LjcwMTlaTTQ2LjIgMjQuNkM0Ni4yIDIzLjI3NDUgNDcuMzA2NCAyMi4yIDQ4LjY3MTMgMjIuMkg4Mi4xMjg3QzgzLjQ5MzYgMjIuMiA4NC42IDIzLjI3NDUgODQuNiAyNC42Qzg0LjYgMjUuOTI1NSA4My40OTM2IDI3IDgyLjEyODcgMjdINDguNjcxM0M0Ny4zMDY0IDI3IDQ2LjIgMjUuOTI1NSA0Ni4yIDI0LjZaTTEzLjI2NDggMTAuOEMxMS41NzIxIDEwLjggMTAuMiAxMi4yMDc0IDEwLjIgMTMuOTQzNlYzNy45NjgzQzEwLjIgMzkuMDg1NCAxMC43NjkgNDAuMDY1NSAxMS42MjA2IDQwLjYyMTVDMTEuODg1OSA0MC43OTQ3IDEyLjIxMDMgNDAuODQ0NyAxMi41MTM1IDQwLjc1OUMxMi44MTY4IDQwLjY3MzQgMTMuMDcwNSA0MC40NjAyIDEzLjIxMiA0MC4xNzIxQzE0LjU5NyAzNy4zNTI1IDE2Ljg4OTkgMzUuMTUwOSAxOS42NDk1IDM0LjAxMDFDMjAuMDIzNSAzMy44NTU1IDIwLjI4NjcgMzMuNTA1NiAyMC4zMzc1IDMzLjA5NTRDMjAuMzg4NCAzMi42ODUyIDIwLjIxOSAzMi4yNzg4IDE5Ljg5NDggMzIuMDMzMUMxOC4xNzIzIDMwLjcyODEgMTcuMDU1OCAyOC42MjY0IDE3LjA1NTggMjYuMjUzOUMxNy4wNTU4IDIyLjI5MTUgMjAuMTcwMSAxOS4wODkyIDI0IDE5LjA4OTJDMjcuODI5OSAxOS4wODkyIDMwLjk0NDIgMjIuMjkxNSAzMC45NDQyIDI2LjI1MzlDMzAuOTQ0MiAyOC42MjY0IDI5LjgyNzcgMzAuNzI4MSAyOC4xMDUyIDMyLjAzMzFDMjcuNzgxIDMyLjI3ODggMjcuNjExNiAzMi42ODUyIDI3LjY2MjUgMzMuMDk1NEMyNy43MTMzIDMzLjUwNTYgMjcuOTc2NSAzMy44NTU1IDI4LjM1MDUgMzQuMDEwMUMzMS4xMTAxIDM1LjE1MDkgMzMuNDAzIDM3LjM1MjUgMzQuNzg4IDQwLjE3MjFDMzQuOTI5NSA0MC40NjAyIDM1LjE4MzIgNDAuNjczNCAzNS40ODY0IDQwLjc1OUMzNS43ODk3IDQwLjg0NDcgMzYuMTE0MSA0MC43OTQ3IDM2LjM3OTQgNDAuNjIxNUMzNy4yMzEgNDAuMDY1NSAzNy44IDM5LjA4NTQgMzcuOCAzNy45NjgzVjEzLjk0MzZDMzcuOCAxMi4yMDc0IDM2LjQyNzkgMTAuOCAzNC43MzUyIDEwLjhIMTMuMjY0OFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgoK)}20%{transform:rotateY(90deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBIOTBDOTMuMzEzNyAwIDk2IDIuNjg2MjkgOTYgNlY1NEM5NiA1Ny4zMTM3IDkzLjMxMzcgNjAgOTAgNjBINkMyLjY4NjI5IDYwIDAgNTcuMzEzNyAwIDU0VjZaTTEwLjIgMTMuOEMxMC4yIDEyLjQ3NDUgMTEuMzEwMyAxMS40IDEyLjY4IDExLjRIODIuMTJDODMuNDg5NyAxMS40IDg0LjYgMTIuNDc0NSA4NC42IDEzLjhDODQuNiAxNS4xMjU1IDgzLjQ4OTcgMTYuMiA4Mi4xMiAxNi4ySDEyLjY4QzExLjMxMDMgMTYuMiAxMC4yIDE1LjEyNTUgMTAuMiAxMy44Wk04MC43IDQ5LjJDODIuODUzOSA0OS4yIDg0LjYgNDcuNDUzOSA4NC42IDQ1LjNDODQuNiA0My4xNDYxIDgyLjg1MzkgNDEuNCA4MC43IDQxLjRDNzguNTQ2MSA0MS40IDc2LjggNDMuMTQ2MSA3Ni44IDQ1LjNDNzYuOCA0Ny40NTM5IDc4LjU0NjEgNDkuMiA4MC43IDQ5LjJaTTEwLjIgNDYuMkMxMC4yIDQ0Ljg3NDUgMTEuMjk3NSA0My44IDEyLjY1MTQgNDMuOEgzNC4xNDg2QzM1LjUwMjUgNDMuOCAzNi42IDQ0Ljg3NDUgMzYuNiA0Ni4yQzM2LjYgNDcuNTI1NSAzNS41MDI1IDQ4LjYgMzQuMTQ4NiA0OC42SDEyLjY1MTRDMTEuMjk3NSA0OC42IDEwLjIgNDcuNTI1NSAxMC4yIDQ2LjJaTTEyLjY3NDIgMzIuNEMxMS4zMDc3IDMyLjQgMTAuMiAzMy40NzQ1IDEwLjIgMzQuOEMxMC4yIDM2LjEyNTUgMTEuMzA3NyAzNy4yIDEyLjY3NDIgMzcuMkg0My4xMjU4QzQ0LjQ5MjMgMzcuMiA0NS42IDM2LjEyNTUgNDUuNiAzNC44QzQ1LjYgMzMuNDc0NSA0NC40OTIzIDMyLjQgNDMuMTI1OCAzMi40SDEyLjY3NDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)}25%{transform:rotateY(-15deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBIOTBDOTMuMzEzNyAwIDk2IDIuNjg2MjkgOTYgNlY1NEM5NiA1Ny4zMTM3IDkzLjMxMzcgNjAgOTAgNjBINkMyLjY4NjI5IDYwIDAgNTcuMzEzNyAwIDU0VjZaTTEwLjIgMTMuOEMxMC4yIDEyLjQ3NDUgMTEuMzEwMyAxMS40IDEyLjY4IDExLjRIODIuMTJDODMuNDg5NyAxMS40IDg0LjYgMTIuNDc0NSA4NC42IDEzLjhDODQuNiAxNS4xMjU1IDgzLjQ4OTcgMTYuMiA4Mi4xMiAxNi4ySDEyLjY4QzExLjMxMDMgMTYuMiAxMC4yIDE1LjEyNTUgMTAuMiAxMy44Wk04MC43IDQ5LjJDODIuODUzOSA0OS4yIDg0LjYgNDcuNDUzOSA4NC42IDQ1LjNDODQuNiA0My4xNDYxIDgyLjg1MzkgNDEuNCA4MC43IDQxLjRDNzguNTQ2MSA0MS40IDc2LjggNDMuMTQ2MSA3Ni44IDQ1LjNDNzYuOCA0Ny40NTM5IDc4LjU0NjEgNDkuMiA4MC43IDQ5LjJaTTEwLjIgNDYuMkMxMC4yIDQ0Ljg3NDUgMTEuMjk3NSA0My44IDEyLjY1MTQgNDMuOEgzNC4xNDg2QzM1LjUwMjUgNDMuOCAzNi42IDQ0Ljg3NDUgMzYuNiA0Ni4yQzM2LjYgNDcuNTI1NSAzNS41MDI1IDQ4LjYgMzQuMTQ4NiA0OC42SDEyLjY1MTRDMTEuMjk3NSA0OC42IDEwLjIgNDcuNTI1NSAxMC4yIDQ2LjJaTTEyLjY3NDIgMzIuNEMxMS4zMDc3IDMyLjQgMTAuMiAzMy40NzQ1IDEwLjIgMzQuOEMxMC4yIDM2LjEyNTUgMTEuMzA3NyAzNy4yIDEyLjY3NDIgMzcuMkg0My4xMjU4QzQ0LjQ5MjMgMzcuMiA0NS42IDM2LjEyNTUgNDUuNiAzNC44QzQ1LjYgMzMuNDc0NSA0NC40OTIzIDMyLjQgNDMuMTI1OCAzMi40SDEyLjY3NDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)}30%{transform:rotateY(0deg)}95%{opacity:1}100%{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA5NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDZDMCAyLjY4NjI5IDIuNjg2MjkgMCA2IDBIOTBDOTMuMzEzNyAwIDk2IDIuNjg2MjkgOTYgNlY1NEM5NiA1Ny4zMTM3IDkzLjMxMzcgNjAgOTAgNjBINkMyLjY4NjI5IDYwIDAgNTcuMzEzNyAwIDU0VjZaTTEwLjIgMTMuOEMxMC4yIDEyLjQ3NDUgMTEuMzEwMyAxMS40IDEyLjY4IDExLjRIODIuMTJDODMuNDg5NyAxMS40IDg0LjYgMTIuNDc0NSA4NC42IDEzLjhDODQuNiAxNS4xMjU1IDgzLjQ4OTcgMTYuMiA4Mi4xMiAxNi4ySDEyLjY4QzExLjMxMDMgMTYuMiAxMC4yIDE1LjEyNTUgMTAuMiAxMy44Wk04MC43IDQ5LjJDODIuODUzOSA0OS4yIDg0LjYgNDcuNDUzOSA4NC42IDQ1LjNDODQuNiA0My4xNDYxIDgyLjg1MzkgNDEuNCA4MC43IDQxLjRDNzguNTQ2MSA0MS40IDc2LjggNDMuMTQ2MSA3Ni44IDQ1LjNDNzYuOCA0Ny40NTM5IDc4LjU0NjEgNDkuMiA4MC43IDQ5LjJaTTEwLjIgNDYuMkMxMC4yIDQ0Ljg3NDUgMTEuMjk3NSA0My44IDEyLjY1MTQgNDMuOEgzNC4xNDg2QzM1LjUwMjUgNDMuOCAzNi42IDQ0Ljg3NDUgMzYuNiA0Ni4yQzM2LjYgNDcuNTI1NSAzNS41MDI1IDQ4LjYgMzQuMTQ4NiA0OC42SDEyLjY1MTRDMTEuMjk3NSA0OC42IDEwLjIgNDcuNTI1NSAxMC4yIDQ2LjJaTTEyLjY3NDIgMzIuNEMxMS4zMDc3IDMyLjQgMTAuMiAzMy40NzQ1IDEwLjIgMzQuOEMxMC4yIDM2LjEyNTUgMTEuMzA3NyAzNy4yIDEyLjY3NDIgMzcuMkg0My4xMjU4QzQ0LjQ5MjMgMzcuMiA0NS42IDM2LjEyNTUgNDUuNiAzNC44QzQ1LjYgMzMuNDc0NSA0NC40OTIzIDMyLjQgNDMuMTI1OCAzMi40SDEyLjY3NDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);border-radius:0;-webkit-backdrop-filter:none;backdrop-filter:none;background-color:transparent;opacity:0}}:host .reticle{box-sizing:border-box;position:relative;width:100%;height:100%;border-radius:50%;background-color:rgba(107, 114, 128, 0.3);background-position:center;background-size:contain;background-repeat:no-repeat;-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));transition:all 0.4s ease}:host .reticle__cursor{box-sizing:border-box;display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;border-radius:50%;border-color:transparent;border-style:solid;border-width:4px;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);background-position:center;background-size:contain;background-repeat:no-repeat}:host .reticle__cursor::before{content:\"\";position:absolute;width:4px;height:4px;top:50%;left:50%;transition:all 0.2s ease;transform-origin:center;transform:translate(-50%, -50%);background-color:#ffffff;border-radius:50%}:host .reticle__cursor::after{content:\"\";position:absolute;top:-4px;left:-4px;width:calc(50% + 4px);height:calc(50% + 4px);display:block;border-left-width:4px;border-left-style:solid;border-left-color:#ffffff;border-top-width:4px;border-top-style:solid;border-top-color:#ffffff;border-top-left-radius:100%;transition:all 0.2s ease;opacity:0;filter:drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))}:host .reticle__el{box-sizing:border-box}:host .reticle__done{display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);transform-origin:center;transform:rotate(15deg) translateY(-5%);opacity:0}:host .reticle.is-default~.label[data-message=is-default],:host .reticle.is-detection~.label[data-message=is-detection],:host .reticle.is-classification~.label[data-message=is-classification],:host .reticle.is-done~.label[data-message=is-done],:host .reticle.is-done-all~.label[data-message=is-done-all],:host .reticle.is-flip~.label[data-message=is-flip],:host .reticle.is-error-move-farther~.label[data-message=is-error-move-farther],:host .reticle.is-error-move-closer~.label[data-message=is-error-move-closer],:host .reticle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host .reticle.is-default .reticle__cursor{animation:reticle-rotation 1000ms ease-in-out infinite;border-style:none}:host .reticle.is-default .reticle__el{position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host .reticle.is-default .reticle__el::after,:host .reticle.is-default .reticle__el::before{content:\"\";position:absolute;display:block;width:100%;height:100%}:host .reticle.is-default .reticle__el:nth-child(1){top:0;left:0}:host .reticle.is-default .reticle__el:nth-child(1)::after,:host .reticle.is-default .reticle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-top-left-radius:100%;transform-origin:bottom right}:host .reticle.is-default .reticle__el:nth-child(1)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(1)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2){top:0;right:0}:host .reticle.is-default .reticle__el:nth-child(2)::after,:host .reticle.is-default .reticle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-top-right-radius:100%;transform-origin:bottom left}:host .reticle.is-default .reticle__el:nth-child(2)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3){bottom:0;right:0}:host .reticle.is-default .reticle__el:nth-child(3)::after,:host .reticle.is-default .reticle__el:nth-child(3)::before{bottom:0;right:0;transform-origin:top left;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-bottom-right-radius:100%}:host .reticle.is-default .reticle__el:nth-child(3)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4){bottom:0;left:0}:host .reticle.is-default .reticle__el:nth-child(4)::after,:host .reticle.is-default .reticle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-bottom-left-radius:100%;transform-origin:top right}:host .reticle.is-default .reticle__el:nth-child(4)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4)::before{transform:rotate(-67.5deg)}:host .reticle.is-detection .reticle__cursor{border-color:rgba(255, 255, 255, 0.75)}:host .reticle.is-classification .reticle__cursor{animation:reticle-rotation 250ms cubic-bezier(0.4, 0.02, 1, 1) infinite;border-style:solid;border-color:rgba(255, 255, 255, 0.25)}:host .reticle.is-classification .reticle__cursor::after{opacity:1}:host .reticle.is-flip{animation:reticle-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-flip .reticle__cursor{transform-style:preserve-3d;animation:reticle-cursor-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-done{display:none}:host .reticle.is-done-all{background-color:#ffffff;box-shadow:0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05);transition:all 125ms cubic-bezier(0.4, 0.02, 1, 1)}:host .reticle.is-done-all .reticle__done{transform:rotate(0) translateY(0);opacity:1}:host .reticle.is-done-all .reticle__cursor::before{width:150vw;height:150vh;opacity:0;transition:all 200ms ease}:host .reticle.is-error-move-farther{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-farther .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:40%;height:40%;left:30%;top:30%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-move-closer{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-closer .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:60%;height:60%;left:20%;top:20%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-adjust-angle{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-adjust-angle .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);animation:reticle-horizontal-shrink 600ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}@keyframes rectangle-shrink-animation{0%{transform:scale(1)}50%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes scanning-line-animation{0%{top:-60%}45%{transform:matrix(1, 0, 0, 1, 0, 0)}50%{top:120%;transform:matrix(1, 0, 0, -1, 0, 0)}95%{transform:matrix(1, 0, 0, -1, 0, 0)}100%{top:-60%;transform:matrix(1, 0, 0, 1, 0, 0)}}:host #barcode .rectangle{width:100%;height:100%;box-sizing:border-box;position:relative;background-color:transparent;background-position:center;background-repeat:no-repeat;transition:all 0.3s ease-in}:host #barcode .rectangle__cursor{width:100%;height:100%;border-radius:8px;position:relative}:host #barcode .rectangle__el{box-sizing:border-box;position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host #barcode .rectangle__el::after,:host #barcode .rectangle__el::before{content:\"\";position:absolute;display:block;width:32px;height:32px}:host #barcode .rectangle__el:nth-child(1){top:0;left:0}:host #barcode .rectangle__el:nth-child(1)::after,:host #barcode .rectangle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid white;border-left:4px solid white;border-top-left-radius:8px;box-shadow:inset 3px 3px 8px -6px rgba(0, 0, 0, 0.2), -3px -3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle__el:nth-child(2){top:0;right:0}:host #barcode .rectangle__el:nth-child(2)::after,:host #barcode .rectangle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid white;border-right:4px solid white;border-top-right-radius:8px;box-shadow:inset -3px 3px 8px -6px rgba(0, 0, 0, 0.2), 3px -3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle__el:nth-child(3){bottom:0;right:0}:host #barcode .rectangle__el:nth-child(3)::after,:host #barcode .rectangle__el:nth-child(3)::before{bottom:0;right:0;border-bottom:4px solid white;border-right:4px solid white;border-bottom-right-radius:8px;box-shadow:inset -3px -3px 8px -6px rgba(0, 0, 0, 0.2), 3px 3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle__el:nth-child(4){bottom:0;left:0}:host #barcode .rectangle__el:nth-child(4)::after,:host #barcode .rectangle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid white;border-left:4px solid white;border-bottom-left-radius:8px;box-shadow:inset 3px -3px 8px -6px rgba(0, 0, 0, 0.2), -3px 3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle.is-default~.label[data-message=is-default],:host #barcode .rectangle.is-detection~.label[data-message=is-detection],:host #barcode .rectangle.is-classification~.label[data-message=is-classification],:host #barcode .rectangle.is-done~.label[data-message=is-done],:host #barcode .rectangle.is-done-all~.label[data-message=is-done-all],:host #barcode .rectangle.is-flip~.label[data-message=is-flip],:host #barcode .rectangle.is-error-move-farther~.label[data-message=is-error-move-farther],:host #barcode .rectangle.is-error-move-closer~.label[data-message=is-error-move-closer],:host #barcode .rectangle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host #barcode .rectangle.is-done,:host #barcode .rectangle.is-done-all{-webkit-animation-delay:0;-webkit-animation-duration:250ms;-webkit-animation-name:rectangle-shrink-animation;-moz-animation-delay:0;-moz-animation-duration:250ms;-moz-animation-name:rectangle-shrink-animation;animation-delay:0;animation-duration:250ms;animation-name:rectangle-shrink-animation}:host .scanning-line{opacity:0;visibility:hidden;position:absolute;width:100%;height:115px;left:0px;top:-125px;background:radial-gradient(100% 100% at 49.85% 100%, #ffffff 0%, rgba(255, 255, 255, 0) 100%);filter:blur(var(--mb-blur-scanning-line))}:host .scanning-line.is-active{opacity:1;visibility:visible;animation:scanning-line-animation 2400ms cubic-bezier(0.13, 0.71, 1, 0.82) infinite}*::after,*::before{box-sizing:border-box}:host{display:block}:host .gradient-overlay{position:absolute;width:100%;height:112px;background:linear-gradient(180deg, rgba(0, 0, 0, 0.35625) 0%, rgba(0, 0, 0, 0.25) 20.83%, rgba(0, 0, 0, 0) 100%)}:host .gradient-overlay.bottom{bottom:0;transform:matrix(1, 0, 0, -1, 0, 0)}:host(.is-error) mb-camera-toolbar{display:none}:host::after{width:124px;height:58px;position:absolute;bottom:10px;left:calc(50% - 62px);background:no-repeat center url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCA4NSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjA4NzcgNi41NzIwNEMyMS40MDE3IDYuNTcyMDQgMjIuMjY1NyA1LjY4MTA0IDIyLjI2NTcgNC40MTIwNEMyMi4yNjU3IDMuMTI1MDQgMjEuNDEwNyAyLjI2MTA0IDIwLjA4NzcgMi4yNjEwNEgxNy40ODY3VjguODQwMDRIMTguNjM4N1Y2LjU3MjA0SDIwLjA4NzdaTTE5Ljg2MjcgMy4yODcwNEMyMC42Mjc3IDMuMjg3MDQgMjEuMDU5NyAzLjY4MzA0IDIxLjA1OTcgNC40MDMwNEMyMS4wNTk3IDUuMTIzMDQgMjAuNjM2NyA1LjU0NjA0IDE5Ljg0NDcgNS41NDYwNEgxOC42Mzg3VjMuMjg3MDRIMTkuODYyN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMi43NzIgNi42MDgwNEMyMi43NzIgNy45OTQwNCAyMy43NzEgOC45NDgwNCAyNS4xNDggOC45NDgwNEMyNi41MjUgOC45NDgwNCAyNy41MjQgNy45OTQwNCAyNy41MjQgNi42MDgwNEMyNy41MjQgNS4yMjIwNCAyNi41MjUgNC4yNjgwNCAyNS4xNDggNC4yNjgwNEMyMy43NzEgNC4yNjgwNCAyMi43NzIgNS4yMjIwNCAyMi43NzIgNi42MDgwNFpNMjMuODcgNi42MDgwNEMyMy44NyA1Ljc5ODA0IDI0LjM5MiA1LjI0OTA0IDI1LjE0OCA1LjI0OTA0QzI1LjkwNCA1LjI0OTA0IDI2LjQyNiA1Ljc5ODA0IDI2LjQyNiA2LjYwODA0QzI2LjQyNiA3LjQxODA0IDI1LjkwNCA3Ljk2NzA0IDI1LjE0OCA3Ljk2NzA0QzI0LjM5MiA3Ljk2NzA0IDIzLjg3IDcuNDE4MDQgMjMuODcgNi42MDgwNFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yOS4zMzU2IDguODQwMDRIMzAuNDA2NkwzMS4wMTg2IDYuOTMyMDRDMzEuMjQzNiA2LjIwMzA0IDMxLjMyNDYgNS44ODgwNCAzMS4zNjk2IDUuNjgxMDRDMzEuNDA1NiA1LjkwNjA0IDMxLjUwNDYgNi4zMjkwNCAzMS42ODQ2IDYuOTE0MDRMMzIuMjk2NiA4Ljg0MDA0SDMzLjMyMjZMMzQuODYxNiA0LjM5NDA0SDMzLjcwMDZMMzMuMTA2NiA2LjMwMjA0QzMzLjAyNTYgNi41ODEwNCAzMi44ODE2IDcuMTEyMDQgMzIuODA5NiA3LjQ0NTA0QzMyLjc1NTYgNy4xNDgwNCAzMi41NzU2IDYuNDgyMDQgMzIuNTIxNiA2LjMwMjA0TDMxLjkyNzYgNC4zOTQwNEgzMC44MTE2TDMwLjE5OTYgNi4zMDIwNEMzMC4wNTU2IDYuNzQzMDQgMjkuOTc0NiA3LjAyMjA0IDI5Ljg5MzYgNy40NTQwNEMyOS44MTI2IDcuMDQwMDQgMjkuNzIyNiA2LjY1MzA0IDI5LjYyMzYgNi4zMDIwNEwyOS4wMzg2IDQuMzk0MDRIMjcuODk1NkwyOS4zMzU2IDguODQwMDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzcuNDc1OCA4Ljk1NzA0QzM4LjYzNjggOC45NTcwNCAzOS40NDY4IDguMzcyMDQgMzkuNjM1OCA3LjQwMDA0SDM4LjYxODhDMzguNDkyOCA3LjgyMzA0IDM4LjA5NjggOC4wNTcwNCAzNy40OTM4IDguMDU3MDRDMzYuNzY0OCA4LjA1NzA0IDM2LjM1MDggNy42NjEwNCAzNi4yNjk4IDYuODc4MDRMMzkuNjE3OCA2Ljg2OTA0VjYuNTM2MDRDMzkuNjE3OCA1LjE1MDA0IDM4Ljc3MTggNC4yNTkwNCAzNy40Mzk4IDQuMjU5MDRDMzYuMTM0OCA0LjI1OTA0IDM1LjIyNTggNS4yMjIwNCAzNS4yMjU4IDYuNjE3MDRDMzUuMjI1OCA3Ljk5NDA0IDM2LjE1MjggOC45NTcwNCAzNy40NzU4IDguOTU3MDRaTTM3LjQ0ODggNS4xNTkwNEMzOC4xMDU4IDUuMTU5MDQgMzguNTI4OCA1LjU2NDA0IDM4LjUyODggNi4xNzYwNEgzNi4yOTY4QzM2LjQwNDggNS41MTAwNCAzNi44MDA4IDUuMTU5MDQgMzcuNDQ4OCA1LjE1OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTQzLjQ2NjUgNC4zNzYwNEM0My4yODY1IDQuMzMxMDQgNDMuMTMzNSA0LjMxMzA0IDQyLjk4MDUgNC4zMTMwNEM0Mi4zODY1IDQuMzEzMDQgNDEuOTYzNSA0LjYxMDA0IDQxLjc3NDUgNS4wNTEwNEw0MS43MTE1IDQuNDAzMDRINDAuNjc2NVY4Ljg0MDA0SDQxLjc3NDVWNi42ODAwNEM0MS43NzQ1IDUuODE2MDQgNDIuMjY5NSA1LjM5MzA0IDQzLjA2MTUgNS4zOTMwNEg0My40NjY1VjQuMzc2MDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDYuMjI5MyA4Ljk1NzA0QzQ3LjM5MDMgOC45NTcwNCA0OC4yMDAzIDguMzcyMDQgNDguMzg5MyA3LjQwMDA0SDQ3LjM3MjNDNDcuMjQ2MyA3LjgyMzA0IDQ2Ljg1MDMgOC4wNTcwNCA0Ni4yNDczIDguMDU3MDRDNDUuNTE4MyA4LjA1NzA0IDQ1LjEwNDMgNy42NjEwNCA0NS4wMjMzIDYuODc4MDRMNDguMzcxMyA2Ljg2OTA0VjYuNTM2MDRDNDguMzcxMyA1LjE1MDA0IDQ3LjUyNTMgNC4yNTkwNCA0Ni4xOTMzIDQuMjU5MDRDNDQuODg4MyA0LjI1OTA0IDQzLjk3OTMgNS4yMjIwNCA0My45NzkzIDYuNjE3MDRDNDMuOTc5MyA3Ljk5NDA0IDQ0LjkwNjMgOC45NTcwNCA0Ni4yMjkzIDguOTU3MDRaTTQ2LjIwMjMgNS4xNTkwNEM0Ni44NTkzIDUuMTU5MDQgNDcuMjgyMyA1LjU2NDA0IDQ3LjI4MjMgNi4xNzYwNEg0NS4wNTAzQzQ1LjE1ODMgNS41MTAwNCA0NS41NTQzIDUuMTU5MDQgNDYuMjAyMyA1LjE1OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUxLjI1NzEgOC45NTcwNEM1MS45MzIxIDguOTU3MDQgNTIuNTA4MSA4LjY2MDA0IDUyLjc3ODEgOC4xNDcwNEw1Mi44NTAxIDguODQwMDRINTMuODU4MVYyLjE0NDA0SDUyLjc2OTFWNC45NjEwNEM1Mi40OTAxIDQuNTIwMDQgNTEuOTQxMSA0LjI1OTA0IDUxLjMyMDEgNC4yNTkwNEM0OS45NzkxIDQuMjU5MDQgNDkuMTY5MSA1LjI0OTA0IDQ5LjE2OTEgNi42MzUwNEM0OS4xNjkxIDguMDEyMDQgNDkuOTcwMSA4Ljk1NzA0IDUxLjI1NzEgOC45NTcwNFpNNTEuNTAwMSA3Ljk0OTA0QzUwLjczNTEgNy45NDkwNCA1MC4yNjcxIDcuMzkxMDQgNTAuMjY3MSA2LjU5OTA0QzUwLjI2NzEgNS44MDcwNCA1MC43MzUxIDUuMjQwMDQgNTEuNTAwMSA1LjI0MDA0QzUyLjI2NTEgNS4yNDAwNCA1Mi43NjAxIDUuNzk4MDQgNTIuNzYwMSA2LjU5OTA0QzUyLjc2MDEgNy40MDAwNCA1Mi4yNjUxIDcuOTQ5MDQgNTEuNTAwMSA3Ljk0OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTU4LjgwNTEgOC44NDAwNEw1OC44NzcxIDguMTQ3MDRDNTkuMTM4MSA4LjY2MDA0IDU5LjcwNTEgOC45NTcwNCA2MC4zNzExIDguOTU3MDRDNjEuNjQ5MSA4Ljk1NzA0IDYyLjQ4NjEgOC4wMTIwNCA2Mi40ODYxIDYuNjQ0MDRDNjIuNDg2MSA1LjI0MDA0IDYxLjcxMjEgNC4yNTAwNCA2MC40NDMxIDQuMjUwMDRDNTkuNzY4MSA0LjI1MDA0IDU5LjE3NDEgNC41NDcwNCA1OC44ODYxIDUuMDQyMDRWMi4xNDQwNEg1Ny43ODgxVjguODQwMDRINTguODA1MVpNNTguODk1MSA2LjU5OTA0QzU4Ljg5NTEgNS43OTgwNCA1OS4zOTAxIDUuMjQwMDQgNjAuMTQ2MSA1LjI0MDA0QzYwLjkyMDEgNS4yNDAwNCA2MS4zNzkxIDUuODA3MDQgNjEuMzc5MSA2LjU5OTA0QzYxLjM3OTEgNy4zOTEwNCA2MC45MjAxIDcuOTQ5MDQgNjAuMTQ2MSA3Ljk0OTA0QzU5LjM5MDEgNy45NDkwNCA1OC44OTUxIDcuNDAwMDQgNTguODk1MSA2LjU5OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTYyLjk4NjQgMTAuOTAxQzYzLjIyOTQgMTAuOTY0IDYzLjQ5OTQgMTEgNjMuODA1NCAxMUM2NC41MzQ0IDExIDY1LjAwMjQgMTAuNjU4IDY1LjMzNTQgOS44MzAwNEw2Ny41MTM0IDQuMzk0MDRINjYuMzc5NEw2NS4xNzM0IDcuNjM0MDRMNjQuMDMwNCA0LjM5NDA0SDYyLjg2OTRMNjQuNjYwNCA5LjAyOTA0TDY0LjUzNDQgOS4zNjIwNEM2NC4zNDU0IDkuODg0MDQgNjQuMDc1NCA5Ljk4MzA0IDYzLjY0MzQgOS45ODMwNEg2Mi45ODY0VjEwLjkwMVoiIGZpbGw9IndoaXRlIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF81NjZfMTU1NDMpIj4KPHBhdGggZD0iTTQuODE2MzMgMjIuNTk1OUwxLjkyNTE5IDE1LjE2MzZIMFYyNC44MzY2SDEuMzEzNzdWMTcuMjI4OUw0LjMwOTkzIDI0Ljg3NzRINS4yNjg0N0w4LjI5MTQxIDE3LjE2MDhWMjQuODM2Nkg5LjY0NTcxVjE1LjE2MzZINy43MDc0N0w0LjgxNjMzIDIyLjU5NTlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTMuNjUyOSAxNS4xNjM2SDEyLjIzMTNWMjQuODM2NkgxMy42NTI5VjE1LjE2MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzIuNjYyOCAxOS45OTEzQzMzLjA1MDIgMTkuNDQ3OSAzMy4yNTY5IDE4Ljc5MjcgMzMuMjUyNyAxOC4xMjE0QzMzLjI1MjcgMTcuMzI5NyAzMi45MTI2IDE2LjU5MTQgMzIuMjk0OCAxNi4wNDE3QzMxLjY1NzcgMTUuNDc1NiAzMC43NzIxIDE1LjE2NSAyOS43OTggMTUuMTY1SDI1Ljg3MzdWMjQuODM4SDI3LjI5NTNWMjEuMzc4NkgyOS41OTc5TDMxLjYwNjYgMjQuODM2NkgzMy4yOTM5TDMxLjE0NDIgMjEuMTQwOUMzMS43NTA3IDIwLjkxODMgMzIuMjc4OSAyMC41MTgzIDMyLjY2MjggMTkuOTkxM1pNMzEuODAzOSAxOC4xMzVDMzEuODA3MSAxOC4zODg5IDMxLjc2MDIgMTguNjQwOSAzMS42NjYgMTguODc1OUMzMS41NzE3IDE5LjExMSAzMS40MzIgMTkuMzI0NSAzMS4yNTUyIDE5LjUwMzdDMzAuODkzMyAxOS44NjU4IDMwLjM4NTUgMjAuMDY1MiAyOS44MjUyIDIwLjA2NTJIMjcuMjkzNVYxNi40OTE3SDI5LjgyNTJDMzAuOTUzMiAxNi40OTE3IDMxLjgwMzkgMTcuMTk3NyAzMS44MDM5IDE4LjEzNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zOS4yODAzIDE1QzM3Ljk0NjEgMTUgMzYuNzQzIDE1LjUyNDYgMzUuODg4IDE2LjQ3NjZDMzUuMDY1NSAxNy4zOTQ1IDM0LjYxMjMgMTguNjQ1OSAzNC42MTIzIDE5Ljk5OThDMzQuNjEyMyAyMS4zNTM4IDM1LjA2NTUgMjIuNjEyIDM1Ljg4OCAyMy41Mjg1QzM2Ljc0MDEgMjQuNDc3MiAzNy45NDQ3IDI0Ljk5ODYgMzkuMjgwMyAyNC45OTg2QzQwLjYyMTUgMjQuOTk4NiA0MS44MzA2IDI0LjQ3NTggNDIuNjg0MiAyMy41Mjg1QzQzLjUwODEgMjIuNjEzIDQzLjk2MTYgMjEuMzU5OSA0My45NjE2IDE5Ljk5OThDNDMuOTYxNiAxOC42Mzk4IDQzLjUwODEgMTcuMzkzOCA0Mi42ODQ1IDE2LjQ3NjZDNDEuODI5MiAxNS41MjM1IDQwLjYyMDEgMTUgMzkuMjgwMyAxNVpNMzkuMjgwMyAyMy42NDQ2QzM4Ljg0MjQgMjMuNjQ2MyAzOC40MDkzIDIzLjU1MTcgMzguMDEwNyAyMy4zNjc0QzM3LjYxMjEgMjMuMTgzIDM3LjI1NzMgMjIuOTEzMiAzNi45NzA2IDIyLjU3NjVDMzYuMzg0MiAyMS44OTkxIDM2LjA2MSAyMC45ODM3IDM2LjA2MSAxOS45OTk4QzM2LjA2MSAxOS4wMTU5IDM2LjM4NDIgMTguMTA3NyAzNi45NzA2IDE3LjQyODJDMzcuNTY3OSAxNi43MzYyIDM4LjM4OCAxNi4zNTUgMzkuMjgwMyAxNi4zNTVDNDAuMTcyNiAxNi4zNTUgNDAuOTk2MSAxNi43MzYyIDQxLjU5NyAxNy40Mjg2QzQyLjE4NzYgMTguMTA5OCA0Mi41MTMyIDE5LjAyMiA0Mi41MTMyIDE5Ljk5OThDNDIuNTEzMiAyMC45Nzc2IDQyLjE4OCAyMS44OTc3IDQxLjU5NyAyMi41NzY1QzQxLjMwODcgMjIuOTEzMiA0MC45NTI3IDIzLjE4MjkgNDAuNTUyOSAyMy4zNjcyQzQwLjE1MzIgMjMuNTUxNSAzOS43MTkxIDIzLjY0NjEgMzkuMjgwMyAyMy42NDQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUxLjc1NCAxOS43NjI1QzUyLjU4MzIgMTkuMjk2NCA1My4wNzU5IDE4LjQ3ODkgNTMuMDc1OSAxNy41NjMxQzUzLjA3NTkgMTYuMTUwMyA1MS44NDI1IDE1LjE2MzYgNTAuMDgwNSAxNS4xNjM2SDQ1LjkxMTVWMjQuODM2Nkg1MC4yODEzQzUyLjAxNzMgMjQuODM2NiA1My4yNzY4IDIzLjY2MTIgNTMuMjc2OCAyMi4wNDE5QzUzLjI3ODIgMjEuMDcwNiA1Mi42OTYgMjAuMjAzMiA1MS43NTQgMTkuNzYyNVpNNTAuMzIyNiAyMy41MDg4SDQ3LjMzMjRWMjAuNTA3Nkg1MC4xMTkyQzUxLjE0MTIgMjAuNTA3NiA1MS44Mjg0IDIxLjA2NDUgNTEuODI4NCAyMS44OTI4QzUxLjgyOTUgMjIuODc0MSA1MS4yMzc4IDIzLjUwODggNTAuMzIyNiAyMy41MDg4Wk00OS45NTg1IDE5LjIwNkg0Ny4zMzI0VjE2LjQ5MTdINTAuMTE5MkM1MS4wMzU1IDE2LjQ5MTcgNTEuNjI2MSAxNi45NzY1IDUxLjYyNjEgMTcuNzI3QzUxLjYyNzIgMTguNDYzOCA1MS4xMTEyIDE5LjIwNjcgNDkuOTU4NSAxOS4yMDY3VjE5LjIwNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01Ni43NDYyIDE1LjE2MzZINTUuMzI0MlYyNC44MzY2SDYxLjU0NTZWMjMuNDgxNkg1Ni43NDYyVjE1LjE2MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNjQuNTUzOCAxNS4xNjM2SDYzLjEzMThWMjQuODM2Nkg2NC41NTM4VjE1LjE2MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNzMuNDg0NCAyMi4zMjAyTDY4LjUyOTkgMTUuMTkzN0w2OC41MDg4IDE1LjE2MzZINjcuMTM0NFYyNC44MzY2SDY4LjQ3NTNWMTcuMzI1N0w3My42OTM3IDI0LjgzNjZINzQuODI1M1YxNS4xNjM2SDczLjQ4NDRWMjIuMzIwMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04MS4xNzc4IDE5LjQxOTRMODQuODk4NSAxNS4xNjM2SDgzLjE1OTRMNzguODI1OSAyMC4xMTE0VjE1LjE2MzZINzcuNDAzOVYyNC44MzY2SDc4LjgyNTlWMjIuMDI4Nkw4MC4yMDUyIDIwLjQ2ODJMODMuMjc2MSAyNC44MzY2SDg1TDgxLjE3NzggMTkuNDE5NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMi45MTM0IDIxLjU2MzlDMjIuMjc5MSAyMy4wMzE4IDIxLjQ2NTQgMjMuNjU4MyAyMC4xODY5IDIzLjY1ODNDMTkuMzEzMyAyMy42NTgzIDE4LjUxMjkgMjMuMjc4NSAxNy45MzM2IDIyLjU4OTRDMTcuMzYzIDIxLjkxMDYgMTcuMDQ4NyAyMC45OTA5IDE3LjA0ODcgMTkuOTk5OEMxNy4wNDg3IDE5LjAxNjMgMTcuMzU2IDE4LjEwMjcgMTcuOTEzNSAxNy40MjcxQzE4LjQ4NDQgMTYuNzM1OCAxOS4yNzczIDE2LjM1NSAyMC4xNDY3IDE2LjM1NUMyMS4zMjQ0IDE2LjM1NSAyMi4xODU3IDE2Ljk1MiAyMi43Nzk5IDE4LjE4MDFMMjIuODA1MyAxOC4yMzIxSDI0LjI5MjhMMjQuMjg1NyAxOC4xOTAxQzI0LjI1MDUgMTcuOTg2NSAyNC4xNzcyIDE3Ljc5NTcgMjQuMTA2MyAxNy42MDg2TDI0LjA4MzQgMTcuNTQ4M0MyMy43NzkzIDE2Ljc3ODcgMjMuMjQ3MiAxNi4xMjQ1IDIyLjU2MSAxNS42NzY2QzIxLjg3NTYgMTUuMjI3NyAyMS4wNDk2IDE1IDIwLjEwNjIgMTVDMTguODE2NCAxNSAxNy42NTI3IDE1LjUyNDYgMTYuODI4OCAxNi40Nzc2QzE2LjAzNjIgMTcuMzk0OCAxNS41OTk2IDE4LjY0NTkgMTUuNTk5NiAxOS45OTk4QzE1LjU5OTYgMjEuMzcyIDE2LjAzODcgMjIuNjI4NSAxNi44MzU5IDIzLjUzNzhDMTcuNjc0NiAyNC40OTQ0IDE4LjgyMzggMjUgMjAuMTU5NyAyNUMyMS4wOTU3IDI1IDIxLjkxODIgMjQuNzUzMyAyMi42MDQ3IDI0LjI2NzFDMjIuNzIwMSAyNC4xODU0IDIyLjgzMTEgMjQuMDk3NSAyMi45MzcxIDI0LjAwMzVDMjMuNjMzMSAyMy4zODc1IDI0LjE2MDMgMjIuNTExNiAyNC4zNDY3IDIxLjY2TDI0LjM1MTMgMjEuNjM3N0MyNC4zNTc2IDIxLjYwODMgMjQuMzYzMiAyMS41Nzg5IDI0LjM2ODIgMjEuNTQ5NUwyNC4zNzUyIDIxLjUwNzZIMjIuOTM2TDIyLjkxMzQgMjEuNTYzOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNTY2XzE1NTQzIj4KPHJlY3Qgd2lkdGg9Ijg1IiBoZWlnaHQ9IjEwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxNSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K\");background-size:100%;content:\" \"}:host(.no-overlay)::after{display:none}:host #card-identity,:host #barcode{position:absolute;top:0;bottom:0;left:0;right:0;display:none}:host #card-identity.visible,:host #barcode.visible{display:block}:host .message{display:block;opacity:0;visibility:hidden;position:absolute;transform-origin:center;transform:translate(-50%, 0);margin:0;padding:8px 12px;font-size:1em;font-weight:600;text-align:center;text-shadow:0px 1px 4px rgba(0, 0, 0, 0.1);white-space:nowrap;color:#fff;background-color:rgba(107, 114, 128, 0.7);-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));border-radius:8px;transition:all 200ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .message.is-active{opacity:1;visibility:visible;margin:8px 0 0 0}:host #card-identity .reticle-container{position:absolute;top:50%;left:50%;width:var(--mb-reticle-size);height:var(--mb-reticle-size);transform-origin:center;transform:translate(-50%, -50%);perspective:600px}:host #card-identity .reticle-container .message{top:100%;left:50%}:host #barcode .rectangle-container{position:absolute;top:112px;left:20px;width:calc(100% - 40px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}@media only screen and (min-width: 568px) and (orientation: landscape){:host::after{bottom:40px;left:unset;right:5%}:host .gradient-overlay{height:88px}:host #barcode .rectangle-container{top:88px;left:186px;width:calc(100% - 372px);height:calc(100% - 128px)}:host #barcode .rectangle-container .message{top:-50px;left:50%}}@media only screen and (min-width: 768px) and (orientation: portrait){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:50px;width:calc(100% - 100px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}}@media only screen and (min-width: 1024px) and (orientation: landscape){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:50px;width:calc(100% - 100px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}}@media only screen and (min-width: 1280px){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:188px;width:calc(100% - 374px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}}@media only screen and (min-width: 1440px){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:188px;width:calc(100% - 374px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}}@media only screen and (min-width: 1920px){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:188px;width:calc(100% - 374px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}}@media only screen and (max-height: 299px) and (orientation: landscape){:host::after{bottom:10px;left:unset;right:20px}:host .gradient-overlay{height:88px}}@media only screen and (min-height: 300px) and (max-height: 499px) and (orientation: landscape){:host::after{bottom:30px;left:unset;right:20px}:host .gradient-overlay{height:88px}}@media only screen and (max-width: 360px) and (orientation: portrait){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:88px}}@media only screen and (min-height: 500px) and (max-height: 699px) and (orientation: landscape){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:88px}}";

const MbCameraExperience = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.close = createEvent(this, "close", 7);
    this.setIsCameraActive = createEvent(this, "setIsCameraActive", 7);
    this.changeCameraDevice = createEvent(this, "changeCameraDevice", 7);
    this.flipCameraAction = createEvent(this, "flipCameraAction", 7);
    this.cameraStateChangeId = 0;
    this.cameraStateInProgress = false;
    this.flipCameraStateInProgress = false;
    this.barcodeScanningInProgress = false;
    this.cameraCursorBarcodeClassName = "rectangle";
    this.cameraCursorIdentityCardClassName = "reticle";
    this.scanningLineBarcodeClassName = undefined;
    this.cameraMessageIdentityCardContent = undefined;
    this.cameraMessageIdentityCardClassName = "message";
    this.type = undefined;
    this.cameraExperienceStateDurations = null;
    this.showOverlay = true;
    this.translationService = undefined;
    this.apiState = undefined;
    this.cameraFlipped = false;
    this.showScanningLine = false;
    this.showCameraFeedbackBarcodeMessage = false;
    this.clearIsCameraActive = false;
    this.allowHelpScreens = false;
    this.allowHelpScreensFab = false;
    this.allowHelpScreensOnboarding = false;
    this.allowHelpScreensOnboardingPerpetuity = false;
    this.helpScreensTooltipPauseTimeout = 15000;
  }
  apiStateHandler(apiState, _oldValue) {
    if (apiState === "" &&
      (this.type === CameraExperience.CardSingleSide ||
        this.type === CameraExperience.CardMultiSide))
      this.cardIdentityElement.classList.add("visible");
    else
      this.cardIdentityElement.classList.remove("visible");
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    this.cameraToolbar.setActiveCamera(cameraId);
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    await this.cameraToolbar.populateCameraDevices();
  }
  /**
   * Method is exposed outside which allow us to control Camera Flip state from parent component.
   */
  async setCameraFlipState(isFlipped) {
    this.cameraFlipped = isFlipped;
  }
  /**
   * Initializes Help Screens.
   */
  async initializeHelpScreens(callbacks) {
    this.helpScreens.initialize(callbacks);
  }
  /**
   * Opens Help Screens in the Onboarding mode.
   */
  async openHelpScreensOnboarding() {
    this.helpScreens.openOnboarding();
  }
  /**
   * Terminates Help Screens.
   */
  async terminateHelpScreens() {
    this.helpScreens.terminate();
  }
  /**
   * Set camera state which includes animation and message.
   */
  setState(state, isBackSide = false, force = false) {
    return new Promise((resolve) => {
      if (!force &&
        (!state || this.cameraStateInProgress || this.flipCameraStateInProgress)) {
        resolve();
        return;
      }
      if (state === CameraExperienceState.BarcodeScanning) {
        this.barcodeScanningInProgress = true;
      }
      this.cameraStateInProgress = true;
      let cameraStateChangeId = this.cameraStateChangeId + 1;
      this.cameraStateChangeId = cameraStateChangeId;
      if (state === CameraExperienceState.Flip) {
        this.flipCameraStateInProgress = true;
      }
      const stateClass = getStateClass(state);
      switch (this.type) {
        case CameraExperience.CardSingleSide:
        case CameraExperience.CardMultiSide:
          this.cameraCursorIdentityCardClassName = `reticle ${stateClass}`;
          break;
        case CameraExperience.Barcode:
          stateClass === "is-detection" && this.showScanningLine
            ? (this.scanningLineBarcodeClassName = "is-active")
            : (this.scanningLineBarcodeClassName = "");
          this.cameraCursorBarcodeClassName = `rectangle ${stateClass}`;
          break;
      }
      this.setMessage(state, isBackSide, this.type);
      window.setTimeout(() => {
        if (this.flipCameraStateInProgress &&
          state === CameraExperienceState.Flip) {
          this.flipCameraStateInProgress = false;
        }
        if (this.cameraStateChangeId === cameraStateChangeId) {
          this.cameraStateInProgress = false;
        }
        resolve();
      }, this.getCameraExperienceStateDuration(state));
    });
  }
  getCameraExperienceStateDuration(state) {
    return this.cameraExperienceStateDurations
      ? this.getStateDurationFromUserInput(state)
      : CameraExperienceStateDuration.get(state);
  }
  getStateDurationFromUserInput(state) {
    const cameraExperienceStateDurationMap = new Map(Object.entries(this.cameraExperienceStateDurations));
    const stateAdjusted = state[0].toLocaleLowerCase() + state.slice(1);
    const duration = cameraExperienceStateDurationMap.get(stateAdjusted);
    return duration || CameraExperienceStateDuration.get(state);
  }
  /**
   * Set camera state to initial method.
   */
  resetState() {
    return new Promise((resolve) => {
      // Reset flags
      this.cameraStateChangeId = 0;
      this.cameraStateInProgress = false;
      this.flipCameraStateInProgress = false;
      this.barcodeScanningInProgress = false;
      // Reset DOM
      while (this.cameraMessageIdentityCard.firstChild) {
        this.cameraMessageIdentityCard.removeChild(this.cameraMessageIdentityCard.firstChild);
      }
      while (this.cameraMessageBarcode.firstChild) {
        this.cameraMessageBarcode.removeChild(this.cameraMessageBarcode.firstChild);
      }
      resolve();
    });
  }
  flipCamera() {
    this.flipCameraAction.emit();
  }
  handleStop() {
    this.close.emit();
  }
  setMessage(state, isBackSide, type) {
    const message = this.getStateMessage(state, isBackSide, type);
    switch (type) {
      case CameraExperience.CardSingleSide:
      case CameraExperience.CardMultiSide:
        while (this.cameraMessageIdentityCard.firstChild) {
          this.cameraMessageIdentityCard.removeChild(this.cameraMessageIdentityCard.firstChild);
        }
        if (message) {
          this.cameraMessageIdentityCard.appendChild(message);
        }
        this.cameraMessageIdentityCardClassName =
          message && message !== null ? "message is-active" : "message";
        break;
      case CameraExperience.Barcode:
        while (this.cameraMessageBarcode.firstChild) {
          this.cameraMessageBarcode.removeChild(this.cameraMessageBarcode.firstChild);
        }
        if (this.showCameraFeedbackBarcodeMessage) {
          if (message) {
            this.cameraMessageBarcode.appendChild(message);
          }
          this.cameraMessageBarcode.setAttribute("class", message && message !== null ? "message is-active" : "message");
        }
        break;
      // Do nothing
    }
  }
  getStateMessage(state, isBackSide = false, type) {
    const getStateMessageAsHTML = (message) => {
      if (message) {
        const messageArray = typeof message === "string" ? [message] : message;
        const children = [];
        while (messageArray.length) {
          const sentence = messageArray.shift();
          children.push(document.createTextNode(sentence));
          if (messageArray.length) {
            children.push(document.createElement("br"));
          }
        }
        const spanElement = document.createElement("span");
        while (children.length) {
          spanElement.appendChild(children.shift());
        }
        return spanElement;
      }
    };
    switch (state) {
      case CameraExperienceState.Default:
        if (type === CameraExperience.Barcode &&
          this.showCameraFeedbackBarcodeMessage) {
          return getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode-message"));
        }
        const key = isBackSide
          ? "camera-feedback-scan-back"
          : "camera-feedback-scan-front";
        if (this.barcodeScanningInProgress) {
          return getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode"));
        }
        return getStateMessageAsHTML(this.translationService.i(key));
      case CameraExperienceState.MoveFarther:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-farther"));
      case CameraExperienceState.MoveCloser:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-move-closer"));
      case CameraExperienceState.AdjustAngle:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-adjust-angle"));
      case CameraExperienceState.GlareDetected:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-glare"));
      case CameraExperienceState.BlurDetected: {
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-blur"));
      }
      case CameraExperienceState.Flip:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-flip"));
      case CameraExperienceState.BarcodeScanning:
        return getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode"));
      case CameraExperienceState.Classification:
      case CameraExperienceState.Detection:
        return type === CameraExperience.Barcode
          ? getStateMessageAsHTML(this.translationService.i("camera-feedback-barcode-message"))
          : null;
      case CameraExperienceState.Done:
      case CameraExperienceState.DoneAll:
      default:
        return null;
    }
  }
  handleChangeCameraDevice(camera) {
    this.changeCameraDevice.emit(camera);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute("exportparts", parts.join(", "));
  }
  render() {
    return (h(Host, { class: classNames({ "no-overlay": !this.showOverlay }) }, h("div", { id: "barcode", class: classNames({
        visible: this.type === CameraExperience.Barcode,
      }) }, h("div", { class: "rectangle-container" }, h("div", { class: this.cameraCursorBarcodeClassName }, h("div", { class: "rectangle__cursor" }, h("div", { class: "rectangle__el" }), h("div", { class: "rectangle__el" }), h("div", { class: "rectangle__el" }), h("div", { class: "rectangle__el" }), h("div", { class: `scanning-line ${this.scanningLineBarcodeClassName}` }))), h("p", { class: "message", ref: (el) => (this.cameraMessageBarcode = el) }))), h("div", { id: "card-identity", ref: (el) => (this.cardIdentityElement = el), class: classNames({
        visible: this.type === CameraExperience.CardSingleSide ||
          this.type === CameraExperience.CardMultiSide,
      }) }, h("div", { class: "reticle-container" }, h("div", { class: this.cameraCursorIdentityCardClassName }, h("div", { class: "reticle__cursor" }, h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" }), h("div", { class: "reticle__el" })), h("img", { class: "reticle__done", src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk3MiAzMy40NkMyMC43MDk1IDMzLjQ2MDUgMjAuNDQ5NCAzMy40MDkyIDIwLjIwNjggMzMuMzA5QzE5Ljk2NDEgMzMuMjA4OCAxOS43NDM2IDMzLjA2MTYgMTkuNTU4IDMyLjg3NkwxMS4wNzQgMjQuMzlDMTAuODgyOSAyNC4yMDU2IDEwLjczMDMgMjMuOTg1MSAxMC42MjU0IDIzLjc0MTFDMTAuNTIwNCAyMy40OTcyIDEwLjQ2NSAyMy4yMzQ4IDEwLjQ2MjUgMjIuOTY5MkMxMC40NiAyMi43MDM3IDEwLjUxMDQgMjIuNDQwMyAxMC42MTA4IDIyLjE5NDRDMTAuNzExMiAyMS45NDg2IDEwLjg1OTYgMjEuNzI1MiAxMS4wNDcyIDIxLjUzNzNDMTEuMjM0OSAyMS4zNDkzIDExLjQ1ODEgMjEuMjAwNyAxMS43MDM4IDIxLjA5OTlDMTEuOTQ5NSAyMC45OTkyIDEyLjIxMjggMjAuOTQ4NCAxMi40Nzg0IDIwLjk1MDVDMTIuNzQzOSAyMC45NTI2IDEzLjAwNjQgMjEuMDA3NiAxMy4yNTA1IDIxLjExMjNDMTMuNDk0NiAyMS4yMTY5IDEzLjcxNTQgMjEuMzY5MSAxMy45IDIxLjU2TDIwLjk3IDI4LjYzTDMzLjcgMTUuOTA0QzM0LjA3NSAxNS41Mjg3IDM0LjU4MzggMTUuMzE3OCAzNS4xMTQzIDE1LjMxNzZDMzUuNjQ0OCAxNS4zMTc0IDM2LjE1MzcgMTUuNTI4IDM2LjUyOSAxNS45MDNDMzYuOTA0MyAxNi4yNzggMzcuMTE1MiAxNi43ODY4IDM3LjExNTQgMTcuMzE3M0MzNy4xMTU2IDE3Ljg0NzggMzYuOTA1IDE4LjM1NjcgMzYuNTMgMTguNzMyTDIyLjM4NiAzMi44NzZDMjIuMjAwNCAzMy4wNjE2IDIxLjk3OTkgMzMuMjA4OCAyMS43MzcyIDMzLjMwOUMyMS40OTQ2IDMzLjQwOTIgMjEuMjM0NSAzMy40NjA1IDIwLjk3MiAzMy40NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" })), h("p", { class: this.cameraMessageIdentityCardClassName, ref: (el) => (this.cameraMessageIdentityCard = el) }))), h("div", { class: "gradient-overlay bottom" }), h("mb-camera-toolbar", { "clear-is-camera-active": this.clearIsCameraActive, "show-close": this.apiState !== "error", "camera-flipped": this.cameraFlipped, onCloseEvent: () => this.handleStop(), onFlipEvent: () => this.flipCamera(), onChangeCameraDevice: (ev) => this.handleChangeCameraDevice(ev.detail), ref: (el) => (this.cameraToolbar = el) }), h("mb-help", { allow: this.allowHelpScreens, allowFab: this.allowHelpScreensFab, allowOnboarding: this.allowHelpScreensOnboarding, allowOnboardingPerpetuity: this.allowHelpScreensOnboardingPerpetuity, tooltipPauseTimeout: this.helpScreensTooltipPauseTimeout, translationService: this.translationService, ref: (el) => {
        this.helpScreens = el;
      } })));
  }
  get hostEl() { return getElement(this); }
  static get watchers() { return {
    "apiState": ["apiStateHandler"]
  }; }
};
MbCameraExperience.style = mbCameraExperienceCss;

const mbCameraSelectionCss = ":host{display:block;font-family:inherit;font-size:var(--mb-font-size)}:host *{box-sizing:border-box}:host .active-camera{all:unset;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;color:var(--mb-toolbar-color);line-height:var(--mb-line-height);text-align:center;text-decoration:none;border:1px solid transparent;border-radius:var(--mb-toolbar-border-radius)}:host .active-camera .icon{width:20px;height:20px}:host .active-camera .icon svg{width:20px;height:20px}:host .active-camera .name{font-weight:var(--mb-toolbar-camera-name-font-weight);padding:0 8px 0 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .active-camera{padding:4px 16px;background-color:transparent}:host .active-camera:hover,:host .active-camera:active,:host .active-camera:focus{background-color:rgba(107, 114, 128, 0.3)}:host .active-camera.active,:host .active-camera:active,:host .active-camera:focus{padding:4px 16px;border-color:var(--mb-toolbar-border-color)}:host #list-background{position:fixed;top:0;left:0;width:100vw;height:100vh}:host #list-background:not(.visible){display:none}:host .list{position:absolute;top:calc(var(--mb-font-size) * 1.5 + 16px);left:calc(50% - var(--mb-toolbar-selection-width) / 2);width:var(--mb-toolbar-selection-width);padding:0;background-color:var(--mb-toolbar-list-background);border-radius:var(--mb-toolbar-border-radius);box-shadow:var(--mb-toolbar-list-shadow)}:host .list:not(.visible){display:none}:host .list svg,:host .list .name,:host .list .spacer{display:inline-block;vertical-align:middle}:host .list .spacer,:host .list svg{width:24px;height:20px}:host .list .name{max-width:calc(100% - 24px);overflow:hidden;text-overflow:ellipsis}:host .list ul{margin:0;padding:8px;border-radius:var(--mb-toolbar-list-border-radius);list-style:none}:host .list ul li{display:block}:host .list ul li.active{color:#0062f2}:host .list ul button{all:unset;box-sizing:border-box;display:block;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--mb-toolbar-list-item-border-radius);padding:4px 16px;line-height:var(--mb-line-height);cursor:pointer}:host .list ul button:hover,:host .list ul button:focus{background-color:rgba(116, 116, 128, 0.08)}";

const MbCameraSelection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.setIsCameraActive = createEvent(this, "setIsCameraActive", 7);
    this.changeCameraDevice = createEvent(this, "changeCameraDevice", 7);
    this.activeCamera = {
      prettyName: "-",
      details: null,
    };
    this.cameraList = [];
    this.isListVisible = false;
    this.clearIsCameraActive = false;
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    const camera = this.cameraList.find((el) => el.details.deviceId === cameraId);
    if (!camera) {
      return;
    }
    this.activeCamera = camera;
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    try {
      const devices = await getCameraDevices();
      this.cameraList = devices;
    }
    catch (error) {
      // Camera access error is handled by the video recognizer.
      this.cameraList = [];
    }
  }
  handleListOpen(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setListVisibility(!this.isListVisible);
  }
  handleCameraSelection(ev, camera) {
    ev.preventDefault();
    ev.stopPropagation();
    this.changeCameraDevice.emit(camera);
    this.activeCamera = camera;
    this.setListVisibility(false);
  }
  setListVisibility(visible) {
    this.isListVisible = visible;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    const cameraListElements = this.cameraList.map((camera) => {
      const isActive = !this.clearIsCameraActive &&
        this.activeCamera?.details?.deviceId === camera.details.deviceId;
      let content = h("span", { class: "spacer" });
      if (isActive) {
        content = (h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17.2559 5.24408C17.5813 5.56951 17.5813 6.09715 17.2559 6.42259L8.92257 14.7559C8.59713 15.0814 8.06949 15.0814 7.74406 14.7559L3.57739 10.5893C3.25195 10.2638 3.25195 9.73618 3.57739 9.41074C3.90283 9.08531 4.43047 9.08531 4.7559 9.41074L8.33331 12.9882L16.0774 5.24408C16.4028 4.91864 16.9305 4.91864 17.2559 5.24408Z", fill: "#0062F2" })));
      }
      return (h("li", { class: classNames({ active: isActive }) }, h("button", { onClick: (ev) => this.handleCameraSelection(ev, camera) }, content, h("span", { class: "name" }, camera.prettyName))));
    });
    const doNotRender = !(this.cameraList?.length > 1);
    if (doNotRender) {
      return undefined;
    }
    return (h(Host, null, h("button", { class: this.isListVisible ? "active-camera active" : "active-camera", onClick: (ev) => this.handleListOpen(ev) }, h("span", { class: "icon" }, h("svg", { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.82145 2.98816C7.13401 2.6756 7.55793 2.5 7.99996 2.5H13C13.442 2.5 13.8659 2.6756 14.1785 2.98816C14.491 3.30072 14.6666 3.72464 14.6666 4.16667C14.6666 4.38768 14.7544 4.59964 14.9107 4.75592C15.067 4.9122 15.2789 5 15.5 5H16.3333C16.9963 5 17.6322 5.26339 18.1011 5.73223C18.5699 6.20107 18.8333 6.83696 18.8333 7.5V15C18.8333 15.663 18.5699 16.2989 18.1011 16.7678C17.6322 17.2366 16.9963 17.5 16.3333 17.5H4.66663C4.00358 17.5 3.3677 17.2366 2.89886 16.7678C2.43002 16.2989 2.16663 15.663 2.16663 15V7.5C2.16663 6.83696 2.43002 6.20107 2.89886 5.73223C3.3677 5.26339 4.00358 5 4.66663 5H5.49996C5.72097 5 5.93293 4.9122 6.08922 4.75592C6.2455 4.59964 6.33329 4.38768 6.33329 4.16667C6.33329 3.72464 6.50889 3.30072 6.82145 2.98816ZM4.66663 6.66667C4.44561 6.66667 4.23365 6.75446 4.07737 6.91074C3.92109 7.06702 3.83329 7.27899 3.83329 7.5V15C3.83329 15.221 3.92109 15.433 4.07737 15.5893C4.23365 15.7455 4.44561 15.8333 4.66663 15.8333H16.3333C16.5543 15.8333 16.7663 15.7455 16.9225 15.5893C17.0788 15.433 17.1666 15.221 17.1666 15V7.5C17.1666 7.27899 17.0788 7.06702 16.9225 6.91074C16.7663 6.75446 16.5543 6.66667 16.3333 6.66667H15.5C14.8369 6.66667 14.201 6.40327 13.7322 5.93443C13.2634 5.46559 13 4.82971 13 4.16667L7.99996 4.16667C7.99996 4.82971 7.73657 5.46559 7.26773 5.93443C6.79889 6.40327 6.163 6.66667 5.49996 6.66667H4.66663Z", fill: "white" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.5 9.16667C9.57948 9.16667 8.83329 9.91286 8.83329 10.8333C8.83329 11.7538 9.57948 12.5 10.5 12.5C11.4204 12.5 12.1666 11.7538 12.1666 10.8333C12.1666 9.91286 11.4204 9.16667 10.5 9.16667ZM7.16663 10.8333C7.16663 8.99238 8.65901 7.5 10.5 7.5C12.3409 7.5 13.8333 8.99238 13.8333 10.8333C13.8333 12.6743 12.3409 14.1667 10.5 14.1667C8.65901 14.1667 7.16663 12.6743 7.16663 10.8333Z", fill: "white" }))), h("span", { class: "name" }, this.activeCamera.prettyName), h("span", { class: "icon" }, h("svg", { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.9107 6.91076C5.23614 6.58533 5.76378 6.58533 6.08922 6.91076L10.5 11.3215L14.9107 6.91076C15.2361 6.58533 15.7638 6.58533 16.0892 6.91076C16.4147 7.2362 16.4147 7.76384 16.0892 8.08928L11.0892 13.0893C10.7638 13.4147 10.2361 13.4147 9.9107 13.0893L4.9107 8.08928C4.58527 7.76384 4.58527 7.2362 4.9107 6.91076Z", fill: "white" })))), h("div", { id: "list-background", class: classNames({ visible: this.isListVisible }), onClick: () => this.setListVisibility(false) }), h("div", { class: this.isListVisible ? "list visible" : "list" }, h("ul", null, cameraListElements))));
  }
  get hostEl() { return getElement(this); }
};
MbCameraSelection.style = mbCameraSelectionCss;

const mbCameraToolbarCss = ":host{position:absolute;top:0;left:0;right:0;background-color:rgba(107, 114, 128, 0.7);-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter))}:host header{display:flex;height:44px;align-items:center;justify-content:space-between}:host .camera-selection-wrapper{position:relative;margin-inline:auto}@media only screen and (min-width: 1280px){:host header{max-width:1024px;margin:0 auto;padding-left:0;padding-right:0}}:host .toolbar-button{all:unset;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;width:40px;height:40px;box-sizing:border-box;border-radius:var(--mb-toolbar-border-radius);display:grid;place-content:center}:host .toolbar-button svg{filter:drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.4))}:host .toolbar-button:hover{background-color:rgba(107, 114, 128, 0.3);box-shadow:0px 1px 4px rgba(0, 0, 0, 0.1)}:host .toolbar-button:focus,:host .toolbar-button:active{box-shadow:0 0 0 1px var(--mb-toolbar-border-color)}:host .flip-button{transform-style:preserve-3d;perspective:600px;z-index:1}:host .flip-button svg{transition:transform 300ms;backface-visibility:visible;will-change:transform}:host .flip-button.flipped svg{transform:rotateY(180deg)}";

const MbCameraToolbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.setIsCameraActive = createEvent(this, "setIsCameraActive", 7);
    this.closeEvent = createEvent(this, "closeEvent", 7);
    this.flipEvent = createEvent(this, "flipEvent", 7);
    this.changeCameraDevice = createEvent(this, "changeCameraDevice", 7);
    this.showCloseButton = false;
    this.isDesktop = isDesktop();
    this.showClose = false;
    this.clearIsCameraActive = false;
    this.enableCameraFlip = true;
    this.cameraFlipped = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    this.cameraSelection.setActiveCamera(cameraId);
    this.showCloseButton = this.showClose;
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    await this.cameraSelection.populateCameraDevices();
  }
  handleClose(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.closeEvent.emit();
    this.showCloseButton = false;
  }
  handleFlip(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.flipEvent.emit();
  }
  handleChangeCameraDevice(camera) {
    this.changeCameraDevice.emit(camera);
  }
  handleSetIsCameraActive(ev) {
    if (ev.detail) {
      this.showCloseButton = this.showClose;
    }
    else {
      this.showCloseButton = ev.detail;
    }
  }
  render() {
    let flipButton = "";
    if (this.enableCameraFlip) {
      flipButton = (h("button", { class: this.cameraFlipped
          ? "toolbar-button flip-button flipped"
          : "toolbar-button flip-button", onClick: (ev) => this.handleFlip(ev) }, h("svg", { width: "28", height: "28", viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16 5C16.5523 5 17 5.44772 17 6V24C17 24.5523 16.5523 25 16 25C15.4477 25 15 24.5523 15 24V6C15 5.44772 15.4477 5 16 5Z", fill: "white" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7702 9.02676C20.2216 8.9202 20.687 9.13798 20.8944 9.55279L25.8944 19.5528C26.0494 19.8628 26.0329 20.2309 25.8507 20.5257C25.6684 20.8206 25.3466 21 25 21H20C19.4477 21 19 20.5523 19 20V10C19 9.53623 19.3189 9.13331 19.7702 9.02676ZM21 14.2361V19H23.382L21 14.2361Z", fill: "white" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.2298 9.02676C12.6811 9.13331 13 9.53623 13 10V20C13 20.5523 12.5523 21 12 21H7C6.65342 21 6.33156 20.8206 6.14935 20.5257C5.96714 20.2309 5.95058 19.8628 6.10557 19.5528L11.1056 9.55279C11.313 9.13798 11.7784 8.9202 12.2298 9.02676ZM8.61803 19H11V14.2361L8.61803 19Z", fill: "white" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7702 9.02676C20.2216 8.9202 20.687 9.13798 20.8944 9.55279L25.8944 19.5528C26.0494 19.8628 26.0329 20.2309 25.8507 20.5257C25.6684 20.8206 25.3466 21 25 21H20C19.4477 21 19 20.5523 19 20V10C19 9.53623 19.3189 9.13331 19.7702 9.02676Z", fill: "white" }))));
    }
    let closeButton = "";
    if (this.showCloseButton) {
      closeButton = (h("button", { class: "toolbar-button close-button", onClick: (ev) => this.handleClose(ev) }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z", fill: "white" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z", fill: "white" }))));
    }
    return (h(Host, null, h("header", null, flipButton, h("div", { class: "camera-selection-wrapper" }, h("mb-camera-selection", { "clear-is-camera-active": !this.showCloseButton || this.clearIsCameraActive, onChangeCameraDevice: (ev) => this.handleChangeCameraDevice(ev.detail), ref: (el) => (this.cameraSelection = el) })), closeButton)));
  }
  get hostEl() { return getElement(this); }
};
MbCameraToolbar.style = mbCameraToolbarCss;

const mbCompletedCss = ":host{display:block;padding:0}:host img{display:block;width:24px;height:24px}";

const MbCompleted = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4yMDcxIDYuMjkyODlDMjEuNTk3NiA2LjY4MzQyIDIxLjU5NzYgNy4zMTY1OCAyMS4yMDcxIDcuNzA3MTFMMTEuMjA3MSAxNy43MDcxQzEwLjgxNjYgMTguMDk3NiAxMC4xODM0IDE4LjA5NzYgOS43OTI4OSAxNy43MDcxTDQuNzkyODkgMTIuNzA3MUM0LjQwMjM3IDEyLjMxNjYgNC40MDIzNyAxMS42ODM0IDQuNzkyODkgMTEuMjkyOUM1LjE4MzQyIDEwLjkwMjQgNS44MTY1OCAxMC45MDI0IDYuMjA3MTEgMTEuMjkyOUwxMC41IDE1LjU4NThMMTkuNzkyOSA2LjI5Mjg5QzIwLjE4MzQgNS45MDIzNyAyMC44MTY2IDUuOTAyMzcgMjEuMjA3MSA2LjI5Mjg5WiIgZmlsbD0iIzAwNjJGMiIvPgo8L3N2Zz4K";
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, null, h("img", { src: this.icon })));
  }
  get hostEl() { return getElement(this); }
};
MbCompleted.style = mbCompletedCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function getSDKWasmType(wasmType) {
  switch (wasmType) {
    case "BASIC":
      return WasmType.Basic;
    case "ADVANCED":
      return WasmType.Advanced;
    case "ADVANCED_WITH_THREADS":
      return WasmType.AdvancedWithThreads;
    default:
      return null;
  }
}

const mbComponentCss = ":host{box-sizing:border-box;position:relative;display:block;width:var(--mb-component-width);background:var(--mb-component-background);color:var(--mb-component-font-color);font-size:var(--mb-font-size);font-style:var(--mb-font-style);font-weight:var(--mb-font-weight);letter-spacing:var(--mb-letter-spacing);line-height:var(--mb-line-height);text-transform:var(--mb-component-text-transform);border-color:var(--mb-component-border-color);border-radius:var(--mb-component-border-radius);border-style:var(--mb-component-border-style);border-width:var(--mb-component-border-width);box-shadow:var(--mb-component-box-shadow);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media only screen and (min-width: 1440px){:host{font-size:var(--mb-font-size-desktop)}}:host #mb-screen-loading{display:flex;align-items:center;justify-content:center;padding:16px}:host #mb-screen-loading:not(.visible) img{animation-play-state:paused}:host #mb-screen-error{display:flex;flex-direction:row;align-items:center;justify-content:center}:host #mb-screen-error .icon-alert{display:flex;margin-right:10px}:host :host #mb-screen-error:not(.visible),:host :host #mb-screen-action:not(.visible),:host :host #mb-screen-loading:not(.visible),:host :host #mb-screen-processing:not(.visible){border:none}:host #mb-screen-action .actions{display:flex;justify-content:space-between;align-items:center}:host #mb-screen-action .action-label{display:var(--mb-component-action-label);margin:0 16px 0 0;cursor:default;font-size:var(--mb-component-action-label-font-size)}:host #mb-screen-action .action-buttons{display:flex;gap:var(--mb-component-action-buttons-gap);justify-content:var(--mb-component-action-buttons-justify-content);flex:1}:host #mb-screen-action .image-upload-row{display:flex;gap:4px}:host #mb-screen-action .multi-side-image-upload{width:100%;padding:8px 0;overflow:hidden}:host #mb-screen-action .multi-side-image-upload:not(.visible){display:none}:host #mb-screen-action .multi-side-image-upload mb-image-box,:host #mb-screen-action .multi-side-image-upload mb-button-classic{display:block;box-sizing:border-box}:host #mb-screen-action .multi-side-image-upload mb-image-box{flex:1;background:#ffffff;border:1px solid #d1d5db;box-shadow:0px 1px 2px rgba(31, 41, 55, 0.08);border-radius:4px;min-width:0}:host #mb-screen-action .multi-side-image-upload mb-button-classic{width:100%;margin-top:8px}:host([dir=rtl]) #mb-screen-action .action-label{margin:0 0 0 16px}:host #mb-screen-processing p{display:none;margin:8px 0}:host #mb-screen-processing p.visible{display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:var(--mb-component-font-size)}:host #mb-screen-processing p.in-progress{color:var(--mb-component-font-color-secondary)}:host #mb-screen-processing p.done{color:var(--mb-component-font-color)}:host #mb-screen-processing[data-type=single-side] p span{margin-left:8px}:host #mb-screen-processing[data-type=multi-side] p span{margin-left:8px}:host #mb-overlay-device-selection{display:flex;align-items:center;justify-content:center;background-color:var(--mb-overlay-deviceselection-background)}:host #mb-overlay-device-selection-mobile{display:flex;align-items:center;justify-content:center;background-color:var(--mb-overlay-deviceselection-background)}:host #mb-overlay-drag-and-drop{display:flex;align-items:center;justify-content:center;flex-direction:column}:host #mb-overlay-drag-and-drop .drag-and-drop-icon{display:block;width:24px;height:24px}:host #mb-overlay-drag-and-drop .drag-and-drop-message{max-width:360px;margin:12px 0 0 0;text-align:center;color:var(--mb-component-font-color);font-size:var(--mb-font-size);font-style:var(--mb-font-style);font-weight:var(--mb-font-weight);letter-spacing:var(--mb-letter-spacing);line-height:var(--mb-line-height);text-transform:var(--mb-component-text-transform)}:host #mb-overlay-drag-and-drop.visible{background-color:var(--mb-overlay-draganddrop-background)}:host #mb-overlay-drag-and-drop.visible.error{background-color:var(--mb-overlay-draganddrop-background-error)}:host #mb-overlay-drag-and-drop.visible.error .drag-and-drop-message{color:var(--mb-overlay-draganddrop-text-error-color)}:host #mb-overlay-drag-and-drop.hidden{display:none}:host #mb-overlay-drag-and-drop.inline{position:absolute;flex-direction:row;border-style:var(--mb-overlay-draganddrop-border-style);border-radius:var(--mb-component-border-radius);border-width:var(--mb-component-border-width)}:host #mb-overlay-drag-and-drop.inline .drag-and-drop-message{margin:0 0 0 8px;color:var(--mb-overlay-draganddrop-text-color);font-size:var(--mb-component-font-size)}:host #mb-overlay-drag-and-drop.inline.visible{border-color:var(--mb-overlay-draganddrop-border-color)}:host #mb-overlay-drag-and-drop.inline.visible.error{border-color:var(--mb-overlay-draganddrop-border-color-error)}:host #mb-overlay-drag-and-drop.inline.visible.error .drag-and-drop-icon{margin-left:16px}:host #mb-overlay-drag-and-drop.inline.visible.error .drag-and-drop-message{text-align:left}:host #drag-and-drop-zone{position:absolute;top:0;bottom:0;left:0;right:0;background-color:transparent}:host #mb-overlay-gallery-experience.visible{display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:var(--mb-overlay-gallery-experience-background);color:var(--mb-overlay-gallery-experience-font-color)}:host #mb-overlay-gallery-experience.visible p{margin:8px 0 0 0;font-size:var(--mb-overlay-gallery-experience-font-size);font-weight:var(--mb-overlay-gallery-experience-font-weight);line-height:var(--mb-overlay-gallery-experience-line-height)}:host #mb-overlay-camera-experience{width:100%;height:100%;min-height:100%;min-height:-webkit-fill-available;overflow:hidden;justify-content:center;align-items:center;background-color:#000;overflow-y:hidden}:host #mb-overlay-camera-experience .holder{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}:host #mb-overlay-camera-experience video{display:block;width:100%;height:auto}:host #mb-overlay-camera-experience mb-camera-experience{position:absolute;top:0;bottom:0;left:0;right:0}:host #mb-overlay-camera-experience mb-camera-experience.is-muted{background-color:rgba(0, 0, 0, 0.6)}:host #mb-overlay-camera-experience mb-camera-experience.is-error{background-color:black}:host #mb-overlay-camera-experience.visible{display:flex;z-index:1000}:host input[type=file]{width:0;height:0;opacity:0;clip:rect(1px, 1px, 1px, 1px);position:absolute}:host button.modal-action-button{width:126px;height:32px;border-radius:0;border:0;background:#48b2e8;color:#ffffff;cursor:pointer}";

const MbComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.block = createEvent(this, "block", 7);
    this.fatalError = createEvent(this, "fatalError", 7);
    this.ready = createEvent(this, "ready", 7);
    this.scanError = createEvent(this, "scanError", 7);
    this.scanSuccess = createEvent(this, "scanSuccess", 7);
    this.feedback = createEvent(this, "feedback", 7);
    this.cameraScanStarted = createEvent(this, "cameraScanStarted", 7);
    this.imageScanStarted = createEvent(this, "imageScanStarted", 7);
    this.scanAborted = createEvent(this, "scanAborted", 7);
    this.setIsCameraActive = createEvent(this, "setIsCameraActive", 7);
    this.screens = {
      action: null,
      error: null,
      loading: null,
      processing: null,
    };
    this.overlays = {
      camera: null,
      draganddrop: null,
      processing: null,
      modal: null,
    };
    this.scanReset = false;
    this.detectionSuccessLock = false;
    this.isBackSide = false;
    this.cameraChangeInProgress = false;
    this.blocked = false;
    this.multiSideGalleryOpened = false;
    this.areHelpScreensOpen = false;
    this.galleryImageFirstFile = null;
    this.galleryImageSecondFile = null;
    this.isCameraActive = false;
    this.terminateHelpScreens = async () => {
      this.areHelpScreensOpen = false;
      await this.cameraExperience.terminateHelpScreens();
    };
    this.initializeHelpScreensAndStartOnboarding = async () => {
      this.areHelpScreensOpen = false;
      await this.cameraExperience.initializeHelpScreens({
        onOpen: () => {
          this.areHelpScreensOpen = true;
          this.sdkService.videoRecognizer.pauseRecognition();
        },
        onClose: () => {
          this.areHelpScreensOpen = false;
          this.sdkService.videoRecognizer.resumeRecognition(false);
        },
      });
      await this.cameraExperience.openHelpScreensOnboarding();
    };
    this.galleryExperienceModalErrorWindowVisible = false;
    this.clearIsCameraActive = false;
    this.apiProcessStatusVisible = false;
    this.apiProcessStatusState = "NONE";
    this.allowHelloMessage = true;
    this.engineLocation = "";
    this.workerLocation = "";
    this.licenseKey = undefined;
    this.wasmType = undefined;
    this.blinkIdVariant = undefined;
    this.recognizers = undefined;
    this.recognizerOptions = undefined;
    this.recognitionTimeout = undefined;
    this.recognitionPauseTimeout = undefined;
    this.cameraExperienceStateDurations = null;
    this.includeSuccessFrame = false;
    this.enableDrag = true;
    this.hideLoadingAndErrorUi = false;
    this.rtl = false;
    this.scanFromCamera = true;
    this.scanFromImage = true;
    this.thoroughScanFromImage = false;
    this.galleryOverlayType = "INLINE";
    this.galleryDropType = "INLINE";
    this.showActionLabels = false;
    this.showModalWindows = false;
    this.showCameraFeedbackBarcodeMessage = false;
    this.showScanningLine = false;
    this.iconCameraDefault = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z" fill="black"/></svg>';
    this.iconCameraActive = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z" fill="%2348B2E8"/></svg>';
    this.iconGalleryDefault = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 6.66666C11.6667 6.20642 12.0398 5.83333 12.5 5.83333H12.5084C12.9686 5.83333 13.3417 6.20642 13.3417 6.66666C13.3417 7.1269 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.1269 11.6667 6.66666Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24972 9.76212L3.92259 13.0892C3.59715 13.4147 3.06951 13.4147 2.74408 13.0892C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56618C6.59083 8.08315 7.22016 7.7751 7.91667 7.7751C8.61317 7.7751 9.2425 8.08315 9.74448 8.56618L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5971 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76212C8.32758 9.51773 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51773 7.24972 9.76212Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z" fill="black"/></svg>';
    this.iconDragAndDropGalleryDefault = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCA4QzE0IDcuNDQ3NzIgMTQuNDQ3NyA3IDE1IDdIMTUuMDFDMTUuNTYyMyA3IDE2LjAxIDcuNDQ3NzIgMTYuMDEgOEMxNi4wMSA4LjU1MjI4IDE1LjU2MjMgOSAxNS4wMSA5SDE1QzE0LjQ0NzcgOSAxNCA4LjU1MjI4IDE0IDhaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNyA1QzUuODk1NDMgNSA1IDUuODk1NDMgNSA3VjE3QzUgMTguMTA0NiA1Ljg5NTQzIDE5IDcgMTlIMTdDMTguMTA0NiAxOSAxOSAxOC4xMDQ2IDE5IDE3VjdDMTkgNS44OTU0MyAxOC4xMDQ2IDUgMTcgNUg3Wk0zIDdDMyA0Ljc5MDg2IDQuNzkwODYgMyA3IDNIMTdDMTkuMjA5MSAzIDIxIDQuNzkwODYgMjEgN1YxN0MyMSAxOS4yMDkxIDE5LjIwOTEgMjEgMTcgMjFIN0M0Ljc5MDg2IDIxIDMgMTkuMjA5MSAzIDE3VjdaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOC42OTk2NiAxMS43MTQ1TDQuNzA3MTEgMTUuNzA3MUM0LjMxNjU4IDE2LjA5NzYgMy42ODM0MiAxNi4wOTc2IDMuMjkyODkgMTUuNzA3MUMyLjkwMjM3IDE1LjMxNjUgMi45MDIzNyAxNC42ODM0IDMuMjkyODkgMTQuMjkyOEw3LjI5Mjg5IDEwLjI5MjhMNy4zMDY2MiAxMC4yNzk0QzcuOTA5IDkuNjk5NzQgOC42NjQxOSA5LjMzMDA4IDkuNSA5LjMzMDA4QzEwLjMzNTggOS4zMzAwOCAxMS4wOTEgOS42OTk3NCAxMS42OTM0IDEwLjI3OTRMMTEuNzA3MSAxMC4yOTI4TDE2LjcwNzEgMTUuMjkyOEMxNy4wOTc2IDE1LjY4MzQgMTcuMDk3NiAxNi4zMTY1IDE2LjcwNzEgMTYuNzA3MUMxNi4zMTY2IDE3LjA5NzYgMTUuNjgzNCAxNy4wOTc2IDE1LjI5MjkgMTYuNzA3MUwxMC4zMDAzIDExLjcxNDVDOS45OTMxIDExLjQyMTIgOS43MTU5NCAxMS4zMzAxIDkuNSAxMS4zMzAxQzkuMjg0MDYgMTEuMzMwMSA5LjAwNjkgMTEuNDIxMiA4LjY5OTY2IDExLjcxNDVaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuNjk5NyAxMy43MTQ1TDE0LjcwNzEgMTQuNzA3MUMxNC4zMTY2IDE1LjA5NzYgMTMuNjgzNCAxNS4wOTc2IDEzLjI5MjkgMTQuNzA3MUMxMi45MDI0IDE0LjMxNjUgMTIuOTAyNCAxMy42ODM0IDEzLjI5MjkgMTMuMjkyOEwxNC4yOTI5IDEyLjI5MjhMMTQuMzA2NiAxMi4yNzk0QzE0LjkwOSAxMS42OTk3IDE1LjY2NDIgMTEuMzMwMSAxNi41IDExLjMzMDFDMTcuMzM1OCAxMS4zMzAxIDE4LjA5MSAxMS42OTk3IDE4LjY5MzQgMTIuMjc5NEwxOC43MDcxIDEyLjI5MjhMMjAuNzA3MSAxNC4yOTI4QzIxLjA5NzYgMTQuNjgzNCAyMS4wOTc2IDE1LjMxNjUgMjAuNzA3MSAxNS43MDcxQzIwLjMxNjYgMTYuMDk3NiAxOS42ODM0IDE2LjA5NzYgMTkuMjkyOSAxNS43MDcxTDE3LjMwMDMgMTMuNzE0NUMxNi45OTMxIDEzLjQyMTIgMTYuNzE1OSAxMy4zMzAxIDE2LjUgMTMuMzMwMUMxNi4yODQxIDEzLjMzMDEgMTYuMDA2OSAxMy40MjEyIDE1LjY5OTcgMTMuNzE0NVoiIGZpbGw9IiMwMDYyRjIiLz4KPC9zdmc+Cg==";
    this.iconDragAndDropWarningDefault = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA4QzEyLjU1MjMgOCAxMyA4LjQ0NzcyIDEzIDlWMTFDMTMgMTEuNTUyMyAxMi41NTIzIDEyIDEyIDEyQzExLjQ0NzcgMTIgMTEgMTEuNTUyMyAxMSAxMVY5QzExIDguNDQ3NzIgMTEuNDQ3NyA4IDEyIDhaTTEyIDE0QzEyLjU1MjMgMTQgMTMgMTQuNDQ3NyAxMyAxNVYxNS4wMUMxMyAxNS41NjIzIDEyLjU1MjMgMTYuMDEgMTIgMTYuMDFDMTEuNDQ3NyAxNi4wMSAxMSAxNS41NjIzIDExIDE1LjAxVjE1QzExIDE0LjQ0NzcgMTEuNDQ3NyAxNCAxMiAxNFoiIGZpbGw9IiNFMTFENDgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC40NzY0IDIuMzgzOTdDMTAuOTM4MSAyLjExMTgxIDExLjQ2NDIgMS45NjgyNiAxMi4wMDAxIDEuOTY4MjZDMTIuNTM1OSAxLjk2ODI2IDEzLjA2MjEgMi4xMTE4MSAxMy41MjM3IDIuMzgzOTdDMTMuOTgzMSAyLjY1NDg1IDE0LjM2MiAzLjA0MzMgMTQuNjIxNCAzLjUwOTI1TDIxLjYxODMgMTUuNzUzOUMyMS42NDA0IDE1Ljc5MjUgMjEuNjU5OCAxNS44MzI1IDIxLjY3NjUgMTUuODczN0MyMS44NTY2IDE2LjMxNzEgMjEuOTI4IDE2Ljc5NzEgMjEuODg0OCAxNy4yNzM3QzIxLjg0MTYgMTcuNzUwMiAyMS42ODUgMTguMjA5NiAyMS40MjgxIDE4LjYxMzNDMjEuMTcxMSAxOS4wMTcgMjAuODIxNCAxOS4zNTM0IDIwLjQwOCAxOS41OTQ0QzE5Ljk5NDUgMTkuODM1NCAxOS41Mjk0IDE5Ljk3NDEgMTkuMDUxNSAxOS45OTg3QzE5LjAzNDQgMTkuOTk5NiAxOS4wMTcyIDIwIDE5LjAwMDEgMjBINS4wNzAwNUM1LjA1ODU3IDIwIDUuMDQ3MTQgMTkuOTk5OCA1LjAzNTc1IDE5Ljk5OTRDNS4wMDY5NiAyMC4wMDA0IDQuOTc3ODggMjAuMDAwMiA0Ljk0ODU3IDE5Ljk5ODdDNC40NzA2NiAxOS45NzQxIDQuMDA1NTggMTkuODM1NCAzLjU5MjE2IDE5LjU5NDRDMy4xNzg3MyAxOS4zNTM0IDIuODI4OTYgMTkuMDE3IDIuNTcyMDQgMTguNjEzM0MyLjMxNTEzIDE4LjIwOTYgMi4xNTg1MiAxNy43NTAyIDIuMTE1MjkgMTcuMjczN0MyLjA3MjA3IDE2Ljc5NzEgMi4xNDM0OCAxNi4zMTcxIDIuMzIzNTcgMTUuODczN0MyLjM0MDMgMTUuODMyNSAyLjM1OTc1IDE1Ljc5MjUgMi4zODE4MSAxNS43NTM5TDkuMzc4NzQgMy41MDkyNUM5LjYzODA4IDMuMDQzMyAxMC4wMTcgMi42NTQ4NSAxMC40NzY0IDIuMzgzOTdaTTUuMDM3NjcgMTguMDAwNUM1LjA0ODQyIDE4LjAwMDIgNS4wNTkyMiAxOCA1LjA3MDA1IDE4SDE4Ljk2OTlDMTkuMTIxNyAxNy45ODg5IDE5LjI2OTEgMTcuOTQzMyAxOS40MDA3IDE3Ljg2NjZDMTkuNTM4NSAxNy43ODYzIDE5LjY1NTEgMTcuNjc0MSAxOS43NDA3IDE3LjUzOTVDMTkuODI2NCAxNy40MDUgMTkuODc4NiAxNy4yNTE5IDE5Ljg5MyAxNy4wOTNDMTkuOTA1NyAxNi45NTI1IDE5Ljg4ODYgMTYuODExMiAxOS44NDMgMTYuNjc4MkwxMi44NzUgNC40ODQxOEMxMi43ODg1IDQuMzI3ODggMTIuNjYxOCA0LjE5NzU1IDEyLjUwNzkgNC4xMDY4M0MxMi4zNTQxIDQuMDE2MTEgMTIuMTc4NyAzLjk2ODI2IDEyLjAwMDEgMy45NjgyNkMxMS44MjE0IDMuOTY4MjYgMTEuNjQ2MSA0LjAxNjExIDExLjQ5MjIgNC4xMDY4M0MxMS4zMzgzIDQuMTk3NTUgMTEuMjExNSA0LjMyNzg0IDExLjEyNTEgNC40ODQxNEwxMS4xMTg0IDQuNDk2Mkw0LjE1NzE0IDE2LjY3ODJDNC4xMTE1MSAxNi44MTEyIDQuMDk0MzggMTYuOTUyNSA0LjEwNzEyIDE3LjA5M0M0LjEyMTUyIDE3LjI1MTkgNC4xNzM3MyAxNy40MDUgNC4yNTkzNyAxNy41Mzk1QzQuMzQ1MDEgMTcuNjc0MSA0LjQ2MTYgMTcuNzg2MyA0LjU5OTQgMTcuODY2NkM0LjczMzIxIDE3Ljk0NDYgNC44ODMyNCAxNy45OTA0IDUuMDM3NjcgMTguMDAwNVoiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+Cg==";
    this.iconGalleryActive = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 6.66667C11.6667 6.20643 12.0398 5.83334 12.5 5.83334H12.5084C12.9686 5.83334 13.3417 6.20643 13.3417 6.66667C13.3417 7.12691 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.12691 11.6667 6.66667Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24972 9.76213L3.92259 13.0893C3.59715 13.4147 3.06951 13.4147 2.74408 13.0893C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56619C6.59083 8.08316 7.22016 7.77511 7.91667 7.77511C8.61317 7.77511 9.2425 8.08316 9.74448 8.56619L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5972 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76213C8.32758 9.51774 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51774 7.24972 9.76213Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z" fill="%2348B2E8"/></svg>';
    this.iconInvalidFormat = 'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L12 10.5858L13.2929 9.29289C13.6834 8.90237 14.3166 8.90237 14.7071 9.29289C15.0976 9.68342 15.0976 10.3166 14.7071 10.7071L13.4142 12L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L12 13.4142L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L10.5858 12L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289Z" fill="black"/></svg>';
    this.iconSpinnerScreenLoading = undefined;
    this.iconSpinnerFromGalleryExperience = undefined;
    this.iconGalleryScanningCompleted = undefined;
    this.sdkService = undefined;
    this.translationService = undefined;
    this.cameraId = null;
    this.allowHelpScreens = false;
    this.allowHelpScreensFab = false;
    this.allowHelpScreensOnboarding = false;
    this.allowHelpScreensOnboardingPerpetuity = false;
    this.helpScreensTooltipPauseTimeout = 15000;
    this.pingProxyUrl = null;
  }
  componentDidLoad() {
    // Set `exportparts` attribute on root `mb-component` element to enable ::part() CSS customization
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    const exportedParts = getWebComponentExportedParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute("exportparts", parts.concat(exportedParts).join(", "));
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  disconnectedCallback() {
    this.sdkService?.stopRecognition();
  }
  handleKeyUp(ev) {
    if (ev.key === "Escape" || ev.code === "Escape") {
      if (this.overlays.camera.visible && this.isCameraActive) {
        this.abortScan();
        this.handleSetIsCameraActive(false);
        this.clearIsCameraActive = true;
      }
    }
  }
  handleSetIsCameraActive(isCameraActive) {
    this.isCameraActive = isCameraActive;
    this.clearIsCameraActive = false;
  }
  /**
   * Starts camera scan using camera overlay with usage instructions.
   */
  async startCameraScan() {
    this.startScanFromCamera();
  }
  /**
   * Starts image scan, emits results from provided file.
   *
   * @param file File to scan
   */
  async startImageScan(file) {
    this.startScanFromImage(file);
  }
  /**
   * Starts multi-side image scan, emits results from provided files.
   *
   * @param firstFile File to scan as first image
   * @param secondFile File to scan as second image
   */
  async startMultiSideImageScan(firstFile, secondFile) {
    this.startScanFromImageMultiSide(firstFile, secondFile);
  }
  /**
   * Method is exposed outside which allow us to control UI state from parent component.
   *
   * In case of state `ERROR` and if `showModalWindows` is set to `true`, modal window
   * with error message will be displayed.
   */
  async setUiState(state) {
    window.setTimeout(() => {
      if (this.overlays.camera.visible) {
        if (state === "ERROR" && !this.showModalWindows) {
          this.apiProcessStatusState = "NONE";
          this.apiProcessStatusVisible = false;
          this.stopRecognition();
          return;
        }
        this.apiProcessStatusState = state;
        this.apiProcessStatusVisible = true;
        if (state !== "ERROR") {
          this.cameraExperience.classList.add("is-muted");
        }
        else {
          this.cameraExperience.classList.add("is-error");
        }
        this.cameraExperience.apiState = state;
      }
      else if (this.overlays.processing.visible) {
        if (state === "ERROR") {
          if (this.showModalWindows) {
            this.galleryExperienceModalErrorWindowVisible = true;
          }
          else {
            this.galleryExperienceModalErrorWindowVisible = false;
            this.stopRecognition();
          }
        }
      }
      if (state === "SUCCESS") {
        window.setTimeout(() => this.stopRecognition(), 400);
      }
      if (state === "ERROR") {
        this.hideScanFromImageUi(false);
        this.clearInputImages();
      }
    }, 400);
  }
  async closeApiProcessStatus(restart = false) {
    window.setTimeout(() => {
      this.apiProcessStatusVisible = false;
      this.apiProcessStatusState = "NONE";
      this.cameraExperience.classList.remove("is-muted");
      this.cameraExperience.classList.remove("is-error");
    }, 600);
    if (restart) {
      await this.checkInputProperties()
        .then(() => this.sdkService.resumeRecognition())
        .then(() => {
        window.setTimeout(() => (this.cameraExperience.apiState = ""), 400);
        this.isBackSide = false;
        this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide, true);
      });
    }
  }
  async init() {
    if (!this.hideLoadingAndErrorUi) {
      this.showScreen("loading");
      this.showOverlay("");
    }
    if (this.blocked) {
      return;
    }
    const internetIsAvailable = navigator.onLine;
    if (!internetIsAvailable) {
      this.setFatalError(new SDKError({
        code: ErrorCodes.InternetNotAvailable,
        message: this.translationService
          .i("check-internet-connection")
          .toString(),
      }));
      return;
    }
    const hasMandatoryProperties = await this.checkInputProperties();
    if (!hasMandatoryProperties) {
      return;
    }
    const hasMandatoryCapabilities = await checkMandatoryCapabilites();
    if (!hasMandatoryCapabilities) {
      this.setFatalError(new SDKError(componentErrors.browserNotSupported));
      return;
    }
    this.blocked = true;
    this.block.emit(true);
    const initEvent = await this.sdkService.initialize(this.licenseKey, {
      allowHelloMessage: this.allowHelloMessage,
      engineLocation: this.engineLocation,
      workerLocation: this.workerLocation,
      wasmType: getSDKWasmType(this.wasmType),
      blinkIdVariant: this.blinkIdVariant,
    });
    this.cameraExperience.showOverlay = this.sdkService.showOverlay;
    if (initEvent instanceof SDKError) {
      this.setFatalError(initEvent);
      return;
    }
    if (this.showActionLabels) {
      this.scanFromCameraButton.label = this.translationService
        .i("action-message-camera")
        .toString();
      this.scanFromImageButton.label = this.translationService
        .i("action-message-image")
        .toString();
    }
    if (this.scanFromCamera) {
      this.scanFromCameraButton.visible = true;
      const hasVideoDevices$1 = await hasVideoDevices();
      this.scanFromCameraButton.disabled = !hasVideoDevices$1;
      if (!hasVideoDevices$1) {
        this.feedback.emit({
          code: FeedbackCode.CameraDisabled,
          state: "FEEDBACK_INFO",
          message: this.translationService.i("camera-disabled").toString(),
        });
        if (this.showActionLabels) {
          this.scanFromCameraButton.label = this.translationService
            .i("action-message-camera-disabled")
            .toString();
        }
      }
    }
    if (this.scanFromImage) {
      this.scanFromImageButton.visible = true;
      const imageScanIsAvailable = this.sdkService.isScanFromImageAvailable(this.recognizers, this.recognizerOptions);
      this.scanFromImageButton.disabled = !imageScanIsAvailable;
      if (imageScanIsAvailable) {
        this.imageRecognitionType = this.sdkService.getScanFromImageType(this.recognizers, this.recognizerOptions);
        if (this.imageRecognitionType === ImageRecognitionType.SingleSide) {
          this.screens.processing.setAttribute("data-type", "single-sinde");
        }
        if (this.imageRecognitionType === ImageRecognitionType.MultiSide) {
          this.screens.processing.setAttribute("data-type", "multi-side");
        }
      }
      else {
        if (this.showActionLabels) {
          this.scanFromImageButton.label = this.translationService
            .i("action-message-image-not-supported")
            .toString();
        }
      }
    }
    this.ready.emit(initEvent);
    this.blocked = false;
    this.block.emit(false);
    this.showScreen("action");
    if (this.enableDrag) {
      this.setDragAndDrop();
    }
  }
  async flipCameraAction() {
    await this.sdkService.flipCamera();
    const cameraFlipped = await this.sdkService.isCameraFlipped();
    this.cameraExperience.setCameraFlipState(cameraFlipped);
  }
  async changeCameraDevice(camera) {
    if (this.cameraChangeInProgress) {
      return;
    }
    this.cameraChangeInProgress = true;
    await this.sdkService.changeCameraDevice(camera.details);
    this.cameraChangeInProgress = false;
  }
  async checkInputProperties() {
    if (!this.licenseKey) {
      this.setFatalError(new SDKError(sdkErrors.licenseKeyMissing));
      return false;
    }
    // Recognizers
    const conclusion = this.sdkService.checkRecognizers(this.recognizers);
    if (!conclusion.status) {
      const fatalError = new SDKError({
        code: ErrorCodes.InvalidRecognizers,
        message: conclusion.message,
      });
      this.setFatalError(fatalError);
      return false;
    }
    this.cameraExperience.type = this.sdkService.getDesiredCameraExperience(this.recognizers, this.recognizerOptions);
    return true;
  }
  async startScanFromCamera() {
    const configuration = {
      pingProxyUrl: this.pingProxyUrl,
      recognizers: this.recognizers,
      successFrame: this.includeSuccessFrame,
      cameraFeed: this.videoElement,
      cameraId: this.cameraId,
    };
    if (this.recognizerOptions &&
      Object.keys(this.recognizerOptions).length > 0) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    if (this.recognitionTimeout &&
      typeof this.recognitionTimeout === "number") {
      configuration.recognitionTimeout = this.recognitionTimeout;
    }
    this.isBackSide = false;
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: "FEEDBACK_OK",
            message: "",
          });
          this.showOverlay("camera");
          this.cameraExperience.setState(CameraExperienceState.Default);
          break;
        case RecognitionStatus.Ready:
          this.cameraExperience.setActiveCamera(this.sdkService.videoRecognizer.deviceId);
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.EmptyResultState:
          if (!recognitionEvent.data.initiatedByUser) {
            this.scanError.emit({
              code: Code.EmptyResult,
              fatal: false,
              message: "Could not extract information from video feed!",
              recognizerName: recognitionEvent.data.recognizerName,
            });
            this.feedback.emit({
              code: FeedbackCode.ScanUnsuccessful,
              state: "FEEDBACK_ERROR",
              message: this.translationService
                .i("feedback-scan-unsuccessful")
                .toString(),
            });
          }
          this.showOverlay("");
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          break;
        case RecognitionStatus.DetectionFailed:
          this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          this.detectionSuccessLock = false;
          break;
        case RecognitionStatus.DetectionStatusChange:
          // Use this event if information about card location is required
          break;
        case RecognitionStatus.DetectionStatusFail:
          this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          break;
        case RecognitionStatus.DetectionStatusSuccess:
          this.detectionSuccessLock = true;
          window.setTimeout(() => {
            if (this.detectionSuccessLock) {
              this.cameraExperience.setState(CameraExperienceState.Detection);
              this.scanReset = false;
            }
          }, 100);
          break;
        case RecognitionStatus.DetectionStatusCameraTooHigh:
          this.cameraExperience
            .setState(CameraExperienceState.MoveCloser)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DetectionStatusCameraAtAngle:
          this.cameraExperience
            .setState(CameraExperienceState.AdjustAngle)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DetectionStatusCameraTooNear:
        case RecognitionStatus.DetectionStatusDocumentTooCloseToEdge:
        case RecognitionStatus.DetectionStatusPartial:
          this.cameraExperience
            .setState(CameraExperienceState.MoveFarther)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.GlareDetected:
          this.cameraExperience.setState(CameraExperienceState.GlareDetected);
          break;
        case RecognitionStatus.BlurDetected:
          this.cameraExperience.setState(CameraExperienceState.BlurDetected);
          break;
        case RecognitionStatus.DetectionStatusSuccess:
          this.detectionSuccessLock = true;
          window.setTimeout(() => {
            if (this.detectionSuccessLock) {
              this.cameraExperience.setState(CameraExperienceState.Detection);
              this.scanReset = false;
            }
          }, 100);
          break;
        case RecognitionStatus.BarcodeScanningStarted:
          this.cameraExperience
            .setState(CameraExperienceState.BarcodeScanning, this.isBackSide, true)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DocumentClassified:
          this.cameraExperience.setState(CameraExperienceState.Classification);
          break;
        case RecognitionStatus.OnFirstSideResult:
          this.sdkService.videoRecognizer.pauseRecognition();
          window.setTimeout(async () => {
            if (this.areHelpScreensOpen) {
              return; // help screens close will resume
            }
            await this.sdkService.videoRecognizer.resumeRecognition(false);
          }, this.recognitionPauseTimeout);
          this.cameraExperience
            .setState(CameraExperienceState.Done, false, true)
            .then(() => {
            this.cameraExperience
              .setState(CameraExperienceState.Flip, this.isBackSide, true)
              .then(() => {
              if (!this.scanReset) {
                this.isBackSide = true;
                this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
              }
            });
          });
          break;
        case RecognitionStatus.ScanSuccessful:
          this.cameraExperience
            .setState(CameraExperienceState.DoneAll, false, true)
            .then(() => {
            this.cameraExperience.resetState();
            this.terminateHelpScreens();
            this.cameraExperience.classList.add("hide");
            this.scanSuccess.emit(recognitionEvent.data?.result);
            this.feedback.emit({
              code: FeedbackCode.ScanSuccessful,
              state: "FEEDBACK_OK",
              message: "",
            });
            this.showOverlay("");
          });
          break;
        case RecognitionStatus.CameraNotAllowed:
          this.scanError.emit({
            code: Code.CameraNotAllowed,
            fatal: true,
            message: "Cannot access camera!",
            recognizerName: "",
          });
          this.feedback.emit({
            code: FeedbackCode.CameraNotAllowed,
            state: "FEEDBACK_ERROR",
            message: this.translationService.i("camera-not-allowed").toString(),
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService
                .i("action-message-camera-not-allowed")
                .toString();
            }
          }, 10);
          this.showOverlay("");
          break;
        case RecognitionStatus.CameraInUse:
          this.scanError.emit({
            code: Code.CameraInUse,
            fatal: true,
            message: "Camera already in use!",
            recognizerName: "",
          });
          this.feedback.emit({
            code: FeedbackCode.CameraInUse,
            state: "FEEDBACK_ERROR",
            message: this.translationService.i("camera-in-use").toString(),
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService
                .i("action-message-camera-in-use")
                .toString();
            }
          }, 10);
          this.showOverlay("");
          break;
        case RecognitionStatus.NoSupportForMediaDevices:
        case RecognitionStatus.CameraNotFound:
        case RecognitionStatus.UnableToAccessCamera:
          this.scanError.emit({
            code: Code.CameraGenericError,
            fatal: true,
            message: `There was a problem while accessing camera ${recognitionEvent.status}`,
            recognizerName: "",
          });
          this.feedback.emit({
            code: FeedbackCode.CameraGenericError,
            state: "FEEDBACK_ERROR",
            message: this.translationService
              .i("camera-generic-error")
              .toString(),
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService
                .i("action-message-camera-disabled")
                .toString();
            }
          }, 10);
          this.showOverlay("");
          break;
        // console.warn('Unhandled video recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.cameraExperience.classList.remove("hide");
      this.cameraScanStarted.emit();
      void this.cameraExperience.populateCameraDevices();
      await this.sdkService.scanFromCamera(configuration, eventHandler);
      const cameraFlipped = this.sdkService.isCameraFlipped();
      this.cameraExperience.setCameraFlipState(cameraFlipped);
      this.initializeHelpScreensAndStartOnboarding();
    }
    catch (error) {
      this.handleScanError(error);
      this.showOverlay("");
    }
  }
  async startScanFromImage(file) {
    const configuration = {
      pingProxyUrl: this.pingProxyUrl,
      recognizers: this.recognizers,
      file: file || this.scanFromImageInput.files[0],
    };
    if (this.recognizerOptions &&
      Object.keys(this.recognizerOptions).length > 0) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: "FEEDBACK_OK",
            message: "",
          });
          this.showScanFromImageUi();
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.NoImageFileFound:
          this.scanError.emit({
            code: Code.NoImageFileFound,
            fatal: true,
            message: "No image file was provided to SDK service!",
            recognizerName: "",
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: "FEEDBACK_ERROR",
            message: this.translationService
              .i("feedback-scan-unsuccessful")
              .toString(),
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.DetectionFailed:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.EmptyResultState:
          this.scanError.emit({
            code: Code.EmptyResult,
            fatal: false,
            message: "Could not extract information from image!",
            recognizerName: recognitionEvent.data.recognizerName,
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: "FEEDBACK_ERROR",
            message: this.translationService
              .i("feedback-scan-unsuccessful")
              .toString(),
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.ScanSuccessful:
          this.scanSuccess.emit(recognitionEvent.data);
          this.feedback.emit({
            code: FeedbackCode.ScanSuccessful,
            state: "FEEDBACK_OK",
            message: "",
          });
          this.clearInputImages();
          this.hideScanFromImageUi(true);
          break;
        //console.warn('Unhandled image recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.imageScanStarted.emit();
      if (this.thoroughScanFromImage) {
        configuration.thoroughScan = true;
      }
      await this.sdkService.scanFromImage(configuration, eventHandler);
    }
    catch (error) {
      this.handleScanError(error);
      this.hideScanFromImageUi(false);
    }
  }
  async startScanFromImageMultiSide(firstFile, secondFile) {
    const configuration = {
      pingProxyUrl: this.pingProxyUrl,
      recognizers: this.recognizers,
      firstFile: firstFile || this.galleryImageFirstFile,
      secondFile: secondFile || this.galleryImageSecondFile,
    };
    if (this.recognizerOptions) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.showScanFromImageUi();
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: "FEEDBACK_OK",
            message: "",
          });
          break;
        case RecognitionStatus.Ready:
          this.cameraExperience.setActiveCamera(this.sdkService.videoRecognizer.deviceId);
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.NoFirstImageFileFound:
          this.scanError.emit({
            code: Code.NoFirstImageFileFound,
            fatal: true,
            message: "First image file is missing!",
            recognizerName: "",
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: "FEEDBACK_ERROR",
            message: this.translationService
              .i("feedback-scan-unsuccessful")
              .toString(),
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.NoSecondImageFileFound:
          this.scanError.emit({
            code: Code.NoSecondImageFileFound,
            fatal: true,
            message: "Second image file is missing!",
            recognizerName: "",
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: "FEEDBACK_ERROR",
            message: this.translationService
              .i("feedback-scan-unsuccessful")
              .toString(),
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.DetectionFailed:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.EmptyResultState:
          this.scanError.emit({
            code: Code.EmptyResult,
            fatal: false,
            message: "Could not extract information from image!",
            recognizerName: recognitionEvent.data.recognizerName,
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: "FEEDBACK_ERROR",
            message: this.translationService
              .i("feedback-scan-unsuccessful")
              .toString(),
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.ScanSuccessful:
          this.scanSuccess.emit(recognitionEvent.data);
          this.feedback.emit({
            code: FeedbackCode.ScanSuccessful,
            state: "FEEDBACK_OK",
            message: "",
          });
          this.clearInputImages();
          this.hideScanFromImageUi(true);
          break;
        //console.warn('Unhandled image recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.imageScanStarted.emit();
      if (this.thoroughScanFromImage) {
        configuration.thoroughScan = true;
      }
      await this.sdkService.scanFromImageMultiSide(configuration, eventHandler);
    }
    catch (error) {
      this.handleScanError(error);
      this.hideScanFromImageUi(false);
    }
  }
  handleScanError(error) {
    const isAvailable = navigator.onLine;
    if (!isAvailable) {
      const fatalError = new SDKError({
        code: ErrorCodes.InternetNotAvailable,
        message: this.translationService
          .i("check-internet-connection")
          .toString(),
      });
      this.setFatalError(fatalError);
      this.showLicenseInfoModal(this.translationService.i("check-internet-connection").toString());
      return;
    }
    if (error?.code === ErrorCodes$1.INVALID_PING_PROXY_URL) {
      this.setFatalError(new SDKError(componentErrors.pingProxyErrors.invalidProxyUrl, error));
    }
    else if (error?.code === ErrorCodes$1.PING_PROXY_PERMISSION_NOT_GRANTED) {
      this.setFatalError(new SDKError(componentErrors.pingProxyErrors.permissionNotGranted, error));
    }
    else if (error?.code === ErrorCodes$1.LICENSE_UNLOCK_ERROR) {
      this.setFatalError(new SDKError(componentErrors.licenseError, error));
      this.showLicenseInfoModal(error);
    }
    else {
      this.scanError.emit({
        code: Code.GenericScanError,
        fatal: true,
        message: "There was a problem during scan action.",
        recognizerName: "",
        details: error,
      });
      this.feedback.emit({
        code: FeedbackCode.GenericScanError,
        state: "FEEDBACK_ERROR",
        message: this.translationService.i("feedback-error-generic").toString(),
      });
      this.showOverlay("");
    }
  }
  showLicenseInfoModal(error) {
    if (typeof error === "string") {
      this.licenseExperienceModal.content = error;
    }
    else {
      if (error.type === "NETWORK_ERROR") {
        this.licenseExperienceModal.content = this.translationService
          .i("network-error")
          .toString();
      }
      else {
        this.licenseExperienceModal.content = this.translationService
          .i("scanning-not-available")
          .toString();
      }
    }
    this.showOverlay("modal");
  }
  showScreen(screenName) {
    for (const screenKey in this.screens) {
      if (this.screens[screenKey]) {
        this.screens[screenKey].visible = screenName === screenKey;
      }
    }
  }
  showOverlay(overlayName) {
    if (overlayName === "camera") {
      this.initialBodyOverflowValue = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = this.initialBodyOverflowValue;
    }
    for (const overlayKey in this.overlays) {
      if (this.overlays[overlayKey]) {
        this.overlays[overlayKey].visible = overlayName === overlayKey;
      }
    }
  }
  setDragAndDrop() {
    const dropTarget = this.galleryDropType === "FULLSCREEN" ? window : this.hostEl;
    const lockTimeout = 3000;
    let lockDragAndDrop = false;
    if (this.galleryDropType === "INLINE") {
      this.overlays.draganddrop.classList.add("inline");
    }
    const closeOverlay = () => {
      if (lockDragAndDrop) {
        window.setTimeout(() => {
          this.hostEl.style.borderStyle = "solid";
          this.overlays.draganddrop.classList.add("hidden");
          this.showOverlay("");
          window.setTimeout(() => {
            this.overlays.draganddrop.classList.remove("hidden");
            this.showScreen("action");
            this.hostEl.style.borderStyle = "solid";
          }, 500);
        }, lockTimeout);
      }
      else {
        this.showOverlay("");
        window.setTimeout(() => {
          this.showScreen("action");
          this.hostEl.style.borderStyle = "solid";
        }, 500);
      }
    };
    dropTarget.addEventListener("dragenter", (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      this.hostEl.style.borderStyle = "none";
    });
    dropTarget.addEventListener("dragover", (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      this.hostEl.style.borderStyle = "none";
      this.overlays.draganddrop.classList.remove("error");
      this.overlays.draganddrop.querySelector("img").src =
        this.iconDragAndDropGalleryDefault;
      this.overlays.draganddrop.querySelector("p").innerText =
        this.translationService.i("drop-info").toString();
      this.showOverlay("draganddrop");
    });
    this.dragAndDropZone.addEventListener("dragleave", (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      closeOverlay();
    });
    this.dragAndDropZone.addEventListener("drop", (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      if (hasSupportedImageFiles(ev.dataTransfer.files)) {
        this.startScanFromImage(ev.dataTransfer.files[0]);
      }
      else {
        this.overlays.draganddrop.classList.add("error");
        this.overlays.draganddrop.querySelector("p").innerText =
          this.translationService.i("drop-error").toString();
        this.overlays.draganddrop.querySelector("img").src =
          this.iconDragAndDropWarningDefault;
        lockDragAndDrop = true;
        window.setTimeout(() => {
          lockDragAndDrop = false;
        }, lockTimeout);
      }
      closeOverlay();
    });
  }
  setFatalError(error) {
    this.fatalError.emit(error);
    if (this.hideLoadingAndErrorUi) {
      return;
    }
    if (error.details) {
      switch (error.details?.code) {
        case ErrorCodes$1.LICENSE_UNLOCK_ERROR:
          const licenseErrorType = error.details?.type;
          switch (licenseErrorType) {
            case LicenseErrorType.NetworkError:
              this.errorMessage.innerText = this.translationService
                .i("network-error")
                .toString();
              break;
            default:
              this.errorMessage.innerText = this.translationService
                .i("scanning-not-available")
                .toString();
          }
          break;
        // Do nothing
      }
    }
    else {
      this.errorMessage.innerText = error.message;
    }
    this.showScreen("error");
    this.showOverlay("");
  }
  abortScan() {
    this.scanAborted.emit();
    this.stopRecognition();
  }
  stopRecognition() {
    this.terminateHelpScreens();
    this.cameraExperience.classList.add("hide");
    this.sdkService.stopRecognition();
    this.scanReset = true;
    window.setTimeout(() => {
      this.cameraExperience.setState(CameraExperienceState.Default, false, true);
      this.cameraExperience.apiState = "";
    }, 500);
    this.showOverlay("");
    this.closeApiProcessStatus();
  }
  closeGalleryExperienceModal() {
    this.galleryExperienceModalErrorWindowVisible = false;
    this.stopRecognition();
  }
  onFromImageClicked() {
    if (this.imageRecognitionType === ImageRecognitionType.SingleSide) {
      this.scanFromImageInput.click();
    }
    if (this.imageRecognitionType === ImageRecognitionType.MultiSide) {
      if (this.multiSideGalleryOpened) {
        this.closeMultiSideGalleryUpload();
      }
      else {
        this.openMultiSideGalleryUpload();
      }
    }
  }
  clearInputImages() {
    if (this.imageRecognitionType === ImageRecognitionType.SingleSide) {
      this.scanFromImageInput.value = "";
    }
    if (this.imageRecognitionType === ImageRecognitionType.MultiSide) {
      this.imageBoxFirst.clear();
      this.imageBoxSecond.clear();
    }
  }
  openMultiSideGalleryUpload() {
    const dialog = this.screens.action.querySelector(".multi-side-image-upload");
    dialog.classList.add("visible");
    this.scanFromImageButton.selected = true;
    this.multiSideGalleryOpened = true;
    this.overlays.draganddrop.classList.add("hidden");
  }
  closeMultiSideGalleryUpload() {
    const dialog = this.screens.action.querySelector(".multi-side-image-upload");
    dialog.classList.remove("visible");
    this.scanFromImageButton.selected = false;
    this.multiSideGalleryOpened = false;
    this.overlays.draganddrop.classList.remove("hidden");
  }
  async onMultiSideImageChange(ev, imageType) {
    if (imageType === MultiSideImageType.First) {
      this.galleryImageFirstFile = getImageFile(ev);
    }
    if (imageType === MultiSideImageType.Second) {
      this.galleryImageSecondFile = getImageFile(ev);
    }
    // Enable scan button only if both images have values
    this.multiSideScanFromImageButton.disabled =
      this.galleryImageFirstFile === null ||
        this.galleryImageSecondFile === null;
  }
  showScanFromImageUi() {
    if (this.galleryOverlayType === "INLINE") {
      const inProgress = this.screens.processing.querySelector("p.in-progress");
      const done = this.screens.processing.querySelector("p.done");
      inProgress.classList.add("visible");
      done.classList.remove("visible");
      this.showScreen("processing");
    }
    if (this.galleryOverlayType === "FULLSCREEN") {
      this.showOverlay("processing");
    }
  }
  hideScanFromImageUi(success) {
    if (this.galleryOverlayType === "INLINE") {
      let timeout = 0;
      const inProgress = this.screens.processing.querySelector("p.in-progress");
      const done = this.screens.processing.querySelector("p.done");
      inProgress.classList.remove("visible");
      if (success) {
        done.classList.add("visible");
        timeout = 1000;
      }
      window.setTimeout(() => this.showScreen("action"), timeout);
    }
    if (this.galleryOverlayType === "FULLSCREEN") {
      this.showOverlay("");
    }
  }
  render() {
    return (h(Host, null, h("mb-screen", { id: "mb-screen-loading", visible: !this.hideLoadingAndErrorUi, ref: (el) => (this.screens.loading = el) }, h("mb-spinner", { icon: this.iconSpinnerScreenLoading })), h("mb-screen", { id: "mb-screen-error", visible: false, ref: (el) => (this.screens.error = el) }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z", fill: "#6B7280" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7Z", fill: "#6B7280" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11 16C11 15.4477 11.4477 15 12 15H12.01C12.5623 15 13.01 15.4477 13.01 16C13.01 16.5523 12.5623 17 12.01 17H12C11.4477 17 11 16.5523 11 16Z", fill: "#6B7280" })), h("p", { ref: (el) => (this.errorMessage = el) })), h("mb-screen", { id: "mb-screen-action", visible: false, ref: (el) => (this.screens.action = el) }, h("div", { class: "actions" }, h("p", { class: "action-label" }, this.translationService.i("action-message").toString()), h("div", { class: "action-buttons" }, h("mb-button", { ref: (el) => (this.scanFromCameraButton = el), visible: true, disabled: false, clickHandler: () => this.startScanFromCamera(), imageSrcDefault: this.iconCameraDefault, imageSrcActive: this.iconCameraActive, buttonTitle: this.translationService.i("action-alt-camera") }), h("input", { tabindex: "-1", id: "scan-from-image-input", ref: (el) => (this.scanFromImageInput = el), type: "file", accept: "image/*", onChange: () => this.scanFromImageInput.value && this.startScanFromImage() }), h("mb-button", { ref: (el) => (this.scanFromImageButton = el), disabled: false, visible: false, selected: false, clickHandler: () => this.onFromImageClicked(), imageSrcDefault: this.iconGalleryDefault, imageSrcActive: this.iconGalleryActive, buttonTitle: this.translationService.i("action-alt-gallery") }))), h("div", { class: "multi-side-image-upload" }, h("div", { class: "image-upload-row" }, h("mb-image-box", { ref: (el) => (this.imageBoxFirst = el), "box-title": this.translationService
        .i("process-image-box-first")
        .toString(), "anchor-text": this.translationService
        .i("process-image-box-add")
        .toString(), onImageChange: (ev) => this.onMultiSideImageChange(ev.detail, MultiSideImageType.First) }), h("mb-image-box", { ref: (el) => (this.imageBoxSecond = el), "box-title": this.translationService
        .i("process-image-box-second")
        .toString(), "anchor-text": this.translationService
        .i("process-image-box-add")
        .toString(), onImageChange: (ev) => this.onMultiSideImageChange(ev.detail, MultiSideImageType.Second) })), h("mb-button-classic", { ref: (el) => (this.multiSideScanFromImageButton =
        el), disabled: true, clickHandler: () => this.startScanFromImageMultiSide() }, this.translationService.i("process-image-upload-cta").toString()))), h("mb-screen", { id: "mb-screen-processing", visible: false, ref: (el) => (this.screens.processing = el) }, h("p", { class: "in-progress" }, h("mb-spinner", { icon: this.iconSpinnerScreenLoading }), h("span", null, this.translationService
      .i("process-image-message-inline")
      .toString())), h("p", { class: "done" }, h("mb-completed", { icon: this.iconGalleryScanningCompleted }), h("span", null, this.translationService
      .i("process-image-message-inline-done")
      .toString()))), h("mb-overlay", { id: "mb-overlay-drag-and-drop", visible: false, ref: (el) => (this.overlays.draganddrop = el) }, h("img", { class: "drag-and-drop-icon", src: this.iconDragAndDropGalleryDefault }), h("p", { class: "drag-and-drop-message" }, "Whoops, we don't support that image format. Please upload a JPEG or PNG file."), h("div", { id: "drag-and-drop-zone", ref: (el) => (this.dragAndDropZone = el) })), h("mb-overlay", { id: "mb-overlay-gallery-experience", ref: (el) => (this.overlays.processing = el) }, h("mb-spinner", { icon: this.iconSpinnerFromGalleryExperience, size: "large" }), h("p", null, this.translationService.i("process-image-message").toString()), h("mb-modal", { visible: this.galleryExperienceModalErrorWindowVisible, modalTitle: this.translationService
        .i("feedback-scan-unsuccessful-title")
        .toString(), content: this.translationService
        .i("feedback-scan-unsuccessful")
        .toString(), onClose: () => this.closeGalleryExperienceModal() }, h("div", { slot: "actionButtons" }, h("button", { class: "primary modal-action-button", onClick: () => this.closeGalleryExperienceModal() }, this.translationService.i("modal-window-close").toString())))), h("mb-overlay", { id: "mb-overlay-camera-experience", visible: false, ref: (el) => (this.overlays.camera = el) }, h("div", { class: "holder" }, h("video", { part: "mb-camera-video", ref: (el) => (this.videoElement = el), playsinline: true }), h("mb-camera-experience", { ref: (el) => (this.cameraExperience = el), cameraExperienceStateDurations: this.cameraExperienceStateDurations, translationService: this.translationService, showScanningLine: this.showScanningLine, showCameraFeedbackBarcodeMessage: this.showCameraFeedbackBarcodeMessage, "clear-is-camera-active": this.clearIsCameraActive, onClose: () => this.abortScan(), onFlipCameraAction: () => this.flipCameraAction(), onSetIsCameraActive: (ev) => this.handleSetIsCameraActive(ev.detail), onChangeCameraDevice: (ev) => this.changeCameraDevice(ev.detail), allowHelpScreens: this.allowHelpScreens, allowHelpScreensFab: this.allowHelpScreensFab, allowHelpScreensOnboarding: this.allowHelpScreensOnboarding, allowHelpScreensOnboardingPerpetuity: this.allowHelpScreensOnboardingPerpetuity, helpScreensTooltipPauseTimeout: this.helpScreensTooltipPauseTimeout, class: "overlay-camera-element" }), h("mb-api-process-status", { visible: this.apiProcessStatusVisible, state: this.apiProcessStatusState, translationService: this.translationService, onCloseTryAgain: () => this.closeApiProcessStatus(true), onCloseFromStart: () => this.stopRecognition() }))), h("mb-overlay", { id: "mb-overlay-modal", visible: false, ref: (el) => (this.overlays.modal = el) }, h("mb-modal", { ref: (el) => (this.licenseExperienceModal = el), modalTitle: "Error" }, h("div", { slot: "actionButtons" }, h("button", { class: "primary modal-action-button", onClick: () => this.showOverlay("") }, this.translationService.i("modal-window-close").toString()))))));
  }
  get hostEl() { return getElement(this); }
};
MbComponent.style = mbComponentCss;

const mbContainerCss = ":host{display:block;min-width:280px;width:100%;height:100%;font-family:var(--mb-font-family)}";

const MbContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get hostEl() { return getElement(this); }
};
MbContainer.style = mbContainerCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function getFeedbackClassName(state) {
  switch (state) {
    case "FEEDBACK_ERROR":
      return "error";
    case "FEEDBACK_INFO":
      return "info";
    default:
      return "";
  }
}

const mbFeedbackCss = ":host{display:none}:host p{margin:4px 16px;font-family:var(--mb-font-family);font-size:var(--mb-feedback-font-size);font-style:var(--mb-feedback-font-style);font-weight:var(--mb-feedback-font-weight);letter-spacing:var(--mb-feedback-letter-spacing);line-height:var(--mb-feedback-line-height);text-align:right;text-transform:var(--mb-feedback-text-transform)}:host p.info{color:var(--mb-feedback-font-color-info)}:host p.error{color:var(--mb-feedback-font-color-error)}:host(.visible){display:block}:host([dir=rtl]) p{text-align:left}";

const MbFeedback = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.paragraphClassName = undefined;
    this.paragraphValue = undefined;
    this.visible = false;
  }
  /**
   * Call when FeedbackMessage which should be displayed.
   */
  async show(feedback) {
    this.paragraphValue = feedback.message;
    this.paragraphClassName = getFeedbackClassName(feedback.state);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible }) }, h("p", { class: this.paragraphClassName }, this.paragraphValue)));
  }
  get hostEl() { return getElement(this); }
};
MbFeedback.style = mbFeedbackCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const DEFEAULT_MB_HELP_ALLOW = false;
const DEFEAULT_MB_HELP_ALLOW_LOBBY = false;
const DEFEAULT_MB_HELP_ALLOW_ONBOARDING = false;
const DEFEAULT_MB_HELP_ALLOW_ONBOARDING_PERPETUITY = false;
const DEFAULT_MB_HELP_TOOLTOP_PAUSE_TIMEOUT_MS = 15000;

const mbHelpCss = ":host{font-family:inherit;visibility:hidden;opacity:0}:host(.visible){visibility:visible;opacity:1}.lobby{display:block;position:absolute;right:40px;bottom:40px;width:auto;height:auto}.lobby mb-tooltip-advanced{--background-color:var(--mb-help-lobby-button-tooltip-background-color);--font-color:var(--mb-help-lobby-button-tooltip-font-color)}.lobby mb-tooltip-advanced::part(tooltip){left:-46px;right:calc(50% - 19px);bottom:41px;width:auto}.lobby button{width:36px;height:36px;display:flex;justify-content:center;align-items:center;padding:0px;background-color:var(--mb-help-lobby-button-background-color);border:1px solid var(--mb-help-lobby-button-border-color);border-radius:50%;cursor:pointer}.lobby button:hover{background-color:var(--mb-help-lobby-button-hovered-background-color);border-color:var(--mb-help-lobby-button-hovered-border-color)}.lobby button:focus{background-color:var(--mb-help-lobby-button-focused-background-color);border-color:var(--mb-help-lobby-button-focused-border-color)}.lobby button svg.icon-question-mark{width:auto;height:18px}mb-overlay{background-color:var(--mb-help-modal-backdrop-color)}mb-modal::part(mb-modal-inner){background-color:var(--mb-help-modal-background-color);border-radius:var(--mb-modal-border-radius)}.modal-content{display:block;padding-top:20px}.modal-content .svg-container{display:flex;justify-content:center;margin-bottom:24px}.modal-content .svg-container svg{width:280px;height:auto;margin:0px auto}.modal-content p.title{font-family:inherit;font-style:normal;font-weight:700;font-size:24px;line-height:32px;text-align:center;color:var(--mb-help-font-color-primary);margin-bottom:8px}.modal-content p.description{font-family:inherit;font-style:normal;font-weight:400;font-size:16px;line-height:24px;text-align:center;margin-bottom:0px;color:var(--mb-help-font-color-secondary);min-height:96px}.modal-content .progress-tracker-container{display:flex;justify-content:center;margin-top:48px}.modal-content .buttons{display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:40px;margin-bottom:0px}.modal-content .buttons mb-button-classic{margin:0px 8px}.modal-content .buttons mb-button-classic::part(button){min-width:200px;width:auto}.modal-content .buttons.onboarding{margin-top:24px;margin-bottom:20px}.modal-content .buttons.onboarding mb-button-classic::part(button){min-width:155px;width:auto;height:56px}.modal-content mb-progress-tracker{--mb-progress-tracker-dot-active-color:var(--mb-help-progress-tracker-dot-active-color);--mb-progress-tracker-dot-inactive-color:var(--mb-help-progress-tracker-dot-inactive-color)}@media only screen and (max-width: 568px){.lobby{bottom:30px;right:20px}.modal-content p.description{text-align:left;min-height:120px}.modal-content .progress-tracker-container{margin-top:24px}.modal-content .buttons{margin-top:24px}.modal-content .buttons mb-button-classic{margin:0px 4px}.modal-content .buttons mb-button-classic::part(button){min-width:112px;width:auto}}@media only screen and (min-width: 568px){mb-modal{width:500px;max-width:100%;margin-left:auto;margin-right:auto}}";

const MbHelp = class {
  /**
   * Initializes - starts tooltip timer, etc.
   */
  async initialize(callbacks) {
    if (!this.allow) {
      return;
    }
    this.startTooltipTimer();
    this.callbacks = callbacks;
    this.isInitialized = true;
  }
  /**
   * Opens modal for Onboarding purpose.
   */
  async openOnboarding() {
    if (!this.allow || !this.allowOnboarding) {
      return;
    }
    if (!this.allowOnboardingPerpetuity && this.onboardingOpenCount > 0) {
      return;
    }
    this.activeStepIndex = 0;
    this.openInternal(this.ONBOARDING_OPEN_DELAY_MS);
    this.onboardingOpenCount++;
  }
  /**
   * Opens modal for Help Screens purpose.
   */
  async openHelpScreens() {
    if (!this.allow) {
      return;
    }
    this.activeStepIndex = 1;
    this.openInternal();
  }
  /**
   * Closes modal.
   */
  async close() {
    if (!this.allow) {
      return;
    }
    this.closeInternal();
  }
  /**
   * Terminates - cancels tooltip timer, closes modal, etc.
   */
  async terminate() {
    this.callbacks = null; // has to be before closeInternal
    this.closeInternal(true);
    this.cancelTooltipTimer();
    this.isInitialized = false;
  }
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ONBOARDING_OPEN_DELAY_MS = 100;
    this.openInternal = (withDelayMs = 0) => {
      setTimeout(() => {
        this.cancelTooltipTimer();
        this.isTooltipShownTimer = false;
        this.isModalShown = true;
        this.callbacks?.onOpen();
      }, withDelayMs);
    };
    this.closeInternal = (skipTooltipTimerStart = false) => {
      this.isModalShown = false;
      this.activeStepIndex = 1;
      if (!skipTooltipTimerStart) {
        this.startTooltipTimer();
      }
      this.callbacks?.onClose();
    };
    this.startTooltipTimer = () => {
      this.isTooltipShownTimer = false;
      const myTooltipTimerId = Date.now();
      this.tooltipTimerId = myTooltipTimerId;
      setTimeout(() => {
        if (this.tooltipTimerId !== myTooltipTimerId) {
          return;
        }
        this.isTooltipShownTimer = true;
      }, this.tooltipPauseTimeout);
    };
    this.cancelTooltipTimer = () => {
      this.tooltipTimerId = null;
    };
    this.amIVisible = (myVisibility) => {
      return (this.isInitialized &&
        this.allow &&
        (myVisibility == null ? true : myVisibility));
    };
    this.prepareTexts = () => {
      this.texts = {
        tooltip: this.translationService.i("help-button-lobby-tooltip"),
        steps: [
          {
            title: this.translationService.i("help-doc-valid-title"),
            description: this.translationService.i("help-doc-valid-description"),
            buttonNext: this.translationService.i("help-button-start-scanning"),
          },
          {
            title: this.translationService.i("help-doc-invalid-invisible-fields-title"),
            description: this.translationService.i("help-doc-invalid-invisible-fields-description"),
            buttonBack: this.translationService.i("help-button-back"),
            buttonNext: this.translationService.i("help-button-next"),
          },
          {
            title: this.translationService.i("help-doc-invalid-harsh-light-title"),
            description: this.translationService.i("help-doc-invalid-harsh-light-description"),
            buttonBack: this.translationService.i("help-button-back"),
            buttonNext: this.translationService.i("help-button-next"),
          },
          {
            title: this.translationService.i("help-doc-invalid-to-much-motion-title"),
            description: this.translationService.i("help-doc-invalid-to-much-motion-description"),
            buttonBack: this.translationService.i("help-button-back"),
            buttonNext: this.translationService.i("help-button-done"),
          },
        ],
      };
    };
    this.isInitialized = undefined;
    this.isTooltipShownHover = undefined;
    this.isTooltipShownTimer = undefined;
    this.isModalShown = undefined;
    this.activeStepIndex = undefined;
    this.allow = DEFEAULT_MB_HELP_ALLOW;
    this.allowFab = DEFEAULT_MB_HELP_ALLOW_LOBBY;
    this.allowOnboarding = DEFEAULT_MB_HELP_ALLOW_ONBOARDING;
    this.allowOnboardingPerpetuity = DEFEAULT_MB_HELP_ALLOW_ONBOARDING_PERPETUITY;
    this.tooltipPauseTimeout = DEFAULT_MB_HELP_TOOLTOP_PAUSE_TIMEOUT_MS;
    this.translationService = undefined;
    this.isInitialized = false;
    this.isTooltipShownHover = false;
    this.isTooltipShownTimer = false;
    this.onboardingOpenCount = 0;
    this.closeInternal(true);
    this.cancelTooltipTimer();
    this.prepareTexts();
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.amIVisible() }) }, this.amIVisible(this.allowFab) && (h("div", { class: "lobby" }, h("button", { onClick: () => {
        this.openInternal();
      }, onMouseEnter: () => {
        this.isTooltipShownHover = true;
      }, onMouseLeave: () => {
        this.isTooltipShownHover = false;
      } }, h(SvgQuestionMark, null)), h("mb-tooltip-advanced", { show: this.isTooltipShownHover || this.isTooltipShownTimer, arrowPosition: "arrow-down-right", message: this.texts.tooltip }))), h("mb-overlay", { visible: this.amIVisible(this.isModalShown) }, h("mb-modal", { visible: this.amIVisible(this.isModalShown), centered: true, elevated: true, hideFooter: true, hideCloseButton: this.activeStepIndex === 0, onClose: (event) => {
        event.stopPropagation();
        this.closeInternal();
      } }, h("div", { class: "modal-content", slot: "content" }, h("div", { class: "svg-container" }, this.activeStepIndex === 0 && h(SvgValidDocument, null), this.activeStepIndex === 1 && (h(SvgInvalidDocumentInvisibleFields, null)), this.activeStepIndex === 2 && h(SvgInvalidDocumentHarshLight, null), this.activeStepIndex === 3 && (h(SvgInvalidDocumentToMuchMotion, null))), h("p", { class: "title" }, this.texts.steps[this.activeStepIndex].title), h("p", { class: "description" }, this.texts.steps[this.activeStepIndex].description), this.activeStepIndex > 0 && (h("div", { class: "progress-tracker-container" }, h("mb-progress-tracker", { size: 3, current: this.activeStepIndex }))), this.activeStepIndex === 0 && (h("div", { class: "buttons onboarding" }, h("mb-button-classic", { clickHandler: () => {
        this.closeInternal();
      } }, this.texts.steps[this.activeStepIndex].buttonNext))), this.activeStepIndex === 1 && (h("div", { class: "buttons" }, h("mb-button-classic", { inverted: true, disabled: true, clickHandler: undefined }, this.texts.steps[this.activeStepIndex].buttonBack), h("mb-button-classic", { clickHandler: () => {
        this.activeStepIndex++;
      } }, this.texts.steps[this.activeStepIndex].buttonNext))), this.activeStepIndex === 2 && (h("div", { class: "buttons" }, h("mb-button-classic", { inverted: true, clickHandler: () => {
        this.activeStepIndex--;
      } }, this.texts.steps[this.activeStepIndex].buttonBack), h("mb-button-classic", { clickHandler: () => {
        this.activeStepIndex++;
      } }, this.texts.steps[this.activeStepIndex].buttonNext))), this.activeStepIndex === 3 && (h("div", { class: "buttons" }, h("mb-button-classic", { inverted: true, clickHandler: () => {
        this.activeStepIndex--;
      } }, this.texts.steps[this.activeStepIndex].buttonBack), h("mb-button-classic", { clickHandler: () => {
        this.closeInternal();
      } }, this.texts.steps[this.activeStepIndex].buttonNext))))))));
  }
};
const SvgQuestionMark = () => {
  return (h("svg", { class: "icon-question-mark", width: "12", height: "18", viewBox: "0 0 12 18", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0 6C0 2.685 2.685 0 6 0C9.315 0 12 2.685 12 6C12 7.92438 10.815 8.95998 9.66114 9.96831C8.56653 10.9249 7.5 11.8569 7.5 13.5H4.5C4.5 10.7681 5.91318 9.68488 7.15566 8.73251C8.13035 7.98541 9 7.31882 9 6C9 4.35 7.65 3 6 3C4.35 3 3 4.35 3 6H0ZM7.5 15V18H4.5V15H7.5Z", fill: "var(--mb-help-lobby-button-icon-color)" })));
};
const SvgValidDocument = () => {
  return (h("svg", { width: "280", height: "206", viewBox: "0 0 280 206", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { opacity: "0.3", d: "M227.084 34.369H47.5485C42.5252 34.369 38.4531 38.4267 38.4531 43.4321V139.09C38.4531 144.095 42.5252 148.153 47.5485 148.153H227.084C232.108 148.153 236.18 144.095 236.18 139.09V43.4321C236.18 38.4267 232.108 34.369 227.084 34.369Z", fill: "#142641" }), h("path", { d: "M231.284 28.7888H51.7477C46.7245 28.7888 42.6523 32.8465 42.6523 37.8519V133.509C42.6523 138.515 46.7245 142.572 51.7477 142.572H231.284C236.307 142.572 240.379 138.515 240.379 133.509V37.8519C240.379 32.8465 236.307 28.7888 231.284 28.7888Z", fill: "white" }), h("path", { d: "M231.284 143.73H51.7483C46.0923 143.73 41.4863 139.145 41.4863 133.505V37.8473C41.4863 32.2114 46.0877 27.6217 51.7483 27.6217H231.284C236.94 27.6217 241.546 32.2067 241.546 37.8473V133.505C241.546 139.141 236.945 143.73 231.284 143.73ZM51.7483 29.9514C47.3757 29.9514 43.8197 33.4948 43.8197 37.852V133.509C43.8197 137.867 47.3757 141.41 51.7483 141.41H231.284C235.657 141.41 239.213 137.867 239.213 133.509V37.8473C239.213 33.4901 235.657 29.9468 231.284 29.9468H51.7483V29.9514Z", fill: "#142641" }), h("path", { d: "M83.6829 87.0873C74.8629 87.0873 67.6855 79.9355 67.6855 71.1468C67.6855 62.358 74.8629 55.2062 83.6829 55.2062C92.5029 55.2062 99.6802 62.358 99.6802 71.1468C99.6802 79.9355 92.5029 87.0873 83.6829 87.0873ZM83.6829 57.5359C76.1509 57.5359 70.0189 63.6415 70.0189 71.1514C70.0189 78.6613 76.1462 84.7669 83.6829 84.7669C91.2195 84.7669 97.3469 78.6613 97.3469 71.1514C97.3469 63.6415 91.2195 57.5359 83.6829 57.5359Z", fill: "#142641" }), h("path", { d: "M109.387 107.036C108.743 107.036 108.22 106.516 108.22 105.874C108.22 95.5134 97.3233 87.0874 83.93 87.0874C70.5366 87.0874 59.64 95.5134 59.64 105.874C59.64 106.516 59.1173 107.036 58.4733 107.036C57.8293 107.036 57.3066 106.516 57.3066 105.874C57.3066 94.2346 69.2486 84.7623 83.93 84.7623C98.6113 84.7623 110.553 94.2346 110.553 105.874C110.553 106.516 110.031 107.036 109.387 107.036Z", fill: "#142641" }), h("path", { d: "M210.788 63.9391H124.712C124.068 63.9391 123.545 63.4183 123.545 62.7765C123.545 62.1348 124.068 61.614 124.712 61.614H210.788C211.432 61.614 211.955 62.1348 211.955 62.7765C211.955 63.4183 211.432 63.9391 210.788 63.9391Z", fill: "#142641" }), h("path", { d: "M210.966 80.3308H124.889C124.245 80.3308 123.723 79.81 123.723 79.1683C123.723 78.5265 124.245 78.0057 124.889 78.0057H210.966C211.61 78.0057 212.133 78.5265 212.133 79.1683C212.133 79.81 211.61 80.3308 210.966 80.3308Z", fill: "#142641" }), h("path", { d: "M187.24 96.5829H124.907C124.263 96.5829 123.74 96.0621 123.74 95.4203C123.74 94.7786 124.263 94.2578 124.907 94.2578H187.24C187.884 94.2578 188.406 94.7786 188.406 95.4203C188.406 96.0621 187.884 96.5829 187.24 96.5829Z", fill: "#142641" }), h("path", { d: "M187.269 127.116C186.797 127.116 186.349 126.827 186.177 126.358C185.953 125.758 186.261 125.088 186.863 124.86C188.921 124.098 190.783 122.875 192.313 121.335C191.557 121.131 190.773 120.768 190.171 120.145C189.457 119.401 189.121 118.415 189.21 117.295C189.275 116.411 189.644 115.518 190.269 114.714C190.391 114.556 190.512 114.398 190.633 114.235C191.226 113.44 191.903 112.537 192.892 111.933C193.928 111.301 195.141 111.152 196.145 111.538C197.073 111.891 197.764 112.677 198.086 113.756C198.366 114.686 198.324 115.709 197.96 116.709C197.68 117.49 197.339 118.243 196.947 118.973C198.436 118.652 199.869 118.085 201.185 117.29C201.717 116.969 202.403 117.039 202.855 117.471C203.303 117.899 203.411 118.583 203.107 119.127C202.851 119.592 202.608 120.215 202.907 120.554C203.131 120.81 203.569 120.805 203.882 120.671C204.498 120.401 204.946 119.852 205.431 118.778C205.655 118.285 206.108 117.922 206.635 117.815C207.177 117.704 207.741 117.857 208.152 118.225C209.337 119.289 210.985 119.852 212.543 119.736C214.345 119.606 216.076 118.578 217.056 117.067C217.406 116.527 218.125 116.369 218.671 116.718C219.212 117.067 219.371 117.783 219.021 118.327C217.653 120.443 215.241 121.875 212.721 122.056C210.765 122.2 208.796 121.619 207.209 120.452C206.719 121.354 206.001 122.284 204.829 122.8C203.509 123.382 202.034 123.093 201.152 122.084C200.844 121.731 200.475 121.14 200.443 120.294C198.791 121.005 197.031 121.438 195.239 121.568C193.279 124.019 190.657 125.948 187.684 127.055C187.549 127.106 187.413 127.13 187.278 127.13L187.269 127.116ZM194.983 113.649C194.707 113.649 194.39 113.742 194.11 113.914C193.503 114.281 193.018 114.932 192.505 115.62C192.374 115.797 192.243 115.969 192.113 116.137C191.87 116.448 191.576 116.932 191.534 117.471C191.487 118.08 191.693 118.373 191.851 118.536C192.253 118.955 193.065 119.22 194.035 119.262C194.749 118.225 195.337 117.104 195.767 115.918C195.953 115.397 195.986 114.863 195.851 114.421C195.678 113.849 195.403 113.742 195.309 113.705C195.211 113.667 195.099 113.649 194.983 113.649Z", fill: "#142641" }), h("path", { d: "M225.437 42.9531H58.4733C57.8293 42.9531 57.3066 42.4323 57.3066 41.7906C57.3066 41.1489 57.8293 40.6281 58.4733 40.6281H225.437C226.081 40.6281 226.604 41.1489 226.604 41.7906C226.604 42.4323 226.081 42.9531 225.437 42.9531Z", fill: "#142641" }), h("path", { d: "M109.387 124.363H58.4733C57.8293 124.363 57.3066 123.842 57.3066 123.2C57.3066 122.558 57.8293 122.038 58.4733 122.038H109.387C110.031 122.038 110.553 122.558 110.553 123.2C110.553 123.842 110.031 124.363 109.387 124.363Z", fill: "#142641" }), h("path", { d: "M241.504 159.057H38.4944C32.8384 159.057 28.2324 154.472 28.2324 148.832V26.9381C28.2324 21.3022 32.8338 16.7125 38.4944 16.7125H241.508C247.164 16.7125 251.77 21.2975 251.77 26.9381V148.836C251.77 154.472 247.169 159.062 241.508 159.062L241.504 159.057ZM38.4944 19.0422C34.1218 19.0422 30.5658 22.5856 30.5658 26.9428V148.836C30.5658 153.193 34.1218 156.737 38.4944 156.737H241.508C245.881 156.737 249.437 153.193 249.437 148.836V26.9381C249.437 22.581 245.881 19.0376 241.508 19.0376H38.4944V19.0422Z", fill: "var(--mb-help-color-success)" }), h("path", { d: "M138.601 194.84C146.204 194.84 152.367 188.698 152.367 181.122C152.367 173.546 146.204 167.404 138.601 167.404C130.998 167.404 124.834 173.546 124.834 181.122C124.834 188.698 130.998 194.84 138.601 194.84Z", fill: "var(--mb-help-color-success)" }), h("path", { d: "M144.755 177.081C144.298 176.625 143.561 176.625 143.103 177.081L136.962 183.2L134.288 180.536C133.831 180.08 133.093 180.08 132.636 180.536C132.179 180.992 132.179 181.726 132.636 182.182L136.099 185.637C136.327 185.865 136.626 185.977 136.925 185.977C136.939 185.977 136.948 185.977 136.962 185.977C136.976 185.977 136.985 185.977 136.999 185.977C137.298 185.977 137.597 185.865 137.825 185.637L144.755 178.732C145.213 178.276 145.213 177.541 144.755 177.086V177.081Z", fill: "white" })));
};
const SvgInvalidDocumentInvisibleFields = () => {
  return (h("svg", { width: "280", height: "197", viewBox: "0 0 280 197", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M241.266 13.426H38.7281C33.7049 13.426 29.6328 17.4981 29.6328 22.5214V144.55C29.6328 149.573 33.7049 153.645 38.7281 153.645H241.266C246.289 153.645 250.361 149.573 250.361 144.55V22.5214C250.361 17.4981 246.289 13.426 241.266 13.426Z", fill: "white" }), h("path", { d: "M48.3094 79.282C40.7494 79.282 33.6141 75.9594 28.7421 70.168C28.3268 69.6734 28.3921 68.9407 28.8821 68.5254C29.3768 68.11 30.1094 68.1754 30.5248 68.6654C34.9534 73.9294 41.4354 76.9487 48.3048 76.9487C61.1148 76.9487 71.5354 66.528 71.5354 53.718C71.5354 40.908 61.1148 30.4874 48.3048 30.4874C41.2954 30.4874 34.7341 33.6047 30.3008 39.0414C29.8948 39.5407 29.1574 39.6154 28.6581 39.2094C28.1588 38.8034 28.0841 38.066 28.4901 37.5667C33.3714 31.5887 40.5908 28.1587 48.3048 28.1587C62.4028 28.1587 73.8688 39.6247 73.8688 53.7227C73.8688 67.8207 62.4028 79.2867 48.3048 79.2867L48.3094 79.282Z", fill: "#142641" }), h("path", { d: "M90.5933 112.215C89.9493 112.215 89.4266 111.692 89.4266 111.048C89.4266 93.5293 71.1613 79.2773 48.7146 79.2773C42.144 79.2773 35.872 80.4626 30.0713 82.8006C29.474 83.0433 28.7926 82.754 28.5546 82.1566C28.312 81.5593 28.6013 80.878 29.1986 80.64C35.2793 78.19 41.8453 76.944 48.7146 76.944C72.4493 76.944 91.76 92.2413 91.76 111.048C91.76 111.692 91.2373 112.215 90.5933 112.215Z", fill: "#142641" }), h("path", { d: "M250.413 41.062H115.807C115.163 41.062 114.641 40.5393 114.641 39.8953C114.641 39.2513 115.163 38.7286 115.807 38.7286H250.417C251.061 38.7286 251.584 39.2513 251.584 39.8953C251.584 40.5393 251.061 41.062 250.417 41.062H250.413Z", fill: "#142641" }), h("path", { d: "M250.6 68.124H116.102C115.458 68.124 114.936 67.6013 114.936 66.9573C114.936 66.3133 115.458 65.7906 116.102 65.7906H250.6C251.244 65.7906 251.767 66.3133 251.767 66.9573C251.767 67.6013 251.244 68.124 250.6 68.124Z", fill: "#142641" }), h("path", { d: "M218.675 94.962H116.13C115.486 94.962 114.963 94.4393 114.963 93.7953C114.963 93.1513 115.486 92.6287 116.13 92.6287H218.675C219.319 92.6287 219.842 93.1513 219.842 93.7953C219.842 94.4393 219.319 94.962 218.675 94.962Z", fill: "#142641" }), h("path", { d: "M218.722 145.367C218.25 145.367 217.802 145.077 217.63 144.606C217.406 144.004 217.714 143.332 218.316 143.103C222.231 141.643 225.731 139.202 228.484 136.113C227 135.898 225.255 135.357 224.037 134.087C223.015 133.019 222.539 131.591 222.66 129.957C222.758 128.646 223.309 127.311 224.252 126.098C224.457 125.837 224.658 125.566 224.858 125.291C225.796 124.031 226.856 122.603 228.363 121.683C229.866 120.764 231.62 120.54 233.053 121.086C233.977 121.441 235.2 122.276 235.797 124.259C236.212 125.641 236.147 127.167 235.606 128.665C234.976 130.419 234.159 132.099 233.184 133.681C236.292 133.238 239.302 132.165 242.004 130.517C242.601 130.153 243.338 130.233 243.842 130.713C244.346 131.194 244.454 131.927 244.118 132.538C243.338 133.957 243.254 135.035 243.875 135.749C244.421 136.379 245.443 136.537 246.348 136.131C247.832 135.473 248.635 134.059 249.284 132.627C249.55 132.039 250.24 131.777 250.828 132.043C251.416 132.309 251.678 133 251.412 133.588C250.614 135.352 249.498 137.289 247.291 138.264C245.424 139.09 243.343 138.693 242.116 137.279C241.248 136.281 240.954 135.011 241.238 133.588C238.177 135.1 234.836 135.991 231.434 136.192C228.27 140.257 223.995 143.458 219.128 145.273C218.992 145.325 218.857 145.348 218.722 145.348V145.367ZM231.401 123.13C230.813 123.13 230.164 123.317 229.576 123.676C228.456 124.362 227.579 125.543 226.73 126.686C226.515 126.971 226.305 127.255 226.095 127.531C225.437 128.38 225.054 129.281 224.989 130.135C224.914 131.115 225.152 131.88 225.722 132.473C226.585 133.373 228.256 133.901 230.239 133.915C231.56 132.062 232.638 130.032 233.408 127.881C233.664 127.162 233.902 126.07 233.562 124.936C233.3 124.073 232.852 123.513 232.218 123.27C231.97 123.177 231.69 123.13 231.401 123.13Z", fill: "#142641" }), h("path", { d: "M90.595 140.821H29.401C28.757 140.821 28.2344 140.299 28.2344 139.655C28.2344 139.011 28.757 138.488 29.401 138.488H90.595C91.239 138.488 91.7617 139.011 91.7617 139.655C91.7617 140.299 91.239 140.821 90.595 140.821Z", fill: "#142641" }), h("path", { d: "M241.504 155.423H38.4944C32.8384 155.423 28.2324 150.822 28.2324 145.161V22.834C28.2324 17.178 32.8338 12.572 38.4944 12.572H241.508C247.164 12.572 251.77 17.1733 251.77 22.834V145.166C251.77 150.822 247.169 155.428 241.508 155.428L241.504 155.423ZM38.4944 14.91C34.1218 14.91 30.5658 18.466 30.5658 22.8387V145.166C30.5658 149.539 34.1218 153.095 38.4944 153.095H241.508C245.881 153.095 249.437 149.539 249.437 145.166V22.834C249.437 18.4613 245.881 14.9054 241.508 14.9054H38.4944V14.91Z", fill: "var(--mb-help-color-danger)" }), h("path", { d: "M139.999 191.333C147.602 191.333 153.766 185.17 153.766 177.567C153.766 169.964 147.602 163.8 139.999 163.8C132.396 163.8 126.232 169.964 126.232 177.567C126.232 185.17 132.396 191.333 139.999 191.333Z", fill: "var(--mb-help-color-danger)" }), h("path", { d: "M141.652 177.8L144.293 175.159C144.75 174.701 144.75 173.964 144.293 173.507C143.836 173.049 143.098 173.049 142.641 173.507L140 176.148L137.358 173.507C136.901 173.049 136.164 173.049 135.706 173.507C135.249 173.964 135.249 174.701 135.706 175.159L138.348 177.8L135.706 180.441C135.249 180.899 135.249 181.636 135.706 182.093C135.935 182.322 136.234 182.434 136.532 182.434C136.831 182.434 137.13 182.322 137.358 182.093L140 179.452L142.641 182.093C142.87 182.322 143.168 182.434 143.467 182.434C143.766 182.434 144.064 182.322 144.293 182.093C144.75 181.636 144.75 180.899 144.293 180.441L141.652 177.8Z", fill: "white" })));
};
const SvgInvalidDocumentHarshLight = () => {
  return (h("svg", { width: "280", height: "197", viewBox: "0 0 280 197", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { opacity: "0.3", d: "M227.668 29.708H48.1324C43.1092 29.708 39.0371 33.7801 39.0371 38.8033V134.801C39.0371 139.825 43.1092 143.897 48.1324 143.897H227.668C232.692 143.897 236.764 139.825 236.764 134.801V38.8033C236.764 33.7801 232.692 29.708 227.668 29.708Z", fill: "#142641" }), h("path", { d: "M231.868 24.108H52.3317C47.3084 24.108 43.2363 28.1801 43.2363 33.2034V129.201C43.2363 134.225 47.3084 138.297 52.3317 138.297H231.868C236.891 138.297 240.963 134.225 240.963 129.201V33.2034C240.963 28.1801 236.891 24.108 231.868 24.108Z", fill: "white" }), h("path", { d: "M231.868 139.459H52.3323C46.6763 139.459 42.0703 134.857 42.0703 129.197V33.1986C42.0703 27.5426 46.6716 22.9366 52.3323 22.9366H231.868C237.524 22.9366 242.13 27.538 242.13 33.1986V129.197C242.13 134.853 237.529 139.459 231.868 139.459ZM52.3323 25.2747C47.9596 25.2747 44.4036 28.8306 44.4036 33.2033V129.201C44.4036 133.574 47.9596 137.13 52.3323 137.13H231.868C236.241 137.13 239.797 133.574 239.797 129.201V33.1986C239.797 28.826 236.241 25.27 231.868 25.27H52.3323V25.2747Z", fill: "#142641" }), h("path", { d: "M84.2669 82.6139C75.4469 82.6139 68.2695 75.4366 68.2695 66.6166C68.2695 57.7966 75.4469 50.6193 84.2669 50.6193C93.0869 50.6193 100.264 57.7966 100.264 66.6166C100.264 75.4366 93.0869 82.6139 84.2669 82.6139ZM84.2669 52.9573C76.7349 52.9573 70.6029 59.0846 70.6029 66.6213C70.6029 74.1579 76.7302 80.2853 84.2669 80.2853C91.8035 80.2853 97.9309 74.1579 97.9309 66.6213C97.9309 59.0846 91.8035 52.9573 84.2669 52.9573Z", fill: "#142641" }), h("path", { d: "M109.971 102.634C109.327 102.634 108.804 102.111 108.804 101.467C108.804 91.07 97.9073 82.614 84.514 82.614C71.1206 82.614 60.224 91.07 60.224 101.467C60.224 102.111 59.7013 102.634 59.0573 102.634C58.4133 102.634 57.8906 102.111 57.8906 101.467C57.8906 89.7866 69.8326 80.2806 84.514 80.2806C99.1953 80.2806 111.137 89.7866 111.137 101.467C111.137 102.111 110.615 102.634 109.971 102.634Z", fill: "#142641" }), h("path", { d: "M211.372 59.3833H125.296C124.652 59.3833 124.129 58.8606 124.129 58.2166C124.129 57.5726 124.652 57.0499 125.296 57.0499H211.372C212.016 57.0499 212.539 57.5726 212.539 58.2166C212.539 58.8606 212.016 59.3833 211.372 59.3833Z", fill: "#142641" }), h("path", { d: "M211.548 75.8333H125.471C124.827 75.8333 124.305 75.3107 124.305 74.6667C124.305 74.0227 124.827 73.5 125.471 73.5H211.548C212.192 73.5 212.715 74.0227 212.715 74.6667C212.715 75.3107 212.192 75.8333 211.548 75.8333Z", fill: "#142641" }), h("path", { d: "M187.824 92.1433H125.491C124.847 92.1433 124.324 91.6206 124.324 90.9766C124.324 90.3326 124.847 89.8099 125.491 89.8099H187.824C188.468 89.8099 188.99 90.3326 188.99 90.9766C188.99 91.6206 188.468 92.1433 187.824 92.1433Z", fill: "#142641" }), h("path", { d: "M187.853 122.785C187.381 122.785 186.933 122.495 186.761 122.024C186.537 121.422 186.845 120.75 187.447 120.521C189.505 119.756 191.367 118.529 192.897 116.984C192.141 116.779 191.357 116.415 190.755 115.789C190.041 115.043 189.705 114.053 189.794 112.929C189.859 112.042 190.228 111.146 190.853 110.339C190.975 110.18 191.096 110.021 191.217 109.858C191.81 109.06 192.487 108.155 193.476 107.548C194.512 106.913 195.725 106.769 196.729 107.151C197.657 107.506 198.348 108.295 198.67 109.377C198.95 110.311 198.908 111.337 198.544 112.341C198.264 113.125 197.923 113.881 197.531 114.613C199.02 114.291 200.453 113.722 201.769 112.924C202.301 112.597 202.991 112.672 203.439 113.106C203.887 113.535 203.995 114.221 203.691 114.767C203.435 115.234 203.192 115.859 203.491 116.2C203.715 116.457 204.153 116.452 204.466 116.317C205.082 116.046 205.53 115.495 206.015 114.417C206.239 113.923 206.692 113.559 207.219 113.451C207.756 113.339 208.325 113.493 208.736 113.862C209.921 114.931 211.573 115.495 213.127 115.379C214.929 115.248 216.66 114.217 217.64 112.7C217.99 112.159 218.709 112 219.255 112.35C219.796 112.7 219.955 113.419 219.605 113.965C218.237 116.088 215.825 117.525 213.305 117.707C211.349 117.852 209.38 117.269 207.793 116.097C207.303 117.003 206.585 117.936 205.413 118.454C204.093 119.037 202.618 118.748 201.736 117.735C201.428 117.381 201.059 116.788 201.027 115.939C199.375 116.653 197.615 117.087 195.823 117.217C193.863 119.677 191.241 121.613 188.268 122.724C188.133 122.775 187.997 122.799 187.862 122.799L187.853 122.785ZM195.567 109.27C195.291 109.27 194.974 109.363 194.694 109.536C194.087 109.905 193.602 110.558 193.089 111.249C192.958 111.426 192.827 111.599 192.697 111.767C192.454 112.079 192.16 112.565 192.118 113.106C192.071 113.717 192.277 114.011 192.435 114.175C192.837 114.595 193.649 114.861 194.619 114.903C195.333 113.862 195.921 112.737 196.351 111.547C196.537 111.025 196.57 110.488 196.435 110.045C196.262 109.471 195.987 109.363 195.893 109.326C195.795 109.289 195.683 109.27 195.567 109.27Z", fill: "#142641" }), h("path", { d: "M226.021 38.3226H59.0573C58.4133 38.3226 57.8906 37.7999 57.8906 37.1559C57.8906 36.5119 58.4133 35.9893 59.0573 35.9893H226.021C226.665 35.9893 227.188 36.5119 227.188 37.1559C227.188 37.7999 226.665 38.3226 226.021 38.3226Z", fill: "#142641" }), h("path", { d: "M109.971 120.022H59.0573C58.4133 120.022 57.8906 119.499 57.8906 118.855C57.8906 118.211 58.4133 117.689 59.0573 117.689H109.971C110.615 117.689 111.137 118.211 111.137 118.855C111.137 119.499 110.615 120.022 109.971 120.022Z", fill: "#142641" }), h("path", { d: "M241.504 155.423H38.4944C32.8384 155.423 28.2324 150.822 28.2324 145.161V22.834C28.2324 17.178 32.8338 12.572 38.4944 12.572H241.508C247.164 12.572 251.77 17.1733 251.77 22.834V145.166C251.77 150.822 247.169 155.428 241.508 155.428L241.504 155.423ZM38.4944 14.91C34.1218 14.91 30.5658 18.466 30.5658 22.8387V145.166C30.5658 149.539 34.1218 153.095 38.4944 153.095H241.508C245.881 153.095 249.437 149.539 249.437 145.166V22.834C249.437 18.4613 245.881 14.9054 241.508 14.9054H38.4944V14.91Z", fill: "var(--mb-help-color-danger)" }), h("path", { d: "M140.001 191.333C147.604 191.333 153.768 185.17 153.768 177.567C153.768 169.964 147.604 163.8 140.001 163.8C132.398 163.8 126.234 169.964 126.234 177.567C126.234 185.17 132.398 191.333 140.001 191.333Z", fill: "var(--mb-help-color-danger)" }), h("path", { d: "M141.652 177.8L144.293 175.159C144.75 174.701 144.75 173.964 144.293 173.507C143.836 173.049 143.098 173.049 142.641 173.507L140 176.148L137.358 173.507C136.901 173.049 136.164 173.049 135.706 173.507C135.249 173.964 135.249 174.701 135.706 175.159L138.348 177.8L135.706 180.441C135.249 180.899 135.249 181.636 135.706 182.093C135.935 182.322 136.234 182.434 136.532 182.434C136.831 182.434 137.13 182.322 137.358 182.093L140 179.452L142.641 182.093C142.87 182.322 143.168 182.434 143.467 182.434C143.766 182.434 144.064 182.322 144.293 182.093C144.75 181.636 144.75 180.899 144.293 180.441L141.652 177.8Z", fill: "white" }), h("rect", { x: "43.4004", y: "24.2667", width: "124.6", height: "113.867", fill: "url(#paint0_radial_2531_10402)" }), h("rect", { x: "43.4004", y: "24.2667", width: "124.6", height: "113.867", fill: "url(#paint1_radial_2531_10402)" }), h("defs", null, h("radialGradient", { id: "paint0_radial_2531_10402", cx: "0", cy: "0", r: "1", gradientUnits: "userSpaceOnUse", gradientTransform: "translate(105.7 81.2001) rotate(90) scale(56.9333 62.3)" }, h("stop", { offset: "0.546875", "stop-color": "white", "stop-opacity": "0.99" }), h("stop", { offset: "1", "stop-color": "white", "stop-opacity": "0.03" })), h("radialGradient", { id: "paint1_radial_2531_10402", cx: "0", cy: "0", r: "1", gradientUnits: "userSpaceOnUse", gradientTransform: "translate(105.7 81.2001) rotate(90) scale(56.9333 62.3)" }, h("stop", { offset: "0.546875", "stop-color": "white", "stop-opacity": "0.97" }), h("stop", { offset: "1", "stop-color": "white", "stop-opacity": "0.03" })))));
};
const SvgInvalidDocumentToMuchMotion = () => {
  return (h("svg", { width: "280", height: "197", viewBox: "0 0 280 197", fill: "none", xmlns: "http://www.w3.org/2000/svg", xlinkHref: "http://www.w3.org/1999/xlink" }, h("g", { opacity: "0.3" }, h("rect", { x: "22.168", y: "12.6", width: "231.467", height: "148.4", fill: "url(#pattern0)" })), h("rect", { x: "26.3672", y: "7", width: "231.467", height: "148.4", fill: "url(#pattern1)" }), h("rect", { x: "24.9648", y: "6.06665", width: "234.267", height: "150.267", fill: "url(#pattern2)" }), h("path", { d: "M241.506 155.423H38.4964C32.8404 155.423 28.2344 150.822 28.2344 145.161V22.834C28.2344 17.178 32.8357 12.572 38.4964 12.572H241.51C247.166 12.572 251.772 17.1733 251.772 22.834V145.166C251.772 150.822 247.171 155.428 241.51 155.428L241.506 155.423ZM38.4964 14.91C34.1237 14.91 30.5677 18.466 30.5677 22.8387V145.166C30.5677 149.539 34.1237 153.095 38.4964 153.095H241.51C245.883 153.095 249.439 149.539 249.439 145.166V22.834C249.439 18.4613 245.883 14.9054 241.51 14.9054H38.4964V14.91Z", fill: "var(--mb-help-color-danger)" }), h("path", { d: "M140.001 191.333C147.604 191.333 153.768 185.17 153.768 177.567C153.768 169.964 147.604 163.8 140.001 163.8C132.398 163.8 126.234 169.964 126.234 177.567C126.234 185.17 132.398 191.333 140.001 191.333Z", fill: "var(--mb-help-color-danger)" }), h("path", { d: "M141.652 177.8L144.293 175.159C144.75 174.701 144.75 173.964 144.293 173.507C143.836 173.049 143.098 173.049 142.641 173.507L140 176.148L137.358 173.507C136.901 173.049 136.164 173.049 135.706 173.507C135.249 173.964 135.249 174.701 135.706 175.159L138.348 177.8L135.706 180.441C135.249 180.899 135.249 181.636 135.706 182.093C135.935 182.322 136.234 182.434 136.532 182.434C136.831 182.434 137.13 182.322 137.358 182.093L140 179.452L142.641 182.093C142.87 182.322 143.168 182.434 143.467 182.434C143.766 182.434 144.064 182.322 144.293 182.093C144.75 181.636 144.75 180.899 144.293 180.441L141.652 177.8Z", fill: "white" }), h("defs", null, h("pattern", { id: "pattern0", patternContentUnits: "objectBoundingBox", width: "1", height: "1" }, h("use", { xlinkHref: "#image0_2531_10435", transform: "scale(0.00201613 0.00314465)" })), h("pattern", { id: "pattern1", patternContentUnits: "objectBoundingBox", width: "1", height: "1" }, h("use", { xlinkHref: "#image1_2531_10435", transform: "scale(0.00201613 0.00314465)" })), h("pattern", { id: "pattern2", patternContentUnits: "objectBoundingBox", width: "1", height: "1" }, h("use", { xlinkHref: "#image2_2531_10435", transform: "scale(0.00199203 0.00310559)" })), h("image", { id: "image0_2531_10435", width: "496", height: "318", xlinkHref: "data:image/png;base64,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" }), h("image", { id: "image1_2531_10435", width: "496", height: "318", xlinkHref: "data:image/png;base64,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" }), h("image", { id: "image2_2531_10435", width: "502", height: "322", xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfYAAAFCCAYAAAADsP/fAAAACXBIWXMAAAsSAAALEgHS3X78AAAgAElEQVR4nOy9Wa9t15me97zfmHM1u9+npagjiSUzpcS0C4iFwKk4CBjEsS0EBoIAvAiQH6N/krvcKMlNLgTURUCkcRADurFNJ65iVVEiRZ52981aa87xvbkYax2ybANOIakqUZ4PcLD3XnvtuWYzxte+YxyYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJj4jUZ/1ScwMTExMfGXxr91Nj/+qk/gL4+fBsDjDz7c5+2Dbq+9++N/uPdn3vrjH/d88MHs33DAf4vu3cTExMRfJj/9pn19+/3pD//uMdBs9Fs+KgCPfvR3Dvngg9kHH3w0+/oYP4333vtw/uzZ7y//7N/8dvPbHMno/fd/Mvv0059vTn/4d4+co6JbpmJ9qDIkmTcz9/NVLjc53gfAolv2q/F+UHR+d3l6/2L8cj6u+/KoW96/Wl7v9RuP47ovANEt8+zTn1/BR4WPgJ/9rAJ68P5PDs8+/ds38NMEePbs95dfPN2MrH4oPvnZ5u3Zffhhx8cfV8B/+bdmYmJi4i+e99//yXwc7/XZZx+v3n//J/NPP/35emv7Rvhp8NEn4mc/q48/+PAA4BWvNnzyyYYPP+x49SpObh/vPeqW95/OD3wcX+33G48H6364mQ/9uO6Lc5QP93V0eXV/dXy0PLq8ur8+LYtuPdubk+u7DePuXKLj4OwZz08+46CbD/X1v/jfr//q7sxfLL+djv2jj8p3/+nZydoxn3nYbNTPOg2zquyLY6gDXRWrGXW9oXsSXQxoc925zNely91hxurbbqP90mtUN2RdZT/ro+S63G9c17k/j35YP6kbngOUWexHn5fAwXDLyoej9tddqXUW67rZKDp3y7F6HDSu+6LoXPr7HNd96fcZh1u6E1h13dKffvrz9fvv/2R+d9yVL3/xP909/b2/t//in/zB3fbU/HaSfPDBjMXC/OIXw1/FrZ6YmPi289PYJSJveet84b33Plx89t7WQV5fi1/8Ynj6e39v/1E9HtbrG3366c83jz/48OmrTz5+8ezZ7y+++P1nm8f//NVyVst87dVmZ9/6gYWi2Fl1089zcTf23qu3Utm3qzwOt5su+4X2em6h62vdlNpvYm8dt+vM/Xkc1lHjUIr6zd5mZIy+1s5lflfmV3t1feRhdjeWse9z2NCVfQ+zO7rV/jAyzvoom5ExR24ALh5e3z4dHs5e/JP/6P5fuf5vOb91jv30h3/3mCXHWm2sEvuueVsiHipKOmvYERTfFpehxvj9HPWq63Qc5Jd2SgoDVGWfNYokZ40SXRvYqnXPpdx11M1ozZVeOvqX9nDUB6vR/UbjsJcl7vvIPscoI7mOvtbdOcZqlo566Fm9LZtlvV9o7Idh2eewqfNScohSBo0b1/W8zGZ1dl9iNUvvVfUD49CzGu+7UpelxO069zaHm5vTzaLc13r+/fH2wRfLvbPjl/ePV4fz4/VyuLvryubwrKjr/eqTj2/+7B37qMAH5sOPYzeRJyYmviX8+Mc9h4fm44/Ht874xz/u+cUPE35Wv/HOYFsdfPD+Tw6jXPn1v3j3jg9f6bvPy/Gm1PUmxh5gcbfXDyqr3nVRTuY349ndoaK4lE3WOotSNrkptZ97trkfhr2ZvLKXUr9pLc2x3rosD4ZxNfYdXaXMsvoWIEqfOa5L39HVWK5ch3AdoyvlQYQvq7If6DYxZO2IuXOMMouhqu/ZDC4941oczM1NHegovFOznHV4DWCnopvVqs0PVLmIyMvMOAZQlKz2olP3quJ1jusy66N4mN29+OM/ePmX+NT+wvltcex69KO/cwCzd6NqpKtPXHVfzaIoZjKL7HKjykW1l0WlT+WsRNwlOVPloh2FAwddjqz6rrttgYDlKKfGiswzldjLkRUlQ7Wr7mqoukbpataxVJdNFJ6i6hz1yr0F0G1YVWleKLNK3bi3ug2rKF1mUSkehs2ofWe5Zj4eldSQNcqsq3cAI3qIuYHuOusQZc5Y13RR+hyj9oqw1mPOOrr1pstlN95lcACwGbIuStzf9PPsh/UTafi1PT8a+v7+YFjH0NPV9fIuypXV9fseh9uTerR5fXC/7O6HerDuhwtY9PuMdb0MgLPjl/f84h/WFun+NOCnBvzBBx/NPvlmy+HrbEDwU/22RcYTE/9mfhrwSbO1P/6TeOuIP/qo8LOf1WfPfn/ZdXNfwCK6ZZ7ND1bvr280nx/4dbnsD+/KOI73Ajg/HJcHwzzux5shSufYLPa6B3vXXF/vZVZ5b3k3rsaT6LNCSyJ2ma/HPrIOEX2tUWZZN+5cxyiLGOqari/Z45nWJWsMWaMre8gHnfNsdL/pNMyGqqdZy1dRNvtBzFOsovQ16+YE9zfBOJdkl+5OzkfOWsbCRZ8lPNa7LHQAWej6qpKKB1nyZRncK0ra9Qhz4yinWd1HlxvMTdZyB9B3Q6mUWY7uS9AptO/qFwCJ5oHXBO+QPK+Ux13k3Zixh+t1EBuF9p0ZCleAmqVm7y9nK6269cX1l797uPltSHB+Gxy7nj37/cX93vKBkqeUDMSBaiSRe666p/Pb61TGEiyH75SxdOQ9AKO8e19YQ8o9Yxw66BCXRe5zFxWmb1E5lDKVjFbpUbUz7hAHrnnXFZWUe9A1IweKSKdvJQ5UvEy8tiMwN4HmpG6s+q4UV468C8fgOhSVvuIUwFBcNbRjYcuOa/c1Zk6NdTai0VGyBjEfx/ZVJfY85MssdJ1ynWMUKezQu1a+zBqlw2s6nu7eVzKG0eOmzOYLAA01a+hBH/XVZshaFjGwzu9kdC+dKUV4EVqNQym1u70fZuqW9+rGsui7uhqyzqJb712P87vDKJt8Pn/n8t3zVQdfEjHzF1/8/fX77/+f/aef/nx4770PZ5999vHqz2QiAB98NPszGoWJib9wvg5Yd688/b2/t9+fXecXX/z99XvvfTzruqUv5/d9Xd/H4vjJOHtznZ+9x/jeZ3TDouyPs7Iqr994OD08WjPfzFlvNjH2y3t1AHfzvXowrGNNzKPPOtLNZqtYSfd20UF2cZ9DlDLTyMoH2fnEqedOHUe/OR/pZ7EZsy+zPusYzHpFdW3Oub4LcaVw7ZRrU951dC+dYzg5yc633YZVFjpJtvMoi+6j8s7u7wplM6YXzlokmdA+5qYEnWveqcSea97tsuGgzl3KLZlhc4J1XYqK0ye2g9LK4IxyFMasdDsn66Db2WRn3AEock8jj9TFl06fONxeT8bmpBVpLwXrKIy2lWZRrELwvNqPQdcKV2Usnb6LjoVtWawAdoFDX4b7/nZ4/sXxVeWTT77Vtubb7dg/+Gh2en++7Hv/AKcyfErlwGIV8NDEocnXIR6SVIfOSKqkBMvmJKzXWfKx4I1TJa0hOuY4j2TG5qx9aNGBv2wDjxMpM1IrhwJnpLSCOMT1ucRTmxdYR6VwW9PvKPilkxNoA1vwCAo4g+IvMd+V+aXhGSovqJkKv+PgBbZC3cpJJ2XaOpK9V+UaxLpa4y4yLXjtULFrCcemVSbKbU1G5MOwF4o4T9dB9tJZTpAzis7tPErHWYtoOVDoPEdWitjDGXZc991QqsumhvtupEvFDEChC1yPnHkrlydR4nys4757XcfY1VrG+5J+3CasL6MrezhuALKMp0V+E0O3N+S4KXPGbcuhK+ta75ce5zfz2SCtSl/fKWN/Xjt3s4PFBV99CQeHe7ersfZLj6+7d9fPLr8oq/3oTurR5tNn9/X9L5alCXg+3Ewth99yPvyw4+PHhp+ZDz8MPv54fP/9n8w/PX6ZTYfy03j6e/9o+eLBZn38ZjwE2F93pS5m91k3h7tW16yW+ejhaDPMzqTNUVnE+XjfFWlzBDAulrezMRc1hgfa5OWsj7LLatPlaByH807djI6n8vgVmh2YPBxHX3ZBV/HaWaKozhQlaw6DXJ5Ep4H0bTULJGMrXDYZ2UuZodI7fSL8ZSVmUrVtBZpjbiQ5FQ9s30qZ1MgkZyXiNO0zgEBzlCnJNXlaghc2xzLLGjqPZHxb0aw+tbxWMGYtfYlaVCNTPLT8UslI4djoJuBhwhvhg3buuhF1bsrarsfATQmVrHSGeYhVih77FjgoofvEaycngTYJaxTfKcpXtg+NNiQHloqU2Wx26aJk0xeNcsq9QnuSr8ZRLiVDNdLFz9I6xxZyyhqiMDLKFisVRmt8ZbpDV1686V+8+jY792+1Y3/0o//83azjaRQv7fje7qGF4tTOYmINVkglnecQh5BflVABGGtkCZ9g39oOBWNznlEt91QZ+dDBbcvM/QiVqsy0VCCvQ5plMiq8VNKn4hJ8CL4CKFapUgoeAph8rYgqewkc2HSGlULnUT3LYHDSIQ4Ql5JSZgFWWgNyBn7k1HOwFNpLWMt6jPzSxFHgNfjQyQvJBwZZpYt0T0CmLxVeOnWP5GIHRdd2xvYeXWNFdQwl8jTxLBxvQDeOWuwIif2wz4wPcagmVYVRyNRMFS/TLAJtkPZxfpXEBmSoxxBXRe7bPfGhk47CTViDHRGhizG9CPHQ5CzML00cKRjFcDPW2VhKniZ6DeDM74F/XUvcA8TgAwj33VCGgYtCzN31dygPYs1lzqLEJmvX17rRsAYo4/6yzlRmdT1kVi3Gcn27T7eqZb43K6v11aZ/1C3vd+Pv009/PvDjH5etcFFMKxz+vOzu2c4O+evWzUfl8Qevlq/++uP701+cH5x/f7z94NXj+Jyrg2XxOuvm0ONwO3M/vyuxr3V4137yMLurnbsyahzL+gfYN7XEfUeZOX3baZxV9X2OdHaN6OKJpC9idE38jC6+AojM5VBcZ+5UqTNGDhy6lzJlFklsIsdBXbesyVOHnodZpFiVrGV7SUrK2tZxUOcSF023Q4f4rhSfy/mkiovAa0lvx5DtZwlvAIp1bHGPvJeOZcjrtDcyoxWnoXxlRa+aD13ijdI10VxyddKFdO+gC1iDVSv7BWTpzuakfWJeWzwM0Vm6l33W7CH77WnJmBvk71C5TCmj2dKDtCvmRrB2xCn2LXJun+ox+CqyVQaqXLGCoH2VE1vAcTul1ho1COJQ8iUA1dnsXc6VXEhRUbqdmmxboCM3A3LmdCezrOJCZmG5L1ZJmCtiA/W7oOu0z0ro3qlIeOP0rbN8cf4npzf/kk7hW8O31rE/+Z3/7KmL3s0YfxCOE+Fry99p/RkGoXnCI6U+JzIitaryZRC97dMkXnUlw+bYuJcZbd2gOBR5BWDR2ZxIriSXEvvOuHPkA2hO1yCsCNGlGcN5nOiqAFXaL/ZdlQ9C5db2qeRL20eSrt5eTCurf71uMzJMEc6j9n4dB4rEV2EdW3ol55OUzsNZIHDkgKlSLJ1eKzS38wEosYrEyrBGeaeMPoNlZM4sOknntkLylXFPygpG2yHrybYq8dxEL+eexSpE15w0pBnb9WsAH4ZY2S3wIePWhWeyq9EsnDe5nbih6E3OMEtQCL5IPBPxWPAF0HQPzmPBtUIXTr8D8ZLM/Qydh/xeOs4kXZB+x9I91JtQnGI9R3U/zQK4cXKj4CCkB7Xm56g7iOJFjvkqxCMRVyizJmNXVMbqGoVRNau6fgFQ63BhxzGUqy6yz6DLMe4lOXIcYsZiGEpGvzkvdb50pqi6ydnqjoiDneBoXAy33fpk7PdqfdG/2bzLu/2Xh9cbHj82P/vArSf7s/qvVSz/ZiD4KN5//6b79NO/PTz9vX+0HO5KcQ5S9HYOAhhn7uJunT7c1976royle1CHcr/sxrtNqX3U7smYMRSGeSXmJehqlrPoGLUZXKPv3aloHA46OrLUobWwLDujlPieq1+6RIRzk7AIvG5OjadOfYo4kL0kym3U1lJz0Mk8BbD8MuChzS3iAIe2dqQDDoCbUN6ny8LmNiKXtmMbdI8Jj4q5TVhtnec87SXWNeE9HLfAdyEtNJD6CvlQ9oYCdpxuneKjVF7JLITm4KtUXLa5lXso9gK/YZsQIN+K2Lgd+5Ucp8h3TlbgQ0Vs7CySsgXxadARsG/0WnZ1RAT1IegaZJMbZfSIA5OvTfQAEvtGN7gW0L7MBaEjJWsr75ttpFO0rNjoeOegm51IZyoRB8XcOhSZroGOmz1IswtqzHExtxkMto4lX5LOnb2RsI0oCqWr8ZHAtm4kpZLq8NZ2c7E7hkXXkiZ/JxR32xL+XPY5obv2dxScXzkjOsZ//vzT//U138KA/dvp2H/84/7x5enfcJfPsnpW0FEq93YORWiWOIUG228K0Aw+WO5JDsJ6TQdZc+bgpGWkOyx7d2++7s/j5s6aUeFk+7vLMCeE7kjtt60UrJZhx5nIh20gRrSBbu0CCSQbPyDjskXDGY4IZSZhtYi1EOlTgNxGroGFkSNOBJe2e+AAO1Bcyl62/pGMs1hxAiBxIftBshMLyq1lwWvwY6PXke4tnZp8jTgIx22KKnshUy1O3IwLEGotBX8JvNMMSL62ogtlAUhTQYdqmcIh8GtQII5lTpFf2Lo3/ED4zOgB4lLpSwcnsvaQzg1rmbEZ63yFIiHfRUqj19gnghVwSLs/zx2cBHqV8ChS9w4vsPdQvDB5rFQinUM+w3GDuJDzaUqft8whH+K4xRntWbEKsQJnpnJrfGXRBV4bfdewkny5NfiLsI4zNCjzc5CRvmPytTPuSsnv1Sy/KuETpTOtDXJKcVWzDiqx17LDeIx9m+QrZalW3BfVmbNGRtx3kf1YGZ3clEUMALorXh+sN/3GYx2WsXO2pb/Pmfv5Rv1M3ZA5RJGKnetj1F0ptF88DFV9r3HYT7EKuseSLzNVXLbZnfMIQrHVnSg0pvlhyH9K5SDxOtA8izZKxpRnLTvTvtLvEP5DJMs5N8xb4M1TWXtWvmoZVty1QFIPhF8JFiZWbUzrgeCNrCcmX/nrQPNY9pmCMa1B6IfGL4WXhrWkU1uDxAr7rn0ODxGj7V+F48h4gXwuYeAg4ZHMBehI4pc2z4zfIO3LDG6l7X0lXzRbojCsLHqZfYlfOt0TeqLUheW+OSsOHCHZe5bulLkPujZeCx5ZeoW0J9JJbMI+bb/T3Ghm/LIFCIzAgaxzixOEjTciLmWfJrKcF4AdOt5eyzec1VuHj6RzEhx5LHOOOaENyvMwJyks5fk2oTmSdd5sSRoKUJHUMnDFtuWp47fHrhUUh4SVyYXQ3GIV5jiVF9907m0ObrP1bNm6k9vtSR+zS66STiUHp8rb8nrJwIrdddakRsfc1T1yhuM0I59Exp2Vs5YIKiG/gkjkKxFXZV7+8Yt/8ge3fMv41jn2Dz74aPZy8+Y/JFq0TeaPMpjLUcFC22Vp8Gtbxfab5lQ4VniDdYe0DyD5qpVvwDV6OqA6scLhU4XOqa3UQ4l25LJ9/+7eeSe4i9PElxE6JoHIoHJJaYOduj3GW1qWLqp32bqDk3Y8C9EGtENhSsrZAoidww+UXFo+RUqcBXSNOf76by0i1CoFOpf9YHe+EFcOnzRDkw9QXOIWQNCCmmuHjsIuKS7apFZCXgs9bJPGV8Ax4sLmsdDZ9spOZZ/ZcSq5Ct6k9ER4Q7KSeGj8smkSskh61Yw+B8YPbNomQK0HN8rsW4RMIn6J+XcQf4T5Ac0qvWrGzrPAtzYLFAdbo3ITckeb4XOLW8HcZoH9uaQfbM/5lzLvgASei/i18e8IXqdYYiuI54ZHlovMnqA3tDK8GYAvjWahLEkchHyIHen4VcjfS2GZDVhCZ0bvAnNwNkfDd41eg58Ar4BDwcywBG2AA/AMsKET9MAI7AnCUBA9iWghaKEtc/rmPDeQgtHt+9X2GKbNkzlwtT2eER3mxqgK90CVfNViX1fQFfgI9BzY2467lDTQnpuBK2Bu+JXEQ8w+4rmTPqRT49eCVYp9wQIrrPxU6IfbqZK2B+E16ArxHuhz7D1a+fqB0Qb7bFs2PrR5LvFOWudEXot4RPoV4h2jXmRnaVDyBfBIYj/xFdae2kwX4nPM9yw64TeyHhv+hK1TAQrmMWIlWBmeYN4gHtpIbax2BE+MX8nalqb1BOVz2DmeNC05OMOcyD7bBpId0iFpS64pnUdqZrx2+EgZl9ty9/HuOM3RyoZ5s3t5lBFnamNGysxt/zsgD4gYSTpFNgeNbHOMZLG1fciJhib05Tili2a31N6XbB1y5e3ngFvWrvOW6Gwddk23qmhrVVbwLmsP53FK+U3bJ7XztXX8tpIKUroSCuOjcLM7Lf5o5+9UCfNmlNwVi+pDh2/JeGc732eCh9iRwajUA4kLw5t23+MKW5Hxz17NTz/5tgl3v22OPR7/tQ9/6NCPkN6VMk0ckn6A2AfZynusr4Ab8FUbeK4K7dWM81Z+1xH2rYLq9AniEisSz3blNRspvExHlXPYZevOLKAjWYPVFPXhOElxSas/k+GlYAFc2q1nD2k7TiQuvy6PbR2pyqVVO4hDpZuzbpd71Y7v02y9uT1lrqzowQcSl9+oKBzYTUnaHCsX2LLiNHAkXAScJFxIrd//dWAQl7aXwhsrTuU8l1mktBeoJK6Bw7BqZU2dm91EaNUDzIHlJYpLwUOyFcuw7iT3hhlwLZinNLYgg9hO/AD2vXMM6BL8WGK0eQMOrCfgL5Hew2yQArIgRhwvJH8fS7ZfIr8rabC1AV8LPzKxtjzDHAjukO+xvtfGCWu1zxftua3YOWw4Be5ojnSVaF+t1hgWS5ojrEC3/aftv57maMdtoBTb9257r8rtdRf+1V7zt5Hd+RtxTwvOOiBpAcMlzSEWYANUUAd+SSt3x/b1FW0c7P7uFihIs7bc03e0qkwz/sSlnStJvwtcg2aSfwV6l4QMX8sUt2rPClS+MWfOmtDV1VYomGMSdAe+3gYhN8CN4YnE7TbIGbbVpwD14M32+jdAZ3gtfAqy2us2Hpq/o2IuJCpwbCPCt6TuJZ9uj721G9oXvN4NFJrHHiROt9W7A6W8tXOH2yrTub3NykNH2Lmd+80hZ5qIBZn3rbu3SwSyVTu0zcBT7byDEznPc/vx26qTwz7JbSDRqgTbMjmYTO/0Qa0MzsXXZXGOpXRLelqVAGQy3fRJ22Bil7knRUUDY1PIt8oMkNqW+d8GWbSKSqai/S7TpwKjUnHeIaeTzqES6dOMMkbmA4si9ARa+wF01QIyf4mpY4n/4+L/+p9/xbeoJP+tMiSPP/jwgIH/omXcPnTyHtLeznmkdCHzS5xFoc1OBSrHUpHnWFFTY4k8bVE4b1yjV+y2HbQSzxAHyl2kCVacKriwHW1AtMEf6dM2GCHkUyUXgCpY8gMpLnfClDbh4lTyZfMLRTsH3srOOm4l390gLch1Iccy1SLVbVovy6d6+z7LGad88+ftuTg4UTN8LQMmlIDMQpGDzYmle7VsRzTL8KBlpyhpOgD5688zPGoJp69aKTr301G3mfncsGmZVciynDwiuJE1CD82DktngkffcHgSdMZnEI+ELw2PaOMzLG7VSoLNvsmBkey+iRgB3IN2hrrIqm49vu/QnMOAeIwJwdLtMW3a9xgozXD5AMhWBfF8ew51+7seUfHWuHz7nfG3hQHot8HQhhYwfLPKsCe4tlkiEsjtc6rb990B54aHaj/X7b9rvg7MXgGnLXDQHXCCGLB3WetLiVObBFvSna1CE90ONmfb8znGnG170oF9LbFv8WJb5TrZfh6WXinzoSPeRKuWGew2n/K8VSEB0lacWvmqZZZOO960yt7b3vMxtMxZpHfO3cGxUk7leTgC+SCli+bQc5ttR7bPToDjlrRsA9DmYFd23od13AKKSDn3peisPDdx1G6JL7dVuAsUJ7iJ59722tN7QtcVHOFQynVbto/Qcbpl7W56oBVwHEYZOsc6ajZtWw0MlWantJFZWmrL4LZtyF3SZtHJOt9Vae0sRNy6uo9mc9PS90k9cHAbzmOjGXBr6Y8i6VD9NOr8F9+mTWzKX/UJ/L/mo4/K4ou7f1/ib9CWWB2JVrV2tJEt/FzSLdatza1CtVgd4a1QLRDuIBbCFbEmfEpoIFOgY6FeEVekhIylB020lUWSLa3a8rOYyay9XZIisZBZO3wS1pooa5tTKVPyRctgNActhNfb0nNbJx6swdu+HycQm4ATo1vLa0DReuqnMuvt+2XrBNggrdv1Wa231c4FscAeY+vAjaSWzd8h1O4DK8wpsNyWMSuSLC4Djg0biYp8DNpv2QFz7IXFXIQcXMtsHFoHTggZ90gIFoJ7IMAHRufRHPTB1ide2YxGM4lD2osbYAncCe9tQ5oKLMBFqFNz6GrJjM5Ae7TsuoA2iD216L5XO1YrUzdDvqFl1PdqP/fbzx2AUbDZZlcj0tboEbTgYGzfa+dYKl9n6Tsmh//n41++h8N2TAfN28T2PQN6mxnf83WWnLR5cC+4RrpqgkzW7e90Bz4UOtv2sbKlltwLDmnP/SEQlq4EKXtvG0hK7VwOgLCxJFogycX2fLI5by0FIC0QN2pBwombaPfU8kJAE6xyriQILUB3blWjpdGbkPcxM6QBvC9YE16EtW6BOHPJe5bmgZbgFWgFnIAWSGvJq5QW24D5AnHQbADrNrQZZd+14J9VW7miPeRLBRtJK4k1ZiHrxjIKlrLmllaB9jN0oRaLLCUut0vRglYqvEOxxh4kVVsnSMXSMkIb4Ah5I/lUinmmLwMdgyTcCRYOXVhaCRz2vsObENVtn5KVoBJ02TQ8dzT9UhKcOBkI9mRGwyId54ErbX3gfUQ8SXNhPAeNasnDX6sIHwsAACAASURBVJeiA2aWXyl5T6I32lPJ1e3ffO8rPvvsN1HI+q/wrTE+T3/0n/xOuvzXhoegI5NdNH93ROu9/d9NBMZlse8quJQmtHAqlNS2AY1s+8Sp4lAJ+81OAAW7/g0jWIpYAqRzCGm2W27WstsmyQPYleAt9w4V2ZuarbHriG30keHWtzuROU9YiLJuc8CnW7HGgZ1dC2a5iF3PW75s2W3I8smuBN82gODWoSOBMZc78Vm0JSZKuAxa7z4Vl2GH5VMTa+G15Zma6O+a7ZCV/MDo3nIva6AJks4tSlMN6074wdb5YbRqrZDd/eCuxT45kHS0VsRTLBG7Maerdl94AGBJypxbGrbO9tfCj7OVI//USU/wrO2L6bWswbCgLZ0paorXGeKbQpcFsJD0lc0K/A5t3Wy2ggQFcwj8MfDX2uOnb5/Ng235dCa01zQB7Xg05996oC0Au1cLojaIQ8wc9IfgHyESM6MJFh8AL4F3aQ3JHrPLQHf9cNOyyoP/77PmL5TdeW6dKkvMGpip1VPXmG4bCO2ccNCudac03mWvF9vXu23QeWCoMvduz3OxHS8PmtbAScvg3yAfY1Xw/fakOsy15BltKaSBHwDXbpl9ApfbCsy29eOXoMe0NdinaSXSV8Lf32bvI/ZXDn4YrRye2INCG7eqAKAZ+A1oH/sc8UDw2vihpZdKpwkhjgNuUt5X02W0jnGrLh4KRkshu4KvMCeOuJW9J3ht+VTEJfZey55lpbKJ3XROqxiI0JnaypEhUveplpEHOkzpIuwTgO3nss3awT4BufXcW79a1gVgIo9BTv8ZtfuxxDkpW5wouFC6txjJtmQXtiX69s1BK3z6rITljN54XUC1aXgcjtOmluOCbyyBU/oBQLsWLkFH7fg+VEaVWsViJ5BrrQBHWIPDXXUTlpaoxRmnUs7Suib0VGbEft/wWNIp+F5iZvMry7eyzrLW//7sj/+Xz///mDx/0XwrHPt77324uJ7xD0D/QbR1ioXwM5qS05g/tPhjmVH41y365LnxUbq8CfyIyGh9meZC7AhFHe1ygvOaoJBtkiq0Z7Ha9nUeeNt32ipBI5zHLWnLe6T9TC5KmwVycAJB2OeOVhGx6NpyjQKux9slKqu28Y2KyKu3YrytCj7ly51YDoBs/fad+h/ARjhO0LYiYYcVJ1+X5WFbror2u52SX9e0aGbf8h2mOHQcdoDC8i1w6FbmGuUcLD3YHnF37GJxInht+4kUK9tzoU1T5Pqx0Cals7CLpVNIsIrgT40evhXONVHYYSouZD8VOksxhrNs1+z2rTTnJ9/Ibs6FZxAHCQdSvrY1j13HAjbsKgHhRRMgaWkYW+WEF8hpM6hVLKApir8gOQCtCQ+Y95B+iX3U+p6ebY09akKbv2b4NOCknTPH3jk8+R3MC9B3tvfsuY22osCnWzXzQ9ScUlsW5e+BPweeYl0jH7b7o0vgidEL4WNQ3wR0PmCrX6BVJoJt8LH92tOcmbZfbahqFQxjVrSsd4BtX1z8CeY7wDlwIvnMzWkcbas2KfyrRE8DnhvWFjOZfaHnbpWnH2wH4AZ4idlDOsa+NKwJHck+B4w4EMyx/8jSKeYBYpB5Y7YiWTD2V24rMeaSzw1PEGeYe+B3MF9JPE2RMueIC6zSWl66DvsZcLsTZAp6yy9l7eW2NC9zKmFLd7KXNgFcI76D+Yzgic0GYVIWnrkFLzeBDmlalB7zHOk7gjfgK5sFwWD0MOwOuDIssOUI4bajGluND/gIuGiOfltZ3anLneetRK6jxDWke6fXb8vybtoONbX+/bZfDqGj1svWOW9V8FzYeYLwdpXIhclZiNV27t3ZHGPfEyyUXGwdK00hvFWztyfUnLC3bUw5cQilWyAcR7vlvhCSuMhs6+eMDnMrqGs9fE5Sed5WSbhn1z7YnvNbe8puHTt+uzSuTexlaLvEzxzL5ayq7tvltiuWM08TFqEIyOumf8p9W38b2BPas/yqXZb+NJzFyT87GPkfPvvs4xW/4XwbHLtO/70PPyhV/xXmd7f99RnNaM1oatR/DPxa5sLyHRSC3IBcrRGgK9mC7cxTtS1jZ0TcRvXMokX7brV9RSxdWTWxnE9bJMiB03cB86Ssw96q4DlxsrJ0X+xwRNscLigQ2RTpmdt+nNQ2cFiwFa7tlnOYorBP2J7D26Vt31jW9jYjfrscL0A+3apEr1pG3babbSJAP8idGIY8EnGp9Cy124VOkfZeOwwXKG4Nz2RvsF84Ilopyz32dyR9jnlGU4+uAEJ6YOe9iV7bpU+Yzvgo0CvLvVrPSm4K5vO0nggWFkVNZPeFxGj4rvFM1oB1R3Cz7dMdbDf0+TXEYUbu4fiyiQqdQhvQu1J+vu0tjk1d620pTrPASvRFKGfpeAz8OtpSwM7KVSSd0WPLd0ID4ino2rBWctHW9WeRGJXKKv2uWgDz67asLY6IvEtYR8ZpKnNbOSlpXUdENAGP9p2+Qz6kCbbGbNntDViiPELji5ZBFDnyzpm3dhwXsSqFi5Eyqxutynw9kAttulgt7sZ+47qeH80GgBf9m832PwLZtRLezif4KHj/pnv3uCvD6jqGW7p52cw2i71Fx7gZKot+oHOnolr3UmWGfOksofABVCu0r4xltcYid2TuUzh2ZYW4NJptl1OuII9MHFl+GckPvAvUpC+ED2wdh/wSwKmZ5T6k+93GT81gtxUZrW8eh8KPkf6oVa18gnSBfIK5bD1i90BTQMNn7flHbkWt3zVeh/TcmTOkd2XeOPwG4tB2NDGVk+bUD4xeCx/Ivm8KfB05HGG6lGtYBSuMZxIrt2V0z4U320rbqcwgey8jzmRXyUus/dRucxfNJe1t59Ma5T7mNhxyUOy2w1pYxW21QrFU5DyX9ND2RsTbtpxbReEk7LsWhOvMLUgvbe5se/jbrBdAucusda7t5i92swPsWkyRR7SJd9FsUuTbv5cv32bv5qIJ6uME58XXWftuqd3u61a415YCdigyzdiyd07eZu7SBdbRTu/UlPHbXe/MkPIDZdS282gLdJpoT4m52WXsgR+108jEsSRQmlGwcFPKf6hg8Y3K3gvaffkTy//dmz/8+F/8S3PqN47feMe+E8yZ+C/bK/mjVo5jDtyAvsD8QsEb4CbTNUIFc5PEIHuhyL2W/aSdb8VW2qk2wVcOuqbodFrRS662SvvKCeKyZdLlIlTbZjTSg62yvEvRk7prOzHl0U7RDuDMpiD/5iY0tDh8p4xvwhbMViWbdg1xQsZlKq2mQr9sm8BkyCwQVcTCym1FIY4iWREZaRYyFbGPuWmOKeLt0hq4IbgWsSHZJ7JAZEuqfSq51tQXgWaCR4RfAAeJ5s0oxZmzPhQxA24yfIb1vRAvnO63xrkkmpf0S4eF4x3kl04/iKI/tXWUzr0Sem7ryG198r1Se4o8t+N7Ef6V0ycKXWR1D3Fo+aUdUVyPKdzYnBi9KubE4r4pjePOmXeIg0CzlGcFXld72Yy3bgAiGJ15V0oE5hb5wJlRs5zRccxY3Xfdbdax0OWth/Ku7F+Pi27T5WbuLIHCMbpGlzWSG0XxWpuZolxvrsd+f7xf3y9O+9lBjP3ZdX7xdDM+Xh3OX33y+L5tQvNRgZ8Z+Fb07/41bFX9X/9PgR+8ehyfPH6VT89m88O7Mr4e75cAe5vrzfjg5LDb1Ho/dkPptY/yQEPNLHHfnrWrk5tCPi5dnI9jPHDkHei7XZSXzhpjelmi9Mm4ClikSl/Sp1X6fLfLW1LWO0V2ebve3tVuanTLa2dEkBuVeIz1XOllLV6GvZA1UrihctACddlJt3McDpUYWTvckbzj8F3b7TItKbeVHyP2DetQzoxe7cRmWwHqd5S5yohlCy79huCG1H4Lir3ZCWZB1yH34KvWz2aFKNsNe24lP8Bxi3Ifcd92oWRFYpOPRLxx5AZvhWR4HY6jDEbsW7WgZN8ZL4kMZTzIYIykI3xrvLZVwo7cVRbCUsaDFEZb551q6+WTi7e2MDhuavlIkVdITrMI6Z7tbpRKXTh0BBbVVxltNRHAbqe6IHqTGzftQ1PdUw26JjkgLDKSyBC8kWQqBxRustLpbbWhBRWWezsi7JMMP2krfvw3hf5jgBakZQd6JfjM8MfDfPhvL//p/3b+lz3J/jz8pjt2Pfp3/9O/RfV/s+17/C1bbxDfFzy3mMv8j7bfKHROai8jR6XS8su3W8eOcpR8THL5dflGR4Rvt0vbWsk7v14/6eIQ+OuNaOKq7Y7EAY7beKto59JuTjodVfDI5CYUd9vNJB5ut4193RTb+fzr3k9bG75bL//1MgxGUndty0fus2WxexZdNNHYjeu2HC/3hPeUOkc+bCp4n7Ita0lRkxx2O8MVc+LwrRW9MveAhYNfUrWvYN/Eq3bnqwPN29JAbjC3dgaF7/4/7L1Zj2VZeh221rf3OedOMU85VVZUdbJ6SLHcVJJoE2rZYZnoRgEmYBhK+cUQDEjw76jfYUCAwdeGpYe20SbNoQyIFmW7TKmp6mazsqqyq7JyiozxRtzhnL2/5Yd9I6u6m2JTVg1JItbLiTj33Hv3PcM3f99C5gMQIws88qTKiU1SJyZrBV8GFvOXTbkMi2CAfNmE+wtSnRHSp4ZPlHNqQBG8bpwq+yQUT3GUczoyWGOMp+7tCowjWXzCxGGI6SiJTTLOQva+sp/TMAJNyn4eGesE9XqmJ7SguazJUbGaaD4fzdveZFCF6cEZRkuDyQBJh4n1UuxW5v3u3r1RAr6Xf5YG8274mzpm8m8qbt16o2makd5553vtxSz4W7fOYkpT3t8Y51sn2zZWXslRsXd+djTpNRvyOAawQkteBa/EeDV16aNesGlyW8lMdWQ9byukkNUDfCkoH7ZdnS2m1yzjPmMYyLqp52o1wNus3DKEARIlQzR5ayHmrPwKSiumzJEEv+YIBySHcp8Q2pLZJJDT7ClBZgY2TlXyCzrT0FfJU80ALXnGhsP2zbwPAHQeC758Yfgq4Nx80c1DDFVy3cmF40J0Bcg8lPHV3pV56W6LPu/rDhwEcupSbzEDYm6OSlQUQIKnEgjqKsGHpYuIjXxRi0SfWpkHsWrgswyojIgtY12L91uiMAtPeEbZlQtFbYtR0NmQDKzp8kxlgMsmBpjo4tGiN38galIq/i9k8s8Or5FhtYyZpfuiIwnuQ8JOaHK5VgGOS6STy59MxRNLhAabYpgVQwRfBfBtlE4DFFnKFuA+oPcN+J2nf/FHP8QL7LW/0Ip9dXdvNdb8R4D+6xI+wmuLXucyXQv4A4l/JuNjg9cuHlFqaeoDOPvEOwcsIMm1mt2OzLi+YGbLIqZ0pgWpQSXZo2C+Jsd5uUkwN2jTpT7FZ4sQHy7CfRfEBci2GGfr02AMDtYoJAgbJMdIVDbsGLx12j7kRre+kzPCyxhWaJnQx5Rte6kSP6YhZ3eX4yzQagaklDmM5hNBV935EYiRiV2Wt8FUOUNFUOaImekYCJ8U+RlilrXGvFFIb3RgsNaitrIjBbuwoH15Eb5q5T6hKUfzyt1WHHhmHvsWkS6obUkquXWAs7As+XLwcNhWSNZxWIVu2poNBRvTTJy1il61GmRaFwfZFNMsP+UwLtczm3mvNQv12M/bq6rzeW+cjucrTWhO5vlkNBjspPrsyOab8mZ82Hw4wze+kVf/7/2l4/tvnQB37VPKd+FNLrYLqswv8Da+xJeLRWX9m4to2Zu4deuN6t7KUweAWyfbNlmJ4eHb359du/PbvenRtIr9lOdo6pewfPYsnFT90zZPQ70MANPeONXJujSvQuznvnchxBw6ry2keTfhMC7XuV1p2/rEomfAl8jqVD5fkeMMDMvyMA61evJsAWzcGXLlbe31eWvtMCi0SH4VAY+zqSr0pphl5rryYFm5NYZXQDmzOaM9yjnfRMBjk3USVrIjGX0dAY+VEcuYZp0KWnLpgBayPIcYzXLWFdA+KmN2fVtZT2I0A7SUXZkMGZ6HEMdOr6PZJEtbi4K1E6fXdHYONjGKnrmO4I+QMTKwKY4EZnKG4AwXEz9htDI1TofIHIqYmWtN0ebIWoLhTNKawZ4W2VzGe5dI6ifz5E1sL+RyibhiRtkW6GXufInQnF946Q5rLwroQBfczsvEQMRSf6ErIO4Q+C0VT/AhSh3KHMARyT+2FP/HF7n97cVV7HfuVJtnq9+m9I8FvQTgJRQBvY1SxLZP4p87/ciA93wxotWEzqE2uFk2H5B0z5xZRMNSPDeiyQuLEAMdySI7BzZMOkxZOUYzh9eeNAeoCwpWS1Z7UI9Q68VDvkrDMcCxAZvZ1TdiRoYTh7cAIHcLFqrsSCZvGWwAAA7NmZWhSAZl0K8CdurK3QXPO6AleTgHxGBa66iPg9iYrEsZKQbE7N5nQGIKnqrUBbExRwIxcuAZiFFuwz5No6DcZoY6KLdusQKTABsHRy8bZpGpTrIm0udJsTVP24rVOdiOY4eUKsTYIXmvNu8swGZSDiuhC0dxfTBOh5MlDTKVuvPeuaeuWVrqGGahmfp+bzy/dbJt40GOT/JKd+PkQXjw4F8t2uDgu7t7vfv391rc+f4FqcolLvGiYWEkLKI2e3vxOXvcvR/Mb9z4zf6DnTbtHiwFALi/Mc43ntTxwYPvzq/debuXuzljm3sfD49Pr42XViYt0ijN5/OVZoWToFwVYSB1y6lJT/pTxhZxu4v2uD9H9F5r1lWDpNRWEbFLSJGxzuaVsp9bVfU95UmENQzJk9c9SbTgOSh0mbmibNusO065ToG5drMp206yuFS6hmxs7n0vBWslXJ0RjarkNsmVt+yC0zSiI8kWtKuJki3SBZ46mA3LGFxvs9AjKRp26Dx2u6gt4piuPs08JXcjNhFwBuHsIqpnASkLPZlNmN2DIcoZnL4ezJ4qIxZ67MXMEdc5aVdD4OMy+ltc8AL0RMyUuQ7KaTiWlyr+EpnUEhBQ+DUAANcB/EMA10DUEA4AGIGPBN1zhd85fPfv/8ELyuPw4ir2za9/9ypT909A/GeCvobSbzpCaYs5A/AvKP6Rk0d0Pyp0hV6b+4GCBcq2ZD71hJlFdp5UBUOUITKXYrjSvuYORMhTDOQ0i50q0RKHgZi5aY0Zx7TgIIZOzZV9nYakHJ8YUgMAWaG1kHZMduhmU3k2KPL5yNoqWyOcebKAwGH2rjOhZxEp5TqZp1LYET2D9SgrtzmGKWetQFNlsS7er2e5s7JYd55ayFnVtuKGZ3mO2MUwHabWzIJaVrWUGXPsLtiuvNeaUncemqEvTUI6Dqd1PV7PD68+7G48qeNZbJrjjfH5tUeoHj58e3br1hvVvXvf6m7c+N3mwYPvzq9de7v38OH3J8/D03v7vKRBvcQl/mNwkd75xTTPrVtvNClNOV2uw5Mf/t50d3evPo3T+nAlTQFga7bUDM+R2o0ly8fzUY7n05CGfQxx3k1C6Nm0HltQL+TKZrWnkCq5E3JGr9qqQZq5epGxztCcsfPOrWk8GVSz89TSTHKtRnCWlFqG6BbCAG0nN68AIMc4abKFtkKyth0CQBVs2nmZ1QEAwa3L5pWcobIwzcyVCT03rbHDAxhGUCSYlKW+RTaewtMqdsGzBTdbV9YTC7ZtwEHKeRCImdPqYIg5K5tCm5GaGBhyKb7MJYfuz0fCOkNlyh1gy1ne0jgE7JT0qwsqb4N5gOybgv4JSmvlBFACdE7yxwL/xZz83vjP/+AALyBeTMW+txc3HvI/J/DfAvwmoK/jeV8vHdS/kfN/ovmhOWdudugZTyzm7QA/6FLwKgZT8okvKnspGyf4FsBxHXWeM1ZDwHHn6AWwIcJY1MiYTwGgTRzWUedJbDxbqGOeZFaVHOee5sGqqh/AxkPa59yGMI2S66CyuOAnT+7zMI1VzgDQsqqT5SpkpNz6eahtCABdVU3j3JKFNAKAmGed59pSqKeD2XF3urLcbzBvlTp6XuZymrbT5Tp4bmmhVqgaPVwatxiPP7mWb7/d4fbtesEnTOztBby158Cbfvv23fqdd5Av88SXuMTfciwiCsUIf7u7iCwApYW43Viyh29/f4K9vbhzWDd5fl7qXGKl/S3Mrj8OKzNXT96MQzP17rzk133YWO2TpouahelStpBGad5NejFXKfQqz53lNp1jBai6ZguyswvZp8UgsJ7pSVchYh6vJscBLXkgNi0iZWdJtXbZPdTRPHWKDJGaJ4TahF5n2RvhLGespojELng0r0qRTtfRghu5YfCHAODOFUk08xN3W8nFqep54n4MFlJGomEY6HWW+iCusIyx/qcAv4aiK6coI3/fBfAjQf/84Br+lxfRsXkhFfvW7b0r3tl/b9R/IeGrKAM9qsXLxwD/GeF/JtehhfhTimdgK+8Q1ehMuXqpMn+aM1aZwqNcKVbmVRIbiWfVwspUV09mg0nX7+IKUj7PTQiYYTTvNYf9mWLb8149s1kIrU9aPL94tKjYT/3W0rz22KRpnMoTN2N/+ixN+4Masaswm6Opl09Op73eqj9L0/4ozeez4Wjt2dXu6dY+eouqaL916416PMjxyXo7x3hMzF7lrfkZ792YZgC4cW9ePXjw3fkFT3VZxaVivsQlLvEF4M6davdgKdwfbvknZChvGvbesp3Dunnyw987393d68XY1717o3TtzqzpZmPL876FZurDc6QTiw2tUmimXnXo5V49nZ+2VRPqep7b1mLfY277Xs8mnpcp7yhP7MVc5SaE7hwzLSU2Z03ttYWQmJLNNnJnj0Jtw8q8mtHUk3NGk1GjelGY2KYwCE0+5NyGpe6hoOgDsbJSiNzl2Df4lgIf07HjyK8T+CbA/wYlDbOKkg7+EMR9gr+fOvudo/d//8Mv+pL8Mrx4in1vL24/5n8px/8g8CVAVwFsAWhQaPX+mMT/7LIPAf+xPJhFpJjao7k3rTxRS4mNmlrK53neN3nH/lq/mxyMawDo9bA6m+GYFlWPLLVnHuWJ14dbk4/P9wfH97fGW7f3+/u98Xz1YGnYhLp+8t7vPS154LdmF9sLS/jGjd/sXyje56/t7cXnv+mttzJe4ArKS1ziEpf4nPCX1SVk4K5hb5+3HvTDvRvTjLfeSldu/f2tx/euHALf893dveZ8iKjUsR6v54cP78xK/U3pTtm6vTdqLVVLR3kGAGexaQAgNl0OCJtIvXPvtZOLKEM1RLJZPZjntgWAYS+EnFqbpdBVQ/TkmWkaphbDtefR2ZR/ndQrIP8rSd/CxVhp4F2U8cZ/IuAHB1f1v75oXvsLp9jXXv2tmzH4Pxb9OyiMO+v4hBDkGMD3BP1biP9P9OqDFFJ1sHTydPdgKRwDveP7e6e48/1wDdeq6dG0Onr/90/wPBxdTv7O698ZFo7dYnXeetAP9+794IKh6S8D/4rXLnGJS1ziEi8CFs7WX7Xvosjx1sm2XaQmbt16owGAA+96tLRUqW4z0w0YXwP8H4D4hwtOjeKxl8mXHwj2Q8/pn71oo2ZfLMW+txc3P+Z3SfwjlfD7SwC3yoxoJAB/Qul/c/JPcuC94x//4Ue4fTsucskLvGkvaqXiJS5xiUtc4sXG7dt366fYX7cuDrLSN0TeNPK/+5TX/hTAMwHHFP8vmd66Ep/+4J2f0UNfLuyXH/LFYfNRtU3TLeA5wUQCdNGL/kTk/1Hm9urArRrj7l3iF07mpVK/xCUucYlL/P/DO+98r93fwrOAdErqhK4Tuf4NcDHUBhWIGYEZTH2T/tPH3c7Wl7nmn8eLo9j39qKUvi7nRmHV0pCF2GK6GCH7EwAfW8CBDLE3SRW+971LJX6JS1ziEn+78cVHlt96K01T7CCOGXAA8k8B/AmABGJMR10IpLQtcD+Y/s7P1FV9yXhhFPvWPjYJvgpDj4Wa9dHipTmgYwD/ko5jSfQcJrNB7PDF5725fuuN5fVb31pe3d1b3Xn9O8PNr/69pa3be6P1W99a/vSBu7t7PaDkc/7qj3zzhbkGl7jEJS7xGeHn5Nrd51NAcedOdZHTxu3bNXAhJ++Ghdzk2qu/tbJ1e2+0uru3ChTOkMV7vjB5GfupnxVaOgcCZhLfBXAMoS+wMWIFhU54yTPXrzzIa1/U2n4Zwi8/5AvA3bth8GjyVZC3AF4DESi9LHIbQAT0nsB/TdpU0BkkVjGPJ/v3z77AVXJ1d29FnqimWUXSPM9zqNDvzes5PCyHldHucrX6crV0fXe1q5Hq4e4gpqkPr3/1em/jeq6XvjLor99qZv/JzbyL3bq6vtsbbt+vXtn+DTTNSn16+iBdu3ZnMB4/6oC7Yef1G4PzzR6xv/9Ja9vduwE/+tGnlvWmYQ8B9+9fRi8ucYlLfEZ404C3iuO0txdx/74vtmXf3bvhxulKb3v7V8PhKyuGR4+Evb2I3/gNot+P+Pa3ge3tsIvdenV1N45GR5Ev7y4NRq81vUlVI6b+cO2l4Sj3e72tl8JMddW/3m61ngbVtWuhl3t1O8+yiNHyzu7NdoKztuLKen+nOz39p/58bZ8jhtu7I8t5VZGyMu9+3SADOAKRSTzx0hw/ofzQY5hP/s7u/osgi1+I4rmt23tX1PIOqF9f8ItfQ2Ev+wqATsSfUvgTAJDwLJjdk9l0/8f/+7tf1Bp3d/d6k174tez5qDLMuux9Oc4shoHElcr8aeeFFpAMYuxcqbKQmFJIlXKyCr15CK1PUxzEfmpbS3P5kLVPGuXKGvjcPTNViFGhMcdZV2HWWqqas6ZG0AiZZ3U3OZ0Nezd757MPJz2vepPt9PDqw27taG1Qjyw9WW/ntx70nxtt9+59qwPeFADduPGb/ZWVG/mdi37Uu3cDfoSA3vu6HOV6iUv8jcOnO3b4czwJuCgm3vzq31sKzdC7SQhXm9HsqDeLD9/uzXd396vT2K8j5lse5k89J1qIuugl78dUdRVmF21jsekyYzXszjGz4Et54GdVh0/TdAAAIABJREFU2++HxNSxrdVEkzvrGWfPh3OFXEWFRnImxdYqzyGjl1S1uVNs6mSdW+fJQqhyvxA6cVuO81BZl1vO6qoNnaNHtwHC/N1nP/nj8ed9Yld391argE03bsBwxaBdyX6d0jdF9AB+BOCJoPcJPCP45/Oq+ten7/zu4ee9tl+GF0Kxr35tb7eS/YYLXzHIBH4d0K8A2ITwEYg/Jfg+4PtZ4TBK71Nx/AUO4eeVr+293DlukTi+mOVemJl4vbA6+WEhQkFSJVaZQRIdPgdqGFJjwbNnC7TgyDpH4FDWTYOsa1MY1DFPPtkiWQyD3HJm0XMwvJy69FFdWUhik7swDVXuA3HsaR7K/qoNmDfZNPMuBK8sWOc5whoqjmfdpLPY81BNXWqW06yd9GvG3IRgs9qr+XjcNUtLrXxejyw9yR9313qvxtlJivJutT/rP3v48Puz9VtvjD49AW//nbfOP9VO+FzQPO/pf47LjoVLXGKB8pwsWrHKRMhibF+789sDe/JMDx58d767+1bdtkv28GFvvvbq0ShUU0/zKlRDpDDP/RR8lmN/LSIdyvOScmXyZpwaj7VPGpvV3irP65ovZ/CZVxbKSGqfWxcHCT6POXYppIqhc1qQdxYgWw7yNim1VisBA1jXFZ6LqNXchv26akOZxpmtMsw8WfDga9kwq70+V07GaAN5NiKMXWkZAGjB5VoldSKJKSIFYVOOx+bezwhtYCGzMuWOwbaV/SkAOLmhXP3F4XsrDz/nIV28du1Of7q2thlyehWyr8FdIm8S+LsAXiVwKODPCB4KekriAbr8p/vv/4P3vmw59+Ur9rt3w8a/PbgD4KuALxP2CqGeA7/GUhn/ROJDo56CuAfZoy7oQ+uao8N7Pzj9ZR//WWDl5rfXeoPejYxcKyNKYoxm2X2bDCd0ZQU3g7WeMJP5TRIPqNBXYRGaFLIDDB18ZsgNQDmsBTEyR2Iok+2UfUIL7si1ZBageXLrSF+KIUySdz3zKmVoHsDGqtRlRy8YZt55pRAmJvQyvDavkhlOPLQhd6GuQp5IYbkLypUHk/Jydh7RlHOwafTQ0bvtFJHY+gkAeB2tJ2ebkGimyrwiTW1GUk5Gw6gXqqdzzVrGahjmOZexkvEsNR7Xz+eT8yFid46YeyH054i0IAxxPs1s1s/nk3FtG+T8FAB6554AIMZGZ01XPfvJH48/LfQuaVMv8SJg5/XvDJ+st3MAwFtvpa3be6P9d946393da46WUp/jqF7M1ePm8GQzrTa56xsA1HV7s23rD2M/9S3UY43zqFWe06IArNS02bTH1E/TlYxmLmVCuiHPD2O/anOrl63yD72zm5X50y57/2JOu+dkGT4PNXppXs9j1MtQHheqVq44/SlJBYZayScwjeTZ4DhLjTWWQz+YqpR0EqjKEecxtFGqyAUhjLvfAF3I/sQq66DInLyi+QAACkc8pYxYSF/0IQxXRMyYcezEJg2Jbn0aj7MrG1jy7RIVdG5gk923C1FLOAfydQBnZMiSzoMhVuBPPv6c57Qv3/7uetXNtw1hS9RtOEakagB3BHyVxMfuPKX5fQn3ATuV8+3Q5A/333nri0wT/wK+bMXOlV/99mo9j7cle0nEy6TWBHyFhQe9hewnMHUCnhl0IOI9UzhkE94rQ2Y+X9y48Zv9bjC8mi2vmdDLUp9mfWT5haIuLEKFTzxYDlJYNfMjSXShF8wmcgSHNwDOJJFmA5Iu9+mCsHwO84EcsXA3q8pe6GcB6oLMgHQ3sXNYLeUgxxkNIyMiaafIuurCM5o7ae4Z0Wllfj381KC5ZCZjKHZTYCFiQAxQEVSwMehX4XgMw5WU8KCKhS5S0kvBbJIyhxb80MDGxQbwh6AJya86bD9Qm05/SuMwILQptwk05WDTnpxJVeu5MzIuGbVp7B64IaLDyC1WOeAJpn4y7IXQhjyPbhtdhw1Hc8/T1GhRG1bNJjZdcs+ce9NuWDUDgHv3fjC/due3Bw/f/v4EQBlQAZQZ+sUwcHxC5UoAl1GEvzX4maiQYW/PPs3ABpRCrP133jrD7ds1trZ881HXf/aTaxPc/lFYPd8aAMCgRsTS0sRPjoca9Cds263Ow1aAtx7S0zKlDCOrck6o6oiuheolS8pJqTWGV0mdIPu5x3BTjscGbOZKB7GLlYJWQXwcnEnUSGZTT/NICy7wumU7ykhNMFvL7kdVjOeS2Fn20HHDaTXkD4PZOpxnCt0qFZOI6DlPEctzjawTmq44bN+kPuhOccehuUPzYAyucGDITVboB2KWlXq0kAGAdEeiLLKT5wAtKKDprgXTmsHawi3PEKgI8EyWSyow2RKDd3JbM+HAo7d0DpycQb4McExiKIB0JJE1iJPiCKkP0ArVdt4W7JGJHZTHlI23mo2PPjH4P3vcuvVGcxrndzx5zWBbgF+T+DKBdREVpKuAPYH8McEPRMwI/3Hb5H938mf/8hhf4lCzL1ex37lTrR8Pr1gVv0l5I/EmhFuACPI1AO+hVEGeAjh24R0zOwTxMTR79IXlWWJ8xW1hlQrXpcLVLmnNBPqCG9hkq06cQCKopSCeuRXueHNUTq4v6AqHkE8cmBu5DulcMjOozYZERzKgJyo6rCWVCW1B9hDCjkOnMBsY8jM5osCF4kbPAg7c9RKExyI2gniWSS/88hpJPLOIhhmbTv8IoCj0ZJxCbhSbwnp3QbOoDLogjhe/2WgYSmZElsSzCwPFGSooj0PAas44DsANNx7RkZzYDPSnUCADUkruhbedK3Qks9LxUDwLq0mdBGPIuTsOoVqFcO7IteeS67PKWrZ+6uZVFWzapjCojLMcfFXJpoJumPmHsHSqHFZIyjJTND+ZBBtWSHVuMaupmefa2ib32cajYXve9nqrfoazZQ36E88tL2ZdNzavH69Mjm88qeODnTaV8ZYA7rxvePvt7jnpxiX+A/Bz6Zm9vbiYBNkBdwl8L+/u7vWmy3UAgDBr+9MUOwCITbtdnZx/7MtL25PQnNbprJOq65Vh5ghX59X8z3utrU5YnfbniBpkJsTaOs8B2swKrdc4Dyn3i7HNocPqoLwihvcBX5KbQW4SzgCTqmyVcyUDm3QkCGekTizEnDzt0O1QhghiROpEzkDzAd36Lh2Wzh8+lvsExuGFMZ3Bho4dM30o6YaDzwCANIf7QGRt8H2HvVJ4w/WhgbVck0KdyoFBrUNzuvVFX6fsEPIdN/swuNYcrGE6p5Ac2pLbI6PXAJdFBtLdnDMR04Uz4e62Jmhu8GXBahIJ0hMKfTduEd7JbQLotMhtjCCsyHBOWb+cA5uIOUK08InOUS4026tOZZMMhFwcw5D5KaUoaNmAmZxTBJ17wiwQs7aXfvp5KtBbt95ojsNsl9KWi9sGfd1hW6CvGEhB2wDHIt+l+0cC942cKlT/5tmPf/fRL/+Gzw9ftseOtdu/ddO69BqFr5DcEBAJfVOwSsR7gEjpUESE7P+V+yOv7NHxjn/8uQvRO3eqjfHSV0iMKPQcbChuwwq5gCQDgHJz2gmlvlBCUQBG5aHBCRBAd2ViSLAh/FTgCqBTyAj4MogTERGwJcJPJaySOBZAyEgpiwwmrcFEuT0l0CvNH6JcNWhZ9KkJnYRVwloRYeGQnpHYkRhIZQiPIRsI3pCYUjxzahe0c7memiECuioxiJwCAB3HoF8T8B7Aki8DepAoYkYiSVgFzSGd24IPno7sxOLaIgnch0QGdnRlUaVNxM1Fn1LsaMrl3IigBgDNpb4UHsbg5ok16KJx4GJnwkHhZQZAXaVbRsCZJDOpR7OPlPEaTIac/xRWjZz5ZWW9hxgRk5YS/DTQaic2SB4L4oVwthCO6N6ncZBSe2JCT1Ukkq4i6JwZxw428vyw5CSBRnXr1Gjeea6R52ZB04wrFuwo9uLxNLPZnts5ANy7Mc0XBECFaONvQD1CyQ8n4E1e0Pqu7r61PNhYaqdH06qSeqGnXpuRyPkpYzXEtFqa9+1gKSe2XV5zi1XDtO+GUefo0YIr+xqoExqHdB/QQiZsXFpdfU3MT43hlRT0YQ0gO3rIHCowWE5HCvYNZ3ifUt/ETsortNKy5BnzYDZx5A0CPTgeIwL0kOF5B8EI96FkBzQkhzcQzYiZE5UBDcSxgBuAKHC/yAa1BswArMBKBM/o+y67BfpxcE6dqgRsGO0ppHNB1yA+ElmTeJnyRwBAMTnxMgAJOAAo0h1CLka01mg4gNtIVA1xLGqNYCt4R1kL6orAZwZvQWS4Lcm0CfFIRMWy+Ch4Q9mByEUtjF8T2JpwJqglsAnTuctaShkmCrZM+CmcC4VKFYXuBoaTklLVSXkJGaABgPuCSItUkCwDoqkv2QRwXbxW3gZJXKEVp0mSFVmBWaHXRs+DnhwNxj/5vIp+b916oxnH7rXk6gH5Omi/Ttc6DCagpjAEcQTBILwr4D0KBwY+eHrvD9/7PNb018WXq9j39uLGQ9wi+RqlNQeHFF4G8QqhJ4CNVCbPfQDIAfxE4geBmD2tNn+MzzEMA4Drt/auB8StjNRYCH24XxUZQJ1CWAHEBcPByYW3bgslRceJJCIEONAzaA75wAEU5a4TAWR5eAkZYVgpf7s9V+oIMNeaUydA4XY3gYBR1CoAkji+eE3OdZDlYaCvXyhHkkeU1gQcUNx2+hHBDYpHgLgQRmuiB4qHBPp6HpqnKHaiKkAksCnwA1J9weYE5pC/Jtj7gtco99WIYB/kkeQdaVnu10k6gBOAYwACtEQhg3TBZ6BFSuuAlkDcc9mWSRMYzlzsSGxAOAO0JGBO8Uj0DcBOCN8WMDNhtazbTmE4c6AH+cRoE0i/AnHspj6lTLCW8FNRa0ZEuJ3KvKWQQA4lRJKdHBsGfZANX6FwTOLYpT6BSkAD4IywCo4npL/utA9NiKC7A0sUPzCg0UJBUNwW8Z6cIcKXZTov9xQ+liEyxROYXzG3I1meXtRUZLAJ5CwrbwM6scyj1IttNfcqKbYWzzPMBPczmI1oYQwASh1DM/Q8P7duylgvxSbPvLLY5MSujgi1J8Sg3Fr03OUwqCoxw2pz9eUMMn+JQpLbuxbUTzSn1Ae0ZGLrxPz53/Cu0F7ixIBegp2S+TXAHpr0klMDkG7SBMC+wK9S/AjmywLmUDim1BP9ZQiPSa4L2gfCWTEEfZmyQxBDQg/lWhdpgIxgW64PNg1YldADVXpEhZUSHMOZSWuiKqrQhDqRyr2NBsDHRs0lI4oSP4WwStNPXWwMegkwOvwjgy05fGxEBDiGY+TEDsAxFhE8Ag2IkYTEctw+hEThiuDPZFwuBoRPi6LDdcgfy+wGpQOAZ6LfJOxjwHt0OoihS4Py/HNcIm9YkXRkwoqAZyKDUZUcM9HWAB8T7CAZaBlwkfhEQQOQsCLocBGNFECZuHIRmSzOal4hcSxxheKRDKuUH0FG0otBSnNAlLRs4pGMBriQASe9fI54ocwhXwFx/GnlXi4ZSLdM5g2JzywgpaSTAJ+7xacHf/GHH392Yv9T2NuLOw/jTTFfFXBdwtdQnLwdJ45NCAJqEVOD3qfzIwSeufTTZz/5o598Lmv6a+JLVexbt/dG8OpqTu0uzQaAvkbxVQArBGYuZBICkej4UQkJhfc9tv9uNA1HP1tx/dni9u279eP22a8ZNAdsGaYrZUiBDODyxQMLlBC86DPB5kFiJofmPnXSzRiK960TQA4tZgfQBpBPJKwW4x7HotaosgXsudFQlLZosCXQA9xOnD402uRCocMxEtCAPBK1Doh0HBPoyWxOR7UIea07cURwAxAhnBNsRVUQV0AcidygfHEMzbkIOUK1wJbSGopyOnRgk6YDCBRxYSi4pMrINUENyAwAAp+ZtFqiL5gUgWcHom6yPCDvQbiBojizE8PyvUgQl0nMAewI6kA4hAjipxB+pSh7QIYexX4haMCmqPco7kA4k4km3oT0FyJ/FcAJgI8JNC6+RtMHKAudigyUXl3cDmMCjcAA+mOIyygzIE4AfA3ERxB3ALwH6CZK8cIagQnAh4K+QehHAl9FEVbnpZ1TpyANAhfHrwo4U1nTK4vvHgKIAKKKkhwJGJKYqnSNBHxSJ+AARovjUbZF2X3q1haADKArghUzQB0AgzBbSIQpnrNyYWGAwcu9xsVn6V2BuwQGAE4X6akjACPC7wt8HcBksYYzwiXxMQmXYDIeAvgqpQHAh6ImLNfGRPyU4EuEHkpYEfFTK5SZVyQ9FXloxU18CRQhTACMINwDsQtgn+SRu15BMXw/IrAhcgr5GcEtAS2kvogewQ9BbgMaUxg44AQGEFoYDMASxEeAVgUFgoclYqXTRRTNBPYBidCBgBnA6wL2QZywGArX6fpIxpeKQYoDAEHAjFC9iICRQKnZITcI7Dso0FWUrgjRLgyREsnCWNS6Ac8kW6NwIPo6YQcOl8nWAJfAthjTn3jGIlbL81r2LYxuSFiheFyMBD8yYrV459Qnyn3xHqfLuFKW40fl3gglN7+Qj88VtSNnU99gFeBG53EGBGJkojlx8nx95QZccVAmmRcj0GToLNu+zCciZhLODqqt9z8PJ2/n9e8MNUlXPPpLkn2drqswblHqAKxgsXYJPywRVbwn8YMgPqtn04cPHvyr6We9pr8uvtQReDarBym0gbBTOrZgdAKdADok0mpQRulDkRFuH8jyFKqX7m8cP8P9z29tH/vB1Sh2GerRfJ3OCFvc/ERC5oBQs7jRSVpf8pmMa8F14gE9OKYAIKEDtEzydGF/SvIpAJZCEVCGVUInIEjgWPK1XxiyJD/DxWMJ1iXhrbmKB1+Xz/YRxeOFsoCMtYBWhmRelDqwqFst+aF1EcdwPFfqzx/IUui3AvAMdMEZSa2QmEM6FRFIHEjYMsAoUPIdmR0YsCygJuxgseYdAD0ASyhCDSB3FlwAK0VyccPgW6JtC5oTGoh8BmEbRAdqIPEpgCGkE4CbEBxAC8M3IERzGYyQdJ3gBxB/DcAWyIpCSZUYX16s410AXxFQ0SQURXkFACg9BTAAOMTCoEHxtBoAXckpsg8gQ/gmoAmAbwEwAVMCrYCtIo/RF/h3UZTu4qcqA+xDaAHUwPNEofjvMbg/3bCsv3ZW8RcOJBaGwuJDBj/zyl+JTx/AO5/6TyTy4lomgRfFiR2ACpAEJhC1gHMQU0pCUdZTQJHFcPxIxE0CXwPVk7gC+irJ6xJXAO8BjASuCtgoAR82gAakTgW7RaAHaAz5Ock+wAeQviJih9JIYFKJsmSSs/IblChtCHxp4Trug5wD+BUIP0V5DtZIbBAWFusGAJm04eRHdHUgNgCbA9hlUdg3JN0k6CKeCFyGEA04ANATEU3YlHgA6nRhRO8QTATnJdK2iLrRJXCfQI/0ZQCQ7ECGDYAqDocoYhOAi1ozt+OFZ7lCqHYjIa5ROqTQA3AseE1YC7ikRUoMlKhVCXPQBp/UlpZb04AVL+HGI1FrdByJWAUXTotylmMNpEpIvhglTq4b7AhQBZhnwkkfyHnmJWYZXaUmKYghG44hmkrOHXIT3CVTlCEauKEc8qafbjzDm08+69TVk+qg3YzLqwZrJZ+IPKYUVdIkYwG1iWPC+272Id3PQF39JNL55eFLVezyzFgjSgzZOQGyEYSEcyNN0hjCMoAzmSoYIwwxt5zdDq/yHbz9uaxr5/XvDNuuXZKFEGQ1iEqGMSTCMSJUO3UsYEpiCLnceWrGdTpOZFplxgkDVgGMzTSRrFh4EOWIMFuG6/Qi/AUAugghEyeA/Yy3TrAB1BavXAMWT6AcXd69kFGclI2tLR7E4xLuwsiJY4NR0DqwCMFDhGP900qd0CGBTQmHMh0CAmVbhB8JHEE6L3pcm4BOCByoaNNtweZlfjJA8FASBWwBOCVBFQ9yJGJKwQTsiDRKnclvSoigzgh0EleMuF7SgeirGByVJJL8OoqA3loIKQNgIvchjUiuSdgBEAgEQRWAtDB4RotT/isoXvcahLwwKocAMsBXi6erRf5OYWFEAMULjeW4X5ze+DP68RO92vvLdmKh1P99b/8bggtjAQCqT+3v/SXHNj/3/8W1WBPw0vO9QgJ0HWCAkAG1JaWNl1CMEUcxHDoAjwS+UgwIJAC7AtsSytUrIGYCAslHkK4AOGShg3YKDlhf9B7KdX9swNcWl+ihiFsQH5HaKt/lErlPYR3Cjkg3+U2ZPQGUFs9altgTsE8hi1AJuMkhnAIMgtaAhQktAGIoETvul0iMWzl/FCBJ9ozUpohnlDWAC9SA0tFCEa9TPCKVJVsrEUBfJyiR4xIZAcAiD5wcQBCAPqgO4iqoIxJSkbkg0EjeggBMdOHYqNpli9Sjl3vVxBL8s2XKj0BbLbICKw70KNQXcs6lvpFjIMNkKyCCgCkkOphMtgo4MnUMEKBcwiptEe43O3bXppI9pnECJnmntZ3X/8/TJz/EZ9slNZsRWB0jacPJMY19FW99DGAE5zNRXn6vDmF2IxA/7Fo7tPXa8OAzXc1/EL7UOeUD5ZPs7DypInKv3IyIBE8EtCQclETWixDvEoSz2LTNfH72uQnA7ny2Hjqrg6ly05rgtdwDAIiqYFj0KAZINnHayUW4KS/cEycdsNMLZV1C8b4MUqA55Ucye37+CT8lS+52sesEEE1YNXGFVL8cZ78YchLXQGSQx6LWBK5f5NU/OUbPb3qKRzA3ERugjrD4TkqHRanbJmAEsEnnOsWBoAPR1iBRsE03bJbPxepFbh4GAzUp69SBS1swGclDEmnhqdoir74DwBbFbQZgLPAZaCwhT65jURks0CAYSAN4jeSVUn+AQKInYB9gJ5AArgJYkZ6Hprk4lgBmxevGBMAzkI9RFINQQuBlP54LiDMUisZDlPD0xT0XFu8hiiK5uCaXFfH/cfgkTfBzAQqU6NaFEbW/OCYDeowSNp+gnP8VlIjJ6WLboBSLZcnj4nNXFtt2UV0yASwtwvPukgRYKQjjGNTVxRoqgBUc1yR2IPYBHQh8BuHKIqWzA6F6bmgbt0UaoU0KOyJWi0GMAMEE7cO4JRMNNIBmpbr8mGYHKD+8I7Ql8bCIBE0kGsQJZBS5XuQjJOcG6MclLYa0GJ7SOnFs7usmrcmMJdXmLYljik1R+La6SBuekjihkAnWcDspPwWrDqs/qWH5yy4g1yFkyQwSjZwSfkr4GBCNPoVykLDqdLns8HmlvEQnTpzl+xb7yne5D0v3kIzSoQXfcuSGIfQD2KRZWv3MSVjeuZuCus6hOam61ESoBbDEYuSUeirhWMI5oUMAiNZuaJxHf+Vnf874Uj32w2EzqHOS6BtGuohlCoegrkmIIkYAISBSWIExCFxWtkcXPamfNXZe/86wS90yXP8fe+/2HMl1nfl+39o7s+64XxpoNAmSLTbFtjQ+6jnj0ZHl6DmesUMPfuT8Pfx/+DgPjpk4jmB4Ljo+YYc9slsWqabYJNFXoAEUgLpl5l7fedgFktLYI9lsErRYvxcAgUJVVqIy915rfetbdKgM5FQJqzJmkRt56soLbha0ATmNxQCKAWQSj81yaozzx+QF3gT5GpAk2BnlDhAwNziVBWxYBcPpL0V1JrpY07hCYJijzrlY7jLlTkRKpHgC+VxcB15G6xBGgPGyFg4ZSD9Wftxq3vmLIE1QTbGEXV5w7BHKaWTjsaQ2hRmBLYnHoCRY+Cz+IF3YgoEUtwQdIWthKOE5wQ2RTyltmbGUVAFcFfGY0jmAFebsxJocWUdBBAgXkI5JCLqsG/N3zEBBY4ofQEg0tF3YIfgxiZcFP4K4BiCR+EjCGsET5XMTIfx/AHughhBeRq4nnwPqAiwALCGPbBwBWCf1TOK2iPs5cuMyDIDUATBDjkrbn0+pK9fjugDOkDMMIaf1dQqyD6lAjnYT8ob789mAr1sUf3lsl1+b+dcZ8rGOkKPqR8xlli6AE+QFNc1/35PwYxpfJfShhJvIG6kSuXDeEXBEqXaizzzhcTR/jimI6Tz7sgziAvm8PgWwQSLlrhAcKD/uNQCA+BTE+bx74wGA23O76i1IgcQHBG6A/ClyxurpPFMzAViQ6jrw8LNWJwhUO2ep8k+w+X86l24cyFtMARHkE0jl/NjXCB5TMIdOKGzkv9TAAYBcy0V1NpIqEAWzeHUJTicpp4xOp+NUxrUssgNyut2PAXMIJLkGQp4XHpkjurFD13C+mCYQqxQdsKHcV2k6gfFiLugkHEMYls1V5PIjZbIVhyNH1DiRK9fsDcuQL8MMklbynkzDucjPQDqBIeFC8qCAZThPQHmWGeQ6u0krTp4yB0tGy6E8AztyH4bAIEcEG0Fx6eZB6+j+C9xc3759Lz6DTZCA/JmRgezlzRXWCT8iuObQIwOWkc8/FYuRKVxu/H/jotmL5EoX9u5sHCqEMRjOpbROcTavETUwRIgj5Ha3NZEP6Rq6NA7Cr5mY9s/G6tF0LZgVDKFMkrl7QcvpbWD+YUNOleefsezgWQQA52ki3cgwX8SWBdWElYQPc5WBK8gKW8q4nFvbuAyKmD/vZyp4wKmhOWggJE8icxucLGCuzAd5OtezUuAaTXNF/RxpRHKNDuXXuHysUfD1nFbHuoHMETknAMr8Huy5QUQWCG2IXAdFOKITD2G4BqcMHrLpBM9BrYMYQxg50SPQUOjPX3tDxNTkE5FnEi8INg45xDNAHZGHAkDPkY9oH2XhniqSN0U0BNv5XeDHEm9k0ZIvA3wkx4DAT0mtS7wA0Yj6nwRfkfhERIRrg8afSVpDTq29SqkR+bGEBwYGCZVMhNuAVB9Z4NfAMQThdFlW8eJNASMDxiKiHCWhoZMTy/+T70r8OaEdCA9AfgdQD9IpiDVKv4BwTUQDaDPf3BQAOsBPAO1LeGq8XCQ1A7iKPPmwAqwNqJ3/Z5d/CyCXFcAsvGtAWE5rg4AmICcQIvKG4uP54/tZZKUugYfKtd4CWWxs2qZ8AAAgAElEQVT5GOAYUATUpzhyyzJGUg6xC+I9AC8J+LkRu5AMwkcgdyCdgHxJxBOTVkk+lnSQ3wePATSEui44iELCcxmXTbw/X9xuQfiE0N8LtgroBoi/vyzXQRzJ9JRZULikLLzsCvgFAIMhQXgKcQZpFeTf01UD+FhEY8CyiAcCZgR+QeDIhZswXEB6LJcT2ADRAfBe3qDZmEQP0Fj5sw4ClUs9CmcwVKSPCEZAxxD2RFYGPROwSeAQWbRm+bpAW3lj+YhCizngocRDulZJ5hQ3dTyv0W0A8izlAEGcEOiIXMsbd5Z0nnhOQazmRTPHEE6uzTdRx5CSDIEiaTjJkTuPAQEGCDlFThPMuQIITp7MNZbLWRLFUyQRzqHMVgDAoOFcpMnPyo767PsA0HlqhhV35oBmrs90+DDfC3GaPTS4zIhTl7dgrORwhzZCsISUWifmGwBemEL+3r13qu3X/323MZ9QGJO6Ls8BHICznCnBKXP2CCDVJCWLQCdVZ7iiRR244khg+aXfXy17toFUXAOxnXso8SYcfQBnNGxJOgHtVPIHAB6ax4+mUR+f/+zPjvGCT9z2d/+oV4/r/dw/q46BLY9ofdavrpVcZA2ftZ4RK+4ahryFnaeoKMDO5vWknHqan2sCcliJ3N+d29RypL4ChiF+KRsgmkCZrTDvmJEFLiKJ03lrWy5RAKPLFLyB504kc1/7VMUKI6E1kM8g7eTogscCNig8AGSCiiyCsnYW+GIV5MeAg7RrLh2DGhA2k7SZbz7cBnQGckBg6sAwtxvJXeoSLDFvbaNwDebnEHue2+8SQBd9PW8IuEvXUNSYwIZozwxYF0S4JiTXZPg7JA1A7gLzHlfgOcjX6fopTASwKYQjUwoCX4bQE/l3oHYgPia0SehhduDzQEBw2yH9E4e9QvCBoIJAi/Se57aqPuU1yGcE2pKWSBvO+5GXKGvDMJLjZcB/JsMKRMuvhYOkcEyqb0hHoO24rALSMsUjUkO6dUV/loQ2Q1bxG9ByhQ8ZlEgTvdlqkj4i40BeXYQS7VDr1CwopdIq+UzesLVU1p2zKvV6m37v3jsNftlZj7h7N9w86ITxOIZxeV5q0LAzYUwFV1JtE5qJDApWryVnLXEZas6psGXBTqRmWWbj7LiIFdJuuqcPLLCW243sYcDrhB55Lvd0kfjXMu0TmH3q1UBEuhWQX8zbn16n/BTk1lzvMANxH64dyB7B9K3cUaH3ARuQ7nAqL/5+7LTvmOMDES+LiAb9JN+IcYu55fEcxscObZrwQOTrBIZwSsQU1LUc9WtHDB9Q/iqAJyS3XDo2IQo4omnTxRMC+yQOBM0o3nbwzKClLJ7iGYE2iBGkIeZtczIcQXKQ3fk1fR2us7lXxDzK014WynkLtERHmt8nRpLdAP0UsCmFfQdOQVdu+9Rq9ppgl0KCiQ6rKN+SOAER5m2rYwNWRB4jd6YplxIvF97PWuAkLs+Fo8kc01zbt75DZ59vgSPdc4BiZ3R9avn8WetbtrX99N4lLos+uez9p2cVvrsc81S8yT9rsZt3IfCyTQ4AkstklUwxyWoID9vj7oNHj/7Tp4HYF+H27bfKRzi5VjRacfm/FbVq4kvK2cM1CEckk1NuwhMBzyE9gvHnR/HZh7h378tsx/7fcrUpvjt3ivWz3k2w6NN0TcIepW+B2IIYLturBP3CgJGojzzhAyvSR0d27fmLbXF42zZvv7ulBnsGtrJFIl6+rFPTtebGk7zw2orTT422mvtDET8zozEq/200cpJTgn6WUzgaiYiCLc2fcwhoIMs1XbolXZqsQIPcV42h0xKhDRLDuQJ2NQ9QwOjzhjaijQl1QHaV7WsfZkMNXEhYJVi66djyBL0sshOWQT2DrJv1DX4GcYs5LXYuaCZxOS9yeOjguiU/VEArK5DRB/BQjnUaT1xsBWkscCD6lLSUjSuoeTnibP4ar4H6INfdfdedJ0ZOktiYpS26lU6cQqKZViF7JPMJEnsgrrvsQ9Kd4KvK1pj35VqRQNLOkqeawbqE+gTaIieeOA3QHsj7NDRJ6ij52AIaJHOQu2b4GFTfGxUOOwxFXbPmRrLYWKhPG1iLlQ8tthINPfNZ4wkrZuWwgc/qYjKx1FrCFKedji1PZ3baiU1h49noIrZap/u42H1/UD561J79irXtle3uvyDzY58b6ly67929G3F+zs3poLWFzerh6LBb9NCoKZYY6zN5GoSiczauUrtoUici3PBgH0mJwdH2oh5zxn4ybpDmMYRxQrMeiCOvMPWASOc2iOuinhnCLLkfW8BrcjwVfIkWEpOSDJGORqYiGINcIwc2CNsE/NzMPnZpQ2Iw+CEQcuYquFF81aWUTZNYC5oJvDD5mxIeiLZqwDLoAcITENcg/hxUV24FLWegKG3mz78eCSxpPMlGOKzMZHJOSL4C4mk+rRoAuHCpk68ZbQIU5bXATVIfO6yynJ4fAHaGuTB3blbTAqCcfVBFx6kHvkrHAchu3shzYsRUrgJkT/TcniUuGTmRYz1fwzihW4mcGrhse5x/XufmNOA5kURH4Wad+QZDkEi653uLVYAv5cDIDaDclcy0Ss/eG+nTTcYlv2xcM281RbbYljHZUOZBjicWWQel46fv/flHeDE20bz+xh+uVa5/41RJ1zWA/wrEGoFC0HHeROlYxD0JT4Jz0kDDNXT++ssqF/9GB35VLwwAG7d+MADbOxCuAz4Q9G0TrwvYQPZI3wRUS3xEw88kjYPhaTXVX5w+ePf0177AP4HdO3/SnQ7H+wbfBACnlWaeBWtJZY4oNCAwEzDN4jKX5RR3rqObOBedwYUmW8Gy5WAL8PN8wXjp83YvoxUuNJRv0VgDOpNbIXpp5CQbYbjNU/80+kTOAAC5vz9HoMnZkOoLfh7MbiT3T8hwzeCVA8+DMajRwAPa2XglPAV8QKDtuU3uUUiIDSkLaksYQW6GMHP6mjlPYN51WYfkKTz1XDiyiLaEPcAeZRWvDSRemKUT97BqTOu5N1ZnBM+zuQqmSogyH1++F5AyYB3yxwpYkcyYcIooGqxUSpOkUAXTywZ773KoDU3Jgic0ccdoB7WrTdYC40CuEY29UPMjFuw1QisSs6rB80Jq04ImbTbtcVPEIqVxsF5I3nn+/ubP9/YOyoObrRoA9u7PioODH0+BPPL2KntTv/HcuVPcHG7ZeTfFp8Xzau9pGYf9bncJwIxV2UzChBbVslnJouimGhGBPUvV4yaWq2StxspZdLas4jBFxYBZSygGRH3eyFqBofSk6NAsFLHyVOfrze1bmJsH5bSzkoQLOVZiNGsa9xjCGHJKoiysyn0siTEwXIrJnJgGqkiwVyC8B/hSMESHZsoeDk/MsQKzEXKL2DQkRIVcdnNHA+OpORoZQ65h64xEDy4XuZavt9CeR8TrEJ7QkJpkbkgtBKMnlcGw7FCVFyM/I2wwd/88otCm+QlEk2QwLBNW5Y2+7LP7H9bnxlGnELdEHdLZFVXke5g6JLtGHSZZB0qfDkcxWgFHD+YXcPRhRpefAAGWW++ykp5+mv3keQHg0357AEDybIkdcQThwlMYH7ee3H8h0fKdO8XmdLCuRt+Gh2ug3gDYQ9Z5bAB+lLU5OBP0ocGeAf64ifGny6Pm2Zfps/LruNKFfXf3TteXBluNsAHHNcDeIPWKgAihB2AAYopc63sG4D3SP0kxPju59/98/OKO5G3bfu1/bKSYbhu8So7tEDDyhqWowgxRwNQSpwpYzgpzDWR4isSeibVM0cH1II09i6eGAJdgbiAeGtjyBlPEuVo2oU9aAnjh8NKAFuZ+yw4rDSyz4C3vTkH0k1gTlJSCgWWS1YGYOlLLlAcxQLhQMIsQk6OZ+9tfSGYmtJ2+djl5DkrnTisNXoLop8RPVIhBbCHZjlB/YEIbNDm5btJz5RY+JPjzgFBeRkQSViwv9k1dlcOAquXBJoAPlHxksbgJq37mdbkKpLMIa3lRj9OsVZCVLKYktRhhrVnwZHXrpIyTtapBE1poeiOcnnjTWbU4mSyVASP0Kvns5BerF8A7aePWDwafmx3Amzd/VN6//6cz3L5dAm8C996p8NZbAe8sJsN9Y5mPSL3coH1+o7a39/0OALTbK37YOe+WHus061ih1G5CU1jhQ45Dr1KaAUCr5auNYhXZlI1i5Y1ddGJTJMQlUf2CeDhN9VaWPTS6nJ5YWCqmM1Mo1YbSkiU7qQvvRPjMG0QqbJnhFDQ1yROggUXWTEqALTm9lIdHtOR5xKm1EANDU09hYcfBI5qSyeoktAK9BM3zABdcgOjD40hBK9lulpK7OawK0g0Pep4XZpvIfRXE0GCVyzclf2whts19TVQUwzPJzeazKkQVhCoRUzliNqIB8qwJY94U8cJ9Pu8BqeUIs2wf7UvBOGmSeaDnDIJrnO+hGkkMJl+G4QlJJeeWUTM5Rrm7B0PIHxlie1bEe2f3/vMJvnAW7K2wdvNwJ8ZwQ0lviB4AfhvCzazp5iFyp9b7JKYOHND5dzH68ZPe+cMvy+r2N+FqU/F378aNp2nTa9u3wFch64B6fd6Tek6hK2LMvIM8Afg3DlUAf/YibQRv336rfIbDNUzRh6FPY69x68ag0WWKDsTQhJYjHVHcFsPTuX/wmSU7SVFtQ2qxiUPFZvnyufOgCLM8m10zC9ya76wnpIaBPpOH/HtyPVp6VjdFomneLuFLHvDkcl4xxGUGO1FiiKGK8mC05I0X7QCvLm8IZdSoQSiVfDVaeiaFJdDUNPVJUWAFwkWdrLZQeJDayRTlyUIdTtRN1Mx2g9mpao2slTqTohm2x92iZpim6jxYbA8sempa1VjeYwuzKsxSpykQV+r+8bnS8tP28une8CAcbFfNxkW7HVo9L47Pvd1e8fE4hrQx42Acml9KWeWbb/qHpnItWPA1g7h9u8C9N9PlKOH9/bvtUQ/xsH0+A4DVk9Vu7DQpzTp2fP/3LnD3XQOA7eOyBQBpNrK6ZOR5FC0uhZZv0Pz92m29Lac82ix44iyPTE6GqdxpRUqW4laCZjGVx7Oy6URXuzFOw+VI5WA989gJsTkBgJSwguQjK8u2JDYJjUFtC2zUpLFoSyE2tVeYqgxLnmyNqA9iQExNLMRmApQw+KaTExJ9T2kSaCXgZyQFsy7BCyktyTWC4RrBc5BysUVPJ262FsiJPIWk0Lmsw9PRAFxC4IXcx8EQnSqUOAG1Y8CRgy2akjeYWkSbydzpa3SezHUSQ4Y0POqOj17Awsrll35/JbbDTSDskbpJcV3QBoRNUklgI/J9AA8pPzHyEzV6uszOJ9/YVPzunT/pNsfjQSrwEuVbIF4nuCVgn7mWFbL7GA7h+msaT9zxUdOu3x/+7X87+fWv8Jtx+/Zb5Ul9uFSFVDQoylLcbRL6kD9CCbBOTrMeiD4TTmWc5GlQwYG0K9coMM6ahIaGnqV0AkM/KVSFceqpMQb2QBOSRojYBijIzYEjNkpuXM8TpDTM7WpAEREbWcsaT6DJoidvLCgWYzZ116InVcWYZeiSlaY0YeLDUFpP7iyCFwnpKL/L7iA0bAAgRcW6nExKjy0L5Xmq0vVmmp61lsraU8UwS504bS4ODn482d+/284ppbcCbv80bPjaevu8OT04+PFkseguWPDP4lJTcWnb+6sYANy8+aMiX19vG+6+axuP687RTjHZuz8rLmKr1a0G1aNH7dnyS4+XLLY9dppO0R6cNcfjgbejeW2joptSdeERAMqI9UROS9VVMt9JTSxK84+bOoRpN9ZxOumVhQXV1XhWtjsRdcUq9NDGhRouW2KjIpj5rGlkLZJiowTGQYJmZUzjqmGvCMUYnPa9tokV3hHiQGwOzdEkhjUmJWM8a1S1qNhB9CVTOHZimpjK4GgHxpmnJjQRTanIJqVuIKZNRMPE7UBOcokObYuslRCLoKdSSSENnr33w7/74k50b4XN24ebmMUdmF+T/CUAv0tiWzkb0QCaifo5wHODfuLOE1r8JLQ4/CrGiv9jXHV/rG298oeb3vI9JFyT8SUTXgZ0zaUezEDpBOII1McEf5aUmlL+N0/u/9fDF3UQu3f+pDt+fl56r2Utn6wDLQTVtTcWGjWVl9Gi2PIG0SIayMlGSWUaWV10PYQJAASpTWs81YgM7CXwKAXE9nyhNsfF2NC3Bo2FwgGgijZtua8z+NmMs6p10Sq9tGCFJ1q4mJ1VBQCUDK2anHZiU0yaWHdWO/WjabtZwlmfNtJwPZ7v3Z8V7hUfPfqr8c2bP2rd35ukeY14kkVNdz1P4bqsE79twD1+TsS1YMGCf5F8Ng3wH95wvxUuxwvv7X2/026v+Hk3RU8V6xGiRfR3WpvP7t1D2t8/LI57s24nDGZPi+fV7mMUo/VOy0Ztj50mVdYUbXarehyChaafao1oaU8eDix63wpPNi29xrRVUtMKoVUEL5h00YR2YYWnesxWWWK5qjAszAuLnhKLwlO1oqQnFlvJUurULas5NQWr1mWcXAZBDHYiT1YYpsqDWS5Ul+NZ2XQ4s9POaqd+9FdfXB2//dofbblVuwL2SH5H2df/FkBmj/884Q/gY8j/0gJrzOxvnv3rtaOrLPtdeSp+66Ow7kHXjXolUdco3ARtH0AENALQJvgzp44NeCDig9g0H7/IhR2Y28heeOyWiuchykYzB4BQWq8uiskgNZw0ZS2vKW8YW0UXAEKLw+rC1y16ag16J6PqpFV6rOsRogUfrLH37KiZdE73cbH/APHBg8369m2E4fAg1GsDu0xNf3YhXl6gbxveusdf+nDMa4Qv8n0vWLBgwT/AL2cTLrsdkPUIn92z3rbd3b9qr662m8ezi3bRTWl2VhUWO+7NxFaA6VnslADgzcRiq06eltidntYXsdUqGVqV0qy1VNYcT7rqdsaXwYxF9L3JLp+xkzpKhdVFMWmzKTxVFhVaDdOMFgQARY2mYj1rj7w5ONirLssjX4SNWz8YAMUtALcgXBP4MrO4u4vsAzOC8B7IT2B4QkeDprlv/fajb2zEvr9/tz0J5ZLH6nsQtrN5AyJgvwt4a+76dQzhOQ1/mdw+IdMnqcKTF62KB94Ke3sHZbudW9XvLz/zjYt2u5kV4XQfF3j3Xd+49YNee+RNjC0BwGSpDE9/8l/G+F+j3V9tX/qX3M60YMGCBV+Ef6zkAADYff3uRtc75/fv/+nss2zDZ+2TG4/rztF7//1if/9u6xRox1adVtJSNWxNiqI9cB+db3ljoWr8edFDc3jv3Yt/7LX+qazd/NGSislLbMIO6d+aj43+neyWq46Ep6Rc4F9T+hjiOYry/SM7eP6N7mPfGHc3LMUtJ17Os7JtT4Y9ynvMIy2fzJ2gPnLop3I99YZ//+IXdgCLBXjBggULvuZ8VnbA5+7ZX0Y76t7e9zvTXus2ZZugdhz8LhzXmX3ij+YTJ/+WebT0z2B84k19//iDP//kRR7HP5UrHQKD6aukBSWhLWGFQpv0aXZispHEEsCAQAPqaRADSjuLrfrLql0sFvUFCxYs+FrzS6K4T+/ZX4bHRNOO/cA4c/iWgy1IZtl5Lnw64AvaAvlY5sGTP/My2u3bb/3q1MavlKtd2AGEhLbl2duVaM+cnzfx1xmyUc25i1t5HCq3PS1dtehvwYIFCxb8lpNaYdJ4UwN4aHnS3IWgDggjESHa3A3UTPbcgjohobl3750r1UJd7cJ+752qYZrBcI1Ekyd4MZDYprQGcE3AlgttSicuq9z8WWhNXoRd4IIFCxYsWPCPctg+n8WACOC6qImBJvICwAWgPFRJeGJCBH1XztC0qn9Id/WVcuURex01dfeP5JjmuT4igJBnL4sSL2B+TmNl5GHhwZZnnYUyfMGCBQsWfKmsDbc6XsdCCo8AFk40zHM4lkES5Fmut3MJwENTqMLY+rhi/dqVL+xF02sbrCVaQXd3ckviBfLoxYJUB7CBHOtKKkD1x8sx/NonXrBgwYIFC74AO63+1EJ1apa2lEd0lAQrAAXEAGhVYC36E4C7zmrKEK/cF+TKF/ZQ6GzuP96HccmEKc1byA4AQwCBQCtPH1LRNDy1p0cLkduCBQsWLPhSOWlPI1TSyCPLg3raEhoAAZQjR+Z9il0XTwLDXDT31pUGn1e+sHuqBnIGox8CrCVV8x3RuYRIaAJ5BHQGs25RJDvYrppf+8QLFixYsGDBF8CeHqkRWgAgYcXAEYBlAjXnw28IzZxojD5J8DLX2K922NSVL+zTFGo5nsgR4T4lWeaxqOgDWBeMhD0nkEefpjjGYLCI2BcsWLBgwZfK8vJekpK5rKJ4AoASKKAtyUSOAdKogqQAng9O0pWNa73kyhf2WLExsEVDA6IBeAZhB0QHAAEVglYdFMQlb6pFff2L8Nb/miK6efNHLdy9G6/icBYsWLDg68psdsEITuGpBwBONPysJTtQ6kswyUZJaEPxa9GKfeU381BM3FB2kliDWINjhYYTCWvz42sBeELomORURTC8u7GI2H8D9vfvti9adZH7/o9xfP8vzrb+8njDb/2H0FgqIupKKSyPMTnaOrDl+PrdoY1no7rFQaXurGWzso/+2f29Sbr0iV6wYMGCbwr37/9ptX3rDxyMhHxER0FDoWyRO4JQkDwTZHQlelOfLS91cIAXbpbzT+HKI/aVtFQ1CadGrRpYApLEtfmxCUAFagvCMhxPQdN8GtmCfxxu3PoPu1WJfmBnX616pWmtxM3X7t5ki1uSX49iCx6XLBQp0QfJMK1CKqa9/mrV7raLmPYdxdIxqtc2D9Fe/s7vr171m1qwYMGCr5S33rJG1mLCEG4p+8LjCEKAsEoiCVgH0HOEWSJbS8OzK13Uga9BxN40EyJiIOcE9CcArgMYA9hCVhw+hxhADGnqpMbHuHs3LCLIX+Vt23zt3VcTO88sVte8qccNbDmhblsqGmN9jYGzJqV2EJdBlUphnFLdYowWIEKFmlR7QS4noEHQPpL/Fdx3wixO1l77g76Vao62wyEA3D7ctHv33rmyQQcLFixY8KXyDsBbxZmj3gOtY+JltrimWLskUBOjPEBRZlujsncAfMMj9lEPK6QPBbQobJNo8pxbGqQCwCaEJ4DcE2IMYQ3v3l1E7J/nzp1i7ea7u6TJwnSHNJG8jojt3HHQrBP+qsTvGbnmhpcT2AL9dy3gNXe86Y6XAQ3Mwr5cI8mN8LMIe1N1HADYM8ZNoNhZeYD+6sex98uL+ttX/llasGDBghfKW0Cyes3AEhIlNBC2ABSir5DoEGi7WDtVAv7oqg8Z+BpE7AAuUoyt6N6ROAbYJgAQEaADEsk1gY2ID52Y/soQgG8e87nst2+/VR5NhyscVV1FHySw9EZFZFoy01LT8CyYheRIISCBoqQ3SXwkhF2ZlgEDJXdyIzleovxjJ78bYBMITxDlAN6wZBLxAZKfxXbY8kZx7bU/WKKF3bosf740/M+TgyuuKy1YsGDBC+UdoLxVjpLXIxgN1C4hCWwDJMBjwQuQfYNmplhXnXDlAu8rj7IOcVhFVxvEQ4onIp4KGkOqASSCEwlG6mEgpmB1jqseN3u1cPcxio1bPxg886cvI3g/ebjReNiSsGeGfTleB4w0bDv1nUBcl+tfu9QREV24BmmPjiSpEjkx+oTAkQx7BiwLmILoJ9c1Cm0CG8GwIreXAB9Y9E6MxaqEi7Lx9tnyUmf39bsbV31yFixYsODF8Y6TlWjmgJ8jL+opD39BENWh+IkpD4Tx1NjWzEZXfdRXH7HfezPFNw5nnrie6D2KW9l3VxFAI6oQWdOtK8NugeIA39y56bb52t1XZ8EmEK4rUVLaomHboDO47YiYSd4AtkK5QTgDeYtAgnCT4DOIFFWCMAptUJKTNIdgS4BIoOXS7xh4odypcI6kAQ09Jk7d/CXJj2PA0C21itrDDDi/dvOHfHL/vx5e9YlasGDBgheAVJdjxtoJWwWUILVAEEA00QQhTyXllIXZ/d6zK88oX3nEfvs2QqoRXTgi2BJwCHgEUIDoQwwmRJgbHE9NvEBuNfiG8bZtv/ZHGwAg1wokGtKrNGzLOXHgNaeSgN8B+AqgHRhfA7klqBDQnj/RAIQAEcIFAIgMMtHFLUiENBZVGjkBuEzS4S6HNkiuibgF2QhEX/Ilr7FBJgWztXGrm1Zf/ffLuHOnWNTdFyxY8C+dVE4CHNcATCEYwRMIJQAHvS/yBp1O+E6qON2u1690FjvwNYjYh8OD4N3OhMIucsp9U2Ag0IZ4CqilPM51AvjSuIo9AM+v+ri/Uu7ejWsH715TtJfc2SFEgxUQtwD1CY0orAh4FdlffwXCgNJDkeufPg8tQXgMAtlFSQQpAkeAQdAmocoNDYSXKQQJRyD6IEN+LXQcqgD8nwKfmezjELAsWssboONpRYX6G6OlInz3f/zs6U9w5WmpBQsWLPjnEqpOakJ9CmALQhDQI+dBkewpoHMCFdw+KSPi01vLU/zkao/5yiOqg+/vVRHWInkgkxEsmC1lE4lTgIcUT0FsE3Zm0a/Ug/erZmX/7srmITYshG8lx2tGrlH2u5J+B9SOkz0Qr0tcBjCgsI3s2DeTcRl59u1ziBRUyTxAoIh1kWvI9ogbOQMgA/iYsCE53/TRJfqEYJeyyuUnBF4jMZFUJeP3IB8bVIEa1O43PSl6Y5Pp6bjc+PYPd67y/C1YsGDBF8HblQGAOSYEjrK9OYl831whMQU0EDQAAPziF1e+rl75AeDwkAAgItIhQI/zLHYUkpYBrYi+TOcB6G7FN2ZhJ+7cKSz4QDPekvsqpeTyLVBdEqsCX4FrR8IKyAGBYxcaAVPkqDuCcpFrpA5BnEJccl7qE3JPJuFHBDYhPha4BqkLx5HkR6KNL1P2TnfS9pFbPlYgvk73nsNekbhL4jQQtwzYsJi2Ot24nGatYvP23WtXdxoXLFiw4J9PmgckM7sAACAASURBVHXGgAhggFzKLAB1AZyBSHD03ezYxRqh6d6evnrl4u6rX9jffTfJnYAPCB66sA0hzY8tAOpRdKe7yDWblt+E+rrtvn53fe20dy0W4U0jNkj8K1DfMtgNACsCvwNqaEQEYQCioGUSicQhxECwghggmcQK4hhAMGG+mfIAw/mnHwOiT6oQtQqiAzJRSga7IWBKcVtAAZNByn9EOuhy+KtO/l+iZm66bWJdJ34vlGkTwAW+2Z0MCxYs+BeKhTMFs7EbGhJdALP5r5YI9EAW5og09ODl6N7m4ZWvUVe/sN+5Ew31mSdORV8nUSCL4yKABNIFtAiuw3gw7Y7rKz7iL5/bb8Wph63IYg8J/URsQ1oCre/UloQ3AQ8Q1iTMeyZlAhpCzyU0oBKgM1CJwBGoAaGKUi1DDVCEPYfYg0QA5040Etp0GxLsiigotiQRcMHQggMCD2U0wiWopFsi7HlOR3EC6LFL3zbaIRr01RRLm7fv9vb2vt+50vO6YMGC34C3Qha+vhUAELdvX4rB+E28hhkLNQ36Jh874Z8TIhcCnoJ+Cvi5Cc9nrITz8ysPYq5cPIdXX3X/6+dLIWjFhSmBKQmXGABtUTgDECHWFNq9cnU2vOpj/nKxDX+yDoQtjzaAc43UdyWWJl+hLIlaAfgRgUMRaxAcJAnUDvQADiE8kjSmzARVIo/punBiZo4lmH4qqIDsqcgIec9khYguoE0BI4gmU1vCRyB2kAfxdOTcNcOhm+p5j/sM0oDSMxD/VrC/yaN3/dtG+9C9/p4SH1cr3YOrHo6wYMFvM/v7d9sA8KB36Gi3hb/6k7R5+93uIQ4r4E1sh2HxdK2arX1S7hx/8F8+AWC4cydsng5enrVbx52gWZgedtz/jH30z87SH64IaTR94w8H3TJMzxJbS8t/3AmTlHrVqDo4+PFv/fXcG6EZt3me3L5n0kTgDFACGARtmvD3AJdA93aTvhZi4St3yMFP/yPbGx9uCSiMuAbwJQDbAHYAnAA4JPieqAnEC5g+Hj394Lc1aufm7bs9r+x1hLAP6f+guEtgF8QWaWuSZqBKAI8IJoEG4wkhh5Bg+JhABfEJoWWAU5DnNDwW1QEhgTMJMyP7IIYmPqVhWeKA0AWpA5IXkGrRtgic5JHDvEbgTAQJVAJpYFfAigwrEFdAPQO4S+JC5A0SQ3OOJd5IdfOwv/tKt7i2V8yefXzlM4sXLPgK4ee+8ubNH7WOj+8n3L0bd9e/0+5u7pejvRXg8WOf/85/9W/39r7fOfvj72u32Vo/f/5gcu3mDzdf3vm9ptVaLuPWd7qtpb2OlkqlVPXL1F/u1p1e/9qHXids9NEuV5pJUTdppzdOASCKa68XK2vXtztNUbKwqpwG1vV0ILGvtjVTalvBO0rai0BIszoG4eXgTSRtyXum8eGDi6/8TH7FrKzsxzpyF+5LMisJ7QPYAFAQPIX0WOQDMFw07meTe//v6RUf8tcgYsc9KpUjxsYlBYGJOTc8E9AFWADaIfVExLPi+PzK6xdfFru7dzqzxv5NCFh3pT0DR6K+BWAXQJREELsATwVMQJSUjiUUIIag/ifEILJnVILsfYe35HgSYKvu+iAGM1BwakaE+6IXDCyVcB/GAHkts1U5IqEa0hjAujkPRe+IXAX03AFANCfdoCVIh4Q1Im5AeiTnGzSv4eg5LVrgAwH92m3cq2Mz2Pt+55uw21/wW8CdO8XN4Zbdv/+nMwC4efNHrcvvL9nfv9s+GTSdXrk6AwCOxp0qpFma8WV5OEidUVgaYlIV3SUvLZxVVdp+7Y9UfzJtTTFE065HW+cr/ebm3eK51+eDN/6wX7rahXkxDq2zMEn9MSut/N1za0y7127+kI5i6Ul9uK5WMYJGsBiW0qxuEOK8xiqkmV4ytQ6cabUJiITPUBc7IaiDanLsKtuBVZMaVh6qTSrUMpxixl0W9bkQBkFWNQkRDEs0JQh9QVRDx927R7/tA7lGPaxohimIAeTXATYAegAioIpkQSKSmjlNwNsE3r5SA7WvwcL+TmrafzwqG4ryY5ANgE5e1HEGKYG4kFshKB5sVw0OrvqYvxSs6S99y6Q2xD7JLQG3ANQCVgjWgiaARgTOAbYlHDJH70O6/YIBRyCgpnmmEG5Q/jiQQjBVTE9K2HJdh5PQmtVexzWHw4ryMKXaPPpqqK1U4J6Ei2CcyBEETSF0AAxEe2auQmRD4KaACeFl7o1nCWoHDhexYZRJTKBuEXjoKZ3D7LXQ6OczECm23sMVT0Ba8NvM2/a5mRK/5FS5u3un+2gH9XLV6Q//9r+dbNz6weDovf9+sXbz9wbdqdUH21Wzez5YtvFsNCp7ZTxtNi94MVy6/f1Uemyd1rOdrZv/99CiJ5+FibqJ43FQb4ZUVdOV/CoGVfUWEFC2mhup6R9X3eaG06cmb9dtJdapT5ZDhtRtNbbpZTqKCFWDZq+LOJJrLPNuUTebMsQYilFqvCNwkhiuJ3nbjLWh2EzuxzHakjwFCBdJ6hjCLBhDUnojIB0m8GUSBzJflbBuZjtEetx4UUnNNTIMGbwrN4Wo1dSEwsg1pwoLdi6IdN904HkwjVPCysbjunMEnH/1/9+vjuVZ5+TEqhuAPTVgA9DrIs4hbAPqSjRABmf0wsLXYZbJ12BhB8Mk9VH6GYwGVwfkGJABMBpbkJAjUvY2p4PWIfBbl4q/dvOH6zX4qgHXQX07lyR8M9vrYtmBQ4OGAp84cGDCExBTiRHARRKemHQs2JLJzikdO+KMlrrQ9P1WrU5YWX9Wn0yKWKNMLT1vJnHSn8xmF626KKte3Zivh0p/UbXVRuPXQjBS6rrzQxq2IQ2cPAF8CcBDkl2Bw7mobjP3zukpwd38PYPEc1HfImwaXCdu2AaAUNrB/v7d6YMH7y5S8gv+N7xtazf/on98/0/PAGDj2z/csWnp6qbR4b27441v/9l2qDoJPYzqcbUaWjhFbT90/PlPTHc3jfEMoenWNfoWwzFkF5OouDH2DSZd23zt7vsCVtZu/ruJFc3xNITrmxet/cpxFHqDj0xpQxaGkvfbs44p4HsJ+imCVptGhRXpZSQ8QYHUkG7eXGvkj4qoixRCaYk9T3KztJSgV+WciBrGxioYeslEc644+BzwFUfaMAOalD40ww2HjQHdCMRHCXolGI4EewkAjH7IpDcEHFlUSJIZuS/HByHwNSV9ANqWQSsCXob4nNI2RLphSldyqgP6RkCoIH9T4nEwtZKza4SJKgiVdF9zQ+2wKphCct008jClYhm/5Qs7AAR45VJXhmUIMzrPROyIfAaiDaElcuIWvxbn4uuwsKuQZv8/e+8WY9d9pfn9vrX3Oafu9wtJ3SiJEi3Rkt2tsd1ut7vL7W55PBgnwSSaIEieEwwQ5CV5GCB5MJAB8pAgyFOQhyB5CDCZiRDkMpj0tMcec9x2e2w3W27ZtCyZkiiJLLJY9/u57L2+POyiREmGZ9otm0V2/V7IOvucU/9TZ++91n9dvpV4PK0qxJbxJ2kq9ods1rEHBFOFWVfRvu804qfOLk1lWZxTes7KR3DMyDlr6VGgxPQkH6TjJ8I7IQpDx7AVuAfaRXStYqeT9dWadigPtzvd3l5Zdnz16ne6wC4XLrR54/LB7elw0BQxsLRUsXq990B9qj6oVQ0N+tmnuF6nx4qMlShZTLxOzfkwayk2Lc0oOScaVTrJabiFVRJKTEl6xeFCjk2JUwlhU0r+vsTYYKjo0ogR3Ye8UEydXR0fGmKqX1ENl8Vhz90+Gjqtot5ZnWdt7sZgeNBWuf2jb2/e7dX+pblwoc3lp2t4sT57dmno6tWL3YkLn53Zufzdjbnznxtv787UEWveHhsZmdw7OLi22K+mDibPjNS5P92a31mrVh4oHLvdLBYU3m7loG8Pqz+UQ+1udAfqt6PUIv6XD9i6NHNu6ekiKOVIly5zQHvh3LferOv2TFXUqFdboUkqZi13I/l3ka4k9Rllca0ssoB81KCosmMzCcyqJG0NwKWq1mzKHyf8E6TRQd1fVHA+rCtJcR5xxWS7KOJp7BsFOmUVK2R9DupdE4nYk2IkzUPG7SRWCtRKu8RMRqFtajpEPuKMg6gzjJ5qalMYh+hLmcJnrZim1hhixfCAYD/NBdtrAILziK1wdqjVqeVRm1kXzAm9KeWj4ElJN0idUvgog8ac7FrEhvFwoFXMwyDJPqytB8McpjwM3rEVCs3IeUNmMe11KUawVRbFDOe+vMoHUhP3E1cmb+Xs7mQHuQvqq0mR/gaAzBRmDaiFh8vu4SiwcXdXfDwMOx6pRU9WMHTUSrBOY9gTclTSdJqXFHWuzPi+O4E6RbtdZXUu8LytaeGzqRhtit/YRX4bcUtyR+iqkm1ZuxZFEmtO9p3a67h3uHzlixtz5//56Nqr39n9QDgSLl9u5qcfGfV3OcqRXefyOsD8U3/4RBWxXhzWu1FUj2ay4VJFEH/mqn7W6B0ZK+immQsxY/MQMIUYM6wIL0oUsmQ4lelQMAF8x6mHbV4d1JQP3oe59sVnnx+te1tPhTRbOfqh+nwv61HRfsX2p23V88v6s6TdL7tMzp/7wlSGh0Fnyqj/UZXxu0KzpF5CziLqn/QjRtv99i2AulVP9YuDtdZgeLgkOr1+tdEaperRaXfo9V21Job29zYBuuPlVA7G9jcmbx1e6Ha1uTlUluVwJ6I87M/uRj2YVdWtLnTIN3pEp45sSYy1nSLb+1n1iyyLh6VMu9gHrhfW0x64rM+tbip+P3fhgYUnvhCD9Kvzjy/NkPz7/dH9N6zObKf2endk6NTcbmcX+Fgf7dwarM/j4mdp9ooisbRaqxhY/W7R15frMm+EmSS1LHtYymEi5mv7RmHto/zNMMsp5iFbStcKbWKUeEGo32gxqCR9GuWYrUnDI4G7MgfC60YPJqxKPBtF/IDMJ4UKW58WeqcIPod1kGKadEvKfaznjN9BMUt4WOlxSw/Z7Jm8JXiYRtTpYZkIPN20luYhqOP0Q8I1RN/yx5FfifQa0sdt/Vhm0o6OoG7mPXhEGRAeljVq55tCnxTuWdGy/QDSrVQuYt0Q6hoq7CccKjBCTFgaBLmPtSh73dIMeK4ZZpI9QvtGE0oWkbePlNX2MIVgxuSqrMWUNoUx2jM5rzr3x+NwfPe93u77kiJUpBnGjDYV8fRo8uwFcF3QdaiIqO964RwcE9GQiQtfmmlV/c8HPpvW4xKfw3wCs4b8mqWXsG5EVn88WsUr91X49sIL7bn+6vNInwI+AZwCFoA5zAjimvBrVryO/Rp4N128VVhrLr0flWuNlDf7e1luvvH1j7YT8LnnWuP7UxO7o1s7p7ZHpqpiqFWgTq3BjFMPK71B+G+IaCWWROnUrJSjIFm+EY7SuG2pkNnC7GFejVJrQX1jrBq+UVWHul++04Vzv/94Rv47Jj4uedX2vKyzyAZdQwSmFJox3lTjXN9I83sS2+D+UfplDPwSaB44C9wQPjR6FrgJrNI4wR8H9gUD0IjtcUQNdBrlYMoj1azb13qN1DsSGOoBHd6bvTABGoCv0DjWXWBb5hE3IkizwGXBO4YvAnuIEawK+8cS33NTLfwF4HqzPv0QvAA6i/wTmboJC/tnR2qJvYRadkvEHGLPdkviLUBIB0l2Aj1ls2H0hmDO8oygb/uqrM8iVpEHWLeacy035ehb/iziWrMbpU55I8xnUmyH+RnwAGgUwOaywyFrRORsKraFH5XZBI2m/EqYh43ftPSwkpakHeMZxDuNQqMmgTHsEYl3jDqCIeNpobbtQwcDJS2jvuRhAOF+87M2M5mTXDdqnE4UteVbgllSq8iJmUJsNpeZ55FvkZCiiqaAdga5tr0hNCu7zoiNyJwxrCHZuCWiD2kJg5yoo8xRpJS1AUkKhzVp6VDKETIyQ5vOPCwL9gb94pXNN77+DvftxM0XitknVp6Uir+JOYX4PeBpYBj4CfA923+q4MdVjytbVy/edeN+LHbsnczZdCybXGwmutEB+ghhbUrMyfkSCldV71g4Ix8Rmmf1YYh54GGDwbM0xr2FWEN+OYmXZd6SnHUWb4vBtSiGuoOqHqbo3VibyR4vX/zo+ycvXRrswvqZ574ysvzg7iYXp7zw6MacwkXd9s/KzFZSrCJvRXLWYlLhIVI3jt7hITe97eOYlvAtS2Oy513FtUERj213DrsLnfm7Hrr6q/PVWHzy22dr8u9DDAkvYSaFKuQtUA/4gs26YNK4BxRHEapticnmfe48vXX+jh8e93vHFj/wy6eaO6rf93L9/PtsgT1y9P/bQhsPvHfYAJ++8wV+/xW3+L539bu/9zHDl2gcBWickSnw7wN98AbW54yXgTNIzwHbhmmhIUQa78psI4Yt/hbme9ibks7bqoV/E/ge+FPAt7BGBf/B0Qd9HHMAel32J4E3E98U2hf5OzY/MjwumDb6JvZnQbI9g1yqUVuclUPIY3ZsyZ6nEcs6nSYDHk5zTlJLZlpNSuy0sO2YF84UKbwOTBjGgFvgeaRbiWcDDRsPWdyQ3MIMC2+AJpoiVQ8FupGwIFNJWs2jv7LSO0ZgFiVnEh1B17AuIIM5OWrjENyyPRdoMqVVbCsTQJJmj2SiexazgoFTjR565AahHnbt0LAd+5CRYguMHd3A0zinilDbqQM61QQXLrTejQjed1wwrE1IzrTmxFGxXLNb7wJIlMoYUcSxcG7ufh870Jl4rAYWhZ9EDAke5qjFS6Edkh+Dlk1eW7n6nZt3ebkfHUtL5eg2H0vxGcwjoKcRizRtfjVwCbQKflWp60SsQH29Vag7qNsbpzuTt9565Z8dcvXqr7QKc/fGawOuXk2WFor9H35z92DzU9sT4z2iXQ6nw0G9Z3QgmDd+BeIswZBQKRES8zZdSXNW3rRiW8pCqMjM1ls//f/e+VWu/9fBxIXOdEn1jM1vARdodKVngWHQNM1OFjXdHgG0ec+xHvo5b3kvcudG4fZn0tHj40f/nzj6d4zmbzJK4wwMAZOIBWDy6DXngWdoNC0eoLlffQJoBTwBPArMI/WBYayziGeAHRTPHA2T+rTRoprnDwGjgqeOfv8ZpL7EGZsUGhZs0XxvY4ZxNRMQJ0McAlIwbjEldOtoJvfI0cwFIQ4CWvjdz14gEkjQtJoakxp8gDWtZscHaBh8U9KoYUWitjWiYMNiQVAjVxCzhEeaDU+shTwFHB45BaMh1tXIRo8iRgyrSKOgA4l5zH7zfA6A2sEUSCHWJXclHdhMS+oihdIDoRCWBSI6oZzAwooto3FDUdjdTn9yo7v5xn0ajl/S6Pxbo4JTSOeazZdmaM6nVcyWiCtIG6Z983Djyl3/O9x9SVmgHK7qUM44tBdmivdCOgc+2l0oPFy47MMLx2LNHwVzN1oLWL8Z8DHEk+AJmhtdYG8i7Vv6LmAX7Eftt6PFtZunuLZx5Y92Ll9+8dfrIb/br/pifWvk5qaq3s2meC/GLfcQK6F4SOKykm1BaThrMyTpUeNNpZ4JM2XpSdkjivIoffDCsXAyfxkmLnxppuz1T1PJNMWef0pjyF7lvg1P/kq4nY5Z1Xt/t6NIlDZoUgUJTLqZP7APTNDIKheIm8AOcAp7BfgNYFSNQdvTkTPlZsiUaRyFKRuBOoYRv+dAEJJA47L6tg8ND9oUTWgemtkLMtINzLLMVrMnZsPWTZAxE8AQtoxqAgkNH601uf05paMpiFbCqTgqpmtSFzrESM0QpyCxxJwb8a558I7DsmM6g0VJtzAKR2BFJKXtDUILjhCSUaSsTZpd6ILRjK2QtEnKTrcsZpslgtCMpcN0bIAc9rSUm7YP6owRKW47bPchX81CdTuJ9pFzVNJ8bwbvIjnFqSaVdjw4FqH4Hp32UDHYrNOzFitHp3ocecS14JSJGxnZghfvl+lugQZPOvQg5jFg5mi3AtCV/LLNSyGvKmI5XVwdqQYbV69c7HIsLqCn8cj2wWBQvV3UqsCfsrSaFdcUjEZQu5lf/GoTOtWriN8EXjPZFlQOFVG5nnvq86fHDlc3r17lnvxuy+7hqIrWiMl/G3QLNGbyxSCeM64Qe6Q6yOtNDtYTwC6iwIy8907KoxBfswM89qh/O0pMsxOcODqwBswhHWBv0jirojHcu0d5/A2aPPzfocnx7yFGSf8AaQFoCW4YeoiL2BcEYdyh2VWPAbuYt5EfAq4CYzZXBG3kRaxLzTI1afxt4Ddk9g2nERskOzS5+h+5yZn2QK9IXDB+E/JRrI0UGzjGhANxACwLP5JmlGBP5iHC79h6MKByY8xngYqmHuIUolLT4WKbQTSeSyA27vi7ARCNY3GG1ADZNIqcy7anEbVgy2RfxGJT1BYjwMZRSmLOMCe0mmIUcs2Sw0zbXg08a2nV8rTS26ACucbalBlutDI0pdAGaAMjSDcORgZ4nCAwW3ZEkHMqKELdKZaWbtynYjXKilJBBRRGhwFDTeJLp1F+D7Nb1YxEsXMsHPljYdjLXlRZZru5bnkIPA1wJIxiixWSFRXFXW/8/6iYv7A04j7nkT8OGgNmbh8z7IM2Qe8YX5XdqQfev6PA7O6fPJdf7I+f+7IGbG/W1XAU7VimogrlGYjZoyr5kiYn+abxg5gSGBN8LuGyrGkilzXQ/tWr87fu9kf6Zdl4/VvvzD/5xbPGLxnehNgR+irkTcM/lfVJRAX8OfK8k8fUGJZRw5rkZ2xtIF8S/Ich/sc0/4nQpRRSsibx25h9yw8D14XmbG8Z2moc4MowKZgF7YLbwJCgBdhQIA2w86jv1sCqoS9YFBwc5ftvIr4HnBG0DUNYK8gjWH8m+ePYYfRt8GfA4xCvinzEjSFD1kPG3wUJsYMVwv0UozLzJv8PoT/E+gHht5paBK5iRPC3Sf6hxYWmINCPKeOyA4Mfk3kJ69VUpoi/KXkjzRtqCuRGkdtIbxjawrXRI2F+hjRruIKYwv6RoLL0pvCjyC8ZbampeJ7A3ABaSMtqdtZrEo+AbhovANcMhOjaPI74CcQ4+A2sPnhO8nWbByWN41xBegd8HmHBMnYN8dNmJDW2NAA2sRYtHRi3paY9LUzX1mlkG9ZACxa3wCIRylGJ3SYHLknexEHYB1bMm1xLsSVpPtEaUIRdZjAV+JbNFAgiD9wU2tnJrMhVCAGkvE1jyHbB01iTKNPBlu3huo7RqauMbTVO132HilZt1xYqaSKRA5oUUk3qtEKvm1prY91jUQR8LAx7FDt2Du03RTh5DevOcHuBOSWYy3pwz4ZrP8RhnqYoHgPPNQVE734XKfSyyDeA5TR7Gmq9svnq147FcIE7OZLV7E2dXZoqcK9yawPqLtArlB2ktwzPu7kApsEbSGds3ZQ5H/Y/tjzuIrpNJOYD7Xn3EBLbrd3xf1gP98ayrP7jus5/EBHPKPVnLng7MmfseFlRV+nyrQhfwPkzR8xg/a6d/3MhPZv4B6DVTP5pFFooKa5m2S2pi3+CYjfkzIzplup/NRAfC8nqtH7o3XpMncFCSWu559F+0enmg631/qVLX6mP5C2bKMALL8S5l/bK3ZG6HOx3Z8ZGcq9qT/eq3b0nlNorI7f7tNqp+mygNeQx1Tni6Lxe1PVwZc8KfyLwD2rij5x1UUQ+guMJCv0ftXO+hN8FDRl/q4Cu8e9hfVvylKU9ZYygfB28YLwe1jXk00ZtKP5LR/1poW2st5F/bHvH5keYNxR+U8ZSzAP/NJHCHBo+brzeDCRiL2A54VHk74MuWFlhLQtes2glXheeM3G1Can71aaokXXkYVKzRu8IzyNP2vqOcT/Q0+ChhB/STFF82aYj8TCwYjxqeRCODvAKsO1gBrsn9FObOdCbiE+CX5W1A+wIp2Gt2Q1rH7wr4qEkrwkmCE9jbgbazKYNFqFdIxK/EvZTVqzIrlMxL9gS6hm6oZhK5xZmP5ztZkATktmyVHAkMGOiJbPh8EzjbDBrci0cCqdSWNJMWusBUyi2RG1bu0URDyr8DvenYXdVUxWiSrGj9+pCmqoLsWv7QFFWjI/f/U0XxyXct7RUzl/n4xl8XNbfAn6PpnhuALwieAnxLRF/duvVb7x8dxf7kaD5J37/86n8r4T+BjD93hEdyP5fSf68avn7Ggy/fVt16xij6cf+YKJoHWYw9GhtD4X9WyBb+SzEHPIUpgbU1FnrCtZrFq+Dd+pCV7YW8/p9Ecq78EJ7tlr/nfFe/mm/zdheq5dlb6pyDtRWdIqin/vdqm6Pl4PVyxf3zp5dGro6u1t/SF/gHmb+wtLYIGO2NahmVq986yV4T9Z17mNffLKd9cZeq5OdPJxdXYw356/lMy6LqKS1qcNcOey0T1eu+sVAVd3yI1JxDefvZlZvheLRtL9VUM6rzOGq8nZR6NNp/bhxNCgTho7ElLoKTmVV3Cqimq1Tg0L6tMN/KmvBwQp4XHWkQ4VdT6LYETLOTwr9FHHK9lSYtxO6lhupVXtYqC30U8xiBsORHDpycOS8DoU1yMJDSs4SugGMOelK3k40K5p2N8ykA8nalHITxynEijNnrdiXc9OibMQ4mUoYEr5u+yHQroj+UYprVtI1MkeN5h1xA9dTIR0YZm1dCXnaduCYUvhtp6cDrTX22y2LMuQWGUlkpKMfatrkfBR1C0c4ckMZM266ACC4tPbq3JX7KF36Lgvnfv/xFJ9G/hRNO+fHaCJcVwR/avlrdfAXZXB19fLFuz4Y51js2FldDXsxlD6NVINvhzMqoG9xCzMVGhwLub6/MhcutDzIT6mZZDf2vmPpNcs/VBQ/G94eeWN5+Z8c3J1F/qXw5htf3+a551qLW6M3g/6EWnrVzo9BXJb9G7YROmWoQS2LEvnpSK+ZYtCuc4r5+ftjCsDlF/vr8C+OmsP/taG5q1cvdrn6K17Tr5mjm9se8NbRQ+/uZNZ++o3X7njqBq/AKrx0+4GtJnLz5h3PDOjyYwAAIABJREFUWaEp9P1HRz9/F+CBj33xsOdef+PKmQN48Scz5748XnQOR3p0+u2qPx9DrWuDfn++sCaBW3XGhrO4xnB1lap4Sm0uFVU97EH7naocfDbqeBsxGkFJ5oqi/noO4tChoIjv1MlkEW554FsuPVVIndoMkWxSqFso27VyQy4fl3MRc70uKDL8RgHLsoccMU3hZcN51VQUXFJ62KGZSG2poKrqYlTkO9FUXh8qcy+hC8U4tjK8o6QK1LF0oMIrddbDoDaKHzbCM7pF+CqZBcS+MwcS+5j+UdZ8M2Dfyb4Uu00LpMcVXrZjPs1A4S0QsmsTQ1YqiFtWVog+pkjlO0XoMCv3nJriAgWX781amV9EFsWhPWir0TwY5r1N8ahRm8RFzexqZ+61X/A2vzaOhWE/M/RYeZi7/ajjpuRP0oTfARVgySyAL7ku74uK+MXuA1N1MfgMTa9v645DJnjTZg3F6/eIUX+PS5cGK3Br8ck/GKvq/tsRIeBjWD9D/Jabm/MU6FD2w7Y2LR4W9WFKXV68/zz9E34Zfm465kOPXf/pN9bv/PkosnU7urVBc75d5bnnrp/hTGv5UnM9zZxbGm+NFN/3QXXq5pWLrx89//9d+PgXF6qD8g3iMNdaW73nhob85vbC8MYnx9588LvX2nvjw731V2avTVzYmRwb9LYOCo0ODQYHLjRWq7VXp6Mf5eqw6aXoZR1FUdV9i26iyVZRr1cZbwZ8wsGrVclaa1DPuCwOc1C/VBCdDKYitJ61pynrK5Gt4axdliVDdXpbpgqoU/FQZfcj8keYOYXecaqwjUytQpUce8YPpJxYTnM15FaofBvVD0m+CVBzpBtibzuKfWWO2F4mGCukQ6zRCl0l2U3ZKHqBe1bRDtcDp6GgW5gBQ28ci1D0R01Br1NHMbDp6mgQxpGvutkMKvNpCr3K/OqxSCUeC8O+fOm57vy5f9GioG1LvNvf6aSpQiwkpXw8BPb/qlRF/YiaHt32Bw85+YsgNkb7g421u7G4j4BifPimd+snbO9JbBufbqqX2bOZkvyIcDr0qtJ1RsxE5vDdXvcJ9x3NTfbSpcEy76U5Nq5cvB0Zev2O5/rWj7+xcueLm5J6BlyBa7zQhxffAti5zEbjPXx1Y/KZr09u/+hP3jzz3FdG9rr9od3Lf7yxywtbZ8+utq5e/Ub31LnPz+NisnJxrZ8FZ4anD9d7N39QaahVGlAaVcsq2g9qwNuU9c3W0FhWGwdbFcOHUVRjavVGyzreHlTliNQ36tSo6rbraqNSe9qwU1L3+8lotKoNDVojHqSizBq1rreD7VRMkOxbHqtd9xGv13UUrVAX9ztZRlHWxTTpKfAbNUUf6i2Idh055CJXCqLtmlLyNmZI9lC6vIk85pqD9GD3fkon3Unh2E27BlVCfTfdK9BsxiTYkmMw/bZGN7n7bW/HwrCzdDFyOQ7lYh8y4N1QThsYR3kTCg/odn7Bu9wrCPJTNIIZH6xx2BB8TZVevZclVke2q/ogfL1HfD7QDSL7pJ4VPkXwGFZYmpV53NKNSHYk+cyZr4zcc1GKE/6a8POiSV/N7R81Pe1H0YCD28+93bp588qfrNLI/wJHQ5eadsDbO9vlo39vqzXqzJmvDN9a/sbK1NmlKWe5v/nGt5bPnl0aWr769XWWlooHbuak0/3dsu2yr5Uc7cbYbnlIWY0zgCb9Pdipy6JoDY2s1IOe6p4Hg87hYewPrRedaqToD9dR1qcKVzvkUNTp0mIj60EUmcPtqLdcD2ugfrtotQ6jPzBkV0BCKcpN19VKkGTkXrbKA0Vb93IB7C8isxZqLUieM27x3r17rilCpEtVH2w+zD5v3M2VNhwPwz4/b19bK6LIhUz29a65E+A1WSPYp4uhuPe9wQsXWur7GRSdn9O19k6Ia1H07+kL48qVP+otPv78ZLtd/fnAflapzaYsW8NYFfhhfDR61yxk8DPXOeLh3TPAlbu6+BNO+NXzi8LVvu3c3qk5/q6jf/Fidf09bf93OdoiNs+5cGH7TnnXM899ZWSltbx6eze9+OzzVUZfPXrX2lUMBiNVWfbaLef+bmtksh4/KFZ3R+pyeKdfl0PF6G7EwdBw0RocqKtouWpl2dlc61Zjk9MFnmull6v9ftUaLwf3o1EHiChcN7MAErzPe+JunbQGkqnaDLG7eywK0o+HYX/xxbp4fKkHsRsizG0tawuYN4wHXla3fc+fNKd6M5NVxHO8F8q5jQ3f01Drys2Xv3nsWtv+sqy8/rVbi0/+wWNEvUz6UYJbRxdFH7glmE/8MMGrwnOSZovy3V3LCSec8MvyAc3227UFt1l5+ee2zr47OvgoH3FbFrUL7xYuxOKzzw9vvPy1nYcuvNC+PPTGrXPbC2tX7uORrbfJrEUhYYJG8jhphIR6IU9D9Iv0gEtfqd9N4txFjodhB6Rwkn1Llu/waK0a+bAWo8dmsX8F+rTPBbnwcw71gO+vvPzbh/C1X/eyfiVkqzpQl2h6lssp2zcRU4KHDJXgAFMi7abV7/Xj3ptLfsIJf33I207BbTnrvy7htbIzUleD6gByHdyBd7VWIq2RsE+b+sfHJWJxXKrMQ0WVIvoyM7zncAi5FAxkj3QHB/d8KL6I+mEagYMPsu2Mnx2XE+OjYPXyxZsuWwdRsEXju23IrIHeoundfxRYw3wmlI8Od4fv+e/3hBNOuP/YP6xrO/uCmaZb690ce0ei69Cxmmx3XAx7RpRJcupIVP/disNG1UIdhTZG56fv8ZDPC4WlJ/n5U/XecUfXf90r+lWz9uzUyoFaO5ZvyRpG3gE/QtPmN2HztHBPirfb7d37xqk54YQT7h+K1mEKdYw6R/LQtxH2BOmdUu1jY5+Oi2FXr19mCoMK/O4EaBlq4b5F2d2u7ulo/OKz20NuRlW24H0nBxYvxyDrufOfG787q/sV8eKL9cigKJSM2rwFOs17n31Xokgxhjy+df+MLz3hhBPuI8Z6rQHhffAOfl+bciMFLI9kqzo2HT3HxbA721VIuUlz079zR1sk1NTyzHsFHfckvUE1J2uGRpHrzt1pDboBOV50Ru/LXauDfcLLNFO4bk+zmgJ3wuzbjtYo976c7AknnHDfsT9KafSAUJs7N2WiJTmN+urFz0ux3hWOi2Gn3VVXzY6tDdyZrxgPeKDRSb63Ka0OykmadpX3+mJFD3IXa3J4p3/fqa85a+FYRrGDvYB023mZQXHKopSoXA2ORavICSeccMKdrA7t9iLpGhfcee+2ymYUc+wcJwG1Y2PYFYWV2qLR4r3TiG8djTq898O0rifcjE3c405xGrMVtVYVrquqd98ZN40Xe+F6ALl7NKP7PRld+yHMijPOLpZn7umIzAknnHB/cm57ITK8gdnjfYqhNqiFfLo/lMfGRh0bw16XLhO1IQver58+Y+vQ9vqVK2P3eKi2GA97H3xwx64VwZuEa5up7miUvPDC/TOeFliZ6fc6h71XnTzCh/XxDzGPE35tf3/12JyPJ5xwwgm3uXJlrMIKiUW9Xwpc4FaQqxzefSnZ2xyrG6lFF7TD+5WZWuDxCE+ztHrv7mZfeKGw68JoFiix7yy0GE/FCIDK1ui5l/bu+bTD+7h4sToYmmrJDIHmP3B0FDGKuH4vy+iecMIJ9zEXKEI6NKz5zlA8KjFboChaOsmxfxCVgx1IS0zzPg11HVoapHWVi0v3bGHZg9+91pZjXrAJ2qARcxoAGPqROaPQQg6YutJ523xYR/6eJsr+KRF98PsNu6kE24VbG3dpaSeccMIJv5jLLw7qrGo1k/DuDMVLwbxTRdY7d30O+22OjWF3NZCsga1+MxLvCLklM1SYKfjqPTsSsDfZKSy3QLuWBjSGu6Tx/raM+gHrEmPzzM/wwgvH5rv5KMiqfTODx3l3ct8RojLsD+riQ/rXJ5xwwgnHBSnSqMP7U4ky7oE1NLlwbFLFx8Z4dDTUlrDs1vt01E2IXDvKSd+zhr06LIuww/hWpCdoRkYKGNjUwDg1Y4E6dY+SF+/uej9qis5hKv05PixjvG3x43u9lfGEE064rzHoDE0R9+H7HrdGFFT9vY1jUxt1bAy7R7cOsRbRh4ajdNLKlO/pNjBnpWzqB/Ys1mlOkA2klGghTtXSiNEZBWPw4n0Vji9q5izNfuiAmQ3c++swSOKEE064dxE5OBpiNfa+h2EAcj0YPjb29PgsZKVtKw/Nh0RK+gSTkMemR/CXYWt2dx85aU6KkmZq0ptHKnslpgqYTGsQFPOnzn1+Fr563xj2ysWjwo9+6IC0l+byXVjSCSec8B533Gvu6Mp57rkWNKNfz55dGjp7dundlq75C0tjLC3dX4W+v4AIbYLamA/WevWw90f7+8dGL/54fSlNj/MHewGHZYZNcU+PMj3DmVZfB9t2vQ66IvPZo0upLzSN8lTK64Fu4aAqikcefPCP965de1/Y595kaan0cv20iJEPZlOMD6LFj+/Syk444b7j3Lkvd65c+aM+H7jYHnzws8PXrn33cPHZ50dXXv7a4dz5z42unW4dzlwbHik6hxlF2/29LOvhnWJi+7OHe2WnM7JLeXB2qcrtrVa/XXjQojzz5FLVzeF+FHV9Zrk/tf/M79TbP/r2fT+ZMSu1CfeRqvf/aVUk2e5Ndgqu3bXlvY9jY9hzcU7a3R22FB+499fAtpLFu7Oyj4aR7aoeMNhSUcynvYO0TVOEsWU8DArMZKKOMgMiD4Y6s3BcTpVfGs0uc07Wv/dz0iwWfG+yN7y5eleWdsIJv2aWlkouXqxodshudscvvi/NOHV2aeqB0fmDy0NvmPFxHz2fs2eXhq5evdhffPb54cNanbIXVVn3h7sj5WBie+ew3xqZALgyeWvjzJNLs4rC3fRQOVRuOeuxqtvPU+c+PzboVu35J5aeqKtcX7gWC9AjaureYWbR9pB6vYPeZKfd7sVoXy7bpaqqaB0W9Do5KPu1yuFWDFT3XWZNtgad4IUXdnjxxXs6XfqvI8nVQAKPvP+IFyTlKrdOduwfZHl8t7+wo8rig0NQSmBSUW/djXV9VFy5MlbNnesJ5S2Zp44ePgQSNADPBlxLckIFw4mKjFg/d+7Lneb192YOevHZ50fqg+oJwud/zuGBzJ8e7S5OOOFYcuHCC+3b88cbvhpnnrs0NLJd1Z3OmN879tW4PXZ54sKXZnYu//HG/IWlU9Vh2S5aqob29zavXbx4OHHhSzOKfc8fjh9sxvqcis8nQJEaohraH6jorg02H5zvjof3Wgd5bunhInN9Y7izvvDoFyfp5mjLdIq62qgKZoerw8OD4ZHninJwlR7MbI+3umiyhQ7xoKN+tgT0Op0su1UbskyyV4g5wklqsa7K1bLT36sH5dloxZoGruugI5ymqIMcHag1GuRGunos7Q0ykhKrGtRnf7Dauvq+/u77jyg1IJnmA5EQQWV7hMtP1xyTrOKxMeznrg0Xm0W3kn/umsIRx2Zyzi/F0qqK5XKrMlOhvIY1Z/njmF3wHLCcYgTitO220I0y650demW7e7h8t5f/SyCWlorqej6s8Bd4b/DLnU/Zk/UD7uFuhxPuTSYufGlmuHBv5eWv7c997AvP4f5rMDKucpBFr65vXvmTdSAXn31+9PrOamvu/Oc6zvbTCraIb+zkftHZK2G3qFcXn32+NTgoijbf6PRZejxKhjQYDM+d/8IbDDwfRX+duhw+GBqZmjv3hXl6PakV17fK7gSpm6qKRTuihgdS9etRDoZroKDczBwsRKlBZjzS7vefrAquFtLTWecrtOKRCNfpeLpQfbN2ay467jHg0SjpVM59iIkKtpwx3cI3s2RQquzZ9YQdken9lFxGPUIWIwrXqrWY4UPX0cIad5FbYTqBWyEmqjo3i4hmmJVjzEXRPXQxQVM3dJ+jvQ+lE8UgpE2eeyO4dDycm2Nj2K9cGatmz/d2wR8sTAjhQkTnrizsI2SldePaXG/hIRfRsqlDrGPmLBLYk1kwKaNlud6LiDaFRgejrVMz5768vnHlj3bu9mf4N2ZpqZi7ye9IOWx4FjP0gRr/Q/BLlat7PdVwwq+QmXOfmTjdebi7OVidWH7t4trtxxfP/+6jxdj+yvKlSwfw1Zg59ycfU3h7OjtrV678UY8XXiimL22Ola18fnVs+/+e3536rTpzI0qGotIWVTU66NUb848vnaaq00X7TFa9A5ftEtNeOP+FJ115pT6oJsohydkpInMd6cmsyvUqYkQxuOZ+/1NQLEfRn7DUC2vTGROZVa8sy5mk7obKjwsvF4rBoMq+Qotk7NkKhU/heCzwsu1NUYw6A6VP1apPEcUBVaaIYYCy9INO75cRM3ZOBBpUdewAI4XyQdVsOzTi9LLNtKRR2bPGV7P2jCJGanuN9CikkZ8WWq2TcUkz2BuIQzLOFbgmHEDZZM10WCeLIVpJnpW1QaFd2XN1+/DYtHr9qiio+7WKaazifcY9matDAy49lnDp7i3wDo6NYYcLdn6zkAp/aANnZZ33+EjPixcreKHw+fUinIcSh7b6SFeQHzJUMl1JPdsSMZ8gZ55SERtZHW7eGeo75mhyvRp3tg/AvwlMoveN4h0gXrH5SZT3dorl5zFz7ssTRecwXemBItxaeWXpJzPnLp7ZuHLx2uLjzy+svP61W2fPLg31Z8dj+dI/ObjzdRtXPrN3j3zH/0bMP7H0yYX2/E8uX36xf+a5r4wAVLt7T9x67Zt/AfDghS/NdKveYzB4de3V7+zOfWxpCQC3Xmt70B+gT6/UqweDTvUXs0/87lOoHBf+XG32tT3yfy2c/+K51L9sYR5QanYzetX8k1+8mn+xuhql/o7RxtzOxPOp+izooq3JusinImNaoZ+A2nXqbdlPFVE+lP36+xQxg5xu0VLmI5mxU4TDKh62PaUiD5Q5bMcDACS/SepGXcYYMkE9lIXm0h4TrCXZCfOgqa2ibAfu2fl7IW86feDUvsUUEU9EZoLHKeI1m2nSEw69LvscyHVqRWJUpidwWkMKH8iskxp1pKL2dobOB4xayI5N4U8IKpJdRY4D44SWSToo2hYlrvcIRkCF0iOEbiQxR7JIqMLeD3naihnINVmz1MzaXM26nAFu3I1z7NfFIIqMyh/WUxGDAvfgxWNz3R6ndirNnv/9Lwj+J+wn7njcwDft4j9d/9nXX7lbi/uI0ML5Lz6D8nTWfhTpt20WJIaFe0YHjZAR3wHPK3g1zVsKtpzeV1Fvr40crHHp0uBuf5BfxPRjfzBZtKvfoAKHnhf8PWDqjqccynxL1n9/a3L7m8f98/xlmX3iC5+R+LsR+uM6XStck/q3jP6RlE84yz8Pqk6qOFtkHhIeJnRoa6Ku87tRaFSlt1UVC3XmOSnakKcz/WKraLeo2B+o31YUfwO83C5YKaK1m9RjQbF30PXo6aHJlZVqudMvx1o7l/94C+DMc18Zao/vZrXaGclBL+qh9mHdGzw4NuyVw2y36ebYIFtrjBxOlAfRkcvdqqhaxUCVR2qp1ico44d1L88q2JL5z1L6PwPPCa47VVDwCdJPpOL7UqYKf59+nEH8tiP/VVD0nPkfRfp/q0PPg0IZ/4/LahIgGvXJv53yv5L1G+DlRhjEpwU9m5LIF+1iSnheYstJqaCymZK0maYK/JRRG3sfNRresjccdEidwfwLlGcUrBs9pdSW5ZbwdRwLJh9L9O2QW8B5zJSIN6xclagwpxCHdjwEXAftyvWQUR+xaHlVjnOGNZRbOCRl2npajfriLjAuWE28A7LQgmANM2X5FuiMcS/kA6xFS28784GI6JmcVMbbYFmUhi7SmWhSmdcQU6R3UlSCOcNaiNLWgXFbPtIFUaTk+mhHblI2zCq8YTfXrNEqkqEmYDYdGygtaAKMYdlcWn/t4k9//Vfbr4/5c3/wG476vwW++IFDl0j/F2tXlr51XJzyY7Rjh3D2mz72D/kbfRX3tkDNEa5qKgVVmLUMv3XUOjF3pEZT2d4yPCXopTVQMiKyVxf0om7FRHduvH3+c4O1V79zHPv6xdJSUV6vHs1kStJIwHm/Ty9BfcifOnQ1VN2434z6uXNf7myp/6jIXprHAv6QjCfA/7vk/xr0j6X6fwFdCvxkBm8jnVPSMfwsQv8A844HetnKvxNo2cqWzNkI/ee1qx9Q8nSB+rZHsMtB0h7U/QEwg1JF4cNbgzVDu92u+iNzT35BQNHf3c/+biD6faMevcEWZm7vgNdg0AEcUU/SjRsZvgqD3xbsZsk/Y6AXDJUG+VOFf4R5DvRKmP8BGEv45wresVkTWpLzcZkpp/6uwpXt75L6e5b/mcXTdejvg27hvOTwf6fUK0azKT+BvBvoz41Pgx4AvwJMGJ5FvI7jv5H9NcSizQXkHTtq4Q2b/pEhe1PwRoZqyBB6Ftgk2UA20nMQ2P6i0IrlR8DvpPTbYAV6INAzSFuQ26AHjD8L+hlm2rBG6sCRh7LGhJ9xqI11E7wd1h8ar8vsI30W+4egc4J9pGHsLZqOl2cD7cPtaY/ZcWjaMC+8FtYZ0jeNNmxPIBUmJ0ml5Zbk2tYskoP8/9l7t1i50jM973m/tapqn88Hkk02j83uFtWtkTijGY1GEtWtkSzYGjuJiSRGDghixAESBEgunCDIhXIZBPBFYsQwEMO+SGIgigNMZmKNZc2IGkmW5ZmWNC21Wn1Qk80zuc/n2lVrfW8u1mY3u5syPM6ouZuznxuyqvau/ddaq9b3///3fe+7YGtaTeX2nqiXsLQgPJNmKZzziBJpHdjCGSlN3rvnClto0fYUyGAJZgDbWs49f4u38Riwodg/Bii/KESuuzlQTQnE24xQaGy/BHXYX4HddRZ1RL6rlQAhBsKPgB874NQNQBkxJvsaokPGmsIfsmmB+pL7mE6YCRcM46iKPpOJsp3bWVCMnzhxoX/lyqUevEcs4SFxsThypNvpX9s4kkWcDPw00hPGR4F7X/od8BpoSfjl3W5ce5gj/kWwys5fRfq7NsPYGPrgFuIU5g7ofwRPCX7J7Gk2vJ18+hAwJnjc8DwGy8d5R3LKj7392G81Tb39sjG8/R16x6Zh027oRvVwADPePK+PvvNT+CjwK289lJ+67+2Pg76w9z6fve8P/Cf2W6MCeGbv302bEdBvAPO2nwVO07g2/pTQf4QpDc+BXweuY+aM/2dgQPiK4a8342hWyoJDFiWNmNUgxGXwdsKHA0aBf2z0pOUhmU8BbwruWnzC8HuCTwMB/obFLeHnMHeMtsM8ZngcvGLza4I1o6PAC4FPuMl1vwL5a0A/rGtu5JDHBcPIMzZX947xEcktrBXEhxOMaIV923AUuGXoASUiDUuyZmX6su+iOGT5Kg4jDkk2GXcMrWie9N4VIDmX08wg3wbNCi0ihvf8wwEthJgx3DWaCjxg2EKRYRcpZ6AFQnYyvXdVqjmfWmxOqgNiQ3aNkK0ipNKZI0Q8oDj20aJWtEXVAr27nqDO2ncfyqB+DvtGeQ6gLDL4eYGq9gdaoOYe7ZGoStSVPYjZlJWWtxNuYHrgQISkFcsz2IOGo5S5ocKHcHs0qyi6ZT068+Qnh9kn6ZQTJxZa3cG1aQoOyTmHLctTNMGqoKmYXQfWBC+n9eOZcvCDL75zH/PPfn5Yod/E3D85bQwjzDBwCjzVPHzQRNVjP/+1Dyz35Dfv6VA8xdsmGk/RbB3fmx2cwVyguWbmQaOGjwDLwMLez55rflRDwK8C4+C/CHxJMGw8Yfgt4V/C97ZMddzwpWY7nb8CDIA7wG/J/JKb9x0JdMFwBihTWg8xDj4p+JnEM6BXwaPGk6A2YtiogxVprdgM2OpgTgMIWiYGDD03C5S1MGGYA7AdoJtNwLSEd9WsiG8izSe27Mebz5CbhkWwJCZNNO2vVoR8R44eAdHscMh4lvRbrcO2w+ldpGgmBSxJro1nUtQyS2A5PaPwntOibLQj+1Ao2xAZyimhaYMk16S3iRBZD7PP4smfNYo6QYMPeCkk7avOnn12ImID6z1FcnpEVusAd1782pZcblj5GmHd6wKQGUYKRCWzBj5iOQwnwSN2cTSSKpyzKEd7lHMwNHrk7IXpo0c/8aCL7f1AR46cH5o/+7lTG219siji101xFDSG9DHMR7hncSh2MDfANxE/BN/4oPbm/zy63m4bfRvxg4c9lg8YP2dy+pag0TLwlt2vRYCfBl4FjgObNKZKA4IhcMdwiCaA3tstWgB6oBlgEjEiuLP3M4k1ZbLaG0y3Ccr0QDugE3t/98N6WzBKQBflPPJZRZ6S6Ep0EV3DjlEPvI5UA8jMgm8JSsGCpDnBtNFlzE2sotnKB6AIuAW6ZVFa7ITVHI/UXeREPoKUOA47fEyptk1luCNrUVKGPYktiWmFOsqc3hv8O3wbJCWmUrC093hFYjWsHTUr9gql07GcYhVAGVMu6ZKsYW1w/vwjXRlf94udB6zWQQzt1WLsG/bTVnyD/J5cjUW7Jh+ZINAd2u63+p21rLkb+DCRBajCvonZspjDVGGNGzqYJ0J1Whoy3FYoWoVX+v1qsiqKog2vwcWi6aN8/3LWs+cuDNfd9lBSPxZZLDvylKhPIR3e256coAns1zDbiNewVhGb5UD7kduGb/U7s6Lu2DqC+GZz02YMY9Ak+BtIH5U9b+gg3pSpDafuvYeg+wFbsb/LrEjL4BGgLfiTvevg4zRB9D71SH2LZuX8K4gVTB9pBLgBvrG3cgdYBaaAv7W3tSzMU8AhpD+Q3TYsgYeFvm44wds7RN+xeTwC2Yxj7iDPA6OYWxYT2DuNCmTuNAVsXDY8iTUJuYl01XZP8AywZnPc4kcyrxg6agrcbovoYqfxbDM5V0FjXFWTPmJxNeBISvMylWhapmyvRJPYPkKmibiBdTjlCjgEvqlUbVEY9wgOucm9TyVa2MuZ31LKxm1Bv9kx0q7xgrWE60ulAAAgAElEQVS3iW6WkKeBBWwcEWHmhRYE80nOIllJk2MnpyEQLBmmJfqY1VBOJMUSFDjqZdUxbbzkQsWJpdHiynty8I8OimpPTOxdmCLxvopP+yqwV3XWEe+Yva8CE5ii5fYjo07W6rlCoHANfjWIaTtfFZo1GNNGLDtVI28Cg2SkxU7ggUTTsoYgrtmMb7WHZ6dO3/HY0ujClQsXzKVLNb8g0Zcj5780pK3twV6/nowqa6t6wknH4Y+EssAaQxzGHAc6NF/0DdCrOG8ZfYuovnvnxW88EqmV+xnp1le3WnwHcRXTlBG/JdqRfwA6DHzPMIn8Qzm+YHlZ5q5hFvx3QFPAxyUN254EbgAfFmw3K1V+D/MXaVarR5EGsEvB7t4q9TIwLtQyTDSrXiW4RZPm6untnbpNUN1IGnNDezct423BKYurpG8iDQJP7v3Np4GfSKTxLtYO8Ms011tb4v+2+STiqzZP0kxS/xbiAmYJsSD07WZLm48I/V+YJ1P8Hdn/jqQW5ifA1yw+34yHN2RGsW6CDwM/lf01w19xc3zWQL/dzDB0JO0ViQ3DYgRTNon4NvhDmL+P4rDMkvGnsC43UxOVWLcs/4rgj4xPy/FtDA5/RtaVxBuSeoJN5MNq0kpdiDGaCvLLoLbMzxKQOWmoJL0e+KRNoabR+Sk3KZlNxIhhXqbKiBXZh43vhtVPMS/UBndlzQu3nLradLC5DGuvwK3JXlrRtTiEHdiVLCzfEZ6FEJm3RcxCGnMXsJSZGWsSOxZTDkR6RqGldNZyhOW7dhistKuwy4ysbBUUXqKWA89sDe+vePJnTdGhckXx3jur9tVqHfZZYFe4Fmrfd9zutUg5B3r7LG3wr8/iK9/ZeOyp59vbke2iZs5WF4VSeU1oGuO9yttu4F5G7GCmwzmWYgCxmemloN6FGCxb9YeqKq5vl9GevBp9n7iwvjo8u00jdfnu8qo/NWfOfLGzyebYQFVsrK+uTaPWaLZjq209lcEx8FhY/UTzAYdsjiKOYTrAXcxdi++FYtPKoV4M7avZ7Z8VV65c6k6deb5XRP5dw6JSqym6wv8xwT+MStey4Etq+XfpMYKr/wOV/4EL/sDJ9yF+BedPFf6WxYLhaBC7qv1aXXC8rMof50BvrNXnv6vaRZFVHi3JpbpkMbrtoZ5zd6DoHWkN5O3NndE6q51Y/ZXZDb5yznsVu+LixZh58eZQ0RnOjrfbXben6q53i+AELf+w3h2Msug+gxjJpBIaKMxioqdR2kXnay367ar237Tzb9ux0W5rvK70WUsvUWtVUbdk/lHtoue0isj/GvMj8B9ZvKQ6WohDwO8hHzb+RxK3cXzD5O8ifREYRP7vSZ1tVsV0hU9ivknBDaf+ms1/HmLacNT4rtAXE7+M/KqIpyHfsKOHeQV40tIfotwKZ8eKacRlS1cCFut0Sv6M0MuYJZFbGapk11h/jPhZpIcttYyfEbpl3JL8plJrhMfcBNrft/OYxBpmKKR2ws+Qhg0vqumAuRLytlMLBL+E2TJek7lls6agZxOyVjA7hOewb6RiW2ZYkSuGecNdSztCJ5HvRFP5fh1p2NJGkD0lh1IsIlJ7O/m2FnAGEm6W7ltNCYCXEk0rtNjMFSzLk7yV29dUUzfvXpMpsHGKsKzYrLa8r+LJL4gHpI1cgvZVl9K+KLy6x9SZ5z8Ukd/hnT3PGP+o7vHp1SuXHhkxk6kzXxwrvDNHwSFbj0ueMjFjPIV0WLhHYsK3ZA0CN5svlGYtVoUvQ4zgLILijVpeA7Dr8QHpBwDdZMBZbhwZnNx5aXYh2djQW1v1b5tRPJAzZ77YWW1tTi2+/Pydiaf/8Fgnq6jVajm95cxjZanxOj0o6Rml04pJ4ZNuxGg+0RQCsgOs2PxzoZcVvppmaTIHvv2o5dffwYUL5aHrg5NV0eouvvL/bMyeu3AI2IyqPduvqIq2BxZe/qev3S849E498g+MENFbzDz5ydHFV76zcejMp2Zvv/6td3j6zH34+fm7P/79O+/5nac+e75wvey6jFR+DsXhrMu/F63eaYCBovNiv9oZrynadVnsdOoqdrartXKgnO9FsdCu84zQKSkTtOFCt6nzs1JcNXkZybJO1bV/IjFis1lIz0URl6q6fkLSsxH6J0ndcTIRoptWP6wPKfx9W2NG48JrmHkXeSWqaNeRTwTxRiqnJa4r9QmbFx3aifSHbb9I6KPCN43GSW+piObcpg+nfDVUdO182vJCmL7NFqEgdQQYaVr8rEAdh55O548lhsk4DGD5blPwpqflvJJSIg0LBsJeNjxm3GvSFyEibwl10pqTcwVpWNI1nJGoIzcCYAr1IU3GKJEbzmjJ2ScYxhFEjiUsNUNzhmPCyhVSq235e/erAz5qTJ763HhR1t+j2b26n8W68GdXXr60b1wqPxCBHXilGvKvrf7w0QnsR85/aWhnZadVtOsz2IrU8Vp6QvYQMCMxZKgEd0GB2EyYUXqdoE/SVXiZpEYxgrydzh8pNJyVFqQ6Q62ZXmf3x8XOaN1ms9NjZDdam8O7bvcGinp34aVLm6NPPT/dUa+9OLS9eOQWrZtnR3vjS9Voe7ucVhYbFB6pVbXtlhR5OMi2HEMOCsMv77VMTRpuC50Ef4i3KqH9ptAfGd+V4mri5aLWj+++/gc/e4iH/oAPILPnLowsvHRpr3WLve6ZL8fcyW/N5kAvXBe/qqL+3uLL37rFhQvlzO3iVH97d2GgNdSqW/VEVtlyFtfbis7OgKpjjG3erZb+cl37J4Xcspmg0C3bghiTiuuq+kMuVQTM1PZsEcUduX87szymQn3XbqV8okh9h1JzdZ2pggpbqaJVAlX19txZEU8ofTWkaUvbTm+r0Fxd67qKvS4ZaZjaI5S+6VShyCGqGG32VnMjq2gXhSfSHnTGLYCy8JZtOSidcSxE16kdKdPhbdWckONmXXgwUNvKBSfHgTVJ6WYZviVzmtAtuykQkxlQeNCwKNx2Fl0pEzHiVCF5DTxqUUaqSxXfvnv5vRO4R4WpM786FjH0L3hPYNc64ecWf/qN/aEnyz4L7DNPPX+WzBd4u0UGAMHlGGg9c+fFrz1SedmZJz852nar0wsdV3oQeCxFC+IpwbTtfjR9wJXkFmjD8iRWIVg0lJJvQKyncwhrA3ldqb4o1imq0ySvh8r1OutjUcSKq3o7ijJ7Larxreru1mAec78ctWJHoTWUI7HLWrZzQql5Fxn3Vj1FFC3I30hk4WXEGdJPIb0OfkrSMZugaYDdSOt6yFuJ/zjwn7Sj/InXh3Zu3vydD7ahzwH7n70dqft3QvZ8ynfHzn1iav2l7y6zl6aaPvvcY0uv/sENAM5dbE/tbg4AtFwPMMxW1j1VO+VUu6TMVnV3fHewv+F63IO1su5F9ke2orU5XLroAFSqd4u6M1iHy7LqrfQo59qlt3rVniy2U6HilEM7b08gmAiKXi+81uplyyUTvLuFymwG0UllKyu6ZcEExIbTE7UZoNQGVa63yiL6VTUcRTEYsGT8JNZtXG9k6LhqVqNUv6oykUcl2VlslUVGjTrh7DXDjEnECNG0Gu8p95V76oBjjtxRuk4Vrchc3m13rq6/9E+W35fz+xCYPXdhxFV8/13KqACbdvHx/aSMuq8C+/yTnz6ZLl52U3R1P2+M9HzuypVLj5Z70IUL5fytPFar1cI8ZnIM8xhwtCnKYRwzSEik1406kkewNyRNGvexlpHvYs1ZvBnSQlr9yLp0yaKyqJ0ZRVkv18R01JpO63JRRj+LaiF7Om5rvCyaNpvadAqxizySyTnhGzID6b1q0MizwFOgm3tV308ivY79MZkhix9hhmmEOb5BaC7kr5fpF7o52PtAGdkccMA7eZfORpMyeWvycP58a2ptbnD59a+uHzrzqdmyW21en+9VvPBCf+zcF6ai3h1Tr1wpB6t64aUL27PnLg0Vu/VgRGGAXaKTVRTtkVjKujda7w5uR1GNRF0PyuVGUfSyVo6Waq3vwnTssla36kknE6CNso7FvceboPE9MajxsoiiqutlBSMF6lRJVdi7VZuBIhnIWjtFq+xlXU8WeLdKzUfhN+0cKxTtOqkUrIY0LeW6s4hUtpwRgWeSejEL7bBbXlt54+trD+nc/MI5c+aLnbXo/nSv8+J+uqr9zMLPLr3+MMb1IPZVYJ86c+FohC7z3qK+G4uj6ycfNflRaC6WDdfjLutDmfXjUtSpfBZiVHat5iLaSBgJ2DJMYo84YlfpyxLzaa2EKCxewjksxxLhbaMjIjfcyHA+lTVvKDKVMRiFl1NuOVWAjwZ+A2neyXQ6LkseEeo0W28admoKeR3raeQngFcFU4ZzwitG44htw2WZ47K+kfJVwbTFG0uvfOO3H/KhPuCA/YQ4f77khRcqwPPPfn54cL1X93qjEbFogOvXv7tzr3Zh/tnPD/c2s1x54+tre7sROXfy+VmNFpva3hnKuh1R9DLrdgBE0ctuVfSHpkd7ubY6DFC1KEsXHap6yx5UVeweL+vOm0XRy40o3E4PSIWDnCld3+y3KKPbS+eg+lKnaHugcL8PkNEp6fXtVhHq15lF7LzlrPeocuFCOXNTl2lUA++nqsJPrP700pWHMKoHsq8C+/TZ5x4TXL1PmOIedxdf/czhD1pB0b8q889+fri/3ZuU9FjILRNPg0cwk4gTMpXFEGYesUVjIrFIoynasb0ssebGQe0GZhPpiOwlJJO+K9RxZA9rWHKt1AoFW5l63DAd8htOPa7wVSclwS/tCWGsC5+0tWx4SlJKfnzPICKAib20wDYmCP0U522jy4XZykZN6/rCa5d++DCP8QEH/PngYgFfeaevxvnzLV54oZp/9vND99KZTVriV/vw5Zw89bnxHO7G5Ea502szklkrovB2j2qmHNy5U/ZGBoq6BWxWO2UxntXuZqc11SujO7S7XVRFdhdHut1HceH1Tr4cM2f/8Br4yLteyILiiTuvfv2NhzKsB7CvAvv86c/P1UX/Nu8d153FV79xmF9Qb/ZDRpy72BpjfWSg3ztmYqzJYzMSaCxNLfIUTa/KUzTWiINAF3tZqI28jTSccIPETZD3VtPrzqblpnWmOX6jsmvDIo6bCj9j1EY57KQbxBt7BTG/DCyCUo2m+WHLrcYunrPAG8Cv08iD3gB2QOuIl2Qn4gXjF1VyvdWnepSrZQ844NHhXROD8+dbvPClGr6cR49+YvD69e/uwN7E4OhO/S/rrHkE0czZz14H3h3YTVE9tvjyt/aNbe2+6jusiqqlB082/n/3Yu8vLhZcWBCXLtWcP19OrqwMKnzIaipbsRaDHANEiL0V+1SjYMYYjUzmLooh4zZoBdMSVIhbQj2g3WiPh8MsW8yT7BL07dgFRh0cRz5m601lbEo+nPKnwpYdyxJJo719ErRt2FVwEjNJYxIySqPylYhVbGFuJcwJ74bVr/sqMvuPgjPfAQf8OeBdq/0XXug3mjpNauDe06+//tVd9k1G+X3DPFiGXdkv9pWc7gdF9OUR2YK/WACMnVsfH71djE+e+tyxye7k4XarNyXlqArNKxtv5EROeUXpGYuSxEABrhFr0AjD0Ex62sCiRIkZMJ7CTJvYm7hpDNOSGhU0ySet3JEoSS0EPupoCnAEvbRSkR3waLPtpFGTx2UGsc7QSIOOs2ddaNTf054ugHHka8o4meZogWd2O53BuZPPz48+9fw0BxxwwAEfXB64y62IfbXw3FeBXUX/5wXwfXXQ/rW4eLEYf+bW2PjjvzE50t+NodR4qapNtxqrM84F3k17BnnEUiGzEtYksKdTQQm6Ahreq5zfhXuWjF4STDdWyswL+ojlPZ2pLZz3VJFGZGYNd1Ak9uRedX1H6SnEPEaSU2YeKBrJSoekPvAxcHvvvd6aoQo7kxtA3Qhk6FjKyxGsVplDRV2dynZODPTryV/8gT7ggAMOeH/5l8Suh8K+2opXFPaDN2331QTkT825i+3x790abnfK4+2h4lqVGutnNVcUlO0o19L1kIlJU0vNKnlMYiIVVSPJrVWkW+CPgn+2pzl+zyRiQ4oJwJmkRLFnHNMBsLwNmlfjbiWkbZp+lRK0SNDHFI2yVE5aKiBuyjmNGWjcoywad61dYIXmfPSav0+LRiP8OPiWTTjUC+gmekZFjNm+meFFSeXUmec/FK3eyuLLz98ZO/fdiUe57/WAAw545HhghNJey+J+YV8FzOi2f96sZ18V+f2puHixmNxZGYxyYLS2+rvOGas+rOBQwkBm9SEltexzAmPNR0YrFVdlVi0tS1TgtFkEWeIuMIr8A9CG7TDuKViUSBuhPYlIxyxiBcDWLPYho2njWbCwDyMdxkztmTdeD/OYYQmxhZ00crV3aQxd1oDriAXgJvDm3uPboOughbB2bCactIR6WFHU8YlCeq7VqkNV64mpM5eOlLur1UO0nD3ggAMO+NPywFiU/dhXOfZ9tWL3YC1677aBBJrV6QeogO7LMf/sPxtsLW9k//tro331Oq0W41WWgyiHsPoo1gOOp3NI8oCsZaHjKWUYIpmGvCKxYnMCxZrko5g3gXnw3cZRyksQteyrFhM2qxIVZju1JwUJM0BNeLlxhssVR9x15pFAJrmLlMBjyPN7wjcVokB0QSVoC7gFPgS8hl0jHVMyneJlWSexN9300w+QelzKa1gfR7qF88cZGqTW446cDBHB0HR32G/OPP2FG4sv/5N9U1F6wAEHHPAAxIMDu4u+9lV3wL4K7HXPpZqc7rsPXsKXBV/e/4H9woWS2Ze8+0e9VjU0OFxkNVAkURPToRxIR89wREmZwUDjZucuMG28JtRzYwnZT6IGeiJfMUxgvYYcamxQh2TCYt32ltEc9nqIHexbGVSgUUwBuoWphNvgWmiWdEHjnnFDYtZiW/iqYVeNit2iTCUxY3kL+1dBRryKNSbcB7oW/0yii/O2xCGhFds18hjWacJXlZxFMS17h+aamyQ1l2hD+E7W/WOHnrrQKTd379xfeXvAAQccsH/4stA3H7C8lKumz3/fsK+24hsemGWvOf87+2qr44GcP98CmP3JwmzRjuHImMtSBWXMUzPi5HiQJ0lGHFnsOSoJNObIItC4lVOYHcsroZzCGSJmIG8J7wIbboroXjL8zPIPJF2TeFO4Z7lwKETsKvMa9qtSTlu5g3xnT29+p/FfViExKVhQsgqgVMq8tFd5j8nXMZuYlwRXMJvC3030U1t90BBm3FbYKlIcaiw21SMkOT7iYEDyoKBjOI5VGHaNe86YFDy7K0a2B4ZOzn34+Xlo+mQf0lk84IADDngv53+nYM8F7504y7rYV+I8+2rFrtAw6ZqmIOt+WmfW5mJft01euFAefX23zA2G+zUjUeShmqzKKmazKPqSB207TZ9gOBKbDAVrtjoQtjP39isKCNksQ46B1/dWy1vgN4EO4mOSrjduVL4JjKAYg1xVk/t2BqfCXHHqByHXZMwp8lo6ehYjge84NZXKhYimyj2DDpkLYaXRh4Bxy6XQls0C0oihHc4ty38MMYoYEbqGPQMo4LFElj2Y5rpgCNi1KEhqgo+GtWuYcXgnYLOsYpDIkayrfzDz5G8e6ZbZpSnWO+CAAw546By90y67Qw+8J9VV9NsPeP6hsa8COwDa69h+J/Vqsd5mH9/oxxZ2x3qtoRbpEZUaqp2dgCKLuk/GYYv5xh9ZE5HuWhq0KIUWEJbpW5qVvSIpybQVNO1mIGnKsNCI1HhUGS8hj4bZQV6ztQnckqKyc9xiQeJ7aX1IsGqzpcjXMjVUFN6y1VWttVr1tVAMmtzIumgF3qXQOPYqYj1dXJZz3dLZiGyTsQiIYAPHpGFaTUFdgViT/RLopOAxxPaeqI7SGhI+htSTWTQ+RdMet55iNcxmolVX7Q+Xrt/o2wMTJy7k6pVHx6r3gAMO+ODSHY7ygSt2URfEvtph3FeBPSvKiAe2E+xjm8+LxcyTN4eq7IzWLc+DR4NsFSHX0lky7kiMGAbCDKXoW55E2g685NS0xKqUwza2FNgEMWXpStgTTeU7S8C4cE/SNeQRYCut1ZC3EW2E61rdsoi1FIuRUdXOFxwaFmGJLvKys+5I5S0KKPcugaxVSm5FxE5V17sQY1Hk913U3bJWYWnB0o7lUqkhu7hdRG6kVQgtYR9OqSvYcOP2tgscUtNONyU5bF+TOJb2oZBkGJCYxvqo5d8NNGvqIRc6ZuetVlneBn7IB6Zo8oADDnhUyXpMEd33poRNjXNfdW7tq8DeKvtFncWDAnvRK3NfFScAcO5i++ja9WK37AxHt8qI6BG0MjWEOCRcIWaMpgIrxaqsHqIjWDKabmKWcdKVYlt41rBoOTDClqWuTEV40C66quvShRYzaZWFbtseS8UCdTUSUVZWcb1yvx+1hoHNFtXdDEqyNVgWmXZZKLVZF7s791oMc9Az9KLriH7Z4w6AWznWymIuVV62+7uShguo6qBTkD0ct2zPoWxbrAV6DWnE6RuEFwQziT6C9ZLkI5KGgY2QRowXEbZ1FryB+ZLDYB0j9XWC81L98uS5zy15q1o/WLkfcMABD5Oqk2W7kvE71xmCHtpfynP7KrDXVdki/KBe9t5IvxP7ycj7xIkLA1sslLsDw0+ocl1ETNgZyjgUoCQFjDZOa6ynZOwQnrEdNlOIFYem5BDyXoS3UNhiQTCN4qac20QM2b5WRO4YtuzchXKiqhkuktcV/VZZsGnySA/3yiqm+4O9yyP9TjitmrpVqO67196ui2qllb1ev+OqPVT3tV0M57ZvDA56PFtarLMbi698ZwO4M/7MbyxObnhnLcqtKHOkV1BGPw9nq74bRTtjJ7+rlk6nWLRTTg3auRxZjGX4SqCbJo+D6ib1wLM2LwJje/K0LSCRx7HGEbWdHxEaT9QtduvFOsrLwBrnLrZ46Su9h3jaDzjggD+nDGxXrSx5YMNbtBl43wf0L2FfBXYp0+gBeXRpF+2rHEZV7aqoOzNZuK4zB1U4ZM1leh3prJrPYUuTgZX2GoQMC4jDxmU4avAqznFgQ2HvLeDHw+xCrqK4Y8XxEC+qjpEqdR0giqylXFfluiZ32/ZaZOGeyiW3dnYW58sbk1cHhm+88fWVe2Oef/bzw3d++rWtI0e+NHTz5u9sN9aNX92FizsAq3zlPavitR99e2Wt+W/3xIkLu1euXOoCb547d7G9293UxnC9yRbrI3Vvfb3IWdTajsJDdeSP1Peoi5gVsWjlvOBfyJpIU0aohakMPcQ26BSmBYyCTgEDBCNKdYpWtTV39rOTWS+Wi/ccKQ444IAD3kcUhVH/Pe24Zv9txe+rwcw9+fyz6fwq77XF+16m/+ry65euP4xxvZsjZy/M1JRjDs+7rndUaL5O5jGbgcdSOow0LHtZMJByjUOQG7KGJFpGC9gTiGYla1Zp8utDe+5sP0s8W4ifJUwHLCUsQrkB1aj6dfY7Za/Mor+r3C17qlYer7bY2ND76Ys88+QnR/dW95o4cWF8eKAouukBpycKe5dgJNEpglrmVJirKU2BR4SeNR5GzGKNA8eRe5hNYAm0AL6F/E3BUlr9jPrueDde25tgHHDAAQe8L0yd/vSxoij/X+Nn3vXS5VD8lbuv/P6LD2VgD2BfrdidnkAPLJSqsrUvJPvi6NFPdLpF3aphqEj6RDEpkkbfXdMJPaEO9hJ4PGFBUFsoUq1mQU7ZiPDIcg6CdiTXoD7ozcSzSrZd5mt1aqWMXBexkVZHZX+9t1HtRDmQQ3XVYnNte/HmC01x4Rvv/wHZC+oAXr1yaXUV4NzF9tTu5katnbF+UawM1DV1rb4V21B3JK2S7huuIZ3E7oIT2MZ6BjyAGMGMCWac1A5tiPh+md5dyarxoz/ggAMOeL9otlQf1JlVJvVBu9vPw4072YNu2N1OvQ8C+/nzxeZSp9PazREFIyr0eJK7WftQhLaNx0S0Gkc1jbvJH1tmysoaYtuiCHvVAuEexJKhsrUZZLtOVoCVoiwUji236tX+bmsqq3p1phzY2ejU5drVSyvQuLHsS176Sm+5MYlZ39vu/+GRsxdm+lRT1LrsIo+CS4V+nM47ss4hpgSLTfs75xvFPA80HvA6ZViEestmvF0O3pk9d6G/8NKlzYf9UQ/488XMk58cnajHetvjZXHzhd95T7fO2LkvTHXY7fWiaq396PD6zNO35xZffv7O1JlLH686nVfXX/rE6mNPfWuyrnpxu3No7aBm5INDpxVFv/aDinj7qssH25c9JPZVYAfYcxO7/xljtnaL6qHb4k1vjM9FkYO1YjrEjESNY9SqS+EBrDEaNT9ZGY0yriMVK2EmU64FyxkqgqydcRl5NORloQ1nFAG9gLV0liq91upT1bSvd8bq+vUXv7rLPu7lfxBNDh9uvnph+cj5F14A6K5tdLNVXC7tT4Z12WhQsG58AnMDOE1jGdsGn7YZofF/nyR01VGrR+f/fHif6oAPIlOnP31s+Wd/eA1g/slPn5wpl25cj8nhtR99e4ULF0ouXaoAZs987qMLr3/9B1y4UJ64Qrk6GPOrQ2s359bGH29Jq2udnWGtxfDEiQtLitKddjXZq6jabY1T7271+lkPF+VO66mFT9W7nTcmn770oWI3l4rdneNTZ77xZDeLQ6jz09nuwvjCxYuX+cpX9lVQOODB7PY13Ah5vWdTuZdF7itL6n2VY58++9zHg/xfje7PYRj4Tmb8jeXXf/8nD2tsU2e+ONYud6Z6lYbLgolMTyo0BIykm35s4XVStpgGGecmoUGlkwg5cwFi1MEW5rbc5JMdsY0ziogdam/VQbffau0MFt698+LXth7WZ/6FcOaLnUNsju1mZ1DqOVrFHMlnAEvcsPUlmlTFE8BZYJjmGthA/BBrU/Iuqf+pNTb8xzdfON+FLz/0Sd8Bv2DOXWxPddfmi4Fev96lvHVwvNUAACAASURBVFdvM/XUc7++/NM/+GczT/7mkbrvLUX1m4r4bkl0yvDa1kBdl7v14ER/ZLmqdrTZaU3VfZdSz6XKtju5RY9DJJtud7ZgG/qtwxTeKlz066ger8Viqx87ABX1XCE96YIrQfTqzDmcr4TbA1b9dGO6pJ7lu0VGVNQblIWoahe0uhn1lIJVpeZQumX++OarlxYf7sE94F+F6Sc+/bRU/G3gufufl/hxJn996bXP/NF+uRc9/O3t+xidOXEirS9JzN33dIIvu8VXdxauLDyUgV28WLTXlgZVt54OZdvWhIhZRMcwLUlK7RgmkIaaMbPhYEKolsNp91EMBezIbGPfVOEirdsR3smqWFEJtHJzohpYvvXK721u3fnZvtIf/jNh+fV6c/nqdnfljbWdlY9vTUxt7dYZK5ZfznBPjsf3VO+GgDugSZrgDvA4cFT4suGlqtcfmR786dL6+vX946x08WIxVx3697aWLr94/vz51vbM6fGxydO/1T524sbw2OlndpYu35w6/fljY3Onp9vjJ91deeMDtQPz8zj6iU8Mrl9/53mYP/35ufbkybL7kcfruc7pD28tXb4DwPnzrZnxpz61vXjlzXs/O3XmwtHRuVMf3lq8fG3m7HNfHpo9zsjUyfGhmVN/fXjy9Ob2K797Y3j2+H8VjqtSHBqeON4emD5xtkVxZ2jq8eOEx8rQaFEUi8Z/idRtF/WQuxp1xuAO1VRV8ulMbxSRT5nYocgjrmJYijnLH5OplfFcFF50+uN2VmlNR6qrwh93MBxwDMWdEEXWHlHBukIjwlPgWQp+hpWKeJpwPyLGgH6YgsJzIcaoNQh5VGijjmJne/Hy0vt7tg7412F49tQ08G8Cx7hvUWx0pyj0j7cW//61hza4d7GfVuyaOfPcX1L4vzX82n3PG/h9u/gvll77+svv95gAps8+d6RIBrLMY9SM4BDhJ2QqpCOITdLrlqZkL1tM2w4Ra8I9xHDim1IMyr4Kcjb+6auVtNiK3HXVCpX9dYDx3cH+vS3sR5+LxdyHl2eyqp92xmuBPwKeNfoIYgjzBPAZ3pqEKo3/eaBXTf44k+9MMfiD/XK8Zp+88BfSVKH4VZmrSZ4i+Kbr8g7UYyGmI72cBRMRrFKXd7PoFc7yL8p+woX+XkH2Mlh0X39TsJPofwny34DiT0SuZ6GCLG6j6jAAqm5WO8VOa6g8WXV5Q9HyQOy0AW5+ZHaFr3zFQMLFgnMUDLzhmc3HBjraaveKuuWqv1WXg5PRz7ru5VZ7ID5eZ16VGEGMUMnt8Eu7FCed9S0V/I3I+KeE5pxMR8GLSfZI/pqlQvZgwHcyfJWMC8hDpH5A4afA3wBQ6hNGp4j838m4YOn1wvmjhP8M8dped0jfqC35J2kGQBvIF0i+2bgOMiFzWtLXbd+bAG4Zt9R0VXyW4Jsk56X4Lq4LFJnpvyBx3YrXwnU/rX6gx1J+QrAIjMu6kpFzSv1ziy+AboKPhP19h44JXgGnHR/GDgVXwHLupTeb+8Kg7Bew5t34Oxyi0Yh+XahntBiuryy8dumH7/uFesCfmrmzn/1Ibf4Hiee5L40t82PDf7P42jf+MftEJXMf5di/LMpLG069a0wyuF2EH4ry3Ni5L0wmdVHWvaGsoltEDBomQGOWx0TuYiXIUq5YERhr7wS78TPfAaXt1zJzu4zYzsJ1Qb1Uu93TTlkdGZzYeemlr1RAPpxtiYfFV+q7P+YOcOfQmU/N1tHesLJ0ektow1Y35GcN04Bo+gY/bnwKM10E11dztwd8/+F+ji/H5Klvj1JWP1Rf/67x5wzXgBM41iJyxulroH+/Dl0HrWTmoql/S3V8H/wxwz+g5n+r0RI1LeF1o6GAv9SoFOaawVRelPrLdjzfGASVk2WbVVd1u2hpGHdXemgYMTL7J4u1n/xsgRWwaPpY/bHKbBS71g6pbdHeKvr1IWC17OiPM/3Lgb5ueEbJBAU/6FsXRC4pVMh6kfCYzRD4VtacRnweeEVwE3EozQmsL4DPynzPkR/H8RHMb4F+2/go8mnQEeTPhD1r+E+N/6EcJ4EJwwnbFXBT6IvgF7GXkf5LwVcNHwO+ZvuvAqvAJOJHSu5KOmU0R3IWfMzOxyB+inMjFD8w/nU5V22dl2hDlk3hKyeNLzs4jRVIvxJ4zHhCsOHQ52SWjR8HdcA7iK3EJ2UtI35FaNf4qswq5kyjW6FhwRLysMwZ7Fuh7NfWo7cr94iSQalkjXcFb8srEjUXL8Z+qZfYR4EdlBrye5zdnMDt2n4Iyj4XY7C6M145OklxLMSEnaOWCkEKtYCuoRQWKSMmsLeQU3KVMInZsOOKlArUEcWdtnvDu91iZ5q6e+XKbH+F/XFBPExuv/6tBbi4PP/Uyocyqp7lrpKzRt8Gf5y39Q1KYBw0ange1cH58z96P/v338uXs2x99t9yT7+MOI95BfSXBX3bnzLcQNpyUzfwh9j/tvc2zIyeBfrA37r/nvH262899xjQTG8Qez87tvdak65oCk+H9n6xaa00vPN9733v3QLG7rtLDePmbxj+w73fB3Nq7/XpvfGc/v/Ye9dYu877vPP3/N+19z773G/kISlKoqiji01f4rCO4zhO6Fh24qJpp50himIwHcwMUBRTYL7M9xnN5/k6GKAYYIoic0Ghtmjrmapx4oSJkzgZV3Uim4olURJlUhTJQ5772be11vvMh3Woi291EolnW94/gADP3vus/Z59Wf/1/i/P89Yx353z+zj4JmYG+JuYHWDf0n+FmQb+HPgQuA18uBFj0gLwb4z/R9CfC/4X4396GMiPS/qfgH94WH75H0DPHf6ZX5DZBf0N5Dcxfw3pBez/XGJkSJKvY75g2EW8jv050Cr4Ek1Z5+MS3zCaMe5Yfln2Y2H+mqEEHwj/mdFp4I7xI5gpS/tYpw6f70OgUkaIfSzZXpYIQxfpOnAsyK8aPQDcFBy32M6Kacg7P+JDNWGMCEeZlY/jd9udGyUy6dwLpMv8QK+T+87YBPYzZy6196SW7M3vOVtkYEXK97spQWsf25mq+u2plPKSM4a8a7EUJlmKLHaieZP3CM3bud+ccjU0StmqbV8ROIIqFMMs3x20B1upX96ZHh2vrt748pAxSd+MB8/Uw8GFa622HkTsEXrzcKf7qPAcMHf4wC7i5wVTmXTr2P7i39rg6X95lM0rSf6dSvEPwUvAf/GukHwvKDf80g/49fHzQvjLYE6846cFYOHtKRd/6PA/H37HL3wC9PF33D+Q+Js0qfWb4L8LPHx4QQQwJ1hpGlSbJwT6iCnwI8BSlv6JzBcw5w2zwC7mE8AfA6uGz4DnQX2jn2uOIwlXoG1Ci2TPSiqMPoJ9U/K0YQpUY9aBq9hLyJnMm4hThmHgRUIj212ac9cJeEuEyhlWBTcEa7ZL6I6TUvaEH0Glaibl2Pzek7Vwd7yq2rz7yuMoOZihaLKs+t7XrQaGdrq/r9yFC6kY1VPh0VSd87TtJRQnw7FEaB5A2bkRmkHkvAfMgnYtFm1vSXkrwlMh3w7ySK7erIa+lfplPT2I8saNL/eYBPXvY/vqpe2Yav1ee2b2z53zyzK/KfwC+E949xXxlMUTkr9k1w+vPvFbMz/smPeDInV2cf5D3m72m/Bj4Xeeh6Yw90aHTgBPAl3Qdw9vy4dlmWu8/Vm4SyNYtATcwDwB7BrN0dTMS8R3gMcM28K3aSSf+81zO/G24FFhu40IZBkvIy9D7Ajda456BXwKaJO1i/Qg1pthFoH9jG+ocaS8AbqBudbU2dWW2TYct9wD3lj+CRtf/WmmIAkkmuzaO9m3onVwsDE28XRsFnKcYyPELPBuTXhhm5vB/RXZX7/ebaRRmyz7/KGBScewku1uUyLwHIDlJQJkbdEU2zciNG9zi7rRdi+LdK2mM8wzndi88ie7169//fs0hye8za3nv3Jw47kv9+6+dOklgiTxRxBXgTff9cAmCKxDPGm3PgVPH9ln+vrl39y0+MegP0H6LvDKvfsEG8ANmlowwOWjWON94ACoG/1/aho9xBuH91lwFQDxH4DLSC+BvnZ4+3PAnuSvNw/hLvAc4pJxt3k8/wFzCbSP+drh72yC/oWbY+zJ/Nnh0z0Lfgl0CzfZycAHTUrcrzVr9auY7wC/c/iYAdbXaESjrgj6oJbxCfANNaUAAVNuauo9lN0Ef0DMyJy0uQWcBh5AFIZrggHoGPAGaFeZ169ceXYiUPMTgrMS5FkaqdF3oE7oaHrAfhhjk4o/ONiI6DDw96Y0jEKkTH1fTWCqqq8cRWq13XHOrdw0wAyRu4KuzGYO9jEV1ggrO7yobBttZLTv7P0U9LM0aJX1Ulmlq7sv/uakpvYXI68Vq//uZnX3FyVCZmT4h7z7onRB8s9DbB87d+mPNy5zZIp0d1+69J3VJz73R4KuRQfr/5C86eyhFC3jnwPNYX8LqdfUjjUHfgL0G+DPC04bvgOco1HwM/DS4ZTAHNIx2TMGyX7REauylywqrNDhDtgiNfVuFc3OVFlN7RgjgXs00wb7Em2jTZEHRvOCPVunkL+FWQAq4JsSnza8gvlZ0HPCJ4AbFmeA7wjOOPNV4O8IXjTuCv2p5Y9g/g3SrwFXQf8a/JCyv+DgBTc16grz/9jxEvAV4xuIvwf6Z8J/A9i0VUv+v8HnCa4fBuMTEstk/SvkacRDwi8avSaibbmFlQSF4VvAgtGSrO8izTr8EWW96WBJZgZ5zvD1gAcMrxjuCHVsSskPSWRbrxKel+njeMH4lhsZ5I/QXIA8BHzb8hk1L3ZlXALPI54w+rNwfoNJxu4nBkedyOrh76uj7ys773fKFmMidT02gX236LfFdClRfs9HXbnx8b5v6c0zZy5MDYp6rhVaqrNOIFo4DkR+ovmOImBPjs5hrW4D8gKON7M0VGY7kjcrYt51vkPR6mX1bmwtDcbiTf9J4/LlZ0anT3/664Op7nYOTQl/A/g53jlLaj4Cua9anwG+whGeMO+8+Lv/8+rjv7JlV38oFX/X4g9VtHbt8gFZP4v9vxGaEfrnWW45e7FIvlWW3i4KfT1nfVrSHyfV3ynNL4a12Wm1/3g4GC6jPJejuI3i8apbf7MYxtnUKl4se6MlRbge5YOiU9apM5NTq+MbZ6eGPAMXLmzo0qVfzly8rPVv7hd3Zvvd2TvD4Wiqe2rYHW2m/lzdLvrLZY7jqa3Xq0G734pyddAebLVGnZ8pCm5VNVWK3Kqq+CiK/xZVjzn7c0T697j+ZUKX7HhZyuvK+qe5yA9GjgeN71LHPyf0OVx/OZS+aed/YHTH8p83DXT+DeSXEFBzCvHLNs/KvOHgIVkvS/qXcv1LdUrfSrn+qK3Thj8EXQFdl/J/lsW/FToJcfWwJwOsRYntnPmMcI+ILHMq8GsZfVSOfx7kMmfvHV4IDAXI/J7DPx85bqJ8G+njhueNlsL5FRksLVm5HY61jL4t8i2JbfCOm4us50HC7lm8KscxnL+p4Hgr8YPkSSeMM+Lge88swju1NNM9yGOjpzE2Ff+ls08tFCn/HYf/S8wv06QsF4Fdi99yzv948+Xf+637sZb19S91tlO1YucHpHxSmTNGj0huNQ001LK/myOOHf7KvjLXUd5G6ilrG/IuwCCla2lQ19tXL33fmMSEvxhrT/zSI6Y1Z/J/Y/P3aT4fbyO2gGerof/R9tVLR37SXHv8qbM1+VeUqt/LVbvozHdf/0H64vd4h1PeTzTL61+a37zy7C4036UrV54drn3owkdu/fmlb585c2Hq6tVLg6WzTy3QZUHDeq7l1kbdqhedvZireDF18qOV82Yr+0Gkn62Cr6qUo2AqV9FX5JPO3IwiSpxlc9qZmwAh/noQf+qok+toIWeCpCaz9qiljbquv12keBD7sSxds7Wf8JOQv2biQzi/GdJytkqKvBe1Vow2UD5pqY+YjTo2MrlN8kHUWqnD6xJ/opozNdoLc4dC82SvI/UhT8nxosXDMq+D9mdG9TcmLoU/ORx7/HN/3fAPaJTn5jiMUYJ/mfFvdPbnvnLYN3XkjE1gX/vYF2eqYf23w/XfN3qKe2sTW7IvOcc/uXPll/7f+9H1vPaxL87k/ugxghPkOGn5wUO3seVmSQxsDiy6gi2Lg4A72Ae102ZEvaWK7WqqGOUY7M1t1YNJTf294ulYXf+9zyL/90h/g+//DB9I/HcbL/7u/34Uq5vwHnP+fIvnnqsAc+5cm8uXR9Bc5N168fdfu/ewpbNPLRRF+Qt1ju+2Cx+UOR27+9JXv7G8/rlzm1d+94WFj/7iYrtXrATtXYBS1c8k51fbrbQ1qsqH6MSb9SC3EtGJVu6WVasuCi/WWSVYCtfgOWVNY98AfsZFPK86T9eZCqU5XO1H0lk7Xm5W5Tk7Isht4TeUYrqqfRLnG61o3br10m9fhe+t104YU7TyxK98Ttn/NfC3D5Ux7931/0j+jbr2H42LtfjYpOLTYNStia7RvU5xAchkWykK358mk/PnW9rpT2cVnbAXsvJMEMdst0Xjo255FtyTNUTMRdZVJ+7I3kqqqevUg3KoYWtn58pv7+1MdurvIU9n0hdepi7/GeJzNONM72TG9ufOnLnwf012Qx8A3qlNcBjUAd4Z1AG2Xv3tHeBZ4N7FwFUuXCg2L/3uZYCdb/3BFs0OywCnzv/6H9x4bmq48NCb86fnTl4+ONiIq1d/f7Dy+K88sPGdS1cATp/+dPf69dOjY49uPNJZGb5RHszFXC9V+0X/ZL9V/WvtFS46WsstDVLta6kqqpzidee8KMlK3nZV90Q+hmMfs0djCrFFJ24xCeo/UYTzg0hdowH4XmB/q95eTKWxERsam8B+0Knq1rAw6F6zEDT/yQ7uVjWznP9y4rn3/8tQd1JKI07XxCjknnHLVhsYIc+SySjmgJuQ6yxVCY+yGKgu6qSq3VpYuNsYlDz7lpLIhPeGOy/+1o1jj124bHSJpqnqXQh9Zj9xjqZjesJPG/cuBg7d2t7BW9/DeyWRne+y9c5u1rsv/c4b9/5/L8u28crTr/JKkylsxO65eu7cxfblq8+Mlte/lLdfbMoOS2efWjhVLPYvv/jMDS5eTKvP35jevPKHe8B1eKss8er8uV9d2n3+Nz9Y5k4feC5G9p09iQPwOz5XErifYRiuxyYDPjYmMAszjy3kpFU1ghFneXtt2013La/0V9vf4erV9zWwn5hZX5Hbs7XcBc6A59Soez2AmJbZRgyEKmTkuGblWcGWMru1q7t1pdsbf77Qg/81Mwnq7wu9R1buzpTtFdAv8/3iLvMOrvXPrPwxb7452RVN+Cty6fu+wxsbL9QA/c0rb82hD7ZeHd67nRdecO/utXdlGTc3r9QAw41XJmW5nzDW1x9uD1N1lkbG+BRvKz5WwKuSr1TEjcGd18Zi6mls5thbHSqZKex3N5mJacRMChbY23vfr4jsrupwgZhtZhNjjkY1TJhBhl2bRdtC3kW5F46exSAltu327vbK3gETidj3l+eeK+uafyH7BxloJIn/dLU3vXrf1zVhwoQPHFXV16HR0IB3a63UQEtEu7aObMz2exmbwD7InlJQNeNj70i3m22s6YxH6zvH3/f11u1+ipy7jYmL9oxbWdoG9gRFwEKIvoMpctxCcpa/q5rtwYDt1Orno9Us/+mhaVSJf0tz1fxuzFnV7fX7v6oJEyZ80CiKrrH2LCoabYl7CCidc7vjPDYbibEJ7K6rAM9JKnl3p3MLfFc56qrqv+87dqHZutFzniJrRnKbw7SLYRU0nUUdVl/OJVk3Je84pd70ytzozotfmNTO7iNZ+k2+V42uobLz35s/96vL93tNEyZM+GDRWyiSpGU1Bkdvl7BFDdxBMhRjM6o6LoFdKOxGRWqPRmf5HXcyFEz159vve09APZoaKGvaWYlgAccJmSnEGo16VIrs24YrDoraeWSzj2M/bt3xUZqQ/DRSj+qXgZf5/g7jVWC+VZbd+7+qCRMmfJCoy6EMQ0vRSAMfiguZkfCy8RCquR99lPvHuAR2R9IMZt9NWvWdAbzOopvDm7kevf9dhxpZialGhjLPqGmiW7VpuuJhgGTjEdaeVOzUKfrQ27t+/Vcnhg5HgKx/hbj9/XfwpHP9EOfPj5WO84QJE36ySK2OIYfw6DBG3RPHstG+UKcVGpvx2nEJ7GqFBk2NXR3eHdgHYVJkPVT1i/d7x67Uyl1gNqxk4oxNDWqrGQ0cAhgPQwwIL6LKUeZ6dtgqJ7v1+8/2GfYzfoOsH6RzsKYUnz02mLuvPgMTJkz4YHGwsdWJQyMwSRvvuCsBhazRsMxj0zA9LoGdapRbIKsZ/H9n85myqAnfug/LsAat3UwujVdpHJ6i6dT3oaWsukZ98K7NrVau73aL1L+6sjc2b+pPFZcuVUm8gvwS399ENye/5eM9YcKECX85FgC0Z/O68QO8XfobgroEB6nV6sLFsRghH5PAfjGiyDU5z9DU2A9RBgZk7TaWee8/imQ5VYgKPJRcIuZAu9gH4NvJ3MKKpHQ7T7XDu9P9SSf80VFWaQt4U7zbVEPwVcGQMn3iiJY2YcKEDwDtXHSonUHz+O0eMEFgv+mcl52rGJcx5zEJ7M84R6cwGh2arBy+cA6gI9x2sFioOvajjvJeMKe0Q9Q3kaxmHSFpBCwSjR2ow4LYE+XeaL8ejovw/08r7fZoQY2617t6MCx9NJvKOcf6+pcm6fgJEyb8pago2jmYAe/SnGcygEUgVhRUylpjTPxXxiOwX7gQQdlpauwIaB/eUwvuNr7VeXfQSlvv91KuXPlUiWLXZgrUA80YjwSlTGUYGDoi75Z1lEWnHIsrtJ9mPGzdzsT/Z3jl8KYrAGS/IemspLO79Wjxhx9hwoQJE344GlY5HAIdpyn5NSJqZh9zN5sphxJcHIuYOhaLYGMjXCtl+xjwBu/02UZdm0IwNVON7sN6n3YFd8P5pskb4L6skWFkuR/yq4JhmVynDtUHwWbzJ5rz51uR2jnsJYtrh14DjTCNOA55hoCc/MDRLnTChAk/qeRWJMSs8A6N8tw9n5W+5G5I/Vxzi/OvjkVMHYtFMDXlGg+laAmWeZfynHcEJke2u/cjzeEoc43Zb/r2fMu4Bm1irWXHKBPHGBa75QFjM97wU8tzz5UU/Rkizwu1wa/xtuNSgL6W4dG6le+PO+CECRM+cCjCWdQWS0J93o5RyWjGmYFU+vSt9lgYq41FYF8rV9qNdzF3aXbrjUmCNFSoA5DFDCl/r0Xn+8LUwtym0OFOXHs0Y277oGGQR2G/nlp1d7XoTswcxoA6cceOHva2oN000flZ4FXBasr+ZlSaOep1Tpgw4SeTYlC1Aw9lttzs1u9tFApgW8FUUcRYdMTDmAT21uZehqRwXs6m4h0et7ZnCKYkioqq/SMO855xY25vVCeVsmYsCuEM7glvYK1lYiNXde/KlWcngjRjwMblS/t1Fb9puGZ43vAHELOWXs5irQYrxfvenzFhwoQPJjV5mK0yixo84u1U/AAxQ9aMc4pyeW4sYupYLKIoOi5S7lkUktvYTWC3W8Ce7BrrZlT3SQDg0qW6cFw1ecOmyrAjqCz6llsArdSeqJmNEVtLW28q8xXLXxe6ZlgMfJqs60iPa7JjnzBhwl+SQkVb9gmZNRqb6HuxaArA+G5tT5W9NBa79rEI7FdX9mrXSlb0QH2hezvhDMxmMY3qE/n+pTqsPNyT2BaUEndsjbBSM1ZV7+VW1WNMRhsmAM89V5bd8nlZpcVA+Nu2yoBXJL+g2je4cGEs6l8TJkz4yaJW1T4cdbsBlKAAcHMbwAPOPmhN12MxJTUWgX3x7txMjY8FDARtC9GMEwyASjAS7BXK9y31XQyqfVv7h4L/bwi/Bs44jkdNFYN25vz5SaAYI3a+9QdbSsWXIf+p0bM4/5+GzlvX1pcufb+964QJEyb8aKTUas4iYq1JxbvX/BgFdhYaFEEx10tjcY4Zj8AOg6R029AxSjSpDgM1KDDTEDnnWOA+7ZKvr3dKub5haQvHoRVrvJTFtoo0zQwHPHd2og0/ZhyPxddNvKlgWxFdy99MLb8KMBGpmTBhwl+YixcjV7mFZNmbEAXQhabeLrST5drE/P2wFv9xGIvAXk6lmQwr5OzDK6F8GL8TeA+z75zbmTzk4n0SALh0qcKxh6lN3shwXapnpJzLqs63WndH4yIfOOFtLl9+ZnT3ZP795Orbxs87+8VylHduv/bVW5NmxwkfYMYioHwg2dgQgKVkUzW+IYwAgbNhOeSWyLvlVBqLXp6xSCUPPRjZU/tBtO3cI3SLxrxjCITRCKmXUJtnzhmeuT/rmupsdqrhtZxTXZDncx23FXkrtdJofed4XLkvq5jwF+bSperWhQvXuPS71fL6l+Y3X3l29z/+SxMmjD/L61+a3+zMDrhMPX9ud2H5YNjb75StXM+r7u6lnXZ/f+Jb8R6ztyeYJ5x7Dh3HNlLCZEktTAns1+R2azz2yuOxChUtK+fpLNeSljBL4AxMAwp5CfmkcwouXLpvaz4+jIPsdDdSXdZgirwnpV2oT11ZuD1Jw48zh/X0zSuToD7hA8CFC8XS2acWimL4kePDuw+uPrG91ioHj+61Y4WI2ShGJ2bLThzfXFxePHNhIp/8XjIYSOE6EyexM+guJgOyESiTY9pZaS8VPurlwpgE9nqoh0kRQqXRHRqBmpqmA7ED2g24EwXV2mb7vtVJr1z5VFmgu66LW8AbqtnOdV5SyfVTbzIZd5swYcJ9YflaPpla9YlcMagV7VznxUAdZa+T0wPU+bF+VXfzVBGtGarVJz4zd9Rr/qBwemc+Rc5d2d8VqoEDYANAxhaDHFRRqJwe9ibjbveIVGyFGJjcFp6iqRcl0IlG+c1zNotVrtZW64X7mGZ6Og+jyinlpaLwQajYLQq/7qLVu/H4mm+lUgAAIABJREFU3ESidMKECe87p87/+rRSelzm0Sh8LFStpGDFQRGoI+IRh/pJrKrsn8glp9uzyzXnz082H+8B19dGlYp0HDFrlCQfB5YAE2AzFc49JI9IY9GgOxaBvRqWvaqqDTHX2LaqBZQ0gvsY3UHOCm3t7Fy/r1dEiwNuRlW+POxzfTiqNptbe3tcujBJxU+YMOH9RKfO//r0cHf/15JZxHo01xQOPYTzJzAPOLEAlsxZQj/rViEFJ/LO9szS1tL0Uf8BHxgyN02jQupGz6QGhrauBt7DWsB5vup0xsLCeywCe57pRFFEiFyCjbxLI06TIBeHXYgbOM/nPLqv3Z9Xr14a3Lzy+buLMNi+emn75gmurxWnhvD0JLBPmDDhfePMmQudan//ExKrdfhnjE8jfVK1OhYrWMdtn7YdJpfZVDjPqyp2HJ0550pMuuX/yqzvHA9bCyH1DXeBfYsDIBsvGxaNR5j9bt1/gDF4zccisM/VlQAkbWFtYRL3jGCQLfdwTOeaQbl0FFq8T+erV4+VcDFx6VJ1+fIzkzT8hAkT3jeOnbsw2yvSJ3L2RwSfUTNm1Ra5Y/yk0DI4wCHHsWg8LR5RHWdyuKioPlZ0ysk47nuEQwn7BHItmMZNH5hgS83OsxPSylDFLve82o+QsQjszrVy5RZYDlYPb241/yQRUyaPFOkIP6jP1JO59QkTJrzvnD/fUpXO5pSfsnQuowyaR7EKmiPQ4c4R0IyDZMeHjDay8kxQn00Rt0fF7D2hrwl/BQaD7bDrZHsTK2XpOugwYytnuI7Yrio5RlUeB+nqsQjsQ6KjYCabrtBd1Iy5AUPwUM5TISXZx1plI7o/YcKECR9AdGx77uGcfc64LfHRkE8BH4P8sNFZrJPgeRS15DfIXhaeCjgH2svSoM7utsqye9R/zI9BcP58a+1jX5yBp8ciHn0vw4VOSlLfUrIUsk80srIK2y2sGROtwMNWareaufejZSxeyFxFqh1lKA5kauwDmhr7oU2r5sBzVtxmbm4smhMmTJgw4b1m7WNfnHahDyP/LaxfaZqydBI4BVoBzxyqc163PTJaltS2KCwF8mOR9dGUlQpiLDq0fwQ6c+ZCe217ZUm9/vTxR752DICLF8diZOweHTrtXFOEKWR3gRFiCWyJJZE7Up4hRQxTrpmbO/IsydEH9vPnW6ntqQgqw8Lhrftuug4z0DZU2dFV1DPVsDeZz5wwYcIHkmpQfdH23zY8KHgSM2u8SqMSmiw2gH2h42H1MScQj9rukDPkmMvyZj60lx6HtPAPY/FDv/LQQeK0WqPpQas1XaW6Nffk51fuk7Doj81+LudIPrBIgtLSZjPopqHENYhBtrZy7VZhdcbBbOrIA/u5wVnlMvVzpsAO2xJaaJpFGIKFVMp5y1kpl4PJjn3ChAkfONYef+os8gWhh4Q+AnSRj4HWgEeAW8rcxlSWD4xXMWs5e05oHRhIrpF3HerX0uCHPdexcxdmjzL1vfgzFxZTnbtSeFSl6Q55rpVyay7X4vyrRx6X3omGsQ069dbPzmsy22DZOi55CZiNyMvJZdNkfcQc+Qs4HO4rWnU3Uh4dpjnmDIPDgYEMcVdmW6ESyXXZPfI1T5gwYcJ7yenTn+7Wzp+S/Wngk+B5Ggexxab7nRugbyCuWLwuqwSdQqxLPAqAeAIpy7Ge5FZRD8rv3T0ur39pfnn9S/NpWHeX17/25NyTn1+Bp+MHp7+//7bTpz/d/SsGLp16/MJq7KdTEPO5xYKifrwutVLWrW6VY4GzY+iaKe9KmsmiBsmiDZSQDzLshjwU2q0yU1w86sWOgQlMr3c75em5ZSUtCu05mJKtw67DNvaixbLNVCi3o5u7wM5Rr3vChAkT3iNUzrbWlblo9Djw7nKj6Tn4HeFbska2b2ZlhfSg4WEgATcPH3zK+Cu5inZ7UO2/8zkAt1xPUQxm7I5aQcrKswsf/e089/V6cP3ixRHPvD35s/axnal6+LnTRV1tRiTnXGvYSelUHuyWSxdi4/Kldx7/x+LYuQszdZXnlOJEkNvUIUyl0HShvFSW6dr9NPr6cUid4XQuW+2U8ptYXWBA42MSoGHgg0ZcVvtKrXr9m/vFlaaUfGQceWDfX1qdily+2cp+qFFQUglRIJeYGmkfnGRmnNUfKibORRMmTPjAsLz+qbna6dcwH0H3GobfwoiXlP2Cgm9j9SJ83I6R8ROg4+Bt7DWjAxkr9JCjfqEoOgY4/sjn14b1cNRJnXat6oFcR7tIdcpmJWXdlDudcqYsefXV69wLSBcvJv/7zVm3tD8q2uuU6XpR1Evqcavq9ObUSKLvc3jB8B/7G5udPvRLTtduPRjUHYhHslyj2EM5Y++31RqMo/hXUbBfZ6YEU4gWZh9oC9aMbgtfcfjBXKU7vV5x5Kn4Iw/s7Wq/TKSoc/QU2pOpjIOmxp7Awt6zuB1BV2PinjNhwoQJf2XWv9QpisGnc+aLyDM06fd3clfwR470nJw3K7uiZqTkszIfB1uQLSWZDtIVO2/WKd3eLTrtE+ufnSvDRavdWqwyDwWsRujAsBqZHYuVXGflorPJXLx1bj31ZxtLVTutSRqIPKLI03WmqzaLdZH6BdVo6exTC+3ZqG49/wv9U+efm7rx3Jf7vDvIx9LZp+acK41mU6ce5jNSTIfykuEUmW1Zqw7tijTMzqOZejRmboxPh+vfD6MUUt/2PFaN6GEODNcQ23YIkxV1rleH4sbRrvrIA7uK1kxV0lEKOXsBuSfTc1Nk30HMgGaQpo3bkcs5YPOIlz1hwoQJf2XWonygzvq0nWckJaQe9j2Nd4O/Bfy+c+7lFH1yboW0gvkIsAgkcyjqJSrkaUlbqaYyo9Nlap2QvOOaIuHTwKztU0Z7lpaNtwnNRB7e5tKaAdbXv9TZdv/nRT3jrKtK7sp0M6mL7VTXs5UYtoo6lb3Wa6cev7S8d5DM+fPl6Vvt4vr1rw8Wz1xYiILZ1KmqVDNV12VLLkq7PmdFLSOLM40qK4u19SYt9q++fGl4BG/Dj+DpXPBUp44qOasSssSWYRFpHtPCLEnZWepJKd9aHh3533DkjWj1sNtLOUplKmDOaMWoPpTu62EbcGS3bEeRUzluc44TJkyY8Bdl6exTCxX1r9l+UFIG9mXfO7cZ64qlf1dnXi9S3QtYKcjzBB9GfIG3N2YjoI+5hSmotAf1qSSvCs8q63iEPmx5MUeexiHQKSlPp6AIWMlVpENlTe20qockZkzMyTquHF1HLIk8Z2tB2d1URlukPWnwoUFOx9vZU8vbMyeGC52FxTMXFqaKuiUVc660UFWxnOv0EMF5oWPK+XHDqvCqYEpmKiI2PUjXGUOlvLIelcqplrxs1LLVwcw23uyeA+/ampeUw0wtfbeYOeo1H3lgz1U/ABy5D9wUuts0IkRlWAT1gAPQnsRMtHLNM8+MXQ1mwoQJE35sLl5MavvDgirEK8AeaNdQgEag0vhrKfOKUkyb1mydqZzSk5hfw6y942gtoECsAN/J1HeCtOrwIuaEyT+X7U9gTuCQRSFR2Vqos9ctBi7KWwCnzv96l1x9FtPFHCDPYdapPRdyK+ypOsd0JHdHqZqWVRaFFyHPoTQfZTHd6eSlitaDoj4LnnPwcGQvYRYEqw5FwIKlvq3SUs9ZN7deXfoLN+PdB+SptpqKh+aE68MphW3QLuam8EimVqZyVfcUrSO/ODnywN6Zb5duVWFrwfKScRu7BG8alxIDzD6RI6Q7UdVduPj+rPv8+dahoIPGYRZxwoQJH0i08md3T0RdrxxO/zyOmQIvgHaM94DLkq5lYijlXDsfD/IxzOPAp3i3g5gQJWJTVinpCeNP2pxuuuYVh49qBf6Q8PGMR1g9lHZUxfWyreKBJz+/Mto5+LyzlhFPECw4/GAOKksPGZ2SOJMiLyFmVcapLK3UZiqIRwJWTT2XHQ9Q5HmSD4AnECccnJO8bDvIPpVNF2yLvsx2R9XGeHpxPK12SWHyvOANpK3D/q8F8DTyclbUiJlMLt1KcW+zepQceY297I2WikjTIQ9tbQGPSu5CzIMK46GkNlknHfmNCnW4sCEuvfdrOX2rXZRlO9L5X/eN584NTp++3r1+/fRofX2/uHLl2VFTN+rmzSuf2ufiZR17YaN7nGOjg4ONuPrJYyXPPFNz4UIxDspDEyZMGE9On/701LDOXSKOGYchLNpCQ/CfCk6A/4PsMkc8mGrdztKSQeC/A3x/qtdsC1/L4VLWY5gpwkNlLUlMIy1jDixvkSklzgJXRG0oKIbt6VFdd0n8rNEKqMI+KWLG5iTKN0Fk5V1glayREifkeos6Dghtg6OGVYkTZLqGqTD7DhA6brSE1MXelNiRmTa+bKWXp3N7736/Dz8uOY8WFK2dTP6w7FAwZTMwDqF9MrMErwYUMlOz1XC4fcRrPvLAPl9xZ38qppUtRGBjVL417mZNG7eQ+2SlnFu9pqT03rJ09qmFKobtNBj5wL36+CNfmytjzqtPbBfbwNoTv9Spox50PBqtfuira+l5TQ36efuN2Cimirq1+I2Ncvr8r49Gb24mnvgMZVvFzLBIN1obu4sHx6YBVotuv7dQpBvPnR9w7pliqX+ym1r9XJfdSK1+bu8N6hs3nntLWW99/UudK1eeHXL+fIvnnpuM+U2Y8AHg+vVfHZ548lJV5rwleLTZcDNA/iZmWfAN5G8ZCmWfNF4GNgS/YDj7Aw5pYJThGlmflFiwqGQ9gpg27GJq4w1ZDyI/4qwXJT9G5js5yiKyj+cUHxM6JTQvvJlFUs5ZQelmPCnbENIGUDh7p6m9c2DlJZAhJ3JkyEWgsPxw2MebzIQXQCOJLvKms14PQmXh21deenYsrbDX1/+ktSUGyEuBh7YO3GS6CzWBaCaUU7amQpp3Xd6qZjtrwNWjXPeRB/aDGQqXdRhKYAGpH2Zgk4F9yB1MCJVIuZVyi0uX3vOUzUq0BnczC63kxWKQy9yhhnJOqneTo4QwWfP9mpSU2pViozudFwCGSrNTBfuDnb0qWrO1Yuhu40K3v9Q/eaLbrnoA+9E/We5Fufqhr+ZiuFyNoj5ud7bzzKCXRuTR3PLiqccvTI8iLaesaqOzt7V09qmpmVsHo2r9s4vFoNovio6vzhzLy8P9qfmqP6qqocrlubj1/MJg7WM7U7ee/8oBzQcvnzp1frrdnsv9+Xa69fxXetxrTDl3sZmVvczEinbChPvM2sf+qFsNWQ1Fyznvq6ngvgw8YemO8QsQx4Rr5B2jbDgD/Cf84HP2bfBGoE86GORMraBLpoNISLOyrwEnJE/blJJPgb5Lkqgdlh+Q9EUyJrzjzGnhHo2r5i1QiTERdbZLKU87kKwKOUdmqg5OhtTLcDyQbCrQvFG7CeqWRI0pszWSnJFv0meHMWyaA7hy5VPl6hO/l8msIc0gTklk2z3QLrADcSBcZXOXiP7M4J5Y0NFx5IEdmE1K7dqek3NlgaFDYwCTIGrkGVtt42Nlyi9w7lyLy5ff0yu8ffbn2500n8siqYhl1fW2HVZqdetcz0Qq6qCel+qD2iqTq+O1w5k8pAjqmkVgKrk+yKNYKqk2glgsUsUgp9kgH1NV3yhaWXLyCC0ne1gmFe1esRJFrnNVpoG0lOp6WBdqFcNiLVRVg9mpBVTdqNLsUmLYOcZGvxVU/U5eodOiPBhUpx4f9ft1Mf3Ak5+fqqtRjEidUWrlQTVM3VHdW3v0F2byVLsXg/a0hjft6W6PR1lsDT+9B401oatSo2K2VQyjirTr2WGrLIqu71T97iIMdqLorERrUFV9HcxQLAy75ZUrzw65eDE1QlFNVy3Nl/THEq6YMOGnjVvPf6W/9uRTQ5PfQLFmeA1j8LTMXcIjzCZmETiNmBH6xSY4fi/Kwq8Z7hqGRgOF5wQdi0Jwy6Y0XhZKNpVNEXJhkZ2dhFYdfErmUaSe7C03Y8azwF0rXlF2zuHNcF2iKLKVQm5lPERazo3ADM60kMDuOeIY9gDcEpwEjQx3gEKiJeK7ll7dvvrZXd6P2up7wPr6n7TulqlfFPVO81rnfkZvCB0HWs3rnJNhSWgmSO2q6h25beuRB/ZWSdVPdY46wBxIGoGx2VJjjde1fCvwAGm745jn2LE33uNlqNep6pQTklep2EuKeYocEKOsqLLrk2HfdaQl5dzLJFJQqC4eLCp2FK4LycazSlRkzWYrCE7I1Q2h2kqP57q+YTSf5B0Xmioqn3CLg9qxT0suMlWZUCpZQRpY7jqrB60Hw+WoUqx6mG7k8GxkRjgritbiqPaOhlW7Su1bmc5iqxhVWPtZaXpQl7Om2FcVH7Gq7UwxbI9GB05FlDOtGddFuHKR69ZBy8PZyLmuOt3hQVW1W9HfbkVeOuhApxxub7fSdNWKdlENN7ciVhc++ou9qRd3Rul8x6PeZxcUaa8edqPNfmeYOyPnSlF0c2u6rm89/wv94+u//8jtKytXOf9qLG0tTW913+yfOTgWAFevXhqcOXNh6urVSwPOnWtz7Fie9CtM+ADiofJuqvxYiHnghuDjhjuEt2QdP+wtShn1BH8N/MgPOdTI9gZoD9gTfhCTEQdA1/Iy5oqkJWAWU4Yc2dpC3JE54WA+iM8bT4G7GTpqnDa3Ma9J3j28gFjNxOvK7jate7GL1CHnHqIr1CJUibxtmImc+5YeBrDUl/M2ZkZwPVvXkO6UreHGOCrN3WNvui5iUE3XTmWo7og4kL2AyDJtxCyZ2SB2EGVW3fbs9DTQP8p1H3nn98zSgzORi8etPIyIx+W8CKxImqMZ49iVNULaFh7U1t7ZwertjY0X3tMU8oMLH81lGs1aqUiwjGirZiFDZUc3ybN2SpYrKVpIZ9R4I5dEVNn5EcF0tivkwOnREFjqyfEQ8nwm7UdoIVsRUrI5pSTnOhwYObVRXo5MWHRMmlLKDrSQHS1ZK7a3i0JdnM9YzFocpIic7SgKLULuKFFkhKmnlViSdYJIEWQI13IkQkvIsznrIRdUciwm65RQR0k5ZXerIheimK/xYiJR0epEPVxMNZXVegiHiioecV2eHNZVpZwejxydFKRRnVJq1UtK8UAqhqkaVK3u8mvzUrE0e+zgkZTndgvqmW45NderaztaM3Hi7FTlenH+2GOrnbLTnRq15ucXzqx2j52qZucfX1o4/nA3Tp3uzK888eCpxScONjc/wfr6w+3NzSt59YnPzPXuXhvLOt2ECe/i3Ln2fJ57wjAbZjOLUNMYV6LYpclUzgNnJOYFPw/M/4Aj1ZhvI72CENJxhAVdcAe0AVHRlOb6wLKNUNyW/C0UB4Is9DnwwzTn2xCaAnrAXaFvIk9hOqB+yEOLFsJAT3gIfkBiYEXCLIY1K5FQnLTpCLpCsxIt0AGwieLAtS5vn9CbXL06toH94Jd+Ns/e6C1E6FjzFnkW8RhNQwGgbeA1S0PJPTt2alKvd/fVI20GPPLAHic/NNXSSKBFsmZyOAmdALWbhg3dBjYI7RmNcsrXhkW1e3Drlfe0mWxz80o9e2K9lUfVEorFMO0cMQ0m4eNZ2oe83Eg3exHUt3GEVpRZDNgzXgwlCc1AnpFkwbTxUFAEXiY0B2TJaxCy1A27G9C18qLMIorSaCaF14RaMgkyCEdwPFtdZQ2FZg6zGkhxHFM5NJOzwe6GmJV5wIoqhYtskognMxphP+BwT6gVoms8iwDRzuiY5CmIY81cbZrCbok8GylSlj4OHqE8L9EFdcJeF55RUCC3hT+KdTKgb/iwXdQqYi3DrOTjRTmq5TyTWsUK0oqS1sKVIqUC51lSfAh7yUgpF5E7HHMtokonTF2XyWfbawOGHh2fXjmzCi3NLT1yvHjgAYa3P1XCC5MywITxZOMfeXbllcKitOkGMQNIRFvOLYgVwudpzGA+CRz/gccR17H/HYr/n713e7IzO8/7fs+7vn3sIxpoAIPBzGBIaEgR0kQRrJJlRTZsueiwEsa5mZvc5yL/Bf+K3KSSi1Qu4poLp6w4tGlZmUgWGTmFRKY0FDnEzGBmcG6gz9379K33ycWHIXWgZFnWsEFq/6pQjeq9u/fau7+9n7Xew/NOLB0EXgGwmFjaQdqVPUHsAavANLq+9EdEPFXyjNDfBr9JVwy2S2cYUwkOkP+d5IdpnTjiFPtA0oYtixgSOha+aGjCkYgi5wQ5ZHoW5yWvIsnwwHAkawr+KPAe0vcnt//PF3qg17XTi4NZo9cV2oa8ZPR5gg3BSuAj0MLBLOwJ0m5EHGnu3ZP9D0/Oct1nHoofz07LnLJSCljZl2MEGcCu8DryisU80isWf9hLbYwO559JwZddTxTaU+Qga7wEoIia6ewMCp7fr5vuIySn2SudYQHP3aPo/s8+3fQfBx4gJXiSaEvBxUSSc4QVlpXWnmHLigM5Xw00AB8gXqpdheue0MDWFPklig9sbchaSekczghpglkHdsNEKkZSHoaznxkXZB0TORF6yeKyqiBo09pSMjU5UMRukOuYY8QUdEXUxsG+0OtG94SHiEtkJJFj0JGIkdOzbNVX4WUAyz2J61gbJXxO8vcdKRBZyquBr2Xm41Ao8UxqvmD7A4u1SG3aPHPwsslX1epKDX9sl5NIraXq1TJTH7HmiNNwzmuJfm/R/9L2z+5/d2d88+6yk2DJi8i1a+/0jxwDSUcUr+JsbaagCeiXJb7krvDtZ0Arf06pylPMtySmiVdkHVs8kTUCT9yF3D8gLKNf6vL1TqNdSd9x8syRr8rxBWD83BBnJPyJQz3MjtBu4hZFBp5ZXEjiFOqGxT0Z2SrIB3auGDaC6KVyYelid6TVIVaKrEIfWi6II8P7z1YPnvxYX/i/Am07U/TH/bRbEYdgZJ0Kr7srJpjIjDJiF+cct62Leme97jMX9mlbFs1Qi6yMCZ1i90VU8Jqkhc0TSRdS/oNIbxLsrKxsfyahm51tphceymEWFJ7VzDEEEvu2NhH7f1zgO59jRX0u6CV94OjU0o5zkg+gu38S/aAuwrlrR3QRM3WTfYHnLS0GNoQipT1wRMZBkIAGgBUMle4ZLiMKaFedsf564lWZvYCXHbEXcB7ivGVhnzi8Jcco7N2UjiS/ZtMz+QzpdRF9p1+WNLV5LaBJ8igkYW9kuC/rkuVLMi1CSRQlB5DHSNcgj5wBXf/ikdPqdjx+SdULRczJvILiwFBkjTL4fMAHic9F+m9DHFpuCG/KOs2gJ/M0rFeNdyS2Ew0pWpcZCU5B57Dv216zuLp1sP7bL9248f13/5qLLJcs+Y/lsJn03a49ZNC+0lSN0wyBeZAXLb1uextxFRj+aFHXH4G/jbXn4FToI5Mvh7WX4sPAOxZDTHH3ufEAVIynsluQHCoy18F94CPs4tBTkj6wL9jpap6ib9cBjhOhgeyB0IMMJcklkz2ZS5b6QnsZXBVal31q2BUaIB+n1ILD6IMwz+hxj9u3X/j6meFwM6cxfyz7HGYtpB3DRUMLKsDI+KnsyxH6oKbJljN30DvbUPytW83mcV2pcK4UNULXLVXhNZ7Pu7U4VNIiTYH7LpwezmZH070P/vqN9u/ezf7atdr0cpguQ6V6yLK1IXGA2Xy+DoXom0hARKwEORKaIzZJN0KJNLe12bnneQ0zkpiCNyylUMUyBkX0ugvFh0IDwdDyzDKIHqF1mRkGQjPJM8GkG3XrFRTHyCMgMSfYMuob73cGFfS78JinslqZYthwl/pYADPBWFLj7oOmZ3kfAne7maFFyh5391cItjErBFOs6w76Mmt0rhfIfNFSH/F5WdkV5/BFSXuCzws3Fl9EOrI5L/sKsG5RBK8Clyydw3pN8LLEa5LHCSOkbeACaIL984QI+DmhE8lZUP8oR6P1l79w8Nedtlmy5D+Gye5/uxiff9gfh0/nNcelUEB/C8XPAOcwX0B/ZsobdCNVHyO+YfuTEM8kHpKcCJ7gOCjJfYJt1ebbGXlBaFN2I2kIeipxiHzP8peEXqIrkDtCSpwJ8bHkj2XdM/7A4UaOE0X2sXrGzxxdxNJyAS2kQPYUuNgV7bmAnllxABqBHoLuyR5g3RFMdsr2x/w110l9FtSXL69r3mwIbyC/LtSzTXcqIzGH6iba3EW0mT4ugzwZbt6Iye6dMxsGc6bCfmn9jdE8ynqDzlXH1S6Py+eAdXWn0aYL++oo7IdJeQT5dIvB093dO5/JRTH9/Pm6thgO7FiL4kjoSUzdtZ4QeNS1lVBBiqBn58TWIkBJnAYsCLWQ65INMROeKzRJlb66qMSEYMNiJHkOnkue0nkoY/kQxQp4EWLd9j6hTYkZCcbnJKaSVmwNHIxwBHIviJHESNaJQ4mZgKfAJBytpfNIIwRS7Fo6L5hgTSUPjduQji1S8gXQVBLd7GdWCM2ELqZ0IHSEuayumKZv6UD4CtJ25y4lRZcrXFNoi64NJ7BbSWNgM/BLEBcd7CJVmTcsngm9ihgHjAheBVZBVxR6Pey+0DowlPgisAleAb0GMes2GfGasrarm2/MTvbeP9Oc15IlP+QdT968Wscnfl0wxvo54OeRbgBvoB9VKKe54L7gnwnuGf0h9ntRdOrwfkiLGnoS0q7xh4q8GilZKsAW6Al4BLpj0Qd9TmJoeCaxDloIvodo5XiQ8CikhRQheQV0bGsaMLc1el5Mt6Eukjk32gT2hDYF94Ee+DDsA4p2gCM7DnrZfLc/PX1w+P6/PPMJaH8ZRuPPDZvi84EuWtEKtiTWkS7aWFCQjhw+FlTEw0Uz2tn/3r84U/O5MxX2k8fv183zr25WfD7wXFJfeAhatxlInDz3OX7PoQy0kHg4jdPTz6wC+uHDbFavUcLjREPZxcSmxAEw7PZqz0/t1maiU9x57ivYDDOv0ljSQskUxRygG2jDUPYMlSnBJiSyWyvGmKHEDJUZyikEYa8IDREymoQ1Mz6HGEnaJ7WKfAJMRUyQh7JZBBh4AAAgAElEQVT2sadWDC0PAkaGaaBNw3OB9orMrsJTkvPICE0ttrrqXPYhqswFJCSPjSaCFcEz0DkLhT0Cn9JVvGL7qdRVjwqwNVYwQZwgH+M4RqwqdWxRgEuCHdCx8CrEJqaGmINeETwVvmD06ellBhrL7lka0J1uriL1u55bI+IT8OcErUNrsufZ1P7a1vU4+Qc3D/nOsqhuyVnzVjnfP/0ZV20L/aeINwSvIF4DLvEnfeABpkLvGX4f+V+H9O8y4x4RBK5J9EI6Vaq4uDZt+zhLb+rkXJhnEnsW6xb3JVYCjYF1wyy6drpdwT1JY8n/b4TuGKrRfmYeRWibVE/OiYsWRmOkc2ACHUppo33BuqUDxCPEXkgrTn2grDtGSbYf9jdXDu5/71+faSvYfwgbr75RaptXohBpLjzPrZ+XmNOJemv5Q1knJh4WadqrtCfPbh6eZQHvGVfFvxWDrek4am2I8pLRGvA5dZ/QI5C6NgoWgjn2R5FaW1nEh/v7dz+z/MzW+HxoNCi4rErqkcwpohtOowFiFrCZ8kHYmyKGhpnEUGYWsEApFN3kOudGl1XwoYSxzwnvATOsFmkoc2C0iXLWFbpoZjS0ODCahnyuE272OxEXiAXQaTWWoG+xghjK3hcxlRhZmhhmgIzpNgseyZogRoGmlteEnhnG0b3Bx104jU7QpQUwlHQiaWZYMSK62wAb6RSxApyA+11qnnGgVUG3CUmtIkZYpwoWwAXMRGIV67HCl+2IkA9S1OfFQ09Aa6AeeEIX3k+g9/zrPmgscWC81dUishHdGqdKrlb5ZGVnWk6ffrj7WV03S5b8Zdj84sXXCvoSii3kX8Z8EbEG/Cx/UtSP6Bw5/1D4I5L/zdKjovpxrc2sDOpeVlxgHrX9aL7g4e7G4b3VWW+4qGxE5zrXIm8gJiHNZZVU9oSeSHpqcQBuQUNZHyTxfeRW8NRJLTRkMOscQPU47UMFPVltBMfIM4i5yIRyXMIPeZ6gzOq7RvthnaZzf/cXLz04+s1/+hNV83Kud7FpexpJ2gStIV1AviI0BhtIiTRxjHIaij2xODp59vW9s1z3mQr7tWsXB4t+fyjq5UTbAZeEbOh3p0D3bTeBDgwHIR7ZenKysjiePfl4+lmt6+jo4WJ185UexZtJCOUI+xydsO0D8vNTuxUz63nOCRVLs+B5TZwMSM8NIwZSTJ7bKn4a2h9aUWVOn59yZwhJTMCbSAfPDdyiO20zNBoLT7FkOCerwdEDrTooIGTtSzoPnkga69NTu2ILS3T9pAj3FNo3NmIoNAHG3bCJmEtaB0KOU6OWbncvw4Wwnzq0grSDXLCOgG3Bgm6dM0GRkIWQn4JsayZYCXkGmglNutCjJLHWtf7z2Obi8yhJgDa6YkOmmI8kjhEboE+AEVAEt42rrWfPP2zeBSaCYyIegvukrgy3vvjRWea+lvzN5tzn/uGrTeFN7F8Efg3zquDC8zD8p8XMLXBCF6F6B3gf809odDcX5ZPkdG+jlsOYzGY5bo53Vo4eHb/7fx9N9+9OefgwNy7+zCiKpUJN6bJQMUxsVhU6NV4JxxRyQ9Lc5j7iNCL+PzS9M1PvqJd5PgbsGJeopYp8Coyiq7KviBPh/aQMDUb5LFLzDM8JFgUdU8ozqRw2XpzuvP/rj/nOf//C9qv/eYy2v7QF7RZRXgJ93rAm1E0AFYZIofuyd5Eep+NAGdON139uevTwvTOr7TnTqvi712gvPZwMq2Ki9MjiyfPQ6hryoe1ziBZDmBPCadVJP5vP/AVrpu3xdGW4G8klo4XlA0VUZ5Ywmyn2u6/5/GscYJ/wfMft8KaN5GwVFGcc/WAvLll434pzci4ccQ7o2tHh075OI1YjaVKx31XXG9l7jtjEDon9548GqYESI+3Rie9ThGzvOkKRuYVtS6eCsdAuSLYv0JW323grpBPDtAuBewcrjC8gnglv29EF3aXzkX7ibppT4zCgY8yKrH3EhpNT5BOlx4o4yPTrklvsIztaRz42JsyxRZPEDKsL1+Oeuwrcgy5c3+XwCZ0YPwQeWznrcoesGUZhpaQdo5dNvhaO/8vhV3C+mi7fbJRPStTzwOFnff0sWfKn2fj5/+KcptMvYF5G+hmsN5AvuJvm1qMT9JlganiE2UH+QOL3ovb/7bzmbO+D3zwC8gdhp0t/ZkCUjkpjxexAbd9Ny/0MmqKur9yZE4U+MVxKl29jaAonTjY0KO8//fbvnl5549b5mMy+d1JX+o3aVfdqlGz2VNr9RZaL4TxyYZPUOs6HSJYZZKP7UHC2G4te87hf4tn8OJunH/z60YvsLvcXIU2spjdycgzcE3q5Kw5kQGqucLXpSU6SlwLvZ6PyYO3oTCMTZyrsl3b7g3mTtbT1ikLzdI4VhOy+rTlwjDUynjkYhtkobl7RtHkGn21Lwb1735pe+vyX99pS1yH7sjZkt0hTWzNkJ6qQpMr+p21tEWySHCi1n1IqVOy6qaB9vlE5kd0aJOeezabMPsGGrKllbDYRB0pnSt1GImKPTBPesHMvHF25OjlQaKHIPWecwz7noDv4du0wG8rcR8qU9iNzK8UzwXqKA9kPhAZdpkAbz/vqz1s+CLSX6GIoH+A4ARZWbil1aLwuxZrwJKVPsK/K1Ax9GM5XZe0ZV4gTCaXzk0CHKW+H4wMiA4eEL2J9T/glcFd5X/1HLhxBHCrdIzg2rJOaWkjmsqUPlVxD/hbEamedqUmG9iLzASpPMuprUvy+7L0S+UZNDqM3f/+zvG6WLPlRXL/+lcH+fPoLyK9hrj9vZ3uNbgRrDz71veCh5feweoT+ZVa+0xs3v/v4e9/40cWff9arwYfbs8PtneZCXWRte/FMES41r5L5nhXzcPaTfFikAY7wvN0p4e8/+vZvnQJ+8N47T4HYvHZr4MHisUrvUZaWaS2DXtYWcSFb7TQlCjCIEvvM0yhOmzpdzFl9tPfu6skPB0z95mfymv4Y0JzVGe2pFboYjlGXumADqEjp7tCxntgq8YDMVOHw6p1Z7163UTsTzjQU3195feySo1I9B29g+kKDtLdCNJi+grnhSdiV0DOHH8yHs6ezv/fLi8+6EOrcysWs/TJEuhJ0FeY25yJY2KzSGdPMwt60NOsKzTRMfGoFodwCzyQGEFPJMxyrwvPnE1KEygxyA0mIhmQmNO3S1oIIGWZhzmWoVRJdLpkEKhGbXRiILSt2BK3MMylAPpZjYWkq6wRncbAjx7ku7K5dRJ/CPuYY1A94H8VTzI5EazyFSJNPQQnxEfIQ8T2CXcEDcFusT1I66orwdYD1CcFHdC2A78tqCDek3iccECPs+0hF8qNE+8J7odgNWBh9EPKhMw6jM+/ZBw7B54r1vuTTsO4b9Swssy/Fe7gi4iOHG4n3Ax1H+CDge7Pe4OH5WX/6WXVULFnyo7hy86vjo9nk70bkNcxNBV/EvEwn6gfAE2APeCD8QZdO4n9X8t1hE//u4bu/+R/mznb3ri+uXGunNFVV034NqloiYlgjj6NlP2myibqbpT4ZTtonD+7+7p95jOn+3enp5b/N5t5jPb55dTr++LhXBrU01Qcu/Xm7YN4OmsfFk0R17+nq0eGwLTz7/m8d/bQ4P65cemkriPNG5wi6tIZ1vvP68OHzIsKPhXZt9yUWzDl+9Hqze5ZWuWcq7Jc3XpVLXTfxORQ9xCXgNUl94AAxBhadXvIeZlELD8uiqZPf+eefeTj18PBXvHL5pLhGMW4CrXV9mrTAEOkACZmRFZ/2dp4Cm8UscPRkZogZz6vdJM+NNsM6SVRFnsfxALDtQ0LnZe+QMSc4LzMNddOWorOGfJRiNRRzo7nkXSlKwrPAa2n2FUyF5kqNEn0i+dASJh4Xe5Pi73S97lo4OA1zmhknhB5mqgUXJGfqqBsA4f1wHBNxZKttrN107AZWdjaRrUo8kcmu3sAp+V4mR0U+jAhZvhcqO7YPFdHY9fvhPKB7Ye4bJqXEUa36JBot5ExJMxWdVnRSimaW74fjJCkfRdBWc6Dgw8i6p9DEEU/aogd95SHR21XJB15wURm7rctw/7v/6pPd3TuVW7eaF9mfeslPE2+V/tr+ryl82egXBa93hVgk8Iiuu+P3bWYhvml0hPi9wB9sevRvP3rvG38lz/H9/bvt56/c9Gw4l2d1kGKV0j5k0Rv2ep7Nev1ntZlPS+vpow+/efrn/qKd79Sjo4cLbtyI6Tf/j+nW8OX2wcqVyUoctc/eO787u/h+e2W+Pb33/d865eHD/Gmb1zBYf2PL5IpCjdIhsS6xDfQj6APzrnuL3ZDAcezCwent7d2z3Nyc7Xi5G2/1L7T7F+T6n5h8GUIiP2fiGp14rgqnzWPE9wXfS/PMWR/svv/bn/w4lnjl5lfH85PTq1CvZC29hly3dGrllhy7aY+QD2Vd7Iq0AFU7VUrQJOpDHrkLnW/InkvKJAfOOC2FDSeN4L5LBkBYC3ciPQSOFbTRRt/Fm4L77pLm47aVo8k5bawpci8V/UBbIh/aluWeXU4CDXA96ox25OqcF0VfxSOIQ5xhax10DKBwzZbzjvooiG3B/dZxsYhpTZ5F4RLUI5tjidWs5fTT7wEoY9y57kHFszDDtja7vZ43gc46OjlZpIdlUHdLZSiFF9YgF2XSa6bNtJ/7g0l/i6rj7EcpzAYMhk8m9WjQW4xGvVzMV1k93GV34FzT3s1zxy//we6mjk9P79371owuJ/9TcWpY8pPJ9etfGRxo8rNGXxJccHCVdE+hL9ke2TrtZpLrD7ECODb+HWc8hP693Ttf/+s5vNy61WzvMNx5d3uyfWNn9Ol45sN3/+WyQ+Qv5Guxdf2dK+BXFOUyyjfC2jCc7zw9vNNVyvuTzoLb71PjjyjlUf9ouP/gwW/8+Rumz5gzzbFvxMOVrE2U4EjSYcJ5dcVZJ0gL7JnRimQbbaQ9LIXNedM8grfKD3M4nx0Pbg9nF18/PXDDWKKXydxyUxQfJjlXsKoaqaIPU57hXM+WaRS3bRtbJbSPQ1GYt5VGxbuCgStVhbGVOyLSJSPbMlPxyORaVTlonA8B2hoXwU+r6sOmRqlmXggUdYc2xol3hMeReRyl2XES6ZxDb1XKw6CZt9aQyAnyQYMupHxSF/XDggdVpQ/1Iyjr7tUo1GfQm5YsB63bR2UYC6aL3aCdVZqB2phXctaXp23Tz2zrExjda5hte5CPdaqVhWIaTa42tbdYMB30FbPHb268ywcfBLe/Wi+9+c2Rj7PZefedQ27ebLYOLo5273z9CDC8VW7coLx75+29q1d/ZXTvw29NuPFWn2+/Pb969Vfy3r3f2uV5uwBdGx98APfh2Wd9PSxZ8pfi5s3e3tHkdeBaWOcdOceaWLEtfIT0FPEUYq7kk1QeBrxf2+YPVuYn83v3/hp7vd95p915XpO08+7Z253+xHDj7UaLSy5y2EzTOjLaBtYlV8wg7VPJkmMPxUz4gnORdaSWbkLemXCmJ/btG7cuu5Z1JZes+iroisxrRhud8YnD6nLIsv7Q8izg9xZt2dv74Nz9H4ewA1x688srms+3W2ug9ChpZsirUh4qPUpFH7dH0EfOURS1bc1ass5pepeTuhMlKwxgvrCKVtr0yD2Oo3rUaPA023lxo5KVptizKE0usp1HU8bZ1tPsRRnUKNlrT+s0e9GUsRofaBYr0WRd1Bw1wVTVxwvpQpPtM2u4Nu/RxkIr0L8HgE82Fr3e6bDUHlNW3fROS6t2Vufz3gptb28tF+eOol/L4P7l2uXdjo60sTNaPfj43+xfvforw3v3vjW7fv0rvTt3Vlt4u/5ghvpzbtx4qz+bHevOna//6bayT8V4yZKfarY+/3dfiV65SOWyQmPbP2d4LPQ5wdMEEKty7knxcaj97uPv/vYfwNfiJ7WC/KeRCz/7j16inf/i8+Loq0g/A2yALNy3KQQPZPbs+INO8PNh9eiDv7aIy1+BMz2xr5ywfzxkXeGayUnXgk2VbewktPr8rvczPMLabzNH/V4cwg3D2z+WdT7+9sZ06/pOG73+rGg2y8xFtnHSC/Wi8X5mDtX4oHE7qIW9qAwVsWAQtc7qJHq1805vF5eqeBqlPenVUW1ca815tL1Jkyql9hcnzhUNcrFWi6ex0CaePuh5ZZQxD+ZNWjq3XuOjA5dB9qfhwcr84ixOngxyZV5blbbWwXr/48e9Z/NLi9WT/d6zObdvt9evf6V/587XZ5fe/HLd/fY3TsZvfnnl8fvfePSnnmonvL/6VuHtt4/57g9vOOiKe7h371sTgD8u2n9c1AHeffftPy/PthT1JT/1XPjCr64Vhk3Wec1Qk6n9IB9I8ZLk72CfhDhIyoVa+H0tcn/nzm93G++lqL9QlJwM7d6uw5vd4BevCs5Z3nFyIrnacZrKsfBLiX6/OI7G0/3F7hkeZM70xH7uc/9wo/R9yekbodxKaxBwA7DFJnCM2cI8tfxuwFOnHpWm7D5e2fvuj3cs51tl6/rxinuTV1uXh2VaazSjjN7xSjspk2Y0GMW0zbb0J32OB3NWZ9lOYnx+bV4XM/V2j/JwY320VlvNPJ3XxSicrXortDtf2p7w9tveuv6VVedCe+f2Trl9e3HhC7+69nR1OgW49myt/GkBXbJkyYvJ1ue//Er22xC5Fq1WQtpy+FzW3CmhYniqlv3Wzc6n7/ezXvOSP8XNm73t05VrdRHnI7hm9HrAmvHrmH1CazKt4SPgPvIJ4r6TR4Pjo48fPLj9NzPH3rOHbUtTginmWOY1pExThRO0gbwQPqCbT44jTm2LtbUf807ohnfvfO0Q3vojuOFLb35zdKGuLt59twu3XL/+lcl+f9rffalOeOd3juBrun7993p3bg9b+I0uZXCPyY+MzbzbffnToZun3/vdH1TE3u2sJZcsWfITQG+F3bpYrEdtSpqhQ1Pw9xqXfTnckrOnr+Rj3vnNF3506d9Ybt+ueuPvj6PrPkqbA5tXkBaInkztRtO6b8d6mGcZIWeWeuG8eHB2Sz/TE/uVm18dTw+OXw9xTcEK6Z9xxFXMSedyRkGeQBwY7hb7YYV70fdHG7PR3o/I4f44WOaJlyxZ8u/l5S/++vnWi/XWzbyXi/mc1dmomffuX64HvPPOUtBfdG681b9cd67U5GoS2+pO6tcdDGUadWbxC+SFrY8l7cn+2OL9/urqJw9u/8aEM9KKszux37rVcARNE+vONLYyaJU2ITu9i3ReqN+NG2Se+EIp8dCYO3e+flYn2KWoL1my5N/L/e/+62fbN27NPBvEozu/9cNo3Hf/gh9a8uLw7o3Wb/ybqNm20Y3WPiGQrCGoptySSOJY9i74IGEuFcfjp2fabnt2BjV372ZvfPmympyTZUCwiuMK8rHRFXXexoeYFUkTQYKe1Ig9OfL0517bX5qMLFmy5EXmdOfufDl06CeTKzfXRov5dKspMe4GXvGyocoKRAbMLGaB+kTsWOw5o0o+iF5pj5790uysTGriLB70U4abG8/qoterXf48sU+EBsIDG4W1jmTjvu1dgMYZJdVeee+of5ZrX7JkyZIlP73E46eOSguyM7dIGUAibYrtudA52wU7lRo38ppaV47XTn9c7dg/cu1n9cAAD27/xmn2fKJwVcoOHRvOC+YhpmmncAo+cmhdnY3ocFayTobneme59iVLlixZ8tPLvUvzFqBmjoEDwSwcvZTaEFOkS+De89z6NsWicFxV+g9eenCmxc5nKuy89VZp7Aul0lSxItMiHdqcs7lKIKM5sBqmGKZOn5Q2xv3VWBafLFmyZMmSz4TrBxcjC01YC9CVjBwbnyrxc7vvhm5E9vmUxjYnoKNeWUy4fftMB02drbC//XZ16hGArAVY2OHQHPlUJpErcOzu9jVFpIprb/domV9fsmTJkiWfCUfj2jg5VvFIaBFWgNYd3gj5FDMApeEp0j2lL4PXsokJN26caSv52Qo7qJ3OTx2aIK9hrdsqws+MXgUuY07Ba4RHJKu2NlwXpR02q//e375kyZIlS5b8FSjT+cg9NtM5N+4l8vOx2HtGryAuYY+FBjgDRXVbnyxOmPLuu2caUT5rYffBL790SC6OjSZWTkNZcLcuyVvAy7Y2lBwEehrReaKvsnpmPrxLlixZsuSnm1r7oQWrQcxDPJVzD5zAK4JLABL3BINQnDPMUqU/WO8v6MbynhlnLezw9g1HGe5LmUK9bjw3q4KpHZsSmwRHxvOqqKHYsXqXp9P9s1/7kiVLliz5qWShMo2iPRSZMLNUUqrPQ/ArwJHhXOLDNG2IaTTN7uNvb5y59fcLII5fy2n/dD+kpxY9wxyzLxjTTc/5vMxlBYNQbWxflerRvDdeP+uVL1myZMmSn07aQTYojDNkLiFdkf0a4heNCzAUPA3YRE6la9+5e5Ztbp/yAgg7HJxvjmpqL+Cp4CnBBuIQKYHVNJdsFZuG5HGSs7nr0vRhyZIlS5Z8JvQWs4thhoaXrTgN+wRYB4bAADi23bMogWcUPbr/3a39s111xwsh7LzzTluSZ2mGWIFZAcCeA1bws7ZeteKcikdys90MFpUXZf1LlixZsuSnil7WZ9V1bvFYrq3RAPhbwEDoVPYG0ktYx5hHWjR3XoTTOrxAwjhu874Uf2R5C3RkMwa6ykJzSeFfEF61Q2k/a2oM4a0zHWKzZMmSJUt+Gnmr1EEpyhg73RP6HPbfAy4Dp8bVXUR5JmiR/Hh4/4U4rcMLJOx3774zrQu9b7jTjWzlEzoDAIOE+ZLMNSu3EKsRxdz84IVZ/5IlS5Ys+Wnh7dpb0FruSVwCrSNu0M1XqYiUOHH37+4i9Hu8++78rFf9KS+UMO6NHj5S6pPOh5ct8Ck/GC2r84abtl+R+XwGq5vP1la4efNTa9nn9/vaC/WclixZsmTJC88Po79vvVU2r93aPC2xUgqbEGvGvw46TxdFDjqNyrClmk/3L+X9M1v5j+Dsprv9KHZ26vDcK5OI8kXEJeAiXV5jhe70Pg60m+jjTGY9l+PNHPaGl14r/ZVr441X3ygnj//HH+yaLnzhV9curn0+9n/hGlf617Z65y41vZd+bmW28/6EW7eabjrcW+X5BB798Hs/YBnqX7JkyZIXhz/nM/mtwg312NmpAFdufnV89PC9FjodOH32yfzq1V8ZHf7idbZXro1Pd+7Or1z56ricv7IyffmX8upgox9b11fXXr7W9O+ejnorDLXgqqw3kd8E/g6dDrXARGaq4Nji3xCLf3F6+3cOfjxP/y/HiydcN2/2tg42/n4J/zfGb4KuAJvQ2feB/x/gn2B/n9D3G3nWqs7aSZlEwypO1XEe66jxYJDnsonJjMG8n6cDRbFzoHkwG89OS9v0zy16s521vTrd2LhaZ7Nj3dl40gn77dvtpTe/PF6cllIGk2wnTdk7t3fK7dvt1vWvrI2n+4t7l+bttWdr5e7dd37Yt3jjrT7vvv18c/Fp9OBrS/vbJUuW/E1EgLvPwj/5OXj9+lcGd+58fXb9+lcGdzaeJNOprh6sF4DF1lo87j2bX1qc788O5739u7cOr117p388WPTaWa9caEaTO3d+ebHx87+5MdR4Pjuc98bzo/l8bVjaWa9swnRvrR3pqPGg9Pu1OZm0s96fOMiWfqxkG8cAdVRKnMxyUPr97E83sqUJ6RrELxj+a+AX6Q6XAA+AHeA7gv9l54q/wTvvvFCzS148YQe2b9y67IX+O+AWcBV0DfxpiP0Y+CeG3y4R30/nbnFZVNVeVp940ERDOy+V4VThxr7Q4GcAziZqmU1i2k9FsXrzMW09meVgNOi3MV9kbdT0Gep4flxnzaiO2kmZDJvam1vDrHHktVa9udt21iul17y06JfHo0XdbMIHM0/ndTGK/mq0j+v9xbnJS6Nm1NYZs/7hcH50hSu9PDm6+Ojntz85d3tvde+D/+xo+8Y74yh9AzyuGwvefXt+5cpXx+NxW+/c+fqMH/6NzmSu75IlS/4Gc+tW04nWnxXmK1dujh88uH0KcO3areHdu7fml9785ujxt//O5MrN28MH0w/ardnqsDfeqI+/vTHl5gex+WxtBaAZLOpAw367KEW9+ThnZdKW/mTRzHujWSegOZxHOymTvspgIQ0G/TamU/YHpd9vS9sbhqbOqmky7Dc080W/9nvzAlArm21tdgf9NmalyVI9bKhzgFroDmJzLoeaw6raQ2HXRZHLRUeeBs0wqZ8T+kfAfwmsPX/aM+A+4mPgt9T4f9h5951Hn/0f4j+MF1LYuXWruXBPv6rgLcMvg94A9+n6Bw3+fUv/K/Z7UjlA1XYE6RPkg6i07nFVlf22oW1aGpdyqkVN9eKisxZnRInyiaLNeauVfuMTgHRZn4cPevPs1YEG/fTJojajpswbsn/SkjOFVhrqPF3WQ/Uw2yit27n7sRE19gbkrNZ+fHrBzoceltpV+Ksssp2USZRcK8NYAPQW3W3THM2jtKv91eH+8XQ+VJx4ZdaUzKpZDuYr85P5YmXt8mg2fzht6tqjjdP9C8fD4dPvXTnl1o4Arry31n/wYDiDG/7BG/HmzR63b7fwVnTtGG+VP9mW8WfftEuWLPmJI4B8LsYJ5Kfv9WvXbg3vXqPl6Ejc/mqFr/natVuDu3e3F9s3dkZR+h4dzuvdlZ1c5+rqxVmc3Nl4ktvTtfPzaGcrs6bU2o8yGRzneH9lloO5s1Xpx0qd54micRnMxnU2OO0rBpRcnbe0g34bk1570Gs1bOn1h4vF6SJ6fdc2GjX9aLLmrEw8rvpUaBfZzvsNTV3QuFeiFk37bZRZtBkLr/Z61mJRslcWkzYZ2iUaNG3RIBra4sUCsZoaTOui7QcaWO1EpVdV61iOo2zylUjt2Va1FtF42xmnUqbNZrE2UrwJ/OfAL9Fp5QRhzPeB9yT/Tztvbv8r3n4xWtz+OC+msAMXfvbXXqLt/brKTL8AACAASURBVGOJLxu/CnweWKULhzwF/qntbxLak3yg5BKZ7xHNZadPASQfuLApM8zUnopHTp/g+EGBXRFT2wKolO2i7JHlIQDKNTccu20nqLcarguAFFOVGBfHorrOkV/CRTXqTkNvptqOK54FZVvkoVQPs/Y3S9Pu1cpmNLSuKm3SelCO+guarG1I4ZacNaVsUd1tIqSXI/0sSpO1zCaK4ja50K/NqXJ25KLVRr3DT3euzibGfZ+06Ira2aM6KKXORqdR2lU1i+ztrR1Ox21TBpPxygn7TTMywJ3Bx75UXu7pdDI+HYzrxVmc3Lk6qVfvzHr37l2dc2tHl3b7g97uUd67963Jp2G0C1/41bWnq9NuB7y25hctJLVkyQuO4Gt6vrEWt26VGzvb8e72TvLOO20n0tu+dm2nd7LSnWQHB7N6b+NqZXsnz33crPRXoy3T+Wiao3k7yKZMai29SdqD9ehljWk/p4vTRX+tGbQ0/VhkrYWmVNqmNovJUO2onWzU8BQgF6VIuZa1fxKNL5X07rxH26SH2dZTuy9FXVNo35kqZhhNvy7qYhxNLBrq3E5lDBraxUrb0BaXebbt+YbyJBuVyBw5a2T0mkLOUbjmYqFSxmpronDSzFCuFWm6iJpRaSObUUb2VGhxrquyn4p+ZLtAYYBqj0AOYi5lpnS+s0NhqoxxNjnHHCPZ1kanHzmuboYR9SIpE14H/RrmvwJWkU6xK/AQ8wD0z0s2//Pj97/x5MyunL+AF1bYgTj/xq1/EMQ/tvzzmC8AB8AlwT7wKOGfgQ9D8STTVTCUtJfkIBy7LhnKUsGrmBOXjCDmSfaD6Cc5d7IZjl2AWrQo1b1Pfy6pA2C1RDxp2+poNABwlhNljmk4DrhAK7fkYTQMs/WsaYpc8zRVemGPHLWgskpNizhEmWktiphm+BxAIZ/ZPUlym+0lp0+a0pyYesU1niSaFhaDSm+mqBnZjKKhzdqWpJnZVpQ6DjRwraco7NCkhnu9LAG51lb2o9BGVdviIfhAwWrJWLRu58UMa8T56A0+ysV8K5pYxIyD7EcBKK3aWb8daRbOlelRb+5WTW/FWdWvZVGH/cnitJSmzkdaK8eL01J2Bx9Pt9nur5zQNs3Id+788gK+Zm7c6F072Y5nw7Jy9N1f21tGDJb85PHHIl3dKbleufnVUV3M9Pjb3zjpImVfrVdu3h6OD9p6MJj0draZbu8wlMpKMxgfHU/nw357vOivbtV293StNostFHZy3HN/vtC8H6WXM+Vs4Bg0dboAWESv70z1G5psu/dnNFmdTcxb2iisRDNvFzTz0voylEOYk02UQvS1CLvxibOGMsZWO4mMRVXpK1gBS+EajkX+/+y92a9tWXbm9fvGXLs57T7NPTf6yCSd5YIMlZEIiQJhiSiBkIxUj4l44QH+Ev8vPCBI3ixRKhqRkilAKoyFIWynnQ6HM6PJuM05e59uN2vN8fEw1743bKqKAuysCJRTOjr37rP22muvNedovu8bYyonrnQtMYrHcO4cdFnLY3R5oPQBxEnCS5CLcjpUV4VroBkU4XpXzTyKniq1TDU4XOmD6GKXQ04pEXLtHVoHmjkzcETirYoP7AhVV+QTo+cmT6GjyJ0j10oGW4skdgVvK3VWQqVmqREM7dx0WcsknDs6y46QMqk6Er4i9Ij5NfCp0X8AvAVUYAc8An8i+KM0/+nLP/23//E31W59kx07i7/zm+eTbfefQPw7kE/GDWK+A0yQbjF/YOX/gPlFOJT4NqQ1WNXRF+Uk0UzKQ5nB5sGhUsQmqy4o3Led4/IGwPITSTc2DxJHduP1A+1sLRTqod4nsVPmoaV1m7wxzeoJEY92XSij0uUdgFKHls8Rn8cQUwcl5WnYc6s8E3WGFQ4/KuMAdA8+TrIPcVbTq6509+m8yprPVcqB8LGIqeQvcvBE4ZrEDnFcpHWaeYhNTQaJY6jtWswc4qRmXSq6oZA7Z4noGEye1OpaItYo36oZ12EfKLS06ynmvlKuRP+ZIo6c+bCPrjNi7SwxCW0GMyuqU0XJvt8tJxPO+iFuACZdnlfPXhIbu06iUzct3t1V5Ulfo48yySHqhHWuouMvbctbZgyL7cHNaraeRJm6bh/ieDvpP/30oyZU/PB3Cr/3e/1rThDgh4UPPwl+73v5TekI9avxL3B89FHXoOjvjRTVJ9Eoqt8WH3zcXfF8+vzjq/Ubv7GanzyWAdqe3Nt+eNLl9rqrMffhwWPW3clAN83Y3GmYnmZM7sq6HiuG7GrpNdHRbsKgzc457SJ2Q8ZkcgCQfVkr8niPEkbJals4ZcciJrGL6jpkHHaFh6FmLeFzqdxW152zRFGdIo7rCCVLHHdFZaiuAIrIEpwlfqn0QRK7UF4I3RmfJLEL5y6tPtCsOncl6GwtIlhmpZPkVE4BpFLl2ivjMPE2uthBnjLIGXkh+AxxDByb8jKU0zQzWb3CmZXO8lbiDcTnTrogJo5cO1VK0FUzB91h3lHkz6kcU7hX6jDxVI4DiWUqL4v0PM0MyU46ZWsQk/auhLvEO8SbYb+0dCHrptlyWcFRzWaPitwBVGsoke+RzpRSeIr09zD/FnBA85P3En+aiZF/p5/M/rPbj//h9S91/v4/GN9oxw7o6a//vd+o0n8s+28BT8BbEWfGW8Mu0O+Cby1dO/0sgjOsL8FCOgJQZeWgtIdrQZyA7oiM0eHL0oWUaXSvqqQDZ8um23tYAYTjDFDi1SixVKJpc/rW6+PHqLKFhFOjC0wFLOWSjOMMDThPQ97aKkbPJd5QzRcu2gnNMttiRRyH/MxoaqvI6h31LKxrG4FFKEJsM/W+7ZfFurd4R8Vf1GRQ6FDpmmjm5CHkiWGGnEhWZanQodOPiGPMPcXvkqwUDKZsZQaoduqVwjS62A1DtUoctkhZs7D6hnjICpa2FgVvk5gC2HVRVD5x1iB4E/tBinT6QaGjFBsNJfeohKKks4atBegu8bYLusHxtLM/6WfRa1tPJlHWAAO5jUlW50wD/XTa08ndXc53Ubd0inBMsnroH6Z3m9qfn0T/QHcGm0+PrpL5Jx4DguSjjwrPr4KPqXz4SYyUQ+VXgsZf5tD3v/9b05/+9Hh4+8PN7Au+6L/78qQ8HNHpsRxtDh/7g3Kyddbj7np5tzu5OCtsZ5tpLo/7WWwdszJooNscDTmdF9WpJ/6qz5hpG/YspQhPezpTT0jdqwwJYJfTIRkKdaoyqUPN2hXOqmNXwpNG1YXdRWjguKJZRL1pWacfbC2iY+70Q02GEnQ1GSBOQXclhrNqhqLSOXOtKLVByJ5gi4xDy1sFA7Yy6QLNpKhtrfrEoaLkSBE7Z64lJUqneUNWH7C13CnjxsXvYn2pcDoVtkPhCjo1nkRqk0U70m8ZP5PjoH12HhrNJFfQnWFDOhU6BJ+ky8ugLjBCrFNMlEoFc6fWCuZK3yZ+AnGLOJZ0A5adC4llmkFW2+OcNASpXCIZ+wxpiVlILG2HzEAJ4TyVdeNUoeQpGYm5V7gqqFm5pBm6F4GfRPG1rVNIO2NivFX4QNb7iU+FfpOWRD4a7YRvQc+N/7Ao/vNnP/nv/ne+wev/m+7Yufrgo2OG+C3sj4Ajox+MCvkCyOJ/Dfy/pXUjPJWUiXfKqBLLag3Y6gAXn0msstJRFEqGNqlaNOfwefOQbK1om8zYsjn7K879nPBDJkMEnZIWdZfC3rnbnEksnXmBWAnczoNAbS/5sAyCAvbXnoUVWCmq4IkyVkT7e5o5+EHo0ui5yKcmnoU5M37piMAZKDJceyQnugxy6oxnFpciN4I7ABMnMgeWnkuZThWLy7Aj5VXAZozsTw1bKVu2I940iIyvpMxqDR2Q8rmsQ4tNC1Rcx6DhMvEt0rgYfBJ4m+gy5GfAfQu4gJquxK0iD6OVOd5VZx/Sd0R8LvswFRMyv3R4IscVNIQkKduI+hT8hR0R8jmmJOWTkWe7tPK5zFySs2rtUHH6XMEy0AxbDalgUZOXCh93xIu90FKqqTKpTp9J5TMN/SEAc+5LZZ7bss55F13/OOxFRtGt83r2/ob5J2b1NPjp3+3h4/GZ/8g0I/GNNRT/3OOjjzqeXwVXz5O7O73N25Pd/XU53k56gNvuYOrslUebKOvuaB5s+gmdazmNwXXwsAMoxMydSlZ9B/QZ4p0oeZ1DrLtC5/SZig9q6kbBG04/yj5oDs2ZLi/VguGtK13KE2cTyIZ0KWHkfIWW1Ugi/1aal854LCXfS/MXAFinBLUkXZVXoXKWrkciJmnfdIV7m0VafbEjw3MRu3Q+VTvHO0TIIInPVPluKn8OgGQ5DtLZh3xumEVD3YbmQMGmw7pDfgviNuSJTYf8YKuE/JjEVWSuXbQjdfTK+SYdkW/IfJkqE1GNOYCQ5Gr7sXVWg6S8DOqlM545smBKWAuHd1gHALJuMnLAcRbtu17jEJLDPkvlEutUZunQAvJOyREqq9awDRstXjv09u+0D4r9aHSSkYPMYEYbTHpvN5oddSijumihlmSsBVvCZy071wJ8KykVTrdAoNl9IIldibrA8WBzJnKWYinFd5V5ZOk7wL8u+RFLhgfhW6MXwv8o5tP/8qs/+K8ffjkL6v/d+MY7doCrX/vo+y76j7BPJV3YnCGOEOdYXwn/vvG1YRPSOhkXp3KCnKqRKU+iMGTVheSVjSTl6yy7zTjCZyQrh4qkdGb7DcJWmLNUrCAd5izRbQE5fAYy6G48m1oUq75FnxbELa4L0J0jolHtIyogVgGzdOy+nvmHEQSEowULXrUAIVY4C4r2HWw5RlGgLdnpYIGRoNce6hJHltbYwpwjryBOrH2Npm8jNbX8iJQmZ5HjghCrsCKDeaQnKZYjRLYxedkCFt9ZfEeOnwHvgFdIJnOj0A7rsPFXfgZ6W/LnpI5SDLIT6dB4K9Rj3rX0KOfSwTsiXtICmGftWN4wfCpianIaVhkDoHubMxwCS2jTAo3G64VyCnJavcwbkPeOcq+sRw4e9gFG4JeGv439CKyEnsr8JBUTZR2s+K5Fh/MXQZBygk9QpJJlm0NeOelC+b6kP6ZynLCxuAz5WZp5JJ2LdiG9cKo48rFQdv1Qs1CmGX0XORlMapjwUttwdE0AFX3WYTZ7nLGdbpnt4mGbh7uT3Rfnnwx8/IMKP0r+csAg+GHwAeXd1Wfl7rzM42Geh1N3W29mZTga6qSeSb2Lo98N5dCTGlHLgdJVUY8srbPSddI7Rs+Rj8cZ34HelvkLw7sm/1wuc0c9U9u9cV7BhA+hIHmlmpeJbiN8btgIzWw/2tpF+D07HiDvLTolx7QpPsf5C4k3kthFss7wUyUWep7iGGkp+/uIJeZe+Cph1Rxp9kZTwdx4G45HRy7c9tRe23pf1qfGTwjm2F/KvJGSA7D9UsSUyADuE11iBcojES/d+ofPRN6Na/XEeCv72sEZ5gFFlT2XfWipYD3S5o/k2FmeWFoHOU2rD/vc0hQjQtdKKvJbCZ8hv6XkM4gT4d3YBnUgOXbEg0iTcpufcYxYRebF6Cxt+9qhRaTWlicjJL5Q5I0dAT5pFKXPDNuQJ2mW0dAzI9wcOgtozr/ZQstSEeqb2lwLkbc4Dgg/tmPyFORMls2OsshkGWhB+CHt3T5bb8EA2FrIutnPq72pHFGHBs+X7LHCqYKcURiGGhmqlzgUxddpP2mBkUrCXOljic7w7ws64zKK5n5uayf445r+Bzd/9uP/46/Nuf0NjW+FY+fDDyeXd4v/MMgfgE4MF0BBPMWsEA9K/c+EH0B3SldHi3Ib3ERBTsMlGSllIlZOOivOA79MMxdsHT6XYgXgzNImFYu2GHyeYhltsZJiBTLOABgdvCDafa1phy7GDLDxPA4RGSZOsSV51f6dgVi17D2/1hbXCo/nC2T7XPIKIB0HanWVWD4XujW5ELF6TTvIYV048h7rtFEUrHAsIO+xFsgrHBoj19pKOtpnSnmpZGnp8tUVWSHSiKXRJfJKaIfpEG+QrBBn7XNYY64k15RSyQRpIvzcphAsZH5m8f5oQIcMPZU5wHoYv/dc9ihSacGY0Qb81E1IeSfUCz+hWYuN4MnodN4i+TPEG0LXaQ4kPwX+FHEA3MnMbV+0twJiivkC8beBz4V2KR+EebB4n/QdijPhrc0j4gIQ0jX2GngX+Hm7BiY26zGIfAuzNDwhEPDHYTrDd2hBzQXwM2CBGWiO8srmLyQ/FUwbFMrG9gKxwcxoW0hW4BCYGjq1tV1pJaIAY/lTaxhiSEFiEnGPlONuigNoCtyDTwU3iLR5xHQOtjJPLP5A5teBj4H3BV9ZvmhUjUybi4OtIpgiQtCnqLIPEJ9hFcxTS33guxQWzDBnzSF4ZzSN5uivwTNJKyv3AcSN4UJoC/4SpFQO4TizvSYsUkcWNwFKqZKcENZ4318gPcUcj/tT3IGOjP/c1kXIjymOZI5AS/BJ+w4aSJAYgIXFV8JbmQND0wIpB6yJYGvoLDakbxXMbc2QVzKDUE+r9lnYyEEPtEtUbkC3SmezKWkUJ4lX0Z7jsWGDWXtcb+3+A+iUPe3XAgs10dqe2pNb9oyUmfuM2OJM1jXmTOGRQ5Ztn8m+IVjYWhs20UrClmE6R+5szpqda44XKi2bT6vNr4ZmEidSQz9tFspcZmEeaJrJsmX/LFK5BBZIS43BadNEsXTJ9js4U7Js31e26ET2LbPX/SgEbAipQ0n20ejMhcOP2BI8kfA4V/4NxNvteL6yFSE/Gl5Y/v2X3dV/8boB2Td3fDscO638TUP3wwx9T03A8I5E2OrHqPzB4s8Cb8G3SjmLdoF3Q80soaLacs+snuw5KKfKPtprXDULRxPNCd3aWoSzOHRtO8bosQlfHGcEymyOtgBGCzcB3zHQHLfVIll5ZXwhc5OKC8y9zDBG/jRUIM7CKMVyzNjPUk4pOiUryw3Otx8UDLbKK4eE1RCAuN0HI9gKOANlwr3wRXPuscINLZC9y2CujBVYDhTWhe2d8Ha/eCxdCDYpjhtUrwzTZXOuRLuQy+a8NBPeIhpPKF1avIrkW6aMpNZzuT1LXoKe2r6WdAjMRRr0pcWZk63EHDhtzo1ziRubHfAGcCeobnsmf0lzeO+Afg4+Gx15+75WSkyABQ0j7DA/Bb6HeJB1MaIKd8jvYx6BBF2Bd+P5v0drMVnGgCNocyTH6dASPChq3RN3NAstw1ywdqMaZuCe5oT37x2nxDes7fP+e4oBU8bAYAwIOABy/Jto96iVqIod5pr2TE6Bz4G3QQP4nv19FA/YK6TAvDm+vqEFKS8kn9s6AnravNN4vq+AK9AD+AR8R8vKS5qVYIZ0b3sijSWz4k2sG/CWNg+m4/U/IzHSUZuLfgurHwPStaVnTk+jKbvfBO7Ap5bWDQnwri1dP5e4JPXM4ZA5t3WNcgG6E8yFriFt0TUIHRteYJ1aLhLPMefy2GQrOLPjZbSgfQGj4MtNANyeD2qBWhbQkawkoGXZuUjpJmCRgKQbMi3FxPIB1nJPt6U1E8xkLQETWXIM3PZOHXLR1uBo48wSRbZEA8t58/WysvEKqxtgmUguo0i5tnVDZBYUx6+59cap0w6yy6v7Z5ImGBTe25ZGsTT754zzKL7OymUUXjahIosUk2gBLDYLJBsuw3wArIyvLP5M9rUUNTM/U1f/4Ys/+t0v/xoX09/Y+NY4dj76qLv6ovyb4H/V8jnJWxLZMjBNLV+D7gJ/Yrx1ao0icUYpPGTlUmK5F4UpqDloqpK9Xc5w3oFO9zD9CK1Z4tIR1066kZOKUOnSdRgzd7UIWgvCwn5ooj3duUFT2k9obBktxAinB2LvTMUZQDQcdyniWMkk5VXDmTgzIY08P8mxldMGyfucfQQszrBCzhuHFmG60bHaoigbyjDukrdqtDNgzhwStEI5UKR8reRS+NbBGegWa2F5onQi3VpaQN4rdaExGDHxpAXMdLIq+E5wkdYSOVp0xBPb66baB5pR3Vg8jrRBpWXgU0vXwlcYYZYWT9T6GRRwQmzAM6MDNahh5VdtiL2TVG268TNmNIf5SMtwd+Pvbvz3dPwRIMHEzdluaL2iacfuE1/Mq10IgW/emvqKFvR8E0fbo+HV0I7WiGozBj//JM3BmhYA3QNbGq10DjzQAikJDiweMEtax7AAXoAfQe/Sen2nRVUrfn4BPjc8qj3nhaBvDsm1BV0ykBLVLUBZgHYWQ5h744NGw2VDtKTDBq1jTAIvbBYNqdFtc/4sEJa5tjyRddgoKV62NT0mEVIKXraARbfNoQOk7Xjp5lyXf8WpL/aQuOVOcJB41dDu107dziJiZ3IqYguJhPfcNzk+p8gFZpk02/b6kWVzvNaNwgdOrR1aNBSgrCBP9xB6AxCoDoXS2dBNFknZBjkl9QpRgiRjD7O70aZ1j6iliQb72xEyw97xW56Q1L0YEKBWLUvJqFlqiVrScSBnL+KJnb0UU8Ml8q9jDkHPCR+QMvKfSKxq9R9e//TqH39bqmu+YdnAP2N8+mkePnn7JqIcNU5ZW8RBSHc0GOxKJhCyuaOJ3yTcQ5DEfQSnTnXATkGOUeTG6CSkB8nbUUi3oHhuaUBam1goWNsuEkeGTcBZipXQ3NJGwZDJOhrmv5GsMGtCW6pNFINDUmdzTIRwLK2cCSXhnUJr8AZzBrq32OztnmEb1tZ4KistH9LE8JWmbrekE5mV7C2AzM7SVtJ8XNSPlo4JH8lajm4cWrCxA+6Q526lhPvtCTtJOxp8OJe9BM3GQOEQE6BezdBeOOJxzKolc02wac+BQ7WM+cBiLXEgmFg8jk46JYqsHehEeE1zuCn0CBwgBE7RtJC2UxLgiYgV8ox2rgNeOVwZXsHVpmWAGv9/AhzS0AHTjPVsvN59IFDGn+5rPxp/gtc7JO5f+6aN4//7Q/6Fjb96v/b2qKPd18l4zP6efz0wm9DmxykwH9GYAxo1tQ8Y9gEb7b06ETwDjtCr5zZSGNrJTNVe72m9wKeWvlKbQ51E2s4RCXhptBYcgg8ED7ZOQtwiTgTXbhThg8RccEDopayZyCnWmmDWAuB4DHOS9o0sE+xAM8uPQh2NvtgazWm9OqBFlTtaGdnG4iyMiNi14h7NFGrBMs6mP6JDMWAmSKLZngekI6HN3qmDPCJiE8InsjeIeaI1sAvrzKE1LWlpxyoWJPeETgEFvpGwGoIq1DL19tTV8nBxptRS4jCTlaWNlWvLG0VUMx5vlcALrDVN7nSKtcKaEaHAS1tnFAaSE2Db0CTtwHPBEKHEnghOLc+xUsEB0tzBpeAt8ALpGUGPqZa+AK9tvSgz/qfH5//V9v/rhP9ljW+iIfpnjjd+/d/9XlL/5cRXeiVa8SEorCygO+wHmUGhPq0bOXuLTUgX+HW02WosPVE0Xspo6lbq0DgZydQ0oRhrJpt4bbxvSh3uFZUQYsTF9+d3NPEW5GmretvD8pak3skGcsH4efus/dVn7Ln115D8CiNFnI0Q9SuhXhOLKZCWjGK69hddSLqRfd5g4ljxqjxur/h//TmYe4dPR07vLqwALVJ5E0mXEQeN8/TVHgVgvHkyS4mztFdCl+P3bQa0QZFPrHiB8wxijiyS/b0+p1U7yJKifaeXli7CfgSf2Hoc+fH7ESadCAajYtNLWks+xHxp/D5SOD0VvDCaNuhdapybTyFW4HdpHPBAQxdWNKdybBgER2MmeQ4jH41OZE8sArOmZfK1Hcu995l9g/f3Tkjj74GWcVb27M1rh/atW4//lDHQvl+Mv3vYc/4SuNIy4278fSS4dQtCXkgMbV7qriEyTEAr8GTMng9p9+x+pIlXiItRz9EbtgrmDY1yYHrkNegC+FTi3NYO+cTJRuIav3pmz4XeN7zEroYribR4kKmgqeUbmQtLfdhh9rz26Iga2mSB09SGFLqSSu0Fa+LM9rUanZRpDaEsqVjJ2bdgmxcAbpUd9yIOjB8Fc5thn/nuBbCIZZND6FTJysFCLeusY0XKkUbakJa6LzQ258IsHDyMlQWvM/Umyzh1eKfU9BWM3/jvUeUep+28MkqbmKghGBZ5O67VRylqW8cOJcuUsgBVe/1MqFEFjWcHKEmXMGvC4Kaq59UX0E3KF0qWktJ2ECxCepH2E1LLhsK26qgSFMsTOxekHgkfynHQtDl6O5uocG3FRPLPjE5J/ynhr1785Mf/y1/b6vgljG+fIfnww8nl7em/hvTrIvuRFzmz9Ag+RRzb+nOZI8TK5kUEZ+AvGhTDwq5dZlxH5AUO7esdadjZE9nXDVLWVEU9douZo8HxsOfDm1AuMktG1MZn+1Torqnkgb+klE9DyJkXmHuilaU4tX597J4nB1RWTUUft3xNKS8zF7GzWvne/m/OOG+CtpyhyFbixsbBmYiV7AvAie4aqe+w9sFKqCEFvm2wPPcNyso79hy+FdLI0Tsal5VsWlQeSnjSVD8OOwbJU6Pn2AfACcGXbkK6Lam1G/VxYLFp3Jyf4ngAq2VEzIA3Zf9s7Elg4Aycth6BbXsKWsg+Bn5GQ1SuRv1Ch/TM+CLgPvFbTQmQn2EVeYRPW7mPkFcjz7k0/JrRY7SntlL4yvgTpS4lMkUlOZY4wf4c6S3gFnGEuQdOBDeGS9BRE4LxIPwm1mcW7wHXmKdo7xjcCzqjaDy+pojzET2B19nrFDxrTpIJMBmFUPssd5/x7nn+r69z0yZMP0Ld2xYcUUctwGZ83zUtG76nvTbhNdfd09COFzK9xcE4Bx9AVfAXxv8KaC38idH3sH8m6dCgvfqcEU1oTifebMKvnIOeg08srcOEWya+BM5B21Z6xAxxLSsT3hC+QbyB/aiROwXu3OiVU2DV7IMOgc8xF8g3zphIPrRYC140JTlXYX9ldIV9h5Q25yE9s306PolO8NwNSTqUfWPHHDxDTMc18/lYTmVHPLT5xsricqxWuWmr3rsmqBxFFQNJIwAAFctJREFUa23uX7bKkLxzc6zXWKd7JTuthrsCd6g1aNmr31+t1+aAb17B73sRWuZr2khRGyUwCtUYz78X0zlHXUz7/6vz2AcSw6gmXzX4neXYa/1coev2fp2q2eGzZrzSVFb7AGckyMfryfE5xQnyLa/q1bVAsrIu99fRkIXx7tmBfCJ0O9asdwBRGJyU6uil6pIRtfgAK0J50cTTnEMgfIB8g/VoPAE5xAuZnzz7k//+D/gn00Lf2PHtc+y07f5WXr/njr9LsqLo1OnzUWEK8A72FxZdNA6uprRU6pDCPZVj8G1YvcOdguqkGJ+S0URp8sR2COZIj6TToturSQHsfQMb9lHwAuuuRaFyyOeZLCNU1LoanbdJ7vNRKd/KbrwvK4G/nEkjVJb7MjuwcuTrxzK49vzCSjQbF+0xiiX2+V4EOB4SiRw4mtjNknSB+UrWLMWRxKbpANjKvKnQzuQLO85EziBk8kW7SD2V1JOsMvJpowd4CLwds3RJXqU5CMWZ7QdLm6ZC1dMWDCDD2rgPdGLR2epF9nvOrDW0yVMRKzK9r9MPx0OGn460TIT8LIlpJJuRL8smkmZF5KmTjSKunPlcaDZmM0sr13LUpuqN9xpnqDvBYKkEuXPGo+XzkLdktJI2fEsoIG7TrqG8aAplPZX886TMlbXdU/Q8zbzVIZfPwz5PMShYquYlwX3Lb/VofBqhm2r1YWYJcycPhXiuznPMw1DrYSG3Lq2VaNbyWFx37lSG0EYRzpjdHfebWA/TvvlocJ6oTNY5HEzK7G46Xc81TPr+oBa6WQ6RQRd1WndlOJxUlSF9AOVWypMC72TEjfdoUBMcHWlUdzcDy5nCNa1ZyFunz8d7+OepmAr9S5gHOfsM3YQ9x/E0xWdSHtoqkiumynFg/KTd55DS0wwf4PhC9psKXhrewTwYZoKNYSspRfZ2hEUX6YlD0YItnxheIh3JvCG8SzG8qoppjVE2RIbdNgRJeBLoudOTVoqpWbR66+lYWvYIIUbkSvZ5Skdy3uzrs0GnYR5a4pBPI3hBxkkqbyRdGE8xv0Acy3Et51M3ePs8kk1zzoDiLewvmiCPCWIpuaajhnOREdeReZFf0xI1yU7a0vleKGeptL/7QbB9JTxLHVluNi5ZErkgI5vNed1/4rXTjYp8S22ZemMa9wr7Vi1kOIFgdO4LuyntI3zOWObWjm/lwzTx4NbSuinbW816g+CBYEFqaWkqucrq9xoDw2VrpqVDzH0racZu7WGft26iKqEstt4z6iEt1I820GGUkTfh8hdpvVBo9eIn/80Xf02u65c2vpWOHVrjmrrVd6L4wOgdWknbW+MDljLetPK5KFspD0nZyvXXYPaj/WYx+4xXitrKxXQ7QoFmLJVwjFFg+nzsRDRtEDwLWf3r/zdIPoKztG5CeZGpm4gIU2c4DltG6pXRoglDRuEHRThbFm2WDodS2Rz91xz/6+s9J3M9ZiHa10wLtiiOsy2WBysmIneJjkK8SGvWuuwhZVTI09ZZbtzOMDmWeUnRaeIdqUfkt5qejgFRSN8ijo2fNYOkQ+QHXKpc5xllaHXP6k3uIpnsu1kR3LcOeGyLVWzLRTtbpQQPNf1myBMcXxi/R+hL2VdNLcybNi8kXQp/jnhT4nMqx7UJiE5DPnflzxyeKNW/amIT9Rd2RAmt94Yn5Ymr1hF63+SfR42LlCcjPPHz1oKzbJ35OHaxejOH8qyoToeSdZIlXOpj1u4c+NypBdTTSXTPnCm5u9tOh4PZbrMupW0X7Kx6mA3VeaTb+Yu776+exk/fXVfu7sTJSTNgrbMdtDX6TetHLfht8eHvlA8239PH/CH84Af1+79/3z0+Pivn598bHh6ex/p0WvS4PuyjXObQfckBi4m8ZePjLGVdBg0u/VtD+iVokRPdT1OLPmp2TLZVw7QMeUFO7iveRpetqqHqSIVhGDJLKWe11qWC40jOMuJnsp5KdZmKqcae5Ylmo334jBpvgW+RTyJ0U5MBcRymt3KNy/eNP5F9ECV2HvKUwiJTN+y7NNpX7JsqyV/Zfk+Ul1BRS1uv5LjG3KvkrNkMnhhvqXGLfOLgIfB3bb7ad8NsAl2VVref2dot0OEm7BVs7Tgz2Utx0NZwZkMF5UbtcSziJZHhZGLpMVqnTu17NJjcBWwSrsJxb7yzVEJ5Ady3fhp5Crp7pYCXjOtYbaPTJs4DK6cBGzvOUY6w+IisoV0xDwAOSylXKfdJzz5bfwXBwwJRW6WSbpx5oYzr1k2OVUMRWyLVPkfFUc+K9NzZKo5rUku4awCsTtO+DtEZTZ10Cj21cy1z1QSDFhFfQF2oxs+zqKd6VQ67n3zTG9H808a31rEDvPFr/97TXvWJwseS32ztVP2eHEOrx06PIoo7xi5TgnkUXu7LH7LSRWlQaCuD4wjiNqVLpavklUXXyiwcrfuUDr/OtWN/rUStZdFBTjEHDl1HMsmgV/qCiIdM1yZYYW7yeSgmTj8qdJjp2hpAqEdOEU8ML6NlJO8Kf75vJiM8TUctdlC4z0pH+AzFLXWMcFWOTX2hiIO9Ol7OmVPrxslzvO/ERgm1jRQcDq3L6PSM3w3rhSPPEVXSna1TVVatV3SsGDfZoeoIrHTsFJljn+mnTv2CTqfgL9qmERZ0pDwp9svMpi9wxKNz6Cbd5N7kSeJtoJmIO9saatbofLXfclFRMpWTkuWm7avMsTIOS9Sf7waGYuZRuuxz2Cn8ljT93K6akdv10B1KO0+Yb+t0XaaHZ6t+c3fqrOp6hvlQ7pZjHfjxsN1+9sZuAPjuy5MyDFt13cyvdsf76T/41ghrviFjVD+/GsFHHwXPnwc/+EHlRz8yH/ywe/tm031xPh/gD7niarrYHvTLcjvtasyHMp/ELmtOo3R1029nswNtdu5yshuin8ZkclB32nAA2rYmOpPQJsuusIXopjU9nLqoSN0t2y2UOFKUrKk+u6Go57jrisAn1T4o5lPEcabPKfrS6fcCXrRuZnQ11TtrKVEm2ZwkIm7bHhK6aQmCVaT1II5LxqOjlrB64xPguNF1nlD8hbNpDSSOQmybwwVUTdWRI87DeZ1o1qpJ8q5RW2WeDNsgroCV1dq4iryM0M9tnTpzHSV2rrzTUIE4ETmT+Eypo9oQkn3JbhG+MnouZ4/iLcmVdBo9d9AFmjZ1vWbNmWra0JucKrWs4mjv5DPo9zqKVzXrryD5cdhq5cBNAf/KsQf3sno7y14fBSBF2mN3UTSNga2DYrSQfUBY2cobTyTXfeOwNC9H37A1vFCJG7S7e/FHv/sV37yg+p9rfKsdO/x2vPEb/+NB/9h/tytRkI+dtWRTNr/D2GmqVK1r5GEJrZ0+a5x1E8/teyW3qI0FWVatrlQXCpZUtzanYWWN56GcWmxaDWSbiCm2kG8ro44lXjcmpw2y0ilyygyOeFTyxr4srG1WoCMlQ9uggXeMtyE2Dj/KzNPMA79MxYVrPmtGpnHxtbbdk1RaL+Z07myrKKbCVxU+M3EaJa8Z9DZF9+2+1bvMct4y/FqkyCYOrMUT3UXGU9d89IR79RxL8r50EEBWn9Jlcf+iUnZSzaIyBaiur5o32CW6oNvvb5+Fbr+DXQlPRH9XwxvXsogha5ZpVwZf5yzfLVluCI52O1bAKro8jkmuokzd7ep8mJbN5PouNyfd2XR1ttotlov53bDsL07iq4vd9vxn3dHNJ//t7dtv//2Dw8Ohfs3xtmzzgx91fPzx7vVr7ZL/Bifrr8Yva3z44YTf+72BD344+f72Xu3Z/3bAb8MHP+z4+EfD97//W5PVbD3x0Ktfq3v35K2Hm/756S7KxbCpz/JoFgCTvj/IIe6l3WlOuyiVYRI5GTzZZe1bY6rJ5KDRJdtZX6NvhRuTE0l27u7R5GTSqWyVt9Pqs31A6qoyTIa+G+hSZdJQLG89sUrbgvlBMRxl1boLuopmBW8z6JR5qCg1GStgUk8dfhbEtOYwlCznWbLB3orpMGS2ndYg8bYEHejUyUPibYF3q8qqRC1kPDZ74DMXHhp9FlemvmgZ/7jBVTDkENNSFKQfUzlt7Z19S8RjZF602vS0IqqcfToOJC1RddYy6UrGnnaq1gAQxfMW0PgLiaPWudETRzy2hCVOmiCxJS9jf/nZqzbB+9F0QM1+pw9RfNV2/mxJREo/V7gqGVrApbsYtPQsv3r+8Y8f+Bbbg2+5YwdAi7/zm2cA3Xb2fY2RLJ0VVZeJtxTuGWSFDiXfNqi1jTa5uM9aLy06BUtcFDQniSNSXBb52dffB+AsD61OMxLq3di+8C2lbuisIHY1fRB4W10OpHoU5tNUTBV5qMoS4tT4JEpc5+CtQyVc+9bbWiWIXXTM07lr55dx3IV3c5VJTeoUdBeKi5r1xlHOrXrXVc4iulU/9MdM43ZiKwc6RUlHv3bGwo7Iko8dky3bLYouB3IbRUcaXN2p1PCkUF9G7Z4O6Zc5iTLbdeuezUylyy7iouTw5V0UH2zpcrp5JOK47A7qeq5hOtz3ALvueHKwcddrNz0deNF1B97vAV8mM9d+q68mL3dP7ufzMjvKk8cy/PSnx8OrutFmrHtel5d9KyPpX41vy/hh+b/WLP+w8NFzfX2fdD74w8LVVfLjK/PhJ/FGfzmt24eYejJbD11/GZPNY6xP+gkb4Lhu1499dzyZl7rd1DI7op4w1Af7QEMZJpPIyaC6jc00o+wy6zQc9cTdZKQNhxMNrlniwplfdMTMTrlTcdaoXfcYvY5y4ofodRQdQ9s5zlLoSL1X7sp7dv2y7Sw3acLb2hdFyYYC5CPEaWT0GcM6zNxdBLaqWiDR9d3E3bCg6oiIRwDZc5xfIo4VTYsyDF5FYQjFtO27odMke7sogoHMw7RftuOrS5RJktOxd/+hk87ouYoPouqSEl+k80pmSGmD81Spm1RMpeomFIyd0gc18lDBkoGx8DWu2j20aL3k7eqvHHQ29x3drmr9/MVP/tED33L78v8Hxw4//GF54yerOQ8c7eY5j3447CInlTLNGheF+hwgFdMSPnf1VyldxtjNKVUminqkytJFJZLB+EQqt6l64ap1iVjvI+ySzENlQuZj44fLo3NYKHSkyjLlSRfe9ENJT6xuoKPLB4Y9zNf3QcxC3e2uDIfqS+4j+smQ569fZxnE0xKx3E0YJtuc7CYMirAzNU0tQvW29nTRZd1Gl7EbctLNO5yqZbsm56PAbuNdHG519+Ay7WtXjw8UxdZwshvy5eSIITbTw4O6u31UWWwOu9510Pvl4u6mf34aj9uH+24262Z9Paunr7LyYVjr009/vGOsi/nudz+afXr0PPn4454PPpjw8Q9qM4ZX/rY0d/jV+NX4axx/lXL4y6999FHHjz/K7373x9Nh2Kq/OImv/mCx+eADyscf/2iAH+r0g9vF6ep23V+cxJO66Jf1+mSn/mKyWny+nq8n3UxPp87r9TDty2zdurdtpod7caRUbFftQpv50L8fnn++m+d8ss1Jn9FPIicqQ+7RhujKoa1FlHKTtT52xKxPz7vOZzvxeZee21bb4TFaWVpwGejzPj3vCl113XXRTfrBtYucZPg8Q89L70mSW0XJRsm1MXQM3bDfkyKmX7tVVsvuH7tCl9RpVroSca7/s717543kOOIAXtWP6ZnZ3SOXOuJ0BIPFYYELCEeMbNnABE74Afh9+H0cOjgYcsBAgiIlAi4QQBwI+0SZInl87O7s9PSjHAx5Zz0cCicR/18y2QSNma6umuoexTcpD7uZSLISETZmSMYky4q1rlLKWeusYmQxmnUidpwkkaGlEjUkHUpuxfR3tpd4+e2XHw7f+R17HIH9f2z84c9TXhhRhsbZKm2ylIrVlqS0ZmZhTnc5qw0ydkUxjJLoXhmKnFKdKXvDhU9KDLMSLSEQEUVhZ1h8jkr3lmIpmaOwExlK20rHOicztSr/QETUh5wMm0I4T5LQJUnmwiqdEm2Ksj88/D6SWUnHw4vhJD7xnfo3KyPa8kgksQ4cpU7MrZZcKF2My5v2alE4XRSk83ht9U3tW01E1Lo6jcuiW3Z96cj3F6+blppjNf2XGbGyskXkT05e9dt7zejiddO+b3x6vRc/jN7Rj1epH7JkAPitOjzU9OaNGt7nv/U0VLXy9l4zvnh93BId0e7uP1x+9pSLq0U2ppJbt7bJV2qLyN+69bRLOmws2zaWZhy12YpezomI7Ihil7Sb5MRL63LZRtvVJhivYmV6u7Q+F9k47VPSpshL63MVzAbFtPLOVUWnul5yWZnYJs6TbNRap6FvpY88stq2IXaxsEonzjaQ6XWMtdVqTUQkkvk+QdOFSW3IVNrh0CsaEpoiCaWJxNSKua+Ycv6OonkuSs6J5Tknuhl+ZZd6YiUPC5JsZUXrfDuO3r+du0DHx/H/DfHvzaML7EREn87/sq1NkVcs4zKENtraGPEuBTLaDs0WUWzPJmSdqMyZN5SS21a7u3HwKnGe9KZILkWVvV5HFYrCKq1JL1YsY1rnYcuZzpOc1MI4WzvOfqGNlG20SvdZpOKubsN0YdbGVHKVQ3ldfb/eKV+YMzoL293EbfgqnOyu0+bpsJ93HL33G04rXcj5N39a/yzQ3pcHZ7OmPJ1RfEwPIgB8TIea9t+ony3km8bsnnj79u1X3db8YPLu5NWC6Ih39r8up10ZV6sLRUS0GpFxtz7l3PPZcwo0mcj8baUv47qyI4oSA2s3yrSiUVe3ocjGFUkHL13fm7F15IteRc8LI8bxs+jlvC7IZEXjrqMba2mmNd0kTZ3kxBLdpuR+WWq1DkK7VNB/VDA1q5g7VlJo7jiEOorprco2BTJibCuSOPV5pQyNJZtF1VXh7Ozv7UcZ8l/RowzsdF/qms2a8r5MLNMXf31iOG5bTTcxaN1L8nnk1LgsOnV+KTKu61WXUiq1LnXyF+XCb15NRu5JEUJ7q+tOBWOcnJ42/fTFFxPJkVkZuX7zz7vZrHFLF6x2o3xur3r6+kXe2e/cw3fj2dVEn54ed7/43a5pDAI0ADxG8/mBOzl55R+u902MQk2j7+c9pr1DO11fV9fT63br1lTvTg6WT19+Prr89sslETE1jXr2rnDVXZ+IiPpPJqq9Wrwv1+eRU5UWz32/3Wp3V3K0/TJ5mUSWPGLjfZ0jLQvWzjqKqy6lm08WK1QjH4nNWXN/GhwxNY3Z2dmvZ7OmHB62B0dqCMCD+fzA/eQ2igAA4Fd2pKhphrP+m8bM5weO9g6Lh/l5mJuPFO3vv29qns8P3NOXn01ob68gItrd/WP19OVnk1+Yxx9rUgsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8BH9F02/ERjPtOdgAAAAAElFTkSuQmCC" }))));
};
MbHelp.style = mbHelpCss;

const mbImageBoxCss = ":host{display:block;padding:8px;border:var(--mb-component-image-box-border-width) solid var(--mb-component-image-box-border-color);border-radius:var(--mb-component-image-box-border-radius);max-width:100%}:host .label{margin:0;padding:0 0 4px 0;height:var(--mb-component-image-box-label-height);line-height:var(--mb-component-image-box-label-height);color:var(--mb-component-image-box-label-color);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:var(--mb-font-family);font-size:var(--mb-component-image-box-label-font-size);font-weight:var(--mb-component-image-box-label-font-weight)}:host .cta{all:unset;box-sizing:border-box;display:flex;height:var(--mb-component-image-box-cta-height);max-width:100%;color:var(--mb-component-image-box-cta-color);text-decoration:none;font-family:var(--mb-font-family);font-size:var(--mb-component-image-box-cta-font-size);font-weight:var(--mb-component-image-box-cta-font-weight);cursor:pointer}:host .cta:hover{color:var(--mb-component-image-box-cta-color-hover)}:host .cta .cta-label{max-width:calc(100% - 28px);height:var(--mb-component-image-box-cta-label-height);line-height:var(--mb-component-image-box-cta-label-height);margin:0;padding:0 8px 0 0}:host .cta .cta-label.filename{padding:0;color:var(--mb-component-image-box-file-color);font-weight:var(--mb-component-image-box-file-font-weight);text-overflow:ellipsis;overflow:hidden;white-space:nowrap}:host .cta svg{display:none;width:20px;height:20px;margin:0}:host .cta svg.visible{display:inline-block}:host input[type=file]{position:absolute;width:0;height:0;opacity:0;clip:rect(1px, 1px, 1px, 1px)}";

const MbImageBox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.imageChange = createEvent(this, "imageChange", 7);
    this.hasImage = false;
    this.boxTitle = undefined;
    this.anchorText = undefined;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  componentDidRender() {
    this.ctaLabel.innerText = this.anchorText;
  }
  /**
   * Clear input image.
   */
  async clear() {
    this.onClearImage();
  }
  onFromImageClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.hasImage) {
      this.onClearImage();
    }
    else {
      this.scanFromImageInput.click();
    }
  }
  onImageChange(ev) {
    const target = ev.target;
    if (target.files && target.files.length) {
      this.ctaLabel.innerText = extractFilenameFromPath(target.value);
      this.ctaLabel.classList.add("filename");
      this.addIcon.classList.remove("visible");
      this.removeIcon.classList.add("visible");
      this.hasImage = true;
      this.imageChange.emit(target.files);
    }
    else {
      this.onClearImage();
    }
  }
  onClearImage() {
    this.ctaLabel.innerText = this.anchorText;
    this.ctaLabel.classList.remove("filename");
    this.addIcon.classList.add("visible");
    this.removeIcon.classList.remove("visible");
    this.hasImage = false;
    this.scanFromImageInput.value = "";
    this.imageChange.emit();
  }
  render() {
    return (h(Host, null, h("p", { class: "label" }, this.boxTitle), h("input", { id: "scan-from-image-input", ref: (el) => (this.scanFromImageInput = el), type: "file", accept: "image/*", onChange: (ev) => this.onImageChange(ev) }), h("button", { class: "cta", onClick: (ev) => this.onFromImageClicked(ev) }, h("p", { class: "cta-label", ref: (el) => (this.ctaLabel = el) }), h("svg", { ref: (el) => (this.addIcon = el), class: "visible", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.8333 4.16666C10.8333 3.70642 10.4602 3.33333 9.99992 3.33333C9.53968 3.33333 9.16659 3.70642 9.16659 4.16666V9.16666H4.16659C3.70635 9.16666 3.33325 9.53976 3.33325 10C3.33325 10.4602 3.70635 10.8333 4.16659 10.8333H9.16659V15.8333C9.16659 16.2936 9.53968 16.6667 9.99992 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333V10.8333H15.8333C16.2935 10.8333 16.6666 10.4602 16.6666 10C16.6666 9.53976 16.2935 9.16666 15.8333 9.16666H10.8333V4.16666Z", fill: "currentColor" })), h("svg", { ref: (el) => (this.removeIcon = el), width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.0893 5.58928C16.4147 5.26384 16.4147 4.7362 16.0893 4.41076C15.7638 4.08533 15.2362 4.08533 14.9108 4.41076L10.5 8.82151L6.08928 4.41076C5.76384 4.08533 5.2362 4.08533 4.91076 4.41076C4.58533 4.7362 4.58533 5.26384 4.91076 5.58928L9.32151 10L4.91076 14.4108C4.58533 14.7362 4.58533 15.2638 4.91076 15.5893C5.2362 15.9147 5.76384 15.9147 6.08928 15.5893L10.5 11.1785L14.9108 15.5893C15.2362 15.9147 15.7638 15.9147 16.0893 15.5893C16.4147 15.2638 16.4147 14.7362 16.0893 14.4108L11.6785 10L16.0893 5.58928Z", fill: "currentColor" })))));
  }
  get hostEl() { return getElement(this); }
};
MbImageBox.style = mbImageBoxCss;

const mbModalCss = ":host{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;visibility:hidden;display:flex;justify-content:center;align-items:flex-start;overflow:hidden;overflow-y:auto;padding:24px}:host .mb-modal{border-radius:var(--mb-modal-border-radius);display:flex;flex-direction:column;padding:0px;align-self:center;position:relative;max-height:600px;max-width:640px;width:100%;background-color:var(--mb-modal-background);color:var(--mb-component-font-color);box-shadow:0px 25px 50px rgba(31, 41, 55, 0.25)}:host .mb-modal .inner{padding:24px}:host .mb-modal .footer{background-color:rgba(116, 116, 128, 0.08);border-radius:0px 0px 4px 4px;display:flex;flex-direction:column;align-items:center;gap:16px;max-width:640px;max-height:109px}:host .mb-modal .close-wrapper{position:absolute;right:24px;top:24px;cursor:pointer}:host .mb-modal .close-wrapper svg{width:20px;height:20px}:host .mb-modal .back-wrapper{position:absolute;left:24px;top:20px;cursor:pointer}:host .mb-modal .back-wrapper svg{width:20px;height:20px}:host .mb-modal .title{text-align:center;font-weight:400;font-size:var(--mb-modal-title-font-size);line-height:var(--mb-modal-title-line-height);margin-top:16px}:host .mb-modal .content{margin:24px 0;font-weight:400;font-size:var(--mb-modal-content-font-size);line-height:var(--mb-modal-content-line-height)}:host .mb-modal .content.centered{text-align:center}:host .mb-modal .actions{display:flex;justify-content:center}:host .mb-modal .actions button{width:126px;height:32px;border-radius:0;border:0;background:#48b2e8;color:#ffffff;cursor:pointer}:host(.visible){visibility:visible;opacity:1}:host(.elevated) .mb-modal{box-shadow:0px 2px 24px 0px #0000001a;box-shadow:0px 2px 8px 0px #0000000d}:host(.centered){align-items:center;justify-content:center}";

const MbModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.close = createEvent(this, "close", 7);
    this.back = createEvent(this, "back", 7);
    this.visible = false;
    this.elevated = false;
    this.centered = false;
    this.modalTitle = "";
    this.content = "";
    this.contentCentered = true;
    this.showBackButton = false;
    this.hideFooter = false;
    this.hideCloseButton = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute("exportparts", parts.join(", "));
  }
  render() {
    return (h(Host, { class: classNames({
        visible: this.visible,
        elevated: this.elevated,
        centered: this.centered,
      }) }, h("div", { class: "mb-modal" }, h("div", { part: "mb-modal-inner", class: "inner" }, this.hideCloseButton ? null : (h("div", { class: "close-wrapper" }, h("div", { class: "close-icon", onClick: () => this.close.emit() }, h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.5892 4.41058C15.9147 4.73602 15.9147 5.26366 15.5892 5.58909L5.58925 15.5891C5.26381 15.9145 4.73617 15.9145 4.41073 15.5891C4.0853 15.2637 4.0853 14.736 4.41073 14.4106L14.4107 4.41058C14.7362 4.08514 15.2638 4.08514 15.5892 4.41058Z", fill: "#9CA3AF" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.41073 4.41058C4.73617 4.08514 5.26381 4.08514 5.58925 4.41058L15.5892 14.4106C15.9147 14.736 15.9147 15.2637 15.5892 15.5891C15.2638 15.9145 14.7362 15.9145 14.4107 15.5891L4.41073 5.58909C4.0853 5.26366 4.0853 4.73602 4.41073 4.41058Z", fill: "#9CA3AF" }))))), this.showBackButton ? (h("div", { class: "back-wrapper" }, h("div", { onClick: () => this.back.emit() }, h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.75596 4.41058C10.0814 4.73602 10.0814 5.26366 9.75596 5.58909L6.17855 9.1665H15.8334C16.2936 9.1665 16.6667 9.5396 16.6667 9.99984C16.6667 10.4601 16.2936 10.8332 15.8334 10.8332H6.17855L9.75596 14.4106C10.0814 14.736 10.0814 15.2637 9.75596 15.5891C9.43053 15.9145 8.90289 15.9145 8.57745 15.5891L3.57745 10.5891C3.25201 10.2637 3.25201 9.73602 3.57745 9.41058L3.57799 9.41005L8.57745 4.41058C8.90289 4.08514 9.43053 4.08514 9.75596 4.41058Z", fill: "#9CA3AF" }))))) : null, h("div", { class: "title" }, this.modalTitle), h("div", { class: this.contentCentered ? "centered" : "" }, this.content), h("slot", { name: "content" }), h("div", { class: "actions" }, h("slot", { name: "actionButtons" }))), this.hideFooter ? null : (h("div", { class: "footer" }, h("slot", { name: "footer" }))))));
  }
  get hostEl() { return getElement(this); }
};
MbModal.style = mbModalCss;

const mbOverlayCss = ":host{display:block;width:100%;height:100%;position:fixed;top:0;left:0;z-index:-1;opacity:0;border-radius:0px;visibility:hidden;overflow:hidden;background-color:transparent;border-style:none;border-color:transparent;transform:translate(0, 0);transform-origin:center;transition:background-color 0.2s ease 0.4s, border-style 0.2s ease 0.4s, border-color 0.2s ease 0.4s, opacity 0.2s ease 0.4s, visibility 0.1s ease 0.5s, z-index 0.7s}:host(.visible){z-index:200;visibility:visible;opacity:1;background-color:transparent;transform:translate(0, 0);transition:opacity 0.2s ease, visibility 0.1s ease}:host(.non-fullscreen){width:auto;height:auto;position:absolute;top:calc(0px - var(--mb-component-border-width));bottom:calc(0px - var(--mb-component-border-width));left:calc(0px - var(--mb-component-border-width));right:calc(0px - var(--mb-component-border-width))}";

const MbOverlay = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fullscreen = true;
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  getHostClassNames() {
    const classNames = [];
    this.hostEl.classList.forEach((value) => {
      if (value !== "visible" && value !== "non-fullscreen") {
        classNames.push(value);
      }
    });
    return classNames.join(" ");
  }
  render() {
    return (h(Host, { class: `${classNames({ visible: this.visible, "non-fullscreen": !this.fullscreen })} ${this.getHostClassNames()}` }, h("slot", null)));
  }
  get hostEl() { return getElement(this); }
};
MbOverlay.style = mbOverlayCss;

const mbProgressTrackerCss = ":host{--mb-progress-tracker-dot-active-color:#0062f2;--mb-progress-tracker-dot-inactive-color:#c6c6c8;display:block}.mb-progress-tracker{display:flex;flex-direction:row;align-items:space-between}.mb-progress-tracker .dot{width:9px;height:9px;border-radius:50%;margin:0px 6px}.mb-progress-tracker .dot.active{background-color:var(--mb-progress-tracker-dot-active-color)}.mb-progress-tracker .dot.inactive{background-color:var(--mb-progress-tracker-dot-inactive-color)}";

const MbProgressTracker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.getCurrentCorrected = () => {
      if (this.current < 1) {
        return 1;
      }
      if (this.current > this.size) {
        return this.size;
      }
      return this.current;
    };
    this.getSteps = () => {
      const array = [];
      for (let counter = 1; counter <= this.size; counter++) {
        array.push(counter);
      }
      return array;
    };
    this.size = 3;
    this.current = 1;
  }
  render() {
    const currentCorrected = this.getCurrentCorrected();
    const steps = this.getSteps();
    return (h(Host, null, h("div", { class: "mb-progress-tracker" }, steps.map((step) => (h("div", { class: `dot ${currentCorrected === step ? "active" : "inactive"}` }))))));
  }
};
MbProgressTracker.style = mbProgressTrackerCss;

const mbScreenCss = ":host{box-sizing:border-box;width:100%;height:100%;padding:8px 16px;display:grid}:host(:not(.visible)){display:none !important}";

const MbScreen = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible }) }, h("slot", null)));
  }
  get hostEl() { return getElement(this); }
};
MbScreen.style = mbScreenCss;

const mbSpinnerCss = ":host{display:block;padding:0}:host img{display:block;width:24px;height:24px;animation:rotation 700ms linear infinite}:host(.large) img{width:100px;height:100px}@keyframes rotation{100%{transform-origin:center;transform:rotate(360deg)}}";

const MbSpinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2IiBoZWlnaHQ9IjEwNiIgdmlld0JveD0iMCAwIDEwNiAxMDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUzIiBjeT0iNTMiIHI9IjUwIiBzdHJva2U9IiNEQ0VBRkYiIHN0cm9rZS13aWR0aD0iNiIvPgo8cGF0aCBkPSJNMyA1M0MzIDI1LjM4NTggMjUuMzg1OCAzIDUzIDMiIHN0cm9rZT0iIzAwNjJGMiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==";
    this.size = "default";
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: this.size }, h("img", { src: this.icon })));
  }
  get hostEl() { return getElement(this); }
};
MbSpinner.style = mbSpinnerCss;

const mbTooltipAdvancedCss = ":host{--background-color:#0062f2;--font-color:white;display:block;font-family:inherit}.mb-tooltip{display:none;position:absolute;margin:0px;margin-bottom:5px;padding:2px 4px 4px 4px;font-family:inherit;font-style:normal;font-weight:500;font-size:13px;line-height:16px;color:var(--font-color);background-color:var(--background-color);border:1px solid rgba(120, 120, 128, 0.2);filter:drop-shadow(0px 2px 4px rgba(31, 41, 55, 0.06)) drop-shadow(0px 4px 6px rgba(31, 41, 55, 0.1));border-radius:4px}.mb-tooltip.text-center{text-align:center}.mb-tooltip.text-left{text-align:left}.mb-tooltip.text-right{text-align:right}.mb-tooltip svg{display:block;float:left;margin:6px 14px 6px 6px}.mb-tooltip::after{position:absolute;z-index:-1;display:block;content:\" \";background-color:var(--background-color);width:10px;height:10px}.mb-tooltip.arrow-none::after{display:none}.mb-tooltip.arrow-left::after{left:-3px;top:calc(50% - 5px)}.mb-tooltip.arrow-right::after{right:-3px;top:calc(50% - 5px)}.mb-tooltip.arrow-up::after{top:-3px;left:calc(50% - 5px);transform:rotate(-45deg) translateY(-3px)}.mb-tooltip.arrow-up-left::after{top:-3px;left:15px;transform:rotate(-45deg) translateY(-3px)}.mb-tooltip.arrow-up-right::after{top:-3px;right:15px;transform:rotate(-45deg) translateY(-3px)}.mb-tooltip.arrow-down::after{bottom:-3px;left:calc(50% - 5px);transform:rotate(-45deg) translateY(3px)}.mb-tooltip.arrow-down-left::after{bottom:-3px;left:15px;transform:rotate(-45deg) translateY(3px)}.mb-tooltip.arrow-down-right::after{bottom:-3px;right:15px;transform:rotate(-45deg) translateY(3px)}.mb-tooltip.visible{display:block}";

const MbTooltipAdvanced = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.show = undefined;
    this.message = undefined;
    this.arrowPosition = undefined;
    this.textAlign = undefined;
  }
  render() {
    return (h(Host, null, h("p", { part: "tooltip", class: `mb-tooltip ${this.show ? "visible" : ""} ${this.arrowPosition ? this.arrowPosition : "arrow-none"} ${this.textAlign ? this.textAlign : "text-center"} ` }, this.message)));
  }
};
MbTooltipAdvanced.style = mbTooltipAdvancedCss;

export { BlinkidInBrowser as blinkid_in_browser, MbApiProcessStatus as mb_api_process_status, MbButton as mb_button, MbButtonClassic as mb_button_classic, MbCameraExperience as mb_camera_experience, MbCameraSelection as mb_camera_selection, MbCameraToolbar as mb_camera_toolbar, MbCompleted as mb_completed, MbComponent as mb_component, MbContainer as mb_container, MbFeedback as mb_feedback, MbHelp as mb_help, MbImageBox as mb_image_box, MbModal as mb_modal, MbOverlay as mb_overlay, MbProgressTracker as mb_progress_tracker, MbScreen as mb_screen, MbSpinner as mb_spinner, MbTooltipAdvanced as mb_tooltip_advanced };
