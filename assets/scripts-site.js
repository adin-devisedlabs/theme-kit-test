$(document).ready(function () {
  // Add aria-label for Gorgias web messenger (ADA)
  setTimeout(function () {
    $("#gorgias-web-messenger-container").attr(
      "aria-label",
      "Gorgias Web Messenger"
    );
  }, 3000);

  // Allow zooming (ADA)
  $("meta[name=viewport]").each(function () {
    if ($(this).attr("content").indexOf("user-scalable=no") > -1) {
      $(this).attr("content", "width=device-width, initial-scale=1");
    }
  });

  // Add aria-label to selectric inputs (ADA)
  $(".selectric-input").each(function () {
    if (!$(this).attr("aria-label")) {
      $(this).attr("aria-label", "Selectric Input");
    }
  });

  // Add star rating text to YMAL, Recently Viewed
  function addReviewsStarsText() {
    $(".stamped-badge").each(function () {
      let $this = $(this);
      if ($this.find(".stamped-badge-text").length == 0) {
        let rating = $this.attr("data-rating");
        let caption = $this[0].childNodes[1];
        $(
          '<span class="stamped-badge-text" style="margin-left:5px;margin-right:-5px;">(' +
            rating +
            " stars)</span>"
        ).insertBefore(caption);
      }
    });
  }
  setTimeout(function () {
    addReviewsStarsText();
  }, 3000);
  setTimeout(function () {
    addReviewsStarsText();
  }, 5000);

  $(".util-cart").click(function () {
    $("#mini-cart__title").focus();
  });

  // Email validation: Register page + footer
  $(".form--register #field-email").on("keyup", function () {
    emailValidation($(this), $(".form--register .customer-btn"));
  });

  $('.newsletter-form input[type="email"]').on("keyup", function () {
    emailValidation($(this), $(".newsletter-form .form-btn"));
  });

  function emailValidation(element, button) {
    let email = element.val();

    if (!emailIsValid(email)) {
      button.attr("disabled", true);
      $(".email-validation-warning").length
        ? ""
        : element.after(
            '<p class="email-validation-warning">Please enter a valid email address</p>'
          );
    } else {
      button.attr("disabled", false);
      $(".email-validation-warning").remove();
    }
  }

  function emailIsValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  $(".header__inner .header__cart-icon").click(function () {
    preventScrollOpenMiniCart();
  });

  $("body").on("click", ".mini-cart__close", function () {
    preventScrollOpenMiniCart();
  });

  $(".btn--checkout").click(function () {
    preventScrollOpenMiniCart();
  });

  function preventScrollOpenMiniCart() {
    setTimeout(function () {
      if ($(window).width() <= 767) {
        let windowScrollY = $(window).scrollTop();

        if ($(".mini-cart").hasClass("show")) {
          $("body").css("position", "fixed");
          $("body").css("top", windowScrollY + "px");
        } else {
          $("body").css("position", "inherit");
          $("body").css("top", "unset");
          window.scrollTo(0, parseInt(windowScrollY || "0") * -1);
        }
      }
    }, 500);
  }

  // Prevent scrolling when upsell modal is open on mobile
  $(".mini-cart .btn--checkout").click(function () {
    preventScrollOpenUpsellModal();
  });

  $(".upsell-modal .close").click(function () {
    preventScrollOpenUpsellModal();
  });

  function preventScrollOpenUpsellModal() {
    setTimeout(function () {
      if ($(window).width() <= 767) {
        let windowScrollY = $(window).scrollTop();

        if ($(".upsell-modal").css("display") == "block") {
          $("body").css("position", "fixed");
          $("body").css("top", windowScrollY + "px");
        } else {
          $("body").css("position", "");
          $("body").css("top", "");
          window.scrollTo(0, parseInt(windowScrollY || "0") * -1);
        }
      }
    }, 500);
  }
});
