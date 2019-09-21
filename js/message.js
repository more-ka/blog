!function() {
  var view = document.querySelector("section.message");

  var model = {
    //获取数据
    init: function() {
      var APP_ID = "9HOQuYpxQkbcsC81qKRHnKv3-gzGzoHsz";
      var APP_KEY = "NJr4FD0aO0zM4Pr48hM5VDcu";
      AV.init({ appId: APP_ID, appKey: APP_KEY });
    },
    fetch: function() {
      var query = new AV.Query("Message");
      return query.find(); //promise对象
    },
    save: function(name, content) {
      var Message = AV.Object.extend("Message");
      var message = new Message();
      return message.save({
        name: name,
        content: content
      });
    }
  };

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view, model) {
      this.view = view;
      this.model = model;

      this.messageList = view.querySelector("#messageList");
      this.form = view.querySelector("form");
      this.model.init();
      this.loadMessages();
      this.bindEvents();
    },
    loadMessages: function() {
      this.model.fetch().then(messages => {
        let array = messages.map(item => item.attributes);
        array.forEach(item => {
          let spanName = document.createElement("span");
          let spanContent = document.createElement("span");
          let li = document.createElement("li");
          spanName.innerText = `${item.name}:`;
          spanContent.innerText = ` ${item.content}`;
          li.appendChild(spanName);
          li.appendChild(spanContent);
          this.messageList.appendChild(li);
        });
      });
    },
    bindEvents: function() {
      this.form.addEventListener("submit", e => {
        e.preventDefault();
        this.saveMessage();
      });
    },
    saveMessage: function() {
      let myForm = this.form;
      let name = myForm.querySelector("input[name=name]").value;
      let content = myForm.querySelector("input[name=content]").value;
      if(name.length===0&&content.length===0){
        alert('写点东西在提交吧')
        return
      }
      this.model.save(name, content).then(function(object) {
        let messageList = document.querySelector("#messageList");
        let spanName = document.createElement("span");
        let spanContent = document.createElement("span");
        let li = document.createElement("li");
        spanName.innerText = `${object.attributes.name}:`;
        spanContent.innerText = ` ${object.attributes.content}`;
        li.appendChild(spanName);
        li.appendChild(spanContent);
        messageList.appendChild(li);
        myForm.querySelector("input[name=name]").value = "";
        myForm.querySelector("input[name=content]").value = "";
      });
    }
  };
  controller.init(view, model);
}.call();
