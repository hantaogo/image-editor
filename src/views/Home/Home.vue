<script setup>
import { inject } from 'vue'
import Box from '@/fower/Box.vue';

const goto = inject('goto')
</script>

<template>
  <Box p6>
    <Box spaceY10>
      <Box h="128" bgWhite shadowSmall shadow--hover toCenter blue500 cursorPointer @click="() => goto('ImageEditor')">
        创建新作品
      </Box>
      <Box h="128" bgWhite shadowSmall shadow--hover toCenter blue500 cursorPointer @click="() => goto('ImageEditor')">
        最新项目
      </Box>
    </Box>
  </Box>
</template>