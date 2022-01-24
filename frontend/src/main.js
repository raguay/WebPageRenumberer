import Start from './Start.svelte';

let app;

app = new Start({
  target: document.getElementById('app'),
});

export default app;

