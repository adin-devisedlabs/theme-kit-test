$(document).ready(function(){
  let currentUrl = window.location.href.split('?tag=');

  if (currentUrl[1]) {
    setTimeout(function(){
      $('.tag--' + currentUrl[1]).trigger('click');
    }, 150);
  }

  $('.blog__nav a').click(function(e){
    e.preventDefault();
    let selectedTag = $(this).text().toLowerCase();
    $(this).addClass('active').siblings().removeClass('active');

    $('.blog__listing__article').each(function(){
      if ($(this).data('tags').indexOf(selectedTag) > -1 || selectedTag == 'all articles') {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    if ($('.blog__listing__article:visible').length < 1) {
      $('.none-found').show().find('span').text(selectedTag);
    } else {
      $('.none-found').hide();
    }
  });

  $(window).scroll(function(){
    setTimeout(function() {
      scrollExecute();
    }, 200)
  });

  function hideShowErrorMessage() {
    if ($('.blog__listing__article:visible').length < 1) {
      $('.none-found').show();
    } else {
      $('.none-found').hide();
    }
  }

  function scrollExecute() {
    let paginationEnd = parseInt($('.pageEnd').text());

    if($(document).height() - 800 < ($(document).scrollTop() + $(window).height())) {
      scrollNode = $('#more-articles').last();    
      scrollURL = $('#more-articles p a').last().attr("href");
      currentPage = parseInt(scrollURL.split('=')[1]);
      nextPage = currentPage + 1;
      newScrollURL = scrollURL.split('=')[0] + '=' + nextPage;

      if(scrollNode.length > 0 && scrollNode.css('display') != 'none') {
        if (paginationEnd >= currentPage) {
          $.ajax({
            type: 'GET',
            url: scrollURL,
            beforeSend: function() {
              $('.loading-ring-wrapper').show();
              scrollNode.hide();
            },
            success: function(data) {
              $('.loading-ring-wrapper').hide();
              let filteredData = $(data).find(".blog__listing__article");
              filteredData.insertBefore( scrollNode ); 
              $('#more-articles p a').attr('href', newScrollURL);
              scrollNode.show();
              hideShowErrorMessage();                
            },
            error: function(err) {
              console.log('err', err)
            },
            dataType: "html"
          });
        }
      }
    }
  }

});