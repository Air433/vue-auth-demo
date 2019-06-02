import MyMessage from '../pages/MyMessage'

const MESSAGE = {
  duration: 3000,
  animateTime: 300,
  install(Vue){
    if (typeof window !=='undefined' && window.Vue){
      Vue = window.Vue
    }
    Vue.component('MyMessage', MyMessage)

    function msg(type, text, callBack) {
      let msg;
      let duration = MESSAGE.duration;
      if (typeof text ==='string'){
        msg = text;
      } else if (text instanceof Object){
        msg = text.text || '';
        if (text.duration){

        }
      }
    }
  }
};
