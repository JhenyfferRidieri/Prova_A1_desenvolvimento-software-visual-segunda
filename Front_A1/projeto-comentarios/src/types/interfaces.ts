export interface Categoria {
  categoriaId: number;
  nome: string;
}

export interface Item {
  itemId: number;
  nome: string;
  categoriaId: number;
  categoria: Categoria;
  criadoEm: string;
}
export interface Comentario {
  comentarioId: number;
  texto: string;
  criadoEm: string;
  usuario: {
    email: string;
  };
}