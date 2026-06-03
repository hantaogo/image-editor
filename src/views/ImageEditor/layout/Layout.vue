<script setup>
import Box from '@/fower/Box.vue'
import Left from './Left.vue'
import Right from './Right.vue'
</script>

<template>
  <Box h="100%" row toBetween spaceX-1 style="background-color: #141416;">
    <Left/>
    <Right/>
  </Box>
</template>
