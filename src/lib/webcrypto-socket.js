var WebcryptoSocket = (function (exports, protobufjs, fetch, WebSocket) {
  'use strict';

  fetch = fetch && fetch.hasOwnProperty('default') ? fetch['default'] : fetch;
  WebSocket = WebSocket && WebSocket.hasOwnProperty('default') ? WebSocket['default'] : WebSocket;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /**
   * Copyright (c) 2019, Peculiar Ventures, All rights reserved.
   */

  function PrepareBuffer(buffer) {
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(buffer)) {
      return new Uint8Array(buffer);
    } else if (ArrayBuffer.isView(buffer)) {
      return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else {
      return new Uint8Array(buffer);
    }
  }

  var Convert =
  /*#__PURE__*/
  function () {
    function Convert() {
      _classCallCheck(this, Convert);
    }

    _createClass(Convert, null, [{
      key: "ToString",
      value: function ToString(buffer) {
        var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
        var buf = PrepareBuffer(buffer);

        switch (enc.toLowerCase()) {
          case "utf8":
            return this.ToUtf8String(buf);

          case "binary":
            return this.ToBinary(buf);

          case "hex":
            return this.ToHex(buf);

          case "base64":
            return this.ToBase64(buf);

          case "base64url":
            return this.ToBase64Url(buf);

          default:
            throw new Error("Unknown type of encoding '".concat(enc, "'"));
        }
      }
    }, {
      key: "FromString",
      value: function FromString(str) {
        var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";

        switch (enc.toLowerCase()) {
          case "utf8":
            return this.FromUtf8String(str);

          case "binary":
            return this.FromBinary(str);

          case "hex":
            return this.FromHex(str);

          case "base64":
            return this.FromBase64(str);

          case "base64url":
            return this.FromBase64Url(str);

          default:
            throw new Error("Unknown type of encoding '".concat(enc, "'"));
        }
      }
    }, {
      key: "ToBase64",
      value: function ToBase64(buffer) {
        var buf = PrepareBuffer(buffer);

        if (typeof btoa !== "undefined") {
          var binary = this.ToString(buf, "binary");
          return btoa(binary);
        } else {
          return Buffer.from(buf).toString("base64");
        }
      }
    }, {
      key: "FromBase64",
      value: function FromBase64(base64Text) {
        base64Text = base64Text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s/g, "");

        if (typeof atob !== "undefined") {
          return this.FromBinary(atob(base64Text));
        } else {
          return new Uint8Array(Buffer.from(base64Text, "base64")).buffer;
        }
      }
    }, {
      key: "FromBase64Url",
      value: function FromBase64Url(base64url) {
        return this.FromBase64(this.Base64Padding(base64url.replace(/\-/g, "+").replace(/\_/g, "/")));
      }
    }, {
      key: "ToBase64Url",
      value: function ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
      }
    }, {
      key: "FromUtf8String",
      value: function FromUtf8String(text) {
        var s = unescape(encodeURIComponent(text));
        var uintArray = new Uint8Array(s.length);

        for (var i = 0; i < s.length; i++) {
          uintArray[i] = s.charCodeAt(i);
        }

        return uintArray.buffer;
      }
    }, {
      key: "ToUtf8String",
      value: function ToUtf8String(buffer) {
        var buf = PrepareBuffer(buffer);
        var encodedString = String.fromCharCode.apply(null, buf);
        var decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
      }
    }, {
      key: "FromBinary",
      value: function FromBinary(text) {
        var stringLength = text.length;
        var resultView = new Uint8Array(stringLength);

        for (var i = 0; i < stringLength; i++) {
          resultView[i] = text.charCodeAt(i);
        }

        return resultView.buffer;
      }
    }, {
      key: "ToBinary",
      value: function ToBinary(buffer) {
        var buf = PrepareBuffer(buffer);
        var resultString = "";
        var len = buf.length;

        for (var i = 0; i < len; i++) {
          resultString = resultString + String.fromCharCode(buf[i]);
        }

        return resultString;
      }
    }, {
      key: "ToHex",
      value: function ToHex(buffer) {
        var buf = PrepareBuffer(buffer);
        var splitter = "";
        var res = [];
        var len = buf.length;

        for (var i = 0; i < len; i++) {
          var char = buf[i].toString(16);
          res.push(char.length === 1 ? "0" + char : char);
        }

        return res.join(splitter);
      }
    }, {
      key: "FromHex",
      value: function FromHex(hexString) {
        var res = new Uint8Array(hexString.length / 2);

        for (var i = 0; i < hexString.length; i = i + 2) {
          var c = hexString.slice(i, i + 2);
          res[i / 2] = parseInt(c, 16);
        }

        return res.buffer;
      }
    }, {
      key: "Base64Padding",
      value: function Base64Padding(base64) {
        var padCount = 4 - base64.length % 4;

        if (padCount < 4) {
          for (var i = 0; i < padCount; i++) {
            base64 += "=";
          }
        }

        return base64;
      }
    }]);

    return Convert;
  }();

  var BufferSourceConverter =
  /*#__PURE__*/
  function () {
    function BufferSourceConverter() {
      _classCallCheck(this, BufferSourceConverter);
    }

    _createClass(BufferSourceConverter, null, [{
      key: "toArrayBuffer",
      value: function toArrayBuffer(data) {
        var buf = this.toUint8Array(data);

        if (buf.byteOffset || buf.length) {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
        }

        return buf.buffer;
      }
    }, {
      key: "toUint8Array",
      value: function toUint8Array(data) {
        if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
          return new Uint8Array(data);
        }

        if (ArrayBuffer.isView(data)) {
          return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }

        if (data instanceof ArrayBuffer) {
          return new Uint8Array(data);
        }

        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      }
    }, {
      key: "isBufferSource",
      value: function isBufferSource(data) {
        return ArrayBuffer.isView(data) || data instanceof ArrayBuffer;
      }
    }]);

    return BufferSourceConverter;
  }();

  function assign(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    var res = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      for (var prop in obj) {
        res[prop] = obj[prop];
      }
    }

    return res;
  }

  function combine() {
    for (var _len2 = arguments.length, buf = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      buf[_key2] = arguments[_key2];
    }

    var totalByteLength = buf.map(function (item) {
      return item.byteLength;
    }).reduce(function (prev, cur) {
      return prev + cur;
    });
    var res = new Uint8Array(totalByteLength);
    var currentPos = 0;
    buf.map(function (item) {
      return new Uint8Array(item);
    }).forEach(function (arr) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item2 = _step.value;
          res[currentPos++] = item2;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
    return res.buffer;
  }

  function _isEqual(bytes1, bytes2) {
    if (!(bytes1 && bytes2)) {
      return false;
    }

    if (bytes1.byteLength !== bytes2.byteLength) {
      return false;
    }

    var b1 = new Uint8Array(bytes1);
    var b2 = new Uint8Array(bytes2);

    for (var i = 0; i < bytes1.byteLength; i++) {
      if (b1[i] !== b2[i]) {
        return false;
      }
    }

    return true;
  }
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */


  function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  var ArrayBufferConverter =
  /*#__PURE__*/
  function () {
    function ArrayBufferConverter() {
      _classCallCheck(this, ArrayBufferConverter);
    }

    _createClass(ArrayBufferConverter, null, [{
      key: "set",
      value: function () {
        var _set = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(value) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", new Uint8Array(value));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function set(_x) {
          return _set.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "get",
      value: function () {
        var _get = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(value) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", new Uint8Array(value).buffer);

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function get(_x2) {
          return _get.apply(this, arguments);
        }

        return get;
      }()
    }]);

    return ArrayBufferConverter;
  }();

  function ProtobufElement(params) {
    return function (target) {
      var t = target;
      t.localName = params.name || t.name || t.toString().match(/^function\s*([^\s(]+)/)[1];
      t.items = t.items || {};
      t.target = target;
      t.items = assign({}, t.items);
      var scheme = new protobufjs.Type(t.localName);

      for (var key in t.items) {
        var item = t.items[key];
        var rule = void 0;

        if (item.repeated) {
          rule = "repeated";
        } else if (item.required) {
          rule = "required";
        }

        scheme.add(new protobufjs.Field(item.name, item.id, item.type, rule));
      }

      t.protobuf = scheme;
    };
  }

  function defineProperty(target, key, params) {
    var propertyKey = "_".concat(key);
    var opt = {
      set: function set(v) {
        if (this[propertyKey] !== v) {
          this.raw = null;
          this[propertyKey] = v;
        }
      },
      get: function get() {
        if (this[propertyKey] === void 0) {
          var defaultValue = params.defaultValue;

          if (params.parser && !params.repeated) {
            defaultValue = new params.parser();
          }

          this[propertyKey] = defaultValue;
        }

        return this[propertyKey];
      },
      enumerable: true
    };
    Object.defineProperty(target, propertyKey, {
      writable: true,
      enumerable: false
    });
    Object.defineProperty(target, key, opt);
  }

  function ProtobufProperty(params) {
    return function (target, propertyKey) {
      var t = target.constructor;
      var key = propertyKey;
      t.items = t.items || {};

      if (t.target !== t) {
        t.items = assign({}, t.items);
        t.target = t;
      }

      t.items[key] = {
        id: params.id,
        type: params.type || "bytes",
        defaultValue: params.defaultValue,
        converter: params.converter || null,
        parser: params.parser || null
      };
      params.name = params.name || key;
      t.items[key].name = params.name;
      t.items[key].required = params.required || false;
      t.items[key].repeated = params.repeated || false;
      defineProperty(target, key, t.items[key]);
    };
  }

  var ObjectProto =
  /*#__PURE__*/
  function () {
    function ObjectProto() {
      _classCallCheck(this, ObjectProto);
    }

    _createClass(ObjectProto, [{
      key: "isEmpty",
      value: function isEmpty() {
        return this.raw === undefined;
      }
    }, {
      key: "hasChanged",
      value: function hasChanged() {
        if (this.raw === null) {
          return true;
        }

        var thisStatic = this.constructor;
        var that = this;

        for (var key in thisStatic.items) {
          var item = thisStatic.items[key];

          if (item.repeated) {
            if (item.parser) {
              return that[key].some(function (arrayItem) {
                return arrayItem.hasChanged();
              });
            }
          } else {
            if (item.parser && that[key] && that[key].hasChanged()) {
              return true;
            }
          }
        }

        return false;
      }
    }, {
      key: "importProto",
      value: function () {
        var _importProto = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(data) {
          var thisStatic, that, scheme, raw, key, item, schemeValues, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, schemeValue;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  thisStatic = this.constructor;
                  that = this;

                  if (!(data instanceof ObjectProto)) {
                    _context3.next = 8;
                    break;
                  }

                  _context3.next = 5;
                  return data.exportProto();

                case 5:
                  raw = _context3.sent;
                  _context3.next = 9;
                  break;

                case 8:
                  raw = data;

                case 9:
                  _context3.prev = 9;
                  scheme = thisStatic.protobuf.decode(new Uint8Array(raw));
                  _context3.next = 16;
                  break;

                case 13:
                  _context3.prev = 13;
                  _context3.t0 = _context3["catch"](9);
                  throw new Error("Error: Cannot decode message for ".concat(thisStatic.localName, ".\n$ProtobufError: ").concat(_context3.t0.message));

                case 16:
                  _context3.t1 = regeneratorRuntime.keys(thisStatic.items);

                case 17:
                  if ((_context3.t2 = _context3.t1()).done) {
                    _context3.next = 61;
                    break;
                  }

                  key = _context3.t2.value;
                  item = thisStatic.items[key];
                  schemeValues = scheme[item.name];

                  if (ArrayBuffer.isView(schemeValues)) {
                    schemeValues = new Uint8Array(schemeValues);
                  }

                  if (!Array.isArray(schemeValues)) {
                    if (item.repeated) {
                      that[key] = schemeValues = [];
                    } else {
                      schemeValues = [schemeValues];
                    }
                  }

                  if (item.repeated && !that[key]) {
                    that[key] = [];
                  }

                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context3.prev = 27;
                  _iterator2 = schemeValues[Symbol.iterator]();

                case 29:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context3.next = 45;
                    break;
                  }

                  schemeValue = _step2.value;

                  if (!item.repeated) {
                    _context3.next = 39;
                    break;
                  }

                  _context3.t3 = that[key];
                  _context3.next = 35;
                  return this.importItem(item, schemeValue);

                case 35:
                  _context3.t4 = _context3.sent;

                  _context3.t3.push.call(_context3.t3, _context3.t4);

                  _context3.next = 42;
                  break;

                case 39:
                  _context3.next = 41;
                  return this.importItem(item, schemeValue);

                case 41:
                  that[key] = _context3.sent;

                case 42:
                  _iteratorNormalCompletion2 = true;
                  _context3.next = 29;
                  break;

                case 45:
                  _context3.next = 51;
                  break;

                case 47:
                  _context3.prev = 47;
                  _context3.t5 = _context3["catch"](27);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context3.t5;

                case 51:
                  _context3.prev = 51;
                  _context3.prev = 52;

                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }

                case 54:
                  _context3.prev = 54;

                  if (!_didIteratorError2) {
                    _context3.next = 57;
                    break;
                  }

                  throw _iteratorError2;

                case 57:
                  return _context3.finish(54);

                case 58:
                  return _context3.finish(51);

                case 59:
                  _context3.next = 17;
                  break;

                case 61:
                  this.raw = raw;

                case 62:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[9, 13], [27, 47, 51, 59], [52,, 54, 58]]);
        }));

        function importProto(_x3) {
          return _importProto.apply(this, arguments);
        }

        return importProto;
      }()
    }, {
      key: "exportProto",
      value: function () {
        var _exportProto = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var thisStatic, that, protobuf, key, item, values, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, value, protobufValue;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (this.hasChanged()) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt("return", this.raw);

                case 2:
                  thisStatic = this.constructor;
                  that = this;
                  protobuf = {};
                  _context4.t0 = regeneratorRuntime.keys(thisStatic.items);

                case 6:
                  if ((_context4.t1 = _context4.t0()).done) {
                    _context4.next = 41;
                    break;
                  }

                  key = _context4.t1.value;
                  item = thisStatic.items[key];
                  values = that[key];

                  if (!Array.isArray(values)) {
                    values = values === void 0 ? [] : [values];
                  }

                  _iteratorNormalCompletion3 = true;
                  _didIteratorError3 = false;
                  _iteratorError3 = undefined;
                  _context4.prev = 14;
                  _iterator3 = values[Symbol.iterator]();

                case 16:
                  if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                    _context4.next = 25;
                    break;
                  }

                  value = _step3.value;
                  _context4.next = 20;
                  return this.exportItem(item, value);

                case 20:
                  protobufValue = _context4.sent;

                  if (item.repeated) {
                    if (!protobuf[item.name]) {
                      protobuf[item.name] = [];
                    }

                    protobuf[item.name].push(protobufValue);
                  } else {
                    protobuf[item.name] = protobufValue;
                  }

                case 22:
                  _iteratorNormalCompletion3 = true;
                  _context4.next = 16;
                  break;

                case 25:
                  _context4.next = 31;
                  break;

                case 27:
                  _context4.prev = 27;
                  _context4.t2 = _context4["catch"](14);
                  _didIteratorError3 = true;
                  _iteratorError3 = _context4.t2;

                case 31:
                  _context4.prev = 31;
                  _context4.prev = 32;

                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }

                case 34:
                  _context4.prev = 34;

                  if (!_didIteratorError3) {
                    _context4.next = 37;
                    break;
                  }

                  throw _iteratorError3;

                case 37:
                  return _context4.finish(34);

                case 38:
                  return _context4.finish(31);

                case 39:
                  _context4.next = 6;
                  break;

                case 41:
                  this.raw = new Uint8Array(thisStatic.protobuf.encode(protobuf).finish()).buffer;
                  return _context4.abrupt("return", this.raw);

                case 43:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[14, 27, 31, 39], [32,, 34, 38]]);
        }));

        function exportProto() {
          return _exportProto.apply(this, arguments);
        }

        return exportProto;
      }()
    }, {
      key: "exportItem",
      value: function () {
        var _exportItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(template, value) {
          var thisStatic, result, obj, raw;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  thisStatic = this.constructor;

                  if (!template.parser) {
                    _context5.next = 11;
                    break;
                  }

                  obj = value;
                  _context5.next = 5;
                  return obj.exportProto();

                case 5:
                  raw = _context5.sent;

                  if (!(template.required && !raw)) {
                    _context5.next = 8;
                    break;
                  }

                  throw new Error("Error: Paramter '".concat(template.name, "' is required in '").concat(thisStatic.localName, "' protobuf message."));

                case 8:
                  if (raw) {
                    result = new Uint8Array(raw);
                  }

                  _context5.next = 22;
                  break;

                case 11:
                  if (!(template.required && value === void 0)) {
                    _context5.next = 13;
                    break;
                  }

                  throw new Error("Error: Paramter '".concat(template.name, "' is required in '").concat(thisStatic.localName, "' protobuf message."));

                case 13:
                  if (!template.converter) {
                    _context5.next = 20;
                    break;
                  }

                  if (!value) {
                    _context5.next = 18;
                    break;
                  }

                  _context5.next = 17;
                  return template.converter.set(value);

                case 17:
                  result = _context5.sent;

                case 18:
                  _context5.next = 22;
                  break;

                case 20:
                  if (value instanceof ArrayBuffer) {
                    value = new Uint8Array(value);
                  }

                  result = value;

                case 22:
                  return _context5.abrupt("return", result);

                case 23:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function exportItem(_x4, _x5) {
          return _exportItem.apply(this, arguments);
        }

        return exportItem;
      }()
    }, {
      key: "importItem",
      value: function () {
        var _importItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee6(template, value) {
          var thisStatic, result, parser;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  thisStatic = this.constructor;

                  if (!template.parser) {
                    _context6.next = 13;
                    break;
                  }

                  parser = template.parser;

                  if (!(value && value.byteLength)) {
                    _context6.next = 9;
                    break;
                  }

                  _context6.next = 6;
                  return parser.importProto(new Uint8Array(value).buffer);

                case 6:
                  result = _context6.sent;
                  _context6.next = 11;
                  break;

                case 9:
                  if (!template.required) {
                    _context6.next = 11;
                    break;
                  }

                  throw new Error("Error: Parameter '".concat(template.name, "' is required in '").concat(thisStatic.localName, "' protobuf message."));

                case 11:
                  _context6.next = 25;
                  break;

                case 13:
                  if (!template.converter) {
                    _context6.next = 24;
                    break;
                  }

                  if (!(value && value.byteLength)) {
                    _context6.next = 20;
                    break;
                  }

                  _context6.next = 17;
                  return template.converter.get(value);

                case 17:
                  result = _context6.sent;
                  _context6.next = 22;
                  break;

                case 20:
                  if (!template.required) {
                    _context6.next = 22;
                    break;
                  }

                  throw new Error("Error: Parameter '".concat(template.name, "' is required in '").concat(thisStatic.localName, "' protobuf message."));

                case 22:
                  _context6.next = 25;
                  break;

                case 24:
                  result = value;

                case 25:
                  return _context6.abrupt("return", result);

                case 26:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function importItem(_x6, _x7) {
          return _importItem.apply(this, arguments);
        }

        return importItem;
      }()
    }], [{
      key: "importProto",
      value: function () {
        var _importProto2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7(data) {
          var res;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  res = new this();
                  _context7.next = 3;
                  return res.importProto(data);

                case 3:
                  return _context7.abrupt("return", res);

                case 4:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function importProto(_x8) {
          return _importProto2.apply(this, arguments);
        }

        return importProto;
      }()
    }]);

    return ObjectProto;
  }();

  var domain; // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).

  function EventHandlers() {}

  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  } // nodejs oddity
  // require('events') === require('events').EventEmitter


  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.usingDomains = false;
  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.

  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function () {
    this.domain = null;

    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  }; // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.


  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  }; // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.


  function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self);
      }
    }
  }

  function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self, arg1);
      }
    }
  }

  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self, arg1, arg2);
      }
    }
  }

  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].call(self, arg1, arg2, arg3);
      }
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) {
        listeners[i].apply(self, args);
      }
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = type === 'error';
    events = this._events;
    if (events) doError = doError && events.error == null;else if (!doError) return false;
    domain = this.domain; // If there is no 'error' event listener then throw.

    if (doError) {
      er = arguments[1];

      if (domain) {
        if (!er) er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }

      return false;
    }

    handler = events[type];
    if (!handler) return false;
    var isFn = typeof handler === 'function';
    len = arguments.length;

    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;

      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;

      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;

      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower

      default:
        args = new Array(len - 1);

        for (i = 1; i < len; i++) {
          args[i - 1] = arguments[i];
        }

        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    events = target._events;

    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object

        events = target._events;
      }

      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      } // Check for listener leak


      if (!existing.warned) {
        m = $getMaxListeners(target);

        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }

  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function _onceWrap(target, type, listener) {
    var fired = false;

    function g() {
      target.removeListener(type, g);

      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }

    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }; // emits a 'removeListener' event iff the listener was removed


  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    events = this._events;
    if (!events) return this;
    list = events[type];
    if (!list) return this;

    if (list === listener || list.listener && list.listener === listener) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list[0] = undefined;

        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events;
    events = this._events;
    if (!events) return this; // not listening for removeListener, no need to emit

    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
      }

      return this;
    } // emit removeListener for all listeners on all events


    if (arguments.length === 0) {
      var keys = Object.keys(events);

      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }

      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;
    if (!events) ret = [];else {
      evlistener = events[type];
      if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
    }
    return ret;
  };

  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;

  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  }; // About 1.5x faster than the two-arg version of Array#splice().


  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
      list[i] = list[k];
    }

    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);

    while (i--) {
      copy[i] = arr[i];
    }

    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);

    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }

    return ret;
  }
  /**
   *
   * 2key-ratchet
   * Copyright (c) 2019 Peculiar Ventures, Inc
   * Based on https://whispersystems.org/docs/specifications/doubleratchet/ and
   * https://whispersystems.org/docs/specifications/x3dh/ by Open Whisper Systems
   *
   */


  var SIGN_ALGORITHM_NAME = "ECDSA";
  var DH_ALGORITHM_NAME = "ECDH";
  var SECRET_KEY_NAME = "AES-CBC";
  var HASH_NAME = "SHA-256";
  var HMAC_NAME = "HMAC";
  var MAX_RATCHET_STACK_SIZE = 20;
  var INFO_TEXT = Convert.FromBinary("InfoText");
  var INFO_RATCHET = Convert.FromBinary("InfoRatchet");
  var INFO_MESSAGE_KEYS = Convert.FromBinary("InfoMessageKeys");
  var engine = null;

  if (typeof self !== "undefined") {
    engine = {
      crypto: self.crypto,
      name: "WebCrypto"
    };
  }

  function setEngine(name, crypto) {
    engine = {
      crypto: crypto,
      name: name
    };
  }

  function getEngine() {
    if (!engine) {
      throw new Error("WebCrypto engine is empty. Use setEngine to resolve it.");
    }

    return engine;
  }

  var Curve =
  /*#__PURE__*/
  function () {
    function Curve() {
      _classCallCheck(this, Curve);
    }

    _createClass(Curve, null, [{
      key: "generateKeyPair",
      value: function () {
        var _generateKeyPair = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee8(type) {
          var name, usage, keys, publicKey, res;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  name = type;
                  usage = type === "ECDSA" ? ["sign", "verify"] : ["deriveKey", "deriveBits"];
                  _context8.next = 4;
                  return getEngine().crypto.subtle.generateKey({
                    name: name,
                    namedCurve: this.NAMED_CURVE
                  }, false, usage);

                case 4:
                  keys = _context8.sent;
                  _context8.next = 7;
                  return ECPublicKey.create(keys.publicKey);

                case 7:
                  publicKey = _context8.sent;
                  res = {
                    privateKey: keys.privateKey,
                    publicKey: publicKey
                  };
                  return _context8.abrupt("return", res);

                case 10:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function generateKeyPair(_x9) {
          return _generateKeyPair.apply(this, arguments);
        }

        return generateKeyPair;
      }()
    }, {
      key: "deriveBytes",
      value: function deriveBytes(privateKey, publicKey) {
        return getEngine().crypto.subtle.deriveBits({
          name: "ECDH",
          public: publicKey.key
        }, privateKey, 256);
      }
    }, {
      key: "verify",
      value: function verify(signingKey, message, signature) {
        return getEngine().crypto.subtle.verify({
          name: "ECDSA",
          hash: this.DIGEST_ALGORITHM
        }, signingKey.key, signature, message);
      }
    }, {
      key: "sign",
      value: function () {
        var _sign = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee9(signingKey, message) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt("return", getEngine().crypto.subtle.sign({
                    name: "ECDSA",
                    hash: this.DIGEST_ALGORITHM
                  }, signingKey, message));

                case 1:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function sign(_x10, _x11) {
          return _sign.apply(this, arguments);
        }

        return sign;
      }()
    }, {
      key: "ecKeyPairToJson",
      value: function () {
        var _ecKeyPairToJson = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee10(key) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.t0 = key.privateKey;
                  _context10.t1 = key.publicKey.key;
                  _context10.next = 4;
                  return key.publicKey.thumbprint();

                case 4:
                  _context10.t2 = _context10.sent;
                  return _context10.abrupt("return", {
                    privateKey: _context10.t0,
                    publicKey: _context10.t1,
                    thumbprint: _context10.t2
                  });

                case 6:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10);
        }));

        function ecKeyPairToJson(_x12) {
          return _ecKeyPairToJson.apply(this, arguments);
        }

        return ecKeyPairToJson;
      }()
    }, {
      key: "ecKeyPairFromJson",
      value: function () {
        var _ecKeyPairFromJson = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee11(keys) {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.t0 = keys.privateKey;
                  _context11.next = 3;
                  return ECPublicKey.create(keys.publicKey);

                case 3:
                  _context11.t1 = _context11.sent;
                  return _context11.abrupt("return", {
                    privateKey: _context11.t0,
                    publicKey: _context11.t1
                  });

                case 5:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11);
        }));

        function ecKeyPairFromJson(_x13) {
          return _ecKeyPairFromJson.apply(this, arguments);
        }

        return ecKeyPairFromJson;
      }()
    }]);

    return Curve;
  }();

  Curve.NAMED_CURVE = "P-256";
  Curve.DIGEST_ALGORITHM = "SHA-512";
  var AES_ALGORITHM = {
    name: "AES-CBC",
    length: 256
  };

  var Secret =
  /*#__PURE__*/
  function () {
    function Secret() {
      _classCallCheck(this, Secret);
    }

    _createClass(Secret, null, [{
      key: "randomBytes",
      value: function randomBytes(size) {
        var array = new Uint8Array(size);
        getEngine().crypto.getRandomValues(array);
        return array.buffer;
      }
    }, {
      key: "digest",
      value: function digest(alg, message) {
        return getEngine().crypto.subtle.digest(alg, message);
      }
    }, {
      key: "encrypt",
      value: function encrypt(key, data, iv) {
        return getEngine().crypto.subtle.encrypt({
          name: SECRET_KEY_NAME,
          iv: new Uint8Array(iv)
        }, key, data);
      }
    }, {
      key: "decrypt",
      value: function decrypt(key, data, iv) {
        return getEngine().crypto.subtle.decrypt({
          name: SECRET_KEY_NAME,
          iv: new Uint8Array(iv)
        }, key, data);
      }
    }, {
      key: "importHMAC",
      value: function importHMAC(raw) {
        return getEngine().crypto.subtle.importKey("raw", raw, {
          name: HMAC_NAME,
          hash: {
            name: HASH_NAME
          }
        }, false, ["sign", "verify"]);
      }
    }, {
      key: "importAES",
      value: function importAES(raw) {
        return getEngine().crypto.subtle.importKey("raw", raw, AES_ALGORITHM, false, ["encrypt", "decrypt"]);
      }
    }, {
      key: "sign",
      value: function () {
        var _sign2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee12(key, data) {
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return getEngine().crypto.subtle.sign({
                    name: HMAC_NAME,
                    hash: HASH_NAME
                  }, key, data);

                case 2:
                  return _context12.abrupt("return", _context12.sent);

                case 3:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12);
        }));

        function sign(_x14, _x15) {
          return _sign2.apply(this, arguments);
        }

        return sign;
      }()
    }, {
      key: "HKDF",
      value: function () {
        var _HKDF = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee13(IKM) {
          var keysCount,
              salt,
              info,
              PRKBytes,
              infoBuffer,
              PRK,
              T,
              i,
              _args13 = arguments;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  keysCount = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
                  salt = _args13.length > 2 ? _args13[2] : undefined;
                  info = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : new ArrayBuffer(0);

                  if (salt) {
                    _context13.next = 7;
                    break;
                  }

                  _context13.next = 6;
                  return this.importHMAC(new Uint8Array(32).buffer);

                case 6:
                  salt = _context13.sent;

                case 7:
                  _context13.next = 9;
                  return this.sign(salt, IKM);

                case 9:
                  PRKBytes = _context13.sent;
                  infoBuffer = new ArrayBuffer(32 + info.byteLength + 1);
                  _context13.next = 13;
                  return this.importHMAC(PRKBytes);

                case 13:
                  PRK = _context13.sent;
                  T = [new ArrayBuffer(0)];
                  i = 0;

                case 16:
                  if (!(i < keysCount)) {
                    _context13.next = 23;
                    break;
                  }

                  _context13.next = 19;
                  return this.sign(PRK, combine(T[i], info, new Uint8Array([i + 1]).buffer));

                case 19:
                  T[i + 1] = _context13.sent;

                case 20:
                  i++;
                  _context13.next = 16;
                  break;

                case 23:
                  return _context13.abrupt("return", T.slice(1));

                case 24:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13, this);
        }));

        function HKDF(_x16) {
          return _HKDF.apply(this, arguments);
        }

        return HKDF;
      }()
    }]);

    return Secret;
  }();

  var ECPublicKey =
  /*#__PURE__*/
  function () {
    function ECPublicKey() {
      _classCallCheck(this, ECPublicKey);
    }

    _createClass(ECPublicKey, [{
      key: "serialize",
      value: function serialize() {
        return this.serialized;
      }
    }, {
      key: "thumbprint",
      value: function () {
        var _thumbprint = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee14() {
          var bytes, thumbprint;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.next = 2;
                  return this.serialize();

                case 2:
                  bytes = _context14.sent;
                  _context14.next = 5;
                  return Secret.digest("SHA-256", bytes);

                case 5:
                  thumbprint = _context14.sent;
                  return _context14.abrupt("return", Convert.ToHex(thumbprint));

                case 7:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14, this);
        }));

        function thumbprint() {
          return _thumbprint.apply(this, arguments);
        }

        return thumbprint;
      }()
    }, {
      key: "isEqual",
      value: function () {
        var _isEqual2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee15(other) {
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  if (other && other instanceof ECPublicKey) {
                    _context15.next = 2;
                    break;
                  }

                  return _context15.abrupt("return", false);

                case 2:
                  return _context15.abrupt("return", _isEqual(this.serialized, other.serialized));

                case 3:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee15, this);
        }));

        function isEqual(_x17) {
          return _isEqual2.apply(this, arguments);
        }

        return isEqual;
      }()
    }], [{
      key: "create",
      value: function () {
        var _create = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee16(publicKey) {
          var res, algName, jwk, x, y, xy;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  res = new this();
                  algName = publicKey.algorithm.name.toUpperCase();

                  if (algName === "ECDH" || algName === "ECDSA") {
                    _context16.next = 4;
                    break;
                  }

                  throw new Error("Error: Unsupported asymmetric key algorithm.");

                case 4:
                  if (!(publicKey.type !== "public")) {
                    _context16.next = 6;
                    break;
                  }

                  throw new Error("Error: Expected key type to be public but it was not.");

                case 6:
                  res.key = publicKey;
                  _context16.next = 9;
                  return getEngine().crypto.subtle.exportKey("jwk", publicKey);

                case 9:
                  jwk = _context16.sent;

                  if (jwk.x && jwk.y) {
                    _context16.next = 12;
                    break;
                  }

                  throw new Error("Wrong JWK data for EC public key. Parameters x and y are required.");

                case 12:
                  x = Convert.FromBase64Url(jwk.x);
                  y = Convert.FromBase64Url(jwk.y);
                  xy = Convert.ToBinary(x) + Convert.ToBinary(y);
                  res.serialized = Convert.FromBinary(xy);
                  _context16.next = 18;
                  return res.thumbprint();

                case 18:
                  res.id = _context16.sent;
                  return _context16.abrupt("return", res);

                case 20:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee16, this);
        }));

        function create(_x18) {
          return _create.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: "importKey",
      value: function () {
        var _importKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee17(bytes, type) {
          var x, y, jwk, usage, key, res;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  x = Convert.ToBase64Url(bytes.slice(0, 32));
                  y = Convert.ToBase64Url(bytes.slice(32));
                  jwk = {
                    crv: Curve.NAMED_CURVE,
                    kty: "EC",
                    x: x,
                    y: y
                  };
                  usage = type === "ECDSA" ? ["verify"] : [];
                  _context17.next = 6;
                  return getEngine().crypto.subtle.importKey("jwk", jwk, {
                    name: type,
                    namedCurve: Curve.NAMED_CURVE
                  }, true, usage);

                case 6:
                  key = _context17.sent;
                  _context17.next = 9;
                  return ECPublicKey.create(key);

                case 9:
                  res = _context17.sent;
                  return _context17.abrupt("return", res);

                case 11:
                case "end":
                  return _context17.stop();
              }
            }
          }, _callee17);
        }));

        function importKey(_x19, _x20) {
          return _importKey.apply(this, arguments);
        }

        return importKey;
      }()
    }]);

    return ECPublicKey;
  }();

  var Identity =
  /*#__PURE__*/
  function () {
    _createClass(Identity, null, [{
      key: "fromJSON",
      value: function () {
        var _fromJSON = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee18(obj) {
          var signingKey, exchangeKey, res;
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.next = 2;
                  return Curve.ecKeyPairFromJson(obj.signingKey);

                case 2:
                  signingKey = _context18.sent;
                  _context18.next = 5;
                  return Curve.ecKeyPairFromJson(obj.exchangeKey);

                case 5:
                  exchangeKey = _context18.sent;
                  res = new this(obj.id, signingKey, exchangeKey);
                  res.createdAt = new Date(obj.createdAt);
                  _context18.next = 10;
                  return res.fromJSON(obj);

                case 10:
                  return _context18.abrupt("return", res);

                case 11:
                case "end":
                  return _context18.stop();
              }
            }
          }, _callee18, this);
        }));

        function fromJSON(_x21) {
          return _fromJSON.apply(this, arguments);
        }

        return fromJSON;
      }()
    }, {
      key: "create",
      value: function () {
        var _create2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee19(id) {
          var signedPreKeyAmount,
              preKeyAmount,
              signingKey,
              exchangeKey,
              res,
              i,
              _i,
              _args19 = arguments;

          return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  signedPreKeyAmount = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : 0;
                  preKeyAmount = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : 0;
                  _context19.next = 4;
                  return Curve.generateKeyPair(SIGN_ALGORITHM_NAME);

                case 4:
                  signingKey = _context19.sent;
                  _context19.next = 7;
                  return Curve.generateKeyPair(DH_ALGORITHM_NAME);

                case 7:
                  exchangeKey = _context19.sent;
                  res = new Identity(id, signingKey, exchangeKey);
                  res.createdAt = new Date();
                  i = 0;

                case 11:
                  if (!(i < preKeyAmount)) {
                    _context19.next = 20;
                    break;
                  }

                  _context19.t0 = res.preKeys;
                  _context19.next = 15;
                  return Curve.generateKeyPair("ECDH");

                case 15:
                  _context19.t1 = _context19.sent;

                  _context19.t0.push.call(_context19.t0, _context19.t1);

                case 17:
                  i++;
                  _context19.next = 11;
                  break;

                case 20:
                  _i = 0;

                case 21:
                  if (!(_i < signedPreKeyAmount)) {
                    _context19.next = 30;
                    break;
                  }

                  _context19.t2 = res.signedPreKeys;
                  _context19.next = 25;
                  return Curve.generateKeyPair("ECDH");

                case 25:
                  _context19.t3 = _context19.sent;

                  _context19.t2.push.call(_context19.t2, _context19.t3);

                case 27:
                  _i++;
                  _context19.next = 21;
                  break;

                case 30:
                  return _context19.abrupt("return", res);

                case 31:
                case "end":
                  return _context19.stop();
              }
            }
          }, _callee19);
        }));

        function create(_x22) {
          return _create2.apply(this, arguments);
        }

        return create;
      }()
    }]);

    function Identity(id, signingKey, exchangeKey) {
      _classCallCheck(this, Identity);

      this.id = id;
      this.signingKey = signingKey;
      this.exchangeKey = exchangeKey;
      this.preKeys = [];
      this.signedPreKeys = [];
    }

    _createClass(Identity, [{
      key: "toJSON",
      value: function () {
        var _toJSON = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee20() {
          var preKeys, signedPreKeys, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, key, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _key3;

          return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  preKeys = [];
                  signedPreKeys = [];
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  _context20.prev = 5;
                  _iterator4 = this.preKeys[Symbol.iterator]();

                case 7:
                  if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                    _context20.next = 17;
                    break;
                  }

                  key = _step4.value;
                  _context20.t0 = preKeys;
                  _context20.next = 12;
                  return Curve.ecKeyPairToJson(key);

                case 12:
                  _context20.t1 = _context20.sent;

                  _context20.t0.push.call(_context20.t0, _context20.t1);

                case 14:
                  _iteratorNormalCompletion4 = true;
                  _context20.next = 7;
                  break;

                case 17:
                  _context20.next = 23;
                  break;

                case 19:
                  _context20.prev = 19;
                  _context20.t2 = _context20["catch"](5);
                  _didIteratorError4 = true;
                  _iteratorError4 = _context20.t2;

                case 23:
                  _context20.prev = 23;
                  _context20.prev = 24;

                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }

                case 26:
                  _context20.prev = 26;

                  if (!_didIteratorError4) {
                    _context20.next = 29;
                    break;
                  }

                  throw _iteratorError4;

                case 29:
                  return _context20.finish(26);

                case 30:
                  return _context20.finish(23);

                case 31:
                  _iteratorNormalCompletion5 = true;
                  _didIteratorError5 = false;
                  _iteratorError5 = undefined;
                  _context20.prev = 34;
                  _iterator5 = this.signedPreKeys[Symbol.iterator]();

                case 36:
                  if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                    _context20.next = 46;
                    break;
                  }

                  _key3 = _step5.value;
                  _context20.t3 = signedPreKeys;
                  _context20.next = 41;
                  return Curve.ecKeyPairToJson(_key3);

                case 41:
                  _context20.t4 = _context20.sent;

                  _context20.t3.push.call(_context20.t3, _context20.t4);

                case 43:
                  _iteratorNormalCompletion5 = true;
                  _context20.next = 36;
                  break;

                case 46:
                  _context20.next = 52;
                  break;

                case 48:
                  _context20.prev = 48;
                  _context20.t5 = _context20["catch"](34);
                  _didIteratorError5 = true;
                  _iteratorError5 = _context20.t5;

                case 52:
                  _context20.prev = 52;
                  _context20.prev = 53;

                  if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                    _iterator5.return();
                  }

                case 55:
                  _context20.prev = 55;

                  if (!_didIteratorError5) {
                    _context20.next = 58;
                    break;
                  }

                  throw _iteratorError5;

                case 58:
                  return _context20.finish(55);

                case 59:
                  return _context20.finish(52);

                case 60:
                  _context20.t6 = this.createdAt.toISOString();
                  _context20.next = 63;
                  return Curve.ecKeyPairToJson(this.exchangeKey);

                case 63:
                  _context20.t7 = _context20.sent;
                  _context20.t8 = this.id;
                  _context20.t9 = preKeys;
                  _context20.t10 = signedPreKeys;
                  _context20.next = 69;
                  return Curve.ecKeyPairToJson(this.signingKey);

                case 69:
                  _context20.t11 = _context20.sent;
                  return _context20.abrupt("return", {
                    createdAt: _context20.t6,
                    exchangeKey: _context20.t7,
                    id: _context20.t8,
                    preKeys: _context20.t9,
                    signedPreKeys: _context20.t10,
                    signingKey: _context20.t11
                  });

                case 71:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee20, this, [[5, 19, 23, 31], [24,, 26, 30], [34, 48, 52, 60], [53,, 55, 59]]);
        }));

        function toJSON() {
          return _toJSON.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee21(obj) {
          var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, key, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _key4;

          return regeneratorRuntime.wrap(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  this.id = obj.id;
                  _context21.next = 3;
                  return Curve.ecKeyPairFromJson(obj.signingKey);

                case 3:
                  this.signingKey = _context21.sent;
                  _context21.next = 6;
                  return Curve.ecKeyPairFromJson(obj.exchangeKey);

                case 6:
                  this.exchangeKey = _context21.sent;
                  this.preKeys = [];
                  _iteratorNormalCompletion6 = true;
                  _didIteratorError6 = false;
                  _iteratorError6 = undefined;
                  _context21.prev = 11;
                  _iterator6 = obj.preKeys[Symbol.iterator]();

                case 13:
                  if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                    _context21.next = 23;
                    break;
                  }

                  key = _step6.value;
                  _context21.t0 = this.preKeys;
                  _context21.next = 18;
                  return Curve.ecKeyPairFromJson(key);

                case 18:
                  _context21.t1 = _context21.sent;

                  _context21.t0.push.call(_context21.t0, _context21.t1);

                case 20:
                  _iteratorNormalCompletion6 = true;
                  _context21.next = 13;
                  break;

                case 23:
                  _context21.next = 29;
                  break;

                case 25:
                  _context21.prev = 25;
                  _context21.t2 = _context21["catch"](11);
                  _didIteratorError6 = true;
                  _iteratorError6 = _context21.t2;

                case 29:
                  _context21.prev = 29;
                  _context21.prev = 30;

                  if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                    _iterator6.return();
                  }

                case 32:
                  _context21.prev = 32;

                  if (!_didIteratorError6) {
                    _context21.next = 35;
                    break;
                  }

                  throw _iteratorError6;

                case 35:
                  return _context21.finish(32);

                case 36:
                  return _context21.finish(29);

                case 37:
                  this.signedPreKeys = [];
                  _iteratorNormalCompletion7 = true;
                  _didIteratorError7 = false;
                  _iteratorError7 = undefined;
                  _context21.prev = 41;
                  _iterator7 = obj.signedPreKeys[Symbol.iterator]();

                case 43:
                  if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                    _context21.next = 53;
                    break;
                  }

                  _key4 = _step7.value;
                  _context21.t3 = this.signedPreKeys;
                  _context21.next = 48;
                  return Curve.ecKeyPairFromJson(_key4);

                case 48:
                  _context21.t4 = _context21.sent;

                  _context21.t3.push.call(_context21.t3, _context21.t4);

                case 50:
                  _iteratorNormalCompletion7 = true;
                  _context21.next = 43;
                  break;

                case 53:
                  _context21.next = 59;
                  break;

                case 55:
                  _context21.prev = 55;
                  _context21.t5 = _context21["catch"](41);
                  _didIteratorError7 = true;
                  _iteratorError7 = _context21.t5;

                case 59:
                  _context21.prev = 59;
                  _context21.prev = 60;

                  if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                    _iterator7.return();
                  }

                case 62:
                  _context21.prev = 62;

                  if (!_didIteratorError7) {
                    _context21.next = 65;
                    break;
                  }

                  throw _iteratorError7;

                case 65:
                  return _context21.finish(62);

                case 66:
                  return _context21.finish(59);

                case 67:
                case "end":
                  return _context21.stop();
              }
            }
          }, _callee21, this, [[11, 25, 29, 37], [30,, 32, 36], [41, 55, 59, 67], [60,, 62, 66]]);
        }));

        function fromJSON(_x23) {
          return _fromJSON2.apply(this, arguments);
        }

        return fromJSON;
      }()
    }]);

    return Identity;
  }();

  var RemoteIdentity =
  /*#__PURE__*/
  function () {
    function RemoteIdentity() {
      _classCallCheck(this, RemoteIdentity);
    }

    _createClass(RemoteIdentity, [{
      key: "fill",
      value: function fill(protocol) {
        this.signingKey = protocol.signingKey;
        this.exchangeKey = protocol.exchangeKey;
        this.signature = protocol.signature;
        this.createdAt = protocol.createdAt;
      }
    }, {
      key: "verify",
      value: function verify() {
        return Curve.verify(this.signingKey, this.exchangeKey.serialize(), this.signature);
      }
    }, {
      key: "toJSON",
      value: function () {
        var _toJSON2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee22() {
          return regeneratorRuntime.wrap(function _callee22$(_context22) {
            while (1) {
              switch (_context22.prev = _context22.next) {
                case 0:
                  _context22.t0 = this.createdAt.toISOString();
                  _context22.next = 3;
                  return this.exchangeKey.key;

                case 3:
                  _context22.t1 = _context22.sent;
                  _context22.t2 = this.id;
                  _context22.t3 = this.signature;
                  _context22.next = 8;
                  return this.signingKey.key;

                case 8:
                  _context22.t4 = _context22.sent;
                  _context22.next = 11;
                  return this.signingKey.thumbprint();

                case 11:
                  _context22.t5 = _context22.sent;
                  return _context22.abrupt("return", {
                    createdAt: _context22.t0,
                    exchangeKey: _context22.t1,
                    id: _context22.t2,
                    signature: _context22.t3,
                    signingKey: _context22.t4,
                    thumbprint: _context22.t5
                  });

                case 13:
                case "end":
                  return _context22.stop();
              }
            }
          }, _callee22, this);
        }));

        function toJSON() {
          return _toJSON2.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee23(obj) {
          var ok;
          return regeneratorRuntime.wrap(function _callee23$(_context23) {
            while (1) {
              switch (_context23.prev = _context23.next) {
                case 0:
                  this.id = obj.id;
                  this.signature = obj.signature;
                  _context23.next = 4;
                  return ECPublicKey.create(obj.signingKey);

                case 4:
                  this.signingKey = _context23.sent;
                  _context23.next = 7;
                  return ECPublicKey.create(obj.exchangeKey);

                case 7:
                  this.exchangeKey = _context23.sent;
                  this.createdAt = new Date(obj.createdAt);
                  _context23.next = 11;
                  return this.verify();

                case 11:
                  ok = _context23.sent;

                  if (ok) {
                    _context23.next = 14;
                    break;
                  }

                  throw new Error("Error: Wrong signature for RemoteIdentity");

                case 14:
                case "end":
                  return _context23.stop();
              }
            }
          }, _callee23, this);
        }));

        function fromJSON(_x24) {
          return _fromJSON3.apply(this, arguments);
        }

        return fromJSON;
      }()
    }], [{
      key: "fill",
      value: function fill(protocol) {
        var res = new RemoteIdentity();
        res.fill(protocol);
        return res;
      }
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee24(obj) {
          var res;
          return regeneratorRuntime.wrap(function _callee24$(_context24) {
            while (1) {
              switch (_context24.prev = _context24.next) {
                case 0:
                  res = new this();
                  _context24.next = 3;
                  return res.fromJSON(obj);

                case 3:
                  return _context24.abrupt("return", res);

                case 4:
                case "end":
                  return _context24.stop();
              }
            }
          }, _callee24, this);
        }));

        function fromJSON(_x25) {
          return _fromJSON4.apply(this, arguments);
        }

        return fromJSON;
      }()
    }]);

    return RemoteIdentity;
  }();

  var BaseProtocol =
  /*#__PURE__*/
  function (_ObjectProto) {
    _inherits(BaseProtocol, _ObjectProto);

    function BaseProtocol() {
      _classCallCheck(this, BaseProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(BaseProtocol).apply(this, arguments));
    }

    return BaseProtocol;
  }(ObjectProto);

  __decorate([ProtobufProperty({
    id: 0,
    type: "uint32",
    defaultValue: 1
  })], BaseProtocol.prototype, "version", void 0);

  BaseProtocol = __decorate([ProtobufElement({
    name: "Base"
  })], BaseProtocol);

  var ECDSAPublicKeyConverter =
  /*#__PURE__*/
  function () {
    function ECDSAPublicKeyConverter() {
      _classCallCheck(this, ECDSAPublicKeyConverter);
    }

    _createClass(ECDSAPublicKeyConverter, null, [{
      key: "set",
      value: function () {
        var _set2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee25(value) {
          return regeneratorRuntime.wrap(function _callee25$(_context25) {
            while (1) {
              switch (_context25.prev = _context25.next) {
                case 0:
                  return _context25.abrupt("return", new Uint8Array(value.serialize()));

                case 1:
                case "end":
                  return _context25.stop();
              }
            }
          }, _callee25);
        }));

        function set(_x26) {
          return _set2.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "get",
      value: function () {
        var _get2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee26(value) {
          return regeneratorRuntime.wrap(function _callee26$(_context26) {
            while (1) {
              switch (_context26.prev = _context26.next) {
                case 0:
                  return _context26.abrupt("return", ECPublicKey.importKey(value.buffer, "ECDSA"));

                case 1:
                case "end":
                  return _context26.stop();
              }
            }
          }, _callee26);
        }));

        function get(_x27) {
          return _get2.apply(this, arguments);
        }

        return get;
      }()
    }]);

    return ECDSAPublicKeyConverter;
  }();

  var ECDHPublicKeyConverter =
  /*#__PURE__*/
  function () {
    function ECDHPublicKeyConverter() {
      _classCallCheck(this, ECDHPublicKeyConverter);
    }

    _createClass(ECDHPublicKeyConverter, null, [{
      key: "set",
      value: function () {
        var _set3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee27(value) {
          return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  return _context27.abrupt("return", new Uint8Array(value.serialize()));

                case 1:
                case "end":
                  return _context27.stop();
              }
            }
          }, _callee27);
        }));

        function set(_x28) {
          return _set3.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "get",
      value: function () {
        var _get3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee28(value) {
          return regeneratorRuntime.wrap(function _callee28$(_context28) {
            while (1) {
              switch (_context28.prev = _context28.next) {
                case 0:
                  return _context28.abrupt("return", ECPublicKey.importKey(value.buffer, "ECDH"));

                case 1:
                case "end":
                  return _context28.stop();
              }
            }
          }, _callee28);
        }));

        function get(_x29) {
          return _get3.apply(this, arguments);
        }

        return get;
      }()
    }]);

    return ECDHPublicKeyConverter;
  }();

  var DateConverter =
  /*#__PURE__*/
  function () {
    function DateConverter() {
      _classCallCheck(this, DateConverter);
    }

    _createClass(DateConverter, null, [{
      key: "set",
      value: function () {
        var _set4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee29(value) {
          return regeneratorRuntime.wrap(function _callee29$(_context29) {
            while (1) {
              switch (_context29.prev = _context29.next) {
                case 0:
                  return _context29.abrupt("return", new Uint8Array(Convert.FromString(value.toISOString())));

                case 1:
                case "end":
                  return _context29.stop();
              }
            }
          }, _callee29);
        }));

        function set(_x30) {
          return _set4.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "get",
      value: function () {
        var _get4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee30(value) {
          return regeneratorRuntime.wrap(function _callee30$(_context30) {
            while (1) {
              switch (_context30.prev = _context30.next) {
                case 0:
                  return _context30.abrupt("return", new Date(Convert.ToString(value)));

                case 1:
                case "end":
                  return _context30.stop();
              }
            }
          }, _callee30);
        }));

        function get(_x31) {
          return _get4.apply(this, arguments);
        }

        return get;
      }()
    }]);

    return DateConverter;
  }();

  var IdentityProtocol_1;

  var IdentityProtocol = IdentityProtocol_1 =
  /*#__PURE__*/
  function (_BaseProtocol) {
    _inherits(IdentityProtocol, _BaseProtocol);

    function IdentityProtocol() {
      _classCallCheck(this, IdentityProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(IdentityProtocol).apply(this, arguments));
    }

    _createClass(IdentityProtocol, [{
      key: "sign",
      value: function () {
        var _sign3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee31(key) {
          return regeneratorRuntime.wrap(function _callee31$(_context31) {
            while (1) {
              switch (_context31.prev = _context31.next) {
                case 0:
                  _context31.next = 2;
                  return Curve.sign(key, this.exchangeKey.serialize());

                case 2:
                  this.signature = _context31.sent;

                case 3:
                case "end":
                  return _context31.stop();
              }
            }
          }, _callee31, this);
        }));

        function sign(_x32) {
          return _sign3.apply(this, arguments);
        }

        return sign;
      }()
    }, {
      key: "verify",
      value: function () {
        var _verify = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee32() {
          return regeneratorRuntime.wrap(function _callee32$(_context32) {
            while (1) {
              switch (_context32.prev = _context32.next) {
                case 0:
                  _context32.next = 2;
                  return Curve.verify(this.signingKey, this.exchangeKey.serialize(), this.signature);

                case 2:
                  return _context32.abrupt("return", _context32.sent);

                case 3:
                case "end":
                  return _context32.stop();
              }
            }
          }, _callee32, this);
        }));

        function verify() {
          return _verify.apply(this, arguments);
        }

        return verify;
      }()
    }, {
      key: "fill",
      value: function () {
        var _fill = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee33(identity) {
          return regeneratorRuntime.wrap(function _callee33$(_context33) {
            while (1) {
              switch (_context33.prev = _context33.next) {
                case 0:
                  this.signingKey = identity.signingKey.publicKey;
                  this.exchangeKey = identity.exchangeKey.publicKey;
                  this.createdAt = identity.createdAt;
                  _context33.next = 5;
                  return this.sign(identity.signingKey.privateKey);

                case 5:
                case "end":
                  return _context33.stop();
              }
            }
          }, _callee33, this);
        }));

        function fill(_x33) {
          return _fill.apply(this, arguments);
        }

        return fill;
      }()
    }], [{
      key: "fill",
      value: function () {
        var _fill2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee34(identity) {
          var res;
          return regeneratorRuntime.wrap(function _callee34$(_context34) {
            while (1) {
              switch (_context34.prev = _context34.next) {
                case 0:
                  res = new IdentityProtocol_1();
                  _context34.next = 3;
                  return res.fill(identity);

                case 3:
                  return _context34.abrupt("return", res);

                case 4:
                case "end":
                  return _context34.stop();
              }
            }
          }, _callee34);
        }));

        function fill(_x34) {
          return _fill2.apply(this, arguments);
        }

        return fill;
      }()
    }]);

    return IdentityProtocol;
  }(BaseProtocol);

  __decorate([ProtobufProperty({
    id: 1,
    converter: ECDSAPublicKeyConverter
  })], IdentityProtocol.prototype, "signingKey", void 0);

  __decorate([ProtobufProperty({
    id: 2,
    converter: ECDHPublicKeyConverter
  })], IdentityProtocol.prototype, "exchangeKey", void 0);

  __decorate([ProtobufProperty({
    id: 3
  })], IdentityProtocol.prototype, "signature", void 0);

  __decorate([ProtobufProperty({
    id: 4,
    converter: DateConverter
  })], IdentityProtocol.prototype, "createdAt", void 0);

  IdentityProtocol = IdentityProtocol_1 = __decorate([ProtobufElement({
    name: "Identity"
  })], IdentityProtocol);

  var MessageProtocol =
  /*#__PURE__*/
  function (_BaseProtocol2) {
    _inherits(MessageProtocol, _BaseProtocol2);

    function MessageProtocol() {
      _classCallCheck(this, MessageProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(MessageProtocol).apply(this, arguments));
    }

    return MessageProtocol;
  }(BaseProtocol);

  __decorate([ProtobufProperty({
    id: 1,
    converter: ECDHPublicKeyConverter,
    required: true
  })], MessageProtocol.prototype, "senderRatchetKey", void 0);

  __decorate([ProtobufProperty({
    id: 2,
    type: "uint32",
    required: true
  })], MessageProtocol.prototype, "counter", void 0);

  __decorate([ProtobufProperty({
    id: 3,
    type: "uint32",
    required: true
  })], MessageProtocol.prototype, "previousCounter", void 0);

  __decorate([ProtobufProperty({
    id: 4,
    converter: ArrayBufferConverter,
    required: true
  })], MessageProtocol.prototype, "cipherText", void 0);

  MessageProtocol = __decorate([ProtobufElement({
    name: "Message"
  })], MessageProtocol);

  var MessageSignedProtocol =
  /*#__PURE__*/
  function (_BaseProtocol3) {
    _inherits(MessageSignedProtocol, _BaseProtocol3);

    function MessageSignedProtocol() {
      _classCallCheck(this, MessageSignedProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(MessageSignedProtocol).apply(this, arguments));
    }

    _createClass(MessageSignedProtocol, [{
      key: "sign",
      value: function () {
        var _sign4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee35(hmacKey) {
          return regeneratorRuntime.wrap(function _callee35$(_context35) {
            while (1) {
              switch (_context35.prev = _context35.next) {
                case 0:
                  _context35.next = 2;
                  return this.signHMAC(hmacKey);

                case 2:
                  this.signature = _context35.sent;

                case 3:
                case "end":
                  return _context35.stop();
              }
            }
          }, _callee35, this);
        }));

        function sign(_x35) {
          return _sign4.apply(this, arguments);
        }

        return sign;
      }()
    }, {
      key: "verify",
      value: function () {
        var _verify2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee36(hmacKey) {
          var signature;
          return regeneratorRuntime.wrap(function _callee36$(_context36) {
            while (1) {
              switch (_context36.prev = _context36.next) {
                case 0:
                  _context36.next = 2;
                  return this.signHMAC(hmacKey);

                case 2:
                  signature = _context36.sent;
                  return _context36.abrupt("return", _isEqual(signature, this.signature));

                case 4:
                case "end":
                  return _context36.stop();
              }
            }
          }, _callee36, this);
        }));

        function verify(_x36) {
          return _verify2.apply(this, arguments);
        }

        return verify;
      }()
    }, {
      key: "getSignedRaw",
      value: function () {
        var _getSignedRaw = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee37() {
          var receiverKey, senderKey, message, data;
          return regeneratorRuntime.wrap(function _callee37$(_context37) {
            while (1) {
              switch (_context37.prev = _context37.next) {
                case 0:
                  receiverKey = this.receiverKey.serialize();
                  senderKey = this.senderKey.serialize();
                  _context37.next = 4;
                  return this.message.exportProto();

                case 4:
                  message = _context37.sent;
                  data = combine(receiverKey, senderKey, message);
                  return _context37.abrupt("return", data);

                case 7:
                case "end":
                  return _context37.stop();
              }
            }
          }, _callee37, this);
        }));

        function getSignedRaw() {
          return _getSignedRaw.apply(this, arguments);
        }

        return getSignedRaw;
      }()
    }, {
      key: "signHMAC",
      value: function () {
        var _signHMAC = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee38(macKey) {
          var data, signature;
          return regeneratorRuntime.wrap(function _callee38$(_context38) {
            while (1) {
              switch (_context38.prev = _context38.next) {
                case 0:
                  _context38.next = 2;
                  return this.getSignedRaw();

                case 2:
                  data = _context38.sent;
                  _context38.next = 5;
                  return Secret.sign(macKey, data);

                case 5:
                  signature = _context38.sent;
                  return _context38.abrupt("return", signature);

                case 7:
                case "end":
                  return _context38.stop();
              }
            }
          }, _callee38, this);
        }));

        function signHMAC(_x37) {
          return _signHMAC.apply(this, arguments);
        }

        return signHMAC;
      }()
    }]);

    return MessageSignedProtocol;
  }(BaseProtocol);

  __decorate([ProtobufProperty({
    id: 1,
    converter: ECDSAPublicKeyConverter,
    required: true
  })], MessageSignedProtocol.prototype, "senderKey", void 0);

  __decorate([ProtobufProperty({
    id: 2,
    parser: MessageProtocol,
    required: true
  })], MessageSignedProtocol.prototype, "message", void 0);

  __decorate([ProtobufProperty({
    id: 3,
    required: true
  })], MessageSignedProtocol.prototype, "signature", void 0);

  MessageSignedProtocol = __decorate([ProtobufElement({
    name: "MessageSigned"
  })], MessageSignedProtocol);

  var PreKeyMessageProtocol =
  /*#__PURE__*/
  function (_BaseProtocol4) {
    _inherits(PreKeyMessageProtocol, _BaseProtocol4);

    function PreKeyMessageProtocol() {
      _classCallCheck(this, PreKeyMessageProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(PreKeyMessageProtocol).apply(this, arguments));
    }

    return PreKeyMessageProtocol;
  }(BaseProtocol);

  __decorate([ProtobufProperty({
    id: 1,
    type: "uint32",
    required: true
  })], PreKeyMessageProtocol.prototype, "registrationId", void 0);

  __decorate([ProtobufProperty({
    id: 2,
    type: "uint32"
  })], PreKeyMessageProtocol.prototype, "preKeyId", void 0);

  __decorate([ProtobufProperty({
    id: 3,
    type: "uint32",
    required: true
  })], PreKeyMessageProtocol.prototype, "preKeySignedId", void 0);

  __decorate([ProtobufProperty({
    id: 4,
    converter: ECDHPublicKeyConverter,
    required: true
  })], PreKeyMessageProtocol.prototype, "baseKey", void 0);

  __decorate([ProtobufProperty({
    id: 5,
    parser: IdentityProtocol,
    required: true
  })], PreKeyMessageProtocol.prototype, "identity", void 0);

  __decorate([ProtobufProperty({
    id: 6,
    parser: MessageSignedProtocol,
    required: true
  })], PreKeyMessageProtocol.prototype, "signedMessage", void 0);

  PreKeyMessageProtocol = __decorate([ProtobufElement({
    name: "PreKeyMessage"
  })], PreKeyMessageProtocol);

  var PreKeyProtocol =
  /*#__PURE__*/
  function (_BaseProtocol5) {
    _inherits(PreKeyProtocol, _BaseProtocol5);

    function PreKeyProtocol() {
      _classCallCheck(this, PreKeyProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(PreKeyProtocol).apply(this, arguments));
    }

    return PreKeyProtocol;
  }(BaseProtocol);

  __decorate([ProtobufProperty({
    id: 1,
    type: "uint32",
    required: true
  })], PreKeyProtocol.prototype, "id", void 0);

  __decorate([ProtobufProperty({
    id: 2,
    converter: ECDHPublicKeyConverter,
    required: true
  })], PreKeyProtocol.prototype, "key", void 0);

  PreKeyProtocol = __decorate([ProtobufElement({
    name: "PreKey"
  })], PreKeyProtocol);

  var PreKeySignedProtocol =
  /*#__PURE__*/
  function (_PreKeyProtocol) {
    _inherits(PreKeySignedProtocol, _PreKeyProtocol);

    function PreKeySignedProtocol() {
      _classCallCheck(this, PreKeySignedProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(PreKeySignedProtocol).apply(this, arguments));
    }

    _createClass(PreKeySignedProtocol, [{
      key: "sign",
      value: function () {
        var _sign5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee39(key) {
          return regeneratorRuntime.wrap(function _callee39$(_context39) {
            while (1) {
              switch (_context39.prev = _context39.next) {
                case 0:
                  _context39.next = 2;
                  return Curve.sign(key, this.key.serialize());

                case 2:
                  this.signature = _context39.sent;

                case 3:
                case "end":
                  return _context39.stop();
              }
            }
          }, _callee39, this);
        }));

        function sign(_x38) {
          return _sign5.apply(this, arguments);
        }

        return sign;
      }()
    }, {
      key: "verify",
      value: function verify(key) {
        return Curve.verify(key, this.key.serialize(), this.signature);
      }
    }]);

    return PreKeySignedProtocol;
  }(PreKeyProtocol);

  __decorate([ProtobufProperty({
    id: 3,
    converter: ArrayBufferConverter,
    required: true
  })], PreKeySignedProtocol.prototype, "signature", void 0);

  PreKeySignedProtocol = __decorate([ProtobufElement({
    name: "PreKeySigned"
  })], PreKeySignedProtocol);

  var PreKeyBundleProtocol =
  /*#__PURE__*/
  function (_BaseProtocol6) {
    _inherits(PreKeyBundleProtocol, _BaseProtocol6);

    function PreKeyBundleProtocol() {
      _classCallCheck(this, PreKeyBundleProtocol);

      return _possibleConstructorReturn(this, _getPrototypeOf(PreKeyBundleProtocol).apply(this, arguments));
    }

    return PreKeyBundleProtocol;
  }(BaseProtocol);

  __decorate([ProtobufProperty({
    id: 1,
    type: "uint32",
    required: true
  })], PreKeyBundleProtocol.prototype, "registrationId", void 0);

  __decorate([ProtobufProperty({
    id: 2,
    parser: IdentityProtocol,
    required: true
  })], PreKeyBundleProtocol.prototype, "identity", void 0);

  __decorate([ProtobufProperty({
    id: 3,
    parser: PreKeyProtocol
  })], PreKeyBundleProtocol.prototype, "preKey", void 0);

  __decorate([ProtobufProperty({
    id: 4,
    parser: PreKeySignedProtocol,
    required: true
  })], PreKeyBundleProtocol.prototype, "preKeySigned", void 0);

  PreKeyBundleProtocol = __decorate([ProtobufElement({
    name: "PreKeyBundle"
  })], PreKeyBundleProtocol);

  var Stack =
  /*#__PURE__*/
  function () {
    function Stack() {
      var maxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

      _classCallCheck(this, Stack);

      this.items = [];
      this.maxSize = maxSize;
    }

    _createClass(Stack, [{
      key: "push",
      value: function push(item) {
        if (this.length === this.maxSize) {
          this.items = this.items.slice(1);
        }

        this.items.push(item);
      }
    }, {
      key: "toJSON",
      value: function () {
        var _toJSON3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee40() {
          var res, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, item;

          return regeneratorRuntime.wrap(function _callee40$(_context40) {
            while (1) {
              switch (_context40.prev = _context40.next) {
                case 0:
                  res = [];
                  _iteratorNormalCompletion8 = true;
                  _didIteratorError8 = false;
                  _iteratorError8 = undefined;
                  _context40.prev = 4;
                  _iterator8 = this.items[Symbol.iterator]();

                case 6:
                  if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                    _context40.next = 16;
                    break;
                  }

                  item = _step8.value;
                  _context40.t0 = res;
                  _context40.next = 11;
                  return item.toJSON();

                case 11:
                  _context40.t1 = _context40.sent;

                  _context40.t0.push.call(_context40.t0, _context40.t1);

                case 13:
                  _iteratorNormalCompletion8 = true;
                  _context40.next = 6;
                  break;

                case 16:
                  _context40.next = 22;
                  break;

                case 18:
                  _context40.prev = 18;
                  _context40.t2 = _context40["catch"](4);
                  _didIteratorError8 = true;
                  _iteratorError8 = _context40.t2;

                case 22:
                  _context40.prev = 22;
                  _context40.prev = 23;

                  if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
                    _iterator8.return();
                  }

                case 25:
                  _context40.prev = 25;

                  if (!_didIteratorError8) {
                    _context40.next = 28;
                    break;
                  }

                  throw _iteratorError8;

                case 28:
                  return _context40.finish(25);

                case 29:
                  return _context40.finish(22);

                case 30:
                  return _context40.abrupt("return", res);

                case 31:
                case "end":
                  return _context40.stop();
              }
            }
          }, _callee40, this, [[4, 18, 22, 30], [23,, 25, 29]]);
        }));

        function toJSON() {
          return _toJSON3.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee41(obj) {
          return regeneratorRuntime.wrap(function _callee41$(_context41) {
            while (1) {
              switch (_context41.prev = _context41.next) {
                case 0:
                  this.items = obj;

                case 1:
                case "end":
                  return _context41.stop();
              }
            }
          }, _callee41, this);
        }));

        function fromJSON(_x39) {
          return _fromJSON5.apply(this, arguments);
        }

        return fromJSON;
      }()
    }, {
      key: "length",
      get: function get() {
        return this.items.length;
      }
    }, {
      key: "latest",
      get: function get() {
        return this.items[this.length - 1];
      }
    }]);

    return Stack;
  }();

  var CIPHER_KEY_KDF_INPUT = new Uint8Array([1]).buffer;
  var ROOT_KEY_KDF_INPUT = new Uint8Array([2]).buffer;

  var SymmetricRatchet =
  /*#__PURE__*/
  function () {
    function SymmetricRatchet(rootKey) {
      _classCallCheck(this, SymmetricRatchet);

      this.counter = 0;
      this.rootKey = rootKey;
    }

    _createClass(SymmetricRatchet, [{
      key: "toJSON",
      value: function () {
        var _toJSON4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee42() {
          return regeneratorRuntime.wrap(function _callee42$(_context42) {
            while (1) {
              switch (_context42.prev = _context42.next) {
                case 0:
                  return _context42.abrupt("return", {
                    counter: this.counter,
                    rootKey: this.rootKey
                  });

                case 1:
                case "end":
                  return _context42.stop();
              }
            }
          }, _callee42, this);
        }));

        function toJSON() {
          return _toJSON4.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee43(obj) {
          return regeneratorRuntime.wrap(function _callee43$(_context43) {
            while (1) {
              switch (_context43.prev = _context43.next) {
                case 0:
                  this.counter = obj.counter;
                  this.rootKey = obj.rootKey;

                case 2:
                case "end":
                  return _context43.stop();
              }
            }
          }, _callee43, this);
        }));

        function fromJSON(_x40) {
          return _fromJSON6.apply(this, arguments);
        }

        return fromJSON;
      }()
    }, {
      key: "calculateKey",
      value: function () {
        var _calculateKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee44(rootKey) {
          var cipherKeyBytes, nextRootKeyBytes, res;
          return regeneratorRuntime.wrap(function _callee44$(_context44) {
            while (1) {
              switch (_context44.prev = _context44.next) {
                case 0:
                  _context44.next = 2;
                  return Secret.sign(rootKey, CIPHER_KEY_KDF_INPUT);

                case 2:
                  cipherKeyBytes = _context44.sent;
                  _context44.next = 5;
                  return Secret.sign(rootKey, ROOT_KEY_KDF_INPUT);

                case 5:
                  nextRootKeyBytes = _context44.sent;
                  _context44.t0 = cipherKeyBytes;
                  _context44.next = 9;
                  return Secret.importHMAC(nextRootKeyBytes);

                case 9:
                  _context44.t1 = _context44.sent;
                  res = {
                    cipher: _context44.t0,
                    rootKey: _context44.t1
                  };
                  return _context44.abrupt("return", res);

                case 12:
                case "end":
                  return _context44.stop();
              }
            }
          }, _callee44);
        }));

        function calculateKey(_x41) {
          return _calculateKey.apply(this, arguments);
        }

        return calculateKey;
      }()
    }, {
      key: "click",
      value: function () {
        var _click = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee45() {
          var rootKey, res;
          return regeneratorRuntime.wrap(function _callee45$(_context45) {
            while (1) {
              switch (_context45.prev = _context45.next) {
                case 0:
                  rootKey = this.rootKey;
                  _context45.next = 3;
                  return this.calculateKey(rootKey);

                case 3:
                  res = _context45.sent;
                  this.rootKey = res.rootKey;
                  this.counter++;
                  return _context45.abrupt("return", res.cipher);

                case 7:
                case "end":
                  return _context45.stop();
              }
            }
          }, _callee45, this);
        }));

        function click() {
          return _click.apply(this, arguments);
        }

        return click;
      }()
    }], [{
      key: "fromJSON",
      value: function () {
        var _fromJSON7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee46(obj) {
          var res;
          return regeneratorRuntime.wrap(function _callee46$(_context46) {
            while (1) {
              switch (_context46.prev = _context46.next) {
                case 0:
                  res = new this(obj.rootKey);
                  res.fromJSON(obj);
                  return _context46.abrupt("return", res);

                case 3:
                case "end":
                  return _context46.stop();
              }
            }
          }, _callee46, this);
        }));

        function fromJSON(_x42) {
          return _fromJSON7.apply(this, arguments);
        }

        return fromJSON;
      }()
    }]);

    return SymmetricRatchet;
  }();

  var SendingRatchet =
  /*#__PURE__*/
  function (_SymmetricRatchet) {
    _inherits(SendingRatchet, _SymmetricRatchet);

    function SendingRatchet() {
      _classCallCheck(this, SendingRatchet);

      return _possibleConstructorReturn(this, _getPrototypeOf(SendingRatchet).apply(this, arguments));
    }

    _createClass(SendingRatchet, [{
      key: "encrypt",
      value: function () {
        var _encrypt = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee47(message) {
          var cipherKey, keys, aesKey, hmacKey, iv, cipherText;
          return regeneratorRuntime.wrap(function _callee47$(_context47) {
            while (1) {
              switch (_context47.prev = _context47.next) {
                case 0:
                  _context47.next = 2;
                  return this.click();

                case 2:
                  cipherKey = _context47.sent;
                  _context47.next = 5;
                  return Secret.HKDF(cipherKey, 3, void 0, INFO_MESSAGE_KEYS);

                case 5:
                  keys = _context47.sent;
                  _context47.next = 8;
                  return Secret.importAES(keys[0]);

                case 8:
                  aesKey = _context47.sent;
                  _context47.next = 11;
                  return Secret.importHMAC(keys[1]);

                case 11:
                  hmacKey = _context47.sent;
                  iv = keys[2].slice(0, 16);
                  _context47.next = 15;
                  return Secret.encrypt(aesKey, message, iv);

                case 15:
                  cipherText = _context47.sent;
                  return _context47.abrupt("return", {
                    cipherText: cipherText,
                    hmacKey: hmacKey
                  });

                case 17:
                case "end":
                  return _context47.stop();
              }
            }
          }, _callee47, this);
        }));

        function encrypt(_x43) {
          return _encrypt.apply(this, arguments);
        }

        return encrypt;
      }()
    }]);

    return SendingRatchet;
  }(SymmetricRatchet);

  var ReceivingRatchet =
  /*#__PURE__*/
  function (_SymmetricRatchet2) {
    _inherits(ReceivingRatchet, _SymmetricRatchet2);

    function ReceivingRatchet() {
      var _this;

      _classCallCheck(this, ReceivingRatchet);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReceivingRatchet).apply(this, arguments));
      _this.keys = [];
      return _this;
    }

    _createClass(ReceivingRatchet, [{
      key: "toJSON",
      value: function () {
        var _toJSON5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee48() {
          var res;
          return regeneratorRuntime.wrap(function _callee48$(_context48) {
            while (1) {
              switch (_context48.prev = _context48.next) {
                case 0:
                  _context48.next = 2;
                  return _get(_getPrototypeOf(ReceivingRatchet.prototype), "toJSON", this).call(this);

                case 2:
                  res = _context48.sent;
                  res.keys = this.keys;
                  return _context48.abrupt("return", res);

                case 5:
                case "end":
                  return _context48.stop();
              }
            }
          }, _callee48, this);
        }));

        function toJSON() {
          return _toJSON5.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON8 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee49(obj) {
          return regeneratorRuntime.wrap(function _callee49$(_context49) {
            while (1) {
              switch (_context49.prev = _context49.next) {
                case 0:
                  _context49.next = 2;
                  return _get(_getPrototypeOf(ReceivingRatchet.prototype), "fromJSON", this).call(this, obj);

                case 2:
                  this.keys = obj.keys;

                case 3:
                case "end":
                  return _context49.stop();
              }
            }
          }, _callee49, this);
        }));

        function fromJSON(_x44) {
          return _fromJSON8.apply(this, arguments);
        }

        return fromJSON;
      }()
    }, {
      key: "decrypt",
      value: function () {
        var _decrypt = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee50(message, counter) {
          var cipherKey, keys, aesKey, hmacKey, iv, cipherText;
          return regeneratorRuntime.wrap(function _callee50$(_context50) {
            while (1) {
              switch (_context50.prev = _context50.next) {
                case 0:
                  _context50.next = 2;
                  return this.getKey(counter);

                case 2:
                  cipherKey = _context50.sent;
                  _context50.next = 5;
                  return Secret.HKDF(cipherKey, 3, void 0, INFO_MESSAGE_KEYS);

                case 5:
                  keys = _context50.sent;
                  _context50.next = 8;
                  return Secret.importAES(keys[0]);

                case 8:
                  aesKey = _context50.sent;
                  _context50.next = 11;
                  return Secret.importHMAC(keys[1]);

                case 11:
                  hmacKey = _context50.sent;
                  iv = keys[2].slice(0, 16);
                  _context50.next = 15;
                  return Secret.decrypt(aesKey, message, iv);

                case 15:
                  cipherText = _context50.sent;
                  return _context50.abrupt("return", {
                    cipherText: cipherText,
                    hmacKey: hmacKey
                  });

                case 17:
                case "end":
                  return _context50.stop();
              }
            }
          }, _callee50, this);
        }));

        function decrypt(_x45, _x46) {
          return _decrypt.apply(this, arguments);
        }

        return decrypt;
      }()
    }, {
      key: "getKey",
      value: function () {
        var _getKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee51(counter) {
          var cipherKey, key;
          return regeneratorRuntime.wrap(function _callee51$(_context51) {
            while (1) {
              switch (_context51.prev = _context51.next) {
                case 0:
                  if (!(this.counter <= counter)) {
                    _context51.next = 7;
                    break;
                  }

                  _context51.next = 3;
                  return this.click();

                case 3:
                  cipherKey = _context51.sent;
                  this.keys.push(cipherKey);
                  _context51.next = 0;
                  break;

                case 7:
                  key = this.keys[counter];
                  return _context51.abrupt("return", key);

                case 9:
                case "end":
                  return _context51.stop();
              }
            }
          }, _callee51, this);
        }));

        function getKey(_x47) {
          return _getKey.apply(this, arguments);
        }

        return getKey;
      }()
    }]);

    return ReceivingRatchet;
  }(SymmetricRatchet);

  function authenticateA(_x48, _x49, _x50, _x51, _x52) {
    return _authenticateA.apply(this, arguments);
  }

  function _authenticateA() {
    _authenticateA = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee136(IKa, EKa, IKb, SPKb, OPKb) {
      var DH1, DH2, DH3, DH4, _F, i, F, KM, keys;

      return regeneratorRuntime.wrap(function _callee136$(_context136) {
        while (1) {
          switch (_context136.prev = _context136.next) {
            case 0:
              _context136.next = 2;
              return Curve.deriveBytes(IKa.exchangeKey.privateKey, SPKb);

            case 2:
              DH1 = _context136.sent;
              _context136.next = 5;
              return Curve.deriveBytes(EKa.privateKey, IKb);

            case 5:
              DH2 = _context136.sent;
              _context136.next = 8;
              return Curve.deriveBytes(EKa.privateKey, SPKb);

            case 8:
              DH3 = _context136.sent;
              DH4 = new ArrayBuffer(0);

              if (!OPKb) {
                _context136.next = 14;
                break;
              }

              _context136.next = 13;
              return Curve.deriveBytes(EKa.privateKey, OPKb);

            case 13:
              DH4 = _context136.sent;

            case 14:
              _F = new Uint8Array(32);

              for (i = 0; i < _F.length; i++) {
                _F[i] = 0xff;
              }

              F = _F.buffer;
              KM = combine(F, DH1, DH2, DH3, DH4);
              _context136.next = 20;
              return Secret.HKDF(KM, 1, void 0, INFO_TEXT);

            case 20:
              keys = _context136.sent;
              _context136.next = 23;
              return Secret.importHMAC(keys[0]);

            case 23:
              return _context136.abrupt("return", _context136.sent);

            case 24:
            case "end":
              return _context136.stop();
          }
        }
      }, _callee136);
    }));
    return _authenticateA.apply(this, arguments);
  }

  function authenticateB(_x53, _x54, _x55, _x56, _x57) {
    return _authenticateB.apply(this, arguments);
  }

  function _authenticateB() {
    _authenticateB = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee137(IKb, SPKb, IKa, EKa, OPKb) {
      var DH1, DH2, DH3, DH4, _F, i, F, KM, keys;

      return regeneratorRuntime.wrap(function _callee137$(_context137) {
        while (1) {
          switch (_context137.prev = _context137.next) {
            case 0:
              _context137.next = 2;
              return Curve.deriveBytes(SPKb.privateKey, IKa);

            case 2:
              DH1 = _context137.sent;
              _context137.next = 5;
              return Curve.deriveBytes(IKb.exchangeKey.privateKey, EKa);

            case 5:
              DH2 = _context137.sent;
              _context137.next = 8;
              return Curve.deriveBytes(SPKb.privateKey, EKa);

            case 8:
              DH3 = _context137.sent;
              DH4 = new ArrayBuffer(0);

              if (!OPKb) {
                _context137.next = 14;
                break;
              }

              _context137.next = 13;
              return Curve.deriveBytes(OPKb, EKa);

            case 13:
              DH4 = _context137.sent;

            case 14:
              _F = new Uint8Array(32);

              for (i = 0; i < _F.length; i++) {
                _F[i] = 0xff;
              }

              F = _F.buffer;
              KM = combine(F, DH1, DH2, DH3, DH4);
              _context137.next = 20;
              return Secret.HKDF(KM, 1, void 0, INFO_TEXT);

            case 20:
              keys = _context137.sent;
              _context137.next = 23;
              return Secret.importHMAC(keys[0]);

            case 23:
              return _context137.abrupt("return", _context137.sent);

            case 24:
            case "end":
              return _context137.stop();
          }
        }
      }, _callee137);
    }));
    return _authenticateB.apply(this, arguments);
  }

  var AsymmetricRatchet =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(AsymmetricRatchet, _EventEmitter);

    function AsymmetricRatchet() {
      var _this2;

      _classCallCheck(this, AsymmetricRatchet);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AsymmetricRatchet).call(this));
      _this2.counter = 0;
      _this2.currentStep = new DHRatchetStep();
      _this2.steps = new DHRatchetStepStack(MAX_RATCHET_STACK_SIZE);
      _this2.promises = {};
      return _this2;
    }

    _createClass(AsymmetricRatchet, [{
      key: "on",
      value: function on(event, listener) {
        return _get(_getPrototypeOf(AsymmetricRatchet.prototype), "on", this).call(this, event, listener);
      }
    }, {
      key: "once",
      value: function once(event, listener) {
        return _get(_getPrototypeOf(AsymmetricRatchet.prototype), "once", this).call(this, event, listener);
      }
    }, {
      key: "decrypt",
      value: function () {
        var _decrypt2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee53(protocol) {
          var _this3 = this;

          return regeneratorRuntime.wrap(function _callee53$(_context53) {
            while (1) {
              switch (_context53.prev = _context53.next) {
                case 0:
                  return _context53.abrupt("return", this.queuePromise("encrypt",
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee52() {
                    var remoteRatchetKey, message, step, ratchetStep, decryptedMessage;
                    return regeneratorRuntime.wrap(function _callee52$(_context52) {
                      while (1) {
                        switch (_context52.prev = _context52.next) {
                          case 0:
                            remoteRatchetKey = protocol.message.senderRatchetKey;
                            message = protocol.message;

                            if (!(protocol.message.previousCounter < _this3.counter - MAX_RATCHET_STACK_SIZE)) {
                              _context52.next = 4;
                              break;
                            }

                            throw new Error("Error: Too old message");

                          case 4:
                            step = _this3.steps.getStep(remoteRatchetKey);

                            if (!step) {
                              ratchetStep = new DHRatchetStep();
                              ratchetStep.remoteRatchetKey = remoteRatchetKey;

                              _this3.steps.push(ratchetStep);

                              _this3.currentStep = ratchetStep;
                              step = ratchetStep;
                            }

                            if (step.receivingChain) {
                              _context52.next = 10;
                              break;
                            }

                            _context52.next = 9;
                            return _this3.createChain(_this3.currentRatchetKey.privateKey, remoteRatchetKey, ReceivingRatchet);

                          case 9:
                            step.receivingChain = _context52.sent;

                          case 10:
                            _context52.next = 12;
                            return step.receivingChain.decrypt(message.cipherText, message.counter);

                          case 12:
                            decryptedMessage = _context52.sent;

                            _this3.update();

                            protocol.senderKey = _this3.remoteIdentity.signingKey;
                            protocol.receiverKey = _this3.identity.signingKey.publicKey;
                            _context52.next = 18;
                            return protocol.verify(decryptedMessage.hmacKey);

                          case 18:
                            if (_context52.sent) {
                              _context52.next = 20;
                              break;
                            }

                            throw new Error("Error: The Message did not successfully verify!");

                          case 20:
                            return _context52.abrupt("return", decryptedMessage.cipherText);

                          case 21:
                          case "end":
                            return _context52.stop();
                        }
                      }
                    }, _callee52);
                  }))));

                case 1:
                case "end":
                  return _context53.stop();
              }
            }
          }, _callee53, this);
        }));

        function decrypt(_x58) {
          return _decrypt2.apply(this, arguments);
        }

        return decrypt;
      }()
    }, {
      key: "encrypt",
      value: function () {
        var _encrypt2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee55(message) {
          var _this4 = this;

          return regeneratorRuntime.wrap(function _callee55$(_context55) {
            while (1) {
              switch (_context55.prev = _context55.next) {
                case 0:
                  return _context55.abrupt("return", this.queuePromise("encrypt",
                  /*#__PURE__*/
                  _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee54() {
                    var encryptedMessage, preKeyMessage, signedMessage;
                    return regeneratorRuntime.wrap(function _callee54$(_context54) {
                      while (1) {
                        switch (_context54.prev = _context54.next) {
                          case 0:
                            if (!(_this4.currentStep.receivingChain && !_this4.currentStep.sendingChain)) {
                              _context54.next = 5;
                              break;
                            }

                            _this4.counter++;
                            _context54.next = 4;
                            return _this4.generateRatchetKey();

                          case 4:
                            _this4.currentRatchetKey = _context54.sent;

                          case 5:
                            if (_this4.currentStep.sendingChain) {
                              _context54.next = 11;
                              break;
                            }

                            if (_this4.currentStep.remoteRatchetKey) {
                              _context54.next = 8;
                              break;
                            }

                            throw new Error("currentStep has empty remoteRatchetKey");

                          case 8:
                            _context54.next = 10;
                            return _this4.createChain(_this4.currentRatchetKey.privateKey, _this4.currentStep.remoteRatchetKey, SendingRatchet);

                          case 10:
                            _this4.currentStep.sendingChain = _context54.sent;

                          case 11:
                            _context54.next = 13;
                            return _this4.currentStep.sendingChain.encrypt(message);

                          case 13:
                            encryptedMessage = _context54.sent;

                            _this4.update();

                            if (!(_this4.steps.length === 0 && !_this4.currentStep.receivingChain && _this4.currentStep.sendingChain.counter === 1)) {
                              _context54.next = 23;
                              break;
                            }

                            preKeyMessage = new PreKeyMessageProtocol();
                            preKeyMessage.registrationId = _this4.identity.id;
                            preKeyMessage.preKeyId = _this4.remotePreKeyId;
                            preKeyMessage.preKeySignedId = _this4.remotePreKeySignedId;
                            preKeyMessage.baseKey = _this4.currentRatchetKey.publicKey;
                            _context54.next = 23;
                            return preKeyMessage.identity.fill(_this4.identity);

                          case 23:
                            signedMessage = new MessageSignedProtocol();
                            signedMessage.receiverKey = _this4.remoteIdentity.signingKey;
                            signedMessage.senderKey = _this4.identity.signingKey.publicKey;
                            signedMessage.message.cipherText = encryptedMessage.cipherText;
                            signedMessage.message.counter = _this4.currentStep.sendingChain.counter - 1;
                            signedMessage.message.previousCounter = _this4.counter;
                            signedMessage.message.senderRatchetKey = _this4.currentRatchetKey.publicKey;
                            _context54.next = 32;
                            return signedMessage.sign(encryptedMessage.hmacKey);

                          case 32:
                            if (!preKeyMessage) {
                              _context54.next = 37;
                              break;
                            }

                            preKeyMessage.signedMessage = signedMessage;
                            return _context54.abrupt("return", preKeyMessage);

                          case 37:
                            return _context54.abrupt("return", signedMessage);

                          case 38:
                          case "end":
                            return _context54.stop();
                        }
                      }
                    }, _callee54);
                  }))));

                case 1:
                case "end":
                  return _context55.stop();
              }
            }
          }, _callee55, this);
        }));

        function encrypt(_x59) {
          return _encrypt2.apply(this, arguments);
        }

        return encrypt;
      }()
    }, {
      key: "hasRatchetKey",
      value: function () {
        var _hasRatchetKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee56(key) {
          var ecKey, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, item;

          return regeneratorRuntime.wrap(function _callee56$(_context56) {
            while (1) {
              switch (_context56.prev = _context56.next) {
                case 0:
                  if (key instanceof ECPublicKey) {
                    _context56.next = 6;
                    break;
                  }

                  _context56.next = 3;
                  return ECPublicKey.create(key);

                case 3:
                  ecKey = _context56.sent;
                  _context56.next = 7;
                  break;

                case 6:
                  ecKey = key;

                case 7:
                  _iteratorNormalCompletion9 = true;
                  _didIteratorError9 = false;
                  _iteratorError9 = undefined;
                  _context56.prev = 10;
                  _iterator9 = this.steps.items[Symbol.iterator]();

                case 12:
                  if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
                    _context56.next = 21;
                    break;
                  }

                  item = _step9.value;
                  _context56.next = 16;
                  return item.remoteRatchetKey.isEqual(ecKey);

                case 16:
                  if (!_context56.sent) {
                    _context56.next = 18;
                    break;
                  }

                  return _context56.abrupt("return", true);

                case 18:
                  _iteratorNormalCompletion9 = true;
                  _context56.next = 12;
                  break;

                case 21:
                  _context56.next = 27;
                  break;

                case 23:
                  _context56.prev = 23;
                  _context56.t0 = _context56["catch"](10);
                  _didIteratorError9 = true;
                  _iteratorError9 = _context56.t0;

                case 27:
                  _context56.prev = 27;
                  _context56.prev = 28;

                  if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                    _iterator9.return();
                  }

                case 30:
                  _context56.prev = 30;

                  if (!_didIteratorError9) {
                    _context56.next = 33;
                    break;
                  }

                  throw _iteratorError9;

                case 33:
                  return _context56.finish(30);

                case 34:
                  return _context56.finish(27);

                case 35:
                  return _context56.abrupt("return", false);

                case 36:
                case "end":
                  return _context56.stop();
              }
            }
          }, _callee56, this, [[10, 23, 27, 35], [28,, 30, 34]]);
        }));

        function hasRatchetKey(_x60) {
          return _hasRatchetKey.apply(this, arguments);
        }

        return hasRatchetKey;
      }()
    }, {
      key: "toJSON",
      value: function () {
        var _toJSON6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee57() {
          return regeneratorRuntime.wrap(function _callee57$(_context57) {
            while (1) {
              switch (_context57.prev = _context57.next) {
                case 0:
                  _context57.t0 = this.counter;
                  _context57.next = 3;
                  return Curve.ecKeyPairToJson(this.currentRatchetKey);

                case 3:
                  _context57.t1 = _context57.sent;
                  _context57.next = 6;
                  return this.remoteIdentity.signingKey.thumbprint();

                case 6:
                  _context57.t2 = _context57.sent;
                  _context57.t3 = this.rootKey;
                  _context57.next = 10;
                  return this.steps.toJSON();

                case 10:
                  _context57.t4 = _context57.sent;
                  return _context57.abrupt("return", {
                    counter: _context57.t0,
                    ratchetKey: _context57.t1,
                    remoteIdentity: _context57.t2,
                    rootKey: _context57.t3,
                    steps: _context57.t4
                  });

                case 12:
                case "end":
                  return _context57.stop();
              }
            }
          }, _callee57, this);
        }));

        function toJSON() {
          return _toJSON6.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON9 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee58(obj) {
          var _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, step;

          return regeneratorRuntime.wrap(function _callee58$(_context58) {
            while (1) {
              switch (_context58.prev = _context58.next) {
                case 0:
                  _context58.next = 2;
                  return Curve.ecKeyPairFromJson(obj.ratchetKey);

                case 2:
                  this.currentRatchetKey = _context58.sent;
                  this.counter = obj.counter;
                  this.rootKey = obj.rootKey;
                  _iteratorNormalCompletion10 = true;
                  _didIteratorError10 = false;
                  _iteratorError10 = undefined;
                  _context58.prev = 8;
                  _iterator10 = obj.steps[Symbol.iterator]();

                case 10:
                  if (_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done) {
                    _context58.next = 19;
                    break;
                  }

                  step = _step10.value;
                  _context58.next = 14;
                  return DHRatchetStep.fromJSON(step);

                case 14:
                  this.currentStep = _context58.sent;
                  this.steps.push(this.currentStep);

                case 16:
                  _iteratorNormalCompletion10 = true;
                  _context58.next = 10;
                  break;

                case 19:
                  _context58.next = 25;
                  break;

                case 21:
                  _context58.prev = 21;
                  _context58.t0 = _context58["catch"](8);
                  _didIteratorError10 = true;
                  _iteratorError10 = _context58.t0;

                case 25:
                  _context58.prev = 25;
                  _context58.prev = 26;

                  if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
                    _iterator10.return();
                  }

                case 28:
                  _context58.prev = 28;

                  if (!_didIteratorError10) {
                    _context58.next = 31;
                    break;
                  }

                  throw _iteratorError10;

                case 31:
                  return _context58.finish(28);

                case 32:
                  return _context58.finish(25);

                case 33:
                case "end":
                  return _context58.stop();
              }
            }
          }, _callee58, this, [[8, 21, 25, 33], [26,, 28, 32]]);
        }));

        function fromJSON(_x61) {
          return _fromJSON9.apply(this, arguments);
        }

        return fromJSON;
      }()
    }, {
      key: "update",
      value: function update() {
        this.emit("update");
      }
    }, {
      key: "generateRatchetKey",
      value: function generateRatchetKey() {
        return Curve.generateKeyPair("ECDH");
      }
    }, {
      key: "createChain",
      value: function () {
        var _createChain = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee59(ourRatchetKey, theirRatchetKey, ratchetClass) {
          var derivedBytes, keys, rootKey, chainKey, chain;
          return regeneratorRuntime.wrap(function _callee59$(_context59) {
            while (1) {
              switch (_context59.prev = _context59.next) {
                case 0:
                  _context59.next = 2;
                  return Curve.deriveBytes(ourRatchetKey, theirRatchetKey);

                case 2:
                  derivedBytes = _context59.sent;
                  _context59.next = 5;
                  return Secret.HKDF(derivedBytes, 2, this.rootKey, INFO_RATCHET);

                case 5:
                  keys = _context59.sent;
                  _context59.next = 8;
                  return Secret.importHMAC(keys[0]);

                case 8:
                  rootKey = _context59.sent;
                  _context59.next = 11;
                  return Secret.importHMAC(keys[1]);

                case 11:
                  chainKey = _context59.sent;
                  chain = new ratchetClass(chainKey);
                  this.rootKey = rootKey;
                  return _context59.abrupt("return", chain);

                case 15:
                case "end":
                  return _context59.stop();
              }
            }
          }, _callee59, this);
        }));

        function createChain(_x62, _x63, _x64) {
          return _createChain.apply(this, arguments);
        }

        return createChain;
      }()
    }, {
      key: "queuePromise",
      value: function queuePromise(key, fn) {
        var _this5 = this;

        var prev = this.promises[key] || Promise.resolve();
        var cur = this.promises[key] = prev.then(fn, fn);
        cur.then(function () {
          if (_this5.promises[key] === cur) {
            delete _this5.promises[key];
          }
        });
        return cur;
      }
    }], [{
      key: "create",
      value: function () {
        var _create3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee60(identity, protocol) {
          var rootKey, ratchet, signedPreKey, preKey;
          return regeneratorRuntime.wrap(function _callee60$(_context60) {
            while (1) {
              switch (_context60.prev = _context60.next) {
                case 0:
                  ratchet = new AsymmetricRatchet();

                  if (!(protocol instanceof PreKeyBundleProtocol)) {
                    _context60.next = 23;
                    break;
                  }

                  _context60.next = 4;
                  return protocol.identity.verify();

                case 4:
                  if (_context60.sent) {
                    _context60.next = 6;
                    break;
                  }

                  throw new Error("Error: Remote client's identity key is invalid.");

                case 6:
                  _context60.next = 8;
                  return protocol.preKeySigned.verify(protocol.identity.signingKey);

                case 8:
                  if (_context60.sent) {
                    _context60.next = 10;
                    break;
                  }

                  throw new Error("Error: Remote client's signed prekey is invalid.");

                case 10:
                  _context60.next = 12;
                  return ratchet.generateRatchetKey();

                case 12:
                  ratchet.currentRatchetKey = _context60.sent;
                  ratchet.currentStep.remoteRatchetKey = protocol.preKeySigned.key;
                  ratchet.remoteIdentity = RemoteIdentity.fill(protocol.identity);
                  ratchet.remoteIdentity.id = protocol.registrationId;
                  ratchet.remotePreKeyId = protocol.preKey.id;
                  ratchet.remotePreKeySignedId = protocol.preKeySigned.id;
                  _context60.next = 20;
                  return authenticateA(identity, ratchet.currentRatchetKey, protocol.identity.exchangeKey, protocol.preKeySigned.key, protocol.preKey.key);

                case 20:
                  rootKey = _context60.sent;
                  _context60.next = 36;
                  break;

                case 23:
                  _context60.next = 25;
                  return protocol.identity.verify();

                case 25:
                  if (_context60.sent) {
                    _context60.next = 27;
                    break;
                  }

                  throw new Error("Error: Remote client's identity key is invalid.");

                case 27:
                  signedPreKey = identity.signedPreKeys[protocol.preKeySignedId];

                  if (signedPreKey) {
                    _context60.next = 30;
                    break;
                  }

                  throw new Error("Error: PreKey with id ".concat(protocol.preKeySignedId, " not found"));

                case 30:
                  if (protocol.preKeyId !== void 0) {
                    preKey = identity.preKeys[protocol.preKeyId];
                  }

                  ratchet.remoteIdentity = RemoteIdentity.fill(protocol.identity);
                  ratchet.currentRatchetKey = signedPreKey;
                  _context60.next = 35;
                  return authenticateB(identity, ratchet.currentRatchetKey, protocol.identity.exchangeKey, protocol.signedMessage.message.senderRatchetKey, preKey && preKey.privateKey);

                case 35:
                  rootKey = _context60.sent;

                case 36:
                  ratchet.identity = identity;
                  ratchet.id = identity.id;
                  ratchet.rootKey = rootKey;
                  return _context60.abrupt("return", ratchet);

                case 40:
                case "end":
                  return _context60.stop();
              }
            }
          }, _callee60);
        }));

        function create(_x65, _x66) {
          return _create3.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON10 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee61(identity, remote, obj) {
          var res;
          return regeneratorRuntime.wrap(function _callee61$(_context61) {
            while (1) {
              switch (_context61.prev = _context61.next) {
                case 0:
                  res = new AsymmetricRatchet();
                  res.identity = identity;
                  res.remoteIdentity = remote;
                  _context61.next = 5;
                  return res.fromJSON(obj);

                case 5:
                  return _context61.abrupt("return", res);

                case 6:
                case "end":
                  return _context61.stop();
              }
            }
          }, _callee61);
        }));

        function fromJSON(_x67, _x68, _x69) {
          return _fromJSON10.apply(this, arguments);
        }

        return fromJSON;
      }()
    }]);

    return AsymmetricRatchet;
  }(EventEmitter);

  var DHRatchetStep =
  /*#__PURE__*/
  function () {
    function DHRatchetStep() {
      _classCallCheck(this, DHRatchetStep);
    }

    _createClass(DHRatchetStep, [{
      key: "toJSON",
      value: function () {
        var _toJSON7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee62() {
          var res;
          return regeneratorRuntime.wrap(function _callee62$(_context62) {
            while (1) {
              switch (_context62.prev = _context62.next) {
                case 0:
                  res = {};

                  if (this.remoteRatchetKey) {
                    res.remoteRatchetKey = this.remoteRatchetKey.key;
                  }

                  if (!this.sendingChain) {
                    _context62.next = 6;
                    break;
                  }

                  _context62.next = 5;
                  return this.sendingChain.toJSON();

                case 5:
                  res.sendingChain = _context62.sent;

                case 6:
                  if (!this.receivingChain) {
                    _context62.next = 10;
                    break;
                  }

                  _context62.next = 9;
                  return this.receivingChain.toJSON();

                case 9:
                  res.receivingChain = _context62.sent;

                case 10:
                  return _context62.abrupt("return", res);

                case 11:
                case "end":
                  return _context62.stop();
              }
            }
          }, _callee62, this);
        }));

        function toJSON() {
          return _toJSON7.apply(this, arguments);
        }

        return toJSON;
      }()
    }, {
      key: "fromJSON",
      value: function () {
        var _fromJSON11 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee63(obj) {
          return regeneratorRuntime.wrap(function _callee63$(_context63) {
            while (1) {
              switch (_context63.prev = _context63.next) {
                case 0:
                  if (!obj.remoteRatchetKey) {
                    _context63.next = 4;
                    break;
                  }

                  _context63.next = 3;
                  return ECPublicKey.create(obj.remoteRatchetKey);

                case 3:
                  this.remoteRatchetKey = _context63.sent;

                case 4:
                  if (!obj.sendingChain) {
                    _context63.next = 8;
                    break;
                  }

                  _context63.next = 7;
                  return SendingRatchet.fromJSON(obj.sendingChain);

                case 7:
                  this.sendingChain = _context63.sent;

                case 8:
                  if (!obj.receivingChain) {
                    _context63.next = 12;
                    break;
                  }

                  _context63.next = 11;
                  return ReceivingRatchet.fromJSON(obj.receivingChain);

                case 11:
                  this.receivingChain = _context63.sent;

                case 12:
                case "end":
                  return _context63.stop();
              }
            }
          }, _callee63, this);
        }));

        function fromJSON(_x70) {
          return _fromJSON11.apply(this, arguments);
        }

        return fromJSON;
      }()
    }], [{
      key: "fromJSON",
      value: function () {
        var _fromJSON12 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee64(obj) {
          var res;
          return regeneratorRuntime.wrap(function _callee64$(_context64) {
            while (1) {
              switch (_context64.prev = _context64.next) {
                case 0:
                  res = new this();
                  _context64.next = 3;
                  return res.fromJSON(obj);

                case 3:
                  return _context64.abrupt("return", res);

                case 4:
                case "end":
                  return _context64.stop();
              }
            }
          }, _callee64, this);
        }));

        function fromJSON(_x71) {
          return _fromJSON12.apply(this, arguments);
        }

        return fromJSON;
      }()
    }]);

    return DHRatchetStep;
  }();

  var DHRatchetStepStack =
  /*#__PURE__*/
  function (_Stack) {
    _inherits(DHRatchetStepStack, _Stack);

    function DHRatchetStepStack() {
      _classCallCheck(this, DHRatchetStepStack);

      return _possibleConstructorReturn(this, _getPrototypeOf(DHRatchetStepStack).apply(this, arguments));
    }

    _createClass(DHRatchetStepStack, [{
      key: "getStep",
      value: function getStep(remoteRatchetKey) {
        var found;
        this.items.some(function (step) {
          if (step.remoteRatchetKey.id === remoteRatchetKey.id) {
            found = step;
          }

          return !!found;
        });
        return found;
      }
    }]);

    return DHRatchetStepStack;
  }(Stack);

  var DateConverter$1 =
  /*#__PURE__*/
  function () {
    function DateConverter$1() {
      _classCallCheck(this, DateConverter$1);
    }

    _createClass(DateConverter$1, null, [{
      key: "set",
      value: function () {
        var _set5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee65(value) {
          return regeneratorRuntime.wrap(function _callee65$(_context65) {
            while (1) {
              switch (_context65.prev = _context65.next) {
                case 0:
                  return _context65.abrupt("return", new Uint8Array(Convert.FromUtf8String(value.toISOString())));

                case 1:
                case "end":
                  return _context65.stop();
              }
            }
          }, _callee65);
        }));

        function set(_x72) {
          return _set5.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "get",
      value: function () {
        var _get6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee66(value) {
          return regeneratorRuntime.wrap(function _callee66$(_context66) {
            while (1) {
              switch (_context66.prev = _context66.next) {
                case 0:
                  return _context66.abrupt("return", new Date(Convert.ToUtf8String(value)));

                case 1:
                case "end":
                  return _context66.stop();
              }
            }
          }, _callee66);
        }));

        function get(_x73) {
          return _get6.apply(this, arguments);
        }

        return get;
      }()
    }]);

    return DateConverter$1;
  }();

  var HexStringConverter =
  /*#__PURE__*/
  function () {
    function HexStringConverter() {
      _classCallCheck(this, HexStringConverter);
    }

    _createClass(HexStringConverter, null, [{
      key: "set",
      value: function () {
        var _set6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee67(value) {
          return regeneratorRuntime.wrap(function _callee67$(_context67) {
            while (1) {
              switch (_context67.prev = _context67.next) {
                case 0:
                  return _context67.abrupt("return", new Uint8Array(Convert.FromHex(value)));

                case 1:
                case "end":
                  return _context67.stop();
              }
            }
          }, _callee67);
        }));

        function set(_x74) {
          return _set6.apply(this, arguments);
        }

        return set;
      }()
    }, {
      key: "get",
      value: function () {
        var _get7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee68(value) {
          return regeneratorRuntime.wrap(function _callee68$(_context68) {
            while (1) {
              switch (_context68.prev = _context68.next) {
                case 0:
                  return _context68.abrupt("return", Convert.ToHex(value));

                case 1:
                case "end":
                  return _context68.stop();
              }
            }
          }, _callee68);
        }));

        function get(_x75) {
          return _get7.apply(this, arguments);
        }

        return get;
      }()
    }]);

    return HexStringConverter;
  }();

  var BaseProto_1, ActionProto_1, BaseAlgorithmProto_1, AlgorithmProto_1, CryptoItemProto_1, CryptoKeyProto_1, CryptoKeyPairProto_1, ErrorProto_1, ResultProto_1;

  var BaseProto = BaseProto_1 =
  /*#__PURE__*/
  function (_ObjectProto2) {
    _inherits(BaseProto, _ObjectProto2);

    function BaseProto() {
      _classCallCheck(this, BaseProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(BaseProto).apply(this, arguments));
    }

    return BaseProto;
  }(ObjectProto);

  BaseProto.INDEX = 1;

  __decorate([ProtobufProperty({
    id: BaseProto_1.INDEX++,
    type: "uint32",
    required: true,
    defaultValue: 1
  })], BaseProto.prototype, "version", void 0);

  BaseProto = BaseProto_1 = __decorate([ProtobufElement({
    name: "BaseMessage"
  })], BaseProto);

  var ActionProto = ActionProto_1 =
  /*#__PURE__*/
  function (_BaseProto) {
    _inherits(ActionProto, _BaseProto);

    function ActionProto() {
      var _this6;

      _classCallCheck(this, ActionProto);

      _this6 = _possibleConstructorReturn(this, _getPrototypeOf(ActionProto).call(this));
      _this6.action = _this6.constructor.ACTION;
      return _this6;
    }

    return ActionProto;
  }(BaseProto);

  ActionProto.INDEX = BaseProto.INDEX;
  ActionProto.ACTION = "action";

  __decorate([ProtobufProperty({
    id: ActionProto_1.INDEX++,
    type: "string",
    required: true
  })], ActionProto.prototype, "action", void 0);

  __decorate([ProtobufProperty({
    id: ActionProto_1.INDEX++,
    type: "string",
    required: false
  })], ActionProto.prototype, "actionId", void 0);

  ActionProto = ActionProto_1 = __decorate([ProtobufElement({
    name: "Action"
  })], ActionProto);

  var BaseAlgorithmProto = BaseAlgorithmProto_1 =
  /*#__PURE__*/
  function (_BaseProto2) {
    _inherits(BaseAlgorithmProto, _BaseProto2);

    function BaseAlgorithmProto() {
      _classCallCheck(this, BaseAlgorithmProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(BaseAlgorithmProto).apply(this, arguments));
    }

    _createClass(BaseAlgorithmProto, [{
      key: "toAlgorithm",
      value: function toAlgorithm() {
        return {
          name: this.name
        };
      }
    }, {
      key: "fromAlgorithm",
      value: function fromAlgorithm(alg) {
        this.name = alg.name;
      }
    }]);

    return BaseAlgorithmProto;
  }(BaseProto);

  BaseAlgorithmProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: BaseAlgorithmProto_1.INDEX++,
    type: "string",
    required: true
  })], BaseAlgorithmProto.prototype, "name", void 0);

  BaseAlgorithmProto = BaseAlgorithmProto_1 = __decorate([ProtobufElement({
    name: "BaseAlgorithm"
  })], BaseAlgorithmProto);

  var AlgorithmProto = AlgorithmProto_1 =
  /*#__PURE__*/
  function (_BaseAlgorithmProto) {
    _inherits(AlgorithmProto, _BaseAlgorithmProto);

    function AlgorithmProto() {
      _classCallCheck(this, AlgorithmProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(AlgorithmProto).apply(this, arguments));
    }

    _createClass(AlgorithmProto, [{
      key: "toAlgorithm",
      value: function toAlgorithm() {
        var res = {};
        var thisStatic = this.constructor;

        for (var key in thisStatic.items) {
          if (key === "version") {
            continue;
          }

          var value = this[key];

          if (key === "labelStr") {
            res.label = value;
            continue;
          }

          if (value !== void 0) {
            if (value instanceof BaseAlgorithmProto) {
              if (!value.isEmpty()) {
                res[key] = value.toAlgorithm();
              }
            } else {
              res[key] = value;
            }
          }
        }

        return res;
      }
    }, {
      key: "fromAlgorithm",
      value: function fromAlgorithm(alg) {
        if (alg instanceof AlgorithmProto_1) {
          alg = alg.toAlgorithm();
        }

        var thisStatic = this.constructor;

        for (var key in alg) {
          if (!thisStatic.items) {
            continue;
          }

          if (key in thisStatic.items) {
            var item = thisStatic.items[key];

            if (item.parser) {
              switch (item.parser) {
                case BaseAlgorithmProto:
                  {
                    this[key].fromAlgorithm(alg[key]);
                    break;
                  }

                default:
                  throw new Error("Unsupported parser '".concat(item.parser.name, "'"));
              }
            } else {
              if (key === "label" && typeof alg.label === "string") {
                this.labelStr = alg.label;
              } else {
                this[key] = alg[key];
              }
            }
          }
        }
      }
    }]);

    return AlgorithmProto;
  }(BaseAlgorithmProto);

  AlgorithmProto.INDEX = BaseAlgorithmProto.INDEX;

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "bytes",
    parser: BaseAlgorithmProto
  })], AlgorithmProto.prototype, "hash", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "bytes"
  })], AlgorithmProto.prototype, "publicExponent", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "uint32"
  })], AlgorithmProto.prototype, "modulusLength", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "uint32"
  })], AlgorithmProto.prototype, "saltLength", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "bytes"
  })], AlgorithmProto.prototype, "label", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "string"
  })], AlgorithmProto.prototype, "namedCurve", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    converter: ArrayBufferConverter
  })], AlgorithmProto.prototype, "public", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "uint32"
  })], AlgorithmProto.prototype, "length", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++
  })], AlgorithmProto.prototype, "iv", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "bool"
  })], AlgorithmProto.prototype, "token", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "bool"
  })], AlgorithmProto.prototype, "sensitive", void 0);

  __decorate([ProtobufProperty({
    id: AlgorithmProto_1.INDEX++,
    type: "string"
  })], AlgorithmProto.prototype, "labelStr", void 0);

  AlgorithmProto = AlgorithmProto_1 = __decorate([ProtobufElement({
    name: "Algorithm"
  })], AlgorithmProto);

  var CryptoItemProto = CryptoItemProto_1 =
  /*#__PURE__*/
  function (_BaseProto3) {
    _inherits(CryptoItemProto, _BaseProto3);

    function CryptoItemProto() {
      _classCallCheck(this, CryptoItemProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CryptoItemProto).apply(this, arguments));
    }

    return CryptoItemProto;
  }(BaseProto);

  CryptoItemProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: CryptoItemProto_1.INDEX++,
    type: "string",
    required: true
  })], CryptoItemProto.prototype, "providerID", void 0);

  __decorate([ProtobufProperty({
    id: CryptoItemProto_1.INDEX++,
    type: "bytes",
    required: true,
    converter: HexStringConverter
  })], CryptoItemProto.prototype, "id", void 0);

  __decorate([ProtobufProperty({
    id: CryptoItemProto_1.INDEX++,
    type: "string",
    required: true
  })], CryptoItemProto.prototype, "type", void 0);

  CryptoItemProto = CryptoItemProto_1 = __decorate([ProtobufElement({
    name: "CryptoItem"
  })], CryptoItemProto);

  var CryptoKeyProto = CryptoKeyProto_1 =
  /*#__PURE__*/
  function (_CryptoItemProto) {
    _inherits(CryptoKeyProto, _CryptoItemProto);

    function CryptoKeyProto() {
      _classCallCheck(this, CryptoKeyProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CryptoKeyProto).apply(this, arguments));
    }

    return CryptoKeyProto;
  }(CryptoItemProto);

  CryptoKeyProto.INDEX = CryptoItemProto.INDEX;

  __decorate([ProtobufProperty({
    id: CryptoKeyProto_1.INDEX++,
    type: "bytes",
    required: true,
    parser: AlgorithmProto
  })], CryptoKeyProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: CryptoKeyProto_1.INDEX++,
    type: "bool"
  })], CryptoKeyProto.prototype, "extractable", void 0);

  __decorate([ProtobufProperty({
    id: CryptoKeyProto_1.INDEX++,
    type: "string",
    repeated: true
  })], CryptoKeyProto.prototype, "usages", void 0);

  CryptoKeyProto = CryptoKeyProto_1 = __decorate([ProtobufElement({
    name: "CryptoKey"
  })], CryptoKeyProto);

  var CryptoKeyPairProto = CryptoKeyPairProto_1 =
  /*#__PURE__*/
  function (_BaseProto4) {
    _inherits(CryptoKeyPairProto, _BaseProto4);

    function CryptoKeyPairProto() {
      _classCallCheck(this, CryptoKeyPairProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CryptoKeyPairProto).apply(this, arguments));
    }

    return CryptoKeyPairProto;
  }(BaseProto);

  CryptoKeyPairProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: CryptoKeyPairProto_1.INDEX++,
    name: "privateKey",
    type: "bytes",
    parser: CryptoKeyProto
  })], CryptoKeyPairProto.prototype, "privateKey", void 0);

  __decorate([ProtobufProperty({
    id: CryptoKeyPairProto_1.INDEX++,
    name: "publicKey",
    type: "bytes",
    parser: CryptoKeyProto
  })], CryptoKeyPairProto.prototype, "publicKey", void 0);

  CryptoKeyPairProto = CryptoKeyPairProto_1 = __decorate([ProtobufElement({
    name: "CryptoKeyPair"
  })], CryptoKeyPairProto);

  var ErrorProto = ErrorProto_1 =
  /*#__PURE__*/
  function (_BaseProto5) {
    _inherits(ErrorProto, _BaseProto5);

    function ErrorProto(message) {
      var _this7;

      var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "error";

      _classCallCheck(this, ErrorProto);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(ErrorProto).call(this));

      if (message) {
        _this7.message = message;
        _this7.code = code;
        _this7.type = type;
      }

      return _this7;
    }

    return ErrorProto;
  }(BaseProto);

  ErrorProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: ErrorProto_1.INDEX++,
    type: "uint32",
    defaultValue: 0
  })], ErrorProto.prototype, "code", void 0);

  __decorate([ProtobufProperty({
    id: ErrorProto_1.INDEX++,
    type: "string",
    defaultValue: "error"
  })], ErrorProto.prototype, "type", void 0);

  __decorate([ProtobufProperty({
    id: ErrorProto_1.INDEX++,
    type: "string",
    defaultValue: ""
  })], ErrorProto.prototype, "message", void 0);

  __decorate([ProtobufProperty({
    id: ErrorProto_1.INDEX++,
    type: "string",
    defaultValue: "Error"
  })], ErrorProto.prototype, "name", void 0);

  __decorate([ProtobufProperty({
    id: ErrorProto_1.INDEX++,
    type: "string",
    defaultValue: ""
  })], ErrorProto.prototype, "stack", void 0);

  ErrorProto = ErrorProto_1 = __decorate([ProtobufElement({
    name: "Error"
  })], ErrorProto);

  var ResultProto = ResultProto_1 =
  /*#__PURE__*/
  function (_ActionProto) {
    _inherits(ResultProto, _ActionProto);

    function ResultProto(proto) {
      var _this8;

      _classCallCheck(this, ResultProto);

      _this8 = _possibleConstructorReturn(this, _getPrototypeOf(ResultProto).call(this));

      if (proto) {
        _this8.actionId = proto.actionId;
        _this8.action = proto.action;
      }

      return _this8;
    }

    return ResultProto;
  }(ActionProto);

  ResultProto.INDEX = ActionProto.INDEX;

  __decorate([ProtobufProperty({
    id: ResultProto_1.INDEX++,
    type: "bool",
    defaultValue: false
  })], ResultProto.prototype, "status", void 0);

  __decorate([ProtobufProperty({
    id: ResultProto_1.INDEX++,
    type: "bytes",
    parser: ErrorProto
  })], ResultProto.prototype, "error", void 0);

  __decorate([ProtobufProperty({
    id: ResultProto_1.INDEX++,
    type: "bytes",
    converter: ArrayBufferConverter
  })], ResultProto.prototype, "data", void 0);

  ResultProto = ResultProto_1 = __decorate([ProtobufElement({
    name: "Result"
  })], ResultProto);

  var AuthRequestProto =
  /*#__PURE__*/
  function (_ActionProto2) {
    _inherits(AuthRequestProto, _ActionProto2);

    function AuthRequestProto() {
      _classCallCheck(this, AuthRequestProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(AuthRequestProto).apply(this, arguments));
    }

    return AuthRequestProto;
  }(ActionProto);

  AuthRequestProto.INDEX = ActionProto.INDEX;
  AuthRequestProto.ACTION = "auth";
  AuthRequestProto = __decorate([ProtobufElement({
    name: "AuthRequest"
  })], AuthRequestProto);

  var ServerLoginActionProto =
  /*#__PURE__*/
  function (_ActionProto3) {
    _inherits(ServerLoginActionProto, _ActionProto3);

    function ServerLoginActionProto() {
      _classCallCheck(this, ServerLoginActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ServerLoginActionProto).apply(this, arguments));
    }

    return ServerLoginActionProto;
  }(ActionProto);

  ServerLoginActionProto.INDEX = ActionProto.INDEX;
  ServerLoginActionProto.ACTION = "server/login";
  ServerLoginActionProto = __decorate([ProtobufElement({})], ServerLoginActionProto);

  var ServerIsLoggedInActionProto =
  /*#__PURE__*/
  function (_ActionProto4) {
    _inherits(ServerIsLoggedInActionProto, _ActionProto4);

    function ServerIsLoggedInActionProto() {
      _classCallCheck(this, ServerIsLoggedInActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ServerIsLoggedInActionProto).apply(this, arguments));
    }

    return ServerIsLoggedInActionProto;
  }(ActionProto);

  ServerIsLoggedInActionProto.INDEX = ActionProto.INDEX;
  ServerIsLoggedInActionProto.ACTION = "server/isLoggedIn";
  ServerIsLoggedInActionProto = __decorate([ProtobufElement({})], ServerIsLoggedInActionProto);
  var CardReaderEventProto_1;

  var CardReaderActionProto =
  /*#__PURE__*/
  function (_ActionProto5) {
    _inherits(CardReaderActionProto, _ActionProto5);

    function CardReaderActionProto() {
      _classCallCheck(this, CardReaderActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CardReaderActionProto).apply(this, arguments));
    }

    return CardReaderActionProto;
  }(ActionProto);

  CardReaderActionProto.INDEX = ActionProto.INDEX;
  CardReaderActionProto.ACTION = "cardReader";
  CardReaderActionProto = __decorate([ProtobufElement({})], CardReaderActionProto);

  var CardReaderGetReadersActionProto =
  /*#__PURE__*/
  function (_ActionProto6) {
    _inherits(CardReaderGetReadersActionProto, _ActionProto6);

    function CardReaderGetReadersActionProto() {
      _classCallCheck(this, CardReaderGetReadersActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CardReaderGetReadersActionProto).apply(this, arguments));
    }

    return CardReaderGetReadersActionProto;
  }(ActionProto);

  CardReaderGetReadersActionProto.INDEX = ActionProto.INDEX;
  CardReaderGetReadersActionProto.ACTION = "cardReader/readers";
  CardReaderGetReadersActionProto = __decorate([ProtobufElement({})], CardReaderGetReadersActionProto);

  var CardReaderEventProto = CardReaderEventProto_1 =
  /*#__PURE__*/
  function (_CardReaderActionProt) {
    _inherits(CardReaderEventProto, _CardReaderActionProt);

    function CardReaderEventProto(reader, atr) {
      var _this9;

      _classCallCheck(this, CardReaderEventProto);

      _this9 = _possibleConstructorReturn(this, _getPrototypeOf(CardReaderEventProto).call(this));

      if (reader && atr) {
        _this9.reader = reader;
        _this9.atr = atr;
      }

      return _this9;
    }

    return CardReaderEventProto;
  }(CardReaderActionProto);

  CardReaderEventProto.INDEX = CardReaderActionProto.INDEX;

  __decorate([ProtobufProperty({
    id: CardReaderEventProto_1.INDEX++,
    required: true,
    type: "string",
    defaultValue: ""
  })], CardReaderEventProto.prototype, "reader", void 0);

  __decorate([ProtobufProperty({
    id: CardReaderEventProto_1.INDEX++,
    required: true,
    converter: HexStringConverter
  })], CardReaderEventProto.prototype, "atr", void 0);

  CardReaderEventProto = CardReaderEventProto_1 = __decorate([ProtobufElement({})], CardReaderEventProto);

  var CardReaderInsertEventProto =
  /*#__PURE__*/
  function (_CardReaderEventProto) {
    _inherits(CardReaderInsertEventProto, _CardReaderEventProto);

    function CardReaderInsertEventProto() {
      _classCallCheck(this, CardReaderInsertEventProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CardReaderInsertEventProto).apply(this, arguments));
    }

    return CardReaderInsertEventProto;
  }(CardReaderEventProto);

  CardReaderInsertEventProto.INDEX = CardReaderEventProto.INDEX;
  CardReaderInsertEventProto.ACTION = CardReaderEventProto.ACTION + "/insert";
  CardReaderInsertEventProto = __decorate([ProtobufElement({})], CardReaderInsertEventProto);

  var CardReaderRemoveEventProto =
  /*#__PURE__*/
  function (_CardReaderEventProto2) {
    _inherits(CardReaderRemoveEventProto, _CardReaderEventProto2);

    function CardReaderRemoveEventProto() {
      _classCallCheck(this, CardReaderRemoveEventProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CardReaderRemoveEventProto).apply(this, arguments));
    }

    return CardReaderRemoveEventProto;
  }(CardReaderEventProto);

  CardReaderRemoveEventProto.INDEX = CardReaderEventProto.INDEX;
  CardReaderRemoveEventProto.ACTION = CardReaderEventProto.ACTION + "/remove";
  CardReaderRemoveEventProto = __decorate([ProtobufElement({})], CardReaderRemoveEventProto);
  var CryptoActionProto_1;

  var CryptoActionProto = CryptoActionProto_1 =
  /*#__PURE__*/
  function (_ActionProto7) {
    _inherits(CryptoActionProto, _ActionProto7);

    function CryptoActionProto() {
      _classCallCheck(this, CryptoActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CryptoActionProto).apply(this, arguments));
    }

    return CryptoActionProto;
  }(ActionProto);

  CryptoActionProto.INDEX = ActionProto.INDEX;
  CryptoActionProto.ACTION = "crypto";

  __decorate([ProtobufProperty({
    id: CryptoActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CryptoActionProto.prototype, "providerID", void 0);

  CryptoActionProto = CryptoActionProto_1 = __decorate([ProtobufElement({})], CryptoActionProto);

  var LoginActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto) {
    _inherits(LoginActionProto, _CryptoActionProto);

    function LoginActionProto() {
      _classCallCheck(this, LoginActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(LoginActionProto).apply(this, arguments));
    }

    return LoginActionProto;
  }(CryptoActionProto);

  LoginActionProto.INDEX = CryptoActionProto.INDEX;
  LoginActionProto.ACTION = "crypto/login";
  LoginActionProto = __decorate([ProtobufElement({})], LoginActionProto);

  var LogoutActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto2) {
    _inherits(LogoutActionProto, _CryptoActionProto2);

    function LogoutActionProto() {
      _classCallCheck(this, LogoutActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(LogoutActionProto).apply(this, arguments));
    }

    return LogoutActionProto;
  }(CryptoActionProto);

  LogoutActionProto.INDEX = CryptoActionProto.INDEX;
  LogoutActionProto.ACTION = "crypto/logout";
  LogoutActionProto = __decorate([ProtobufElement({})], LogoutActionProto);

  var IsLoggedInActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto3) {
    _inherits(IsLoggedInActionProto, _CryptoActionProto3);

    function IsLoggedInActionProto() {
      _classCallCheck(this, IsLoggedInActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(IsLoggedInActionProto).apply(this, arguments));
    }

    return IsLoggedInActionProto;
  }(CryptoActionProto);

  IsLoggedInActionProto.INDEX = CryptoActionProto.INDEX;
  IsLoggedInActionProto.ACTION = "crypto/isLoggedIn";
  IsLoggedInActionProto = __decorate([ProtobufElement({})], IsLoggedInActionProto);

  var ResetActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto4) {
    _inherits(ResetActionProto, _CryptoActionProto4);

    function ResetActionProto() {
      _classCallCheck(this, ResetActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ResetActionProto).apply(this, arguments));
    }

    return ResetActionProto;
  }(CryptoActionProto);

  ResetActionProto.INDEX = CryptoActionProto.INDEX;
  ResetActionProto.ACTION = "crypto/reset";
  ResetActionProto = __decorate([ProtobufElement({})], ResetActionProto);
  var CryptoCertificateProto_1, CryptoX509CertificateProto_1, CryptoX509CertificateRequestProto_1, ChainItemProto_1, CertificateStorageGetChainResultProto_1, CertificateStorageSetItemActionProto_1, CertificateStorageGetItemActionProto_1, CertificateStorageRemoveItemActionProto_1, CertificateStorageImportActionProto_1, CertificateStorageExportActionProto_1, CertificateStorageIndexOfActionProto_1, CertificateStorageGetCRLActionProto_1, OCSPRequestOptionsProto_1, CertificateStorageGetOCSPActionProto_1;

  var CryptoCertificateProto = CryptoCertificateProto_1 =
  /*#__PURE__*/
  function (_CryptoItemProto2) {
    _inherits(CryptoCertificateProto, _CryptoItemProto2);

    function CryptoCertificateProto() {
      var _this10;

      _classCallCheck(this, CryptoCertificateProto);

      _this10 = _possibleConstructorReturn(this, _getPrototypeOf(CryptoCertificateProto).apply(this, arguments));
      _this10.label = "";
      _this10.token = false;
      _this10.sensitive = false;
      return _this10;
    }

    return CryptoCertificateProto;
  }(CryptoItemProto);

  CryptoCertificateProto.INDEX = CryptoItemProto.INDEX;

  __decorate([ProtobufProperty({
    id: CryptoCertificateProto_1.INDEX++,
    required: true,
    converter: HexStringConverter
  })], CryptoCertificateProto.prototype, "id", void 0);

  __decorate([ProtobufProperty({
    id: CryptoCertificateProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], CryptoCertificateProto.prototype, "publicKey", void 0);

  __decorate([ProtobufProperty({
    id: CryptoCertificateProto_1.INDEX++,
    required: true,
    type: "string"
  })], CryptoCertificateProto.prototype, "type", void 0);

  __decorate([ProtobufProperty({
    id: CryptoCertificateProto_1.INDEX++,
    type: "string",
    defaultValue: ""
  })], CryptoCertificateProto.prototype, "label", void 0);

  __decorate([ProtobufProperty({
    id: CryptoCertificateProto_1.INDEX++,
    type: "bool",
    defaultValue: false
  })], CryptoCertificateProto.prototype, "token", void 0);

  __decorate([ProtobufProperty({
    id: CryptoCertificateProto_1.INDEX++,
    type: "bool",
    defaultValue: false
  })], CryptoCertificateProto.prototype, "sensitive", void 0);

  CryptoCertificateProto = CryptoCertificateProto_1 = __decorate([ProtobufElement({})], CryptoCertificateProto);

  var CryptoX509CertificateProto = CryptoX509CertificateProto_1 =
  /*#__PURE__*/
  function (_CryptoCertificatePro) {
    _inherits(CryptoX509CertificateProto, _CryptoCertificatePro);

    function CryptoX509CertificateProto() {
      var _this11;

      _classCallCheck(this, CryptoX509CertificateProto);

      _this11 = _possibleConstructorReturn(this, _getPrototypeOf(CryptoX509CertificateProto).apply(this, arguments));
      _this11.type = "x509";
      return _this11;
    }

    return CryptoX509CertificateProto;
  }(CryptoCertificateProto);

  CryptoX509CertificateProto.INDEX = CryptoCertificateProto.INDEX;

  __decorate([ProtobufProperty({
    id: CryptoX509CertificateProto_1.INDEX++,
    required: true,
    converter: HexStringConverter
  })], CryptoX509CertificateProto.prototype, "serialNumber", void 0);

  __decorate([ProtobufProperty({
    id: CryptoX509CertificateProto_1.INDEX++,
    required: true,
    type: "string"
  })], CryptoX509CertificateProto.prototype, "issuerName", void 0);

  __decorate([ProtobufProperty({
    id: CryptoX509CertificateProto_1.INDEX++,
    required: true,
    type: "string"
  })], CryptoX509CertificateProto.prototype, "subjectName", void 0);

  __decorate([ProtobufProperty({
    id: CryptoX509CertificateProto_1.INDEX++,
    required: true,
    converter: DateConverter$1
  })], CryptoX509CertificateProto.prototype, "notBefore", void 0);

  __decorate([ProtobufProperty({
    id: CryptoX509CertificateProto_1.INDEX++,
    required: true,
    converter: DateConverter$1
  })], CryptoX509CertificateProto.prototype, "notAfter", void 0);

  CryptoX509CertificateProto = CryptoX509CertificateProto_1 = __decorate([ProtobufElement({})], CryptoX509CertificateProto);

  var CryptoX509CertificateRequestProto = CryptoX509CertificateRequestProto_1 =
  /*#__PURE__*/
  function (_CryptoCertificatePro2) {
    _inherits(CryptoX509CertificateRequestProto, _CryptoCertificatePro2);

    function CryptoX509CertificateRequestProto() {
      var _this12;

      _classCallCheck(this, CryptoX509CertificateRequestProto);

      _this12 = _possibleConstructorReturn(this, _getPrototypeOf(CryptoX509CertificateRequestProto).apply(this, arguments));
      _this12.type = "request";
      return _this12;
    }

    return CryptoX509CertificateRequestProto;
  }(CryptoCertificateProto);

  CryptoX509CertificateRequestProto.INDEX = CryptoCertificateProto.INDEX;

  __decorate([ProtobufProperty({
    id: CryptoX509CertificateRequestProto_1.INDEX++,
    required: true,
    type: "string"
  })], CryptoX509CertificateRequestProto.prototype, "subjectName", void 0);

  CryptoX509CertificateRequestProto = CryptoX509CertificateRequestProto_1 = __decorate([ProtobufElement({})], CryptoX509CertificateRequestProto);

  var ChainItemProto = ChainItemProto_1 =
  /*#__PURE__*/
  function (_BaseProto6) {
    _inherits(ChainItemProto, _BaseProto6);

    function ChainItemProto() {
      _classCallCheck(this, ChainItemProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ChainItemProto).apply(this, arguments));
    }

    return ChainItemProto;
  }(BaseProto);

  ChainItemProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: ChainItemProto_1.INDEX++,
    required: true,
    type: "string"
  })], ChainItemProto.prototype, "type", void 0);

  __decorate([ProtobufProperty({
    id: ChainItemProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], ChainItemProto.prototype, "value", void 0);

  ChainItemProto = ChainItemProto_1 = __decorate([ProtobufElement({})], ChainItemProto);

  var CertificateStorageGetChainResultProto = CertificateStorageGetChainResultProto_1 =
  /*#__PURE__*/
  function (_BaseProto7) {
    _inherits(CertificateStorageGetChainResultProto, _BaseProto7);

    function CertificateStorageGetChainResultProto() {
      var _this13;

      _classCallCheck(this, CertificateStorageGetChainResultProto);

      _this13 = _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageGetChainResultProto).apply(this, arguments));
      _this13.items = [];
      return _this13;
    }

    return CertificateStorageGetChainResultProto;
  }(BaseProto);

  CertificateStorageGetChainResultProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: CertificateStorageGetChainResultProto_1.INDEX++,
    required: true,
    repeated: true,
    parser: ChainItemProto
  })], CertificateStorageGetChainResultProto.prototype, "items", void 0);

  CertificateStorageGetChainResultProto = CertificateStorageGetChainResultProto_1 = __decorate([ProtobufElement({})], CertificateStorageGetChainResultProto);

  var CertificateStorageSetItemActionProto = CertificateStorageSetItemActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto5) {
    _inherits(CertificateStorageSetItemActionProto, _CryptoActionProto5);

    function CertificateStorageSetItemActionProto() {
      _classCallCheck(this, CertificateStorageSetItemActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageSetItemActionProto).apply(this, arguments));
    }

    return CertificateStorageSetItemActionProto;
  }(CryptoActionProto);

  CertificateStorageSetItemActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageSetItemActionProto.ACTION = "crypto/certificateStorage/setItem";

  __decorate([ProtobufProperty({
    id: CertificateStorageSetItemActionProto_1.INDEX++,
    required: true,
    parser: CryptoCertificateProto
  })], CertificateStorageSetItemActionProto.prototype, "item", void 0);

  CertificateStorageSetItemActionProto = CertificateStorageSetItemActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageSetItemActionProto);

  var CertificateStorageGetItemActionProto = CertificateStorageGetItemActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto6) {
    _inherits(CertificateStorageGetItemActionProto, _CryptoActionProto6);

    function CertificateStorageGetItemActionProto() {
      _classCallCheck(this, CertificateStorageGetItemActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageGetItemActionProto).apply(this, arguments));
    }

    return CertificateStorageGetItemActionProto;
  }(CryptoActionProto);

  CertificateStorageGetItemActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageGetItemActionProto.ACTION = "crypto/certificateStorage/getItem";

  __decorate([ProtobufProperty({
    id: CertificateStorageGetItemActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CertificateStorageGetItemActionProto.prototype, "key", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageGetItemActionProto_1.INDEX++,
    parser: AlgorithmProto
  })], CertificateStorageGetItemActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageGetItemActionProto_1.INDEX++,
    repeated: true,
    type: "string"
  })], CertificateStorageGetItemActionProto.prototype, "keyUsages", void 0);

  CertificateStorageGetItemActionProto = CertificateStorageGetItemActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageGetItemActionProto);

  var CertificateStorageKeysActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto7) {
    _inherits(CertificateStorageKeysActionProto, _CryptoActionProto7);

    function CertificateStorageKeysActionProto() {
      _classCallCheck(this, CertificateStorageKeysActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageKeysActionProto).apply(this, arguments));
    }

    return CertificateStorageKeysActionProto;
  }(CryptoActionProto);

  CertificateStorageKeysActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageKeysActionProto.ACTION = "crypto/certificateStorage/keys";
  CertificateStorageKeysActionProto = __decorate([ProtobufElement({})], CertificateStorageKeysActionProto);

  var CertificateStorageRemoveItemActionProto = CertificateStorageRemoveItemActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto8) {
    _inherits(CertificateStorageRemoveItemActionProto, _CryptoActionProto8);

    function CertificateStorageRemoveItemActionProto() {
      _classCallCheck(this, CertificateStorageRemoveItemActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageRemoveItemActionProto).apply(this, arguments));
    }

    return CertificateStorageRemoveItemActionProto;
  }(CryptoActionProto);

  CertificateStorageRemoveItemActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageRemoveItemActionProto.ACTION = "crypto/certificateStorage/removeItem";

  __decorate([ProtobufProperty({
    id: CertificateStorageRemoveItemActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CertificateStorageRemoveItemActionProto.prototype, "key", void 0);

  CertificateStorageRemoveItemActionProto = CertificateStorageRemoveItemActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageRemoveItemActionProto);

  var CertificateStorageClearActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto9) {
    _inherits(CertificateStorageClearActionProto, _CryptoActionProto9);

    function CertificateStorageClearActionProto() {
      _classCallCheck(this, CertificateStorageClearActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageClearActionProto).apply(this, arguments));
    }

    return CertificateStorageClearActionProto;
  }(CryptoActionProto);

  CertificateStorageClearActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageClearActionProto.ACTION = "crypto/certificateStorage/clear";
  CertificateStorageClearActionProto = __decorate([ProtobufElement({})], CertificateStorageClearActionProto);

  var CertificateStorageImportActionProto = CertificateStorageImportActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto10) {
    _inherits(CertificateStorageImportActionProto, _CryptoActionProto10);

    function CertificateStorageImportActionProto() {
      _classCallCheck(this, CertificateStorageImportActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageImportActionProto).apply(this, arguments));
    }

    return CertificateStorageImportActionProto;
  }(CryptoActionProto);

  CertificateStorageImportActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageImportActionProto.ACTION = "crypto/certificateStorage/import";

  __decorate([ProtobufProperty({
    id: CertificateStorageImportActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CertificateStorageImportActionProto.prototype, "format", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageImportActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], CertificateStorageImportActionProto.prototype, "data", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageImportActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], CertificateStorageImportActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageImportActionProto_1.INDEX++,
    repeated: true,
    type: "string"
  })], CertificateStorageImportActionProto.prototype, "keyUsages", void 0);

  CertificateStorageImportActionProto = CertificateStorageImportActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageImportActionProto);

  var CertificateStorageExportActionProto = CertificateStorageExportActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto11) {
    _inherits(CertificateStorageExportActionProto, _CryptoActionProto11);

    function CertificateStorageExportActionProto() {
      _classCallCheck(this, CertificateStorageExportActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageExportActionProto).apply(this, arguments));
    }

    return CertificateStorageExportActionProto;
  }(CryptoActionProto);

  CertificateStorageExportActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageExportActionProto.ACTION = "crypto/certificateStorage/export";

  __decorate([ProtobufProperty({
    id: CertificateStorageExportActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CertificateStorageExportActionProto.prototype, "format", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageExportActionProto_1.INDEX++,
    required: true,
    parser: CryptoCertificateProto
  })], CertificateStorageExportActionProto.prototype, "item", void 0);

  CertificateStorageExportActionProto = CertificateStorageExportActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageExportActionProto);

  var CertificateStorageIndexOfActionProto = CertificateStorageIndexOfActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto12) {
    _inherits(CertificateStorageIndexOfActionProto, _CryptoActionProto12);

    function CertificateStorageIndexOfActionProto() {
      _classCallCheck(this, CertificateStorageIndexOfActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageIndexOfActionProto).apply(this, arguments));
    }

    return CertificateStorageIndexOfActionProto;
  }(CryptoActionProto);

  CertificateStorageIndexOfActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageIndexOfActionProto.ACTION = "crypto/certificateStorage/indexOf";

  __decorate([ProtobufProperty({
    id: CertificateStorageIndexOfActionProto_1.INDEX++,
    required: true,
    parser: CryptoCertificateProto
  })], CertificateStorageIndexOfActionProto.prototype, "item", void 0);

  CertificateStorageIndexOfActionProto = CertificateStorageIndexOfActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageIndexOfActionProto);

  var CertificateStorageGetChainActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto13) {
    _inherits(CertificateStorageGetChainActionProto, _CryptoActionProto13);

    function CertificateStorageGetChainActionProto() {
      _classCallCheck(this, CertificateStorageGetChainActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageGetChainActionProto).apply(this, arguments));
    }

    return CertificateStorageGetChainActionProto;
  }(CryptoActionProto);

  CertificateStorageGetChainActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageGetChainActionProto.ACTION = "crypto/certificateStorage/getChain";

  __decorate([ProtobufProperty({
    id: CertificateStorageSetItemActionProto.INDEX++,
    required: true,
    parser: CryptoCertificateProto
  })], CertificateStorageGetChainActionProto.prototype, "item", void 0);

  CertificateStorageGetChainActionProto = __decorate([ProtobufElement({})], CertificateStorageGetChainActionProto);

  var CertificateStorageGetCRLActionProto = CertificateStorageGetCRLActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto14) {
    _inherits(CertificateStorageGetCRLActionProto, _CryptoActionProto14);

    function CertificateStorageGetCRLActionProto() {
      _classCallCheck(this, CertificateStorageGetCRLActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageGetCRLActionProto).apply(this, arguments));
    }

    return CertificateStorageGetCRLActionProto;
  }(CryptoActionProto);

  CertificateStorageGetCRLActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageGetCRLActionProto.ACTION = "crypto/certificateStorage/getCRL";

  __decorate([ProtobufProperty({
    id: CertificateStorageGetCRLActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CertificateStorageGetCRLActionProto.prototype, "url", void 0);

  CertificateStorageGetCRLActionProto = CertificateStorageGetCRLActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageGetCRLActionProto);

  var OCSPRequestOptionsProto = OCSPRequestOptionsProto_1 =
  /*#__PURE__*/
  function (_BaseProto8) {
    _inherits(OCSPRequestOptionsProto, _BaseProto8);

    function OCSPRequestOptionsProto() {
      _classCallCheck(this, OCSPRequestOptionsProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(OCSPRequestOptionsProto).apply(this, arguments));
    }

    return OCSPRequestOptionsProto;
  }(BaseProto);

  OCSPRequestOptionsProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: OCSPRequestOptionsProto_1.INDEX++,
    required: false,
    type: "string",
    defaultValue: "get"
  })], OCSPRequestOptionsProto.prototype, "method", void 0);

  OCSPRequestOptionsProto = OCSPRequestOptionsProto_1 = __decorate([ProtobufElement({})], OCSPRequestOptionsProto);

  var CertificateStorageGetOCSPActionProto = CertificateStorageGetOCSPActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto15) {
    _inherits(CertificateStorageGetOCSPActionProto, _CryptoActionProto15);

    function CertificateStorageGetOCSPActionProto() {
      _classCallCheck(this, CertificateStorageGetOCSPActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(CertificateStorageGetOCSPActionProto).apply(this, arguments));
    }

    return CertificateStorageGetOCSPActionProto;
  }(CryptoActionProto);

  CertificateStorageGetOCSPActionProto.INDEX = CryptoActionProto.INDEX;
  CertificateStorageGetOCSPActionProto.ACTION = "crypto/certificateStorage/getOCSP";

  __decorate([ProtobufProperty({
    id: CertificateStorageGetOCSPActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], CertificateStorageGetOCSPActionProto.prototype, "url", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageGetOCSPActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], CertificateStorageGetOCSPActionProto.prototype, "request", void 0);

  __decorate([ProtobufProperty({
    id: CertificateStorageGetOCSPActionProto_1.INDEX++,
    required: false,
    parser: OCSPRequestOptionsProto
  })], CertificateStorageGetOCSPActionProto.prototype, "options", void 0);

  CertificateStorageGetOCSPActionProto = CertificateStorageGetOCSPActionProto_1 = __decorate([ProtobufElement({})], CertificateStorageGetOCSPActionProto);
  var KeyStorageSetItemActionProto_1, KeyStorageGetItemActionProto_1, KeyStorageRemoveItemActionProto_1, KeyStorageIndexOfActionProto_1;

  var KeyStorageSetItemActionProto = KeyStorageSetItemActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto16) {
    _inherits(KeyStorageSetItemActionProto, _CryptoActionProto16);

    function KeyStorageSetItemActionProto() {
      _classCallCheck(this, KeyStorageSetItemActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyStorageSetItemActionProto).apply(this, arguments));
    }

    return KeyStorageSetItemActionProto;
  }(CryptoActionProto);

  KeyStorageSetItemActionProto.INDEX = CryptoActionProto.INDEX;
  KeyStorageSetItemActionProto.ACTION = "crypto/keyStorage/setItem";

  __decorate([ProtobufProperty({
    id: KeyStorageSetItemActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], KeyStorageSetItemActionProto.prototype, "item", void 0);

  KeyStorageSetItemActionProto = KeyStorageSetItemActionProto_1 = __decorate([ProtobufElement({})], KeyStorageSetItemActionProto);

  var KeyStorageGetItemActionProto = KeyStorageGetItemActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto17) {
    _inherits(KeyStorageGetItemActionProto, _CryptoActionProto17);

    function KeyStorageGetItemActionProto() {
      _classCallCheck(this, KeyStorageGetItemActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyStorageGetItemActionProto).apply(this, arguments));
    }

    return KeyStorageGetItemActionProto;
  }(CryptoActionProto);

  KeyStorageGetItemActionProto.INDEX = CryptoActionProto.INDEX;
  KeyStorageGetItemActionProto.ACTION = "crypto/keyStorage/getItem";

  __decorate([ProtobufProperty({
    id: KeyStorageGetItemActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], KeyStorageGetItemActionProto.prototype, "key", void 0);

  __decorate([ProtobufProperty({
    id: KeyStorageGetItemActionProto_1.INDEX++,
    parser: AlgorithmProto
  })], KeyStorageGetItemActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: KeyStorageGetItemActionProto_1.INDEX++,
    type: "bool"
  })], KeyStorageGetItemActionProto.prototype, "extractable", void 0);

  __decorate([ProtobufProperty({
    id: KeyStorageGetItemActionProto_1.INDEX++,
    repeated: true,
    type: "string"
  })], KeyStorageGetItemActionProto.prototype, "keyUsages", void 0);

  KeyStorageGetItemActionProto = KeyStorageGetItemActionProto_1 = __decorate([ProtobufElement({})], KeyStorageGetItemActionProto);

  var KeyStorageKeysActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto18) {
    _inherits(KeyStorageKeysActionProto, _CryptoActionProto18);

    function KeyStorageKeysActionProto() {
      _classCallCheck(this, KeyStorageKeysActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyStorageKeysActionProto).apply(this, arguments));
    }

    return KeyStorageKeysActionProto;
  }(CryptoActionProto);

  KeyStorageKeysActionProto.INDEX = CryptoActionProto.INDEX;
  KeyStorageKeysActionProto.ACTION = "crypto/keyStorage/keys";
  KeyStorageKeysActionProto = __decorate([ProtobufElement({})], KeyStorageKeysActionProto);

  var KeyStorageRemoveItemActionProto = KeyStorageRemoveItemActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto19) {
    _inherits(KeyStorageRemoveItemActionProto, _CryptoActionProto19);

    function KeyStorageRemoveItemActionProto() {
      _classCallCheck(this, KeyStorageRemoveItemActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyStorageRemoveItemActionProto).apply(this, arguments));
    }

    return KeyStorageRemoveItemActionProto;
  }(CryptoActionProto);

  KeyStorageRemoveItemActionProto.INDEX = CryptoActionProto.INDEX;
  KeyStorageRemoveItemActionProto.ACTION = "crypto/keyStorage/removeItem";

  __decorate([ProtobufProperty({
    id: KeyStorageRemoveItemActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], KeyStorageRemoveItemActionProto.prototype, "key", void 0);

  KeyStorageRemoveItemActionProto = KeyStorageRemoveItemActionProto_1 = __decorate([ProtobufElement({})], KeyStorageRemoveItemActionProto);

  var KeyStorageClearActionProto =
  /*#__PURE__*/
  function (_CryptoActionProto20) {
    _inherits(KeyStorageClearActionProto, _CryptoActionProto20);

    function KeyStorageClearActionProto() {
      _classCallCheck(this, KeyStorageClearActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyStorageClearActionProto).apply(this, arguments));
    }

    return KeyStorageClearActionProto;
  }(CryptoActionProto);

  KeyStorageClearActionProto.INDEX = CryptoActionProto.INDEX;
  KeyStorageClearActionProto.ACTION = "crypto/keyStorage/clear";
  KeyStorageClearActionProto = __decorate([ProtobufElement({})], KeyStorageClearActionProto);

  var KeyStorageIndexOfActionProto = KeyStorageIndexOfActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto21) {
    _inherits(KeyStorageIndexOfActionProto, _CryptoActionProto21);

    function KeyStorageIndexOfActionProto() {
      _classCallCheck(this, KeyStorageIndexOfActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(KeyStorageIndexOfActionProto).apply(this, arguments));
    }

    return KeyStorageIndexOfActionProto;
  }(CryptoActionProto);

  KeyStorageIndexOfActionProto.INDEX = CryptoActionProto.INDEX;
  KeyStorageIndexOfActionProto.ACTION = "crypto/keyStorage/indexOf";

  __decorate([ProtobufProperty({
    id: KeyStorageIndexOfActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], KeyStorageIndexOfActionProto.prototype, "item", void 0);

  KeyStorageIndexOfActionProto = KeyStorageIndexOfActionProto_1 = __decorate([ProtobufElement({})], KeyStorageIndexOfActionProto);
  var ProviderCryptoProto_1, ProviderInfoProto_1, ProviderGetCryptoActionProto_1, ProviderTokenEventProto_1;

  var ProviderCryptoProto = ProviderCryptoProto_1 =
  /*#__PURE__*/
  function (_BaseProto9) {
    _inherits(ProviderCryptoProto, _BaseProto9);

    function ProviderCryptoProto(data) {
      var _this14;

      _classCallCheck(this, ProviderCryptoProto);

      _this14 = _possibleConstructorReturn(this, _getPrototypeOf(ProviderCryptoProto).call(this));

      if (data) {
        assign(_assertThisInitialized(_this14), data);
      }

      return _this14;
    }

    return ProviderCryptoProto;
  }(BaseProto);

  ProviderCryptoProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    required: true,
    type: "string"
  })], ProviderCryptoProto.prototype, "id", void 0);

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    required: true,
    type: "string"
  })], ProviderCryptoProto.prototype, "name", void 0);

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    type: "bool",
    defaultValue: false
  })], ProviderCryptoProto.prototype, "readOnly", void 0);

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    repeated: true,
    type: "string"
  })], ProviderCryptoProto.prototype, "algorithms", void 0);

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    type: "bool",
    defaultValue: false
  })], ProviderCryptoProto.prototype, "isRemovable", void 0);

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    type: "string"
  })], ProviderCryptoProto.prototype, "atr", void 0);

  __decorate([ProtobufProperty({
    id: ProviderCryptoProto_1.INDEX++,
    type: "bool",
    defaultValue: false
  })], ProviderCryptoProto.prototype, "isHardware", void 0);

  ProviderCryptoProto = ProviderCryptoProto_1 = __decorate([ProtobufElement({})], ProviderCryptoProto);

  var ProviderInfoProto = ProviderInfoProto_1 =
  /*#__PURE__*/
  function (_BaseProto10) {
    _inherits(ProviderInfoProto, _BaseProto10);

    function ProviderInfoProto() {
      _classCallCheck(this, ProviderInfoProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ProviderInfoProto).apply(this, arguments));
    }

    return ProviderInfoProto;
  }(BaseProto);

  ProviderInfoProto.INDEX = BaseProto.INDEX;

  __decorate([ProtobufProperty({
    id: ProviderInfoProto_1.INDEX++,
    type: "string",
    required: true
  })], ProviderInfoProto.prototype, "name", void 0);

  __decorate([ProtobufProperty({
    id: ProviderInfoProto_1.INDEX++,
    repeated: true,
    parser: ProviderCryptoProto
  })], ProviderInfoProto.prototype, "providers", void 0);

  ProviderInfoProto = ProviderInfoProto_1 = __decorate([ProtobufElement({})], ProviderInfoProto);

  var ProviderInfoActionProto =
  /*#__PURE__*/
  function (_ActionProto8) {
    _inherits(ProviderInfoActionProto, _ActionProto8);

    function ProviderInfoActionProto() {
      _classCallCheck(this, ProviderInfoActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ProviderInfoActionProto).apply(this, arguments));
    }

    return ProviderInfoActionProto;
  }(ActionProto);

  ProviderInfoActionProto.INDEX = ActionProto.INDEX;
  ProviderInfoActionProto.ACTION = "provider/action/info";
  ProviderInfoActionProto = __decorate([ProtobufElement({})], ProviderInfoActionProto);

  var ProviderGetCryptoActionProto = ProviderGetCryptoActionProto_1 =
  /*#__PURE__*/
  function (_ActionProto9) {
    _inherits(ProviderGetCryptoActionProto, _ActionProto9);

    function ProviderGetCryptoActionProto() {
      _classCallCheck(this, ProviderGetCryptoActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ProviderGetCryptoActionProto).apply(this, arguments));
    }

    return ProviderGetCryptoActionProto;
  }(ActionProto);

  ProviderGetCryptoActionProto.INDEX = ActionProto.INDEX;
  ProviderGetCryptoActionProto.ACTION = "provider/action/getCrypto";

  __decorate([ProtobufProperty({
    id: ProviderGetCryptoActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], ProviderGetCryptoActionProto.prototype, "cryptoID", void 0);

  ProviderGetCryptoActionProto = ProviderGetCryptoActionProto_1 = __decorate([ProtobufElement({})], ProviderGetCryptoActionProto);

  var ProviderAuthorizedEventProto =
  /*#__PURE__*/
  function (_ActionProto10) {
    _inherits(ProviderAuthorizedEventProto, _ActionProto10);

    function ProviderAuthorizedEventProto() {
      _classCallCheck(this, ProviderAuthorizedEventProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ProviderAuthorizedEventProto).apply(this, arguments));
    }

    return ProviderAuthorizedEventProto;
  }(ActionProto);

  ProviderAuthorizedEventProto.INDEX = ActionProto.INDEX;
  ProviderAuthorizedEventProto.ACTION = "provider/event/authorized";
  ProviderAuthorizedEventProto = __decorate([ProtobufElement({})], ProviderAuthorizedEventProto);

  var ProviderTokenEventProto = ProviderTokenEventProto_1 =
  /*#__PURE__*/
  function (_ActionProto11) {
    _inherits(ProviderTokenEventProto, _ActionProto11);

    function ProviderTokenEventProto(data) {
      var _this15;

      _classCallCheck(this, ProviderTokenEventProto);

      _this15 = _possibleConstructorReturn(this, _getPrototypeOf(ProviderTokenEventProto).call(this));

      if (data) {
        assign(_assertThisInitialized(_this15), data);
      }

      return _this15;
    }

    return ProviderTokenEventProto;
  }(ActionProto);

  ProviderTokenEventProto.INDEX = ActionProto.INDEX;
  ProviderTokenEventProto.ACTION = "provider/event/token";

  __decorate([ProtobufProperty({
    id: ProviderTokenEventProto_1.INDEX++,
    repeated: true,
    parser: ProviderCryptoProto
  })], ProviderTokenEventProto.prototype, "added", void 0);

  __decorate([ProtobufProperty({
    id: ProviderTokenEventProto_1.INDEX++,
    repeated: true,
    parser: ProviderCryptoProto
  })], ProviderTokenEventProto.prototype, "removed", void 0);

  __decorate([ProtobufProperty({
    id: ProviderTokenEventProto_1.INDEX++,
    type: "bytes",
    parser: ErrorProto
  })], ProviderTokenEventProto.prototype, "error", void 0);

  ProviderTokenEventProto = ProviderTokenEventProto_1 = __decorate([ProtobufElement({
    name: "ProviderTokenEvent"
  })], ProviderTokenEventProto);
  var DigestActionProto_1, GenerateKeyActionProto_1, SignActionProto_1, VerifyActionProto_1, DeriveBitsActionProto_1, DeriveKeyActionProto_1, UnwrapKeyActionProto_1, WrapKeyActionProto_1, ExportKeyActionProto_1, ImportKeyActionProto_1;

  var DigestActionProto = DigestActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto22) {
    _inherits(DigestActionProto, _CryptoActionProto22);

    function DigestActionProto() {
      _classCallCheck(this, DigestActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(DigestActionProto).apply(this, arguments));
    }

    return DigestActionProto;
  }(CryptoActionProto);

  DigestActionProto.INDEX = CryptoActionProto.INDEX;
  DigestActionProto.ACTION = "crypto/subtle/digest";

  __decorate([ProtobufProperty({
    id: DigestActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], DigestActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: DigestActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], DigestActionProto.prototype, "data", void 0);

  DigestActionProto = DigestActionProto_1 = __decorate([ProtobufElement({})], DigestActionProto);

  var GenerateKeyActionProto = GenerateKeyActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto23) {
    _inherits(GenerateKeyActionProto, _CryptoActionProto23);

    function GenerateKeyActionProto() {
      _classCallCheck(this, GenerateKeyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(GenerateKeyActionProto).apply(this, arguments));
    }

    return GenerateKeyActionProto;
  }(CryptoActionProto);

  GenerateKeyActionProto.INDEX = CryptoActionProto.INDEX;
  GenerateKeyActionProto.ACTION = "crypto/subtle/generateKey";

  __decorate([ProtobufProperty({
    id: GenerateKeyActionProto_1.INDEX++,
    type: "bytes",
    required: true,
    parser: AlgorithmProto
  })], GenerateKeyActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: GenerateKeyActionProto_1.INDEX++,
    type: "bool",
    required: true
  })], GenerateKeyActionProto.prototype, "extractable", void 0);

  __decorate([ProtobufProperty({
    id: GenerateKeyActionProto_1.INDEX++,
    type: "string",
    repeated: true
  })], GenerateKeyActionProto.prototype, "usage", void 0);

  GenerateKeyActionProto = GenerateKeyActionProto_1 = __decorate([ProtobufElement({})], GenerateKeyActionProto);

  var SignActionProto = SignActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto24) {
    _inherits(SignActionProto, _CryptoActionProto24);

    function SignActionProto() {
      _classCallCheck(this, SignActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(SignActionProto).apply(this, arguments));
    }

    return SignActionProto;
  }(CryptoActionProto);

  SignActionProto.INDEX = CryptoActionProto.INDEX;
  SignActionProto.ACTION = "crypto/subtle/sign";

  __decorate([ProtobufProperty({
    id: SignActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], SignActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: SignActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], SignActionProto.prototype, "key", void 0);

  __decorate([ProtobufProperty({
    id: SignActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], SignActionProto.prototype, "data", void 0);

  SignActionProto = SignActionProto_1 = __decorate([ProtobufElement({})], SignActionProto);

  var VerifyActionProto = VerifyActionProto_1 =
  /*#__PURE__*/
  function (_SignActionProto) {
    _inherits(VerifyActionProto, _SignActionProto);

    function VerifyActionProto() {
      _classCallCheck(this, VerifyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(VerifyActionProto).apply(this, arguments));
    }

    return VerifyActionProto;
  }(SignActionProto);

  VerifyActionProto.INDEX = SignActionProto.INDEX;
  VerifyActionProto.ACTION = "crypto/subtle/verify";

  __decorate([ProtobufProperty({
    id: VerifyActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], VerifyActionProto.prototype, "signature", void 0);

  VerifyActionProto = VerifyActionProto_1 = __decorate([ProtobufElement({})], VerifyActionProto);

  var EncryptActionProto =
  /*#__PURE__*/
  function (_SignActionProto2) {
    _inherits(EncryptActionProto, _SignActionProto2);

    function EncryptActionProto() {
      _classCallCheck(this, EncryptActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(EncryptActionProto).apply(this, arguments));
    }

    return EncryptActionProto;
  }(SignActionProto);

  EncryptActionProto.INDEX = SignActionProto.INDEX;
  EncryptActionProto.ACTION = "crypto/subtle/encrypt";
  EncryptActionProto = __decorate([ProtobufElement({})], EncryptActionProto);

  var DecryptActionProto =
  /*#__PURE__*/
  function (_SignActionProto3) {
    _inherits(DecryptActionProto, _SignActionProto3);

    function DecryptActionProto() {
      _classCallCheck(this, DecryptActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(DecryptActionProto).apply(this, arguments));
    }

    return DecryptActionProto;
  }(SignActionProto);

  DecryptActionProto.INDEX = SignActionProto.INDEX;
  DecryptActionProto.ACTION = "crypto/subtle/decrypt";
  DecryptActionProto = __decorate([ProtobufElement({})], DecryptActionProto);

  var DeriveBitsActionProto = DeriveBitsActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto25) {
    _inherits(DeriveBitsActionProto, _CryptoActionProto25);

    function DeriveBitsActionProto() {
      _classCallCheck(this, DeriveBitsActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(DeriveBitsActionProto).apply(this, arguments));
    }

    return DeriveBitsActionProto;
  }(CryptoActionProto);

  DeriveBitsActionProto.INDEX = CryptoActionProto.INDEX;
  DeriveBitsActionProto.ACTION = "crypto/subtle/deriveBits";

  __decorate([ProtobufProperty({
    id: DeriveBitsActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], DeriveBitsActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: DeriveBitsActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], DeriveBitsActionProto.prototype, "key", void 0);

  __decorate([ProtobufProperty({
    id: DeriveBitsActionProto_1.INDEX++,
    required: true,
    type: "uint32"
  })], DeriveBitsActionProto.prototype, "length", void 0);

  DeriveBitsActionProto = DeriveBitsActionProto_1 = __decorate([ProtobufElement({})], DeriveBitsActionProto);

  var DeriveKeyActionProto = DeriveKeyActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto26) {
    _inherits(DeriveKeyActionProto, _CryptoActionProto26);

    function DeriveKeyActionProto() {
      _classCallCheck(this, DeriveKeyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(DeriveKeyActionProto).apply(this, arguments));
    }

    return DeriveKeyActionProto;
  }(CryptoActionProto);

  DeriveKeyActionProto.INDEX = CryptoActionProto.INDEX;
  DeriveKeyActionProto.ACTION = "crypto/subtle/deriveKey";

  __decorate([ProtobufProperty({
    id: DeriveKeyActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], DeriveKeyActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: DeriveKeyActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], DeriveKeyActionProto.prototype, "key", void 0);

  __decorate([ProtobufProperty({
    id: DeriveKeyActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], DeriveKeyActionProto.prototype, "derivedKeyType", void 0);

  __decorate([ProtobufProperty({
    id: DeriveKeyActionProto_1.INDEX++,
    type: "bool"
  })], DeriveKeyActionProto.prototype, "extractable", void 0);

  __decorate([ProtobufProperty({
    id: DeriveKeyActionProto_1.INDEX++,
    type: "string",
    repeated: true
  })], DeriveKeyActionProto.prototype, "usage", void 0);

  DeriveKeyActionProto = DeriveKeyActionProto_1 = __decorate([ProtobufElement({})], DeriveKeyActionProto);

  var UnwrapKeyActionProto = UnwrapKeyActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto27) {
    _inherits(UnwrapKeyActionProto, _CryptoActionProto27);

    function UnwrapKeyActionProto() {
      _classCallCheck(this, UnwrapKeyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(UnwrapKeyActionProto).apply(this, arguments));
    }

    return UnwrapKeyActionProto;
  }(CryptoActionProto);

  UnwrapKeyActionProto.INDEX = CryptoActionProto.INDEX;
  UnwrapKeyActionProto.ACTION = "crypto/subtle/unwrapKey";

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], UnwrapKeyActionProto.prototype, "format", void 0);

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], UnwrapKeyActionProto.prototype, "wrappedKey", void 0);

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], UnwrapKeyActionProto.prototype, "unwrappingKey", void 0);

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], UnwrapKeyActionProto.prototype, "unwrapAlgorithm", void 0);

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], UnwrapKeyActionProto.prototype, "unwrappedKeyAlgorithm", void 0);

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    type: "bool"
  })], UnwrapKeyActionProto.prototype, "extractable", void 0);

  __decorate([ProtobufProperty({
    id: UnwrapKeyActionProto_1.INDEX++,
    type: "string",
    repeated: true
  })], UnwrapKeyActionProto.prototype, "keyUsage", void 0);

  UnwrapKeyActionProto = UnwrapKeyActionProto_1 = __decorate([ProtobufElement({})], UnwrapKeyActionProto);

  var WrapKeyActionProto = WrapKeyActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto28) {
    _inherits(WrapKeyActionProto, _CryptoActionProto28);

    function WrapKeyActionProto() {
      _classCallCheck(this, WrapKeyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(WrapKeyActionProto).apply(this, arguments));
    }

    return WrapKeyActionProto;
  }(CryptoActionProto);

  WrapKeyActionProto.INDEX = CryptoActionProto.INDEX;
  WrapKeyActionProto.ACTION = "crypto/subtle/wrapKey";

  __decorate([ProtobufProperty({
    id: WrapKeyActionProto_1.INDEX++,
    required: true,
    type: "string"
  })], WrapKeyActionProto.prototype, "format", void 0);

  __decorate([ProtobufProperty({
    id: WrapKeyActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], WrapKeyActionProto.prototype, "key", void 0);

  __decorate([ProtobufProperty({
    id: WrapKeyActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], WrapKeyActionProto.prototype, "wrappingKey", void 0);

  __decorate([ProtobufProperty({
    id: WrapKeyActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], WrapKeyActionProto.prototype, "wrapAlgorithm", void 0);

  WrapKeyActionProto = WrapKeyActionProto_1 = __decorate([ProtobufElement({})], WrapKeyActionProto);

  var ExportKeyActionProto = ExportKeyActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto29) {
    _inherits(ExportKeyActionProto, _CryptoActionProto29);

    function ExportKeyActionProto() {
      _classCallCheck(this, ExportKeyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ExportKeyActionProto).apply(this, arguments));
    }

    return ExportKeyActionProto;
  }(CryptoActionProto);

  ExportKeyActionProto.INDEX = CryptoActionProto.INDEX;
  ExportKeyActionProto.ACTION = "crypto/subtle/exportKey";

  __decorate([ProtobufProperty({
    id: ExportKeyActionProto_1.INDEX++,
    type: "string",
    required: true
  })], ExportKeyActionProto.prototype, "format", void 0);

  __decorate([ProtobufProperty({
    id: ExportKeyActionProto_1.INDEX++,
    required: true,
    parser: CryptoKeyProto
  })], ExportKeyActionProto.prototype, "key", void 0);

  ExportKeyActionProto = ExportKeyActionProto_1 = __decorate([ProtobufElement({})], ExportKeyActionProto);

  var ImportKeyActionProto = ImportKeyActionProto_1 =
  /*#__PURE__*/
  function (_CryptoActionProto30) {
    _inherits(ImportKeyActionProto, _CryptoActionProto30);

    function ImportKeyActionProto() {
      _classCallCheck(this, ImportKeyActionProto);

      return _possibleConstructorReturn(this, _getPrototypeOf(ImportKeyActionProto).apply(this, arguments));
    }

    return ImportKeyActionProto;
  }(CryptoActionProto);

  ImportKeyActionProto.INDEX = CryptoActionProto.INDEX;
  ImportKeyActionProto.ACTION = "crypto/subtle/importKey";

  __decorate([ProtobufProperty({
    id: ImportKeyActionProto_1.INDEX++,
    type: "string",
    required: true
  })], ImportKeyActionProto.prototype, "format", void 0);

  __decorate([ProtobufProperty({
    id: ImportKeyActionProto_1.INDEX++,
    required: true,
    converter: ArrayBufferConverter
  })], ImportKeyActionProto.prototype, "keyData", void 0);

  __decorate([ProtobufProperty({
    id: ImportKeyActionProto_1.INDEX++,
    required: true,
    parser: AlgorithmProto
  })], ImportKeyActionProto.prototype, "algorithm", void 0);

  __decorate([ProtobufProperty({
    id: ImportKeyActionProto_1.INDEX++,
    required: true,
    type: "bool"
  })], ImportKeyActionProto.prototype, "extractable", void 0);

  __decorate([ProtobufProperty({
    id: ImportKeyActionProto_1.INDEX++,
    type: "string",
    repeated: true
  })], ImportKeyActionProto.prototype, "keyUsages", void 0);

  ImportKeyActionProto = ImportKeyActionProto_1 = __decorate([ProtobufElement({})], ImportKeyActionProto);

  var CardReader =
  /*#__PURE__*/
  function (_EventEmitter2) {
    _inherits(CardReader, _EventEmitter2);

    function CardReader(client) {
      var _this16;

      _classCallCheck(this, CardReader);

      _this16 = _possibleConstructorReturn(this, _getPrototypeOf(CardReader).call(this));
      _this16.client = client;
      _this16.onEvent = _this16.onEvent.bind(_assertThisInitialized(_this16));

      _this16.client.on("listening", function () {
        _this16.client.on("event", _this16.onEvent);
      }).on("close", function () {
        _this16.client.removeListener("event", _this16.onEvent);
      });

      return _this16;
    }

    _createClass(CardReader, [{
      key: "readers",
      value: function () {
        var _readers = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee69() {
          var data;
          return regeneratorRuntime.wrap(function _callee69$(_context69) {
            while (1) {
              switch (_context69.prev = _context69.next) {
                case 0:
                  _context69.next = 2;
                  return this.client.send(new CardReaderGetReadersActionProto());

                case 2:
                  data = _context69.sent;
                  return _context69.abrupt("return", JSON.parse(Convert.ToString(data)));

                case 4:
                case "end":
                  return _context69.stop();
              }
            }
          }, _callee69, this);
        }));

        function readers() {
          return _readers.apply(this, arguments);
        }

        return readers;
      }()
    }, {
      key: "on",
      value: function on(event, cb) {
        return _get(_getPrototypeOf(CardReader.prototype), "on", this).call(this, event, cb);
      }
    }, {
      key: "emit",
      value: function emit(event) {
        var _get8;

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key5 = 1; _key5 < _len3; _key5++) {
          args[_key5 - 1] = arguments[_key5];
        }

        return (_get8 = _get(_getPrototypeOf(CardReader.prototype), "emit", this)).call.apply(_get8, [this, event].concat(args));
      }
    }, {
      key: "onEvent",
      value: function onEvent(actionProto) {
        var _this17 = this;

        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee70() {
          return regeneratorRuntime.wrap(function _callee70$(_context70) {
            while (1) {
              switch (_context70.prev = _context70.next) {
                case 0:
                  _context70.t0 = actionProto.action;
                  _context70.next = _context70.t0 === CardReaderInsertEventProto.ACTION ? 3 : _context70.t0 === CardReaderRemoveEventProto.ACTION ? 9 : 15;
                  break;

                case 3:
                  _context70.t1 = _this17;
                  _context70.next = 6;
                  return CardReaderInsertEventProto.importProto(actionProto);

                case 6:
                  _context70.t2 = _context70.sent;

                  _context70.t1.onInsert.call(_context70.t1, _context70.t2);

                  return _context70.abrupt("break", 15);

                case 9:
                  _context70.t3 = _this17;
                  _context70.next = 12;
                  return CardReaderRemoveEventProto.importProto(actionProto);

                case 12:
                  _context70.t4 = _context70.sent;

                  _context70.t3.onRemove.call(_context70.t3, _context70.t4);

                  return _context70.abrupt("break", 15);

                case 15:
                case "end":
                  return _context70.stop();
              }
            }
          }, _callee70);
        }))().catch(function (err) {
          return _this17.emit("error", err);
        });
      }
    }, {
      key: "onInsert",
      value: function onInsert(actionProto) {
        this.emit("insert", actionProto);
      }
    }, {
      key: "onRemove",
      value: function onRemove(actionProto) {
        this.emit("remove", actionProto);
      }
    }]);

    return CardReader;
  }(EventEmitter);

  function _challenge2(_x76, _x77) {
    return _challenge.apply(this, arguments);
  }

  function _challenge() {
    _challenge = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee138(serverIdentity, clientIdentity) {
      var serverIdentityDigest, clientIdentityDigest, combinedIdentity, digest;
      return regeneratorRuntime.wrap(function _callee138$(_context138) {
        while (1) {
          switch (_context138.prev = _context138.next) {
            case 0:
              _context138.next = 2;
              return serverIdentity.thumbprint();

            case 2:
              serverIdentityDigest = _context138.sent;
              _context138.next = 5;
              return clientIdentity.thumbprint();

            case 5:
              clientIdentityDigest = _context138.sent;
              combinedIdentity = Convert.FromHex(serverIdentityDigest + clientIdentityDigest);
              _context138.next = 9;
              return getEngine().crypto.subtle.digest("SHA-256", combinedIdentity);

            case 9:
              digest = _context138.sent;
              return _context138.abrupt("return", parseInt(Convert.ToHex(digest), 16).toString().substr(2, 6));

            case 11:
            case "end":
              return _context138.stop();
          }
        }
      }, _callee138);
    }));
    return _challenge.apply(this, arguments);
  }

  var SERVER_WELL_KNOWN = "/.well-known/webcrypto-socket";

  var Event = function Event(target, event) {
    _classCallCheck(this, Event);

    this.target = target;
    this.event = event;
  };

  var CryptoServerError =
  /*#__PURE__*/
  function (_Error) {
    _inherits(CryptoServerError, _Error);

    function CryptoServerError(error) {
      var _this18;

      _classCallCheck(this, CryptoServerError);

      _this18 = _possibleConstructorReturn(this, _getPrototypeOf(CryptoServerError).call(this, error.message));
      _this18.name = "CryptoServerError";
      _this18.code = error.code;
      _this18.type = error.type;
      return _this18;
    }

    return CryptoServerError;
  }(_wrapNativeSuper(Error));

  var ClientEvent =
  /*#__PURE__*/
  function (_Event) {
    _inherits(ClientEvent, _Event);

    function ClientEvent() {
      _classCallCheck(this, ClientEvent);

      return _possibleConstructorReturn(this, _getPrototypeOf(ClientEvent).apply(this, arguments));
    }

    return ClientEvent;
  }(Event);

  var ClientCloseEvent =
  /*#__PURE__*/
  function (_ClientEvent) {
    _inherits(ClientCloseEvent, _ClientEvent);

    function ClientCloseEvent(target, remoteAddress, reasonCode, description) {
      var _this19;

      _classCallCheck(this, ClientCloseEvent);

      _this19 = _possibleConstructorReturn(this, _getPrototypeOf(ClientCloseEvent).call(this, target, "close"));
      _this19.remoteAddress = remoteAddress;
      _this19.reasonCode = reasonCode;
      _this19.description = description;
      return _this19;
    }

    return ClientCloseEvent;
  }(ClientEvent);

  var ClientErrorEvent =
  /*#__PURE__*/
  function (_ClientEvent2) {
    _inherits(ClientErrorEvent, _ClientEvent2);

    function ClientErrorEvent(target, error) {
      var _this20;

      _classCallCheck(this, ClientErrorEvent);

      _this20 = _possibleConstructorReturn(this, _getPrototypeOf(ClientErrorEvent).call(this, target, "error"));
      _this20.error = error;
      return _this20;
    }

    return ClientErrorEvent;
  }(ClientEvent);

  var ClientListeningEvent =
  /*#__PURE__*/
  function (_ClientEvent3) {
    _inherits(ClientListeningEvent, _ClientEvent3);

    function ClientListeningEvent(target, address) {
      var _this21;

      _classCallCheck(this, ClientListeningEvent);

      _this21 = _possibleConstructorReturn(this, _getPrototypeOf(ClientListeningEvent).call(this, target, "listening"));
      _this21.address = address;
      return _this21;
    }

    return ClientListeningEvent;
  }(ClientEvent);

  var SocketCryptoState;

  (function (SocketCryptoState) {
    SocketCryptoState[SocketCryptoState["connecting"] = 0] = "connecting";
    SocketCryptoState[SocketCryptoState["open"] = 1] = "open";
    SocketCryptoState[SocketCryptoState["closing"] = 2] = "closing";
    SocketCryptoState[SocketCryptoState["closed"] = 3] = "closed";
  })(SocketCryptoState || (SocketCryptoState = {}));

  var Client =
  /*#__PURE__*/
  function (_EventEmitter3) {
    _inherits(Client, _EventEmitter3);

    function Client(storage) {
      var _this22;

      _classCallCheck(this, Client);

      _this22 = _possibleConstructorReturn(this, _getPrototypeOf(Client).call(this));
      _this22.stack = {};
      _this22.messageCounter = 0;
      _this22.storage = storage;
      return _this22;
    }

    _createClass(Client, [{
      key: "connect",
      value: function connect(address, options) {
        var _this23 = this;

        this.getServerInfo(address).then(function (info) {
          _this23.serviceInfo = info;
          var url = "wss://".concat(address);
          _this23.socket = options ? new WebSocket(url, undefined, options) : new WebSocket(url);
          _this23.socket.binaryType = "arraybuffer";

          _this23.socket.onerror = function (e) {
            _this23.emit("error", new ClientErrorEvent(_this23, e.error));
          };

          _this23.socket.onopen = function () {
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee71() {
              var identity, remoteIdentityId, bundle;
              return regeneratorRuntime.wrap(function _callee71$(_context71) {
                while (1) {
                  switch (_context71.prev = _context71.next) {
                    case 0:
                      _context71.next = 2;
                      return _this23.storage.loadIdentity();

                    case 2:
                      identity = _context71.sent;

                      if (identity) {
                        _context71.next = 9;
                        break;
                      }

                      _context71.next = 6;
                      return Identity.create(1);

                    case 6:
                      identity = _context71.sent;
                      _context71.next = 9;
                      return _this23.storage.saveIdentity(identity);

                    case 9:
                      remoteIdentityId = "0";
                      _context71.next = 12;
                      return PreKeyBundleProtocol.importProto(Convert.FromBase64(info.preKey));

                    case 12:
                      bundle = _context71.sent;
                      _context71.next = 15;
                      return AsymmetricRatchet.create(identity, bundle);

                    case 15:
                      _this23.cipher = _context71.sent;
                      _context71.next = 18;
                      return _this23.storage.saveRemoteIdentity(remoteIdentityId, _this23.cipher.remoteIdentity);

                    case 18:
                      _this23.emit("listening", new ClientListeningEvent(_this23, address));

                    case 19:
                    case "end":
                      return _context71.stop();
                  }
                }
              }, _callee71);
            }))().catch(function (error) {
              return _this23.emit("error", new ClientErrorEvent(_this23, error));
            });
          };

          _this23.socket.onclose = function (e) {
            for (var actionId in _this23.stack) {
              var message = _this23.stack[actionId];
              message.reject(new Error("Cannot finish operation. Session was closed"));
            }

            _this23.emit("close", new ClientCloseEvent(_this23, address, e.code, e.reason));
          };

          _this23.socket.onmessage = function (e) {
            if (e.data instanceof ArrayBuffer) {
              MessageSignedProtocol.importProto(e.data).then(function (proto2) {
                if (!_this23.cipher) {
                  throw new Error("Client cipher is not initialized");
                }

                return _this23.cipher.decrypt(proto2);
              }).then(function (msg) {
                _this23.onMessage(msg);
              }).catch(function (err) {
                _this23.emit("error", new ClientErrorEvent(_this23, err));
              });
            }
          };
        }).catch(function (err) {
          _this23.emit("error", new ClientErrorEvent(_this23, err));
        });
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        if (this.socket) {
          this.socket.close();
        }
      }
    }, {
      key: "on",
      value: function on(event, listener) {
        return _get(_getPrototypeOf(Client.prototype), "on", this).call(this, event, listener);
      }
    }, {
      key: "once",
      value: function once(event, listener) {
        return _get(_getPrototypeOf(Client.prototype), "once", this).call(this, event, listener);
      }
    }, {
      key: "challenge",
      value: function () {
        var _challenge3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee72() {
          return regeneratorRuntime.wrap(function _callee72$(_context72) {
            while (1) {
              switch (_context72.prev = _context72.next) {
                case 0:
                  if (this.cipher) {
                    _context72.next = 2;
                    break;
                  }

                  throw new Error("Client cipher is not initialized");

                case 2:
                  return _context72.abrupt("return", _challenge2(this.cipher.remoteIdentity.signingKey, this.cipher.identity.signingKey.publicKey));

                case 3:
                case "end":
                  return _context72.stop();
              }
            }
          }, _callee72, this);
        }));

        function challenge() {
          return _challenge3.apply(this, arguments);
        }

        return challenge;
      }()
    }, {
      key: "isLoggedIn",
      value: function () {
        var _isLoggedIn = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee73() {
          var action, data;
          return regeneratorRuntime.wrap(function _callee73$(_context73) {
            while (1) {
              switch (_context73.prev = _context73.next) {
                case 0:
                  action = new ServerIsLoggedInActionProto();
                  _context73.next = 3;
                  return this.send(action);

                case 3:
                  data = _context73.sent;
                  return _context73.abrupt("return", data ? !!new Uint8Array(data)[0] : false);

                case 5:
                case "end":
                  return _context73.stop();
              }
            }
          }, _callee73, this);
        }));

        function isLoggedIn() {
          return _isLoggedIn.apply(this, arguments);
        }

        return isLoggedIn;
      }()
    }, {
      key: "login",
      value: function () {
        var _login = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee74() {
          var action;
          return regeneratorRuntime.wrap(function _callee74$(_context74) {
            while (1) {
              switch (_context74.prev = _context74.next) {
                case 0:
                  action = new ServerLoginActionProto();
                  _context74.next = 3;
                  return this.send(action);

                case 3:
                case "end":
                  return _context74.stop();
              }
            }
          }, _callee74, this);
        }));

        function login() {
          return _login.apply(this, arguments);
        }

        return login;
      }()
    }, {
      key: "send",
      value: function send(data) {
        var _this24 = this;

        return new Promise(function (resolve, reject) {
          _this24.checkSocketState();

          if (!data) {
            data = new ActionProto();
          }

          data.action = data.action;
          data.actionId = (_this24.messageCounter++).toString();
          data.exportProto().then(function (raw) {
            if (!_this24.cipher) {
              throw new Error("Client cipher is not initialized");
            }

            return _this24.cipher.encrypt(raw).then(function (msg) {
              return msg.exportProto();
            });
          }).then(function (raw) {
            if (!_this24.socket) {
              throw new Error("Client socket is not initialized");
            }

            _this24.stack[data.actionId] = {
              resolve: resolve,
              reject: reject
            };

            _this24.socket.send(raw);
          }).catch(reject);
        });
      }
    }, {
      key: "getServerInfo",
      value: function () {
        var _getServerInfo = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee75(address) {
          var url, response, json;
          return regeneratorRuntime.wrap(function _callee75$(_context75) {
            while (1) {
              switch (_context75.prev = _context75.next) {
                case 0:
                  url = "https://".concat(address).concat(SERVER_WELL_KNOWN);
                  _context75.next = 3;
                  return fetch(url);

                case 3:
                  response = _context75.sent;

                  if (!(response.status !== 200)) {
                    _context75.next = 8;
                    break;
                  }

                  throw new Error("Cannot get wellknown link");

                case 8:
                  _context75.next = 10;
                  return response.json();

                case 10:
                  json = _context75.sent;
                  return _context75.abrupt("return", json);

                case 12:
                case "end":
                  return _context75.stop();
              }
            }
          }, _callee75);
        }));

        function getServerInfo(_x78) {
          return _getServerInfo.apply(this, arguments);
        }

        return getServerInfo;
      }()
    }, {
      key: "checkSocketState",
      value: function checkSocketState() {
        if (this.state !== SocketCryptoState.open) {
          throw new Error("Socket connection is not open");
        }
      }
    }, {
      key: "onMessage",
      value: function () {
        var _onMessage = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee76(message) {
          var p, promise, messageProto, errorProto, error;
          return regeneratorRuntime.wrap(function _callee76$(_context76) {
            while (1) {
              switch (_context76.prev = _context76.next) {
                case 0:
                  _context76.next = 2;
                  return ActionProto.importProto(message);

                case 2:
                  p = _context76.sent;
                  promise = this.stack[p.actionId];

                  if (!promise) {
                    _context76.next = 16;
                    break;
                  }

                  delete this.stack[p.actionId];
                  _context76.t0 = ResultProto;
                  _context76.next = 9;
                  return p.exportProto();

                case 9:
                  _context76.t1 = _context76.sent;
                  _context76.next = 12;
                  return _context76.t0.importProto.call(_context76.t0, _context76.t1);

                case 12:
                  messageProto = _context76.sent;

                  if (messageProto.error && messageProto.error.message) {
                    errorProto = messageProto.error;
                    error = new CryptoServerError(errorProto);
                    promise.reject(error);
                  } else {
                    promise.resolve(messageProto.data);
                  }

                  _context76.next = 17;
                  break;

                case 16:
                  this.emit("event", p);

                case 17:
                case "end":
                  return _context76.stop();
              }
            }
          }, _callee76, this);
        }));

        function onMessage(_x79) {
          return _onMessage.apply(this, arguments);
        }

        return onMessage;
      }()
    }, {
      key: "state",
      get: function get() {
        if (this.socket) {
          return this.socket.readyState;
        } else {
          return SocketCryptoState.closed;
        }
      }
    }]);

    return Client;
  }(EventEmitter);
  /**
   * Copyright (c) 2019, Peculiar Ventures, All rights reserved.
   */


  var PemConverter =
  /*#__PURE__*/
  function () {
    function PemConverter() {
      _classCallCheck(this, PemConverter);
    }

    _createClass(PemConverter, null, [{
      key: "toArrayBuffer",
      value: function toArrayBuffer(pem) {
        var base64 = pem.replace(/-{5}(BEGIN|END) .*-{5}/g, "").replace("\r", "").replace("\n", "");
        return Convert.FromBase64(base64);
      }
    }, {
      key: "toUint8Array",
      value: function toUint8Array(pem) {
        var bytes = this.toArrayBuffer(pem);
        return new Uint8Array(bytes);
      }
    }, {
      key: "fromBufferSource",
      value: function fromBufferSource(buffer, tag) {
        var base64 = Convert.ToBase64(buffer);
        var sliced;
        var offset = 0;
        var rows = [];

        while (true) {
          sliced = base64.slice(offset, offset = offset + 64);

          if (sliced.length) {
            rows.push(sliced);

            if (sliced.length < 64) {
              break;
            }
          } else {
            break;
          }
        }

        var upperCaseTag = tag.toUpperCase();
        return "-----BEGIN ".concat(upperCaseTag, "-----\n").concat(rows.join("\n"), "\n-----END ").concat(upperCaseTag, "-----");
      }
    }, {
      key: "isPEM",
      value: function isPEM(data) {
        return /-----BEGIN .+-----[A-Za-z0-9+\/\+\=\s\n]+-----END .+-----/i.test(data);
      }
    }, {
      key: "getTagName",
      value: function getTagName(pem) {
        if (!this.isPEM(pem)) {
          throw new Error("Bad parameter. Incoming data is not right PEM");
        }

        var res = /-----BEGIN (.+)-----/.exec(pem);

        if (!res) {
          throw new Error("Cannot get tag from PEM");
        }

        return res[1];
      }
    }, {
      key: "hasTagName",
      value: function hasTagName(pem, tagName) {
        var tag = this.getTagName(pem);
        return tagName.toLowerCase() === tag.toLowerCase();
      }
    }, {
      key: "isCertificate",
      value: function isCertificate(pem) {
        return this.hasTagName(pem, "certificate");
      }
    }, {
      key: "isCertificateRequest",
      value: function isCertificateRequest(pem) {
        return this.hasTagName(pem, "certificate request");
      }
    }, {
      key: "isCRL",
      value: function isCRL(pem) {
        return this.hasTagName(pem, "x509 crl");
      }
    }, {
      key: "isPublicKey",
      value: function isPublicKey(pem) {
        return this.hasTagName(pem, "public key");
      }
    }]);

    return PemConverter;
  }();

  function Cast(data) {
    return data;
  }

  function isHashedAlgorithm(data) {
    return data instanceof Object && "name" in data && "hash" in data;
  }

  function prepareAlgorithm(algorithm) {
    if (algorithm instanceof AlgorithmProto) {
      return algorithm;
    }

    var algProto = new AlgorithmProto();

    if (typeof algorithm === "string") {
      algProto.fromAlgorithm({
        name: algorithm
      });
    } else if (isHashedAlgorithm(algorithm)) {
      var preparedAlgorithm = _objectSpread2({}, algorithm);

      preparedAlgorithm.hash = prepareAlgorithm(algorithm.hash);
      algProto.fromAlgorithm(preparedAlgorithm);
    } else {
      algProto.fromAlgorithm(_objectSpread2({}, algorithm));
    }

    return algProto;
  }

  function isCryptoKey(data) {
    return data instanceof CryptoKeyProto;
  }

  function isCryptoCertificate(data) {
    return data instanceof CryptoCertificateProto;
  }

  function checkAlgorithm(algorithm, param) {
    if (!(algorithm && (_typeof(algorithm) === "object" || typeof algorithm === "string"))) {
      throw new TypeError("".concat(param, ": Is wrong type. Must be Object or String"));
    }

    if (_typeof(algorithm) === "object" && !("name" in algorithm)) {
      throw new TypeError("".concat(param, ": Required property 'name' is missed"));
    }
  }

  function checkCryptoKey(data, param) {
    if (!isCryptoKey(data)) {
      throw new TypeError("".concat(param, ": Is not type CryptoKey"));
    }
  }

  function checkCryptoCertificate(data, param) {
    if (!isCryptoCertificate(data)) {
      throw new TypeError("".concat(param, ": Is not type CryptoCertificate"));
    }
  }

  function checkBufferSource(data, param) {
    if (!BufferSourceConverter.isBufferSource(data)) {
      throw new TypeError("".concat(param, ": Is wrong type. Must be ArrayBuffer or ArrayBuffer view"));
    }
  }

  function checkArray(data, param) {
    if (!Array.isArray(data)) {
      throw new TypeError("".concat(param, ": Is not type Array"));
    }
  }

  function checkPrimitive(data, type, param) {
    if (_typeof(data) !== type) {
      throw new TypeError("".concat(param, ": Is not type '").concat(type, "'"));
    }
  }

  var IMPORT_CERT_FORMATS = ["raw", "pem", "x509", "request"];

  var CertificateStorage =
  /*#__PURE__*/
  function () {
    function CertificateStorage(provider) {
      _classCallCheck(this, CertificateStorage);

      this.provider = provider;
    }

    _createClass(CertificateStorage, [{
      key: "indexOf",
      value: function () {
        var _indexOf = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee77(item) {
          var proto, result;
          return regeneratorRuntime.wrap(function _callee77$(_context77) {
            while (1) {
              switch (_context77.prev = _context77.next) {
                case 0:
                  checkCryptoCertificate(item, "item");
                  proto = new CertificateStorageIndexOfActionProto();
                  proto.providerID = this.provider.id;
                  proto.item = item;
                  _context77.next = 6;
                  return this.provider.client.send(proto);

                case 6:
                  result = _context77.sent;
                  return _context77.abrupt("return", result ? Convert.ToUtf8String(result) : null);

                case 8:
                case "end":
                  return _context77.stop();
              }
            }
          }, _callee77, this);
        }));

        function indexOf(_x80) {
          return _indexOf.apply(this, arguments);
        }

        return indexOf;
      }()
    }, {
      key: "hasItem",
      value: function () {
        var _hasItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee78(item) {
          var index;
          return regeneratorRuntime.wrap(function _callee78$(_context78) {
            while (1) {
              switch (_context78.prev = _context78.next) {
                case 0:
                  _context78.next = 2;
                  return this.indexOf(item);

                case 2:
                  index = _context78.sent;
                  return _context78.abrupt("return", !!index);

                case 4:
                case "end":
                  return _context78.stop();
              }
            }
          }, _callee78, this);
        }));

        function hasItem(_x81) {
          return _hasItem.apply(this, arguments);
        }

        return hasItem;
      }()
    }, {
      key: "exportCert",
      value: function () {
        var _exportCert = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee79(format, item) {
          var proto, result, header, pem;
          return regeneratorRuntime.wrap(function _callee79$(_context79) {
            while (1) {
              switch (_context79.prev = _context79.next) {
                case 0:
                  checkPrimitive(format, "string", "format");
                  checkCryptoCertificate(item, "item");
                  proto = new CertificateStorageExportActionProto();
                  proto.providerID = this.provider.id;
                  proto.format = "raw";
                  proto.item = item;
                  _context79.next = 8;
                  return this.provider.client.send(proto);

                case 8:
                  result = _context79.sent;

                  if (!(format === "raw")) {
                    _context79.next = 13;
                    break;
                  }

                  return _context79.abrupt("return", result);

                case 13:
                  header = "";
                  _context79.t0 = item.type;
                  _context79.next = _context79.t0 === "x509" ? 17 : _context79.t0 === "request" ? 19 : 21;
                  break;

                case 17:
                  header = "CERTIFICATE";
                  return _context79.abrupt("break", 22);

                case 19:
                  header = "CERTIFICATE REQUEST";
                  return _context79.abrupt("break", 22);

                case 21:
                  throw new Error("Cannot create PEM for unknown type of certificate item");

                case 22:
                  pem = PemConverter.fromBufferSource(result, header);
                  return _context79.abrupt("return", pem);

                case 24:
                case "end":
                  return _context79.stop();
              }
            }
          }, _callee79, this);
        }));

        function exportCert(_x82, _x83) {
          return _exportCert.apply(this, arguments);
        }

        return exportCert;
      }()
    }, {
      key: "importCert",
      value: function () {
        var _importCert = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee80(format, data, algorithm, keyUsages) {
          var algProto, rawData, proto, result, certItem;
          return regeneratorRuntime.wrap(function _callee80$(_context80) {
            while (1) {
              switch (_context80.prev = _context80.next) {
                case 0:
                  checkPrimitive(format, "string", "format");

                  if (~IMPORT_CERT_FORMATS.indexOf(format)) {
                    _context80.next = 3;
                    break;
                  }

                  throw new TypeError("format: Is invalid value. Must be ".concat(IMPORT_CERT_FORMATS.join(", ")));

                case 3:
                  if (format === "pem") {
                    checkPrimitive(data, "string", "data");
                  } else {
                    checkBufferSource(data, "data");
                  }

                  checkAlgorithm(algorithm, "algorithm");
                  checkArray(keyUsages, "keyUsages");
                  algProto = prepareAlgorithm(algorithm);

                  if (!BufferSourceConverter.isBufferSource(data)) {
                    _context80.next = 11;
                    break;
                  }

                  rawData = BufferSourceConverter.toArrayBuffer(data);
                  _context80.next = 16;
                  break;

                case 11:
                  if (!(typeof data === "string")) {
                    _context80.next = 15;
                    break;
                  }

                  rawData = PemConverter.toArrayBuffer(data);
                  _context80.next = 16;
                  break;

                case 15:
                  throw new TypeError("data: Is not type String, ArrayBuffer or ArrayBufferView");

                case 16:
                  proto = new CertificateStorageImportActionProto();
                  proto.providerID = this.provider.id;
                  proto.format = "raw";
                  proto.data = rawData;
                  proto.algorithm = algProto;
                  proto.keyUsages = keyUsages;
                  _context80.next = 24;
                  return this.provider.client.send(proto);

                case 24:
                  result = _context80.sent;
                  _context80.next = 27;
                  return CryptoCertificateProto.importProto(result);

                case 27:
                  certItem = _context80.sent;

                  if (!((format === "request" || format === "x509") && certItem.type !== format)) {
                    _context80.next = 30;
                    break;
                  }

                  throw new TypeError("Imported item is not ".concat(format));

                case 30:
                  return _context80.abrupt("return", this.prepareCertItem(certItem));

                case 31:
                case "end":
                  return _context80.stop();
              }
            }
          }, _callee80, this);
        }));

        function importCert(_x84, _x85, _x86, _x87) {
          return _importCert.apply(this, arguments);
        }

        return importCert;
      }()
    }, {
      key: "keys",
      value: function () {
        var _keys = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee81() {
          var proto, result, _keys2;

          return regeneratorRuntime.wrap(function _callee81$(_context81) {
            while (1) {
              switch (_context81.prev = _context81.next) {
                case 0:
                  proto = new CertificateStorageKeysActionProto();
                  proto.providerID = this.provider.id;
                  _context81.next = 4;
                  return this.provider.client.send(proto);

                case 4:
                  result = _context81.sent;

                  if (!result) {
                    _context81.next = 8;
                    break;
                  }

                  _keys2 = Convert.ToUtf8String(result).split(",");
                  return _context81.abrupt("return", _keys2);

                case 8:
                  return _context81.abrupt("return", []);

                case 9:
                case "end":
                  return _context81.stop();
              }
            }
          }, _callee81, this);
        }));

        function keys() {
          return _keys.apply(this, arguments);
        }

        return keys;
      }()
    }, {
      key: "getItem",
      value: function () {
        var _getItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee82(key, algorithm, keyUsages) {
          var proto, result, certItem;
          return regeneratorRuntime.wrap(function _callee82$(_context82) {
            while (1) {
              switch (_context82.prev = _context82.next) {
                case 0:
                  checkPrimitive(key, "string", "key");

                  if (algorithm) {
                    checkAlgorithm(algorithm, "algorithm");
                    checkArray(keyUsages, "keyUsages");
                  }

                  proto = new CertificateStorageGetItemActionProto();
                  proto.providerID = this.provider.id;
                  proto.key = key;

                  if (algorithm) {
                    proto.algorithm = prepareAlgorithm(algorithm);
                    proto.keyUsages = keyUsages;
                  }

                  _context82.next = 8;
                  return this.provider.client.send(proto);

                case 8:
                  result = _context82.sent;

                  if (!(result && result.byteLength)) {
                    _context82.next = 14;
                    break;
                  }

                  _context82.next = 12;
                  return CryptoCertificateProto.importProto(result);

                case 12:
                  certItem = _context82.sent;
                  return _context82.abrupt("return", this.prepareCertItem(certItem));

                case 14:
                  throw new Error("Cannot get CryptoCertificate from storage by index");

                case 15:
                case "end":
                  return _context82.stop();
              }
            }
          }, _callee82, this);
        }));

        function getItem(_x88, _x89, _x90) {
          return _getItem.apply(this, arguments);
        }

        return getItem;
      }()
    }, {
      key: "setItem",
      value: function () {
        var _setItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee83(value) {
          var proto, data;
          return regeneratorRuntime.wrap(function _callee83$(_context83) {
            while (1) {
              switch (_context83.prev = _context83.next) {
                case 0:
                  checkCryptoCertificate(value, "value");
                  proto = new CertificateStorageSetItemActionProto();
                  proto.providerID = this.provider.id;
                  proto.item = value;
                  _context83.next = 6;
                  return this.provider.client.send(proto);

                case 6:
                  data = _context83.sent;
                  return _context83.abrupt("return", Convert.ToUtf8String(data));

                case 8:
                case "end":
                  return _context83.stop();
              }
            }
          }, _callee83, this);
        }));

        function setItem(_x91) {
          return _setItem.apply(this, arguments);
        }

        return setItem;
      }()
    }, {
      key: "removeItem",
      value: function () {
        var _removeItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee84(key) {
          var proto;
          return regeneratorRuntime.wrap(function _callee84$(_context84) {
            while (1) {
              switch (_context84.prev = _context84.next) {
                case 0:
                  checkPrimitive(key, "string", "key");
                  proto = new CertificateStorageRemoveItemActionProto();
                  proto.providerID = this.provider.id;
                  proto.key = key;
                  _context84.next = 6;
                  return this.provider.client.send(proto);

                case 6:
                case "end":
                  return _context84.stop();
              }
            }
          }, _callee84, this);
        }));

        function removeItem(_x92) {
          return _removeItem.apply(this, arguments);
        }

        return removeItem;
      }()
    }, {
      key: "clear",
      value: function () {
        var _clear = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee85() {
          var proto;
          return regeneratorRuntime.wrap(function _callee85$(_context85) {
            while (1) {
              switch (_context85.prev = _context85.next) {
                case 0:
                  proto = new CertificateStorageClearActionProto();
                  proto.providerID = this.provider.id;
                  _context85.next = 4;
                  return this.provider.client.send(proto);

                case 4:
                case "end":
                  return _context85.stop();
              }
            }
          }, _callee85, this);
        }));

        function clear() {
          return _clear.apply(this, arguments);
        }

        return clear;
      }()
    }, {
      key: "getChain",
      value: function () {
        var _getChain = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee86(value) {
          var proto, data, resultProto;
          return regeneratorRuntime.wrap(function _callee86$(_context86) {
            while (1) {
              switch (_context86.prev = _context86.next) {
                case 0:
                  checkCryptoCertificate(value, "value");
                  proto = new CertificateStorageGetChainActionProto();
                  proto.providerID = this.provider.id;
                  proto.item = value;
                  _context86.next = 6;
                  return this.provider.client.send(proto);

                case 6:
                  data = _context86.sent;
                  _context86.next = 9;
                  return CertificateStorageGetChainResultProto.importProto(data);

                case 9:
                  resultProto = _context86.sent;
                  return _context86.abrupt("return", resultProto.items);

                case 11:
                case "end":
                  return _context86.stop();
              }
            }
          }, _callee86, this);
        }));

        function getChain(_x93) {
          return _getChain.apply(this, arguments);
        }

        return getChain;
      }()
    }, {
      key: "getCRL",
      value: function () {
        var _getCRL = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee87(url) {
          var proto, data;
          return regeneratorRuntime.wrap(function _callee87$(_context87) {
            while (1) {
              switch (_context87.prev = _context87.next) {
                case 0:
                  checkPrimitive(url, "string", "url");
                  proto = new CertificateStorageGetCRLActionProto();
                  proto.providerID = this.provider.id;
                  proto.url = url;
                  _context87.next = 6;
                  return this.provider.client.send(proto);

                case 6:
                  data = _context87.sent;
                  return _context87.abrupt("return", data);

                case 8:
                case "end":
                  return _context87.stop();
              }
            }
          }, _callee87, this);
        }));

        function getCRL(_x94) {
          return _getCRL.apply(this, arguments);
        }

        return getCRL;
      }()
    }, {
      key: "getOCSP",
      value: function () {
        var _getOCSP = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee88(url, request, options) {
          var proto, key, data;
          return regeneratorRuntime.wrap(function _callee88$(_context88) {
            while (1) {
              switch (_context88.prev = _context88.next) {
                case 0:
                  checkPrimitive(url, "string", "url");
                  checkBufferSource(request, "request");
                  proto = new CertificateStorageGetOCSPActionProto();
                  proto.providerID = this.provider.id;
                  proto.url = url;
                  proto.request = BufferSourceConverter.toArrayBuffer(request);

                  if (options) {
                    for (key in options) {
                      proto.options[key] = options[key];
                    }
                  }

                  _context88.next = 9;
                  return this.provider.client.send(proto);

                case 9:
                  data = _context88.sent;
                  return _context88.abrupt("return", data);

                case 11:
                case "end":
                  return _context88.stop();
              }
            }
          }, _callee88, this);
        }));

        function getOCSP(_x95, _x96, _x97) {
          return _getOCSP.apply(this, arguments);
        }

        return getOCSP;
      }()
    }, {
      key: "prepareCertItem",
      value: function () {
        var _prepareCertItem = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee89(item) {
          var raw, result;
          return regeneratorRuntime.wrap(function _callee89$(_context89) {
            while (1) {
              switch (_context89.prev = _context89.next) {
                case 0:
                  _context89.next = 2;
                  return item.exportProto();

                case 2:
                  raw = _context89.sent;
                  _context89.t0 = item.type;
                  _context89.next = _context89.t0 === "x509" ? 6 : _context89.t0 === "request" ? 10 : 14;
                  break;

                case 6:
                  _context89.next = 8;
                  return CryptoX509CertificateProto.importProto(raw);

                case 8:
                  result = _context89.sent;
                  return _context89.abrupt("break", 15);

                case 10:
                  _context89.next = 12;
                  return CryptoX509CertificateRequestProto.importProto(raw);

                case 12:
                  result = _context89.sent;
                  return _context89.abrupt("break", 15);

                case 14:
                  throw new Error("Unsupported CertificateItem type '".concat(item.type, "'"));

                case 15:
                  result.provider = this.provider;
                  return _context89.abrupt("return", result);

                case 17:
                case "end":
                  return _context89.stop();
              }
            }
          }, _callee89, this);
        }));

        function prepareCertItem(_x98) {
          return _prepareCertItem.apply(this, arguments);
        }

        return prepareCertItem;
      }()
    }]);

    return CertificateStorage;
  }();

  var KeyStorage =
  /*#__PURE__*/
  function () {
    function KeyStorage(service) {
      _classCallCheck(this, KeyStorage);

      this.service = service;
    }

    _createClass(KeyStorage, [{
      key: "keys",
      value: function () {
        var _keys3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee90() {
          var proto, result, _keys4;

          return regeneratorRuntime.wrap(function _callee90$(_context90) {
            while (1) {
              switch (_context90.prev = _context90.next) {
                case 0:
                  proto = new KeyStorageKeysActionProto();
                  proto.providerID = this.service.id;
                  _context90.next = 4;
                  return this.service.client.send(proto);

                case 4:
                  result = _context90.sent;

                  if (!result) {
                    _context90.next = 8;
                    break;
                  }

                  _keys4 = Convert.ToUtf8String(result).split(",");
                  return _context90.abrupt("return", _keys4);

                case 8:
                  return _context90.abrupt("return", []);

                case 9:
                case "end":
                  return _context90.stop();
              }
            }
          }, _callee90, this);
        }));

        function keys() {
          return _keys3.apply(this, arguments);
        }

        return keys;
      }()
    }, {
      key: "indexOf",
      value: function () {
        var _indexOf2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee91(item) {
          var proto, result;
          return regeneratorRuntime.wrap(function _callee91$(_context91) {
            while (1) {
              switch (_context91.prev = _context91.next) {
                case 0:
                  checkCryptoKey(item, "item");
                  proto = new KeyStorageIndexOfActionProto();
                  proto.providerID = this.service.id;
                  proto.item = item;
                  _context91.next = 6;
                  return this.service.client.send(proto);

                case 6:
                  result = _context91.sent;
                  return _context91.abrupt("return", result ? Convert.ToUtf8String(result) : null);

                case 8:
                case "end":
                  return _context91.stop();
              }
            }
          }, _callee91, this);
        }));

        function indexOf(_x99) {
          return _indexOf2.apply(this, arguments);
        }

        return indexOf;
      }()
    }, {
      key: "hasItem",
      value: function () {
        var _hasItem2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee92(item) {
          var index;
          return regeneratorRuntime.wrap(function _callee92$(_context92) {
            while (1) {
              switch (_context92.prev = _context92.next) {
                case 0:
                  _context92.next = 2;
                  return this.indexOf(item);

                case 2:
                  index = _context92.sent;
                  return _context92.abrupt("return", !!index);

                case 4:
                case "end":
                  return _context92.stop();
              }
            }
          }, _callee92, this);
        }));

        function hasItem(_x100) {
          return _hasItem2.apply(this, arguments);
        }

        return hasItem;
      }()
    }, {
      key: "getItem",
      value: function () {
        var _getItem2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee93(key, algorithm, extractable, usages) {
          var proto, result, socketKey;
          return regeneratorRuntime.wrap(function _callee93$(_context93) {
            while (1) {
              switch (_context93.prev = _context93.next) {
                case 0:
                  checkPrimitive(key, "string", "key");

                  if (algorithm) {
                    checkAlgorithm(algorithm, "algorithm");
                    checkPrimitive(extractable, "boolean", "extractable");
                    checkArray(usages, "usages");
                  }

                  proto = new KeyStorageGetItemActionProto();
                  proto.providerID = this.service.id;
                  proto.key = key;

                  if (algorithm) {
                    proto.algorithm = prepareAlgorithm(algorithm);
                    proto.extractable = extractable;
                    proto.keyUsages = usages;
                  }

                  _context93.next = 8;
                  return this.service.client.send(proto);

                case 8:
                  result = _context93.sent;

                  if (!(result && result.byteLength)) {
                    _context93.next = 15;
                    break;
                  }

                  _context93.next = 12;
                  return CryptoKeyProto.importProto(result);

                case 12:
                  socketKey = _context93.sent;
                  _context93.next = 16;
                  break;

                case 15:
                  throw new Error("Cannot get CryptoKey from key storage by index");

                case 16:
                  return _context93.abrupt("return", socketKey);

                case 17:
                case "end":
                  return _context93.stop();
              }
            }
          }, _callee93, this);
        }));

        function getItem(_x101, _x102, _x103, _x104) {
          return _getItem2.apply(this, arguments);
        }

        return getItem;
      }()
    }, {
      key: "setItem",
      value: function () {
        var _setItem2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee94(value) {
          var proto, data;
          return regeneratorRuntime.wrap(function _callee94$(_context94) {
            while (1) {
              switch (_context94.prev = _context94.next) {
                case 0:
                  checkCryptoKey(value, "value");
                  proto = new KeyStorageSetItemActionProto();
                  proto.providerID = this.service.id;
                  proto.item = value;
                  _context94.next = 6;
                  return this.service.client.send(proto);

                case 6:
                  data = _context94.sent;
                  return _context94.abrupt("return", Convert.ToUtf8String(data));

                case 8:
                case "end":
                  return _context94.stop();
              }
            }
          }, _callee94, this);
        }));

        function setItem(_x105) {
          return _setItem2.apply(this, arguments);
        }

        return setItem;
      }()
    }, {
      key: "removeItem",
      value: function () {
        var _removeItem2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee95(key) {
          var proto;
          return regeneratorRuntime.wrap(function _callee95$(_context95) {
            while (1) {
              switch (_context95.prev = _context95.next) {
                case 0:
                  checkPrimitive(key, "string", "key");
                  proto = new KeyStorageRemoveItemActionProto();
                  proto.providerID = this.service.id;
                  proto.key = key;
                  _context95.next = 6;
                  return this.service.client.send(proto);

                case 6:
                case "end":
                  return _context95.stop();
              }
            }
          }, _callee95, this);
        }));

        function removeItem(_x106) {
          return _removeItem2.apply(this, arguments);
        }

        return removeItem;
      }()
    }, {
      key: "clear",
      value: function () {
        var _clear2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee96() {
          var proto;
          return regeneratorRuntime.wrap(function _callee96$(_context96) {
            while (1) {
              switch (_context96.prev = _context96.next) {
                case 0:
                  proto = new KeyStorageClearActionProto();
                  proto.providerID = this.service.id;
                  _context96.next = 4;
                  return this.service.client.send(proto);

                case 4:
                case "end":
                  return _context96.stop();
              }
            }
          }, _callee96, this);
        }));

        function clear() {
          return _clear2.apply(this, arguments);
        }

        return clear;
      }()
    }]);

    return KeyStorage;
  }();

  var SubtleCrypto =
  /*#__PURE__*/
  function () {
    function SubtleCrypto(crypto) {
      _classCallCheck(this, SubtleCrypto);

      this.service = crypto;
    }

    _createClass(SubtleCrypto, [{
      key: "encrypt",
      value: function () {
        var _encrypt3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee97(algorithm, key, data) {
          return regeneratorRuntime.wrap(function _callee97$(_context97) {
            while (1) {
              switch (_context97.prev = _context97.next) {
                case 0:
                  return _context97.abrupt("return", this.encryptData(algorithm, key, data, "encrypt"));

                case 1:
                case "end":
                  return _context97.stop();
              }
            }
          }, _callee97, this);
        }));

        function encrypt(_x107, _x108, _x109) {
          return _encrypt3.apply(this, arguments);
        }

        return encrypt;
      }()
    }, {
      key: "decrypt",
      value: function () {
        var _decrypt3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee98(algorithm, key, data) {
          return regeneratorRuntime.wrap(function _callee98$(_context98) {
            while (1) {
              switch (_context98.prev = _context98.next) {
                case 0:
                  return _context98.abrupt("return", this.encryptData(algorithm, key, data, "decrypt"));

                case 1:
                case "end":
                  return _context98.stop();
              }
            }
          }, _callee98, this);
        }));

        function decrypt(_x110, _x111, _x112) {
          return _decrypt3.apply(this, arguments);
        }

        return decrypt;
      }()
    }, {
      key: "deriveBits",
      value: function () {
        var _deriveBits = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee99(algorithm, baseKey, length) {
          var algProto, action, result;
          return regeneratorRuntime.wrap(function _callee99$(_context99) {
            while (1) {
              switch (_context99.prev = _context99.next) {
                case 0:
                  checkAlgorithm(algorithm, "algorithm");
                  checkCryptoKey(baseKey, "baseKey");
                  checkPrimitive(length, "number", "length");
                  algProto = prepareAlgorithm(algorithm);
                  checkCryptoKey(algProto.public, "algorithm.public");
                  _context99.next = 7;
                  return Cast(algProto.public).exportProto();

                case 7:
                  algProto.public = _context99.sent;
                  action = new DeriveBitsActionProto();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.key = baseKey;
                  action.length = length;
                  _context99.next = 15;
                  return this.service.client.send(action);

                case 15:
                  result = _context99.sent;
                  return _context99.abrupt("return", result);

                case 17:
                case "end":
                  return _context99.stop();
              }
            }
          }, _callee99, this);
        }));

        function deriveBits(_x113, _x114, _x115) {
          return _deriveBits.apply(this, arguments);
        }

        return deriveBits;
      }()
    }, {
      key: "deriveKey",
      value: function () {
        var _deriveKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee100(algorithm, baseKey, derivedKeyType, extractable, keyUsages) {
          var algProto, algKeyType, action, result;
          return regeneratorRuntime.wrap(function _callee100$(_context100) {
            while (1) {
              switch (_context100.prev = _context100.next) {
                case 0:
                  checkAlgorithm(algorithm, "algorithm");
                  checkCryptoKey(baseKey, "baseKey");
                  checkAlgorithm(derivedKeyType, "algorithm");
                  checkPrimitive(extractable, "boolean", "extractable");
                  checkArray(keyUsages, "keyUsages");
                  algProto = prepareAlgorithm(algorithm);
                  checkCryptoKey(algProto.public, "algorithm.public");
                  _context100.next = 9;
                  return Cast(algProto.public).exportProto();

                case 9:
                  algProto.public = _context100.sent;
                  algKeyType = prepareAlgorithm(derivedKeyType);
                  action = new DeriveKeyActionProto();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.derivedKeyType.fromAlgorithm(algKeyType);
                  action.key = baseKey;
                  action.extractable = extractable;
                  action.usage = keyUsages;
                  _context100.next = 20;
                  return this.service.client.send(action);

                case 20:
                  result = _context100.sent;
                  _context100.next = 23;
                  return CryptoKeyProto.importProto(result);

                case 23:
                  return _context100.abrupt("return", _context100.sent);

                case 24:
                case "end":
                  return _context100.stop();
              }
            }
          }, _callee100, this);
        }));

        function deriveKey(_x116, _x117, _x118, _x119, _x120) {
          return _deriveKey.apply(this, arguments);
        }

        return deriveKey;
      }()
    }, {
      key: "digest",
      value: function () {
        var _digest = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee101(algorithm, data) {
          return regeneratorRuntime.wrap(function _callee101$(_context101) {
            while (1) {
              switch (_context101.prev = _context101.next) {
                case 0:
                  return _context101.abrupt("return", getEngine().crypto.subtle.digest(algorithm, data));

                case 1:
                case "end":
                  return _context101.stop();
              }
            }
          }, _callee101);
        }));

        function digest(_x121, _x122) {
          return _digest.apply(this, arguments);
        }

        return digest;
      }()
    }, {
      key: "generateKey",
      value: function () {
        var _generateKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee102(algorithm, extractable, keyUsages) {
          var algProto, action, result, keyPair, key;
          return regeneratorRuntime.wrap(function _callee102$(_context102) {
            while (1) {
              switch (_context102.prev = _context102.next) {
                case 0:
                  checkAlgorithm(algorithm, "algorithm");
                  checkPrimitive(extractable, "boolean", "extractable");
                  checkArray(keyUsages, "keyUsages");
                  algProto = prepareAlgorithm(algorithm);
                  action = new GenerateKeyActionProto();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.extractable = extractable;
                  action.usage = keyUsages;
                  _context102.next = 11;
                  return this.service.client.send(action);

                case 11:
                  result = _context102.sent;
                  _context102.prev = 12;
                  _context102.next = 15;
                  return CryptoKeyPairProto.importProto(result);

                case 15:
                  keyPair = _context102.sent;
                  return _context102.abrupt("return", keyPair);

                case 19:
                  _context102.prev = 19;
                  _context102.t0 = _context102["catch"](12);
                  _context102.next = 23;
                  return CryptoKeyProto.importProto(result);

                case 23:
                  key = _context102.sent;
                  return _context102.abrupt("return", key);

                case 25:
                case "end":
                  return _context102.stop();
              }
            }
          }, _callee102, this, [[12, 19]]);
        }));

        function generateKey(_x123, _x124, _x125) {
          return _generateKey.apply(this, arguments);
        }

        return generateKey;
      }()
    }, {
      key: "exportKey",
      value: function () {
        var _exportKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee103(format, key) {
          var action, result;
          return regeneratorRuntime.wrap(function _callee103$(_context103) {
            while (1) {
              switch (_context103.prev = _context103.next) {
                case 0:
                  checkPrimitive(format, "string", "format");
                  checkCryptoKey(key, "key");
                  action = new ExportKeyActionProto();
                  action.providerID = this.service.id;
                  action.format = format;
                  action.key = key;
                  _context103.next = 8;
                  return this.service.client.send(action);

                case 8:
                  result = _context103.sent;

                  if (!(format === "jwk")) {
                    _context103.next = 13;
                    break;
                  }

                  return _context103.abrupt("return", JSON.parse(Convert.ToBinary(result)));

                case 13:
                  return _context103.abrupt("return", result);

                case 14:
                case "end":
                  return _context103.stop();
              }
            }
          }, _callee103, this);
        }));

        function exportKey(_x126, _x127) {
          return _exportKey.apply(this, arguments);
        }

        return exportKey;
      }()
    }, {
      key: "importKey",
      value: function () {
        var _importKey2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee104(format, keyData, algorithm, extractable, keyUsages) {
          var algProto, preparedKeyData, action, result;
          return regeneratorRuntime.wrap(function _callee104$(_context104) {
            while (1) {
              switch (_context104.prev = _context104.next) {
                case 0:
                  checkPrimitive(format, "string", "format");
                  checkAlgorithm(algorithm, "algorithm");
                  checkPrimitive(extractable, "boolean", "extractable");
                  checkArray(keyUsages, "keyUsages");
                  algProto = prepareAlgorithm(algorithm);

                  if (format === "jwk") {
                    preparedKeyData = Convert.FromUtf8String(JSON.stringify(keyData));
                  } else {
                    checkBufferSource(keyData, "keyData");
                    preparedKeyData = BufferSourceConverter.toArrayBuffer(keyData);
                  }

                  action = new ImportKeyActionProto();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.keyData = preparedKeyData;
                  action.format = format;
                  action.extractable = extractable;
                  action.keyUsages = keyUsages;
                  _context104.next = 15;
                  return this.service.client.send(action);

                case 15:
                  result = _context104.sent;
                  _context104.next = 18;
                  return CryptoKeyProto.importProto(result);

                case 18:
                  return _context104.abrupt("return", _context104.sent);

                case 19:
                case "end":
                  return _context104.stop();
              }
            }
          }, _callee104, this);
        }));

        function importKey(_x128, _x129, _x130, _x131, _x132) {
          return _importKey2.apply(this, arguments);
        }

        return importKey;
      }()
    }, {
      key: "sign",
      value: function () {
        var _sign6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee105(algorithm, key, data) {
          var algProto, rawData, action, result;
          return regeneratorRuntime.wrap(function _callee105$(_context105) {
            while (1) {
              switch (_context105.prev = _context105.next) {
                case 0:
                  checkAlgorithm(algorithm, "algorithm");
                  checkCryptoKey(key, "key");
                  checkBufferSource(data, "data");
                  algProto = prepareAlgorithm(algorithm);
                  rawData = BufferSourceConverter.toArrayBuffer(data);
                  action = new SignActionProto();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.key = key;
                  action.data = rawData;
                  _context105.next = 12;
                  return this.service.client.send(action);

                case 12:
                  result = _context105.sent;
                  return _context105.abrupt("return", result);

                case 14:
                case "end":
                  return _context105.stop();
              }
            }
          }, _callee105, this);
        }));

        function sign(_x133, _x134, _x135) {
          return _sign6.apply(this, arguments);
        }

        return sign;
      }()
    }, {
      key: "verify",
      value: function () {
        var _verify3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee106(algorithm, key, signature, data) {
          var algProto, rawSignature, rawData, action, result;
          return regeneratorRuntime.wrap(function _callee106$(_context106) {
            while (1) {
              switch (_context106.prev = _context106.next) {
                case 0:
                  checkAlgorithm(algorithm, "algorithm");
                  checkCryptoKey(key, "key");
                  checkBufferSource(signature, "signature");
                  checkBufferSource(data, "data");
                  algProto = prepareAlgorithm(algorithm);
                  rawSignature = BufferSourceConverter.toArrayBuffer(signature);
                  rawData = BufferSourceConverter.toArrayBuffer(data);
                  action = new VerifyActionProto();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.key = key;
                  action.data = rawData;
                  action.signature = rawSignature;
                  _context106.next = 15;
                  return this.service.client.send(action);

                case 15:
                  result = _context106.sent;
                  return _context106.abrupt("return", !!new Uint8Array(result)[0]);

                case 17:
                case "end":
                  return _context106.stop();
              }
            }
          }, _callee106, this);
        }));

        function verify(_x136, _x137, _x138, _x139) {
          return _verify3.apply(this, arguments);
        }

        return verify;
      }()
    }, {
      key: "wrapKey",
      value: function () {
        var _wrapKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee107(format, key, wrappingKey, wrapAlgorithm) {
          var wrapAlgProto, action, result;
          return regeneratorRuntime.wrap(function _callee107$(_context107) {
            while (1) {
              switch (_context107.prev = _context107.next) {
                case 0:
                  checkPrimitive(format, "string", "format");
                  checkCryptoKey(key, "key");
                  checkCryptoKey(wrappingKey, "wrappingKey");
                  checkAlgorithm(wrapAlgorithm, "wrapAlgorithm");
                  wrapAlgProto = prepareAlgorithm(wrapAlgorithm);
                  action = new WrapKeyActionProto();
                  action.providerID = this.service.id;
                  action.wrapAlgorithm = wrapAlgProto;
                  action.key = key;
                  action.wrappingKey = wrappingKey;
                  action.format = format;
                  _context107.next = 13;
                  return this.service.client.send(action);

                case 13:
                  result = _context107.sent;
                  return _context107.abrupt("return", result);

                case 15:
                case "end":
                  return _context107.stop();
              }
            }
          }, _callee107, this);
        }));

        function wrapKey(_x140, _x141, _x142, _x143) {
          return _wrapKey.apply(this, arguments);
        }

        return wrapKey;
      }()
    }, {
      key: "unwrapKey",
      value: function () {
        var _unwrapKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee108(format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
          var unwrapAlgProto, unwrappedKeyAlgProto, rawWrappedKey, action, result;
          return regeneratorRuntime.wrap(function _callee108$(_context108) {
            while (1) {
              switch (_context108.prev = _context108.next) {
                case 0:
                  checkPrimitive(format, "string", "format");
                  checkBufferSource(wrappedKey, "wrappedKey");
                  checkCryptoKey(unwrappingKey, "unwrappingKey");
                  checkAlgorithm(unwrapAlgorithm, "unwrapAlgorithm");
                  checkAlgorithm(unwrappedKeyAlgorithm, "unwrappedKeyAlgorithm");
                  checkPrimitive(extractable, "boolean", "extractable");
                  checkArray(keyUsages, "keyUsages");
                  unwrapAlgProto = prepareAlgorithm(unwrapAlgorithm);
                  unwrappedKeyAlgProto = prepareAlgorithm(unwrappedKeyAlgorithm);
                  rawWrappedKey = BufferSourceConverter.toArrayBuffer(wrappedKey);
                  action = new UnwrapKeyActionProto();
                  action.providerID = this.service.id;
                  action.format = format;
                  action.unwrapAlgorithm = unwrapAlgProto;
                  action.unwrappedKeyAlgorithm = unwrappedKeyAlgProto;
                  action.unwrappingKey = unwrappingKey;
                  action.wrappedKey = rawWrappedKey;
                  action.extractable = extractable;
                  action.keyUsage = keyUsages;
                  _context108.next = 21;
                  return this.service.client.send(action);

                case 21:
                  result = _context108.sent;
                  _context108.next = 24;
                  return CryptoKeyProto.importProto(result);

                case 24:
                  return _context108.abrupt("return", _context108.sent);

                case 25:
                case "end":
                  return _context108.stop();
              }
            }
          }, _callee108, this);
        }));

        function unwrapKey(_x144, _x145, _x146, _x147, _x148, _x149, _x150) {
          return _unwrapKey.apply(this, arguments);
        }

        return unwrapKey;
      }()
    }, {
      key: "encryptData",
      value: function () {
        var _encryptData = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee109(algorithm, key, data, type) {
          var algProto, rawData, ActionClass, action, result;
          return regeneratorRuntime.wrap(function _callee109$(_context109) {
            while (1) {
              switch (_context109.prev = _context109.next) {
                case 0:
                  checkAlgorithm(algorithm, "algorithm");
                  checkCryptoKey(key, "key");
                  checkBufferSource(data, "data");
                  algProto = prepareAlgorithm(algorithm);
                  rawData = BufferSourceConverter.toArrayBuffer(data);

                  if (type === "encrypt") {
                    ActionClass = EncryptActionProto;
                  } else {
                    ActionClass = DecryptActionProto;
                  }

                  action = new ActionClass();
                  action.providerID = this.service.id;
                  action.algorithm = algProto;
                  action.key = key;
                  action.data = rawData;
                  _context109.next = 13;
                  return this.service.client.send(action);

                case 13:
                  result = _context109.sent;
                  return _context109.abrupt("return", result);

                case 15:
                case "end":
                  return _context109.stop();
              }
            }
          }, _callee109, this);
        }));

        function encryptData(_x151, _x152, _x153, _x154) {
          return _encryptData.apply(this, arguments);
        }

        return encryptData;
      }()
    }]);

    return SubtleCrypto;
  }();

  var SocketCrypto =
  /*#__PURE__*/
  function () {
    function SocketCrypto(client, id) {
      _classCallCheck(this, SocketCrypto);

      this.client = client;
      this.id = id;
      this.subtle = new SubtleCrypto(this);
      this.keyStorage = new KeyStorage(this);
      this.certStorage = new CertificateStorage(this);
    }

    _createClass(SocketCrypto, [{
      key: "getRandomValues",
      value: function getRandomValues(array) {
        return getEngine().crypto.getRandomValues(array);
      }
    }, {
      key: "login",
      value: function () {
        var _login2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee110() {
          var action;
          return regeneratorRuntime.wrap(function _callee110$(_context110) {
            while (1) {
              switch (_context110.prev = _context110.next) {
                case 0:
                  action = new LoginActionProto();
                  action.providerID = this.id;
                  return _context110.abrupt("return", this.client.send(action));

                case 3:
                case "end":
                  return _context110.stop();
              }
            }
          }, _callee110, this);
        }));

        function login() {
          return _login2.apply(this, arguments);
        }

        return login;
      }()
    }, {
      key: "logout",
      value: function () {
        var _logout = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee111() {
          var action;
          return regeneratorRuntime.wrap(function _callee111$(_context111) {
            while (1) {
              switch (_context111.prev = _context111.next) {
                case 0:
                  action = new LogoutActionProto();
                  action.providerID = this.id;
                  return _context111.abrupt("return", this.client.send(action));

                case 3:
                case "end":
                  return _context111.stop();
              }
            }
          }, _callee111, this);
        }));

        function logout() {
          return _logout.apply(this, arguments);
        }

        return logout;
      }()
    }, {
      key: "reset",
      value: function () {
        var _reset = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee112() {
          var action;
          return regeneratorRuntime.wrap(function _callee112$(_context112) {
            while (1) {
              switch (_context112.prev = _context112.next) {
                case 0:
                  action = new ResetActionProto();
                  action.providerID = this.id;
                  return _context112.abrupt("return", this.client.send(action));

                case 3:
                case "end":
                  return _context112.stop();
              }
            }
          }, _callee112, this);
        }));

        function reset() {
          return _reset.apply(this, arguments);
        }

        return reset;
      }()
    }, {
      key: "isLoggedIn",
      value: function () {
        var _isLoggedIn2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee113() {
          var action, res;
          return regeneratorRuntime.wrap(function _callee113$(_context113) {
            while (1) {
              switch (_context113.prev = _context113.next) {
                case 0:
                  action = new IsLoggedInActionProto();
                  action.providerID = this.id;
                  _context113.next = 4;
                  return this.client.send(action);

                case 4:
                  res = _context113.sent;
                  return _context113.abrupt("return", !!new Uint8Array(res)[0]);

                case 6:
                case "end":
                  return _context113.stop();
              }
            }
          }, _callee113, this);
        }));

        function isLoggedIn() {
          return _isLoggedIn2.apply(this, arguments);
        }

        return isLoggedIn;
      }()
    }]);

    return SocketCrypto;
  }();

  var SocketProvider =
  /*#__PURE__*/
  function (_EventEmitter4) {
    _inherits(SocketProvider, _EventEmitter4);

    function SocketProvider(options) {
      var _this25;

      _classCallCheck(this, SocketProvider);

      _this25 = _possibleConstructorReturn(this, _getPrototypeOf(SocketProvider).call(this));
      _this25.client = new Client(options.storage);
      _this25.cardReader = new CardReader(_this25.client);
      return _this25;
    }

    _createClass(SocketProvider, [{
      key: "connect",
      value: function connect(address, options) {
        var _this26 = this;

        console.log("SocketProvider:connect");
        this.removeAllListeners();
        this.client.connect(address, options).on("error", function (e) {
          _this26.emit("error", e.error);
        }).on("event", function (proto) {
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee114() {
            var tokenProto, authProto;
            return regeneratorRuntime.wrap(function _callee114$(_context114) {
              while (1) {
                switch (_context114.prev = _context114.next) {
                  case 0:
                    _context114.t0 = proto.action;
                    _context114.next = _context114.t0 === ProviderTokenEventProto.ACTION ? 3 : _context114.t0 === ProviderAuthorizedEventProto.ACTION ? 11 : 19;
                    break;

                  case 3:
                    _context114.t1 = ProviderTokenEventProto;
                    _context114.next = 6;
                    return proto.exportProto();

                  case 6:
                    _context114.t2 = _context114.sent;
                    _context114.next = 9;
                    return _context114.t1.importProto.call(_context114.t1, _context114.t2);

                  case 9:
                    tokenProto = _context114.sent;

                    _this26.emit("token", tokenProto);

                  case 11:
                    _context114.t3 = ProviderAuthorizedEventProto;
                    _context114.next = 14;
                    return proto.exportProto();

                  case 14:
                    _context114.t4 = _context114.sent;
                    _context114.next = 17;
                    return _context114.t3.importProto.call(_context114.t3, _context114.t4);

                  case 17:
                    authProto = _context114.sent;

                    _this26.emit("auth", authProto);

                  case 19:
                  case "end":
                    return _context114.stop();
                }
              }
            }, _callee114);
          }))();
        }).on("listening", function (e) {
          _this26.emit("listening", address);
        }).on("close", function (e) {
          _this26.emit("close", e.remoteAddress);
        });
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        this.client.close();
      }
    }, {
      key: "on",
      value: function on(event, listener) {
        console.log("SocketProvider:on", event);
        return _get(_getPrototypeOf(SocketProvider.prototype), "on", this).call(this, event, listener);
      }
    }, {
      key: "once",
      value: function once(event, listener) {
        return _get(_getPrototypeOf(SocketProvider.prototype), "once", this).call(this, event, listener);
      }
    }, {
      key: "info",
      value: function () {
        var _info = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee115() {
          var proto, result, infoProto;
          return regeneratorRuntime.wrap(function _callee115$(_context115) {
            while (1) {
              switch (_context115.prev = _context115.next) {
                case 0:
                  proto = new ProviderInfoActionProto();
                  _context115.next = 3;
                  return this.client.send(proto);

                case 3:
                  result = _context115.sent;
                  _context115.next = 6;
                  return ProviderInfoProto.importProto(result);

                case 6:
                  infoProto = _context115.sent;
                  return _context115.abrupt("return", infoProto);

                case 8:
                case "end":
                  return _context115.stop();
              }
            }
          }, _callee115, this);
        }));

        function info() {
          return _info.apply(this, arguments);
        }

        return info;
      }()
    }, {
      key: "challenge",
      value: function () {
        var _challenge4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee116() {
          return regeneratorRuntime.wrap(function _callee116$(_context116) {
            while (1) {
              switch (_context116.prev = _context116.next) {
                case 0:
                  return _context116.abrupt("return", this.client.challenge());

                case 1:
                case "end":
                  return _context116.stop();
              }
            }
          }, _callee116, this);
        }));

        function challenge() {
          return _challenge4.apply(this, arguments);
        }

        return challenge;
      }()
    }, {
      key: "isLoggedIn",
      value: function () {
        var _isLoggedIn3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee117() {
          return regeneratorRuntime.wrap(function _callee117$(_context117) {
            while (1) {
              switch (_context117.prev = _context117.next) {
                case 0:
                  return _context117.abrupt("return", this.client.isLoggedIn());

                case 1:
                case "end":
                  return _context117.stop();
              }
            }
          }, _callee117, this);
        }));

        function isLoggedIn() {
          return _isLoggedIn3.apply(this, arguments);
        }

        return isLoggedIn;
      }()
    }, {
      key: "login",
      value: function () {
        var _login3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee118() {
          return regeneratorRuntime.wrap(function _callee118$(_context118) {
            while (1) {
              switch (_context118.prev = _context118.next) {
                case 0:
                  return _context118.abrupt("return", this.client.login());

                case 1:
                case "end":
                  return _context118.stop();
              }
            }
          }, _callee118, this);
        }));

        function login() {
          return _login3.apply(this, arguments);
        }

        return login;
      }()
    }, {
      key: "getCrypto",
      value: function () {
        var _getCrypto = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee119(cryptoID) {
          var actionProto;
          return regeneratorRuntime.wrap(function _callee119$(_context119) {
            while (1) {
              switch (_context119.prev = _context119.next) {
                case 0:
                  actionProto = new ProviderGetCryptoActionProto();
                  actionProto.cryptoID = cryptoID;
                  _context119.next = 4;
                  return this.client.send(actionProto);

                case 4:
                  return _context119.abrupt("return", new SocketCrypto(this.client, cryptoID));

                case 5:
                case "end":
                  return _context119.stop();
              }
            }
          }, _callee119, this);
        }));

        function getCrypto(_x155) {
          return _getCrypto.apply(this, arguments);
        }

        return getCrypto;
      }()
    }, {
      key: "state",
      get: function get() {
        return this.client.state;
      }
    }]);

    return SocketProvider;
  }(EventEmitter);

  var RatchetStorage = function RatchetStorage() {
    _classCallCheck(this, RatchetStorage);
  };

  var instanceOfAny = function instanceOfAny(object, constructors) {
    return constructors.some(function (c) {
      return object instanceof c;
    });
  };

  var idbProxyableTypes;
  var cursorAdvanceMethods; // This is a function to prevent it throwing up in node environments.

  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
  } // This is a function to prevent it throwing up in node environments.


  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
  }

  var cursorRequestMap = new WeakMap();
  var transactionDoneMap = new WeakMap();
  var transactionStoreNamesMap = new WeakMap();
  var transformCache = new WeakMap();
  var reverseTransformCache = new WeakMap();

  function promisifyRequest(request) {
    var promise = new Promise(function (resolve, reject) {
      var unlisten = function unlisten() {
        request.removeEventListener('success', success);
        request.removeEventListener('error', error);
      };

      var success = function success() {
        resolve(wrap(request.result));
        unlisten();
      };

      var error = function error() {
        reject(request.error);
        unlisten();
      };

      request.addEventListener('success', success);
      request.addEventListener('error', error);
    });
    promise.then(function (value) {
      // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
      // (see wrapFunction).
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      } // Catching to avoid "Uncaught Promise exceptions"

    }).catch(function () {}); // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.

    reverseTransformCache.set(promise, request);
    return promise;
  }

  function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx)) return;
    var done = new Promise(function (resolve, reject) {
      var unlisten = function unlisten() {
        tx.removeEventListener('complete', complete);
        tx.removeEventListener('error', error);
        tx.removeEventListener('abort', error);
      };

      var complete = function complete() {
        resolve();
        unlisten();
      };

      var error = function error() {
        reject(tx.error);
        unlisten();
      };

      tx.addEventListener('complete', complete);
      tx.addEventListener('error', error);
      tx.addEventListener('abort', error);
    }); // Cache it for later retrieval.

    transactionDoneMap.set(tx, done);
  }

  var idbProxyTraps = {
    get: function get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        // Special handling for transaction.done.
        if (prop === 'done') return transactionDoneMap.get(target); // Polyfill for objectStoreNames because of Edge.

        if (prop === 'objectStoreNames') {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        } // Make tx.store return the only store in the transaction, or undefined if there are many.


        if (prop === 'store') {
          return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      } // Else transform whatever we get back.


      return wrap(target[prop]);
    },
    has: function has(target, prop) {
      if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
        return true;
      }

      return prop in target;
    }
  };

  function addTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }

  function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
      return function (storeNames) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key6 = 1; _key6 < _len4; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        var tx = func.call.apply(func, [unwrap(this), storeNames].concat(args));
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    } // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.


    if (getCursorAdvanceMethods().includes(func)) {
      return function () {
        for (var _len5 = arguments.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
          args[_key7] = arguments[_key7];
        }

        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }

    return function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key8 = 0; _key8 < _len6; _key8++) {
        args[_key8] = arguments[_key8];
      }

      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      return wrap(func.apply(unwrap(this), args));
    };
  }

  function transformCachableValue(value) {
    if (typeof value === 'function') return wrapFunction(value); // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).

    if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps); // Return the same value back if we're not going to transform it.

    return value;
  }

  function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest) return promisifyRequest(value); // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.

    if (transformCache.has(value)) return transformCache.get(value);
    var newValue = transformCachableValue(value); // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.

    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }

    return newValue;
  }

  var unwrap = function unwrap(value) {
    return reverseTransformCache.get(value);
  };
  /**
   * Open a database.
   *
   * @param name Name of the database.
   * @param version Schema version.
   * @param callbacks Additional callbacks.
   */


  function openDB(name, version) {
    var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        blocked = _ref6.blocked,
        upgrade = _ref6.upgrade,
        blocking = _ref6.blocking;

    var request = indexedDB.open(name, version);
    var openPromise = wrap(request);

    if (upgrade) {
      request.addEventListener('upgradeneeded', function (event) {
        upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
      });
    }

    if (blocked) request.addEventListener('blocked', function () {
      return blocked();
    });

    if (blocking) {
      openPromise.then(function (db) {
        return db.addEventListener('versionchange', blocking);
      }).catch(function () {});
    }

    return openPromise;
  }

  var readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
  var writeMethods = ['put', 'add', 'delete', 'clear'];
  var cachedMethods = new Map();

  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
      return;
    }

    if (cachedMethods.get(prop)) return cachedMethods.get(prop);
    var targetFuncName = prop.replace(/FromIndex$/, '');
    var useIndex = prop !== targetFuncName;
    var isWrite = writeMethods.includes(targetFuncName);

    if ( // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
      return;
    }

    var method =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee120(storeName) {
        var _target;

        var tx,
            target,
            _len7,
            args,
            _key9,
            returnVal,
            _args120 = arguments;

        return regeneratorRuntime.wrap(function _callee120$(_context120) {
          while (1) {
            switch (_context120.prev = _context120.next) {
              case 0:
                // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
                tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
                target = tx.store;

                for (_len7 = _args120.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key9 = 1; _key9 < _len7; _key9++) {
                  args[_key9 - 1] = _args120[_key9];
                }

                if (useIndex) target = target.index(args.shift());
                returnVal = (_target = target)[targetFuncName].apply(_target, args);

                if (!isWrite) {
                  _context120.next = 8;
                  break;
                }

                _context120.next = 8;
                return tx.done;

              case 8:
                return _context120.abrupt("return", returnVal);

              case 9:
              case "end":
                return _context120.stop();
            }
          }
        }, _callee120, this);
      }));

      return function method(_x156) {
        return _ref7.apply(this, arguments);
      };
    }();

    cachedMethods.set(prop, method);
    return method;
  }

  addTraps(function (oldTraps) {
    return {
      get: function get(target, prop, receiver) {
        return getMethod(target, prop) || oldTraps.get(target, prop, receiver);
      },
      has: function has(target, prop) {
        return !!getMethod(target, prop) || oldTraps.has(target, prop);
      }
    };
  });

  function isFirefox() {
    return /firefox/i.test(self.navigator.userAgent);
  }

  function isEdge() {
    return /edge\/([\d\.]+)/i.test(self.navigator.userAgent);
  }

  var ECDH = {
    name: "ECDH",
    namedCurve: "P-256"
  };
  var ECDSA = {
    name: "ECDSA",
    namedCurve: "P-256"
  };
  var AES_CBC = {
    name: "AES-CBC",
    iv: new ArrayBuffer(16)
  };

  function createEcPublicKey(_x157) {
    return _createEcPublicKey.apply(this, arguments);
  }

  function _createEcPublicKey() {
    _createEcPublicKey = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee139(publicKey) {
      var algName, jwk, x, y, xy, key, serialized, id;
      return regeneratorRuntime.wrap(function _callee139$(_context139) {
        while (1) {
          switch (_context139.prev = _context139.next) {
            case 0:
              algName = publicKey.algorithm.name.toUpperCase();

              if (algName === "ECDH" || algName === "ECDSA") {
                _context139.next = 3;
                break;
              }

              throw new Error("Error: Unsupported asymmetric key algorithm.");

            case 3:
              if (!(publicKey.type !== "public")) {
                _context139.next = 5;
                break;
              }

              throw new Error("Error: Expected key type to be public but it was not.");

            case 5:
              _context139.next = 7;
              return getEngine().crypto.subtle.exportKey("jwk", publicKey);

            case 7:
              jwk = _context139.sent;

              if (jwk.x && jwk.y) {
                _context139.next = 10;
                break;
              }

              throw new Error("Wrong JWK data for EC public key. Parameters x and y are required.");

            case 10:
              x = Convert.FromBase64Url(jwk.x);
              y = Convert.FromBase64Url(jwk.y);
              xy = Convert.ToBinary(x) + Convert.ToBinary(y);
              key = publicKey;
              serialized = Convert.FromBinary(xy);
              _context139.t0 = Convert;
              _context139.next = 18;
              return getEngine().crypto.subtle.digest("SHA-256", serialized);

            case 18:
              _context139.t1 = _context139.sent;
              id = _context139.t0.ToHex.call(_context139.t0, _context139.t1);
              return _context139.abrupt("return", {
                id: id,
                key: key,
                serialized: serialized
              });

            case 21:
            case "end":
              return _context139.stop();
          }
        }
      }, _callee139);
    }));
    return _createEcPublicKey.apply(this, arguments);
  }

  function updateEcPublicKey(_x158, _x159) {
    return _updateEcPublicKey.apply(this, arguments);
  }

  function _updateEcPublicKey() {
    _updateEcPublicKey = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee140(ecPublicKey, publicKey) {
      var data;
      return regeneratorRuntime.wrap(function _callee140$(_context140) {
        while (1) {
          switch (_context140.prev = _context140.next) {
            case 0:
              _context140.next = 2;
              return createEcPublicKey(publicKey);

            case 2:
              data = _context140.sent;
              ecPublicKey.id = data.id;
              ecPublicKey.key = data.key;
              ecPublicKey.serialized = data.serialized;

            case 6:
            case "end":
              return _context140.stop();
          }
        }
      }, _callee140);
    }));
    return _updateEcPublicKey.apply(this, arguments);
  }

  var BrowserStorage =
  /*#__PURE__*/
  function (_RatchetStorage) {
    _inherits(BrowserStorage, _RatchetStorage);

    function BrowserStorage(db) {
      var _this27;

      _classCallCheck(this, BrowserStorage);

      _this27 = _possibleConstructorReturn(this, _getPrototypeOf(BrowserStorage).call(this));
      _this27.db = db;
      return _this27;
    }

    _createClass(BrowserStorage, [{
      key: "loadWrapKey",
      value: function () {
        var _loadWrapKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee121() {
          var wKey;
          return regeneratorRuntime.wrap(function _callee121$(_context121) {
            while (1) {
              switch (_context121.prev = _context121.next) {
                case 0:
                  _context121.next = 2;
                  return this.db.transaction(BrowserStorage.IDENTITY_STORAGE).objectStore(BrowserStorage.IDENTITY_STORAGE).get("wkey");

                case 2:
                  wKey = _context121.sent;

                  if (!wKey) {
                    _context121.next = 11;
                    break;
                  }

                  if (!isEdge()) {
                    _context121.next = 10;
                    break;
                  }

                  if (wKey.key instanceof ArrayBuffer) {
                    _context121.next = 7;
                    break;
                  }

                  return _context121.abrupt("return", null);

                case 7:
                  _context121.next = 9;
                  return getEngine().crypto.subtle.importKey("raw", wKey.key, {
                    name: AES_CBC.name,
                    length: 256
                  }, false, ["encrypt", "decrypt", "wrapKey", "unwrapKey"]);

                case 9:
                  wKey.key = _context121.sent;

                case 10:
                  AES_CBC.iv = wKey.iv;

                case 11:
                  return _context121.abrupt("return", wKey || null);

                case 12:
                case "end":
                  return _context121.stop();
              }
            }
          }, _callee121, this);
        }));

        function loadWrapKey() {
          return _loadWrapKey.apply(this, arguments);
        }

        return loadWrapKey;
      }()
    }, {
      key: "saveWrapKey",
      value: function () {
        var _saveWrapKey = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee122(key) {
          return regeneratorRuntime.wrap(function _callee122$(_context122) {
            while (1) {
              switch (_context122.prev = _context122.next) {
                case 0:
                  if (!isEdge()) {
                    _context122.next = 6;
                    break;
                  }

                  _context122.next = 3;
                  return getEngine().crypto.subtle.exportKey("raw", key.key);

                case 3:
                  _context122.t0 = _context122.sent;
                  _context122.t1 = key.iv;
                  key = {
                    key: _context122.t0,
                    iv: _context122.t1
                  };

                case 6:
                  _context122.next = 8;
                  return this.db.transaction(BrowserStorage.IDENTITY_STORAGE, "readwrite").objectStore(BrowserStorage.IDENTITY_STORAGE).put(key, "wkey");

                case 8:
                case "end":
                  return _context122.stop();
              }
            }
          }, _callee122, this);
        }));

        function saveWrapKey(_x160) {
          return _saveWrapKey.apply(this, arguments);
        }

        return saveWrapKey;
      }()
    }, {
      key: "loadIdentity",
      value: function () {
        var _loadIdentity = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee123() {
          var json, res, wkey;
          return regeneratorRuntime.wrap(function _callee123$(_context123) {
            while (1) {
              switch (_context123.prev = _context123.next) {
                case 0:
                  _context123.next = 2;
                  return this.db.transaction(BrowserStorage.IDENTITY_STORAGE).objectStore(BrowserStorage.IDENTITY_STORAGE).get("identity");

                case 2:
                  json = _context123.sent;
                  res = null;

                  if (!json) {
                    _context123.next = 27;
                    break;
                  }

                  if (!(isFirefox() || isEdge())) {
                    _context123.next = 24;
                    break;
                  }

                  _context123.next = 8;
                  return this.loadWrapKey();

                case 8:
                  wkey = _context123.sent;

                  if (wkey && wkey.key.usages.some(function (usage) {
                    return usage === "encrypt";
                  }) && json.exchangeKey.privateKey instanceof ArrayBuffer) {
                    _context123.next = 11;
                    break;
                  }

                  return _context123.abrupt("return", null);

                case 11:
                  _context123.next = 13;
                  return getEngine().crypto.subtle.decrypt(AES_CBC, wkey.key, json.exchangeKey.privateKey).then(function (buf) {
                    return getEngine().crypto.subtle.importKey("jwk", JSON.parse(Convert.ToUtf8String(buf)), ECDH, false, ["deriveKey", "deriveBits"]);
                  });

                case 13:
                  json.exchangeKey.privateKey = _context123.sent;
                  _context123.next = 16;
                  return getEngine().crypto.subtle.decrypt(AES_CBC, wkey.key, json.signingKey.privateKey).then(function (buf) {
                    return getEngine().crypto.subtle.importKey("jwk", JSON.parse(Convert.ToUtf8String(buf)), ECDSA, false, ["sign"]);
                  });

                case 16:
                  json.signingKey.privateKey = _context123.sent;

                  if (!isEdge()) {
                    _context123.next = 24;
                    break;
                  }

                  _context123.next = 20;
                  return getEngine().crypto.subtle.unwrapKey("jwk", json.exchangeKey.publicKey, wkey.key, AES_CBC, ECDH, true, []);

                case 20:
                  json.exchangeKey.publicKey = _context123.sent;
                  _context123.next = 23;
                  return getEngine().crypto.subtle.unwrapKey("jwk", json.signingKey.publicKey, wkey.key, AES_CBC, ECDSA, true, ["verify"]);

                case 23:
                  json.signingKey.publicKey = _context123.sent;

                case 24:
                  _context123.next = 26;
                  return Identity.fromJSON(json);

                case 26:
                  res = _context123.sent;

                case 27:
                  return _context123.abrupt("return", res);

                case 28:
                case "end":
                  return _context123.stop();
              }
            }
          }, _callee123, this);
        }));

        function loadIdentity() {
          return _loadIdentity.apply(this, arguments);
        }

        return loadIdentity;
      }()
    }, {
      key: "saveIdentity",
      value: function () {
        var _saveIdentity = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee124(value) {
          var wkey, exchangeKeyPair, signingKeyPair, json;
          return regeneratorRuntime.wrap(function _callee124$(_context124) {
            while (1) {
              switch (_context124.prev = _context124.next) {
                case 0:
                  if (!(isFirefox() || isEdge())) {
                    _context124.next = 20;
                    break;
                  }

                  _context124.next = 3;
                  return getEngine().crypto.subtle.generateKey({
                    name: AES_CBC.name,
                    length: 256
                  }, isEdge(), ["wrapKey", "unwrapKey", "encrypt", "decrypt"]);

                case 3:
                  _context124.t0 = _context124.sent;
                  _context124.t1 = getEngine().crypto.getRandomValues(new Uint8Array(AES_CBC.iv)).buffer;
                  wkey = {
                    key: _context124.t0,
                    iv: _context124.t1
                  };
                  _context124.next = 8;
                  return this.saveWrapKey(wkey);

                case 8:
                  _context124.next = 10;
                  return getEngine().crypto.subtle.generateKey(value.exchangeKey.privateKey.algorithm, true, ["deriveKey", "deriveBits"]);

                case 10:
                  exchangeKeyPair = _context124.sent;
                  value.exchangeKey.privateKey = exchangeKeyPair.privateKey;
                  _context124.next = 14;
                  return updateEcPublicKey(value.exchangeKey.publicKey, exchangeKeyPair.publicKey);

                case 14:
                  _context124.next = 16;
                  return getEngine().crypto.subtle.generateKey(value.signingKey.privateKey.algorithm, true, ["sign", "verify"]);

                case 16:
                  signingKeyPair = _context124.sent;
                  value.signingKey.privateKey = signingKeyPair.privateKey;
                  _context124.next = 20;
                  return updateEcPublicKey(value.signingKey.publicKey, signingKeyPair.publicKey);

                case 20:
                  _context124.next = 22;
                  return value.toJSON();

                case 22:
                  json = _context124.sent;

                  if (!(isFirefox() || isEdge())) {
                    _context124.next = 39;
                    break;
                  }

                  if (wkey) {
                    _context124.next = 26;
                    break;
                  }

                  throw new Error("WrapKey is empty");

                case 26:
                  _context124.next = 28;
                  return getEngine().crypto.subtle.wrapKey("jwk", value.exchangeKey.privateKey, wkey.key, AES_CBC);

                case 28:
                  json.exchangeKey.privateKey = _context124.sent;
                  _context124.next = 31;
                  return getEngine().crypto.subtle.wrapKey("jwk", value.signingKey.privateKey, wkey.key, AES_CBC);

                case 31:
                  json.signingKey.privateKey = _context124.sent;

                  if (!isEdge()) {
                    _context124.next = 39;
                    break;
                  }

                  _context124.next = 35;
                  return getEngine().crypto.subtle.wrapKey("jwk", value.exchangeKey.publicKey.key, wkey.key, AES_CBC);

                case 35:
                  json.exchangeKey.publicKey = _context124.sent;
                  _context124.next = 38;
                  return getEngine().crypto.subtle.wrapKey("jwk", value.signingKey.publicKey.key, wkey.key, AES_CBC);

                case 38:
                  json.signingKey.publicKey = _context124.sent;

                case 39:
                  _context124.next = 41;
                  return this.db.transaction(BrowserStorage.IDENTITY_STORAGE, "readwrite").objectStore(BrowserStorage.IDENTITY_STORAGE).put(json, "identity");

                case 41:
                case "end":
                  return _context124.stop();
              }
            }
          }, _callee124, this);
        }));

        function saveIdentity(_x161) {
          return _saveIdentity.apply(this, arguments);
        }

        return saveIdentity;
      }()
    }, {
      key: "loadRemoteIdentity",
      value: function () {
        var _loadRemoteIdentity = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee125(key) {
          var json, res;
          return regeneratorRuntime.wrap(function _callee125$(_context125) {
            while (1) {
              switch (_context125.prev = _context125.next) {
                case 0:
                  _context125.next = 2;
                  return this.db.transaction(BrowserStorage.REMOTE_STORAGE).objectStore(BrowserStorage.REMOTE_STORAGE).get(key);

                case 2:
                  json = _context125.sent;
                  res = null;

                  if (!json) {
                    _context125.next = 8;
                    break;
                  }

                  _context125.next = 7;
                  return RemoteIdentity.fromJSON(json);

                case 7:
                  res = _context125.sent;

                case 8:
                  return _context125.abrupt("return", res);

                case 9:
                case "end":
                  return _context125.stop();
              }
            }
          }, _callee125, this);
        }));

        function loadRemoteIdentity(_x162) {
          return _loadRemoteIdentity.apply(this, arguments);
        }

        return loadRemoteIdentity;
      }()
    }, {
      key: "saveRemoteIdentity",
      value: function () {
        var _saveRemoteIdentity = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee126(key, value) {
          var json;
          return regeneratorRuntime.wrap(function _callee126$(_context126) {
            while (1) {
              switch (_context126.prev = _context126.next) {
                case 0:
                  _context126.next = 2;
                  return value.toJSON();

                case 2:
                  json = _context126.sent;
                  _context126.next = 5;
                  return this.db.transaction(BrowserStorage.REMOTE_STORAGE, "readwrite").objectStore(BrowserStorage.REMOTE_STORAGE).put(json, key);

                case 5:
                case "end":
                  return _context126.stop();
              }
            }
          }, _callee126, this);
        }));

        function saveRemoteIdentity(_x163, _x164) {
          return _saveRemoteIdentity.apply(this, arguments);
        }

        return saveRemoteIdentity;
      }()
    }, {
      key: "loadSession",
      value: function () {
        var _loadSession = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee127(key) {
          var json, res, identity, remoteIdentity;
          return regeneratorRuntime.wrap(function _callee127$(_context127) {
            while (1) {
              switch (_context127.prev = _context127.next) {
                case 0:
                  _context127.next = 2;
                  return this.db.transaction(BrowserStorage.SESSION_STORAGE).objectStore(BrowserStorage.SESSION_STORAGE).get(key);

                case 2:
                  json = _context127.sent;
                  res = null;

                  if (!json) {
                    _context127.next = 18;
                    break;
                  }

                  _context127.next = 7;
                  return this.loadIdentity();

                case 7:
                  identity = _context127.sent;

                  if (identity) {
                    _context127.next = 10;
                    break;
                  }

                  throw new Error("Identity is empty");

                case 10:
                  _context127.next = 12;
                  return this.loadRemoteIdentity(key);

                case 12:
                  remoteIdentity = _context127.sent;

                  if (remoteIdentity) {
                    _context127.next = 15;
                    break;
                  }

                  throw new Error("Remote identity is not found");

                case 15:
                  _context127.next = 17;
                  return AsymmetricRatchet.fromJSON(identity, remoteIdentity, json);

                case 17:
                  res = _context127.sent;

                case 18:
                  return _context127.abrupt("return", res);

                case 19:
                case "end":
                  return _context127.stop();
              }
            }
          }, _callee127, this);
        }));

        function loadSession(_x165) {
          return _loadSession.apply(this, arguments);
        }

        return loadSession;
      }()
    }, {
      key: "saveSession",
      value: function () {
        var _saveSession = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee128(key, value) {
          var json;
          return regeneratorRuntime.wrap(function _callee128$(_context128) {
            while (1) {
              switch (_context128.prev = _context128.next) {
                case 0:
                  _context128.next = 2;
                  return value.toJSON();

                case 2:
                  json = _context128.sent;
                  _context128.next = 5;
                  return this.db.transaction(BrowserStorage.SESSION_STORAGE, "readwrite").objectStore(BrowserStorage.SESSION_STORAGE).put(json, key);

                case 5:
                case "end":
                  return _context128.stop();
              }
            }
          }, _callee128, this);
        }));

        function saveSession(_x166, _x167) {
          return _saveSession.apply(this, arguments);
        }

        return saveSession;
      }()
    }], [{
      key: "create",
      value: function () {
        var _create4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee129() {
          var _this28 = this;

          var db;
          return regeneratorRuntime.wrap(function _callee129$(_context129) {
            while (1) {
              switch (_context129.prev = _context129.next) {
                case 0:
                  _context129.next = 2;
                  return openDB(this.STORAGE_NAME, 1, {
                    upgrade: function upgrade(updater) {
                      updater.createObjectStore(_this28.SESSION_STORAGE);
                      updater.createObjectStore(_this28.IDENTITY_STORAGE);
                      updater.createObjectStore(_this28.REMOTE_STORAGE);
                    }
                  });

                case 2:
                  db = _context129.sent;
                  return _context129.abrupt("return", new BrowserStorage(db));

                case 4:
                case "end":
                  return _context129.stop();
              }
            }
          }, _callee129, this);
        }));

        function create() {
          return _create4.apply(this, arguments);
        }

        return create;
      }()
    }]);

    return BrowserStorage;
  }(RatchetStorage);

  BrowserStorage.STORAGE_NAME = "webcrypto-remote";
  BrowserStorage.IDENTITY_STORAGE = "identity";
  BrowserStorage.SESSION_STORAGE = "sessions";
  BrowserStorage.REMOTE_STORAGE = "remoteIdentity";

  var MemoryStorage =
  /*#__PURE__*/
  function (_RatchetStorage2) {
    _inherits(MemoryStorage, _RatchetStorage2);

    function MemoryStorage() {
      var _this29;

      _classCallCheck(this, MemoryStorage);

      _this29 = _possibleConstructorReturn(this, _getPrototypeOf(MemoryStorage).apply(this, arguments));
      _this29.remoteIdentities = {};
      _this29.sessions = {};
      return _this29;
    }

    _createClass(MemoryStorage, [{
      key: "loadIdentity",
      value: function () {
        var _loadIdentity2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee130() {
          return regeneratorRuntime.wrap(function _callee130$(_context130) {
            while (1) {
              switch (_context130.prev = _context130.next) {
                case 0:
                  return _context130.abrupt("return", this.identity || null);

                case 1:
                case "end":
                  return _context130.stop();
              }
            }
          }, _callee130, this);
        }));

        function loadIdentity() {
          return _loadIdentity2.apply(this, arguments);
        }

        return loadIdentity;
      }()
    }, {
      key: "saveIdentity",
      value: function () {
        var _saveIdentity2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee131(value) {
          return regeneratorRuntime.wrap(function _callee131$(_context131) {
            while (1) {
              switch (_context131.prev = _context131.next) {
                case 0:
                  this.identity = value;

                case 1:
                case "end":
                  return _context131.stop();
              }
            }
          }, _callee131, this);
        }));

        function saveIdentity(_x168) {
          return _saveIdentity2.apply(this, arguments);
        }

        return saveIdentity;
      }()
    }, {
      key: "loadRemoteIdentity",
      value: function () {
        var _loadRemoteIdentity2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee132(key) {
          return regeneratorRuntime.wrap(function _callee132$(_context132) {
            while (1) {
              switch (_context132.prev = _context132.next) {
                case 0:
                  return _context132.abrupt("return", this.remoteIdentities[key] || null);

                case 1:
                case "end":
                  return _context132.stop();
              }
            }
          }, _callee132, this);
        }));

        function loadRemoteIdentity(_x169) {
          return _loadRemoteIdentity2.apply(this, arguments);
        }

        return loadRemoteIdentity;
      }()
    }, {
      key: "saveRemoteIdentity",
      value: function () {
        var _saveRemoteIdentity2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee133(key, value) {
          return regeneratorRuntime.wrap(function _callee133$(_context133) {
            while (1) {
              switch (_context133.prev = _context133.next) {
                case 0:
                  this.remoteIdentities[key] = value;

                case 1:
                case "end":
                  return _context133.stop();
              }
            }
          }, _callee133, this);
        }));

        function saveRemoteIdentity(_x170, _x171) {
          return _saveRemoteIdentity2.apply(this, arguments);
        }

        return saveRemoteIdentity;
      }()
    }, {
      key: "loadSession",
      value: function () {
        var _loadSession2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee134(key) {
          return regeneratorRuntime.wrap(function _callee134$(_context134) {
            while (1) {
              switch (_context134.prev = _context134.next) {
                case 0:
                  return _context134.abrupt("return", this.sessions[key] || null);

                case 1:
                case "end":
                  return _context134.stop();
              }
            }
          }, _callee134, this);
        }));

        function loadSession(_x172) {
          return _loadSession2.apply(this, arguments);
        }

        return loadSession;
      }()
    }, {
      key: "saveSession",
      value: function () {
        var _saveSession2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee135(key, value) {
          return regeneratorRuntime.wrap(function _callee135$(_context135) {
            while (1) {
              switch (_context135.prev = _context135.next) {
                case 0:
                  this.sessions[key] = value;

                case 1:
                case "end":
                  return _context135.stop();
              }
            }
          }, _callee135, this);
        }));

        function saveSession(_x173, _x174) {
          return _saveSession2.apply(this, arguments);
        }

        return saveSession;
      }()
    }]);

    return MemoryStorage;
  }(RatchetStorage);

  exports.BrowserStorage = BrowserStorage;
  exports.CryptoServerError = CryptoServerError;
  exports.MemoryStorage = MemoryStorage;
  exports.RatchetStorage = RatchetStorage;
  exports.SocketCrypto = SocketCrypto;
  exports.SocketProvider = SocketProvider;
  exports.getEngine = getEngine;
  exports.setEngine = setEngine;

  return exports;

}({}, protobuf, fetch, WebSocket));