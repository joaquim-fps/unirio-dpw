function isNumber(teste) {
	var digits = "0123456789";

	if (digits.indexOf(teste) > -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function isLetter(teste) {
	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	if (characters.indexOf(teste.toUpperCase()) > - 1)
	{
		return true;
	}
	else
	{
		return false;
	}

}

function isSpecialLetter(teste) {
	var specialLetters = "ÀÂÃÁÈÊÉÌÎÍÒÔÕÓÙÛÚÑ"

	if (specialLetters.indexOf(teste.toUpperCase()) > -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}


if (window.location.href.indexOf("contato") > -1)
{
	document.getElementById("email").addEventListener('blur', function() {
		validate_Email();
	});

	document.getElementById("name").addEventListener('blur', function() {
		validateName();
	});

	document.getElementById("subject").addEventListener('blur', function() {
		validateSubject();
	});

	document.getElementById("message").addEventListener('blur', function() {
		validateMessage();
	});

	function validateForm() {
		var a = validate_Email();
		var b = validateName();
		var c = validateSubject();
		var d = validateMessage();

		return (a && b) && (c && d);
	}

	function validate_Email()
	{
		var x=document.forms["contact-form"]["email"].value;

		var atpos=x.indexOf("@");
		var dotpos=x.indexOf(".");

		if (x == "" || x == null)
		{
			 document.getElementById("email-validate1").style.display = "block";
			 document.getElementById("email-validate2").style.display = "none";
			 document.getElementById("email-validate3").style.display = "none";
			return false;
		}
		else if (atpos<1 || dotpos<atpos+3 || dotpos+2>=x.length)
		{
			document.getElementById("email-validate1").style.display = "none";
			document.getElementById("email-validate2").style.display = "block";
			document.getElementById("email-validate3").style.display = "none";
			return false;
		}
		else
		{
			for (i = 0; i < x.length; i++)
			{
				if (!isNumber(x[i]) && !isLetter(x[i]) && (x[i] != "_" && x[i] != "." && x[i] != "@"))
				{
					document.getElementById("email-validate1").style.display = "none";
					document.getElementById("email-validate2").style.display = "none";
					document.getElementById("email-validate3").style.display = "block";
					return false;
				}
			}

			document.getElementById("email-validate3").style.display = "none";
			document.getElementById("email-validate1").style.display = "none";
		 	document.getElementById("email-validate2").style.display = "none";
			return true;
		}
	}

	function validateName() {
		var y = document.forms["contact-form" ]["name"].value;

		if (y == "" || y == null)
		{
			document.getElementById("name-validate").style.display = "block";
			return false;
		}
		else
		{
		 	document.getElementById("name-validate").style.display = "none";
			return true;
		}
	}

	function validateSubject() {
		var z = document.forms["contact-form" ]["subject"].value;

		if (z == "" || z == null)
		{
			document.getElementById("subject-validate").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("subject-validate").style.display = "none";
			return true;
		}
	}

	function validateMessage() {
		var m = document.forms["contact-form"]["message"].value;

		if (m.length > 500)
		{
			document.getElementById("message-validate2").style.display = "block";
			document.getElementById("message-validate1").style.display = "none";
			return false;
		}
		else if (m == "" || m == null)
		{
			document.getElementById("message-validate2").style.display = "none";
			document.getElementById("message-validate1").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("message-validate2").style.display = "none";
			document.getElementById("message-validate1").style.display = "none";
			return true;
		}
	}
}
else if (window.location.href.indexOf("cadastro") > -1)
{
	function evalEmail() {
		validateEmail();
		validateEmailConfirm();
	}

	function evalPassword() {
		validatePassword();
		validatePasswordConfirm();
	}

	function validateEmail() {

		var x = document.forms["register"]["e-mail"].value;

		var atpos=x.indexOf("@");
		var dotpos=x.indexOf(".", atpos);

		if (x == "" || x == null)
		{
			document.getElementById("validate-email1").style.display = "block";
			document.getElementById("validate-email2").style.display = "none";
			document.getElementById("validate-email3").style.display = "none";
			return false;
		}
		else if (atpos<1 || dotpos<atpos+3 || dotpos+2>=x.length)
		{
			document.getElementById("validate-email1").style.display = "none";
			document.getElementById("validate-email2").style.display = "block";
			document.getElementById("validate-email3").style.display = "none";
			return false;
		}
		else
		{
			for (i = 0; i < x.length; i++)
			{
				if (!isNumber(x[i]) && !isLetter(x[i]) && (x[i] != "_" && x[i] != "." && x[i] != "@"))
				{
					document.getElementById("validate-email1").style.display = "none";
					document.getElementById("validate-email2").style.display = "none";
					document.getElementById("validate-email3").style.display = "block";
					return false;
				}
			}

			document.getElementById("validate-email1").style.display = "none";
			document.getElementById("validate-email2").style.display = "none";
			document.getElementById("validate-email3").style.display = "none";
			return true;
		}

		validateEmailConfirm();
	}

	function validateEmailConfirm() {
		var xConfirm = document.forms["register"]["e-mail-confirm"].value;

		if (xConfirm == "" || xConfirm == null)
		{
			document.getElementById("validate-email-confirm1").style.display = "block";
			document.getElementById("validate-email-confirm2").style.display = "none";
			return false;
		}
		else if (xConfirm != document.forms["register"]["e-mail"].value)
		{
			document.getElementById("validate-email-confirm1").style.display = "none";
			document.getElementById("validate-email-confirm2").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-email-confirm1").style.display = "none";
			document.getElementById("validate-email-confirm2").style.display = "none";
			return true;
		}
	}

	function validatePassword() {
		var y = document.forms["register"]["pass"].value;

		var numberCount = 0;
		var letterCount = 0;

		if (y == "" || y == null)
		{
			document.getElementById("validate-pass1").style.display = "block";
			document.getElementById("validate-pass2").style.display = "none";
			document.getElementById("validate-pass3").style.display = "none";
			document.getElementById("validate-pass4").style.display = "none";
			return false;
		}
		else if (y.length < 8)
		{
			document.getElementById("validate-pass1").style.display = "none";
			document.getElementById("validate-pass2").style.display = "block";
			document.getElementById("validate-pass3").style.display = "none";
			document.getElementById("validate-pass4").style.display = "none";
			return false;
		}
		else
		{
			for (i = 0; i < y.length; i++)
			{
				if (isNumber(y[i]))
				{
					numberCount++;
				}
				else if (isLetter(y[i]))
				{
					letterCount++;
				}
				else
				{
					document.getElementById("validate-pass1").style.display = "none";
					document.getElementById("validate-pass2").style.display = "none";
					document.getElementById("validate-pass3").style.display = "block";
					document.getElementById("validate-pass4").style.display = "none";
					return false;
				}
			}

			if (numberCount && letterCount)
			{
				document.getElementById("validate-pass1").style.display = "none";
				document.getElementById("validate-pass2").style.display = "none";
				document.getElementById("validate-pass3").style.display = "none";
				document.getElementById("validate-pass4").style.display = "none";
				return true;
			}
			else
			{	
				document.getElementById("validate-pass1").style.display = "none";
				document.getElementById("validate-pass2").style.display = "none";
				document.getElementById("validate-pass3").style.display = "none";
				document.getElementById("validate-pass4").style.display = "block";
				return false;
			}
		}

		validatePasswordConfirm();
	}

	function validatePasswordConfirm() {
		var yConfirm = document.forms["register"]["pass-confirm"].value;

		if (yConfirm == "" || yConfirm == null)
		{
			document.getElementById("validate-pass-confirm1").style.display = "block";
			document.getElementById("validate-pass-confirm2").style.display = "none";
			return false;
		}
		else if (yConfirm != document.forms["register"]["pass"].value)
		{
			document.getElementById("validate-pass-confirm1").style.display = "none";
			document.getElementById("validate-pass-confirm2").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-pass-confirm1").style.display = "none";
			document.getElementById("validate-pass-confirm2").style.display = "none";
			return true;
		}
	}

	function validateCEP() {
		var cep = document.forms["register"]["cep"].value;
		var numbersCount1 = 0;
		var numbersCount2 = 0;

		 if (cep == "" || cep == null)
		{
			document.getElementById("validate-cep1").style.display = "block";
			document.getElementById("validate-cep2").style.display = "none";
			document.getElementById("validate-cep3").style.display = "none";
			return false;
		}
		else if (cep.indexOf("-") == -1)
		{
			document.getElementById("validate-cep1").style.display = "none";
			document.getElementById("validate-cep2").style.display = "none";
			document.getElementById("validate-cep3").style.display = "block";
			return false;
		}
		else if (cep.length != 9)
		{
			document.getElementById("validate-cep1").style.display = "none";
			document.getElementById("validate-cep2").style.display = "none";
			document.getElementById("validate-cep3").style.display = "block";
			return false;
		}
		else
		{
			for (i = 0; i < 9; i++)
			{
				if (!isNumber(cep[i]) && cep[i] != "-")
				{
					document.getElementById("validate-cep1").style.display = "none";
					document.getElementById("validate-cep2").style.display = "block";
					document.getElementById("validate-cep3").style.display = "none";
					return false;
				}
				else if (cep[i] != "-")
				{
					if (i < cep.indexOf("-"))
					{
						numbersCount1++;
					}
					else if (i > cep.indexOf("-"))
					{
						numbersCount2++;
					}
				}
			}

			if (numbersCount1 == 5 && numbersCount2 == 3)
			{
				document.getElementById("validate-cep1").style.display = "none";
				document.getElementById("validate-cep2").style.display = "none";
				document.getElementById("validate-cep3").style.display = "none";
				return true;
			}
			else
			{
				document.getElementById("validate-cep1").style.display = "none";
				document.getElementById("validate-cep2").style.display = "none";
				document.getElementById("validate-cep3").style.display = "block";
				return false;
			}
		}
	}

	function validateAddress() {
		var a = document.forms["register"]["address"].value;

		if (a == "" || a == null)
		{
			document.getElementById("validate-address").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-address").style.display = "none";
			return true;
		}
	}

	function validateAddressNumber() {
		var num = document.forms["register"]["num"].value;

		if (num == "" || num == null)
		{
			document.getElementById("validate-add-num1").style.display = "block";
			document.getElementById("validate-add-num2").style.display = "none";
			return false;
		}
		else 
		{
			for (i = 0; i < num.length; i++)
			{
				if (!isNumber(num[i]))
				{
					document.getElementById("validate-add-num1").style.display = "none";
					document.getElementById("validate-add-num2").style.display = "block";
					return false;
				}
			}

			document.getElementById("validate-add-num1").style.display = "none";
			document.getElementById("validate-add-num2").style.display = "none";
			return true;
		}
	}

	function validateBairro() {
		var b = document.forms["register"]["bairro"].value;

		if (b == "" || b == null)
		{
			document.getElementById("validate-bairro1").style.display = "block";
			document.getElementById("validate-bairro2").style.display = "none";
			return false;
		}
		else
		{
			for (i = 0; i < b.length; i++)
			{
				if (!(isLetter(b[i]) || isSpecialLetter(b[i])))
				{
					document.getElementById("validate-bairro1").style.display = "none";
					document.getElementById("validate-bairro2").style.display = "block";
					return false;
				}
			}

			document.getElementById("validate-bairro1").style.display = "none";
			document.getElementById("validate-bairro2").style.display = "none";
			return true;
		}
	}

	function validateCountry() {
		var country = document.forms["register"]["country"].value;

		if (country == "" || country == null)
		{
			document.getElementById("validate-country1").style.display = "block";
			document.getElementById("validate-country2").style.display = "none";
			return false;
		}
		else if (country != "Brasil")
		{
			document.getElementById("validate-country1").style.display = "none";
			document.getElementById("validate-country2").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-country1").style.display = "none";
			document.getElementById("validate-country2").style.display = "none";
			return true;
		}
	}

	function validateState() {
		var state = document.forms["register"]["estado"].value;

		if (state == "selecione")
		{
			document.getElementById("validate-state").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-state").style.display = "none";
			return true;
		}
	}

	function validateCity() {
		var c = document.forms["register"]["cidade"].value;

		if (c == "" || b == null)
		{
			document.getElementById("validate-city1").style.display = "block";
			document.getElementById("validate-city2").style.display = "none";
			return false;
		}
		else
		{
			for (i = 0; i < c.length; i++)
			{
				if (!(isLetter(c[i]) || isSpecialLetter(c[i])))
				{
					document.getElementById("validate-city1").style.display = "none";
					document.getElementById("validate-city2").style.display = "block";
					return false;
				}
			}

			document.getElementById("validate-city1").style.display = "none";
			document.getElementById("validate-city2").style.display = "none";
			return true;
		}
	}

	function validateFirstName() {
		var fN = document.forms["register"]["first-name"].value;

		if (fN == "" || fN == null)
		{
			document.getElementById("validate-nome1").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-nome1").style.display = "none";
			return true;
		}
	}

	function validateLastName() {
		var lN = document.forms["register"]["last-name"].value;

		if (lN == "" || lN == null)
		{
			document.getElementById("validate-nome2").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-nome2").style.display = "none";
			return true;
		}
	}

	function validateSex() {
		var sex = document.forms["register"]["genero"];

		for (i = 0; i < sex.length; i++)
		{
			if (sex[i].checked)
			{
				document.getElementById("validate-sex").style.display = "none";
				return true;
			}
		}

		document.getElementById("validate-sex").style.display = "block";
		return false;
	}

	function validateBirth() {
		var birthday = document.forms["register"]["birth"].value;

		if (birthday == "" || birthday == null)
		{
			document.getElementById("validate-birth").style.display = "block";
			return false;
		}
		else
		{
			document.getElementById("validate-birth").style.display = "none";
			return true;
		}
	}

	function validateCPF() {
		var cpf = document.forms["register"]["cpf"].value;

		var numCount1 = 0;
		var numCount2 = 0;
		var numCount3 = 0;
		var numCount4 = 0;

		if (cpf == "" || cpf == null)
		{
			document.getElementById("validate-cpf1").style.display = "block";
			document.getElementById("validate-cpf2").style.display = "none";
			document.getElementById("validate-cpf3").style.display = "none";
			return false;
		}
		else if (cpf.length != 14)
		{
			document.getElementById("validate-cpf1").style.display = "none";
			document.getElementById("validate-cpf2").style.display = "none";
			document.getElementById("validate-cpf3").style.display = "block";
			return false;
		}
		else if (cpf.indexOf(".") == cpf.lastIndexOf(".") || cpf.indexOf("-") == -1)
		{
			document.getElementById("validate-cpf1").style.display = "none";
			document.getElementById("validate-cpf2").style.display = "none";
			document.getElementById("validate-cpf3").style.display = "block";
			return false;
		}
		else
		{
			for (i = 0; i < cpf.length; i++)
			{
				if(!isNumber(cpf[i]) && (cpf[i] != "." && cpf[i] != "-"))
				{
					document.getElementById("validate-cpf1").style.display = "none";
					document.getElementById("validate-cpf2").style.display = "block";
					document.getElementById("validate-cpf3").style.display = "none";
					return false;
				}
				else if (cpf[i] != "." && cpf[i] != "-")
				{
					if (i < cpf.indexOf("."))
					{
						numCount1++;
					}
					else if (i > cpf.indexOf(".") && i < cpf.lastIndexOf("."))
					{
						numCount2++;
					}
					else if (i > cpf.lastIndexOf(".") && i < cpf.indexOf("-"))
					{
						numCount3++;
					}
					else if (i > cpf.indexOf("-"))
					{
						numCount4++;
					}
				}
			}

			if (numCount1 == 3 && numCount2 == 3 && numCount3 == 3 && numCount4 == 2)
			{
				document.getElementById("validate-cpf1").style.display = "none";
				document.getElementById("validate-cpf2").style.display = "none";
				document.getElementById("validate-cpf3").style.display = "none";
				return true;
			}
			else
			{
				document.getElementById("validate-cpf1").style.display = "none";
				document.getElementById("validate-cpf2").style.display = "none";
				document.getElementById("validate-cpf3").style.display = "block";
				return false;
			}
		}

	}

	function evalTel() {
		var testTelDDD = validateTelDDD();
		var testTel = validateTel();

		if (testTelDDD == 0 || testTel == 0)
		{
			document.getElementById("validate-tel1").style.display = "block";
			document.getElementById("validate-tel2").style.display = "none";
			return false;
		}
		else if (testTelDDD == -1 || testTel == -1)
		{
			document.getElementById("validate-tel1").style.display = "none";
			document.getElementById("validate-tel2").style.display = "block";
			return false;
		}
		else if (testTelDDD == 1 && testTel == 1)
		{
			document.getElementById("validate-tel1").style.display = "none";
			document.getElementById("validate-tel2").style.display = "none";
			return true;
		}
	}

	function evalCel() {
		var testCelDDD = validateCelDDD();
		var testCel = validateCel();

		if (testCelDDD == 0 || testCel == 0)
		{
			document.getElementById("validate-cel1").style.display = "block";
			document.getElementById("validate-cel2").style.display = "none";
			return false;
		}
		else if (testCelDDD == -1 || testCel == -1)
		{
			document.getElementById("validate-cel1").style.display = "none";
			document.getElementById("validate-cel2").style.display = "block";
			return false;
		}
		else if (testCelDDD == 1 && testCel == 1)
		{
			document.getElementById("validate-cel1").style.display = "none";
			document.getElementById("validate-cel2").style.display = "none";
			return true;
		}
	}

	function validateTelDDD() {
		var tDDD = document.forms["register"]["ddd"].value;

		if (tDDD == "" || tDDD == null)
		{
			return 0;
		}
		else if (tDDD.length > 3 || tDDD.length < 2)
		{
			return -1;
		}
		else
		{
			for (i = 0; i < tDDD.length; i++)
			{
				if (!isNumber(tDDD[i]))
				{
					return -1;
				}
			}

			return 1;
		}
	}	

	function validateTel() {
		var tel = document.forms["register"]["residencial"].value;

		if (tel == "" || tel == null)
		{
			return 0;
		}
		else if (tel.indexOf("-") == - 1)
		{
			return -1;
		}
		else if (tel.length < 8 || tel.length > 9)
		{
			return -1;
		}
		else
		{
			for (i = 0; i < tel.length; i++)
			{
				if (!isNumber(tel[i]) && tel[i] != "-")
				{
					return -1;
				}
			}

			return 1;
		}
	}

	function validateCelDDD() {
		var cDDD = document.forms["register"]["ddd2"].value;

		if (cDDD == "" || cDDD == null)
		{
			return 0;
		}
		else if (cDDD.length > 3 || cDDD.length < 2)
		{
			return -1;
		}
		else
		{
			for (i = 0; i < cDDD.length; i++)
			{
				if (!isNumber(cDDD[i]))
				{
					return -1;
				}
			}

			return 1;
		}
	}

	function validateCel() {
		var cel = document.forms["register"]["cel"].value;

		if (cel == "" || cel == null)
		{
			return 0;
		}
		else if (cel.indexOf("-") == - 1)
		{
			return -1;
		}
		else if (cel.length < 9 || cel.length > 10)
		{
			return -1;
		}
		else
		{
			for (i = 0; i < cel.length; i++)
			{
				if (!isNumber(cel[i]) && cel[i] != "-")
				{
					return -1;
				}
			}

			return 1;
		}
	}

	function validateRegister() {
		var cond1 = validateEmail();
		var cond2 = validateEmailConfirm();
		var cond3 = validatePassword();
		var cond4 = validatePasswordConfirm();
		var cond5 = validateCEP();
		var cond6 = validateAddress();
		var cond7 = validateAddressNumber();
		var cond8 = validateBairro();
		var cond9 = validateCountry();
		var cond10 = validateState();
		var cond11 = validateCity();
		var cond12 = validateFirstName();
		var cond13 = validateLastName();
		var cond14 = validateSex();
		var cond15 = validateBirth();
		var cond16 = validateCPF();
		var cond17 = evalTel();
		var cond18 = evalCel();

		return cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8 && cond9 && cond10 && cond11 && cond12 && cond13 && cond14 && cond15 && cond16 && cond17 && cond18;
	}

	document.getElementById("e-mail").addEventListener('blur', function() {
		evalEmail();
	});

	document.getElementById("e-mail-confirm").addEventListener('blur', function() {
		validateEmailConfirm();
	});

	document.getElementById("pass").addEventListener('blur', function() {
		evalPassword();
	});

	document.getElementById("pass-confirm").addEventListener('blur', function() {
		validatePasswordConfirm();
	});

	document.getElementById("cep").addEventListener('blur', function() {
		validateCEP();
	});

	document.getElementById("address").addEventListener('blur', function() {
		validateAddress();
	});

	document.getElementById("num").addEventListener('blur', function() {
		validateAddressNumber();
	});

	document.getElementById("bairro").addEventListener('blur', function() {
		validateBairro();
	});

	document.getElementById("country").addEventListener('blur', function() {
		validateCountry();
	});

	document.getElementById("cidade").addEventListener('blur', function() {
		validateCity();
	});

	document.getElementById("first-name").addEventListener('blur', function() {
		validateFirstName();
	});

	document.getElementById("last-name").addEventListener('blur', function() {
		validateLastName();
	});

	document.getElementById("cpf").addEventListener('blur', function() {
		validateCPF();
	});

	document.getElementById("ddd").addEventListener('blur', function() {
		evalTel();
	});

	document.getElementById("residencial").addEventListener('blur', function() {
		evalTel();
	});

	document.getElementById("ddd2").addEventListener('blur', function() {
		evalCel();
	});

	document.getElementById("cel").addEventListener('blur', function() {
		evalCel();
	});
}