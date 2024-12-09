package router

import (
   
    userHandler "github.com/PragaL15/Academic_Dashboard/api/src/handlers/user"
     "github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
    app.Post("/upload-details", userHandler.HandlePostRequest)
}
