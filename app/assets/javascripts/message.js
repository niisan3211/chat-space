$(function(){
   function buildHTML(message){
   if (message.image){
    var html = `
                  <div class="main_chat__message-list__group" data-message-id=${message.id}>
                    <ul class="main_chat__message-list__group__user">
                      <li class="main_chat__message-list__group__user__name">
                        ${message.user_name}
                      </li>
                      <li class="main_chat__message-list__group__user__created_at">
                        ${message.created_at}
                      </li>
                    </ul>
                    <div class="main_chat__message-list__group__message">
                      <p class="main_chat__message-list__group__message__body"> 
                        ${message.body}
                      </p>
                      <img class="main_chat__message-list__group__message__image" src=${message.image}>
                    </div>
                  </div>
                `
    return html;
    } else {
      var html = `
                    <div class="main_chat__message-list__group" data-message-id=${message.id}>
                      <ul class="main_chat__message-list__group__user">
                        <li class="main_chat__message-list__group__user__name">
                          ${message.user_name}
                        </li>
                        <li class="main_chat__message-list__group__user__created_at">
                          ${message.created_at}
                        </li>
                      </ul>
                      <div class="main_chat__message-list__group__message">
                        <p class="main_chat__message-list__group__message__body"> 
                          ${message.body}
                        </p>
                      </div>
                    </div>
                  `
      return html;
    };
  }

  var reloadMessages = function(){
    var last_message_id = $('.main_chat__message-list__group:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages,function(i,message){
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message-list').append(insertHTML);
        $('.main_chat__message-list').animate({scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert("error");
    });
  };


$('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
      .done(function(data){
        var html = buildHTML(data);
        $(".main_chat__message-list").append(html)
        $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
        $('form')[0].reset();
        $('.main_chat__message-form__button').prop('disabled', false);
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages,7000);
  }
});

    
