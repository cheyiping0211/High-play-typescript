package routes

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	router := gin.New()
	//jwt Middleware

	//静态资源没有
	router.StaticFS("/", http.Dir("./public"))
	return router
}	