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
    id: Number,
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
      width: 270,
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
.esconde {
  visibility: hidden;
  display: none;
}
.cartao .jp-card-container {
  transform: scale(0.771429) !important;
  height: 170px !important;
}

.cartao .jp-card-container .jp-card .jp-card-mastercard .jp-card-identified {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0px;
    border-radius: 10px;
    transform-style: preserve-3d;
    transition: all 400ms linear;
}

.cartao .jp-card .jp-card-front .jp-card-lower .jp-card-number {
  font-size: 19px;
}

.cartao .jp-card .jp-card-front .jp-card-lower .jp-card-expiry {
  font-size: 13px;
}
.cartao .jp-card .jp-card-front .jp-card-lower .jp-card-name {
  font-size: 16px;
}

.cartao .jp-card .jp-card-front .jp-card-lower .jp-card-number {
  margin-bottom: 10px !important;
}
</style>
