'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = require('mobx');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Store = (_class = function () {
  function Store() {
    _classCallCheck(this, Store);

    _initDefineProp(this, 'increments', _descriptor, this);

    _initDefineProp(this, 'decrements', _descriptor2, this);
  }

  Store.prototype.reset = function reset() {
    this.increments = 0;
    this.decrements = 0;
  };

  Store.prototype.increment = function increment(i) {
    this.increments = this.increments + i;
  };

  Store.prototype.decrement = function decrement(i) {
    this.decrements = this.decrements + i;
  };

  Store.prototype.loadSaveFile = function loadSaveFile(saveFile) {
    this.increments = saveFile.increments;
    this.decrements = saveFile.decrements;
  };

  _createClass(Store, [{
    key: 'count',
    get: function get() {
      return this.increments - this.decrements;
    }
  }, {
    key: 'saveFile',
    get: function get() {
      return {
        increments: this.increments,
        decrements: this.decrements
      };
    }
  }]);

  return Store;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'increments', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'decrements', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'count', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'count'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'saveFile', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'saveFile'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadSaveFile', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'loadSaveFile'), _class.prototype)), _class);


var _Store = new Store();
exports.default = _Store;
module.exports = exports['default'];