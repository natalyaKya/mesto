export default class UserInfo {
    constructor({name, job, avatar}) {
        this.name = document.querySelector(name);
        this.job = document.querySelector(job);
        this.avatar = document.querySelector(avatar);
    }

    getUserInfo () {
        return {
            userName: this.name.textContent,
            userJob: this.job.textContent
        };
    }

    setUserInfo (data) {
        this.name.textContent = data.name;
        this.job.textContent = data.job;
    }
    setAvatar (data) {
        this.avatar.src = data.avatar;
    }
}