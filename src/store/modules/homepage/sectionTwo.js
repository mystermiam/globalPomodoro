export default {
    namespaced : true,
   
    state : {
     showLogin: false,
     showSignUp: false,
     showSocialModal: false
    },

    actions : {
    showlogin: function(){
      $('#login-PopUp').fadeIn();
      $('#login-PopUp-main').show();
    },
    showsignup: function(){
      $('#signUp-PopUp').fadeIn();
      $('#signUp-PopUp-main').show();
    },
    showsocialmodal: function(){
      $('#social-PopUp').fadeIn();
      $('#social-PopUp-main').show();    
    },
    addDragon(){
      $("body").append('<a href="#" @click="ToTop"><img src="../../static/images/GoTop.gif" id="DragonTop"></a>');
    }

    },

    getters : {

    },

    mutations : {
       
    }
};