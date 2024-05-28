package controllers

import (
	"context"
	"net/http"
	"yol-arkadasim/database"
	"yol-arkadasim/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CommentResponse struct {
	UserID   primitive.ObjectID `json:"user_id"`
	Username *string            `json:"username"`
	Comment  string             `json:"comment"`
}

func GetAllComments(c *gin.Context) {
	client := database.GetMongoClient()
	collection := client.Database("mydatabase").Collection("users")

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}
	defer cursor.Close(context.Background())

	var comments []CommentResponse
	for cursor.Next(context.Background()) {
		var user models.User
		if err := cursor.Decode(&user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		for _, comment := range user.Comments {
			commentResponse := CommentResponse{
				UserID:   user.ID,
				Username: user.Username,
				Comment:  comment,
			}
			comments = append(comments, commentResponse)
		}
	}

	if err := cursor.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"comments": comments})
}
func DeleteCommentHandler(c *gin.Context) {

}
