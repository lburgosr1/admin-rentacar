export const formValidator = [
	{
		type: 'required',
		message: 'es requerido',
	},
	{
		type: 'maxlength',
		message: 'es muy largo',
	},
	{
		type: 'minlength',
		message: 'es muy corto',
	},
	{
		type: 'min',
		message: 'Su valor es incorrecto',
	},
	{
		type: 'max',
		message: 'Su valor es incorrecto',
	},
	{
		type: 'wrongDate',
		message: 'debe ser mayor',
	},
  {
    type: 'pattern',
    message: 'El formato del campo'
  },
  {
    type: 'documentTaken',
    message: 'El documento ingresado ya existe'
  },
  {
    type: 'emailTaken',
    message: 'El email ingresado ya existe'
  },
  {
    type: 'userNameTaken',
    message: 'El usuario ingresado ya existe'
  },
  {
    type: 'noEquals',
    message: 'Las contraseñas no son iguales'
  }
];
