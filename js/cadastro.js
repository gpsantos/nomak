$(document).ready(function() {
	$(".spinner").spinner();
	$("#anoConquista").datepicker({ dateFormat: "dd/mm/yy" });
	
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
	
	var cidadesUrl = 'json/listacidades.txt';
	loadAutoCompleteFromJSON(cidadesUrl, "#cidade");

	var facemontanhaUrl = 'json/listafacemontanha.txt';
	loadAutoCompleteFromJSON(facemontanhaUrl, "#faceMontanha");

	var clubemontanhismoUrl = 'json/listaclubemontanhismo.txt';
	loadAutoCompleteFromJSON(clubemontanhismoUrl, "#clube");

	var googlemapsUrl = 'json/googlemaps.txt';

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
		$(".spinner").spinner("destroy");
		var html = $('#materialSugeridoTemplate').html();
		$('#materialSugeridoFields').append(html);
		$(".spinner").spinner();
		
	});
	$('#excluir').click(function() {
		$('#materialSugeridoFields ul').last().remove();

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
	
	
	var grauGeralList;
    var grauCruxList;
    var grauArtificialList;
    var grauArtificialLivreList;
    var grauExposicaoList;
    var grauDuracaoList;
    
    function updateValues() {
		grauCruxValue.innerHTML = (grauCrux.valueAsNumber == 0) ? "": grauCruxList[grauCrux.valueAsNumber - 1].representacao;
		grauArtificialValue.innerHTML = (grauArtificial.valueAsNumber == 0) ? "" : grauArtificialList[grauArtificial.valueAsNumber - 1].representacao;
		grauArtificialLivreValue.innerHTML = (grauArtificialLivre.valueAsNumber == 0) ? "" : grauArtificialLivreList[grauArtificialLivre.valueAsNumber - 1].representacao;
		grauExposicaoValue.innerHTML = (grauExposicao.valueAsNumber == 0) ? "" : grauExposicaoList[grauExposicao.valueAsNumber - 1].representacao;
		grauDuracaoValue.innerHTML = (grauDuracao.valueAsNumber == 0) ? "" : grauDuracaoList[grauDuracao.valueAsNumber - 1].representacao;
		
		grauExposicaoDescription.title = (grauExposicao.valueAsNumber == 0) ? "" : grauExposicaoList[grauExposicao.valueAsNumber - 1].descricao;
		//grauDuracaoDescription.title = (grauDuracao.valueAsNumber == 0) ? "" : grauDuracaoList[grauDuracao.valueAsNumber - 1].descricao;
	}
    
    $('#grauGeral').change(function() {
    	grauGeralValue.innerHTML = (grauGeral.valueAsNumber == 0) ? "" : grauGeralList[grauGeral.valueAsNumber - 1].representacao;
    });
	$('#grauCrux').change(function() {
    	grauCruxValue.innerHTML = (grauCrux.valueAsNumber == 0) ? "" : grauCruxList[grauCrux.valueAsNumber - 1].representacao;
    });
    $('#grauArtificial').change(function() {
    	grauArtificialValue.innerHTML = (grauArtificial.valueAsNumber == 0) ? "" : grauArtificialList[grauArtificial.valueAsNumber - 1].representacao;
    });
    $('#grauArtificialLivre').change(function() {
    	grauArtificialLivreValue.innerHTML = (grauArtificialLivre.valueAsNumber == 0) ? "" : grauArtificialLivreList[grauArtificialLivre.valueAsNumber - 1].representacao;
    });
     $('#grauExposicao').change(function() {
    	grauExposicaoValue.innerHTML = (grauExposicao.valueAsNumber == 0) ? "" : grauExposicaoList[grauExposicao.valueAsNumber - 1].representacao;
    });
	
    $('#grauDuracao').change(function() {
    	grauDuracaoValue.innerHTML = (grauDuracao.valueAsNumber == 0) ? "" : grauDuracaoList[grauDuracao.valueAsNumber - 1].representacao;
    });
   
    	
		$.getJSON("json/listagraugeral.txt", function(jsonGrauGeralList) {
    		grauGeral.max = jsonGrauGeralList.length;
    		grauGeralList = jsonGrauGeralList;
		});
		$.getJSON("json/listagraucrux.txt", function(jsonGrauCruxList) {
    		grauCrux.max = jsonGrauCruxList.length;
    		grauCruxList = jsonGrauCruxList;
    		grauArtificialLivre.max = jsonGrauCruxList.length;
    		grauArtificialLivreList = jsonGrauCruxList;
		});
    	$.getJSON("json/listagrauartificial.txt", function(jsonGrauArtificialList) {
    		grauArtificial.max = jsonGrauArtificialList.length;
    		grauArtificialList = jsonGrauArtificialList;
		});
		$.getJSON("json/listagrauexposicao.txt", function(jsonGrauExposicaoList) {
    		grauExposicao.max = jsonGrauExposicaoList.length;
    		grauExposicaoList = jsonGrauExposicaoList;
		});
		$.getJSON("json/listagrauduracao.txt", function(jsonGrauDuracaoList) {
    		grauDuracao.max = jsonGrauDuracaoList.length;
    		grauDuracaoList = jsonGrauDuracaoList;
		});
		

});
