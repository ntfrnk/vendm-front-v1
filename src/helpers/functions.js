export const secureLink = (link) => {
	return link;
};

export const contarPalabrasYCaracteres = (texto) => {
	var textoLimpio = texto.replace(/<[^>]+>/g, "");

	var palabras = textoLimpio.split(/\s+/).filter(function (word) {
		return word.length > 0;
	});
	var cantidadPalabras = palabras.length;
	var cantidadCaracteres = textoLimpio.length;

	return {
		palabras: cantidadPalabras,
		caracteres: cantidadCaracteres,
	};
};

export const sortByName = (data) => {
	return data.sort((a, b) => {
		const field_a = a.name.toUpperCase();
		const field_b = b.name.toUpperCase();

		if (field_a < field_b) {
			return -1;
		}
		if (field_a > field_b) {
			return 1;
		}
		return 0;
	});
};

export const sortByOrdering = (data) => {
	return data.sort((a, b) => {
		return a.ordering - b.ordering;
	});
};

export const setChapterGlobal = (index, value) => {
	let defaultChapters = localStorage.getItem('defaultChapters') 
		? JSON.parse(localStorage.getItem('defaultChapters')) 
		: {};
	let newData = {};
	newData[index] = value;
	defaultChapters = {...defaultChapters, ...newData};
	localStorage.setItem('defaultChapters', JSON.stringify(defaultChapters));
};

export const getChapterGlobal = (project_id) => {
	let data = localStorage.getItem('defaultChapters') ?? 0;
	if(data){
		data = data !== 0 ? JSON.parse(data) : 0;
		return data[project_id] ?? 0;
	}
	return data;
}

export const textFormatter = (text) => {
    text = text.replaceAll('<p>', '<p class="mb-5 text-[1.2rem] text-slate-700">');
    text = text.replaceAll('<a', '<a class="text-sky-500 hover:text-slate-200 hover:underline transition-all duration-300"');
    text = text.replaceAll('<blockquote>', '<blockquote class="mb-5 px-6 bg-black/30 pt-6 pb-2 italic">');
    text = text.replaceAll('<ul>', '<ul class="p-0 m-0 pt-3">');
    text = text.replaceAll('<li>', '<li class="mb-4 text-[1.2rem] text-slate-700 border-l-[10px] border-slate-300 px-4">');
    text = text.replaceAll('<h1>', '<h1 class="mb-5 mt-10 text-4xl text-slate-700 font-bold">');
    text = text.replaceAll('<h2>', '<h2 class="mb-5 mt-10 text-3xl text-slate-700 font-bold">');
    text = text.replaceAll('<h3>', '<h3 class="mb-5 mt-10 text-2xl text-slate-700 font-bold">');
    text = text.replaceAll('<h4>', '<h4 class="mb-5 mt-10 text-xl text-slate-700 font-bold">');
    text = text.replaceAll('<strong>', '<strong class="font-medium">');
    return text;
}