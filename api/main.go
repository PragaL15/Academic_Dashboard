package main

import (
    "fmt"
    "github.com/PragaL15/Academic_Dashboard/api/database"
    "github.com/PragaL15/Academic_Dashboard/api/router"
    "github.com/gofiber/fiber/v2"
    log "github.com/sirupsen/logrus"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    app := fiber.New()
    app.Use(cors.New())
    database.ConnectDatabase()
    fmt.Println("Connected to the database")
    router.SetupRoutes(app) //this function should be router package and in same name
    if err := app.Listen(":4500"); err != nil {
        log.Fatalf("Error starting server: %v", err)
    }
}
