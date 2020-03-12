class InputManager{
    observer = [];

    subscribe(fn){
        this.observer.push(fn);
    }
    unsubscribe(fn){
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    broadcast(action, data){
        this.observers.forEach(subscriber => subscriber(action,data));
    }

    handlekeys = e => {
        e.preventDefault();
        switch (e.keyCode){
            case 37:
                this.broadcast("move", {x:-1, y:0});
                break;
            case 38:
                this.broadcast("move", {x:0, y:-1});
                break;
            case 39:
                this.broadcast("move", {x:1, y:0});
                break;
            case 40:
                this.broadcast("move", {x:0, y:1});
                break;
            default:
                break;
        }
    };

    bindkey(){
        document.addEventListener(
            "keydown",
            ()=>{
                this.handlekeys;
            })
    }
    unbindkey(){
        document.removeEventListener("keydown",
        ()=>{
            this.handlekeys;
        })
    }
}