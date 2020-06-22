package controllers

import (
	"github.com/gin-gonic/gin"
	"app/models"
	"app/db"
	"fmt"
)

func GetUsers(c *gin.Context)  {
	var users []models.User
	var getDb = db.GetDb()
	if err := getDb.Find(&users).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}

	c.JSON(200, users)
}

func CreateUser(c *gin.Context) {
	var user models.User

	c.BindJSON(&user)

	var getDb = db.GetDb()
	getDb.Create(&user)
	c.JSON(200, user)
}
func UpdateUser(c *gin.Context) {
	var user models.User
	c.BindJSON(&user)

	var getDb = db.GetDb()
	getDb.Model(&user).Updates(&user)
	c.JSON(200, user)
}

func DeleteUser(c *gin.Context) {
	var user models.User

	c.BindJSON(&user)

	var getDb = db.GetDb()
	getDb.Where(user.ID).Delete(&user)
	c.JSON(200, user)
}
func GetUser(c *gin.Context) {
	userID :=c.Params.ByName("id")
	var user models.User
	var getDb = db.GetDb()

	if err := getDb.Model(&user).Where(userID).First(&user).Error; err != nil {
		//fmt.Println(err)
		c.AbortWithStatus(404)
	}else {
		c.JSON(200, user)
	}
}