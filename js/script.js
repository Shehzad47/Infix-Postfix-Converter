$(function() {

	var braces = 0;

	$('#equation').keypress(function(e) {
		var equation = $(this).val();
		var entered_num = e.key;
		var lastChar = equation[equation.length -1];

		if(validate_input(equation, entered_num, lastChar)) e.preventDefault();

		if ($.isNumeric( entered_num ) || is_operator(entered_num) || is_bracket(entered_num)) {
			equation += entered_num;
			if (is_bracket(entered_num)) braces++;
		}
		else e.preventDefault();

	})
	.focusin(function(event) {
		$('#error').hide();
		$('#solution').hide();
	});

	$('#btn-go').click(function(event) {
		var equation = $('#equation').val();
		var lastChar = equation[equation.length -1];
		var brace_err = braces % 2;
		if (is_operator(lastChar) || lastChar == "(" || brace_err == 1){
			$('#error').show(); return
		}

		toEqArray(equation);
		$('#solution').show();

	});

}); //End Of Document Ready Function


function validate_input(equation, entered_num, lastChar){
	if (equation.length == 0 && is_operator(entered_num)) return true;
	else if (lastChar == "(" && entered_num == ")") return true;
	else if (lastChar == ")" && entered_num == "(") return true;
	else if (is_operator(lastChar) && is_operator(entered_num)) return true;

	if (equation.length > 2) $('#btn-go').removeClass('w3-disabled');
}

function is_operator(char){
	if (char == "+" || char == "-" || char == "*" || char == "/" || char == "^") {
		return true;
	}
}

function is_bracket(char){
	if (char == "(" || char == ")") {
		return true;
	}
}

function preference_of(opr){
	if (opr == "^" ) return 1;
	if (opr == "/" || opr == "*") return 2;
	if (opr == "+" || opr == "-") return 3;
}

function toEqArray(eq){
	var equation_array = [];
	var postfix = [];
	var stack = [];

	for (var i = 0; i < eq.length; i++) {
		if (is_bracket(eq[i]) || is_operator(eq[i]) ) {
			equation_array.push(eq[i]);
		}
		else {
			var num = "";
			while ($.isNumeric(eq[i])) {
				num += eq[i];
				i++;
			}
			equation_array.push(num);
			i--;
		}
	}
	var current = "";
	var top = 0; var empty = true;
	for (var i = 0; i < equation_array.length; i++) {
		current = equation_array[i];
		if ($.isNumeric(current)) {
			postfix.push(current);
		}

		if (current == "(") stack.push(current);

		if (current == ")") {
			top = stack[stack.length-1];
			while (top != "(") {
				postfix.push(stack.pop());
				top = stack[stack.length-1];
				if (top == "("){
					stack.pop();
					break;
				}
			}
		}

		if (is_operator(current)) {
			if (stack.length != 0) empty = false;
			if (!empty) {
				top = stack[stack.length-1];
				while (preference_of(top) <= preference_of(current)) {
					postfix.push(stack.pop());
					top = stack[stack.length-1];
					if (stack.length == 0) break;
				}
				stack.push(current);
				top = stack[stack.length-1];
			}
			if (empty) {
				stack.push(current);
				top = stack[stack.length-1];
			}
		}
	}
	if (stack) {
		var len = stack.length;
		for (var i = 0; i < len; i++) {
			postfix.push(stack.pop());
		}
	}
	var postfix_equation = "";
	for (var i = 0; i < postfix.length; i++) {
		postfix_equation += postfix[i];
	}
	$("#postfix_eq").text('Postfix Equation : '+postfix_equation);
	calculate_result(postfix);
}

function calculate_result(postfix_arr){
	var stack = [];
	var current = "";
	var left = 0;
	var right = 0;

	for (var i = 0; i < postfix_arr.length; i++){
		current = postfix_arr[i];
		if ($.isNumeric(current)) {
			stack.push(current);
		}
		if (is_operator(current)) {
			right = parseFloat(stack.pop());
			left =  parseFloat(stack.pop());
			if (current == "+") stack.push(left + right);
			if (current == "-") stack.push(left - right);
			if (current == "*") stack.push(left * right);
			if (current == "/") stack.push(left / right);
			if (current == "^") stack.push(Math.pow(left, right));
		}
	}
	var result = stack.pop()
	$("#result").text('Answer : '+ result);
}