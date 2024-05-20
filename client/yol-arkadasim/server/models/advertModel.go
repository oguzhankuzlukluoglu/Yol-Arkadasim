// models/advermodel.go

package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AdvertModel struct {
	AdvertID           primitive.ObjectID `bson:"advert_id" json:"advert_id,omitempty"`
	AdvertDate         *time.Time         `bson:"advert_date" json:"advert_date"`
	From               *string            `bson:"from" json:"from"`
	To                 *string            `bson:"to" json:"to"`
	TransportChoice    *string            `bson:"transport_choice" json:"transport_choice"`
	PostedByID         primitive.ObjectID `bson:"posted_by_id" json:"posted_by_id"`
	JourneyDescription *string            `bson:"journey_description" json:"journey_description"`
}
