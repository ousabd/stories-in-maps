
// CLEAR CANVAS
canvas.selectAll("*").remove();



// WHEN DOCUMENT IS READY
$(document).ready(function(){
                             
});



// SETUP X-EDITABLE  
$.fn.editable.defaults.mode = "inline";
$.fn.editable.defaults.onblur = "ignore";

// Maximize width of editable inputs
function fcnEditableOnShown(e,editable) {
  setTimeout(function() { //so as to be fired only after DOM is completely rendered
    $(".editable-input").each(function() {
      var $divbuttons = $(this).parent().children(".editable-buttons");
      $(this).width(function() {
        return $(this).parent().width()-$divbuttons.outerWidth()-parseInt($divbuttons.css("margin-left"));
      });
    }); 
  },20);  
}



// DEFINE GLOBAL VARIABLES
// Relative width of labels and inputs in forms
var labelWidth = 4/12;
var fieldWidth = 8/12;



// LOAD JSON DATA
$.getJSON("testDB.json",function(json){
	data = json;
	});


// SPLIT INTERfACE IN TWO SECTIONS: ONE FOR THE LIST OF ELEMENTS< ONE FOR THE FORM
$('#cid').append($('<div/>').attr({id:'ui-left-half'}));
$('#cid').append($('<div/>').attr({id:'ui-right-half'}));


// LIST OF ELEMENTS USING THE BOOTSTRAP FRAMEWORK
// ----------------------------------------------

var sections = ['Tree','Label','Area','People','Migration'];

// Create a container for the list
$('#ui-left-half').append($('<div/>').attr({id:"listofelem", class:"panel panel-group"}));           					 

									 
// Create containers for sublists, along with headings, counters and sublist-level controls 
for (var i=0,c=sections.length; i<c; i++) {
	$('#listofelem')
	  .append($('<div/>')
				.attr('class','panel panel-default')
                .append($('<button/>')
						  .attr({'class':"btn btn-block btn-default panel-heading align-left",
                                 'id':sections[i].toLowerCase(),
                                 'data-toggle':'collapse',
                                 'data-target':"#listofelem-"+sections[i].toLowerCase()
                                })
						  .text(sections[i])
						  .append($('<span/>')
									.attr('class','badge pull-right')
                                    .text('+')
									)
						  .append($('<span/>')
									.attr({id:"counter-"+sections[i].toLowerCase(), class:"badge pull-right"})
                                    .text(0)
								    )
						  )			
                .append($('<div/>').attr({id:"listofelem-"+sections[i].toLowerCase(), class:"list-group collapse"}))   
                );
};


 
// Fill list with elements, along with element-level controls
var id; 
//alert(data.length); 
for (var i=0,c=data.length;i<c;i++) {
  id = '#listofelem-'+sections[i].toLowerCase();
  //alert(id);
   
  // Element and controls
  $(id).append($('<a/>')
				 .attr('class','list-group-item')
                 .text(data[i].name)
    			 .on('click',formcreate) 
                 .append($('<span/>')
						   .attr('class','badge pull-right')
                           .append($('<i/>').attr('class','fa fa-copy').on('click',"alert('HEYDUPLICATE');"))
						   )
                 .append($('<span/>')
						   .attr('class','badge pull-right')
                           .append($('<i/>').attr('class','fa fa-trash-o').on('click',"alert('DELETE');"))
                           )
                 .append($('<span/>')
						   .attr('class','badge pull-right')
                           .append($('<i/>').attr('class','fa fa-pencil').on('click',"alert('EDIT')"))
                           )
               );
  
  // Update data type counter	
  $('span#counter-' + data[i].type).text(parseInt($('span#counter-' + data[i].type).text())+1);
}; 


// Prevent element-level controls from triggering the on-click event of element
$('a.list-group-item *').click(function(e){ e.stopPropagation(); });





