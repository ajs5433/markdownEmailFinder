<template>
  <div class="about">
    <h4>Created by: A. Santos</h4>

    <p>Motivational {{ days[ (new Date).getDay()]}} :</p>
    <div> {{ phrases[ (new Date).getDay()]}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      phrases : ["I'm a countin' technique..... Now I'm 20 yeers old!",
                'Usted viene o va? Nooo yo voy! Adonde? ......',
                '.... Oh she men mira, Gocen misijo gocen ....',
                "Dio mio que acidente.... wao que detrusion Dio mio",
                "I'm a countin' technique..... Now I'm 20 yeers old!",
                'Usted viene o va? Nooo yo voy! Adonde? ......',
                "Dio mio que acidente.... wao que detrusion Dio mio"]
    }
  }
}
</script>
