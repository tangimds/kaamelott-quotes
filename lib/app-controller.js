"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _layout = _interopRequireDefault(require("./frontend/layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  async index() {
    return (0, _layout.default)("Hello world");
  }

}

exports.default = AppController;