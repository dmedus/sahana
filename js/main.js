// SAHANA SRL — comportamiento del sitio

(function () {
  "use strict";

  function trackEvent(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  }
  window.sahanaTrackEvent = trackEvent;

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initCookieBanner();
    initProductGallery();
    initForms();
    initClickTracking();
    initContactPrefill();
  });

  /* ---------- Precarga de producto de interés (?producto=slug) ---------- */
  function initContactPrefill() {
    var select = document.querySelector("#producto");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var producto = params.get("producto");
    if (producto && select.querySelector('option[value="' + producto + '"]')) {
      select.value = producto;
    }
  }

  /* ---------- Menú mobile ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Cookie banner (simple, localStorage) ---------- */
  function initCookieBanner() {
    var banner = document.querySelector(".cookie-banner");
    if (!banner) return;
    var KEY = "sahana_cookies_ack";

    if (!localStorage.getItem(KEY)) {
      window.setTimeout(function () {
        banner.classList.add("is-visible");
      }, 600);
    }

    var btn = banner.querySelector("[data-cookie-accept]");
    if (btn) {
      btn.addEventListener("click", function () {
        localStorage.setItem(KEY, "1");
        banner.classList.remove("is-visible");
      });
    }
  }

  /* ---------- Galería de producto (miniaturas) ---------- */
  function initProductGallery() {
    var main = document.querySelector("[data-gallery-main]");
    var thumbs = document.querySelectorAll("[data-gallery-thumb]");
    if (!main || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var fullSrc = thumb.getAttribute("data-full") || thumb.src;
        main.src = fullSrc;
        thumbs.forEach(function (t) { t.classList.remove("active"); });
        thumb.classList.add("active");
      });
    });
  }

  /* ---------- Validación + envío de formularios (Formspree) ---------- */
  var PHONE_AR_RE = /^\+?\d[\d\s()-]{7,}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initForms() {
    document.querySelectorAll("form[data-ajax-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm(form)) return;
        submitForm(form);
      });
    });
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll("[data-validate]").forEach(function (field) {
      var rule = field.getAttribute("data-validate");
      var value = field.value.trim();
      var ok = true;

      if (rule.indexOf("required") !== -1 && !value) ok = false;
      if (ok && rule.indexOf("email") !== -1 && value && !EMAIL_RE.test(value)) ok = false;
      if (ok && rule.indexOf("phone") !== -1 && value && !PHONE_AR_RE.test(value)) ok = false;
      if (ok && rule.indexOf("min3") !== -1 && value.length < 3) ok = false;
      if (ok && rule.indexOf("min10") !== -1 && value.length < 10) ok = false;

      field.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    form.querySelectorAll("[data-validate-radio]").forEach(function (group) {
      var name = group.getAttribute("data-validate-radio");
      var ok = !!form.querySelector('input[name="' + name + '"]:checked');
      group.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  function submitForm(form) {
    var statusBox = form.parentElement.querySelector(".form-status");
    var submitBtn = form.querySelector("[type=submit]");
    var endpoint = form.getAttribute("action");
    var isPlaceholder = !endpoint || endpoint.indexOf("TU_ID_DE_FORM") !== -1;

    if (isPlaceholder) {
      showStatus(statusBox, "error", "Formulario en configuración: falta conectar el ID de Formspree (ver js/main.js).");
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Enviando..."; }

    fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          showStatus(statusBox, "success", "¡Gracias! Recibimos tu consulta. Te contactaremos en menos de 24 horas.");
          trackEvent("form_submit_success", { form_id: form.id || "contacto" });
        } else {
          showStatus(statusBox, "error", "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.");
          trackEvent("form_submit_error", { form_id: form.id || "contacto" });
        }
      })
      .catch(function () {
        showStatus(statusBox, "error", "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.");
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.getAttribute("data-label") || "Enviar"; }
      });
  }

  function showStatus(box, type, message) {
    if (!box) return;
    box.textContent = message;
    box.classList.remove("is-success", "is-error");
    box.classList.add(type === "success" ? "is-success" : "is-error");
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- Tracking de clicks clave ---------- */
  function initClickTracking() {
    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        trackEvent(el.getAttribute("data-track"), {});
      });
    });
  }
})();
