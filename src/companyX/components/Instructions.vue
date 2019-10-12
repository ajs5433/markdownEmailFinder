<template>
  <div>
    <p class="step-message">
      1. Run the following query in the main database
    </p>

    <div id="code">
      <p id="abusador">Abusador! lo quiere ma' chiquito??</p>
      <p v-html="code"></p>
    </div>

    <p class="step-message">
      2. Export DB results using the following settings
    </p>

    <div id="message">
      <p>Can't show settings image. Please enlarge screen</p>
    </div>

    <div id="dbvis">
      <div id="dbvis-top">
        <div>
          <img
            id="dbicon"
            src="https://www.computerhope.com/jargon/d/database.jpg"
          />
          <span> Export </span>
        </div>
        <button class="no-click">X</button>
      </div>
      <div id="dbvis-content">
        <hr id="hr1" />
        <br />
        <div id="main-1">
          <div>
            <input type="radio" value="CSV" checked /> CSV
            <input type="radio" disabled /> HTML Encoding:
            <select name="" id=""
              ><option value="Cp1252" checked>✅ Cp1252</option></select
            >
          </div>
        </div>

        <hr id="hr2" />
        <br />
        <div id="main-2">
          <p
            class="data-format-text"
            style="grid-row:1/ span 1; grid-column:2 / span 1"
          >
            Date:
          </p>
          <p
            class="data-format-text"
            style="grid-row:2/ span 1; grid-column:2 / span 1"
          >
            Time:
          </p>
          <p
            class="data-format-text"
            style="grid-row:3/ span 1; grid-column:2 / span 1"
          >
            Timestamp:
          </p>
          <p
            class="data-format-text"
            style="grid-row:4/ span 1; grid-column:2 / span 1"
          >
            Number:
          </p>
          <p
            class="data-format-text"
            style="grid-row:5/ span 1; grid-column:2 / span 1"
          >
            Decimal Number:
          </p>
          <p
            class="data-format-text"
            style="grid-row:7/ span 1; grid-column:2 / span 1"
          >
            Bolean Text Value:
          </p>
          <p
            class="data-format-text"
            style="grid-row:8/ span 1; grid-column:2 / span 1"
          >
            Binary/BLOB:
          </p>
          <p
            class="data-format-text"
            style="grid-row:9/ span 1; grid-column:2 / span 1"
          >
            CLOB:
          </p>
          <p
            class="data-format-text"
            style="grid-row:10/ span 1; grid-column:2 / span 1"
          >
            Null Value text
          </p>
          <p
            class="data-format-text"
            style="grid-row:11/ span 1; grid-column:2 / span 1"
          >
            Quote Text Value
          </p>

          <select
            name=""
            id=""
            style="grid-row:1/ span 1; grid-column:3/ span 2"
            ><option value="">unformatted</option></select
          >
          <select
            name=""
            id=""
            style="grid-row:2/ span 1; grid-column:3/ span 2"
            ><option value="">unformatted</option></select
          >
          <select
            name=""
            id=""
            style="grid-row:3/ span 1; grid-column:3/ span 2"
            ><option value="">unformatted</option></select
          >
          <select
            name=""
            id=""
            style="grid-row:4/ span 1; grid-column:3/ span 2"
            ><option value="">unformatted</option></select
          >
          <select
            name=""
            id=""
            style="grid-row:5/ span 1; grid-column:3/ span 2"
            ><option value="">unformatted</option></select
          >

          <select
            class="gray"
            name=""
            id=""
            style="grid-row:8/ span 1; grid-column:3/ span 1"
            ><option value="">Don't Export</option></select
          >
          <select
            class="gray"
            name=""
            id=""
            style="grid-row:9/ span 1; grid-column:3/ span 1"
            ><option value="">Don't Export</option></select
          >

          <p
            class="data-format-text"
            style="grid-row:1/ span 1; grid-column:5 / span 1"
          >
            2019-09-15
          </p>
          <p
            class="data-format-text"
            style="grid-row:2/ span 1; grid-column:5 / span 1"
          >
            01:39:31
          </p>
          <p
            class="data-format-text"
            style="grid-row:3/ span 1; grid-column:5 / span 1"
          >
            2019-09-15 01:39:31.469
          </p>
          <p
            class="data-format-text"
            style="grid-row:4/ span 1; grid-column:5 / span 1"
          >
            9126183
          </p>
          <p
            class="data-format-text"
            style="grid-row:5/ span 1; grid-column:5 / span 1"
          >
            9126183.531815
          </p>

          <div style="grid-row:6/ span 1; grid-column:3 / span 1">
            <span>Grouping</span
            ><select name="" id=""
              ><option value=",">,</option></select
            >
          </div>
          <div style="grid-row:6/ span 1; grid-column:4 / span 1">
            <span>Decimal</span
            ><select name="" id=""
              ><option value=".">.</option></select
            >
          </div>
          <div style="grid-row:7/ span 1; grid-column:3 / span 1">
            <span>True</span
            ><select name="" id=""
              ><option value="true">true</option></select
            >
          </div>
          <div style="grid-row:7/ span 1; grid-column:4 / span 1">
            <span>False</span
            ><select name="" id=""
              ><option value="false">false</option></select
            >
          </div>
          <div style="grid-row:10/ span 1; grid-column:3 / span 1">
            <select name="" id=""
              ><option value="(null)">(null)</option></select
            >
          </div>

          <div
            style="grid-row:11/ span 1; grid-column:3 / span 4;justify-self:start"
          >
            <select class="gray" name="" id=""
              ><option value="Double">Double</option>
            </select>
            <input type="checkbox" checked disabled /> Duplicate Embedded
          </div>
        </div>
        <hr id="hr3" />
        <br />
        <div id="main-3">
          <h4
            style="justify-self:start; align-self:center ;grid-row:1/ span 1; grid-column:2 /span 1"
          >
            Common Options
          </h4>
          <h4
            style="justify-self:start; align-self:center;grid-row:4/ span 1; grid-column:2 /span 1"
          >
            Common CSV Options
          </h4>

          <p
            class="options-text"
            style="grid-row:2/span 1; grid-column:2/ span 1"
          >
            Max Rows
          </p>
          <p
            class="options-text"
            style="grid-row:3/span 1; grid-column:2/ span 1"
          >
            Total Rows in Grid
          </p>
          <p
            class="options-text"
            style="grid-row:2/span 1; grid-column:3/ span 1"
          >
            Auto
          </p>
          <p
            class="options-text"
            style="grid-row:3/span 1; grid-column:3/ span 1"
          >
            Auto
          </p>

          <p
            class="options-text"
            style="grid-row:5/span 1; grid-column:2/ span 1"
          >
            Column Delimiter
          </p>
          <p
            class="options-text"
            style="grid-row:6/span 1; grid-column:2/ span 1"
          >
            Row Delimiter
          </p>
          <p
            class="options-text"
            style="grid-row:7/span 1; grid-column:2/ span 1"
          >
            Include Column Names
          </p>
          <p
            class="options-text"
            style="grid-row:8/span 1; grid-column:2/ span 1"
          >
            Use any label (alias)
          </p>
          <p
            class="options-text"
            style="grid-row:9/span 1; grid-column:2/ span 1"
          >
            Remove Newline Characters
          </p>
          <p
            class="options-text"
            style="grid-row:10/span 1; grid-column:2/ span 1"
          >
            Include Original SQL
          </p>
          <p
            class="options-text"
            style="grid-row:11/span 1; grid-column:2/ span 1"
          >
            Row Comment Identifier
          </p>

          <p
            class="options-text"
            style="grid-row:5/span 1; grid-column:3/ span 1"
          >
            ,
          </p>
          <p
            class="options-text"
            style="grid-row:6/span 1; grid-column:3/ span 1"
          >
            Windows - CR/LF
          </p>
          <p
            class="options-text"
            style="grid-row:10/span 1; grid-column:3/ span 1"
          >
            Don't Include
          </p>
          <pre
            class="options-text"
            style="grid-row:11/span 1; grid-column:3/ span 1"
          ></pre>

          <pre
            class="options-text"
            style="justify-self:stretch; grid-row:7/span 1; grid-column:3/ span 1"
          ></pre>
          <pre
            class="options-text"
            style="justify-self:stretch; grid-row:8/span 1; grid-column:3/ span 1"
          ></pre>
          <pre
            class="options-text"
            style="justify-self:stretch; grid-row:9/span 1; grid-column:3/ span 1"
          ></pre>

          <input
            class="options-text"
            style="justify-self:stretch; grid-row:7/span 1; grid-column:3/ span 1"
            type="checkbox"
            name=""
            id=""
            checked
            disabled
          />
          <input
            class="options-text"
            style="justify-self:stretch; grid-row:8/span 1; grid-column:3/ span 1"
            type="checkbox"
            name=""
            id=""
            checked
            disabled
          />
          <input
            class="options-text"
            style="justify-self:stretch; grid-row:9/span 1; grid-column:3/ span 1"
            type="checkbox"
            name=""
            id=""
            disabled
          />

          <h4
            style="grid-row:1/ span 1; grid-column:1 /span 1justify-self:end; align-self:center"
          >
            -
          </h4>
          <h4
            style="grid-row:4/ span 1; grid-column:1 /span 1justify-self:end; align-self:center;"
          >
            -
          </h4>
        </div>
      </div>
    </div>

    <p class="step-message">
      3. (Optional) Download Data and perform a match with the
      ticket number to automatically fill missing information currently set as
      "No Data". 
    </p>
    <br />
    <p class="step-message">4. Upload document exported</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SQLCode: `select * from table1 
where sent_at >= '2018-10-15 00:00'`
    };
  },
  computed: {
    code() {
      var keys = [
        "select",
        "from",
        " as ",
        " on ",
        "join",
        "group by",
        "trim",
        "where"
      ];
      var data = this.SQLCode.trim();
      keys.forEach(k => {
        var regex = new RegExp(k, "g");
        data = data.replace(
          regex,
          '<span style="color:blue;font-weight:600">' + k + "</span>"
        );
      });
      data = data.replace(/('.*?')/g, '<span style="color:red">$1</span>');

      // .split(' ').map(x=>'<span>'+x+'</span>').join(' ')

      /*Caleb why did I have to put it here though*/
      return (
        `<pre style="
                        white-space: pre-wrap;       /* Since CSS 2.1 */
                        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
                        white-space: -pre-wrap;      /* Opera 4-6 */
                        white-space: -o-pre-wrap;    /* Opera 7 */
                        word-wrap: break-word;       /* Internet Explorer 5.5+ */            
            "><code>` +
        data +
        "</code></pre>"
      );
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: content-box;
}

#dbvis {
  display: flex;
  flex-direction: column;
  background: rgb(218, 235, 252);
  border-radius: 5px;
  border: 0.5px solid blue;
  box-shadow: 0 0 5px;
  width: 500px;
  height: 725px;
  padding: 6px;
  margin-top: 20px;

  position: relative;
  transform: translateX(-50%);
  left: 50%;
}

