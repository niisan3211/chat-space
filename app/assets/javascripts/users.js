$(function(){
  function GetWord(user){
      let html =`
                  <div class="chat-group-user clearfix">
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.nickname}">追加</a>
                    <p class="chat-group-users__name">
                      ${user.nickname}
                    </p>
                  </div>
                `;
      $("#user-search-result").append(html);
  }
  function NotWord(){
    var html =`
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>
              `;
      $("#user-search-result").append(html);
  }
  function AddWordList(user_name,user_id){
    var html = `
                <div class="chat-group-user clearfix" id="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${user_id}" data-user-name="${user_name}">削除</div>
                </div>
              `; 
    $(".js-add-user").append(html);
  }
  function AddMember(user_id) {
    let html = `<input name="group[user_ids][]" type="hidden" value="${user_id}" id="group_user_ids_${user_id}" />`;
    $(`#${user_id}`).append(html);
  }
  


  $(function(){
    $('#user-search-field').on("keyup", function(){
      let input = $('#user-search-field').val();
      $.ajax({
        type: "GET",
        url: "/users",
        data: {keyword: input},
        dataType: "json"
      })
        .done(function(users){
          $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              GetWord(user)
            });
          } else if(input.length == 0){
            return false;
          } else{  
            NotWord()
          }
        })
        .fail(function(){
          alert("ユーザー検索に失敗いました")
        });
    });
  });

  $(document).on("click",".chat-group-user__btn--add",function(){
    const user_id = $(this).attr("data-user-id");
    const user_name =$(this).attr("data-user-name");
    $(this)
      .parent()
      .remove();
    AddWordList(user_name,user_id);
    AddMember(user_id);
  });
  $(document).on("click",".chat-group-user__btn--remove", function(){
    $(this)
      .parent()
      .remove();
  });
});