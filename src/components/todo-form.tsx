import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type TodoFormProps = {
  addTodo: (text: string) => Promise<void>
}

export function TodoForm({ addTodo }: TodoFormProps) {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !isSubmitting) {
      setIsSubmitting(true)
      await addTodo(text.trim())
      setText('')
      setIsSubmitting(false)
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
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting}>
        <PlusCircle className="mr-2 h-4 w-4" /> {isSubmitting ? 'Adding...' : 'Add'}
      </Button>
    </form>
  )
}

