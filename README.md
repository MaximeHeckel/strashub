#Strashub



This project aims to provide a complete API for the city of Strasbourg including bars, restaurants, sights and public transportation. All the data is now located in a single place in order to facilitate data access for developers.


##API Endpoints

This first version includes 3 endpoints to access the data. The main url to access the data is [https://strashub.scalingo.io/](https://strashub.scalingo.io/)


####Sights
	
	GET https://strashub.scalingo.io/places/tourism
	
gives you the following response (sample):
	
	{
		"_id":"54bbac9adc16dafc247ab681",
		"id":"4bee3d932c082d7f42403042",
		"name":"Place de la Cathédrale",
		"la":48.58154382230974,
		"lg":7.750194668769836,
		"__v":0,
		"photo":"https://irs1.4sqi.net/img/general/720x960/52229005_qYX7orjeR1oj629EL5G3JYAoqICTwz8GaF6q60cWbcs.jpg",
		"text":"",
		"rating":"0"
	}

####Restaurants and bars

	GET https://strashub.scalingo.io/places/food
	
gives you the following response (sample):
	
	{
		"_id":"54bd04d7e3f1ad1300da0975",
		"id":"au-fond-du-jardin-strasbourg",
		"name":"Au Fond du Jardin",
		"la":48.5816148,
		"lg":7.7527735,
		"__v":0,
		"photo":"http://s3-media3.fl.yelpcdn.com/bphoto/PJcYAoENET7jsGTutwA1hw/o.jpg",
		"text":"http://www.yelp.fr/biz/au-fond-du-jardin-strasbourg",
		"rating":"5"
	}
	
####Velhop

	GET https://strashub.scalingo.io/places/velhop
	
gives you the following response (sample):
	
	{
		"_id":"54ba6c3c86ffc33f195c853a",
		"la":48.529616,
		"lg":7.734226,
		"available":8,
		"__v":0,
		"id":111,
		"address":"111 Campus d'Illkirch"
	}



##Where does the data come from ?

This API hub pulls its data from the foursquare api, yelp api and some governments api's and then stores it into another database in order to secure the data in case one of the previous api is down.

##Contact

If you have questions or if you want to get involved in this project you can contact me at [hello@maximeheckel.com](hello@maximeheckel.com) or you can simply open an issue on this repository.