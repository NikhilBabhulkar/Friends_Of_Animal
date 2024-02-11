"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/read-cookie";
exports.ids = ["pages/api/read-cookie"];
exports.modules = {

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "(api)/./src/pages/api/read-cookie.js":
/*!**************************************!*\
  !*** ./src/pages/api/read-cookie.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res)=>{\n    const cookies = (0,cookie__WEBPACK_IMPORTED_MODULE_0__.parse)(req.headers.cookie || \"\");\n    // Read the userData cookie value\n    const userData = cookies.userData || \"No data\";\n    // Process the data as needed\n    //console.log('UserData from React app:', userData);\n    res.status(200).json({\n        userData\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3JlYWQtY29va2llLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUErQjtBQUUvQixpRUFBZSxDQUFDQyxLQUFLQyxNQUFRO0lBQzNCLE1BQU1DLFVBQVVILDZDQUFLQSxDQUFDQyxJQUFJRyxPQUFPLENBQUNDLE1BQU0sSUFBSTtJQUU1QyxpQ0FBaUM7SUFDakMsTUFBTUMsV0FBV0gsUUFBUUcsUUFBUSxJQUFJO0lBRXJDLDZCQUE2QjtJQUM3QixvREFBb0Q7SUFFcERKLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUY7SUFBUztBQUNsQyxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0ZXJpYWwta2l0LXJlYWN0Ly4vc3JjL3BhZ2VzL2FwaS9yZWFkLWNvb2tpZS5qcz82ZGZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcnNlIH0gZnJvbSAnY29va2llJztcblxuZXhwb3J0IGRlZmF1bHQgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IGNvb2tpZXMgPSBwYXJzZShyZXEuaGVhZGVycy5jb29raWUgfHwgJycpO1xuXG4gIC8vIFJlYWQgdGhlIHVzZXJEYXRhIGNvb2tpZSB2YWx1ZVxuICBjb25zdCB1c2VyRGF0YSA9IGNvb2tpZXMudXNlckRhdGEgfHwgJ05vIGRhdGEnO1xuXG4gIC8vIFByb2Nlc3MgdGhlIGRhdGEgYXMgbmVlZGVkXG4gIC8vY29uc29sZS5sb2coJ1VzZXJEYXRhIGZyb20gUmVhY3QgYXBwOicsIHVzZXJEYXRhKTtcblxuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXJEYXRhIH0pO1xufTtcbiJdLCJuYW1lcyI6WyJwYXJzZSIsInJlcSIsInJlcyIsImNvb2tpZXMiLCJoZWFkZXJzIiwiY29va2llIiwidXNlckRhdGEiLCJzdGF0dXMiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/read-cookie.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/read-cookie.js"));
module.exports = __webpack_exports__;

})();