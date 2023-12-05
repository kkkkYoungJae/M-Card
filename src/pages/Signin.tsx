import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'
import { useCallback } from 'react'

const SigninPage = () => {
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    console.log(formValues)
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SigninPage
