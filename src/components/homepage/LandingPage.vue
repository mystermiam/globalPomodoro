<template>
   <div>
	<div id='first-sec'>
		
		<a href="#second-sec" @click="enterWebsite"><img src="../../../static/images/scroll.gif" class="scrollDown"></a>

	</div>

----------------------------------------- second section ---------------------------------------------------------------------

  <!-- change with v-if condition / state showLogin == true , animation fade in 800ms in css -->
	<div id='second-sec'>

		<nav class="topMenu">
            <ul class="Menu">
                <li class="home"><router-link :to="{ name: 'Main' }"> Game </router-link></li>
				<li class="blog"><router-link :to="{ name: 'story' }"> Story </router-link></li>
				<li class="about_us"><router-link :to="{ name: 'Pomodoro' }"> Pomodoro </router-link></li>
				<li class="request_demo" @click="showsocialmodal"> Social Media</li>
				<li id="login_signup">
					<div class="login-signup">
    					<span class="login" @click="showLogin = true"> Login </span>
    					<span> / </span>
    					<span class="signup" @click="showsignup"> SignUp </span>
    				</div>	
				</li>
			</ul>
		</nav>
    <h1 v-if='showLogin'>Hello</h1>

		<a href="#third-sec" @click="enterWebsite"><img src="../../../static/images/scroll.gif" class="scrollDown"></a>
	</div>

------------------------------------------- third section ----------------------------------------------------------------------

   </div>

</template>





<script>
	
import {mapState} from 'vuex'

export default {
   ...mapState('sectionTwo',{
      showLogin:'showLogin'
    }),
};

</script>


<style scoped>

body {
  margin:0;
}


/*--------------------------------------- First section --------------------------------------------------------*/

#first-sec {
  position: absolute;
  overflow: hidden;
  background-image: url('../../../static/images/home-01.jpg'); 
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  width : 100%;
  height : 100%;
}

.scrollDown {
	position: absolute;
    top: 80%;
    left: 44.5%;
}

/*--------------------------------------- Second section --------------------------------------------------------*/

#second-sec{
  position: absolute;
  overflow: hidden;
  background-image: url('../../../static/images/home-02.jpg'); 
  background-size: cover;
  background-attachment: fixed;
  top:100%;
  width : 100%;
  height : 100%;
}

@font-face{

  font-family: 'roots';

  src: url('../../../static/polices/HEAVENLYROOTED.ttf');
  src: url('../../../static/polices/HEAVENLYROOTED.ttf') format('truetype');
}

@font-face{

  font-family: 'VBG';

  src: url('../../../static/polices/ValeriaBoldGrunge.ttf');
  src: url('../../../static/polices/ValeriaBoldGrunge.ttf') format('truetype');
}


/* ************************** Menu Navigation *********************** */

.Menu{
  position: relative;
  list-style: none;
  width: 967px;
  height: 127px;  
  background: url('../../../static/images/menu-background.png');
  margin: 0 auto;
  color: white;
  border: none;
  background-repeat: no-repeat;
}

.Menu li{
  float: left;
  letter-spacing: 1px;
  font-family: 'roots';
  margin-left: 10px;
  padding-right: 10px;
  font-size: 31px;
  text-align: center;
  height: 92px;
  overflow: hidden;
  display: block;
  -webkit-transform: skew(-12deg);
  -moz-transform: skew(-12deg);
  -o-transform: skew(-12deg);
  -ms-transform: skew(-12deg);
}

.Menu li a{
  color: inherit;
  text-decoration: none;
  background-color:transparent;
}
a:hover{
  color: inherit;
  text-decoration: none;
  background-color:transparent;
}
/* login/sign Up */
#login_signup{
  display: flex;
  list-style: none;
  padding-top: 20px;
}
.login{
  cursor: pointer;
}
.login:hover{
  color:#00ffba;
}
.signup{
  cursor: pointer;
}
.signup:hover{
  color: #00ffba;
}

.home, .blog, .about_us, .request_demo{
  cursor: pointer;
  border-right: 1px solid grey;
  padding-top: 20px;
  transition: color 0.3s ease;
}

.home{
  padding-left: 100px;
}
.home:hover{
  color:#00c344;
}
.blog:hover{
  color:#ffa800;
}
.about_us:hover{
  color:#ff0000;
}
.request_demo:hover{
  color:#013dff;
}


/*--------------------------------------- Third section --------------------------------------------------------*/



</style>