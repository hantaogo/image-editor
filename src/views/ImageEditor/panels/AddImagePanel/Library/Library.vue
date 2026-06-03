<script setup>
import { ref, inject } from 'vue'
import { fabric } from 'fabric'
import Box from '@/fower/Box.vue'
import { fower } from '@/fower/fower'
import { createApi } from 'unsplash-js'
import { sharedEventHub } from '@/utils/eventhub'
import { randomId } from '@/utils/string'
import qs from 'qs'
import axios from 'axios'

const canvas = inject('canvas')
const items = ref([])
const hasMore = ref(true)
const loading = ref(false)
let searchText = ''
let pageNo = 1
let pageSize = 20

const search = async str => {
  pageNo = 1
  searchText = str
  hasMore.value = true
  items.value = await load2(searchText)
}

const loadMore = async () => {
  if (loading.value) {
    return
  }
  if (hasMore.value) {
    console.log(`加载第${pageNo}页`)
    try {
      items.value = items.value.concat(await load(searchText))
      console.log('items', items.value)
    } finally {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  } else {
    console.log('没有更多了')
  }
}

const load = async str => {
  const o = {
    key: '24511707-5570177a500dfbe4858561029',
    q: str,
    page: pageNo,
    per_page: pageSize,
  }
  const url = `/api?${qs.stringify(o)}`
  const response = await axios.get(url)
  console.log('data', response)
  const result = await response.json()
  if (Array.isArray(result.hits) && result.hits.length > 0) {
    hasMore.value = pageNo * pageSize < result.totalHits
    pageNo += 1
    return result.hits.map(t => {
      return {
        id: `${t.id}`,
        thumb: t.previewURL,
        url: t.largeImageURL,
      }
    })
  } else {
    hasMore.value = false
    return []
  }
}

const load2 = async str => {
  // 图床：https://unsplash.com/
  // 账号：hantaogo@gmail.com
  // 密码：Japplego123
  const unsplash = createApi({
    accessKey: 'gB2sEI9rVriiSfgknD4GVD-fNZ1DpHIj3s8fZPNHM9U',
  })
  const result = await unsplash.search.getPhotos({
    query: str,
    page: pageNo,
    per_page: pageSize,
  })
  if (result.type === 'success') {
    return result.response.results.map(t => {
      return {
        id: t.id,
        thumb: t.urls.thumb,
        url: t.urls.regular,
      }
    })
  }
  // return [
  //   {
  //     "id": "TLP1glNg3ZM",
  //     "thumb": "https://images.unsplash.com/photo-1634505983574-5c974bfc0ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1634505983574-5c974bfc0ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "m8kxCzrUpZQ",
  //     "thumb": "https://images.unsplash.com/photo-1634932842151-dd3bdb84406f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1634932842151-dd3bdb84406f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "oki2QLr26OQ",
  //     "thumb": "https://images.unsplash.com/photo-1635132591146-696196370bdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635132591146-696196370bdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "tlfTupVNpZI",
  //     "thumb": "https://images.unsplash.com/photo-1635145343276-4ee1105a77ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635145343276-4ee1105a77ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "vTiSTDFWcgY",
  //     "thumb": "https://images.unsplash.com/photo-1635333607229-10cabf0d892f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635333607229-10cabf0d892f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "3MRE97MN2jQ",
  //     "thumb": "https://images.unsplash.com/photo-1635377443293-fa2ce97acfcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635377443293-fa2ce97acfcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "27ufNPtyAMA",
  //     "thumb": "https://images.unsplash.com/photo-1635525315789-8cce3d739ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635525315789-8cce3d739ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "1qZc-mO6Myc",
  //     "thumb": "https://images.unsplash.com/photo-1635551266878-8476b054e50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635551266878-8476b054e50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "GK7CeiFplJY",
  //     "thumb": "https://images.unsplash.com/photo-1635795633687-a31c4de4e7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635795633687-a31c4de4e7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "ufuchdZawng",
  //     "thumb": "https://images.unsplash.com/photo-1635796332668-78830169097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635796332668-78830169097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "ljvz9XKNnv0",
  //     "thumb": "https://images.unsplash.com/photo-1635925088963-57affae93b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1635925088963-57affae93b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "EdJk1E0UCoo",
  //     "thumb": "https://images.unsplash.com/photo-1636120994480-98cca0a2d6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636120994480-98cca0a2d6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "UChNjL5Zpk4",
  //     "thumb": "https://images.unsplash.com/photo-1636207218371-734ad3756098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636207218371-734ad3756098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "MhQoyfo6bH0",
  //     "thumb": "https://images.unsplash.com/photo-1636216201295-860c1972713a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636216201295-860c1972713a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "NIIlEEIORu0",
  //     "thumb": "https://images.unsplash.com/photo-1636232608962-24f337e66235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636232608962-24f337e66235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "Y6AZFmN1MGY",
  //     "thumb": "https://images.unsplash.com/photo-1636249253913-40e83d5423e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636249253913-40e83d5423e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "gCTCMogvAUc",
  //     "thumb": "https://images.unsplash.com/photo-1636333941441-fcbf34c80a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636333941441-fcbf34c80a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "JRXLZyFFsqs",
  //     "thumb": "https://images.unsplash.com/photo-1636365132647-8fa1a6969cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636365132647-8fa1a6969cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "aFt61geV-X4",
  //     "thumb": "https://images.unsplash.com/photo-1636367151826-f4b9fecaa1ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636367151826-f4b9fecaa1ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "OdI_odNTX5g",
  //     "thumb": "https://images.unsplash.com/photo-1636394849426-39501364873c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636394849426-39501364873c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "ha5L-EUna4I",
  //     "thumb": "https://images.unsplash.com/photo-1636399270986-69a480d2af06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636399270986-69a480d2af06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "GVh5yGQwiA8",
  //     "thumb": "https://images.unsplash.com/photo-1636602034142-b5850ebc9364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636602034142-b5850ebc9364?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "zgMZo1Bkzg0",
  //     "thumb": "https://images.unsplash.com/photo-1636624273428-6ff33224a68b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636624273428-6ff33224a68b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "Z2BAKbWxRz8",
  //     "thumb": "https://images.unsplash.com/photo-1636647871439-27a620a83940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636647871439-27a620a83940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "He9D42sxh00",
  //     "thumb": "https://images.unsplash.com/photo-1636653831028-2f0c79190659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1636653831028-2f0c79190659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "XrETj5zpsIE",
  //     "thumb": "https://images.unsplash.com/photo-1637008336776-2aeea516dc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1637008336776-2aeea516dc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "L_w4_OFSCAI",
  //     "thumb": "https://images.unsplash.com/photo-1637083197291-87217e0367d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1637083197291-87217e0367d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "ypCEZV7i0eg",
  //     "thumb": "https://images.unsplash.com/photo-1637249786345-a064129dd0d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1637249786345-a064129dd0d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "wHWDzMJEXiE",
  //     "thumb": "https://images.unsplash.com/photo-1637527049007-6a19ececcddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1637527049007-6a19ececcddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   },
  //   {
  //     "id": "jxFgX54Sb6g",
  //     "thumb": "https://images.unsplash.com/photo-1637607020191-30c9ee47668e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=200",
  //     "url": "https://images.unsplash.com/photo-1637607020191-30c9ee47668e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzc4MTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzc3NDUzODY&ixlib=rb-1.2.1&q=80&w=1080"
  //   }
  // ]
}

const onClick = async item => {
  // 添加图像
  fabric.Image.fromURL(item.url, img => {
    img.id = randomId()
    img.type = 'Image'
    canvas().add(img).setActiveObject(img)
    sharedEventHub.emit('objectAdded', img)
  }, { crossOrigin: 'Anonymous' })
}

defineExpose({
  search,
  loadMore,
})
</script>

<template>
  <Box h="100%">
    <div :class="fower`grid gridTemplateColumns-2 gap1 p1`">
      <Box v-for="(item, index) of items" :key="index" cursorPointer @click="() => onClick(item)">
        <img style="width: 100%;" :src="item.thumb"/>
      </Box>
    </div>
  </Box>
</template>