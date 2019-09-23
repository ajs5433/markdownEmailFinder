
<template>
  <div id="file-drag-drop"> 

    <div id="drag-area">
      <input id="load-file-btn" type="file" hidden="hidden" >

      <!-- <input type="button" id="fake-btn" value="Choose File"> -->
      <i class="el-icon-upload"></i>  
      <p id="message">
      Drag file here or click to Upload
      </p>
      <progress id="progress-bar"></progress>
      <el-progress 
        :percentage ="percentage" 
        :show-text="true"></el-progress>
    </div>

    <el-dialog
        title="INSTRUCTIONS TO CREATE IMPORT FILE"    
        width="80%"
        heigth="80%"  
        :destroy-on-close="true"
        :visible.sync="visible"
        >
        <Instructions/>
    </el-dialog>

    <div id="help">Don't know how to create the file? <a @click="visible = true">Help</a></div>
  </div>
</template>

<script>
import Instructions from '@/company/components/Instructions'
import Tickets from '@/company/Tickets'
import Papa from 'papaparse'

// https://www.raymondcamden.com/2019/08/08/drag-and-drop-file-upload-in-vuejs

export default {
  data(){
    return{
      uploadDisabled: false,
      visible: false,
      fileList:[],
      percentage : 0
    }
  },
  components:{
    Instructions
  },
  methods:{
  
  },
  mounted(){
    let self = this
    let fileLoader = document.getElementById('load-file-btn');
    let dragArea = document.getElementById('drag-area');
    let progressBar = document.getElementById('progress-bar');
    let tickets = []

    fileLoader.addEventListener('change',(e)=>{
        let inputFile = e.target.files[0];
        if(!inputFile)
          return;
        readFile(inputFile)
      });

    dragArea.addEventListener('click',(e)=>{ fileLoader.click(e)})      
    
    dragArea.addEventListener('dragover',e=>{
      e.preventDefault()

      if(!dragArea.classList.contains('drag-in'))
        dragArea.classList.add('drag-in')
    })

    dragArea.addEventListener('dragleave',e=>{
      e.preventDefault()
      if(dragArea.classList.contains('drag-in'))
        dragArea.classList.remove('drag-in')
    })

    dragArea.addEventListener('drop',e=>{
      e.preventDefault()
        var inputFile = e.dataTransfer.files[0]
        readFile(inputFile)
      })

    function readFile(inputFile){
      let reader = new FileReader()

      progressBar.style.display='block'


      /* To modify later!! */
      reader.onprogress = (e)=>{
        var percentage =  parseFloat( (( e.loaded * 100 ) / e.total).toFixed(2)  )
        // var percentage =  parseInt( (( e.loaded * 100 ) / e.total)  )
        // var percentage =  e.loaded * 100  / e.total
        showProgress(percentage)

        progressBar.value = e.loaded;
        progressBar.max = e.total;
      }

      reader.onload = function (e){
        var data = e.currentTarget.result;
        progressBar.style.display = 'none'
        // old
        // var csvToTickets = new CSVParser()
        // csvToTickets.load(data)


        // console.log('start processing')
        processCSV(data)

        // console.log('done processing')
      }
      reader.readAsText(inputFile)
    }
    
    function showProgress(percentage){
      self.percentage = percentage;
    }

    function processCSV(data){
      Papa.parse(data, {
        header:true, 
        complete(results){
            console.log(results.data.length)
            tickets = results.data
            Tickets.removeFaultyTickets(tickets, true);
            Tickets.addAdditionalFields(tickets)
            console.log(tickets)
        }
      });
    }
  }
};
</script>

<style scope>
/* Scoped ruins it */

#drag-area{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  height: 15rem; 
  width: 400px;
  margin: auto;
  margin-top: 10rem;
  text-align: center;
  border-radius: 10px;
  border: 1px dashed gray;
}

#drag-area:hover{
  border-color: rgb(27, 127, 209)
}

.drag-in{
  border: 3px dashed rgb(27, 135, 209) !important;
}

i{
  font-size:50px;
}

a {
  color: blue;
}

#message{
  font-size:13px;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}

#help {
  margin-top: 20px;
  font-size: 12px;
}

#progress-bar::-webkit-progress-bar{
  display:none;
  /* border-radius: 5px;
  width:50px; */
}


</style>
