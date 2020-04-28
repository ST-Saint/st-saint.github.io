package exdict

type BasicDictionary struct {
	Word       string  `xorm:"word"`
	Phonetic   string  `xorm:"phonetic"`
	Wav        string  `xorm:"wav"`
	Explains   []byte  `xorm:"explains"`
	Memorize   int     `xorm:"memorize"`
	Importance int     `xorm:"importance"`
	Priority   float32 `xorm:"priority"`
}
