const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Upload.vue') },
      { path: 'download', name: 'download', props: true, component: () => import('pages/Download.vue') },
      { path: 'info', name: 'info', component: () => import('pages/Info.vue') },
      { path: 'error', name: 'error', component: () => import('pages/Error.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  }
]

export default routes
