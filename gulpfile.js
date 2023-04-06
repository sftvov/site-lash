let project_folder = 'dist',
	source_folder = 'src',
	img_folder = 'img',
	font_names = '{icons,Gilroy}';
fs = require('fs');

let path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/' + img_folder + '/',
		video: project_folder + '/video/',
		fonts: project_folder + '/fonts/',
		php: project_folder + '/',
	},
	src: {
		html: [source_folder + '/*.pug', '!' + source_folder + '/_*.pug'],
		css: [source_folder + '/scss/style.scss', source_folder + '/scss/css-pages/*.scss'],
		js: [source_folder + '/js/script.js', source_folder + '/js/js-pages/*.js'],
		img: source_folder + '/' + img_folder + '/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
		video: source_folder + '/video/**/*.{mp4,avi}',
		ttf: source_folder + '/fonts/' + font_names + '/*.ttf',
		woff: source_folder + '/fonts/' + font_names + '/*.{woff,woff2}',
		php: [source_folder + '/php*/**/*', source_folder + '/*.php'],
	},
	watch: {
		html: source_folder + '/**/*.pug',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/' + img_folder + '/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
	},
	clean: './' + project_folder + '/',
};

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	groupmedia = require('gulp-group-css-media-queries'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	{ gifsicle, mozjpeg, optipng, svgo } = require('gulp-imagemin'),
	imageResize = require('gulp-image-resize'),
	webp = require('gulp-webp'),
	pug = require('gulp-pug'),
	webpcss = require('gulp-webpcss'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter');

function browserSync() {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/',
		},
		port: 1709,
		notify: false,
	});
}

function html() {
	return src(path.src.html).pipe(pug({})).pipe(dest(path.build.html)).pipe(browsersync.stream());
}

function css() {
	return (
		src(path.src.css)
			.pipe(
				scss({
					outputStyle: 'expanded',
				})
			)
			.pipe(groupmedia())
			.pipe(
				autoprefixer({
					overrideBrowserslist: ['last 5 versions'],
					cascade: true,
				})
			)
			// .pipe(webpcss())
			.pipe(dest(path.build.css))
			.pipe(cleancss())
			.pipe(
				rename({
					extname: '.min.css',
				})
			)
			.pipe(dest(path.build.css))
			.pipe(browsersync.stream())
	);
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: '.min.js',
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function php() {
	return src(path.src.php).pipe(dest(path.build.php)).pipe(browsersync.stream());
}

function copyImages() {
	src(path.src.img)
		.pipe(src(path.src.img))
		.pipe(
			imagemin([
				gifsicle({ interlaced: true }),
				mozjpeg({ quality: 100, progressive: true }),
				optipng({ optimizationLevel: 0 }),
				svgo({
					plugins: [
						{
							name: 'removeViewBox',
							active: true,
						},
						{
							name: 'cleanupIDs',
							active: false,
						},
					],
				}),
			])
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

let lightArr = ['clients/', 'baners/'];

function lightImages() {
	for (folder of lightArr) {
		src(source_folder + '/' + img_folder + '/' + folder + '*.{jpg,jpeg,png,webp}')
			.pipe(imagemin([mozjpeg({ quality: 85, progressive: true }), optipng({ optimizationLevel: 2 })]))
			.pipe(
				rename(function (path) {
					path.basename += '-light';
				})
			)
			.pipe(dest(path.build.img + folder))
			.pipe(webp({ quality: 85 }))
			.pipe(dest(path.build.img + folder))
			.pipe(browsersync.stream());
	}
}

let resizeArr = [
	['/products/', false, true, [800, 0], [400, 0], [300, 0], [200, 0]],
	// ['/baners/', false, true, [2000, 0], [1600, 0], [1200, 0], [800, 0], [400, 0]],
	// ['/clients/', false, true, [400, 0], [200, 0]],
];

function resize() {
	for (picture of resizeArr) {
		for (let i = 3; i < picture.length; i++) {
			let imgPath = picture[0];
			let cropOption = picture[1];
			let scaleOption = picture[2];
			let size = picture[i];
			let pictureWidth = size[0];
			let pictureHeight = size[1];
			src(source_folder + '/' + img_folder + imgPath + '**/*.{jpg,jpeg,png,webp}')
				.pipe(
					imageResize({
						format: 'jpeg',
						width: pictureWidth,
						height: pictureHeight,
						crop: cropOption,
						upscale: scaleOption,
						imageMagick: true,
					})
				)
				.pipe(
					imagemin({
						progressive: true,
						interlaced: true,
						optimizationLevel: 1,
					})
				)
				.pipe(
					rename(function (path) {
						path.extname = '-' + pictureWidth + '.jpeg';
					})
				)
				.pipe(dest(path.build.img + imgPath))
				.pipe(webp({ quality: 85 }))
				.pipe(dest(path.build.img + imgPath))
				.pipe(browsersync.stream());
		}
	}
}

function videos() {
	return src(path.src.video).pipe(dest(path.build.video)).pipe(browsersync.stream());
}

function fonts() {
	src(path.src.woff).pipe(dest(path.build.fonts));
	src(path.src.ttf).pipe(ttf2woff()).pipe(dest(path.build.fonts));
	return src(path.src.ttf).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

gulp.task('otf2ttf', function () {
	return src([source_folder + '/fonts/**/*.otf'])
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(dest(source_folder + '/fonts/'));
});

gulp.task('fontsStyle', function () {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts + 'Gilroy/', function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		});
	}
});

function cb() {}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], resize, copyImages, lightImages);
}

function clean() {
	return del(path.clean);
}

let build = gulp.series(
	clean,
	gulp.parallel(
		copyImages,
		// resize,
		// lightImages,
		videos,
		fonts,
		js,
		// php,
		css,
		html
	)
);
let watch = gulp.parallel(watchFiles, browserSync);
let complete = gulp.parallel(build, watch);

exports.clean = clean;
exports.fonts = fonts;
exports.resize = resize;
exports.copyImages = copyImages;
exports.lightImages = lightImages;
exports.videos = videos;
exports.js = js;
exports.php = php;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.complete = complete;
exports.default = watch;
