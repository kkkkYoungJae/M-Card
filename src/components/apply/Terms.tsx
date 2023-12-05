import { 약관목록 } from '@/constants/apply'
import Agreement from '@shared/Agreement'
import { MouseEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'

interface TermsProps {
  onNext: (terms: string[]) => void
}
const Terms = ({ onNext }: TermsProps) => {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prev) => {
        return Object.keys(prev).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const 모든약관이_동의되었는가 = Object.values(termsAgreements).every(
    (term) => term,
  )

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
            link={link}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>

      <FixedBottomButton
        label="약관동의"
        disabled={!모든약관이_동의되었는가}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
