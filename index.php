<!DOCTYPE html>
<html>
<head>
	<title>Infix To Postfix Converter</title>
	<link rel="stylesheet" href="css/w3.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>
	<link href="https://fonts.googleapis.com/css?family=Courgette" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">
	<link href="https://fonts.googleapis.com/css?family=Inknut+Antiqua" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Cherry+Cream+Soda" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=BioRhyme" rel="stylesheet">
	<script src="js/jquery-3.1.1.js"></script>
	<script src="js/script.js"></script>
</head>
<body>
	<div class="outer-box">

		<div>
			<h3 class="w3-student w3-text-indigo ">
			Infix to Postfix Conversion Assignment<br><span style="font-size: 22px;">Abdul Majeed Shehzad BSCS-5B</span>
			</h3>
			<h6 class=" w3-uni w3-text-indigo">Federal Urdu University Of Arts, Sciences & Technology</h6>
			<h6 class="w3-instructor w3-text-indigo">Instructor : Dr. Akhter Raza</h6>
		</div>
		<div class=" inner-box w3-border-">
			<div class="w3-container w3-padding">
				<input class="w3-input equation" type="text" id="equation" placeholder="Enter the Equation..." >
				<button class="w3-btn w3-btn-block btn-go w3-disabled" id="btn-go">Go!</button>
				<span class="error w3-small" style="display: none" id="error">Please enter the valid equation</span>
				<hr>
			</div>
			<div class="w3-container w3-padding w3-row" id="solution" style="display: none">
				<h2 class="w3-lobster" id = "postfix_eq">Postfix Equation : </h2>
				<h2 class="w3-lobster" style="margin-bottom: 36px" id="result">Result : </h2>
			</div>
		</div>
	</div>
</body>
</html>