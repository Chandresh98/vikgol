/*Registration*/
localhost:3000/register
 data Format :-
 Body => raw => JSON


 IN POSTMAN DATA FORMATE
{
  fullName:"",
  profile:"",
  email:"",
  phone:"",
  password:"",
  address: {
       street:"",
       city:"",
       pincode:""
       
    }
}


/*Login*/
localhost:3000/login

{
  "email":"",
  "password":""
}

/* store create by admin only*/

{
  "storeId":"",
  "storeName":"",
  address: {
       street:"",
       city:"",
       pincode:""
       
    }
}

/* create book inventry */

localhost:3000/addBook/:userId/:storeId
{
   "bookid": "buvtiiXX4lMC",
            "title": "The Magnificent Book of Kites",
            "subtitle": "Explorations in Design, Construction, Enjoyment & Flight",
            "authors": ["Maxwell Eden"],
            "description": "Provides step-by-step instruction for designing a variety of kites, and offers tips on material selection and flying techniques.",
         "stock": "15"

}
output:-
{  "_id": {    "$oid": "62dbb51e852de674fd3b8b50"  },  "bookid": "buvtiiXX4lMC",  "title": "The Magnificent Book of Kites",  "subtitle": "Explorations in Design, Construction, Enjoyment & Flight",  "authors": [    "Maxwell Eden"  ],  "description": "Provides step-by-step instruction for designing a variety of kites, and offers tips on material selection and flying techniques.",  "stock": 15,  "storeId": {    "$oid": "62dbaff8c4d87b9cc0483db6"  },  "isDeleted": false,  "createdAt": {    "$date": {      "$numberLong": "1658565918867"    }  },  "updatedAt": {    "$date": {      "$numberLong": "1658565918867"    }  },  "__v": 0}


/* update book inventry */
formate:-
{
   "bookid": "buvtiiXX4lMC",
            "title": "The Book of Kites ",
            "subtitle": " Construction, Enjoyment & Flight",
            "authors": ["Maxwell Eden", "james "],
            "description": "Provides step-by-step instruction for designing a variety of kites, and offers tips on material selection and flying techniques.",
         "stock": "15"
         
 

}
output:-
{
    "status": true,
    "message": "data updated successfully",
    "data": {
        "_id": "62dbb51e852de674fd3b8b50",
        "bookid": "buvtiiXX4lMC",
        "title": "The Book of Kites ",
        "subtitle": " Construction, Enjoyment & Flight",
        "authors": [
            "Maxwell Eden"
        ],
        "description": "Provides step-by-step instruction for designing a variety of kites, and offers tips on material selection and flying techniques.",
        "stock": 15,
"storeId": "62dbaff8c4d87b9cc0483db6",
        "isDeleted": false,
        "createdAt": "2022-07-23T08:45:18.867Z",
        "updatedAt": "2022-07-23T08:53:08.000Z",
        "__v": 0
    }
}






{"id": "LbnwCQAAQBAJ",

"title": "Playing Harry Potter",
 "subtitle": "Essays and Interviews on Fandom and Performance",
 "authors": [
    "Lisa S. Brenner"
  ],
  "description": "Through classroom activities, wizard rock concerts, and organizations like the Harry Potter Alliance, Harry Potter fans are using creativity to positively impact the world. This collection of essays and interviews examines how playful fandom--from fanfiction to Muggle quidditch, cosplay, role-playing games, and even Harry Potter burlesque--not only reimagines the canon but also challenges consumerism, questions notions of identity, and fosters participatory culture. The contributors explore issues applicable to fan studies and performance studies at large, such as the role of performance, the nature of community, and questions of representation and ownership in the digital age. Presented in three parts, the essays discuss discrepancies between sanctioned versions of Harry Potter and fan creations, the reenactment and reinterpretation of the original narrative in fan performance, and collaborative and participatory performances that break down the boundaries between actors and audiences.",
}


