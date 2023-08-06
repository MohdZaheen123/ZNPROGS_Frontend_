import Cookies from 'js-cookie'

export const setToken = (data) => {
  Cookies.set('id', data.user.id)
  Cookies.set('username', data.user.username)
  Cookies.set('jwt', data.jwt)
  Cookies.set('pagerem', 1)
  window.location.href = '/profile';
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

export const removeToken = () => {
  Cookies.remove('id')
  Cookies.remove('username')
  Cookies.remove('jwt')
  window.location.href = '/';
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

