import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

const FixedBottomButton = ({ label, onClick }: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('root-portal')

  if (!$portalRoot) return null

  return createPortal(
    <Container
      initial={{ opacity: 0, translateY: '100%' }}
      whileInView={{ opacity: 1, translateY: '0%' }}
      transition={{
        duration: 0.7,
      }}
    >
      <Button full onClick={onClick} css={buttonStyles} size="medium">
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
