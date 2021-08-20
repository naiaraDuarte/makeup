<template>
  <div>
    <div class="card-wrapper"></div>

    <form>
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
  name: "Form CreditCard",
  mounted() {
    new Card({
      form: "form",
      container: ".card-wrapper",
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