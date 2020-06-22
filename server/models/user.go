package models

import (
	"log"
     "github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

// Register struct
type Register struct {
	gorm.Model
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

// Login struct
type Login struct {
	gorm.Model
	Password string `json:"password"`
	Email    string `json:"email"`
}

//User struct
type User struct {
	gorm.Model
	Password  string `json:"password"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

//HashPassword hashes user password
func HashPassword(user *Register) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		log.Fatal(err)
	}
	user.Password = string(bytes)
}

//CheckPasswordHash compares hash with password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}