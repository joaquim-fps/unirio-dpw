var textInput;

function setLocalStorage() {
	textInput = document.getElementById("search-input-text").value;
	sessionStorage.setItem("search-text", textInput);
}

if (window.location.href.indexOf("search") > -1)
{
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
   	 	filter();
	});

	// Other
	addEvent(document, 'onreadystatechange', function() {
    	if (document.readyState == 'complete')
    	filter();
	});

	var results = document.getElementsByClassName("result");
	var product_titles = document.getElementsByClassName("productTitle");

	for (i = 0; i < product_titles.length; i++)
	{
		product_titles[i] = product_titles[i].innerHTML.replace('<span class="categoria">', "").replace('<span class="brands">',"").replace('</span>',"").replace('</span>',"");
	}

	var x = document.getElementsByClassName("price");
	var y = [];

	var priceRange = document.getElementById("search-price-range").value;
	var z = document.getElementById("input-range-value");
	z.innerHTML = "R$" + priceRange;

	var n = document.getElementsByClassName("categoria");
	var m = document.getElementsByName("category");

	var a = document.getElementsByClassName("brands");
	var b = document.getElementsByName("brand");

	var category_checks = [];
	var price_checks = [];
	var brand_checks = [];

	var inputs = document.getElementsByTagName("input");

	var resultsCount = 0;
	var showResultsCount = document.getElementById("search-results-count");
	showResultsCount.innerHTML = resultsCount + " resultados";

	var textInput_checks = [];

	for (i = 0; i < x.length; i++)
	{
		y[i] = x[i].innerHTML.replace("R$", "").replace(",",".");
		y[i] = parseFloat(y[i]);
	}

	document.getElementById("search-price-range").addEventListener('change', function() {
		priceRange = document.getElementById("search-price-range").value;
		z.innerHTML = "R$" + priceRange;

		filter();
	});

	for (j = 0; j < m.length; j++)
	{
		m[j].addEventListener('change', function() {
			filter();
		});
	}

	for (j = 0; j < b.length; j++)
	{
		b[j].addEventListener('change', function() {
			filter();
		});
	}

	function filter() {
		evalTextFilter();
		evalPrice();
		evalCategory();
		evalBrand();

		checkCount();

		resultsCount = 0;
		for (i = 0; i < results.length; i++)
		{
			if ((category_checks[i] && brand_checks[i]) && (price_checks[i] && textInput_checks[i]))
			{
				results[i].style.display = "block";
				resultsCount++;
			}
			else
			{
				results[i].style.display = "none";
			}
		}

		checkResults();
	}

	function evalTextFilter() {

		if (sessionStorage.getItem("search-text") == null || sessionStorage.getItem("search-text") == "")
		{	

			document.getElementById("search-keywords").style.display = "none";

			for (i = 0; i < results.length; i++)
			{
				textInput_checks[i] = 1;
			}
		}
		else
		{
			textInput = sessionStorage.getItem("search-text").toUpperCase();
			document.getElementById("search-keywords").style.display = "block";

			var countSpaces = 0;
			for (i = 0; i < textInput.length; i++) {
				if(textInput[i] == " ")
				{
					countSpaces++;
				}
			}

			var keywords = [];
			document.getElementById("input-text-filter").innerHTML = "";
			
			for (i = 0; i < countSpaces+1; i++) {
				if (i < countSpaces && countSpaces > 0)
				{ 
				  	keywords[i] = textInput.substring(0, textInput.indexOf(" "));

				  	if (i == 0)
				  	{
						document.getElementById("input-text-filter").innerHTML = document.getElementById("input-text-filter").innerHTML + keywords[i];
					}
					else
					{
						document.getElementById("input-text-filter").innerHTML = document.getElementById("input-text-filter").innerHTML + ", " + keywords[i];
					}
				}
				else
				{
				  	keywords[i] = textInput.substring(0, textInput.length);

				  	if (countSpaces == 0)
				  	{
				  		document.getElementById("input-text-filter").innerHTML = document.getElementById("input-text-filter").innerHTML + keywords[i];
				  	}
				  	else
				  	{
				  		document.getElementById("input-text-filter").innerHTML = document.getElementById("input-text-filter").innerHTML + ", " + keywords[i];
				  	}
				}

				textInput = textInput.replace(textInput.substring(0, textInput.indexOf(" ")+1), "");
			}

			for (k = 0; k < keywords.length; k++)
			{
				for (i = 0; i < results.length; i++)
				{
					if (k == 0)
					{
						if (product_titles[i].innerHTML.replace('<span class="categoria">', "").replace('<span class="brands">',"").replace('</span>',"").replace('</span>',"").toUpperCase().indexOf(keywords[k]) > -1)
						{
							textInput_checks[i] = 1;
						}
						else
						{
							textInput_checks[i] = 0;
						}
					}
					else
					{
						if (product_titles[i].innerHTML.replace('<span class="categoria">', "").replace('<span class="brands">',"").replace('</span>',"").replace('</span>',"").toUpperCase().indexOf(keywords[k]) > -1 && textInput_checks[i] == 1)
						{
							textInput_checks[i] = 1;
						}
						else
						{
							textInput_checks[i] = 0;
						}
					}
				}
			}
		}
	}

	function evalPrice () {
		for (i = 0; i < y.length; i++)
		{
			if (y[i] > priceRange)
			{
				price_checks[i] = 0;
			}
			else
			{
				price_checks[i] = 1;
			}
		}
	}

	function evalCategory() {
		for (j = 0; j < m.length; j++)
		{
			if (m[j].checked)
			{
				for (i = 0; i < n.length; i++)
				{
					if (m[j].value.toUpperCase() != n[i].innerHTML.toUpperCase() && !category_checks[i])
					{
						category_checks[i] = 0;
					}
					else
					{
						category_checks[i] = 1;
					}
				}
			}
			else
			{
				for (i = 0; i < n.length; i++)
				{
					if (m[j].value.toUpperCase() == n[i].innerHTML.toUpperCase())
					{
						category_checks[i] = 0;
					}
				}
			}
		}
	}

	function evalBrand() {

		for (j = 0; j < b.length; j++)
		{
			if (b[j].checked)
			{
				for (i = 0; i < a.length; i++)
				{
					if (b[j].value.toUpperCase() != a[i].innerHTML.toUpperCase() && !brand_checks[i])
					{
						brand_checks[i] = 0;
					}
					else
					{
						brand_checks[i] = 1;
					}
				}
			}
			else
			{
				for (i = 0; i < a.length; i++)
				{
					if (b[j].value.toUpperCase() == a[i].innerHTML.toUpperCase())
					{
						brand_checks[i] = 0;
					}
				}
			}
		}
	}

	function checkCount() {
		var check_priceCount = 0;
		var check_categoryCount = 0;
		var check_brandCount = 0;
		var checkCount = 0;

		for (i = 0; i < price_checks.length; i++)
		{
			if (price_checks[i])
			{
				check_priceCount++;
				checkCount++;
			}
		}

		for (i = 0; i < category_checks.length; i++)
		{
			if (category_checks[i])
			{
				check_categoryCount++;
			}
		}

		if (!check_categoryCount)
		{
			for (j = 0; j < category_checks.length; j++)
			{
				category_checks[j] = 1;
			}
		}

		for (i = 0; i < brand_checks.length; i++)
		{
			if (brand_checks[i])
			{
				check_brandCount++;
			}
		}

		if (!check_brandCount)
		{
			for (j = 0; j < brand_checks.length; j++)
			{
				brand_checks[j] = 1;
			}
		}

		if (!checkCount)
		{
			for (i = 0; i < results.length; i++)
			{
				results[i].style.display = "none";
			}
		}
	}

	function checkResults() {

		if (resultsCount == 0)
		{
			showResultsCount.innerHTML = resultsCount + " resultados";
			document.getElementsByClassName("line-1")[0].style.borderBottom = "0";

		}
		else if (resultsCount == 1)
		{
			showResultsCount.innerHTML = resultsCount + " resultado";
			document.getElementsByClassName("line-1")[0].style.borderBottom = "1px solid #CCC";
		}
		else
		{
			showResultsCount.innerHTML = resultsCount + " resultados";

			if (resultsCount > 12)
			{
				document.getElementsByClassName("line-1")[0].style.borderBottom = "0";
			}
			else
			{
				document.getElementsByClassName("line-1")[0].style.borderBottom = "1px solid #CCC";
			}
		}
	}

	function resetFilters() {

		document.getElementById("search-price-range").value = 1500;
		priceRange = document.getElementById("search-price-range").value;
		z.innerHTML = "R$" + priceRange;

		for (i = 0; i < inputs.length; i++)
		{
			if (inputs[i].type == 'checkbox')
			{
				inputs[i].checked = false;
			}
		}

		sessionStorage.removeItem("search-text");

		filter();
	}
}