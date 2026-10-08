/* =========================================================
   COACH BOLBOL — UI SYSTEM
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     ELEMENT HELPER
     ======================================================= */

  function $(selector, parent = document) {

    return parent.querySelector(selector);

  }


  function $$(selector, parent = document) {

    return Array.from(
      parent.querySelectorAll(selector)
    );

  }


  /* =======================================================
     ESCAPE HTML
     ======================================================= */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =======================================================
     TOAST
     ======================================================= */

  function toast(
    message,
    type = "info",
    duration = 3000
  ) {

    if (!message) {
      return;
    }


    let container =
      $("#coach-bolbol-toast-container");


    if (!container) {

      container =
        document.createElement("div");

      container.id =
        "coach-bolbol-toast-container";

      container.className =
        "toast-container";

      document.body.appendChild(
        container
      );

    }


    const item =
      document.createElement("div");


    item.className =
      `toast toast-${type}`;


    item.innerHTML = `
      <span class="toast-message">
        ${escapeHTML(message)}
      </span>
      <button
        type="button"
        class="toast-close"
        aria-label="Close"
      >×</button>
    `;


    container.appendChild(
      item
    );


    const close =
      () => {

        item.classList.add(
          "toast-hide"
        );

        setTimeout(
          () => item.remove(),
          250
        );

      };


    $(".toast-close", item)
      ?.addEventListener(
        "click",
        close
      );


    setTimeout(
      close,
      duration
    );

  }


  /* =======================================================
     MODAL
     ======================================================= */

  function openModal(
    title,
    content,
    options = {}
  ) {

    closeModal();


    const modal =
      document.createElement("div");


    modal.className =
      "modal-overlay";


    modal.id =
      "coach-bolbol-modal";


    modal.innerHTML = `
      <div
        class="modal-card"
        role="dialog"
        aria-modal="true"
      >

        <div class="modal-header">

          <h2>
            ${escapeHTML(title)}
          </h2>

          <button
            type="button"
            class="modal-close"
            aria-label="Close"
          >
            ×
          </button>

        </div>

        <div class="modal-body">
          ${content}
        </div>

      </div>
    `;


    document.body.appendChild(
      modal
    );


    $(".modal-close", modal)
      ?.addEventListener(
        "click",
        closeModal
      );


    if (
      options.closeOnBackdrop !== false
    ) {

      modal.addEventListener(
        "click",
        event => {

          if (
            event.target === modal
          ) {

            closeModal();

          }

        }
      );

    }


    document.body.classList.add(
      "modal-open"
    );


    return modal;

  }


  function closeModal() {

    const modal =
      $("#coach-bolbol-modal");


    if (modal) {

      modal.remove();

    }


    document.body.classList.remove(
      "modal-open"
    );

  }


  /* =======================================================
     CONFIRM DIALOG
     ======================================================= */

  function confirmAction(
    message,
    onConfirm,
    options = {}
  ) {

    const title =
      options.title ||
      "Confirm action";


    const confirmText =
      options.confirmText ||
      "Confirm";


    const cancelText =
      options.cancelText ||
      "Cancel";


    const modal =
      openModal(
        title,
        `
          <div class="confirm-content">

            <p>
              ${escapeHTML(message)}
            </p>

            <div class="modal-actions">

              <button
                type="button"
                class="btn btn-secondary"
                data-confirm-cancel
              >
                ${escapeHTML(cancelText)}
              </button>

              <button
                type="button"
                class="btn btn-primary"
                data-confirm-ok
              >
                ${escapeHTML(confirmText)}
              </button>

            </div>

          </div>
        `
      );


    $(
      "[data-confirm-cancel]",
      modal
    )?.addEventListener(
      "click",
      closeModal
    );


    $(
      "[data-confirm-ok]",
      modal
    )?.addEventListener(
      "click",
      () => {

        closeModal();


        if (
          typeof onConfirm === "function"
        ) {

          onConfirm();

        }

      }
    );

  }


  /* =======================================================
     LOADING
     ======================================================= */

  function setLoading(
    element,
    loading = true,
    text = "Loading..."
  ) {

    if (!element) {
      return;
    }


    if (loading) {

      if (
        !element.dataset.originalText
      ) {

        element.dataset.originalText =
          element.innerHTML;

      }


      element.disabled = true;

      element.classList.add(
        "is-loading"
      );


      element.innerHTML = `
        <span class="loading-spinner"></span>
        <span>${escapeHTML(text)}</span>
      `;

    } else {

      element.disabled = false;

      element.classList.remove(
        "is-loading"
      );


      if (
        element.dataset.originalText
      ) {

        element.innerHTML =
          element.dataset.originalText;

        delete element.dataset.originalText;

      }

    }

  }


  /* =======================================================
     EMPTY STATE
     ======================================================= */

  function emptyState(
    message = "No data available.",
    icon = "📭"
  ) {

    return `
      <div class="empty-state">

        <div class="empty-icon">
          ${escapeHTML(icon)}
        </div>

        <p>
          ${escapeHTML(message)}
        </p>

      </div>
    `;

  }


  /* =======================================================
     FORMAT NUMBER
     ======================================================= */

  function formatNumber(
    value,
    decimals = 0
  ) {

    const number =
      Number(value);


    if (
      !Number.isFinite(number)
    ) {

      return "0";

    }


    return number.toLocaleString(
      undefined,
      {
        minimumFractionDigits:
          decimals,

        maximumFractionDigits:
          decimals
      }
    );

  }


  /* =======================================================
     FORMAT KG
     ======================================================= */

  function formatKg(
    value,
    decimals = 1
  ) {

    return `${formatNumber(
      value,
      decimals
    )} kg`;

  }


  /* =======================================================
     FORMAT KCAL
     ======================================================= */

  function formatCalories(
    value
  ) {

    return `${formatNumber(
      value,
      0
    )} kcal`;

  }


  /* =======================================================
     PROGRESS BAR
     ======================================================= */

  function progressBar(
    percentage,
    options = {}
  ) {

    let value =
      Number(percentage);


    if (
      !Number.isFinite(value)
    ) {

      value = 0;

    }


    value =
      Math.max(
        0,
        Math.min(
          100,
          value
        )
      );


    const label =
      options.label !== undefined
        ? options.label
        : `${Math.round(value)}%`;


    return `
      <div class="progress-wrapper">

        <div class="progress-track">

          <div
            class="progress-fill"
            style="width:${value}%"
          ></div>

        </div>

        ${
          options.showLabel === false
            ? ""
            : `
              <span class="progress-label">
                ${escapeHTML(label)}
              </span>
            `
        }

      </div>
    `;

  }


  /* =======================================================
     DEBOUNCE
     ======================================================= */

  function debounce(
    callback,
    delay = 300
  ) {

    let timer;


    return function (...args) {

      clearTimeout(
        timer
      );


      timer =
        setTimeout(
          () => {

            callback.apply(
              this,
              args
            );

          },
          delay
        );

    };

  }


  /* =======================================================
     SCROLL TOP
     ======================================================= */

  function scrollTop(
    smooth = true
  ) {

    window.scrollTo({

      top: 0,

      behavior:
        smooth
          ? "smooth"
          : "auto"

    });

  }


  /* =======================================================
     PAGE TRANSITION
     ======================================================= */

  function pageEnter() {

    document.body.classList.add(
      "page-ready"
    );


    requestAnimationFrame(
      () => {

        document.body.classList.add(
          "page-visible"
        );

      }
    );

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  function setActiveNavigation() {

    const currentPage =
      location.pathname
        .split("/")
        .pop()
        .replace(
          ".html",
          ""
        ) || "index";


    $$(
      "[data-page]"
    ).forEach(
      item => {

        const page =
          item.dataset.page;


        item.classList.toggle(
          "active",
          page === currentPage
        );

      }
    );

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function init() {

    pageEnter();

    setActiveNavigation();

  }


  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.CoachBolbolUI = {

    $,

    $$,

    escapeHTML,

    toast,

    openModal,

    closeModal,

    confirmAction,

    setLoading,

    emptyState,

    formatNumber,

    formatKg,

    formatCalories,

    progressBar,

    debounce,

    scrollTop,

    pageEnter,

    setActiveNavigation,

    init

  };


  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
