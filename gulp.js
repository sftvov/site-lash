export const font_names = '{Gilroy,}';

const maxWidth = 2560;
const maxContainer = 1920;
const md4 = 1024;

const lightArr = [
	// '/hero/',
	// '/site-types/'
];

const resizeArr = [
	['/products/', false, true, [800, 0], [400, 0], [300, 0], [200, 0]],
	// ['/site-types/', false, true, [200, 0]],
];

const retinaArr = [
	['/hero/', 2, [0, 768, 100], [maxWidth, 0, 100]],
	// ['/site-types/', 2, [maxContainer - 400, 0, 33], [md4, 0, 100]],
];

export const imageSet = {
	lightArr: lightArr,
	resizeArr: resizeArr,
	retinaArr: retinaArr,
};
