<template>
   <div>
	<div id='first-sec'>
		<div id="container-img"><span id="grow-img"></span></div>
		<!-- <a href="#second-sec" @click="enterWebsite"><img src="../../../static/images/scroll.gif" class="scrollDown"></a> -->
    <div class="entry-footer">
      <div class="content-footer">
        <p class="sorry">Sorry, we're doing some work on the site.</p>
        <p class="thanks">Thank you for being patient. Visit our networks to keep updated.</p>
        <div><div class="networks"><span><a href="https://www.facebook.com/GrowPlayground/"><img class="fb-network" src="../../../static/images/fb.png"></a></span><span><a href="mailto:grow.playground@gmail.com"><img class="gmail-network" src="../../../static/images/gmail.png"></a></span></div></div>
      </div>
    </div>
	</div>

<!------------------------------------------- second section ----------------------------------------------------------------------->

  <!-- change with v-if condition / state showLogin == true , animation fade in 800ms in css / the router links don't yet exist / -->
 	<div id='second-sec'>

		<nav class="topMenu">
            <ul class="Menu">
                <li class="home"><router-link :to="{ name: 'Main' }"> Game </router-link></li>
				<li class="blog"><router-link :to="{ name: 'story' }"> Story </router-link></li>
				<li class="about_us"><router-link :to="{ name: 'Session' }"> Pomodoro </router-link></li>
				<li class="request_demo" @click="showsocialmodal = true"> Social Media</li>
				<li id="login_signup">
					<div class="login-signup">
    					<span class="login" @click="showLogin = true"> Login </span>
    					<span> / </span>
    					<span class="signup" @click="showsignup = true"> SignUp </span>
    				</div>	
				</li>
			</ul>
		</nav>
    <h1 v-if='showLogin'>Hello</h1>

		<a href="#third-sec" @click="enterWebsite"><img src="../../../static/images/scroll.gif" class="scrollDown"></a>
	</div> 

<!-- ------------------------------------------- third section ---------------------------------------------------------------------- -->

   </div>

</template>





<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {

  computed: {
   ...mapState('landingPage',{
      showLogin:'showLogin',
      showSignUp: 'showSignUp',
      showSocialModal: 'showSocialModal',

      someOtherState: 'someOtherState'
    }),

  },

  methods: {
  ...mapActions('landingPage',{
       someAction: 'someAction',

  }),
  }


};

</script>


<style scoped>
#container-img{
  content: "";
  height: 75%;
}

#grow-img{
  position: absolute;
  background-image: url('../../../static/images/home-01.jpg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 100%;
  background-attachment: fixed;
  width : 100%;
  height : 75%;
}

.content-footer{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.network{
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
}

.fb-network{
  align-self: center;
  max-width: 40px;
  max-height: 40px;
  margin:0 0.3em;
}

.gmail-network{
  align-self: center;
  max-width: 40px;
  max-height: 40px;
  margin:0 0.3em;
}

.entry-footer{
  font-family : "Courier New", Courier, monospace;
  text-align: center;
  position: absolute;
  top:75%;
  width:100%;
  border-top:solid 0.1em black;
  background: #fff;
  height: 25%;
}

.sorry{
  font-size: 3.5vw;
  margin: 0.3vw auto;
}

.thanks{
  font-size:1.8vw;
  margin:0.3vw auto 1vw auto;
}

body {
  margin:0;
  height: 100%;
}


/*--------------------------------------- First section --------------------------------------------------------*/

#first-sec {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
 /* position: absolute;
  overflow: hidden;
  background-image: url('../../../static/images/home-01.jpg'); 
  background-size: cover;
  background-attachment: fixed;
  background-position: -15% 100%;
  width : 100%;
  height : 75%;*/
}

.scrollDown {
  position: absolute;
  top: 80%;
  left: 42%;
  width: 16%;
  height: 25%;
}

/*--------------------------------------- Second section --------------------------------------------------------*/

#second-sec{
  position: absolute;
  overflow: hidden;
  background-image: url('../../../static/images/home-02.jpg'); 
  background-size: cover;
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
  width: 60em;
  height: 12em;
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