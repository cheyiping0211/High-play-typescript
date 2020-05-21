package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()
    router.LoadHTMLFiles("./view/index.html", "./view/upload.html")
    //加载静态资源，例如网页的css、js

    //加载静态资源，一般是上传的资源，例如用户上传的图片
    router.StaticFS("/", http.Dir("./static")) 


    router.POST("/upload", func(context *gin.Context) {
        file, _ := context.FormFile("file")
        // 上传文件至指定目录
        if err := context.SaveUploadedFile(file, "./upload/"+file.Filename); err != nil {
            fmt.Println(err)
        }
        context.HTML(http.StatusOK, "upload.html", gin.H{"file": "/upload/" + file.Filename})
    })
    router.Run(":8080")
}
