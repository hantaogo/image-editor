/**
 * 拖拽元素（通过修改：transform: translate）
 * @param {HTMLElement} target 拖拽目标，被移动的元素
 * @param {HTMLElement} handle 拖拽手柄，可拖动的元素，默认为：target 
 * @returns 实例
 * 
 * 实例方法：
 * 
 * // 摧毁，移除事件监听器
 * destroy()
 * 
 * @demo
 * <script setup>
 * import { ref, onMounted, onBeforeUnmount } from 'vue'
 * import { dragit } from '@/utils/dragit'
 * 
 * const target = ref(null)
 * const handle = ref(null)
 * 
 * let dragitInstanse = null
 * 
 * onMounted(() => {
 *   dragitInstanse = dragit({ target: target.value, handle: handle.value })
 * })
 * 
 * onBeforeUnmount(() => {
 *   dragitInstanse.destroy()
 * })
 * </script>
 * 
 * <template>
 *   <div ref="target">
 *     <div ref="handle" style="width: 400px; height: 100px; background-color: red; text-align: center;">拖拽我</div>
 *     <div style="width: 400px; height: 300px; background-color: green; text-align: center;">内容</div>
 *   </div>
 * </template>
 */
export const dragit = ({ target, handle }) => {
  if (!target) {
    throw new Error('[Draggable] invalid target')
  }
  if (!(target instanceof HTMLElement)) {
    throw new Error('[Draggable] target should be a HTMLElemnt')
  }
  if (handle && !(handle instanceof HTMLElement)) {
    throw new Error('[Draggable] handle should be a HTMLElemnt')
  }

  let handleElement = handle || target
  let dragging = false
  let startX = 0
  let startY = 0
  let initTranslate = { x: 0, y: 0 }
  let startTranslate = { x: 0, y: 0 }
  let translate = { x: 0, y: 0 }

  const getTranslate = el => {
    const style = window.getComputedStyle(el)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return { x: matrix.m41, y: matrix.m42 }
  }
  
  const setTranslate = (el, p) => {
    el.style.transform = `translate(${p.x}px, ${p.y}px)`
  }
  
  const onMousedown = () => {
    dragging = true
    startX = window.event.clientX
    startY = window.event.clientY
    startTranslate = getTranslate(target)
  }

  const onMouseup = e => {
    dragging = false
  }

  const onMousemove = e => {
    if (dragging) {
      const x = window.event.clientX
      const y = window.event.clientY
      const dx = x - startX
      const dy = y - startY
      translate.x = startTranslate.x + dx
      translate.y = startTranslate.y + dy
      setTranslate(target, translate)
    }
  }

  handleElement.addEventListener('mousedown', onMousedown)
  handleElement.addEventListener('mouseup', onMouseup)
  window.addEventListener('mousemove', onMousemove)
  initTranslate = getTranslate(target)

  return {
    destroy(reset = true) {    
      handleElement.removeEventListener('mousedown', onMousedown)
      handleElement.removeEventListener('mouseup', onMouseup)
      window.removeEventListener('mousemove', onMousemove)
      if (reset) {
        setTranslate(target, initTranslate)
      }
    },
  }
}