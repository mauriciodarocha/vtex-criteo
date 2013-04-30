/* DO NOT DELETE THIS */
var set_cookie = function (e, a, b) {var c = new Date; c.setDate(c.getDate() + b); a = escape(a) + (null == b ? "" : "; expires=" + c.toUTCString()); document.cookie = e + "=" + a }, get_cookie = function (e) {var a, b, c, d = document.cookie.split(";"); for (a = 0; a < d.length; a++) if (b = d[a].substr(0, d[a].indexOf("=")), c = d[a].substr(d[a].indexOf("=") + 1), b = b.replace(/^\s+|\s+$/g, ""), b == e) return unescape(c) };
Array.prototype.inArray = function(value) {var i; for (i=0; i < this.length; i++) if (this[i] == value) return true; return false; };
/* DO NOT DELETE ABOVE THIS */

;(function ($, document, window, undefined) {
  var _criteo_checkout_plugin = function (_criteo_checkout_options) {

    var _criteo_checkout_settings = jQuery.extend({
      id: null,
      widget_id1: null,
      widget_id2: null
    }, _criteo_checkout_options);

    var _criteo_checkout = {
      cart_data:null,
      skus:[],
      products: 0,
      ajax_complete_triggered: false,
      product_id: null,
      transaction_id: null,
      product_ids: [],
      prices: [],
      quantities: [],
      cookie_name: "__cart_data",
      ajax_flag: false,
      init: function () {
        if (!_criteo_checkout.check_options()) return false;

        if (jQuery("body").hasClass("carrinho")) {
          _criteo_checkout.set.cart_data();
          jQuery(document).ajaxComplete(_criteo_checkout.ajax_complete);
        }

        if (jQuery("body").hasClass("finaliza-compra"))
          _criteo_checkout.load.criteo();
        
      },
      ajax_complete: function () {
        _criteo_checkout.ajax_complete_triggered = true;
        _criteo_checkout.set.cart_data();
      },
      set: {
        events: function () {
          if(jQuery(".excluir .excluir").not(".active").length<=0) return false;

          jQuery(".excluir .excluir").not(".active").addClass("active").click(function () 
          {
            var sku = jQuery(this).parents("tr").find(".quantidade .boxQuantidade").attr("title");
            delete(_criteo_checkout.cart_data[sku]);
          });
        },
        cart_data: function () {
          _criteo_checkout.cart_data = _criteo_checkout.cart_data||{};

          // set product id on cart
          var get_id = function (sku, ndx, length) {
            if(_criteo_checkout.skus.inArray(sku)) return false;

            _criteo_checkout.skus.push(sku);

            var opt = {
              url: "/produto/sku/" + sku,
              success: function (data) {
                var product_id = data[0].IdProduct;
                if (product_id !== "undefined" && product_id !== null)
                  _criteo_checkout.cart_data[sku].id = ""+product_id;

                if(ndx === (length-1))
                  _criteo_checkout.load.criteo();

              }
            };

            jQuery.ajax(opt);
          };

          var length = jQuery(".quantidade .boxQuantidade").length;
          jQuery(".quantidade .boxQuantidade").each(function (ndx, item) {
            var sku = jQuery(item).attr("title");
            var qty = jQuery(item).val();
            var price = jQuery(item).parents("tr").find(".preco-total").text().replace(/\s*([\d,.]*?)/g, "$1").replace(/R\$/, '').replace(/\./, '').replace(/,/, '.');

            _criteo_checkout.cart_data[sku] = _criteo_checkout.cart_data[sku]||{};

            if(typeof _criteo_checkout.cart_data[sku].id==="undefined")
              get_id(sku, ndx);

            _criteo_checkout.cart_data[sku].qty = qty||1;
            _criteo_checkout.cart_data[sku].price = price||"0.00";

            if(typeof _criteo_checkout.cart_data[sku].id!=="undefined"&&_criteo_checkout.ajax_complete_triggered&&ndx === (length-1))
            {
              _criteo_checkout.ajax_complete_triggered=false;
              _criteo_checkout.load.criteo();
            }
          });

        },
        data: {
          checkout: function () {
            _criteo_checkout.transaction_id = document.getElementById("orderid").innerHTML;
            var _data = _criteo_checkout.get.cookie() || "";

            if (_data === "") return false;

            _criteo_checkout.product_ids = _data.product_ids;
            _criteo_checkout.skus = _data.skus;
            _criteo_checkout.prices = _data.prices;
            _criteo_checkout.quantities = _data.qtys;

            _criteo_checkout.set.criteo.confirmation();
          },
          cart: function () {
            var _sku, _qty, _price, _skus = [], _id, _ids = [], _qtys = [], _prices = [];
            for(var item in _criteo_checkout.cart_data){
              _id = _criteo_checkout.cart_data[item].id;
              _price = _criteo_checkout.cart_data[item].price;
              _qty = _criteo_checkout.cart_data[item].qty;

              if (_id !== null) {
                _ids.push(_id);
                _prices.push(_price);
                _qtys.push(_qty);
              }
            };

            _criteo_checkout.product_ids = _ids;
            _criteo_checkout.prices = _prices;
            _criteo_checkout.quantities = _qtys;

            _criteo_checkout.set.cookie();
            _criteo_checkout.set.criteo.cart();
          }
        },
        criteo: {
          cart: function () {
            window.CRITEO_CONF = [
              [{
                  pageType: 'basket',
                  'Product IDs': _criteo_checkout.product_ids,
                  'Prices': _criteo_checkout.prices,
                  'Quantities': _criteo_checkout.quantities
                }
              ],
              [_criteo_checkout_settings.id, 'pmo', 'us.', '100', [
                  [_criteo_checkout_settings.widget_id1, _criteo_checkout_settings.widget_id2]
                ], {
                  'Product IDs': ['i', 1],
                  'Prices': ['p', 1],
                  'Quantities': ['q', 1]
                }
              ]
            ];

            if (typeof window.CRITEO != "undefined")
              window.CRITEO.Load(false);
          },
          confirmation: function () {

            window.CRITEO_CONF = [
              [{
                  pageType: 'confirmation',
                  'Transaction ID': _criteo_checkout.transaction_id,
                  'Product IDs': _criteo_checkout.product_ids,
                  'Prices': _criteo_checkout.prices,
                  'Quantities': _criteo_checkout.quantities
                }
              ],
              [_criteo_checkout_settings.id, 'pmo', 'us.', '110', [
                  [_criteo_checkout_settings.widget_id1, _criteo_checkout_settings.widget_id2]
                ], {
                  'Transaction ID': ['t', 0],
                  'Product IDs': ['i', 1],
                  'Prices': ['p', 1],
                  'Quantities': ['q', 1]
                }
              ]
            ];

            if (typeof window.CRITEO != "undefined")
              window.CRITEO.Load(false);

            _criteo_checkout.reset.cookie();
          }
        },
        cookie: function () {
          var _data = {};
          _data.product_ids = _criteo_checkout.product_ids;
          _data.skus = _criteo_checkout.skus;
          _data.prices = _criteo_checkout.prices;
          _data.qtys = _criteo_checkout.quantities;
          if (typeof Object.prototype.toSource == "undefined")
            _data_string = JSON.stringify(_data);
          else
            _data_string = _data.toSource();
          set_cookie(_criteo_checkout.cookie_name, _data_string, {
            "expires": 1,
            "path": "/"
          });
        },
        product: function (_sku) {
          if (typeof _sku == "undefined" || _sku == null) {
            _criteo_checkout.log("Sku não encontrado.")
            return false;
          }

          _criteo_checkout.product_id = _sku;
          _criteo_checkout.set.criteo.cart();
        }
      },
      get: {
        cookie: function () {
          return (new Function("return " + get_cookie(_criteo_checkout.cookie_name)))();
        }
      },
      load: {
        criteo: function () {
          // Load criteo_id.js if not already on the system
          if (typeof CRITEO == "undefined" && !_criteo_checkout.ajax_flag) {
            _criteo_checkout.ajax_flag = true;
            jQuery.getScript("/arquivos/criteo_ld.js", function () {
              // Once the script is loaded I can set the variables
              _criteo_checkout.check.page();
              _criteo_checkout.ajax_flag = false;
            });
          } else
          // If criteo script is present on the system I can set the variables
            _criteo_checkout.check.page();
        }
      },
      reset: {
        cookie: function () {
          set_cookie(_criteo_checkout.cookie_name, '', -1);
        }
      },
      check: {
        page: function () {
          if (jQuery("body").hasClass("carrinho"))
            _criteo_checkout.set.data.cart();
          else
            _criteo_checkout.set.data.checkout();
        }
      },
      check_options: function () {
        var _valid = true;

        if (typeof _criteo_checkout_settings.id == "undefined" || _criteo_checkout_settings.id == null) {
          _valid = false;
          _criteo_home.log("O id para o Criteo é obrigatório.");
        }
        if (typeof _criteo_checkout_settings.widget_id1 == "undefined" || _criteo_checkout_settings.widget_id1 == null) {
          _valid = false;
          _criteo_home.log("O # para o widget_id1 é obrigatório.");
        }
        if (typeof _criteo_checkout_settings.widget_id2 == "undefined" || _criteo_checkout_settings.widget_id2 == null) {
          _valid = false;
          _criteo_home.log("O # para o widget_id2 é obrigatório.");
        }

        return _valid;
      },
      log: function (msg) {
        if (typeof console == "undefined") return false;

        console.log(msg);
      }
    };

    _criteo_checkout.init();
  };

  jQuery.criteo_checkout = function (_criteo_options) {
    return new _criteo_checkout_plugin(_criteo_options);
  };

})(jQuery, document, window);
