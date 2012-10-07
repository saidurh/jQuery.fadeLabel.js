/*\ 
 ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰
                                            
         Title: Inline Labels Plugin 
           URL: http://saidur.com/   
        Author: Saidur (Cy) Hossain (@saidurh)

           Use: Set the Label Name in the input's "placeholder" attribute.

                Then apply the plugin to the inputs with placeholder attributes.

                    $('input[placeholder]').fadeLabel({
                      borderRadius: 3
                    });

         Notes: Width of inputs should be defined.

   Description: This plugin will automagically take 
                any input field with a "placeholder" attr 
                and convert it into a smart in-field label.
                                                                                        
 ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰ ✰
\*/

(function($){

	$.fn.fadeLabel = function(options){	
	
		var defaults = {
			borderRadius: 0,
			fallbackWidth: 100,
			fallbackHeight: 15
		}
	
		var options = $.extend(defaults, options); 
	
		return this.each(function(index) {
	  
			var o = options;
			var input = $(this);
	
			createLabel();

			function createLabel () {	

				input.wrap('<label class="fade-label" />');
				
				var label = input.parent();
				var text = input.attr("placeholder");
				var borderRadiusHTML =  "-moz-border-radius: "+ o.borderRadius +"px;-webkit-border-radius: "+ o.borderRadius +"px;-o-border-radius: "+ o.borderRadius +"px;-ms-border-radius: "+ o.borderRadius +"px;-khtml-border-radius: "+ o.borderRadius +"px;border-radius: "+ o.borderRadius +"px;"
				var span = "<span style='" + borderRadiusHTML + "'>" + text + "</span>";
				
				label.prepend(span);
				input.removeAttr("placeholder");

				watchLabel(label);		

			}
	
			function watchLabel (label) {

				// Vars
				var input = label.find('input');
				var span = label.find('span');

				// Copy styles from input to span
				span.css({
							     'padding-top': parseInt(input.css('padding-top')) +  
																	parseInt(input.css('border-top-width')) + "px",
								 'padding-right': parseInt(input.css('padding-right')) +	 
																	parseInt(input.css('border-right-width')) + "px",
							    'padding-left': parseInt(input.css('padding-left')) + 
																	parseInt(input.css('border-left-width')) + "px",
								'padding-bottom': parseInt(input.css('padding-bottom')) + 
																  parseInt(input.css('border-bottom-width')) + "px",
								    'margin-top': input.css('margin-top'),
								  'margin-right': input.css('margin-right'),
								   'margin-left': input.css('margin-left'),
								 'margin-bottom': input.css('margin-bottom'),
						  'background-color': input.css('background-color'),
						  'background-image': input.css('background-image'),
						 'background-repeat': input.css('background-repeat'),
					 'background-position': input.css('background-position'),
								     'font-size': input.css('font-size'),
								   'font-family': input.css('font-family'),
								   'font-weight': input.css('font-weight'),
								    'text-align': input.css('text-align'),
								   'text-shadow': input.css('text-shadow'),
								      'position': input.css('position'),
								           'top': input.css('top'),
								          'left': input.css('left'),
								         'right': input.css('right'),
								        'bottom': input.css('bottom'),
								   'text-shadow': input.css('text-shadow'),
								       'z-index': input.css('z-index'),
								       'display': 'inline-block',
								        'cursor': 'text'
				});

				input.css({
						'background-color': 'transparent',
						'background-image': 'none',
						'position': 'absolute',
						'top': '0',
						'left': '0',
						'z-index': '2'
				});

				label.css({
						'float': input.css('float'), 
						'position': 'relative',
						'display': 'inline-block',
				});
				

				// Define a width if undefined.
				if (input.width()) {
					span.css({
						'width': input.width()+'px'
					});
				} else {
					span.css({
						'width': o.fallbackWidth + 'px'
					});
					input.css({
						'width': o.fallbackWidth + 'px'
					});
				}
				if (input.height()) {
					span.css({
						'height': input.height()+'px'
					});
				} else {
					span.css({
						'height': o.fallbackHeight + 'px'
					});
					input.css({
						'height': o.fallbackHeight + 'px'
					});
				}


				// Watch Input
				blurred();

				input.focus(focused)
				     .blur(blurred)
				     .bind('input', toggleLabel)
				     .keyup(toggleLabel)
				     .keydown(toggleLabel)
				     .change(toggleLabel);

				function toggleLabel () {
					var val = input.val();
					if (val == ""){
						span.css("color", "#bbb");
					} else {
						span.css("color", "#fff");
					}
				}

				function focused () {
					var val = input.val();
					if (val) {
						span.css("color", "#fff");
					} else {
						span.css("color", "#bbb");
					}
				}

				function blurred () {
					var val = input.val();
					input.removeAttr("placeholder");
					if (val) {
						span.css("color", "#fff");
					} else {
						span.css("color", "#959595");
					}
					
				}
			}
		});
	};
})(jQuery);
