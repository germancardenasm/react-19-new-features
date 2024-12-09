import { Button } from '@/components/ui/button'

type TodoFilterProps = {
  filter: 'all' | 'active' | 'completed'
  setFilter: (filter: 'all' | 'active' | 'completed') => void
}

export function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="flex justify-center gap-2 mb-4">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => setFilter('all')}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'default' : 'outline'}
        onClick={() => setFilter('active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        onClick={() => setFilter('completed')}
      >
        Completed
      </Button>
    </div>
  )
}

