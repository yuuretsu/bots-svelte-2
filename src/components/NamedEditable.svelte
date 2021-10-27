<script lang="ts">
  import SmallInput from "./SmallInput.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let name: string;
  export let value: string;
</script>

{name}:
<span>
  <SmallInput
    innerHTML={value}
    on:input={(e) => {
      // @ts-ignore
      value = e.target.innerHTML;
      dispatch("input", value);
    }}
  />
</span>
