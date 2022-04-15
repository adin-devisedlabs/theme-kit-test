jQuery('.util-search a').click(function(e){
  e.preventDefault();

  if (jQuery('.util-search__form').hasClass('open')) {
    jQuery('.util-search__form form').submit();
  } else {
    jQuery('.util-search__form').addClass('open');
  }
});

jQuery('.util-search__form .close').click(function(e){
  e.preventDefault();
  jQuery('.util-search__form').removeClass('open');
});

jQuery('#sort-by').val('{{ collection.sort_by | default: collection.default_sort_by | escape }}').bind('change', function() {
  Shopify.queryParams.sort_by = jQuery(this).val();
  location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
});