import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import Alert from './components/shared/Alert'
import { useAlertContext } from './contexts/AlertContext'

const App = () => {
  const { open } = useAlertContext()
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        zzzz
      </Text>
      <Text typography="t2">zzzz</Text>
      <Text typography="t3">zzzz</Text>
      <Text typography="t4">zzzz</Text>
      <Text typography="t5">zzzz</Text>
      <Text typography="t6">zzzz</Text>
      <Button>zzzz</Button>
      <Button disabled>zzzz</Button>

      <TextField label="zzz" />

      <Button
        onClick={() =>
          open({ title: '카드', description: 'de', onButtonClick: () => {} })
        }
      >
        zz
      </Button>
    </div>
  )
}

export default App
