import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { getCard } from '@/remote/card'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

const CardPage = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const { open } = useAlertContext()
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (!user) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => navigate(`/apply/${id}`),
      })
      return
    }

    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (!data) return null

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTag(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={text}
              initial={{ opacity: 0, translateX: -90 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTag(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

const IconCheck = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={20}
      width={20}
    >
      <path
        d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill="#6563ff"
      />
    </svg>
  )
}

const removeHtmlTag = (text: string) => {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }

  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default CardPage
