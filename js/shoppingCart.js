var pageProducts = document.getElementsByClassName("cart-form");
var myCart;

function addEvent( obj, type, fn ) {
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

if (window.location.href.indexOf("carrinho") > -1)
{
	// Other
	addEvent(document, 'DOMContentLoaded', function() {
   	 	showCart();
	});

	// IE
	addEvent(document, 'onreadystatechange', function() {
    	if (document.readyState == 'complete')
    		showCart();
	});
}
else
{
	for (i = 0; i < pageProducts.length; i++)
	{
		pageProducts[i].onsubmit = function() {
			createItem(this);
		}
	}
}

function createItem(self) {

	var img = self.elements[0].value;
	var url = self.elements[1].value;
	var name = self.elements[2].value;
	var price = self.elements[3].value;
	var qty =  self.elements[4].value;

	var item = {
		img: img,
		url: url,
		name: name,
		price: parseInt(price),
		qty: parseInt(qty)
	}

	addToCart(item);
}

function addToCart(item) {
	if (localStorage["cart"] != undefined)
	{
		myCart = JSON.parse(localStorage["cart"]);

		var productIndex = compareItems(item, myCart);

		if (productIndex >= 0)
		{
			myCart[i].qty++;
			myCart[i].price /= myCart[i].qty - 1;
			myCart[i].price *= myCart[i].qty;
		}
		else
		{
			myCart.push(item);
		}
	}
	else
	{
		localStorage["cart"] = "";
		myCart = [];
		myCart.push(item);
	}

	localStorage["cart"] = JSON.stringify(myCart);
}

function removeItem(self) {
	var currentCart = JSON.parse(localStorage["cart"]);

	var testImg = self.elements[1].value;
	var testUrl = self.elements[2].value;
	var testName = self.elements[3].value;

	var testItem = {
		img: testImg,
		url: testUrl,
		name: testName
	}

	var index = compareItems(testItem, currentCart);

	if (index >= 0)
	{
		currentCart.splice(index, 1);
		localStorage["cart"] = JSON.stringify(currentCart);
	}
}

function compareItems(item, cart) {

	for (i = 0; i < cart.length; i++)
	{
		if (item.img == cart[i].img && item.url == cart[i].url && item.name == cart[i].name)
		{
			return i;
		}
	}

	return -1;
}

function updateQty(self) {
	var shopCart = JSON.parse(localStorage["cart"]);
	var qty_input = parseInt(self.value);

	var compareImg = self.parentNode.elements[1].value;
	var compareUrl = self.parentNode.elements[2].value;
	var compareName = self.parentNode.elements[3].value;

	var compareItem = {
		img: compareImg,
		url: compareUrl,
		name: compareName
	}

	if (qty_input == 0)
	{
		self.value = 1;
		updateQty(self);
	}
	else if (qty_input != null && qty_input != undefined && qty_input != "")
	{
		var item_index = compareItems(compareItem, shopCart);

		if (shopCart[item_index].qty == 1)
		{
			shopCart[item_index].qty = qty_input;
			shopCart[item_index].price *= shopCart[item_index].qty;
		}
		else
		{
			shopCart[item_index].price /= shopCart[item_index].qty;
			shopCart[item_index].qty = qty_input;
			shopCart[item_index].price *= shopCart[item_index].qty;
		}

		localStorage["cart"] = JSON.stringify(shopCart);

		showCart();
	}
}

function showCart() {
	if (localStorage["cart"] != undefined && localStorage["cart"] != "[]")
	{
		document.getElementById("cart-item-title").style.display = "block";
		document.getElementById("cart-qty-title").style.display = "block";
		document.getElementById("cart-price-title").style.display = "block";

		var shoppingCart = JSON.parse(localStorage["cart"]);
		document.getElementById("myShoppingCart").innerHTML = "";

		for (i = 0; i < shoppingCart.length; i++)
		{
			document.getElementById("myShoppingCart").innerHTML += "<article class='produto'><div class='items-width'><img src='" + shoppingCart[i].img + "'>" +"<p><a href='" + shoppingCart[i].url + "'>" + shoppingCart[i].name + "</a></p></div><div class='quantity-width'><form class='cart-form' method='post' action=''><input type='number' class='quantity' value='" + shoppingCart[i].qty + "'><input type='hidden' value='" + shoppingCart[i].img + "'><input type='hidden' value='" + shoppingCart[i].url + "'><input type='hidden' value='" + shoppingCart[i].name + "'><input type='hidden' value='" + shoppingCart[i].price + "'><input type='hidden' value='" + shoppingCart[i].qty + "'><button>X</button></form></a></div><div class='price-width'><p class='price'>" + "R$" + (shoppingCart[i].price/shoppingCart[i].qty).toFixed(2).replace(".",",") + "</p></div></article>";
		}

		pageProducts = document.getElementsByClassName("cart-form");
		var cartTotal = 0;

		for (i = 0; i < pageProducts.length; i++)
		{
			pageProducts[i].onsubmit = function() 
			{
				if (localStorage["cart"] != undefined)
				{
					removeItem(this);
				}

				showCart();

				return false;
			}

			pageProducts[i].getElementsByClassName("quantity")[0].onchange = function() {
				updateQty(this);
			}

			cartTotal += shoppingCart[i].price;
		}

		document.getElementById("cart-total").innerHTML = "<span id='cart-buttons'><a href='index.html' class='back-to-store'><img src='images/backArrow.png' class='back-arrow-img' alt='back'>Continuar comprando</a><button id='empty-cart'>Esvaziar carrinho</button><button>Checkout</button></span><span>Total: R$" + cartTotal.toFixed(2).replace(".", ",") + "</span>";

		if (cartTotal > 100)
		{
			document.getElementById("frete-total").innerHTML = "Frete: GRÁTIS";
		}
		else
		{
			document.getElementById("frete-total").innerHTML = "Frete: R$" + (cartTotal*0.1).toFixed(2).replace(".", ",");
		}

		if (pageProducts.length == 1)
		{
			document.getElementById("cart-item-count").innerHTML = pageProducts.length + " item";
		}
		else
		{
			document.getElementById("cart-item-count").innerHTML = pageProducts.length + " itens";
		}

		document.getElementById("empty-cart").onclick = function() {
			emptyCart();
		}
	}
	else
	{
		document.getElementById("myShoppingCart").innerHTML = "<p class='empty-cart'>Não há itens no seu carrinho.<br><a href='index.html' class='back-to-store'><img src='images/backArrow.png' class='back-arrow-img' alt='back'>Voltar para a loja</a></p>";

		document.getElementById("cart-total").innerHTML = "";
		document.getElementById("cart-total").style.margin = "0";
		document.getElementById("frete-total").innerHTML = "";
		document.getElementById("frete-total").style.margin = "0";

		document.getElementById("cart-item-title").style.display = "none";
		document.getElementById("cart-qty-title").style.display = "none";
		document.getElementById("cart-price-title").style.display = "none";

		document.getElementById("cart-item-count").innerHTML = "0 itens";
	}
}

function emptyCart() {
	localStorage.removeItem("cart");

	showCart();
}