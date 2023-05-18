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

    setUserInfo (res) {
         if(res.name) {
            this.name.textContent = res.name;
        }
        if(res.about) {
            this.job.textContent = res.about;
        }
    }
    setAvatar (data) {
        if(data.avatar) {
            this.avatar.src = data.avatar;
        }
    }
}