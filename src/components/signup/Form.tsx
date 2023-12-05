import { FormValues } from '@/models/signup'
import { css } from '@emotion/react'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'

interface FormProps {
  onSubmit: (formValues: FormValues) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = e

    setDirty((prev) => ({
      ...prev,
      [name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abcd@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={errors.email}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={errors.password}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={errors.rePassword}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={errors.name}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        onClick={() => onSubmit(formValues)}
        disabled={!제출가능한상태인가}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }

  return errors
}

export default Form
