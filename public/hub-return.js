/* OiKID Hub 返回按鈕(單字冒險 / 課後作業 / 檢定題庫 共用,同一份檔案)
 * 只有從顧問專頁點進來(網址帶 ?from=<顧問代號>)才會顯示「← 回 XX 老師專頁」;
 * 直接輸入網址進來,什麼都不顯示。
 * 記在 sessionStorage:登入、換頁後按鈕還在;關掉分頁就清掉。
 * 返回網址固定是 oikid-hub.vercel.app,網址參數只能決定是哪位老師,不能導去別的網站。
 * 位置:<script src="/hub-return.js" data-pos="bl|br|tl|tr" data-hide="/quiz,/play" defer>,預設左下;
 * data-hide 是要隱藏按鈕的路徑開頭(例如作答中),用逗號分隔。
 * data-mobile-bottom="66":手機(寬度 < 768)時離底部的距離,用來避開網站原本的底部按鈕。
 */
(function () {
  var KEY = 'oikid-hub-return';
  var HUB = 'https://oikid-hub.vercel.app/';
  var LABELS = { jordan: 'Jordan 老師專頁' };
  var script = document.currentScript;
  var pos = (script && script.getAttribute('data-pos')) || 'bl';
  var mBottom = parseInt((script && script.getAttribute('data-mobile-bottom')) || '', 10);
  var hide = ((script && script.getAttribute('data-hide')) || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
  var slug;
  try {
    var from = new URLSearchParams(location.search).get('from');
    if (from && /^[a-z0-9-]{1,32}$/.test(from)) sessionStorage.setItem(KEY, from);
    slug = sessionStorage.getItem(KEY);
  } catch (e) { return; }
  if (!slug || !/^[a-z0-9-]{1,32}$/.test(slug)) return;

  function mount() {
    if (document.getElementById('oikid-hub-return')) return;
    var a = document.createElement('a');
    a.id = 'oikid-hub-return';
    a.href = HUB + slug;
    a.setAttribute('aria-label', '回到 ' + (LABELS[slug] || '老師專頁'));
    a.innerHTML = '<span aria-hidden="true" style="font-size:16px;line-height:1">←</span><span>回 ' + (LABELS[slug] || '老師專頁') + '</span>';
    var v = pos.charAt(0) === 't' ? 'top:calc(12px + env(safe-area-inset-top))' : 'bottom:calc(14px + env(safe-area-inset-bottom))';
    var h = pos.charAt(1) === 'r' ? 'right:14px' : 'left:14px';
    a.style.cssText = 'position:fixed;' + v + ';' + h + ';z-index:2147483000;display:inline-flex;align-items:center;gap:8px;' +
      'padding:10px 16px;border-radius:999px;background:rgba(58,44,35,.92);color:#f2e9de;text-decoration:none;' +
      "font:700 14px/1.2 'PingFang TC','Noto Sans TC',system-ui,sans-serif;box-shadow:0 8px 24px -8px rgba(0,0,0,.45);" +
      '-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:transform .2s,opacity .2s;-webkit-tap-highlight-color:transparent';
    a.onmouseenter = function () { a.style.transform = 'translateY(-2px)'; };
    a.onmouseleave = function () { a.style.transform = ''; };
    document.body.appendChild(a);
    // 單頁網站換頁不會重新載入,定時檢查目前路徑決定要不要藏
    var sync = function () {
      var p = location.pathname, off = hide.some(function (h) { return p === h || p.indexOf(h + '/') === 0; });
      a.style.display = off ? 'none' : 'inline-flex';
      if (pos.charAt(0) === 'b' && mBottom > 0) {
        a.style.bottom = 'calc(' + (innerWidth < 768 ? mBottom : 14) + 'px + env(safe-area-inset-bottom))';
      }
    };
    sync(); setInterval(sync, 400);
    var st = document.createElement('style');
    st.textContent = '@media print{#oikid-hub-return{display:none!important}}';
    document.head.appendChild(st);
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
