// 클래스
// 프로토타입 문법을 깔끔하게 작성할 수 있는 Class 문법 도입

// 생성자 함수
let Human = function (type) {
    this.type = type || 'human';
};

// static method, 생성자 메서드
Human.isHuman = function (human) {
    return human instanceof Human;
};

// 인스턴스 메서드, 프로토 타입 메서드
Human.prototype.breathe = function () {
    alert('h-a-a-a-a-m');
};

let Zero = function (type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
}

class Human {
    constructor(type = 'human') {
        this.type = type;
    }

    static isHuman(human) {
        return human instanceof Human;
    }

    breathe() {
        alert('hahaha');
    }
}

let moon = 'moon';
moon.isHuman