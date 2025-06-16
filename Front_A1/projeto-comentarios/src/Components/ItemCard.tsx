import Link from 'next/link';
import { Item } from '../types/interfaces';

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px'
    }}>
      <h3>{item.nome}</h3>
      <p>Categoria: {item.categoria?.nome}</p>
      <Link href={`/itens/${item.itemId}`}>
        Ver detalhes
      </Link>
    </div>
  );
}
