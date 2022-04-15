$(document).ready(function() {
  if (window.location.href.indexOf('cart=expanded') > -1) {
    if ($('.cart-count').hasClass('visible')) {
      $('#shopify-section-header .mini-cart').addClass('show');
    } 
  } 
})