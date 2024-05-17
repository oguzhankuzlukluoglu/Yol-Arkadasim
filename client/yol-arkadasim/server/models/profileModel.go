package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Profile struct {
	UserID            primitive.ObjectID `bson:"user_id"`
	Interests         []string           `json:"interests"`
	About             *string            `json:"about"`
	Location          *string            `json:"location"`
	TravelPreferences []string           `json:"travel_preferences"`
	ProfilePicture    *string            `json:"profile_picture"`
	TravelPhotos      []string           `json:"travel_photos"`
}
