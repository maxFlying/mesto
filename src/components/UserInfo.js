export class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    const userData = {
      id: this._userID,
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.src
    };
    return userData;
  }

  setUserInfo(newName, newJob) {
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }

  setUserInfoServer(info) {
    if(info._id) this._userID = info._id
    if(info.name) this._userName.textContent = info.name;
    if(info.about) this._userJob.textContent = info.about;
  }

  setUserAvatar(info) {
    if(info.avatar) this._userAvatar.src = info.avatar;
  }
}
