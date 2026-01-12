import * as yup from "yup";

export const loginSchema = yup.object({
  correo: yup.string().email("Correo inválido").required("Correo requerido"),
  contrasenia: yup
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .required("Contraseña requerida"),
});
