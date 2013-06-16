$( document ).ready(function() {
	$(".spinner").spinner();
	
	var facemontanhaUrl = 'json/listafacemontanha.json';
	$.getJSON(facemontanhaUrl, function(jsonFaceMontanhaList) {
		
		var availableFaces = [];
	
		$.each(jsonFaceMontanhaList, function(i, montanha) {
			availableFaces.push(montanha.nome);
		});
		$("#faceMontanha").autocomplete({
			source: availableFaces
		}); 

	}).fail(function(jqxhr, textStatus, error) { alert(textStatus + ' ' + error);});
});
