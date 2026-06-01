<template>
  <section class="section not-found">
    <div class="page text-center">
      <p class="code">404</p>
      <h1>找不到這個頁面</h1>
      <p class="hint">網址可能已變更，或該頁面不存在。</p>
      <div class="actions">
        <router-link to="/" class="btn">回到首頁</router-link>
        <router-link to="/events" class="btn btn-outline">看看活動</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 50vh;
  display: flex;
  align-items: center;
}
.code {
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary);
  margin-bottom: 8px;
}
h1 {
  color: var(--primary-dark);
  margin-bottom: 12px;
}
.hint {
  color: var(--muted);
  margin-bottom: 28px;
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
