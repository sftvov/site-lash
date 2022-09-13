for (form of forms) {
	form.addEventListener('submit', formSend);
}

async function formSend(e) {
	e.preventDefault();
	let form = e.target;
	let error = formValidate(form);
	if (error === 0) {
		loading.classList.add('_visible');
		let formData = new FormData(form);
		let response = await fetch('../sendmail.php', {
			method: 'POST',
			body: formData,
		});
		if (response.ok) {
			let result = await response.json();
			alert(result.message);
			form.reset();
			loading.classList.remove('_visible');
		} else {
			alert('ошибка');
			loading.classList.remove('_visible');
		}
	} else {
		alert('заполните обязательные поля правильно');
	}
}

function formValidate(form) {
	let error = 0;
	formReq = form.querySelectorAll('._req');
	for (input of formReq) {
		form_remove_error(input);
		if (input.classList.contains('_phone') && !validationPhone(input)) {
			form_add_error(input);
			error++;
		}
		if (input.classList.contains('_email') && !validationEmail(input)) {
			form_add_error(input);
			error++;
		}
		if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
			form_add_error(input);
			error++;
		}
		if (input.getAttribute('type') === 'text' && input.value === '') {
			form_add_error(input);
			error++;
		}
	}
	return error;
}

function validationPhone(input) {
	return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
}

function validationEmail(input) {
	return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input.value);
}

function form_add_error(input) {
	input.classList.add('_error');
}
function form_remove_error(input) {
	input.classList.remove('_error');
}
