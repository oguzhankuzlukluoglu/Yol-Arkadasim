package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AdvertModel struct {
	AdvertID           primitive.ObjectID `bson:"advert_id"`
	AdvertDate         *time.Time         `json:"advert_date"`
	FromWhere          *string            `json:"from_where"`
	ToWhere            *string            `json:"to_where"`
	TransportChoice    *string            `json:"transport_choice"`
	PostedByID         primitive.ObjectID `bson:"posted_by_id"`
	JourneyDescription *string            `json:"journey_description"`
}
