import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/login","/Login","Login"),
    route("/test","/Test","Test"),
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // redirect:"/login",
      children:[
        // {path:'/index', component:'HelloWorld',name:'HelloWorld'},
        route("sys/role","/Role","Role"),
        route("sys/menu","/Menu","Menu"),
        route("sys/user","/User","User"),
        route("job/schedule","/JobSchedule","JobSchedule")
      ]
    }
  ]
})
