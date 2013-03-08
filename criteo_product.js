;(function($,document,window,undefined){
  var _criteo_product_plugin = function(_criteo_product_options)
  {
    var _criteo_product_settings = jQuery.extend({
        id:null,
        widget_id1:null,
        widget_id2:null,
        selection: jQuery('.skuList input:first').attr("currentproductid")
      }, _criteo_product_options);

    var _criteo_product = {
      product_id:null,
      init: function()
      {
        if(!_criteo_product.check()) return false;

        _criteo_product.load.criteo();
      },
      set:
      {
        vars: function()
        {
          window.CRITEO_CONF = [[{
            pageType: 'product',
            'Product ID': _criteo_product.product_id
          }], [_criteo_product_settings.id, 'psu', 'us.', '110', [[_criteo_product_settings.widget_id1, _criteo_product_settings.widget_id2]],
            { 'Product ID': ['i', 0] }
          ]];
          
          if(typeof window.CRITEO != "undefined")
            window.CRITEO.Load(false);
        },
        product: function()
        {
          var _id = _criteo_product_settings.selection||null;

          if(_id==null) { 
            _criteo_product.log("Id do produto não encontrado.")
            return false; 
          }
          _criteo_product.product_id = _id;
          _criteo_product.set.vars();
        }
      },
      load:
      {
        criteo: function()
        {
          // Load criteo_id.js if not already on the system
          if(typeof CRITEO=="undefined")
            jQuery.getScript("/arquivos/criteo_ld.js",function(){
              // Once the script is loaded I can set the variables
              _criteo_product.set.product();
            });
           else
            // If criteo script is present on the system I can set the variables
          _criteo_product.set.product();
        }
      },
      check: function()
      {
        var _valid=true;

        if(typeof _criteo_product_settings.id=="undefined"||_criteo_product_settings.id==null)
        {
          _valid = false;
          _criteo_product.log("O id para o Criteo é obrigatório.");
        }
        if(typeof _criteo_product_settings.widget_id1=="undefined"||_criteo_product_settings.widget_id1==null)
        {
          _valid = false;
          _criteo_product.log("O # para o widget_id1 é obrigatório.");
        }
        if(typeof _criteo_product_settings.widget_id2=="undefined"||_criteo_product_settings.widget_id2==null)
        {
          _valid = false;
          _criteo_product.log("O # para o widget_id2 é obrigatório.");
        }

        return _valid;
      },
      log: function(msg)
      {
        if(typeof console=="undefined") return false;

        console.log(msg);
      }
    }
    _criteo_product.init();
  };

  jQuery.criteo_product = function(_criteo_options){
    return new _criteo_product_plugin(_criteo_options);
  };

})(jQuery,document,window);