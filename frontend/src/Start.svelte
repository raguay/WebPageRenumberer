<div
  id="dragbar"
  data-wails-drag
>
</div>

<div
  id="main"
>
  <h1>Web Page Renumberer</h1>
  <div
    id="content"
  >
    <textarea 
      bind:value={inputText} 
    />

    <div
      id="indexType"
    >
      <label
        for="elType"
      >
        Element Type
      </label>

      <input 
        id='elType'
        type="text"
        bind:value={elementType}
      />
    </div>

    <div 
      id="buttonRow"
    >
      <button
        on:click={showRows}
      >
        Show Rows
      </button>
      <button
        on:click={processText}
      >
        Renumber
      </button>
      <button
        on:click={clearText}
      >
        Clear
      </button>

    </div>

    {#if numbersFound}
      <div
        id="tableDiv"
      >
        <table>
          <th></th>
          <tbody>
            {#each matches as match}
              <tr><td>{match[1]}.</td><td>{match[2]}</td></tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if output != null}
      <textarea >
        {output}
      </textarea>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    background: #2A212C; 
    margin: 8px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #main {
    display: flex;
    flex-direction: column;
    background: #2A212C; 
    color: #80FFEA;
    overflow: hidden;
    user-select: none;
    width: 100%;
    height: 100%;
  }

  #dragbar {
    width: 100%;
    height: 20px;
    margin: 0px;
    padding: 0px;
  }
  
  #content {
    display: flex;
    flex-direction: column;
    margin: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 750px;
    user-select: none;
  }

  #buttonRow {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    user-select: none;
  }

  #indexType {
    display: flex;
    flex-direction: row;
    margin: 10px 0px;
    user-select: none;
  }

  #tableDiv {
    height: 300px;
    width: 100%;
    overflow: auto;
    user-select: none;
  }

  table {
    user-select: none;
  }

  label {
    margin-top: 14px;
    margin-right: 20px;
    user-select: none;
  }

  textarea, input {
    background: #9F70A9;
    border-radius: 10px;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  textarea {
    height: 200px;
  }

  button {
    margin: auto;
    text-align: center;
    padding: 5px;
    color: #80FFEA;
    background-color: #9F70A9;
    border-radius: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1 {
    text-align: center;
    margin: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

<script>
  import { onMount } from "svelte";

  var inputText = "";
  var elementType = "h3";
  var output = null;
  var numbersFound = false;
  var matches;

  onMount(() => {

  })

  function processText() {
    var count = 1;
    matches.forEach(term => {
      if(parseInt(term[1]) === 1) count = 1;
      var orig = `<${elementType}>${term[1]}.${term[2]}</${elementType}>`;
      var nline = `<${elementType}>${count}.${term[2]}</${elementType}>`;
      count += 1;
      inputText = inputText.replace(orig,nline);
    });
    showRows();
  }

  function showRows() {
    var indexStr = `<${elementType}>(\\d+)\\.(.*)</${elementType}>`;
    var regexpIndex = new RegExp(indexStr,'igm');
    matches = [...inputText.matchAll(regexpIndex)];
    if(matches.length > 0) numbersFound = true;
  }

  function clearText() {
    inputText = '';
    matches = null;
    numbersFound = false;
  }
</script>
