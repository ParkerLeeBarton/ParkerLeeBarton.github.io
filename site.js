/* Parker Barton — portfolio
   Two jobs only: open the nav on small screens, and drive the
   progress hairline on the title block. Nothing else needs script. */

(function () {
  "use strict";

  /* ---- mobile nav ---- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".bar nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---- title block progress ---- */
  var bar = document.querySelector(".titleblock__bar");
  if (bar) {
    var tick = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct.toFixed(2) + "%";
    };
    var queued = false;
    window.addEventListener(
      "scroll",
      function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(function () {
          tick();
          queued = false;
        });
      },
      { passive: true }
    );
    tick();
  }

  /* ---- current section in the sheet nav ---- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll(".sheetnav a[href^='#']")
  );
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    var targets = [];
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) {
        byId[el.id] = a;
        targets.push(el);
      }
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          var a = byId[e.target.id];
          if (!a) return;
          if (e.isIntersecting) {
            links.forEach(function (l) {
              l.style.color = "";
              l.style.borderBottomColor = "";
            });
            a.style.color = "var(--ink)";
            a.style.borderBottomColor = "var(--brass)";
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    targets.forEach(function (t) {
      io.observe(t);
    });
  }
})();
