package database

import (
	"fmt"
	"log"
	"os"

	"github.com/PragaL15/Academic_Dashboard/api/src/model"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Declare a global variable to hold the database connection
var DB *gorm.DB

// ConnectDatabase initializes and connects to the database
func ConnectDatabase() error {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		return fmt.Errorf("error loading .env file: %v", err)
	}

	// Construct the database source name (DSN) for MySQL
	dsn := os.Getenv("DB_USER") + ":" + os.Getenv("DB_PASSWORD") + "@tcp(" + os.Getenv("DB_HOST") + ")/" + os.Getenv("DB_NAME") + "?charset=utf8mb4&parseTime=True&loc=Local"

	// Open the database connection
	var connErr error
	DB, connErr = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if connErr != nil {
		return fmt.Errorf("failed to connect to database: %v", connErr)
	}

	// Migrate the UploadDetails model and subject tables
	if err := DB.AutoMigrate(&model.UploadDetails{}, &model.Sub1{}, &model.Sub2{}, &model.Sub3{}, &model.Sub4{}); err != nil {
		return fmt.Errorf("failed to migrate tables: %v", err)
	}

	fmt.Println("Database connected and migration completed.")
	return nil
}

// HandlePostRequest handles POST requests to save user and subject data
func HandlePostRequest(c *fiber.Ctx) error {
	// Parse the incoming request body into UploadDetails
	uploaddetails := new(model.UploadDetails)
	if err := c.BodyParser(uploaddetails); err != nil {
		log.Println("Error parsing request body:", err)
		return c.Status(fiber.StatusBadRequest).SendString("Invalid request format")
	}

	// Save UploadDetails data to the database
	if err := DB.Create(uploaddetails).Error; err != nil {
		log.Println("Error saving to database:", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Error saving data")
	}

	// Save subject details based on the number of subjects
	for i := 0; i < uploaddetails.NoOfSubjects; i++ {
		var subject interface{}
		switch i {
		case 0:
			subject = &model.Sub1{
				Dept1:         uploaddetails.Department,
				CourseCode1:   uploaddetails.Sub1,
				CourseID1:     uploaddetails.CourseID1,
				CourseTitle1:  uploaddetails.CourseTitle1,
				CourseType1:   uploaddetails.CourseType1,
				CourseNature1: uploaddetails.CourseNature1,
			}
		case 1:
			subject = &model.Sub2{
				Dept2:         uploaddetails.Department,
				CourseCode2:   uploaddetails.Sub2,
				CourseID2:     uploaddetails.CourseID2,
				CourseTitle2:  uploaddetails.CourseTitle2,
				CourseType2:   uploaddetails.CourseType2,
				CourseNature2: uploaddetails.CourseNature2,
			}
		// Add other cases for Sub3, Sub4, etc., as needed
		default:
			break
		}

		// Save each subject if it's not nil
		if subject != nil {
			if err := DB.Create(subject).Error; err != nil {
				log.Println("Error saving subject data:", err)
				return c.Status(fiber.StatusInternalServerError).SendString("Error saving subject details")
			}
		}
	}

	log.Printf("Received user data: %+v\n", uploaddetails)

	// Respond with a success message and the received data
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User data received",
		"data":    uploaddetails,
	})
}
