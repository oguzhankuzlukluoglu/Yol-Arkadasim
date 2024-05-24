package utils

import (
	"sync"
	"time"
)

var (
	blacklist = make(map[string]time.Time)
	mu        sync.Mutex
)

func AddTokenToBlacklist(token string, exp time.Time) {
	mu.Lock()
	defer mu.Unlock()
	blacklist[token] = exp
}

func IsTokenBlacklisted(token string) bool {
	mu.Lock()
	defer mu.Unlock()
	exp, found := blacklist[token]
	if !found {
		return false
	}

	// Eğer token'ın geçerlilik süresi dolmuşsa, blacklist'ten kaldır
	if time.Now().After(exp) {
		delete(blacklist, token)
		return false
	}

	return true
}
