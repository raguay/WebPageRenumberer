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
              <tr><td>
                  {#if typeof match[1] !== 'undefined'}
                    {match[1]}
                  {/if}
                  </td><td>{match[2]}.</td><td>{match[3]}</td>
              </tr>
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
    margin: 0px;
    padding: 0px;
    background: #2A212C; 
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
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
    height: 30px;
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
    height: 230px;
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
    outline: none;
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
  import tidy from "./modules/tidy.js";

  var inputText = "";
  var elementType = "h3";
  var output = null;
  var numbersFound = false;
  var matches;
  var options = {
    "indent":"auto",
    "indent-spaces":2,
    "wrap":0,
    "markup":true,
    "output-xml":false,
    "numeric-entities":true,
    "quote-marks":true,
    "quote-nbsp":false,
    "show-body-only": true,
    "quote-ampersand":false,
    "break-before-br":true,
    "uppercase-tags":false,
    "uppercase-attributes":false,
    "drop-font-tags": false,
    "tidy-mark":false
  };

  onMount(() => {

  })

  function processText() {
    var count = 0;
    matches.forEach(term => {
      if(parseInt(term[2]) === 1) count = 1;
      if(typeof term[1] === 'undefined') term[1] = '';
      inputText = inputText.replace(`<${elementType}>${term[1]}${term[2]}.${term[3]}</${elementType}>`,`<${elementType}>${term[1]}${count}.${term[3]}</${elementType}>`);
      count += 1;
    });
    showRows();
    //
    // Clean up the outputed HTML.
    //
    inputText = tidy(inputText, options);
  }

  function showRows() {
    //
    // Make sure the number heading is on it's own line.
    //
    inputText = inputText.replaceAll(/\n/g,'');
    inputText = inputText.replaceAll(new RegExp(`<${elementType}>`,'igm'), `\n<${elementType}>`);
    inputText = inputText.replaceAll(new RegExp(`</${elementType}>`,'igm'), `</${elementType}>\n`);
    inputText = inputText.replaceAll(new RegExp(`\\n</${elementType}>`,'igm'),`</${elementType}>`)

    //
    // Find the matches.
    //
    matches = [...inputText.matchAll(new RegExp(`<${elementType}>(<*[^0-9]*)(\\d+)\\.(.*)</${elementType}>`,'ig'))];
    if(matches.length > 0) numbersFound = true;
  }

  function clearText() {
    inputText = '';
    matches = null;
    numbersFound = false;
  }
</script>
