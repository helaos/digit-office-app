import { getRequest } from './request'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }

  getRequest('/system/config/menu').then(res => {
    if (res) {
      let fmtRoutes = formatRoutes(res.data)
      fmtRoutes.forEach(route => {
        router.addRoute(route)
      })
      store.commit('initRoutes', fmtRoutes)
    }
  })
}

export const formatRoutes = (routes) => {
  let fmRoutes = []

  // console.log(routes);
  
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router

    // console.log(router);

    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }

    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children,
      component (resolve) {

        if (component.startsWith('Emp')) {
          require(['../views/emp/' + component], resolve)
        } else if (component.startsWith('Per')) {
          require(['../views/per/' + component], resolve)
        } else if (component.startsWith('Sta')) {
          require(['../views/sta/' + component], resolve)
        } else if (component.startsWith('Sal')) {
          require(['../views/sal/' + component], resolve)
        } else if (component.startsWith('Sys')) {
          require(['../views/sys/' + component], resolve)
        } else {
          require(['../views/' + component], resolve)
        }
      }
    }

    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}
