import Router from 'vue-router'

import Login from '@/components/Login'
import Cadastro from '@/components/Cadastro'
import CadastroUSF from '@/components/CadastroUSF'
import Consulta from '@/components/Consulta'
import ExameEncaminhamento from '@/components/ExameEncaminhamento'
import Faq from '@/components/Faq'
import NotFound from '@/components/NotFound'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Login', component: Login, meta: { guest: true } },
    { path: '/cadastro', name: 'Cadastro', component: Cadastro, meta: { guest: true } },
    { path: '/cadastrousf', name: 'CadastroUSF', component: CadastroUSF, meta: { guest: true } },
    { path: '/consulta', name: 'Consulta', component: Consulta, meta: { requiresAuth: true } },
    { path: '/examesEncaminhamentos', name: 'ExameEncaminhamento', component: ExameEncaminhamento, meta: { requiresAuth: true } },
    { path: '/faq', name: 'Faq', component: Faq, meta: { requiresAuth: true } },
    { path: '/*', name: 'NotFound', component: NotFound}
  ]
})

export default router
