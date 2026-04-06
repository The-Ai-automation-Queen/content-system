/**
 * Embed Loader — Lightweight async loader
 *
 * This is the tiny snippet customers paste into their site.
 * It asynchronously loads the full plugin script from your CDN.
 * This keeps the initial payload tiny (~500 bytes).
 *
 * Customer pastes this:
 *
 *   <div id="my-plugin"></div>
 *   <script>
 *     (function(d,s,id,src){
 *       if(d.getElementById(id))return;
 *       var js=d.createElement(s);
 *       js.id=id;js.async=true;js.src=src;
 *       js.dataset.license='CUSTOMER-KEY';
 *       js.dataset.container='#my-plugin';
 *       js.dataset.theme='light';
 *       d.head.appendChild(js);
 *     })(document,'script','myplugin-js','https://cdn.yoursite.com/plugin.min.js');
 *   </script>
 */

// This file is just documentation — the loader above is what customers copy.
// You can also provide the direct <script> tag approach shown in the demo.
