(function(){
   var _criteo_home_plugin = function(_criteo_home_options)
   {
		var _criteo_home_settings = jQuery.extend({
				id:null,
				widget_id1:null,
				widget_id2:null
			}, _criteo_home_options);

		var _criteo_home = {
			init: function()
			{

				if(!_criteo_home.check()) return false;

				_criteo_home.load.criteo();
			},
			set:
			{
				criteo:
				{
					vars: function()
					{
						window.CRITEO_CONF = [[{ 
							pageType: 'home' 
						}], [_criteo_home_settings.id, 'pmo', 'us.', '110', [[_criteo_home_settings.widget_id1, _criteo_home_settings.widget_id2]]]];
						if (typeof window.CRITEO != "undefined")
							window.CRITEO.Load(false);
					}
				}
			},
			load:
			{
				criteo: function()
				{
		            // load criteo_id.js if not already on the system
					if(typeof CRITEO=="undefined")
		                jQuery.getScript("/arquivos/criteo_ld.js",function(){ 
		                	// Once the script is loaded I can set the variables
							_criteo_home.set.criteo.vars();
		                });
		            else
		            	// If criteo script is present on the system I can set the variables
						_criteo_home.set.criteo.vars();
				}
			},
			check: function()
			{
				var _valid=true;

				if(typeof _criteo_home_settings.id=="undefined"||_criteo_home_settings.id==null)
				{
					_valid = false;
					_criteo_home.log("O id para o Criteo é obrigatório.");
				}
				if(typeof _criteo_home_settings.widget_id1=="undefined"||_criteo_home_settings.widget_id1==null)
				{
					_valid = false;
					_criteo_home.log("O # para o widget_id1 é obrigatório.");
				}
				if(typeof _criteo_home_settings.widget_id2=="undefined"||_criteo_home_settings.widget_id2==null)
				{
					_valid = false;
					_criteo_home.log("O # para o widget_id2 é obrigatório.");
				}

				return _valid;
			},
			log: function(msg)
			{
				if(typeof console=="undefined") return false;

				console.log(msg);
			}
		}

		_criteo_home.init();
	};

    jQuery.criteo_home = function(_criteo_options){
        return new _criteo_home_plugin(_criteo_options);
    };

})(jQuery);