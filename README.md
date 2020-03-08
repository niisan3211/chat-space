# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users
### index(users)
|Table|Column|Options|
|-----|------|-------|
|users|email|unique: true|
|users|nickname|unique: true|

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users
