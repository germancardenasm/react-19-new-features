import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type TodoFormProps = {
  addTodo: (text: string) => Promise<void>
  isAdding: boolean
}

export function TodoForm({ addTodo, isAdding }: TodoFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isAdding) {
      await addTodo(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="flex-grow"
        disabled={isAdding}
      />
      <Button type="submit" disabled={isAdding}>
        <PlusCircle className="mr-2 h-4 w-4" /> {isAdding ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}

