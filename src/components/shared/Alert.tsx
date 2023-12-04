import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import Button from './Button'
import Dimmed from './Dimmed'
import Flex from './Flex'
import Text from './Text'

interface AlertProps {
  open?: boolean
  title: ReactNode
  description?: ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

const Alert = ({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) => {
  if (!open) return null

  return (
    <Dimmed>
      <AlertContainer>
        <Text typography="t4" bold display="block" style={{ marginBottom: 6 }}>
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            onClick={onButtonClick}
            weak
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimmed>
  )
}

export default Alert

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`
