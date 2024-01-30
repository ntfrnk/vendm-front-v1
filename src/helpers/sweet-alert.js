import Swal from 'sweetalert2';

const Sw = Swal.mixin({
	customClass: {
		actions: '!gap-2',
		confirmButton: '!me-2 px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded transition-all duration-300',
		cancelButton: 'px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-all duration-300'
	},
	buttonsStyling: false
});

export const swAlert = (options = {}) => {
	return Sw.fire({
		title: options.title ?? false,
		html: options.text ?? 'Si eliminas este proyecto, también se borrarán los escritos que pertenezcan a él.',
		icon: options.icon ?? 'success',
		showCancelButton: options.showCancelButton ?? true,
		showConfirmButton: options.showConfirmButton ?? true,
		showCloseButton: options.showCloseButton ?? true,
		confirmButtonText: options.confirmButtonText ?? 'Aceptar',
		cancelButtonText: options.cancelButtonText ?? 'Cancelar',
		allowOutsideClick: options.allowOutsideClick ?? false,
		timer: options.timer ?? 3000,
		timerProgressBar: options.timer !== 0 ? true : false
	}).then((result) => {
		if (result.isConfirmed) {
			return true;
		}
	});
}

export const swConfirm = (options = {}, callback) => {
	return Sw.fire({
		title: options.title ?? 'Estás seguro?',
		text: options.text ?? 'Si eliminas este proyecto, también se borrarán los escritos que pertenezcan a él.',
		icon: options.icon ?? 'success',
		showCancelButton: options.showCancelButton ?? true,
		showConfirmButton: options.showConfirmButton ?? true,
		showCloseButton: options.showCloseButton ?? true,
		confirmButtonText: options.confirmButtonText ?? 'Sí, eliminar',
		cancelButtonText: options.cancelButtonText ?? 'No, mejor no',
		allowOutsideClick: options.allowOutsideClick ?? false,
		timer: options.timer ?? 0,
		timerProgressBar: options.timer !== 0 ? true : false
	}).then((result) => {
		if (result.isConfirmed) {
			return true;
		}
	});
}