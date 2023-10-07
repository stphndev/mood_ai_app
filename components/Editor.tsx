'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'

const Editor = ({ entry }) => {

const [value, setText] = useState(entry.content)
const [isLoading, setIsLoading] = useState(false)
const [analysis, setAnalysis] = useState(entry.analysis)

const {mood, subject, summary, negative, color} = analysis
    const analysisData = [
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'Mood', value: mood},
        {name: 'Negative', value: negative ? 'True': 'False'},
    ]

useAutosave({
    data: value,
    onSave: async (_value) => {
        setIsLoading(true)
      const data= await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsLoading(false)

    },
  })

    return (
        <div className='w-full h-full grid grid-cols-3'>
            <div className='col-span-2'>
            {isLoading && <div>...loading</div>}
             <textarea
          value={value}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8 outline-none"
        />
            </div>
          <div className='border border-l border-black/10'>
            <div className='px-6 py-10' style={{backgroundColor: color}}>
                <h2 className='text-2xl'>Analysis</h2>
            </div>
            <div>
                    <ul>
                       {analysisData.map((item) => (
                        <li key={item.name}
                        className=' px-2 py-4 flex items-center justify-between border-black/10'>
                            <span className='text-lg font-semibold'>{item.name}</span>
                            <span>{item.value}</span>
                        </li>
                    ))}
                    </ul>
                </div>
          </div>
        </div>
    )
}

export default Editor