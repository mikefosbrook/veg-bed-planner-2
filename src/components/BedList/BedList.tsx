import Link from 'next/link';
import { IBed } from '@/types';

type BedListProps = {
  beds: IBed[];
  deleteBed: (id: string) => void;
};

export default function BedList({ beds, deleteBed }: BedListProps) {
  return (
    <div className="bed-list">
      {beds.map((bed) => (
        <Link className="beds-preview" href={`/bed/${bed.id}`} key={bed.id}>
          <article key={bed.id}>
            <h1>{bed.name}</h1>
            <p>
              ({bed.cellsX} x {bed.cellsY})
            </p>

            <button
              className="btn btn-inline outline align-right"
              type="button"
              onClick={(e) => {
                deleteBed(bed.id);
                e.preventDefault();
              }}
            >
              Delete
            </button>
          </article>
        </Link>
      ))}
    </div>
  );
}