#dbvis-top {
  display: flex;
  height: 20px;
  background: rgb(218, 235, 252);
  padding-bottom: 5px;
  padding-right: 5px;
  justify-content: space-between;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#dbvis-top > div {
  display: flex;
  font-size: 13px;
  padding-top: 2px;
}

#dbicon {
  width: 15px;
  height: auto;
  padding: 2px;
  padding-right: 8px;
}

#dbvis-content {
  box-sizing: border-box;
  width: 500px;
  height: 700px;
  background: rgb(240, 240, 240);
  border: 0.1px solid black;
  padding: 10px;
}

#dbvis-content > * {
  font-size: 11px;
}

select {
  font-size: 11px;
  height: 20px;
}

#main-1 {
  height: 50px;
}
#main-2 {
  height: 320px;
  display: grid;
  grid-template-columns: 10px 100px 110px 100px auto;
  grid-template-rows: repeat(11, 26px);
  grid-gap: 2px;
}

#main-3 {
  height: 250px;
  display: grid;
  grid-template-columns: 50px 150px 250px 5px;
  grid-template-rows: repeat(11, 20px);
  grid-gap: 2px;
  grid-row-gap: 0;
}

.no-click {
  pointer-events: none;
  background-image: linear-gradient(rgb(238, 173, 164), rgb(198, 84, 65));
  border-radius: 0 5px 5px 0;
  width: 45px;
  color: white;
  font-weight: 600;
  font-size: 10px;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-family: Arial;
  font-stretch: ultra-expanded;
}

