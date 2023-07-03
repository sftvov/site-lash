let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener('click', function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1;
					quantityButton.parentNode.previousElementSibling.classList.remove('_added');
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

const buyBtns = document.querySelectorAll('.card__button');
for (let btn of buyBtns) {
	btn.addEventListener('click', () => {
		if (btn.classList.contains('_added')) {
			btn.nextElementSibling.children[1].children[0].value = 1;
		}
		btn.classList.toggle('_added');
	});
}

function changeBtnContent() {
	for (let btn of buyBtns) {
		if (body.offsetWidth < 768) {
			btn.innerHTML = '';
			btn.classList.add('_icon-basket-fill');
		} else {
			btn.innerHTML = 'КУПИТЬ';
			btn.classList.remove('_icon-basket-fill');
		}
	}
}
