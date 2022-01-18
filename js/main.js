class SnowFlake {
    constructor(_) {
        this.x = this.y = 0, this.r = _, this.color = "rgba(255, 255, 255, 0.1)";
        this.velocity = {
            x: undefined,
            y: undefined
        };
    }

    draw(_) {
        _.fillStyle = this.color;
        _.beginPath();
        _.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        _.closePath();
        _.fill();
    }

}

// Controller
const GameController = {
    _: undefined,
    snowfkes: [],
    mouse: {
        x: undefined,
        y: undefined,
        active: false
    },
    handleMouseEnd(_e) {
        GameController.mouse.active = false;
    },
    handleTouchEnd(_e) {
        GameController.mouse.active = false;
    },
    handleMouseDown(_e) {
        GameController.mouse.active = true;
    },
    handleTouchDown(_e) {
        GameController.mouse.active = true;
    },
    handleMouseMove(_e) {
        GameController.mouse.x = _e.clientX;
        GameController.mouse.y = _e.clientY;
    },
    handleTouchMove(_e) {
        GameController.mouse.x = _e.touches[0].clientX;
        GameController.mouse.y = _e.touches[0].clientY;
    },
    ctx: undefined,
    init(_parent) {
        this._ = document.createElement("canvas");
        this.ctx = this._.getContext("2d");
        this._.width = window.innerWidth;
        this._.height = window.innerHeight;
        _parent.appendChild(this._);
    },
    getRandom(_n) {
        return Math.floor(Math.random() * _n);
    },
    getBetweenInteger(_n1, _n2) {
        return Math.floor(Math.random() * (_n2 - _n1 + 1) + _n1);
    },
    getBetween(_n1, _n2) {
        return (Math.random() * (_n2 - _n1)) + _n1;
    },
    clear() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    },
    createFks(_n = 1) {
        this.snowfkes = [];
        let i = 0;
        for (; i < _n; i++) {
            let newObj = new SnowFlake(this.getBetweenInteger(1, 3));
            newObj.color = "rgba(255, 255, 255, 0." + newObj.r;
            newObj.velocity.x = this.getBetween(-0.059, 0.05);
            newObj.velocity.y = this.getBetween(0.5, 1);
            newObj.x = this.getRandom(innerWidth);
            newObj.y = -this.getBetweenInteger(0, innerHeight);
            this.snowfkes.push(newObj);
        }
    }
};

const MY_NAME = "Snow Effect By @HumoyunDeveloper";
GameController.init(document.body);
GameController.createFks(9000);
drawAnimation();

function additional() {
    GameController.ctx.font = "10px bold Arial";
    GameController.ctx.fillStyle = "#fff";
    GameController.ctx.fillText(MY_NAME, 10, innerHeight - 33);
    GameController.ctx.fillStyle = "#233";
    GameController.ctx.fillRect(0, innerHeight - 30, innerWidth, 30);
}

function drawAnimation() {
    GameController.clear();
    GameController.snowfkes.forEach(sn => {
        sn.draw(GameController.ctx);
        sn.x += sn.velocity.x;
        sn.y += sn.velocity.y;
        if (sn.y >= innerHeight - 33) {
            sn.velocity.x = 0;
            sn.velocity.y = 0;
        }
    });
    if (GameController.mouse.active) {
        let newObj = new SnowFlake(GameController.getBetweenInteger(1, 3));
        newObj.color = "rgba(255, 255, 255, 0." + newObj.r;
        newObj.velocity.x = GameController.getBetween(-0.059, 0.05);
        newObj.velocity.y = GameController.getBetween(0.2, 0.8);
        newObj.x = GameController.mouse.x;
        newObj.y = GameController.mouse.y;
        GameController.snowfkes.push(newObj);
    }
    additional();
    window.requestAnimationFrame(drawAnimation); // 60FPS....
}

GameController._.addEventListener("mousedown", GameController.handleMouseDown);
GameController._.addEventListener("mouseup", GameController.handleMouseEnd);
GameController._.addEventListener("mousemove", GameController.handleMouseMove);
GameController._.addEventListener("touchstart", GameController.handleTouchDown);
GameController._.addEventListener("touchmove", GameController.handleTouchMove);
GameController._.addEventListener("touchend", GameController.handleTouchEnd);