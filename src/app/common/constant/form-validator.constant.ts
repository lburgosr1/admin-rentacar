export const formValidator = [
	{
		type: 'required',
		message: 'Es Requerido',
	},
	{
		type: 'maxlength',
		message: 'Es Demasiado Largo',
	},
	{
		type: 'minlength',
		message: 'Es Demasiado Corto',
	},
	{
		type: 'min',
		message: 'Su Valor Es Incorrecto',
	},
	{
		type: 'max',
		message: 'Su Valor Es Incorrecto',
	},
	{
		type: 'wrongDate',
		message: 'debe ser mayor que la fecha de inicio',
	},
];
