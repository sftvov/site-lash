burger.onclick = () => {
	toggleBurger();
};

function toggleBurger() {
	body.classList.toggle('_lock');
	header.classList.toggle('_active');
	burger.classList.toggle('_active');
	menu.classList.toggle('_active');
	menu.classList.toggle('_container');
}

function closeBurger() {
	body.classList.remove('_lock');
	header.classList.remove('_active');
	burger.classList.remove('_active');
	menu.classList.remove('_active');
	menu.classList.remove('_container');
}

header.addEventListener('click', (e) => {
	if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
		closeBurger();
	}
});
