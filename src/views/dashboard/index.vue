<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { Getters } from '../../store/getters'

@Component({
    computed: {...mapGetters([Getters.name])
  }
})
export default class Dashboard extends Vue  {
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
