import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { useState } from 'react'

const Apply = () => {
  const [step, setStep] = useState(0)

  const handleTermsChange = (terms: string[]) => {
    console.log(terms)
  }

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  )
}

export default Apply
