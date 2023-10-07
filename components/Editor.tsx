'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'

const Editor = ({ entry }) => {

const [value, setText] = useState(entry.content)
const [isLoading, setIsLoading] = useState(false)

useAutosave({
    data: value,
    onSave: async (_value) => {
        setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setIsLoading(false)

    },
  })

    return (
        <div className='w-full h-full'>
            {isLoading && <div>...loading</div>}
        <textarea
          value={value}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8 outline-none"
        />
        </div>
    )
}

export default Editor