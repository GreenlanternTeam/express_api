# Base URL

- http://greenlantern.shop/api

## Api 명세

### Model Scheme

```json
// User
{
  id: number
  userId: string
  password: string
  email: string
  nickName?: string
}
```

####

| method | URI           | desciption   | body                                                                      | response   |
| ------ | ------------- | ------------ | ------------------------------------------------------------------------- | ---------- |
| GET    | /        | 전체회원조회 | -                                                                         | { User[] } |
| POST   | /signup | 회원가입     | {userId : string, password : string, email : string } | { success : boolean; user : User }   |
| POST   | /login | 로그인   | {userId : string, password : string } | { success : boolean; user : User }   |
