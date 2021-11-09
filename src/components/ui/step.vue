<template>
  <div>
    <v-stepper alt-labels elevation="0">
      <v-stepper v-model="e1">
        <v-stepper-header elevation="0" style="box-shadow: none">
          <template v-for="(item, i) in steps">
            <v-stepper-step
              :key="`${i}-step`"
              :complete="e1 > i"
              :step="i"
              class="centraliza letra"
            >
              {{ item.nome }}
            </v-stepper-step>

            <v-divider v-if="i !== steps" :key="i"></v-divider>
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-stepper>
  </div>
</template>
<script>
export default {
  props: {
    // perfilSelecionado: Object,
    // situacao: String,
    // mudanca: Number,
    e1: Number,
    steps: Array
  },
};
</script>