require 'rails_helper'

RSpec.describe MessagesController do
  let(:group){create(:group)}
  let(:user){create(:user)}
  describe "#index" do

    context "ログインしている場合" do
      before do
        login user
        get :index, params: {group_id: group.id}
      end

      it "メッセージを割り当てる" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "グループを割り当てる" do
        expect(assigns(:group)).to eq group
      end

      it "indexに戻る" do
        expect(response).to render_template :index
      end
    end
    context "ログインしていない場合" do
      before do
        get :index, params: {group_id: group.id}
      end
      
      it "new_user_session_pathにリダイレクトする" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  describe "#create" do
    let(:params){{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}

    context 'ログインしている' do
      before do
        login user
      end

      context "メッセージの保存に成功" do
        subject {
          post :create,
          params: params
        }
        it "メッセージをカウントアップする" do
          expect{subject}.to change(Message, :count).by(1)
        end

        it "group_messages_pathにリダイレクトする" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end

        context "メッセージの保存に失敗" do
          let(:invalid_params){{group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil)}}
          
          subject{
            post :create,
            params: invalid_params
          }

          it "メッセージをカウントアップしない" do
            expect{subject}.not_to change(Message, :count)
          end

          it "indexに戻る" do
            subject
            expect(response).to render_template :index
          end
        end
      end
    end

    context "ログインしていない" do
      it "new_user_session_pathにリダイレクトする" do
        post :create,params: params

        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end