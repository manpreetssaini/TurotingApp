"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var inputType = _ref.inputType,
      model = _ref.model;

  function getJsonModel(model) {
    return require(process.cwd() + "/" + model);
  }

  var modelInputTypes = {
    json: getJsonModel,
    object: function object(model) {
      return model;
    }
  };

  return modelInputTypes[inputType](model);
};