import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../style/modal.css'

const modals = [];

const getCurrent = () => {
  return modals.length ? modals[modals.length - 1] : null;
};

const selectCurrent = () => {
  let selected = false;
  for (let i = modals.length - 1; i >= 0; i--) {
    if (modals[i].$blocker) {
      modals[i].$blocker.classList.toggle('current', !selected);
      modals[i].$blocker.classList.toggle('behind', selected);
      selected = true;
    }
  }
};

const Modal = ({ onClose, options, isAnchor, target }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const renderModalContent = () => {
    if (isAnchor && target.startsWith('#')) {
      return <div id={target.substring(1)}></div>;
    } else {

      return <div id="confirmation" className="modal-text">Employee Created!</div>;
    }
  };

  const modalContent = renderModalContent();

  return isModalOpen ? (
    <div className="modal">
      <div className="modal-content">
        {modalContent}
        <button className="close-modal" onClick={handleClose}>
          {options.closeText}
        </button>
      </div>
    </div>
  ) : null;
};

const $ = (selector) => document.querySelector(selector);

$.modal = function (el, options) {
  let target;
  this.$body = document.querySelector('body');
  this.options = Object.assign({}, $.modal.defaults, options);
  this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
  this.$blocker = null;
  if (this.options.closeExisting) {
    while ($.modal.isActive()) {
      $.modal.close(); // Close any open modals.
    }
  }
  modals.push(this);
  if (el.tagName === 'A') {
    target = el.getAttribute('href');
    this.anchor = el;
    ReactDOM.render(
      <Modal onClose={this.close} options={this.options} isAnchor={true} target={target} />,
      document.getElementById('modal-root')
    );
  } else {
    this.$elm = el;
    this.anchor = el;
    this.$body.appendChild(this.$elm);
    this.open();
  }
};

$.modal.prototype = {
  constructor: $.modal,

  open: function () {
    const m = this;
    this.block();
    if (this.options.doFade) {
      setTimeout(function () {
        m.show();
      }, this.options.fadeDuration * this.options.fadeDelay);
    } else {
      this.show();
    }
    document.removeEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keydown', this.handleKeyDown);
    if (this.options.clickClose) {
      this.$blocker.addEventListener('click', function (e) {
        if (e.target === this) $.modal.close();
      });
    }
  },

  close: function () {
    modals.pop();
    this.unblock();
    this.hide();
    if (!$.modal.isActive()) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  },

  block: function () {
    this.$elm.dispatchEvent(new CustomEvent($.modal.BEFORE_BLOCK, { detail: this._ctx() }));
    this.$body.style.overflow = 'hidden';
    this.$blocker = document.createElement('div');
    this.$blocker.className = `${this.options.blockerClass} blocker current`;
    this.$body.appendChild(this.$blocker);
    selectCurrent();
    if (this.options.doFade) {
      this.$blocker.style.opacity = 0;
      const fadeDuration = this.options.fadeDuration;
      setTimeout(() => {
        this.$blocker.style.transition = `opacity ${fadeDuration}ms`;
        this.$blocker.style.opacity = 1;
      }, 0);
    }
    this.$elm.dispatchEvent(new CustomEvent($.modal.BLOCK, { detail: this._ctx() }));
  },

  unblock: function (now) {
    if (!now && this.options.doFade) {
      const fadeDuration = this.options.fadeDuration;
      this.$blocker.style.transition = `opacity ${fadeDuration}ms`;
      this.$blocker.style.opacity = 0;
      setTimeout(() => {
        this.$blocker.parentNode.removeChild(this.$blocker);
        this.$blocker = null;
        selectCurrent();
        if (!$.modal.isActive()) {
          this.$body.style.overflow = '';
        }
      }, fadeDuration);
    } else {
      this.$blocker.parentNode.removeChild(this.$blocker);
      this.$blocker = null;
      selectCurrent();
      if (!$.modal.isActive()) {
        this.$body.style.overflow = '';
      }
    }
  },

  show: function () {
    this.$elm.dispatchEvent(new CustomEvent($.modal.BEFORE_OPEN, { detail: this._ctx() }));
    if (this.options.showClose) {
      this.closeButton = document.createElement('a');
      this.closeButton.href = '#close-modal';
      this.closeButton.rel = 'modal:close';
      this.closeButton.className = `close-modal ${this.options.closeClass}`;
      this.closeButton.textContent = this.options.closeText;
      this.$elm.appendChild(this.closeButton);
    }
    this.$elm.classList.add(this.options.modalClass);
    this.$blocker.appendChild(this.$elm);
    if (this.options.doFade) {
      this.$elm.style.opacity = 0;
      this.$elm.style.display = 'inline-block';
      const fadeDuration = this.options.fadeDuration;
      setTimeout(() => {
        this.$elm.style.transition = `opacity ${fadeDuration}ms`;
        this.$elm.style.opacity = 1;
      }, 0);
    } else {
      this.$elm.style.display = 'inline-block';
    }
    this.$elm.dispatchEvent(new CustomEvent($.modal.OPEN, { detail: this._ctx() }));
  },

  hide: function () {
    this.$elm.dispatchEvent(new CustomEvent($.modal.BEFORE_CLOSE, { detail: this._ctx() }));
    if (this.closeButton) {
      this.closeButton.parentNode.removeChild(this.closeButton);
    }
    const _this = this;
    if (this.options.doFade) {
      const fadeDuration = this.options.fadeDuration;
      this.$elm.style.transition = `opacity ${fadeDuration}ms`;
      this.$elm.style.opacity = 0;
      setTimeout(() => {
        _this.$elm.dispatchEvent(new CustomEvent($.modal.AFTER_CLOSE, [_this._ctx()]));
      }, fadeDuration);
    } else {
      this.$elm.style.display = 'none';
    }
  },

  handleKeyDown: function (event) {
    if (event.key === 'Escape') {
      $.modal.close();
    }
  },

  _ctx: function () {
    return {
      elm: this.$elm,
      options: this.options,
      blocker: this.$blocker,
      close: this.close,
      show: this.show,
      hide: this.hide,
    };
  },
};

$.modal.close = function () {
  if ($.modal.isActive()) {
    const m = getCurrent();
    m.close();
    return true;
  }
  return false;
};

$.modal.isActive = function () {
  return modals.length > 0;
};

$.modal.defaults = {
  closeExisting: true,
  escapeClose: true,
  clickClose: true,
  closeText: 'Close',
  modalClass: 'modal',
  blockerClass: 'jquery-modal',
  showClose: true,
  fadeDuration: null, // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1, // Number of seconds the fade transition is delayed
};

$.modal.BEFORE_BLOCK = 'modal:before-block';
$.modal.BLOCK = 'modal:block';
$.modal.BEFORE_OPEN = 'modal:before-open';
$.modal.OPEN = 'modal:open';
$.modal.BEFORE_CLOSE = 'modal:before-close';
$.modal.CLOSE = 'modal:close';
$.modal.AFTER_CLOSE = 'modal:after-close';

export default Modal;
