<script lang="ts">
  import { BotAbilities } from "../lib/bot";

  export let abilities: BotAbilities;
</script>

<meter value={abilities.photosynthesis} min="0" max="1" />

<style>
  meter {
    --background: #dadada;
    --optimum: forestgreen;
    --sub-optimum: gold;
    --sub-sub-optimum: crimson;

    /* The gray background in Firefox */
    /* background: var(--background); */
    display: block;
    margin: 0;
    width: 100%;
    height: 20px;
    border-radius: 0;
  }

  /* The gray background in Chrome, etc. */
  meter::-webkit-meter-bar {
    background: var(--background);
  }

  /* The green (optimum) bar in Firefox */
  meter:-moz-meter-optimum::-moz-meter-bar {
    background: var(--optimum);
  }

  /* The green (optimum) bar in Chrome etc. */
  meter::-webkit-meter-optimum-value {
    background: var(--optimum);
  }

  /* The yellow (sub-optimum) bar in Firefox */
  meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: var(--sub-optimum);
  }

  /* The yellow (sub-optimum) bar in Chrome etc. */
  meter::-webkit-meter-suboptimum-value {
    background: var(--sub-optimum);
  }

  /* The red (even less good) bar in Firefox */
  meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: var(--sub-sub-optimum);
  }

  /* The red (even less good) bar in Chrome etc. */
  meter::-webkit-meter-even-less-good-value {
    background: var(--sub-sub-optimum);
  }
</style>
