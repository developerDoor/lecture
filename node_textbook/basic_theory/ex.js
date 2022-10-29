var relationship1 = {
    name : 'zero',
    friend : ['hero', 'nero', 'xero'],
    logFriend : function () {
        let that = this;
        console.log(that);
        //this.friend.forEach(function (friend) {
        //    console.log(that.name, friend);
        //});
    },
};
console.log(relationship1.this);