.data-format-text {
  justify-self: start;
  align-self: center;
  padding-left: 3px;
}

.gray {
  background: rgb(240, 240, 240);
  border-radius: 4px;
}

hr::before {
  position: absolute;
  float: left;
  left: 35px;
  z-index: 0;
  font-size: 8px;
}

#hr1::before {
  content: "Output Format";
}

#hr2::before {
  content: "Data Format";
}

#hr3::before {
  content: "Options";
}

.options-text {
  background: white;
  justify-self: stretch;
  align-self: center;
  text-align: left;
  line-height: 18px;
}

#message {
  display: none;
  position: relative;
  left: 50%;
  width: 500px;
  max-width: 100%;
  padding: 5px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 5px;
  border: 1px solid blue;
  background: rgb(218, 235, 252);
}

#code {
  color: black;
  text-align: left;
  background: rgb(243, 243, 243);
  width: 60%;
  transform: translateX(-50%);
  left: 50%;
  border-radius: 4px;
  position: relative;
  padding: 10px;
  max-width: 100%;
  font-size: 13px;
  border: 1px solid darkgray;
}

.step-message {
  padding: 2px 10%;
  text-align: center;
}

@media (max-width: 1050px) {
  #code {
    width: 95% !important;
    max-width: 500px !important;
    font-size: 12px;
  }
}

@media (max-width: 700px) {
  #dbvis {
    display: none;
  }
  #message {
    display: block;
  }

  .step-message {
    padding: 2px 4px;
    text-align: justify;
  }
}

#abusador {
  color: red;
  display: none;
}

@media (max-width: 400px) {
  #code {
    font-size: 8px !important;
  }
  #abusador {
    display: block;
  }

  .step-message {
    padding: 2px 4px;
    text-align: justify;
    font-size: 8px;
  }
  #message {
    display: block;
    font-size: 8px;
  }
}
</style>
