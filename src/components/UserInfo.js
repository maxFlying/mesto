export class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
    return userData;
  }

  setUserInfo(newName, newJob) {
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }

  setUserInfo2(info) {
    this._userName.textContent = info.name;
    this._userJob.textContent = info.about;
  }
}
