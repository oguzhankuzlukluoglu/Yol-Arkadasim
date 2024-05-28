// models/advermodel.go

package models

import (
	"encoding/json"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AdvertModel struct {
	AdvertID           primitive.ObjectID `bson:"advert_id" json:"advert_id,omitempty"`
	AdvertDate         *time.Time         `bson:"advert_date" json:"advert_date"`
	From               *string            `bson:"from" json:"from"`
	To                 *string            `bson:"to" json:"to"`
	TransportChoice    *string            `bson:"transport_choice" json:"transport_choice"`
	PostedByID         string             `bson:"posted_by_id" json:"posted_by_id"`
	JourneyDate        CustomDate         `bson:"journey_date" json:"journey_date"`
	JourneyTime        *string            `bson:"journey_time" json:"journey_time"`
	PhoneNumber        *string            `bson:"phone_number" json:"phone_number"`
	JourneyDescription *string            `bson:"journey_description" json:"journey_description"`
}
type CustomDate struct {
	time.Time
}

const customDateFormat = "02.01.2006"

func (cd *CustomDate) UnmarshalJSON(b []byte) error {
	s := string(b)
	parsedTime, err := time.Parse(`"`+customDateFormat+`"`, s)
	if err != nil {
		return err
	}
	cd.Time = parsedTime
	return nil
}

func (cd CustomDate) MarshalJSON() ([]byte, error) {
	return json.Marshal(cd.Format(customDateFormat))
}

func (cd CustomDate) IsZero() bool {
	return cd.Time.IsZero()
}
