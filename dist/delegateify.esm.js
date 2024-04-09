/*!
 * delegateify v0.0.1 (https://github.com/ajiho/delegateify)
 * Copyright 2023-2024 ajiho
 * license MIT(https://github.com/ajiho/delegateify/blob/master/LICENSE)
 */

var id = 0;
function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}
function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}

var utils = {
  throw_Error(msg) {
    throw new Error(`Delegateify: ${msg}`);
  },
  contains(set, subSet) {
    for (let i = 0; i < subSet.length; i++) {
      if (set.indexOf(subSet[i]) === -1) {
        return false;
      }
    }
    return true;
  },
  contains2(set, subSet) {
    return subSet.every(item => set.includes(item));
  }
};

let i = 0;
var _namespace = /*#__PURE__*/_classPrivateFieldLooseKey("namespace");
var _id = /*#__PURE__*/_classPrivateFieldLooseKey("id");
var _scopedSelectorRegex = /*#__PURE__*/_classPrivateFieldLooseKey("scopedSelectorRegex");
var _listenersByType = /*#__PURE__*/_classPrivateFieldLooseKey("listenersByType");
var _allListeners = /*#__PURE__*/_classPrivateFieldLooseKey("allListeners");
var _idKey = /*#__PURE__*/_classPrivateFieldLooseKey("idKey");
var _pathKey = /*#__PURE__*/_classPrivateFieldLooseKey("pathKey");
var _stopPropagationKey = /*#__PURE__*/_classPrivateFieldLooseKey("stopPropagationKey");
var _stopImmediatePropagationKey = /*#__PURE__*/_classPrivateFieldLooseKey("stopImmediatePropagationKey");
var _captureListener = /*#__PURE__*/_classPrivateFieldLooseKey("captureListener");
var _bubbleListener = /*#__PURE__*/_classPrivateFieldLooseKey("bubbleListener");
var _listenerMatchesRootTarget = /*#__PURE__*/_classPrivateFieldLooseKey("listenerMatchesRootTarget");
var _listenerMatchesDelegateTarget = /*#__PURE__*/_classPrivateFieldLooseKey("listenerMatchesDelegateTarget");
var _listenerMatchesEventPhase = /*#__PURE__*/_classPrivateFieldLooseKey("listenerMatchesEventPhase");
var _executeListenersAtElement = /*#__PURE__*/_classPrivateFieldLooseKey("executeListenersAtElement");
var _executeBubbleListener = /*#__PURE__*/_classPrivateFieldLooseKey("executeBubbleListener");
var _executeCaptureListener = /*#__PURE__*/_classPrivateFieldLooseKey("executeCaptureListener");
var _decorateEvent = /*#__PURE__*/_classPrivateFieldLooseKey("decorateEvent");
var _undecorateEvent = /*#__PURE__*/_classPrivateFieldLooseKey("undecorateEvent");
var _getPath = /*#__PURE__*/_classPrivateFieldLooseKey("getPath");
var _isScoped = /*#__PURE__*/_classPrivateFieldLooseKey("isScoped");
class Delegateify {
  constructor(_selector) {
    Object.defineProperty(this, _isScoped, {
      value: _isScoped2
    });
    Object.defineProperty(this, _getPath, {
      value: _getPath2
    });
    Object.defineProperty(this, _undecorateEvent, {
      value: _undecorateEvent2
    });
    Object.defineProperty(this, _decorateEvent, {
      value: _decorateEvent2
    });
    Object.defineProperty(this, _executeCaptureListener, {
      value: _executeCaptureListener2
    });
    Object.defineProperty(this, _executeBubbleListener, {
      value: _executeBubbleListener2
    });
    Object.defineProperty(this, _executeListenersAtElement, {
      value: _executeListenersAtElement2
    });
    Object.defineProperty(this, _listenerMatchesEventPhase, {
      value: _listenerMatchesEventPhase2
    });
    Object.defineProperty(this, _listenerMatchesDelegateTarget, {
      value: _listenerMatchesDelegateTarget2
    });
    Object.defineProperty(this, _listenerMatchesRootTarget, {
      value: _listenerMatchesRootTarget2
    });
    this.element = void 0;
    Object.defineProperty(this, _namespace, {
      writable: true,
      value: 'delegateify'
    });
    Object.defineProperty(this, _id, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _scopedSelectorRegex, {
      writable: true,
      value: /^\s*(>|:scope\s*>)/
    });
    Object.defineProperty(this, _listenersByType, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _allListeners, {
      writable: true,
      value: []
    });
    //存储id的key
    Object.defineProperty(this, _idKey, {
      writable: true,
      value: `__${_classPrivateFieldLooseBase(this, _namespace)[_namespace]}Id__`
    });
    //路径的key
    Object.defineProperty(this, _pathKey, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _stopPropagationKey, {
      writable: true,
      value: `_${_classPrivateFieldLooseBase(this, _namespace)[_namespace]}PropagationStopped`
    });
    Object.defineProperty(this, _stopImmediatePropagationKey, {
      writable: true,
      value: `_${_classPrivateFieldLooseBase(this, _namespace)[_namespace]}ImmediatePropagationStopped`
    });
    Object.defineProperty(this, _captureListener, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _bubbleListener, {
      writable: true,
      value: void 0
    });
    this.element = typeof _selector === 'string' ? document.querySelector(_selector) : _selector;

    // 事件名称到事件数组的映射
    // 不要从 Object 继承，这样我们就不会与其原型上的属性发生冲突
    _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType] = Object.create(null);

