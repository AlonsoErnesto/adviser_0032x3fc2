'use client'

import InputSearchAdviser from '@/components/advisersPage/InputSearchAdviser'

interface InputSearchSectionProps {
  onSearch: (searchTerm: string) => void
}

const InputSearchSection = ({ onSearch }: InputSearchSectionProps) => {
  return (
    <div className="">
      <InputSearchAdviser onSearch={onSearch} />
    </div>
  )
}

export default InputSearchSection
