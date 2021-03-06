define({ "api": [
  {
    "type": "get",
    "url": "/profile",
    "title": "Request User information",
    "name": "GetProfile",
    "group": "Profile",
    "description": "<p>Returns the user's profile</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User's id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's first name. Defaults to the first word in Facebook name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's first name. Defaults to the last word in Facebook name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "interests",
            "description": "<p>User's interests.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateJoined",
            "description": "<p>Date the user joined site.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   {\n\"_id\": \"582bc9d3a6c967299077f497\",\n\"firstName\": \"Lenny\",\n\"lastName\": \"Cheng\",\n \"email\": \"lenny@hotmail.com.com\",\n \"interests\": \"Software, games, Halo\",\n\"dateJoined\": \"2016-11-16T02:52:03.760Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/controllers/profileController.js",
    "groupTitle": "Profile"
  },
  {
    "type": "put",
    "url": "/profile",
    "title": "Update User information",
    "name": "PutProfile",
    "group": "Profile",
    "description": "<p>Update the user's profile</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User's first name. Defaults to the first word in Facebook name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User's first name. Defaults to the last word in Facebook name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "interests",
            "description": "<p>User's interests.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   [{\n\"_id\": \"582bc9d3a6c967299077f497\",\n\"firstName\": \"Lenny\",\n\"lastName\": \"Cheng\",\n \"email\": \"lenny@hotmail.com.com\",\n \"interests\": \"Software, games, Halo\",\n\"dateJoined\": \"2016-11-16T02:52:03.760Z\"\n   }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Unsupported query parameter",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones: unsupportedParameterKey\"\n    }\n  }",
          "type": "json"
        },
        {
          "title": "Unsupported query parameter",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones: unsupportedParameterKey\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/controllers/profileController.js",
    "groupTitle": "Profile"
  },
  {
    "type": "delete",
    "url": "/stories/:id",
    "title": "Deletes the specific story",
    "name": "DeleteStory",
    "group": "Stories",
    "description": "<p>Delete the specified story</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Returns",
            "description": "<p>a 200 status code</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid id",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 71,\n    \"message\": \"The story with id 534849fjo382Foe6 does not exist\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/controllers/storiesController.js",
    "groupTitle": "Stories"
  },
  {
    "type": "get",
    "url": "/stories",
    "title": "Returns user's stories",
    "name": "GetStories",
    "group": "Stories",
    "description": "<p>Returns an array of the user's stories. Can filter by parameter matching, offset, and limit query</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "offset",
            "description": "<p>Used for pagination to determine how far from the beginning of the queried results to return</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>The maximum number of results to show</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filter",
            "description": "<p>Exact matches. eg, title=A brown fox</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n  \"dateCreated\": \"2016-11-29T07:00:00.000Z\",\n   \"keywords\": \"a, b, c, d\",\n   \"content\": \"This is the test content\",\n   \"status\": \"Saved\",\n   \"subTitle\": \"This is the test subTitle\",\n   \"title\": \"This is the test title\",\n   \"_id\": \"583e719f826edd3e4897cb48\",\n }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Unsupported parameters",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones:offset, limit, filter\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/controllers/storiesController.js",
    "groupTitle": "Stories"
  },
  {
    "type": "get",
    "url": "/stories/:id",
    "title": "Get specific story",
    "name": "GetStoryWithId",
    "version": "1.6.2",
    "group": "Stories",
    "description": "<p>Returns the story with the specified id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateCreated",
            "description": "<p>Date the story was last published or saved</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>Keywords associated with the story. Helps search for story.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subTitle",
            "description": "<p>A short blurb about the story to draw reader's interest.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The meat of the story.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Either &quot;Published&quot; or &quot;Saved&quot;. Anyone can access &quot;Published&quot; stories but only the author can access &quot;Saved&quot; ones.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Story title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>The id of the story</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n\"dateCreated\": \"2016-11-22T07:00:00.000Z\",\n \"keywords\": \"PUT Keywords, here\",\n   \"subTitle\": \"PUT Subtitle here!\",\n \"content\": \"PUT Content here!\",\n \"status\": \"Saved\",\n \"title\": \"This is the new PUT test title\",\n \"_id\": \"583513738f34e023b49a7cdc\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid id",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones: unsupportedParameterKey\"\n    }\n  }\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./routes/controllers/storiesController.js",
    "groupTitle": "Stories"
  },
  {
    "type": "post",
    "url": "/stories",
    "title": "Creates a new story",
    "name": "PostStories",
    "group": "Stories",
    "description": "<p>Creates a specified story</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subTitle",
            "description": "<p>A short blurb about the story to draw reader's interest.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The meat of the story.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Either &quot;Published&quot; or &quot;Saved&quot;. Anyone can access &quot;Published&quot; stories but only the author can access &quot;Saved&quot; ones.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Story title.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>(optional) Keywords to help readers find the story.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n  \"dateCreated\": \"2016-11-29T07:00:00.000Z\",\n   \"keywords\": \"a, b, c, d\",\n   \"content\": \"This is the test content\",\n   \"status\": \"Saved\",\n   \"subTitle\": \"This is the test subTitle\",\n   \"title\": \"This is the test title\",\n   \"_id\": \"583e719f826edd3e4897cb48\",\n   \"Location\": \"http://localhost:3001/api/stories/583e719f826edd3e4897cb48\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Missing required \"title\" parameter",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 89,\n    \"message\": \"Missing required query parameter. The following query parameters must be included: title\"\n    }\n  }",
          "type": "json"
        },
        {
          "title": "Unsupported parameters",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones:status, content, subTitle, title, keywords\"\n    }\n  }",
          "type": "json"
        },
        {
          "title": "Invalid value for \"status\" parameter",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 89,\n    \"message\": \"Invalid query parameter value for status. Valid values are: Saved, Published\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/controllers/storiesController.js",
    "groupTitle": "Stories"
  },
  {
    "type": "put",
    "url": "/stories/:id",
    "title": "Update specific story",
    "name": "PutStories",
    "group": "Stories",
    "description": "<p>Updates the specified story</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>Keywords associated with the story. Helps search for story.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "subTitle",
            "description": "<p>A short blurb about the story to draw reader's interest.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>The meat of the story.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Either &quot;Published&quot; or &quot;Saved&quot;. Anyone can access &quot;Published&quot; stories but only the author can access &quot;Saved&quot; ones.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Story title.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid id",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones: unsupportedParameterKey\"\n    }\n  }",
          "type": "json"
        },
        {
          "title": "Unsupported parameters",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 87,\n    \"message\": \"Unsupported query parameter. Supported ones: title, subTitle, content, keywords, status\"\n    }\n  }",
          "type": "json"
        },
        {
          "title": "Invalid value for \"status\" parameter",
          "content": "   HTTP/1.1 400 Bad Request\n   {\n\"error\": {\n    \"code\": 89,\n    \"message\": \"Invalid query parameter value for status. Valid values are: Saved, Published\"\n    }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/controllers/storiesController.js",
    "groupTitle": "Stories"
  }
] });
