export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._id = '';
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserId() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        };
    }

    setUserInfo(data) {
        this._id = data._id;
        this._name.textContent = data.name;
        this._job.textContent = data.about;
    }
}