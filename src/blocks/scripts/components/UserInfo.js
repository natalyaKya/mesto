export default class UserInfo {
    constructor({name, job}) {
        this.name = document.querySelector(name);
        this.job = document.querySelector(job);
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
}