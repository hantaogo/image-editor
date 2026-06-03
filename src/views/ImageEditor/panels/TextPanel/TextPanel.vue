<script setup>
import Panel from '../../components/Panel'
import Box from '@/fower/Box.vue'
import Remove from './Remove'
import Clone from './Clone'
import CloneToImage from './CloneToImage'
import Text from './Text'
import FontFamily from './FontFamily'
import FontSize from './FontSize'
import LineHeight from './LineHeight'
import Fill from './Fill'
import Stroke from './Stroke'
import Shadow from './Shadow'
import CharSpacing from './CharSpacing'
import TextAlign from './TextAlign'
import FontStyle from './FontStyle'
</script>

<template>
  <Panel width="260" title="文字">
    <Box h="100%" white textXS>
      <Box column spaceY3 p4>
        <Remove/>
        <Clone/>
        <CloneToImage/>
        <Text/>
        <FontFamily/>
        <FontSize/>
        <LineHeight/>
        <CharSpacing/>
        <TextAlign/>
        <FontStyle/>
        <Fill/>
        <Stroke/>
        <Shadow/>
      </Box>
    </Box>
  </Panel>
</template>