import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Formata uma data para o padrão brasileiro: dd/MM/yyyy HH:mm:ss
 * @param date Date ou string em formato ISO
 * @returns string formatada
 */
export function formatDateBR(date) {
  try {
    return format(new Date(date), "dd/MM/yyyy HH:mm:ss", {
      locale: ptBR,
    });
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "--/--/---- --:--:--";
  }
}
