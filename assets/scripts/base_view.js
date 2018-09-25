cc.Class({
    extends: cc.Component,
    
    properties: {
        jumpBtn: {
            type: cc.Button,
            default: null
        },
        rollBtn: {
            type: cc.Button,
            default: null
        },
        hero: {
            type: cc.Node,
            default: null
        },
        hero_animation: {
            type: cc.Animation,
            default: null
        },
        jump_time: {
            type: cc.Integer,
            default: 0
        }
        
        
    },
    
    
    onLoad() {
        this.hero_animation.play("Run");
        //绑定roll事件
        let rollBtn = this.node.getChildByName("BTN_Roll");
        rollBtn.on(cc.Node.EventType.TOUCH_START, this.rollTouchStart, this);
        rollBtn.on(cc.Node.EventType.TOUCH_END, this.rollTouchEnd, this);
        rollBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.rollTouchEnd, this);
    },
    
    start() {
    
    },
    rollTouchStart() {
        if (this.hero_animation.currentClip.name === "Jump") {
            return;
        }
        cc.log("roll start");
        this.hero.setPosition(this.hero.x, this.hero.y - 10);
        this.hero_animation.play("Roll");
        
    },
    rollTouchEnd() {
        if (this.hero_animation.currentClip.name === "Jump") {
            return;
        }
        cc.log("roll end");
        this.hero.setPosition(this.hero.x, -50);
        this.hero_animation.play("Run");
    },
    // update (dt) {},
    jumpBtnCallBack() {
        if (this.jump_time >= 2) {
            
            return;
        }
        this.jump_time++;
        this.hero_animation.play("Jump");
        this.hero.stopAllActions();
        let clipArr = this.hero_animation.getClips();
        let jumpTime = clipArr[1].duration;
        let moveTo = cc.moveTo(jumpTime / 2, this.hero.x, this.hero.y + 50).easing(cc.easeCubicActionOut());
        let moveBack = cc.moveTo(jumpTime / 2, this.hero.x, -50).easing(cc.easeCubicActionIn());
        let action = cc.sequence(moveTo, moveBack, cc.callFunc(function () {
            this.jump_time = 0;
            this.hero_animation.play("Run");
        }.bind(this)));
        this.hero.runAction(action);
        
    },
    
});
