<script>
  export let opened = true;
</script>

<div class="sidebar" class:opened>
  <slot />
</div>

<style>
  .sidebar {
    position: fixed;
    box-sizing: border-box;
    left: -300px;
    top: 0px;
    width: 300px;
    height: 100%;
    overflow-y: auto;
    background-color: var(--col-bg-0);
    color: var(--col-fg-0);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    padding-top: calc(20px * 2 + 55px);
    padding-bottom: 0;
    /* backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px); */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    /* opacity: 0; */
    transition: 0.2s;
  }

  .sidebar::-webkit-scrollbar {
    display: none;
  }

  :global(.sidebar > *:last-child) {
    margin-bottom: 20px;
  }

  :global(.sidebar > *) {
    margin-bottom: 20px;
  }

  .opened {
    left: 0;
    /* max-height: 100px; */
    opacity: 1;
  }
</style>
