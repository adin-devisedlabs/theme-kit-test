$(document).ready(function() {
  //Reload page after add-to-cart in order to reset Recharge subscription product check for Checkout redirect + expand cart
  $('.form__foot button[type="submit"]').on('click', function(e) {
    if ($('#product-select').length && !$('#product-select').val()) {
      alert('Please select an option');
      e.preventDefault();
		} else {
      setTimeout(function() {
        $('.mini-cart').addClass('show');
        $('.mini-cart .btn').focus();
      }, 2000)
    }  
  })

  if (window.location.href.indexOf('cart=expanded') > -1) {
    if ($('.cart-count').hasClass('visible')) {
      $('#shopify-section-header .mini-cart').addClass('show');
      $('.mini-cart .btn').focus();
    } 
  }

  //Update fixed bar variant selector when updating pdp variant selector
  $('.product-single__variants li').on('click', function() {
    var selectedVariantID = $('.product__form #product-select').val();
    $('.variant-select').each(function() {
      if ($(this).val() == selectedVariantID) {
        $(this).prop('checked', true);
      } else {
        $(this).prop('checked', false);
      }
    })

    //Load variant price in fixed-form
    setTimeout(function() {
      let variantPrice = $('.product__head .product__price .current span.money').text().trim();
      $('.fixed-form .price .price__amount.current span.money').text(variantPrice);
    }, 500);

  })

  //Update pdp variant selector when updating fixed bar variant selector 
  $('.variant-select-wrapper .icon-radio, .variant-select-wrapper label').on('click', function() {
    $(this).closest('li').siblings().find('input').prop('checked', false);
    $(this).closest('li').find('input').prop('checked', true);

    if ($(this).closest('li').find('input').prop('checked')) {
      var selectedVariantID = $(this).closest('li').find('input').val();
      var selectedVariantTitle = $(this).closest('li').find('label').text().trim();

      $('#select-only-one li').each(function() {
        if ($(this).attr('data-variant-id') == selectedVariantID) {
          $(this).siblings().removeClass('selected');
          $(this).addClass('selected');
          var selectedVariantPrice = $(this).attr('data-price');
          $('.product__price').html(selectedVariantPrice);
          return false;
        }
      });

      $('.product-single__variants.custom-select li').each(function() {
        if ($(this).attr('data-value') == selectedVariantTitle) {
          $(this).siblings().removeClass('selected');
          $(this).addClass('selected');
          return false;
        }
      })
    }

    $('.custom-select-wrapper').removeClass('clicked');

    //Load variant price in fixed-form
    setTimeout(function() {
      let variantPrice = $('.product__head .product__price .current span.money').text().trim();
      $('.fixed-form .price .price__amount.current span.money').text(variantPrice);
    }, 500);

  })

  $('#product-select').on('change', function() {
    //  Load variant price in fixed-form
     setTimeout(function() {
      let variantPrice = $('.product__head .product__price .current span.money').text().trim();
      $('.fixed-form .price .price__amount.current span.money').text(variantPrice);
    }, 500);

  }) 
  
  if (window.location.pathname.indexOf('hand-sanitizer') > -1) {

    setTimeout(function() {
      // $('.swym-add-to-watchlist').text('Get First Access');
      $('.swym-add-to-watchlist').click(function() {
        setTimeout(function() {
          $('.swym-title h2').text('Join our waitlist');
          $('.swym-remind-description').html('You will be the first to be notified when this item is back in stock.');
          $('.swym-privacy-info').html('By submitting your email, you will be notified when the product is available and will be subscribed to our marketing emails. You accept the <span><a href="/pages/privacy-policy" target="_blank" style="text-decoration: underline;">Privacy Policy</a></span> and the <span><a href="/pages/terms-of-service" target="_blank" style="text-decoration: underline;">Terms of Service</a></span>.');
        });
      });
    }, 1000);

    // $('.fixed-form .flex-item:last-child span').text('Coming Soon');
  }

  if (window.location.search.indexOf('variant=') > -1) {
    let selectedVariantID = window.location.search.split('variant=')[1].split('&')[0];

    $('#product-select li').each(function() {
      if ($(this).attr('data-variant-id') == selectedVariantID) {
        $(this).attr('disabled', true);
        $(this).siblings().attr('disabled', false);
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');

        return false;
      }
    })
  }

  // Add StampedIO reviews text
	function addReviewsText() {
		if (!$('.stamped-badge-text').length) {
			let rating = $('#product .stamped-badge-caption').attr('data-rating');
			$('<span class="stamped-badge-text" style="margin-left:10px;margin-right:-5px;">(' + rating + ' stars)</span>').insertBefore('#product .stamped-badge-caption');
		}
	}

	setTimeout(function() {
		addReviewsText();
	}, 3000);
	setTimeout(function() {
		addReviewsText();
  }, 5000);
  
  // Fixed form (Desktop) - Select option when clicking on circle
  $('.shipping-interval-select-wrapper li .icon-radio').click(function() {
    $(this).prev().trigger('change').trigger('click');
  });
  
  
})