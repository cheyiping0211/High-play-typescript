export default function ({ route, redirect }) {
    if (process.client) {
      const token = sessionStorage.getItem('access_token');
      if (!token && route.path !== '/login') {
        redirect('/login');
      }
    }
  }