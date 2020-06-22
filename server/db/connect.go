package db

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const (
	SqlType = "mysql"       // 数据库类型
	Username = "root"       // 数据库用户名
	Password = "96969"     // 数据库密码
	Hostname = "172.17.0.3"  // 数据库主机名
	Port = "3306"           // 数据库端口号
	Database = "app"       // 数据库名
)

var db *gorm.DB
var err error

func Init() {
	_,err:=NewConnect()
	if err!=nil{
		panic(fmt.Sprintf("初始化数据库失败：%v\n",err.Error()))
	}
	fmt.Println("初始化数据库完成...")
}

func NewConnect() (*gorm.DB,error){
	connectStr:=fmt.Sprintf("%s:%s@(%s:%s)/%s?%s",Username,Password,Hostname,Port,Database)
	db,err:=gorm.Open(SqlType,connectStr)
	if err!=nil{
		fmt.Printf("连接数据库出错：%v\n",err.Error())
		return nil,err
	}
	return db,nil
}

func GetDb() *gorm.DB {
	return db	
}

func CloseDb() {
	db.Close()
}