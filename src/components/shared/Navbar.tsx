import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'

const Navbar = () => {
  const { pathname } = useLocation()

  const showSignButton = ['/signup', '/signin'].includes(pathname) === false

  return (
    <Flex css={navbarContainerStyles} justify="space-between" align="center">
      <Link to="/">홈</Link>
      {showSignButton ? (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      ) : null}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