// FORM FOR ATTRIBUTES OF ELEMENT
// ------------------------------
function formcreate(){


// CLEAR EVERYTHING
$('#ui-right-half').empty();
  

// CALCULATE DEPTH OF TREE
for (var i=0,c=data.length;i<c;i++) {
if (data[i].type=='tree') {
	var depth = 0;
	
}
};

  
// Create inputs for Name, Short & Long Descriptions, and Keywords (those 4 fields exist for all types of elements)
$('#ui-right-half')
   .append($('<form/>').attr({class:"form-horizontal", role:"form", id:'elemForm'})); 
																	  
$('#elemForm')
   .append($('<div/>').attr('class','form-group')
			  .append($('<label/>')
					  	 .attr('class','col-md-'+labelWidth*12 + ' control-label mycolpadding')
					  	 .text('Name')
			  )                                                  
			  .append($('<div/>')
                      	 .attr('class','col-md-'+fieldWidth*12 + ' mycolpadding')
					  	 .append($('<a/>')
                                 	.editable({
                                      type:"text",
                                      placeholder:"Name (required)",
                                      validate: function(value) {
                                        if($.trim(value) == '') {
                                            return 'This field is required!';
                                        }
                                      }
                                    })
                      				.on('shown',fcnEditableOnShown)
                       	 )
			  )
   )

   .append($('<div/>').attr('class','form-group')
			  .append($('<label/>')
					     .attr('class','col-md-'+labelWidth*12 + ' control-label mycolpadding')
					     .text('Short description')
			  )                                                  
			  .append($('<div/>')
                      	 .attr('class','col-md-'+fieldWidth*12 + ' mycolpadding')
                         .append($('<a/>')
                                 	.editable({type:"text", placeholder:"Short description"})
									.on('shown',fcnEditableOnShown)
                         )
			  )
   )

   .append($('<div/>').attr('class','form-group')
			  .append($('<label/>')
					  	 .attr('class','col-md-'+labelWidth*12 + ' control-label mycolpadding')
					  	 .text('Long description')
			  )                                                  
			  .append($('<div/>')
                      	 .attr('class','col-md-'+fieldWidth*12 + ' mycolpadding')
                       	 .append($('<a/>')
                                    .editable({
                                		  type:"textarea",
                                    	  placement:"bottom",
                                    	  placeholder:"Long description"
                              		})
                              		.on('shown',fcnEditableOnShown)
                      	 )
			  )
   )				

   .append($('<div/>').attr('class','form-group')
			  .append($('<label/>')
					     .text('Keywords')
					     .attr('class','col-md-'+labelWidth*12 + ' control-label mycolpadding')
			  )                                                  
			  .append($('<div/>')
                      	 .attr('class','col-md-'+fieldWidth*12 + ' mycolpadding')
                         .append($('<a/>')
                              	    .editable({
                                  	      type:"select2",
                                          placeholder:"Add new or select from list",
                                          select2:{tags:["tag1","tags can have spaces"]}
                              		})
                              		.on('shown',fcnEditableOnShown)
                                 	.tooltip({placement:'top', trigger:'hover', delay:{show:500, hide:100},
											title:'A list of keywords separated by a space. Keywords that include spaces should be wrapped in quotation marks.'
                      	 			})
                      	 )
			  )
   )



// CREATE TYPE-SPECIFIC INPUTS

switch ($(this).parent().attr('id').split('-')[1]) {
  
	case 'category':  
		break;
	case 'tree':
		/* BUILD A TREE USING FANCYTREE:
		- drag&drop to define the structure
		- checkboxes to set visibility of categories
		- inline editing to change the names of categories easily
		- simple hotkey (e.g. RETURN to set the color)
		- switch between tree and column views for user comfort */
		break;

	case 'label':
		formcreatePosition(this)
		formcreateTimespan(this)
		break;

	case 'area':
		// outlines (multiple dates)
		formcreateTimespan(this)
		// category
		break;
  
	case 'people':
		// events (each one with date and text)
		// travels (each step with coordinates and timespan)
		break;
		
	case 'transfer':
		// coordinatesSource
		// coordinatesTarget
		formcreateTimespan(this)
		// style
		break;
}
};



