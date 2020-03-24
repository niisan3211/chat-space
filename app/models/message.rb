class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  with_options if: :published? do
    validates :body, presence: true
    validates :image, presence: true
  end
end
