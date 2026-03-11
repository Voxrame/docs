<script setup>
defineProps(['text', 'type'])
</script>

<template>
  <div class="nav-badge">
    <Badge 
      :type="type" 
      :text="text" 
    />
  </div>
</template>

<style scoped>
.nav-badge {
  display: flex;
  align-items: center;
  padding: 0 12px;
  transform: translateY(1px);
  
  @media (max-width: 768px) {
    padding: 12px 0;
    width: 100%;
  }
}

</style>
