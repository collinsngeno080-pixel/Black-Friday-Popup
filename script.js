/* FileLabelPro pricing page: Monthly / Annual price switch */
(function () {
  function init() {
    var buttons = document.querySelectorAll('[data-billing]');
    var amount = document.querySelector('[data-plan-amount]');
    var period = document.querySelector('[data-plan-period]');
    if (!buttons.length || !amount || !period) return;
    var prices = {
      monthly: { amount: '$9.99', period: '/mo' },
      annual: { amount: '$95.90', period: '/yr' }
    };
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-billing');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        amount.textContent = prices[key].amount;
        period.textContent = prices[key].period;
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
