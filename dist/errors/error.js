"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const IllegalArgument_1 = require("./IllegalArgument");
const IllegalIdentifier_1 = require("./IllegalIdentifier");
const IllegalOptions_1 = require("./IllegalOptions");
const ResourceNotFound_1 = require("./ResourceNotFound");
exports.error = {};
exports.error.IllegalArgument = IllegalArgument_1.IllegalArgument;
exports.error.IllegalIdentifier = IllegalIdentifier_1.IllegalIdentifier;
exports.error.IllegalOptions = IllegalOptions_1.IllegalOptions;
exports.error.ResourceNotFound = ResourceNotFound_1.ResourceNotFound;
