function addEvent( obj, type, fn )
	{
 		if (obj.addEventListener)
 		{
   			obj.addEventListener( type, fn, false );
		}
 		else if (obj.attachEvent)
 		{
  			obj["e"+type+fn] = fn;
		    obj[type+fn] = function() { return obj["e"+type+fn]( window.event ); };
		    obj.attachEvent( "on"+type, obj[type+fn] );
 		}
	}

	// IE
	addEvent(document, 'DOMContentLoaded', function() {
   	 	priceGenerate();
	});

	// Other
	addEvent(document, 'onreadystatechange', function() {
    	if (document.readyState == 'complete')
    	priceGenerate();
	});

function priceGenerate() {
	var preco = document.getElementsByClassName("price");
	var parcelamentoMax = document.getElementsByClassName("12x");
	var descontoBoleto = document.getElementsByClassName("percent10");

	for (i = 0; i < preco.length; i++)
	{
		preco[i].innerHTML = preco[i].innerHTML.replace(",", ".");
		preco[i].innerHTML = preco[i].innerHTML.substring(2,preco[i].length);

		parcelamentoMax[i].innerHTML = "R$" + (parseFloat(preco[i].innerHTML) / 12).toFixed(2);
		parcelamentoMax[i].innerHTML = parcelamentoMax[i].innerHTML.replace(".", ",");
				
		descontoBoleto[i].innerHTML = "R$" + (parseFloat(preco[i].innerHTML) * 0.9).toFixed(2);
		descontoBoleto[i].innerHTML = descontoBoleto[i].innerHTML.replace(".", ",");
	}

	if (window.location.href.indexOf("produtos") > -1)
	{
		for (var i = 1; i <= 12; i++)
		{
			document.getElementById(i + "x").innerHTML = "R$" + (parseFloat(preco[0].innerHTML) / i).toFixed(2);	
			document.getElementById(i + "x").innerHTML = document.getElementById(i + "x").innerHTML.replace(".", ",");
		}
	}

	for (i = 0; i < preco.length; i++)
	{
		document.getElementsByClassName("price")[i].innerHTML = "R$" + document.getElementsByClassName("price")[i].innerHTML.replace(".",","); 
	}
}