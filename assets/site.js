/* alibekov.pro — общий скрипт всех страниц: ссылки на WhatsApp, входы в
   приложения, конверсия Google Ads и мягкое появление блоков при прокрутке.

   Номер WhatsApp и тексты сообщений меняются ЗДЕСЬ — одним местом на весь сайт.
   Номер в международном формате, без «+» и пробелов. */
var WHATSAPP_NUMBER = "77077570443"; // Тимур Алибеков
var WHATSAPP_TEXTS = {
  default: "Здравствуйте! Пишу с сайта alibekov.pro — хочу узнать подробнее о программах.",
  seminar: "Здравствуйте! Хочу записаться на тренинг «Хватит ли мне денег на всю оставшуюся жизнь?» — тариф «Только тренинг» (3 900 ₸).",
  combo:   "Здравствуйте! Хочу записаться на тренинг «Хватит ли мне денег на всю оставшуюся жизнь?» + игра «Тенге Капитал» (9 990 ₸).",
  magazin: "Здравствуйте! Хочу консультацию по программе «Умный магазин» — у меня розничный магазин.",
  lichnoe: "Здравствуйте! Хочу записаться на бесплатную 15-минутную консультацию по программе «Личное сопровождение».",
  biznes:  "Здравствуйте! Хочу записаться на программу «Бизнес-сопровождение» — подскажите, какой пакет мне подойдёт."
};

var APP_URL     = "https://app.alibekov.pro"; // Финбалансер
var TASKMAN_URL = "https://crm.alibekov.pro"; // Taskman
var TENGE_URL   = "https://tk.alibekov.pro";  // Тенге Капитал

/* Конверсия Google Ads — клик по кнопке WhatsApp (см. кампанию семинара). */
var ADS_SEND_TO = "AW-18318471443/UiQUCLms_OMcEJPi9p5E";

(function(){
  var clean = (WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  document.querySelectorAll(".cta-wa").forEach(function(a){
    var text = WHATSAPP_TEXTS[a.getAttribute("data-wa-text")] || WHATSAPP_TEXTS.default;
    var waUrl = clean && WHATSAPP_NUMBER.indexOf("X") === -1
      ? "https://wa.me/" + clean + "?text=" + encodeURIComponent(text) : null;
    if(waUrl){
      a.href = waUrl; a.target = "_blank"; a.rel = "noopener";
      // предупреждение о новой вкладке: для незрячего неожиданный переход дезориентирует.
      // Если у ссылки есть aria-label, он перебивает текст — дописываем именно в него.
      if(a.hasAttribute("aria-label")){
        a.setAttribute("aria-label", a.getAttribute("aria-label") + " (откроется в новой вкладке)");
      } else if(!a.querySelector(".sr-only")){
        var hint = document.createElement("span");
        hint.className = "sr-only";
        hint.textContent = " (откроется в новой вкладке)";
        a.appendChild(hint);
      }
    }
    else { a.href = "#zayavka"; } // если номер не задан — скролл к секции записи
    a.addEventListener("click", function(){
      if(typeof gtag === "function"){
        gtag('event', 'conversion', {'send_to': ADS_SEND_TO, 'value': 1.0, 'currency': 'USD'});
      }
    });
  });

  // кнопки входа в приложения
  document.querySelectorAll("[data-app]").forEach(function(a){ a.href = APP_URL; });
  document.querySelectorAll("[data-taskman]").forEach(function(a){ a.href = TASKMAN_URL; });
  document.querySelectorAll("[data-tenge]").forEach(function(a){ a.href = TENGE_URL; });

  // мягкое появление блоков; при prefers-reduced-motion стили уже всё показывают
  if(!("IntersectionObserver" in window)){
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
})();
