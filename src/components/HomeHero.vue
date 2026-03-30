<script setup>
import { useData } from 'vitepress'
const { site, frontmatter } = useData()
</script>

<template>
  <div class="custom-hero">
    <h1 class="hero-title">
      <span class="gradient-text">{{ frontmatter.hero.name }}</span>
    </h1>
    <p class="hero-tagline">{{ frontmatter.hero.text }}</p>
    <div class="hero-actions">
      <a v-for="action in frontmatter.hero.actions" :key="action.link" :href="action.link" class="hero-btn" :class="action.theme">
        {{ action.text }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.custom-hero {
  text-align: center;
  padding: 80px 24px;
}
.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.2;
}
.gradient-text {
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  color: transparent;
}
.hero-tagline {
  font-size: 1.5rem;
  margin-top: 24px;
  color: var(--vp-c-text-2);
}
.hero-actions {
  margin-top: 48px;
  display: flex;
  gap: 16px;
  justify-content: center;
}
.hero-btn {
  padding: 12px 24px;
  border-radius: 24px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}
.hero-btn.brand {
  background-color: var(--vp-c-brand);
  color: white;
}
.hero-btn.brand:hover {
  filter: brightness(1.2);
}
.hero-btn.alt {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}
.hero-btn.alt:hover {
  background-color: var(--vp-c-bg-mute);
}
</style>
