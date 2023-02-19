// Taken from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
// (c) by The UMD contributors
// MIT License: https://github.com/umdjs/umd/blob/master/LICENSE.md
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory.bind(root, this));
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory.call(root, this);
    } else {
        // Browser globals (root is window)
        root.SocialCalc = factory.call(root, this);
  }
}(this, function (window) {
