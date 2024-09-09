document.addEventListener('DOMContentLoaded', function() {
    'use strict';

		const checkbox = document.getElementById("shipping-eniture-shipping_account_capture_checkbox");
		if(checkbox){
			en_shipping_account_hide_show_account_fields(checkbox);
			checkbox.addEventListener("change", function() {
				en_shipping_account_hide_show_account_fields(checkbox);
			});
		}

		en_shipping_account_hide_billing_fields();
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.addedNodes.length) {
					const checkbox = document.getElementById("shipping-eniture-shipping_account_capture_checkbox");
					if(checkbox){
						en_shipping_account_hide_show_account_fields(checkbox);
						checkbox.addEventListener("change", function() {
							en_shipping_account_hide_show_account_fields(checkbox);
						});
					}
					en_shipping_account_hide_billing_fields();
				}
			});
		});

		observer.observe(document.body, { childList: true, subtree: true });
	});



function en_shipping_account_hide_billing_fields(){
	let checkbox = document.getElementById("billing-eniture-shipping_account_capture_checkbox");
	if (checkbox) {
		checkbox.parentNode.style.display = "none";
	}
	let account_field = document.getElementById("billing-eniture-shipping_account_capture_account_number");
	if (account_field) {
		account_field.parentNode.style.display = "none";
	}
    let bill_to_options_div = document.getElementById("billing-eniture-shipping_account_capture_bill_to_options");
	if (bill_to_options_div) {
		bill_to_options_div.style.display = "none";
	}
}

function en_shipping_account_hide_show_account_fields(checkbox){
	const isChecked = checkbox.checked;
	const targetDiv = document.getElementById("shipping-eniture-shipping_account_capture_account_number").closest("div");
    const bill_to_options_div = document.getElementById("shipping-eniture-shipping_account_capture_bill_to_options");
	if (isChecked) {
	  targetDiv.style.display = "block"; 
	  bill_to_options_div.style.display = "block"; 
	} else {
	  targetDiv.style.display = "none";
	  bill_to_options_div.style.display = "none";
	}
}