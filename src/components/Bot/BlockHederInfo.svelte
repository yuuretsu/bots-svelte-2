<script lang="ts">
  export let title: string;
  export let label: string = "";
  export let color: string;
</script>

<div class="wrapper">
  <div class="avatar" style={`background-color: ${color};`}>
    <!--  -->
  </div>
  <div class="info">
    <div class="title">{title}</div>
    <div class="label">{label}</div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
  }
  .avatar {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 2px var(--col-bg-1);
    border-radius: 20px;
  }
  .info {
    margin-left: 10px;
  }
  .title {
    font-weight: bold;
  }
</style>
