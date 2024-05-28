package utils

import "encoding/json"

func DtoToJson(source interface{}, destinition interface{}) error {
	b, err := json.Marshal(&source)
	if err != nil {
		return err
	}
	err = json.Unmarshal(b, &destinition)
	if err != nil {
		return err
	}
	return nil
}
