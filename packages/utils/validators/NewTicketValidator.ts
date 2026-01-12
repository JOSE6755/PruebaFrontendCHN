import * as yup from "yup";

export const ticketSchema = yup.object({
  title: yup
    .string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),

  description: yup
    .string()
    .optional()
    .max(500, "La descripción no puede exceder 500 caracteres"),

  priority: yup
    .string()
    .oneOf(["high", "medium", "low"], "Prioridad inválida")
    .required("La prioridad es obligatoria"),

  status: yup
    .string()
    .oneOf(["open", "in_progress", "closed"], "Estado inválido")
    .required("El estado es obligatorio"),

  assignedTo: yup
    .string()
    .required("Debe asignarse a alguien")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
});
