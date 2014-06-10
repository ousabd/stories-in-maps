canvas.selectAll("*").remove();



// LOAD JSON DATA
$.getJSON("testDB.json",function(json){
	data = json;
	});





// LIST OF ELEMENTS USING THE BOOTSTRAP FRAMEWORK
// ----------------------------------------------
var sections = ['Tree','Label','Area','People','Migration'];

// Create a container for the list
$('#cid').append($('<div/>').attr('class','panel panel-group')
                			.attr('id','listofelem'));

// Create containers for sublists, along with headings, counters and sublist-level controls 
for (var i=0,c=sections.length; i<c; i++) {
  $('#listofelem').append($('<div/>').attr('class','panel panel-default')
                                      .append($('<button/>').attr('class','btn btn-block btn-default panel-heading align-left')
                                                          .attr('data-toggle','collapse')
                                                          .attr('id',sections[i].toLowerCase())
                                                          .attr('data-target','#listofelem-'+sections[i].toLowerCase())
                                                          .text(sections[i])
                                                          .append($('<span/>').attr('class','badge pull-right')
                                                                              .text('+'),
                                                                  $('<span/>').attr('class','badge pull-right')
                                                                  			  .attr('id','counter-'+sections[i].toLowerCase())
                                                                              .text(0)
                                                                 ),
                                              $('<div/>').attr('class','list-group collapse in')
                                                          .attr('id','listofelem-'+sections[i].toLowerCase())
                                             )
                  );
};

// Fill list with elements, along with element-level controls
var id;
for (var i=0,c=data.length;i<c;i++) {
  id = '#listofelem-'+sections[i].toLowerCase();

  // Element and controls
  $(id).append($('<a/>').attr('class','list-group-item')
               			.attr('onclick',"alert('ELEMENT');")
               			.text(data[i].name)
               			.append($('<span/>').attr('class','badge pull-right')
                                            .append($('<i/>').attr('class','fa fa-copy')
                                                  			 .attr('onclick',"alert('DUPLICATE');")
                                                    ),
                                $('<span/>').attr('class','badge pull-right')
                                			.append($('<i/>').attr('onclick',"alert('DELETE');")
                                        					 .attr('class','fa fa-trash-o')
                                       				),
                                $('<span/>').attr('class','badge pull-right')
                                			.append($('<i/>').attr('onclick',"alert('EDIT')")
                                        					 .attr('class','fa fa-pencil')
                                       				)
                               )
              );
  
  
  // Update data type counter	
  $('span#counter-' + data[i].type).text(parseInt($('span#counter-' + data[i].type).text())+1);
};

// Prevent element-level controls from triggering the on-click event of element
$('a.list-group-item *').click(function(e){ e.stopPropagation(); });
  





// LIST OF ELEMENTS USING THE ACCORDiON OF jQUERY
// ----------------------------------------------
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





// XXX Work in progress...
//d3.json("testDB.json", function(json) {
//    console.log(json);
//})




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
