<script lang="ts">
    
    type $$Props = {
      children?: any,
      class?: string
    }
    
    const { children , class: className } : $$Props = $props()
</script>


<section class={`w-full min-h-svh text-base ${className}`}>
    {@render children?.()}
</section>

<style scoped>
    section {
        background-image: var(--image);
        background-size: cover;
        transition: background-image 1s;
    }
</style>