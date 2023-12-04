import { COLLECTIONS } from '@/constants'
import { card_list } from '@/mock/data'
import { store } from '@/remote/firebase'
import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

const CardListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      batch.set(docRef, card)
    })

    await batch.commit()

    alert('Card added successfully')
  }

  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
