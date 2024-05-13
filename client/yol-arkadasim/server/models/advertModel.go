package models

import (
<<<<<<< HEAD
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
=======
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
>>>>>>> main
)

type AdvertModel struct {
	AdvertID           primitive.ObjectID `bson:"advert_id"`
	AdvertDate         *time.Time         `json:"advert_date"`
<<<<<<< HEAD
	FromWhere          *string            `json:"from_where"`
	ToWhere            *string            `json:"to_where"`
=======
	From               *string            `json:"from"`
	To                 *string            `json:"to"`
>>>>>>> main
	TransportChoice    *string            `json:"transport_choice"`
	PostedByID         primitive.ObjectID `bson:"posted_by_id"`
	JourneyDescription *string            `json:"journey_description"`
}