function formcreatePosition(calledby) {

  $('#elemForm')
    .append($('<div/>').attr('class','form-group')
              .append($('<label/>')
                        .text('Position')
                        .attr('class','col-md-'+labelWidth*12 + ' control-label mycolpadding')
              )

              .append($('<div/>').attr('class','col-md-'+fieldWidth*12 + ' mycolpadding')
                        .append($('<a/>').editable({
                                              type: 'position', 
                                              title: 'Enter GPS coordinates or location',
                                              value: {
                                                  longitude: "",
                                                  latitude: "",    
                                                  location: ""
                                              },                        
                                              sourceLocation: []
                                         })
                                         .on('shown',fcnEditableOnShown)
                        )	
              )			
    )
}


function formcreateTimespan() {

}






//FUNCTION TO DEFINE CUSTOM MULTIPLE INPUTS FOR POSITION

(function ($) {
    "use strict";

    var Position = function (options) {
        this.sourceLocationData = options.sourceLocation;
        this.init('position', options, Position.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Position, $.fn.editabletypes.abstractinput);

    $.extend(Position.prototype, {
        render: function () {          	  
          	// Empty the list
            $('input#location').empty();

          	// Make the list a select2 component that searches GeoNames data
          	$('input#location').select2({
              id: function(e) { //needed to enable selection
                return e.name + ", " + e.adminName1 + ", " + e.countryName;
              }, 
              placeholder: 'Search a place',
              allowClear: true,
              minimumInputLength: 3,
              ajax: {
                url: 'http://api.geonames.org/searchJSON',
                dataType: 'jsonp',
                data: function (term, page) {
                  return {
                    q: term,
                    isNameRequired: true,
                    fuzzy: 0,
                    lang: 'en', //language of names returned
                    featureClass: "P",
                    username: "ousabd"
                  };
                },
                results: function (data, page) {
                  return {results: data.geonames};
                }
              },
              initSelection: function(element, callback){
                /*
                    $.ajax("http://api.geonames.org/searchJSON",{
                        dataType: 'jsonp',
                        data:{
                        maxRows:1,
                        q: 1}
                    }).done(function(data){callback(data.geonames);});   		
                */ 
              },
              formatResult: function(loc) {
                return loc.name + ", " + loc.adminName1 + ", " + loc.countryName; 
              },
              formatSelection: function(loc, container) { 
                // Fill inputs for coordinates
                $('input#longitude').val(loc.lng);
                $('input#latitude').val(loc.lat); 

                return loc.name + ", " + loc.adminName1 + ", " + loc.countryName; 
              },
              dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
            });
          
          	// Erase selected place when coordinates are changed manually
          	$('input#longitude').on("change", function(event) {
              $('input#location').select2('val','');
            });
        },

        value2html: function (value, element) {
            if (!value) {
                $(element).empty();
                return;
            }
          	
          	var displng = value.longitude ? value.longitude : 'EMPTY!';
          	var displat = value.latitude ? value.latitude : 'EMPTY!';
            
          	var html = $('<div>').text(displng).html() + ' / ' + $('<div>').text(displat).html();
            if (value.location) {
            	html += ' (' + value.location + ')'; 
            }
            $(element).html(html); 
        },

        html2value: function (html) {
            return null;
        },

        value2str: function (value) {
            var str = '';
            if (value) {
                for (var k in value) {
                    str = str + k + ':' + value[k] + ';';
                }
            }
            return str;
        },

        str2value: function (str) {
            return str;
        },

        value2input: function (value) {
            if (!value) {
                return;
            }         
            $('input#longitude').val(value.longitude);
			$('input#latitude').val(value.latitude);
            $('input#location').select2('val',value.location);       
        },

        input2value: function () {
            return {
                longitude: $('input#longitude').val(),
				latitude: $('input#latitude').val(),
                location: $('input#location').select2('val')
            };
        },

        activate: function () {
            $('input#longitude').focus();
        },

        autosubmit: function () {
            this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    Position.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '' +
            '<div class="editable-position">' +
      		'<input id="longitude" type="text" placeholder="Longitude" class="form-control input-sm">' +
            '</div>' +
			'<div class="editable-position">' +
            '<input id="latitude" type="text" placeholder="Latitude" class="form-control input-sm">' +
            '</div>' +
            '<div class="editable-position">' +
      		'<input id="location" class="form-control input-sm">' +
      		'</div>',

        inputclass: '',
        sourceLocation: []
    });

    $.fn.editabletypes.position = Position;

}(window.jQuery));











//////////////////////////////////////////////////////
//					SCRAPS OF CODE					//
//////////////////////////////////////////////////////

// CREATE A FORM USING D3
/* 
d3.select('#ui-right-half')
	.append('form').attr({'role':'form','id':'elemForm','class':'form-horizontal'})
				   .append('div').attr('class','form-group')
								 .append('label').text('Name')
								 .append('div').attr('class','col-md-9 mycolpadding')
											   .append('input').attr({
																'type':'text',
																'class':'form-control',
																'placeholder':'Name'
																})
*/

// LIST OF ELEMENTS USING THE ACCORDiON OF jQUERY
/*
$('#cid').append($('<div/>').attr('id','accordion'));
$('#accordion').append($('<div/>').append($('<h3/>').append($('<div/>').attr('class','half-sec')
                                                            			.text('Label'),
                                                            $('<div/>').attr('class','half-sec align-right')
                                                            			.attr('id','counter-label')
                                                            			.text(0)),
                                          $('<div/>').attr('id','sec-div-label')));

$('#accordion').append($('<div/>').append($('<h3/>').append($('<div/>').attr('class','half-sec')
                                                            			.text('Area'),
                                                            $('<div/>').attr('class','half-sec align-right')
                                                            			.attr('id','counter-area')
                                                            			.text(0)),
                                          $('<div/>').attr('id','sec-div-area')));

$('#accordion').append($('<div/>').append($('<h3/>').append($('<div/>').attr('class','half-sec')
                                                            			.text('People'),
                                                            $('<div/>').attr('class','half-sec align-right')
                                                            			.attr('id','counter-people')
                                                            			.text(0)),
                                          $('<div/>').attr('id','sec-div-people')));

$('#accordion').append($('<div/>').append($('<h3/>').append($('<div/>').attr('class','half-sec')
                                                            			.text('Migration'),
                                                            $('<div/>').attr('class','half-sec align-right')
                                                            			.attr('id','counter-migration')
                                                            			.text(0)),
                                          $('<div/>').attr('id','sec-div-migration')));




for (var i=0,c=data.length;i<c;i++) {
  // Add element to list, along with icons	
  $('#sec-div-' + data[i].type).append($('<div/>').attr('id','div_elem' + i)
                                      			  .attr('class','half-sec')
                                      			  .text(data[i].name),
                          			   $('<div/>').attr('class','half-sec align-right')
                                       			  .append($('<i/>').attr('class','fa fa-pencil fa-lg fa-flip-vertical')
                                                          		   	.text('\xA0\xA0')
                                                          		   	.attr('onclick',"alert('EDITER !');"),
                                                          $('<i/>').attr('class','fa fa-copy fa-lg')
                                                          			.text('\xA0\xA0')
                                                          		   	.attr('onclick',"alert('DUPLIQUER !');"),
                                                          $('<i/>').attr('class','fa fa-trash-o fa-lg fa-border')
                                                          			.attr('onclick',"alert('EFFACER !');")
                                                         ));
                                             	
  // Update data type counter	
  $('#counter-' + data[i].type).text(parseInt($('#counter-' + data[i].type).text())+1);
}; 


$('#counter-label').append($('<span/>').attr('class','fa-stack')
                           				.append($('<i/>').attr('class','fa fa-circle fa-stack-2x'),
                                               $('<i/>').attr('class','fa fa-plus fa-stack-1x fa-inverse')));

$("#accordion > div").accordion({header: "h3", collapsible:true});
//$("#accordion > div").accordion({ icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" } });

*/



//TEST OF jQUERY-UI DRAG ON SVG ELEMENTS
/*
$('.canvas').draggable();
$('circle')
	.draggable()
  	.bind('mousedown', function(event, ui){
    	// bring target to front
    	$(event.target.parentElement).append(event.target);
  	})
	.bind('drag', function(event, ui){
    	// update coordinates manually, since top/left style props don't work on SVG
    	event.target.setAttribute('x', ui.position.left);
    	event.target.setAttribute('y', ui.position.top);
    });
*/
