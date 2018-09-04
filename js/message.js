
var APP_ID = '9HOQuYpxQkbcsC81qKRHnKv3-gzGzoHsz';
var APP_KEY = 'NJr4FD0aO0zM4Pr48hM5VDcu';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


var query = new AV.Query('Message');
query.find()
    .then(
        function (messages) {
            console.log(messages)
            let array = messages.map((item)=> item.attributes)
            array.forEach((item)=> {
                let li = document.createElement('li')
                li.innerText = `${item.name}:${item.content}`
                let messageLIst = document.querySelector('#messageList')
                messageLIst.appendChild(li)

            })

})


let myFrom = document.querySelector('#postMessageFrom')

myFrom.addEventListener('submit', function (e) {
    e.preventDefault()
    let name = myFrom.querySelector('input[name=name]').value;
    let content = myFrom.querySelector('input[name=content]').value;    
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name':name ,
        'content': content
    }).then(function (object) {
        let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageLIst = document.querySelector('#messageList')
                messageLIst.appendChild(li)
        console.log(object)
    })
})







/* 

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})

*/