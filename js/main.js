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

  /* ---------- Validación + envío de formularios (por WhatsApp) ---------- */
  var PHONE_AR_RE = /^\+?\d[\d\s()-]{7,}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initForms() {
    document.querySelectorAll("form[data-ajax-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateForm(form)) return;
        sendWhatsApp(form);
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

  // Arma el mensaje con los campos completados y abre WhatsApp con el texto listo para enviar
  function sendWhatsApp(form) {
    var statusBox = form.parentElement.querySelector(".form-status");
    var honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value) return;

    var lines = [form.getAttribute("data-whatsapp-intro") || "Hola SAHANA, quisiera hacer una consulta."];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.name.charAt(0) === "_" || el.type === "hidden" || el.type === "submit" || el.type === "checkbox") return;
      if (el.type === "radio" && !el.checked) return;
      var value = el.tagName === "SELECT" ? (el.value ? el.options[el.selectedIndex].text : "") : el.value.trim();
      if (!value) return;
      lines.push(fieldLabel(form, el) + ": " + value);
    });

    var url = "https://wa.me/" + form.getAttribute("data-whatsapp") + "?text=" + encodeURIComponent(lines.join("\n"));
    var win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;

    showStatus(statusBox, "success", "Te abrimos WhatsApp con tu consulta lista. Solo tenés que tocar Enviar.");
    trackEvent("form_submit_whatsapp", { form_id: form.id || "contacto" });
  }

  function fieldLabel(form, el) {
    var text = el.getAttribute("data-label");
    if (!text && el.id) {
      var label = form.querySelector('label[for="' + el.id + '"]');
      if (label) text = label.textContent;
    }
    return (text || el.name).replace("*", "").trim();
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
