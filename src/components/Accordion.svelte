<script>
  import MdAdd from "svelte-icons/md/MdAdd.svelte";

  export let title;
  export let opened = false;
</script>

<div class="accordion" class:opened>
  <label class="header" class:opened>
    <input class="visually-hidden" type="checkbox" bind:checked={opened} />
    <span class="title">{title}</span>
    <div class="icon header__icon" class:opened>
      <MdAdd />
    </div>
  </label>
  {#if opened}
    <div class="body">
      <slot />
    </div>
  {/if}
</div>

<style>
  .accordion {
    border-radius: 10px;
  }
  .accordion.opened {
    box-shadow: var(--shadow);
  }
  .header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    height: 20px;
    align-items: center;
    user-select: none;
    background-color: transparent;
    border-radius: 10px;
    font-weight: bold;
    transition: height 0.2s, padding 0.2s;
  }
  .header.opened {
    height: 40px;
    padding: 0 10px;
    background-color: var(--col-bg-1);
  }
  .header.opened:hover {
    background-color: var(--col-bg-2);
  }
  .header__icon {
    margin-left: 10px;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon {
    --col-bg: var(--col-bg-1);
    min-width: 20px;
    min-height: 20px;
    max-width: 20px;
    max-height: 20px;
    border-radius: 10px;
    background-color: var(--col-bg);
    box-shadow: 0 0 0 3px var(--col-bg);
    transform: translateX(-3px);
    transition: 0.2s;
  }
  .icon.opened {
    --col-bg: transparent;
    transform: rotate(45deg);
  }
  .header:not(.header.opened):hover .icon {
    --col-bg: var(--col-bg-2);
  }

  .body {
    padding: 10px;
  }

  @keyframes anim {
    from {
      opacity: 0;
    }
  }
</style>
