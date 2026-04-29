(function () {
  var config = window.PORTFOLIO_ANALYTICS || {};
  var measurementId = config.measurementId || "";

  if (!measurementId || measurementId === "G-XXXXXXXXXX") {
    console.info("Analytics is disabled. Add your real Google Analytics Measurement ID in analytics-config.js.");
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    anonymize_ip: true,
    debug_mode: Boolean(config.debug),
    send_page_view: true,
    transport_type: "beacon"
  });

  var tagScript = document.createElement("script");
  tagScript.async = true;
  tagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  document.head.appendChild(tagScript);

  function trackContactClick(event) {
    var link = event.currentTarget;

    window.gtag("event", "contact_click", {
      contact_type: link.dataset.analyticsContact || "unknown",
      link_text: (link.textContent || "").trim(),
      link_url: link.href,
      transport_type: "beacon"
    });
  }

  function enableContactTracking() {
    var contactLinks = document.querySelectorAll("[data-analytics-contact]");

    contactLinks.forEach(function (link) {
      link.addEventListener("click", trackContactClick);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enableContactTracking);
  } else {
    enableContactTracking();
  }
}());
