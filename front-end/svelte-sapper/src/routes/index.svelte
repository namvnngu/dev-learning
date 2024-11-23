<script>
</script>
<style>
  h1,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  a {
    margin-top: 40px;
  }
  div {
    margin-top: 60px;
    text-align: center;
  }
  img {
    width: 200px;
    margin: 0 auto;
    display: block;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Job Ninja</title>
</svelte:head>

<div>
  <img src="no-text-logo.png" alt="" />
  <h1>Jobs for Ninjas</h1>
  <p>Find your next assignment right here.</p>
  <a href="jobs" class="btn">View Jobs</a>
</div>
