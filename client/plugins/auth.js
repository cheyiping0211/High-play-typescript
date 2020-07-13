export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
      if (process.client) {
        const token = sessionStorage.getItem('access_token');
        if (!token && to.path !== '/login') {
          next('/login');
        } else if (to.path !== '/login') {
            next();
        } else {
          next();
        }
      }
    });
  };