    /*
    该实例跟踪的所有侦听器对象的列表
       每个项目采用以下形式：
      {
        eventName: String,
        handler: Function,
        namespaces: Array<string>,
        selector: String | null,
        useCapture: Boolean,
        isScoped: Boolean
      }
    */

    // 确保this的值
    _classPrivateFieldLooseBase(this, _captureListener)[_captureListener] = _classPrivateFieldLooseBase(this, _executeCaptureListener)[_executeCaptureListener].bind(this);
    _classPrivateFieldLooseBase(this, _bubbleListener)[_bubbleListener] = _classPrivateFieldLooseBase(this, _executeBubbleListener)[_executeBubbleListener].bind(this);

    // 所有实例都会获得一个ID
    _classPrivateFieldLooseBase(this, _id)[_id] = i++;
    _classPrivateFieldLooseBase(this, _pathKey)[_pathKey] = `_${_classPrivateFieldLooseBase(this, _namespace)[_namespace]}Path${_classPrivateFieldLooseBase(this, _id)[_id]}`;
  }
  on(eventName, selector, handler, useCapture) {
    if (typeof selector === 'function') {
      useCapture = handler;
      handler = selector;
      selector = null;
    }
    if (typeof handler !== 'function') {
      utils.throw_Error('无法使用非函数处理程序添加侦听器');
    }

    // 如果每个假值（未定义或传递空字符串）则为空
    if (!selector) {
      selector = null;
    }
    if (typeof useCapture === 'undefined') {
      // 强制使用Capture进行焦点和模糊事件
      if (eventName === 'focus' || eventName === 'blur') {
        // 默认情况下 true 仅适用于焦点和模糊事件
        useCapture = true;
      } else {
        // 默认为 false
        // 这与 HTML API 匹配
        useCapture = false;
      }
    }

    // 提取命名空间
    let namespaces = null;
    let dotIndex = eventName.indexOf('.');
    if (dotIndex !== -1) {
      namespaces = eventName.slice(dotIndex + 1).split('.');
      eventName = eventName.slice(0, dotIndex);
    }

    // 获取/创建事件类型的列表
    let listenerList = _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][eventName];
    if (!listenerList) {
      listenerList = _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][eventName] = [];

      // 添加实际的监听器
      this.element.addEventListener(eventName, _classPrivateFieldLooseBase(this, _captureListener)[_captureListener], true);
      this.element.addEventListener(eventName, _classPrivateFieldLooseBase(this, _bubbleListener)[_bubbleListener], false);
    }

    // 如果选择器有作用域，则设置特殊 ID 属性
    let listenerIsScoped = _classPrivateFieldLooseBase(this, _isScoped)[_isScoped](selector);
    if (listenerIsScoped) {
      // 规范化选择器，使其不使用 :scope
      selector = selector.replace(scopedSelectorRegex, '>');

      // 存储唯一 ID 并设置我们将用于范围的特殊属性
      this.element.setAttribute(_classPrivateFieldLooseBase(this, _idKey)[_idKey], _classPrivateFieldLooseBase(this, _id)[_id]);
    }

    // 使用事件信息创建一个对象
    const eventObject = {
      eventName: eventName,
      handler: handler,
      namespaces: namespaces,
      selector: selector,
      useCapture: useCapture,
      isScoped: listenerIsScoped
    };

    // 相对于当前类型并与其他类型一起存储
    listenerList.push(eventObject);
    _classPrivateFieldLooseBase(this, _allListeners)[_allListeners].push(eventObject);
  }
  off(eventName, selector, handler, useCapture) {
    if (typeof selector === 'function') {
      useCapture = handler;
      handler = selector;
      selector = null;
    }

    // 如果没有提供则为空
    if (typeof eventName === 'undefined') {
      eventName = null;
    }
    if (typeof selector === 'undefined') {
      selector = null;
    }
    if (typeof handler === 'undefined') {
      handler = null;
    }
    if (typeof useCapture === 'undefined') {
      useCapture = null;
    }

    // 提取命名空间
    let namespaces = null;
    if (eventName) {
      let dotIndex = eventName.indexOf('.');
      if (dotIndex !== -1) {
        namespaces = eventName.slice(dotIndex + 1).split('.');
        eventName = eventName.slice(0, dotIndex);
      }
    }

    // 为空
    if (eventName === '') {
      eventName = null;
    }
    let listener;
    let index;
    let listeners = _classPrivateFieldLooseBase(this, _allListeners)[_allListeners];
    for (var i = 0; i < listeners.length; i++) {
      listener = listeners[i];
      if ((eventName === null || listener.eventName === eventName) && (selector === null || listener.selector === selector) && (handler === null || listener.handler === handler) && (useCapture === null || listener.useCapture === useCapture) && (
      // 删除匹配的侦听器，无论命名空间如何
      namespaces === null ||
      // 监听器匹配所有指定的命名空间
      listener.namespaces && utils.contains(listener.namespaces, namespaces))) {
        // 删除监听信息
        _classPrivateFieldLooseBase(this, _allListeners)[_allListeners].splice(i, 1);

        // 数组长度已更改，因此在下一次迭代时检查相同的索引
        i--;

        // 获取listenersByType映射中的索引
        if (!_classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][listener.eventName]) {
          utils.throw_Error(`缺少 ListenersByType 的${listener.eventName}`);
        }

        // 在其他查找列表中查找事件信息
        index = _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][listener.eventName].indexOf(listener);
        if (index !== -1) {
          var mapList = _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][listener.eventName];

          // 从地图上删除
          mapList.splice(index, 1);

          // 检查我们是否已删除此事件类型的所有侦听器
          if (mapList.length === 0) {
            // 如有必要，删除实际的侦听器
            this.element.removeEventListener(listener.eventName, _classPrivateFieldLooseBase(this, _captureListener)[_captureListener], true);
            this.element.removeEventListener(listener.eventName, _classPrivateFieldLooseBase(this, _bubbleListener)[_bubbleListener], false);

            // 为了提高性能，避免使用删除运算符
            _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][listener.eventName] = null;
          }
        } else {
          utils.throw_Error('事件存在于allEvents中，但不存在于listenersByType中');
        }
        // 现在别停下来！ 我们要删除所有匹配的监听器，所以继续循环
      }
    }
    return this;
  }
  destroy() {
    if (this.destroyed) {
      // 实例已被销毁，不执行任何操作
      return;
    }

    // 移除所有的事件
    this.off();

    // 删除所有引用
    _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType] = null;
    _classPrivateFieldLooseBase(this, _allListeners)[_allListeners] = null;
    this.element = null;
    this.destroyed = true;
  }
  dispatch(eventName, options) {
    options = options || {};
    if (typeof options.bubbles === 'undefined') {
      options.bubbles = true;
    }
    if (typeof options.cancelable === 'undefined') {
      options.cancelable = true;
    }
    const event = new CustomEvent(eventName, options);
    this.element.dispatchEvent(event);
    return event;
  }
}
function _listenerMatchesRootTarget2(listener, target) {
  return (
    // 当没有提供选择器时
    listener.selector === null &&
    // 如果我们已经到达根目录则执行
    target === this.element
  );
}
function _listenerMatchesDelegateTarget2(listener, target) {
  return (
    // 文档不支持 matches()
    target !== document &&
    // 不要为根元素上的委托而烦恼
    target !== this.element &&
    // 检查事件是否被委托
    listener.selector !== null && (
    // 仅当选择器匹配时才执行

    // 检查选择器是否有上下文
    listener.isScoped ?
    // 使用根元素的 ID 运行匹配
    Element.prototype.matches.call(target, `[${_classPrivateFieldLooseBase(this, _idKey)[_idKey]}="${_classPrivateFieldLooseBase(this, _id)[_id]}"] ` + listener.selector)
    // 在没有上下文的情况下运行比赛
    : Element.prototype.matches.call(target, listener.selector))
  );
}
function _listenerMatchesEventPhase2(listener, useCapture) {
  // 检查事件是否处于正确的阶段
  return listener.useCapture === useCapture;
}
function _executeListenersAtElement2(target, listeners, event, useCapture) {
  let listener;
  let returnValue;

  // 执行每个满足条件的监听器
  executeListeners: for (let listenerIndex = 0; listenerIndex < listeners.length; listenerIndex++) {
    listener = listeners[listenerIndex];
    if (
    // 不处理禁用项目 #1 上的事件
    !(event.type === 'click' && target.disabled === true) && (
    // 检查目标元素是否与此侦听器匹配

    _classPrivateFieldLooseBase(this, _listenerMatchesRootTarget)[_listenerMatchesRootTarget](listener, target) || _classPrivateFieldLooseBase(this, _listenerMatchesDelegateTarget)[_listenerMatchesDelegateTarget](listener, target)) && _classPrivateFieldLooseBase(this, _listenerMatchesEventPhase)[_listenerMatchesEventPhase](listener, useCapture)) {
      // 存储当前与事件匹配的目标
      event.matchedTarget = target;

      // 在委托目标范围内调用处理程序，传递事件
      returnValue = listener.handler.call(target, event);

      // 如果处理程序返回 false，则阻止 default 和 stopPropagation
      if (returnValue === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (event[_classPrivateFieldLooseBase(this, _stopImmediatePropagationKey)[_stopImmediatePropagationKey]]) {
        // 不再处理任何事件处理程序并停止冒泡
        break executeListeners;
      }
    } // 结束 if
  } // 结束执行监听器
}
function _executeBubbleListener2(event) {
  let listeners = _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][event.type];
  if (!listeners) {
    utils.throw_Error(`_executeListeners 被调用以响应"${event.type}"，但我们没有监听它`);
  }
  if (listeners.length) {
    // 获取听众的副本
    // 如果没有这个，删除回调内的事件将导致错误
    listeners = listeners.slice();

    // 装饰事件对象，以便我们知道何时调用 stopPropagation
    _classPrivateFieldLooseBase(this, _decorateEvent)[_decorateEvent](event);

    /*
      弄清楚是否应该模拟气泡相
        对焦和模糊都不会起泡:
        https://developer.mozilla.org/en-US/docs/Web/Events/focus
        https://developer.mozilla.org/en-US/docs/Web/Events/blur
        然而，聚焦、聚焦、变化和其他事件却如此。
    */
    let shouldBubble = event.type !== 'focus' && event.type !== 'blur';

    // 重新使用捕获阶段计算出的事件路径
    let eventPath = _classPrivateFieldLooseBase(this, _getPath)[_getPath](event);

    // 如果侦听器仍然存在且传播未停止，则通过冒泡目标列表来模拟冒泡阶段
    bubbleUp: for (let eventPathIndex = 0; eventPathIndex < eventPath.length; eventPathIndex++) {
      if (!listeners.length) {
        // 如果没有更多侦听器要执行，请停止冒泡
        break bubbleUp;
      }
      let currentTargetElement = eventPath[eventPathIndex];
      _classPrivateFieldLooseBase(this, _executeListenersAtElement)[_executeListenersAtElement](currentTargetElement, listeners, event, false);

      // 如果处理程序告诉我们，请停止模拟气泡阶段
      if (event[_classPrivateFieldLooseBase(this, _stopImmediatePropagationKey)[_stopImmediatePropagationKey]] || event[_classPrivateFieldLooseBase(this, _stopPropagationKey)[_stopPropagationKey]]) {
        break bubbleUp;
      }

      // 如果事件不应该冒泡，则仅在目标上模拟它
      if (!shouldBubble) {
        break bubbleUp;
      }
    }
  }

  // 排气后清理
  _classPrivateFieldLooseBase(this, _undecorateEvent)[_undecorateEvent](event);

  // 清除路径
  event[_classPrivateFieldLooseBase(this, _pathKey)[_pathKey]] = null;
}
function _executeCaptureListener2(event) {
  let listeners = _classPrivateFieldLooseBase(this, _listenersByType)[_listenersByType][event.type];
  if (!listeners) {
    utils.throw_Error(`_executeListeners 被调用以响应${event.type},但我们没有监听它`);
  }
  if (listeners.length) {
    // 获取听众的副本
    // 如果没有这个，删除回调内的事件将导致错误
    listeners = listeners.slice();

    // 装饰事件对象，以便我们知道何时调用 stopPropagation
    _classPrivateFieldLooseBase(this, _decorateEvent)[_decorateEvent](event);

    // 通过 DOM 获取事件的路径
    let eventPath = _classPrivateFieldLooseBase(this, _getPath)[_getPath](event);

    // 通过向下滴入目标列表来模拟捕获阶段
    trickleDown: for (let eventPathIndex = eventPath.length - 1; eventPathIndex >= 0; eventPathIndex--) {
      if (!listeners.length) {
        // 如果没有更多的侦听器要执行，请停止滴流
        break trickleDown;
      }
      let currentTargetElement = eventPath[eventPathIndex];
      _classPrivateFieldLooseBase(this, _executeListenersAtElement)[_executeListenersAtElement](currentTargetElement, listeners, event, true);

      // console.log(this,event);

      // 如果处理程序告诉我们停止向下滴入 DOM，则停止
      if (event[_classPrivateFieldLooseBase(this, _stopImmediatePropagationKey)[_stopImmediatePropagationKey]] || event[_classPrivateFieldLooseBase(this, _stopPropagationKey)[_stopPropagationKey]]) {
        // 停止模拟滴流
        break trickleDown;
      }
    }
  }

  // 排气后清理
  // 如果事件到达那里，我们将在冒泡阶段重新装饰事件对象
  _classPrivateFieldLooseBase(this, _undecorateEvent)[_undecorateEvent](event);
}
function _decorateEvent2(event) {
  let that = this;
  event.stopPropagation = function () {
    this[_classPrivateFieldLooseBase(that, _stopPropagationKey)[_stopPropagationKey]] = true;
    Event.prototype.stopPropagation.call(this);
  };
  event.stopImmediatePropagation = function () {
    this[_classPrivateFieldLooseBase(that, _stopImmediatePropagationKey)[_stopImmediatePropagationKey]] = true;
    Event.prototype.stopImmediatePropagation.call(this);
  };
}
function _undecorateEvent2(event) {
  event.stopPropagation = Event.prototype.stopPropagation;
  event.stopImmediatePropagation = Event.prototype.stopImmediatePropagation;
}
function _getPath2(event) {
  if (event[_classPrivateFieldLooseBase(this, _pathKey)[_pathKey]]) {
    return event[_classPrivateFieldLooseBase(this, _pathKey)[_pathKey]];
  }

  // 如果事件在文本节点上触发，委托应假定目标是其父节点
  let target = event.target;
  if (target.nodeType === Node.TEXT_NODE) {
    target = target.parentNode;
  }

  // 在根和调度事件的元素之间构建 DOM 树的数组
  // HTML 规范规定，如果树在调度期间被修改，事件应该像之前一样冒泡
  // 在调度之前构建此列表允许我们模拟该行为
  let pathEl = target;
  let eventPath = [];
  while (pathEl && pathEl !== this.element) {
    eventPath.push(pathEl);
    pathEl = pathEl.parentNode;
  }
  eventPath.push(this.element);
  event[_classPrivateFieldLooseBase(this, _pathKey)[_pathKey]] = eventPath;
  return eventPath;
}
function _isScoped2(selector) {
  return selector && _classPrivateFieldLooseBase(this, _scopedSelectorRegex)[_scopedSelectorRegex].test(selector);
}

export { Delegateify as default };
//# sourceMappingURL=delegateify.esm.js.map
