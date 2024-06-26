import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { 
  DndContext, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors, 
  DragOverlay, 
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash' 

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  //FIX: click gọi event = cách yêu cầu di chuyển 10px
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //FIX: nhấn giữ 250ms và dung sai của cảm ứng 500px thì kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  //NOTE: Cùng 1 thời điểm chỉ có 1 phần tử đang được kéo (col/card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm Column theo CardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  // NOTE: Trigger trong quá trình kéo
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return // k làm gì khi kéo col

    //NOTE: Kéo Card thì cẩn xử lý thêm
    // console.log('handleDragOver: ', event)
    const { active, over } = event
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    //NOTE: Tìm 2 column theo cardId
    const activeCoLum = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeCoLum || !overColumn) return

    //Nếu kéo card vào col khác thì xử lý trong lúc kéo (handleOver), còn kéo xong rồi thì handleEnd
    if (activeCoLum._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && 
          active.rect.current.translated.top > over.rect.top + over.rect.height
          const modifiler = isBelowOverItem ? 1 : 0
          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifiler : overColumn?.cards?.length + 1

          //NOTE: Clone mảng orderedColumnsState cũ ra 1 cái mới để xử lý data rồi return - update lại orderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)
          const nextActiveColumn = nextColumns.find(column => column._id === activeCoLum._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

          // Col cũ
          if (nextActiveColumn) {
            // xoá card ở col cũ nếu kéo card qua col khác
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
            // Cập nhật lại cardOrderIds sau khi thay đổi list card
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }

          // Col mới
          if (nextOverColumn) {
            // kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nó có thì xoá trước
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            // Thêm card đang kéo vào orverColumn tại vị trí index mới
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
            // Cập nhật lại array cardOrderIds sau khi thay đổi card
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

          }
          console.log('nextColumns: ', nextColumns)
        return nextColumns
      })
    }
  }
  // Note: Trigger sau khi thả
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả Card - Tạm thời k làm gì')
      return

    }
    const { active, over } = event
    if (!active || !over) return

    if(active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      //Sort columns of dndKit before
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //xử lý gọi APIs
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumnsIds: ',dndOrderedColumnsIds)
      // console.log('dndOrderedColumns: ',dndOrderedColumns)
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects ({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext 
      sensors={sensors}
      // thuật toán va chạm góc (card có cover lớn sẽ không hoạt động)
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} 
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
