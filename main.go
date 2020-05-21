package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()
    //加载静态资源，一般是上传的资源，例如用户上传的图片
    router.StaticFS("/", http.Dir("./static")) 

    router.Run(":8080")
}
