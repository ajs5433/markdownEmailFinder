
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
// https://www.raymondcamden.com/2019/08/08/drag-and-drop-file-upload-in-vuejs

export default {
  data(){
    return{
      uploadDisabled: false,
      visible: false,
      fileList:[]
    }
  },
  components:{
    Instructions
  },
  methods:{
    drag(e){},
    addFile(e){
      console.log(e);
    },
    dragFile(e){
      e.preventDefault()
      let file = e.dataTransfer.files;
      if (!file)
        return;
      console.log(file)
    }
  },
  mounted(){
    let fileLoader = document.getElementById('load-file-btn');
    let dragArea = document.getElementById('drag-area');
    let progressBar = document.getElementById('progress-bar');

    fileLoader.addEventListener('change',(e)=>{
        let inputFile = e.target.files[0];

        if(!inputFile)
          console.log('no input file')
        
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

      reader.onprogress = showProgress
      reader.onload = function (e){
        var data = e.currentTarget.result;
        progressBar.style.display = 'none'
        console.log(data)
      }
      reader.readAsText(inputFile)
    }

    function showProgress(e){
      progressBar.value = e.loaded;
      progressBar.max = e.total;
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

#importtxt {
  transition: all 0.8s;
  transition-timing-function: ease;
}
#importtxt:hover {
  color: black;
  font-size: 25px;
  transform: scale(2);
}

#progress-bar{
  display:none;
}


</style>
