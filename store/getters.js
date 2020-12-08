const getters = {
  token: state => state.user.token,
  avatar: state => state.userInfo.avatar,
  name: state => state.userInfo.username,
  userInfo: state => state.userInfo,
  userNickName: state => state.userInfo.nickName,
  userId: state => state.userInfo.userId,
  categoryList: state => state.category.categoryList
}

export default getters
