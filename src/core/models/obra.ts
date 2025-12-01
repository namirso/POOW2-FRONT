import { Tipo } from './tipo';

export interface Obra {
  id?: number;
  nome: string;
  direcao: string;
  sinopse?: string; // Adicionei caso exista, senão pode remover
  tipo: Tipo; // Relacionamento
}
