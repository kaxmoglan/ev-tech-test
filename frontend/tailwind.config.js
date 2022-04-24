module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			fontSize: {
				sm: '0.95rem',
			},
		},
	},
	variants: {
		extend: {},
	},
};
