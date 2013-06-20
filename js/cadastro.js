$(document).ready(function() {
	$(".spinner").spinner();

	function loadAutoCompleteFromJSON(urlToAccessJSON, inputId) {
		$.getJSON(urlToAccessJSON, function(jsonResultList) {

			var availableItems = [];

			$.each(jsonResultList, function(i, item) {
				availableItems.push(item.sigla + " - " + item.nome);
			});

			$(inputId).autocomplete({
				source : availableItems
			});

		}).fail(function(jqxhr, textStatus, error) {
			alert(textStatus + ' ' + error);
		});
	}
	
	var cidadesUrl = 'json/listacidades.json';
	loadAutoCompleteFromJSON(cidadesUrl, "#cidade");

	var facemontanhaUrl = 'json/listafacemontanha.json';
	loadAutoCompleteFromJSON(facemontanhaUrl, "#faceMontanha");

	var clubemontanhismoUrl = 'json/listaclubemontanhismo.json';
	loadAutoCompleteFromJSON(clubemontanhismoUrl, "#clube");

	var googlemapsUrl = 'json/googlemaps.json';

	function loadGoogleGeoLocation() {
		if ($("#latitude").val() != "" && $("#longitude").val() != "") {
			$.getJSON(googlemapsUrl + "?latitude=" + $("#latitude").val() + "&longitude=" + $("#longitude").val(), function(data) {
				if (data.status == "OK")
					var c, e;
				$.each(data.results[0].address_components, function(i, address_component) {
					$.each(address_component.types, function(j, type) {
						if (type == "locality")
							c = address_component.long_name;
						if (type == "administrative_area_level_1")
							e = address_component.short_name;
					});
				});
				$("#cidade").val(c + " - " + e);
			});
		}
	}

	$("#latitude").blur(loadGoogleGeoLocation);
	$("#longitude").blur(loadGoogleGeoLocation);

	$('#adicionar').click(function() {
		var html = $('#materialSugeridoTemplate').html();
		$('#materialSugeridoFields').append(html);
	});
	
	function configDialog(id) {
		$( id ).dialog({ 
			autoOpen: false,
			buttons: [ { text: "Ok", click: function() { 
				$( this ).dialog( "close" ); 
			} 
			} ],		
			open: function(event, ui) {
				setTimeout(function(){
					$(id).dialog('close');                
				}, 3000);
			}
		});
		
	}
	
	configDialog("#dialogFail");
	configDialog("#dialogSuccess");

	$( "#save" ).click(function() {
		$( "#dialogSuccess" ).dialog( "open" );
		$(".ui-dialog-titlebar").hide();
	});
	
});
