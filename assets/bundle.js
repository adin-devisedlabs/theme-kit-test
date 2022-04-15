/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 48));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (global) {
        module.exports = global["jQuery"] = __webpack_require__(92);
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(4)));

      /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (global) {
        var O = "object";
        var check = function (it) {
          return it && it.Math == Math && it;
        };

        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        module.exports =
          // eslint-disable-next-line no-undef
          check(typeof globalThis == O && globalThis) ||
          check(typeof window == O && window) ||
          check(typeof self == O && self) ||
          check(typeof global == O && global) ||
          // eslint-disable-next-line no-new-func
          Function("return this")();

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(4)));

      /***/
    },
    /* 2 */
    /***/ function (module, exports) {
      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };

      /***/
    },
    /* 3 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var getOwnPropertyDescriptor = __webpack_require__(24).f;
      var hide = __webpack_require__(7);
      var redefine = __webpack_require__(29);
      var setGlobal = __webpack_require__(21);
      var copyConstructorProperties = __webpack_require__(56);
      var isForced = __webpack_require__(63);

      /*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
      module.exports = function (options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = global;
        } else if (STATIC) {
          target = global[TARGET] || setGlobal(TARGET, {});
        } else {
          target = (global[TARGET] || {}).prototype;
        }
        if (target)
          for (key in source) {
            sourceProperty = source[key];
            if (options.noTargetGet) {
              descriptor = getOwnPropertyDescriptor(target, key);
              targetProperty = descriptor && descriptor.value;
            } else targetProperty = target[key];
            FORCED = isForced(
              GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
              options.forced
            );
            // contained in target
            if (!FORCED && targetProperty !== undefined) {
              if (typeof sourceProperty === typeof targetProperty) continue;
              copyConstructorProperties(sourceProperty, targetProperty);
            }
            // add a flag to not completely full polyfills
            if (options.sham || (targetProperty && targetProperty.sham)) {
              hide(sourceProperty, "sham", true);
            }
            // extend global
            redefine(target, key, sourceProperty, options);
          }
      };

      /***/
    },
    /* 4 */
    /***/ function (module, exports) {
      var g;

      // This works in non-strict mode
      g = (function () {
        return this;
      })();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if (typeof window === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 5 */
    /***/ function (module, exports, __webpack_require__) {
      var fails = __webpack_require__(2);

      // Thank's IE8 for his funny defineProperty
      module.exports = !fails(function () {
        return (
          Object.defineProperty({}, "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });

      /***/
    },
    /* 6 */
    /***/ function (module, exports) {
      // `RequireObjectCoercible` abstract operation
      // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on " + it);
        return it;
      };

      /***/
    },
    /* 7 */
    /***/ function (module, exports, __webpack_require__) {
      var DESCRIPTORS = __webpack_require__(5);
      var definePropertyModule = __webpack_require__(20);
      var createPropertyDescriptor = __webpack_require__(26);

      module.exports = DESCRIPTORS
        ? function (object, key, value) {
            return definePropertyModule.f(
              object,
              key,
              createPropertyDescriptor(1, value)
            );
          }
        : function (object, key, value) {
            object[key] = value;
            return object;
          };

      /***/
    },
    /* 8 */
    /***/ function (module, exports) {
      module.exports = function (it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
      };

      /***/
    },
    /* 9 */
    /***/ function (module, exports) {
      var hasOwnProperty = {}.hasOwnProperty;

      module.exports = function (it, key) {
        return hasOwnProperty.call(it, key);
      };

      /***/
    },
    /* 10 */
    /***/ function (module, exports, __webpack_require__) {
      var isObject = __webpack_require__(8);

      module.exports = function (it) {
        if (!isObject(it)) {
          throw TypeError(String(it) + " is not an object");
        }
        return it;
      };

      /***/
    },
    /* 11 */
    /***/ function (module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(15);

      var min = Math.min;

      // `ToLength` abstract operation
      // https://tc39.github.io/ecma262/#sec-tolength
      module.exports = function (argument) {
        return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
      };

      /***/
    },
    /* 12 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      function is_touch_device() {
        try {
          document.createEvent("TouchEvent");
          return true;
        } catch (e) {
          return false;
        }
      }

      module.exports = {
        is_touch_device: is_touch_device,
      };

      /***/
    },
    /* 13 */
    /***/ function (module, exports, __webpack_require__) {
      var fails = __webpack_require__(2);
      var classof = __webpack_require__(19);

      var split = "".split;

      // fallback for non-array-like ES3 and non-enumerable old V8 strings
      module.exports = fails(function () {
        // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
        // eslint-disable-next-line no-prototype-builtins
        return !Object("z").propertyIsEnumerable(0);
      })
        ? function (it) {
            return classof(it) == "String" ? split.call(it, "") : Object(it);
          }
        : Object;

      /***/
    },
    /* 14 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var setGlobal = __webpack_require__(21);
      var IS_PURE = __webpack_require__(52);

      var SHARED = "__core-js_shared__";
      var store = global[SHARED] || setGlobal(SHARED, {});

      (module.exports = function (key, value) {
        return store[key] || (store[key] = value !== undefined ? value : {});
      })("versions", []).push({
        version: "3.1.3",
        mode: IS_PURE ? "pure" : "global",
        copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
      });

      /***/
    },
    /* 15 */
    /***/ function (module, exports) {
      var ceil = Math.ceil;
      var floor = Math.floor;

      // `ToInteger` abstract operation
      // https://tc39.github.io/ecma262/#sec-tointeger
      module.exports = function (argument) {
        return isNaN((argument = +argument))
          ? 0
          : (argument > 0 ? floor : ceil)(argument);
      };

      /***/
    },
    /* 16 */
    /***/ function (module, exports, __webpack_require__) {
      var requireObjectCoercible = __webpack_require__(6);

      // `ToObject` abstract operation
      // https://tc39.github.io/ecma262/#sec-toobject
      module.exports = function (argument) {
        return Object(requireObjectCoercible(argument));
      };

      /***/
    },
    /* 17 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);
        var $miniCart = $(".mini-cart");
        var $cartBag = $(".util-cart a");
        var $cart = $(".form--cart");

        function updateHtml($html) {
          var reveal =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : true;

          $cartBag.html($html.find(".util-cart a").html());
          $miniCart.html($html.find(".mini-cart").html());

          $miniCart.removeClass("loading");
          if (reveal) {
            $miniCart.addClass("show");
          }
        }

        $cart.on("click", ".js-remove", function (e) {
          e.preventDefault();
          let $form = $(this);
          const codeless_gwp_thresh = $("body").data("code-thresh");
          const codeless_gwp_id_1 = $("body").data("code-product-1");
          const codeless_gwp_id_2 =
            $("body").data("code-product-2") !== ""
              ? $("body").data("code-product-2")
              : null;
          const sample_prod_id = $("body").data("sample-product");
          const pickGWPThreshold = $("body").data("price-pick-threshold");
          const product1Id = $("body").data("pick-varid-1");
          const product2Id = $("body").data("pick-varid-2");
          const product3Id = $("body").data("pick-varid-3");
          const product4Id = $("body").data("pick-varid-4");

          const gwpArray = [];
          gwpArray.push(product1Id, product2Id, product3Id, product4Id);

          $form.addClass("loading");

          $.ajax({
            url: $form.attr("href"),
            type: "POST",
            dataType: "json",
            data: $form.serialize(),
            success: function () {
              $.getJSON("/cart.js", function (new_cart) {
                let subTotalCartPrice = new_cart.total_price;
                const finalObject = {};
                let reducedSubTotalCartPrice = subTotalCartPrice;

                if (codeless_gwp_id_1 || pickGWPThreshold) {
                  //Remove gift card items from GWP threshold
                  let excludeAmount = 0;
                  let pickGWPInCart = false;
                  new_cart.items.forEach(function (product) {
                    if (product.product_type === "Gift Card") {
                      excludeAmount = excludeAmount + product.line_price;
                    }
                    if (gwpArray.includes(product.id)) {
                      pickGWPInCart = true;
                    }
                  });
                  reducedSubTotalCartPrice = subTotalCartPrice - excludeAmount;

                  if (codeless_gwp_id_1) {
                    let gwp_quant =
                      reducedSubTotalCartPrice >= codeless_gwp_thresh ? 1 : 0;
                    finalObject[parseInt(codeless_gwp_id_1)] = gwp_quant;
                    codeless_gwp_id_2 &&
                      (finalObject[parseInt(codeless_gwp_id_2)] = gwp_quant);
                  }

                  if (
                    pickGWPInCart &&
                    pickGWPThreshold > reducedSubTotalCartPrice
                  ) {
                    finalObject[parseInt(product1Id)] = 0;
                    finalObject[parseInt(product2Id)] = 0;
                    finalObject[parseInt(product3Id)] = 0;
                    product4Id && (finalObject[parseInt(product4Id)] = 0);
                  }
                }

                if (sample_prod_id && reducedSubTotalCartPrice >= 100) {
                  finalObject[parseInt(sample_prod_id)] = 1;
                } else if (sample_prod_id && reducedSubTotalCartPrice < 100) {
                  finalObject[parseInt(sample_prod_id)] = 0;
                }

                if (!codeless_gwp_id_1 && !sample_prod_id && !pickGWPInCart) {
                  window.location.reload();
                } else {
                  $.ajax({
                    url: "/cart/update.js",
                    dataType: "json",
                    type: "post",
                    data: { updates: finalObject },
                    success: function () {
                      window.location.reload();
                    },
                  });
                }
              });

              $form.removeClass("loading");
            },
            error: function (XMLHttpRequest) {
              var response = eval("(" + XMLHttpRequest.responseText + ")");
              response = response.description;
              console.error(response);
              $form.removeClass("loading");
            },
          });
        });

        $miniCart
          .on("click", ".js-add, .js-remove", function (e) {
            e.preventDefault();
            let $form = $(this);
            let $body = $("body");
            const codeless_gwp_thresh = $("body").data("code-thresh");
            const codeless_gwp_id_1 = $("body").data("code-product-1");
            const codeless_gwp_id_2 =
              $("body").data("code-product-2") !== ""
                ? $("body").data("code-product-2")
                : null;
            const sample_prod_id = $("body").data("sample-product");
            const pickGWPThreshold = $("body").data("price-pick-threshold");
            const product1Id = $("body").data("pick-varid-1");
            const product2Id = $("body").data("pick-varid-2");
            const product3Id = $("body").data("pick-varid-3");
            const product4Id = $("body").data("pick-varid-4");

            const gwpArray = [];
            gwpArray.push(product1Id, product2Id, product3Id, product4Id);

            $form.addClass("loading");

            $.ajax({
              url: $form.attr("href"),
              type: "POST",
              dataType: "json",
              data: $form.serialize(),
              success: function () {
                $.getJSON("/cart.js", function (new_cart) {
                  let subTotalCartPrice = new_cart.total_price;
                  const finalObject = {};
                  let reducedSubTotalCartPrice = subTotalCartPrice;

                  if (codeless_gwp_id_1 || pickGWPThreshold) {
                    //Remove gift card items from GWP threshold
                    let excludeAmount = 0;
                    let pickGWPInCart = false;
                    new_cart.items.forEach(function (product) {
                      if (product.quantity > 6) {
                        finalObject[parseInt(product.variant_id)] = 6;
                      }
                      if (product.product_type === "Gift Card") {
                        excludeAmount = excludeAmount + product.line_price;
                      }
                      if (gwpArray.includes(product.id)) {
                        pickGWPInCart = true;
                      }
                    });
                    reducedSubTotalCartPrice =
                      subTotalCartPrice - excludeAmount;

                    if (codeless_gwp_id_1) {
                      let gwp_quant =
                        reducedSubTotalCartPrice >= codeless_gwp_thresh ? 1 : 0;
                      finalObject[parseInt(codeless_gwp_id_1)] = gwp_quant;
                      codeless_gwp_id_2 &&
                        (finalObject[parseInt(codeless_gwp_id_2)] = gwp_quant);
                    }

                    if (
                      pickGWPInCart &&
                      pickGWPThreshold > reducedSubTotalCartPrice
                    ) {
                      finalObject[parseInt(product1Id)] = 0;
                      finalObject[parseInt(product2Id)] = 0;
                      finalObject[parseInt(product3Id)] = 0;
                      product4Id && (finalObject[parseInt(product4Id)] = 0);
                    }
                  }

                  if (sample_prod_id && reducedSubTotalCartPrice >= 100) {
                    finalObject[parseInt(sample_prod_id)] = 1;
                  } else if (sample_prod_id && reducedSubTotalCartPrice < 100) {
                    finalObject[parseInt(sample_prod_id)] = 0;
                  }

                  if (!codeless_gwp_id_1 && !sample_prod_id && !pickGWPInCart) {
                    updateCart(new_cart);
                  } else {
                    $.ajax({
                      url: "/cart/update.js",
                      dataType: "json",
                      type: "post",
                      data: { updates: finalObject },
                      success: function () {
                        $.getJSON("/cart.js", function (new_cart) {
                          updateCart(new_cart);
                        });
                      },
                    });
                  }
                });

                $form.removeClass("loading");
                $form.removeClass("fixed");

                if ($body.hasClass("template-product")) {
                  if (!$(".fixed-form").hasClass("visible")) {
                    $body.addClass("full-height");
                  }
                }

                $(".mini-cart").addClass("show");
              },
              error: function (XMLHttpRequest) {
                var response = eval("(" + XMLHttpRequest.responseText + ")");
                response = response.description;
                console.error(response);
                $form.removeClass("loading");
                $form.removeClass("fixed");
              },
            });
          })
          .on("click", ".mini-cart__close", function () {
            $miniCart.removeClass("show");
            $("body").removeClass("full-height timeout");
          });

        $cart.on("change", ".qty input", function (e) {
          let $form = $(this);
          // limit per product var id is 6
          if ($(this).val() > 6) {
            $(this).val(6);
          };
          const codeless_gwp_thresh = $("body").data("code-thresh");
          const codeless_gwp_id_1 = $("body").data("code-product-1");
          const codeless_gwp_id_2 =
            $("body").data("code-product-2") !== ""
              ? $("body").data("code-product-2")
              : null;
          const sample_prod_id = $("body").data("sample-product");
          const pickGWPThreshold = $("body").data("price-pick-threshold");
          const product1Id = $("body").data("pick-varid-1");
          const product2Id = $("body").data("pick-varid-2");
          const product3Id = $("body").data("pick-varid-3");
          const product4Id = $("body").data("pick-varid-4");

          const gwpArray = [];
          gwpArray.push(product1Id, product2Id, product3Id, product4Id);

          $form.addClass("loading");

          $.ajax({
            url: "/cart/update.js",
            type: "POST",
            dataType: "json",
            data: $form.attr("name") + "=" + $form.val(),
            success: function (itemData) {
              $.getJSON("/cart.js", function (new_cart) {
                let subTotalCartPrice = new_cart.total_price;
                const finalObject = {};
                let reducedSubTotalCartPrice = subTotalCartPrice;

                if (codeless_gwp_id_1 || pickGWPThreshold) {
                  //Remove gift card items from GWP threshold
                  let excludeAmount = 0;
                  let pickGWPInCart = false;
                  new_cart.items.forEach(function (product) {
                    if (product.quantity > 6) {
                      finalObject[parseInt(product.variant_id)] = 6;
                    }
                    if (product.product_type === "Gift Card") {
                      excludeAmount = excludeAmount + product.line_price;
                    }
                    if (gwpArray.includes(product.id)) {
                      pickGWPInCart = true;
                    }
                  });
                  reducedSubTotalCartPrice = subTotalCartPrice - excludeAmount;

                  if (codeless_gwp_id_1) {
                    let gwp_quant =
                      reducedSubTotalCartPrice >= codeless_gwp_thresh ? 1 : 0;
                    finalObject[parseInt(codeless_gwp_id_1)] = gwp_quant;
                    codeless_gwp_id_2 &&
                      (finalObject[parseInt(codeless_gwp_id_2)] = gwp_quant);
                  }

                  if (
                    pickGWPInCart &&
                    pickGWPThreshold > reducedSubTotalCartPrice
                  ) {
                    finalObject[parseInt(product1Id)] = 0;
                    finalObject[parseInt(product2Id)] = 0;
                    finalObject[parseInt(product3Id)] = 0;
                    product4Id && (finalObject[parseInt(product4Id)] = 0);
                  }
                }

                if (sample_prod_id && reducedSubTotalCartPrice >= 100) {
                  finalObject[parseInt(sample_prod_id)] = 1;
                } else if (sample_prod_id && reducedSubTotalCartPrice < 100) {
                  finalObject[parseInt(sample_prod_id)] = 0;
                }

                if (!codeless_gwp_id_1 && !sample_prod_id && !pickGWPInCart) {
                  window.location.reload();
                } else {
                  $.ajax({
                    url: "/cart/update.js",
                    dataType: "json",
                    type: "post",
                    data: { updates: finalObject },
                    success: function () {
                      window.location.reload();
                    },
                  });
                }
              });

              $form.removeClass("loading");
            },
            error: function (XMLHttpRequest) {
              var response = eval("(" + XMLHttpRequest.responseText + ")");
              response = response.description;
              console.error(response);
              $form.removeClass("loading");
            },
          });
        });

        $miniCart.on("change", ".qty input", function (e) {
          let $form = $(this);
          let $body = $("body");
          // limit per product var id is 6
          if ($(this).val() > 6) {
            $(this).val(6);
          };
          const codeless_gwp_thresh = $("body").data("code-thresh");
          const codeless_gwp_id_1 = $("body").data("code-product-1");
          const codeless_gwp_id_2 =
            $("body").data("code-product-2") !== ""
              ? $("body").data("code-product-2")
              : null;
          const sample_prod_id = $("body").data("sample-product");
          const pickGWPThreshold = $("body").data("price-pick-threshold");
          const product1Id = $("body").data("pick-varid-1");
          const product2Id = $("body").data("pick-varid-2");
          const product3Id = $("body").data("pick-varid-3");
          const product4Id = $("body").data("pick-varid-4");

          const gwpArray = [];
          gwpArray.push(product1Id, product2Id, product3Id, product4Id);

          $form.addClass("loading");

          $.ajax({
            url: "/cart/update.js",
            type: "POST",
            dataType: "json",
            data: $form.attr("name") + "=" + $form.val(),
            success: function () {
              $.getJSON("/cart.js", function (new_cart) {
                let subTotalCartPrice = new_cart.total_price;
                const finalObject = {};
                let reducedSubTotalCartPrice = subTotalCartPrice;

                if (codeless_gwp_id_1 || pickGWPThreshold) {
                  //Remove gift card items from GWP threshold
                  let excludeAmount = 0;
                  let pickGWPInCart = false;
                  new_cart.items.forEach(function (product) {
                    if (product.quantity > 6) {
                      finalObject[parseInt(product.variant_id)] = 6;
                    }
                    if (product.product_type === "Gift Card") {
                      excludeAmount = excludeAmount + product.line_price;
                    }
                    if (gwpArray.includes(product.id)) {
                      pickGWPInCart = true;
                    }
                  });
                  reducedSubTotalCartPrice = subTotalCartPrice - excludeAmount;

                  if (codeless_gwp_id_1) {
                    let gwp_quant =
                      reducedSubTotalCartPrice >= codeless_gwp_thresh ? 1 : 0;
                    finalObject[parseInt(codeless_gwp_id_1)] = gwp_quant;
                    codeless_gwp_id_2 &&
                      (finalObject[parseInt(codeless_gwp_id_2)] = gwp_quant);
                  }

                  if (
                    pickGWPInCart &&
                    pickGWPThreshold > reducedSubTotalCartPrice
                  ) {
                    finalObject[parseInt(product1Id)] = 0;
                    finalObject[parseInt(product2Id)] = 0;
                    finalObject[parseInt(product3Id)] = 0;
                    product4Id && (finalObject[parseInt(product4Id)] = 0);
                  }
                }

                if (sample_prod_id && reducedSubTotalCartPrice >= 100) {
                  finalObject[parseInt(sample_prod_id)] = 1;
                } else if (sample_prod_id && reducedSubTotalCartPrice < 100) {
                  finalObject[parseInt(sample_prod_id)] = 0;
                }

                if (!codeless_gwp_id_1 && !sample_prod_id && !pickGWPInCart) {
                  updateCart(new_cart);
                } else {
                  $.ajax({
                    url: "/cart/update.js",
                    dataType: "json",
                    type: "post",
                    data: { updates: finalObject },
                    success: function () {
                      $.getJSON("/cart.js", function (new_cart) {
                        updateCart(new_cart);
                      });
                    },
                  });
                }
              });

              $form.removeClass("loading");
              $form.removeClass("fixed");

              if ($body.hasClass("template-product")) {
                if (!$(".fixed-form").hasClass("visible")) {
                  $body.addClass("full-height");
                }
              }

              $(".mini-cart").addClass("show");
            },
            error: function (XMLHttpRequest) {
              var response = eval("(" + XMLHttpRequest.responseText + ")");
              response = response.description;
              console.error(response);
              $form.removeClass("loading");
              $form.removeClass("fixed");
            },
          });
        });

        $(".util-cart a").on("click", function (e) {
          e.preventDefault();
          $miniCart.toggleClass("show");
        });

        $(document).mouseup(function (e) {
          const container = $(".mini-cart ");
          const gwpModal = $("#modal-gwp");
          if (
            !container.is(e.target) &&
            container.has(e.target).length === 0 &&
            (!gwpModal || gwpModal.has(e.target).length === 0)
          ) {
            $miniCart.removeClass("show");
            $("body").removeClass("full-height timeout");
          }
        });

        module.exports = {
          updateHtml: updateHtml,
        };
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 18 */
    /***/ function (module, exports, __webpack_require__) {
      // toObject with fallback for non-array-like ES3 strings
      var IndexedObject = __webpack_require__(13);
      var requireObjectCoercible = __webpack_require__(6);

      module.exports = function (it) {
        return IndexedObject(requireObjectCoercible(it));
      };

      /***/
    },
    /* 19 */
    /***/ function (module, exports) {
      var toString = {}.toString;

      module.exports = function (it) {
        return toString.call(it).slice(8, -1);
      };

      /***/
    },
    /* 20 */
    /***/ function (module, exports, __webpack_require__) {
      var DESCRIPTORS = __webpack_require__(5);
      var IE8_DOM_DEFINE = __webpack_require__(28);
      var anObject = __webpack_require__(10);
      var toPrimitive = __webpack_require__(27);

      var nativeDefineProperty = Object.defineProperty;

      // `Object.defineProperty` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperty
      exports.f = DESCRIPTORS
        ? nativeDefineProperty
        : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE)
              try {
                return nativeDefineProperty(O, P, Attributes);
              } catch (error) {
                /* empty */
              }
            if ("get" in Attributes || "set" in Attributes)
              throw TypeError("Accessors not supported");
            if ("value" in Attributes) O[P] = Attributes.value;
            return O;
          };

      /***/
    },
    /* 21 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var hide = __webpack_require__(7);

      module.exports = function (key, value) {
        try {
          hide(global, key, value);
        } catch (error) {
          global[key] = value;
        }
        return value;
      };

      /***/
    },
    /* 22 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var shared = __webpack_require__(14);
      var uid = __webpack_require__(31);
      var NATIVE_SYMBOL = __webpack_require__(67);

      var Symbol = global.Symbol;
      var store = shared("wks");

      module.exports = function (name) {
        return (
          store[name] ||
          (store[name] =
            (NATIVE_SYMBOL && Symbol[name]) ||
            (NATIVE_SYMBOL ? Symbol : uid)("Symbol." + name))
        );
      };

      /***/
    },
    /* 23 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var regexpFlags = __webpack_require__(80);

      var nativeExec = RegExp.prototype.exec;
      // This always refers to the native implementation, because the
      // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
      // which loads this file before patching the method.
      var nativeReplace = String.prototype.replace;

      var patchedExec = nativeExec;

      var UPDATES_LAST_INDEX_WRONG = (function () {
        var re1 = /a/;
        var re2 = /b*/g;
        nativeExec.call(re1, "a");
        nativeExec.call(re2, "a");
        return re1.lastIndex !== 0 || re2.lastIndex !== 0;
      })();

      // nonparticipating capturing group, copied from es5-shim's String#split patch.
      var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

      var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

      if (PATCH) {
        patchedExec = function exec(str) {
          var re = this;
          var lastIndex, reCopy, match, i;

          if (NPCG_INCLUDED) {
            reCopy = new RegExp(
              "^" + re.source + "$(?!\\s)",
              regexpFlags.call(re)
            );
          }
          if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

          match = nativeExec.call(re, str);

          if (UPDATES_LAST_INDEX_WRONG && match) {
            re.lastIndex = re.global
              ? match.index + match[0].length
              : lastIndex;
          }
          if (NPCG_INCLUDED && match && match.length > 1) {
            // Fix browsers whose `exec` methods don't consistently return `undefined`
            // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
            nativeReplace.call(match[0], reCopy, function () {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === undefined) match[i] = undefined;
              }
            });
          }

          return match;
        };
      }

      module.exports = patchedExec;

      /***/
    },
    /* 24 */
    /***/ function (module, exports, __webpack_require__) {
      var DESCRIPTORS = __webpack_require__(5);
      var propertyIsEnumerableModule = __webpack_require__(25);
      var createPropertyDescriptor = __webpack_require__(26);
      var toIndexedObject = __webpack_require__(18);
      var toPrimitive = __webpack_require__(27);
      var has = __webpack_require__(9);
      var IE8_DOM_DEFINE = __webpack_require__(28);

      var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
      exports.f = DESCRIPTORS
        ? nativeGetOwnPropertyDescriptor
        : function getOwnPropertyDescriptor(O, P) {
            O = toIndexedObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE)
              try {
                return nativeGetOwnPropertyDescriptor(O, P);
              } catch (error) {
                /* empty */
              }
            if (has(O, P))
              return createPropertyDescriptor(
                !propertyIsEnumerableModule.f.call(O, P),
                O[P]
              );
          };

      /***/
    },
    /* 25 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

      // Nashorn ~ JDK8 bug
      var NASHORN_BUG =
        getOwnPropertyDescriptor &&
        !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

      // `Object.prototype.propertyIsEnumerable` method implementation
      // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
      exports.f = NASHORN_BUG
        ? function propertyIsEnumerable(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable;
          }
        : nativePropertyIsEnumerable;

      /***/
    },
    /* 26 */
    /***/ function (module, exports) {
      module.exports = function (bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value,
        };
      };

      /***/
    },
    /* 27 */
    /***/ function (module, exports, __webpack_require__) {
      var isObject = __webpack_require__(8);

      // `ToPrimitive` abstract operation
      // https://tc39.github.io/ecma262/#sec-toprimitive
      // instead of the ES6 spec version, we didn't implement @@toPrimitive case
      // and the second argument - flag - preferred type is a string
      module.exports = function (input, PREFERRED_STRING) {
        if (!isObject(input)) return input;
        var fn, val;
        if (
          PREFERRED_STRING &&
          typeof (fn = input.toString) == "function" &&
          !isObject((val = fn.call(input)))
        )
          return val;
        if (
          typeof (fn = input.valueOf) == "function" &&
          !isObject((val = fn.call(input)))
        )
          return val;
        if (
          !PREFERRED_STRING &&
          typeof (fn = input.toString) == "function" &&
          !isObject((val = fn.call(input)))
        )
          return val;
        throw TypeError("Can't convert object to primitive value");
      };

      /***/
    },
    /* 28 */
    /***/ function (module, exports, __webpack_require__) {
      var DESCRIPTORS = __webpack_require__(5);
      var fails = __webpack_require__(2);
      var createElement = __webpack_require__(51);

      // Thank's IE8 for his funny defineProperty
      module.exports =
        !DESCRIPTORS &&
        !fails(function () {
          return (
            Object.defineProperty(createElement("div"), "a", {
              get: function () {
                return 7;
              },
            }).a != 7
          );
        });

      /***/
    },
    /* 29 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var shared = __webpack_require__(14);
      var hide = __webpack_require__(7);
      var has = __webpack_require__(9);
      var setGlobal = __webpack_require__(21);
      var nativeFunctionToString = __webpack_require__(30);
      var InternalStateModule = __webpack_require__(53);

      var getInternalState = InternalStateModule.get;
      var enforceInternalState = InternalStateModule.enforce;
      var TEMPLATE = String(nativeFunctionToString).split("toString");

      shared("inspectSource", function (it) {
        return nativeFunctionToString.call(it);
      });

      (module.exports = function (O, key, value, options) {
        var unsafe = options ? !!options.unsafe : false;
        var simple = options ? !!options.enumerable : false;
        var noTargetGet = options ? !!options.noTargetGet : false;
        if (typeof value == "function") {
          if (typeof key == "string" && !has(value, "name"))
            hide(value, "name", key);
          enforceInternalState(value).source = TEMPLATE.join(
            typeof key == "string" ? key : ""
          );
        }
        if (O === global) {
          if (simple) O[key] = value;
          else setGlobal(key, value);
          return;
        } else if (!unsafe) {
          delete O[key];
        } else if (!noTargetGet && O[key]) {
          simple = true;
        }
        if (simple) O[key] = value;
        else hide(O, key, value);
        // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
      })(Function.prototype, "toString", function toString() {
        return (
          (typeof this == "function" && getInternalState(this).source) ||
          nativeFunctionToString.call(this)
        );
      });

      /***/
    },
    /* 30 */
    /***/ function (module, exports, __webpack_require__) {
      var shared = __webpack_require__(14);

      module.exports = shared("native-function-to-string", Function.toString);

      /***/
    },
    /* 31 */
    /***/ function (module, exports) {
      var id = 0;
      var postfix = Math.random();

      module.exports = function (key) {
        return (
          "Symbol(" +
          String(key === undefined ? "" : key) +
          ")_" +
          (++id + postfix).toString(36)
        );
      };

      /***/
    },
    /* 32 */
    /***/ function (module, exports) {
      module.exports = {};

      /***/
    },
    /* 33 */
    /***/ function (module, exports, __webpack_require__) {
      var has = __webpack_require__(9);
      var toIndexedObject = __webpack_require__(18);
      var indexOf = __webpack_require__(61).indexOf;
      var hiddenKeys = __webpack_require__(32);

      module.exports = function (object, names) {
        var O = toIndexedObject(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
        // Don't enum bug & hidden keys
        while (names.length > i)
          if (has(O, (key = names[i++]))) {
            ~indexOf(result, key) || result.push(key);
          }
        return result;
      };

      /***/
    },
    /* 34 */
    /***/ function (module, exports) {
      // IE8- don't enum bug keys
      module.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ];

      /***/
    },
    /* 35 */
    /***/ function (module, exports) {
      exports.f = Object.getOwnPropertySymbols;

      /***/
    },
    /* 36 */
    /***/ function (module, exports, __webpack_require__) {
      var bind = __webpack_require__(64);
      var IndexedObject = __webpack_require__(13);
      var toObject = __webpack_require__(16);
      var toLength = __webpack_require__(11);
      var arraySpeciesCreate = __webpack_require__(65);

      var push = [].push;

      // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
      var createMethod = function (TYPE) {
        var IS_MAP = TYPE == 1;
        var IS_FILTER = TYPE == 2;
        var IS_SOME = TYPE == 3;
        var IS_EVERY = TYPE == 4;
        var IS_FIND_INDEX = TYPE == 6;
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
        return function ($this, callbackfn, that, specificCreate) {
          var O = toObject($this);
          var self = IndexedObject(O);
          var boundFunction = bind(callbackfn, that, 3);
          var length = toLength(self.length);
          var index = 0;
          var create = specificCreate || arraySpeciesCreate;
          var target = IS_MAP
            ? create($this, length)
            : IS_FILTER
            ? create($this, 0)
            : undefined;
          var value, result;
          for (; length > index; index++)
            if (NO_HOLES || index in self) {
              value = self[index];
              result = boundFunction(value, index, O);
              if (TYPE) {
                if (IS_MAP) target[index] = result;
                // map
                else if (result)
                  switch (TYPE) {
                    case 3:
                      return true; // some
                    case 5:
                      return value; // find
                    case 6:
                      return index; // findIndex
                    case 2:
                      push.call(target, value); // filter
                  }
                else if (IS_EVERY) return false; // every
              }
            }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };

      module.exports = {
        // `Array.prototype.forEach` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
        forEach: createMethod(0),
        // `Array.prototype.map` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.map
        map: createMethod(1),
        // `Array.prototype.filter` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.filter
        filter: createMethod(2),
        // `Array.prototype.some` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.some
        some: createMethod(3),
        // `Array.prototype.every` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.every
        every: createMethod(4),
        // `Array.prototype.find` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.find
        find: createMethod(5),
        // `Array.prototype.findIndex` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
        findIndex: createMethod(6),
      };

      /***/
    },
    /* 37 */
    /***/ function (module, exports) {
      module.exports = function (it) {
        if (typeof it != "function") {
          throw TypeError(String(it) + " is not a function");
        }
        return it;
      };

      /***/
    },
    /* 38 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var $forEach = __webpack_require__(36).forEach;
      var sloppyArrayMethod = __webpack_require__(39);

      // `Array.prototype.forEach` method implementation
      // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
      module.exports = sloppyArrayMethod("forEach")
        ? function forEach(callbackfn /* , thisArg */) {
            return $forEach(
              this,
              callbackfn,
              arguments.length > 1 ? arguments[1] : undefined
            );
          }
        : [].forEach;

      /***/
    },
    /* 39 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var fails = __webpack_require__(2);

      module.exports = function (METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return (
          !method ||
          !fails(function () {
            // eslint-disable-next-line no-useless-call,no-throw-literal
            method.call(
              null,
              argument ||
                function () {
                  throw 1;
                },
              1
            );
          })
        );
      };

      /***/
    },
    /* 40 */
    /***/ function (module, exports) {
      // a string of all valid unicode whitespaces
      // eslint-disable-next-line max-len
      module.exports =
        "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

      /***/
    },
    /* 41 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var hide = __webpack_require__(7);
      var redefine = __webpack_require__(29);
      var fails = __webpack_require__(2);
      var wellKnownSymbol = __webpack_require__(22);
      var regexpExec = __webpack_require__(23);

      var SPECIES = wellKnownSymbol("species");

      var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
        // #replace needs built-in support for named groups.
        // #match works fine because it just return the exec results, even if it has
        // a "grops" property.
        var re = /./;
        re.exec = function () {
          var result = [];
          result.groups = { a: "7" };
          return result;
        };
        return "".replace(re, "$<a>") !== "7";
      });

      // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
      // Weex JS has frozen built-in prototypes, so use try / catch wrapper
      var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function () {
          return originalExec.apply(this, arguments);
        };
        var result = "ab".split(re);
        return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
      });

      module.exports = function (KEY, length, exec, sham) {
        var SYMBOL = wellKnownSymbol(KEY);

        var DELEGATES_TO_SYMBOL = !fails(function () {
          // String methods call symbol-named RegEp methods
          var O = {};
          O[SYMBOL] = function () {
            return 7;
          };
          return ""[KEY](O) != 7;
        });

        var DELEGATES_TO_EXEC =
          DELEGATES_TO_SYMBOL &&
          !fails(function () {
            // Symbol-named RegExp methods call .exec
            var execCalled = false;
            var re = /a/;
            re.exec = function () {
              execCalled = true;
              return null;
            };

            if (KEY === "split") {
              // RegExp[@@split] doesn't call the regex's exec method, but first creates
              // a new one. We need to return the patched regex when creating the new one.
              re.constructor = {};
              re.constructor[SPECIES] = function () {
                return re;
              };
            }

            re[SYMBOL]("");
            return !execCalled;
          });

        if (
          !DELEGATES_TO_SYMBOL ||
          !DELEGATES_TO_EXEC ||
          (KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
          (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
        ) {
          var nativeRegExpMethod = /./[SYMBOL];
          var methods = exec(
            SYMBOL,
            ""[KEY],
            function (nativeMethod, regexp, str, arg2, forceStringMethod) {
              if (regexp.exec === regexpExec) {
                if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                  // The native String method already delegates to @@method (this
                  // polyfilled function), leasing to infinite recursion.
                  // We avoid it by directly calling the native @@method method.
                  return {
                    done: true,
                    value: nativeRegExpMethod.call(regexp, str, arg2),
                  };
                }
                return {
                  done: true,
                  value: nativeMethod.call(str, regexp, arg2),
                };
              }
              return { done: false };
            }
          );
          var stringMethod = methods[0];
          var regexMethod = methods[1];

          redefine(String.prototype, KEY, stringMethod);
          redefine(
            RegExp.prototype,
            SYMBOL,
            length == 2
              ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
                // 21.2.5.11 RegExp.prototype[@@split](string, limit)
                function (string, arg) {
                  return regexMethod.call(string, this, arg);
                }
              : // 21.2.5.6 RegExp.prototype[@@match](string)
                // 21.2.5.9 RegExp.prototype[@@search](string)
                function (string) {
                  return regexMethod.call(string, this);
                }
          );
          if (sham) hide(RegExp.prototype[SYMBOL], "sham", true);
        }
      };

      /***/
    },
    /* 42 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var charAt = __webpack_require__(82).charAt;

      // `AdvanceStringIndex` abstract operation
      // https://tc39.github.io/ecma262/#sec-advancestringindex
      module.exports = function (S, index, unicode) {
        return index + (unicode ? charAt(S, index).length : 1);
      };

      /***/
    },
    /* 43 */
    /***/ function (module, exports, __webpack_require__) {
      var classof = __webpack_require__(19);
      var regexpExec = __webpack_require__(23);

      // `RegExpExec` abstract operation
      // https://tc39.github.io/ecma262/#sec-regexpexec
      module.exports = function (R, S) {
        var exec = R.exec;
        if (typeof exec === "function") {
          var result = exec.call(R, S);
          if (typeof result !== "object") {
            throw TypeError(
              "RegExp exec method returned something other than an Object or null"
            );
          }
          return result;
        }

        if (classof(R) !== "RegExp") {
          throw TypeError("RegExp#exec called on incompatible receiver");
        }

        return regexpExec.call(R, S);
      };

      /***/
    },
    /* 44 */
    /***/ function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__,
        __WEBPACK_AMD_DEFINE_ARRAY__,
        __WEBPACK_AMD_DEFINE_RESULT__; /*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
      /* global window, document, define, jQuery, setInterval, clearInterval */
      (function (factory) {
        "use strict";
        if (true) {
          !((__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)]),
          (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
          (__WEBPACK_AMD_DEFINE_RESULT__ =
            typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
              ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                  exports,
                  __WEBPACK_AMD_DEFINE_ARRAY__
                )
              : __WEBPACK_AMD_DEFINE_FACTORY__),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
            (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (typeof exports !== "undefined") {
          module.exports = factory(require("jquery"));
        } else {
          factory(jQuery);
        }
      })(function ($) {
        "use strict";
        var Slick = window.Slick || {};

        Slick = (function () {
          var instanceUid = 0;

          function Slick(element, settings) {
            var _ = this,
              dataSettings;

            _.defaults = {
              accessibility: true,
              adaptiveHeight: false,
              appendArrows: $(element),
              appendDots: $(element),
              arrows: true,
              asNavFor: null,
              prevArrow:
                '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
              nextArrow:
                '<button class="slick-next" aria-label="Next" type="button">Next</button>',
              autoplay: false,
              autoplaySpeed: 3000,
              centerMode: false,
              centerPadding: "50px",
              cssEase: "ease",
              customPaging: function (slider, i) {
                return $('<button type="button" />').text(i + 1);
              },
              dots: false,
              dotsClass: "slick-dots",
              draggable: true,
              easing: "linear",
              edgeFriction: 0.35,
              fade: false,
              focusOnSelect: false,
              focusOnChange: false,
              infinite: true,
              initialSlide: 0,
              lazyLoad: "ondemand",
              mobileFirst: false,
              pauseOnHover: true,
              pauseOnFocus: true,
              pauseOnDotsHover: false,
              respondTo: "window",
              responsive: null,
              rows: 1,
              rtl: false,
              slide: "",
              slidesPerRow: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: 500,
              swipe: true,
              swipeToSlide: false,
              touchMove: true,
              touchThreshold: 5,
              useCSS: true,
              useTransform: true,
              variableWidth: false,
              vertical: false,
              verticalSwiping: false,
              waitForAnimate: true,
              zIndex: 1000,
            };

            _.initials = {
              animating: false,
              dragging: false,
              autoPlayTimer: null,
              currentDirection: 0,
              currentLeft: null,
              currentSlide: 0,
              direction: 1,
              $dots: null,
              listWidth: null,
              listHeight: null,
              loadIndex: 0,
              $nextArrow: null,
              $prevArrow: null,
              scrolling: false,
              slideCount: null,
              slideWidth: null,
              $slideTrack: null,
              $slides: null,
              sliding: false,
              slideOffset: 0,
              swipeLeft: null,
              swiping: false,
              $list: null,
              touchObject: {},
              transformsEnabled: false,
              unslicked: false,
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = "hidden";
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = "visibilitychange";
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data("slick") || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== "undefined") {
              _.hidden = "mozHidden";
              _.visibilityChange = "mozvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
              _.hidden = "webkitHidden";
              _.visibilityChange = "webkitvisibilitychange";
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

            _.registerBreakpoints();
            _.init(true);
          }

          return Slick;
        })();

        Slick.prototype.activateADA = function () {
          var _ = this;

          _.$slideTrack
            .find(".slick-active")
            .attr({
              "aria-hidden": "false",
            })
            .find("a, input, button, select")
            .attr({
              tabindex: "0",
            });
        };

        Slick.prototype.addSlide = Slick.prototype.slickAdd = function (
          markup,
          index,
          addBefore
        ) {
          var _ = this;

          if (typeof index === "boolean") {
            addBefore = index;
            index = null;
          } else if (index < 0 || index >= _.slideCount) {
            return false;
          }

          _.unload();

          if (typeof index === "number") {
            if (index === 0 && _.$slides.length === 0) {
              $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
              $(markup).insertBefore(_.$slides.eq(index));
            } else {
              $(markup).insertAfter(_.$slides.eq(index));
            }
          } else {
            if (addBefore === true) {
              $(markup).prependTo(_.$slideTrack);
            } else {
              $(markup).appendTo(_.$slideTrack);
            }
          }

          _.$slides = _.$slideTrack.children(this.options.slide);

          _.$slideTrack.children(this.options.slide).detach();

          _.$slideTrack.append(_.$slides);

          _.$slides.each(function (index, element) {
            $(element).attr("data-slick-index", index);
          });

          _.$slidesCache = _.$slides;

          _.reinit();
        };

        Slick.prototype.animateHeight = function () {
          var _ = this;
          if (
            _.options.slidesToShow === 1 &&
            _.options.adaptiveHeight === true &&
            _.options.vertical === false
          ) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate(
              {
                height: targetHeight,
              },
              _.options.speed
            );
          }
        };

        Slick.prototype.animateSlide = function (targetLeft, callback) {
          var animProps = {},
            _ = this;

          _.animateHeight();

          if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
          }
          if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
              _.$slideTrack.animate(
                {
                  left: targetLeft,
                },
                _.options.speed,
                _.options.easing,
                callback
              );
            } else {
              _.$slideTrack.animate(
                {
                  top: targetLeft,
                },
                _.options.speed,
                _.options.easing,
                callback
              );
            }
          } else {
            if (_.cssTransitions === false) {
              if (_.options.rtl === true) {
                _.currentLeft = -_.currentLeft;
              }
              $({
                animStart: _.currentLeft,
              }).animate(
                {
                  animStart: targetLeft,
                },
                {
                  duration: _.options.speed,
                  easing: _.options.easing,
                  step: function (now) {
                    now = Math.ceil(now);
                    if (_.options.vertical === false) {
                      animProps[_.animType] = "translate(" + now + "px, 0px)";
                      _.$slideTrack.css(animProps);
                    } else {
                      animProps[_.animType] = "translate(0px," + now + "px)";
                      _.$slideTrack.css(animProps);
                    }
                  },
                  complete: function () {
                    if (callback) {
                      callback.call();
                    }
                  },
                }
              );
            } else {
              _.applyTransition();
              targetLeft = Math.ceil(targetLeft);

              if (_.options.vertical === false) {
                animProps[_.animType] =
                  "translate3d(" + targetLeft + "px, 0px, 0px)";
              } else {
                animProps[_.animType] =
                  "translate3d(0px," + targetLeft + "px, 0px)";
              }
              _.$slideTrack.css(animProps);

              if (callback) {
                setTimeout(function () {
                  _.disableTransition();

                  callback.call();
                }, _.options.speed);
              }
            }
          }
        };

        Slick.prototype.getNavTarget = function () {
          var _ = this,
            asNavFor = _.options.asNavFor;

          if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider);
          }

          return asNavFor;
        };

        Slick.prototype.asNavFor = function (index) {
          var _ = this,
            asNavFor = _.getNavTarget();

          if (asNavFor !== null && typeof asNavFor === "object") {
            asNavFor.each(function () {
              var target = $(this).slick("getSlick");
              if (!target.unslicked) {
                target.slideHandler(index, true);
              }
            });
          }
        };

        Slick.prototype.applyTransition = function (slide) {
          var _ = this,
            transition = {};

          if (_.options.fade === false) {
            transition[_.transitionType] =
              _.transformType +
              " " +
              _.options.speed +
              "ms " +
              _.options.cssEase;
          } else {
            transition[_.transitionType] =
              "opacity " + _.options.speed + "ms " + _.options.cssEase;
          }

          if (_.options.fade === false) {
            _.$slideTrack.css(transition);
          } else {
            _.$slides.eq(slide).css(transition);
          }
        };

        Slick.prototype.autoPlay = function () {
          var _ = this;

          _.autoPlayClear();

          if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(
              _.autoPlayIterator,
              _.options.autoplaySpeed
            );
          }
        };

        Slick.prototype.autoPlayClear = function () {
          var _ = this;

          if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
          }
        };

        Slick.prototype.autoPlayIterator = function () {
          var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

          if (!_.paused && !_.interrupted && !_.focussed) {
            if (_.options.infinite === false) {
              if (
                _.direction === 1 &&
                _.currentSlide + 1 === _.slideCount - 1
              ) {
                _.direction = 0;
              } else if (_.direction === 0) {
                slideTo = _.currentSlide - _.options.slidesToScroll;

                if (_.currentSlide - 1 === 0) {
                  _.direction = 1;
                }
              }
            }

            _.slideHandler(slideTo);
          }
        };

        Slick.prototype.buildArrows = function () {
          var _ = this;

          if (_.options.arrows === true) {
            _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
            _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");

            if (_.slideCount > _.options.slidesToShow) {
              _.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex");
              _.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex");

              if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.prependTo(_.options.appendArrows);
              }

              if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.appendTo(_.options.appendArrows);
              }

              if (_.options.infinite !== true) {
                _.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true");
              }
            } else {
              _.$prevArrow
                .add(_.$nextArrow)

                .addClass("slick-hidden")
                .attr({
                  "aria-disabled": "true",
                  tabindex: "-1",
                });
            }
          }
        };

        Slick.prototype.buildDots = function () {
          var _ = this,
            i,
            dot;

          if (
            _.options.dots === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$slider.addClass("slick-dotted");

            dot = $("<ul />").addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
              dot.append(
                $("<li />").append(_.options.customPaging.call(this, _, i))
              );
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find("li").first().addClass("slick-active");
          }
        };

        Slick.prototype.buildOut = function () {
          var _ = this;

          _.$slides = _.$slider
            .children(_.options.slide + ":not(.slick-cloned)")
            .addClass("slick-slide");

          _.slideCount = _.$slides.length;

          _.$slides.each(function (index, element) {
            $(element)
              .attr("data-slick-index", index)
              .data("originalStyling", $(element).attr("style") || "");
          });

          _.$slider.addClass("slick-slider");

          _.$slideTrack =
            _.slideCount === 0
              ? $('<div class="slick-track"/>').appendTo(_.$slider)
              : _.$slides.wrapAll('<div class="slick-track"/>').parent();

          _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
          _.$slideTrack.css("opacity", 0);

          if (
            _.options.centerMode === true ||
            _.options.swipeToSlide === true
          ) {
            _.options.slidesToScroll = 1;
          }

          $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");

          _.setupInfinite();

          _.buildArrows();

          _.buildDots();

          _.updateDots();

          _.setSlideClasses(
            typeof _.currentSlide === "number" ? _.currentSlide : 0
          );

          if (_.options.draggable === true) {
            _.$list.addClass("draggable");
          }
        };

        Slick.prototype.buildRows = function () {
          var _ = this,
            a,
            b,
            c,
            newSlides,
            numOfSlides,
            originalSlides,
            slidesPerSection;

          newSlides = document.createDocumentFragment();
          originalSlides = _.$slider.children();

          if (_.options.rows > 0) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

            for (a = 0; a < numOfSlides; a++) {
              var slide = document.createElement("div");
              for (b = 0; b < _.options.rows; b++) {
                var row = document.createElement("div");
                for (c = 0; c < _.options.slidesPerRow; c++) {
                  var target =
                    a * slidesPerSection + (b * _.options.slidesPerRow + c);
                  if (originalSlides.get(target)) {
                    row.appendChild(originalSlides.get(target));
                  }
                }
                slide.appendChild(row);
              }
              newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / _.options.slidesPerRow + "%",
                display: "inline-block",
              });
          }
        };

        Slick.prototype.checkResponsive = function (initial, forceUpdate) {
          var _ = this,
            breakpoint,
            targetBreakpoint,
            respondToWidth,
            triggerBreakpoint = false;
          var sliderWidth = _.$slider.width();
          var windowWidth = window.innerWidth || $(window).width();

          if (_.respondTo === "window") {
            respondToWidth = windowWidth;
          } else if (_.respondTo === "slider") {
            respondToWidth = sliderWidth;
          } else if (_.respondTo === "min") {
            respondToWidth = Math.min(windowWidth, sliderWidth);
          }

          if (
            _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null
          ) {
            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
              if (_.breakpoints.hasOwnProperty(breakpoint)) {
                if (_.originalSettings.mobileFirst === false) {
                  if (respondToWidth < _.breakpoints[breakpoint]) {
                    targetBreakpoint = _.breakpoints[breakpoint];
                  }
                } else {
                  if (respondToWidth > _.breakpoints[breakpoint]) {
                    targetBreakpoint = _.breakpoints[breakpoint];
                  }
                }
              }
            }

            if (targetBreakpoint !== null) {
              if (_.activeBreakpoint !== null) {
                if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                  _.activeBreakpoint = targetBreakpoint;
                  if (_.breakpointSettings[targetBreakpoint] === "unslick") {
                    _.unslick(targetBreakpoint);
                  } else {
                    _.options = $.extend(
                      {},
                      _.originalSettings,
                      _.breakpointSettings[targetBreakpoint]
                    );
                    if (initial === true) {
                      _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                  }
                  triggerBreakpoint = targetBreakpoint;
                }
              } else {
                _.activeBreakpoint = targetBreakpoint;
                if (_.breakpointSettings[targetBreakpoint] === "unslick") {
                  _.unslick(targetBreakpoint);
                } else {
                  _.options = $.extend(
                    {},
                    _.originalSettings,
                    _.breakpointSettings[targetBreakpoint]
                  );
                  if (initial === true) {
                    _.currentSlide = _.options.initialSlide;
                  }
                  _.refresh(initial);
                }
                triggerBreakpoint = targetBreakpoint;
              }
            } else {
              if (_.activeBreakpoint !== null) {
                _.activeBreakpoint = null;
                _.options = _.originalSettings;
                if (initial === true) {
                  _.currentSlide = _.options.initialSlide;
                }
                _.refresh(initial);
                triggerBreakpoint = targetBreakpoint;
              }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if (!initial && triggerBreakpoint !== false) {
              _.$slider.trigger("breakpoint", [_, triggerBreakpoint]);
            }
          }
        };

        Slick.prototype.changeSlide = function (event, dontAnimate) {
          var _ = this,
            $target = $(event.currentTarget),
            indexOffset,
            slideOffset,
            unevenOffset;

          // If target is a link, prevent default action.
          if ($target.is("a")) {
            event.preventDefault();
          }

          // If target is not the <li> element (ie: a child), find the <li>.
          if (!$target.is("li")) {
            $target = $target.closest("li");
          }

          unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
          indexOffset = unevenOffset
            ? 0
            : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

          switch (event.data.message) {
            case "previous":
              slideOffset =
                indexOffset === 0
                  ? _.options.slidesToScroll
                  : _.options.slidesToShow - indexOffset;
              if (_.slideCount > _.options.slidesToShow) {
                _.slideHandler(
                  _.currentSlide - slideOffset,
                  false,
                  dontAnimate
                );
              }
              break;

            case "next":
              slideOffset =
                indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
              if (_.slideCount > _.options.slidesToShow) {
                _.slideHandler(
                  _.currentSlide + slideOffset,
                  false,
                  dontAnimate
                );
              }
              break;

            case "index":
              var index =
                event.data.index === 0
                  ? 0
                  : event.data.index ||
                    $target.index() * _.options.slidesToScroll;

              _.slideHandler(_.checkNavigable(index), false, dontAnimate);
              $target.children().trigger("focus");
              break;

            default:
              return;
          }
        };

        Slick.prototype.checkNavigable = function (index) {
          var _ = this,
            navigables,
            prevNavigable;

          navigables = _.getNavigableIndexes();
          prevNavigable = 0;
          if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
          } else {
            for (var n in navigables) {
              if (index < navigables[n]) {
                index = prevNavigable;
                break;
              }
              prevNavigable = navigables[n];
            }
          }

          return index;
        };

        Slick.prototype.cleanUpEvents = function () {
          var _ = this;

          if (_.options.dots && _.$dots !== null) {
            $("li", _.$dots)
              .off("click.slick", _.changeSlide)
              .off("mouseenter.slick", $.proxy(_.interrupt, _, true))
              .off("mouseleave.slick", $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
              _.$dots.off("keydown.slick", _.keyHandler);
            }
          }

          _.$slider.off("focus.slick blur.slick");

          if (
            _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
            _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);

            if (_.options.accessibility === true) {
              _.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler);
              _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler);
            }
          }

          _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
          _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
          _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
          _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);

          _.$list.off("click.slick", _.clickHandler);

          $(document).off(_.visibilityChange, _.visibility);

          _.cleanUpSlideEvents();

          if (_.options.accessibility === true) {
            _.$list.off("keydown.slick", _.keyHandler);
          }

          if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off("click.slick", _.selectHandler);
          }

          $(window).off(
            "orientationchange.slick.slick-" + _.instanceUid,
            _.orientationChange
          );

          $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);

          $("[draggable!=true]", _.$slideTrack).off(
            "dragstart",
            _.preventDefault
          );

          $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition);
        };

        Slick.prototype.cleanUpSlideEvents = function () {
          var _ = this;

          _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
          _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false));
        };

        Slick.prototype.cleanUpRows = function () {
          var _ = this,
            originalSlides;

          if (_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr("style");
            _.$slider.empty().append(originalSlides);
          }
        };

        Slick.prototype.clickHandler = function (event) {
          var _ = this;

          if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
          }
        };

        Slick.prototype.destroy = function (refresh) {
          var _ = this;

          _.autoPlayClear();

          _.touchObject = {};

          _.cleanUpEvents();

          $(".slick-cloned", _.$slider).detach();

          if (_.$dots) {
            _.$dots.remove();
          }

          if (_.$prevArrow && _.$prevArrow.length) {
            _.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", "");

            if (_.htmlExpr.test(_.options.prevArrow)) {
              _.$prevArrow.remove();
            }
          }

          if (_.$nextArrow && _.$nextArrow.length) {
            _.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", "");

            if (_.htmlExpr.test(_.options.nextArrow)) {
              _.$nextArrow.remove();
            }
          }

          if (_.$slides) {
            _.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                $(this).attr("style", $(this).data("originalStyling"));
              });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
          }

          _.cleanUpRows();

          _.$slider.removeClass("slick-slider");
          _.$slider.removeClass("slick-initialized");
          _.$slider.removeClass("slick-dotted");

          _.unslicked = true;

          if (!refresh) {
            _.$slider.trigger("destroy", [_]);
          }
        };

        Slick.prototype.disableTransition = function (slide) {
          var _ = this,
            transition = {};

          transition[_.transitionType] = "";

          if (_.options.fade === false) {
            _.$slideTrack.css(transition);
          } else {
            _.$slides.eq(slide).css(transition);
          }
        };

        Slick.prototype.fadeSlide = function (slideIndex, callback) {
          var _ = this;

          if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({
              zIndex: _.options.zIndex,
            });

            _.$slides.eq(slideIndex).animate(
              {
                opacity: 1,
              },
              _.options.speed,
              _.options.easing,
              callback
            );
          } else {
            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
              opacity: 1,
              zIndex: _.options.zIndex,
            });

            if (callback) {
              setTimeout(function () {
                _.disableTransition(slideIndex);

                callback.call();
              }, _.options.speed);
            }
          }
        };

        Slick.prototype.fadeSlideOut = function (slideIndex) {
          var _ = this;

          if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).animate(
              {
                opacity: 0,
                zIndex: _.options.zIndex - 2,
              },
              _.options.speed,
              _.options.easing
            );
          } else {
            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
              opacity: 0,
              zIndex: _.options.zIndex - 2,
            });
          }
        };

        Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (
          filter
        ) {
          var _ = this;

          if (filter !== null) {
            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();
          }
        };

        Slick.prototype.focusHandler = function () {
          var _ = this;

          _.$slider
            .off("focus.slick blur.slick")
            .on("focus.slick blur.slick", "*", function (event) {
              event.stopImmediatePropagation();
              var $sf = $(this);

              setTimeout(function () {
                if (_.options.pauseOnFocus) {
                  _.focussed = $sf.is(":focus");
                  _.autoPlay();
                }
              }, 0);
            });
        };

        Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide =
          function () {
            var _ = this;
            return _.currentSlide;
          };

        Slick.prototype.getDotCount = function () {
          var _ = this;

          var breakPoint = 0;
          var counter = 0;
          var pagerQty = 0;

          if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
              ++pagerQty;
            } else {
              while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter +=
                  _.options.slidesToScroll <= _.options.slidesToShow
                    ? _.options.slidesToScroll
                    : _.options.slidesToShow;
              }
            }
          } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
          } else if (!_.options.asNavFor) {
            pagerQty =
              1 +
              Math.ceil(
                (_.slideCount - _.options.slidesToShow) /
                  _.options.slidesToScroll
              );
          } else {
            while (breakPoint < _.slideCount) {
              ++pagerQty;
              breakPoint = counter + _.options.slidesToScroll;
              counter +=
                _.options.slidesToScroll <= _.options.slidesToShow
                  ? _.options.slidesToScroll
                  : _.options.slidesToShow;
            }
          }

          return pagerQty - 1;
        };

        Slick.prototype.getLeft = function (slideIndex) {
          var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

          _.slideOffset = 0;
          verticalHeight = _.$slides.first().outerHeight(true);

          if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
              _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
              coef = -1;

              if (
                _.options.vertical === true &&
                _.options.centerMode === true
              ) {
                if (_.options.slidesToShow === 2) {
                  coef = -1.5;
                } else if (_.options.slidesToShow === 1) {
                  coef = -2;
                }
              }
              verticalOffset = verticalHeight * _.options.slidesToShow * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
              if (
                slideIndex + _.options.slidesToScroll > _.slideCount &&
                _.slideCount > _.options.slidesToShow
              ) {
                if (slideIndex > _.slideCount) {
                  _.slideOffset =
                    (_.options.slidesToShow - (slideIndex - _.slideCount)) *
                    _.slideWidth *
                    -1;
                  verticalOffset =
                    (_.options.slidesToShow - (slideIndex - _.slideCount)) *
                    verticalHeight *
                    -1;
                } else {
                  _.slideOffset =
                    (_.slideCount % _.options.slidesToScroll) *
                    _.slideWidth *
                    -1;
                  verticalOffset =
                    (_.slideCount % _.options.slidesToScroll) *
                    verticalHeight *
                    -1;
                }
              }
            }
          } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
              _.slideOffset =
                (slideIndex + _.options.slidesToShow - _.slideCount) *
                _.slideWidth;
              verticalOffset =
                (slideIndex + _.options.slidesToShow - _.slideCount) *
                verticalHeight;
            }
          }

          if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
          }

          if (
            _.options.centerMode === true &&
            _.slideCount <= _.options.slidesToShow
          ) {
            _.slideOffset =
              (_.slideWidth * Math.floor(_.options.slidesToShow)) / 2 -
              (_.slideWidth * _.slideCount) / 2;
          } else if (
            _.options.centerMode === true &&
            _.options.infinite === true
          ) {
            _.slideOffset +=
              _.slideWidth * Math.floor(_.options.slidesToShow / 2) -
              _.slideWidth;
          } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset +=
              _.slideWidth * Math.floor(_.options.slidesToShow / 2);
          }

          if (_.options.vertical === false) {
            targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
          } else {
            targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
          }

          if (_.options.variableWidth === true) {
            if (
              _.slideCount <= _.options.slidesToShow ||
              _.options.infinite === false
            ) {
              targetSlide = _.$slideTrack
                .children(".slick-slide")
                .eq(slideIndex);
            } else {
              targetSlide = _.$slideTrack
                .children(".slick-slide")
                .eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
              if (targetSlide[0]) {
                targetLeft =
                  (_.$slideTrack.width() -
                    targetSlide[0].offsetLeft -
                    targetSlide.width()) *
                  -1;
              } else {
                targetLeft = 0;
              }
            } else {
              targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
              if (
                _.slideCount <= _.options.slidesToShow ||
                _.options.infinite === false
              ) {
                targetSlide = _.$slideTrack
                  .children(".slick-slide")
                  .eq(slideIndex);
              } else {
                targetSlide = _.$slideTrack
                  .children(".slick-slide")
                  .eq(slideIndex + _.options.slidesToShow + 1);
              }

              if (_.options.rtl === true) {
                if (targetSlide[0]) {
                  targetLeft =
                    (_.$slideTrack.width() -
                      targetSlide[0].offsetLeft -
                      targetSlide.width()) *
                    -1;
                } else {
                  targetLeft = 0;
                }
              } else {
                targetLeft = targetSlide[0]
                  ? targetSlide[0].offsetLeft * -1
                  : 0;
              }

              targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
          }

          return targetLeft;
        };

        Slick.prototype.getOption = Slick.prototype.slickGetOption = function (
          option
        ) {
          var _ = this;

          return _.options[option];
        };

        Slick.prototype.getNavigableIndexes = function () {
          var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

          if (_.options.infinite === false) {
            max = _.slideCount;
          } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
          }

          while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter +=
              _.options.slidesToScroll <= _.options.slidesToShow
                ? _.options.slidesToScroll
                : _.options.slidesToShow;
          }

          return indexes;
        };

        Slick.prototype.getSlick = function () {
          return this;
        };

        Slick.prototype.getSlideCount = function () {
          var _ = this,
            slidesTraversed,
            swipedSlide,
            centerOffset;

          centerOffset =
            _.options.centerMode === true
              ? _.slideWidth * Math.floor(_.options.slidesToShow / 2)
              : 0;

          if (_.options.swipeToSlide === true) {
            _.$slideTrack.find(".slick-slide").each(function (index, slide) {
              if (
                slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 >
                _.swipeLeft * -1
              ) {
                swipedSlide = slide;
                return false;
              }
            });

            slidesTraversed =
              Math.abs(
                $(swipedSlide).attr("data-slick-index") - _.currentSlide
              ) || 1;

            return slidesTraversed;
          } else {
            return _.options.slidesToScroll;
          }
        };

        Slick.prototype.goTo = Slick.prototype.slickGoTo = function (
          slide,
          dontAnimate
        ) {
          var _ = this;

          _.changeSlide(
            {
              data: {
                message: "index",
                index: parseInt(slide),
              },
            },
            dontAnimate
          );
        };

        Slick.prototype.init = function (creation) {
          var _ = this;

          if (!$(_.$slider).hasClass("slick-initialized")) {
            $(_.$slider).addClass("slick-initialized");

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
          }

          if (creation) {
            _.$slider.trigger("init", [_]);
          }

          if (_.options.accessibility === true) {
            _.initADA();
          }

          if (_.options.autoplay) {
            _.paused = false;
            _.autoPlay();
          }
        };

        Slick.prototype.initADA = function () {
          var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
              return val >= 0 && val < _.slideCount;
            });

          _.$slides
            .add(_.$slideTrack.find(".slick-cloned"))
            .attr({
              "aria-hidden": "true",
              tabindex: "-1",
            })
            .find("a, input, button, select")
            .attr({
              tabindex: "-1",
            });

          if (_.$dots !== null) {
            _.$slides
              .not(_.$slideTrack.find(".slick-cloned"))
              .each(function (i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + _.instanceUid + i,
                  tabindex: -1,
                });

                if (slideControlIndex !== -1) {
                  var ariaButtonControl =
                    "slick-slide-control" + _.instanceUid + slideControlIndex;
                  if ($("#" + ariaButtonControl).length) {
                    $(this).attr({
                      "aria-describedby": ariaButtonControl,
                    });
                  }
                }
              });

            _.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                  role: "presentation",
                });

                $(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + _.instanceUid + i,
                    "aria-controls":
                      "slick-slide" + _.instanceUid + mappedSlideIndex,
                    "aria-label": i + 1 + " of " + numDotGroups,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
              })
              .eq(_.currentSlide)
              .find("button")
              .attr({
                "aria-selected": "true",
                tabindex: "0",
              })
              .end();
          }

          for (
            var i = _.currentSlide, max = i + _.options.slidesToShow;
            i < max;
            i++
          ) {
            if (_.options.focusOnChange) {
              _.$slides.eq(i).attr({ tabindex: "0" });
            } else {
              _.$slides.eq(i).removeAttr("tabindex");
            }
          }

          _.activateADA();
        };

        Slick.prototype.initArrowEvents = function () {
          var _ = this;

          if (
            _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$prevArrow.off("click.slick").on(
              "click.slick",
              {
                message: "previous",
              },
              _.changeSlide
            );
            _.$nextArrow.off("click.slick").on(
              "click.slick",
              {
                message: "next",
              },
              _.changeSlide
            );

            if (_.options.accessibility === true) {
              _.$prevArrow.on("keydown.slick", _.keyHandler);
              _.$nextArrow.on("keydown.slick", _.keyHandler);
            }
          }
        };

        Slick.prototype.initDotEvents = function () {
          var _ = this;

          if (
            _.options.dots === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            $("li", _.$dots).on(
              "click.slick",
              {
                message: "index",
              },
              _.changeSlide
            );

            if (_.options.accessibility === true) {
              _.$dots.on("keydown.slick", _.keyHandler);
            }
          }

          if (
            _.options.dots === true &&
            _.options.pauseOnDotsHover === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            $("li", _.$dots)
              .on("mouseenter.slick", $.proxy(_.interrupt, _, true))
              .on("mouseleave.slick", $.proxy(_.interrupt, _, false));
          }
        };

        Slick.prototype.initSlideEvents = function () {
          var _ = this;

          if (_.options.pauseOnHover) {
            _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
            _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false));
          }
        };

        Slick.prototype.initializeEvents = function () {
          var _ = this;

          _.initArrowEvents();

          _.initDotEvents();
          _.initSlideEvents();

          _.$list.on(
            "touchstart.slick mousedown.slick",
            {
              action: "start",
            },
            _.swipeHandler
          );
          _.$list.on(
            "touchmove.slick mousemove.slick",
            {
              action: "move",
            },
            _.swipeHandler
          );
          _.$list.on(
            "touchend.slick mouseup.slick",
            {
              action: "end",
            },
            _.swipeHandler
          );
          _.$list.on(
            "touchcancel.slick mouseleave.slick",
            {
              action: "end",
            },
            _.swipeHandler
          );

          _.$list.on("click.slick", _.clickHandler);

          $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

          if (_.options.accessibility === true) {
            _.$list.on("keydown.slick", _.keyHandler);
          }

          if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on("click.slick", _.selectHandler);
          }

          $(window).on(
            "orientationchange.slick.slick-" + _.instanceUid,
            $.proxy(_.orientationChange, _)
          );

          $(window).on(
            "resize.slick.slick-" + _.instanceUid,
            $.proxy(_.resize, _)
          );

          $("[draggable!=true]", _.$slideTrack).on(
            "dragstart",
            _.preventDefault
          );

          $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
          $(_.setPosition);
        };

        Slick.prototype.initUI = function () {
          var _ = this;

          if (
            _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$prevArrow.show();
            _.$nextArrow.show();
          }

          if (
            _.options.dots === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$dots.show();
          }
        };

        Slick.prototype.keyHandler = function (event) {
          var _ = this;
          //Dont slide if the cursor is inside the form fields and arrow keys are pressed
          if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
              _.changeSlide({
                data: {
                  message: _.options.rtl === true ? "next" : "previous",
                },
              });
            } else if (
              event.keyCode === 39 &&
              _.options.accessibility === true
            ) {
              _.changeSlide({
                data: {
                  message: _.options.rtl === true ? "previous" : "next",
                },
              });
            }
          }
        };

        Slick.prototype.lazyLoad = function () {
          var _ = this,
            loadRange,
            cloneRange,
            rangeStart,
            rangeEnd;

          function loadImages(imagesScope) {
            $("img[data-lazy]", imagesScope).each(function () {
              var image = $(this),
                imageSource = $(this).attr("data-lazy"),
                imageSrcSet = $(this).attr("data-srcset"),
                imageSizes =
                  $(this).attr("data-sizes") || _.$slider.attr("data-sizes"),
                imageToLoad = document.createElement("img");

              imageToLoad.onload = function () {
                image.animate({ opacity: 0 }, 100, function () {
                  if (imageSrcSet) {
                    image.attr("srcset", imageSrcSet);

                    if (imageSizes) {
                      image.attr("sizes", imageSizes);
                    }
                  }

                  image
                    .attr("src", imageSource)
                    .animate({ opacity: 1 }, 200, function () {
                      image
                        .removeAttr("data-lazy data-srcset data-sizes")
                        .removeClass("slick-loading");
                    });
                  _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
                });
              };

              imageToLoad.onerror = function () {
                image
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error");

                _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
              };

              imageToLoad.src = imageSource;
            });
          }

          if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
              rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
              rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
              rangeStart = Math.max(
                0,
                _.currentSlide - (_.options.slidesToShow / 2 + 1)
              );
              rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
          } else {
            rangeStart = _.options.infinite
              ? _.options.slidesToShow + _.currentSlide
              : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
              if (rangeStart > 0) rangeStart--;
              if (rangeEnd <= _.slideCount) rangeEnd++;
            }
          }

          loadRange = _.$slider
            .find(".slick-slide")
            .slice(rangeStart, rangeEnd);

          if (_.options.lazyLoad === "anticipated") {
            var prevSlide = rangeStart - 1,
              nextSlide = rangeEnd,
              $slides = _.$slider.find(".slick-slide");

            for (var i = 0; i < _.options.slidesToScroll; i++) {
              if (prevSlide < 0) prevSlide = _.slideCount - 1;
              loadRange = loadRange.add($slides.eq(prevSlide));
              loadRange = loadRange.add($slides.eq(nextSlide));
              prevSlide--;
              nextSlide++;
            }
          }

          loadImages(loadRange);

          if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find(".slick-slide");
            loadImages(cloneRange);
          } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider
              .find(".slick-cloned")
              .slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
          } else if (_.currentSlide === 0) {
            cloneRange = _.$slider
              .find(".slick-cloned")
              .slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
          }
        };

        Slick.prototype.loadSlider = function () {
          var _ = this;

          _.setPosition();

          _.$slideTrack.css({
            opacity: 1,
          });

          _.$slider.removeClass("slick-loading");

          _.initUI();

          if (_.options.lazyLoad === "progressive") {
            _.progressiveLazyLoad();
          }
        };

        Slick.prototype.next = Slick.prototype.slickNext = function () {
          var _ = this;

          _.changeSlide({
            data: {
              message: "next",
            },
          });
        };

        Slick.prototype.orientationChange = function () {
          var _ = this;

          _.checkResponsive();
          _.setPosition();
        };

        Slick.prototype.pause = Slick.prototype.slickPause = function () {
          var _ = this;

          _.autoPlayClear();
          _.paused = true;
        };

        Slick.prototype.play = Slick.prototype.slickPlay = function () {
          var _ = this;

          _.autoPlay();
          _.options.autoplay = true;
          _.paused = false;
          _.focussed = false;
          _.interrupted = false;
        };

        Slick.prototype.postSlide = function (index) {
          var _ = this;

          if (!_.unslicked) {
            _.$slider.trigger("afterChange", [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
              _.setPosition();
            }

            _.swipeLeft = null;

            if (_.options.autoplay) {
              _.autoPlay();
            }

            if (_.options.accessibility === true) {
              _.initADA();

              if (_.options.focusOnChange) {
                var $currentSlide = $(_.$slides.get(_.currentSlide));
                $currentSlide.attr("tabindex", 0).focus();
              }
            }
          }
        };

        Slick.prototype.prev = Slick.prototype.slickPrev = function () {
          var _ = this;

          _.changeSlide({
            data: {
              message: "previous",
            },
          });
        };

        Slick.prototype.preventDefault = function (event) {
          event.preventDefault();
        };

        Slick.prototype.progressiveLazyLoad = function (tryCount) {
          tryCount = tryCount || 1;

          var _ = this,
            $imgsToLoad = $("img[data-lazy]", _.$slider),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

          if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr("data-lazy");
            imageSrcSet = image.attr("data-srcset");
            imageSizes =
              image.attr("data-sizes") || _.$slider.attr("data-sizes");
            imageToLoad = document.createElement("img");

            imageToLoad.onload = function () {
              if (imageSrcSet) {
                image.attr("srcset", imageSrcSet);

                if (imageSizes) {
                  image.attr("sizes", imageSizes);
                }
              }

              image
                .attr("src", imageSource)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading");

              if (_.options.adaptiveHeight === true) {
                _.setPosition();
              }

              _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
              _.progressiveLazyLoad();
            };

            imageToLoad.onerror = function () {
              if (tryCount < 3) {
                /**
                 * try to load the image 3 times,
                 * leave a slight delay so we don't get
                 * servers blocking the request.
                 */
                setTimeout(function () {
                  _.progressiveLazyLoad(tryCount + 1);
                }, 500);
              } else {
                image
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error");

                _.$slider.trigger("lazyLoadError", [_, image, imageSource]);

                _.progressiveLazyLoad();
              }
            };

            imageToLoad.src = imageSource;
          } else {
            _.$slider.trigger("allImagesLoaded", [_]);
          }
        };

        Slick.prototype.refresh = function (initializing) {
          var _ = this,
            currentSlide,
            lastVisibleIndex;

          lastVisibleIndex = _.slideCount - _.options.slidesToShow;

          // in non-infinite sliders, we don't want to go past the
          // last visible index.
          if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
            _.currentSlide = lastVisibleIndex;
          }

          // if less slides than to show, go to start.
          if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
          }

          currentSlide = _.currentSlide;

          _.destroy(true);

          $.extend(_, _.initials, { currentSlide: currentSlide });

          _.init();

          if (!initializing) {
            _.changeSlide(
              {
                data: {
                  message: "index",
                  index: currentSlide,
                },
              },
              false
            );
          }
        };

        Slick.prototype.registerBreakpoints = function () {
          var _ = this,
            breakpoint,
            currentBreakpoint,
            l,
            responsiveSettings = _.options.responsive || null;

          if (
            $.type(responsiveSettings) === "array" &&
            responsiveSettings.length
          ) {
            _.respondTo = _.options.respondTo || "window";

            for (breakpoint in responsiveSettings) {
              l = _.breakpoints.length - 1;

              if (responsiveSettings.hasOwnProperty(breakpoint)) {
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                // loop through the breakpoints and cut out any existing
                // ones with the same breakpoint number, we don't want dupes.
                while (l >= 0) {
                  if (
                    _.breakpoints[l] &&
                    _.breakpoints[l] === currentBreakpoint
                  ) {
                    _.breakpoints.splice(l, 1);
                  }
                  l--;
                }

                _.breakpoints.push(currentBreakpoint);
                _.breakpointSettings[currentBreakpoint] =
                  responsiveSettings[breakpoint].settings;
              }
            }

            _.breakpoints.sort(function (a, b) {
              return _.options.mobileFirst ? a - b : b - a;
            });
          }
        };

        Slick.prototype.reinit = function () {
          var _ = this;

          _.$slides = _.$slideTrack
            .children(_.options.slide)
            .addClass("slick-slide");

          _.slideCount = _.$slides.length;

          if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
          }

          if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
          }

          _.registerBreakpoints();

          _.setProps();
          _.setupInfinite();
          _.buildArrows();
          _.updateArrows();
          _.initArrowEvents();
          _.buildDots();
          _.updateDots();
          _.initDotEvents();
          _.cleanUpSlideEvents();
          _.initSlideEvents();

          _.checkResponsive(false, true);

          if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on("click.slick", _.selectHandler);
          }

          _.setSlideClasses(
            typeof _.currentSlide === "number" ? _.currentSlide : 0
          );

          _.setPosition();
          _.focusHandler();

          _.paused = !_.options.autoplay;
          _.autoPlay();

          _.$slider.trigger("reInit", [_]);
        };

        Slick.prototype.resize = function () {
          var _ = this;

          if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
              _.windowWidth = $(window).width();
              _.checkResponsive();
              if (!_.unslicked) {
                _.setPosition();
              }
            }, 50);
          }
        };

        Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (
          index,
          removeBefore,
          removeAll
        ) {
          var _ = this;

          if (typeof index === "boolean") {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
          } else {
            index = removeBefore === true ? --index : index;
          }

          if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
          }

          _.unload();

          if (removeAll === true) {
            _.$slideTrack.children().remove();
          } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
          }

          _.$slides = _.$slideTrack.children(this.options.slide);

          _.$slideTrack.children(this.options.slide).detach();

          _.$slideTrack.append(_.$slides);

          _.$slidesCache = _.$slides;

          _.reinit();
        };

        Slick.prototype.setCSS = function (position) {
          var _ = this,
            positionProps = {},
            x,
            y;

          if (_.options.rtl === true) {
            position = -position;
          }
          x = _.positionProp == "left" ? Math.ceil(position) + "px" : "0px";
          y = _.positionProp == "top" ? Math.ceil(position) + "px" : "0px";

          positionProps[_.positionProp] = position;

          if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
          } else {
            positionProps = {};
            if (_.cssTransitions === false) {
              positionProps[_.animType] = "translate(" + x + ", " + y + ")";
              _.$slideTrack.css(positionProps);
            } else {
              positionProps[_.animType] =
                "translate3d(" + x + ", " + y + ", 0px)";
              _.$slideTrack.css(positionProps);
            }
          }
        };

        Slick.prototype.setDimensions = function () {
          var _ = this;

          if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
              _.$list.css({
                padding: "0px " + _.options.centerPadding,
              });
            }
          } else {
            _.$list.height(
              _.$slides.first().outerHeight(true) * _.options.slidesToShow
            );
            if (_.options.centerMode === true) {
              _.$list.css({
                padding: _.options.centerPadding + " 0px",
              });
            }
          }

          _.listWidth = _.$list.width();
          _.listHeight = _.$list.height();

          if (
            _.options.vertical === false &&
            _.options.variableWidth === false
          ) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(
              Math.ceil(
                _.slideWidth * _.$slideTrack.children(".slick-slide").length
              )
            );
          } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
          } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(
              Math.ceil(
                _.$slides.first().outerHeight(true) *
                  _.$slideTrack.children(".slick-slide").length
              )
            );
          }

          var offset =
            _.$slides.first().outerWidth(true) - _.$slides.first().width();
          if (_.options.variableWidth === false)
            _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset);
        };

        Slick.prototype.setFade = function () {
          var _ = this,
            targetLeft;

          _.$slides.each(function (index, element) {
            targetLeft = _.slideWidth * index * -1;
            if (_.options.rtl === true) {
              $(element).css({
                position: "relative",
                right: targetLeft,
                top: 0,
                zIndex: _.options.zIndex - 2,
                opacity: 0,
              });
            } else {
              $(element).css({
                position: "relative",
                left: targetLeft,
                top: 0,
                zIndex: _.options.zIndex - 2,
                opacity: 0,
              });
            }
          });

          _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1,
          });
        };

        Slick.prototype.setHeight = function () {
          var _ = this;

          if (
            _.options.slidesToShow === 1 &&
            _.options.adaptiveHeight === true &&
            _.options.vertical === false
          ) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css("height", targetHeight);
          }
        };

        Slick.prototype.setOption = Slick.prototype.slickSetOption =
          function () {
            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var _ = this,
              l,
              item,
              option,
              value,
              refresh = false,
              type;

            if ($.type(arguments[0]) === "object") {
              option = arguments[0];
              refresh = arguments[1];
              type = "multiple";
            } else if ($.type(arguments[0]) === "string") {
              option = arguments[0];
              value = arguments[1];
              refresh = arguments[2];

              if (
                arguments[0] === "responsive" &&
                $.type(arguments[1]) === "array"
              ) {
                type = "responsive";
              } else if (typeof arguments[1] !== "undefined") {
                type = "single";
              }
            }

            if (type === "single") {
              _.options[option] = value;
            } else if (type === "multiple") {
              $.each(option, function (opt, val) {
                _.options[opt] = val;
              });
            } else if (type === "responsive") {
              for (item in value) {
                if ($.type(_.options.responsive) !== "array") {
                  _.options.responsive = [value[item]];
                } else {
                  l = _.options.responsive.length - 1;

                  // loop through the responsive object and splice out duplicates.
                  while (l >= 0) {
                    if (
                      _.options.responsive[l].breakpoint ===
                      value[item].breakpoint
                    ) {
                      _.options.responsive.splice(l, 1);
                    }

                    l--;
                  }

                  _.options.responsive.push(value[item]);
                }
              }
            }

            if (refresh) {
              _.unload();
              _.reinit();
            }
          };

        Slick.prototype.setPosition = function () {
          var _ = this;

          _.setDimensions();

          _.setHeight();

          if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
          } else {
            _.setFade();
          }

          _.$slider.trigger("setPosition", [_]);
        };

        Slick.prototype.setProps = function () {
          var _ = this,
            bodyStyle = document.body.style;

          _.positionProp = _.options.vertical === true ? "top" : "left";

          if (_.positionProp === "top") {
            _.$slider.addClass("slick-vertical");
          } else {
            _.$slider.removeClass("slick-vertical");
          }

          if (
            bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined
          ) {
            if (_.options.useCSS === true) {
              _.cssTransitions = true;
            }
          }

          if (_.options.fade) {
            if (typeof _.options.zIndex === "number") {
              if (_.options.zIndex < 3) {
                _.options.zIndex = 3;
              }
            } else {
              _.options.zIndex = _.defaults.zIndex;
            }
          }

          if (bodyStyle.OTransform !== undefined) {
            _.animType = "OTransform";
            _.transformType = "-o-transform";
            _.transitionType = "OTransition";
            if (
              bodyStyle.perspectiveProperty === undefined &&
              bodyStyle.webkitPerspective === undefined
            )
              _.animType = false;
          }
          if (bodyStyle.MozTransform !== undefined) {
            _.animType = "MozTransform";
            _.transformType = "-moz-transform";
            _.transitionType = "MozTransition";
            if (
              bodyStyle.perspectiveProperty === undefined &&
              bodyStyle.MozPerspective === undefined
            )
              _.animType = false;
          }
          if (bodyStyle.webkitTransform !== undefined) {
            _.animType = "webkitTransform";
            _.transformType = "-webkit-transform";
            _.transitionType = "webkitTransition";
            if (
              bodyStyle.perspectiveProperty === undefined &&
              bodyStyle.webkitPerspective === undefined
            )
              _.animType = false;
          }
          if (bodyStyle.msTransform !== undefined) {
            _.animType = "msTransform";
            _.transformType = "-ms-transform";
            _.transitionType = "msTransition";
            if (bodyStyle.msTransform === undefined) _.animType = false;
          }
          if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = "transform";
            _.transformType = "transform";
            _.transitionType = "transition";
          }
          _.transformsEnabled =
            _.options.useTransform &&
            _.animType !== null &&
            _.animType !== false;
        };

        Slick.prototype.setSlideClasses = function (index) {
          var _ = this,
            centerOffset,
            allSlides,
            indexOffset,
            remainder;

          allSlides = _.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true");

          _.$slides.eq(index).addClass("slick-current");

          if (_.options.centerMode === true) {
            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {
              if (
                index >= centerOffset &&
                index <= _.slideCount - 1 - centerOffset
              ) {
                _.$slides
                  .slice(
                    index - centerOffset + evenCoef,
                    index + centerOffset + 1
                  )
                  .addClass("slick-active")
                  .attr("aria-hidden", "false");
              } else {
                indexOffset = _.options.slidesToShow + index;
                allSlides
                  .slice(
                    indexOffset - centerOffset + 1 + evenCoef,
                    indexOffset + centerOffset + 2
                  )
                  .addClass("slick-active")
                  .attr("aria-hidden", "false");
              }

              if (index === 0) {
                allSlides
                  .eq(allSlides.length - 1 - _.options.slidesToShow)
                  .addClass("slick-center");
              } else if (index === _.slideCount - 1) {
                allSlides.eq(_.options.slidesToShow).addClass("slick-center");
              }
            }

            _.$slides.eq(index).addClass("slick-center");
          } else {
            if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
              _.$slides
                .slice(index, index + _.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false");
            } else if (allSlides.length <= _.options.slidesToShow) {
              allSlides.addClass("slick-active").attr("aria-hidden", "false");
            } else {
              remainder = _.slideCount % _.options.slidesToShow;
              indexOffset =
                _.options.infinite === true
                  ? _.options.slidesToShow + index
                  : index;

              if (
                _.options.slidesToShow == _.options.slidesToScroll &&
                _.slideCount - index < _.options.slidesToShow
              ) {
                allSlides
                  .slice(
                    indexOffset - (_.options.slidesToShow - remainder),
                    indexOffset + remainder
                  )
                  .addClass("slick-active")
                  .attr("aria-hidden", "false");
              } else {
                allSlides
                  .slice(indexOffset, indexOffset + _.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false");
              }
            }
          }

          if (
            _.options.lazyLoad === "ondemand" ||
            _.options.lazyLoad === "anticipated"
          ) {
            _.lazyLoad();
          }
        };

        Slick.prototype.setupInfinite = function () {
          var _ = this,
            i,
            slideIndex,
            infiniteCount;

          if (_.options.fade === true) {
            _.options.centerMode = false;
          }

          if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {
              if (_.options.centerMode === true) {
                infiniteCount = _.options.slidesToShow + 1;
              } else {
                infiniteCount = _.options.slidesToShow;
              }

              for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                slideIndex = i - 1;
                $(_.$slides[slideIndex])
                  .clone(true)
                  .attr("id", "")
                  .attr("data-slick-index", slideIndex - _.slideCount)
                  .prependTo(_.$slideTrack)
                  .addClass("slick-cloned");
              }
              for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                slideIndex = i;
                $(_.$slides[slideIndex])
                  .clone(true)
                  .attr("id", "")
                  .attr("data-slick-index", slideIndex + _.slideCount)
                  .appendTo(_.$slideTrack)
                  .addClass("slick-cloned");
              }
              _.$slideTrack
                .find(".slick-cloned")
                .find("[id]")
                .each(function () {
                  $(this).attr("id", "");
                });
            }
          }
        };

        Slick.prototype.interrupt = function (toggle) {
          var _ = this;

          if (!toggle) {
            _.autoPlay();
          }
          _.interrupted = toggle;
        };

        Slick.prototype.selectHandler = function (event) {
          var _ = this;

          var targetElement = $(event.target).is(".slick-slide")
            ? $(event.target)
            : $(event.target).parents(".slick-slide");

          var index = parseInt(targetElement.attr("data-slick-index"));

          if (!index) index = 0;

          if (_.slideCount <= _.options.slidesToShow) {
            _.slideHandler(index, false, true);
            return;
          }

          _.slideHandler(index);
        };

        Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
          var targetSlide,
            animSlide,
            oldSlide,
            slideLeft,
            targetLeft = null,
            _ = this,
            navTarget;

          sync = sync || false;

          if (_.animating === true && _.options.waitForAnimate === true) {
            return;
          }

          if (_.options.fade === true && _.currentSlide === index) {
            return;
          }

          if (sync === false) {
            _.asNavFor(index);
          }

          targetSlide = index;
          targetLeft = _.getLeft(targetSlide);
          slideLeft = _.getLeft(_.currentSlide);

          _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

          if (
            _.options.infinite === false &&
            _.options.centerMode === false &&
            (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)
          ) {
            if (_.options.fade === false) {
              targetSlide = _.currentSlide;
              if (
                dontAnimate !== true &&
                _.slideCount > _.options.slidesToShow
              ) {
                _.animateSlide(slideLeft, function () {
                  _.postSlide(targetSlide);
                });
              } else {
                _.postSlide(targetSlide);
              }
            }
            return;
          } else if (
            _.options.infinite === false &&
            _.options.centerMode === true &&
            (index < 0 || index > _.slideCount - _.options.slidesToScroll)
          ) {
            if (_.options.fade === false) {
              targetSlide = _.currentSlide;
              if (
                dontAnimate !== true &&
                _.slideCount > _.options.slidesToShow
              ) {
                _.animateSlide(slideLeft, function () {
                  _.postSlide(targetSlide);
                });
              } else {
                _.postSlide(targetSlide);
              }
            }
            return;
          }

          if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer);
          }

          if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
              animSlide =
                _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
              animSlide = _.slideCount + targetSlide;
            }
          } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
              animSlide = 0;
            } else {
              animSlide = targetSlide - _.slideCount;
            }
          } else {
            animSlide = targetSlide;
          }

          _.animating = true;

          _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]);

          oldSlide = _.currentSlide;
          _.currentSlide = animSlide;

          _.setSlideClasses(_.currentSlide);

          if (_.options.asNavFor) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick("getSlick");

            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
              navTarget.setSlideClasses(_.currentSlide);
            }
          }

          _.updateDots();
          _.updateArrows();

          if (_.options.fade === true) {
            if (dontAnimate !== true) {
              _.fadeSlideOut(oldSlide);

              _.fadeSlide(animSlide, function () {
                _.postSlide(animSlide);
              });
            } else {
              _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
          }

          if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function () {
              _.postSlide(animSlide);
            });
          } else {
            _.postSlide(animSlide);
          }
        };

        Slick.prototype.startLoad = function () {
          var _ = this;

          if (
            _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$prevArrow.hide();
            _.$nextArrow.hide();
          }

          if (
            _.options.dots === true &&
            _.slideCount > _.options.slidesToShow
          ) {
            _.$dots.hide();
          }

          _.$slider.addClass("slick-loading");
        };

        Slick.prototype.swipeDirection = function () {
          var xDist,
            yDist,
            r,
            swipeAngle,
            _ = this;

          xDist = _.touchObject.startX - _.touchObject.curX;
          yDist = _.touchObject.startY - _.touchObject.curY;
          r = Math.atan2(yDist, xDist);

          swipeAngle = Math.round((r * 180) / Math.PI);
          if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
          }

          if (swipeAngle <= 45 && swipeAngle >= 0) {
            return _.options.rtl === false ? "left" : "right";
          }
          if (swipeAngle <= 360 && swipeAngle >= 315) {
            return _.options.rtl === false ? "left" : "right";
          }
          if (swipeAngle >= 135 && swipeAngle <= 225) {
            return _.options.rtl === false ? "right" : "left";
          }
          if (_.options.verticalSwiping === true) {
            if (swipeAngle >= 35 && swipeAngle <= 135) {
              return "down";
            } else {
              return "up";
            }
          }

          return "vertical";
        };

        Slick.prototype.swipeEnd = function (event) {
          var _ = this,
            slideCount,
            direction;

          _.dragging = false;
          _.swiping = false;

          if (_.scrolling) {
            _.scrolling = false;
            return false;
          }

          _.interrupted = false;
          _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

          if (_.touchObject.curX === undefined) {
            return false;
          }

          if (_.touchObject.edgeHit === true) {
            _.$slider.trigger("edge", [_, _.swipeDirection()]);
          }

          if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            direction = _.swipeDirection();

            switch (direction) {
              case "left":
              case "down":
                slideCount = _.options.swipeToSlide
                  ? _.checkNavigable(_.currentSlide + _.getSlideCount())
                  : _.currentSlide + _.getSlideCount();

                _.currentDirection = 0;

                break;

              case "right":
              case "up":
                slideCount = _.options.swipeToSlide
                  ? _.checkNavigable(_.currentSlide - _.getSlideCount())
                  : _.currentSlide - _.getSlideCount();

                _.currentDirection = 1;

                break;

              default:
            }

            if (direction != "vertical") {
              _.slideHandler(slideCount);
              _.touchObject = {};
              _.$slider.trigger("swipe", [_, direction]);
            }
          } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
              _.slideHandler(_.currentSlide);
              _.touchObject = {};
            }
          }
        };

        Slick.prototype.swipeHandler = function (event) {
          var _ = this;

          if (
            _.options.swipe === false ||
            ("ontouchend" in document && _.options.swipe === false)
          ) {
            return;
          } else if (
            _.options.draggable === false &&
            event.type.indexOf("mouse") !== -1
          ) {
            return;
          }

          _.touchObject.fingerCount =
            event.originalEvent && event.originalEvent.touches !== undefined
              ? event.originalEvent.touches.length
              : 1;

          _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

          if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
          }

          switch (event.data.action) {
            case "start":
              _.swipeStart(event);
              break;

            case "move":
              _.swipeMove(event);
              break;

            case "end":
              _.swipeEnd(event);
              break;
          }
        };

        Slick.prototype.swipeMove = function (event) {
          var _ = this,
            edgeWasHit = false,
            curLeft,
            swipeDirection,
            swipeLength,
            positionOffset,
            touches,
            verticalSwipeLength;

          touches =
            event.originalEvent !== undefined
              ? event.originalEvent.touches
              : null;

          if (!_.dragging || _.scrolling || (touches && touches.length !== 1)) {
            return false;
          }

          curLeft = _.getLeft(_.currentSlide);

          _.touchObject.curX =
            touches !== undefined ? touches[0].pageX : event.clientX;
          _.touchObject.curY =
            touches !== undefined ? touches[0].pageY : event.clientY;

          _.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2))
          );

          verticalSwipeLength = Math.round(
            Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2))
          );

          if (
            !_.options.verticalSwiping &&
            !_.swiping &&
            verticalSwipeLength > 4
          ) {
            _.scrolling = true;
            return false;
          }

          if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
          }

          swipeDirection = _.swipeDirection();

          if (
            event.originalEvent !== undefined &&
            _.touchObject.swipeLength > 4
          ) {
            _.swiping = true;
            event.preventDefault();
          }

          positionOffset =
            (_.options.rtl === false ? 1 : -1) *
            (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
          if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
          }

          swipeLength = _.touchObject.swipeLength;

          _.touchObject.edgeHit = false;

          if (_.options.infinite === false) {
            if (
              (_.currentSlide === 0 && swipeDirection === "right") ||
              (_.currentSlide >= _.getDotCount() && swipeDirection === "left")
            ) {
              swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
              _.touchObject.edgeHit = true;
            }
          }

          if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
          } else {
            _.swipeLeft =
              curLeft +
              swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
          }
          if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
          }

          if (_.options.fade === true || _.options.touchMove === false) {
            return false;
          }

          if (_.animating === true) {
            _.swipeLeft = null;
            return false;
          }

          _.setCSS(_.swipeLeft);
        };

        Slick.prototype.swipeStart = function (event) {
          var _ = this,
            touches;

          _.interrupted = true;

          if (
            _.touchObject.fingerCount !== 1 ||
            _.slideCount <= _.options.slidesToShow
          ) {
            _.touchObject = {};
            return false;
          }

          if (
            event.originalEvent !== undefined &&
            event.originalEvent.touches !== undefined
          ) {
            touches = event.originalEvent.touches[0];
          }

          _.touchObject.startX = _.touchObject.curX =
            touches !== undefined ? touches.pageX : event.clientX;
          _.touchObject.startY = _.touchObject.curY =
            touches !== undefined ? touches.pageY : event.clientY;

          _.dragging = true;
        };

        Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter =
          function () {
            var _ = this;

            if (_.$slidesCache !== null) {
              _.unload();

              _.$slideTrack.children(this.options.slide).detach();

              _.$slidesCache.appendTo(_.$slideTrack);

              _.reinit();
            }
          };

        Slick.prototype.unload = function () {
          var _ = this;

          $(".slick-cloned", _.$slider).remove();

          if (_.$dots) {
            _.$dots.remove();
          }

          if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
          }

          if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
          }

          _.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
        };

        Slick.prototype.unslick = function (fromBreakpoint) {
          var _ = this;
          _.$slider.trigger("unslick", [_, fromBreakpoint]);
          _.destroy();
        };

        Slick.prototype.updateArrows = function () {
          var _ = this,
            centerOffset;

          centerOffset = Math.floor(_.options.slidesToShow / 2);

          if (
            _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite
          ) {
            _.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false");
            _.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false");

            if (_.currentSlide === 0) {
              _.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true");
              _.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false");
            } else if (
              _.currentSlide >= _.slideCount - _.options.slidesToShow &&
              _.options.centerMode === false
            ) {
              _.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true");
              _.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false");
            } else if (
              _.currentSlide >= _.slideCount - 1 &&
              _.options.centerMode === true
            ) {
              _.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true");
              _.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false");
            }
          }
        };

        Slick.prototype.updateDots = function () {
          var _ = this;

          if (_.$dots !== null) {
            _.$dots.find("li").removeClass("slick-active").end();

            _.$dots
              .find("li")
              .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
              .addClass("slick-active");
          }
        };

        Slick.prototype.visibility = function () {
          var _ = this;

          if (_.options.autoplay) {
            if (document[_.hidden]) {
              _.interrupted = true;
            } else {
              _.interrupted = false;
            }
          }
        };

        $.fn.slick = function () {
          var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
          for (i = 0; i < l; i++) {
            if (typeof opt == "object" || typeof opt == "undefined")
              _[i].slick = new Slick(_[i], opt);
            else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != "undefined") return ret;
          }
          return _;
        };
      });

      /***/
    },
    /* 45 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);

        function lastSlideItem() {
          var winWidth = $win.width();
          var $lastItem = false;

          $(".community .slick-slide").removeClass("opacity");

          $(".community .instafeed-container").each(function () {
            var $this = $(this);
            var rightLine = $this.offset().left + $this.width();
            if (rightLine > winWidth && !$lastItem) {
              $lastItem = $this;
            }
          });
          if ($lastItem.length) {
            $lastItem
              .closest(".slick-slide")
              .nextAll()
              .add($lastItem.closest(".slick-slide"))
              .addClass("opacity");
          }
        }

        module.exports = {
          lastSlideItem: lastSlideItem,
        };
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 46 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($, jQuery) {
        function toastMessage(message) {
          $(
            '<div class="toast-message"><span class="toast-message__close"></span><p>' +
              message +
              "</p></div>"
          ).appendTo("body");

          var $container = $(".toast-message");
          jQuery("body").on("click", ".toast-message__close", function () {
            $container.removeClass("reveal");
          });

          setTimeout(function () {
            $container.addClass("reveal");
          }, 100);

          setTimeout(function () {
            $container.removeClass("reveal");
          }, 2000);

          setTimeout(function () {
            $container.remove();
          }, 2300);
        }

        module.exports = {
          toastMessage: toastMessage,
        };
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0), __webpack_require__(0)));

      /***/
    },
    /* 47 */
    /***/ function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__,
        __WEBPACK_AMD_DEFINE_ARRAY__,
        __WEBPACK_AMD_DEFINE_RESULT__;
      /*!
       *         ,/
       *       ,'/
       *     ,' /
       *   ,'  /_____,
       * .'____    ,'
       *      /  ,'
       *     / ,'
       *    /,'
       *   /'
       *
       * Selectric ϟ v1.13.0 (Aug 22 2017) - http://lcdsantos.github.io/jQuery-Selectric/
       *
       * Copyright (c) 2017 Leonardo Santos; MIT License
       *
       */

      (function (factory) {
        /* global define */
        /* istanbul ignore next */
        if (true) {
          !((__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)]),
          (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
          (__WEBPACK_AMD_DEFINE_RESULT__ =
            typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
              ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                  exports,
                  __WEBPACK_AMD_DEFINE_ARRAY__
                )
              : __WEBPACK_AMD_DEFINE_FACTORY__),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
            (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (typeof module === "object" && module.exports) {
          // Node/CommonJS
          module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
              if (typeof window !== "undefined") {
                jQuery = require("jquery");
              } else {
                jQuery = require("jquery")(root);
              }
            }
            factory(jQuery);
            return jQuery;
          };
        } else {
          // Browser globals
          factory(jQuery);
        }
      })(function ($) {
        "use strict";

        var $doc = $(document);
        var $win = $(window);

        var pluginName = "selectric";
        var classList =
          "Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel";
        var eventNamespaceSuffix = ".sl";

        var chars = ["a", "e", "i", "o", "u", "n", "c", "y"];
        var diacritics = [
          /[\xE0-\xE5]/g, // a
          /[\xE8-\xEB]/g, // e
          /[\xEC-\xEF]/g, // i
          /[\xF2-\xF6]/g, // o
          /[\xF9-\xFC]/g, // u
          /[\xF1]/g, // n
          /[\xE7]/g, // c
          /[\xFD-\xFF]/g, // y
        ];

        /**
         * Create an instance of Selectric
         *
         * @constructor
         * @param {Node} element - The &lt;select&gt; element
         * @param {object}  opts - Options
         */
        var Selectric = function (element, opts) {
          var _this = this;

          _this.element = element;
          _this.$element = $(element);

          _this.state = {
            multiple: !!_this.$element.attr("multiple"),
            enabled: false,
            opened: false,
            currValue: -1,
            selectedIdx: -1,
            highlightedIdx: -1,
          };

          _this.eventTriggers = {
            open: _this.open,
            close: _this.close,
            destroy: _this.destroy,
            refresh: _this.refresh,
            init: _this.init,
          };

          _this.init(opts);
        };

        Selectric.prototype = {
          utils: {
            /**
             * Detect mobile browser
             *
             * @return {boolean}
             */
            isMobile: function () {
              return /android|ip(hone|od|ad)/i.test(navigator.userAgent);
            },

            /**
             * Escape especial characters in string (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
             *
             * @param  {string} str - The string to be escaped
             * @return {string}       The string with the special characters escaped
             */
            escapeRegExp: function (str) {
              return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
            },

            /**
             * Replace diacritics
             *
             * @param  {string} str - The string to replace the diacritics
             * @return {string}       The string with diacritics replaced with ascii characters
             */
            replaceDiacritics: function (str) {
              var k = diacritics.length;

              while (k--) {
                str = str.toLowerCase().replace(diacritics[k], chars[k]);
              }

              return str;
            },

            /**
             * Format string
             * https://gist.github.com/atesgoral/984375
             *
             * @param  {string} f - String to be formated
             * @return {string}     String formated
             */
            format: function (f) {
              var a = arguments; // store outer arguments
              return ("" + f) // force format specifier to String
                .replace(
                  // replace tokens in format specifier
                  /\{(?:(\d+)|(\w+))\}/g, // match {token} references
                  function (
                    s, // the matched string (ignored)
                    i, // an argument index
                    p // a property name
                  ) {
                    return p && a[1] // if property name and first argument exist
                      ? a[1][p] // return property from first argument
                      : a[i]; // assume argument index and return i-th argument
                  }
                );
            },

            /**
             * Get the next enabled item in the options list.
             *
             * @param  {object} selectItems - The options object.
             * @param  {number}    selected - Index of the currently selected option.
             * @return {object}               The next enabled item.
             */
            nextEnabledItem: function (selectItems, selected) {
              while (
                selectItems[(selected = (selected + 1) % selectItems.length)]
                  .disabled
              ) {
                // empty
              }
              return selected;
            },

            /**
             * Get the previous enabled item in the options list.
             *
             * @param  {object} selectItems - The options object.
             * @param  {number}    selected - Index of the currently selected option.
             * @return {object}               The previous enabled item.
             */
            previousEnabledItem: function (selectItems, selected) {
              while (
                selectItems[
                  (selected =
                    (selected > 0 ? selected : selectItems.length) - 1)
                ].disabled
              ) {
                // empty
              }
              return selected;
            },

            /**
             * Transform camelCase string to dash-case.
             *
             * @param  {string} str - The camelCased string.
             * @return {string}       The string transformed to dash-case.
             */
            toDash: function (str) {
              return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
            },

            /**
             * Calls the events registered with function name.
             *
             * @param {string}    fn - The name of the function.
             * @param {number} scope - Scope that should be set on the function.
             */
            triggerCallback: function (fn, scope) {
              var elm = scope.element;
              var func = scope.options["on" + fn];
              var args = [elm].concat([].slice.call(arguments).slice(1));

              if ($.isFunction(func)) {
                func.apply(elm, args);
              }

              $(elm).trigger(pluginName + "-" + this.toDash(fn), args);
            },

            /**
             * Transform array list to concatenated string and remove empty values
             * @param  {array} arr - Class list
             * @return {string}      Concatenated string
             */
            arrayToClassname: function (arr) {
              var newArr = $.grep(arr, function (item) {
                return !!item;
              });

              return $.trim(newArr.join(" "));
            },
          },

          /** Initializes */
          init: function (opts) {
            var _this = this;

            // Set options
            _this.options = $.extend(
              true,
              {},
              $.fn[pluginName].defaults,
              _this.options,
              opts
            );

            _this.utils.triggerCallback("BeforeInit", _this);

            // Preserve data
            _this.destroy(true);

            // Disable on mobile browsers
            if (_this.options.disableOnMobile && _this.utils.isMobile()) {
              _this.disableOnMobile = true;
              return;
            }

            // Get classes
            _this.classes = _this.getClassNames();

            // Create elements
            var input = $("<input/>", {
              class: _this.classes.input,
              readonly: _this.utils.isMobile(),
            });
            var items = $("<div/>", {
              class: _this.classes.items,
              tabindex: -1,
            });
            var itemsScroll = $("<div/>", { class: _this.classes.scroll });
            var wrapper = $("<div/>", {
              class: _this.classes.prefix,
              html: _this.options.arrowButtonMarkup,
            });
            var label = $("<span/>", { class: "label" });
            var outerWrapper = _this.$element
              .wrap("<div/>")
              .parent()
              .append(wrapper.prepend(label), items, input);
            var hideSelectWrapper = $("<div/>", {
              class: _this.classes.hideselect,
            });

            _this.elements = {
              input: input,
              items: items,
              itemsScroll: itemsScroll,
              wrapper: wrapper,
              label: label,
              outerWrapper: outerWrapper,
            };

            if (_this.options.nativeOnMobile && _this.utils.isMobile()) {
              _this.elements.input = undefined;
              hideSelectWrapper.addClass(_this.classes.prefix + "-is-native");

              _this.$element.on("change", function () {
                _this.refresh();
              });
            }

            _this.$element.on(_this.eventTriggers).wrap(hideSelectWrapper);

            _this.originalTabindex = _this.$element.prop("tabindex");
            _this.$element.prop("tabindex", -1);

            _this.populate();
            _this.activate();

            _this.utils.triggerCallback("Init", _this);
          },

          /** Activates the plugin */
          activate: function () {
            var _this = this;
            var hiddenChildren = _this.elements.items
              .closest(":visible")
              .children(":hidden")
              .addClass(_this.classes.tempshow);
            var originalWidth = _this.$element.width();

            hiddenChildren.removeClass(_this.classes.tempshow);

            _this.utils.triggerCallback("BeforeActivate", _this);

            _this.elements.outerWrapper.prop(
              "class",
              _this.utils.arrayToClassname([
                _this.classes.wrapper,
                _this.$element
                  .prop("class")
                  .replace(/\S+/g, _this.classes.prefix + "-$&"),
                _this.options.responsive ? _this.classes.responsive : "",
              ])
            );

            if (_this.options.inheritOriginalWidth && originalWidth > 0) {
              _this.elements.outerWrapper.width(originalWidth);
            }

            _this.unbindEvents();

            if (!_this.$element.prop("disabled")) {
              _this.state.enabled = true;

              // Not disabled, so... Removing disabled class
              _this.elements.outerWrapper.removeClass(_this.classes.disabled);

              // Remove styles from items box
              // Fix incorrect height when refreshed is triggered with fewer options
              _this.$li = _this.elements.items.removeAttr("style").find("li");

              _this.bindEvents();
            } else {
              _this.elements.outerWrapper.addClass(_this.classes.disabled);

              if (_this.elements.input) {
                _this.elements.input.prop("disabled", true);
              }
            }

            _this.utils.triggerCallback("Activate", _this);
          },

          /**
           * Generate classNames for elements
           *
           * @return {object} Classes object
           */
          getClassNames: function () {
            var _this = this;
            var customClass = _this.options.customClass;
            var classesObj = {};

            $.each(classList.split(" "), function (i, currClass) {
              var c = customClass.prefix + currClass;
              classesObj[currClass.toLowerCase()] = customClass.camelCase
                ? c
                : _this.utils.toDash(c);
            });

            classesObj.prefix = customClass.prefix;

            return classesObj;
          },

          /** Set the label text */
          setLabel: function () {
            var _this = this;
            var labelBuilder = _this.options.labelBuilder;

            if (_this.state.multiple) {
              // Make sure currentValues is an array
              var currentValues = $.isArray(_this.state.currValue)
                ? _this.state.currValue
                : [_this.state.currValue];
              // I'm not happy with this, but currentValues can be an empty
              // array and we need to fallback to the default option.
              currentValues = currentValues.length === 0 ? [0] : currentValues;

              var labelMarkup = $.map(currentValues, function (value) {
                return $.grep(_this.lookupItems, function (item) {
                  return item.index === value;
                })[0]; // we don't want nested arrays here
              });

              labelMarkup = $.grep(labelMarkup, function (item) {
                // Hide default (please choose) if more then one element were selected.
                // If no option value were given value is set to option text by default
                if (labelMarkup.length > 1 || labelMarkup.length === 0) {
                  return $.trim(item.value) !== "";
                }
                return item;
              });

              labelMarkup = $.map(labelMarkup, function (item) {
                return $.isFunction(labelBuilder)
                  ? labelBuilder(item)
                  : _this.utils.format(labelBuilder, item);
              });

              // Limit the amount of selected values shown in label
              if (_this.options.multiple.maxLabelEntries) {
                if (
                  labelMarkup.length >=
                  _this.options.multiple.maxLabelEntries + 1
                ) {
                  labelMarkup = labelMarkup.slice(
                    0,
                    _this.options.multiple.maxLabelEntries
                  );
                  labelMarkup.push(
                    $.isFunction(labelBuilder)
                      ? labelBuilder({ text: "..." })
                      : _this.utils.format(labelBuilder, { text: "..." })
                  );
                } else {
                  labelMarkup.slice(labelMarkup.length - 1);
                }
              }
              _this.elements.label.html(
                labelMarkup.join(_this.options.multiple.separator)
              );
            } else {
              var currItem = _this.lookupItems[_this.state.currValue];

              _this.elements.label.html(
                $.isFunction(labelBuilder)
                  ? labelBuilder(currItem)
                  : _this.utils.format(labelBuilder, currItem)
              );
            }
          },

          /** Get and save the available options */
          populate: function () {
            var _this = this;
            var $options = _this.$element.children();
            var $justOptions = _this.$element.find("option");
            var $selected = $justOptions.filter(":selected");
            var selectedIndex = $justOptions.index($selected);
            var currIndex = 0;
            var emptyValue = _this.state.multiple ? [] : 0;

            if ($selected.length > 1 && _this.state.multiple) {
              selectedIndex = [];
              $selected.each(function () {
                selectedIndex.push($(this).index());
              });
            }

            _this.state.currValue = ~selectedIndex ? selectedIndex : emptyValue;
            _this.state.selectedIdx = _this.state.currValue;
            _this.state.highlightedIdx = _this.state.currValue;
            _this.items = [];
            _this.lookupItems = [];

            if ($options.length) {
              // Build options markup
              $options.each(function (i) {
                var $elm = $(this);

                if ($elm.is("optgroup")) {
                  var optionsGroup = {
                    element: $elm,
                    label: $elm.prop("label"),
                    groupDisabled: $elm.prop("disabled"),
                    items: [],
                  };

                  $elm.children().each(function (i) {
                    var $elm = $(this);

                    optionsGroup.items[i] = _this.getItemData(
                      currIndex,
                      $elm,
                      optionsGroup.groupDisabled || $elm.prop("disabled")
                    );

                    _this.lookupItems[currIndex] = optionsGroup.items[i];

                    currIndex++;
                  });

                  _this.items[i] = optionsGroup;
                } else {
                  _this.items[i] = _this.getItemData(
                    currIndex,
                    $elm,
                    $elm.prop("disabled")
                  );

                  _this.lookupItems[currIndex] = _this.items[i];

                  currIndex++;
                }
              });

              _this.setLabel();
              _this.elements.items.append(
                _this.elements.itemsScroll.html(
                  _this.getItemsMarkup(_this.items)
                )
              );
            }
          },

          /**
           * Generate items object data
           * @param  {integer} index      - Current item index
           * @param  {node}    $elm       - Current element node
           * @param  {boolean} isDisabled - Current element disabled state
           * @return {object}               Item object
           */
          getItemData: function (index, $elm, isDisabled) {
            var _this = this;

            return {
              index: index,
              element: $elm,
              value: $elm.val(),
              className: $elm.prop("class"),
              text: $elm.html(),
              slug: $.trim(_this.utils.replaceDiacritics($elm.html())),
              alt: $elm.attr("data-alt"),
              selected: $elm.prop("selected"),
              disabled: isDisabled,
            };
          },

          /**
           * Generate options markup
           *
           * @param  {object} items - Object containing all available options
           * @return {string}         HTML for the options box
           */
          getItemsMarkup: function (items) {
            var _this = this;
            var markup = "<ul>";

            if (
              $.isFunction(_this.options.listBuilder) &&
              _this.options.listBuilder
            ) {
              items = _this.options.listBuilder(items);
            }

            $.each(items, function (i, elm) {
              if (elm.label !== undefined) {
                markup += _this.utils.format(
                  '<ul class="{1}"><li class="{2}">{3}</li>',
                  _this.utils.arrayToClassname([
                    _this.classes.group,
                    elm.groupDisabled ? "disabled" : "",
                    elm.element.prop("class"),
                  ]),
                  _this.classes.grouplabel,
                  elm.element.prop("label")
                );

                $.each(elm.items, function (i, elm) {
                  markup += _this.getItemMarkup(elm.index, elm);
                });

                markup += "</ul>";
              } else {
                markup += _this.getItemMarkup(elm.index, elm);
              }
            });

            return markup + "</ul>";
          },

          /**
           * Generate every option markup
           *
           * @param  {number} index    - Index of current item
           * @param  {object} itemData - Current item
           * @return {string}            HTML for the option
           */
          getItemMarkup: function (index, itemData) {
            var _this = this;
            var itemBuilder = _this.options.optionsItemBuilder;
            // limit access to item data to provide a simple interface
            // to most relevant options.
            var filteredItemData = {
              value: itemData.value,
              text: itemData.text,
              slug: itemData.slug,
              index: itemData.index,
            };

            return _this.utils.format(
              '<li data-index="{1}" class="{2}">{3}</li>',
              index,
              _this.utils.arrayToClassname([
                itemData.className,
                index === _this.items.length - 1 ? "last" : "",
                itemData.disabled ? "disabled" : "",
                itemData.selected ? "selected" : "",
              ]),
              $.isFunction(itemBuilder)
                ? _this.utils.format(
                    itemBuilder(itemData, this.$element, index),
                    itemData
                  )
                : _this.utils.format(itemBuilder, filteredItemData)
            );
          },

          /** Remove events on the elements */
          unbindEvents: function () {
            var _this = this;

            _this.elements.wrapper
              .add(_this.$element)
              .add(_this.elements.outerWrapper)
              .add(_this.elements.input)
              .off(eventNamespaceSuffix);
          },

          /** Bind events on the elements */
          bindEvents: function () {
            var _this = this;

            _this.elements.outerWrapper.on(
              "mouseenter" +
                eventNamespaceSuffix +
                " mouseleave" +
                eventNamespaceSuffix,
              function (e) {
                $(this).toggleClass(
                  _this.classes.hover,
                  e.type === "mouseenter"
                );

                // Delay close effect when openOnHover is true
                if (_this.options.openOnHover) {
                  clearTimeout(_this.closeTimer);

                  if (e.type === "mouseleave") {
                    _this.closeTimer = setTimeout(
                      $.proxy(_this.close, _this),
                      _this.options.hoverIntentTimeout
                    );
                  } else {
                    _this.open();
                  }
                }
              }
            );

            // Toggle open/close
            _this.elements.wrapper.on(
              "click" + eventNamespaceSuffix,
              function (e) {
                _this.state.opened ? _this.close() : _this.open(e);
              }
            );

            // Translate original element focus event to dummy input.
            // Disabled on mobile devices because the default option list isn't
            // shown due the fact that hidden input gets focused
            if (!(_this.options.nativeOnMobile && _this.utils.isMobile())) {
              _this.$element.on("focus" + eventNamespaceSuffix, function () {
                _this.elements.input.focus();
              });

              _this.elements.input
                .prop({ tabindex: _this.originalTabindex, disabled: false })
                .on(
                  "keydown" + eventNamespaceSuffix,
                  $.proxy(_this.handleKeys, _this)
                )
                .on("focusin" + eventNamespaceSuffix, function (e) {
                  _this.elements.outerWrapper.addClass(_this.classes.focus);

                  // Prevent the flicker when focusing out and back again in the browser window
                  _this.elements.input.one("blur", function () {
                    _this.elements.input.blur();
                  });

                  if (_this.options.openOnFocus && !_this.state.opened) {
                    _this.open(e);
                  }
                })
                .on("focusout" + eventNamespaceSuffix, function () {
                  _this.elements.outerWrapper.removeClass(_this.classes.focus);
                })
                .on("input propertychange", function () {
                  var val = _this.elements.input.val();
                  var searchRegExp = new RegExp(
                    "^" + _this.utils.escapeRegExp(val),
                    "i"
                  );

                  // Clear search
                  clearTimeout(_this.resetStr);
                  _this.resetStr = setTimeout(function () {
                    _this.elements.input.val("");
                  }, _this.options.keySearchTimeout);

                  if (val.length) {
                    // Search in select options
                    $.each(_this.items, function (i, elm) {
                      if (elm.disabled) {
                        return;
                      }
                      if (
                        searchRegExp.test(elm.text) ||
                        searchRegExp.test(elm.slug)
                      ) {
                        _this.highlight(i);
                        return;
                      }
                      if (!elm.alt) {
                        return;
                      }
                      var altItems = elm.alt.split("|");
                      for (var ai = 0; ai < altItems.length; ai++) {
                        if (!altItems[ai]) {
                          break;
                        }
                        if (searchRegExp.test(altItems[ai].trim())) {
                          _this.highlight(i);
                          return;
                        }
                      }
                    });
                  }
                });
            }

            _this.$li.on({
              // Prevent <input> blur on Chrome
              mousedown: function (e) {
                e.preventDefault();
                e.stopPropagation();
              },
              click: function () {
                _this.select($(this).data("index"));

                // Chrome doesn't close options box if select is wrapped with a label
                // We need to 'return false' to avoid that
                return false;
              },
            });
          },

          /**
           * Behavior when keyboard keys is pressed
           *
           * @param {object} e - Event object
           */
          handleKeys: function (e) {
            var _this = this;
            var key = e.which;
            var keys = _this.options.keys;

            var isPrevKey = $.inArray(key, keys.previous) > -1;
            var isNextKey = $.inArray(key, keys.next) > -1;
            var isSelectKey = $.inArray(key, keys.select) > -1;
            var isOpenKey = $.inArray(key, keys.open) > -1;
            var idx = _this.state.highlightedIdx;
            var isFirstOrLastItem =
              (isPrevKey && idx === 0) ||
              (isNextKey && idx + 1 === _this.items.length);
            var goToItem = 0;

            // Enter / Space
            if (key === 13 || key === 32) {
              e.preventDefault();
            }

            // If it's a directional key
            if (isPrevKey || isNextKey) {
              if (!_this.options.allowWrap && isFirstOrLastItem) {
                return;
              }

              if (isPrevKey) {
                goToItem = _this.utils.previousEnabledItem(
                  _this.lookupItems,
                  idx
                );
              }

              if (isNextKey) {
                goToItem = _this.utils.nextEnabledItem(_this.lookupItems, idx);
              }

              _this.highlight(goToItem);
            }

            // Tab / Enter / ESC
            if (isSelectKey && _this.state.opened) {
              _this.select(idx);

              if (
                !_this.state.multiple ||
                !_this.options.multiple.keepMenuOpen
              ) {
                _this.close();
              }

              return;
            }

            // Space / Enter / Left / Up / Right / Down
            if (isOpenKey && !_this.state.opened) {
              _this.open();
            }
          },

          /** Update the items object */
          refresh: function () {
            var _this = this;

            _this.populate();
            _this.activate();
            _this.utils.triggerCallback("Refresh", _this);
          },

          /** Set options box width/height */
          setOptionsDimensions: function () {
            var _this = this;

            // Calculate options box height
            // Set a temporary class on the hidden parent of the element
            var hiddenChildren = _this.elements.items
              .closest(":visible")
              .children(":hidden")
              .addClass(_this.classes.tempshow);
            var maxHeight = _this.options.maxHeight;
            var itemsWidth = _this.elements.items.outerWidth();
            var wrapperWidth =
              _this.elements.wrapper.outerWidth() -
              (itemsWidth - _this.elements.items.width());

            // Set the dimensions, minimum is wrapper width, expand for long items if option is true
            if (!_this.options.expandToItemText || wrapperWidth > itemsWidth) {
              _this.finalWidth = wrapperWidth;
            } else {
              // Make sure the scrollbar width is included
              _this.elements.items.css("overflow", "scroll");

              // Set a really long width for _this.elements.outerWrapper
              _this.elements.outerWrapper.width(9e4);
              _this.finalWidth = _this.elements.items.width();
              // Set scroll bar to auto
              _this.elements.items.css("overflow", "");
              _this.elements.outerWrapper.width("");
            }

            _this.elements.items.width(_this.finalWidth).height() > maxHeight &&
              _this.elements.items.height(maxHeight);

            // Remove the temporary class
            hiddenChildren.removeClass(_this.classes.tempshow);
          },

          /** Detect if the options box is inside the window */
          isInViewport: function () {
            var _this = this;

            if (_this.options.forceRenderAbove === true) {
              _this.elements.outerWrapper.addClass(_this.classes.above);
            } else if (_this.options.forceRenderBelow === true) {
              _this.elements.outerWrapper.addClass(_this.classes.below);
            } else {
              var scrollTop = $win.scrollTop();
              var winHeight = $win.height();
              var uiPosX = _this.elements.outerWrapper.offset().top;
              var uiHeight = _this.elements.outerWrapper.outerHeight();

              var fitsDown =
                uiPosX + uiHeight + _this.itemsHeight <= scrollTop + winHeight;
              var fitsAbove = uiPosX - _this.itemsHeight > scrollTop;

              // If it does not fit below, only render it
              // above it fit's there.
              // It's acceptable that the user needs to
              // scroll the viewport to see the cut off UI
              var renderAbove = !fitsDown && fitsAbove;
              var renderBelow = !renderAbove;

              _this.elements.outerWrapper.toggleClass(
                _this.classes.above,
                renderAbove
              );
              _this.elements.outerWrapper.toggleClass(
                _this.classes.below,
                renderBelow
              );
            }
          },

          /**
           * Detect if currently selected option is visible and scroll the options box to show it
           *
           * @param {Number|Array} index - Index of the selected items
           */
          detectItemVisibility: function (index) {
            var _this = this;
            var $filteredLi = _this.$li.filter("[data-index]");

            if (_this.state.multiple) {
              // If index is an array, we can assume a multiple select and we
              // want to scroll to the uppermost selected item!
              // Math.min.apply(Math, index) returns the lowest entry in an Array.
              index = $.isArray(index) && index.length === 0 ? 0 : index;
              index = $.isArray(index) ? Math.min.apply(Math, index) : index;
            }

            var liHeight = $filteredLi.eq(index).outerHeight();
            var liTop = $filteredLi[index].offsetTop;
            var itemsScrollTop = _this.elements.itemsScroll.scrollTop();
            var scrollT = liTop + liHeight * 2;

            _this.elements.itemsScroll.scrollTop(
              scrollT > itemsScrollTop + _this.itemsHeight
                ? scrollT - _this.itemsHeight
                : liTop - liHeight < itemsScrollTop
                ? liTop - liHeight
                : itemsScrollTop
            );
          },

          /**
           * Open the select options box
           *
           * @param {Event} e - Event
           */
          open: function (e) {
            var _this = this;

            if (_this.options.nativeOnMobile && _this.utils.isMobile()) {
              return false;
            }

            _this.utils.triggerCallback("BeforeOpen", _this);

            if (e) {
              e.preventDefault();
              if (_this.options.stopPropagation) {
                e.stopPropagation();
              }
            }

            if (_this.state.enabled) {
              _this.setOptionsDimensions();

              // Find any other opened instances of select and close it
              $("." + _this.classes.hideselect, "." + _this.classes.open)
                .children()
                [pluginName]("close");

              _this.state.opened = true;
              _this.itemsHeight = _this.elements.items.outerHeight();
              _this.itemsInnerHeight = _this.elements.items.height();

              // Toggle options box visibility
              _this.elements.outerWrapper.addClass(_this.classes.open);

              // Give dummy input focus
              _this.elements.input.val("");
              if (e && e.type !== "focusin") {
                _this.elements.input.focus();
              }

              // Delayed binds events on Document to make label clicks work
              setTimeout(function () {
                $doc
                  .on(
                    "click" + eventNamespaceSuffix,
                    $.proxy(_this.close, _this)
                  )
                  .on(
                    "scroll" + eventNamespaceSuffix,
                    $.proxy(_this.isInViewport, _this)
                  );
              }, 1);

              _this.isInViewport();

              // Prevent window scroll when using mouse wheel inside items box
              if (_this.options.preventWindowScroll) {
                /* istanbul ignore next */
                $doc.on(
                  "mousewheel" +
                    eventNamespaceSuffix +
                    " DOMMouseScroll" +
                    eventNamespaceSuffix,
                  "." + _this.classes.scroll,
                  function (e) {
                    var orgEvent = e.originalEvent;
                    var scrollTop = $(this).scrollTop();
                    var deltaY = 0;

                    if ("detail" in orgEvent) {
                      deltaY = orgEvent.detail * -1;
                    }
                    if ("wheelDelta" in orgEvent) {
                      deltaY = orgEvent.wheelDelta;
                    }
                    if ("wheelDeltaY" in orgEvent) {
                      deltaY = orgEvent.wheelDeltaY;
                    }
                    if ("deltaY" in orgEvent) {
                      deltaY = orgEvent.deltaY * -1;
                    }

                    if (
                      (scrollTop ===
                        this.scrollHeight - _this.itemsInnerHeight &&
                        deltaY < 0) ||
                      (scrollTop === 0 && deltaY > 0)
                    ) {
                      e.preventDefault();
                    }
                  }
                );
              }

              _this.detectItemVisibility(_this.state.selectedIdx);

              _this.highlight(
                _this.state.multiple ? -1 : _this.state.selectedIdx
              );

              _this.utils.triggerCallback("Open", _this);
            }
          },

          /** Close the select options box */
          close: function () {
            var _this = this;

            _this.utils.triggerCallback("BeforeClose", _this);

            // Remove custom events on document
            $doc.off(eventNamespaceSuffix);

            // Remove visible class to hide options box
            _this.elements.outerWrapper.removeClass(_this.classes.open);

            _this.state.opened = false;

            _this.utils.triggerCallback("Close", _this);
          },

          /** Select current option and change the label */
          change: function () {
            var _this = this;

            _this.utils.triggerCallback("BeforeChange", _this);

            if (_this.state.multiple) {
              // Reset old selected
              $.each(_this.lookupItems, function (idx) {
                _this.lookupItems[idx].selected = false;
                _this.$element.find("option").prop("selected", false);
              });

              // Set new selected
              $.each(_this.state.selectedIdx, function (idx, value) {
                _this.lookupItems[value].selected = true;
                _this.$element.find("option").eq(value).prop("selected", true);
              });

              _this.state.currValue = _this.state.selectedIdx;

              _this.setLabel();

              _this.utils.triggerCallback("Change", _this);
            } else if (_this.state.currValue !== _this.state.selectedIdx) {
              // Apply changed value to original select
              _this.$element
                .prop(
                  "selectedIndex",
                  (_this.state.currValue = _this.state.selectedIdx)
                )
                .data("value", _this.lookupItems[_this.state.selectedIdx].text);

              // Change label text
              _this.setLabel();

              _this.utils.triggerCallback("Change", _this);
            }
          },

          /**
           * Highlight option
           * @param {number} index - Index of the options that will be highlighted
           */
          highlight: function (index) {
            var _this = this;
            var $filteredLi = _this.$li
              .filter("[data-index]")
              .removeClass("highlighted");

            _this.utils.triggerCallback("BeforeHighlight", _this);

            // Parameter index is required and should not be a disabled item
            if (
              index === undefined ||
              index === -1 ||
              _this.lookupItems[index].disabled
            ) {
              return;
            }

            $filteredLi
              .eq((_this.state.highlightedIdx = index))
              .addClass("highlighted");

            _this.detectItemVisibility(index);

            _this.utils.triggerCallback("Highlight", _this);
          },

          /**
           * Select option
           *
           * @param {number} index - Index of the option that will be selected
           */
          select: function (index) {
            var _this = this;
            var $filteredLi = _this.$li.filter("[data-index]");

            _this.utils.triggerCallback("BeforeSelect", _this, index);

            // Parameter index is required and should not be a disabled item
            if (
              index === undefined ||
              index === -1 ||
              _this.lookupItems[index].disabled
            ) {
              return;
            }

            if (_this.state.multiple) {
              // Make sure selectedIdx is an array
              _this.state.selectedIdx = $.isArray(_this.state.selectedIdx)
                ? _this.state.selectedIdx
                : [_this.state.selectedIdx];

              var hasSelectedIndex = $.inArray(index, _this.state.selectedIdx);
              if (hasSelectedIndex !== -1) {
                _this.state.selectedIdx.splice(hasSelectedIndex, 1);
              } else {
                _this.state.selectedIdx.push(index);
              }

              $filteredLi
                .removeClass("selected")
                .filter(function (index) {
                  return $.inArray(index, _this.state.selectedIdx) !== -1;
                })
                .addClass("selected");
            } else {
              $filteredLi
                .removeClass("selected")
                .eq((_this.state.selectedIdx = index))
                .addClass("selected");
            }

            if (!_this.state.multiple || !_this.options.multiple.keepMenuOpen) {
              _this.close();
            }

            _this.change();

            _this.utils.triggerCallback("Select", _this, index);
          },

          /**
           * Unbind and remove
           *
           * @param {boolean} preserveData - Check if the data on the element should be removed too
           */
          destroy: function (preserveData) {
            var _this = this;

            if (_this.state && _this.state.enabled) {
              _this.elements.items
                .add(_this.elements.wrapper)
                .add(_this.elements.input)
                .remove();

              if (!preserveData) {
                _this.$element.removeData(pluginName).removeData("value");
              }

              _this.$element
                .prop("tabindex", _this.originalTabindex)
                .off(eventNamespaceSuffix)
                .off(_this.eventTriggers)
                .unwrap()
                .unwrap();

              _this.state.enabled = false;
            }
          },
        };

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[pluginName] = function (args) {
          return this.each(function () {
            var data = $.data(this, pluginName);

            if (data && !data.disableOnMobile) {
              typeof args === "string" && data[args]
                ? data[args]()
                : data.init(args);
            } else {
              $.data(this, pluginName, new Selectric(this, args));
            }
          });
        };

        /**
         * Default plugin options
         *
         * @type {object}
         */
        $.fn[pluginName].defaults = {
          onChange: function (elm) {
            $(elm).change();
          },
          maxHeight: 300,
          keySearchTimeout: 500,
          arrowButtonMarkup: '<b class="button">&#x25be;</b>',
          disableOnMobile: false,
          nativeOnMobile: true,
          openOnFocus: true,
          openOnHover: false,
          hoverIntentTimeout: 500,
          expandToItemText: false,
          responsive: false,
          preventWindowScroll: true,
          inheritOriginalWidth: false,
          allowWrap: true,
          forceRenderAbove: false,
          forceRenderBelow: false,
          stopPropagation: true,
          optionsItemBuilder: "{text}", // function(itemData, element, index)
          labelBuilder: "{text}", // function(currItem)
          listBuilder: false, // function(items)
          keys: {
            previous: [37, 38], // Left / Up
            next: [39, 40], // Right / Down
            select: [9, 13, 27], // Tab / Enter / Escape
            open: [13, 32, 37, 38, 39, 40], // Enter / Space / Left / Up / Right / Down
            close: [9, 27], // Tab / Escape
          },
          customClass: {
            prefix: pluginName,
            camelCase: false,
          },
          multiple: {
            separator: ", ",
            keepMenuOpen: true,
            maxLabelEntries: false,
          },
        };
      });

      /***/
    },
    /* 48 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      __webpack_require__(49);

      __webpack_require__(91);

      __webpack_require__(93);

      __webpack_require__(95);

      __webpack_require__(96);

      __webpack_require__(97);

      __webpack_require__(98);

      __webpack_require__(99);

      __webpack_require__(100);

      __webpack_require__(101);

      __webpack_require__(102);

      __webpack_require__(103);

      __webpack_require__(104);

      __webpack_require__(105);

      __webpack_require__(106);

      __webpack_require__(45);

      __webpack_require__(107);

      __webpack_require__(108);

      __webpack_require__(109);

      __webpack_require__(17);

      __webpack_require__(110);

      __webpack_require__(111);

      __webpack_require__(112);

      __webpack_require__(113);

      __webpack_require__(114);

      __webpack_require__(115);

      __webpack_require__(116);

      __webpack_require__(117);

      __webpack_require__(118);

      __webpack_require__(120);

      /***/
    },
    /* 49 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_filter__ =
        __webpack_require__(50);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_filter___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_0_core_js_modules_es_array_filter__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_for_each__ =
        __webpack_require__(69);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_for_each___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es_array_for_each__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_reduce__ =
        __webpack_require__(70);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_reduce___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_2_core_js_modules_es_array_reduce__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_function_name__ =
        __webpack_require__(72);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_function_name___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_3_core_js_modules_es_function_name__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_object_assign__ =
        __webpack_require__(73);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_object_assign___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_4_core_js_modules_es_object_assign__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_parse_int__ =
        __webpack_require__(76);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_parse_int___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_5_core_js_modules_es_parse_int__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_regexp_exec__ =
        __webpack_require__(79);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_regexp_exec___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_6_core_js_modules_es_regexp_exec__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_string_match__ =
        __webpack_require__(81);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_string_match___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_7_core_js_modules_es_string_match__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_string_replace__ =
        __webpack_require__(83);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_string_replace___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_8_core_js_modules_es_string_replace__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_web_dom_collections_for_each__ =
        __webpack_require__(84);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_modules_web_dom_collections_for_each___default =
        __webpack_require__.n(
          __WEBPACK_IMPORTED_MODULE_9_core_js_modules_web_dom_collections_for_each__
        );
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_throttle__ =
        __webpack_require__(86);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_lodash_throttle___default =
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_lodash_throttle__);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_debounce__ =
        __webpack_require__(87);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash_debounce___default =
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash_debounce__);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash_memoize__ =
        __webpack_require__(88);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash_memoize___default =
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_lodash_memoize__);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_resize_observer_polyfill__ =
        __webpack_require__(89);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_can_use_dom__ =
        __webpack_require__(90);
      /* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_can_use_dom___default =
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_can_use_dom__);
      /**
       * SimpleBar.js - v4.1.0
       * Scrollbars, simpler.
       * https://grsmto.github.io/simplebar/
       *
       * Made by Adrien Denat from a fork by Jonathan Nicol
       * Under MIT License
       */

      function scrollbarWidth() {
        if (typeof document === "undefined") {
          return 0;
        }

        var body = document.body;
        var box = document.createElement("div");
        var boxStyle = box.style;
        boxStyle.position = "fixed";
        boxStyle.left = 0;
        boxStyle.visibility = "hidden";
        boxStyle.overflowY = "scroll";
        body.appendChild(box);
        var width = box.getBoundingClientRect().right;
        body.removeChild(box);
        return width;
      }

      var SimpleBar =
        /*#__PURE__*/
        (function () {
          function SimpleBar(element, options) {
            var _this = this;

            this.onScroll = function () {
              if (!_this.scrollXTicking) {
                window.requestAnimationFrame(_this.scrollX);
                _this.scrollXTicking = true;
              }

              if (!_this.scrollYTicking) {
                window.requestAnimationFrame(_this.scrollY);
                _this.scrollYTicking = true;
              }
            };

            this.scrollX = function () {
              if (_this.axis.x.isOverflowing) {
                _this.showScrollbar("x");

                _this.positionScrollbar("x");
              }

              _this.scrollXTicking = false;
            };

            this.scrollY = function () {
              if (_this.axis.y.isOverflowing) {
                _this.showScrollbar("y");

                _this.positionScrollbar("y");
              }

              _this.scrollYTicking = false;
            };

            this.onMouseEnter = function () {
              _this.showScrollbar("x");

              _this.showScrollbar("y");
            };

            this.onMouseMove = function (e) {
              _this.mouseX = e.clientX;
              _this.mouseY = e.clientY;

              if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseMoveForAxis("x");
              }

              if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseMoveForAxis("y");
              }
            };

            this.onMouseLeave = function () {
              _this.onMouseMove.cancel();

              if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseLeaveForAxis("x");
              }

              if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseLeaveForAxis("y");
              }

              _this.mouseX = -1;
              _this.mouseY = -1;
            };

            this.onWindowResize = function () {
              // Recalculate scrollbarWidth in case it's a zoom
              _this.scrollbarWidth = scrollbarWidth();

              _this.hideNativeScrollbar();
            };

            this.hideScrollbars = function () {
              _this.axis.x.track.rect =
                _this.axis.x.track.el.getBoundingClientRect();
              _this.axis.y.track.rect =
                _this.axis.y.track.el.getBoundingClientRect();

              if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
                _this.axis.y.scrollbar.el.classList.remove(
                  _this.classNames.visible
                );

                _this.axis.y.isVisible = false;
              }

              if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
                _this.axis.x.scrollbar.el.classList.remove(
                  _this.classNames.visible
                );

                _this.axis.x.isVisible = false;
              }
            };

            this.onPointerEvent = function (e) {
              var isWithinBoundsY, isWithinBoundsX;
              _this.axis.x.scrollbar.rect =
                _this.axis.x.scrollbar.el.getBoundingClientRect();
              _this.axis.y.scrollbar.rect =
                _this.axis.y.scrollbar.el.getBoundingClientRect();

              if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                isWithinBoundsX = _this.isWithinBounds(
                  _this.axis.x.scrollbar.rect
                );
              }

              if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                isWithinBoundsY = _this.isWithinBounds(
                  _this.axis.y.scrollbar.rect
                );
              } // If any pointer event is called on the scrollbar

              if (isWithinBoundsY || isWithinBoundsX) {
                // Preventing the event's default action stops text being
                // selectable during the drag.
                e.preventDefault(); // Prevent event leaking

                e.stopPropagation();

                if (e.type === "mousedown") {
                  if (isWithinBoundsY) {
                    _this.onDragStart(e, "y");
                  }

                  if (isWithinBoundsX) {
                    _this.onDragStart(e, "x");
                  }
                }
              }
            };

            this.drag = function (e) {
              var eventOffset;
              var track = _this.axis[_this.draggedAxis].track;
              var trackSize =
                track.rect[_this.axis[_this.draggedAxis].sizeAttr];
              var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
              e.preventDefault();
              e.stopPropagation();

              if (_this.draggedAxis === "y") {
                eventOffset = e.pageY;
              } else {
                eventOffset = e.pageX;
              } // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).

              var dragPos =
                eventOffset -
                track.rect[_this.axis[_this.draggedAxis].offsetAttr] -
                _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

              var dragPerc =
                dragPos / track.rect[_this.axis[_this.draggedAxis].sizeAttr]; // Scroll the content by the same percentage.

              var scrollPos =
                dragPerc *
                _this.contentWrapperEl[
                  _this.axis[_this.draggedAxis].scrollSizeAttr
                ]; // Fix browsers inconsistency on RTL

              if (_this.draggedAxis === "x") {
                scrollPos =
                  _this.isRtl &&
                  SimpleBar.getRtlHelpers().isRtlScrollbarInverted
                    ? scrollPos - (trackSize + scrollbar.size)
                    : scrollPos;
                scrollPos =
                  _this.isRtl &&
                  SimpleBar.getRtlHelpers().isRtlScrollingInverted
                    ? -scrollPos
                    : scrollPos;
              }

              _this.contentWrapperEl[
                _this.axis[_this.draggedAxis].scrollOffsetAttr
              ] = scrollPos;
            };

            this.onEndDrag = function (e) {
              e.preventDefault();
              e.stopPropagation();

              _this.el.classList.remove(_this.classNames.dragging);

              document.removeEventListener("mousemove", _this.drag, true);
              document.removeEventListener("mouseup", _this.onEndDrag, true);
              _this.removePreventClickId = window.setTimeout(function () {
                // Remove these asynchronously so we still suppress click events
                // generated simultaneously with mouseup.
                document.removeEventListener("click", _this.preventClick, true);
                document.removeEventListener(
                  "dblclick",
                  _this.preventClick,
                  true
                );
                _this.removePreventClickId = null;
              });
            };

            this.preventClick = function (e) {
              e.preventDefault();
              e.stopPropagation();
            };

            this.el = element;
            this.flashTimeout;
            this.contentEl;
            this.contentWrapperEl;
            this.offsetEl;
            this.maskEl;
            this.globalObserver;
            this.mutationObserver;
            this.resizeObserver;
            this.scrollbarWidth;
            this.minScrollbarWidth = 20;
            this.options = Object.assign({}, SimpleBar.defaultOptions, options);
            this.classNames = Object.assign(
              {},
              SimpleBar.defaultOptions.classNames,
              this.options.classNames
            );
            this.isRtl;
            this.axis = {
              x: {
                scrollOffsetAttr: "scrollLeft",
                sizeAttr: "width",
                scrollSizeAttr: "scrollWidth",
                offsetAttr: "left",
                overflowAttr: "overflowX",
                dragOffset: 0,
                isOverflowing: true,
                isVisible: false,
                forceVisible: false,
                track: {},
                scrollbar: {},
              },
              y: {
                scrollOffsetAttr: "scrollTop",
                sizeAttr: "height",
                scrollSizeAttr: "scrollHeight",
                offsetAttr: "top",
                overflowAttr: "overflowY",
                dragOffset: 0,
                isOverflowing: true,
                isVisible: false,
                forceVisible: false,
                track: {},
                scrollbar: {},
              },
            };
            this.removePreventClickId = null; // Don't re-instantiate over an existing one

            if (this.el.SimpleBar) {
              return;
            }

            this.recalculate =
              __WEBPACK_IMPORTED_MODULE_10_lodash_throttle___default()(
                this.recalculate.bind(this),
                64
              );
            this.onMouseMove =
              __WEBPACK_IMPORTED_MODULE_10_lodash_throttle___default()(
                this.onMouseMove.bind(this),
                64
              );
            this.hideScrollbars =
              __WEBPACK_IMPORTED_MODULE_11_lodash_debounce___default()(
                this.hideScrollbars.bind(this),
                this.options.timeout
              );
            this.onWindowResize =
              __WEBPACK_IMPORTED_MODULE_11_lodash_debounce___default()(
                this.onWindowResize.bind(this),
                64,
                {
                  leading: true,
                }
              );
            SimpleBar.getRtlHelpers =
              __WEBPACK_IMPORTED_MODULE_12_lodash_memoize___default()(
                SimpleBar.getRtlHelpers
              );
            this.init();
          }
          /**
           * Static properties
           */

          /**
           * Helper to fix browsers inconsistency on RTL:
           *  - Firefox inverts the scrollbar initial position
           *  - IE11 inverts both scrollbar position and scrolling offset
           * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
           */

          SimpleBar.getRtlHelpers = function getRtlHelpers() {
            var dummyDiv = document.createElement("div");
            dummyDiv.innerHTML =
              '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
            var scrollbarDummyEl = dummyDiv.firstElementChild;
            document.body.appendChild(scrollbarDummyEl);
            var dummyContainerChild = scrollbarDummyEl.firstElementChild;
            scrollbarDummyEl.scrollLeft = 0;
            var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
            var dummyContainerChildOffset =
              SimpleBar.getOffset(dummyContainerChild);
            scrollbarDummyEl.scrollLeft = 999;
            var dummyContainerScrollOffsetAfterScroll =
              SimpleBar.getOffset(dummyContainerChild);
            return {
              // determines if the scrolling is responding with negative values
              isRtlScrollingInverted:
                dummyContainerOffset.left !== dummyContainerChildOffset.left &&
                dummyContainerChildOffset.left -
                  dummyContainerScrollOffsetAfterScroll.left !==
                  0,
              // determines if the origin scrollbar position is inverted or not (positioned on left or right)
              isRtlScrollbarInverted:
                dummyContainerOffset.left !== dummyContainerChildOffset.left,
            };
          };

          SimpleBar.initHtmlApi = function initHtmlApi() {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

            if (typeof MutationObserver !== "undefined") {
              // Mutation observer to observe dynamically added elements
              this.globalObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                  Array.prototype.forEach.call(
                    mutation.addedNodes,
                    function (addedNode) {
                      if (addedNode.nodeType === 1) {
                        if (addedNode.hasAttribute("data-simplebar")) {
                          !addedNode.SimpleBar &&
                            new SimpleBar(
                              addedNode,
                              SimpleBar.getElOptions(addedNode)
                            );
                        } else {
                          Array.prototype.forEach.call(
                            addedNode.querySelectorAll("[data-simplebar]"),
                            function (el) {
                              !el.SimpleBar &&
                                new SimpleBar(el, SimpleBar.getElOptions(el));
                            }
                          );
                        }
                      }
                    }
                  );
                  Array.prototype.forEach.call(
                    mutation.removedNodes,
                    function (removedNode) {
                      if (removedNode.nodeType === 1) {
                        if (removedNode.hasAttribute("data-simplebar")) {
                          removedNode.SimpleBar &&
                            removedNode.SimpleBar.unMount();
                        } else {
                          Array.prototype.forEach.call(
                            removedNode.querySelectorAll("[data-simplebar]"),
                            function (el) {
                              el.SimpleBar && el.SimpleBar.unMount();
                            }
                          );
                        }
                      }
                    }
                  );
                });
              });
              this.globalObserver.observe(document, {
                childList: true,
                subtree: true,
              });
            } // Taken from jQuery `ready` function
            // Instantiate elements already present on the page

            if (
              document.readyState === "complete" ||
              (document.readyState !== "loading" &&
                !document.documentElement.doScroll)
            ) {
              // Handle it asynchronously to allow scripts the opportunity to delay init
              window.setTimeout(this.initDOMLoadedElements);
            } else {
              document.addEventListener(
                "DOMContentLoaded",
                this.initDOMLoadedElements
              );
              window.addEventListener("load", this.initDOMLoadedElements);
            }
          }; // Helper function to retrieve options from element attributes

          SimpleBar.getElOptions = function getElOptions(el) {
            var options = Array.prototype.reduce.call(
              el.attributes,
              function (acc, attribute) {
                var option = attribute.name.match(/data-simplebar-(.+)/);

                if (option) {
                  var key = option[1].replace(/\W+(.)/g, function (x, chr) {
                    return chr.toUpperCase();
                  });

                  switch (attribute.value) {
                    case "true":
                      acc[key] = true;
                      break;

                    case "false":
                      acc[key] = false;
                      break;

                    case undefined:
                      acc[key] = true;
                      break;

                    default:
                      acc[key] = attribute.value;
                  }
                }

                return acc;
              },
              {}
            );
            return options;
          };

          SimpleBar.removeObserver = function removeObserver() {
            this.globalObserver.disconnect();
          };

          SimpleBar.initDOMLoadedElements = function initDOMLoadedElements() {
            document.removeEventListener(
              "DOMContentLoaded",
              this.initDOMLoadedElements
            );
            window.removeEventListener("load", this.initDOMLoadedElements);
            Array.prototype.forEach.call(
              document.querySelectorAll("[data-simplebar]"),
              function (el) {
                if (!el.SimpleBar)
                  new SimpleBar(el, SimpleBar.getElOptions(el));
              }
            );
          };

          SimpleBar.getOffset = function getOffset(el) {
            var rect = el.getBoundingClientRect();
            return {
              top:
                rect.top +
                (window.pageYOffset || document.documentElement.scrollTop),
              left:
                rect.left +
                (window.pageXOffset || document.documentElement.scrollLeft),
            };
          };

          var _proto = SimpleBar.prototype;

          _proto.init = function init() {
            // Save a reference to the instance, so we know this DOM node has already been instancied
            this.el.SimpleBar = this; // We stop here on server-side

            if (__WEBPACK_IMPORTED_MODULE_14_can_use_dom___default.a) {
              this.initDOM();
              this.scrollbarWidth = scrollbarWidth();
              this.recalculate();
              this.initListeners();
            }
          };

          _proto.initDOM = function initDOM() {
            var _this2 = this;

            // make sure this element doesn't have the elements yet
            if (
              Array.prototype.filter.call(this.el.children, function (child) {
                return child.classList.contains(_this2.classNames.wrapper);
              }).length
            ) {
              // assume that element has his DOM already initiated
              this.wrapperEl = this.el.querySelector(
                "." + this.classNames.wrapper
              );
              this.contentWrapperEl = this.el.querySelector(
                "." + this.classNames.contentWrapper
              );
              this.offsetEl = this.el.querySelector(
                "." + this.classNames.offset
              );
              this.maskEl = this.el.querySelector("." + this.classNames.mask);
              this.contentEl = this.el.querySelector(
                "." + this.classNames.contentEl
              );
              this.placeholderEl = this.el.querySelector(
                "." + this.classNames.placeholder
              );
              this.heightAutoObserverWrapperEl = this.el.querySelector(
                "." + this.classNames.heightAutoObserverWrapperEl
              );
              this.heightAutoObserverEl = this.el.querySelector(
                "." + this.classNames.heightAutoObserverEl
              );
              this.axis.x.track.el = this.el.querySelector(
                "." + this.classNames.track + "." + this.classNames.horizontal
              );
              this.axis.y.track.el = this.el.querySelector(
                "." + this.classNames.track + "." + this.classNames.vertical
              );
            } else {
              // Prepare DOM
              this.wrapperEl = document.createElement("div");
              this.contentWrapperEl = document.createElement("div");
              this.offsetEl = document.createElement("div");
              this.maskEl = document.createElement("div");
              this.contentEl = document.createElement("div");
              this.placeholderEl = document.createElement("div");
              this.heightAutoObserverWrapperEl = document.createElement("div");
              this.heightAutoObserverEl = document.createElement("div");
              this.wrapperEl.classList.add(this.classNames.wrapper);
              this.contentWrapperEl.classList.add(
                this.classNames.contentWrapper
              );
              this.offsetEl.classList.add(this.classNames.offset);
              this.maskEl.classList.add(this.classNames.mask);
              this.contentEl.classList.add(this.classNames.contentEl);
              this.placeholderEl.classList.add(this.classNames.placeholder);
              this.heightAutoObserverWrapperEl.classList.add(
                this.classNames.heightAutoObserverWrapperEl
              );
              this.heightAutoObserverEl.classList.add(
                this.classNames.heightAutoObserverEl
              );

              while (this.el.firstChild) {
                this.contentEl.appendChild(this.el.firstChild);
              }

              this.contentWrapperEl.appendChild(this.contentEl);
              this.offsetEl.appendChild(this.contentWrapperEl);
              this.maskEl.appendChild(this.offsetEl);
              this.heightAutoObserverWrapperEl.appendChild(
                this.heightAutoObserverEl
              );
              this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
              this.wrapperEl.appendChild(this.maskEl);
              this.wrapperEl.appendChild(this.placeholderEl);
              this.el.appendChild(this.wrapperEl);
            }

            if (!this.axis.x.track.el || !this.axis.y.track.el) {
              var track = document.createElement("div");
              var scrollbar = document.createElement("div");
              track.classList.add(this.classNames.track);
              scrollbar.classList.add(this.classNames.scrollbar);
              track.appendChild(scrollbar);
              this.axis.x.track.el = track.cloneNode(true);
              this.axis.x.track.el.classList.add(this.classNames.horizontal);
              this.axis.y.track.el = track.cloneNode(true);
              this.axis.y.track.el.classList.add(this.classNames.vertical);
              this.el.appendChild(this.axis.x.track.el);
              this.el.appendChild(this.axis.y.track.el);
            }

            this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
              "." + this.classNames.scrollbar
            );
            this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
              "." + this.classNames.scrollbar
            );

            if (!this.options.autoHide) {
              this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
              this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
            }

            this.el.setAttribute("data-simplebar", "init");
          };

          _proto.initListeners = function initListeners() {
            var _this3 = this;

            // Event listeners
            if (this.options.autoHide) {
              this.el.addEventListener("mouseenter", this.onMouseEnter);
            }

            [
              "mousedown",
              "click",
              "dblclick",
              "touchstart",
              "touchend",
              "touchmove",
            ].forEach(function (e) {
              _this3.el.addEventListener(e, _this3.onPointerEvent, true);
            });
            this.el.addEventListener("mousemove", this.onMouseMove);
            this.el.addEventListener("mouseleave", this.onMouseLeave);
            this.contentWrapperEl.addEventListener("scroll", this.onScroll); // Browser zoom triggers a window resize

            window.addEventListener("resize", this.onWindowResize);
            this.resizeObserver =
              new __WEBPACK_IMPORTED_MODULE_13_resize_observer_polyfill__[
                "a" /* default */
              ](this.recalculate);
            this.resizeObserver.observe(this.el);
            this.resizeObserver.observe(this.contentEl);
          };

          _proto.recalculate = function recalculate() {
            var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
            var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
            this.elStyles = window.getComputedStyle(this.el);
            this.isRtl = this.elStyles.direction === "rtl";
            this.contentEl.style.padding =
              this.elStyles.paddingTop +
              " " +
              this.elStyles.paddingRight +
              " " +
              this.elStyles.paddingBottom +
              " " +
              this.elStyles.paddingLeft;
            this.wrapperEl.style.margin =
              "-" +
              this.elStyles.paddingTop +
              " -" +
              this.elStyles.paddingRight +
              " -" +
              this.elStyles.paddingBottom +
              " -" +
              this.elStyles.paddingLeft;
            this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%"; // Determine placeholder size

            this.placeholderEl.style.width = isWidthAuto
              ? this.contentEl.offsetWidth + "px"
              : "auto";
            this.placeholderEl.style.height =
              this.contentEl.scrollHeight + "px"; // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)

            this.axis.x.isOverflowing =
              this.contentWrapperEl.scrollWidth >
              this.contentWrapperEl.offsetWidth;
            this.axis.y.isOverflowing =
              this.contentWrapperEl.scrollHeight >
              this.contentWrapperEl.offsetHeight; // Set isOverflowing to false if user explicitely set hidden overflow

            this.axis.x.isOverflowing =
              this.elStyles.overflowX === "hidden"
                ? false
                : this.axis.x.isOverflowing;
            this.axis.y.isOverflowing =
              this.elStyles.overflowY === "hidden"
                ? false
                : this.axis.y.isOverflowing;
            this.axis.x.forceVisible =
              this.options.forceVisible === "x" ||
              this.options.forceVisible === true;
            this.axis.y.forceVisible =
              this.options.forceVisible === "y" ||
              this.options.forceVisible === true;
            this.hideNativeScrollbar();
            this.axis.x.track.rect =
              this.axis.x.track.el.getBoundingClientRect();
            this.axis.y.track.rect =
              this.axis.y.track.el.getBoundingClientRect();
            this.axis.x.scrollbar.size = this.getScrollbarSize("x");
            this.axis.y.scrollbar.size = this.getScrollbarSize("y");
            this.axis.x.scrollbar.el.style.width =
              this.axis.x.scrollbar.size + "px";
            this.axis.y.scrollbar.el.style.height =
              this.axis.y.scrollbar.size + "px";
            this.positionScrollbar("x");
            this.positionScrollbar("y");
            this.toggleTrackVisibility("x");
            this.toggleTrackVisibility("y");
          };
          /**
           * Calculate scrollbar size
           */

          _proto.getScrollbarSize = function getScrollbarSize(axis) {
            if (axis === void 0) {
              axis = "y";
            }

            var contentSize = this.scrollbarWidth
              ? this.contentWrapperEl[this.axis[axis].scrollSizeAttr]
              : this.contentWrapperEl[this.axis[axis].scrollSizeAttr] -
                this.minScrollbarWidth;
            var trackSize =
              this.axis[axis].track.rect[this.axis[axis].sizeAttr];
            var scrollbarSize;

            if (!this.axis[axis].isOverflowing) {
              return;
            }

            var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

            scrollbarSize = Math.max(
              ~~(scrollbarRatio * trackSize),
              this.options.scrollbarMinSize
            );

            if (this.options.scrollbarMaxSize) {
              scrollbarSize = Math.min(
                scrollbarSize,
                this.options.scrollbarMaxSize
              );
            }

            return scrollbarSize;
          };

          _proto.positionScrollbar = function positionScrollbar(axis) {
            if (axis === void 0) {
              axis = "y";
            }

            var contentSize =
              this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
            var trackSize =
              this.axis[axis].track.rect[this.axis[axis].sizeAttr];
            var hostSize = parseInt(
              this.elStyles[this.axis[axis].sizeAttr],
              10
            );
            var scrollbar = this.axis[axis].scrollbar;
            var scrollOffset =
              this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
            scrollOffset =
              axis === "x" &&
              this.isRtl &&
              SimpleBar.getRtlHelpers().isRtlScrollingInverted
                ? -scrollOffset
                : scrollOffset;
            var scrollPourcent = scrollOffset / (contentSize - hostSize);
            var handleOffset = ~~(
              (trackSize - scrollbar.size) *
              scrollPourcent
            );
            handleOffset =
              axis === "x" &&
              this.isRtl &&
              SimpleBar.getRtlHelpers().isRtlScrollbarInverted
                ? handleOffset + (trackSize - scrollbar.size)
                : handleOffset;
            scrollbar.el.style.transform =
              axis === "x"
                ? "translate3d(" + handleOffset + "px, 0, 0)"
                : "translate3d(0, " + handleOffset + "px, 0)";
          };

          _proto.toggleTrackVisibility = function toggleTrackVisibility(axis) {
            if (axis === void 0) {
              axis = "y";
            }

            var track = this.axis[axis].track.el;
            var scrollbar = this.axis[axis].scrollbar.el;

            if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
              track.style.visibility = "visible";
              this.contentWrapperEl.style[this.axis[axis].overflowAttr] =
                "scroll";
            } else {
              track.style.visibility = "hidden";
              this.contentWrapperEl.style[this.axis[axis].overflowAttr] =
                "hidden";
            } // Even if forceVisible is enabled, scrollbar itself should be hidden

            if (this.axis[axis].isOverflowing) {
              scrollbar.style.display = "block";
            } else {
              scrollbar.style.display = "none";
            }
          };

          _proto.hideNativeScrollbar = function hideNativeScrollbar() {
            this.offsetEl.style[this.isRtl ? "left" : "right"] =
              this.axis.y.isOverflowing || this.axis.y.forceVisible
                ? "-" + (this.scrollbarWidth || this.minScrollbarWidth) + "px"
                : 0;
            this.offsetEl.style.bottom =
              this.axis.x.isOverflowing || this.axis.x.forceVisible
                ? "-" + (this.scrollbarWidth || this.minScrollbarWidth) + "px"
                : 0; // If floating scrollbar

            if (!this.scrollbarWidth) {
              var paddingDirection = [
                this.isRtl ? "paddingLeft" : "paddingRight",
              ];
              this.contentWrapperEl.style[paddingDirection] =
                this.axis.y.isOverflowing || this.axis.y.forceVisible
                  ? this.minScrollbarWidth + "px"
                  : 0;
              this.contentWrapperEl.style.paddingBottom =
                this.axis.x.isOverflowing || this.axis.x.forceVisible
                  ? this.minScrollbarWidth + "px"
                  : 0;
            }
          };
          /**
           * On scroll event handling
           */

          _proto.onMouseMoveForAxis = function onMouseMoveForAxis(axis) {
            if (axis === void 0) {
              axis = "y";
            }

            this.axis[axis].track.rect =
              this.axis[axis].track.el.getBoundingClientRect();
            this.axis[axis].scrollbar.rect =
              this.axis[axis].scrollbar.el.getBoundingClientRect();
            var isWithinScrollbarBoundsX = this.isWithinBounds(
              this.axis[axis].scrollbar.rect
            );

            if (isWithinScrollbarBoundsX) {
              this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
            } else {
              this.axis[axis].scrollbar.el.classList.remove(
                this.classNames.hover
              );
            }

            if (this.isWithinBounds(this.axis[axis].track.rect)) {
              this.showScrollbar(axis);
              this.axis[axis].track.el.classList.add(this.classNames.hover);
            } else {
              this.axis[axis].track.el.classList.remove(this.classNames.hover);
            }
          };

          _proto.onMouseLeaveForAxis = function onMouseLeaveForAxis(axis) {
            if (axis === void 0) {
              axis = "y";
            }

            this.axis[axis].track.el.classList.remove(this.classNames.hover);
            this.axis[axis].scrollbar.el.classList.remove(
              this.classNames.hover
            );
          };

          /**
           * Show scrollbar
           */
          _proto.showScrollbar = function showScrollbar(axis) {
            if (axis === void 0) {
              axis = "y";
            }

            var scrollbar = this.axis[axis].scrollbar.el;

            if (!this.axis[axis].isVisible) {
              scrollbar.classList.add(this.classNames.visible);
              this.axis[axis].isVisible = true;
            }

            if (this.options.autoHide) {
              this.hideScrollbars();
            }
          };
          /**
           * Hide Scrollbar
           */

          /**
           * on scrollbar handle drag movement starts
           */
          _proto.onDragStart = function onDragStart(e, axis) {
            if (axis === void 0) {
              axis = "y";
            }

            var scrollbar = this.axis[axis].scrollbar.el; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

            var eventOffset = axis === "y" ? e.pageY : e.pageX;
            this.axis[axis].dragOffset =
              eventOffset -
              scrollbar.getBoundingClientRect()[this.axis[axis].offsetAttr];
            this.draggedAxis = axis;
            this.el.classList.add(this.classNames.dragging);
            document.addEventListener("mousemove", this.drag, true);
            document.addEventListener("mouseup", this.onEndDrag, true);

            if (this.removePreventClickId === null) {
              document.addEventListener("click", this.preventClick, true);
              document.addEventListener("dblclick", this.preventClick, true);
            } else {
              window.clearTimeout(this.removePreventClickId);
              this.removePreventClickId = null;
            }
          };
          /**
           * Drag scrollbar handle
           */

          /**
           * Getter for content element
           */
          _proto.getContentElement = function getContentElement() {
            return this.contentEl;
          };
          /**
           * Getter for original scrolling element
           */

          _proto.getScrollElement = function getScrollElement() {
            return this.contentWrapperEl;
          };

          _proto.removeListeners = function removeListeners() {
            var _this4 = this;

            // Event listeners
            if (this.options.autoHide) {
              this.el.removeEventListener("mouseenter", this.onMouseEnter);
            }

            [
              "mousedown",
              "click",
              "dblclick",
              "touchstart",
              "touchend",
              "touchmove",
            ].forEach(function (e) {
              _this4.el.removeEventListener(e, _this4.onPointerEvent);
            });
            this.el.removeEventListener("mousemove", this.onMouseMove);
            this.el.removeEventListener("mouseleave", this.onMouseLeave);
            this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
            window.removeEventListener("resize", this.onWindowResize);
            this.mutationObserver && this.mutationObserver.disconnect();
            this.resizeObserver.disconnect(); // Cancel all debounced functions

            this.recalculate.cancel();
            this.onMouseMove.cancel();
            this.hideScrollbars.cancel();
            this.onWindowResize.cancel();
          };
          /**
           * UnMount mutation observer and delete SimpleBar instance from DOM element
           */

          _proto.unMount = function unMount() {
            this.removeListeners();
            this.el.SimpleBar = null;
          };
          /**
           * Recursively walks up the parent nodes looking for this.el
           */

          _proto.isChildNode = function isChildNode(el) {
            if (el === null) return false;
            if (el === this.el) return true;
            return this.isChildNode(el.parentNode);
          };
          /**
           * Check if mouse is within bounds
           */

          _proto.isWithinBounds = function isWithinBounds(bbox) {
            return (
              this.mouseX >= bbox.left &&
              this.mouseX <= bbox.left + bbox.width &&
              this.mouseY >= bbox.top &&
              this.mouseY <= bbox.top + bbox.height
            );
          };

          return SimpleBar;
        })();
      /**
       * HTML API
       * Called only in a browser env.
       */

      SimpleBar.defaultOptions = {
        autoHide: true,
        forceVisible: false,
        classNames: {
          contentEl: "simplebar-content",
          contentWrapper: "simplebar-content-wrapper",
          offset: "simplebar-offset",
          mask: "simplebar-mask",
          wrapper: "simplebar-wrapper",
          placeholder: "simplebar-placeholder",
          scrollbar: "simplebar-scrollbar",
          track: "simplebar-track",
          heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
          heightAutoObserverEl: "simplebar-height-auto-observer",
          visible: "simplebar-visible",
          horizontal: "simplebar-horizontal",
          vertical: "simplebar-vertical",
          hover: "simplebar-hover",
          dragging: "simplebar-dragging",
        },
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        timeout: 1000,
      };

      if (__WEBPACK_IMPORTED_MODULE_14_can_use_dom___default.a) {
        SimpleBar.initHtmlApi();
      }

      /* harmony default export */ __webpack_exports__["default"] = SimpleBar;
      //# sourceMappingURL=simplebar.esm.js.map

      /***/
    },
    /* 50 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var $ = __webpack_require__(3);
      var $filter = __webpack_require__(36).filter;
      var arrayMethodHasSpeciesSupport = __webpack_require__(68);

      // `Array.prototype.filter` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.filter
      // with adding support of @@species
      $(
        {
          target: "Array",
          proto: true,
          forced: !arrayMethodHasSpeciesSupport("filter"),
        },
        {
          filter: function filter(callbackfn /* , thisArg */) {
            return $filter(
              this,
              callbackfn,
              arguments.length > 1 ? arguments[1] : undefined
            );
          },
        }
      );

      /***/
    },
    /* 51 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var isObject = __webpack_require__(8);

      var document = global.document;
      // typeof document.createElement is 'object' in old IE
      var EXISTS = isObject(document) && isObject(document.createElement);

      module.exports = function (it) {
        return EXISTS ? document.createElement(it) : {};
      };

      /***/
    },
    /* 52 */
    /***/ function (module, exports) {
      module.exports = false;

      /***/
    },
    /* 53 */
    /***/ function (module, exports, __webpack_require__) {
      var NATIVE_WEAK_MAP = __webpack_require__(54);
      var global = __webpack_require__(1);
      var isObject = __webpack_require__(8);
      var hide = __webpack_require__(7);
      var objectHas = __webpack_require__(9);
      var sharedKey = __webpack_require__(55);
      var hiddenKeys = __webpack_require__(32);

      var WeakMap = global.WeakMap;
      var set, get, has;

      var enforce = function (it) {
        return has(it) ? get(it) : set(it, {});
      };

      var getterFor = function (TYPE) {
        return function (it) {
          var state;
          if (!isObject(it) || (state = get(it)).type !== TYPE) {
            throw TypeError("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };

      if (NATIVE_WEAK_MAP) {
        var store = new WeakMap();
        var wmget = store.get;
        var wmhas = store.has;
        var wmset = store.set;
        set = function (it, metadata) {
          wmset.call(store, it, metadata);
          return metadata;
        };
        get = function (it) {
          return wmget.call(store, it) || {};
        };
        has = function (it) {
          return wmhas.call(store, it);
        };
      } else {
        var STATE = sharedKey("state");
        hiddenKeys[STATE] = true;
        set = function (it, metadata) {
          hide(it, STATE, metadata);
          return metadata;
        };
        get = function (it) {
          return objectHas(it, STATE) ? it[STATE] : {};
        };
        has = function (it) {
          return objectHas(it, STATE);
        };
      }

      module.exports = {
        set: set,
        get: get,
        has: has,
        enforce: enforce,
        getterFor: getterFor,
      };

      /***/
    },
    /* 54 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var nativeFunctionToString = __webpack_require__(30);

      var WeakMap = global.WeakMap;

      module.exports =
        typeof WeakMap === "function" &&
        /native code/.test(nativeFunctionToString.call(WeakMap));

      /***/
    },
    /* 55 */
    /***/ function (module, exports, __webpack_require__) {
      var shared = __webpack_require__(14);
      var uid = __webpack_require__(31);

      var keys = shared("keys");

      module.exports = function (key) {
        return keys[key] || (keys[key] = uid(key));
      };

      /***/
    },
    /* 56 */
    /***/ function (module, exports, __webpack_require__) {
      var has = __webpack_require__(9);
      var ownKeys = __webpack_require__(57);
      var getOwnPropertyDescriptorModule = __webpack_require__(24);
      var definePropertyModule = __webpack_require__(20);

      module.exports = function (target, source) {
        var keys = ownKeys(source);
        var defineProperty = definePropertyModule.f;
        var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!has(target, key))
            defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      };

      /***/
    },
    /* 57 */
    /***/ function (module, exports, __webpack_require__) {
      var getBuiltIn = __webpack_require__(58);
      var getOwnPropertyNamesModule = __webpack_require__(60);
      var getOwnPropertySymbolsModule = __webpack_require__(35);
      var anObject = __webpack_require__(10);

      // all object keys, includes non-enumerable and symbols
      module.exports =
        getBuiltIn("Reflect", "ownKeys") ||
        function ownKeys(it) {
          var keys = getOwnPropertyNamesModule.f(anObject(it));
          var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
          return getOwnPropertySymbols
            ? keys.concat(getOwnPropertySymbols(it))
            : keys;
        };

      /***/
    },
    /* 58 */
    /***/ function (module, exports, __webpack_require__) {
      var path = __webpack_require__(59);
      var global = __webpack_require__(1);

      var aFunction = function (variable) {
        return typeof variable == "function" ? variable : undefined;
      };

      module.exports = function (namespace, method) {
        return arguments.length < 2
          ? aFunction(path[namespace]) || aFunction(global[namespace])
          : (path[namespace] && path[namespace][method]) ||
              (global[namespace] && global[namespace][method]);
      };

      /***/
    },
    /* 59 */
    /***/ function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);

      /***/
    },
    /* 60 */
    /***/ function (module, exports, __webpack_require__) {
      var internalObjectKeys = __webpack_require__(33);
      var enumBugKeys = __webpack_require__(34);

      var hiddenKeys = enumBugKeys.concat("length", "prototype");

      // `Object.getOwnPropertyNames` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
      exports.f =
        Object.getOwnPropertyNames ||
        function getOwnPropertyNames(O) {
          return internalObjectKeys(O, hiddenKeys);
        };

      /***/
    },
    /* 61 */
    /***/ function (module, exports, __webpack_require__) {
      var toIndexedObject = __webpack_require__(18);
      var toLength = __webpack_require__(11);
      var toAbsoluteIndex = __webpack_require__(62);

      // `Array.prototype.{ indexOf, includes }` methods implementation
      var createMethod = function (IS_INCLUDES) {
        return function ($this, el, fromIndex) {
          var O = toIndexedObject($this);
          var length = toLength(O.length);
          var index = toAbsoluteIndex(fromIndex, length);
          var value;
          // Array#includes uses SameValueZero equality algorithm
          // eslint-disable-next-line no-self-compare
          if (IS_INCLUDES && el != el)
            while (length > index) {
              value = O[index++];
              // eslint-disable-next-line no-self-compare
              if (value != value) return true;
              // Array#indexOf ignores holes, Array#includes - not
            }
          else
            for (; length > index; index++) {
              if ((IS_INCLUDES || index in O) && O[index] === el)
                return IS_INCLUDES || index || 0;
            }
          return !IS_INCLUDES && -1;
        };
      };

      module.exports = {
        // `Array.prototype.includes` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.includes
        includes: createMethod(true),
        // `Array.prototype.indexOf` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
        indexOf: createMethod(false),
      };

      /***/
    },
    /* 62 */
    /***/ function (module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(15);

      var max = Math.max;
      var min = Math.min;

      // Helper for a popular repeating case of the spec:
      // Let integer be ? ToInteger(index).
      // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
      module.exports = function (index, length) {
        var integer = toInteger(index);
        return integer < 0 ? max(integer + length, 0) : min(integer, length);
      };

      /***/
    },
    /* 63 */
    /***/ function (module, exports, __webpack_require__) {
      var fails = __webpack_require__(2);

      var replacement = /#|\.prototype\./;

      var isForced = function (feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL
          ? true
          : value == NATIVE
          ? false
          : typeof detection == "function"
          ? fails(detection)
          : !!detection;
      };

      var normalize = (isForced.normalize = function (string) {
        return String(string).replace(replacement, ".").toLowerCase();
      });

      var data = (isForced.data = {});
      var NATIVE = (isForced.NATIVE = "N");
      var POLYFILL = (isForced.POLYFILL = "P");

      module.exports = isForced;

      /***/
    },
    /* 64 */
    /***/ function (module, exports, __webpack_require__) {
      var aFunction = __webpack_require__(37);

      // optional / simple context binding
      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 0:
            return function () {
              return fn.call(that);
            };
          case 1:
            return function (a) {
              return fn.call(that, a);
            };
          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }
        return function (/* ...args */) {
          return fn.apply(that, arguments);
        };
      };

      /***/
    },
    /* 65 */
    /***/ function (module, exports, __webpack_require__) {
      var isObject = __webpack_require__(8);
      var isArray = __webpack_require__(66);
      var wellKnownSymbol = __webpack_require__(22);

      var SPECIES = wellKnownSymbol("species");

      // `ArraySpeciesCreate` abstract operation
      // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
      module.exports = function (originalArray, length) {
        var C;
        if (isArray(originalArray)) {
          C = originalArray.constructor;
          // cross-realm fallback
          if (typeof C == "function" && (C === Array || isArray(C.prototype)))
            C = undefined;
          else if (isObject(C)) {
            C = C[SPECIES];
            if (C === null) C = undefined;
          }
        }
        return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
      };

      /***/
    },
    /* 66 */
    /***/ function (module, exports, __webpack_require__) {
      var classof = __webpack_require__(19);

      // `IsArray` abstract operation
      // https://tc39.github.io/ecma262/#sec-isarray
      module.exports =
        Array.isArray ||
        function isArray(arg) {
          return classof(arg) == "Array";
        };

      /***/
    },
    /* 67 */
    /***/ function (module, exports, __webpack_require__) {
      var fails = __webpack_require__(2);

      module.exports =
        !!Object.getOwnPropertySymbols &&
        !fails(function () {
          // Chrome 38 Symbol has incorrect toString conversion
          // eslint-disable-next-line no-undef
          return !String(Symbol());
        });

      /***/
    },
    /* 68 */
    /***/ function (module, exports, __webpack_require__) {
      var fails = __webpack_require__(2);
      var wellKnownSymbol = __webpack_require__(22);

      var SPECIES = wellKnownSymbol("species");

      module.exports = function (METHOD_NAME) {
        return !fails(function () {
          var array = [];
          var constructor = (array.constructor = {});
          constructor[SPECIES] = function () {
            return { foo: 1 };
          };
          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };

      /***/
    },
    /* 69 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var $ = __webpack_require__(3);
      var forEach = __webpack_require__(38);

      // `Array.prototype.forEach` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
      $(
        { target: "Array", proto: true, forced: [].forEach != forEach },
        {
          forEach: forEach,
        }
      );

      /***/
    },
    /* 70 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var $ = __webpack_require__(3);
      var $reduce = __webpack_require__(71).left;
      var sloppyArrayMethod = __webpack_require__(39);

      // `Array.prototype.reduce` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
      $(
        { target: "Array", proto: true, forced: sloppyArrayMethod("reduce") },
        {
          reduce: function reduce(callbackfn /* , initialValue */) {
            return $reduce(
              this,
              callbackfn,
              arguments.length,
              arguments.length > 1 ? arguments[1] : undefined
            );
          },
        }
      );

      /***/
    },
    /* 71 */
    /***/ function (module, exports, __webpack_require__) {
      var aFunction = __webpack_require__(37);
      var toObject = __webpack_require__(16);
      var IndexedObject = __webpack_require__(13);
      var toLength = __webpack_require__(11);

      // `Array.prototype.{ reduce, reduceRight }` methods implementation
      var createMethod = function (IS_RIGHT) {
        return function (that, callbackfn, argumentsLength, memo) {
          aFunction(callbackfn);
          var O = toObject(that);
          var self = IndexedObject(O);
          var length = toLength(O.length);
          var index = IS_RIGHT ? length - 1 : 0;
          var i = IS_RIGHT ? -1 : 1;
          if (argumentsLength < 2)
            while (true) {
              if (index in self) {
                memo = self[index];
                index += i;
                break;
              }
              index += i;
              if (IS_RIGHT ? index < 0 : length <= index) {
                throw TypeError("Reduce of empty array with no initial value");
              }
            }
          for (; IS_RIGHT ? index >= 0 : length > index; index += i)
            if (index in self) {
              memo = callbackfn(memo, self[index], index, O);
            }
          return memo;
        };
      };

      module.exports = {
        // `Array.prototype.reduce` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
        left: createMethod(false),
        // `Array.prototype.reduceRight` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
        right: createMethod(true),
      };

      /***/
    },
    /* 72 */
    /***/ function (module, exports, __webpack_require__) {
      var DESCRIPTORS = __webpack_require__(5);
      var defineProperty = __webpack_require__(20).f;

      var FunctionPrototype = Function.prototype;
      var FunctionPrototypeToString = FunctionPrototype.toString;
      var nameRE = /^\s*function ([^ (]*)/;
      var NAME = "name";

      // Function instances `.name` property
      // https://tc39.github.io/ecma262/#sec-function-instances-name
      if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
        defineProperty(FunctionPrototype, NAME, {
          configurable: true,
          get: function () {
            try {
              return FunctionPrototypeToString.call(this).match(nameRE)[1];
            } catch (error) {
              return "";
            }
          },
        });
      }

      /***/
    },
    /* 73 */
    /***/ function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(3);
      var assign = __webpack_require__(74);

      // `Object.assign` method
      // https://tc39.github.io/ecma262/#sec-object.assign
      $(
        { target: "Object", stat: true, forced: Object.assign !== assign },
        {
          assign: assign,
        }
      );

      /***/
    },
    /* 74 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var DESCRIPTORS = __webpack_require__(5);
      var fails = __webpack_require__(2);
      var objectKeys = __webpack_require__(75);
      var getOwnPropertySymbolsModule = __webpack_require__(35);
      var propertyIsEnumerableModule = __webpack_require__(25);
      var toObject = __webpack_require__(16);
      var IndexedObject = __webpack_require__(13);

      var nativeAssign = Object.assign;

      // `Object.assign` method
      // https://tc39.github.io/ecma262/#sec-object.assign
      // should work with symbols and should have deterministic property order (V8 bug)
      module.exports =
        !nativeAssign ||
        fails(function () {
          var A = {};
          var B = {};
          // eslint-disable-next-line no-undef
          var symbol = Symbol();
          var alphabet = "abcdefghijklmnopqrst";
          A[symbol] = 7;
          alphabet.split("").forEach(function (chr) {
            B[chr] = chr;
          });
          return (
            nativeAssign({}, A)[symbol] != 7 ||
            objectKeys(nativeAssign({}, B)).join("") != alphabet
          );
        })
          ? function assign(target, source) {
              // eslint-disable-line no-unused-vars
              var T = toObject(target);
              var argumentsLength = arguments.length;
              var index = 1;
              var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
              var propertyIsEnumerable = propertyIsEnumerableModule.f;
              while (argumentsLength > index) {
                var S = IndexedObject(arguments[index++]);
                var keys = getOwnPropertySymbols
                  ? objectKeys(S).concat(getOwnPropertySymbols(S))
                  : objectKeys(S);
                var length = keys.length;
                var j = 0;
                var key;
                while (length > j) {
                  key = keys[j++];
                  if (!DESCRIPTORS || propertyIsEnumerable.call(S, key))
                    T[key] = S[key];
                }
              }
              return T;
            }
          : nativeAssign;

      /***/
    },
    /* 75 */
    /***/ function (module, exports, __webpack_require__) {
      var internalObjectKeys = __webpack_require__(33);
      var enumBugKeys = __webpack_require__(34);

      // `Object.keys` method
      // https://tc39.github.io/ecma262/#sec-object.keys
      module.exports =
        Object.keys ||
        function keys(O) {
          return internalObjectKeys(O, enumBugKeys);
        };

      /***/
    },
    /* 76 */
    /***/ function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(3);
      var parseIntImplementation = __webpack_require__(77);

      // `parseInt` method
      // https://tc39.github.io/ecma262/#sec-parseint-string-radix
      $(
        { global: true, forced: parseInt != parseIntImplementation },
        {
          parseInt: parseIntImplementation,
        }
      );

      /***/
    },
    /* 77 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var trim = __webpack_require__(78).trim;
      var whitespaces = __webpack_require__(40);

      var nativeParseInt = global.parseInt;
      var hex = /^[+-]?0[Xx]/;
      var FORCED =
        nativeParseInt(whitespaces + "08") !== 8 ||
        nativeParseInt(whitespaces + "0x16") !== 22;

      // `parseInt` method
      // https://tc39.github.io/ecma262/#sec-parseint-string-radix
      module.exports = FORCED
        ? function parseInt(string, radix) {
            var S = trim(String(string));
            return nativeParseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
          }
        : nativeParseInt;

      /***/
    },
    /* 78 */
    /***/ function (module, exports, __webpack_require__) {
      var requireObjectCoercible = __webpack_require__(6);
      var whitespaces = __webpack_require__(40);

      var whitespace = "[" + whitespaces + "]";
      var ltrim = RegExp("^" + whitespace + whitespace + "*");
      var rtrim = RegExp(whitespace + whitespace + "*$");

      // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
      var createMethod = function (TYPE) {
        return function ($this) {
          var string = String(requireObjectCoercible($this));
          if (TYPE & 1) string = string.replace(ltrim, "");
          if (TYPE & 2) string = string.replace(rtrim, "");
          return string;
        };
      };

      module.exports = {
        // `String.prototype.{ trimLeft, trimStart }` methods
        // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
        start: createMethod(1),
        // `String.prototype.{ trimRight, trimEnd }` methods
        // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
        end: createMethod(2),
        // `String.prototype.trim` method
        // https://tc39.github.io/ecma262/#sec-string.prototype.trim
        trim: createMethod(3),
      };

      /***/
    },
    /* 79 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var $ = __webpack_require__(3);
      var exec = __webpack_require__(23);

      $(
        { target: "RegExp", proto: true, forced: /./.exec !== exec },
        {
          exec: exec,
        }
      );

      /***/
    },
    /* 80 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var anObject = __webpack_require__(10);

      // `RegExp.prototype.flags` getter implementation
      // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
      module.exports = function () {
        var that = anObject(this);
        var result = "";
        if (that.global) result += "g";
        if (that.ignoreCase) result += "i";
        if (that.multiline) result += "m";
        if (that.dotAll) result += "s";
        if (that.unicode) result += "u";
        if (that.sticky) result += "y";
        return result;
      };

      /***/
    },
    /* 81 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var fixRegExpWellKnownSymbolLogic = __webpack_require__(41);
      var anObject = __webpack_require__(10);
      var toLength = __webpack_require__(11);
      var requireObjectCoercible = __webpack_require__(6);
      var advanceStringIndex = __webpack_require__(42);
      var regExpExec = __webpack_require__(43);

      // @@match logic
      fixRegExpWellKnownSymbolLogic(
        "match",
        1,
        function (MATCH, nativeMatch, maybeCallNative) {
          return [
            // `String.prototype.match` method
            // https://tc39.github.io/ecma262/#sec-string.prototype.match
            function match(regexp) {
              var O = requireObjectCoercible(this);
              var matcher = regexp == undefined ? undefined : regexp[MATCH];
              return matcher !== undefined
                ? matcher.call(regexp, O)
                : new RegExp(regexp)[MATCH](String(O));
            },
            // `RegExp.prototype[@@match]` method
            // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
            function (regexp) {
              var res = maybeCallNative(nativeMatch, regexp, this);
              if (res.done) return res.value;

              var rx = anObject(regexp);
              var S = String(this);

              if (!rx.global) return regExpExec(rx, S);

              var fullUnicode = rx.unicode;
              rx.lastIndex = 0;
              var A = [];
              var n = 0;
              var result;
              while ((result = regExpExec(rx, S)) !== null) {
                var matchStr = String(result[0]);
                A[n] = matchStr;
                if (matchStr === "")
                  rx.lastIndex = advanceStringIndex(
                    S,
                    toLength(rx.lastIndex),
                    fullUnicode
                  );
                n++;
              }
              return n === 0 ? null : A;
            },
          ];
        }
      );

      /***/
    },
    /* 82 */
    /***/ function (module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(15);
      var requireObjectCoercible = __webpack_require__(6);

      // `String.prototype.{ codePointAt, at }` methods implementation
      var createMethod = function (CONVERT_TO_STRING) {
        return function ($this, pos) {
          var S = String(requireObjectCoercible($this));
          var position = toInteger(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size)
            return CONVERT_TO_STRING ? "" : undefined;
          first = S.charCodeAt(position);
          return first < 0xd800 ||
            first > 0xdbff ||
            position + 1 === size ||
            (second = S.charCodeAt(position + 1)) < 0xdc00 ||
            second > 0xdfff
            ? CONVERT_TO_STRING
              ? S.charAt(position)
              : first
            : CONVERT_TO_STRING
            ? S.slice(position, position + 2)
            : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
        };
      };

      module.exports = {
        // `String.prototype.codePointAt` method
        // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
        codeAt: createMethod(false),
        // `String.prototype.at` method
        // https://github.com/mathiasbynens/String.prototype.at
        charAt: createMethod(true),
      };

      /***/
    },
    /* 83 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var fixRegExpWellKnownSymbolLogic = __webpack_require__(41);
      var anObject = __webpack_require__(10);
      var toObject = __webpack_require__(16);
      var toLength = __webpack_require__(11);
      var toInteger = __webpack_require__(15);
      var requireObjectCoercible = __webpack_require__(6);
      var advanceStringIndex = __webpack_require__(42);
      var regExpExec = __webpack_require__(43);

      var max = Math.max;
      var min = Math.min;
      var floor = Math.floor;
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

      var maybeToString = function (it) {
        return it === undefined ? it : String(it);
      };

      // @@replace logic
      fixRegExpWellKnownSymbolLogic(
        "replace",
        2,
        function (REPLACE, nativeReplace, maybeCallNative) {
          return [
            // `String.prototype.replace` method
            // https://tc39.github.io/ecma262/#sec-string.prototype.replace
            function replace(searchValue, replaceValue) {
              var O = requireObjectCoercible(this);
              var replacer =
                searchValue == undefined ? undefined : searchValue[REPLACE];
              return replacer !== undefined
                ? replacer.call(searchValue, O, replaceValue)
                : nativeReplace.call(String(O), searchValue, replaceValue);
            },
            // `RegExp.prototype[@@replace]` method
            // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
            function (regexp, replaceValue) {
              var res = maybeCallNative(
                nativeReplace,
                regexp,
                this,
                replaceValue
              );
              if (res.done) return res.value;

              var rx = anObject(regexp);
              var S = String(this);

              var functionalReplace = typeof replaceValue === "function";
              if (!functionalReplace) replaceValue = String(replaceValue);

              var global = rx.global;
              if (global) {
                var fullUnicode = rx.unicode;
                rx.lastIndex = 0;
              }
              var results = [];
              while (true) {
                var result = regExpExec(rx, S);
                if (result === null) break;

                results.push(result);
                if (!global) break;

                var matchStr = String(result[0]);
                if (matchStr === "")
                  rx.lastIndex = advanceStringIndex(
                    S,
                    toLength(rx.lastIndex),
                    fullUnicode
                  );
              }

              var accumulatedResult = "";
              var nextSourcePosition = 0;
              for (var i = 0; i < results.length; i++) {
                result = results[i];

                var matched = String(result[0]);
                var position = max(min(toInteger(result.index), S.length), 0);
                var captures = [];
                // NOTE: This is equivalent to
                //   captures = result.slice(1).map(maybeToString)
                // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
                // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
                // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
                for (var j = 1; j < result.length; j++)
                  captures.push(maybeToString(result[j]));
                var namedCaptures = result.groups;
                if (functionalReplace) {
                  var replacerArgs = [matched].concat(captures, position, S);
                  if (namedCaptures !== undefined)
                    replacerArgs.push(namedCaptures);
                  var replacement = String(
                    replaceValue.apply(undefined, replacerArgs)
                  );
                } else {
                  replacement = getSubstitution(
                    matched,
                    S,
                    position,
                    captures,
                    namedCaptures,
                    replaceValue
                  );
                }
                if (position >= nextSourcePosition) {
                  accumulatedResult +=
                    S.slice(nextSourcePosition, position) + replacement;
                  nextSourcePosition = position + matched.length;
                }
              }
              return accumulatedResult + S.slice(nextSourcePosition);
            },
          ];

          // https://tc39.github.io/ecma262/#sec-getsubstitution
          function getSubstitution(
            matched,
            str,
            position,
            captures,
            namedCaptures,
            replacement
          ) {
            var tailPos = position + matched.length;
            var m = captures.length;
            var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
            if (namedCaptures !== undefined) {
              namedCaptures = toObject(namedCaptures);
              symbols = SUBSTITUTION_SYMBOLS;
            }
            return nativeReplace.call(
              replacement,
              symbols,
              function (match, ch) {
                var capture;
                switch (ch.charAt(0)) {
                  case "$":
                    return "$";
                  case "&":
                    return matched;
                  case "`":
                    return str.slice(0, position);
                  case "'":
                    return str.slice(tailPos);
                  case "<":
                    capture = namedCaptures[ch.slice(1, -1)];
                    break;
                  default:
                    // \d\d?
                    var n = +ch;
                    if (n === 0) return match;
                    if (n > m) {
                      var f = floor(n / 10);
                      if (f === 0) return match;
                      if (f <= m)
                        return captures[f - 1] === undefined
                          ? ch.charAt(1)
                          : captures[f - 1] + ch.charAt(1);
                      return match;
                    }
                    capture = captures[n - 1];
                }
                return capture === undefined ? "" : capture;
              }
            );
          }
        }
      );

      /***/
    },
    /* 84 */
    /***/ function (module, exports, __webpack_require__) {
      var global = __webpack_require__(1);
      var DOMIterables = __webpack_require__(85);
      var forEach = __webpack_require__(38);
      var hide = __webpack_require__(7);

      for (var COLLECTION_NAME in DOMIterables) {
        var Collection = global[COLLECTION_NAME];
        var CollectionPrototype = Collection && Collection.prototype;
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
          try {
            hide(CollectionPrototype, "forEach", forEach);
          } catch (error) {
            CollectionPrototype.forEach = forEach;
          }
      }

      /***/
    },
    /* 85 */
    /***/ function (module, exports) {
      // iterable DOM collections
      // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
      module.exports = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0,
      };

      /***/
    },
    /* 86 */
    /***/ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (global) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = "Expected a function";

        /** Used as references for various `Number` constants. */
        var NAN = 0 / 0;

        /** `Object#toString` result references. */
        var symbolTag = "[object Symbol]";

        /** Used to match leading and trailing whitespace. */
        var reTrim = /^\s+|\s+$/g;

        /** Used to detect bad signed hexadecimal string values. */
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

        /** Used to detect binary string values. */
        var reIsBinary = /^0b[01]+$/i;

        /** Used to detect octal string values. */
        var reIsOctal = /^0o[0-7]+$/i;

        /** Built-in method references without a dependency on `root`. */
        var freeParseInt = parseInt;

        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
          typeof global == "object" &&
          global &&
          global.Object === Object &&
          global;

        /** Detect free variable `self`. */
        var freeSelf =
          typeof self == "object" && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function("return this")();

        /** Used for built-in method references. */
        var objectProto = Object.prototype;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /* Built-in method references for those with the same name as other `lodash` methods. */
        var nativeMax = Math.max,
          nativeMin = Math.min;

        /**
         * Gets the timestamp of the number of milliseconds that have elapsed since
         * the Unix epoch (1 January 1970 00:00:00 UTC).
         *
         * @static
         * @memberOf _
         * @since 2.4.0
         * @category Date
         * @returns {number} Returns the timestamp.
         * @example
         *
         * _.defer(function(stamp) {
         *   console.log(_.now() - stamp);
         * }, _.now());
         * // => Logs the number of milliseconds it took for the deferred invocation.
         */
        var now = function () {
          return root.Date.now();
        };

        /**
         * Creates a debounced function that delays invoking `func` until after `wait`
         * milliseconds have elapsed since the last time the debounced function was
         * invoked. The debounced function comes with a `cancel` method to cancel
         * delayed `func` invocations and a `flush` method to immediately invoke them.
         * Provide `options` to indicate whether `func` should be invoked on the
         * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
         * with the last arguments provided to the debounced function. Subsequent
         * calls to the debounced function return the result of the last `func`
         * invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is
         * invoked on the trailing edge of the timeout only if the debounced function
         * is invoked more than once during the `wait` timeout.
         *
         * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
         * until to the next tick, similar to `setTimeout` with a timeout of `0`.
         *
         * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
         * for details over the differences between `_.debounce` and `_.throttle`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to debounce.
         * @param {number} [wait=0] The number of milliseconds to delay.
         * @param {Object} [options={}] The options object.
         * @param {boolean} [options.leading=false]
         *  Specify invoking on the leading edge of the timeout.
         * @param {number} [options.maxWait]
         *  The maximum time `func` is allowed to be delayed before it's invoked.
         * @param {boolean} [options.trailing=true]
         *  Specify invoking on the trailing edge of the timeout.
         * @returns {Function} Returns the new debounced function.
         * @example
         *
         * // Avoid costly calculations while the window size is in flux.
         * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
         *
         * // Invoke `sendMail` when clicked, debouncing subsequent calls.
         * jQuery(element).on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * }));
         *
         * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
         * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
         * var source = new EventSource('/stream');
         * jQuery(source).on('message', debounced);
         *
         * // Cancel the trailing debounced invocation.
         * jQuery(window).on('popstate', debounced.cancel);
         */
        function debounce(func, wait, options) {
          var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

          if (typeof func != "function") {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing
              ? nativeMax(toNumber(options.maxWait) || 0, wait)
              : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }

          function invokeFunc(time) {
            var args = lastArgs,
              thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
          }

          function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
          }

          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime,
              result = wait - timeSinceLastCall;

            return maxing
              ? nativeMin(result, maxWait - timeSinceLastInvoke)
              : result;
          }

          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return (
              lastCallTime === undefined ||
              timeSinceLastCall >= wait ||
              timeSinceLastCall < 0 ||
              (maxing && timeSinceLastInvoke >= maxWait)
            );
          }

          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            // Restart the timer.
            timerId = setTimeout(timerExpired, remainingWait(time));
          }

          function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
          }

          function cancel() {
            if (timerId !== undefined) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
          }

          function flush() {
            return timerId === undefined ? result : trailingEdge(now());
          }

          function debounced() {
            var time = now(),
              isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;

            if (isInvoking) {
              if (timerId === undefined) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined) {
              timerId = setTimeout(timerExpired, wait);
            }
            return result;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }

        /**
         * Creates a throttled function that only invokes `func` at most once per
         * every `wait` milliseconds. The throttled function comes with a `cancel`
         * method to cancel delayed `func` invocations and a `flush` method to
         * immediately invoke them. Provide `options` to indicate whether `func`
         * should be invoked on the leading and/or trailing edge of the `wait`
         * timeout. The `func` is invoked with the last arguments provided to the
         * throttled function. Subsequent calls to the throttled function return the
         * result of the last `func` invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is
         * invoked on the trailing edge of the timeout only if the throttled function
         * is invoked more than once during the `wait` timeout.
         *
         * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
         * until to the next tick, similar to `setTimeout` with a timeout of `0`.
         *
         * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
         * for details over the differences between `_.throttle` and `_.debounce`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to throttle.
         * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
         * @param {Object} [options={}] The options object.
         * @param {boolean} [options.leading=true]
         *  Specify invoking on the leading edge of the timeout.
         * @param {boolean} [options.trailing=true]
         *  Specify invoking on the trailing edge of the timeout.
         * @returns {Function} Returns the new throttled function.
         * @example
         *
         * // Avoid excessively updating the position while scrolling.
         * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
         *
         * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
         * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
         * jQuery(element).on('click', throttled);
         *
         * // Cancel the trailing throttled invocation.
         * jQuery(window).on('popstate', throttled.cancel);
         */
        function throttle(func, wait, options) {
          var leading = true,
            trailing = true;

          if (typeof func != "function") {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            leading: leading,
            maxWait: wait,
            trailing: trailing,
          });
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == "object" || type == "function");
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
          return !!value && typeof value == "object";
        }

        /**
         * Checks if `value` is classified as a `Symbol` primitive or object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
         * @example
         *
         * _.isSymbol(Symbol.iterator);
         * // => true
         *
         * _.isSymbol('abc');
         * // => false
         */
        function isSymbol(value) {
          return (
            typeof value == "symbol" ||
            (isObjectLike(value) && objectToString.call(value) == symbolTag)
          );
        }

        /**
         * Converts `value` to a number.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to process.
         * @returns {number} Returns the number.
         * @example
         *
         * _.toNumber(3.2);
         * // => 3.2
         *
         * _.toNumber(Number.MIN_VALUE);
         * // => 5e-324
         *
         * _.toNumber(Infinity);
         * // => Infinity
         *
         * _.toNumber('3.2');
         * // => 3.2
         */
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other =
              typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = value.replace(reTrim, "");
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value)
            ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
            : reIsBadHex.test(value)
            ? NAN
            : +value;
        }

        module.exports = throttle;

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(4)));

      /***/
    },
    /* 87 */
    /***/ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (global) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = "Expected a function";

        /** Used as references for various `Number` constants. */
        var NAN = 0 / 0;

        /** `Object#toString` result references. */
        var symbolTag = "[object Symbol]";

        /** Used to match leading and trailing whitespace. */
        var reTrim = /^\s+|\s+$/g;

        /** Used to detect bad signed hexadecimal string values. */
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

        /** Used to detect binary string values. */
        var reIsBinary = /^0b[01]+$/i;

        /** Used to detect octal string values. */
        var reIsOctal = /^0o[0-7]+$/i;

        /** Built-in method references without a dependency on `root`. */
        var freeParseInt = parseInt;

        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
          typeof global == "object" &&
          global &&
          global.Object === Object &&
          global;

        /** Detect free variable `self`. */
        var freeSelf =
          typeof self == "object" && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function("return this")();

        /** Used for built-in method references. */
        var objectProto = Object.prototype;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /* Built-in method references for those with the same name as other `lodash` methods. */
        var nativeMax = Math.max,
          nativeMin = Math.min;

        /**
         * Gets the timestamp of the number of milliseconds that have elapsed since
         * the Unix epoch (1 January 1970 00:00:00 UTC).
         *
         * @static
         * @memberOf _
         * @since 2.4.0
         * @category Date
         * @returns {number} Returns the timestamp.
         * @example
         *
         * _.defer(function(stamp) {
         *   console.log(_.now() - stamp);
         * }, _.now());
         * // => Logs the number of milliseconds it took for the deferred invocation.
         */
        var now = function () {
          return root.Date.now();
        };

        /**
         * Creates a debounced function that delays invoking `func` until after `wait`
         * milliseconds have elapsed since the last time the debounced function was
         * invoked. The debounced function comes with a `cancel` method to cancel
         * delayed `func` invocations and a `flush` method to immediately invoke them.
         * Provide `options` to indicate whether `func` should be invoked on the
         * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
         * with the last arguments provided to the debounced function. Subsequent
         * calls to the debounced function return the result of the last `func`
         * invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is
         * invoked on the trailing edge of the timeout only if the debounced function
         * is invoked more than once during the `wait` timeout.
         *
         * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
         * until to the next tick, similar to `setTimeout` with a timeout of `0`.
         *
         * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
         * for details over the differences between `_.debounce` and `_.throttle`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to debounce.
         * @param {number} [wait=0] The number of milliseconds to delay.
         * @param {Object} [options={}] The options object.
         * @param {boolean} [options.leading=false]
         *  Specify invoking on the leading edge of the timeout.
         * @param {number} [options.maxWait]
         *  The maximum time `func` is allowed to be delayed before it's invoked.
         * @param {boolean} [options.trailing=true]
         *  Specify invoking on the trailing edge of the timeout.
         * @returns {Function} Returns the new debounced function.
         * @example
         *
         * // Avoid costly calculations while the window size is in flux.
         * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
         *
         * // Invoke `sendMail` when clicked, debouncing subsequent calls.
         * jQuery(element).on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * }));
         *
         * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
         * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
         * var source = new EventSource('/stream');
         * jQuery(source).on('message', debounced);
         *
         * // Cancel the trailing debounced invocation.
         * jQuery(window).on('popstate', debounced.cancel);
         */
        function debounce(func, wait, options) {
          var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

          if (typeof func != "function") {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing
              ? nativeMax(toNumber(options.maxWait) || 0, wait)
              : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }

          function invokeFunc(time) {
            var args = lastArgs,
              thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
          }

          function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
          }

          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime,
              result = wait - timeSinceLastCall;

            return maxing
              ? nativeMin(result, maxWait - timeSinceLastInvoke)
              : result;
          }

          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return (
              lastCallTime === undefined ||
              timeSinceLastCall >= wait ||
              timeSinceLastCall < 0 ||
              (maxing && timeSinceLastInvoke >= maxWait)
            );
          }

          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            // Restart the timer.
            timerId = setTimeout(timerExpired, remainingWait(time));
          }

          function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
          }

          function cancel() {
            if (timerId !== undefined) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
          }

          function flush() {
            return timerId === undefined ? result : trailingEdge(now());
          }

          function debounced() {
            var time = now(),
              isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;

            if (isInvoking) {
              if (timerId === undefined) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined) {
              timerId = setTimeout(timerExpired, wait);
            }
            return result;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == "object" || type == "function");
        }

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        function isObjectLike(value) {
          return !!value && typeof value == "object";
        }

        /**
         * Checks if `value` is classified as a `Symbol` primitive or object.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
         * @example
         *
         * _.isSymbol(Symbol.iterator);
         * // => true
         *
         * _.isSymbol('abc');
         * // => false
         */
        function isSymbol(value) {
          return (
            typeof value == "symbol" ||
            (isObjectLike(value) && objectToString.call(value) == symbolTag)
          );
        }

        /**
         * Converts `value` to a number.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to process.
         * @returns {number} Returns the number.
         * @example
         *
         * _.toNumber(3.2);
         * // => 3.2
         *
         * _.toNumber(Number.MIN_VALUE);
         * // => 5e-324
         *
         * _.toNumber(Infinity);
         * // => Infinity
         *
         * _.toNumber('3.2');
         * // => 3.2
         */
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other =
              typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = value.replace(reTrim, "");
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value)
            ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
            : reIsBadHex.test(value)
            ? NAN
            : +value;
        }

        module.exports = debounce;

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(4)));

      /***/
    },
    /* 88 */
    /***/ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (global) {
        /**
         * lodash (Custom Build) <https://lodash.com/>
         * Build: `lodash modularize exports="npm" -o ./`
         * Copyright jQuery Foundation and other contributors <https://jquery.org/>
         * Released under MIT license <https://lodash.com/license>
         * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
         * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         */

        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = "Expected a function";

        /** Used to stand-in for `undefined` hash values. */
        var HASH_UNDEFINED = "__lodash_hash_undefined__";

        /** `Object#toString` result references. */
        var funcTag = "[object Function]",
          genTag = "[object GeneratorFunction]";

        /**
         * Used to match `RegExp`
         * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
         */
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

        /** Used to detect host constructors (Safari). */
        var reIsHostCtor = /^\[object .+?Constructor\]$/;

        /** Detect free variable `global` from Node.js. */
        var freeGlobal =
          typeof global == "object" &&
          global &&
          global.Object === Object &&
          global;

        /** Detect free variable `self`. */
        var freeSelf =
          typeof self == "object" && self && self.Object === Object && self;

        /** Used as a reference to the global object. */
        var root = freeGlobal || freeSelf || Function("return this")();

        /**
         * Gets the value at `key` of `object`.
         *
         * @private
         * @param {Object} [object] The object to query.
         * @param {string} key The key of the property to get.
         * @returns {*} Returns the property value.
         */
        function getValue(object, key) {
          return object == null ? undefined : object[key];
        }

        /**
         * Checks if `value` is a host object in IE < 9.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
         */
        function isHostObject(value) {
          // Many host objects are `Object` objects that can coerce to strings
          // despite having improperly defined `toString` methods.
          var result = false;
          if (value != null && typeof value.toString != "function") {
            try {
              result = !!(value + "");
            } catch (e) {}
          }
          return result;
        }

        /** Used for built-in method references. */
        var arrayProto = Array.prototype,
          funcProto = Function.prototype,
          objectProto = Object.prototype;

        /** Used to detect overreaching core-js shims. */
        var coreJsData = root["__core-js_shared__"];

        /** Used to detect methods masquerading as native. */
        var maskSrcKey = (function () {
          var uid = /[^.]+$/.exec(
            (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || ""
          );
          return uid ? "Symbol(src)_1." + uid : "";
        })();

        /** Used to resolve the decompiled source of functions. */
        var funcToString = funcProto.toString;

        /** Used to check objects for own properties. */
        var hasOwnProperty = objectProto.hasOwnProperty;

        /**
         * Used to resolve the
         * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
         * of values.
         */
        var objectToString = objectProto.toString;

        /** Used to detect if a method is native. */
        var reIsNative = RegExp(
          "^" +
            funcToString
              .call(hasOwnProperty)
              .replace(reRegExpChar, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );

        /** Built-in value references. */
        var splice = arrayProto.splice;

        /* Built-in method references that are verified to be native. */
        var Map = getNative(root, "Map"),
          nativeCreate = getNative(Object, "create");

        /**
         * Creates a hash object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function Hash(entries) {
          var index = -1,
            length = entries ? entries.length : 0;

          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }

        /**
         * Removes all key-value entries from the hash.
         *
         * @private
         * @name clear
         * @memberOf Hash
         */
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
        }

        /**
         * Removes `key` and its value from the hash.
         *
         * @private
         * @name delete
         * @memberOf Hash
         * @param {Object} hash The hash to modify.
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function hashDelete(key) {
          return this.has(key) && delete this.__data__[key];
        }

        /**
         * Gets the hash value for `key`.
         *
         * @private
         * @name get
         * @memberOf Hash
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined : result;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined;
        }

        /**
         * Checks if a hash value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf Hash
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate
            ? data[key] !== undefined
            : hasOwnProperty.call(data, key);
        }

        /**
         * Sets the hash `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf Hash
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the hash instance.
         */
        function hashSet(key, value) {
          var data = this.__data__;
          data[key] =
            nativeCreate && value === undefined ? HASH_UNDEFINED : value;
          return this;
        }

        // Add methods to `Hash`.
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;

        /**
         * Creates an list cache object.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function ListCache(entries) {
          var index = -1,
            length = entries ? entries.length : 0;

          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }

        /**
         * Removes all key-value entries from the list cache.
         *
         * @private
         * @name clear
         * @memberOf ListCache
         */
        function listCacheClear() {
          this.__data__ = [];
        }

        /**
         * Removes `key` and its value from the list cache.
         *
         * @private
         * @name delete
         * @memberOf ListCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function listCacheDelete(key) {
          var data = this.__data__,
            index = assocIndexOf(data, key);

          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          return true;
        }

        /**
         * Gets the list cache value for `key`.
         *
         * @private
         * @name get
         * @memberOf ListCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function listCacheGet(key) {
          var data = this.__data__,
            index = assocIndexOf(data, key);

          return index < 0 ? undefined : data[index][1];
        }

        /**
         * Checks if a list cache value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf ListCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }

        /**
         * Sets the list cache `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf ListCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the list cache instance.
         */
        function listCacheSet(key, value) {
          var data = this.__data__,
            index = assocIndexOf(data, key);

          if (index < 0) {
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }

        // Add methods to `ListCache`.
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;

        /**
         * Creates a map cache object to store key-value pairs.
         *
         * @private
         * @constructor
         * @param {Array} [entries] The key-value pairs to cache.
         */
        function MapCache(entries) {
          var index = -1,
            length = entries ? entries.length : 0;

          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }

        /**
         * Removes all key-value entries from the map.
         *
         * @private
         * @name clear
         * @memberOf MapCache
         */
        function mapCacheClear() {
          this.__data__ = {
            hash: new Hash(),
            map: new (Map || ListCache)(),
            string: new Hash(),
          };
        }

        /**
         * Removes `key` and its value from the map.
         *
         * @private
         * @name delete
         * @memberOf MapCache
         * @param {string} key The key of the value to remove.
         * @returns {boolean} Returns `true` if the entry was removed, else `false`.
         */
        function mapCacheDelete(key) {
          return getMapData(this, key)["delete"](key);
        }

        /**
         * Gets the map value for `key`.
         *
         * @private
         * @name get
         * @memberOf MapCache
         * @param {string} key The key of the value to get.
         * @returns {*} Returns the entry value.
         */
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }

        /**
         * Checks if a map value for `key` exists.
         *
         * @private
         * @name has
         * @memberOf MapCache
         * @param {string} key The key of the entry to check.
         * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
         */
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }

        /**
         * Sets the map `key` to `value`.
         *
         * @private
         * @name set
         * @memberOf MapCache
         * @param {string} key The key of the value to set.
         * @param {*} value The value to set.
         * @returns {Object} Returns the map cache instance.
         */
        function mapCacheSet(key, value) {
          getMapData(this, key).set(key, value);
          return this;
        }

        // Add methods to `MapCache`.
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;

        /**
         * Gets the index at which the `key` is found in `array` of key-value pairs.
         *
         * @private
         * @param {Array} array The array to inspect.
         * @param {*} key The key to search for.
         * @returns {number} Returns the index of the matched value, else `-1`.
         */
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }

        /**
         * The base implementation of `_.isNative` without bad shim checks.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a native function,
         *  else `false`.
         */
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern =
            isFunction(value) || isHostObject(value)
              ? reIsNative
              : reIsHostCtor;
          return pattern.test(toSource(value));
        }

        /**
         * Gets the data for `map`.
         *
         * @private
         * @param {Object} map The map to query.
         * @param {string} key The reference key.
         * @returns {*} Returns the map data.
         */
        function getMapData(map, key) {
          var data = map.__data__;
          return isKeyable(key)
            ? data[typeof key == "string" ? "string" : "hash"]
            : data.map;
        }

        /**
         * Gets the native function at `key` of `object`.
         *
         * @private
         * @param {Object} object The object to query.
         * @param {string} key The key of the method to get.
         * @returns {*} Returns the function if it's native, else `undefined`.
         */
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined;
        }

        /**
         * Checks if `value` is suitable for use as unique object key.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
         */
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" ||
            type == "number" ||
            type == "symbol" ||
            type == "boolean"
            ? value !== "__proto__"
            : value === null;
        }

        /**
         * Checks if `func` has its source masked.
         *
         * @private
         * @param {Function} func The function to check.
         * @returns {boolean} Returns `true` if `func` is masked, else `false`.
         */
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }

        /**
         * Converts `func` to its source code.
         *
         * @private
         * @param {Function} func The function to process.
         * @returns {string} Returns the source code.
         */
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {}
            try {
              return func + "";
            } catch (e) {}
          }
          return "";
        }

        /**
         * Creates a function that memoizes the result of `func`. If `resolver` is
         * provided, it determines the cache key for storing the result based on the
         * arguments provided to the memoized function. By default, the first argument
         * provided to the memoized function is used as the map cache key. The `func`
         * is invoked with the `this` binding of the memoized function.
         *
         * **Note:** The cache is exposed as the `cache` property on the memoized
         * function. Its creation may be customized by replacing the `_.memoize.Cache`
         * constructor with one whose instances implement the
         * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
         * method interface of `delete`, `get`, `has`, and `set`.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Function
         * @param {Function} func The function to have its output memoized.
         * @param {Function} [resolver] The function to resolve the cache key.
         * @returns {Function} Returns the new memoized function.
         * @example
         *
         * var object = { 'a': 1, 'b': 2 };
         * var other = { 'c': 3, 'd': 4 };
         *
         * var values = _.memoize(_.values);
         * values(object);
         * // => [1, 2]
         *
         * values(other);
         * // => [3, 4]
         *
         * object.a = 2;
         * values(object);
         * // => [1, 2]
         *
         * // Modify the result cache.
         * values.cache.set(object, ['a', 'b']);
         * values(object);
         * // => ['a', 'b']
         *
         * // Replace `_.memoize.Cache`.
         * _.memoize.Cache = WeakMap;
         */
        function memoize(func, resolver) {
          if (
            typeof func != "function" ||
            (resolver && typeof resolver != "function")
          ) {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function () {
            var args = arguments,
              key = resolver ? resolver.apply(this, args) : args[0],
              cache = memoized.cache;

            if (cache.has(key)) {
              return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result);
            return result;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }

        // Assign cache to `_.memoize`.
        memoize.Cache = MapCache;

        /**
         * Performs a
         * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
         * comparison between two values to determine if they are equivalent.
         *
         * @static
         * @memberOf _
         * @since 4.0.0
         * @category Lang
         * @param {*} value The value to compare.
         * @param {*} other The other value to compare.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         * @example
         *
         * var object = { 'a': 1 };
         * var other = { 'a': 1 };
         *
         * _.eq(object, object);
         * // => true
         *
         * _.eq(object, other);
         * // => false
         *
         * _.eq('a', 'a');
         * // => true
         *
         * _.eq('a', Object('a'));
         * // => false
         *
         * _.eq(NaN, NaN);
         * // => true
         */
        function eq(value, other) {
          return value === other || (value !== value && other !== other);
        }

        /**
         * Checks if `value` is classified as a `Function` object.
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a function, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */
        function isFunction(value) {
          // The use of `Object#toString` avoids issues with the `typeof` operator
          // in Safari 8-9 which returns 'object' for typed array and other constructors.
          var tag = isObject(value) ? objectToString.call(value) : "";
          return tag == funcTag || tag == genTag;
        }

        /**
         * Checks if `value` is the
         * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
         * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @since 0.1.0
         * @category Lang
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(_.noop);
         * // => true
         *
         * _.isObject(null);
         * // => false
         */
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == "object" || type == "function");
        }

        module.exports = memoize;

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(4)));

      /***/
    },
    /* 89 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function (global) {
        /**
         * A collection of shims that provide minimal functionality of the ES6 collections.
         *
         * These implementations are not meant to be used outside of the ResizeObserver
         * modules as they cover only a limited range of use cases.
         */
        /* eslint-disable require-jsdoc, valid-jsdoc */
        var MapShim = (function () {
          if (typeof Map !== "undefined") {
            return Map;
          }
          /**
           * Returns index in provided array that matches the specified key.
           *
           * @param {Array<Array>} arr
           * @param {*} key
           * @returns {number}
           */
          function getIndex(arr, key) {
            var result = -1;
            arr.some(function (entry, index) {
              if (entry[0] === key) {
                result = index;
                return true;
              }
              return false;
            });
            return result;
          }
          return /** @class */ (function () {
            function class_1() {
              this.__entries__ = [];
            }
            Object.defineProperty(class_1.prototype, "size", {
              /**
               * @returns {boolean}
               */
              get: function () {
                return this.__entries__.length;
              },
              enumerable: true,
              configurable: true,
            });
            /**
             * @param {*} key
             * @returns {*}
             */
            class_1.prototype.get = function (key) {
              var index = getIndex(this.__entries__, key);
              var entry = this.__entries__[index];
              return entry && entry[1];
            };
            /**
             * @param {*} key
             * @param {*} value
             * @returns {void}
             */
            class_1.prototype.set = function (key, value) {
              var index = getIndex(this.__entries__, key);
              if (~index) {
                this.__entries__[index][1] = value;
              } else {
                this.__entries__.push([key, value]);
              }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.delete = function (key) {
              var entries = this.__entries__;
              var index = getIndex(entries, key);
              if (~index) {
                entries.splice(index, 1);
              }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.has = function (key) {
              return !!~getIndex(this.__entries__, key);
            };
            /**
             * @returns {void}
             */
            class_1.prototype.clear = function () {
              this.__entries__.splice(0);
            };
            /**
             * @param {Function} callback
             * @param {*} [ctx=null]
             * @returns {void}
             */
            class_1.prototype.forEach = function (callback, ctx) {
              if (ctx === void 0) {
                ctx = null;
              }
              for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
              }
            };
            return class_1;
          })();
        })();

        /**
         * Detects whether window and document objects are available in current environment.
         */
        var isBrowser =
          typeof window !== "undefined" &&
          typeof document !== "undefined" &&
          window.document === document;

        // Returns global object of a current environment.
        var global$1 = (function () {
          if (typeof global !== "undefined" && global.Math === Math) {
            return global;
          }
          if (typeof self !== "undefined" && self.Math === Math) {
            return self;
          }
          if (typeof window !== "undefined" && window.Math === Math) {
            return window;
          }
          // eslint-disable-next-line no-new-func
          return Function("return this")();
        })();

        /**
         * A shim for the requestAnimationFrame which falls back to the setTimeout if
         * first one is not supported.
         *
         * @returns {number} Requests' identifier.
         */
        var requestAnimationFrame$1 = (function () {
          if (typeof requestAnimationFrame === "function") {
            // It's required to use a bounded function because IE sometimes throws
            // an "Invalid calling object" error if rAF is invoked without the global
            // object on the left hand side.
            return requestAnimationFrame.bind(global$1);
          }
          return function (callback) {
            return setTimeout(function () {
              return callback(Date.now());
            }, 1000 / 60);
          };
        })();

        // Defines minimum timeout before adding a trailing call.
        var trailingTimeout = 2;
        /**
         * Creates a wrapper function which ensures that provided callback will be
         * invoked only once during the specified delay period.
         *
         * @param {Function} callback - Function to be invoked after the delay period.
         * @param {number} delay - Delay after which to invoke callback.
         * @returns {Function}
         */
        function throttle(callback, delay) {
          var leadingCall = false,
            trailingCall = false,
            lastCallTime = 0;
          /**
           * Invokes the original callback function and schedules new invocation if
           * the "proxy" was called during current request.
           *
           * @returns {void}
           */
          function resolvePending() {
            if (leadingCall) {
              leadingCall = false;
              callback();
            }
            if (trailingCall) {
              proxy();
            }
          }
          /**
           * Callback invoked after the specified delay. It will further postpone
           * invocation of the original function delegating it to the
           * requestAnimationFrame.
           *
           * @returns {void}
           */
          function timeoutCallback() {
            requestAnimationFrame$1(resolvePending);
          }
          /**
           * Schedules invocation of the original function.
           *
           * @returns {void}
           */
          function proxy() {
            var timeStamp = Date.now();
            if (leadingCall) {
              // Reject immediately following calls.
              if (timeStamp - lastCallTime < trailingTimeout) {
                return;
              }
              // Schedule new call to be in invoked when the pending one is resolved.
              // This is important for "transitions" which never actually start
              // immediately so there is a chance that we might miss one if change
              // happens amids the pending invocation.
              trailingCall = true;
            } else {
              leadingCall = true;
              trailingCall = false;
              setTimeout(timeoutCallback, delay);
            }
            lastCallTime = timeStamp;
          }
          return proxy;
        }

        // Minimum delay before invoking the update of observers.
        var REFRESH_DELAY = 20;
        // A list of substrings of CSS properties used to find transition events that
        // might affect dimensions of observed elements.
        var transitionKeys = [
          "top",
          "right",
          "bottom",
          "left",
          "width",
          "height",
          "size",
          "weight",
        ];
        // Check if MutationObserver is available.
        var mutationObserverSupported = typeof MutationObserver !== "undefined";
        /**
         * Singleton controller class which handles updates of ResizeObserver instances.
         */
        var ResizeObserverController = /** @class */ (function () {
          /**
           * Creates a new instance of ResizeObserverController.
           *
           * @private
           */
          function ResizeObserverController() {
            /**
             * Indicates whether DOM listeners have been added.
             *
             * @private {boolean}
             */
            this.connected_ = false;
            /**
             * Tells that controller has subscribed for Mutation Events.
             *
             * @private {boolean}
             */
            this.mutationEventsAdded_ = false;
            /**
             * Keeps reference to the instance of MutationObserver.
             *
             * @private {MutationObserver}
             */
            this.mutationsObserver_ = null;
            /**
             * A list of connected observers.
             *
             * @private {Array<ResizeObserverSPI>}
             */
            this.observers_ = [];
            this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
            this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
          }
          /**
           * Adds observer to observers list.
           *
           * @param {ResizeObserverSPI} observer - Observer to be added.
           * @returns {void}
           */
          ResizeObserverController.prototype.addObserver = function (observer) {
            if (!~this.observers_.indexOf(observer)) {
              this.observers_.push(observer);
            }
            // Add listeners if they haven't been added yet.
            if (!this.connected_) {
              this.connect_();
            }
          };
          /**
           * Removes observer from observers list.
           *
           * @param {ResizeObserverSPI} observer - Observer to be removed.
           * @returns {void}
           */
          ResizeObserverController.prototype.removeObserver = function (
            observer
          ) {
            var observers = this.observers_;
            var index = observers.indexOf(observer);
            // Remove observer if it's present in registry.
            if (~index) {
              observers.splice(index, 1);
            }
            // Remove listeners if controller has no connected observers.
            if (!observers.length && this.connected_) {
              this.disconnect_();
            }
          };
          /**
           * Invokes the update of observers. It will continue running updates insofar
           * it detects changes.
           *
           * @returns {void}
           */
          ResizeObserverController.prototype.refresh = function () {
            var changesDetected = this.updateObservers_();
            // Continue running updates if changes have been detected as there might
            // be future ones caused by CSS transitions.
            if (changesDetected) {
              this.refresh();
            }
          };
          /**
           * Updates every observer from observers list and notifies them of queued
           * entries.
           *
           * @private
           * @returns {boolean} Returns "true" if any observer has detected changes in
           *      dimensions of it's elements.
           */
          ResizeObserverController.prototype.updateObservers_ = function () {
            // Collect observers that have active observations.
            var activeObservers = this.observers_.filter(function (observer) {
              return observer.gatherActive(), observer.hasActive();
            });
            // Deliver notifications in a separate cycle in order to avoid any
            // collisions between observers, e.g. when multiple instances of
            // ResizeObserver are tracking the same element and the callback of one
            // of them changes content dimensions of the observed target. Sometimes
            // this may result in notifications being blocked for the rest of observers.
            activeObservers.forEach(function (observer) {
              return observer.broadcastActive();
            });
            return activeObservers.length > 0;
          };
          /**
           * Initializes DOM listeners.
           *
           * @private
           * @returns {void}
           */
          ResizeObserverController.prototype.connect_ = function () {
            // Do nothing if running in a non-browser environment or if listeners
            // have been already added.
            if (!isBrowser || this.connected_) {
              return;
            }
            // Subscription to the "Transitionend" event is used as a workaround for
            // delayed transitions. This way it's possible to capture at least the
            // final state of an element.
            document.addEventListener("transitionend", this.onTransitionEnd_);
            window.addEventListener("resize", this.refresh);
            if (mutationObserverSupported) {
              this.mutationsObserver_ = new MutationObserver(this.refresh);
              this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
              });
            } else {
              document.addEventListener("DOMSubtreeModified", this.refresh);
              this.mutationEventsAdded_ = true;
            }
            this.connected_ = true;
          };
          /**
           * Removes DOM listeners.
           *
           * @private
           * @returns {void}
           */
          ResizeObserverController.prototype.disconnect_ = function () {
            // Do nothing if running in a non-browser environment or if listeners
            // have been already removed.
            if (!isBrowser || !this.connected_) {
              return;
            }
            document.removeEventListener(
              "transitionend",
              this.onTransitionEnd_
            );
            window.removeEventListener("resize", this.refresh);
            if (this.mutationsObserver_) {
              this.mutationsObserver_.disconnect();
            }
            if (this.mutationEventsAdded_) {
              document.removeEventListener("DOMSubtreeModified", this.refresh);
            }
            this.mutationsObserver_ = null;
            this.mutationEventsAdded_ = false;
            this.connected_ = false;
          };
          /**
           * "Transitionend" event handler.
           *
           * @private
           * @param {TransitionEvent} event
           * @returns {void}
           */
          ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
            var _b = _a.propertyName,
              propertyName = _b === void 0 ? "" : _b;
            // Detect whether transition may affect dimensions of an element.
            var isReflowProperty = transitionKeys.some(function (key) {
              return !!~propertyName.indexOf(key);
            });
            if (isReflowProperty) {
              this.refresh();
            }
          };
          /**
           * Returns instance of the ResizeObserverController.
           *
           * @returns {ResizeObserverController}
           */
          ResizeObserverController.getInstance = function () {
            if (!this.instance_) {
              this.instance_ = new ResizeObserverController();
            }
            return this.instance_;
          };
          /**
           * Holds reference to the controller's instance.
           *
           * @private {ResizeObserverController}
           */
          ResizeObserverController.instance_ = null;
          return ResizeObserverController;
        })();

        /**
         * Defines non-writable/enumerable properties of the provided target object.
         *
         * @param {Object} target - Object for which to define properties.
         * @param {Object} props - Properties to be defined.
         * @returns {Object} Target object.
         */
        var defineConfigurable = function (target, props) {
          for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            Object.defineProperty(target, key, {
              value: props[key],
              enumerable: false,
              writable: false,
              configurable: true,
            });
          }
          return target;
        };

        /**
         * Returns the global object associated with provided element.
         *
         * @param {Object} target
         * @returns {Object}
         */
        var getWindowOf = function (target) {
          // Assume that the element is an instance of Node, which means that it
          // has the "ownerDocument" property from which we can retrieve a
          // corresponding global object.
          var ownerGlobal =
            target && target.ownerDocument && target.ownerDocument.defaultView;
          // Return the local global object if it's not possible extract one from
          // provided element.
          return ownerGlobal || global$1;
        };

        // Placeholder of an empty content rectangle.
        var emptyRect = createRectInit(0, 0, 0, 0);
        /**
         * Converts provided string to a number.
         *
         * @param {number|string} value
         * @returns {number}
         */
        function toFloat(value) {
          return parseFloat(value) || 0;
        }
        /**
         * Extracts borders size from provided styles.
         *
         * @param {CSSStyleDeclaration} styles
         * @param {...string} positions - Borders positions (top, right, ...)
         * @returns {number}
         */
        function getBordersSize(styles) {
          var positions = [];
          for (var _i = 1; _i < arguments.length; _i++) {
            positions[_i - 1] = arguments[_i];
          }
          return positions.reduce(function (size, position) {
            var value = styles["border-" + position + "-width"];
            return size + toFloat(value);
          }, 0);
        }
        /**
         * Extracts paddings sizes from provided styles.
         *
         * @param {CSSStyleDeclaration} styles
         * @returns {Object} Paddings box.
         */
        function getPaddings(styles) {
          var positions = ["top", "right", "bottom", "left"];
          var paddings = {};
          for (
            var _i = 0, positions_1 = positions;
            _i < positions_1.length;
            _i++
          ) {
            var position = positions_1[_i];
            var value = styles["padding-" + position];
            paddings[position] = toFloat(value);
          }
          return paddings;
        }
        /**
         * Calculates content rectangle of provided SVG element.
         *
         * @param {SVGGraphicsElement} target - Element content rectangle of which needs
         *      to be calculated.
         * @returns {DOMRectInit}
         */
        function getSVGContentRect(target) {
          var bbox = target.getBBox();
          return createRectInit(0, 0, bbox.width, bbox.height);
        }
        /**
         * Calculates content rectangle of provided HTMLElement.
         *
         * @param {HTMLElement} target - Element for which to calculate the content rectangle.
         * @returns {DOMRectInit}
         */
        function getHTMLElementContentRect(target) {
          // Client width & height properties can't be
          // used exclusively as they provide rounded values.
          var clientWidth = target.clientWidth,
            clientHeight = target.clientHeight;
          // By this condition we can catch all non-replaced inline, hidden and
          // detached elements. Though elements with width & height properties less
          // than 0.5 will be discarded as well.
          //
          // Without it we would need to implement separate methods for each of
          // those cases and it's not possible to perform a precise and performance
          // effective test for hidden elements. E.g. even jQuery's ':visible' filter
          // gives wrong results for elements with width & height less than 0.5.
          if (!clientWidth && !clientHeight) {
            return emptyRect;
          }
          var styles = getWindowOf(target).getComputedStyle(target);
          var paddings = getPaddings(styles);
          var horizPad = paddings.left + paddings.right;
          var vertPad = paddings.top + paddings.bottom;
          // Computed styles of width & height are being used because they are the
          // only dimensions available to JS that contain non-rounded values. It could
          // be possible to utilize the getBoundingClientRect if only it's data wasn't
          // affected by CSS transformations let alone paddings, borders and scroll bars.
          var width = toFloat(styles.width),
            height = toFloat(styles.height);
          // Width & height include paddings and borders when the 'border-box' box
          // model is applied (except for IE).
          if (styles.boxSizing === "border-box") {
            // Following conditions are required to handle Internet Explorer which
            // doesn't include paddings and borders to computed CSS dimensions.
            //
            // We can say that if CSS dimensions + paddings are equal to the "client"
            // properties then it's either IE, and thus we don't need to subtract
            // anything, or an element merely doesn't have paddings/borders styles.
            if (Math.round(width + horizPad) !== clientWidth) {
              width -= getBordersSize(styles, "left", "right") + horizPad;
            }
            if (Math.round(height + vertPad) !== clientHeight) {
              height -= getBordersSize(styles, "top", "bottom") + vertPad;
            }
          }
          // Following steps can't be applied to the document's root element as its
          // client[Width/Height] properties represent viewport area of the window.
          // Besides, it's as well not necessary as the <html> itself neither has
          // rendered scroll bars nor it can be clipped.
          if (!isDocumentElement(target)) {
            // In some browsers (only in Firefox, actually) CSS width & height
            // include scroll bars size which can be removed at this step as scroll
            // bars are the only difference between rounded dimensions + paddings
            // and "client" properties, though that is not always true in Chrome.
            var vertScrollbar = Math.round(width + horizPad) - clientWidth;
            var horizScrollbar = Math.round(height + vertPad) - clientHeight;
            // Chrome has a rather weird rounding of "client" properties.
            // E.g. for an element with content width of 314.2px it sometimes gives
            // the client width of 315px and for the width of 314.7px it may give
            // 314px. And it doesn't happen all the time. So just ignore this delta
            // as a non-relevant.
            if (Math.abs(vertScrollbar) !== 1) {
              width -= vertScrollbar;
            }
            if (Math.abs(horizScrollbar) !== 1) {
              height -= horizScrollbar;
            }
          }
          return createRectInit(paddings.left, paddings.top, width, height);
        }
        /**
         * Checks whether provided element is an instance of the SVGGraphicsElement.
         *
         * @param {Element} target - Element to be checked.
         * @returns {boolean}
         */
        var isSVGGraphicsElement = (function () {
          // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
          // interface.
          if (typeof SVGGraphicsElement !== "undefined") {
            return function (target) {
              return target instanceof getWindowOf(target).SVGGraphicsElement;
            };
          }
          // If it's so, then check that element is at least an instance of the
          // SVGElement and that it has the "getBBox" method.
          // eslint-disable-next-line no-extra-parens
          return function (target) {
            return (
              target instanceof getWindowOf(target).SVGElement &&
              typeof target.getBBox === "function"
            );
          };
        })();
        /**
         * Checks whether provided element is a document element (<html>).
         *
         * @param {Element} target - Element to be checked.
         * @returns {boolean}
         */
        function isDocumentElement(target) {
          return target === getWindowOf(target).document.documentElement;
        }
        /**
         * Calculates an appropriate content rectangle for provided html or svg element.
         *
         * @param {Element} target - Element content rectangle of which needs to be calculated.
         * @returns {DOMRectInit}
         */
        function getContentRect(target) {
          if (!isBrowser) {
            return emptyRect;
          }
          if (isSVGGraphicsElement(target)) {
            return getSVGContentRect(target);
          }
          return getHTMLElementContentRect(target);
        }
        /**
         * Creates rectangle with an interface of the DOMRectReadOnly.
         * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
         *
         * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
         * @returns {DOMRectReadOnly}
         */
        function createReadOnlyRect(_a) {
          var x = _a.x,
            y = _a.y,
            width = _a.width,
            height = _a.height;
          // If DOMRectReadOnly is available use it as a prototype for the rectangle.
          var Constr =
            typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
          var rect = Object.create(Constr.prototype);
          // Rectangle's properties are not writable and non-enumerable.
          defineConfigurable(rect, {
            x: x,
            y: y,
            width: width,
            height: height,
            top: y,
            right: x + width,
            bottom: height + y,
            left: x,
          });
          return rect;
        }
        /**
         * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
         * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
         *
         * @param {number} x - X coordinate.
         * @param {number} y - Y coordinate.
         * @param {number} width - Rectangle's width.
         * @param {number} height - Rectangle's height.
         * @returns {DOMRectInit}
         */
        function createRectInit(x, y, width, height) {
          return { x: x, y: y, width: width, height: height };
        }

        /**
         * Class that is responsible for computations of the content rectangle of
         * provided DOM element and for keeping track of it's changes.
         */
        var ResizeObservation = /** @class */ (function () {
          /**
           * Creates an instance of ResizeObservation.
           *
           * @param {Element} target - Element to be observed.
           */
          function ResizeObservation(target) {
            /**
             * Broadcasted width of content rectangle.
             *
             * @type {number}
             */
            this.broadcastWidth = 0;
            /**
             * Broadcasted height of content rectangle.
             *
             * @type {number}
             */
            this.broadcastHeight = 0;
            /**
             * Reference to the last observed content rectangle.
             *
             * @private {DOMRectInit}
             */
            this.contentRect_ = createRectInit(0, 0, 0, 0);
            this.target = target;
          }
          /**
           * Updates content rectangle and tells whether it's width or height properties
           * have changed since the last broadcast.
           *
           * @returns {boolean}
           */
          ResizeObservation.prototype.isActive = function () {
            var rect = getContentRect(this.target);
            this.contentRect_ = rect;
            return (
              rect.width !== this.broadcastWidth ||
              rect.height !== this.broadcastHeight
            );
          };
          /**
           * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
           * from the corresponding properties of the last observed content rectangle.
           *
           * @returns {DOMRectInit} Last observed content rectangle.
           */
          ResizeObservation.prototype.broadcastRect = function () {
            var rect = this.contentRect_;
            this.broadcastWidth = rect.width;
            this.broadcastHeight = rect.height;
            return rect;
          };
          return ResizeObservation;
        })();

        var ResizeObserverEntry = /** @class */ (function () {
          /**
           * Creates an instance of ResizeObserverEntry.
           *
           * @param {Element} target - Element that is being observed.
           * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
           */
          function ResizeObserverEntry(target, rectInit) {
            var contentRect = createReadOnlyRect(rectInit);
            // According to the specification following properties are not writable
            // and are also not enumerable in the native implementation.
            //
            // Property accessors are not being used as they'd require to define a
            // private WeakMap storage which may cause memory leaks in browsers that
            // don't support this type of collections.
            defineConfigurable(this, {
              target: target,
              contentRect: contentRect,
            });
          }
          return ResizeObserverEntry;
        })();

        var ResizeObserverSPI = /** @class */ (function () {
          /**
           * Creates a new instance of ResizeObserver.
           *
           * @param {ResizeObserverCallback} callback - Callback function that is invoked
           *      when one of the observed elements changes it's content dimensions.
           * @param {ResizeObserverController} controller - Controller instance which
           *      is responsible for the updates of observer.
           * @param {ResizeObserver} callbackCtx - Reference to the public
           *      ResizeObserver instance which will be passed to callback function.
           */
          function ResizeObserverSPI(callback, controller, callbackCtx) {
            /**
             * Collection of resize observations that have detected changes in dimensions
             * of elements.
             *
             * @private {Array<ResizeObservation>}
             */
            this.activeObservations_ = [];
            /**
             * Registry of the ResizeObservation instances.
             *
             * @private {Map<Element, ResizeObservation>}
             */
            this.observations_ = new MapShim();
            if (typeof callback !== "function") {
              throw new TypeError(
                "The callback provided as parameter 1 is not a function."
              );
            }
            this.callback_ = callback;
            this.controller_ = controller;
            this.callbackCtx_ = callbackCtx;
          }
          /**
           * Starts observing provided element.
           *
           * @param {Element} target - Element to be observed.
           * @returns {void}
           */
          ResizeObserverSPI.prototype.observe = function (target) {
            if (!arguments.length) {
              throw new TypeError("1 argument required, but only 0 present.");
            }
            // Do nothing if current environment doesn't have the Element interface.
            if (
              typeof Element === "undefined" ||
              !(Element instanceof Object)
            ) {
              return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            // Do nothing if element is already being observed.
            if (observations.has(target)) {
              return;
            }
            observations.set(target, new ResizeObservation(target));
            this.controller_.addObserver(this);
            // Force the update of observations.
            this.controller_.refresh();
          };
          /**
           * Stops observing provided element.
           *
           * @param {Element} target - Element to stop observing.
           * @returns {void}
           */
          ResizeObserverSPI.prototype.unobserve = function (target) {
            if (!arguments.length) {
              throw new TypeError("1 argument required, but only 0 present.");
            }
            // Do nothing if current environment doesn't have the Element interface.
            if (
              typeof Element === "undefined" ||
              !(Element instanceof Object)
            ) {
              return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
              throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            // Do nothing if element is not being observed.
            if (!observations.has(target)) {
              return;
            }
            observations.delete(target);
            if (!observations.size) {
              this.controller_.removeObserver(this);
            }
          };
          /**
           * Stops observing all elements.
           *
           * @returns {void}
           */
          ResizeObserverSPI.prototype.disconnect = function () {
            this.clearActive();
            this.observations_.clear();
            this.controller_.removeObserver(this);
          };
          /**
           * Collects observation instances the associated element of which has changed
           * it's content rectangle.
           *
           * @returns {void}
           */
          ResizeObserverSPI.prototype.gatherActive = function () {
            var _this = this;
            this.clearActive();
            this.observations_.forEach(function (observation) {
              if (observation.isActive()) {
                _this.activeObservations_.push(observation);
              }
            });
          };
          /**
           * Invokes initial callback function with a list of ResizeObserverEntry
           * instances collected from active resize observations.
           *
           * @returns {void}
           */
          ResizeObserverSPI.prototype.broadcastActive = function () {
            // Do nothing if observer doesn't have active observations.
            if (!this.hasActive()) {
              return;
            }
            var ctx = this.callbackCtx_;
            // Create ResizeObserverEntry instance for every active observation.
            var entries = this.activeObservations_.map(function (observation) {
              return new ResizeObserverEntry(
                observation.target,
                observation.broadcastRect()
              );
            });
            this.callback_.call(ctx, entries, ctx);
            this.clearActive();
          };
          /**
           * Clears the collection of active observations.
           *
           * @returns {void}
           */
          ResizeObserverSPI.prototype.clearActive = function () {
            this.activeObservations_.splice(0);
          };
          /**
           * Tells whether observer has active observations.
           *
           * @returns {boolean}
           */
          ResizeObserverSPI.prototype.hasActive = function () {
            return this.activeObservations_.length > 0;
          };
          return ResizeObserverSPI;
        })();

        // Registry of internal observers. If WeakMap is not available use current shim
        // for the Map collection as it has all required methods and because WeakMap
        // can't be fully polyfilled anyway.
        var observers =
          typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
        /**
         * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
         * exposing only those methods and properties that are defined in the spec.
         */
        var ResizeObserver = /** @class */ (function () {
          /**
           * Creates a new instance of ResizeObserver.
           *
           * @param {ResizeObserverCallback} callback - Callback that is invoked when
           *      dimensions of the observed elements change.
           */
          function ResizeObserver(callback) {
            if (!(this instanceof ResizeObserver)) {
              throw new TypeError("Cannot call a class as a function.");
            }
            if (!arguments.length) {
              throw new TypeError("1 argument required, but only 0 present.");
            }
            var controller = ResizeObserverController.getInstance();
            var observer = new ResizeObserverSPI(callback, controller, this);
            observers.set(this, observer);
          }
          return ResizeObserver;
        })();
        // Expose public methods of ResizeObserver.
        ["observe", "unobserve", "disconnect"].forEach(function (method) {
          ResizeObserver.prototype[method] = function () {
            var _a;
            return (_a = observers.get(this))[method].apply(_a, arguments);
          };
        });

        var index = (function () {
          // Export existing implementation if available.
          if (typeof global$1.ResizeObserver !== "undefined") {
            return global$1.ResizeObserver;
          }
          return ResizeObserver;
        })();

        /* harmony default export */ __webpack_exports__["a"] = index;

        /* WEBPACK VAR INJECTION */
      }.call(__webpack_exports__, __webpack_require__(4)));

      /***/
    },
    /* 90 */
    /***/ function (module, exports) {
      var canUseDOM = !!(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
      );

      module.exports = canUseDOM;

      /***/
    },
    /* 91 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($, jQuery) {
        $(".forgotten-pass, .loginfrom-link").on("click", function (e) {
          e.preventDefault();
          var $this = $(this);
          var targetString = $this.attr("href").replace("#", "");
          $("." + targetString).show();
          $this.closest("form").parent().hide();
        });

        $(
          ".template-customer--addresses .btn--new, .form--address-new .btn--cancel"
        ).on("click", function (e) {
          e.preventDefault();
          var $this = $(this);
          var targetString = $this.attr("href").replace("#", "");
          $("." + targetString).toggle();
        });

        $("#sortBy").on("change", function () {
          Shopify.queryParams = {};
          var $this = $(this);
          var thisVal = $this.val();

          if (location.search) {
            var getArgumentsArray = location.search.substr(1).split("&");
            getArgumentsArray.map(function (ele) {
              var eleArray = ele.split("=");
              Shopify.queryParams[decodeURIComponent(eleArray[0])] =
                decodeURIComponent(eleArray[1]);
            });
          }

          Shopify.queryParams.sort_by = thisVal;
          location.search = jQuery.param(Shopify.queryParams);
        });

        $(".product-single__variants").on("change", function () {
          var $this = $(this);
          var thisPrice = $this.find("li.selected").data("price");
          $(".product__price").html(thisPrice);
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0), __webpack_require__(0)));

      /***/
    },
    /* 92 */
    /***/ function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      /*!
       * jQuery JavaScript Library v3.2.1
       * https://jquery.com/
       *
       * Includes Sizzle.js
       * https://sizzlejs.com/
       *
       * Copyright JS Foundation and other contributors
       * Released under the MIT license
       * https://jquery.org/license
       *
       * Date: 2017-03-20T18:59Z
       */
      (function (global, factory) {
        "use strict";

        if (typeof module === "object" && typeof module.exports === "object") {
          // For CommonJS and CommonJS-like environments where a proper `window`
          // is present, execute the factory and get jQuery.
          // For environments that do not have a `window` with a `document`
          // (such as Node.js), expose a factory as module.exports.
          // This accentuates the need for the creation of a real `window`.
          // e.g. var jQuery = require("jquery")(window);
          // See ticket #14549 for more info.
          module.exports = global.document
            ? factory(global, true)
            : function (w) {
                if (!w.document) {
                  throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
              };
        } else {
          factory(global);
        }

        // Pass this if window is not defined yet
      })(
        typeof window !== "undefined" ? window : this,
        function (window, noGlobal) {
          // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
          // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
          // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
          // enough that all such attempts are guarded in a try block.
          "use strict";

          var arr = [];

          var document = window.document;

          var getProto = Object.getPrototypeOf;

          var slice = arr.slice;

          var concat = arr.concat;

          var push = arr.push;

          var indexOf = arr.indexOf;

          var class2type = {};

          var toString = class2type.toString;

          var hasOwn = class2type.hasOwnProperty;

          var fnToString = hasOwn.toString;

          var ObjectFunctionString = fnToString.call(Object);

          var support = {};

          function DOMEval(code, doc) {
            doc = doc || document;

            var script = doc.createElement("script");

            script.text = code;
            doc.head.appendChild(script).parentNode.removeChild(script);
          }
          /* global Symbol */
          // Defining this global in .eslintrc.json would create a danger of using the global
          // unguarded in another place, it seems safer to define global only for this module

          var version = "3.2.1",
            // Define a local copy of jQuery
            jQuery = function (selector, context) {
              // The jQuery object is actually just the init constructor 'enhanced'
              // Need init if jQuery is called (just allow error to be thrown if not included)
              return new jQuery.fn.init(selector, context);
            },
            // Support: Android <=4.0 only
            // Make sure we trim BOM and NBSP
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            // Matches dashed string for camelizing
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([a-z])/g,
            // Used by jQuery.camelCase as callback to replace()
            fcamelCase = function (all, letter) {
              return letter.toUpperCase();
            };

          jQuery.fn = jQuery.prototype = {
            // The current version of jQuery being used
            jquery: version,

            constructor: jQuery,

            // The default length of a jQuery object is 0
            length: 0,

            toArray: function () {
              return slice.call(this);
            },

            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function (num) {
              // Return all the elements in a clean array
              if (num == null) {
                return slice.call(this);
              }

              // Return just the one element from the set
              return num < 0 ? this[num + this.length] : this[num];
            },

            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function (elems) {
              // Build a new jQuery matched element set
              var ret = jQuery.merge(this.constructor(), elems);

              // Add the old object onto the stack (as a reference)
              ret.prevObject = this;

              // Return the newly-formed element set
              return ret;
            },

            // Execute a callback for every element in the matched set.
            each: function (callback) {
              return jQuery.each(this, callback);
            },

            map: function (callback) {
              return this.pushStack(
                jQuery.map(this, function (elem, i) {
                  return callback.call(elem, i, elem);
                })
              );
            },

            slice: function () {
              return this.pushStack(slice.apply(this, arguments));
            },

            first: function () {
              return this.eq(0);
            },

            last: function () {
              return this.eq(-1);
            },

            eq: function (i) {
              var len = this.length,
                j = +i + (i < 0 ? len : 0);
              return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
            },

            end: function () {
              return this.prevObject || this.constructor();
            },

            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: push,
            sort: arr.sort,
            splice: arr.splice,
          };

          jQuery.extend = jQuery.fn.extend = function () {
            var options,
              name,
              src,
              copy,
              copyIsArray,
              clone,
              target = arguments[0] || {},
              i = 1,
              length = arguments.length,
              deep = false;

            // Handle a deep copy situation
            if (typeof target === "boolean") {
              deep = target;

              // Skip the boolean and the target
              target = arguments[i] || {};
              i++;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
              target = {};
            }

            // Extend jQuery itself if only one argument is passed
            if (i === length) {
              target = this;
              i--;
            }

            for (; i < length; i++) {
              // Only deal with non-null/undefined values
              if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                  src = target[name];
                  copy = options[name];

                  // Prevent never-ending loop
                  if (target === copy) {
                    continue;
                  }

                  // Recurse if we're merging plain objects or arrays
                  if (
                    deep &&
                    copy &&
                    (jQuery.isPlainObject(copy) ||
                      (copyIsArray = Array.isArray(copy)))
                  ) {
                    if (copyIsArray) {
                      copyIsArray = false;
                      clone = src && Array.isArray(src) ? src : [];
                    } else {
                      clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                  } else if (copy !== undefined) {
                    target[name] = copy;
                  }
                }
              }
            }

            // Return the modified object
            return target;
          };

          jQuery.extend({
            // Unique for each copy of jQuery on the page
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

            // Assume jQuery is ready without the ready module
            isReady: true,

            error: function (msg) {
              throw new Error(msg);
            },

            noop: function () {},

            isFunction: function (obj) {
              return jQuery.type(obj) === "function";
            },

            isWindow: function (obj) {
              return obj != null && obj === obj.window;
            },

            isNumeric: function (obj) {
              // As of jQuery 3.0, isNumeric is limited to
              // strings and numbers (primitives or objects)
              // that can be coerced to finite numbers (gh-2662)
              var type = jQuery.type(obj);
              return (
                (type === "number" || type === "string") &&
                // parseFloat NaNs numeric-cast false positives ("")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                !isNaN(obj - parseFloat(obj))
              );
            },

            isPlainObject: function (obj) {
              var proto, Ctor;

              // Detect obvious negatives
              // Use toString instead of jQuery.type to catch host objects
              if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
              }

              proto = getProto(obj);

              // Objects with no prototype (e.g., `Object.create( null )`) are plain
              if (!proto) {
                return true;
              }

              // Objects with prototype are plain iff they were constructed by a global Object function
              Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
              return (
                typeof Ctor === "function" &&
                fnToString.call(Ctor) === ObjectFunctionString
              );
            },

            isEmptyObject: function (obj) {
              /* eslint-disable no-unused-vars */
              // See https://github.com/eslint/eslint/issues/6125
              var name;

              for (name in obj) {
                return false;
              }
              return true;
            },

            type: function (obj) {
              if (obj == null) {
                return obj + "";
              }

              // Support: Android <=2.3 only (functionish RegExp)
              return typeof obj === "object" || typeof obj === "function"
                ? class2type[toString.call(obj)] || "object"
                : typeof obj;
            },

            // Evaluates a script in a global context
            globalEval: function (code) {
              DOMEval(code);
            },

            // Convert dashed to camelCase; used by the css and data modules
            // Support: IE <=9 - 11, Edge 12 - 13
            // Microsoft forgot to hump their vendor prefix (#9572)
            camelCase: function (string) {
              return string
                .replace(rmsPrefix, "ms-")
                .replace(rdashAlpha, fcamelCase);
            },

            each: function (obj, callback) {
              var length,
                i = 0;

              if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                  if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                  }
                }
              } else {
                for (i in obj) {
                  if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                  }
                }
              }

              return obj;
            },

            // Support: Android <=4.0 only
            trim: function (text) {
              return text == null ? "" : (text + "").replace(rtrim, "");
            },

            // results is for internal usage only
            makeArray: function (arr, results) {
              var ret = results || [];

              if (arr != null) {
                if (isArrayLike(Object(arr))) {
                  jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                  push.call(ret, arr);
                }
              }

              return ret;
            },

            inArray: function (elem, arr, i) {
              return arr == null ? -1 : indexOf.call(arr, elem, i);
            },

            // Support: Android <=4.0 only, PhantomJS 1 only
            // push.apply(_, arraylike) throws on ancient WebKit
            merge: function (first, second) {
              var len = +second.length,
                j = 0,
                i = first.length;

              for (; j < len; j++) {
                first[i++] = second[j];
              }

              first.length = i;

              return first;
            },

            grep: function (elems, callback, invert) {
              var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

              // Go through the array, only saving the items
              // that pass the validator function
              for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                  matches.push(elems[i]);
                }
              }

              return matches;
            },

            // arg is for internal usage only
            map: function (elems, callback, arg) {
              var length,
                value,
                i = 0,
                ret = [];

              // Go through the array, translating each of the items to their new values
              if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                  value = callback(elems[i], i, arg);

                  if (value != null) {
                    ret.push(value);
                  }
                }

                // Go through every key on the object,
              } else {
                for (i in elems) {
                  value = callback(elems[i], i, arg);

                  if (value != null) {
                    ret.push(value);
                  }
                }
              }

              // Flatten any nested arrays
              return concat.apply([], ret);
            },

            // A global GUID counter for objects
            guid: 1,

            // Bind a function to a context, optionally partially applying any
            // arguments.
            proxy: function (fn, context) {
              var tmp, args, proxy;

              if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
              }

              // Quick check to determine if target is callable, in the spec
              // this throws a TypeError, but we will just return undefined.
              if (!jQuery.isFunction(fn)) {
                return undefined;
              }

              // Simulated bind
              args = slice.call(arguments, 2);
              proxy = function () {
                return fn.apply(
                  context || this,
                  args.concat(slice.call(arguments))
                );
              };

              // Set the guid of unique handler to the same of original handler, so it can be removed
              proxy.guid = fn.guid = fn.guid || jQuery.guid++;

              return proxy;
            },

            now: Date.now,

            // jQuery.support is not used in Core but other projects attach their
            // properties to it so it needs to exist.
            support: support,
          });

          if (typeof Symbol === "function") {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
          }

          // Populate the class2type map
          jQuery.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
              " "
            ),
            function (i, name) {
              class2type["[object " + name + "]"] = name.toLowerCase();
            }
          );

          function isArrayLike(obj) {
            // Support: real iOS 8.2 only (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            var length = !!obj && "length" in obj && obj.length,
              type = jQuery.type(obj);

            if (type === "function" || jQuery.isWindow(obj)) {
              return false;
            }

            return (
              type === "array" ||
              length === 0 ||
              (typeof length === "number" && length > 0 && length - 1 in obj)
            );
          }
          var Sizzle =
            /*!
             * Sizzle CSS Selector Engine v2.3.3
             * https://sizzlejs.com/
             *
             * Copyright jQuery Foundation and other contributors
             * Released under the MIT license
             * http://jquery.org/license
             *
             * Date: 2016-08-08
             */
            (function (window) {
              var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,
                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,
                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function (a, b) {
                  if (a === b) {
                    hasDuplicate = true;
                  }
                  return 0;
                },
                // Instance methods
                hasOwn = {}.hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf as it's faster than native
                // https://jsperf.com/thor-indexof-vs-for/5
                indexOf = function (list, elem) {
                  var i = 0,
                    len = list.length;
                  for (; i < len; i++) {
                    if (list[i] === elem) {
                      return i;
                    }
                  }
                  return -1;
                },
                booleans =
                  "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes =
                  "\\[" +
                  whitespace +
                  "*(" +
                  identifier +
                  ")(?:" +
                  whitespace +
                  // Operator (capture 2)
                  "*([*^$|!~]?=)" +
                  whitespace +
                  // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                  "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                  identifier +
                  "))|)" +
                  whitespace +
                  "*\\]",
                pseudos =
                  ":(" +
                  identifier +
                  ")(?:\\((" +
                  // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                  // 1. quoted (capture 3; capture 4 or capture 5)
                  "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                  // 2. simple (capture 6)
                  "((?:\\\\.|[^\\\\()[\\]]|" +
                  attributes +
                  ")*)|" +
                  // 3. anything else (capture 2)
                  ".*" +
                  ")\\)|)",
                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp(
                  "^" +
                    whitespace +
                    "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                    whitespace +
                    "+$",
                  "g"
                ),
                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp(
                  "^" +
                    whitespace +
                    "*([>+~]|" +
                    whitespace +
                    ")" +
                    whitespace +
                    "*"
                ),
                rattributeQuotes = new RegExp(
                  "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]",
                  "g"
                ),
                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),
                matchExpr = {
                  ID: new RegExp("^#(" + identifier + ")"),
                  CLASS: new RegExp("^\\.(" + identifier + ")"),
                  TAG: new RegExp("^(" + identifier + "|[*])"),
                  ATTR: new RegExp("^" + attributes),
                  PSEUDO: new RegExp("^" + pseudos),
                  CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                      whitespace +
                      "*(even|odd|(([+-]|)(\\d*)n|)" +
                      whitespace +
                      "*(?:([+-]|)" +
                      whitespace +
                      "*(\\d+)|))" +
                      whitespace +
                      "*\\)|)",
                    "i"
                  ),
                  bool: new RegExp("^(?:" + booleans + ")$", "i"),
                  // For use in libraries implementing .is()
                  // We use this for POS matching in `select`
                  needsContext: new RegExp(
                    "^" +
                      whitespace +
                      "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                      whitespace +
                      "*((?:-\\d)?\\d*)" +
                      whitespace +
                      "*\\)|)(?=[^-]|$)",
                    "i"
                  ),
                },
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,
                rnative = /^[^{]+\{\s*\[native \w/,
                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                rsibling = /[+~]/,
                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp(
                  "\\\\([\\da-f]{1,6}" +
                    whitespace +
                    "?|(" +
                    whitespace +
                    ")|.)",
                  "ig"
                ),
                funescape = function (_, escaped, escapedWhitespace) {
                  var high = "0x" + escaped - 0x10000;
                  // NaN means non-codepoint
                  // Support: Firefox<24
                  // Workaround erroneous numeric interpretation of +"0x"
                  return high !== high || escapedWhitespace
                    ? escaped
                    : high < 0
                    ? // BMP codepoint
                      String.fromCharCode(high + 0x10000)
                    : // Supplemental Plane codepoint (surrogate pair)
                      String.fromCharCode(
                        (high >> 10) | 0xd800,
                        (high & 0x3ff) | 0xdc00
                      );
                },
                // CSS string/identifier serialization
                // https://drafts.csswg.org/cssom/#common-serializing-idioms
                rcssescape =
                  /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function (ch, asCodePoint) {
                  if (asCodePoint) {
                    // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                    if (ch === "\0") {
                      return "\uFFFD";
                    }

                    // Control characters and (dependent upon position) numbers get escaped as code points
                    return (
                      ch.slice(0, -1) +
                      "\\" +
                      ch.charCodeAt(ch.length - 1).toString(16) +
                      " "
                    );
                  }

                  // Other potentially-special ASCII characters get backslash-escaped
                  return "\\" + ch;
                },
                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function () {
                  setDocument();
                },
                disabledAncestor = addCombinator(
                  function (elem) {
                    return (
                      elem.disabled === true &&
                      ("form" in elem || "label" in elem)
                    );
                  },
                  { dir: "parentNode", next: "legend" }
                );

              // Optimize for push.apply( _, NodeList )
              try {
                push.apply(
                  (arr = slice.call(preferredDoc.childNodes)),
                  preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
              } catch (e) {
                push = {
                  apply: arr.length
                    ? // Leverage slice if possible
                      function (target, els) {
                        push_native.apply(target, slice.call(els));
                      }
                    : // Support: IE<9
                      // Otherwise append directly
                      function (target, els) {
                        var j = target.length,
                          i = 0;
                        // Can't trust NodeList.length
                        while ((target[j++] = els[i++])) {}
                        target.length = j - 1;
                      },
                };
              }

              function Sizzle(selector, context, results, seed) {
                var m,
                  i,
                  elem,
                  nid,
                  match,
                  groups,
                  newSelector,
                  newContext = context && context.ownerDocument,
                  // nodeType defaults to 9, since context defaults to document
                  nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if (
                  typeof selector !== "string" ||
                  !selector ||
                  (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
                ) {
                  return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {
                  if (
                    (context
                      ? context.ownerDocument || context
                      : preferredDoc) !== document
                  ) {
                    setDocument(context);
                  }
                  context = context || document;

                  if (documentIsHTML) {
                    // If the selector is sufficiently simple, try using a "get*By*" DOM method
                    // (excepting DocumentFragment context, where the methods don't exist)
                    if (
                      nodeType !== 11 &&
                      (match = rquickExpr.exec(selector))
                    ) {
                      // ID selector
                      if ((m = match[1])) {
                        // Document context
                        if (nodeType === 9) {
                          if ((elem = context.getElementById(m))) {
                            // Support: IE, Opera, Webkit
                            // TODO: identify versions
                            // getElementById can match elements by name instead of ID
                            if (elem.id === m) {
                              results.push(elem);
                              return results;
                            }
                          } else {
                            return results;
                          }

                          // Element context
                        } else {
                          // Support: IE, Opera, Webkit
                          // TODO: identify versions
                          // getElementById can match elements by name instead of ID
                          if (
                            newContext &&
                            (elem = newContext.getElementById(m)) &&
                            contains(context, elem) &&
                            elem.id === m
                          ) {
                            results.push(elem);
                            return results;
                          }
                        }

                        // Type selector
                      } else if (match[2]) {
                        push.apply(
                          results,
                          context.getElementsByTagName(selector)
                        );
                        return results;

                        // Class selector
                      } else if (
                        (m = match[3]) &&
                        support.getElementsByClassName &&
                        context.getElementsByClassName
                      ) {
                        push.apply(results, context.getElementsByClassName(m));
                        return results;
                      }
                    }

                    // Take advantage of querySelectorAll
                    if (
                      support.qsa &&
                      !compilerCache[selector + " "] &&
                      (!rbuggyQSA || !rbuggyQSA.test(selector))
                    ) {
                      if (nodeType !== 1) {
                        newContext = context;
                        newSelector = selector;

                        // qSA looks outside Element context, which is not what we want
                        // Thanks to Andrew Dupont for this workaround technique
                        // Support: IE <=8
                        // Exclude object elements
                      } else if (context.nodeName.toLowerCase() !== "object") {
                        // Capture the context ID, setting it first if necessary
                        if ((nid = context.getAttribute("id"))) {
                          nid = nid.replace(rcssescape, fcssescape);
                        } else {
                          context.setAttribute("id", (nid = expando));
                        }

                        // Prefix every selector in the list
                        groups = tokenize(selector);
                        i = groups.length;
                        while (i--) {
                          groups[i] = "#" + nid + " " + toSelector(groups[i]);
                        }
                        newSelector = groups.join(",");

                        // Expand context for sibling selectors
                        newContext =
                          (rsibling.test(selector) &&
                            testContext(context.parentNode)) ||
                          context;
                      }

                      if (newSelector) {
                        try {
                          push.apply(
                            results,
                            newContext.querySelectorAll(newSelector)
                          );
                          return results;
                        } catch (qsaError) {
                        } finally {
                          if (nid === expando) {
                            context.removeAttribute("id");
                          }
                        }
                      }
                    }
                  }
                }

                // All others
                return select(
                  selector.replace(rtrim, "$1"),
                  context,
                  results,
                  seed
                );
              }

              /**
               * Create key-value caches of limited size
               * @returns {function(string, object)} Returns the Object data after storing it on itself with
               *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
               *	deleting the oldest entry
               */
              function createCache() {
                var keys = [];

                function cache(key, value) {
                  // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                  if (keys.push(key + " ") > Expr.cacheLength) {
                    // Only keep the most recent entries
                    delete cache[keys.shift()];
                  }
                  return (cache[key + " "] = value);
                }
                return cache;
              }

              /**
               * Mark a function for special use by Sizzle
               * @param {Function} fn The function to mark
               */
              function markFunction(fn) {
                fn[expando] = true;
                return fn;
              }

              /**
               * Support testing using an element
               * @param {Function} fn Passed the created element and returns a boolean result
               */
              function assert(fn) {
                var el = document.createElement("fieldset");

                try {
                  return !!fn(el);
                } catch (e) {
                  return false;
                } finally {
                  // Remove from its parent by default
                  if (el.parentNode) {
                    el.parentNode.removeChild(el);
                  }
                  // release memory in IE
                  el = null;
                }
              }

              /**
               * Adds the same handler for all of the specified attrs
               * @param {String} attrs Pipe-separated list of attributes
               * @param {Function} handler The method that will be applied
               */
              function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                  i = arr.length;

                while (i--) {
                  Expr.attrHandle[arr[i]] = handler;
                }
              }

              /**
               * Checks document order of two siblings
               * @param {Element} a
               * @param {Element} b
               * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
               */
              function siblingCheck(a, b) {
                var cur = b && a,
                  diff =
                    cur &&
                    a.nodeType === 1 &&
                    b.nodeType === 1 &&
                    a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                  return diff;
                }

                // Check if b follows a
                if (cur) {
                  while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                      return -1;
                    }
                  }
                }

                return a ? 1 : -1;
              }

              /**
               * Returns a function to use in pseudos for input types
               * @param {String} type
               */
              function createInputPseudo(type) {
                return function (elem) {
                  var name = elem.nodeName.toLowerCase();
                  return name === "input" && elem.type === type;
                };
              }

              /**
               * Returns a function to use in pseudos for buttons
               * @param {String} type
               */
              function createButtonPseudo(type) {
                return function (elem) {
                  var name = elem.nodeName.toLowerCase();
                  return (
                    (name === "input" || name === "button") &&
                    elem.type === type
                  );
                };
              }

              /**
               * Returns a function to use in pseudos for :enabled/:disabled
               * @param {Boolean} disabled true for :disabled; false for :enabled
               */
              function createDisabledPseudo(disabled) {
                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function (elem) {
                  // Only certain elements can match :enabled or :disabled
                  // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                  // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                  if ("form" in elem) {
                    // Check for inherited disabledness on relevant non-disabled elements:
                    // * listed form-associated elements in a disabled fieldset
                    //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                    //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                    // * option elements in a disabled optgroup
                    //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                    // All such elements have a "form" property.
                    if (elem.parentNode && elem.disabled === false) {
                      // Option elements defer to a parent optgroup if present
                      if ("label" in elem) {
                        if ("label" in elem.parentNode) {
                          return elem.parentNode.disabled === disabled;
                        } else {
                          return elem.disabled === disabled;
                        }
                      }

                      // Support: IE 6 - 11
                      // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                      return (
                        elem.isDisabled === disabled ||
                        // Where there is no isDisabled, check manually
                        /* jshint -W018 */
                        (elem.isDisabled !== !disabled &&
                          disabledAncestor(elem) === disabled)
                      );
                    }

                    return elem.disabled === disabled;

                    // Try to winnow out elements that can't be disabled before trusting the disabled property.
                    // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                    // even exist on them, let alone have a boolean value.
                  } else if ("label" in elem) {
                    return elem.disabled === disabled;
                  }

                  // Remaining elements are neither :enabled nor :disabled
                  return false;
                };
              }

              /**
               * Returns a function to use in pseudos for positionals
               * @param {Function} fn
               */
              function createPositionalPseudo(fn) {
                return markFunction(function (argument) {
                  argument = +argument;
                  return markFunction(function (seed, matches) {
                    var j,
                      matchIndexes = fn([], seed.length, argument),
                      i = matchIndexes.length;

                    // Match elements found at the specified indexes
                    while (i--) {
                      if (seed[(j = matchIndexes[i])]) {
                        seed[j] = !(matches[j] = seed[j]);
                      }
                    }
                  });
                });
              }

              /**
               * Checks a node for validity as a Sizzle context
               * @param {Element|Object=} context
               * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
               */
              function testContext(context) {
                return (
                  context &&
                  typeof context.getElementsByTagName !== "undefined" &&
                  context
                );
              }

              // Expose support vars for convenience
              support = Sizzle.support = {};

              /**
               * Detects XML nodes
               * @param {Element|Object} elem An element or a document
               * @returns {Boolean} True iff elem is a non-HTML XML node
               */
              isXML = Sizzle.isXML = function (elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement =
                  elem && (elem.ownerDocument || elem).documentElement;
                return documentElement
                  ? documentElement.nodeName !== "HTML"
                  : false;
              };

              /**
               * Sets document-related variables once based on the current document
               * @param {Element|Object} [doc] An element or document object to use to set the document
               * @returns {Object} Returns the current document
               */
              setDocument = Sizzle.setDocument = function (node) {
                var hasCompare,
                  subWindow,
                  doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if (
                  doc === document ||
                  doc.nodeType !== 9 ||
                  !doc.documentElement
                ) {
                  return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if (
                  preferredDoc !== document &&
                  (subWindow = document.defaultView) &&
                  subWindow.top !== subWindow
                ) {
                  // Support: IE 11, Edge
                  if (subWindow.addEventListener) {
                    subWindow.addEventListener("unload", unloadHandler, false);

                    // Support: IE 9 - 10 only
                  } else if (subWindow.attachEvent) {
                    subWindow.attachEvent("onunload", unloadHandler);
                  }
                }

                /* Attributes
	---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function (el) {
                  el.className = "i";
                  return !el.getAttribute("className");
                });

                /* getElement(s)By*
	---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function (el) {
                  el.appendChild(document.createComment(""));
                  return !el.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test(
                  document.getElementsByClassName
                );

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function (el) {
                  docElem.appendChild(el).id = expando;
                  return (
                    !document.getElementsByName ||
                    !document.getElementsByName(expando).length
                  );
                });

                // ID filter and find
                if (support.getById) {
                  Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                      return elem.getAttribute("id") === attrId;
                    };
                  };
                  Expr.find["ID"] = function (id, context) {
                    if (
                      typeof context.getElementById !== "undefined" &&
                      documentIsHTML
                    ) {
                      var elem = context.getElementById(id);
                      return elem ? [elem] : [];
                    }
                  };
                } else {
                  Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                      var node =
                        typeof elem.getAttributeNode !== "undefined" &&
                        elem.getAttributeNode("id");
                      return node && node.value === attrId;
                    };
                  };

                  // Support: IE 6 - 7 only
                  // getElementById is not reliable as a find shortcut
                  Expr.find["ID"] = function (id, context) {
                    if (
                      typeof context.getElementById !== "undefined" &&
                      documentIsHTML
                    ) {
                      var node,
                        i,
                        elems,
                        elem = context.getElementById(id);

                      if (elem) {
                        // Verify the id attribute
                        node = elem.getAttributeNode("id");
                        if (node && node.value === id) {
                          return [elem];
                        }

                        // Fall back on getElementsByName
                        elems = context.getElementsByName(id);
                        i = 0;
                        while ((elem = elems[i++])) {
                          node = elem.getAttributeNode("id");
                          if (node && node.value === id) {
                            return [elem];
                          }
                        }
                      }

                      return [];
                    }
                  };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName
                  ? function (tag, context) {
                      if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(tag);

                        // DocumentFragment nodes don't have gEBTN
                      } else if (support.qsa) {
                        return context.querySelectorAll(tag);
                      }
                    }
                  : function (tag, context) {
                      var elem,
                        tmp = [],
                        i = 0,
                        // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                        results = context.getElementsByTagName(tag);

                      // Filter out possible comments
                      if (tag === "*") {
                        while ((elem = results[i++])) {
                          if (elem.nodeType === 1) {
                            tmp.push(elem);
                          }
                        }

                        return tmp;
                      }
                      return results;
                    };

                // Class
                Expr.find["CLASS"] =
                  support.getElementsByClassName &&
                  function (className, context) {
                    if (
                      typeof context.getElementsByClassName !== "undefined" &&
                      documentIsHTML
                    ) {
                      return context.getElementsByClassName(className);
                    }
                  };

                /* QSA/matchesSelector
	---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                  // Build QSA regex
                  // Regex strategy adopted from Diego Perini
                  assert(function (el) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explicitly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // https://bugs.jquery.com/ticket/12359
                    docElem.appendChild(el).innerHTML =
                      "<a id='" +
                      expando +
                      "'></a>" +
                      "<select id='" +
                      expando +
                      "-\r\\' msallowcapture=''>" +
                      "<option selected=''></option></select>";

                    // Support: IE8, Opera 11-12.16
                    // Nothing should be selected when empty strings follow ^= or $= or *=
                    // The test attribute must be unknown in Opera but "safe" for WinRT
                    // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                    if (el.querySelectorAll("[msallowcapture^='']").length) {
                      rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }

                    // Support: IE8
                    // Boolean attributes and "value" are not treated correctly
                    if (!el.querySelectorAll("[selected]").length) {
                      rbuggyQSA.push(
                        "\\[" + whitespace + "*(?:value|" + booleans + ")"
                      );
                    }

                    // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                    if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                      rbuggyQSA.push("~=");
                    }

                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here and will not see later tests
                    if (!el.querySelectorAll(":checked").length) {
                      rbuggyQSA.push(":checked");
                    }

                    // Support: Safari 8+, iOS 8+
                    // https://bugs.webkit.org/show_bug.cgi?id=136851
                    // In-page `selector#id sibling-combinator selector` fails
                    if (!el.querySelectorAll("a#" + expando + "+*").length) {
                      rbuggyQSA.push(".#.+[+~]");
                    }
                  });

                  assert(function (el) {
                    el.innerHTML =
                      "<a href='' disabled='disabled'></a>" +
                      "<select disabled='disabled'><option/></select>";

                    // Support: Windows 8 Native Apps
                    // The type and name attributes are restricted during .innerHTML assignment
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    el.appendChild(input).setAttribute("name", "D");

                    // Support: IE8
                    // Enforce case-sensitivity of name attribute
                    if (el.querySelectorAll("[name=d]").length) {
                      rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }

                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here and will not see later tests
                    if (el.querySelectorAll(":enabled").length !== 2) {
                      rbuggyQSA.push(":enabled", ":disabled");
                    }

                    // Support: IE9-11+
                    // IE's :disabled selector does not pick up the children of disabled fieldsets
                    docElem.appendChild(el).disabled = true;
                    if (el.querySelectorAll(":disabled").length !== 2) {
                      rbuggyQSA.push(":enabled", ":disabled");
                    }

                    // Opera 10-11 does not throw on post-comma invalid pseudos
                    el.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                  });
                }

                if (
                  (support.matchesSelector = rnative.test(
                    (matches =
                      docElem.matches ||
                      docElem.webkitMatchesSelector ||
                      docElem.mozMatchesSelector ||
                      docElem.oMatchesSelector ||
                      docElem.msMatchesSelector)
                  ))
                ) {
                  assert(function (el) {
                    // Check to see if it's possible to do matchesSelector
                    // on a disconnected node (IE 9)
                    support.disconnectedMatch = matches.call(el, "*");

                    // This should fail with an exception
                    // Gecko does not error, returns false instead
                    matches.call(el, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                  });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches =
                  rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
	---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains =
                  hasCompare || rnative.test(docElem.contains)
                    ? function (a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                          bup = b && b.parentNode;
                        return (
                          a === bup ||
                          !!(
                            bup &&
                            bup.nodeType === 1 &&
                            (adown.contains
                              ? adown.contains(bup)
                              : a.compareDocumentPosition &&
                                a.compareDocumentPosition(bup) & 16)
                          )
                        );
                      }
                    : function (a, b) {
                        if (b) {
                          while ((b = b.parentNode)) {
                            if (b === a) {
                              return true;
                            }
                          }
                        }
                        return false;
                      };

                /* Sorting
	---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare
                  ? function (a, b) {
                      // Flag for duplicate removal
                      if (a === b) {
                        hasDuplicate = true;
                        return 0;
                      }

                      // Sort on method existence if only one input has compareDocumentPosition
                      var compare =
                        !a.compareDocumentPosition - !b.compareDocumentPosition;
                      if (compare) {
                        return compare;
                      }

                      // Calculate position if both inputs belong to the same document
                      compare =
                        (a.ownerDocument || a) === (b.ownerDocument || b)
                          ? a.compareDocumentPosition(b)
                          : // Otherwise we know they are disconnected
                            1;

                      // Disconnected nodes
                      if (
                        compare & 1 ||
                        (!support.sortDetached &&
                          b.compareDocumentPosition(a) === compare)
                      ) {
                        // Choose the first element that is related to our preferred document
                        if (
                          a === document ||
                          (a.ownerDocument === preferredDoc &&
                            contains(preferredDoc, a))
                        ) {
                          return -1;
                        }
                        if (
                          b === document ||
                          (b.ownerDocument === preferredDoc &&
                            contains(preferredDoc, b))
                        ) {
                          return 1;
                        }

                        // Maintain original order
                        return sortInput
                          ? indexOf(sortInput, a) - indexOf(sortInput, b)
                          : 0;
                      }

                      return compare & 4 ? -1 : 1;
                    }
                  : function (a, b) {
                      // Exit early if the nodes are identical
                      if (a === b) {
                        hasDuplicate = true;
                        return 0;
                      }

                      var cur,
                        i = 0,
                        aup = a.parentNode,
                        bup = b.parentNode,
                        ap = [a],
                        bp = [b];

                      // Parentless nodes are either documents or disconnected
                      if (!aup || !bup) {
                        return a === document
                          ? -1
                          : b === document
                          ? 1
                          : aup
                          ? -1
                          : bup
                          ? 1
                          : sortInput
                          ? indexOf(sortInput, a) - indexOf(sortInput, b)
                          : 0;

                        // If the nodes are siblings, we can do a quick check
                      } else if (aup === bup) {
                        return siblingCheck(a, b);
                      }

                      // Otherwise we need full lists of their ancestors for comparison
                      cur = a;
                      while ((cur = cur.parentNode)) {
                        ap.unshift(cur);
                      }
                      cur = b;
                      while ((cur = cur.parentNode)) {
                        bp.unshift(cur);
                      }

                      // Walk down the tree looking for a discrepancy
                      while (ap[i] === bp[i]) {
                        i++;
                      }

                      return i
                        ? // Do a sibling check if the nodes have a common ancestor
                          siblingCheck(ap[i], bp[i])
                        : // Otherwise nodes in our document sort first
                        ap[i] === preferredDoc
                        ? -1
                        : bp[i] === preferredDoc
                        ? 1
                        : 0;
                    };

                return document;
              };

              Sizzle.matches = function (expr, elements) {
                return Sizzle(expr, null, null, elements);
              };

              Sizzle.matchesSelector = function (elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                  setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (
                  support.matchesSelector &&
                  documentIsHTML &&
                  !compilerCache[expr + " "] &&
                  (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                  (!rbuggyQSA || !rbuggyQSA.test(expr))
                ) {
                  try {
                    var ret = matches.call(elem, expr);

                    // IE 9's matchesSelector returns false on disconnected nodes
                    if (
                      ret ||
                      support.disconnectedMatch ||
                      // As well, disconnected nodes are said to be in a document
                      // fragment in IE 9
                      (elem.document && elem.document.nodeType !== 11)
                    ) {
                      return ret;
                    }
                  } catch (e) {}
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
              };

              Sizzle.contains = function (context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                  setDocument(context);
                }
                return contains(context, elem);
              };

              Sizzle.attr = function (elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                  setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                  // Don't get fooled by Object.prototype properties (jQuery #13807)
                  val =
                    fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
                      ? fn(elem, name, !documentIsHTML)
                      : undefined;

                return val !== undefined
                  ? val
                  : support.attributes || !documentIsHTML
                  ? elem.getAttribute(name)
                  : (val = elem.getAttributeNode(name)) && val.specified
                  ? val.value
                  : null;
              };

              Sizzle.escape = function (sel) {
                return (sel + "").replace(rcssescape, fcssescape);
              };

              Sizzle.error = function (msg) {
                throw new Error(
                  "Syntax error, unrecognized expression: " + msg
                );
              };

              /**
               * Document sorting and removing duplicates
               * @param {ArrayLike} results
               */
              Sizzle.uniqueSort = function (results) {
                var elem,
                  duplicates = [],
                  j = 0,
                  i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                  while ((elem = results[i++])) {
                    if (elem === results[i]) {
                      j = duplicates.push(i);
                    }
                  }
                  while (j--) {
                    results.splice(duplicates[j], 1);
                  }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
              };

              /**
               * Utility function for retrieving the text value of an array of DOM nodes
               * @param {Array|Element} elem
               */
              getText = Sizzle.getText = function (elem) {
                var node,
                  ret = "",
                  i = 0,
                  nodeType = elem.nodeType;

                if (!nodeType) {
                  // If no nodeType, this is expected to be an array
                  while ((node = elem[i++])) {
                    // Do not traverse comment nodes
                    ret += getText(node);
                  }
                } else if (
                  nodeType === 1 ||
                  nodeType === 9 ||
                  nodeType === 11
                ) {
                  // Use textContent for elements
                  // innerText usage removed for consistency of new lines (jQuery #11153)
                  if (typeof elem.textContent === "string") {
                    return elem.textContent;
                  } else {
                    // Traverse its children
                    for (
                      elem = elem.firstChild;
                      elem;
                      elem = elem.nextSibling
                    ) {
                      ret += getText(elem);
                    }
                  }
                } else if (nodeType === 3 || nodeType === 4) {
                  return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
              };

              Expr = Sizzle.selectors = {
                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                  ">": { dir: "parentNode", first: true },
                  " ": { dir: "parentNode" },
                  "+": { dir: "previousSibling", first: true },
                  "~": { dir: "previousSibling" },
                },

                preFilter: {
                  ATTR: function (match) {
                    match[1] = match[1].replace(runescape, funescape);

                    // Move the given value to match[3] whether quoted or unquoted
                    match[3] = (match[3] || match[4] || match[5] || "").replace(
                      runescape,
                      funescape
                    );

                    if (match[2] === "~=") {
                      match[3] = " " + match[3] + " ";
                    }

                    return match.slice(0, 4);
                  },

                  CHILD: function (match) {
                    /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
                    match[1] = match[1].toLowerCase();

                    if (match[1].slice(0, 3) === "nth") {
                      // nth-* requires argument
                      if (!match[3]) {
                        Sizzle.error(match[0]);
                      }

                      // numeric x and y parameters for Expr.filter.CHILD
                      // remember that false/true cast respectively to 0/1
                      match[4] = +(match[4]
                        ? match[5] + (match[6] || 1)
                        : 2 * (match[3] === "even" || match[3] === "odd"));
                      match[5] = +(match[7] + match[8] || match[3] === "odd");

                      // other types prohibit arguments
                    } else if (match[3]) {
                      Sizzle.error(match[0]);
                    }

                    return match;
                  },

                  PSEUDO: function (match) {
                    var excess,
                      unquoted = !match[6] && match[2];

                    if (matchExpr["CHILD"].test(match[0])) {
                      return null;
                    }

                    // Accept quoted arguments as-is
                    if (match[3]) {
                      match[2] = match[4] || match[5] || "";

                      // Strip excess characters from unquoted arguments
                    } else if (
                      unquoted &&
                      rpseudo.test(unquoted) &&
                      // Get excess from tokenize (recursively)
                      (excess = tokenize(unquoted, true)) &&
                      // advance to the next closing parenthesis
                      (excess =
                        unquoted.indexOf(")", unquoted.length - excess) -
                        unquoted.length)
                    ) {
                      // excess is a negative index
                      match[0] = match[0].slice(0, excess);
                      match[2] = unquoted.slice(0, excess);
                    }

                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match.slice(0, 3);
                  },
                },

                filter: {
                  TAG: function (nodeNameSelector) {
                    var nodeName = nodeNameSelector
                      .replace(runescape, funescape)
                      .toLowerCase();
                    return nodeNameSelector === "*"
                      ? function () {
                          return true;
                        }
                      : function (elem) {
                          return (
                            elem.nodeName &&
                            elem.nodeName.toLowerCase() === nodeName
                          );
                        };
                  },

                  CLASS: function (className) {
                    var pattern = classCache[className + " "];

                    return (
                      pattern ||
                      ((pattern = new RegExp(
                        "(^|" +
                          whitespace +
                          ")" +
                          className +
                          "(" +
                          whitespace +
                          "|$)"
                      )) &&
                        classCache(className, function (elem) {
                          return pattern.test(
                            (typeof elem.className === "string" &&
                              elem.className) ||
                              (typeof elem.getAttribute !== "undefined" &&
                                elem.getAttribute("class")) ||
                              ""
                          );
                        }))
                    );
                  },

                  ATTR: function (name, operator, check) {
                    return function (elem) {
                      var result = Sizzle.attr(elem, name);

                      if (result == null) {
                        return operator === "!=";
                      }
                      if (!operator) {
                        return true;
                      }

                      result += "";

                      return operator === "="
                        ? result === check
                        : operator === "!="
                        ? result !== check
                        : operator === "^="
                        ? check && result.indexOf(check) === 0
                        : operator === "*="
                        ? check && result.indexOf(check) > -1
                        : operator === "$="
                        ? check && result.slice(-check.length) === check
                        : operator === "~="
                        ? (
                            " " +
                            result.replace(rwhitespace, " ") +
                            " "
                          ).indexOf(check) > -1
                        : operator === "|="
                        ? result === check ||
                          result.slice(0, check.length + 1) === check + "-"
                        : false;
                    };
                  },

                  CHILD: function (type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                      forward = type.slice(-4) !== "last",
                      ofType = what === "of-type";

                    return first === 1 && last === 0
                      ? // Shortcut for :nth-*(n)
                        function (elem) {
                          return !!elem.parentNode;
                        }
                      : function (elem, context, xml) {
                          var cache,
                            uniqueCache,
                            outerCache,
                            node,
                            nodeIndex,
                            start,
                            dir =
                              simple !== forward
                                ? "nextSibling"
                                : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType,
                            diff = false;

                          if (parent) {
                            // :(first|last|only)-(child|of-type)
                            if (simple) {
                              while (dir) {
                                node = elem;
                                while ((node = node[dir])) {
                                  if (
                                    ofType
                                      ? node.nodeName.toLowerCase() === name
                                      : node.nodeType === 1
                                  ) {
                                    return false;
                                  }
                                }
                                // Reverse direction for :only-* (if we haven't yet done so)
                                start = dir =
                                  type === "only" && !start && "nextSibling";
                              }
                              return true;
                            }

                            start = [
                              forward ? parent.firstChild : parent.lastChild,
                            ];

                            // non-xml :nth-child(...) stores cache data on `parent`
                            if (forward && useCache) {
                              // Seek `elem` from a previously-cached index

                              // ...in a gzip-friendly way
                              node = parent;
                              outerCache =
                                node[expando] || (node[expando] = {});

                              // Support: IE <9 only
                              // Defend against cloned attroperties (jQuery gh-1709)
                              uniqueCache =
                                outerCache[node.uniqueID] ||
                                (outerCache[node.uniqueID] = {});

                              cache = uniqueCache[type] || [];
                              nodeIndex = cache[0] === dirruns && cache[1];
                              diff = nodeIndex && cache[2];
                              node = nodeIndex && parent.childNodes[nodeIndex];

                              while (
                                (node =
                                  (++nodeIndex && node && node[dir]) ||
                                  // Fallback to seeking `elem` from the start
                                  (diff = nodeIndex = 0) ||
                                  start.pop())
                              ) {
                                // When found, cache indexes on `parent` and break
                                if (
                                  node.nodeType === 1 &&
                                  ++diff &&
                                  node === elem
                                ) {
                                  uniqueCache[type] = [
                                    dirruns,
                                    nodeIndex,
                                    diff,
                                  ];
                                  break;
                                }
                              }
                            } else {
                              // Use previously-cached element index if available
                              if (useCache) {
                                // ...in a gzip-friendly way
                                node = elem;
                                outerCache =
                                  node[expando] || (node[expando] = {});

                                // Support: IE <9 only
                                // Defend against cloned attroperties (jQuery gh-1709)
                                uniqueCache =
                                  outerCache[node.uniqueID] ||
                                  (outerCache[node.uniqueID] = {});

                                cache = uniqueCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = nodeIndex;
                              }

                              // xml :nth-child(...)
                              // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                              if (diff === false) {
                                // Use the same loop as above to seek `elem` from the start
                                while (
                                  (node =
                                    (++nodeIndex && node && node[dir]) ||
                                    (diff = nodeIndex = 0) ||
                                    start.pop())
                                ) {
                                  if (
                                    (ofType
                                      ? node.nodeName.toLowerCase() === name
                                      : node.nodeType === 1) &&
                                    ++diff
                                  ) {
                                    // Cache the index of each encountered element
                                    if (useCache) {
                                      outerCache =
                                        node[expando] || (node[expando] = {});

                                      // Support: IE <9 only
                                      // Defend against cloned attroperties (jQuery gh-1709)
                                      uniqueCache =
                                        outerCache[node.uniqueID] ||
                                        (outerCache[node.uniqueID] = {});

                                      uniqueCache[type] = [dirruns, diff];
                                    }

                                    if (node === elem) {
                                      break;
                                    }
                                  }
                                }
                              }
                            }

                            // Incorporate the offset, then check against cycle size
                            diff -= last;
                            return (
                              diff === first ||
                              (diff % first === 0 && diff / first >= 0)
                            );
                          }
                        };
                  },

                  PSEUDO: function (pseudo, argument) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args,
                      fn =
                        Expr.pseudos[pseudo] ||
                        Expr.setFilters[pseudo.toLowerCase()] ||
                        Sizzle.error("unsupported pseudo: " + pseudo);

                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    if (fn[expando]) {
                      return fn(argument);
                    }

                    // But maintain support for old signatures
                    if (fn.length > 1) {
                      args = [pseudo, pseudo, "", argument];
                      return Expr.setFilters.hasOwnProperty(
                        pseudo.toLowerCase()
                      )
                        ? markFunction(function (seed, matches) {
                            var idx,
                              matched = fn(seed, argument),
                              i = matched.length;
                            while (i--) {
                              idx = indexOf(seed, matched[i]);
                              seed[idx] = !(matches[idx] = matched[i]);
                            }
                          })
                        : function (elem) {
                            return fn(elem, 0, args);
                          };
                    }

                    return fn;
                  },
                },

                pseudos: {
                  // Potentially complex pseudos
                  not: markFunction(function (selector) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [],
                      results = [],
                      matcher = compile(selector.replace(rtrim, "$1"));

                    return matcher[expando]
                      ? markFunction(function (seed, matches, context, xml) {
                          var elem,
                            unmatched = matcher(seed, null, xml, []),
                            i = seed.length;

                          // Match elements unmatched by `matcher`
                          while (i--) {
                            if ((elem = unmatched[i])) {
                              seed[i] = !(matches[i] = elem);
                            }
                          }
                        })
                      : function (elem, context, xml) {
                          input[0] = elem;
                          matcher(input, null, xml, results);
                          // Don't keep the element (issue #299)
                          input[0] = null;
                          return !results.pop();
                        };
                  }),

                  has: markFunction(function (selector) {
                    return function (elem) {
                      return Sizzle(selector, elem).length > 0;
                    };
                  }),

                  contains: markFunction(function (text) {
                    text = text.replace(runescape, funescape);
                    return function (elem) {
                      return (
                        (
                          elem.textContent ||
                          elem.innerText ||
                          getText(elem)
                        ).indexOf(text) > -1
                      );
                    };
                  }),

                  // "Whether an element is represented by a :lang() selector
                  // is based solely on the element's language value
                  // being equal to the identifier C,
                  // or beginning with the identifier C immediately followed by "-".
                  // The matching of C against the element's language value is performed case-insensitively.
                  // The identifier C does not have to be a valid language name."
                  // http://www.w3.org/TR/selectors/#lang-pseudo
                  lang: markFunction(function (lang) {
                    // lang value must be a valid identifier
                    if (!ridentifier.test(lang || "")) {
                      Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                      var elemLang;
                      do {
                        if (
                          (elemLang = documentIsHTML
                            ? elem.lang
                            : elem.getAttribute("xml:lang") ||
                              elem.getAttribute("lang"))
                        ) {
                          elemLang = elemLang.toLowerCase();
                          return (
                            elemLang === lang ||
                            elemLang.indexOf(lang + "-") === 0
                          );
                        }
                      } while ((elem = elem.parentNode) && elem.nodeType === 1);
                      return false;
                    };
                  }),

                  // Miscellaneous
                  target: function (elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                  },

                  root: function (elem) {
                    return elem === docElem;
                  },

                  focus: function (elem) {
                    return (
                      elem === document.activeElement &&
                      (!document.hasFocus || document.hasFocus()) &&
                      !!(elem.type || elem.href || ~elem.tabIndex)
                    );
                  },

                  // Boolean properties
                  enabled: createDisabledPseudo(false),
                  disabled: createDisabledPseudo(true),

                  checked: function (elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return (
                      (nodeName === "input" && !!elem.checked) ||
                      (nodeName === "option" && !!elem.selected)
                    );
                  },

                  selected: function (elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if (elem.parentNode) {
                      elem.parentNode.selectedIndex;
                    }

                    return elem.selected === true;
                  },

                  // Contents
                  empty: function (elem) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                    //   but not by others (comment: 8; processing instruction: 7; etc.)
                    // nodeType < 6 works because attributes (2) do not appear as children
                    for (
                      elem = elem.firstChild;
                      elem;
                      elem = elem.nextSibling
                    ) {
                      if (elem.nodeType < 6) {
                        return false;
                      }
                    }
                    return true;
                  },

                  parent: function (elem) {
                    return !Expr.pseudos["empty"](elem);
                  },

                  // Element/input types
                  header: function (elem) {
                    return rheader.test(elem.nodeName);
                  },

                  input: function (elem) {
                    return rinputs.test(elem.nodeName);
                  },

                  button: function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (
                      (name === "input" && elem.type === "button") ||
                      name === "button"
                    );
                  },

                  text: function (elem) {
                    var attr;
                    return (
                      elem.nodeName.toLowerCase() === "input" &&
                      elem.type === "text" &&
                      // Support: IE<8
                      // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                      ((attr = elem.getAttribute("type")) == null ||
                        attr.toLowerCase() === "text")
                    );
                  },

                  // Position-in-collection
                  first: createPositionalPseudo(function () {
                    return [0];
                  }),

                  last: createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1];
                  }),

                  eq: createPositionalPseudo(function (
                    matchIndexes,
                    length,
                    argument
                  ) {
                    return [argument < 0 ? argument + length : argument];
                  }),

                  even: createPositionalPseudo(function (matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),

                  odd: createPositionalPseudo(function (matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),

                  lt: createPositionalPseudo(function (
                    matchIndexes,
                    length,
                    argument
                  ) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0; ) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),

                  gt: createPositionalPseudo(function (
                    matchIndexes,
                    length,
                    argument
                  ) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length; ) {
                      matchIndexes.push(i);
                    }
                    return matchIndexes;
                  }),
                },
              };

              Expr.pseudos["nth"] = Expr.pseudos["eq"];

              // Add button/input type pseudos
              for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true,
              }) {
                Expr.pseudos[i] = createInputPseudo(i);
              }
              for (i in { submit: true, reset: true }) {
                Expr.pseudos[i] = createButtonPseudo(i);
              }

              // Easy API for creating new setFilters
              function setFilters() {}
              setFilters.prototype = Expr.filters = Expr.pseudos;
              Expr.setFilters = new setFilters();

              tokenize = Sizzle.tokenize = function (selector, parseOnly) {
                var matched,
                  match,
                  tokens,
                  type,
                  soFar,
                  groups,
                  preFilters,
                  cached = tokenCache[selector + " "];

                if (cached) {
                  return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {
                  // Comma and first run
                  if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                      // Don't consume trailing commas as valid
                      soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                  }

                  matched = false;

                  // Combinators
                  if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                      value: matched,
                      // Cast descendant combinators to space
                      type: match[0].replace(rtrim, " "),
                    });
                    soFar = soFar.slice(matched.length);
                  }

                  // Filters
                  for (type in Expr.filter) {
                    if (
                      (match = matchExpr[type].exec(soFar)) &&
                      (!preFilters[type] || (match = preFilters[type](match)))
                    ) {
                      matched = match.shift();
                      tokens.push({
                        value: matched,
                        type: type,
                        matches: match,
                      });
                      soFar = soFar.slice(matched.length);
                    }
                  }

                  if (!matched) {
                    break;
                  }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly
                  ? soFar.length
                  : soFar
                  ? Sizzle.error(selector)
                  : // Cache the tokens
                    tokenCache(selector, groups).slice(0);
              };

              function toSelector(tokens) {
                var i = 0,
                  len = tokens.length,
                  selector = "";
                for (; i < len; i++) {
                  selector += tokens[i].value;
                }
                return selector;
              }

              function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                  skip = combinator.next,
                  key = skip || dir,
                  checkNonElements = base && key === "parentNode",
                  doneName = done++;

                return combinator.first
                  ? // Check against closest ancestor/preceding element
                    function (elem, context, xml) {
                      while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                          return matcher(elem, context, xml);
                        }
                      }
                      return false;
                    }
                  : // Check against all ancestor/preceding elements
                    function (elem, context, xml) {
                      var oldCache,
                        uniqueCache,
                        outerCache,
                        newCache = [dirruns, doneName];

                      // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                      if (xml) {
                        while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                              return true;
                            }
                          }
                        }
                      } else {
                        while ((elem = elem[dir])) {
                          if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});

                            // Support: IE <9 only
                            // Defend against cloned attroperties (jQuery gh-1709)
                            uniqueCache =
                              outerCache[elem.uniqueID] ||
                              (outerCache[elem.uniqueID] = {});

                            if (skip && skip === elem.nodeName.toLowerCase()) {
                              elem = elem[dir] || elem;
                            } else if (
                              (oldCache = uniqueCache[key]) &&
                              oldCache[0] === dirruns &&
                              oldCache[1] === doneName
                            ) {
                              // Assign to newCache so results back-propagate to previous elements
                              return (newCache[2] = oldCache[2]);
                            } else {
                              // Reuse newcache so results back-propagate to previous elements
                              uniqueCache[key] = newCache;

                              // A match means we're done; a fail means we have to keep checking
                              if ((newCache[2] = matcher(elem, context, xml))) {
                                return true;
                              }
                            }
                          }
                        }
                      }
                      return false;
                    };
              }

              function elementMatcher(matchers) {
                return matchers.length > 1
                  ? function (elem, context, xml) {
                      var i = matchers.length;
                      while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                          return false;
                        }
                      }
                      return true;
                    }
                  : matchers[0];
              }

              function multipleContexts(selector, contexts, results) {
                var i = 0,
                  len = contexts.length;
                for (; i < len; i++) {
                  Sizzle(selector, contexts[i], results);
                }
                return results;
              }

              function condense(unmatched, map, filter, context, xml) {
                var elem,
                  newUnmatched = [],
                  i = 0,
                  len = unmatched.length,
                  mapped = map != null;

                for (; i < len; i++) {
                  if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                      newUnmatched.push(elem);
                      if (mapped) {
                        map.push(i);
                      }
                    }
                  }
                }

                return newUnmatched;
              }

              function setMatcher(
                preFilter,
                selector,
                matcher,
                postFilter,
                postFinder,
                postSelector
              ) {
                if (postFilter && !postFilter[expando]) {
                  postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                  postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function (seed, results, context, xml) {
                  var temp,
                    i,
                    elem,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    // Get initial elements from seed or context
                    elems =
                      seed ||
                      multipleContexts(
                        selector || "*",
                        context.nodeType ? [context] : context,
                        []
                      ),
                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn =
                      preFilter && (seed || !selector)
                        ? condense(elems, preMap, preFilter, context, xml)
                        : elems,
                    matcherOut = matcher
                      ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder ||
                        (seed ? preFilter : preexisting || postFilter)
                        ? // ...intermediate processing is necessary
                          []
                        : // ...otherwise use results directly
                          results
                      : matcherIn;

                  // Find primary matches
                  if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                  }

                  // Apply postFilter
                  if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);

                    // Un-match failing elements by moving them back to matcherIn
                    i = temp.length;
                    while (i--) {
                      if ((elem = temp[i])) {
                        matcherOut[postMap[i]] = !(matcherIn[postMap[i]] =
                          elem);
                      }
                    }
                  }

                  if (seed) {
                    if (postFinder || preFilter) {
                      if (postFinder) {
                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                        temp = [];
                        i = matcherOut.length;
                        while (i--) {
                          if ((elem = matcherOut[i])) {
                            // Restore matcherIn since elem is not yet a final match
                            temp.push((matcherIn[i] = elem));
                          }
                        }
                        postFinder(null, (matcherOut = []), temp, xml);
                      }

                      // Move matched elements from seed to results to keep them synchronized
                      i = matcherOut.length;
                      while (i--) {
                        if (
                          (elem = matcherOut[i]) &&
                          (temp = postFinder
                            ? indexOf(seed, elem)
                            : preMap[i]) > -1
                        ) {
                          seed[temp] = !(results[temp] = elem);
                        }
                      }
                    }

                    // Add elements to results, through postFinder if defined
                  } else {
                    matcherOut = condense(
                      matcherOut === results
                        ? matcherOut.splice(preexisting, matcherOut.length)
                        : matcherOut
                    );
                    if (postFinder) {
                      postFinder(null, results, matcherOut, xml);
                    } else {
                      push.apply(results, matcherOut);
                    }
                  }
                });
              }

              function matcherFromTokens(tokens) {
                var checkContext,
                  matcher,
                  j,
                  len = tokens.length,
                  leadingRelative = Expr.relative[tokens[0].type],
                  implicitRelative = leadingRelative || Expr.relative[" "],
                  i = leadingRelative ? 1 : 0,
                  // The foundational matcher ensures that elements are reachable from top-level context(s)
                  matchContext = addCombinator(
                    function (elem) {
                      return elem === checkContext;
                    },
                    implicitRelative,
                    true
                  ),
                  matchAnyContext = addCombinator(
                    function (elem) {
                      return indexOf(checkContext, elem) > -1;
                    },
                    implicitRelative,
                    true
                  ),
                  matchers = [
                    function (elem, context, xml) {
                      var ret =
                        (!leadingRelative &&
                          (xml || context !== outermostContext)) ||
                        ((checkContext = context).nodeType
                          ? matchContext(elem, context, xml)
                          : matchAnyContext(elem, context, xml));
                      // Avoid hanging onto element (issue #299)
                      checkContext = null;
                      return ret;
                    },
                  ];

                for (; i < len; i++) {
                  if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [
                      addCombinator(elementMatcher(matchers), matcher),
                    ];
                  } else {
                    matcher = Expr.filter[tokens[i].type].apply(
                      null,
                      tokens[i].matches
                    );

                    // Return special upon seeing a positional matcher
                    if (matcher[expando]) {
                      // Find the next relative operator (if any) for proper handling
                      j = ++i;
                      for (; j < len; j++) {
                        if (Expr.relative[tokens[j].type]) {
                          break;
                        }
                      }
                      return setMatcher(
                        i > 1 && elementMatcher(matchers),
                        i > 1 &&
                          toSelector(
                            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                            tokens.slice(0, i - 1).concat({
                              value: tokens[i - 2].type === " " ? "*" : "",
                            })
                          ).replace(rtrim, "$1"),
                        matcher,
                        i < j && matcherFromTokens(tokens.slice(i, j)),
                        j < len &&
                          matcherFromTokens((tokens = tokens.slice(j))),
                        j < len && toSelector(tokens)
                      );
                    }
                    matchers.push(matcher);
                  }
                }

                return elementMatcher(matchers);
              }

              function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                  byElement = elementMatchers.length > 0,
                  superMatcher = function (
                    seed,
                    context,
                    xml,
                    results,
                    outermost
                  ) {
                    var elem,
                      j,
                      matcher,
                      matchedCount = 0,
                      i = "0",
                      unmatched = seed && [],
                      setMatched = [],
                      contextBackup = outermostContext,
                      // We must always have either seed elements or outermost context
                      elems =
                        seed || (byElement && Expr.find["TAG"]("*", outermost)),
                      // Use integer dirruns iff this is the outermost matcher
                      dirrunsUnique = (dirruns +=
                        contextBackup == null ? 1 : Math.random() || 0.1),
                      len = elems.length;

                    if (outermost) {
                      outermostContext =
                        context === document || context || outermost;
                    }

                    // Add elements passing elementMatchers directly to results
                    // Support: IE<9, Safari
                    // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                      if (byElement && elem) {
                        j = 0;
                        if (!context && elem.ownerDocument !== document) {
                          setDocument(elem);
                          xml = !documentIsHTML;
                        }
                        while ((matcher = elementMatchers[j++])) {
                          if (matcher(elem, context || document, xml)) {
                            results.push(elem);
                            break;
                          }
                        }
                        if (outermost) {
                          dirruns = dirrunsUnique;
                        }
                      }

                      // Track unmatched elements for set filters
                      if (bySet) {
                        // They will have gone through all possible matchers
                        if ((elem = !matcher && elem)) {
                          matchedCount--;
                        }

                        // Lengthen the array for every element, matched or not
                        if (seed) {
                          unmatched.push(elem);
                        }
                      }
                    }

                    // `i` is now the count of elements visited above, and adding it to `matchedCount`
                    // makes the latter nonnegative.
                    matchedCount += i;

                    // Apply set filters to unmatched elements
                    // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                    // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                    // no element matchers and no seed.
                    // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                    // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                    // numerically zero.
                    if (bySet && i !== matchedCount) {
                      j = 0;
                      while ((matcher = setMatchers[j++])) {
                        matcher(unmatched, setMatched, context, xml);
                      }

                      if (seed) {
                        // Reintegrate element matches to eliminate the need for sorting
                        if (matchedCount > 0) {
                          while (i--) {
                            if (!(unmatched[i] || setMatched[i])) {
                              setMatched[i] = pop.call(results);
                            }
                          }
                        }

                        // Discard index placeholder values to get only actual matches
                        setMatched = condense(setMatched);
                      }

                      // Add matches to results
                      push.apply(results, setMatched);

                      // Seedless set matches succeeding multiple successful matchers stipulate sorting
                      if (
                        outermost &&
                        !seed &&
                        setMatched.length > 0 &&
                        matchedCount + setMatchers.length > 1
                      ) {
                        Sizzle.uniqueSort(results);
                      }
                    }

                    // Override manipulation of globals by nested matchers
                    if (outermost) {
                      dirruns = dirrunsUnique;
                      outermostContext = contextBackup;
                    }

                    return unmatched;
                  };

                return bySet ? markFunction(superMatcher) : superMatcher;
              }

              compile = Sizzle.compile = function (
                selector,
                match /* Internal Use Only */
              ) {
                var i,
                  setMatchers = [],
                  elementMatchers = [],
                  cached = compilerCache[selector + " "];

                if (!cached) {
                  // Generate a function of recursive functions that can be used to check each element
                  if (!match) {
                    match = tokenize(selector);
                  }
                  i = match.length;
                  while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                      setMatchers.push(cached);
                    } else {
                      elementMatchers.push(cached);
                    }
                  }

                  // Cache the compiled function
                  cached = compilerCache(
                    selector,
                    matcherFromGroupMatchers(elementMatchers, setMatchers)
                  );

                  // Save selector and tokenization
                  cached.selector = selector;
                }
                return cached;
              };

              /**
               * A low-level selection function that works with Sizzle's compiled
               *  selector functions
               * @param {String|Function} selector A selector or a pre-compiled
               *  selector function built with Sizzle.compile
               * @param {Element} context
               * @param {Array} [results]
               * @param {Array} [seed] A set of elements to match against
               */
              select = Sizzle.select = function (
                selector,
                context,
                results,
                seed
              ) {
                var i,
                  tokens,
                  token,
                  type,
                  find,
                  compiled = typeof selector === "function" && selector,
                  match =
                    !seed &&
                    tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {
                  // Reduce context if the leading compound selector is an ID
                  tokens = match[0] = match[0].slice(0);
                  if (
                    tokens.length > 2 &&
                    (token = tokens[0]).type === "ID" &&
                    context.nodeType === 9 &&
                    documentIsHTML &&
                    Expr.relative[tokens[1].type]
                  ) {
                    context = (Expr.find["ID"](
                      token.matches[0].replace(runescape, funescape),
                      context
                    ) || [])[0];
                    if (!context) {
                      return results;

                      // Precompiled matchers will still verify ancestry, so step up a level
                    } else if (compiled) {
                      context = context.parentNode;
                    }

                    selector = selector.slice(tokens.shift().value.length);
                  }

                  // Fetch a seed set for right-to-left matching
                  i = matchExpr["needsContext"].test(selector)
                    ? 0
                    : tokens.length;
                  while (i--) {
                    token = tokens[i];

                    // Abort if we hit a combinator
                    if (Expr.relative[(type = token.type)]) {
                      break;
                    }
                    if ((find = Expr.find[type])) {
                      // Search, expanding context for leading sibling combinators
                      if (
                        (seed = find(
                          token.matches[0].replace(runescape, funescape),
                          (rsibling.test(tokens[0].type) &&
                            testContext(context.parentNode)) ||
                            context
                        ))
                      ) {
                        // If seed is empty or no tokens remain, we can return early
                        tokens.splice(i, 1);
                        selector = seed.length && toSelector(tokens);
                        if (!selector) {
                          push.apply(results, seed);
                          return results;
                        }

                        break;
                      }
                    }
                  }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(
                  seed,
                  context,
                  !documentIsHTML,
                  results,
                  !context ||
                    (rsibling.test(selector) &&
                      testContext(context.parentNode)) ||
                    context
                );
                return results;
              };

              // One-time assignments

              // Sort stability
              support.sortStable =
                expando.split("").sort(sortOrder).join("") === expando;

              // Support: Chrome 14-35+
              // Always assume duplicates if they aren't passed to the comparison function
              support.detectDuplicates = !!hasDuplicate;

              // Initialize against the default document
              setDocument();

              // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
              // Detached nodes confoundingly follow *each other*
              support.sortDetached = assert(function (el) {
                // Should return 1, but returns 4 (following)
                return (
                  el.compareDocumentPosition(
                    document.createElement("fieldset")
                  ) & 1
                );
              });

              // Support: IE<8
              // Prevent attribute/property "interpolation"
              // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
              if (
                !assert(function (el) {
                  el.innerHTML = "<a href='#'></a>";
                  return el.firstChild.getAttribute("href") === "#";
                })
              ) {
                addHandle(
                  "type|href|height|width",
                  function (elem, name, isXML) {
                    if (!isXML) {
                      return elem.getAttribute(
                        name,
                        name.toLowerCase() === "type" ? 1 : 2
                      );
                    }
                  }
                );
              }

              // Support: IE<9
              // Use defaultValue in place of getAttribute("value")
              if (
                !support.attributes ||
                !assert(function (el) {
                  el.innerHTML = "<input/>";
                  el.firstChild.setAttribute("value", "");
                  return el.firstChild.getAttribute("value") === "";
                })
              ) {
                addHandle("value", function (elem, name, isXML) {
                  if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                  }
                });
              }

              // Support: IE<9
              // Use getAttributeNode to fetch booleans when getAttribute lies
              if (
                !assert(function (el) {
                  return el.getAttribute("disabled") == null;
                })
              ) {
                addHandle(booleans, function (elem, name, isXML) {
                  var val;
                  if (!isXML) {
                    return elem[name] === true
                      ? name.toLowerCase()
                      : (val = elem.getAttributeNode(name)) && val.specified
                      ? val.value
                      : null;
                  }
                });
              }

              return Sizzle;
            })(window);

          jQuery.find = Sizzle;
          jQuery.expr = Sizzle.selectors;

          // Deprecated
          jQuery.expr[":"] = jQuery.expr.pseudos;
          jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
          jQuery.text = Sizzle.getText;
          jQuery.isXMLDoc = Sizzle.isXML;
          jQuery.contains = Sizzle.contains;
          jQuery.escapeSelector = Sizzle.escape;

          var dir = function (elem, dir, until) {
            var matched = [],
              truncate = until !== undefined;

            while ((elem = elem[dir]) && elem.nodeType !== 9) {
              if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                  break;
                }
                matched.push(elem);
              }
            }
            return matched;
          };

          var siblings = function (n, elem) {
            var matched = [];

            for (; n; n = n.nextSibling) {
              if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
              }
            }

            return matched;
          };

          var rneedsContext = jQuery.expr.match.needsContext;

          function nodeName(elem, name) {
            return (
              elem.nodeName &&
              elem.nodeName.toLowerCase() === name.toLowerCase()
            );
          }
          var rsingleTag =
            /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

          var risSimple = /^.[^:#\[\.,]*$/;

          // Implement the identical functionality for filter and not
          function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
              return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
              });
            }

            // Single element
            if (qualifier.nodeType) {
              return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) !== not;
              });
            }

            // Arraylike of elements (jQuery, arguments, Array)
            if (typeof qualifier !== "string") {
              return jQuery.grep(elements, function (elem) {
                return indexOf.call(qualifier, elem) > -1 !== not;
              });
            }

            // Simple selector that can be filtered directly, removing non-Elements
            if (risSimple.test(qualifier)) {
              return jQuery.filter(qualifier, elements, not);
            }

            // Complex selector, compare the two sets, removing non-Elements
            qualifier = jQuery.filter(qualifier, elements);
            return jQuery.grep(elements, function (elem) {
              return (
                indexOf.call(qualifier, elem) > -1 !== not &&
                elem.nodeType === 1
              );
            });
          }

          jQuery.filter = function (expr, elems, not) {
            var elem = elems[0];

            if (not) {
              expr = ":not(" + expr + ")";
            }

            if (elems.length === 1 && elem.nodeType === 1) {
              return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
            }

            return jQuery.find.matches(
              expr,
              jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
              })
            );
          };

          jQuery.fn.extend({
            find: function (selector) {
              var i,
                ret,
                len = this.length,
                self = this;

              if (typeof selector !== "string") {
                return this.pushStack(
                  jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                      if (jQuery.contains(self[i], this)) {
                        return true;
                      }
                    }
                  })
                );
              }

              ret = this.pushStack([]);

              for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
              }

              return len > 1 ? jQuery.uniqueSort(ret) : ret;
            },
            filter: function (selector) {
              return this.pushStack(winnow(this, selector || [], false));
            },
            not: function (selector) {
              return this.pushStack(winnow(this, selector || [], true));
            },
            is: function (selector) {
              return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector)
                  ? jQuery(selector)
                  : selector || [],
                false
              ).length;
            },
          });

          // Initialize a jQuery object

          // A central reference to the root jQuery(document)
          var rootjQuery,
            // A simple way to check for HTML strings
            // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
            // Strict HTML recognition (#11290: must start with <)
            // Shortcut simple #id case for speed
            rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            init = (jQuery.fn.init = function (selector, context, root) {
              var match, elem;

              // HANDLE: $(""), $(null), $(undefined), $(false)
              if (!selector) {
                return this;
              }

              // Method init() accepts an alternate rootjQuery
              // so migrate can support jQuery.sub (gh-2101)
              root = root || rootjQuery;

              // Handle HTML strings
              if (typeof selector === "string") {
                if (
                  selector[0] === "<" &&
                  selector[selector.length - 1] === ">" &&
                  selector.length >= 3
                ) {
                  // Assume that strings that start and end with <> are HTML and skip the regex check
                  match = [null, selector, null];
                } else {
                  match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {
                  // HANDLE: $(html) -> $(array)
                  if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;

                    // Option to run scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    jQuery.merge(
                      this,
                      jQuery.parseHTML(
                        match[1],
                        context && context.nodeType
                          ? context.ownerDocument || context
                          : document,
                        true
                      )
                    );

                    // HANDLE: $(html, props)
                    if (
                      rsingleTag.test(match[1]) &&
                      jQuery.isPlainObject(context)
                    ) {
                      for (match in context) {
                        // Properties of context are called as methods if possible
                        if (jQuery.isFunction(this[match])) {
                          this[match](context[match]);

                          // ...and otherwise set as attributes
                        } else {
                          this.attr(match, context[match]);
                        }
                      }
                    }

                    return this;

                    // HANDLE: $(#id)
                  } else {
                    elem = document.getElementById(match[2]);

                    if (elem) {
                      // Inject the element directly into the jQuery object
                      this[0] = elem;
                      this.length = 1;
                    }
                    return this;
                  }

                  // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                  return (context || root).find(selector);

                  // HANDLE: $(expr, context)
                  // (which is just equivalent to: $(context).find(expr)
                } else {
                  return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
              } else if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
              } else if (jQuery.isFunction(selector)) {
                return root.ready !== undefined
                  ? root.ready(selector)
                  : // Execute immediately if ready is not present
                    selector(jQuery);
              }

              return jQuery.makeArray(selector, this);
            });

          // Give the init function the jQuery prototype for later instantiation
          init.prototype = jQuery.fn;

          // Initialize central reference
          rootjQuery = jQuery(document);

          var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            // Methods guaranteed to produce a unique set when starting from a unique set
            guaranteedUnique = {
              children: true,
              contents: true,
              next: true,
              prev: true,
            };

          jQuery.fn.extend({
            has: function (target) {
              var targets = jQuery(target, this),
                l = targets.length;

              return this.filter(function () {
                var i = 0;
                for (; i < l; i++) {
                  if (jQuery.contains(this, targets[i])) {
                    return true;
                  }
                }
              });
            },

            closest: function (selectors, context) {
              var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery(selectors);

              // Positional selectors never match, since there's no _selection_ context
              if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                  for (
                    cur = this[i];
                    cur && cur !== context;
                    cur = cur.parentNode
                  ) {
                    // Always skip document fragments
                    if (
                      cur.nodeType < 11 &&
                      (targets
                        ? targets.index(cur) > -1
                        : // Don't pass non-elements to Sizzle
                          cur.nodeType === 1 &&
                          jQuery.find.matchesSelector(cur, selectors))
                    ) {
                      matched.push(cur);
                      break;
                    }
                  }
                }
              }

              return this.pushStack(
                matched.length > 1 ? jQuery.uniqueSort(matched) : matched
              );
            },

            // Determine the position of an element within the set
            index: function (elem) {
              // No argument, return index in parent
              if (!elem) {
                return this[0] && this[0].parentNode
                  ? this.first().prevAll().length
                  : -1;
              }

              // Index in selector
              if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
              }

              // Locate the position of the desired element
              return indexOf.call(
                this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem
              );
            },

            add: function (selector, context) {
              return this.pushStack(
                jQuery.uniqueSort(
                  jQuery.merge(this.get(), jQuery(selector, context))
                )
              );
            },

            addBack: function (selector) {
              return this.add(
                selector == null
                  ? this.prevObject
                  : this.prevObject.filter(selector)
              );
            },
          });

          function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) {}
            return cur;
          }

          jQuery.each(
            {
              parent: function (elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
              },
              parents: function (elem) {
                return dir(elem, "parentNode");
              },
              parentsUntil: function (elem, i, until) {
                return dir(elem, "parentNode", until);
              },
              next: function (elem) {
                return sibling(elem, "nextSibling");
              },
              prev: function (elem) {
                return sibling(elem, "previousSibling");
              },
              nextAll: function (elem) {
                return dir(elem, "nextSibling");
              },
              prevAll: function (elem) {
                return dir(elem, "previousSibling");
              },
              nextUntil: function (elem, i, until) {
                return dir(elem, "nextSibling", until);
              },
              prevUntil: function (elem, i, until) {
                return dir(elem, "previousSibling", until);
              },
              siblings: function (elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
              },
              children: function (elem) {
                return siblings(elem.firstChild);
              },
              contents: function (elem) {
                if (nodeName(elem, "iframe")) {
                  return elem.contentDocument;
                }

                // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
                // Treat the template element as a regular one in browsers that
                // don't support it.
                if (nodeName(elem, "template")) {
                  elem = elem.content || elem;
                }

                return jQuery.merge([], elem.childNodes);
              },
            },
            function (name, fn) {
              jQuery.fn[name] = function (until, selector) {
                var matched = jQuery.map(this, fn, until);

                if (name.slice(-5) !== "Until") {
                  selector = until;
                }

                if (selector && typeof selector === "string") {
                  matched = jQuery.filter(selector, matched);
                }

                if (this.length > 1) {
                  // Remove duplicates
                  if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                  }

                  // Reverse order for parents* and prev-derivatives
                  if (rparentsprev.test(name)) {
                    matched.reverse();
                  }
                }

                return this.pushStack(matched);
              };
            }
          );
          var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

          // Convert String-formatted options into Object-formatted ones
          function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
              object[flag] = true;
            });
            return object;
          }

          /*
           * Create a callback list using the following parameters:
           *
           *	options: an optional list of space-separated options that will change how
           *			the callback list behaves or a more traditional option object
           *
           * By default a callback list will act like an event callback list and can be
           * "fired" multiple times.
           *
           * Possible options:
           *
           *	once:			will ensure the callback list can only be fired once (like a Deferred)
           *
           *	memory:			will keep track of previous values and will call any callback added
           *					after the list has been fired right away with the latest "memorized"
           *					values (like a Deferred)
           *
           *	unique:			will ensure a callback can only be added once (no duplicate in the list)
           *
           *	stopOnFalse:	interrupt callings when a callback returns false
           *
           */
          jQuery.Callbacks = function (options) {
            // Convert options from String-formatted to Object-formatted if needed
            // (we check in cache first)
            options =
              typeof options === "string"
                ? createOptions(options)
                : jQuery.extend({}, options);

            var // Flag to know if list is currently firing
              firing,
              // Last fire value for non-forgettable lists
              memory,
              // Flag to know if list was already fired
              fired,
              // Flag to prevent firing
              locked,
              // Actual callback list
              list = [],
              // Queue of execution data for repeatable lists
              queue = [],
              // Index of currently firing callback (modified by add/remove as needed)
              firingIndex = -1,
              // Fire callbacks
              fire = function () {
                // Enforce single-firing
                locked = locked || options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                  memory = queue.shift();
                  while (++firingIndex < list.length) {
                    // Run callback and check for early termination
                    if (
                      list[firingIndex].apply(memory[0], memory[1]) === false &&
                      options.stopOnFalse
                    ) {
                      // Jump to end and forget the data so .add doesn't re-fire
                      firingIndex = list.length;
                      memory = false;
                    }
                  }
                }

                // Forget the data if we're done with it
                if (!options.memory) {
                  memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if (locked) {
                  // Keep an empty list if we have data for future add calls
                  if (memory) {
                    list = [];

                    // Otherwise, this object is spent
                  } else {
                    list = "";
                  }
                }
              },
              // Actual Callbacks object
              self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                  if (list) {
                    // If we have memory from a past run, we should fire after adding
                    if (memory && !firing) {
                      firingIndex = list.length - 1;
                      queue.push(memory);
                    }

                    (function add(args) {
                      jQuery.each(args, function (_, arg) {
                        if (jQuery.isFunction(arg)) {
                          if (!options.unique || !self.has(arg)) {
                            list.push(arg);
                          }
                        } else if (
                          arg &&
                          arg.length &&
                          jQuery.type(arg) !== "string"
                        ) {
                          // Inspect recursively
                          add(arg);
                        }
                      });
                    })(arguments);

                    if (memory && !firing) {
                      fire();
                    }
                  }
                  return this;
                },

                // Remove a callback from the list
                remove: function () {
                  jQuery.each(arguments, function (_, arg) {
                    var index;
                    while ((index = jQuery.inArray(arg, list, index)) > -1) {
                      list.splice(index, 1);

                      // Handle firing indexes
                      if (index <= firingIndex) {
                        firingIndex--;
                      }
                    }
                  });
                  return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn) {
                  return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function () {
                  if (list) {
                    list = [];
                  }
                  return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function () {
                  locked = queue = [];
                  list = memory = "";
                  return this;
                },
                disabled: function () {
                  return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function () {
                  locked = queue = [];
                  if (!memory && !firing) {
                    list = memory = "";
                  }
                  return this;
                },
                locked: function () {
                  return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                  if (!locked) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    queue.push(args);
                    if (!firing) {
                      fire();
                    }
                  }
                  return this;
                },

                // Call all the callbacks with the given arguments
                fire: function () {
                  self.fireWith(this, arguments);
                  return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function () {
                  return !!fired;
                },
              };

            return self;
          };

          function Identity(v) {
            return v;
          }
          function Thrower(ex) {
            throw ex;
          }

          function adoptValue(value, resolve, reject, noValue) {
            var method;

            try {
              // Check for promise aspect first to privilege synchronous behavior
              if (value && jQuery.isFunction((method = value.promise))) {
                method.call(value).done(resolve).fail(reject);

                // Other thenables
              } else if (value && jQuery.isFunction((method = value.then))) {
                method.call(value, resolve, reject);

                // Other non-thenables
              } else {
                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply(undefined, [value].slice(noValue));
              }

              // For Promises/A+, convert exceptions into rejections
              // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
              // Deferred#then to conditionally suppress rejection.
            } catch (value) {
              // Support: Android 4.0 only
              // Strict mode functions invoked without .call/.apply get global-object context
              reject.apply(undefined, [value]);
            }
          }

          jQuery.extend({
            Deferred: function (func) {
              var tuples = [
                  // action, add listener, callbacks,
                  // ... .then handlers, argument index, [final state]
                  [
                    "notify",
                    "progress",
                    jQuery.Callbacks("memory"),
                    jQuery.Callbacks("memory"),
                    2,
                  ],
                  [
                    "resolve",
                    "done",
                    jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"),
                    0,
                    "resolved",
                  ],
                  [
                    "reject",
                    "fail",
                    jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"),
                    1,
                    "rejected",
                  ],
                ],
                state = "pending",
                promise = {
                  state: function () {
                    return state;
                  },
                  always: function () {
                    deferred.done(arguments).fail(arguments);
                    return this;
                  },
                  catch: function (fn) {
                    return promise.then(null, fn);
                  },

                  // Keep pipe for back-compat
                  pipe: function (/* fnDone, fnFail, fnProgress */) {
                    var fns = arguments;

                    return jQuery
                      .Deferred(function (newDefer) {
                        jQuery.each(tuples, function (i, tuple) {
                          // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                          var fn =
                            jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

                          // deferred.progress(function() { bind to newDefer or newDefer.notify })
                          // deferred.done(function() { bind to newDefer or newDefer.resolve })
                          // deferred.fail(function() { bind to newDefer or newDefer.reject })
                          deferred[tuple[1]](function () {
                            var returned = fn && fn.apply(this, arguments);
                            if (
                              returned &&
                              jQuery.isFunction(returned.promise)
                            ) {
                              returned
                                .promise()
                                .progress(newDefer.notify)
                                .done(newDefer.resolve)
                                .fail(newDefer.reject);
                            } else {
                              newDefer[tuple[0] + "With"](
                                this,
                                fn ? [returned] : arguments
                              );
                            }
                          });
                        });
                        fns = null;
                      })
                      .promise();
                  },
                  then: function (onFulfilled, onRejected, onProgress) {
                    var maxDepth = 0;
                    function resolve(depth, deferred, handler, special) {
                      return function () {
                        var that = this,
                          args = arguments,
                          mightThrow = function () {
                            var returned, then;

                            // Support: Promises/A+ section 2.3.3.3.3
                            // https://promisesaplus.com/#point-59
                            // Ignore double-resolution attempts
                            if (depth < maxDepth) {
                              return;
                            }

                            returned = handler.apply(that, args);

                            // Support: Promises/A+ section 2.3.1
                            // https://promisesaplus.com/#point-48
                            if (returned === deferred.promise()) {
                              throw new TypeError("Thenable self-resolution");
                            }

                            // Support: Promises/A+ sections 2.3.3.1, 3.5
                            // https://promisesaplus.com/#point-54
                            // https://promisesaplus.com/#point-75
                            // Retrieve `then` only once
                            then =
                              returned &&
                              // Support: Promises/A+ section 2.3.4
                              // https://promisesaplus.com/#point-64
                              // Only check objects and functions for thenability
                              (typeof returned === "object" ||
                                typeof returned === "function") &&
                              returned.then;

                            // Handle a returned thenable
                            if (jQuery.isFunction(then)) {
                              // Special processors (notify) just wait for resolution
                              if (special) {
                                then.call(
                                  returned,
                                  resolve(
                                    maxDepth,
                                    deferred,
                                    Identity,
                                    special
                                  ),
                                  resolve(maxDepth, deferred, Thrower, special)
                                );

                                // Normal processors (resolve) also hook into progress
                              } else {
                                // ...and disregard older resolution values
                                maxDepth++;

                                then.call(
                                  returned,
                                  resolve(
                                    maxDepth,
                                    deferred,
                                    Identity,
                                    special
                                  ),
                                  resolve(maxDepth, deferred, Thrower, special),
                                  resolve(
                                    maxDepth,
                                    deferred,
                                    Identity,
                                    deferred.notifyWith
                                  )
                                );
                              }

                              // Handle all other returned values
                            } else {
                              // Only substitute handlers pass on context
                              // and multiple values (non-spec behavior)
                              if (handler !== Identity) {
                                that = undefined;
                                args = [returned];
                              }

                              // Process the value(s)
                              // Default process is resolve
                              (special || deferred.resolveWith)(that, args);
                            }
                          },
                          // Only normal processors (resolve) catch and reject exceptions
                          process = special
                            ? mightThrow
                            : function () {
                                try {
                                  mightThrow();
                                } catch (e) {
                                  if (jQuery.Deferred.exceptionHook) {
                                    jQuery.Deferred.exceptionHook(
                                      e,
                                      process.stackTrace
                                    );
                                  }

                                  // Support: Promises/A+ section 2.3.3.3.4.1
                                  // https://promisesaplus.com/#point-61
                                  // Ignore post-resolution exceptions
                                  if (depth + 1 >= maxDepth) {
                                    // Only substitute handlers pass on context
                                    // and multiple values (non-spec behavior)
                                    if (handler !== Thrower) {
                                      that = undefined;
                                      args = [e];
                                    }

                                    deferred.rejectWith(that, args);
                                  }
                                }
                              };

                        // Support: Promises/A+ section 2.3.3.3.1
                        // https://promisesaplus.com/#point-57
                        // Re-resolve promises immediately to dodge false rejection from
                        // subsequent errors
                        if (depth) {
                          process();
                        } else {
                          // Call an optional hook to record the stack, in case of exception
                          // since it's otherwise lost when execution goes async
                          if (jQuery.Deferred.getStackHook) {
                            process.stackTrace = jQuery.Deferred.getStackHook();
                          }
                          window.setTimeout(process);
                        }
                      };
                    }

                    return jQuery
                      .Deferred(function (newDefer) {
                        // progress_handlers.add( ... )
                        tuples[0][3].add(
                          resolve(
                            0,
                            newDefer,
                            jQuery.isFunction(onProgress)
                              ? onProgress
                              : Identity,
                            newDefer.notifyWith
                          )
                        );

                        // fulfilled_handlers.add( ... )
                        tuples[1][3].add(
                          resolve(
                            0,
                            newDefer,
                            jQuery.isFunction(onFulfilled)
                              ? onFulfilled
                              : Identity
                          )
                        );

                        // rejected_handlers.add( ... )
                        tuples[2][3].add(
                          resolve(
                            0,
                            newDefer,
                            jQuery.isFunction(onRejected) ? onRejected : Thrower
                          )
                        );
                      })
                      .promise();
                  },

                  // Get a promise for this deferred
                  // If obj is provided, the promise aspect is added to the object
                  promise: function (obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                  },
                },
                deferred = {};

              // Add list-specific methods
              jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                  stateString = tuple[5];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                  list.add(
                    function () {
                      // state = "resolved" (i.e., fulfilled)
                      // state = "rejected"
                      state = stateString;
                    },

                    // rejected_callbacks.disable
                    // fulfilled_callbacks.disable
                    tuples[3 - i][2].disable,

                    // progress_callbacks.lock
                    tuples[0][2].lock
                  );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add(tuple[3].fire);

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[tuple[0]] = function () {
                  deferred[tuple[0] + "With"](
                    this === deferred ? undefined : this,
                    arguments
                  );
                  return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[tuple[0] + "With"] = list.fireWith;
              });

              // Make the deferred a promise
              promise.promise(deferred);

              // Call given func if any
              if (func) {
                func.call(deferred, deferred);
              }

              // All done!
              return deferred;
            },

            // Deferred helper
            when: function (singleValue) {
              var // count of uncompleted subordinates
                remaining = arguments.length,
                // count of unprocessed arguments
                i = remaining,
                // subordinate fulfillment data
                resolveContexts = Array(i),
                resolveValues = slice.call(arguments),
                // the master Deferred
                master = jQuery.Deferred(),
                // subordinate callback factory
                updateFunc = function (i) {
                  return function (value) {
                    resolveContexts[i] = this;
                    resolveValues[i] =
                      arguments.length > 1 ? slice.call(arguments) : value;
                    if (!--remaining) {
                      master.resolveWith(resolveContexts, resolveValues);
                    }
                  };
                };

              // Single- and empty arguments are adopted like Promise.resolve
              if (remaining <= 1) {
                adoptValue(
                  singleValue,
                  master.done(updateFunc(i)).resolve,
                  master.reject,
                  !remaining
                );

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if (
                  master.state() === "pending" ||
                  jQuery.isFunction(resolveValues[i] && resolveValues[i].then)
                ) {
                  return master.then();
                }
              }

              // Multiple arguments are aggregated like Promise.all array elements
              while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
              }

              return master.promise();
            },
          });

          // These usually indicate a programmer mistake during development,
          // warn about them ASAP rather than swallowing them by default.
          var rerrorNames =
            /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

          jQuery.Deferred.exceptionHook = function (error, stack) {
            // Support: IE 8 - 9 only
            // Console exists when dev tools are open, which can happen at any time
            if (
              window.console &&
              window.console.warn &&
              error &&
              rerrorNames.test(error.name)
            ) {
              window.console.warn(
                "jQuery.Deferred exception: " + error.message,
                error.stack,
                stack
              );
            }
          };

          jQuery.readyException = function (error) {
            window.setTimeout(function () {
              throw error;
            });
          };

          // The deferred used on DOM ready
          var readyList = jQuery.Deferred();

          jQuery.fn.ready = function (fn) {
            readyList
              .then(fn)

              // Wrap jQuery.readyException in a function so that the lookup
              // happens at the time of error handling instead of callback
              // registration.
              .catch(function (error) {
                jQuery.readyException(error);
              });

            return this;
          };

          jQuery.extend({
            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,

            // A counter to track how many items to wait for before
            // the ready event fires. See #6781
            readyWait: 1,

            // Handle when the DOM is ready
            ready: function (wait) {
              // Abort if there are pending holds or we're already ready
              if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
              }

              // Remember that the DOM is ready
              jQuery.isReady = true;

              // If a normal DOM Ready event fired, decrement, and wait if need be
              if (wait !== true && --jQuery.readyWait > 0) {
                return;
              }

              // If there are functions bound, to execute
              readyList.resolveWith(document, [jQuery]);
            },
          });

          jQuery.ready.then = readyList.then;

          // The ready event handler and self cleanup method
          function completed() {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            jQuery.ready();
          }

          // Catch cases where $(document).ready() is called
          // after the browser event has already occurred.
          // Support: IE <=9 - 10 only
          // Older IE sometimes signals "interactive" too soon
          if (
            document.readyState === "complete" ||
            (document.readyState !== "loading" &&
              !document.documentElement.doScroll)
          ) {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            window.setTimeout(jQuery.ready);
          } else {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", completed);

            // A fallback to window.onload, that will always work
            window.addEventListener("load", completed);
          }

          // Multifunctional method to get and set values of a collection
          // The value/s can optionally be executed if it's a function
          var access = function (
            elems,
            fn,
            key,
            value,
            chainable,
            emptyGet,
            raw
          ) {
            var i = 0,
              len = elems.length,
              bulk = key == null;

            // Sets many values
            if (jQuery.type(key) === "object") {
              chainable = true;
              for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
              }

              // Sets one value
            } else if (value !== undefined) {
              chainable = true;

              if (!jQuery.isFunction(value)) {
                raw = true;
              }

              if (bulk) {
                // Bulk operations run against the entire set
                if (raw) {
                  fn.call(elems, value);
                  fn = null;

                  // ...except when executing function values
                } else {
                  bulk = fn;
                  fn = function (elem, key, value) {
                    return bulk.call(jQuery(elem), value);
                  };
                }
              }

              if (fn) {
                for (; i < len; i++) {
                  fn(
                    elems[i],
                    key,
                    raw ? value : value.call(elems[i], i, fn(elems[i], key))
                  );
                }
              }
            }

            if (chainable) {
              return elems;
            }

            // Gets
            if (bulk) {
              return fn.call(elems);
            }

            return len ? fn(elems[0], key) : emptyGet;
          };
          var acceptData = function (owner) {
            // Accepts only:
            //  - Node
            //    - Node.ELEMENT_NODE
            //    - Node.DOCUMENT_NODE
            //  - Object
            //    - Any
            return (
              owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType
            );
          };

          function Data() {
            this.expando = jQuery.expando + Data.uid++;
          }

          Data.uid = 1;

          Data.prototype = {
            cache: function (owner) {
              // Check if the owner object already has a cache
              var value = owner[this.expando];

              // If not, create one
              if (!value) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if (acceptData(owner)) {
                  // If it is a node unlikely to be stringify-ed or looped over
                  // use plain assignment
                  if (owner.nodeType) {
                    owner[this.expando] = value;

                    // Otherwise secure it in a non-enumerable property
                    // configurable must be true to allow the property to be
                    // deleted when data is removed
                  } else {
                    Object.defineProperty(owner, this.expando, {
                      value: value,
                      configurable: true,
                    });
                  }
                }
              }

              return value;
            },
            set: function (owner, data, value) {
              var prop,
                cache = this.cache(owner);

              // Handle: [ owner, key, value ] args
              // Always use camelCase key (gh-2257)
              if (typeof data === "string") {
                cache[jQuery.camelCase(data)] = value;

                // Handle: [ owner, { properties } ] args
              } else {
                // Copy the properties one-by-one to the cache object
                for (prop in data) {
                  cache[jQuery.camelCase(prop)] = data[prop];
                }
              }
              return cache;
            },
            get: function (owner, key) {
              return key === undefined
                ? this.cache(owner)
                : // Always use camelCase key (gh-2257)
                  owner[this.expando] &&
                    owner[this.expando][jQuery.camelCase(key)];
            },
            access: function (owner, key, value) {
              // In cases where either:
              //
              //   1. No key was specified
              //   2. A string key was specified, but no value provided
              //
              // Take the "read" path and allow the get method to determine
              // which value to return, respectively either:
              //
              //   1. The entire cache object
              //   2. The data stored at the key
              //
              if (
                key === undefined ||
                (key && typeof key === "string" && value === undefined)
              ) {
                return this.get(owner, key);
              }

              // When the key is not a string, or both a key and value
              // are specified, set or extend (existing objects) with either:
              //
              //   1. An object of properties
              //   2. A key and value
              //
              this.set(owner, key, value);

              // Since the "set" path can have two possible entry points
              // return the expected data based on which path was taken[*]
              return value !== undefined ? value : key;
            },
            remove: function (owner, key) {
              var i,
                cache = owner[this.expando];

              if (cache === undefined) {
                return;
              }

              if (key !== undefined) {
                // Support array or space separated string of keys
                if (Array.isArray(key)) {
                  // If key is an array of keys...
                  // We always set camelCase keys, so remove that.
                  key = key.map(jQuery.camelCase);
                } else {
                  key = jQuery.camelCase(key);

                  // If a key with the spaces exists, use it.
                  // Otherwise, create an array by matching non-whitespace
                  key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
                }

                i = key.length;

                while (i--) {
                  delete cache[key[i]];
                }
              }

              // Remove the expando if there's no more data
              if (key === undefined || jQuery.isEmptyObject(cache)) {
                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if (owner.nodeType) {
                  owner[this.expando] = undefined;
                } else {
                  delete owner[this.expando];
                }
              }
            },
            hasData: function (owner) {
              var cache = owner[this.expando];
              return cache !== undefined && !jQuery.isEmptyObject(cache);
            },
          };
          var dataPriv = new Data();

          var dataUser = new Data();

          //	Implementation Summary
          //
          //	1. Enforce API surface and semantic compatibility with 1.9.x branch
          //	2. Improve the module's maintainability by reducing the storage
          //		paths to a single mechanism.
          //	3. Use the same single mechanism to support "private" and "user" data.
          //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
          //	5. Avoid exposing implementation details on user objects (eg. expando properties)
          //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

          var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /[A-Z]/g;

          function getData(data) {
            if (data === "true") {
              return true;
            }

            if (data === "false") {
              return false;
            }

            if (data === "null") {
              return null;
            }

            // Only convert to a number if it doesn't change the string
            if (data === +data + "") {
              return +data;
            }

            if (rbrace.test(data)) {
              return JSON.parse(data);
            }

            return data;
          }

          function dataAttr(elem, key, data) {
            var name;

            // If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            if (data === undefined && elem.nodeType === 1) {
              name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
              data = elem.getAttribute(name);

              if (typeof data === "string") {
                try {
                  data = getData(data);
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                dataUser.set(elem, key, data);
              } else {
                data = undefined;
              }
            }
            return data;
          }

          jQuery.extend({
            hasData: function (elem) {
              return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },

            data: function (elem, name, data) {
              return dataUser.access(elem, name, data);
            },

            removeData: function (elem, name) {
              dataUser.remove(elem, name);
            },

            // TODO: Now that all calls to _data and _removeData have been replaced
            // with direct calls to dataPriv methods, these can be deprecated.
            _data: function (elem, name, data) {
              return dataPriv.access(elem, name, data);
            },

            _removeData: function (elem, name) {
              dataPriv.remove(elem, name);
            },
          });

          jQuery.fn.extend({
            data: function (key, value) {
              var i,
                name,
                data,
                elem = this[0],
                attrs = elem && elem.attributes;

              // Gets all values
              if (key === undefined) {
                if (this.length) {
                  data = dataUser.get(elem);

                  if (
                    elem.nodeType === 1 &&
                    !dataPriv.get(elem, "hasDataAttrs")
                  ) {
                    i = attrs.length;
                    while (i--) {
                      // Support: IE 11 only
                      // The attrs elements can be null (#14894)
                      if (attrs[i]) {
                        name = attrs[i].name;
                        if (name.indexOf("data-") === 0) {
                          name = jQuery.camelCase(name.slice(5));
                          dataAttr(elem, name, data[name]);
                        }
                      }
                    }
                    dataPriv.set(elem, "hasDataAttrs", true);
                  }
                }

                return data;
              }

              // Sets multiple values
              if (typeof key === "object") {
                return this.each(function () {
                  dataUser.set(this, key);
                });
              }

              return access(
                this,
                function (value) {
                  var data;

                  // The calling jQuery object (element matches) is not empty
                  // (and therefore has an element appears at this[ 0 ]) and the
                  // `value` parameter was not undefined. An empty jQuery object
                  // will result in `undefined` for elem = this[ 0 ] which will
                  // throw an exception if an attempt to read a data cache is made.
                  if (elem && value === undefined) {
                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                      return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                      return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                  }

                  // Set the data...
                  this.each(function () {
                    // We always store the camelCased key
                    dataUser.set(this, key, value);
                  });
                },
                null,
                value,
                arguments.length > 1,
                null,
                true
              );
            },

            removeData: function (key) {
              return this.each(function () {
                dataUser.remove(this, key);
              });
            },
          });

          jQuery.extend({
            queue: function (elem, type, data) {
              var queue;

              if (elem) {
                type = (type || "fx") + "queue";
                queue = dataPriv.get(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                  if (!queue || Array.isArray(data)) {
                    queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                  } else {
                    queue.push(data);
                  }
                }
                return queue || [];
              }
            },

            dequeue: function (elem, type) {
              type = type || "fx";

              var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                  jQuery.dequeue(elem, type);
                };

              // If the fx queue is dequeued, always remove the progress sentinel
              if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
              }

              if (fn) {
                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                  queue.unshift("inprogress");
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
              }

              if (!startLength && hooks) {
                hooks.empty.fire();
              }
            },

            // Not public - generate a queueHooks object, or return the current one
            _queueHooks: function (elem, type) {
              var key = type + "queueHooks";
              return (
                dataPriv.get(elem, key) ||
                dataPriv.access(elem, key, {
                  empty: jQuery.Callbacks("once memory").add(function () {
                    dataPriv.remove(elem, [type + "queue", key]);
                  }),
                })
              );
            },
          });

          jQuery.fn.extend({
            queue: function (type, data) {
              var setter = 2;

              if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
              }

              if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
              }

              return data === undefined
                ? this
                : this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // Ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                      jQuery.dequeue(this, type);
                    }
                  });
            },
            dequeue: function (type) {
              return this.each(function () {
                jQuery.dequeue(this, type);
              });
            },
            clearQueue: function (type) {
              return this.queue(type || "fx", []);
            },

            // Get a promise resolved when queues of a certain type
            // are emptied (fx is the type by default)
            promise: function (type, obj) {
              var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                  if (!--count) {
                    defer.resolveWith(elements, [elements]);
                  }
                };

              if (typeof type !== "string") {
                obj = type;
                type = undefined;
              }
              type = type || "fx";

              while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                  count++;
                  tmp.empty.add(resolve);
                }
              }
              resolve();
              return defer.promise(obj);
            },
          });
          var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

          var rcssNum = new RegExp(
            "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$",
            "i"
          );

          var cssExpand = ["Top", "Right", "Bottom", "Left"];

          var isHiddenWithinTree = function (elem, el) {
            // isHiddenWithinTree might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;

            // Inline style trumps all
            return (
              elem.style.display === "none" ||
              (elem.style.display === "" &&
                // Otherwise, check computed style
                // Support: Firefox <=43 - 45
                // Disconnected elements can have computed display: none, so first confirm that elem is
                // in the document.
                jQuery.contains(elem.ownerDocument, elem) &&
                jQuery.css(elem, "display") === "none")
            );
          };

          var swap = function (elem, options, callback, args) {
            var ret,
              name,
              old = {};

            // Remember the old values, and insert the new ones
            for (name in options) {
              old[name] = elem.style[name];
              elem.style[name] = options[name];
            }

            ret = callback.apply(elem, args || []);

            // Revert the old values
            for (name in options) {
              elem.style[name] = old[name];
            }

            return ret;
          };

          function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted,
              scale = 1,
              maxIterations = 20,
              currentValue = tween
                ? function () {
                    return tween.cur();
                  }
                : function () {
                    return jQuery.css(elem, prop, "");
                  },
              initial = currentValue(),
              unit =
                (valueParts && valueParts[3]) ||
                (jQuery.cssNumber[prop] ? "" : "px"),
              // Starting value computation is required for potential unit mismatches
              initialInUnit =
                (jQuery.cssNumber[prop] || (unit !== "px" && +initial)) &&
                rcssNum.exec(jQuery.css(elem, prop));

            if (initialInUnit && initialInUnit[3] !== unit) {
              // Trust units reported by jQuery.css
              unit = unit || initialInUnit[3];

              // Make sure we update the tween properties later on
              valueParts = valueParts || [];

              // Iteratively approximate from a nonzero starting point
              initialInUnit = +initial || 1;

              do {
                // If previous iteration zeroed out, double until we get *something*.
                // Use string for doubling so we don't accidentally see scale as unchanged below
                scale = scale || ".5";

                // Adjust and apply
                initialInUnit = initialInUnit / scale;
                jQuery.style(elem, prop, initialInUnit + unit);

                // Update scale, tolerating zero or NaN from tween.cur()
                // Break the loop if scale is unchanged or perfect, or if we've just had enough.
              } while (
                scale !== (scale = currentValue() / initial) &&
                scale !== 1 &&
                --maxIterations
              );
            }

            if (valueParts) {
              initialInUnit = +initialInUnit || +initial || 0;

              // Apply relative offset (+=/-=) if specified
              adjusted = valueParts[1]
                ? initialInUnit + (valueParts[1] + 1) * valueParts[2]
                : +valueParts[2];
              if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
              }
            }
            return adjusted;
          }

          var defaultDisplayMap = {};

          function getDefaultDisplay(elem) {
            var temp,
              doc = elem.ownerDocument,
              nodeName = elem.nodeName,
              display = defaultDisplayMap[nodeName];

            if (display) {
              return display;
            }

            temp = doc.body.appendChild(doc.createElement(nodeName));
            display = jQuery.css(temp, "display");

            temp.parentNode.removeChild(temp);

            if (display === "none") {
              display = "block";
            }
            defaultDisplayMap[nodeName] = display;

            return display;
          }

          function showHide(elements, show) {
            var display,
              elem,
              values = [],
              index = 0,
              length = elements.length;

            // Determine new display value for elements that need to change
            for (; index < length; index++) {
              elem = elements[index];
              if (!elem.style) {
                continue;
              }

              display = elem.style.display;
              if (show) {
                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if (display === "none") {
                  values[index] = dataPriv.get(elem, "display") || null;
                  if (!values[index]) {
                    elem.style.display = "";
                  }
                }
                if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                  values[index] = getDefaultDisplay(elem);
                }
              } else {
                if (display !== "none") {
                  values[index] = "none";

                  // Remember what we're overwriting
                  dataPriv.set(elem, "display", display);
                }
              }
            }

            // Set the display of the elements in a second loop to avoid constant reflow
            for (index = 0; index < length; index++) {
              if (values[index] != null) {
                elements[index].style.display = values[index];
              }
            }

            return elements;
          }

          jQuery.fn.extend({
            show: function () {
              return showHide(this, true);
            },
            hide: function () {
              return showHide(this);
            },
            toggle: function (state) {
              if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
              }

              return this.each(function () {
                if (isHiddenWithinTree(this)) {
                  jQuery(this).show();
                } else {
                  jQuery(this).hide();
                }
              });
            },
          });
          var rcheckableType = /^(?:checkbox|radio)$/i;

          var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

          var rscriptType = /^$|\/(?:java|ecma)script/i;

          // We have to close these tags to support XHTML (#13200)
          var wrapMap = {
            // Support: IE <=9 only
            option: [1, "<select multiple='multiple'>", "</select>"],

            // XHTML parsers do not magically insert elements in the
            // same way that tag soup parsers do. So we cannot shorten
            // this by omitting <tbody> or other required elements.
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

            _default: [0, "", ""],
          };

          // Support: IE <=9 only
          wrapMap.optgroup = wrapMap.option;

          wrapMap.tbody =
            wrapMap.tfoot =
            wrapMap.colgroup =
            wrapMap.caption =
              wrapMap.thead;
          wrapMap.th = wrapMap.td;

          function getAll(context, tag) {
            // Support: IE <=9 - 11 only
            // Use typeof to avoid zero-argument method invocation on host objects (#15151)
            var ret;

            if (typeof context.getElementsByTagName !== "undefined") {
              ret = context.getElementsByTagName(tag || "*");
            } else if (typeof context.querySelectorAll !== "undefined") {
              ret = context.querySelectorAll(tag || "*");
            } else {
              ret = [];
            }

            if (tag === undefined || (tag && nodeName(context, tag))) {
              return jQuery.merge([context], ret);
            }

            return ret;
          }

          // Mark scripts as having already been evaluated
          function setGlobalEval(elems, refElements) {
            var i = 0,
              l = elems.length;

            for (; i < l; i++) {
              dataPriv.set(
                elems[i],
                "globalEval",
                !refElements || dataPriv.get(refElements[i], "globalEval")
              );
            }
          }

          var rhtml = /<|&#?\w+;/;

          function buildFragment(elems, context, scripts, selection, ignored) {
            var elem,
              tmp,
              tag,
              wrap,
              contains,
              j,
              fragment = context.createDocumentFragment(),
              nodes = [],
              i = 0,
              l = elems.length;

            for (; i < l; i++) {
              elem = elems[i];

              if (elem || elem === 0) {
                // Add nodes directly
                if (jQuery.type(elem) === "object") {
                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // push.apply(_, arraylike) throws on ancient WebKit
                  jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                  // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                  nodes.push(context.createTextNode(elem));

                  // Convert html into DOM nodes
                } else {
                  tmp =
                    tmp || fragment.appendChild(context.createElement("div"));

                  // Deserialize a standard representation
                  tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                  wrap = wrapMap[tag] || wrapMap._default;
                  tmp.innerHTML =
                    wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                  // Descend through wrappers to the right content
                  j = wrap[0];
                  while (j--) {
                    tmp = tmp.lastChild;
                  }

                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // push.apply(_, arraylike) throws on ancient WebKit
                  jQuery.merge(nodes, tmp.childNodes);

                  // Remember the top-level container
                  tmp = fragment.firstChild;

                  // Ensure the created nodes are orphaned (#12392)
                  tmp.textContent = "";
                }
              }
            }

            // Remove wrapper from fragment
            fragment.textContent = "";

            i = 0;
            while ((elem = nodes[i++])) {
              // Skip elements already in the context collection (trac-4087)
              if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                  ignored.push(elem);
                }
                continue;
              }

              contains = jQuery.contains(elem.ownerDocument, elem);

              // Append to fragment
              tmp = getAll(fragment.appendChild(elem), "script");

              // Preserve script evaluation history
              if (contains) {
                setGlobalEval(tmp);
              }

              // Capture executables
              if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                  if (rscriptType.test(elem.type || "")) {
                    scripts.push(elem);
                  }
                }
              }
            }

            return fragment;
          }

          (function () {
            var fragment = document.createDocumentFragment(),
              div = fragment.appendChild(document.createElement("div")),
              input = document.createElement("input");

            // Support: Android 4.0 - 4.3 only
            // Check state lost if the name is set (#11217)
            // Support: Windows Web Apps (WWA)
            // `name` and `type` must use .setAttribute for WWA (#14901)
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");

            div.appendChild(input);

            // Support: Android <=4.1 only
            // Older WebKit doesn't clone checked state correctly in fragments
            support.checkClone = div
              .cloneNode(true)
              .cloneNode(true).lastChild.checked;

            // Support: IE <=11 only
            // Make sure textarea (and checkbox) defaultValue is properly cloned
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked =
              !!div.cloneNode(true).lastChild.defaultValue;
          })();
          var documentElement = document.documentElement;

          var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

          function returnTrue() {
            return true;
          }

          function returnFalse() {
            return false;
          }

          // Support: IE <=9 only
          // See #13393 for more info
          function safeActiveElement() {
            try {
              return document.activeElement;
            } catch (err) {}
          }

          function on(elem, types, selector, data, fn, one) {
            var origFn, type;

            // Types can be a map of types/handlers
            if (typeof types === "object") {
              // ( types-Object, selector, data )
              if (typeof selector !== "string") {
                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
              }
              for (type in types) {
                on(elem, type, selector, data, types[type], one);
              }
              return elem;
            }

            if (data == null && fn == null) {
              // ( types, fn )
              fn = selector;
              data = selector = undefined;
            } else if (fn == null) {
              if (typeof selector === "string") {
                // ( types, selector, fn )
                fn = data;
                data = undefined;
              } else {
                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
              }
            }
            if (fn === false) {
              fn = returnFalse;
            } else if (!fn) {
              return elem;
            }

            if (one === 1) {
              origFn = fn;
              fn = function (event) {
                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);
              };

              // Use same guid so caller can remove using origFn
              fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return elem.each(function () {
              jQuery.event.add(this, types, fn, data, selector);
            });
          }

          /*
           * Helper functions for managing events -- not part of the public interface.
           * Props to Dean Edwards' addEvent library for many of the ideas.
           */
          jQuery.event = {
            global: {},

            add: function (elem, types, handler, data, selector) {
              var handleObjIn,
                eventHandle,
                tmp,
                events,
                t,
                handleObj,
                special,
                handlers,
                type,
                namespaces,
                origType,
                elemData = dataPriv.get(elem);

              // Don't attach events to noData or text/comment nodes (but allow plain objects)
              if (!elemData) {
                return;
              }

              // Caller can pass in an object of custom data in lieu of the handler
              if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
              }

              // Ensure that invalid selectors throw exceptions at attach time
              // Evaluate against documentElement in case elem is a non-element node (e.g., document)
              if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
              }

              // Make sure that the handler has a unique ID, used to find/remove it later
              if (!handler.guid) {
                handler.guid = jQuery.guid++;
              }

              // Init the element's event structure and main handler, if this is the first
              if (!(events = elemData.events)) {
                events = elemData.events = {};
              }
              if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                  // Discard the second event of a jQuery.event.trigger() and
                  // when an event is called after a page has unloaded
                  return typeof jQuery !== "undefined" &&
                    jQuery.event.triggered !== e.type
                    ? jQuery.event.dispatch.apply(elem, arguments)
                    : undefined;
                };
              }

              // Handle multiple events separated by a space
              types = (types || "").match(rnothtmlwhite) || [""];
              t = types.length;
              while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                  continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type =
                  (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend(
                  {
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext:
                      selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join("."),
                  },
                  handleObjIn
                );

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                  handlers = events[type] = [];
                  handlers.delegateCount = 0;

                  // Only use addEventListener if the special events handler returns false
                  if (
                    !special.setup ||
                    special.setup.call(elem, data, namespaces, eventHandle) ===
                      false
                  ) {
                    if (elem.addEventListener) {
                      elem.addEventListener(type, eventHandle);
                    }
                  }
                }

                if (special.add) {
                  special.add.call(elem, handleObj);

                  if (!handleObj.handler.guid) {
                    handleObj.handler.guid = handler.guid;
                  }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                  handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                  handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
              }
            },

            // Detach an event or set of events from an element
            remove: function (elem, types, handler, selector, mappedTypes) {
              var j,
                origCount,
                tmp,
                events,
                t,
                handleObj,
                special,
                handlers,
                type,
                namespaces,
                origType,
                elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

              if (!elemData || !(events = elemData.events)) {
                return;
              }

              // Once for each type.namespace in types; type may be omitted
              types = (types || "").match(rnothtmlwhite) || [""];
              t = types.length;
              while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                  for (type in events) {
                    jQuery.event.remove(
                      elem,
                      type + types[t],
                      handler,
                      selector,
                      true
                    );
                  }
                  continue;
                }

                special = jQuery.event.special[type] || {};
                type =
                  (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp =
                  tmp[2] &&
                  new RegExp(
                    "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"
                  );

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                  handleObj = handlers[j];

                  if (
                    (mappedTypes || origType === handleObj.origType) &&
                    (!handler || handler.guid === handleObj.guid) &&
                    (!tmp || tmp.test(handleObj.namespace)) &&
                    (!selector ||
                      selector === handleObj.selector ||
                      (selector === "**" && handleObj.selector))
                  ) {
                    handlers.splice(j, 1);

                    if (handleObj.selector) {
                      handlers.delegateCount--;
                    }
                    if (special.remove) {
                      special.remove.call(elem, handleObj);
                    }
                  }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                  if (
                    !special.teardown ||
                    special.teardown.call(elem, namespaces, elemData.handle) ===
                      false
                  ) {
                    jQuery.removeEvent(elem, type, elemData.handle);
                  }

                  delete events[type];
                }
              }

              // Remove data and the expando if it's no longer used
              if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
              }
            },

            dispatch: function (nativeEvent) {
              // Make a writable jQuery.Event from the native event object
              var event = jQuery.event.fix(nativeEvent);

              var i,
                j,
                ret,
                matched,
                handleObj,
                handlerQueue,
                args = new Array(arguments.length),
                handlers =
                  (dataPriv.get(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};

              // Use the fix-ed jQuery.Event rather than the (read-only) native event
              args[0] = event;

              for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
              }

              event.delegateTarget = this;

              // Call the preDispatch hook for the mapped type, and let it bail if desired
              if (
                special.preDispatch &&
                special.preDispatch.call(this, event) === false
              ) {
                return;
              }

              // Determine handlers
              handlerQueue = jQuery.event.handlers.call(this, event, handlers);

              // Run delegates first; they may want to stop propagation beneath us
              i = 0;
              while (
                (matched = handlerQueue[i++]) &&
                !event.isPropagationStopped()
              ) {
                event.currentTarget = matched.elem;

                j = 0;
                while (
                  (handleObj = matched.handlers[j++]) &&
                  !event.isImmediatePropagationStopped()
                ) {
                  // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                  // a subset or equal to those in the bound event (both can have no namespace).
                  if (
                    !event.rnamespace ||
                    event.rnamespace.test(handleObj.namespace)
                  ) {
                    event.handleObj = handleObj;
                    event.data = handleObj.data;

                    ret = (
                      (jQuery.event.special[handleObj.origType] || {}).handle ||
                      handleObj.handler
                    ).apply(matched.elem, args);

                    if (ret !== undefined) {
                      if ((event.result = ret) === false) {
                        event.preventDefault();
                        event.stopPropagation();
                      }
                    }
                  }
                }
              }

              // Call the postDispatch hook for the mapped type
              if (special.postDispatch) {
                special.postDispatch.call(this, event);
              }

              return event.result;
            },

            handlers: function (event, handlers) {
              var i,
                handleObj,
                sel,
                matchedHandlers,
                matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

              // Find delegate handlers
              if (
                delegateCount &&
                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&
                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !(event.type === "click" && event.button >= 1)
              ) {
                for (; cur !== this; cur = cur.parentNode || this) {
                  // Don't check non-elements (#13208)
                  // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                  if (
                    cur.nodeType === 1 &&
                    !(event.type === "click" && cur.disabled === true)
                  ) {
                    matchedHandlers = [];
                    matchedSelectors = {};
                    for (i = 0; i < delegateCount; i++) {
                      handleObj = handlers[i];

                      // Don't conflict with Object.prototype properties (#13203)
                      sel = handleObj.selector + " ";

                      if (matchedSelectors[sel] === undefined) {
                        matchedSelectors[sel] = handleObj.needsContext
                          ? jQuery(sel, this).index(cur) > -1
                          : jQuery.find(sel, this, null, [cur]).length;
                      }
                      if (matchedSelectors[sel]) {
                        matchedHandlers.push(handleObj);
                      }
                    }
                    if (matchedHandlers.length) {
                      handlerQueue.push({
                        elem: cur,
                        handlers: matchedHandlers,
                      });
                    }
                  }
                }
              }

              // Add the remaining (directly-bound) handlers
              cur = this;
              if (delegateCount < handlers.length) {
                handlerQueue.push({
                  elem: cur,
                  handlers: handlers.slice(delegateCount),
                });
              }

              return handlerQueue;
            },

            addProp: function (name, hook) {
              Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: jQuery.isFunction(hook)
                  ? function () {
                      if (this.originalEvent) {
                        return hook(this.originalEvent);
                      }
                    }
                  : function () {
                      if (this.originalEvent) {
                        return this.originalEvent[name];
                      }
                    },

                set: function (value) {
                  Object.defineProperty(this, name, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: value,
                  });
                },
              });
            },

            fix: function (originalEvent) {
              return originalEvent[jQuery.expando]
                ? originalEvent
                : new jQuery.Event(originalEvent);
            },

            special: {
              load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true,
              },
              focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                  if (this !== safeActiveElement() && this.focus) {
                    this.focus();
                    return false;
                  }
                },
                delegateType: "focusin",
              },
              blur: {
                trigger: function () {
                  if (this === safeActiveElement() && this.blur) {
                    this.blur();
                    return false;
                  }
                },
                delegateType: "focusout",
              },
              click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                  if (
                    this.type === "checkbox" &&
                    this.click &&
                    nodeName(this, "input")
                  ) {
                    this.click();
                    return false;
                  }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event) {
                  return nodeName(event.target, "a");
                },
              },

              beforeunload: {
                postDispatch: function (event) {
                  // Support: Firefox 20+
                  // Firefox doesn't alert if the returnValue field is not set.
                  if (event.result !== undefined && event.originalEvent) {
                    event.originalEvent.returnValue = event.result;
                  }
                },
              },
            },
          };

          jQuery.removeEvent = function (elem, type, handle) {
            // This "if" is needed for plain objects
            if (elem.removeEventListener) {
              elem.removeEventListener(type, handle);
            }
          };

          jQuery.Event = function (src, props) {
            // Allow instantiation without the 'new' keyword
            if (!(this instanceof jQuery.Event)) {
              return new jQuery.Event(src, props);
            }

            // Event object
            if (src && src.type) {
              this.originalEvent = src;
              this.type = src.type;

              // Events bubbling up the document may have been marked as prevented
              // by a handler lower down the tree; reflect the correct value.
              this.isDefaultPrevented =
                src.defaultPrevented ||
                (src.defaultPrevented === undefined &&
                  // Support: Android <=2.3 only
                  src.returnValue === false)
                  ? returnTrue
                  : returnFalse;

              // Create target properties
              // Support: Safari <=6 - 7 only
              // Target should not be a text node (#504, #13143)
              this.target =
                src.target && src.target.nodeType === 3
                  ? src.target.parentNode
                  : src.target;

              this.currentTarget = src.currentTarget;
              this.relatedTarget = src.relatedTarget;

              // Event type
            } else {
              this.type = src;
            }

            // Put explicitly provided properties onto the event object
            if (props) {
              jQuery.extend(this, props);
            }

            // Create a timestamp if incoming event doesn't have one
            this.timeStamp = (src && src.timeStamp) || jQuery.now();

            // Mark it as fixed
            this[jQuery.expando] = true;
          };

          // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
          // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
          jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            isSimulated: false,

            preventDefault: function () {
              var e = this.originalEvent;

              this.isDefaultPrevented = returnTrue;

              if (e && !this.isSimulated) {
                e.preventDefault();
              }
            },
            stopPropagation: function () {
              var e = this.originalEvent;

              this.isPropagationStopped = returnTrue;

              if (e && !this.isSimulated) {
                e.stopPropagation();
              }
            },
            stopImmediatePropagation: function () {
              var e = this.originalEvent;

              this.isImmediatePropagationStopped = returnTrue;

              if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
              }

              this.stopPropagation();
            },
          };

          // Includes all common event props including KeyEvent and MouseEvent specific props
          jQuery.each(
            {
              altKey: true,
              bubbles: true,
              cancelable: true,
              changedTouches: true,
              ctrlKey: true,
              detail: true,
              eventPhase: true,
              metaKey: true,
              pageX: true,
              pageY: true,
              shiftKey: true,
              view: true,
              char: true,
              charCode: true,
              key: true,
              keyCode: true,
              button: true,
              buttons: true,
              clientX: true,
              clientY: true,
              offsetX: true,
              offsetY: true,
              pointerId: true,
              pointerType: true,
              screenX: true,
              screenY: true,
              targetTouches: true,
              toElement: true,
              touches: true,

              which: function (event) {
                var button = event.button;

                // Add which for key events
                if (event.which == null && rkeyEvent.test(event.type)) {
                  return event.charCode != null
                    ? event.charCode
                    : event.keyCode;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                if (
                  !event.which &&
                  button !== undefined &&
                  rmouseEvent.test(event.type)
                ) {
                  if (button & 1) {
                    return 1;
                  }

                  if (button & 2) {
                    return 3;
                  }

                  if (button & 4) {
                    return 2;
                  }

                  return 0;
                }

                return event.which;
              },
            },
            jQuery.event.addProp
          );

          // Create mouseenter/leave events using mouseover/out and event-time checks
          // so that event delegation works in jQuery.
          // Do the same for pointerenter/pointerleave and pointerover/pointerout
          //
          // Support: Safari 7 only
          // Safari sends mouseenter too often; see:
          // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
          // for the description of the bug (it existed in older Chrome versions as well).
          jQuery.each(
            {
              mouseenter: "mouseover",
              mouseleave: "mouseout",
              pointerenter: "pointerover",
              pointerleave: "pointerout",
            },
            function (orig, fix) {
              jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,

                handle: function (event) {
                  var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                  // For mouseenter/leave call the handler if related is outside the target.
                  // NB: No relatedTarget if the mouse left/entered the browser window
                  if (
                    !related ||
                    (related !== target && !jQuery.contains(target, related))
                  ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                  }
                  return ret;
                },
              };
            }
          );

          jQuery.fn.extend({
            on: function (types, selector, data, fn) {
              return on(this, types, selector, data, fn);
            },
            one: function (types, selector, data, fn) {
              return on(this, types, selector, data, fn, 1);
            },
            off: function (types, selector, fn) {
              var handleObj, type;
              if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                  handleObj.namespace
                    ? handleObj.origType + "." + handleObj.namespace
                    : handleObj.origType,
                  handleObj.selector,
                  handleObj.handler
                );
                return this;
              }
              if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                  this.off(type, selector, types[type]);
                }
                return this;
              }
              if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
              }
              if (fn === false) {
                fn = returnFalse;
              }
              return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
              });
            },
          });

          var /* eslint-disable max-len */

            // See https://github.com/eslint/eslint/issues/3229
            rxhtmlTag =
              /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            /* eslint-enable */

            // Support: IE <=10 - 11, Edge 12 - 13
            // In IE/Edge using regex groups here causes severe slowdowns.
            // See https://connect.microsoft.com/IE/feedback/details/1736512/
            rnoInnerhtml = /<script|<style|<link/i,
            // checked="checked" or checked
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

          // Prefer a tbody over its parent table for containing new rows
          function manipulationTarget(elem, content) {
            if (
              nodeName(elem, "table") &&
              nodeName(
                content.nodeType !== 11 ? content : content.firstChild,
                "tr"
              )
            ) {
              return jQuery(">tbody", elem)[0] || elem;
            }

            return elem;
          }

          // Replace/restore the type attribute of script elements for safe DOM manipulation
          function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem;
          }
          function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);

            if (match) {
              elem.type = match[1];
            } else {
              elem.removeAttribute("type");
            }

            return elem;
          }

          function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

            if (dest.nodeType !== 1) {
              return;
            }

            // 1. Copy private data: events, handlers, etc.
            if (dataPriv.hasData(src)) {
              pdataOld = dataPriv.access(src);
              pdataCur = dataPriv.set(dest, pdataOld);
              events = pdataOld.events;

              if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for (type in events) {
                  for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                  }
                }
              }
            }

            // 2. Copy user data
            if (dataUser.hasData(src)) {
              udataOld = dataUser.access(src);
              udataCur = jQuery.extend({}, udataOld);

              dataUser.set(dest, udataCur);
            }
          }

          // Fix IE bugs, see support tests
          function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();

            // Fails to persist the checked state of a cloned checkbox or radio button.
            if (nodeName === "input" && rcheckableType.test(src.type)) {
              dest.checked = src.checked;

              // Fails to return the selected option to the default selected state when cloning options
            } else if (nodeName === "input" || nodeName === "textarea") {
              dest.defaultValue = src.defaultValue;
            }
          }

          function domManip(collection, args, callback, ignored) {
            // Flatten any nested arrays
            args = concat.apply([], args);

            var fragment,
              first,
              scripts,
              hasScripts,
              node,
              doc,
              i = 0,
              l = collection.length,
              iNoClone = l - 1,
              value = args[0],
              isFunction = jQuery.isFunction(value);

            // We can't cloneNode fragments that contain checked, in WebKit
            if (
              isFunction ||
              (l > 1 &&
                typeof value === "string" &&
                !support.checkClone &&
                rchecked.test(value))
            ) {
              return collection.each(function (index) {
                var self = collection.eq(index);
                if (isFunction) {
                  args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
              });
            }

            if (l) {
              fragment = buildFragment(
                args,
                collection[0].ownerDocument,
                false,
                collection,
                ignored
              );
              first = fragment.firstChild;

              if (fragment.childNodes.length === 1) {
                fragment = first;
              }

              // Require either new content or an interest in ignored elements to invoke the callback
              if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for (; i < l; i++) {
                  node = fragment;

                  if (i !== iNoClone) {
                    node = jQuery.clone(node, true, true);

                    // Keep references to cloned scripts for later restoration
                    if (hasScripts) {
                      // Support: Android <=4.0 only, PhantomJS 1 only
                      // push.apply(_, arraylike) throws on ancient WebKit
                      jQuery.merge(scripts, getAll(node, "script"));
                    }
                  }

                  callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                  doc = scripts[scripts.length - 1].ownerDocument;

                  // Reenable scripts
                  jQuery.map(scripts, restoreScript);

                  // Evaluate executable scripts on first document insertion
                  for (i = 0; i < hasScripts; i++) {
                    node = scripts[i];
                    if (
                      rscriptType.test(node.type || "") &&
                      !dataPriv.access(node, "globalEval") &&
                      jQuery.contains(doc, node)
                    ) {
                      if (node.src) {
                        // Optional AJAX dependency, but won't run scripts if not present
                        if (jQuery._evalUrl) {
                          jQuery._evalUrl(node.src);
                        }
                      } else {
                        DOMEval(
                          node.textContent.replace(rcleanScript, ""),
                          doc
                        );
                      }
                    }
                  }
                }
              }
            }

            return collection;
          }

          function remove(elem, selector, keepData) {
            var node,
              nodes = selector ? jQuery.filter(selector, elem) : elem,
              i = 0;

            for (; (node = nodes[i]) != null; i++) {
              if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
              }

              if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                  setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
              }
            }

            return elem;
          }

          jQuery.extend({
            htmlPrefilter: function (html) {
              return html.replace(rxhtmlTag, "<$1></$2>");
            },

            clone: function (elem, dataAndEvents, deepDataAndEvents) {
              var i,
                l,
                srcElements,
                destElements,
                clone = elem.cloneNode(true),
                inPage = jQuery.contains(elem.ownerDocument, elem);

              // Fix IE cloning issues
              if (
                !support.noCloneChecked &&
                (elem.nodeType === 1 || elem.nodeType === 11) &&
                !jQuery.isXMLDoc(elem)
              ) {
                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                for (i = 0, l = srcElements.length; i < l; i++) {
                  fixInput(srcElements[i], destElements[i]);
                }
              }

              // Copy the events from the original to the clone
              if (dataAndEvents) {
                if (deepDataAndEvents) {
                  srcElements = srcElements || getAll(elem);
                  destElements = destElements || getAll(clone);

                  for (i = 0, l = srcElements.length; i < l; i++) {
                    cloneCopyEvent(srcElements[i], destElements[i]);
                  }
                } else {
                  cloneCopyEvent(elem, clone);
                }
              }

              // Preserve script evaluation history
              destElements = getAll(clone, "script");
              if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
              }

              // Return the cloned set
              return clone;
            },

            cleanData: function (elems) {
              var data,
                elem,
                type,
                special = jQuery.event.special,
                i = 0;

              for (; (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                  if ((data = elem[dataPriv.expando])) {
                    if (data.events) {
                      for (type in data.events) {
                        if (special[type]) {
                          jQuery.event.remove(elem, type);

                          // This is a shortcut to avoid jQuery.event.remove's overhead
                        } else {
                          jQuery.removeEvent(elem, type, data.handle);
                        }
                      }
                    }

                    // Support: Chrome <=35 - 45+
                    // Assign undefined instead of using delete, see Data#remove
                    elem[dataPriv.expando] = undefined;
                  }
                  if (elem[dataUser.expando]) {
                    // Support: Chrome <=35 - 45+
                    // Assign undefined instead of using delete, see Data#remove
                    elem[dataUser.expando] = undefined;
                  }
                }
              }
            },
          });

          jQuery.fn.extend({
            detach: function (selector) {
              return remove(this, selector, true);
            },

            remove: function (selector) {
              return remove(this, selector);
            },

            text: function (value) {
              return access(
                this,
                function (value) {
                  return value === undefined
                    ? jQuery.text(this)
                    : this.empty().each(function () {
                        if (
                          this.nodeType === 1 ||
                          this.nodeType === 11 ||
                          this.nodeType === 9
                        ) {
                          this.textContent = value;
                        }
                      });
                },
                null,
                value,
                arguments.length
              );
            },

            append: function () {
              return domManip(this, arguments, function (elem) {
                if (
                  this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9
                ) {
                  var target = manipulationTarget(this, elem);
                  target.appendChild(elem);
                }
              });
            },

            prepend: function () {
              return domManip(this, arguments, function (elem) {
                if (
                  this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9
                ) {
                  var target = manipulationTarget(this, elem);
                  target.insertBefore(elem, target.firstChild);
                }
              });
            },

            before: function () {
              return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                  this.parentNode.insertBefore(elem, this);
                }
              });
            },

            after: function () {
              return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                  this.parentNode.insertBefore(elem, this.nextSibling);
                }
              });
            },

            empty: function () {
              var elem,
                i = 0;

              for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                  // Prevent memory leaks
                  jQuery.cleanData(getAll(elem, false));

                  // Remove any remaining nodes
                  elem.textContent = "";
                }
              }

              return this;
            },

            clone: function (dataAndEvents, deepDataAndEvents) {
              dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
              deepDataAndEvents =
                deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

              return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
              });
            },

            html: function (value) {
              return access(
                this,
                function (value) {
                  var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                  if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                  }

                  // See if we can take a shortcut and just use innerHTML
                  if (
                    typeof value === "string" &&
                    !rnoInnerhtml.test(value) &&
                    !wrapMap[
                      (rtagName.exec(value) || ["", ""])[1].toLowerCase()
                    ]
                  ) {
                    value = jQuery.htmlPrefilter(value);

                    try {
                      for (; i < l; i++) {
                        elem = this[i] || {};

                        // Remove element nodes and prevent memory leaks
                        if (elem.nodeType === 1) {
                          jQuery.cleanData(getAll(elem, false));
                          elem.innerHTML = value;
                        }
                      }

                      elem = 0;

                      // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {}
                  }

                  if (elem) {
                    this.empty().append(value);
                  }
                },
                null,
                value,
                arguments.length
              );
            },

            replaceWith: function () {
              var ignored = [];

              // Make the changes, replacing each non-ignored context element with the new content
              return domManip(
                this,
                arguments,
                function (elem) {
                  var parent = this.parentNode;

                  if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                      parent.replaceChild(elem, this);
                    }
                  }

                  // Force callback invocation
                },
                ignored
              );
            },
          });

          jQuery.each(
            {
              appendTo: "append",
              prependTo: "prepend",
              insertBefore: "before",
              insertAfter: "after",
              replaceAll: "replaceWith",
            },
            function (name, original) {
              jQuery.fn[name] = function (selector) {
                var elems,
                  ret = [],
                  insert = jQuery(selector),
                  last = insert.length - 1,
                  i = 0;

                for (; i <= last; i++) {
                  elems = i === last ? this : this.clone(true);
                  jQuery(insert[i])[original](elems);

                  // Support: Android <=4.0 only, PhantomJS 1 only
                  // .get() because push.apply(_, arraylike) throws on ancient WebKit
                  push.apply(ret, elems.get());
                }

                return this.pushStack(ret);
              };
            }
          );
          var rmargin = /^margin/;

          var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

          var getStyles = function (elem) {
            // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;

            if (!view || !view.opener) {
              view = window;
            }

            return view.getComputedStyle(elem);
          };

          (function () {
            // Executing both pixelPosition & boxSizingReliable tests require only one layout
            // so they're executed at the same time to save the second computation.
            function computeStyleTests() {
              // This is a singleton, we need to execute it only once
              if (!div) {
                return;
              }

              div.style.cssText =
                "box-sizing:border-box;" +
                "position:relative;display:block;" +
                "margin:auto;border:1px;padding:1px;" +
                "top:1%;width:50%";
              div.innerHTML = "";
              documentElement.appendChild(container);

              var divStyle = window.getComputedStyle(div);
              pixelPositionVal = divStyle.top !== "1%";

              // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
              reliableMarginLeftVal = divStyle.marginLeft === "2px";
              boxSizingReliableVal = divStyle.width === "4px";

              // Support: Android 4.0 - 4.3 only
              // Some styles come back with percentage values, even though they shouldn't
              div.style.marginRight = "50%";
              pixelMarginRightVal = divStyle.marginRight === "4px";

              documentElement.removeChild(container);

              // Nullify the div so it wouldn't be stored in the memory and
              // it will also be a sign that checks already performed
              div = null;
            }

            var pixelPositionVal,
              boxSizingReliableVal,
              pixelMarginRightVal,
              reliableMarginLeftVal,
              container = document.createElement("div"),
              div = document.createElement("div");

            // Finish early in limited (non-browser) environments
            if (!div.style) {
              return;
            }

            // Support: IE <=9 - 11 only
            // Style of cloned element affects source element cloned (#8908)
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle =
              div.style.backgroundClip === "content-box";

            container.style.cssText =
              "border:0;width:8px;height:0;top:0;left:-9999px;" +
              "padding:0;margin-top:1px;position:absolute";
            container.appendChild(div);

            jQuery.extend(support, {
              pixelPosition: function () {
                computeStyleTests();
                return pixelPositionVal;
              },
              boxSizingReliable: function () {
                computeStyleTests();
                return boxSizingReliableVal;
              },
              pixelMarginRight: function () {
                computeStyleTests();
                return pixelMarginRightVal;
              },
              reliableMarginLeft: function () {
                computeStyleTests();
                return reliableMarginLeftVal;
              },
            });
          })();

          function curCSS(elem, name, computed) {
            var width,
              minWidth,
              maxWidth,
              ret,
              // Support: Firefox 51+
              // Retrieving style before computed somehow
              // fixes an issue with getting wrong values
              // on detached elements
              style = elem.style;

            computed = computed || getStyles(elem);

            // getPropertyValue is needed for:
            //   .css('filter') (IE 9 only, #12537)
            //   .css('--customProperty) (#3144)
            if (computed) {
              ret = computed.getPropertyValue(name) || computed[name];

              if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
              }

              // A tribute to the "awesome hack by Dean Edwards"
              // Android Browser returns percentage for some values,
              // but width seems to be reliably pixels.
              // This is against the CSSOM draft spec:
              // https://drafts.csswg.org/cssom/#resolved-values
              if (
                !support.pixelMarginRight() &&
                rnumnonpx.test(ret) &&
                rmargin.test(name)
              ) {
                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
              }
            }

            return ret !== undefined
              ? // Support: IE <=9 - 11 only
                // IE returns zIndex value as an integer.
                ret + ""
              : ret;
          }

          function addGetHookIf(conditionFn, hookFn) {
            // Define the hook, we'll check on the first run if it's really needed.
            return {
              get: function () {
                if (conditionFn()) {
                  // Hook not needed (or it's not possible to use it due
                  // to missing dependency), remove it.
                  delete this.get;
                  return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply(this, arguments);
              },
            };
          }

          var // Swappable if display is none or starts with table
            // except "table", "table-cell", or "table-caption"
            // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
            rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            rcustomProp = /^--/,
            cssShow = {
              position: "absolute",
              visibility: "hidden",
              display: "block",
            },
            cssNormalTransform = {
              letterSpacing: "0",
              fontWeight: "400",
            },
            cssPrefixes = ["Webkit", "Moz", "ms"],
            emptyStyle = document.createElement("div").style;

          // Return a css property mapped to a potentially vendor prefixed property
          function vendorPropName(name) {
            // Shortcut for names that are not vendor prefixed
            if (name in emptyStyle) {
              return name;
            }

            // Check for vendor prefixed names
            var capName = name[0].toUpperCase() + name.slice(1),
              i = cssPrefixes.length;

            while (i--) {
              name = cssPrefixes[i] + capName;
              if (name in emptyStyle) {
                return name;
              }
            }
          }

          // Return a property mapped along what jQuery.cssProps suggests or to
          // a vendor prefixed property.
          function finalPropName(name) {
            var ret = jQuery.cssProps[name];
            if (!ret) {
              ret = jQuery.cssProps[name] = vendorPropName(name) || name;
            }
            return ret;
          }

          function setPositiveNumber(elem, value, subtract) {
            // Any relative (+/-) values have already been
            // normalized at this point
            var matches = rcssNum.exec(value);
            return matches
              ? // Guard against undefined "subtract", e.g., when used as in cssHooks
                Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
              : value;
          }

          function augmentWidthOrHeight(
            elem,
            name,
            extra,
            isBorderBox,
            styles
          ) {
            var i,
              val = 0;

            // If we already have the right measurement, avoid augmentation
            if (extra === (isBorderBox ? "border" : "content")) {
              i = 4;

              // Otherwise initialize for horizontal or vertical properties
            } else {
              i = name === "width" ? 1 : 0;
            }

            for (; i < 4; i += 2) {
              // Both box models exclude margin, so add it if we want it
              if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
              }

              if (isBorderBox) {
                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                  val -= jQuery.css(
                    elem,
                    "padding" + cssExpand[i],
                    true,
                    styles
                  );
                }

                // At this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                  val -= jQuery.css(
                    elem,
                    "border" + cssExpand[i] + "Width",
                    true,
                    styles
                  );
                }
              } else {
                // At this point, extra isn't content, so add padding
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // At this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                  val += jQuery.css(
                    elem,
                    "border" + cssExpand[i] + "Width",
                    true,
                    styles
                  );
                }
              }
            }

            return val;
          }

          function getWidthOrHeight(elem, name, extra) {
            // Start with computed style
            var valueIsBorderBox,
              styles = getStyles(elem),
              val = curCSS(elem, name, styles),
              isBorderBox =
                jQuery.css(elem, "boxSizing", false, styles) === "border-box";

            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
              return val;
            }

            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox =
              isBorderBox &&
              (support.boxSizingReliable() || val === elem.style[name]);

            // Fall back to offsetWidth/Height when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            if (val === "auto") {
              val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
            }

            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;

            // Use the active box-sizing model to add/subtract irrelevant styles
            return (
              val +
              augmentWidthOrHeight(
                elem,
                name,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles
              ) +
              "px"
            );
          }

          jQuery.extend({
            // Add in style property hooks for overriding the default
            // behavior of getting and setting a style property
            cssHooks: {
              opacity: {
                get: function (elem, computed) {
                  if (computed) {
                    // We should always get a number back from opacity
                    var ret = curCSS(elem, "opacity");
                    return ret === "" ? "1" : ret;
                  }
                },
              },
            },

            // Don't automatically add "px" to these possibly-unitless properties
            cssNumber: {
              animationIterationCount: true,
              columnCount: true,
              fillOpacity: true,
              flexGrow: true,
              flexShrink: true,
              fontWeight: true,
              lineHeight: true,
              opacity: true,
              order: true,
              orphans: true,
              widows: true,
              zIndex: true,
              zoom: true,
            },

            // Add in properties whose names you wish to fix before
            // setting or getting the value
            cssProps: {
              float: "cssFloat",
            },

            // Get and set the style property on a DOM Node
            style: function (elem, name, value, extra) {
              // Don't set styles on text and comment nodes
              if (
                !elem ||
                elem.nodeType === 3 ||
                elem.nodeType === 8 ||
                !elem.style
              ) {
                return;
              }

              // Make sure that we're working with the right name
              var ret,
                type,
                hooks,
                origName = jQuery.camelCase(name),
                isCustomProp = rcustomProp.test(name),
                style = elem.style;

              // Make sure that we're working with the right name. We don't
              // want to query the value if it is a CSS custom property
              // since they are user-defined.
              if (!isCustomProp) {
                name = finalPropName(origName);
              }

              // Gets hook for the prefixed version, then unprefixed version
              hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

              // Check if we're setting a value
              if (value !== undefined) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if (
                  type === "string" &&
                  (ret = rcssNum.exec(value)) &&
                  ret[1]
                ) {
                  value = adjustCSS(elem, name, ret);

                  // Fixes bug #9237
                  type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if (value == null || value !== value) {
                  return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                if (type === "number") {
                  value +=
                    (ret && ret[3]) || (jQuery.cssNumber[origName] ? "" : "px");
                }

                // background-* props affect original clone's values
                if (
                  !support.clearCloneStyle &&
                  value === "" &&
                  name.indexOf("background") === 0
                ) {
                  style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (
                  !hooks ||
                  !("set" in hooks) ||
                  (value = hooks.set(elem, value, extra)) !== undefined
                ) {
                  if (isCustomProp) {
                    style.setProperty(name, value);
                  } else {
                    style[name] = value;
                  }
                }
              } else {
                // If a hook was provided get the non-computed value from there
                if (
                  hooks &&
                  "get" in hooks &&
                  (ret = hooks.get(elem, false, extra)) !== undefined
                ) {
                  return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
              }
            },

            css: function (elem, name, extra, styles) {
              var val,
                num,
                hooks,
                origName = jQuery.camelCase(name),
                isCustomProp = rcustomProp.test(name);

              // Make sure that we're working with the right name. We don't
              // want to modify the value if it is a CSS custom property
              // since they are user-defined.
              if (!isCustomProp) {
                name = finalPropName(origName);
              }

              // Try prefixed name followed by the unprefixed name
              hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

              // If a hook was provided get the computed value from there
              if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
              }

              // Otherwise, if a way to get the computed value exists, use that
              if (val === undefined) {
                val = curCSS(elem, name, styles);
              }

              // Convert "normal" to computed value
              if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
              }

              // Make numeric if forced or a qualifier was provided and val looks numeric
              if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
              }

              return val;
            },
          });

          jQuery.each(["height", "width"], function (i, name) {
            jQuery.cssHooks[name] = {
              get: function (elem, computed, extra) {
                if (computed) {
                  // Certain elements can have dimension info if we invisibly show them
                  // but it must have a current display style that would benefit
                  return rdisplayswap.test(jQuery.css(elem, "display")) &&
                    // Support: Safari 8+
                    // Table columns in Safari have non-zero offsetWidth & zero
                    // getBoundingClientRect().width unless display is changed.
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a disconnected node
                    // in IE throws an error.
                    (!elem.getClientRects().length ||
                      !elem.getBoundingClientRect().width)
                    ? swap(elem, cssShow, function () {
                        return getWidthOrHeight(elem, name, extra);
                      })
                    : getWidthOrHeight(elem, name, extra);
                }
              },

              set: function (elem, value, extra) {
                var matches,
                  styles = extra && getStyles(elem),
                  subtract =
                    extra &&
                    augmentWidthOrHeight(
                      elem,
                      name,
                      extra,
                      jQuery.css(elem, "boxSizing", false, styles) ===
                        "border-box",
                      styles
                    );

                // Convert to pixels if value adjustment is needed
                if (
                  subtract &&
                  (matches = rcssNum.exec(value)) &&
                  (matches[3] || "px") !== "px"
                ) {
                  elem.style[name] = value;
                  value = jQuery.css(elem, name);
                }

                return setPositiveNumber(elem, value, subtract);
              },
            };
          });

          jQuery.cssHooks.marginLeft = addGetHookIf(
            support.reliableMarginLeft,
            function (elem, computed) {
              if (computed) {
                return (
                  (parseFloat(curCSS(elem, "marginLeft")) ||
                    elem.getBoundingClientRect().left -
                      swap(elem, { marginLeft: 0 }, function () {
                        return elem.getBoundingClientRect().left;
                      })) + "px"
                );
              }
            }
          );

          // These hooks are used by animate to expand properties
          jQuery.each(
            {
              margin: "",
              padding: "",
              border: "Width",
            },
            function (prefix, suffix) {
              jQuery.cssHooks[prefix + suffix] = {
                expand: function (value) {
                  var i = 0,
                    expanded = {},
                    // Assumes a single number if not a string
                    parts =
                      typeof value === "string" ? value.split(" ") : [value];

                  for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                      parts[i] || parts[i - 2] || parts[0];
                  }

                  return expanded;
                },
              };

              if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
              }
            }
          );

          jQuery.fn.extend({
            css: function (name, value) {
              return access(
                this,
                function (elem, name, value) {
                  var styles,
                    len,
                    map = {},
                    i = 0;

                  if (Array.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                      map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                  }

                  return value !== undefined
                    ? jQuery.style(elem, name, value)
                    : jQuery.css(elem, name);
                },
                name,
                value,
                arguments.length > 1
              );
            },
          });

          function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
          }
          jQuery.Tween = Tween;

          Tween.prototype = {
            constructor: Tween,
            init: function (elem, options, prop, end, easing, unit) {
              this.elem = elem;
              this.prop = prop;
              this.easing = easing || jQuery.easing._default;
              this.options = options;
              this.start = this.now = this.cur();
              this.end = end;
              this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function () {
              var hooks = Tween.propHooks[this.prop];

              return hooks && hooks.get
                ? hooks.get(this)
                : Tween.propHooks._default.get(this);
            },
            run: function (percent) {
              var eased,
                hooks = Tween.propHooks[this.prop];

              if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                  percent,
                  this.options.duration * percent,
                  0,
                  1,
                  this.options.duration
                );
              } else {
                this.pos = eased = percent;
              }
              this.now = (this.end - this.start) * eased + this.start;

              if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
              }

              if (hooks && hooks.set) {
                hooks.set(this);
              } else {
                Tween.propHooks._default.set(this);
              }
              return this;
            },
          };

          Tween.prototype.init.prototype = Tween.prototype;

          Tween.propHooks = {
            _default: {
              get: function (tween) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if (
                  tween.elem.nodeType !== 1 ||
                  (tween.elem[tween.prop] != null &&
                    tween.elem.style[tween.prop] == null)
                ) {
                  return tween.elem[tween.prop];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css(tween.elem, tween.prop, "");

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
              },
              set: function (tween) {
                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if (jQuery.fx.step[tween.prop]) {
                  jQuery.fx.step[tween.prop](tween);
                } else if (
                  tween.elem.nodeType === 1 &&
                  (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
                    jQuery.cssHooks[tween.prop])
                ) {
                  jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                  tween.elem[tween.prop] = tween.now;
                }
              },
            },
          };

          // Support: IE <=9 only
          // Panic based approach to setting things on disconnected nodes
          Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function (tween) {
              if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
              }
            },
          };

          jQuery.easing = {
            linear: function (p) {
              return p;
            },
            swing: function (p) {
              return 0.5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing",
          };

          jQuery.fx = Tween.prototype.init;

          // Back compat <1.8 extension point
          jQuery.fx.step = {};

          var fxNow,
            inProgress,
            rfxtypes = /^(?:toggle|show|hide)$/,
            rrun = /queueHooks$/;

          function schedule() {
            if (inProgress) {
              if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(schedule);
              } else {
                window.setTimeout(schedule, jQuery.fx.interval);
              }

              jQuery.fx.tick();
            }
          }

          // Animations created synchronously will run synchronously
          function createFxNow() {
            window.setTimeout(function () {
              fxNow = undefined;
            });
            return (fxNow = jQuery.now());
          }

          // Generate parameters to create a standard animation
          function genFx(type, includeWidth) {
            var which,
              i = 0,
              attrs = { height: type };

            // If we include width, step value is 1 to do all cssExpand values,
            // otherwise step value is 2 to skip over Left and Right
            includeWidth = includeWidth ? 1 : 0;
            for (; i < 4; i += 2 - includeWidth) {
              which = cssExpand[i];
              attrs["margin" + which] = attrs["padding" + which] = type;
            }

            if (includeWidth) {
              attrs.opacity = attrs.width = type;
            }

            return attrs;
          }

          function createTween(value, prop, animation) {
            var tween,
              collection = (Animation.tweeners[prop] || []).concat(
                Animation.tweeners["*"]
              ),
              index = 0,
              length = collection.length;
            for (; index < length; index++) {
              if ((tween = collection[index].call(animation, prop, value))) {
                // We're done with this property
                return tween;
              }
            }
          }

          function defaultPrefilter(elem, props, opts) {
            var prop,
              value,
              toggle,
              hooks,
              oldfire,
              propTween,
              restoreDisplay,
              display,
              isBox = "width" in props || "height" in props,
              anim = this,
              orig = {},
              style = elem.style,
              hidden = elem.nodeType && isHiddenWithinTree(elem),
              dataShow = dataPriv.get(elem, "fxshow");

            // Queue-skipping animations hijack the fx hooks
            if (!opts.queue) {
              hooks = jQuery._queueHooks(elem, "fx");
              if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                  if (!hooks.unqueued) {
                    oldfire();
                  }
                };
              }
              hooks.unqueued++;

              anim.always(function () {
                // Ensure the complete handler is called before this completes
                anim.always(function () {
                  hooks.unqueued--;
                  if (!jQuery.queue(elem, "fx").length) {
                    hooks.empty.fire();
                  }
                });
              });
            }

            // Detect show/hide animations
            for (prop in props) {
              value = props[prop];
              if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                  // Pretend to be hidden if this is a "show" and
                  // there is still data from a stopped show/hide
                  if (
                    value === "show" &&
                    dataShow &&
                    dataShow[prop] !== undefined
                  ) {
                    hidden = true;

                    // Ignore all other no-op show/hide data
                  } else {
                    continue;
                  }
                }
                orig[prop] =
                  (dataShow && dataShow[prop]) || jQuery.style(elem, prop);
              }
            }

            // Bail out if this is a no-op like .hide().hide()
            propTween = !jQuery.isEmptyObject(props);
            if (!propTween && jQuery.isEmptyObject(orig)) {
              return;
            }

            // Restrict "overflow" and "display" styles during box animations
            if (isBox && elem.nodeType === 1) {
              // Support: IE <=9 - 11, Edge 12 - 13
              // Record all 3 overflow attributes because IE does not infer the shorthand
              // from identically-valued overflowX and overflowY
              opts.overflow = [
                style.overflow,
                style.overflowX,
                style.overflowY,
              ];

              // Identify a display type, preferring old show/hide data over the CSS cascade
              restoreDisplay = dataShow && dataShow.display;
              if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, "display");
              }
              display = jQuery.css(elem, "display");
              if (display === "none") {
                if (restoreDisplay) {
                  display = restoreDisplay;
                } else {
                  // Get nonempty value(s) by temporarily forcing visibility
                  showHide([elem], true);
                  restoreDisplay = elem.style.display || restoreDisplay;
                  display = jQuery.css(elem, "display");
                  showHide([elem]);
                }
              }

              // Animate inline elements as inline-block
              if (
                display === "inline" ||
                (display === "inline-block" && restoreDisplay != null)
              ) {
                if (jQuery.css(elem, "float") === "none") {
                  // Restore the original display value at the end of pure show/hide animations
                  if (!propTween) {
                    anim.done(function () {
                      style.display = restoreDisplay;
                    });
                    if (restoreDisplay == null) {
                      display = style.display;
                      restoreDisplay = display === "none" ? "" : display;
                    }
                  }
                  style.display = "inline-block";
                }
              }
            }

            if (opts.overflow) {
              style.overflow = "hidden";
              anim.always(function () {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
              });
            }

            // Implement show/hide animations
            propTween = false;
            for (prop in orig) {
              // General show/hide setup for this element animation
              if (!propTween) {
                if (dataShow) {
                  if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                  }
                } else {
                  dataShow = dataPriv.access(elem, "fxshow", {
                    display: restoreDisplay,
                  });
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if (toggle) {
                  dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if (hidden) {
                  showHide([elem], true);
                }

                /* eslint-disable no-loop-func */

                anim.done(function () {
                  /* eslint-enable no-loop-func */

                  // The final step of a "hide" animation is actually hiding the element
                  if (!hidden) {
                    showHide([elem]);
                  }
                  dataPriv.remove(elem, "fxshow");
                  for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                  }
                });
              }

              // Per-property setup
              propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
              if (!(prop in dataShow)) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                  propTween.end = propTween.start;
                  propTween.start = 0;
                }
              }
            }
          }

          function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;

            // camelCase, specialEasing and expand cssHook pass
            for (index in props) {
              name = jQuery.camelCase(index);
              easing = specialEasing[name];
              value = props[index];
              if (Array.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
              }

              if (index !== name) {
                props[name] = value;
                delete props[index];
              }

              hooks = jQuery.cssHooks[name];
              if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for (index in value) {
                  if (!(index in props)) {
                    props[index] = value[index];
                    specialEasing[index] = easing;
                  }
                }
              } else {
                specialEasing[name] = easing;
              }
            }
          }

          function Animation(elem, properties, options) {
            var result,
              stopped,
              index = 0,
              length = Animation.prefilters.length,
              deferred = jQuery.Deferred().always(function () {
                // Don't match elem in the :animated selector
                delete tick.elem;
              }),
              tick = function () {
                if (stopped) {
                  return false;
                }
                var currentTime = fxNow || createFxNow(),
                  remaining = Math.max(
                    0,
                    animation.startTime + animation.duration - currentTime
                  ),
                  // Support: Android 2.3 only
                  // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                  temp = remaining / animation.duration || 0,
                  percent = 1 - temp,
                  index = 0,
                  length = animation.tweens.length;

                for (; index < length; index++) {
                  animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                // If there's more to do, yield
                if (percent < 1 && length) {
                  return remaining;
                }

                // If this was an empty animation, synthesize a final progress notification
                if (!length) {
                  deferred.notifyWith(elem, [animation, 1, 0]);
                }

                // Resolve the animation and report its conclusion
                deferred.resolveWith(elem, [animation]);
                return false;
              },
              animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(
                  true,
                  {
                    specialEasing: {},
                    easing: jQuery.easing._default,
                  },
                  options
                ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) {
                  var tween = jQuery.Tween(
                    elem,
                    animation.opts,
                    prop,
                    end,
                    animation.opts.specialEasing[prop] || animation.opts.easing
                  );
                  animation.tweens.push(tween);
                  return tween;
                },
                stop: function (gotoEnd) {
                  var index = 0,
                    // If we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                    length = gotoEnd ? animation.tweens.length : 0;
                  if (stopped) {
                    return this;
                  }
                  stopped = true;
                  for (; index < length; index++) {
                    animation.tweens[index].run(1);
                  }

                  // Resolve when we played the last frame; otherwise, reject
                  if (gotoEnd) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                    deferred.resolveWith(elem, [animation, gotoEnd]);
                  } else {
                    deferred.rejectWith(elem, [animation, gotoEnd]);
                  }
                  return this;
                },
              }),
              props = animation.props;

            propFilter(props, animation.opts.specialEasing);

            for (; index < length; index++) {
              result = Animation.prefilters[index].call(
                animation,
                elem,
                props,
                animation.opts
              );
              if (result) {
                if (jQuery.isFunction(result.stop)) {
                  jQuery._queueHooks(
                    animation.elem,
                    animation.opts.queue
                  ).stop = jQuery.proxy(result.stop, result);
                }
                return result;
              }
            }

            jQuery.map(props, createTween, animation);

            if (jQuery.isFunction(animation.opts.start)) {
              animation.opts.start.call(elem, animation);
            }

            // Attach callbacks from options
            animation
              .progress(animation.opts.progress)
              .done(animation.opts.done, animation.opts.complete)
              .fail(animation.opts.fail)
              .always(animation.opts.always);

            jQuery.fx.timer(
              jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue,
              })
            );

            return animation;
          }

          jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
              "*": [
                function (prop, value) {
                  var tween = this.createTween(prop, value);
                  adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                  return tween;
                },
              ],
            },

            tweener: function (props, callback) {
              if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
              } else {
                props = props.match(rnothtmlwhite);
              }

              var prop,
                index = 0,
                length = props.length;

              for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
              }
            },

            prefilters: [defaultPrefilter],

            prefilter: function (callback, prepend) {
              if (prepend) {
                Animation.prefilters.unshift(callback);
              } else {
                Animation.prefilters.push(callback);
              }
            },
          });

          jQuery.speed = function (speed, easing, fn) {
            var opt =
              speed && typeof speed === "object"
                ? jQuery.extend({}, speed)
                : {
                    complete:
                      fn ||
                      (!fn && easing) ||
                      (jQuery.isFunction(speed) && speed),
                    duration: speed,
                    easing:
                      (fn && easing) ||
                      (easing && !jQuery.isFunction(easing) && easing),
                  };

            // Go to the end state if fx are off
            if (jQuery.fx.off) {
              opt.duration = 0;
            } else {
              if (typeof opt.duration !== "number") {
                if (opt.duration in jQuery.fx.speeds) {
                  opt.duration = jQuery.fx.speeds[opt.duration];
                } else {
                  opt.duration = jQuery.fx.speeds._default;
                }
              }
            }

            // Normalize opt.queue - true/undefined/null -> "fx"
            if (opt.queue == null || opt.queue === true) {
              opt.queue = "fx";
            }

            // Queueing
            opt.old = opt.complete;

            opt.complete = function () {
              if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
              }

              if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
              }
            };

            return opt;
          };

          jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) {
              // Show any hidden elements after setting opacity to 0
              return (
                this.filter(isHiddenWithinTree)
                  .css("opacity", 0)
                  .show()

                  // Animate to the value specified
                  .end()
                  .animate({ opacity: to }, speed, easing, callback)
              );
            },
            animate: function (prop, speed, easing, callback) {
              var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {
                  // Operate on a copy of prop so per-property easing won't be lost
                  var anim = Animation(this, jQuery.extend({}, prop), optall);

                  // Empty animations, or finishing resolves immediately
                  if (empty || dataPriv.get(this, "finish")) {
                    anim.stop(true);
                  }
                };
              doAnimation.finish = doAnimation;

              return empty || optall.queue === false
                ? this.each(doAnimation)
                : this.queue(optall.queue, doAnimation);
            },
            stop: function (type, clearQueue, gotoEnd) {
              var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
              };

              if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
              }
              if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
              }

              return this.each(function () {
                var dequeue = true,
                  index = type != null && type + "queueHooks",
                  timers = jQuery.timers,
                  data = dataPriv.get(this);

                if (index) {
                  if (data[index] && data[index].stop) {
                    stopQueue(data[index]);
                  }
                } else {
                  for (index in data) {
                    if (data[index] && data[index].stop && rrun.test(index)) {
                      stopQueue(data[index]);
                    }
                  }
                }

                for (index = timers.length; index--; ) {
                  if (
                    timers[index].elem === this &&
                    (type == null || timers[index].queue === type)
                  ) {
                    timers[index].anim.stop(gotoEnd);
                    dequeue = false;
                    timers.splice(index, 1);
                  }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if (dequeue || !gotoEnd) {
                  jQuery.dequeue(this, type);
                }
              });
            },
            finish: function (type) {
              if (type !== false) {
                type = type || "fx";
              }
              return this.each(function () {
                var index,
                  data = dataPriv.get(this),
                  queue = data[type + "queue"],
                  hooks = data[type + "queueHooks"],
                  timers = jQuery.timers,
                  length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                  hooks.stop.call(this, true);
                }

                // Look for any active animations, and finish them
                for (index = timers.length; index--; ) {
                  if (
                    timers[index].elem === this &&
                    timers[index].queue === type
                  ) {
                    timers[index].anim.stop(true);
                    timers.splice(index, 1);
                  }
                }

                // Look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                  if (queue[index] && queue[index].finish) {
                    queue[index].finish.call(this);
                  }
                }

                // Turn off finishing flag
                delete data.finish;
              });
            },
          });

          jQuery.each(["toggle", "show", "hide"], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) {
              return speed == null || typeof speed === "boolean"
                ? cssFn.apply(this, arguments)
                : this.animate(genFx(name, true), speed, easing, callback);
            };
          });

          // Generate shortcuts for custom animations
          jQuery.each(
            {
              slideDown: genFx("show"),
              slideUp: genFx("hide"),
              slideToggle: genFx("toggle"),
              fadeIn: { opacity: "show" },
              fadeOut: { opacity: "hide" },
              fadeToggle: { opacity: "toggle" },
            },
            function (name, props) {
              jQuery.fn[name] = function (speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
              };
            }
          );

          jQuery.timers = [];
          jQuery.fx.tick = function () {
            var timer,
              i = 0,
              timers = jQuery.timers;

            fxNow = jQuery.now();

            for (; i < timers.length; i++) {
              timer = timers[i];

              // Run the timer and safely remove it when done (allowing for external removal)
              if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
              }
            }

            if (!timers.length) {
              jQuery.fx.stop();
            }
            fxNow = undefined;
          };

          jQuery.fx.timer = function (timer) {
            jQuery.timers.push(timer);
            jQuery.fx.start();
          };

          jQuery.fx.interval = 13;
          jQuery.fx.start = function () {
            if (inProgress) {
              return;
            }

            inProgress = true;
            schedule();
          };

          jQuery.fx.stop = function () {
            inProgress = null;
          };

          jQuery.fx.speeds = {
            slow: 600,
            fast: 200,

            // Default speed
            _default: 400,
          };

          // Based off of the plugin by Clint Helfers, with permission.
          // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
          jQuery.fn.delay = function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";

            return this.queue(type, function (next, hooks) {
              var timeout = window.setTimeout(next, time);
              hooks.stop = function () {
                window.clearTimeout(timeout);
              };
            });
          };

          (function () {
            var input = document.createElement("input"),
              select = document.createElement("select"),
              opt = select.appendChild(document.createElement("option"));

            input.type = "checkbox";

            // Support: Android <=4.3 only
            // Default value for a checkbox should be "on"
            support.checkOn = input.value !== "";

            // Support: IE <=11 only
            // Must access selectedIndex to make default options select
            support.optSelected = opt.selected;

            // Support: IE <=11 only
            // An input loses its value after becoming a radio
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t";
          })();

          var boolHook,
            attrHandle = jQuery.expr.attrHandle;

          jQuery.fn.extend({
            attr: function (name, value) {
              return access(
                this,
                jQuery.attr,
                name,
                value,
                arguments.length > 1
              );
            },

            removeAttr: function (name) {
              return this.each(function () {
                jQuery.removeAttr(this, name);
              });
            },
          });

          jQuery.extend({
            attr: function (elem, name, value) {
              var ret,
                hooks,
                nType = elem.nodeType;

              // Don't get/set attributes on text, comment and attribute nodes
              if (nType === 3 || nType === 8 || nType === 2) {
                return;
              }

              // Fallback to prop when attributes are not supported
              if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
              }

              // Attribute hooks are determined by the lowercase version
              // Grab necessary hook if one is defined
              if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks =
                  jQuery.attrHooks[name.toLowerCase()] ||
                  (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
              }

              if (value !== undefined) {
                if (value === null) {
                  jQuery.removeAttr(elem, name);
                  return;
                }

                if (
                  hooks &&
                  "set" in hooks &&
                  (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                  return ret;
                }

                elem.setAttribute(name, value + "");
                return value;
              }

              if (
                hooks &&
                "get" in hooks &&
                (ret = hooks.get(elem, name)) !== null
              ) {
                return ret;
              }

              ret = jQuery.find.attr(elem, name);

              // Non-existent attributes return null, we normalize to undefined
              return ret == null ? undefined : ret;
            },

            attrHooks: {
              type: {
                set: function (elem, value) {
                  if (
                    !support.radioValue &&
                    value === "radio" &&
                    nodeName(elem, "input")
                  ) {
                    var val = elem.value;
                    elem.setAttribute("type", value);
                    if (val) {
                      elem.value = val;
                    }
                    return value;
                  }
                },
              },
            },

            removeAttr: function (elem, value) {
              var name,
                i = 0,
                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match(rnothtmlwhite);

              if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                  elem.removeAttribute(name);
                }
              }
            },
          });

          // Hooks for boolean attributes
          boolHook = {
            set: function (elem, value, name) {
              if (value === false) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
              } else {
                elem.setAttribute(name, name);
              }
              return name;
            },
          };

          jQuery.each(
            jQuery.expr.match.bool.source.match(/\w+/g),
            function (i, name) {
              var getter = attrHandle[name] || jQuery.find.attr;

              attrHandle[name] = function (elem, name, isXML) {
                var ret,
                  handle,
                  lowercaseName = name.toLowerCase();

                if (!isXML) {
                  // Avoid an infinite loop by temporarily removing this function from the getter
                  handle = attrHandle[lowercaseName];
                  attrHandle[lowercaseName] = ret;
                  ret =
                    getter(elem, name, isXML) != null ? lowercaseName : null;
                  attrHandle[lowercaseName] = handle;
                }
                return ret;
              };
            }
          );

          var rfocusable = /^(?:input|select|textarea|button)$/i,
            rclickable = /^(?:a|area)$/i;

          jQuery.fn.extend({
            prop: function (name, value) {
              return access(
                this,
                jQuery.prop,
                name,
                value,
                arguments.length > 1
              );
            },

            removeProp: function (name) {
              return this.each(function () {
                delete this[jQuery.propFix[name] || name];
              });
            },
          });

          jQuery.extend({
            prop: function (elem, name, value) {
              var ret,
                hooks,
                nType = elem.nodeType;

              // Don't get/set properties on text, comment and attribute nodes
              if (nType === 3 || nType === 8 || nType === 2) {
                return;
              }

              if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
              }

              if (value !== undefined) {
                if (
                  hooks &&
                  "set" in hooks &&
                  (ret = hooks.set(elem, value, name)) !== undefined
                ) {
                  return ret;
                }

                return (elem[name] = value);
              }

              if (
                hooks &&
                "get" in hooks &&
                (ret = hooks.get(elem, name)) !== null
              ) {
                return ret;
              }

              return elem[name];
            },

            propHooks: {
              tabIndex: {
                get: function (elem) {
                  // Support: IE <=9 - 11 only
                  // elem.tabIndex doesn't always return the
                  // correct value when it hasn't been explicitly set
                  // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                  // Use proper attribute retrieval(#12072)
                  var tabindex = jQuery.find.attr(elem, "tabindex");

                  if (tabindex) {
                    return parseInt(tabindex, 10);
                  }

                  if (
                    rfocusable.test(elem.nodeName) ||
                    (rclickable.test(elem.nodeName) && elem.href)
                  ) {
                    return 0;
                  }

                  return -1;
                },
              },
            },

            propFix: {
              for: "htmlFor",
              class: "className",
            },
          });

          // Support: IE <=11 only
          // Accessing the selectedIndex property
          // forces the browser to respect setting selected
          // on the option
          // The getter ensures a default option is selected
          // when in an optgroup
          // eslint rule "no-unused-expressions" is disabled for this code
          // since it considers such accessions noop
          if (!support.optSelected) {
            jQuery.propHooks.selected = {
              get: function (elem) {
                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                  parent.parentNode.selectedIndex;
                }
                return null;
              },
              set: function (elem) {
                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if (parent) {
                  parent.selectedIndex;

                  if (parent.parentNode) {
                    parent.parentNode.selectedIndex;
                  }
                }
              },
            };
          }

          jQuery.each(
            [
              "tabIndex",
              "readOnly",
              "maxLength",
              "cellSpacing",
              "cellPadding",
              "rowSpan",
              "colSpan",
              "useMap",
              "frameBorder",
              "contentEditable",
            ],
            function () {
              jQuery.propFix[this.toLowerCase()] = this;
            }
          );

          // Strip and collapse whitespace according to HTML spec
          // https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
          function stripAndCollapse(value) {
            var tokens = value.match(rnothtmlwhite) || [];
            return tokens.join(" ");
          }

          function getClass(elem) {
            return (elem.getAttribute && elem.getAttribute("class")) || "";
          }

          jQuery.fn.extend({
            addClass: function (value) {
              var classes,
                elem,
                cur,
                curValue,
                clazz,
                j,
                finalValue,
                i = 0;

              if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                  jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
              }

              if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];

                while ((elem = this[i++])) {
                  curValue = getClass(elem);
                  cur =
                    elem.nodeType === 1 &&
                    " " + stripAndCollapse(curValue) + " ";

                  if (cur) {
                    j = 0;
                    while ((clazz = classes[j++])) {
                      if (cur.indexOf(" " + clazz + " ") < 0) {
                        cur += clazz + " ";
                      }
                    }

                    // Only assign if different to avoid unneeded rendering.
                    finalValue = stripAndCollapse(cur);
                    if (curValue !== finalValue) {
                      elem.setAttribute("class", finalValue);
                    }
                  }
                }
              }

              return this;
            },

            removeClass: function (value) {
              var classes,
                elem,
                cur,
                curValue,
                clazz,
                j,
                finalValue,
                i = 0;

              if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                  jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
              }

              if (!arguments.length) {
                return this.attr("class", "");
              }

              if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];

                while ((elem = this[i++])) {
                  curValue = getClass(elem);

                  // This expression is here for better compressibility (see addClass)
                  cur =
                    elem.nodeType === 1 &&
                    " " + stripAndCollapse(curValue) + " ";

                  if (cur) {
                    j = 0;
                    while ((clazz = classes[j++])) {
                      // Remove *all* instances
                      while (cur.indexOf(" " + clazz + " ") > -1) {
                        cur = cur.replace(" " + clazz + " ", " ");
                      }
                    }

                    // Only assign if different to avoid unneeded rendering.
                    finalValue = stripAndCollapse(cur);
                    if (curValue !== finalValue) {
                      elem.setAttribute("class", finalValue);
                    }
                  }
                }
              }

              return this;
            },

            toggleClass: function (value, stateVal) {
              var type = typeof value;

              if (typeof stateVal === "boolean" && type === "string") {
                return stateVal
                  ? this.addClass(value)
                  : this.removeClass(value);
              }

              if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                  jQuery(this).toggleClass(
                    value.call(this, i, getClass(this), stateVal),
                    stateVal
                  );
                });
              }

              return this.each(function () {
                var className, i, self, classNames;

                if (type === "string") {
                  // Toggle individual class names
                  i = 0;
                  self = jQuery(this);
                  classNames = value.match(rnothtmlwhite) || [];

                  while ((className = classNames[i++])) {
                    // Check each className given, space separated list
                    if (self.hasClass(className)) {
                      self.removeClass(className);
                    } else {
                      self.addClass(className);
                    }
                  }

                  // Toggle whole class name
                } else if (value === undefined || type === "boolean") {
                  className = getClass(this);
                  if (className) {
                    // Store className if set
                    dataPriv.set(this, "__className__", className);
                  }

                  // If the element has a class name or if we're passed `false`,
                  // then remove the whole classname (if there was one, the above saved it).
                  // Otherwise bring back whatever was previously saved (if anything),
                  // falling back to the empty string if nothing was stored.
                  if (this.setAttribute) {
                    this.setAttribute(
                      "class",
                      className || value === false
                        ? ""
                        : dataPriv.get(this, "__className__") || ""
                    );
                  }
                }
              });
            },

            hasClass: function (selector) {
              var className,
                elem,
                i = 0;

              className = " " + selector + " ";
              while ((elem = this[i++])) {
                if (
                  elem.nodeType === 1 &&
                  (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(
                    className
                  ) > -1
                ) {
                  return true;
                }
              }

              return false;
            },
          });

          var rreturn = /\r/g;

          jQuery.fn.extend({
            val: function (value) {
              var hooks,
                ret,
                isFunction,
                elem = this[0];

              if (!arguments.length) {
                if (elem) {
                  hooks =
                    jQuery.valHooks[elem.type] ||
                    jQuery.valHooks[elem.nodeName.toLowerCase()];

                  if (
                    hooks &&
                    "get" in hooks &&
                    (ret = hooks.get(elem, "value")) !== undefined
                  ) {
                    return ret;
                  }

                  ret = elem.value;

                  // Handle most common string cases
                  if (typeof ret === "string") {
                    return ret.replace(rreturn, "");
                  }

                  // Handle cases where value is null/undef or number
                  return ret == null ? "" : ret;
                }

                return;
              }

              isFunction = jQuery.isFunction(value);

              return this.each(function (i) {
                var val;

                if (this.nodeType !== 1) {
                  return;
                }

                if (isFunction) {
                  val = value.call(this, i, jQuery(this).val());
                } else {
                  val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                  val = "";
                } else if (typeof val === "number") {
                  val += "";
                } else if (Array.isArray(val)) {
                  val = jQuery.map(val, function (value) {
                    return value == null ? "" : value + "";
                  });
                }

                hooks =
                  jQuery.valHooks[this.type] ||
                  jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (
                  !hooks ||
                  !("set" in hooks) ||
                  hooks.set(this, val, "value") === undefined
                ) {
                  this.value = val;
                }
              });
            },
          });

          jQuery.extend({
            valHooks: {
              option: {
                get: function (elem) {
                  var val = jQuery.find.attr(elem, "value");
                  return val != null
                    ? val
                    : // Support: IE <=10 - 11 only
                      // option.text throws exceptions (#14686, #14858)
                      // Strip and collapse whitespace
                      // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                      stripAndCollapse(jQuery.text(elem));
                },
              },
              select: {
                get: function (elem) {
                  var value,
                    option,
                    i,
                    options = elem.options,
                    index = elem.selectedIndex,
                    one = elem.type === "select-one",
                    values = one ? null : [],
                    max = one ? index + 1 : options.length;

                  if (index < 0) {
                    i = max;
                  } else {
                    i = one ? index : 0;
                  }

                  // Loop through all the selected options
                  for (; i < max; i++) {
                    option = options[i];

                    // Support: IE <=9 only
                    // IE8-9 doesn't update selected after form reset (#2551)
                    if (
                      (option.selected || i === index) &&
                      // Don't return options that are disabled or in a disabled optgroup
                      !option.disabled &&
                      (!option.parentNode.disabled ||
                        !nodeName(option.parentNode, "optgroup"))
                    ) {
                      // Get the specific value for the option
                      value = jQuery(option).val();

                      // We don't need an array for one selects
                      if (one) {
                        return value;
                      }

                      // Multi-Selects return an array
                      values.push(value);
                    }
                  }

                  return values;
                },

                set: function (elem, value) {
                  var optionSet,
                    option,
                    options = elem.options,
                    values = jQuery.makeArray(value),
                    i = options.length;

                  while (i--) {
                    option = options[i];

                    /* eslint-disable no-cond-assign */

                    if (
                      (option.selected =
                        jQuery.inArray(
                          jQuery.valHooks.option.get(option),
                          values
                        ) > -1)
                    ) {
                      optionSet = true;
                    }

                    /* eslint-enable no-cond-assign */
                  }

                  // Force browsers to behave consistently when non-matching value is set
                  if (!optionSet) {
                    elem.selectedIndex = -1;
                  }
                  return values;
                },
              },
            },
          });

          // Radios and checkboxes getter/setter
          jQuery.each(["radio", "checkbox"], function () {
            jQuery.valHooks[this] = {
              set: function (elem, value) {
                if (Array.isArray(value)) {
                  return (elem.checked =
                    jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
              },
            };
            if (!support.checkOn) {
              jQuery.valHooks[this].get = function (elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
              };
            }
          });

          // Return jQuery for attributes-only inclusion

          var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

          jQuery.extend(jQuery.event, {
            trigger: function (event, data, elem, onlyHandlers) {
              var i,
                cur,
                tmp,
                bubbleType,
                ontype,
                handle,
                special,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace")
                  ? event.namespace.split(".")
                  : [];

              cur = tmp = elem = elem || document;

              // Don't do events on text and comment nodes
              if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
              }

              // focus/blur morphs to focusin/out; ensure we're not firing them right now
              if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
              }

              if (type.indexOf(".") > -1) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
              }
              ontype = type.indexOf(":") < 0 && "on" + type;

              // Caller can pass in a jQuery.Event object, Object, or just an event type string
              event = event[jQuery.expando]
                ? event
                : new jQuery.Event(type, typeof event === "object" && event);

              // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
              event.isTrigger = onlyHandlers ? 2 : 3;
              event.namespace = namespaces.join(".");
              event.rnamespace = event.namespace
                ? new RegExp(
                    "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"
                  )
                : null;

              // Clean up the event in case it is being reused
              event.result = undefined;
              if (!event.target) {
                event.target = elem;
              }

              // Clone any incoming data and prepend the event, creating the handler arg list
              data = data == null ? [event] : jQuery.makeArray(data, [event]);

              // Allow special events to draw outside the lines
              special = jQuery.event.special[type] || {};
              if (
                !onlyHandlers &&
                special.trigger &&
                special.trigger.apply(elem, data) === false
              ) {
                return;
              }

              // Determine event propagation path in advance, per W3C events spec (#9951)
              // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
              if (
                !onlyHandlers &&
                !special.noBubble &&
                !jQuery.isWindow(elem)
              ) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                  cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                  eventPath.push(cur);
                  tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                  eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
              }

              // Fire handlers on the event path
              i = 0;
              while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;

                // jQuery handler
                handle =
                  (dataPriv.get(cur, "events") || {})[event.type] &&
                  dataPriv.get(cur, "handle");
                if (handle) {
                  handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                  event.result = handle.apply(cur, data);
                  if (event.result === false) {
                    event.preventDefault();
                  }
                }
              }
              event.type = type;

              // If nobody prevented the default action, do it now
              if (!onlyHandlers && !event.isDefaultPrevented()) {
                if (
                  (!special._default ||
                    special._default.apply(eventPath.pop(), data) === false) &&
                  acceptData(elem)
                ) {
                  // Call a native DOM method on the target with the same name as the event.
                  // Don't do default actions on window, that's where global variables be (#6170)
                  if (
                    ontype &&
                    jQuery.isFunction(elem[type]) &&
                    !jQuery.isWindow(elem)
                  ) {
                    // Don't re-trigger an onFOO event when we call its FOO() method
                    tmp = elem[ontype];

                    if (tmp) {
                      elem[ontype] = null;
                    }

                    // Prevent re-triggering of the same event, since we already bubbled it above
                    jQuery.event.triggered = type;
                    elem[type]();
                    jQuery.event.triggered = undefined;

                    if (tmp) {
                      elem[ontype] = tmp;
                    }
                  }
                }
              }

              return event.result;
            },

            // Piggyback on a donor event to simulate a different one
            // Used only for `focus(in | out)` events
            simulate: function (type, elem, event) {
              var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
              });

              jQuery.event.trigger(e, null, elem);
            },
          });

          jQuery.fn.extend({
            trigger: function (type, data) {
              return this.each(function () {
                jQuery.event.trigger(type, data, this);
              });
            },
            triggerHandler: function (type, data) {
              var elem = this[0];
              if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
              }
            },
          });

          jQuery.each(
            (
              "blur focus focusin focusout resize scroll click dblclick " +
              "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
              "change select submit keydown keypress keyup contextmenu"
            ).split(" "),
            function (i, name) {
              // Handle event binding
              jQuery.fn[name] = function (data, fn) {
                return arguments.length > 0
                  ? this.on(name, null, data, fn)
                  : this.trigger(name);
              };
            }
          );

          jQuery.fn.extend({
            hover: function (fnOver, fnOut) {
              return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            },
          });

          support.focusin = "onfocusin" in window;

          // Support: Firefox <=44
          // Firefox doesn't have focus(in | out) events
          // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
          //
          // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
          // focus(in | out) events fire after focus & blur events,
          // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
          // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
          if (!support.focusin) {
            jQuery.each(
              { focus: "focusin", blur: "focusout" },
              function (orig, fix) {
                // Attach a single capturing handler on the document while someone wants focusin/focusout
                var handler = function (event) {
                  jQuery.event.simulate(
                    fix,
                    event.target,
                    jQuery.event.fix(event)
                  );
                };

                jQuery.event.special[fix] = {
                  setup: function () {
                    var doc = this.ownerDocument || this,
                      attaches = dataPriv.access(doc, fix);

                    if (!attaches) {
                      doc.addEventListener(orig, handler, true);
                    }
                    dataPriv.access(doc, fix, (attaches || 0) + 1);
                  },
                  teardown: function () {
                    var doc = this.ownerDocument || this,
                      attaches = dataPriv.access(doc, fix) - 1;

                    if (!attaches) {
                      doc.removeEventListener(orig, handler, true);
                      dataPriv.remove(doc, fix);
                    } else {
                      dataPriv.access(doc, fix, attaches);
                    }
                  },
                };
              }
            );
          }
          var location = window.location;

          var nonce = jQuery.now();

          var rquery = /\?/;

          // Cross-browser xml parsing
          jQuery.parseXML = function (data) {
            var xml;
            if (!data || typeof data !== "string") {
              return null;
            }

            // Support: IE 9 - 11 only
            // IE throws on parseFromString with invalid input.
            try {
              xml = new window.DOMParser().parseFromString(data, "text/xml");
            } catch (e) {
              xml = undefined;
            }

            if (!xml || xml.getElementsByTagName("parsererror").length) {
              jQuery.error("Invalid XML: " + data);
            }
            return xml;
          };

          var rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;

          function buildParams(prefix, obj, traditional, add) {
            var name;

            if (Array.isArray(obj)) {
              // Serialize array item.
              jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                  // Treat each array item as a scalar.
                  add(prefix, v);
                } else {
                  // Item is non-scalar (array or object), encode its numeric index.
                  buildParams(
                    prefix +
                      "[" +
                      (typeof v === "object" && v != null ? i : "") +
                      "]",
                    v,
                    traditional,
                    add
                  );
                }
              });
            } else if (!traditional && jQuery.type(obj) === "object") {
              // Serialize object item.
              for (name in obj) {
                buildParams(
                  prefix + "[" + name + "]",
                  obj[name],
                  traditional,
                  add
                );
              }
            } else {
              // Serialize scalar item.
              add(prefix, obj);
            }
          }

          // Serialize an array of form elements or a set of
          // key/values into a query string
          jQuery.param = function (a, traditional) {
            var prefix,
              s = [],
              add = function (key, valueOrFunction) {
                // If value is a function, invoke it and use its return value
                var value = jQuery.isFunction(valueOrFunction)
                  ? valueOrFunction()
                  : valueOrFunction;

                s[s.length] =
                  encodeURIComponent(key) +
                  "=" +
                  encodeURIComponent(value == null ? "" : value);
              };

            // If an array was passed in, assume that it is an array of form elements.
            if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
              // Serialize the form elements
              jQuery.each(a, function () {
                add(this.name, this.value);
              });
            } else {
              // If traditional, encode the "old" way (the way 1.3.2 or older
              // did it), otherwise encode params recursively.
              for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
              }
            }

            // Return the resulting serialization
            return s.join("&");
          };

          jQuery.fn.extend({
            serialize: function () {
              return jQuery.param(this.serializeArray());
            },
            serializeArray: function () {
              return this.map(function () {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
              })
                .filter(function () {
                  var type = this.type;

                  // Use .is( ":disabled" ) so that fieldset[disabled] works
                  return (
                    this.name &&
                    !jQuery(this).is(":disabled") &&
                    rsubmittable.test(this.nodeName) &&
                    !rsubmitterTypes.test(type) &&
                    (this.checked || !rcheckableType.test(type))
                  );
                })
                .map(function (i, elem) {
                  var val = jQuery(this).val();

                  if (val == null) {
                    return null;
                  }

                  if (Array.isArray(val)) {
                    return jQuery.map(val, function (val) {
                      return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n"),
                      };
                    });
                  }

                  return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                })
                .get();
            },
          });

          var r20 = /%20/g,
            rhash = /#.*$/,
            rantiCache = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            // #7653, #8125, #8152: local protocol detection
            rlocalProtocol =
              /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            /* Prefilters
             * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
             * 2) These are called:
             *    - BEFORE asking for a transport
             *    - AFTER param serialization (s.data is a string if s.processData is true)
             * 3) key is the dataType
             * 4) the catchall symbol "*" can be used
             * 5) execution will start with transport dataType and THEN continue down to "*" if needed
             */
            prefilters = {},
            /* Transports bindings
             * 1) key is the dataType
             * 2) the catchall symbol "*" can be used
             * 3) selection will start with transport dataType and THEN go to "*" if needed
             */
            transports = {},
            // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
            allTypes = "*/".concat("*"),
            // Anchor tag for parsing the document origin
            originAnchor = document.createElement("a");
          originAnchor.href = location.href;

          // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
          function addToPrefiltersOrTransports(structure) {
            // dataTypeExpression is optional and defaults to "*"
            return function (dataTypeExpression, func) {
              if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
              }

              var dataType,
                i = 0,
                dataTypes =
                  dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

              if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {
                  // Prepend if requested
                  if (dataType[0] === "+") {
                    dataType = dataType.slice(1) || "*";
                    (structure[dataType] = structure[dataType] || []).unshift(
                      func
                    );

                    // Otherwise append
                  } else {
                    (structure[dataType] = structure[dataType] || []).push(
                      func
                    );
                  }
                }
              }
            };
          }

          // Base inspection function for prefilters and transports
          function inspectPrefiltersOrTransports(
            structure,
            options,
            originalOptions,
            jqXHR
          ) {
            var inspected = {},
              seekingTransport = structure === transports;

            function inspect(dataType) {
              var selected;
              inspected[dataType] = true;
              jQuery.each(
                structure[dataType] || [],
                function (_, prefilterOrFactory) {
                  var dataTypeOrTransport = prefilterOrFactory(
                    options,
                    originalOptions,
                    jqXHR
                  );
                  if (
                    typeof dataTypeOrTransport === "string" &&
                    !seekingTransport &&
                    !inspected[dataTypeOrTransport]
                  ) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                  } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                  }
                }
              );
              return selected;
            }

            return (
              inspect(options.dataTypes[0]) || (!inspected["*"] && inspect("*"))
            );
          }

          // A special extend for ajax options
          // that takes "flat" options (not to be deep extended)
          // Fixes #9887
          function ajaxExtend(target, src) {
            var key,
              deep,
              flatOptions = jQuery.ajaxSettings.flatOptions || {};

            for (key in src) {
              if (src[key] !== undefined) {
                (flatOptions[key] ? target : deep || (deep = {}))[key] =
                  src[key];
              }
            }
            if (deep) {
              jQuery.extend(true, target, deep);
            }

            return target;
          }

          /* Handles responses to an ajax request:
           * - finds the right dataType (mediates between content-type and expected dataType)
           * - returns the corresponding response
           */
          function ajaxHandleResponses(s, jqXHR, responses) {
            var ct,
              type,
              finalDataType,
              firstDataType,
              contents = s.contents,
              dataTypes = s.dataTypes;

            // Remove auto dataType and get content-type in the process
            while (dataTypes[0] === "*") {
              dataTypes.shift();
              if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
              }
            }

            // Check if we're dealing with a known content-type
            if (ct) {
              for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                  dataTypes.unshift(type);
                  break;
                }
              }
            }

            // Check to see if we have a response for the expected dataType
            if (dataTypes[0] in responses) {
              finalDataType = dataTypes[0];
            } else {
              // Try convertible dataTypes
              for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                  finalDataType = type;
                  break;
                }
                if (!firstDataType) {
                  firstDataType = type;
                }
              }

              // Or just use first one
              finalDataType = finalDataType || firstDataType;
            }

            // If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            if (finalDataType) {
              if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
              }
              return responses[finalDataType];
            }
          }

          /* Chain conversions given the request and the original response
           * Also sets the responseXXX fields on the jqXHR instance
           */
          function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2,
              current,
              conv,
              tmp,
              prev,
              converters = {},
              // Work with a copy of dataTypes in case we need to modify it for conversion
              dataTypes = s.dataTypes.slice();

            // Create converters map with lowercased keys
            if (dataTypes[1]) {
              for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
              }
            }

            current = dataTypes.shift();

            // Convert to each sequential dataType
            while (current) {
              if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
              }

              // Apply the dataFilter if provided
              if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
              }

              prev = current;
              current = dataTypes.shift();

              if (current) {
                // There's only work to do if current dataType is non-auto
                if (current === "*") {
                  current = prev;

                  // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {
                  // Seek a direct converter
                  conv =
                    converters[prev + " " + current] ||
                    converters["* " + current];

                  // If none found, seek a pair
                  if (!conv) {
                    for (conv2 in converters) {
                      // If conv2 outputs current
                      tmp = conv2.split(" ");
                      if (tmp[1] === current) {
                        // If prev can be converted to accepted input
                        conv =
                          converters[prev + " " + tmp[0]] ||
                          converters["* " + tmp[0]];
                        if (conv) {
                          // Condense equivalence converters
                          if (conv === true) {
                            conv = converters[conv2];

                            // Otherwise, insert the intermediate dataType
                          } else if (converters[conv2] !== true) {
                            current = tmp[0];
                            dataTypes.unshift(tmp[1]);
                          }
                          break;
                        }
                      }
                    }
                  }

                  // Apply converter (if not an equivalence)
                  if (conv !== true) {
                    // Unless errors are allowed to bubble, catch and return them
                    if (conv && s.throws) {
                      response = conv(response);
                    } else {
                      try {
                        response = conv(response);
                      } catch (e) {
                        return {
                          state: "parsererror",
                          error: conv
                            ? e
                            : "No conversion from " + prev + " to " + current,
                        };
                      }
                    }
                  }
                }
              }
            }

            return { state: "success", data: response };
          }

          jQuery.extend({
            // Counter for holding the number of active queries
            active: 0,

            // Last-Modified header cache for next request
            lastModified: {},
            etag: {},

            ajaxSettings: {
              url: location.href,
              type: "GET",
              isLocal: rlocalProtocol.test(location.protocol),
              global: true,
              processData: true,
              async: true,
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",

              /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

              accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
              },

              contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/,
              },

              responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON",
              },

              // Data converters
              // Keys separate source (or catchall "*") and destination types with a single space
              converters: {
                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML,
              },

              // For options that shouldn't be deep extended:
              // you can add your own custom options here if
              // and when you create one that shouldn't be
              // deep extended (see ajaxExtend)
              flatOptions: {
                url: true,
                context: true,
              },
            },

            // Creates a full fledged settings object into target
            // with both ajaxSettings and settings fields.
            // If target is omitted, writes into ajaxSettings.
            ajaxSetup: function (target, settings) {
              return settings
                ? // Building a settings object
                  ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
                : // Extending ajaxSettings
                  ajaxExtend(jQuery.ajaxSettings, target);
            },

            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),

            // Main method
            ajax: function (url, options) {
              // If url is an object, simulate pre-1.5 signature
              if (typeof url === "object") {
                options = url;
                url = undefined;
              }

              // Force options to be an object
              options = options || {};

              var transport,
                // URL without anti-cache param
                cacheURL,
                // Response headers
                responseHeadersString,
                responseHeaders,
                // timeout handle
                timeoutTimer,
                // Url cleanup var
                urlAnchor,
                // Request state (becomes false upon send and true upon completion)
                completed,
                // To know if global events are to be dispatched
                fireGlobals,
                // Loop variable
                i,
                // uncached part of the url
                uncached,
                // Create the final options object
                s = jQuery.ajaxSetup({}, options),
                // Callbacks context
                callbackContext = s.context || s,
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext =
                  s.context &&
                  (callbackContext.nodeType || callbackContext.jquery)
                    ? jQuery(callbackContext)
                    : jQuery.event,
                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                // Status-dependent callbacks
                statusCode = s.statusCode || {},
                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
                // Default abort message
                strAbort = "canceled",
                // Fake xhr
                jqXHR = {
                  readyState: 0,

                  // Builds headers hashtable if needed
                  getResponseHeader: function (key) {
                    var match;
                    if (completed) {
                      if (!responseHeaders) {
                        responseHeaders = {};
                        while ((match = rheaders.exec(responseHeadersString))) {
                          responseHeaders[match[1].toLowerCase()] = match[2];
                        }
                      }
                      match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                  },

                  // Raw string
                  getAllResponseHeaders: function () {
                    return completed ? responseHeadersString : null;
                  },

                  // Caches the header
                  setRequestHeader: function (name, value) {
                    if (completed == null) {
                      name = requestHeadersNames[name.toLowerCase()] =
                        requestHeadersNames[name.toLowerCase()] || name;
                      requestHeaders[name] = value;
                    }
                    return this;
                  },

                  // Overrides response content-type header
                  overrideMimeType: function (type) {
                    if (completed == null) {
                      s.mimeType = type;
                    }
                    return this;
                  },

                  // Status-dependent callbacks
                  statusCode: function (map) {
                    var code;
                    if (map) {
                      if (completed) {
                        // Execute the appropriate callbacks
                        jqXHR.always(map[jqXHR.status]);
                      } else {
                        // Lazy-add the new callbacks in a way that preserves old ones
                        for (code in map) {
                          statusCode[code] = [statusCode[code], map[code]];
                        }
                      }
                    }
                    return this;
                  },

                  // Cancel the request
                  abort: function (statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                      transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                  },
                };

              // Attach deferreds
              deferred.promise(jqXHR);

              // Add protocol if not provided (prefilters might expect it)
              // Handle falsy url in the settings object (#10093: consistency with old signature)
              // We also use the url parameter if available
              s.url = ((url || s.url || location.href) + "").replace(
                rprotocol,
                location.protocol + "//"
              );

              // Alias method option to type as per ticket #12004
              s.type = options.method || options.type || s.method || s.type;

              // Extract dataTypes list
              s.dataTypes = (s.dataType || "*")
                .toLowerCase()
                .match(rnothtmlwhite) || [""];

              // A cross-domain request is in order when the origin doesn't match the current origin.
              if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");

                // Support: IE <=8 - 11, Edge 12 - 13
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                  urlAnchor.href = s.url;

                  // Support: IE <=8 - 11 only
                  // Anchor's host property isn't correctly set when s.url is relative
                  urlAnchor.href = urlAnchor.href;
                  s.crossDomain =
                    originAnchor.protocol + "//" + originAnchor.host !==
                    urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {
                  // If there is an error parsing the URL, assume it is crossDomain,
                  // it can be rejected by the transport if it is invalid
                  s.crossDomain = true;
                }
              }

              // Convert data if not already a string
              if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
              }

              // Apply prefilters
              inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

              // If request was aborted inside a prefilter, stop there
              if (completed) {
                return jqXHR;
              }

              // We can fire global events as of now if asked to
              // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
              fireGlobals = jQuery.event && s.global;

              // Watch for a new set of requests
              if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
              }

              // Uppercase the type
              s.type = s.type.toUpperCase();

              // Determine if request has content
              s.hasContent = !rnoContent.test(s.type);

              // Save the URL in case we're toying with the If-Modified-Since
              // and/or If-None-Match header later on
              // Remove hash to simplify url manipulation
              cacheURL = s.url.replace(rhash, "");

              // More options handling for requests with no content
              if (!s.hasContent) {
                // Remember the hash so we can put it back
                uncached = s.url.slice(cacheURL.length);

                // If data is available, append data to url
                if (s.data) {
                  cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

                  // #9682: remove data so that it's not used in an eventual retry
                  delete s.data;
                }

                // Add or update anti-cache param if needed
                if (s.cache === false) {
                  cacheURL = cacheURL.replace(rantiCache, "$1");
                  uncached =
                    (rquery.test(cacheURL) ? "&" : "?") +
                    "_=" +
                    nonce++ +
                    uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
              } else if (
                s.data &&
                s.processData &&
                (s.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) === 0
              ) {
                s.data = s.data.replace(r20, "+");
              }

              // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
              if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                  jqXHR.setRequestHeader(
                    "If-Modified-Since",
                    jQuery.lastModified[cacheURL]
                  );
                }
                if (jQuery.etag[cacheURL]) {
                  jqXHR.setRequestHeader(
                    "If-None-Match",
                    jQuery.etag[cacheURL]
                  );
                }
              }

              // Set the correct header, if data is being sent
              if (
                (s.data && s.hasContent && s.contentType !== false) ||
                options.contentType
              ) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
              }

              // Set the Accepts header for the server, depending on the dataType
              jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]]
                  ? s.accepts[s.dataTypes[0]] +
                      (s.dataTypes[0] !== "*"
                        ? ", " + allTypes + "; q=0.01"
                        : "")
                  : s.accepts["*"]
              );

              // Check for headers option
              for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
              }

              // Allow custom headers/mimetypes and early abort
              if (
                s.beforeSend &&
                (s.beforeSend.call(callbackContext, jqXHR, s) === false ||
                  completed)
              ) {
                // Abort if not done already and return
                return jqXHR.abort();
              }

              // Aborting is no longer a cancellation
              strAbort = "abort";

              // Install callbacks on deferreds
              completeDeferred.add(s.complete);
              jqXHR.done(s.success);
              jqXHR.fail(s.error);

              // Get transport
              transport = inspectPrefiltersOrTransports(
                transports,
                s,
                options,
                jqXHR
              );

              // If no transport, we auto-abort
              if (!transport) {
                done(-1, "No Transport");
              } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                  globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }

                // If request was aborted inside ajaxSend, stop there
                if (completed) {
                  return jqXHR;
                }

                // Timeout
                if (s.async && s.timeout > 0) {
                  timeoutTimer = window.setTimeout(function () {
                    jqXHR.abort("timeout");
                  }, s.timeout);
                }

                try {
                  completed = false;
                  transport.send(requestHeaders, done);
                } catch (e) {
                  // Rethrow post-completion exceptions
                  if (completed) {
                    throw e;
                  }

                  // Propagate others as results
                  done(-1, e);
                }
              }

              // Callback for when everything is done
              function done(status, nativeStatusText, responses, headers) {
                var isSuccess,
                  success,
                  error,
                  response,
                  modified,
                  statusText = nativeStatusText;

                // Ignore repeat invocations
                if (completed) {
                  return;
                }

                completed = true;

                // Clear timeout if it exists
                if (timeoutTimer) {
                  window.clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = (status >= 200 && status < 300) || status === 304;

                // Get response data
                if (responses) {
                  response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {
                  // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                  if (s.ifModified) {
                    modified = jqXHR.getResponseHeader("Last-Modified");
                    if (modified) {
                      jQuery.lastModified[cacheURL] = modified;
                    }
                    modified = jqXHR.getResponseHeader("etag");
                    if (modified) {
                      jQuery.etag[cacheURL] = modified;
                    }
                  }

                  // if no content
                  if (status === 204 || s.type === "HEAD") {
                    statusText = "nocontent";

                    // if not modified
                  } else if (status === 304) {
                    statusText = "notmodified";

                    // If we have data, let's convert it
                  } else {
                    statusText = response.state;
                    success = response.data;
                    error = response.error;
                    isSuccess = !error;
                  }
                } else {
                  // Extract error from statusText and normalize for non-aborts
                  error = statusText;
                  if (status || !statusText) {
                    statusText = "error";
                    if (status < 0) {
                      status = 0;
                    }
                  }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                  deferred.resolveWith(callbackContext, [
                    success,
                    statusText,
                    jqXHR,
                  ]);
                } else {
                  deferred.rejectWith(callbackContext, [
                    jqXHR,
                    statusText,
                    error,
                  ]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                  globalEventContext.trigger(
                    isSuccess ? "ajaxSuccess" : "ajaxError",
                    [jqXHR, s, isSuccess ? success : error]
                  );
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                  globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

                  // Handle the global AJAX counter
                  if (!--jQuery.active) {
                    jQuery.event.trigger("ajaxStop");
                  }
                }
              }

              return jqXHR;
            },

            getJSON: function (url, data, callback) {
              return jQuery.get(url, data, callback, "json");
            },

            getScript: function (url, callback) {
              return jQuery.get(url, undefined, callback, "script");
            },
          });

          jQuery.each(["get", "post"], function (i, method) {
            jQuery[method] = function (url, data, callback, type) {
              // Shift arguments if data argument was omitted
              if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
              }

              // The url can be an options object (which then must have .url)
              return jQuery.ajax(
                jQuery.extend(
                  {
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback,
                  },
                  jQuery.isPlainObject(url) && url
                )
              );
            };
          });

          jQuery._evalUrl = function (url) {
            return jQuery.ajax({
              url: url,

              // Make this explicit, since user can override this through ajaxSetup (#11264)
              type: "GET",
              dataType: "script",
              cache: true,
              async: false,
              global: false,
              throws: true,
            });
          };

          jQuery.fn.extend({
            wrapAll: function (html) {
              var wrap;

              if (this[0]) {
                if (jQuery.isFunction(html)) {
                  html = html.call(this[0]);
                }

                // The elements to wrap the target around
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                  wrap.insertBefore(this[0]);
                }

                wrap
                  .map(function () {
                    var elem = this;

                    while (elem.firstElementChild) {
                      elem = elem.firstElementChild;
                    }

                    return elem;
                  })
                  .append(this);
              }

              return this;
            },

            wrapInner: function (html) {
              if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                  jQuery(this).wrapInner(html.call(this, i));
                });
              }

              return this.each(function () {
                var self = jQuery(this),
                  contents = self.contents();

                if (contents.length) {
                  contents.wrapAll(html);
                } else {
                  self.append(html);
                }
              });
            },

            wrap: function (html) {
              var isFunction = jQuery.isFunction(html);

              return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
              });
            },

            unwrap: function (selector) {
              this.parent(selector)
                .not("body")
                .each(function () {
                  jQuery(this).replaceWith(this.childNodes);
                });
              return this;
            },
          });

          jQuery.expr.pseudos.hidden = function (elem) {
            return !jQuery.expr.pseudos.visible(elem);
          };
          jQuery.expr.pseudos.visible = function (elem) {
            return !!(
              elem.offsetWidth ||
              elem.offsetHeight ||
              elem.getClientRects().length
            );
          };

          jQuery.ajaxSettings.xhr = function () {
            try {
              return new window.XMLHttpRequest();
            } catch (e) {}
          };

          var xhrSuccessStatus = {
              // File protocol always yields status code 0, assume 200
              0: 200,

              // Support: IE <=9 only
              // #1450: sometimes IE returns 1223 when it should be 204
              1223: 204,
            },
            xhrSupported = jQuery.ajaxSettings.xhr();

          support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
          support.ajax = xhrSupported = !!xhrSupported;

          jQuery.ajaxTransport(function (options) {
            var callback, errorCallback;

            // Cross domain only allowed if supported through XMLHttpRequest
            if (support.cors || (xhrSupported && !options.crossDomain)) {
              return {
                send: function (headers, complete) {
                  var i,
                    xhr = options.xhr();

                  xhr.open(
                    options.type,
                    options.url,
                    options.async,
                    options.username,
                    options.password
                  );

                  // Apply custom fields if provided
                  if (options.xhrFields) {
                    for (i in options.xhrFields) {
                      xhr[i] = options.xhrFields[i];
                    }
                  }

                  // Override mime type if needed
                  if (options.mimeType && xhr.overrideMimeType) {
                    xhr.overrideMimeType(options.mimeType);
                  }

                  // X-Requested-With header
                  // For cross-domain requests, seeing as conditions for a preflight are
                  // akin to a jigsaw puzzle, we simply never set it to be sure.
                  // (it can always be set on a per-request basis or even using ajaxSetup)
                  // For same-domain requests, won't change header if already provided.
                  if (!options.crossDomain && !headers["X-Requested-With"]) {
                    headers["X-Requested-With"] = "XMLHttpRequest";
                  }

                  // Set headers
                  for (i in headers) {
                    xhr.setRequestHeader(i, headers[i]);
                  }

                  // Callback
                  callback = function (type) {
                    return function () {
                      if (callback) {
                        callback =
                          errorCallback =
                          xhr.onload =
                          xhr.onerror =
                          xhr.onabort =
                          xhr.onreadystatechange =
                            null;

                        if (type === "abort") {
                          xhr.abort();
                        } else if (type === "error") {
                          // Support: IE <=9 only
                          // On a manual native abort, IE9 throws
                          // errors on any property access that is not readyState
                          if (typeof xhr.status !== "number") {
                            complete(0, "error");
                          } else {
                            complete(
                              // File: protocol always yields status 0; see #8605, #14207
                              xhr.status,
                              xhr.statusText
                            );
                          }
                        } else {
                          complete(
                            xhrSuccessStatus[xhr.status] || xhr.status,
                            xhr.statusText,

                            // Support: IE <=9 only
                            // IE9 has no XHR2 but throws on binary (trac-11426)
                            // For XHR2 non-text, let the caller handle it (gh-2498)
                            (xhr.responseType || "text") !== "text" ||
                              typeof xhr.responseText !== "string"
                              ? { binary: xhr.response }
                              : { text: xhr.responseText },
                            xhr.getAllResponseHeaders()
                          );
                        }
                      }
                    };
                  };

                  // Listen to events
                  xhr.onload = callback();
                  errorCallback = xhr.onerror = callback("error");

                  // Support: IE 9 only
                  // Use onreadystatechange to replace onabort
                  // to handle uncaught aborts
                  if (xhr.onabort !== undefined) {
                    xhr.onabort = errorCallback;
                  } else {
                    xhr.onreadystatechange = function () {
                      // Check readyState before timeout as it changes
                      if (xhr.readyState === 4) {
                        // Allow onerror to be called first,
                        // but that will not handle a native abort
                        // Also, save errorCallback to a variable
                        // as xhr.onerror cannot be accessed
                        window.setTimeout(function () {
                          if (callback) {
                            errorCallback();
                          }
                        });
                      }
                    };
                  }

                  // Create the abort callback
                  callback = callback("abort");

                  try {
                    // Do send the request (this may raise an exception)
                    xhr.send((options.hasContent && options.data) || null);
                  } catch (e) {
                    // #14683: Only rethrow if this hasn't been notified as an error yet
                    if (callback) {
                      throw e;
                    }
                  }
                },

                abort: function () {
                  if (callback) {
                    callback();
                  }
                },
              };
            }
          });

          // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
          jQuery.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
              s.contents.script = false;
            }
          });

          // Install script dataType
          jQuery.ajaxSetup({
            accepts: {
              script:
                "text/javascript, application/javascript, " +
                "application/ecmascript, application/x-ecmascript",
            },
            contents: {
              script: /\b(?:java|ecma)script\b/,
            },
            converters: {
              "text script": function (text) {
                jQuery.globalEval(text);
                return text;
              },
            },
          });

          // Handle cache's special case and crossDomain
          jQuery.ajaxPrefilter("script", function (s) {
            if (s.cache === undefined) {
              s.cache = false;
            }
            if (s.crossDomain) {
              s.type = "GET";
            }
          });

          // Bind script tag hack transport
          jQuery.ajaxTransport("script", function (s) {
            // This transport only deals with cross domain requests
            if (s.crossDomain) {
              var script, callback;
              return {
                send: function (_, complete) {
                  script = jQuery("<script>")
                    .prop({
                      charset: s.scriptCharset,
                      src: s.url,
                    })
                    .on(
                      "load error",
                      (callback = function (evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                          complete(evt.type === "error" ? 404 : 200, evt.type);
                        }
                      })
                    );

                  // Use native DOM manipulation to avoid our domManip AJAX trickery
                  document.head.appendChild(script[0]);
                },
                abort: function () {
                  if (callback) {
                    callback();
                  }
                },
              };
            }
          });

          var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;

          // Default jsonp settings
          jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var callback =
                oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
              this[callback] = true;
              return callback;
            },
          });

          // Detect, normalize options and install callbacks for jsonp requests
          jQuery.ajaxPrefilter(
            "json jsonp",
            function (s, originalSettings, jqXHR) {
              var callbackName,
                overwritten,
                responseContainer,
                jsonProp =
                  s.jsonp !== false &&
                  (rjsonp.test(s.url)
                    ? "url"
                    : typeof s.data === "string" &&
                      (s.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) === 0 &&
                      rjsonp.test(s.data) &&
                      "data");

              // Handle iff the expected data type is "jsonp" or we have a parameter to set
              if (jsonProp || s.dataTypes[0] === "jsonp") {
                // Get callback name, remembering preexisting value associated with it
                callbackName = s.jsonpCallback = jQuery.isFunction(
                  s.jsonpCallback
                )
                  ? s.jsonpCallback()
                  : s.jsonpCallback;

                // Insert callback into url or form data
                if (jsonProp) {
                  s[jsonProp] = s[jsonProp].replace(
                    rjsonp,
                    "$1" + callbackName
                  );
                } else if (s.jsonp !== false) {
                  s.url +=
                    (rquery.test(s.url) ? "&" : "?") +
                    s.jsonp +
                    "=" +
                    callbackName;
                }

                // Use data converter to retrieve json after script execution
                s.converters["script json"] = function () {
                  if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                  }
                  return responseContainer[0];
                };

                // Force json dataType
                s.dataTypes[0] = "json";

                // Install callback
                overwritten = window[callbackName];
                window[callbackName] = function () {
                  responseContainer = arguments;
                };

                // Clean-up function (fires after converters)
                jqXHR.always(function () {
                  // If previous value didn't exist - remove it
                  if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);

                    // Otherwise restore preexisting value
                  } else {
                    window[callbackName] = overwritten;
                  }

                  // Save back as free
                  if (s[callbackName]) {
                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push(callbackName);
                  }

                  // Call if it was a function and we have a response
                  if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                  }

                  responseContainer = overwritten = undefined;
                });

                // Delegate to script
                return "script";
              }
            }
          );

          // Support: Safari 8 only
          // In Safari 8 documents created via document.implementation.createHTMLDocument
          // collapse sibling forms: the second one becomes a child of the first one.
          // Because of that, this security measure has to be disabled in Safari 8.
          // https://bugs.webkit.org/show_bug.cgi?id=137337
          support.createHTMLDocument = (function () {
            var body = document.implementation.createHTMLDocument("").body;
            body.innerHTML = "<form></form><form></form>";
            return body.childNodes.length === 2;
          })();

          // Argument "data" should be string of html
          // context (optional): If specified, the fragment will be created in this context,
          // defaults to document
          // keepScripts (optional): If true, will include scripts passed in the html string
          jQuery.parseHTML = function (data, context, keepScripts) {
            if (typeof data !== "string") {
              return [];
            }
            if (typeof context === "boolean") {
              keepScripts = context;
              context = false;
            }

            var base, parsed, scripts;

            if (!context) {
              // Stop scripts or inline event handlers from being executed immediately
              // by using document.implementation
              if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument("");

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement("base");
                base.href = document.location.href;
                context.head.appendChild(base);
              } else {
                context = document;
              }
            }

            parsed = rsingleTag.exec(data);
            scripts = !keepScripts && [];

            // Single tag
            if (parsed) {
              return [context.createElement(parsed[1])];
            }

            parsed = buildFragment([data], context, scripts);

            if (scripts && scripts.length) {
              jQuery(scripts).remove();
            }

            return jQuery.merge([], parsed.childNodes);
          };

          /**
           * Load a url into a page
           */
          jQuery.fn.load = function (url, params, callback) {
            var selector,
              type,
              response,
              self = this,
              off = url.indexOf(" ");

            if (off > -1) {
              selector = stripAndCollapse(url.slice(off));
              url = url.slice(0, off);
            }

            // If it's a function
            if (jQuery.isFunction(params)) {
              // We assume that it's the callback
              callback = params;
              params = undefined;

              // Otherwise, build a param string
            } else if (params && typeof params === "object") {
              type = "POST";
            }

            // If we have elements to modify, make the request
            if (self.length > 0) {
              jQuery
                .ajax({
                  url: url,

                  // If "type" variable is undefined, then "GET" method will be used.
                  // Make value of this field explicit since
                  // user can override it through ajaxSetup method
                  type: type || "GET",
                  dataType: "html",
                  data: params,
                })
                .done(function (responseText) {
                  // Save response for use in complete callback
                  response = arguments;

                  self.html(
                    selector
                      ? // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery("<div>")
                          .append(jQuery.parseHTML(responseText))
                          .find(selector)
                      : // Otherwise use the full result
                        responseText
                  );

                  // If the request succeeds, this function gets "data", "status", "jqXHR"
                  // but they are ignored because response was set above.
                  // If it fails, this function gets "jqXHR", "status", "error"
                })
                .always(
                  callback &&
                    function (jqXHR, status) {
                      self.each(function () {
                        callback.apply(
                          this,
                          response || [jqXHR.responseText, status, jqXHR]
                        );
                      });
                    }
                );
            }

            return this;
          };

          // Attach a bunch of functions for handling common AJAX events
          jQuery.each(
            [
              "ajaxStart",
              "ajaxStop",
              "ajaxComplete",
              "ajaxError",
              "ajaxSuccess",
              "ajaxSend",
            ],
            function (i, type) {
              jQuery.fn[type] = function (fn) {
                return this.on(type, fn);
              };
            }
          );

          jQuery.expr.pseudos.animated = function (elem) {
            return jQuery.grep(jQuery.timers, function (fn) {
              return elem === fn.elem;
            }).length;
          };

          jQuery.offset = {
            setOffset: function (elem, options, i) {
              var curPosition,
                curLeft,
                curCSSTop,
                curTop,
                curOffset,
                curCSSLeft,
                calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

              // Set position first, in-case top/left are set even on static elem
              if (position === "static") {
                elem.style.position = "relative";
              }

              curOffset = curElem.offset();
              curCSSTop = jQuery.css(elem, "top");
              curCSSLeft = jQuery.css(elem, "left");
              calculatePosition =
                (position === "absolute" || position === "fixed") &&
                (curCSSTop + curCSSLeft).indexOf("auto") > -1;

              // Need to be able to calculate position if either
              // top or left is auto and position is either absolute or fixed
              if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
              } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
              }

              if (jQuery.isFunction(options)) {
                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call(elem, i, jQuery.extend({}, curOffset));
              }

              if (options.top != null) {
                props.top = options.top - curOffset.top + curTop;
              }
              if (options.left != null) {
                props.left = options.left - curOffset.left + curLeft;
              }

              if ("using" in options) {
                options.using.call(elem, props);
              } else {
                curElem.css(props);
              }
            },
          };

          jQuery.fn.extend({
            offset: function (options) {
              // Preserve chaining for setter
              if (arguments.length) {
                return options === undefined
                  ? this
                  : this.each(function (i) {
                      jQuery.offset.setOffset(this, options, i);
                    });
              }

              var doc,
                docElem,
                rect,
                win,
                elem = this[0];

              if (!elem) {
                return;
              }

              // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
              // Support: IE <=11 only
              // Running getBoundingClientRect on a
              // disconnected node in IE throws an error
              if (!elem.getClientRects().length) {
                return { top: 0, left: 0 };
              }

              rect = elem.getBoundingClientRect();

              doc = elem.ownerDocument;
              docElem = doc.documentElement;
              win = doc.defaultView;

              return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft,
              };
            },

            position: function () {
              if (!this[0]) {
                return;
              }

              var offsetParent,
                offset,
                elem = this[0],
                parentOffset = { top: 0, left: 0 };

              // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
              // because it is its only offset parent
              if (jQuery.css(elem, "position") === "fixed") {
                // Assume getBoundingClientRect is there when computed position is fixed
                offset = elem.getBoundingClientRect();
              } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if (!nodeName(offsetParent[0], "html")) {
                  parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset = {
                  top:
                    parentOffset.top +
                    jQuery.css(offsetParent[0], "borderTopWidth", true),
                  left:
                    parentOffset.left +
                    jQuery.css(offsetParent[0], "borderLeftWidth", true),
                };
              }

              // Subtract parent offsets and element margins
              return {
                top:
                  offset.top -
                  parentOffset.top -
                  jQuery.css(elem, "marginTop", true),
                left:
                  offset.left -
                  parentOffset.left -
                  jQuery.css(elem, "marginLeft", true),
              };
            },

            // This method will return documentElement in the following cases:
            // 1) For the element inside the iframe without offsetParent, this method will return
            //    documentElement of the parent window
            // 2) For the hidden or detached element
            // 3) For body or html element, i.e. in case of the html node - it will return itself
            //
            // but those exceptions were never presented as a real life use-cases
            // and might be considered as more preferable results.
            //
            // This logic, however, is not guaranteed and can change at any point in the future
            offsetParent: function () {
              return this.map(function () {
                var offsetParent = this.offsetParent;

                while (
                  offsetParent &&
                  jQuery.css(offsetParent, "position") === "static"
                ) {
                  offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
              });
            },
          });

          // Create scrollLeft and scrollTop methods
          jQuery.each(
            { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function (method, prop) {
              var top = "pageYOffset" === prop;

              jQuery.fn[method] = function (val) {
                return access(
                  this,
                  function (elem, method, val) {
                    // Coalesce documents and windows
                    var win;
                    if (jQuery.isWindow(elem)) {
                      win = elem;
                    } else if (elem.nodeType === 9) {
                      win = elem.defaultView;
                    }

                    if (val === undefined) {
                      return win ? win[prop] : elem[method];
                    }

                    if (win) {
                      win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                      );
                    } else {
                      elem[method] = val;
                    }
                  },
                  method,
                  val,
                  arguments.length
                );
              };
            }
          );

          // Support: Safari <=7 - 9.1, Chrome <=37 - 49
          // Add the top/left cssHooks using jQuery.fn.position
          // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
          // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
          // getComputedStyle returns percent when specified for top/left/bottom/right;
          // rather than make the css module depend on the offset module, just check for it here
          jQuery.each(["top", "left"], function (i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(
              support.pixelPosition,
              function (elem, computed) {
                if (computed) {
                  computed = curCSS(elem, prop);

                  // If curCSS returns percentage, fallback to offset
                  return rnumnonpx.test(computed)
                    ? jQuery(elem).position()[prop] + "px"
                    : computed;
                }
              }
            );
          });

          // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
          jQuery.each(
            { Height: "height", Width: "width" },
            function (name, type) {
              jQuery.each(
                { padding: "inner" + name, content: type, "": "outer" + name },
                function (defaultExtra, funcName) {
                  // Margin is only for outerHeight, outerWidth
                  jQuery.fn[funcName] = function (margin, value) {
                    var chainable =
                        arguments.length &&
                        (defaultExtra || typeof margin !== "boolean"),
                      extra =
                        defaultExtra ||
                        (margin === true || value === true
                          ? "margin"
                          : "border");

                    return access(
                      this,
                      function (elem, type, value) {
                        var doc;

                        if (jQuery.isWindow(elem)) {
                          // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                          return funcName.indexOf("outer") === 0
                            ? elem["inner" + name]
                            : elem.document.documentElement["client" + name];
                        }

                        // Get document width or height
                        if (elem.nodeType === 9) {
                          doc = elem.documentElement;

                          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                          // whichever is greatest
                          return Math.max(
                            elem.body["scroll" + name],
                            doc["scroll" + name],
                            elem.body["offset" + name],
                            doc["offset" + name],
                            doc["client" + name]
                          );
                        }

                        return value === undefined
                          ? // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra)
                          : // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                      },
                      type,
                      chainable ? margin : undefined,
                      chainable
                    );
                  };
                }
              );
            }
          );

          jQuery.fn.extend({
            bind: function (types, data, fn) {
              return this.on(types, null, data, fn);
            },
            unbind: function (types, fn) {
              return this.off(types, null, fn);
            },

            delegate: function (selector, types, data, fn) {
              return this.on(types, selector, data, fn);
            },
            undelegate: function (selector, types, fn) {
              // ( namespace ) or ( selector, types [, fn] )
              return arguments.length === 1
                ? this.off(selector, "**")
                : this.off(types, selector || "**", fn);
            },
          });

          jQuery.holdReady = function (hold) {
            if (hold) {
              jQuery.readyWait++;
            } else {
              jQuery.ready(true);
            }
          };
          jQuery.isArray = Array.isArray;
          jQuery.parseJSON = JSON.parse;
          jQuery.nodeName = nodeName;

          // Register as a named AMD module, since jQuery can be concatenated with other
          // files that may use define, but not via a proper concatenation script that
          // understands anonymous AMD modules. A named AMD is safest and most robust
          // way to register. Lowercase jquery is used because AMD module names are
          // derived from file names, and jQuery is normally delivered in a lowercase
          // file name. Do this after creating the global so that if an AMD module wants
          // to call noConflict to hide this version of jQuery, it will work.

          // Note that for maximum portability, libraries that are not jQuery should
          // declare themselves as anonymous modules, and avoid setting a global if an
          // AMD loader is present. jQuery is a special case. For more information, see
          // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

          if (true) {
            !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
            (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
              return jQuery;
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          }

          var // Map over jQuery in case of overwrite
            _jQuery = window.jQuery,
            // Map over the $ in case of overwrite
            _$ = window.$;

          jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
              window.$ = _$;
            }

            if (deep && window.jQuery === jQuery) {
              window.jQuery = _jQuery;
            }

            return jQuery;
          };

          // Expose jQuery and $ identifiers, even in AMD
          // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
          // and CommonJS for browser emulators (#13566)
          if (!noGlobal) {
            window.jQuery = window.$ = jQuery;
          }

          return jQuery;
        }
      );

      /***/
    },
    /* 93 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _stickyfilljs = __webpack_require__(94);

        var _stickyfilljs2 = _interopRequireDefault(_stickyfilljs);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        _stickyfilljs2.default.add($(".faq-page .sidebar"));
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 94 */
    /***/ function (module, exports) {
      /*!
       * Stickyfill – `position: sticky` polyfill
       * v. 2.1.0 | https://github.com/wilddeer/stickyfill
       * MIT License
       */

      (function (window, document) {
        "use strict";

        /*
         * 1. Check if the browser supports `position: sticky` natively or is too old to run the polyfill.
         *    If either of these is the case set `seppuku` flag. It will be checked later to disable key features
         *    of the polyfill, but the API will remain functional to avoid breaking things.
         */

        var _createClass = (function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var seppuku = false;

        var isWindowDefined = typeof window !== "undefined";

        // The polyfill can’t function properly without `window` or `window.getComputedStyle`.
        if (!isWindowDefined || !window.getComputedStyle) seppuku = true;
        // Dont’t get in a way if the browser supports `position: sticky` natively.
        else {
          (function () {
            var testNode = document.createElement("div");

            if (
              ["", "-webkit-", "-moz-", "-ms-"].some(function (prefix) {
                try {
                  testNode.style.position = prefix + "sticky";
                } catch (e) {}

                return testNode.style.position != "";
              })
            )
              seppuku = true;
          })();
        }

        /*
         * 2. “Global” vars used across the polyfill
         */
        var isInitialized = false;

        // Check if Shadow Root constructor exists to make further checks simpler
        var shadowRootExists = typeof ShadowRoot !== "undefined";

        // Last saved scroll position
        var scroll = {
          top: null,
          left: null,
        };

        // Array of created Sticky instances
        var stickies = [];

        /*
         * 3. Utility functions
         */
        function extend(targetObj, sourceObject) {
          for (var key in sourceObject) {
            if (sourceObject.hasOwnProperty(key)) {
              targetObj[key] = sourceObject[key];
            }
          }
        }

        function parseNumeric(val) {
          return parseFloat(val) || 0;
        }

        function getDocOffsetTop(node) {
          var docOffsetTop = 0;

          while (node) {
            docOffsetTop += node.offsetTop;
            node = node.offsetParent;
          }

          return docOffsetTop;
        }

        /*
         * 4. Sticky class
         */

        var Sticky = (function () {
          function Sticky(node) {
            _classCallCheck(this, Sticky);

            if (!(node instanceof HTMLElement))
              throw new Error("First argument must be HTMLElement");
            if (
              stickies.some(function (sticky) {
                return sticky._node === node;
              })
            )
              throw new Error("Stickyfill is already applied to this node");

            this._node = node;
            this._stickyMode = null;
            this._active = false;

            stickies.push(this);

            this.refresh();
          }

          _createClass(Sticky, [
            {
              key: "refresh",
              value: function refresh() {
                if (seppuku || this._removed) return;
                if (this._active) this._deactivate();

                var node = this._node;

                /*
                 * 1. Save node computed props
                 */
                var nodeComputedStyle = getComputedStyle(node);
                var nodeComputedProps = {
                  position: nodeComputedStyle.position,
                  top: nodeComputedStyle.top,
                  display: nodeComputedStyle.display,
                  marginTop: nodeComputedStyle.marginTop,
                  marginBottom: nodeComputedStyle.marginBottom,
                  marginLeft: nodeComputedStyle.marginLeft,
                  marginRight: nodeComputedStyle.marginRight,
                  cssFloat: nodeComputedStyle.cssFloat,
                };

                /*
                 * 2. Check if the node can be activated
                 */
                if (
                  isNaN(parseFloat(nodeComputedProps.top)) ||
                  nodeComputedProps.display == "table-cell" ||
                  nodeComputedProps.display == "none"
                )
                  return;

                this._active = true;

                /*
                 * 3. Check if the current node position is `sticky`. If it is, it means that the browser supports sticky positioning,
                 *    but the polyfill was force-enabled. We set the node’s position to `static` before continuing, so that the node
                 *    is in it’s initial position when we gather its params.
                 */
                var originalPosition = node.style.position;
                if (
                  nodeComputedStyle.position == "sticky" ||
                  nodeComputedStyle.position == "-webkit-sticky"
                )
                  node.style.position = "static";

                /*
                 * 4. Get necessary node parameters
                 */
                var referenceNode = node.parentNode;
                var parentNode =
                  shadowRootExists && referenceNode instanceof ShadowRoot
                    ? referenceNode.host
                    : referenceNode;
                var nodeWinOffset = node.getBoundingClientRect();
                var parentWinOffset = parentNode.getBoundingClientRect();
                var parentComputedStyle = getComputedStyle(parentNode);

                this._parent = {
                  node: parentNode,
                  styles: {
                    position: parentNode.style.position,
                  },
                  offsetHeight: parentNode.offsetHeight,
                };
                this._offsetToWindow = {
                  left: nodeWinOffset.left,
                  right:
                    document.documentElement.clientWidth - nodeWinOffset.right,
                };
                this._offsetToParent = {
                  top:
                    nodeWinOffset.top -
                    parentWinOffset.top -
                    parseNumeric(parentComputedStyle.borderTopWidth),
                  left:
                    nodeWinOffset.left -
                    parentWinOffset.left -
                    parseNumeric(parentComputedStyle.borderLeftWidth),
                  right:
                    -nodeWinOffset.right +
                    parentWinOffset.right -
                    parseNumeric(parentComputedStyle.borderRightWidth),
                };
                this._styles = {
                  position: originalPosition,
                  top: node.style.top,
                  bottom: node.style.bottom,
                  left: node.style.left,
                  right: node.style.right,
                  width: node.style.width,
                  marginTop: node.style.marginTop,
                  marginLeft: node.style.marginLeft,
                  marginRight: node.style.marginRight,
                };

                var nodeTopValue = parseNumeric(nodeComputedProps.top);
                this._limits = {
                  start: nodeWinOffset.top + window.pageYOffset - nodeTopValue,
                  end:
                    parentWinOffset.top +
                    window.pageYOffset +
                    parentNode.offsetHeight -
                    parseNumeric(parentComputedStyle.borderBottomWidth) -
                    node.offsetHeight -
                    nodeTopValue -
                    parseNumeric(nodeComputedProps.marginBottom),
                };

                /*
                 * 5. Ensure that the node will be positioned relatively to the parent node
                 */
                var parentPosition = parentComputedStyle.position;

                if (
                  parentPosition != "absolute" &&
                  parentPosition != "relative"
                ) {
                  parentNode.style.position = "relative";
                }

                /*
                 * 6. Recalc node position.
                 *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
                 */
                this._recalcPosition();

                /*
                 * 7. Create a clone
                 */
                var clone = (this._clone = {});
                clone.node = document.createElement("div");

                // Apply styles to the clone
                extend(clone.node.style, {
                  width: nodeWinOffset.right - nodeWinOffset.left + "px",
                  height: nodeWinOffset.bottom - nodeWinOffset.top + "px",
                  marginTop: nodeComputedProps.marginTop,
                  marginBottom: nodeComputedProps.marginBottom,
                  marginLeft: nodeComputedProps.marginLeft,
                  marginRight: nodeComputedProps.marginRight,
                  cssFloat: nodeComputedProps.cssFloat,
                  padding: 0,
                  border: 0,
                  borderSpacing: 0,
                  fontSize: "1em",
                  position: "static",
                });

                referenceNode.insertBefore(clone.node, node);
                clone.docOffsetTop = getDocOffsetTop(clone.node);
              },
            },
            {
              key: "_recalcPosition",
              value: function _recalcPosition() {
                if (!this._active || this._removed) return;

                var stickyMode =
                  scroll.top <= this._limits.start
                    ? "start"
                    : scroll.top >= this._limits.end
                    ? "end"
                    : "middle";

                if (this._stickyMode == stickyMode) return;

                switch (stickyMode) {
                  case "start":
                    extend(this._node.style, {
                      position: "absolute",
                      left: this._offsetToParent.left + "px",
                      right: this._offsetToParent.right + "px",
                      top: this._offsetToParent.top + "px",
                      bottom: "auto",
                      width: "auto",
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: 0,
                    });
                    break;

                  case "middle":
                    extend(this._node.style, {
                      position: "fixed",
                      left: this._offsetToWindow.left + "px",
                      right: this._offsetToWindow.right + "px",
                      top: this._styles.top,
                      bottom: "auto",
                      width: "auto",
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: 0,
                    });
                    break;

                  case "end":
                    extend(this._node.style, {
                      position: "absolute",
                      left: this._offsetToParent.left + "px",
                      right: this._offsetToParent.right + "px",
                      top: "auto",
                      bottom: 0,
                      width: "auto",
                      marginLeft: 0,
                      marginRight: 0,
                    });
                    break;
                }

                this._stickyMode = stickyMode;
              },
            },
            {
              key: "_fastCheck",
              value: function _fastCheck() {
                if (!this._active || this._removed) return;

                if (
                  Math.abs(
                    getDocOffsetTop(this._clone.node) - this._clone.docOffsetTop
                  ) > 1 ||
                  Math.abs(
                    this._parent.node.offsetHeight - this._parent.offsetHeight
                  ) > 1
                )
                  this.refresh();
              },
            },
            {
              key: "_deactivate",
              value: function _deactivate() {
                var _this = this;

                if (!this._active || this._removed) return;

                this._clone.node.parentNode.removeChild(this._clone.node);
                delete this._clone;

                extend(this._node.style, this._styles);
                delete this._styles;

                // Check whether element’s parent node is used by other stickies.
                // If not, restore parent node’s styles.
                if (
                  !stickies.some(function (sticky) {
                    return (
                      sticky !== _this &&
                      sticky._parent &&
                      sticky._parent.node === _this._parent.node
                    );
                  })
                ) {
                  extend(this._parent.node.style, this._parent.styles);
                }
                delete this._parent;

                this._stickyMode = null;
                this._active = false;

                delete this._offsetToWindow;
                delete this._offsetToParent;
                delete this._limits;
              },
            },
            {
              key: "remove",
              value: function remove() {
                var _this2 = this;

                this._deactivate();

                stickies.some(function (sticky, index) {
                  if (sticky._node === _this2._node) {
                    stickies.splice(index, 1);
                    return true;
                  }
                });

                this._removed = true;
              },
            },
          ]);

          return Sticky;
        })();

        /*
         * 5. Stickyfill API
         */

        var Stickyfill = {
          stickies: stickies,
          Sticky: Sticky,

          forceSticky: function forceSticky() {
            seppuku = false;
            init();

            this.refreshAll();
          },
          addOne: function addOne(node) {
            // Check whether it’s a node
            if (!(node instanceof HTMLElement)) {
              // Maybe it’s a node list of some sort?
              // Take first node from the list then
              if (node.length && node[0]) node = node[0];
              else return;
            }

            // Check if Stickyfill is already applied to the node
            // and return existing sticky
            for (var i = 0; i < stickies.length; i++) {
              if (stickies[i]._node === node) return stickies[i];
            }

            // Create and return new sticky
            return new Sticky(node);
          },
          add: function add(nodeList) {
            // If it’s a node make an array of one node
            if (nodeList instanceof HTMLElement) nodeList = [nodeList];
            // Check if the argument is an iterable of some sort
            if (!nodeList.length) return;

            // Add every element as a sticky and return an array of created Sticky instances
            var addedStickies = [];

            var _loop = function _loop(i) {
              var node = nodeList[i];

              // If it’s not an HTMLElement – create an empty element to preserve 1-to-1
              // correlation with input list
              if (!(node instanceof HTMLElement)) {
                addedStickies.push(void 0);
                return "continue";
              }

              // If Stickyfill is already applied to the node
              // add existing sticky
              if (
                stickies.some(function (sticky) {
                  if (sticky._node === node) {
                    addedStickies.push(sticky);
                    return true;
                  }
                })
              )
                return "continue";

              // Create and add new sticky
              addedStickies.push(new Sticky(node));
            };

            for (var i = 0; i < nodeList.length; i++) {
              var _ret2 = _loop(i);

              if (_ret2 === "continue") continue;
            }

            return addedStickies;
          },
          refreshAll: function refreshAll() {
            stickies.forEach(function (sticky) {
              return sticky.refresh();
            });
          },
          removeOne: function removeOne(node) {
            // Check whether it’s a node
            if (!(node instanceof HTMLElement)) {
              // Maybe it’s a node list of some sort?
              // Take first node from the list then
              if (node.length && node[0]) node = node[0];
              else return;
            }

            // Remove the stickies bound to the nodes in the list
            stickies.some(function (sticky) {
              if (sticky._node === node) {
                sticky.remove();
                return true;
              }
            });
          },
          remove: function remove(nodeList) {
            // If it’s a node make an array of one node
            if (nodeList instanceof HTMLElement) nodeList = [nodeList];
            // Check if the argument is an iterable of some sort
            if (!nodeList.length) return;

            // Remove the stickies bound to the nodes in the list

            var _loop2 = function _loop2(i) {
              var node = nodeList[i];

              stickies.some(function (sticky) {
                if (sticky._node === node) {
                  sticky.remove();
                  return true;
                }
              });
            };

            for (var i = 0; i < nodeList.length; i++) {
              _loop2(i);
            }
          },
          removeAll: function removeAll() {
            while (stickies.length) {
              stickies[0].remove();
            }
          },
        };

        /*
         * 6. Setup events (unless the polyfill was disabled)
         */
        function init() {
          if (isInitialized) {
            return;
          }

          isInitialized = true;

          // Watch for scroll position changes and trigger recalc/refresh if needed
          function checkScroll() {
            if (window.pageXOffset != scroll.left) {
              scroll.top = window.pageYOffset;
              scroll.left = window.pageXOffset;

              Stickyfill.refreshAll();
            } else if (window.pageYOffset != scroll.top) {
              scroll.top = window.pageYOffset;
              scroll.left = window.pageXOffset;

              // recalc position for all stickies
              stickies.forEach(function (sticky) {
                return sticky._recalcPosition();
              });
            }
          }

          checkScroll();
          window.addEventListener("scroll", checkScroll);

          // Watch for window resizes and device orientation changes and trigger refresh
          window.addEventListener("resize", Stickyfill.refreshAll);
          window.addEventListener("orientationchange", Stickyfill.refreshAll);

          //Fast dirty check for layout changes every 500ms
          var fastCheckTimer = void 0;

          function startFastCheckTimer() {
            fastCheckTimer = setInterval(function () {
              stickies.forEach(function (sticky) {
                return sticky._fastCheck();
              });
            }, 500);
          }

          function stopFastCheckTimer() {
            clearInterval(fastCheckTimer);
          }

          var docHiddenKey = void 0;
          var visibilityChangeEventName = void 0;

          if ("hidden" in document) {
            docHiddenKey = "hidden";
            visibilityChangeEventName = "visibilitychange";
          } else if ("webkitHidden" in document) {
            docHiddenKey = "webkitHidden";
            visibilityChangeEventName = "webkitvisibilitychange";
          }

          if (visibilityChangeEventName) {
            if (!document[docHiddenKey]) startFastCheckTimer();

            document.addEventListener(visibilityChangeEventName, function () {
              if (document[docHiddenKey]) {
                stopFastCheckTimer();
              } else {
                startFastCheckTimer();
              }
            });
          } else startFastCheckTimer();
        }

        if (!seppuku) init();

        /*
         * 7. Expose Stickyfill
         */
        if (typeof module != "undefined" && module.exports) {
          module.exports = Stickyfill;
        } else if (isWindowDefined) {
          window.Stickyfill = Stickyfill;
        }
      })(window, document);

      /***/
    },
    /* 95 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        __webpack_require__(44);

        var _lastSlideItem = __webpack_require__(45);

        var $win = $(window);

        function forceOpacity() {
          return setInterval(function () {
            (0, _lastSlideItem.lastSlideItem)();
          }, 10);
        }

        var $slider = $("#insta-feed");
        if ($slider.length) {
          var config = { childList: true };

          $slider.on("init afterChange", function () {
            (0, _lastSlideItem.lastSlideItem)();
            var interval = setInterval(function () {
              (0, _lastSlideItem.lastSlideItem)();
            }, 20);
            setTimeout(function () {
              clearInterval(interval);
            }, 200);
          });

          var callback = function callback(mutationsList, observer) {
            if ($slider.children().length > 1) {
              $slider.append('<div class="slide-items"></div>');
              $slider.children().each(function () {
                var $this = $(this);
                if ($this.hasClass("instafeed-lightbox")) {
                  var $img = $this.prev().find(".js-lazy-image");
                  var dataImg = $img.data("src");
                  $img.attr("src", dataImg);
                  $img.addClass("js-lazy-image--handled");
                  $slider.find(".slide-items").append($this.prev());
                }
              });

              $slider.find(".slide-items").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                variableWidth: true,
                swipe: false,
                draggable: false,
              });

              observer.disconnect();
            }
          };
          var observer = new MutationObserver(callback);
          observer.observe($slider[0], config);

          $win.on("resize", function () {
            (0, _lastSlideItem.lastSlideItem)();
          });
        }

        if ($win.width() < 768) {
          var $accordion = $(".accordion-section .flex-row");

          $accordion.on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
              var $nextSlide = $(slick.$slides[nextSlide]);
              var slideHeight = $nextSlide.find(".accordion-item").height();
              $accordion.find(".slick-list").animate({
                height: slideHeight,
              });
            }
          );

          $accordion.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            cssEase: "linear",
            speed: 200,
            infinite: true,
          });

          $(".arrow-prev").on("click", function () {
            $accordion.slick("slickPrev");
          });

          $(".arrow-next").on("click", function () {
            $accordion.slick("slickNext");
          });
        }
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 96 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        $(".js-filter-btn, .filter-dropdown__close").on("click", function (e) {
          e.preventDefault();
          $(".filter-dropdown").toggleClass("active");
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 97 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        $(document).on("click", ".qty .qty-edit", function () {
          // Max qty
          if (
            $(this)
              .closest(".qty")
              .find("input")
              .attr("name")
              .indexOf("32106075750486") > -1
          ) {
            if ($(this).closest(".qty").find("input").val() >= 12) {
              $(this).closest(".qty").find("input").val(12);
              if ($(this).hasClass("qty-plus")) {
                return false;
              }
            }
          }
          // TODO: 32oz
          if (
            $(this)
              .closest(".qty")
              .find("input")
              .attr("name")
              .indexOf("32555080515670") > -1
          ) {
            if ($(this).closest(".qty").find("input").val() >= 12) {
              $(this).closest(".qty").find("input").val(12);
              if ($(this).hasClass("qty-plus")) {
                return false;
              }
            }
          }
          // $2.99 HS
          if (
            $(this)
              .closest(".qty")
              .find("input")
              .attr("name")
              .indexOf("33095653294166") > -1
          ) {
            if ($(this).closest(".qty").find("input").val() <= 5) {
              // $(this).closest('.qty').find('input').val(5);
              // if ($(this).hasClass('qty-minus')) {
              //   return false;
              // }
            } else if ($(this).closest(".qty").find("input").val() >= 12) {
              $(this).closest(".qty").find("input").val(12);
              if ($(this).hasClass("qty-plus")) {
                return false;
              }
            }
          }

          var $this = $(this);
          var qtyInput = $this.parent().find("input");
          var qtyInputVal = qtyInput.val();
          qtyInputVal = $.isNumeric(qtyInputVal) ? qtyInputVal : 0;

          if ($this.hasClass("qty-plus")) {
            qtyInputVal++;
            qtyInputVal = qtyInputVal < 0 ? 1 : qtyInputVal;
          } else {
            qtyInputVal--;
            qtyInputVal = qtyInputVal < 0 ? 0 : qtyInputVal;
          }
          qtyInput.val(qtyInputVal).trigger("change");

          if (qtyInput.data("mirror") == "true") {
            $('.qty input[data-mirror="true"]').each(function () {
              $(this).val(qtyInputVal);
            });
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 98 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        $(".video .play-icon").on("click", function () {
          var $this = $(this);
          var $parent = $this.parent();
          $parent.addClass("clicked");
          if ($(this).siblings("#video-player").hasClass("vimeo")) {
            var player = new Vimeo.Player("video-player");
            player.play();
          } else if ($(this).siblings("#video-player").hasClass("yt")) {
            var player = new YT.Player("video-player", {
              events: {
                onReady: function onReady(event) {
                  event.target.playVideo();
                },
              },
            });
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 99 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _touch = __webpack_require__(12);

        $(".accordion__title").on("click", function () {
          var $this = $(this);
          var $accordion = $this.closest(".accordion");
          var $content = $accordion.closest(".product-content");
          var $accordion_content = $accordion.find(".accordion__content");
          var contentHeight;

          if ($content.find(".btn").length) {
            contentHeight =
              $content.height() -
              $content.find("h3").outerHeight(true) -
              $content.find(".btn").outerHeight() -
              $this.outerHeight() -
              parseInt($accordion.css("margin-bottom"));
          } else {
            contentHeight =
              $content.height() -
              $content.find("h3").outerHeight(true) -
              $this.outerHeight() -
              parseInt($accordion.css("margin-bottom"));
          }

          if ($accordion.hasClass("active")) {
            $accordion_content.animate({
              height: 0,
            });
          } else {
            $accordion_content.animate({
              height: contentHeight,
            });
          }
          $accordion_content.css({
            "max-height": contentHeight,
          });
          $accordion.toggleClass("active");

          if ((0, _touch.is_touch_device)() && $(window).width() < 768) {
            $accordion.toggleClass("fixed");
          } else {
          }
        });

        $(".faq-page .question").on("click", function () {
          var $this = $(this);
          var $parent = $this.parent();
          $parent.toggleClass("active");
          $parent.find(".answer").stop(true).slideToggle();
          $(".faq-page .answer").not($parent.find(".answer")).slideUp();
          $(".qa-row").not($parent).removeClass("active");
        });

        $(".faq-page .content h3").on("click", function () {
          var $this = $(this);
          var dataTarget = $this.attr("id");
          $('.qa-row[data-heading="' + dataTarget + '"]')
            .add($this)
            .toggleClass("show");
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 100 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);
        var $section = $(".faq-page h3");
        var sectionsObj = {};

        function calculateOffsets() {
          $section.each(function (e) {
            var $this = $(this);
            var thisId = $this.attr("id");
            sectionsObj[thisId] =
              $this.offset().top - $(".header__inner").outerHeight();
          });
        }

        function scrollSpy() {
          var $sidebar = $(".sidebar");
          var scrollTop = $win.scrollTop();
          var interval = void 0;
          var hasSection = true;
          calculateOffsets();
          for (var i in sectionsObj) {
            if (sectionsObj[i] > scrollTop) {
              var _ret = (function () {
                var $target = $sidebar.find("a[href*=" + i + "]").parent();
                hasSection = true;

                if ($target.prev().length) {
                  $target = $target.prev();
                }

                clearInterval(interval);
                interval = setTimeout(function () {
                  $sidebar.find(".active").removeClass("active");
                  $target.addClass("active");
                }, 10);
                return "break";
              })();

              if (_ret === "break") break;
            } else {
              hasSection = false;
            }
          }

          if (!hasSection) {
            var $target = $sidebar.find("li:last-child a").parent();
            $sidebar.find(".active").removeClass("active");
            $target.addClass("active");
          }
        }

        $win.on("scroll load", function () {
          if ($win.width() >= 768) {
            scrollSpy();
          } else {
            hideUnactive();
          }
        });

        $(".faq-page .sidebar a").on("click", function (e) {
          e.preventDefault();
          var $this = $(this);
          var thisHref = $this.attr("href");

          if ($win.width() < 768) {
            $this.parent().addClass("active").siblings().removeClass("active");
            $this.closest("ul").toggleClass("show");
            hideUnactive();
          } else {
            $("html,body").animate({
              scrollTop:
                $(thisHref).offset().top - $(".header__inner").outerHeight(),
            });
          }
        });

        function hideUnactive() {
          var $activeEle = $(".faq-page .sidebar ul .active a");
          var eleHref = $activeEle.attr("href");
          if ($activeEle.length) {
            var eleTarget = eleHref.replace("#", "");
            $(".faq-page .qa-row").addClass("hide");
            $(".faq-page")
              .find('.qa-row[data-heading="' + eleTarget + '"]')
              .removeClass("hide");
          }
        }
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 101 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);

        function responsiveImage() {
          $("[data-img-mobile]").each(function () {
            var $this = $(this);
            var mobileImage = $this.data("img-mobile");
            var desktopImage = $this.data("img-desktop");

            if ($win.width() < 1024) {
              $this.attr({
                src: mobileImage,
              });
            } else {
              $this.attr({
                src: desktopImage,
              });
            }
          });
        }

        responsiveImage();

        $win.on("resize", function () {
          responsiveImage();
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 102 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _miniCart = __webpack_require__(17);

        var _toaster = __webpack_require__(46);

        var $body = $("body");

        // Add to cart - pick your GWP

        $(".modal-gwp").on("click", "#pick-gwp-btn", function (e) {
          e.preventDefault();

          const $triggerBtn = $(this);

          let gwpItems = [];
          let gwpPick1;
          let gwpPick2;
          let q1 = 0;
          let q2 = 0;
          let q3 = 0;
          let q4 = 0;
          const gwpLimit = $("body").data("pick-limit");
          const product1Id = $("body").data("pick-varid-1");
          const product2Id = $("body").data("pick-varid-2");
          const product3Id = $("body").data("pick-varid-3");
          const product4Id = $("body").data("pick-varid-4");

          if ($triggerBtn.hasClass("minicart")) {
            $(
              ".modal-gwp#modal-gwp ul.gwp-list input[type=checkbox]:checked"
            ).each(function () {
              if (gwpItems.length < gwpLimit - 1) {
                gwpItems.push($(this).attr("id"));
              }
            });
          } else {
            $(
              ".modal-gwp#modal-gwp-cart ul.gwp-list input[type=checkbox]:checked"
            ).each(function () {
              if (gwpItems.length < gwpLimit - 1) {
                gwpItems.push($(this).attr("id"));
              }
            });
          }

          gwpPick1 = gwpItems[0];
          gwpPick2 = gwpItems[1];
          const finalUpdates = {};

          (product1Id == gwpPick1 || product1Id == gwpPick2) && (q1 = 1);
          (product2Id == gwpPick1 || product2Id == gwpPick2) && (q2 = 1);
          (product3Id == gwpPick1 || product3Id == gwpPick2) && (q3 = 1);
          (product4Id == gwpPick1 || product4Id == gwpPick2) && (q4 = 1);

          finalUpdates[parseInt(product1Id)] = q1;
          finalUpdates[parseInt(product2Id)] = q2;
          finalUpdates[parseInt(product3Id)] = q3;
          product4Id && (finalUpdates[parseInt(product4Id)] = q4);

          $.ajax({
            url: "/cart/update.js",
            method: "POST",
            dataType: "json",
            data: {
              updates: finalUpdates,
            },
            success: function () {
              $.getJSON("/cart.js", function (new_cart) {
                updateCart(new_cart);
                if ($triggerBtn.hasClass("minicart")) {
                  MicroModal.close("modal-gwp");
                  $(".mini-cart").addClass("show");
                } else {
                  MicroModal.close("modal-gwp-cart");
                  window.location.reload();
                }
              });
            },
          });
        });

        // ADD TO CART function

        $('form[action="/cart/add"]').on("submit", function (e) {
          e.preventDefault();
          let $form = $(this);
          $form.addClass("loading");

          const codeless_gwp_thresh = $("body").data("code-thresh");
          const codeless_gwp_id_1 = $("body").data("code-product-1");
          const codeless_gwp_id_2 =
            $("body").data("code-product-2") !== ""
              ? $("body").data("code-product-2")
              : null;
          const sample_prod_id = $("body").data("sample-product");

          $.ajax({
            url: $form.attr("action"),
            type: "POST",
            dataType: "json",
            data: $form.serialize(),
            success: function (itemData) {
              //CODELESS GWP
              $.getJSON("/cart.js", function (new_cart) {
                let subTotalCartPrice = new_cart.total_price;
                const finalObject = {};
                let reducedSubTotalCartPrice = subTotalCartPrice;

                if (codeless_gwp_id_1) {
                  //Remove gift card items from GWP threshold
                  let excludeAmount = 0;
                  new_cart.items.forEach(function (product) {
                    if (product.quantity > 6) {
                      finalObject[parseInt(product.variant_id)] = 6;
                    }
                    if (product.product_type === "Gift Card") {
                      excludeAmount = excludeAmount + product.line_price;
                    }
                  });
                  reducedSubTotalCartPrice = subTotalCartPrice - excludeAmount;
                  let gwp_quant =
                    reducedSubTotalCartPrice >= codeless_gwp_thresh ? 1 : 0;

                  finalObject[parseInt(codeless_gwp_id_1)] = gwp_quant;
                  codeless_gwp_id_2 &&
                    (finalObject[parseInt(codeless_gwp_id_2)] = gwp_quant);
                }

                if (sample_prod_id && reducedSubTotalCartPrice >= 100) {
                  finalObject[parseInt(sample_prod_id)] = 1;
                } else if (sample_prod_id && reducedSubTotalCartPrice < 100) {
                  finalObject[parseInt(sample_prod_id)] = 0;
                }

                if (!codeless_gwp_id_1 && !sample_prod_id) {
                  updateCart(new_cart);
                } else {
                  $.ajax({
                    url: "/cart/update.js",
                    dataType: "json",
                    type: "post",
                    data: { updates: finalObject },
                    success: function () {
                      $.getJSON("/cart.js", function (new_cart) {
                        updateCart(new_cart);
                      });
                    },
                  });
                }
              });

              $form.removeClass("loading");
              $form.removeClass("fixed");
              let productPrice;
              let productId;
              let productTitle;

              $(".mini-cart").addClass("show");

              productPrice = $(".product-info__price").val();
              productId = $(".product-info__id").val();
              productTitle = $(".product-info__title").val();

              fbq("track", "AddToCart", {
                value: productPrice,
                currency: "USD",
                content_ids: `[${productId}]`,
                content_name: productTitle,
                content_type: "product",
              });
            },
            error: function (XMLHttpRequest) {
              var response = eval("(" + XMLHttpRequest.responseText + ")");
              response = response.description;
              console.error(response);
              $form.removeClass("loading");
              $form.removeClass("fixed");
              (0, _toaster.toastMessage)(Shopify.theme.locale.cart.error);
            },
          });
          return false;
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 103 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      /***/
    },
    /* 104 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $passErrors = $(".pass-errors .errors");

        function customPaswordStrength(pass) {
          var validateObj = [
            {
              text: "At least one capital letter",
              valid: null,
              check: "[A-Z]",
            },
            { text: "One lowercase letter", valid: null, check: "[a-z]" },
            { text: "One Number", valid: null, check: "[0-9]" },
          ];

          return validateObj.map(function (obj) {
            obj.valid = pass.match(obj.check) ? true : false;
            return obj;
          });
        }

        function showErrors($this) {
          var result = customPaswordStrength($this.val());

          var errors = result.filter(function (item) {
            return !item.valid;
          });

          if (errors.length) {
            $this.closest("form").addClass("errors");
          } else {
            $this.closest("form").removeClass("errors");
          }

          $this.closest("form").addClass("password-validate");
          $passErrors.empty().append(
            result.map(function (item) {
              var classAttr = "";
              if ($this.val() === "") {
                classAttr = "";
              } else if (item.valid === false) {
                classAttr = "error";
              } else if (item.valid === true) {
                classAttr = "valid";
              }

              return (
                '<li class="' +
                classAttr +
                '"><span></span>' +
                item.text +
                "</li>"
              );
            })
          );
        }

        $('.form--register input[name="customer[password]"]').on(
          "focusin keyup",
          function () {
            showErrors($(this));
          }
        );
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 105 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var contactFlag = false;

        $("#contact_form").on("submit", function (e) {
          var $this = $(this);
          if (!contactFlag) {
            e.preventDefault();
            $.ajax({
              url: $this.attr("action"),
              type: $this.attr("method"),
              data: $this.serialize(),
            })
              .done(function (data) {
                var $html = $(data);
                $html.find(".form__message--success").appendTo($this);
              })
              .fail(function (data) {
                contactFlag = true;
                $this.trigger("submit");
              });
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 106 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        $(".accordion-section .side-text").on("click", function () {
          var $item = $(this).closest(".accordion-item ");
          $item.addClass("active").siblings().removeClass("active");
        });

        $(document).on("shopify:section:load", function () {
          $(".accordion-section .side-text").on("click", function () {
            var $item = $(this).closest(".accordion-item ");
            $item.addClass("active").siblings().removeClass("active");
          });
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 107 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        __webpack_require__(44);

        $(".community .next-arrow").on("click", function () {
          var $slider = $(".community .slide-items");

          $slider.slick("slickNext");
          $slider.find(".opacity:eq(0)").removeClass("opacity");
        });

        $(document).on("shopify:section:load", function () {
          $(".community .next-arrow").on("click", function () {
            var $slider = $(".community .slide-items");

            $slider.slick("slickNext");
            $slider.find(".opacity:eq(0)").removeClass("opacity");
          });
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 108 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _touch = __webpack_require__(12);

        var $header = $(".header");
        var $body = $("body");
        var $html = $("html");
        var $mainDropDown = $(".menu__dropdown--main");

        $header.find(".nav-trigger").on("click", function (e) {
          e.preventDefault();
          $(this).find("a").toggleClass("active");
          $body.add($html).toggleClass("nav-visible");
        });

        $(".main-nav > li > a").on("mouseenter", function () {
          if (!(0, _touch.is_touch_device)()) {
            var $this = $(this);

            $mainDropDown.not($this.next()).removeClass("show");
            $this.next(".menu__dropdown--main").addClass("show");
          }
        });

        $mainDropDown.on("mouseleave", function () {
          $mainDropDown.removeClass("show");
        });

        $(".navigation .has-dropdown").on("click", function (e) {
          if ((0, _touch.is_touch_device)()) {
            e.preventDefault();
            var $this = $(this);

            $mainDropDown.not($this.next()).removeClass("show");
            $this.next(".menu__dropdown--main").toggleClass("show");

            $(".navigation a").not($this).not($this).removeClass("clicked");
            $this.toggleClass("clicked");
          }
        });

        $(document).on("mouseup", function (e) {
          var container = $(".header");

          if (!container.is(e.target) && container.has(e.target).length === 0) {
            $mainDropDown.removeClass("show");
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 109 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _touch = __webpack_require__(12);

        var $header = $("#shopify-section-header");

        $(window).on("load resize", function (event) {
          if ($(window).width() < 768) {
            // $header.height($header.find('.header__bar').outerHeight() + $header.find('.header__inner').outerHeight());
            $header.height($header.find(".header").outerHeight());
          } else {
            $header.css("height", "auto");
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 110 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);
        var $header = $(".header");
        var offSet = $(".header__bar").outerHeight();

        $win.on("scroll load", function () {
          if ($win.scrollTop() >= offSet) {
            // $header.find('.header__inner').addClass('fixed');
          } else {
            $header.find(".header__inner").removeClass("fixed");
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 111 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _typeof =
          typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
            ? function (obj) {
                return typeof obj;
              }
            : function (obj) {
                return obj &&
                  typeof Symbol === "function" &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? "symbol"
                  : typeof obj;
              };

        __webpack_require__(47);

        function customSelect() {
          $(".rc_select.rc_select__frequency").selectric({
            labelBuilder: "Delivery every {text}",
            optionsItemBuilder: '<span class="icon-radio"></span> {text}',
          });
        }

        if (Shopify.product_subscribe) {
          var checkExist = setInterval(function () {
            if (
              (typeof ReCharge === "undefined"
                ? "undefined"
                : _typeof(ReCharge)) === "object"
            ) {
              customSelect();
              clearInterval(checkExist);
            }
          }, 100);
        }

        var $customSelect = $(
          ".custom-select-wrapper.shipping-interval-select-wrapper"
        );
        var $currentSelectEle = $customSelect.find(".current");
        $("#rc_container .rc_radio").on("change", function () {
          var $this = $(this);
          var radioValue = $this.val();
          var $targetInput = void 0;
          if (radioValue === "onetime") {
            $targetInput = $customSelect.find(
              ".custom-select__dropdown ul input[value=" + radioValue + "]"
            );
          } else {
            var selectValue = $(".rc_select__frequency").val();
            $targetInput = $customSelect.find(
              ".custom-select__dropdown ul input[value=" + selectValue + "]"
            );
          }
          var labelText = $targetInput.closest("li").find("label").text();
          $targetInput.prop("checked", true);
          $currentSelectEle.text(labelText);
        });

        $(".product__form").on("change", ".rc_select__frequency", function () {
          var $select = $(this);
          var $targetInput = $customSelect.find(
            ".custom-select__dropdown ul input[value=" + $select.val() + "]"
          );
          var labelText = $targetInput.closest("li").find("label").text();
          $targetInput.prop("checked", true);
          $currentSelectEle.text(labelText);
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 112 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _miniCart = __webpack_require__(17);

        var _toaster = __webpack_require__(46);

        var $body = $("body");
        var $customSelect = $(".custom-select-wrapper");
        var $currentSelectEle = $customSelect.find(".current");
        var $fixedForm = $(".fixed-form ");
        var $productForm = $(".product__entry form");

        $currentSelectEle.on("click", function () {
          // $customSelect.toggleClass('clicked');
          $(this).closest(".custom-select-wrapper").toggleClass("clicked");
        });

        $(
          ".shipping-interval-select-wrapper .custom-select__dropdown input"
        ).on("change", function () {
          var $this = $(this);
          var radioValue = $this.val();
          var labelText = $this.parent().find("label").text();
          var thisIndex = Shopify.subscribe_intervals.indexOf(
            radioValue.toString()
          );
          if (radioValue === "onetime") {
            var $oneTimeeRadio = $('.rc_radio[value="onetime"]');
            $oneTimeeRadio
              .prop("checked", true)
              .trigger("change")
              .trigger("click");
          } else {
            var $radioDeliver = $('.rc_radio[value="autodeliver"]');
            $radioDeliver
              .prop("checked", true)
              .trigger("change")
              .trigger("click");
            $(
              "#rc_radio_options .selectric-items li:eq(" + thisIndex + ")"
            ).trigger("click");
          }

          $(".shipping-interval-select-wrapper .current").text(labelText);
          $customSelect.removeClass("clicked");
        });

        $fixedForm.find('input[name="quantity"]').on("change", function () {
          $productForm.find('input[name="quantity"]').val($(this).val());
        });

        $('.qty input[name="quantity"]').on("change", function () {
          if ($(this).val() > 6) {
            $(this).val(6);
          };
        });

        $(".ajax-add").on("click", function (e) {
          e.preventDefault();

          const codeless_gwp_thresh = $("body").data("code-thresh");
          const codeless_gwp_id_1 = $("body").data("code-product-1");
          const codeless_gwp_id_2 =
            $("body").data("code-product-2") !== ""
              ? $("body").data("code-product-2")
              : null;
          const sample_prod_id = $("body").data("sample-product");

          if ($("#product-select").length && !$("#product-select").val()) {
            alert("Please select an option");
          } else {
            $(".fixed-form .atc-wrapper").addClass("loading");
            $(".fixed-form .flex-item.ajax-add").addClass("loading");

            $.ajax({
              url: $productForm.attr("action"),
              type: "POST",
              dataType: "json",
              data: $productForm.serialize(),
              success: function (itemData) {
                //CODELESS GWP
                $.getJSON("/cart.js", function (new_cart) {
                  let subTotalCartPrice = new_cart.total_price;
                  const finalObject = {};
                  let reducedSubTotalCartPrice = subTotalCartPrice;

                  if (codeless_gwp_id_1) {
                    //Remove gift card items from GWP threshold
                    let excludeAmount = 0;
                    new_cart.items.forEach(function (product) {
                      if (product.quantity > 6) {
                        finalObject[parseInt(product.variant_id)] = 6;
                      }
                      if (product.product_type === "Gift Card") {
                        excludeAmount = excludeAmount + product.line_price;
                      }
                    });
                    reducedSubTotalCartPrice =
                      subTotalCartPrice - excludeAmount;
                    let gwp_quant =
                      reducedSubTotalCartPrice >= codeless_gwp_thresh ? 1 : 0;

                    finalObject[parseInt(codeless_gwp_id_1)] = gwp_quant;
                    codeless_gwp_id_2 &&
                      (finalObject[parseInt(codeless_gwp_id_2)] = gwp_quant);
                  }

                  if (sample_prod_id && reducedSubTotalCartPrice >= 100) {
                    finalObject[parseInt(sample_prod_id)] = 1;
                  } else if (sample_prod_id && reducedSubTotalCartPrice < 100) {
                    finalObject[parseInt(sample_prod_id)] = 0;
                  }

                  if (!codeless_gwp_id_1 && !sample_prod_id) {
                    updateCart(new_cart);
                  } else {
                    $.ajax({
                      url: "/cart/update.js",
                      dataType: "json",
                      type: "post",
                      data: { updates: finalObject },
                      success: function () {
                        $.getJSON("/cart.js", function (new_cart) {
                          updateCart(new_cart);
                        });
                      },
                    });
                  }
                });

                $(".mini-cart").addClass("show");
                $(".fixed-form .atc-wrapper").removeClass("loading");
                $(".fixed-form .flex-item.ajax-add").removeClass("loading");

                let productPrice;
                let productId;
                let productTitle;

                productPrice = $(".product-info__price").val();
                productId = $(".product-info__id").val();
                productTitle = $(".product-info__title").val();

                fbq("track", "AddToCart", {
                  value: productPrice,
                  currency: "USD",
                  content_ids: `[${productId}]`,
                  content_name: productTitle,
                  content_type: "product",
                });
              },
              error: function (XMLHttpRequest) {
                var response = eval("(" + XMLHttpRequest.responseText + ")");
                response = response.description;
                console.error(response);
                (0, _toaster.toastMessage)(Shopify.theme.locale.cart.error);
                $(".fixed-form .atc-wrapper").removeClass("loading");
                $(".fixed-form .flex-item.ajax-add").removeClass("loading");
              },
            });
          }
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 113 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);
        var $productForm = $(".product__form .form__foot");
        var $fixedBar = $(".fixed-form");

        function fixedBar() {
          if (!$("body").hasClass("template-product")) {
            return;
          }
          var winScrollTop = $win.scrollTop();
          var productBottomLine =
            $productForm.offset().top + $productForm.height();

          if (winScrollTop > productBottomLine) {
            $fixedBar.addClass("visible");
          } else {
            $fixedBar.removeClass("visible");
          }
        }

        $win.on("load resize scroll", function () {
          fixedBar();
        });

        if (
          $(".product-single__variants").length ||
          $("#rc_container").length
        ) {
          $(".fixed-form .js-fixed-form").on("click", function (e) {
            e.preventDefault();
            $(".product__container .product__form").addClass("fixed");
          });

          $(".product__form .subscribe-holder .close-btn").on(
            "click",
            function () {
              $(".product__form.fixed").removeClass("fixed");
            }
          );

          $(".product__form.fixed .form__foot .btn--border").on(
            "click",
            function () {
              setTimeout(function () {
                $(".product__form.fixed").removeClass("fixed");
              }, 1000);
            }
          );
        }

        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 114 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        __webpack_require__(47);

        $(".sort__select.custom-select").selectric();
        $(".select.custom-select").selectric();
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 115 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _touch = __webpack_require__(12);

        $(".filter-dropdown li a").on("click", function (e) {
          if ((0, _touch.is_touch_device)() && $(window).width() < 768) {
            e.preventDefault();
            var $this = $(this);
            var dataTag = $this.parent().data("tag");

            if (dataTag === "*") {
              $this.parent().siblings().removeClass("active");
            } else {
              $this.closest("ul").find('[data-tag="*"]').removeClass("active");
            }
            $this.parent().toggleClass("active");
          }
        });

        $(".js-apply-filters").on("click", function (e) {
          e.preventDefault();
          var $this = $(this);
          var $dropDown = $this.closest(".filter-dropdown");
          var collectionUrl = $this.data("collection");
          var tagArr = [];
          $dropDown.find("li.active a").each(function () {
            var $link = $(this);
            var dataTag = $link.parent().data("tag");
            if (dataTag !== "*") {
              tagArr.push(dataTag);
            }
          });

          window.location = collectionUrl + "/" + tagArr.join("+");
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 116 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var $win = $(window);

        $.fn.animatedClass = function (options) {
          var defaults = {
            deviation: 500,
          };

          var options = $.extend(defaults, options);
          if (this.length > 0) {
            return this.each(function () {
              var winScroll = $win.scrollTop();
              var ele = $(this);
              if (ele.data("delay")) {
                options.deviation = $win.height() - ele.data("delay");
              }
              var expOff = ele.offset().top - options.deviation;

              if (winScroll > expOff) {
                ele.addClass("animated");
              }
            });
          }
        };

        $(".animate").animatedClass({
          deviation: $win.height() - $win.height() * 0.2,
        });

        $win.on("scroll", function () {
          $(".animate").animatedClass({
            deviation: $win.height() - $win.height() * 0.2,
          });
        });

        $(document).on("shopify:section:load", function () {
          $(".animate").animatedClass({
            deviation: $win.height() - $win.height() * 0.2,
          });
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 117 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _touch = __webpack_require__(12);

        var $win = $(window);

        $('select[name="address[country]"]').each(function () {
          var $this = $(this);
          var thisID = $this.attr("id");
          var $province = $this
            .closest("form")
            .find('select[name="address[province]"]');
          var provinceID = $province.attr("id");
          var provinceHolderID = $province.closest(".form__row").attr("id");

          new Shopify.CountryProvinceSelector(thisID, provinceID, {
            hideElement: provinceHolderID,
          });

          $this.on("selectric-change", function () {
            var provinces = $(this).find("option:selected").data("provinces");
            var newOptions = "";

            if (provinces.length) {
              provinces.map(function (provice) {
                newOptions +=
                  '<option value="' +
                  provice[0] +
                  '">' +
                  provice[0] +
                  "</option>";
              });
            }

            $province.closest(".form__row").hide();

            if (newOptions !== "") {
              $province.closest(".form__row").show();
              $province.html(newOptions);
            }

            $province.selectric("refresh");
          });
          $province.selectric("refresh");
        });

        var $mainAddButton = $(".btn--new-main");
        $mainAddButton.on("click", function (e) {
          e.preventDefault();
          $(this).addClass("hidden");
        });

        $(".form--address .btn--new").on("click", function (e) {
          e.preventDefault();
          $mainAddButton.removeClass("hidden");
        });

        $(".edit-address-link, .btn--cancel").on("click", function (e) {
          $(this)
            .closest(".address")
            .toggleClass("editable-address")
            .closest(".section__content")
            .toggleClass("edit-progress");
        });

        $(".section-account .section__aside li.active a").on(
          "click",
          function (e) {
            if ((0, _touch.is_touch_device)() && $win.width() < 768) {
              e.preventDefault();
              $(this).closest("ul").toggleClass("visible");
            }
          }
        );
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 118 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _vanillaLazyload = __webpack_require__(119);

        var _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        new _vanillaLazyload2.default({
          elements_selector: ".lazyload",
        });

        $(window).on("shopify:section:load", function () {
          new _vanillaLazyload2.default({
            elements_selector: ".lazyload",
          });
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /* 119 */
    /***/ function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
      function _extends() {
        return (_extends =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
          }).apply(this, arguments);
      }
      function _typeof(t) {
        return (_typeof =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      !(function (t, e) {
        "object" === (false ? "undefined" : _typeof(exports)) &&
        "undefined" != typeof module
          ? (module.exports = e())
          : true
          ? !((__WEBPACK_AMD_DEFINE_FACTORY__ = e),
            (__WEBPACK_AMD_DEFINE_RESULT__ =
              typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
                ? __WEBPACK_AMD_DEFINE_FACTORY__.call(
                    exports,
                    __webpack_require__,
                    exports,
                    module
                  )
                : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
          : (t.LazyLoad = e());
      })(this, function () {
        "use strict";
        var t = "undefined" != typeof window,
          e =
            (t && !("onscroll" in window)) ||
            ("undefined" != typeof navigator &&
              /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
          n = t && "IntersectionObserver" in window,
          o = t && "classList" in document.createElement("p"),
          r = {
            elements_selector: "img",
            container: e || t ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            load_delay: 0,
            auto_unobserve: !0,
            callback_enter: null,
            callback_exit: null,
            callback_reveal: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            use_native: !1,
          },
          a = function (t, e) {
            var n,
              o = new t(e);
            try {
              n = new CustomEvent("LazyLoad::Initialized", {
                detail: { instance: o },
              });
            } catch (t) {
              (n = document.createEvent("CustomEvent")).initCustomEvent(
                "LazyLoad::Initialized",
                !1,
                !1,
                { instance: o }
              );
            }
            window.dispatchEvent(n);
          };
        var i = function (t, e) {
            return t.getAttribute("data-" + e);
          },
          s = function (t, e, n) {
            var o = "data-" + e;
            null !== n ? t.setAttribute(o, n) : t.removeAttribute(o);
          },
          c = function (t) {
            return "true" === i(t, "was-processed");
          },
          l = function (t, e) {
            return s(t, "ll-timeout", e);
          },
          u = function (t) {
            return i(t, "ll-timeout");
          },
          d = function (t, e) {
            t && t(e);
          },
          f = function (t, e) {
            (t._loadingCount += e),
              0 === t._elements.length &&
                0 === t._loadingCount &&
                d(t._settings.callback_finish);
          },
          _ = function (t) {
            for (var e, n = [], o = 0; (e = t.children[o]); o += 1)
              "SOURCE" === e.tagName && n.push(e);
            return n;
          },
          v = function (t, e, n) {
            n && t.setAttribute(e, n);
          },
          g = function (t, e) {
            v(t, "sizes", i(t, e.data_sizes)),
              v(t, "srcset", i(t, e.data_srcset)),
              v(t, "src", i(t, e.data_src));
          },
          m = {
            IMG: function (t, e) {
              var n = t.parentNode;
              n &&
                "PICTURE" === n.tagName &&
                _(n).forEach(function (t) {
                  g(t, e);
                });
              g(t, e);
            },
            IFRAME: function (t, e) {
              v(t, "src", i(t, e.data_src));
            },
            VIDEO: function (t, e) {
              _(t).forEach(function (t) {
                v(t, "src", i(t, e.data_src));
              }),
                v(t, "src", i(t, e.data_src)),
                t.load();
            },
          },
          b = function (t, e) {
            var n,
              o,
              r = e._settings,
              a = t.tagName,
              s = m[a];
            if (s)
              return (
                s(t, r),
                f(e, 1),
                void (e._elements =
                  ((n = e._elements),
                  (o = t),
                  n.filter(function (t) {
                    return t !== o;
                  })))
              );
            !(function (t, e) {
              var n = i(t, e.data_src),
                o = i(t, e.data_bg);
              n && (t.style.backgroundImage = 'url("'.concat(n, '")')),
                o && (t.style.backgroundImage = o);
            })(t, r);
          },
          h = function (t, e) {
            o
              ? t.classList.add(e)
              : (t.className += (t.className ? " " : "") + e);
          },
          p = function (t, e, n) {
            t.addEventListener(e, n);
          },
          y = function (t, e, n) {
            t.removeEventListener(e, n);
          },
          E = function (t, e, n) {
            y(t, "load", e), y(t, "loadeddata", e), y(t, "error", n);
          },
          w = function (t, e, n) {
            var r = n._settings,
              a = e ? r.class_loaded : r.class_error,
              i = e ? r.callback_loaded : r.callback_error,
              s = t.target;
            !(function (t, e) {
              o
                ? t.classList.remove(e)
                : (t.className = t.className
                    .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            })(s, r.class_loading),
              h(s, a),
              d(i, s),
              f(n, -1);
          },
          I = function (t, e) {
            var n = function n(r) {
                w(r, !0, e), E(t, n, o);
              },
              o = function o(r) {
                w(r, !1, e), E(t, n, o);
              };
            !(function (t, e, n) {
              p(t, "load", e), p(t, "loadeddata", e), p(t, "error", n);
            })(t, n, o);
          },
          k = ["IMG", "IFRAME", "VIDEO"],
          A = function (t, e) {
            var n = e._observer;
            z(t, e), n && e._settings.auto_unobserve && n.unobserve(t);
          },
          L = function (t) {
            var e = u(t);
            e && (clearTimeout(e), l(t, null));
          },
          x = function (t, e) {
            var n = e._settings.load_delay,
              o = u(t);
            o ||
              ((o = setTimeout(function () {
                A(t, e), L(t);
              }, n)),
              l(t, o));
          },
          z = function (t, e, n) {
            var o = e._settings;
            (!n && c(t)) ||
              (k.indexOf(t.tagName) > -1 && (I(t, e), h(t, o.class_loading)),
              b(t, e),
              (function (t) {
                s(t, "was-processed", "true");
              })(t),
              d(o.callback_reveal, t),
              d(o.callback_set, t));
          },
          O = function (t) {
            return (
              !!n &&
              ((t._observer = new IntersectionObserver(
                function (e) {
                  e.forEach(function (e) {
                    return (function (t) {
                      return t.isIntersecting || t.intersectionRatio > 0;
                    })(e)
                      ? (function (t, e) {
                          var n = e._settings;
                          d(n.callback_enter, t),
                            n.load_delay ? x(t, e) : A(t, e);
                        })(e.target, t)
                      : (function (t, e) {
                          var n = e._settings;
                          d(n.callback_exit, t), n.load_delay && L(t);
                        })(e.target, t);
                  });
                },
                {
                  root:
                    (e = t._settings).container === document
                      ? null
                      : e.container,
                  rootMargin: e.thresholds || e.threshold + "px",
                }
              )),
              !0)
            );
            var e;
          },
          N = ["IMG", "IFRAME"],
          C = function (t, e) {
            return (function (t) {
              return t.filter(function (t) {
                return !c(t);
              });
            })(
              ((n =
                t ||
                (function (t) {
                  return t.container.querySelectorAll(t.elements_selector);
                })(e)),
              Array.prototype.slice.call(n))
            );
            var n;
          },
          M = function (t, e) {
            (this._settings = (function (t) {
              return _extends({}, r, t);
            })(t)),
              (this._loadingCount = 0),
              O(this),
              this.update(e);
          };
        return (
          (M.prototype = {
            update: function (t) {
              var n,
                o = this,
                r = this._settings;
              ((this._elements = C(t, r)), !e && this._observer)
                ? ((function (t) {
                    return (
                      t.use_native && "loading" in HTMLImageElement.prototype
                    );
                  })(r) &&
                    ((n = this)._elements.forEach(function (t) {
                      -1 !== N.indexOf(t.tagName) &&
                        (t.setAttribute("loading", "lazy"), z(t, n));
                    }),
                    (this._elements = C(t, r))),
                  this._elements.forEach(function (t) {
                    o._observer.observe(t);
                  }))
                : this.loadAll();
            },
            destroy: function () {
              var t = this;
              this._observer &&
                (this._elements.forEach(function (e) {
                  t._observer.unobserve(e);
                }),
                (this._observer = null)),
                (this._elements = null),
                (this._settings = null);
            },
            load: function (t, e) {
              z(t, this, e);
            },
            loadAll: function () {
              var t = this;
              this._elements.forEach(function (e) {
                A(e, t);
              });
            },
          }),
          t &&
            (function (t, e) {
              if (e)
                if (e.length) for (var n, o = 0; (n = e[o]); o += 1) a(t, n);
                else a(t, e);
            })(M, window.lazyLoadOptions),
          M
        );
      });
      //# sourceMappingURL=lazyload.min.js.map

      /***/
    },
    /* 120 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";
      /* WEBPACK VAR INJECTION */ (function ($) {
        var _miniCart = __webpack_require__(17);

        var $formCart = $(".form--cart");

        $(".main").on("change", ".form--cart .qty input", function (e) {
          var $this = $(this);
          var $form = $this.closest(".form--cart");

          $form.addClass("loading");
          $.ajax({
            url: "/cart/update.js",
            type: "POST",
            dataType: "json",
            data: $this.attr("name") + "=" + $this.val(),
          }).done(function (update) {
            $formCart
              .find(".form__actions .total_row .price")
              .text(Shopify.formatMoney(update.total_price));

            if ($this.val() <= 0) {
              $this.closest("tr").remove();
            }

            $.ajax({
              url: "/cart",
              dataType: "html",
            })
              .done(function (data) {
                var $html = $(data);
                (0, _miniCart.updateHtml)($html, false);

                $formCart
                  .find(".shipping-text")
                  .html(
                    $html.find(".form--cart .form__body .shipping-text").html()
                  );

                if (update.item_count <= 0) {
                  $formCart.html($html.find(".form--cart").html());
                }
              })
              .always(function () {
                $form.removeClass("loading");
              });
          });
        });
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(0)));

      /***/
    },
    /******/
  ]
);
//# sourceMappingURL=bundle.js.map

//--Refresh Cart
function refreshCart(cart) {
  let cartButton = $(".header__cart-icon"),
    cartCount = cartButton.find("span.cart-count");

  //if cart count span doesn't exist, create one first
  if (!cartCount.length) {
    $(".header__cart-icon").prepend('<span class="cart-count"></span>');
    cartCount = cartButton.find("span");
  }

  if (cart.item_count == 0) {
    cartCount.remove();
  } else {
    var count = 0;
    for (var i = 0; i < cart.items.length; i++) {
      if (cart.items[i].vendor === "DailyKarma") {
        count += 1;
      } else {
        count += cart.items[i].quantity;
      }
    }

    cartCount.html(count);
    cartCount.addClass("visible");
  }
}

//Update Mini-Cart
function updateCart(cart) {
  let html = "",
    cartControl = "",
    pickGwp = "",
    pickGWPModal = "";
  const priceFreeshipping = $("body").data("price-free-ship");
  const pickGWPThreshold = $("body").data("price-pick-threshold");
  const pickGWPMinicartText = $("body").data("gwp-pick-text");
  const pickGWPMinicartBtnText = $("body").data("gwp-pick-btn-text");
  let cartTotal = cart.total_price;
  let nonShippableTotal = 0;

  $.each(cart.items, function (index, item) {
    if (!item.requires_shipping) {
      let nonShippableItemTotal = item.final_line_price * item.quantity;
      nonShippableTotal += nonShippableItemTotal;
    }

    let itemPrice =
      '<p class="price">' +
      "$" +
      (item.final_line_price / 100).toFixed(2) +
      "</p>";
    if (item.original_line_price > item.final_line_price) {
      itemPrice =
        '<p class="price">' +
        '<span class="was-price"> $' +
        (item.original_line_price / 100).toFixed(2) +
        "</span>" +
        " $" +
        (item.final_line_price / 100).toFixed(2) +
        "</p>";
    }

    if ((item.line_price / 100).toFixed(2) !== "0.00") {
      cartControl =
        '<div class="qty">' +
        '<a href="#!" class="qty-minus qty-edit" aria-label="Decrease quantity" tabindex="0">' +
        "<span></span>" +
        "</a>" +
        '<input class="mini-cart-qty" type="text" name="updates[' +
        item.variant_id +
        ']" data-mirror="true" value="' +
        item.quantity +
        '" aria-label="Quantity" disabled="true">' +
        '<a href="#!" class="qty-plus qty-edit" aria-label="Increase quantity" tabindex="0">' +
        "<span></span>" +
        "</a>";
      ("</div>");
    } else {
      cartControl = "<span></span>";
    }

    html +=
      "<tr>" +
      "<td>" +
      '<a href="' +
      item.url +
      '" class="item-image" style="background-image: url(' +
      item.image +
      ');" aria-label="' +
      item.title +
      '"></a>' +
      "</td>" +
      "<td>" +
      "<h5>" +
      '<a href="' +
      item.url +
      '" class="line-item__title">' +
      item.title +
      "</a>" +
      "</h5>" +
      itemPrice +
      cartControl +
      "</td>" +
      "<td>" +
      '<a href="/cart/change?id=' +
      item.variant_id +
      '&amp;quantity=0" class="remove-product js-remove" aria-label="Remove ' +
      item.title +
      ' from cart"></a>' +
      "</td>" +
      "</tr>";
  });

  if (pickGWPThreshold) {
    pickGwp =
      '<div class="gwp">' +
      pickGWPMinicartText +
      '<button type="button" class="btn btn--border" data-micromodal-trigger="modal-gwp">' +
      pickGWPMinicartBtnText +
      "</button>" +
      "</div>";
    pickGWPModal =
      '<div class="modal-gwp micromodal-slide results" id="modal-gwp" aria-hidden="true">' +
      '<div class="modal__overlay" tabindex="-1" data-micromodal-close>' +
      '<div class="modal__wrapper" data-micromodal-close>' +
      '<div class="modal__container" role="dialog" aria-modal="true">' +
      '<div class="modal__header">' +
      '<h3 class="section__subtitle">Pick <span class="bold">2 FREE <br>FULL-SIZE</span> Products</h3>' +
      '<button id="modal_cls_btn" class="modal__close close" aria-label="Close modal" data-micromodal-close></button>' +
      "</div>" +
      '<div class="modal__content" id="modal-results-content">' +
      '<article class="section__article">' +
      '<h4>Choose any <span class="bold">TWO</span>:</h4>' +
      '<ul class="gwp-list">' +
      "</ul>" +
      "</article>" +
      "</div>" +
      '<div class="button__wrapper">' +
      '<button class="btn btn--border minicart" id="pick-gwp-btn">ADD TO CART<br>(FOR FREE)</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  if (nonShippableTotal > 0) {
    cartTotal -= nonShippableTotal;
  }

  if (cart.item_count > 0) {
    if (cartTotal < priceFreeshipping) {
      let priceDiff = priceFreeshipping - cartTotal;
      priceDiff = "$" + (priceDiff / 100).toFixed(2);
      $("#mini_cart_form .mini-cart__head p.shipping-text").text(
        `You’re ${priceDiff} away from free shipping!`
      );
    } else {
      $("#mini_cart_form .mini-cart__head p.shipping-text").text(
        "You qualify for free shipping!"
      );
    }
    if ($("#mini_cart_form .total-box .total--container").length) {
      $("#mini_cart_form .total_price").text(
        "$" + (cart.total_price / 100).toFixed(2)
      );
    } else {
      $("#mini_cart_form .total-box").append(
        '<div class="total--container"><div class="total_row"><h6>Subtotal</h6><p class="total_price"></p></div><button type="submit" class="btn btn--border btn--checkout" name="checkout">Checkout</button></div>'
      );
      $("#mini_cart_form .total_price").text(
        "$" + (cart.total_price / 100).toFixed(2)
      );
    }
    if (
      !$("#mini_cart_form .mini-cart__inner .mini-cart__divider.top").length
    ) {
      $("#mini_cart_form .mini-cart__inner").append(
        '<hr class="mini-cart__divider top">'
      );
    }
    if (pickGWPThreshold && cartTotal >= pickGWPThreshold) {
      $("#mini_cart_form .mini-cart__head p.shipping-text").append(pickGwp);
      $("#mini_cart_form .mini-cart__head .continue-shopping").remove();
      $(".header__inner").append(pickGWPModal);
      MicroModal.init({
        onShow: function (modal) {
          if (modal.id == "modal-gwp") {
            $("#modal-gwp").css("opacity", 0);
            let product1 = {};
            let product2 = {};
            let product3 = {};
            let product4 = {};
            const gwpLimit = $("body").data("pick-limit");
            const product1Id = $("body").data("pick-varid-1");
            const product1Handle = $("body").data("pick-prod-1");
            const product2Id = $("body").data("pick-varid-2");
            const product2Handle = $("body").data("pick-prod-2");
            const product3Id = $("body").data("pick-varid-3");
            const product3Handle = $("body").data("pick-prod-3");
            const product4Id = $("body").data("pick-varid-4");
            const product4Handle = $("body").data("pick-prod-4");
            setTimeout(function () {
              product1Handle &&
                jQuery.getJSON(
                  `/products/${product1Handle}.js`,
                  function (product) {
                    product1 = {
                      ...product1,
                      title: product.title,
                      img: product.featured_image,
                      available: product.available,
                    };
                    if (product1.available) {
                      let image1Path = product1.img;
                      if (image1Path.includes(".jpg")) {
                        image1Path = product1.img
                          .split(".jpg")
                          .join("_300x.jpg");
                      } else if (image1Path.includes(".png")) {
                        image1Path = product1.img
                          .split(".png")
                          .join("_300x.png");
                      }
                      $(".modal-gwp.is-open#modal-gwp .gwp-list").append(
                        `<li><div><img class='gwp-img' src='${image1Path}'/><h4>${product1.title}</h4></div><div><input type="checkbox" class="input-checkbox" id="${product1Id}"></div></li>`
                      );
                    }
                    product2Handle &&
                      jQuery.getJSON(
                        `/products/${product2Handle}.js`,
                        function (product) {
                          product2 = {
                            ...product2,
                            title: product.title,
                            img: product.featured_image,
                            available: product.available,
                          };
                          if (product2.available) {
                            let image2Path = product2.img;
                            if (image2Path.includes(".jpg")) {
                              image2Path = product2.img
                                .split(".jpg")
                                .join("_300x.jpg");
                            } else if (image2Path.includes(".png")) {
                              image2Path = product2.img
                                .split(".png")
                                .join("_300x.png");
                            }
                            $(".modal-gwp.is-open#modal-gwp .gwp-list").append(
                              `<li><div><img class='gwp-img' src='${image2Path}'/><h4>${product2.title}</h4></div><div><input type="checkbox" class="input-checkbox" id="${product2Id}"></div></li>`
                            );
                          }
                          product3Handle &&
                            jQuery.getJSON(
                              `/products/${product3Handle}.js`,
                              function (product) {
                                product3 = {
                                  ...product3,
                                  title: product.title,
                                  img: product.featured_image,
                                  available: product.available,
                                };
                                if (product3.available) {
                                  let image3Path = product3.img;
                                  if (image3Path.includes(".jpg")) {
                                    image3Path = product3.img
                                      .split(".jpg")
                                      .join("_300x.jpg");
                                  } else if (image3Path.includes(".png")) {
                                    image3Path = product3.img
                                      .split(".png")
                                      .join("_300x.png");
                                  }
                                  $(
                                    ".modal-gwp.is-open#modal-gwp .gwp-list"
                                  ).append(
                                    `<li><div><img class='gwp-img' src='${image3Path}'/><h4>${product3.title}</h4></div><div><input type="checkbox" class="input-checkbox" id="${product3Id}"></div></li>`
                                  );
                                }
                                if (!product4Handle) {
                                  $(
                                    ".mini-cart .mini-cart__items tr td:first-child a"
                                  ).each(function () {
                                    const cartItemVariantId = $(this)
                                      .attr("href")
                                      .split("variant=")[1];
                                    $(
                                      ".modal-gwp.is-open#modal-gwp ul.gwp-list li input.input-checkbox"
                                    ).each(function () {
                                      if (
                                        $(this).attr("id") == cartItemVariantId
                                      ) {
                                        $(this).prop("checked", true);
                                      }
                                    });
                                  });
                                  $("#modal-gwp").css("opacity", 1);
                                  $(
                                    ".modal-gwp.is-open#modal-gwp ul.gwp-list li input.input-checkbox"
                                  ).on("change", function (e) {
                                    if (
                                      $(
                                        ".modal-gwp.is-open#modal-gwp ul.gwp-list input[type=checkbox]:checked"
                                      ).length >= gwpLimit
                                    ) {
                                      $(this).prop("checked", false);
                                      console.log("allowed only 2");
                                    }
                                  });
                                } else {
                                  jQuery.getJSON(
                                    `/products/${product4Handle}.js`,
                                    function (product) {
                                      product4 = {
                                        ...product4,
                                        title: product.title,
                                        img: product.featured_image,
                                        available: product.available,
                                      };
                                      if (product4.available) {
                                        let image4Path = product4.img;
                                        if (image4Path.includes(".jpg")) {
                                          image4Path = product4.img
                                            .split(".jpg")
                                            .join("_300x.jpg");
                                        } else if (
                                          image4Path.includes(".png")
                                        ) {
                                          image4Path = product4.img
                                            .split(".png")
                                            .join("_300x.png");
                                        }
                                        $(
                                          ".modal-gwp.is-open#modal-gwp .gwp-list"
                                        ).append(
                                          `<li><div><img class='gwp-img' src='${image4Path}'/><h4>${product4.title}</h4></div><div><input type="checkbox" class="input-checkbox" id="${product4Id}"></div></li>`
                                        );
                                      }

                                      $(
                                        ".mini-cart .mini-cart__items tr td:first-child a"
                                      ).each(function () {
                                        const cartItemVariantId = $(this)
                                          .attr("href")
                                          .split("variant=")[1];
                                        $(
                                          ".modal-gwp.is-open#modal-gwp ul.gwp-list li input.input-checkbox"
                                        ).each(function () {
                                          if (
                                            $(this).attr("id") ==
                                            cartItemVariantId
                                          ) {
                                            $(this).prop("checked", true);
                                          }
                                        });
                                      });
                                      $("#modal-gwp").css("opacity", 1);
                                      $(
                                        ".modal-gwp.is-open#modal-gwp ul.gwp-list li input.input-checkbox"
                                      ).on("change", function (e) {
                                        if (
                                          $(
                                            ".modal-gwp.is-open#modal-gwp ul.gwp-list input[type=checkbox]:checked"
                                          ).length >= gwpLimit
                                        ) {
                                          $(this).prop("checked", false);
                                          console.log("allowed only 2");
                                        }
                                      });
                                    }
                                  );
                                }
                              }
                            );
                        }
                      );
                  }
                );
            }, 1);
          }
        },
        onClose: function () {
          $("#pick-gwp-btn").attr("tabindex", "-1");
          $("#modal_cls_btn").attr("tabindex", "-1");
          $(".modal-gwp#modal-gwp ul.gwp-list").empty();
        },
      });
    } else if (pickGWPThreshold && cartTotal < pickGWPThreshold) {
      if (!$("#mini_cart_form .mini-cart__head .continue-shopping").length) {
        $("#mini_cart_form .mini-cart__head").append(
          '<div class="continue-shopping"><a href="https://pipettebaby.com/collections/bestsellers-1" class="btn btn--border">Continue Shopping</a></div>'
        );
      }
    }
  } else {
    $("#mini_cart_form .mini-cart__head p.shipping-text").text(
      "Your cart is currently empty."
    );
    if ($("#mini_cart_form .total-box .total--container").length) {
      $("#mini_cart_form .total-box .total--container").remove();
    }
    $(".mini-cart__divider.top").remove();
  }

  if ($("#mini_cart_form .mini-cart__items").length) {
    $("#mini_cart_form .mini-cart__items table tbody").html(html);
  } else {
    $("#mini_cart_form .mini-cart__inner").append(
      '<div class="mini-cart__items"><table><tbody></tbody></table></div>'
    );
    $("#mini_cart_form .mini-cart__items table tbody").html(html);
  }

  refreshCart(cart);
}
