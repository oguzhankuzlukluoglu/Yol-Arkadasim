package models

type Login struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Register struct {
	Name     *string `json:"name" validate:"required,min=2,max=100"`
	Surname  *string `json:"surname" validate:"required,min=2,max=100"`
	Email    *string `json:"email"`
	Username *string `json:"username"`
	Password *string `json:"password"`
	Phone    *string `json:"phone"`
}
