const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  categoryList: state => state.category.categoryList
}

export default getters
