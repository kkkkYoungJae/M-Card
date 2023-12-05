import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

interface FormProps {
  onSubmit: (formValues: FormValues) => void
}

const Form = ({ onSubmit }: FormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
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
      <Spacing size={32} />

      <Button
        size="medium"
        onClick={() => onSubmit(formValues)}
        disabled={!제출가능한상태인가}
      >
        로그인
      </Button>

      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요'
  }

  return errors
}

export default Form
