let searchIcon = document.querySelector('a._icon-search');
let searchBody = document.querySelector('.search__body');
let searchInput = document.querySelector('.search__input');

document.addEventListener('click', (e) => {
	if (e.target === searchIcon) {
		if (wrapper.offsetWidth > 1219) {
			_slideSide(search);
			_slideSideBack(searchIcon);
			header.classList.add('_hover');
		} else {
			_slideDown(search);
		}
		setTimeout(() => {
			search.classList.add('_active');
			searchBody.classList.add('_focus');
			searchInput.focus();
		}, 500);
	} else if (!e.target.closest('.search__body') && search.classList.contains('_active')) {
		searchBody.classList.remove('_focus');
		if (wrapper.offsetWidth > 1219) {
			_slideSideBack(search);
			_slideSide(searchIcon);
		} else {
			_slideUp(search);
		}
		setTimeout(() => {
			search.classList.remove('_active');
			header.classList.remove('_hover');
		}, 500);
	}
});
