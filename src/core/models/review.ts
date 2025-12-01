import { Obra } from './obra';
import { Usuario } from './usuario';

export interface Review {
  id?: number;
  titulo: string;    
  descricao: string;
  nota: number;
  obra: Obra;
  usuario?: Usuario;
}
