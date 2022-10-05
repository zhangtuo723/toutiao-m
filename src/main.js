import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import 'amfe-flexible'
import '@/utils/dayjs'

import { Grid, GridItem,NavBar,
  Form,Field,Button,Toast,
  CountDown,Tabbar, TabbarItem ,Icon,
  Cell, CellGroup ,Dialog,Tab, Tabs,
  List ,PullRefresh ,Popup,Search ,Loading ,
  Divider ,
  Image as VanImage} from 'vant';
  import { Picker } from 'vant';

Vue.use(Picker);

  
Vue.use(Divider);
Vue.use(Loading);
Vue.use(Search);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(CountDown )
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Grid);
Vue.use(GridItem);




Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



