<template>
  <div>
    <div :class="`cartao${id}`" class="cartao"></div>

    <form :id="`cartao${id}`" class="esconde">
      <input type="text" id="cc-number" name="number" :value="numero" />
      <input type="text" id="cc-name" name="first-name" :value="nome" />
      <input type="text" id="cc-expiration" name="expiry" :value="data" />
      <input type="text" id="cc-cvv" name="cvc" />
    </form>
  </div>
</template>
<script>
import * as Card from "card";
export default {
  props: {
    nome: String,
    numero: String,
    data: String,
    id: Number
  },
  name: "Form",
  mounted() {
    new Card({
      form: `form#cartao${this.id}`,
      container: `.cartao${this.id}`,
      formSelectors: {
        numberInput: "input#cc-number",
        nameInput: "input#cc-name",
        expiryInput: "input#cc-expiration",
        cvcInput: "input#cc-cvv",
      },
      width: 200,
      formatting: true,
      placeholders: {
        number: "•••• •••• •••• ••••",
        name: "Nome Completo",
        expiry: "••/••",
        cvc: "•••",
      },
    });
    this.n++;
  },
};
</script>
<style>
  .esconde{
    visibility: hidden;
    display: none;
  }
  .cartao .jp-card-container{
    transform: scale(0.771429) !important;
  }
</style>
