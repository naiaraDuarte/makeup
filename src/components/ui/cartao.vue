<template>
  <div>
    <div class="cartao"></div>

    <form id="cartao">
      <input type="text" id="cc-number" name="number" />
      <input type="text" id="cc-name" name="first-name" />
      <input type="text" id="cc-expiration" name="expiry" />
      <input type="text" id="cc-cvv" name="cvc" />
    </form>
  </div>
</template>
<script>
import * as Card from "card";
export default {
  name: "Form",
  mounted() {
    new Card({
      form: "form#cartao",
      container: ".cartao",
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
  },
};
</script>