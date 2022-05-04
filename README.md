<h2>Objective</h2>
<p>Using Express and Sqlite3, build a RESTful API in Node.js to read, create, update, and delete data from a database of cars</p>

<h2>Content</h2>
<h4>Database.js</h4>
<p>Imports Sqlite3 into Node app and connects to lab4 database</p>
<h4>index.js</h4>
<p>Contains HTTP routes which allow for API calls to be made</p>
<h4>lab4.db</h4>
<p>Contains data on each car's make, model, year, owner, judge, and scores</p>

<h2>How to run</h2>
<ol>
  <li>Ensure that the latest versions of <a href="https://nodejs.dev/download">Node.js</a> and <a href="https://www.sqlite.org/download.html">Sqlite3</a> are installed on your machine</li>
  <li>Clone this repository</li>
  <li>From this repository's directory, run the command "npm init" to create a node_modules folder</li>
  <li>Run the command "node index.js" to start the app</li>
 </ol>
 
 <h2>HTTP Routes</h2>
 <table>
  <tr>
    <th><strong>Operation</strong></th>
    <th><strong>HTTP Method</strong></th>
    <th><strong>Endpoint</strong></th>
  </tr>
  <tr>
    <th>Get a list of all cars</th>
    <th>GET</th>
    <th>/api/data</th>
  </tr>
  <tr>
    <th>Get a list of all cars (ranked by score)</th>
    <th>GET</th>
    <th>/api/ranked</th>
  </tr>
  <tr>
    <th>View top 3 cars of each make</th>
    <th>GET</th>
    <th>/api/top3</th>
  </tr>
  <tr>
    <th>Get a single car based on ID</th>
    <th>GET</th>
    <th>/api/:id</th>
  </tr>
  <tr>
    <th>Get a list of all cars of a given make</th>
    <th>GET</th>
    <th>/api/make/:value</th>
  </tr>
  <tr>
    <th>Add a car to the table</th>
    <th>POST</th>
    <th>/api/car</th>
  </tr>
  <tr>
    <th>Delete a car based on ID</th>
    <th>DELETE</th>
    <th>/api/:id</th>
  </tr>
 </table>
