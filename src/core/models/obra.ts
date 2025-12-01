import { Tipo } from './tipo';

export interface Obra {
  id?: number;
  nome: string;
  direcao: string;
  sinopse?: string;
  tipo: Tipo;
}
