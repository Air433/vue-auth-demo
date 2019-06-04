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
          duration = text.duration;
        }
      }
      let VueMessage = Vue.extend({
        render(h){
          let props = {
            color: type,
            text: msg,
            visable: this.visable
          }
          return h('MyMessage', {props})
        },
        data(){
          return {
            visable: false
          }
        }
      })
      let newMessage = new VueMessage()
      let vm = newMessage.$mount()
      let el = vm.$el
      document.body.appendChild(el)
      vm.visable = true;
      let t1 = setTimeout(() => {
        clearTimeout(t1);
        vm.visable = false;
        let t2 = setTimeout(()=>{
          clearTimeout(t2)
          document.body.removeChild(el)
          newMessage.$destroy()
          vm = null;

          callBack && (typeof callBack==='function') && callBack()
        }, MESSAGE.animateTime)
      }, duration)
    }
    Vue.prototype.$message = {
      info(text, callBack) {
        if (!text) return
        msg('info', text, callBack)
      },
      success(text, callBack) {
        if (!text) return
        msg('success', text, callBack)
      },
      error(text, callBack) {
        if (!text) return
        msg('error', text, callBack)
      },
      warning(text, callBack) {
        if (!text) return
        msg('warning', text, callBack)
      }
    }
  }
};
export default MESSAGE

